'use strict'

// 该扩展注入项目首页闭包，复用当前页面的卡片渲染与 Obsidian 通知能力。
const pmZentaoSyncState = { running: false };

function pmZentaoSyncId(project) {
  const match = String(project.id ?? '').match(/^zentao-execution-(\d+)$/u);
  return match ? match[1] : null;
}

function pmZentaoCodexPath() {
  const fs = require('node:fs');
  const path = require('node:path');
  const directories = [
    ...String(process.env.PATH ?? '').split(path.delimiter),
    '/usr/local/bin',
    '/opt/homebrew/bin',
    path.join(process.env.HOME ?? '', '.local/bin'),
  ];
  for (const directory of directories) {
    if (!directory) continue;
    const candidate = path.join(directory, 'codex');
    try {
      fs.accessSync(candidate, fs.constants.X_OK);
      return candidate;
    } catch { /* 继续查找 */ }
  }
  throw new Error('未找到可执行的 codex 命令');
}

function pmZentaoVaultPath(context) {
  const adapter = context.plugin.app.vault.adapter;
  const basePath = adapter.getBasePath?.() ?? adapter.basePath;
  if (typeof basePath !== 'string' || !basePath) {
    throw new Error('当前设备无法取得 Obsidian 仓库路径');
  }
  return basePath;
}

function pmZentaoSyncButtons(context) {
  const buttons = [
    ...context.toolbarEl.querySelectorAll('.pm-zentao-sync-button'),
    ...context.contentEl.querySelectorAll('.pm-zentao-sync-button'),
  ];
  for (const button of buttons) {
    button.disabled = pmZentaoSyncState.running;
    button.textContent = pmZentaoSyncState.running ? '同步中…' : '从禅道同步';
  }
}

function pmZentaoSyncResult(context, title, details) {
  const modal = new e.Modal(context.plugin.app);
  modal.setTitle(title);
  modal.contentEl.createEl('pre', {
    text: details || 'Codex 未返回结果，请检查本机 Codex 会话。',
    cls: 'pm-zentao-sync-result',
  });
  modal.open();
}

function pmStartZentaoSync(context, ids) {
  if (pmZentaoSyncState.running) return;
  const uniqueIds = [...new Set(ids.filter((id) => /^\d+$/u.test(String(id))))];
  if (uniqueIds.length === 0) {
    new e.Notice('当前页面没有可同步的禅道迭代');
    return;
  }

  let vaultPath;
  let codexPath;
  try {
    vaultPath = pmZentaoVaultPath(context);
    codexPath = pmZentaoCodexPath();
  } catch (error) {
    new e.Notice(`无法启动禅道同步：${error.message}`, 8000);
    return;
  }

  const scope = uniqueIds.length === 1 ? `迭代 ${uniqueIds[0]}` : `${uniqueIds.length} 个迭代`;
  const prompt = `请使用 $zentao-project-manager 立即更新下迭代 ${uniqueIds.join('、')}。这些迭代都已存在于当前 Obsidian 仓库。先预览再实际同步，只处理列出的迭代 ID；不要扩大到其他本地迭代，不要写回禅道，不要运行任何测试或执行 Git 提交。遇到需要用户选择或认证无法恢复时停止，并在最终回复中说明。最终回复按 skill 的简洁汇报要求报告结果，不要包含需求正文、备注、Bug 明细或凭据。`;
  const args = [
    'exec', '--cd', vaultPath, '--skip-git-repo-check',
    '--sandbox', 'danger-full-access', '-c', 'approval_policy="never"',
    '--json', prompt,
  ];

  let child;
  try {
    child = require('node:child_process').spawn(codexPath, args, {
      cwd: vaultPath,
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    });
  } catch (error) {
    new e.Notice(`无法启动禅道同步：${error.message}`, 8000);
    return;
  }

  pmZentaoSyncState.running = true;
  pmZentaoSyncButtons(context);
  new e.Notice(`已在后台启动 ${scope} 的禅道同步`, 5000);

  let pendingLine = '';
  let finalMessage = '';
  let finished = false;
  child.stdout.on('data', (chunk) => {
    pendingLine += chunk.toString('utf8');
    const lines = pendingLine.split('\n');
    pendingLine = lines.pop() ?? '';
    if (pendingLine.length > 1024 * 1024) pendingLine = '';
    for (const line of lines) {
      try {
        const event = JSON.parse(line);
        if (event.type === 'item.completed' && event.item?.type === 'agent_message') {
          finalMessage = String(event.item.text ?? '').slice(0, 12000);
        }
      } catch { /* 忽略非 JSON 输出 */ }
    }
  });
  child.stderr.resume();

  const finish = (title, details) => {
    if (finished) return;
    finished = true;
    pmZentaoSyncState.running = false;
    pmZentaoSyncButtons(context);
    new e.Notice(title, 8000);
    pmZentaoSyncResult(context, title, details);
  };
  child.on('error', (error) => finish(`${scope} 同步启动失败`, error.message));
  child.on('close', (code, signal) => {
    const title = code === 0 ? `${scope} 的 Codex 同步已结束` : `${scope} 的 Codex 同步未完成`;
    finish(title, finalMessage || `Codex 退出码：${code ?? '未知'}${signal ? `，信号：${signal}` : ''}`);
    if (code === 0) {
      window.setTimeout(() => {
        const refresh = context.refreshAfterZentaoSync
          ?? (() => pmRenderProjectsBySystem(context));
        void Promise.resolve(refresh()).catch((error) => {
          console.error('[PM] 禅道同步完成后刷新页面失败', error);
        });
      }, 1000);
    }
  });
}

const pmOriginalRenderProjectCardForSync = pmRenderProjectCard;
pmRenderProjectCard = function pmRenderProjectCardWithSync(context, container, summary, summaries) {
  const childIndex = container.children.length;
  pmOriginalRenderProjectCardForSync(context, container, summary, summaries);
  const id = pmZentaoSyncId(summary.project);
  if (!id) return;
  const card = container.children[childIndex];
  const badges = card?.querySelector('.pm-project-list-badges');
  if (!badges) return;
  card.dataset.zentaoSyncId = id;
  const button = badges.createEl('button', {
    text: pmZentaoSyncState.running ? '同步中…' : '从禅道同步',
    cls: 'pm-zentao-sync-button pm-zentao-sync-card-button',
    attr: { type: 'button', title: `从禅道同步迭代 ${id}` },
  });
  button.disabled = pmZentaoSyncState.running;
  badges.prepend(button);
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    pmStartZentaoSync(context, [id]);
  });
};

const pmOriginalRenderDashboardToolbarForSync = Km;
Km = function pmRenderDashboardToolbarWithSync(context) {
  pmOriginalRenderDashboardToolbarForSync(context);
  context.toolbarEl.addClass('pm-dashboard-toolbar');
  const button = context.toolbarEl.createEl('button', {
    text: pmZentaoSyncState.running ? '同步中…' : '从禅道同步',
    cls: 'pm-zentao-sync-button pm-zentao-sync-toolbar-button',
    attr: { type: 'button', title: '同步当前页面展示的所有迭代' },
  });
  button.disabled = pmZentaoSyncState.running;
  context.toolbarEl.insertBefore(button, context.toolbarEl.children[1] ?? null);
  button.addEventListener('click', () => {
    const ids = [...context.contentEl.querySelectorAll('.pm-project-list-card[data-zentao-sync-id]')]
      .map((card) => card.dataset.zentaoSyncId);
    pmStartZentaoSync(context, ids);
  });
};

const pmOriginalCreateFilterSelectForStyle = pmCreateFilterSelect;
pmCreateFilterSelect = function pmCreateFilterSelectWithIcon(container, label, value, options, onChange) {
  const select = pmOriginalCreateFilterSelectForStyle(container, label, value, options, onChange);
  const field = select.parentElement;
  const icon = field.createSpan({ cls: 'pm-dashboard-filter-icon' });
  const icons = {
    '状态': 'workflow',
    '归档': 'archive',
    '模块': 'boxes',
    '阶段': 'layers',
    '负责人': 'users',
  };
  e.setIcon(icon, icons[label] ?? 'filter');
  field.prepend(icon);
  return select;
};

const pmOriginalRenderProjectToolbarForSync = Um.prototype.renderProjectToolbar;
Um.prototype.renderProjectToolbar = function renderProjectToolbarWithZentaoSync() {
  pmOriginalRenderProjectToolbarForSync.call(this);
  const oldButton = this.toolbarEl.querySelector('button.pm-project-page-refresh');
  if (!oldButton) return;

  const id = pmZentaoSyncId(this.project);
  if (!id) {
    oldButton.remove();
    return;
  }

  const button = oldButton.ownerDocument.createElement('button');
  button.type = 'button';
  button.className = 'pm-zentao-sync-button pm-project-page-zentao-sync';
  button.textContent = pmZentaoSyncState.running ? '同步中…' : '从禅道同步';
  button.title = `从禅道同步迭代 ${id}`;
  button.disabled = pmZentaoSyncState.running;
  button.addEventListener('click', () => {
    const currentId = pmZentaoSyncId(this.project);
    const projectPath = this.project?.filePath;
    const context = {
      plugin: this.plugin,
      toolbarEl: this.toolbarEl,
      contentEl: this.contentEl,
      refreshAfterZentaoSync: async () => {
        if (!projectPath) return;
        await this.plugin.store.reloadProject(projectPath);
        if (this.project?.filePath === projectPath) await this.refreshProject();
      },
    };
    pmStartZentaoSync(context, [currentId]);
  });
  oldButton.replaceWith(button);
};

// 首次打开隐藏标签时视口可能还是 0；不要把表格模块锁定为 0px。
const pmOriginalUpdateIterationStickyOffsetForSync = pmUpdateIterationStickyOffset;
pmUpdateIterationStickyOffset = function updateIterationStickyOffsetWhenVisible(view, stickyHeight, viewportHeight) {
  const actualViewportHeight = view.iterationPageScrollEl?.clientHeight
    || view.contentEl?.clientHeight
    || 0;
  if (actualViewportHeight <= 0) {
    view.contentEl?.style.removeProperty('--pm-iteration-module-height');
    if (!view.pmInitialViewportObserver && typeof ResizeObserver !== 'undefined' && view.iterationPageScrollEl) {
      view.pmInitialViewportObserver = new ResizeObserver(() => {
        const visibleHeight = view.iterationPageScrollEl?.clientHeight
          || view.contentEl?.clientHeight
          || 0;
        if (visibleHeight <= 0) return;
        view.pmInitialViewportObserver?.disconnect();
        view.pmInitialViewportObserver = null;
        pmUpdateIterationStickyOffset(view, view.iterationStickyEl?.offsetHeight, visibleHeight);
      });
      view.pmInitialViewportObserver.observe(view.iterationPageScrollEl);
    }
    return;
  }

  view.pmInitialViewportObserver?.disconnect();
  view.pmInitialViewportObserver = null;
  view.iterationViewportMeasuredHeight = actualViewportHeight;
  view.iterationStickyMeasuredHeight = view.iterationStickyEl?.offsetHeight ?? stickyHeight ?? 0;
  pmOriginalUpdateIterationStickyOffsetForSync(
    view,
    view.iterationStickyMeasuredHeight,
    actualViewportHeight,
  );
};

const pmOriginalCloseProjectViewForSync = Um.prototype.onClose;
Um.prototype.onClose = function closeProjectViewWithViewportCleanup() {
  this.pmInitialViewportObserver?.disconnect();
  this.pmInitialViewportObserver = null;
  return pmOriginalCloseProjectViewForSync.call(this);
};

// 卡片列表跟随迭代页滚动；超过虚拟表格阈值时也挂载全部事项。
const pmIterationCardOriginalVirtualWindow = Np;
Np = function pmIterationCardFullWindow(state) {
  const wrapper = state.wrapper;
  if (wrapper?.closest(`.pm-project-detail-root--table`)
    && wrapper.querySelector(`.pm-table:not(.pmi-pm-table)`)) {
    return { start: 0, end: state.visibleRows.length };
  }
  return pmIterationCardOriginalVirtualWindow(state);
};

// 迭代事项改用卡片后移除表格多选入口，并清理之前留下的选中状态。
pmMountTableMultiSelectToggle = function pmRemoveTableMultiSelectToggle(view) {
  view.contentEl.querySelector(`button.pm-table-multi-select-toggle`)?.remove();
};

const pmIterationCardOriginalSyncMultiSelect = pmSyncTableMultiSelectMode;
pmSyncTableMultiSelectMode = function pmDisableTableMultiSelect(view) {
  if (view.iterationTableMultiSelectMode || view.subview?.state?.selectedTaskIds?.size) {
    view.iterationTableMultiSelectMode = false;
    pmClearTableMultiSelection(view);
  }
  pmIterationCardOriginalSyncMultiSelect(view);
  view.contentEl.querySelector(`button.pm-table-multi-select-toggle`)?.remove();
};

// 类型筛选使用独立的奶油卡片弹层，避免被迭代页面滚动容器裁切。
const pmIterationCardOriginalSingleFilter = projectSingleFilter;
let pmIterationCardCloseTypeMenu = null;
projectSingleFilter = function pmIterationCardTypeFilter(root, iconName, label, current, options, onChange) {
  if (label !== `类型`) {
    return pmIterationCardOriginalSingleFilter(root, iconName, label, current, options, onChange);
  }

  const field = root.createDiv(`pm-iteration-card-type-filter`);
  const icon = field.createSpan(`pm-iteration-card-type-icon`);
  e.setIcon(icon, iconName);
  field.createSpan({ cls: `pm-iteration-card-type-label`, text: label });
  const trigger = field.createEl(`button`, {
    cls: `pm-iteration-card-type-trigger`,
    attr: {
      type: `button`,
      'aria-label': `类型：${options.find((option) => option.id === current)?.label ?? label}`,
      'aria-haspopup': `listbox`,
      'aria-expanded': `false`,
    },
  });
  const value = trigger.createSpan({ text: options.find((option) => option.id === current)?.label ?? label });
  e.setIcon(trigger.createSpan(`pm-iteration-card-type-chevron`), `chevron-down`);
  let menu = null;
  let staleTimer = null;

  const close = (restoreFocus = false) => {
    if (!menu) return;
    menu.remove();
    menu = null;
    trigger.setAttribute(`aria-expanded`, `false`);
    document.removeEventListener(`pointerdown`, onOutsidePointer, true);
    document.removeEventListener(`keydown`, onEscape, true);
    window.removeEventListener(`scroll`, onScroll, true);
    window.removeEventListener(`resize`, onScroll);
    window.clearInterval(staleTimer);
    staleTimer = null;
    if (pmIterationCardCloseTypeMenu === close) pmIterationCardCloseTypeMenu = null;
    if (restoreFocus && trigger.isConnected) trigger.focus();
  };
  const onOutsidePointer = (event) => {
    if (!field.contains(event.target) && !menu?.contains(event.target)) close();
  };
  const onEscape = (event) => {
    if (event.key !== `Escape`) return;
    event.preventDefault();
    close(true);
  };
  const onScroll = () => close();

  trigger.addEventListener(`click`, () => {
    if (menu) {
      close();
      return;
    }
    pmIterationCardCloseTypeMenu?.();
    for (const menu of root.querySelectorAll(`.pm-insight-project-filter-menu[open]`)) {
      menu.open = false;
    }
    menu = document.createElement(`div`);
    menu.className = `pm-iteration-card-type-menu`;
    menu.setAttribute(`role`, `listbox`);
    menu.setAttribute(`aria-label`, label);
    for (const option of options) {
      const item = document.createElement(`button`);
      item.type = `button`;
      item.className = `pm-iteration-card-type-option`;
      item.textContent = option.label;
      item.setAttribute(`role`, `option`);
      item.setAttribute(`aria-selected`, String(option.id === current));
      item.addEventListener(`click`, () => {
        current = option.id;
        value.textContent = option.label;
        trigger.setAttribute(`aria-label`, `类型：${option.label}`);
        close();
        onChange(option.id);
      });
      menu.appendChild(item);
    }
    document.body.appendChild(menu);
    const anchor = field.getBoundingClientRect();
    const width = Math.min(Math.max(anchor.width, 180), window.innerWidth - 24);
    const height = menu.offsetHeight;
    const left = Math.max(12, Math.min(anchor.left, window.innerWidth - width - 12));
    const below = anchor.bottom + 8;
    const top = below + height <= window.innerHeight - 12
      ? below
      : Math.max(12, anchor.top - height - 8);
    menu.style.width = `${width}px`;
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    trigger.setAttribute(`aria-expanded`, `true`);
    pmIterationCardCloseTypeMenu = close;
    document.addEventListener(`pointerdown`, onOutsidePointer, true);
    document.addEventListener(`keydown`, onEscape, true);
    window.addEventListener(`scroll`, onScroll, true);
    window.addEventListener(`resize`, onScroll);
    staleTimer = window.setInterval(() => {
      if (!field.isConnected) close();
    }, 250);
    menu.querySelector(`[aria-selected="true"]`)?.focus();
  });
  return field;
};

// 卡片视图按项目原有事项顺序展示，不保留隐藏的表头排序状态。
const pmIterationCardNoSortPreviousRefreshTable = Mp;
Mp = function pmIterationCardRefreshWithoutSort(context) {
  if (context.state.wrapper?.closest(`.pm-project-detail-root--table`)) {
    context.state.sortKey = `none`;
    context.state.sortDir = `asc`;
  }
  return pmIterationCardNoSortPreviousRefreshTable(context);
};

// 折叠时只移走当前需求的子行，展开时复用这些节点；完整刷新后丢弃旧节点缓存。
const pmIterationCardFullRefresh = Mp;
Mp = function pmIterationCardRefreshWithFreshRows(context) {
  context.state.pmIterationCollapsedRows = new Map();
  return pmIterationCardFullRefresh(context);
};

function pmIterationCardUpdateEnd(row, visibleRows, index) {
  const next = visibleRows[index + 1];
  const isEnd = !next || next.depth === 0;
  row.toggleClass(`pm-iteration-card-end`, isEnd);
  row.toggleClass(`pm-iteration-card-single`, row.hasClass(`pm-iteration-card-start`) && isEnd);
}

const pmIterationCardRenderRowBeforeFastCollapse = Cp;
Cp = function pmIterationCardRenderFastCollapseRow(container, task, depth, context, groupTone = `a`) {
  pmIterationCardRenderRowBeforeFastCollapse(container, task, depth, context, groupTone);
  const row = container.lastElementChild;
  const toggle = row?.querySelector(`.pm-collapse-toggle`);
  if (!(row instanceof HTMLTableRowElement) || !(toggle instanceof HTMLElement)) return;

  toggle.addEventListener(`click`, (event) => {
    const state = context.state;
    const taskId = String(task.id ?? ``);
    if (!state.wrapper?.closest(`.pm-project-detail-root--table`)
      || !state.tableBody?.contains(row)
      || state.windowStart !== 0
      || state.windowEnd !== state.visibleRows.length
      || (Ed(state.filter) && task.collapsed && !state.pmIterationCollapsedRows?.has(taskId))) return;

    const index = state.visibleRows.findIndex((item) => item.task.id === task.id);
    if (index < 0) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const collapsedRows = state.pmIterationCollapsedRows ?? new Map();
    state.pmIterationCollapsedRows = collapsedRows;

    if (!task.collapsed) {
      let end = index + 1;
      while (end < state.visibleRows.length && state.visibleRows[end].depth > depth) end++;
      const rows = state.visibleRows.splice(index + 1, end - index - 1);
      const fragment = row.ownerDocument.createDocumentFragment();
      let sibling = row.nextElementSibling;
      for (let count = 0; count < rows.length && sibling; count++) {
        const next = sibling.nextElementSibling;
        fragment.appendChild(sibling);
        sibling = next;
      }
      collapsedRows.set(taskId, { rows, fragment });
      task.collapsed = true;
    } else {
      const cached = collapsedRows.get(taskId);
      const rows = cached?.rows ?? q(task.subtasks, depth + 1, task.id)
        .filter((item) => item.visible)
        .map((item) => ({ ...item, groupTone }));
      state.visibleRows.splice(index + 1, 0, ...rows);
      state.pmIterationCardRowsReference = null;
      if (cached) {
        row.after(cached.fragment);
        collapsedRows.delete(taskId);
      } else {
        const rendered = row.ownerDocument.createElement(`tbody`);
        for (const item of rows) {
          Cp(rendered, item.task, item.depth, context, item.groupTone ?? groupTone);
        }
        row.after(...rendered.children);
      }
      task.collapsed = false;
    }

    toggle.toggleClass(`is-collapsed`, task.collapsed);
    toggle.setAttribute(`aria-label`, task.collapsed ? `展开子任务` : `折叠子任务`);
    pmIterationCardUpdateEnd(row, state.visibleRows, index);
    state.pmIterationCardRowsReference = null;
    state.windowStart = 0;
    state.windowEnd = state.visibleRows.length;

    const manuallyCollapsed = state.pmIterationManuallyCollapsedTaskIds ?? new Set();
    state.pmIterationManuallyCollapsedTaskIds = manuallyCollapsed;
    if (task.collapsed) manuallyCollapsed.add(taskId);
    else manuallyCollapsed.delete(taskId);

    state.pmIterationCollapseSave = (state.pmIterationCollapseSave ?? Promise.resolve())
      .catch(() => {})
      .then(() => context.plugin.persistCollapsedState(context.project));
    void state.pmIterationCollapseSave.catch((error) => {
      console.error(`[PM] 保存折叠状态失败：`, error);
      context.plugin.showNotice(`保存折叠状态失败，请重试。`);
    });
  }, true);
};

// 迭代页不展示阶段和状态筛选；重绘筛选栏时也清除已有的隐藏条件。
const pmIterationFilterBarViews = new WeakMap();
const pmIterationCardOriginalFilterBarRender = Bm.prototype.render;
Bm.prototype.render = function pmIterationCardRenderFilterBar() {
  const isProjectDetail = Boolean(this.el.closest(`.pm-project-detail-root`));
  if (isProjectDetail) {
    this.props.filter.stages = [];
    this.props.filter.statuses = [];
  }

  pmIterationCardOriginalFilterBarRender.call(this);
  if (!isProjectDetail) return;

  for (const label of [`阶段`, `状态`]) {
    this.el.querySelector(`summary[aria-label="按${label}筛选"]`)
      ?.closest(`details.pm-insight-project-filter-menu`)?.remove();
  }

  const search = this.el.querySelector(`.pm-insight-filter-search`);
  const originalInput = search?.querySelector(`input.pm-insight-filter-search-input`);
  if (!(search instanceof HTMLElement) || !(originalInput instanceof HTMLInputElement)) return;

  // 原输入框绑定了 input 即刷新；替换节点后只在点击按钮或按回车时提交。
  const input = originalInput.cloneNode();
  input.value = originalInput.value;
  originalInput.replaceWith(input);
  const submit = () => {
    const text = input.value.trim();
    if (text === this.props.filter.text) return;
    this.props.filter.text = text;
    this.props.onFilterChange();
    this.updateClearButton();
  };
  input.addEventListener(`keydown`, (event) => {
    if (event.key !== `Enter` || event.isComposing) return;
    event.preventDefault();
    submit();
  });

  const searchRow = this.el.createDiv(`pm-iteration-search-row`);
  const filterRow = this.el.createDiv(`pm-iteration-secondary-filters`);
  searchRow.appendChild(search);
  const searchButton = searchRow.createEl(`button`, {
    cls: `pm-iteration-search-submit`,
    text: `查找`,
    attr: { type: `button` },
  });
  searchButton.addEventListener(`click`, submit);
  if (this.clearBtn?.el) searchRow.appendChild(this.clearBtn.el);
  for (const child of Array.from(this.el.children)) {
    if (child !== searchRow && child !== filterRow) filterRow.appendChild(child);
  }

  const view = pmIterationFilterBarViews.get(this);
  if (view) {
    pmMountIterationViewSwitcher(view);
    pmMountIterationFilterLayout(view);
  }
};

const pmIterationCardOriginalRenderClearButton = Bm.prototype.renderClearButton;
Bm.prototype.renderClearButton = function pmIterationCardRenderClearButton() {
  pmIterationCardOriginalRenderClearButton.call(this);
  if (!this.el.closest(`.pm-project-detail-root`)) return;

  const button = this.clearBtn?.el;
  if (!(button instanceof HTMLButtonElement)) return;
  button.disabled = false;
  button.addEventListener(`click`, (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.props.onClear();
    this.render();
  }, true);
};

const pmIterationCardOriginalUpdateClearButton = Bm.prototype.updateClearButton;
Bm.prototype.updateClearButton = function pmIterationCardUpdateClearButton() {
  pmIterationCardOriginalUpdateClearButton.call(this);
  const searchRow = this.el.querySelector(`.pm-iteration-search-row`);
  if (searchRow && this.clearBtn?.el) searchRow.appendChild(this.clearBtn.el);
};

const pmIterationCardOriginalMountFilterLayout = pmMountIterationFilterLayout;
pmMountIterationFilterLayout = function pmIterationCardMountFilterLayout(view) {
  pmIterationCardOriginalMountFilterLayout(view);
  if (view.header?.filterRow) pmIterationFilterBarViews.set(view.header.filterRow, view);
  const filterRow = view.contentEl.querySelector(`.pm-project-header-filter`);
  const searchRow = filterRow?.querySelector(`.pm-iteration-search-row`);
  const secondaryFilters = filterRow?.querySelector(`.pm-iteration-secondary-filters`);
  const right = filterRow?.querySelector(`.pm-iteration-filter-layout-right`);
  if (searchRow && right && right.parentElement !== searchRow) searchRow.appendChild(right);
  const typeFilter = filterRow?.querySelector(`.pm-iteration-card-type-filter`);
  if (secondaryFilters && typeFilter && typeFilter.parentElement !== secondaryFilters) {
    secondaryFilters.appendChild(typeFilter);
  }
};

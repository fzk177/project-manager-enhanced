'use strict'

// 项目首页扩展运行在 Project Manager Enhanced 主模块闭包内，可复用项目存储和事项弹窗能力。
const pmDashboardState = {
  selectedSystem: 'all',
  projectSearch: '',
  projectStatus: 'all',
  archiveStatus: 'unarchived',
  riskOnly: false,
  collapsedSystems: new Set(),
  expandedProjectId: null,
  requirementFilters: new Map(),
};
const PM_DASHBOARD_DATES_SETTING = 'dashboardIterationDates';
const PM_ARCHIVED_PROJECTS_SETTING = 'dashboardArchivedProjects';
const PM_MEMBER_ROLES_SETTING = 'dashboardMemberRoles';
const PM_TESTING_DATE_FIELD = 'testingDate';
const PM_PLANNED_RELEASE_DATE_FIELD = 'plannedReleaseDate';
const PM_MEMBER_ROLE_DEFINITIONS = [
  { id: 'project-management', label: '项目管理' },
  { id: 'product-manager', label: '产品经理' },
  { id: 'frontend-development', label: '前端开发' },
  { id: 'backend-development', label: '后端开发' },
  { id: 'testing', label: '测试' },
];
const PM_REQUIREMENT_METRIC_LABELS = {
  all: '全部需求',
  completed: '已完成',
  unfinished: '未完成',
  'high-priority': '高优先级',
  overdue: '已延期',
  'due-soon': '本周到期',
};

/**
 * 项目面板按项目所在的一级目录归属系统分组，并保留目录编号用于稳定排序。
 */
function pmSystemGroupLabel(project, projectsFolder) {
  const projectPath = String(project.filePath ?? '').replace(/\\/g, '/');
  const root = String(projectsFolder ?? '').replace(/^[/\\]+|[/\\]+$/g, '').replace(/\\/g, '/');
  const relativePath = root && projectPath.startsWith(`${root}/`)
    ? projectPath.slice(root.length + 1)
    : projectPath;
  return relativePath.split('/').filter(Boolean)[0] ?? '未分类';
}

/**
 * 首页只统计禅道需求，避免把需求下的开发、测试任务重复计入进度。
 */
function pmProjectRequirements(project) {
  return q(project.tasks)
    .map((entry) => entry.task)
    .filter((task) => {
      const sourceType = String(task.customFields?.zentaoSourceType ?? '');
      return sourceType === 'story' || (task.tags ?? []).includes('zentao-requirement');
    });
}

function pmProjectIterationId(project) {
  const projectIdMatch = String(project.id ?? '').match(/(?:zentao-)?execution-(\d+)$/u);
  const titleIdMatch = String(project.title ?? '').match(/#(\d+)/u);
  const matchedId = projectIdMatch?.[1] ?? titleIdMatch?.[1];
  return matchedId ? Number.parseInt(matchedId, 10) : Number.NEGATIVE_INFINITY;
}

function pmRequirementCompleted(task) {
  const status = String(task.status ?? '').toLocaleLowerCase('en-US');
  return Boolean(task.completed)
    || Number(task.progress ?? 0) >= 100
    || ['done', 'closed', 'cancel', 'cancelled', 'canceled'].includes(status);
}

function pmValidDate(value) {
  const date = String(value ?? '').trim();
  return /^\d{4}-\d{2}-\d{2}$/u.test(date) ? date : '';
}

function pmDaysFromToday(value) {
  const date = pmValidDate(value);
  if (!date) return null;

  const today = new Date(`${Zl().toString()}T00:00:00`);
  const target = new Date(`${date}T00:00:00`);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function pmRequirementOverdue(task) {
  const days = pmDaysFromToday(task.due);
  return !pmRequirementCompleted(task) && days !== null && days < 0;
}

function pmRequirementDueSoon(task) {
  const days = pmDaysFromToday(task.due);
  return !pmRequirementCompleted(task) && days !== null && days >= 0 && days <= 7;
}

function pmProjectStatusInfo(project, requirementTotal, requirementDone) {
  const status = String(project.status ?? '').trim().toLocaleLowerCase('en-US');
  if (['done', 'closed'].includes(status) || (requirementTotal > 0 && requirementDone === requirementTotal)) {
    return { key: 'completed', label: '已完成', rank: 2 };
  }
  if (['wait', 'waiting', 'draft', 'planned'].includes(status)) {
    return { key: 'pending', label: '未开始', rank: 1 };
  }
  if (['pause', 'paused', 'suspended'].includes(status)) {
    return { key: 'paused', label: '已暂停', rank: 1 };
  }
  return { key: 'active', label: '进行中', rank: 0 };
}

function pmFormatDate(value) {
  const date = pmValidDate(value);
  return date ? date.replace(/-/g, '/') : '--';
}

function pmFormatUpdatedAt(value) {
  const date = new Date(String(value ?? ''));
  if (Number.isNaN(date.getTime())) return '--';

  const difference = Date.now() - date.getTime();
  if (difference >= 0 && difference < 60 * 60 * 1000) return `${Math.max(1, Math.floor(difference / 60000))}分钟前`;
  if (difference >= 0 && difference < 24 * 60 * 60 * 1000) return `${Math.floor(difference / 3600000)}小时前`;
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
}

function pmValidMemberRoles(roles) {
  const validRoleIds = new Set(PM_MEMBER_ROLE_DEFINITIONS.map((role) => role.id));
  return [...new Set(Array.isArray(roles) ? roles : [])]
    .filter((role) => validRoleIds.has(role));
}

function pmMemberRoleStore(context) {
  const storedRoles = context.plugin.settings[PM_MEMBER_ROLES_SETTING];
  if (!storedRoles || typeof storedRoles !== 'object' || Array.isArray(storedRoles)) {
    return { global: {}, projects: {} };
  }

  return {
    global: storedRoles.global && typeof storedRoles.global === 'object' && !Array.isArray(storedRoles.global)
      ? storedRoles.global
      : {},
    projects: storedRoles.projects && typeof storedRoles.projects === 'object' && !Array.isArray(storedRoles.projects)
      ? storedRoles.projects
      : {},
  };
}

async function pmSaveMemberRoleStore(context, store) {
  context.plugin.settings[PM_MEMBER_ROLES_SETTING] = store;
  await context.plugin.saveSettings();
}

function pmAddMemberValue(members, value) {
  if (Array.isArray(value)) {
    for (const item of value) pmAddMemberValue(members, item);
    return;
  }
  if (value && typeof value === 'object') {
    pmAddMemberValue(members, value.realname ?? value.name ?? value.account ?? '');
    return;
  }

  const member = String(value ?? '').trim();
  if (member) members.add(member);
}

/**
 * 迭代参与人员同时取团队成员、事项负责人和事项完成者，并统一去重。
 */
function pmProjectMembers(project) {
  const members = new Set();
  pmAddMemberValue(members, project.teamMembers ?? []);
  for (const { task } of q(project.tasks)) {
    pmAddMemberValue(members, task.assignees ?? []);
    pmAddMemberValue(members, task.completedBy);
    pmAddMemberValue(members, task.customFields?.completedBy);
  }
  return [...members].sort((left, right) => left.localeCompare(right, 'zh-CN'));
}

function pmEffectiveMemberRoles(context, project, member) {
  const store = pmMemberRoleStore(context);
  const projectRoles = store.projects[project.id];
  if (projectRoles && Object.prototype.hasOwnProperty.call(projectRoles, member)) {
    return pmValidMemberRoles(projectRoles[member]);
  }
  return pmValidMemberRoles(store.global[member]);
}

function pmProjectMembersByRole(context, project) {
  const result = {
    'project-management': [],
    'product-manager': [],
    'frontend-development': [],
    'backend-development': [],
    testing: [],
    unmarked: [],
  };
  for (const member of pmProjectMembers(project)) {
    const roles = pmEffectiveMemberRoles(context, project, member);
    if (roles.length === 0) result.unmarked.push(member);
    for (const role of roles) result[role].push(member);
  }
  return result;
}

/**
 * 汇总卡片和顶部概览所需的数据，所有风险指标均以未完成需求为口径。
 */
function pmProjectSummary(context, project, system) {
  const requirements = pmProjectRequirements(project);
  const completed = requirements.filter(pmRequirementCompleted);
  const unfinished = requirements.filter((task) => !pmRequirementCompleted(task));
  const overdue = unfinished.filter(pmRequirementOverdue);
  const dueSoon = unfinished.filter(pmRequirementDueSoon);
  const highPriority = unfinished.filter((task) => ['critical', 'high'].includes(String(task.priority ?? '').toLocaleLowerCase('en-US')));
  const startDates = requirements.map((task) => pmValidDate(task.start)).filter(Boolean).sort();
  const dueDates = requirements.map((task) => pmValidDate(task.due)).filter(Boolean).sort();
  const status = pmProjectStatusInfo(project, requirements.length, completed.length);

  return {
    project,
    system,
    archived: pmProjectArchived(context, project),
    iterationId: pmProjectIterationId(project),
    requirements,
    total: requirements.length,
    completed: completed.length,
    unfinished: unfinished.length,
    overdue: overdue.length,
    dueSoon: dueSoon.length,
    highPriority: highPriority.length,
    start: startDates[0] ?? '',
    due: dueDates[dueDates.length - 1] ?? '',
    status,
    progress: requirements.length ? Math.round(completed.length / requirements.length * 100) : 0,
  };
}

function pmArchivedProjectStore(context) {
  const storedProjects = context.plugin.settings[PM_ARCHIVED_PROJECTS_SETTING];
  return storedProjects && typeof storedProjects === 'object' && !Array.isArray(storedProjects)
    ? storedProjects
    : {};
}

function pmProjectArchived(context, project) {
  return pmArchivedProjectStore(context)[project.id] === true;
}

async function pmSetProjectArchived(context, project, archived) {
  const archivedProjects = pmArchivedProjectStore(context);
  if (archived) archivedProjects[project.id] = true;
  else delete archivedProjects[project.id];
  context.plugin.settings[PM_ARCHIVED_PROJECTS_SETTING] = archivedProjects;
  await context.plugin.saveSettings();
}

/**
 * 手工维护的迭代日期独立保存在插件配置中，禅道同步项目文件时不会覆盖这些值。
 */
function pmProjectManualDates(context, project) {
  const settings = context.plugin.settings;
  const storedDates = settings[PM_DASHBOARD_DATES_SETTING];
  if (!storedDates || typeof storedDates !== 'object' || Array.isArray(storedDates)) return {};
  const projectDates = storedDates[project.id];
  return projectDates && typeof projectDates === 'object' && !Array.isArray(projectDates) ? projectDates : {};
}

async function pmSaveProjectManualDate(context, project, field, value) {
  const settings = context.plugin.settings;
  const storedDates = settings[PM_DASHBOARD_DATES_SETTING];
  const dateStore = storedDates && typeof storedDates === 'object' && !Array.isArray(storedDates)
    ? storedDates
    : {};
  const current = dateStore[project.id] && typeof dateStore[project.id] === 'object'
    ? dateStore[project.id]
    : {};

  dateStore[project.id] = { ...current, [field]: pmValidDate(value) };
  settings[PM_DASHBOARD_DATES_SETTING] = dateStore;
  await context.plugin.saveSettings();
}

function pmRenderProjectManualDate(context, container, project, label, field) {
  const dateField = container.createDiv('pm-project-manual-date');
  dateField.createSpan({ text: label, cls: 'pm-project-manual-date-label' });
  const input = dateField.createEl('input', {
    type: 'date',
    cls: 'pm-project-manual-date-input',
    attr: { 'aria-label': label },
  });
  input.value = pmValidDate(pmProjectManualDates(context, project)[field]);

  // 日期控件位于可点击卡片内，需要阻止交互事件触发需求展开。
  for (const eventName of ['click', 'mousedown', 'keydown']) {
    dateField.addEventListener(eventName, (event) => event.stopPropagation());
  }
  input.addEventListener('change', () => {
    void pmSaveProjectManualDate(context, project, field, input.value).catch((error) => {
      console.error(`[PM] 保存${label}失败：`, error);
      context.plugin.showNotice(`${label}保存失败，请稍后重试。`);
    });
  });
}

function pmDefinitionLabel(context, project, type, id) {
  const value = String(id ?? '').trim();
  if (!value) return '--';

  const definitions = context.plugin.store.configFor(project)?.[type] ?? [];
  return definitions.find((definition) => definition.id === value)?.label ?? value;
}

function pmDefaultRequirementFilter() {
  return {
    search: '',
    module: 'all',
    stage: 'all',
    status: 'all',
    assignee: 'all',
    unfinishedOnly: false,
    overdueOnly: false,
    quickMetric: 'all',
  };
}

function pmRequirementFilter(projectId) {
  const existing = pmDashboardState.requirementFilters.get(projectId);
  if (existing) {
    existing.quickMetric ??= 'all';
    return existing;
  }

  const created = pmDefaultRequirementFilter();
  pmDashboardState.requirementFilters.set(projectId, created);
  return created;
}

function pmApplyRequirementMetric(context, summary, summaries, metric) {
  const filter = pmRequirementFilter(summary.project.id);
  Object.assign(filter, pmDefaultRequirementFilter(), { quickMetric: metric });
  pmDashboardState.expandedProjectId = summary.project.id;
  pmRenderDashboard(context, summaries);
}

function pmCreateFilterSelect(container, label, value, options, onChange) {
  const field = container.createDiv('pm-dashboard-filter-field');
  field.createSpan({ text: label, cls: 'pm-dashboard-filter-label' });
  const select = field.createEl('select', { cls: 'pm-dashboard-select' });
  for (const option of options) {
    const optionElement = select.createEl('option', { text: option.label });
    optionElement.value = option.value;
  }
  select.value = value;
  select.addEventListener('change', () => onChange(select.value));
  return select;
}

function pmCreateToggle(container, label, checked, onChange) {
  const toggle = container.createEl('label', { cls: 'pm-dashboard-check' });
  const input = toggle.createEl('input', { type: 'checkbox' });
  input.checked = checked;
  toggle.createSpan({ text: label });
  input.addEventListener('change', () => onChange(input.checked));
}

function pmRenderMemberRoleChoices(container, getRoles, onChange, disabled = false) {
  for (const role of PM_MEMBER_ROLE_DEFINITIONS) {
    const choice = container.createEl('label', {
      cls: `pm-member-role-choice pm-member-role-choice--${role.id}`,
    });
    const input = choice.createEl('input', { type: 'checkbox' });
    input.checked = getRoles().includes(role.id);
    input.disabled = disabled;
    choice.createSpan({ text: role.label });
    input.addEventListener('change', () => {
      const nextRoles = new Set(getRoles());
      if (input.checked) nextRoles.add(role.id);
      else nextRoles.delete(role.id);
      onChange(pmValidMemberRoles([...nextRoles]));
    });
  }
}

function pmRoleLabels(roles) {
  const roleIds = new Set(pmValidMemberRoles(roles));
  const labels = PM_MEMBER_ROLE_DEFINITIONS
    .filter((role) => roleIds.has(role.id))
    .map((role) => role.label);
  return labels.length > 0 ? labels.join('、') : '未配置';
}

/**
 * 全局人员角色作为默认值跨迭代复用，迭代内没有覆盖时自动继承。
 */
async function pmOpenGlobalMemberRoles(context) {
  const projects = await context.plugin.store.loadAllProjects(context.plugin.settings.projectsFolder);
  const store = pmMemberRoleStore(context);
  const draftGlobal = {};
  for (const [member, roles] of Object.entries(store.global)) {
    const validRoles = pmValidMemberRoles(roles);
    if (validRoles.length > 0) draftGlobal[member] = validRoles;
  }

  const members = new Set(Object.keys(store.global));
  for (const project of projects) {
    for (const member of pmProjectMembers(project)) members.add(member);
  }
  for (const projectRoles of Object.values(store.projects)) {
    if (!projectRoles || typeof projectRoles !== 'object' || Array.isArray(projectRoles)) continue;
    for (const member of Object.keys(projectRoles)) members.add(member);
  }
  const sortedMembers = [...members].filter(Boolean)
    .sort((left, right) => left.localeCompare(right, 'zh-CN'));

  const modal = new e.Modal(context.plugin.app);
  modal.setTitle('人员角色管理');
  modal.modalEl.addClass('pm-member-role-modal');
  modal.onOpen = () => {
    const content = modal.contentEl;
    content.empty();
    content.createEl('p', {
      text: '设置人员的默认角色。人员可以同时拥有多个角色，项目中的单独配置会覆盖这里的默认值。',
      cls: 'pm-member-role-description',
    });

    const header = content.createDiv('pm-member-role-header');
    header.createSpan({ text: '人员' });
    header.createSpan({ text: '默认角色' });
    header.createSpan({ text: '标记状态' });

    const list = content.createDiv('pm-member-role-list');
    if (sortedMembers.length === 0) {
      list.createDiv({ text: '当前没有可配置的团队成员', cls: 'pm-member-role-empty' });
    }
    for (const member of sortedMembers) {
      const row = list.createDiv('pm-member-role-row');
      row.createSpan({ text: member, cls: 'pm-member-role-name' });
      const choices = row.createDiv('pm-member-role-choices');
      const status = row.createSpan({ cls: 'pm-member-role-state' });
      const getRoles = () => pmValidMemberRoles(draftGlobal[member]);
      const updateStatus = () => {
        const marked = getRoles().length > 0;
        status.setText(marked ? '已标记' : '未标记');
        status.toggleClass('is-unmarked', !marked);
      };
      pmRenderMemberRoleChoices(choices, getRoles, (roles) => {
        if (roles.length > 0) draftGlobal[member] = roles;
        else delete draftGlobal[member];
        updateStatus();
      });
      updateStatus();
    }

    const footer = content.createDiv('pm-member-role-footer');
    new e.ButtonComponent(footer).setButtonText('取消').onClick(() => modal.close());
    new e.ButtonComponent(footer).setButtonText('保存').setCta().onClick(Y(async () => {
      await pmSaveMemberRoleStore(context, { ...store, global: draftGlobal });
      modal.close();
      await pmRenderProjectsBySystem(context);
    }));
  };
  modal.onClose = () => modal.contentEl.empty();
  modal.open();
}

/**
 * 迭代角色默认继承全局配置；关闭继承后，当前迭代的角色集合完全覆盖默认值。
 */
function pmOpenProjectMemberRoles(context, project) {
  const store = pmMemberRoleStore(context);
  const storedOverrides = store.projects[project.id];
  const draftOverrides = {};
  if (storedOverrides && typeof storedOverrides === 'object' && !Array.isArray(storedOverrides)) {
    for (const [member, roles] of Object.entries(storedOverrides)) {
      draftOverrides[member] = pmValidMemberRoles(roles);
    }
  }
  const members = pmProjectMembers(project);

  const modal = new e.Modal(context.plugin.app);
  modal.setTitle(`${project.title} · 成员角色`);
  modal.modalEl.addClass('pm-member-role-modal', 'pm-project-member-role-modal');
  modal.onOpen = () => {
    const content = modal.contentEl;
    content.empty();
    content.createEl('p', {
      text: '默认继承全局人员角色；取消继承后，可为当前迭代单独指定角色。',
      cls: 'pm-member-role-description',
    });

    const header = content.createDiv('pm-member-role-header pm-project-member-role-header');
    header.createSpan({ text: '人员' });
    header.createSpan({ text: '全局默认角色' });
    header.createSpan({ text: '本迭代角色' });
    header.createSpan({ text: '继承默认' });

    const list = content.createDiv('pm-member-role-list');
    if (members.length === 0) {
      list.createDiv({ text: '当前迭代没有可配置的团队成员', cls: 'pm-member-role-empty' });
    }
    for (const member of members) {
      const row = list.createDiv('pm-member-role-row pm-project-member-role-row');
      row.createSpan({ text: member, cls: 'pm-member-role-name' });
      row.createSpan({
        text: pmRoleLabels(store.global[member]),
        cls: 'pm-member-role-default',
      });
      const choices = row.createDiv('pm-member-role-choices');
      const inherit = row.createEl('label', { cls: 'pm-member-role-inherit' });
      const inheritInput = inherit.createEl('input', { type: 'checkbox' });
      inherit.createSpan({ text: '继承' });

      const hasOverride = () => Object.prototype.hasOwnProperty.call(draftOverrides, member);
      const getRoles = () => hasOverride()
        ? pmValidMemberRoles(draftOverrides[member])
        : pmValidMemberRoles(store.global[member]);
      const renderChoices = () => {
        choices.empty();
        pmRenderMemberRoleChoices(choices, getRoles, (roles) => {
          draftOverrides[member] = roles;
        }, !hasOverride());
        inheritInput.checked = !hasOverride();
      };
      inheritInput.addEventListener('change', () => {
        if (inheritInput.checked) delete draftOverrides[member];
        else draftOverrides[member] = pmValidMemberRoles(store.global[member]);
        renderChoices();
      });
      renderChoices();
    }

    const footer = content.createDiv('pm-member-role-footer');
    new e.ButtonComponent(footer).setButtonText('取消').onClick(() => modal.close());
    new e.ButtonComponent(footer).setButtonText('保存').setCta().onClick(Y(async () => {
      const projects = { ...store.projects };
      if (Object.keys(draftOverrides).length > 0) projects[project.id] = draftOverrides;
      else delete projects[project.id];
      await pmSaveMemberRoleStore(context, { ...store, projects });
      modal.close();
      await pmRenderProjectsBySystem(context);
    }));
  };
  modal.onClose = () => modal.contentEl.empty();
  modal.open();
}

async function pmOpenProject(context, project) {
  const file = context.plugin.app.vault.getAbstractFileByPath(project.filePath);
  if (file instanceof e.TFile) await context.openProjectFile(file);
}

async function pmOpenRequirement(context, project, task) {
  await pmOpenProject(context, project);
  Q(context.plugin, project, {
    task,
    onSave: async () => {
      context.plugin.refreshProjectViews();
    },
  });
}

function pmRenderDashboardSummary(container, summaries) {
  const active = summaries.filter((summary) => summary.status.key === 'active').length;
  const risky = summaries.filter((summary) => summary.overdue > 0).length;
  const unfinished = summaries.reduce((total, summary) => total + summary.unfinished, 0);
  const dueSoon = summaries.reduce((total, summary) => total + summary.dueSoon, 0);
  const overview = container.createDiv('pm-dashboard-overview');
  const items = [
    ['全部迭代', summaries.length],
    ['进行中', active],
    ['存在延期', risky],
    ['未完成需求', unfinished],
    ['本周到期', dueSoon],
  ];

  for (const [label, value] of items) {
    const item = overview.createDiv('pm-dashboard-overview-item');
    item.createSpan({ text: String(value), cls: 'pm-dashboard-overview-value' });
    item.createSpan({ text: label, cls: 'pm-dashboard-overview-label' });
  }
}

function pmRenderDashboardFilters(context, container, summaries, scopedSummaries, systemLabels) {
  const toolbar = container.createDiv('pm-dashboard-controls');
  const systems = toolbar.createDiv('pm-dashboard-systems');
  const systemOptions = [
    { id: 'all', label: '全部', count: scopedSummaries.length },
    ...systemLabels.map((label) => ({
      id: label,
      label,
      count: scopedSummaries.filter((summary) => summary.system === label).length,
    })),
  ];

  for (const option of systemOptions) {
    const button = systems.createEl('button', {
      text: `${option.label} ${option.count}`,
      cls: `pm-dashboard-system${pmDashboardState.selectedSystem === option.id ? ' is-active' : ''}`,
      attr: { type: 'button' },
    });
    button.addEventListener('click', () => {
      pmDashboardState.selectedSystem = option.id;
      pmRenderDashboard(context, summaries);
    });
  }

  const filters = toolbar.createDiv('pm-dashboard-global-filters');
  const search = filters.createEl('input', {
    type: 'search',
    value: pmDashboardState.projectSearch,
    placeholder: '搜索迭代，按 Enter 筛选',
    cls: 'pm-dashboard-search',
  });
  const applySearch = () => {
    const nextValue = search.value.trim();
    if (nextValue === pmDashboardState.projectSearch) return;
    pmDashboardState.projectSearch = nextValue;
    pmRenderDashboard(context, summaries);
  };
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') applySearch();
  });
  search.addEventListener('search', applySearch);

  pmCreateFilterSelect(filters, '状态', pmDashboardState.projectStatus, [
    { value: 'all', label: '全部状态' },
    { value: 'active', label: '进行中' },
    { value: 'pending', label: '未开始' },
    { value: 'paused', label: '已暂停' },
    { value: 'completed', label: '已完成' },
  ], (value) => {
    pmDashboardState.projectStatus = value;
    pmRenderDashboard(context, summaries);
  });

  pmCreateToggle(filters, '只看风险', pmDashboardState.riskOnly, (checked) => {
    pmDashboardState.riskOnly = checked;
    pmRenderDashboard(context, summaries);
  });

  pmCreateFilterSelect(filters, '归档', pmDashboardState.archiveStatus, [
    { value: 'all', label: '全部项目' },
    { value: 'unarchived', label: '未归档项目' },
    { value: 'archived', label: '已归档项目' },
  ], (value) => {
    pmDashboardState.archiveStatus = value;
    pmRenderDashboard(context, summaries);
  });
}

function pmRenderProjectMetric(container, label, value, metricId, active, onClick, warning = false) {
  const metric = container.createEl('button', {
    cls: `pm-project-list-metric${warning ? ' is-warning' : ''}${active ? ' is-active' : ''}`,
    attr: {
      type: 'button',
      'aria-pressed': String(active),
      'aria-label': `筛选${label}需求，共${value}个`,
    },
  });
  metric.createSpan({ text: String(value), cls: 'pm-project-list-metric-value' });
  metric.createSpan({ text: label, cls: 'pm-project-list-metric-label' });
  metric.addEventListener('click', (event) => {
    event.stopPropagation();
    onClick(metricId);
  });
}

function pmRenderProjectCard(context, container, summary, summaries) {
  const expanded = pmDashboardState.expandedProjectId === summary.project.id;
  const card = container.createDiv(`pm-project-list-card${expanded ? ' is-expanded' : ''}${summary.archived ? ' is-archived' : ''}`);
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-expanded', String(expanded));
  card.style.setProperty('--pm-project-color', summary.project.color || 'var(--interactive-accent)');

  const heading = card.createDiv('pm-project-list-heading');
  const titleArea = heading.createDiv('pm-project-list-title-area');
  titleArea.createSpan({ text: summary.project.icon || '📋', cls: 'pm-project-list-icon' });
  titleArea.createEl('h3', { text: summary.project.title, cls: 'pm-project-list-title' });
  const manualDates = heading.createDiv('pm-project-manual-dates');
  pmRenderProjectManualDate(context, manualDates, summary.project, '提测时间', PM_TESTING_DATE_FIELD);
  pmRenderProjectManualDate(context, manualDates, summary.project, '计划上线时间', PM_PLANNED_RELEASE_DATE_FIELD);
  const badges = heading.createDiv('pm-project-list-badges');
  if (summary.archived) badges.createSpan({ text: '已归档', cls: 'pm-project-archived-badge' });
  badges.createSpan({ text: summary.status.label, cls: `pm-project-status pm-project-status--${summary.status.key}` });
  if (summary.overdue > 0) badges.createSpan({ text: '有风险', cls: 'pm-project-risk-badge' });

  const meta = card.createDiv('pm-project-list-meta');
  const period = summary.start || summary.due
    ? `${pmFormatDate(summary.start)} ～ ${pmFormatDate(summary.due)}`
    : '未设置';
  const roleMembers = pmProjectMembersByRole(context, summary.project);
  const generalMeta = meta.createDiv('pm-project-general-meta');
  const generalMetadata = [
    ['需求周期', period],
    ['最近更新', pmFormatUpdatedAt(summary.project.updatedAt)],
  ];
  for (const [label, value] of generalMetadata) {
    const item = generalMeta.createDiv('pm-project-list-meta-item');
    item.createSpan({ text: label, cls: 'pm-project-list-meta-label' });
    item.createSpan({ text: value, cls: 'pm-project-list-meta-value' });
  }

  const roleMeta = meta.createDiv('pm-project-role-meta');
  const roleMetadata = [
    ['项目管理', roleMembers['project-management']],
    ['产品经理', roleMembers['product-manager']],
    ['前端开发', roleMembers['frontend-development']],
    ['后端开发', roleMembers['backend-development']],
    ['测试人员', roleMembers.testing],
  ];
  for (const [label, members] of roleMetadata) {
    const item = roleMeta.createDiv('pm-project-role-meta-item');
    item.createSpan({ text: label, cls: 'pm-project-role-meta-label' });
    item.createSpan({
      text: members.length > 0 ? members.join('、') : '未配置',
      cls: `pm-project-role-meta-value${members.length === 0 ? ' is-empty' : ''}`,
    });
  }
  if (roleMembers.unmarked.length > 0) {
    const warning = roleMeta.createEl('button', {
      text: `还有${roleMembers.unmarked.length}名成员未标记角色`,
      cls: 'pm-project-role-warning',
      attr: { type: 'button' },
    });
    warning.setAttribute('title', roleMembers.unmarked.join('、'));
    warning.addEventListener('click', (event) => {
      event.stopPropagation();
      pmOpenProjectMemberRoles(context, summary.project);
    });
  }

  const metrics = card.createDiv('pm-project-list-metrics');
  const activeMetric = expanded ? pmRequirementFilter(summary.project.id).quickMetric : '';
  const applyMetric = (metric) => pmApplyRequirementMetric(context, summary, summaries, metric);
  pmRenderProjectMetric(metrics, '总需求', summary.total, 'all', activeMetric === 'all', applyMetric);
  pmRenderProjectMetric(metrics, '已完成', summary.completed, 'completed', activeMetric === 'completed', applyMetric);
  pmRenderProjectMetric(metrics, '未完成', summary.unfinished, 'unfinished', activeMetric === 'unfinished', applyMetric);
  pmRenderProjectMetric(metrics, '高优先级', summary.highPriority, 'high-priority', activeMetric === 'high-priority', applyMetric, summary.highPriority > 0);
  pmRenderProjectMetric(metrics, '已延期', summary.overdue, 'overdue', activeMetric === 'overdue', applyMetric, summary.overdue > 0);
  pmRenderProjectMetric(metrics, '本周到期', summary.dueSoon, 'due-soon', activeMetric === 'due-soon', applyMetric, summary.dueSoon > 0);

  const progress = card.createDiv('pm-project-list-progress');
  progress.createSpan({ text: '需求完成进度', cls: 'pm-project-list-progress-title' });
  const track = progress.createDiv('pm-project-list-progress-track');
  track.createDiv('pm-project-list-progress-fill').setCssStyles({ width: `${summary.progress}%` });
  progress.createSpan({ text: `${summary.progress}%`, cls: 'pm-project-list-progress-value' });

  const footer = card.createDiv('pm-project-list-footer');
  const riskText = summary.overdue > 0
    ? `${summary.overdue}个需求已超过截止日期${summary.highPriority > 0 ? `，${summary.highPriority}个高优先级需求尚未完成` : ''}`
    : summary.dueSoon > 0
      ? `${summary.dueSoon}个需求将在7天内到期`
      : summary.highPriority > 0
        ? `${summary.highPriority}个高优先级需求尚未完成`
        : '当前暂无需求延期风险';
  footer.createSpan({
    text: riskText,
    cls: `pm-project-list-risk-text${summary.overdue > 0 ? ' is-warning' : ''}`,
  });

  const actions = footer.createDiv('pm-project-list-actions');
  const requirementButton = actions.createEl('button', {
    text: expanded ? '收起需求 △' : '查看需求 ▽',
    cls: 'pm-project-list-action',
    attr: { type: 'button' },
  });
  requirementButton.addEventListener('click', (event) => {
    event.stopPropagation();
    pmDashboardState.expandedProjectId = expanded ? null : summary.project.id;
    pmRenderDashboard(context, summaries);
  });

  const detailButton = actions.createEl('button', {
    text: '进入迭代详情 →',
    cls: 'pm-project-list-action pm-project-list-action--primary',
    attr: { type: 'button' },
  });
  detailButton.addEventListener('click', (event) => {
    event.stopPropagation();
    void pmOpenProject(context, summary.project);
  });

  const toggleRequirements = () => {
    pmDashboardState.expandedProjectId = expanded ? null : summary.project.id;
    pmRenderDashboard(context, summaries);
  };
  card.addEventListener('click', toggleRequirements);
  card.addEventListener('keydown', (event) => {
    if (event.target !== card) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleRequirements();
  });
  card.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    Ym(context, summary.project, event);
  });

  if (expanded) pmRenderRequirements(context, container, summary, summaries);
}

function pmRequirementFilterOptions(context, summary, requirements) {
  const uniqueOptions = (values, label) => [
    { value: 'all', label },
    ...[...new Set(values.filter(Boolean))]
      .sort((left, right) => left.localeCompare(right, 'zh-CN'))
      .map((value) => ({ value, label: value })),
  ];

  return {
    modules: uniqueOptions(requirements.map((task) => String(task.customFields?.zentaoModule ?? '').trim()), '全部模块'),
    stages: [
      { value: 'all', label: '全部阶段' },
      ...[...new Set(requirements.map((task) => String(task.stage ?? '').trim()).filter(Boolean))]
        .map((value) => ({ value, label: pmDefinitionLabel(context, summary.project, 'stages', value) }))
        .sort((left, right) => left.label.localeCompare(right.label, 'zh-CN')),
    ],
    statuses: [
      { value: 'all', label: '全部状态' },
      ...[...new Set(requirements.map((task) => String(task.status ?? '').trim()).filter(Boolean))]
        .map((value) => ({ value, label: pmDefinitionLabel(context, summary.project, 'statuses', value) }))
        .sort((left, right) => left.label.localeCompare(right.label, 'zh-CN')),
    ],
    assignees: uniqueOptions(requirements.flatMap((task) => task.assignees ?? []), '全部负责人'),
  };
}

function pmFilteredRequirements(summary, filter) {
  const keyword = filter.search.toLocaleLowerCase('zh-CN');
  return summary.requirements
    .filter((task) => {
      const module = String(task.customFields?.zentaoModule ?? '').trim();
      const zentaoId = String(task.customFields?.zentaoId ?? '').trim();
      const searchText = [task.title, module, zentaoId, ...(task.assignees ?? [])].join(' ').toLocaleLowerCase('zh-CN');
      const completed = pmRequirementCompleted(task);
      const priority = String(task.priority ?? '').toLocaleLowerCase('en-US');
      if (filter.quickMetric === 'completed' && !completed) return false;
      if (filter.quickMetric === 'unfinished' && completed) return false;
      if (filter.quickMetric === 'high-priority' && (completed || !['critical', 'high'].includes(priority))) return false;
      if (filter.quickMetric === 'overdue' && !pmRequirementOverdue(task)) return false;
      if (filter.quickMetric === 'due-soon' && !pmRequirementDueSoon(task)) return false;
      if (keyword && !searchText.includes(keyword)) return false;
      if (filter.module !== 'all' && module !== filter.module) return false;
      if (filter.stage !== 'all' && task.stage !== filter.stage) return false;
      if (filter.status !== 'all' && task.status !== filter.status) return false;
      if (filter.assignee !== 'all' && !(task.assignees ?? []).includes(filter.assignee)) return false;
      if (filter.unfinishedOnly && pmRequirementCompleted(task)) return false;
      if (filter.overdueOnly && !pmRequirementOverdue(task)) return false;
      return true;
    })
    .sort((left, right) => {
      const overdueOrder = Number(pmRequirementOverdue(right)) - Number(pmRequirementOverdue(left));
      if (overdueOrder !== 0) return overdueOrder;
      const completedOrder = Number(pmRequirementCompleted(left)) - Number(pmRequirementCompleted(right));
      if (completedOrder !== 0) return completedOrder;
      return String(left.customFields?.zentaoId ?? '').localeCompare(String(right.customFields?.zentaoId ?? ''), 'zh-CN', { numeric: true });
    });
}

function pmRenderRequirementCell(row, text, className, title = '') {
  const cell = row.createEl('td', { text: String(text || '--'), cls: className });
  if (title) cell.setAttribute('title', title);
  return cell;
}

/**
 * 需求面板只展示需求本身，使用独立滚动区承载完整列表，不继续展开子任务。
 */
function pmRenderRequirements(context, container, summary, summaries) {
  const filter = pmRequirementFilter(summary.project.id);
  const panel = container.createDiv('pm-requirement-panel');
  const header = panel.createDiv('pm-requirement-panel-header');
  const heading = header.createDiv('pm-requirement-panel-heading');
  heading.createEl('h4', { text: '需求列表' });
  heading.createSpan({ text: `共${summary.total}个 · 未完成${summary.unfinished}个 · 延期${summary.overdue}个` });
  if (filter.quickMetric !== 'all') {
    const quickFilter = header.createDiv('pm-requirement-quick-filter');
    quickFilter.createSpan({ text: `快捷筛选：${PM_REQUIREMENT_METRIC_LABELS[filter.quickMetric] ?? filter.quickMetric}` });
    const clearButton = quickFilter.createEl('button', {
      text: '清除',
      cls: 'pm-requirement-quick-filter-clear',
      attr: { type: 'button' },
    });
    clearButton.addEventListener('click', () => {
      filter.quickMetric = 'all';
      pmRenderDashboard(context, summaries);
    });
  }

  const filters = panel.createDiv('pm-requirement-filters');
  const search = filters.createEl('input', {
    type: 'search',
    value: filter.search,
    placeholder: '搜索需求，按 Enter 筛选',
    cls: 'pm-dashboard-search pm-requirement-search',
  });
  const applySearch = () => {
    const nextValue = search.value.trim();
    if (nextValue === filter.search) return;
    filter.search = nextValue;
    pmRenderDashboard(context, summaries);
  };
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') applySearch();
  });
  search.addEventListener('search', applySearch);

  const options = pmRequirementFilterOptions(context, summary, summary.requirements);
  pmCreateFilterSelect(filters, '模块', filter.module, options.modules, (value) => {
    filter.module = value;
    pmRenderDashboard(context, summaries);
  });
  pmCreateFilterSelect(filters, '阶段', filter.stage, options.stages, (value) => {
    filter.stage = value;
    pmRenderDashboard(context, summaries);
  });
  pmCreateFilterSelect(filters, '状态', filter.status, options.statuses, (value) => {
    filter.status = value;
    pmRenderDashboard(context, summaries);
  });
  pmCreateFilterSelect(filters, '负责人', filter.assignee, options.assignees, (value) => {
    filter.assignee = value;
    pmRenderDashboard(context, summaries);
  });
  pmCreateToggle(filters, '只看未完成', filter.unfinishedOnly, (checked) => {
    filter.unfinishedOnly = checked;
    pmRenderDashboard(context, summaries);
  });
  pmCreateToggle(filters, '只看延期', filter.overdueOnly, (checked) => {
    filter.overdueOnly = checked;
    pmRenderDashboard(context, summaries);
  });

  const requirements = pmFilteredRequirements(summary, filter);
  if (requirements.length === 0) {
    panel.createDiv({ text: '没有符合当前筛选条件的需求', cls: 'pm-requirement-empty' });
    return;
  }

  const wrapper = panel.createDiv('pm-requirement-table-wrapper');
  const table = wrapper.createEl('table', { cls: 'pm-requirement-table' });
  const headerRow = table.createEl('thead').createEl('tr');
  for (const title of ['需求 ID', '需求名称', '模块', '阶段', '状态', '优先级', '负责人', '截止日期', '进度']) {
    headerRow.createEl('th', { text: title });
  }

  const body = table.createEl('tbody');
  for (const task of requirements) {
    const overdue = pmRequirementOverdue(task);
    const completed = pmRequirementCompleted(task);
    const row = body.createEl('tr', {
      cls: `${overdue ? 'is-overdue' : ''}${completed ? ' is-completed' : ''}`.trim(),
    });
    const zentaoId = String(task.customFields?.zentaoId ?? '').trim();
    pmRenderRequirementCell(row, zentaoId ? `需求 #${zentaoId}` : '本地需求', 'pm-requirement-id');

    const titleCell = row.createEl('td', { cls: 'pm-requirement-title-cell' });
    const titleButton = titleCell.createEl('button', {
      text: task.title,
      cls: 'pm-requirement-title',
      attr: { type: 'button' },
    });
    titleButton.setAttribute('title', task.title);
    titleButton.addEventListener('click', () => void pmOpenRequirement(context, summary.project, task));

    const module = String(task.customFields?.zentaoModule ?? '').trim();
    pmRenderRequirementCell(row, module, 'pm-requirement-module', module);
    pmRenderRequirementCell(row, pmDefinitionLabel(context, summary.project, 'stages', task.stage), 'pm-requirement-stage');
    pmRenderRequirementCell(row, pmDefinitionLabel(context, summary.project, 'statuses', task.status), 'pm-requirement-status');
    pmRenderRequirementCell(row, pmDefinitionLabel(context, summary.project, 'priorities', task.priority), 'pm-requirement-priority');
    pmRenderRequirementCell(row, (task.assignees ?? []).join('、') || '未分配', 'pm-requirement-assignee');
    pmRenderRequirementCell(row, overdue ? `已延期${Math.abs(pmDaysFromToday(task.due))}天` : pmFormatDate(task.due), overdue ? 'pm-requirement-due is-overdue' : 'pm-requirement-due');

    const progressCell = row.createEl('td', { cls: 'pm-requirement-progress' });
    const progress = Math.max(0, Math.min(100, Number(task.progress ?? 0)));
    const progressTrack = progressCell.createDiv('pm-requirement-progress-track');
    progressTrack.createDiv('pm-requirement-progress-fill').setCssStyles({ width: `${progress}%` });
    progressCell.createSpan({ text: `${progress}%` });
  }

  panel.createDiv({ text: `已展示 ${requirements.length} / ${summary.total} 条需求`, cls: 'pm-requirement-result-count' });
}

function pmRenderSystemSection(context, container, label, items, summaries) {
  const section = container.createDiv('pm-project-system-section');
  const header = section.createDiv('pm-project-system-header');
  const active = items.filter((summary) => summary.status.key === 'active').length;
  const risky = items.filter((summary) => summary.overdue > 0).length;
  const unfinished = items.reduce((total, summary) => total + summary.unfinished, 0);
  const title = header.createDiv('pm-project-system-title');
  title.createEl('h3', { text: label });
  title.createSpan({ text: `${items.length} 个迭代` });
  title.createSpan({ text: `进行中 ${active}` });
  title.createSpan({ text: `存在延期 ${risky}`, cls: risky > 0 ? 'is-warning' : '' });
  title.createSpan({ text: `未完成需求 ${unfinished}` });

  const collapsed = pmDashboardState.collapsedSystems.has(label);
  const collapseButton = header.createEl('button', {
    text: collapsed ? '展开 ∨' : '收起 ∧',
    cls: 'pm-project-system-collapse',
    attr: { type: 'button' },
  });
  collapseButton.addEventListener('click', () => {
    if (collapsed) pmDashboardState.collapsedSystems.delete(label);
    else pmDashboardState.collapsedSystems.add(label);
    pmRenderDashboard(context, summaries);
  });

  if (collapsed) return;
  const list = section.createDiv('pm-project-list');
  for (const summary of items) pmRenderProjectCard(context, list, summary, summaries);
}

/**
 * 按当前归属和筛选状态重绘首页，数据仍由外层加载逻辑统一提供。
 */
function pmRenderDashboard(context, summaries) {
  context.contentEl.empty();
  const archiveScopedSummaries = summaries.filter((summary) => {
    if (pmDashboardState.archiveStatus === 'archived') return summary.archived;
    if (pmDashboardState.archiveStatus === 'unarchived') return !summary.archived;
    return true;
  });
  pmRenderDashboardSummary(context.contentEl, archiveScopedSummaries);

  const systemLabels = [...new Set(archiveScopedSummaries.map((summary) => summary.system))]
    .sort((left, right) => left.localeCompare(right, 'zh-CN', { numeric: true }));
  if (pmDashboardState.selectedSystem !== 'all' && !systemLabels.includes(pmDashboardState.selectedSystem)) {
    pmDashboardState.selectedSystem = 'all';
  }
  pmRenderDashboardFilters(context, context.contentEl, summaries, archiveScopedSummaries, systemLabels);

  const keyword = pmDashboardState.projectSearch.toLocaleLowerCase('zh-CN');
  const filtered = summaries.filter((summary) => {
    if (pmDashboardState.archiveStatus === 'archived' && !summary.archived) return false;
    if (pmDashboardState.archiveStatus === 'unarchived' && summary.archived) return false;
    if (pmDashboardState.selectedSystem !== 'all' && summary.system !== pmDashboardState.selectedSystem) return false;
    if (pmDashboardState.projectStatus !== 'all' && summary.status.key !== pmDashboardState.projectStatus) return false;
    if (pmDashboardState.riskOnly && summary.overdue === 0) return false;
    if (keyword && !summary.project.title.toLocaleLowerCase('zh-CN').includes(keyword)) return false;
    return true;
  });

  if (filtered.length === 0) {
    context.contentEl.createDiv({ text: '没有符合当前筛选条件的迭代', cls: 'pm-dashboard-empty-filter' });
    return;
  }

  const groups = new Map();
  for (const summary of filtered) {
    const items = groups.get(summary.system) ?? [];
    items.push(summary);
    groups.set(summary.system, items);
  }

  for (const label of systemLabels) {
    const items = groups.get(label);
    if (!items?.length) continue;
    items.sort((left, right) => Number(left.archived) - Number(right.archived)
      || right.iterationId - left.iterationId
      || right.project.title.localeCompare(left.project.title, 'zh-CN', { numeric: true }));
    pmRenderSystemSection(context, context.contentEl, label, items, summaries);
  }
}

async function pmRenderProjectsBySystem(context) {
  const projects = await context.plugin.store.loadAllProjects(context.plugin.settings.projectsFolder);
  if (context.isStale()) return;

  if (projects.length === 0) {
    context.contentEl.empty();
    new Wm(context.contentEl)
      .setIcon('📋')
      .setTitle('暂无项目')
      .setBody('创建第一个项目即可开始使用。')
      .setAction('+ 新建项目', () => Jm(context));
    return;
  }

  const summaries = projects.map((project) => pmProjectSummary(
    context,
    project,
    pmSystemGroupLabel(project, context.plugin.settings.projectsFolder),
  ));
  pmRenderDashboard(context, summaries);
}

/**
 * 首页项目右键菜单增加本地归档操作，归档只影响本地展示和批量同步范围。
 */
function pmShowProjectContextMenu(context, project, event) {
  const menu = new e.Menu();
  const archived = pmProjectArchived(context, project);
  menu.addItem((item) => item
    .setTitle('编辑项目')
    .setIcon('settings')
    .onClick(() => {
      Xf(context.plugin, { project, onSave: async () => pmRenderProjectsBySystem(context) });
    }));
  menu.addItem((item) => item
    .setTitle('配置项目成员角色')
    .setIcon('users')
    .onClick(() => pmOpenProjectMemberRoles(context, project)));
  menu.addItem((item) => item
    .setTitle(archived ? '取消归档' : '归档')
    .setIcon(archived ? 'archive-restore' : 'archive')
    .onClick(Y(async () => {
      await pmSetProjectArchived(context, project, !archived);
      await pmRenderProjectsBySystem(context);
    })));
  menu.addSeparator();
  menu.addItem((item) => item
    .setTitle('删除项目')
    .setIcon('trash')
    .onClick(Y(async () => {
      await context.plugin.store.deleteProject(project);
      await pmSetProjectArchived(context, project, false);
      await pmRenderProjectsBySystem(context);
    })));
  menu.showAtMouseEvent(event);
}

function pmRenderDashboardToolbar(context) {
  context.toolbarEl.empty();
  context.toolbarEl.createEl('h2', { text: '项目管理', cls: 'pm-toolbar-title' });
  new e.ButtonComponent(context.toolbarEl)
    .setButtonText('+ 新建项目')
    .setCta()
    .onClick(() => Jm(context));
  new e.ButtonComponent(context.toolbarEl)
    .setButtonText('人员角色')
    .onClick(() => void pmOpenGlobalMemberRoles(context));
}

Ym = pmShowProjectContextMenu;
Km = pmRenderDashboardToolbar;
qm = pmRenderProjectsBySystem;

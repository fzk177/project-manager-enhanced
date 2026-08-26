// PM 洞察成员卡片与详情筛选增强：保留在源码构建层，避免安装版补丁被后续发布覆盖。
const PMI_MEMBER_HOUR_TOLERANCE = 0.01;
const PMI_DEVELOPMENT_TASK_STAGES = new Set([`devel`, `develop`, `development`, `dev`]);
const PMI_TEST_TASK_STAGES = new Set([`test`, `testing`, `qa`]);
const pmiAggregateInsightsBase = aggregateInsights;
const pmiRenderDashboardBase = InsightsView.prototype.renderDashboard;
const pmiScopeToProjectPathBase = InsightsView.prototype.scopeToProjectPath;
const pmiRenderTeamStripBase = InsightsView.prototype.renderTeamStrip;

Object.assign(en, {
  requirementOverview: `Requirement overview`,
  taskOverview: `Task overview`,
  currentResponsible: `Current responsible`,
  unstarted: `Not started`,
  inProgress: `In progress`,
  completed: `Completed`,
  pendingWork: `To do`,
  remainingWork: `Remaining`,
  actualWork: `Logged`,
  completionResult: `Completion result`,
  overrunCompleted: `Overrun`,
  earlyCompleted: `Early`,
  onTimeCompleted: `On time`,
  unestimatedTasks: (count) => `${count} unestimated`,
  completionProgress: `Completion`,
  requirementStatus: `Requirement status`,
  allRequirementStatuses: `All requirement statuses`,
  taskStatusByMember: `Task status`,
  allTaskStatusesByMember: `All task statuses`,
  completionStatus: `Completion status`,
  allCompletionStatuses: `All completion statuses`,
  sourceStatus: `ZenTao status`,
  memberDetailResult: (visible, total) => `Showing ${visible} / ${total} items`,
  totalRequirements: `Requirements`,
  totalTasks: `Tasks`,
  developmentTasks: `Development tasks`,
  testingTasks: `Testing tasks`
});

Object.assign(zh, {
  requirementOverview: `需求概况`,
  taskOverview: `任务概况`,
  currentResponsible: `当前负责`,
  unstarted: `未开始`,
  inProgress: `进行中`,
  completed: `已完成`,
  pendingWork: `待办`,
  remainingWork: `剩余`,
  actualWork: `实耗`,
  completionResult: `完成结果`,
  overrunCompleted: `超时`,
  earlyCompleted: `提前`,
  onTimeCompleted: `准时`,
  unestimatedTasks: (count) => `未估时 ${count}`,
  completionProgress: `完成进度`,
  requirementStatus: `需求状态`,
  allRequirementStatuses: `全部需求状态`,
  taskStatusByMember: `任务状态`,
  allTaskStatusesByMember: `全部任务状态`,
  completionStatus: `完成状态`,
  allCompletionStatuses: `全部完成状态`,
  sourceStatus: `禅道状态`,
  memberDetailResult: (visible, total) => `显示 ${visible} / ${total} 个事项`,
  totalRequirements: `需求总数`,
  totalTasks: `任务总数`,
  developmentTasks: `开发任务`,
  testingTasks: `测试任务`
});

function pmiTaskState(task) {
  if (task.completed) return `completed`;

  const status = String(task.status ?? ``).toLowerCase();
  const started = Number(task.progress ?? 0) > 0
    || Number(task.logged ?? 0) > 0
    || Boolean(task.actualStartedAt)
    || ![`wait`, `todo`, `draft`, `planned`].includes(status);
  return started ? `in-progress` : `unstarted`;
}

function pmiTaskOutcome(task) {
  if (!task.completed || task.unestimated) return ``;
  const difference = Number(task.logged) - Number(task.estimate);
  if (difference > PMI_MEMBER_HOUR_TOLERANCE) return `overrun`;
  if (difference < -PMI_MEMBER_HOUR_TOLERANCE) return `early`;
  return `on-time`;
}

function pmiBuildMemberCardStats(member) {
  const actualTasks = member.tasks.filter((task) => !task.contextOnly
    && !task.archived
    && !isCancelled(task)
    && task.sourceType === `task`);
  const completedTasks = actualTasks.filter((task) => task.completed);
  const unfinishedTasks = actualTasks.filter((task) => !task.completed);
  const unstartedTasks = actualTasks.filter((task) => pmiTaskState(task) === `unstarted`);
  const inProgressTasks = actualTasks.filter((task) => pmiTaskState(task) === `in-progress`);
  const requirements = new Map();
  const directRequirements = new Set();

  for (const task of member.tasks) {
    if (task.sourceType !== `requirement`) continue;
    requirements.set(task.id, task);
    if (!task.contextOnly) directRequirements.add(task.id);
  }

  const tasksByRequirement = new Map();
  for (const task of actualTasks) {
    if (!task.parentId) continue;
    const related = tasksByRequirement.get(task.parentId) ?? [];
    related.push(task);
    tasksByRequirement.set(task.parentId, related);
  }

  const requirementStats = {
    responsible: 0,
    unstarted: 0,
    inProgress: 0,
    completed: 0,
    states: new Map()
  };
  for (const [requirementId, requirement] of requirements) {
    const relatedTasks = tasksByRequirement.get(requirementId) ?? [];
    const directlyResponsible = directRequirements.has(requirementId);
    if (directlyResponsible) requirementStats.responsible += 1;
    if (relatedTasks.length === 0 && !directlyResponsible) continue;

    let state;
    if (relatedTasks.length > 0) {
      const states = relatedTasks.map((task) => pmiTaskState(task));
      state = states.every((value) => value === `completed`)
        ? `completed`
        : states.some((value) => value === `in-progress`)
          ? `in-progress`
          : `unstarted`;
    } else {
      state = requirement.completed ? `completed` : `in-progress`;
    }
    requirementStats[state === `in-progress` ? `inProgress` : state] += 1;
    requirementStats.states.set(requirement.id, state);
  }

  return {
    requirements: requirementStats,
    tasks: {
      total: actualTasks.length,
      unstarted: unstartedTasks.length,
      inProgress: inProgressTasks.length,
      completed: completedTasks.length,
      remaining: round(unfinishedTasks.reduce((total, task) => total + task.remaining, 0)),
      unstartedRemaining: round(unstartedTasks.reduce((total, task) => total + task.remaining, 0)),
      inProgressRemaining: round(inProgressTasks.reduce((total, task) => total + task.remaining, 0)),
      logged: round(completedTasks.reduce((total, task) => total + task.logged, 0)),
      overrun: completedTasks.filter((task) => pmiTaskOutcome(task) === `overrun`).length,
      early: completedTasks.filter((task) => pmiTaskOutcome(task) === `early`).length,
      onTime: completedTasks.filter((task) => pmiTaskOutcome(task) === `on-time`).length,
      unestimated: actualTasks.filter((task) => task.unestimated).length
    }
  };
}

aggregateInsights = function(projects, tasks, options) {
  const insights = pmiAggregateInsightsBase(projects, tasks, options);
  const allOptions = {
    ...options,
    quickFilter: { quickSource: `all` }
  };
  const allInsights = options.quickFilter?.quickSource === `all`
    ? insights
    : pmiAggregateInsightsBase(projects, tasks, allOptions);
  const allMembers = new Map(allInsights.members.map((member) => [member.key, member]));

  for (const member of insights.members) {
    const sourceMember = allMembers.get(member.key) ?? member;
    member.pmiCardStats = pmiBuildMemberCardStats(sourceMember);
  }
  const selectedTasks = tasks.filter((task) => options.projectIds.has(task.projectId) && !task.archived);
  const taskItems = selectedTasks.filter((task) => task.sourceType === `task`);
  insights.team.pmiTotals = {
    requirements: selectedTasks.filter((task) => task.sourceType === `requirement`).length,
    tasks: taskItems.length,
    development: taskItems.filter((task) => PMI_DEVELOPMENT_TASK_STAGES.has(String(task.stage ?? ``).toLowerCase())).length,
    testing: taskItems.filter((task) => PMI_TEST_TASK_STAGES.has(String(task.stage ?? ``).toLowerCase())).length
  };
  return insights;
};

InsightsView.prototype.renderTeamStrip = function(root, metrics, t) {
  pmiRenderTeamStripBase.call(this, root, metrics, t);
  const totals = metrics.pmiTotals;
  if (!totals) return;

  const strip = root.createDiv(`pmi-count-strip`);
  for (const [label, value] of [
    [t.totalRequirements, totals.requirements],
    [t.totalTasks, totals.tasks],
    [t.developmentTasks, totals.development],
    [t.testingTasks, totals.testing]
  ]) {
    const item = strip.createDiv(`pmi-count-metric`);
    item.createSpan({ text: label });
    item.createEl(`strong`, { text: String(value) });
  }
};

InsightsView.prototype.clearDetailFilters = function() {
  this.memberDetailSource = null;
  this.requirementStatusFilters = null;
  this.memberTaskStatusFilters = null;
  this.completionStatusFilters = null;
  this.taskQuery = ``;
  this.taskStatuses = null;
  this.taskPriorities = null;
};

InsightsView.prototype.applyMemberCardFilter = function(member, source, scope, snapshot, t) {
  this.selectedMemberKey = member.key;
  this.clearDetailFilters();
  this.memberDetailSource = source;
  if (scope?.startsWith(`requirement-`)) this.requirementStatusFilters = new Set([scope]);
  else if ([`task-overrun`, `task-early`, `task-on-time`].includes(scope)) this.completionStatusFilters = new Set([scope]);
  else if (scope) this.memberTaskStatusFilters = new Set([scope]);
  this.renderDashboard(snapshot, t);
};

InsightsView.prototype.scopeToProjectPath = async function(path) {
  this.clearDetailFilters();
  await pmiScopeToProjectPathBase.call(this, path);
};

InsightsView.prototype.renderDashboard = function(snapshot, t) {
  const selectedIds = new Set(this.host.settings.selectedProjectIds);
  if (selectedIds.size > 0) {
    const insights = aggregateInsights(snapshot.projects, snapshot.tasks, {
      projectIds: selectedIds,
      quickFilter: this.getQuickFilter(),
      aliases: this.host.settings.aliases,
      unassignedLabel: t.unassigned
    });
    const visibleMembers = insights.members.filter((member) =>
      member.name.normalize(`NFKC`).toLocaleLowerCase().includes(this.memberQuery)
    );
    if (!visibleMembers.some((member) => member.key === this.selectedMemberKey)) {
      this.clearDetailFilters();
    }
  }
  return pmiRenderDashboardBase.call(this, snapshot, t);
};

InsightsView.prototype.renderMember = function(root, member, snapshot, t) {
  const stats = member.pmiCardStats ?? pmiBuildMemberCardStats(member);
  const active = member.key === this.selectedMemberKey;
  const card = root.createDiv({
    cls: `pmi-member${active ? ` is-active` : ``}`,
    attr: { role: `button`, tabindex: `0`, "aria-pressed": String(active) }
  });
  const selectMember = () => {
    this.selectedMemberKey = member.key;
    this.clearDetailFilters();
    this.renderDashboard(snapshot, t);
  };
  card.addEventListener(`click`, selectMember);
  card.addEventListener(`keydown`, (event) => {
    if (event.target !== card || (event.key !== `Enter` && event.key !== ` `)) return;
    event.preventDefault();
    selectMember();
  });

  const head = card.createDiv(`pmi-member-head`);
  const avatar = head.createSpan({ cls: `pmi-member-avatar` });
  if (member.kind === `unassigned`) (0, import_obsidian5.setIcon)(avatar, `user-round-x`);
  else avatar.setText(Array.from(member.name).slice(0, 2).join(``));
  const identity = head.createDiv(`pmi-member-identity`);
  identity.createEl(`strong`, { text: member.name });
  identity.createSpan({ text: `${stats.requirements.unstarted + stats.requirements.inProgress + stats.requirements.completed} ${t.requirement} · ${stats.tasks.total} ${t.task}` });
  const pending = head.createDiv(`pmi-member-pending`);
  pending.createSpan({ text: t.pendingWork });
  pending.createEl(`strong`, { text: t.hours(stats.tasks.remaining) });

  const createMetric = (container, label, value, source, scope, kind = ``) => {
    const button = container.createEl(`button`, {
      cls: `pmi-member-metric${kind ? ` is-${kind}` : ``}`,
      text: `${label} ${value}`,
      attr: { type: `button` }
    });
    button.addEventListener(`click`, (event) => {
      event.stopPropagation();
      this.applyMemberCardFilter(member, source, scope, snapshot, t);
    });
    return button;
  };

  if (this.quickSource !== `task`) {
    const requirements = card.createDiv(`pmi-member-requirements`);
    const title = requirements.createDiv(`pmi-member-section-title`);
    title.createSpan({ text: t.requirementOverview });
    createMetric(title, t.currentResponsible, stats.requirements.responsible, `requirement`, `requirement-responsible`);
    const metrics = requirements.createDiv(`pmi-member-requirement-states`);
    createMetric(metrics, t.unstarted, stats.requirements.unstarted, `requirement`, `requirement-unstarted`, `unstarted`);
    createMetric(metrics, t.inProgress, stats.requirements.inProgress, `requirement`, `requirement-in-progress`, `in-progress`);
    createMetric(metrics, t.completed, stats.requirements.completed, `requirement`, `requirement-completed`, `completed`);
  }

  if (this.quickSource !== `requirement`) {
    const tasks = card.createDiv(`pmi-member-tasks`);
    const title = tasks.createDiv(`pmi-member-section-title`);
    title.createSpan({ text: t.taskOverview });
    createMetric(title, t.taskCount(stats.tasks.total), `task`, ``);
    const states = tasks.createDiv(`pmi-member-task-states`);
    const taskMetrics = [
      [t.unstarted, stats.tasks.unstarted, t.hours(stats.tasks.unstartedRemaining), `task-unstarted`, `unstarted`],
      [t.inProgress, stats.tasks.inProgress, t.hours(stats.tasks.inProgressRemaining), `task-in-progress`, `in-progress`],
      [t.completed, stats.tasks.completed, t.hours(stats.tasks.logged), `task-completed`, `completed`]
    ];
    for (const [label, value, hours, scope, kind] of taskMetrics) {
      const button = states.createEl(`button`, {
        cls: `pmi-member-task-state is-${kind}`,
        attr: { type: `button` }
      });
      button.createSpan({ text: label });
      button.createEl(`strong`, { text: String(value) });
      button.createSpan({ text: `${kind === `completed` ? t.actualWork : t.remainingWork} ${hours}` });
      button.addEventListener(`click`, (event) => {
        event.stopPropagation();
        this.applyMemberCardFilter(member, `task`, scope, snapshot, t);
      });
    }

    const outcome = card.createDiv(`pmi-member-outcome`);
    const outcomeHead = outcome.createDiv(`pmi-member-section-title`);
    outcomeHead.createSpan({ text: t.completionResult });
    if (stats.tasks.unestimated > 0) outcomeHead.createSpan({ cls: `pmi-member-unestimated`, text: t.unestimatedTasks(stats.tasks.unestimated) });
    const outcomes = outcome.createDiv(`pmi-member-outcome-items`);
    createMetric(outcomes, t.overrunCompleted, stats.tasks.overrun, `task`, `task-overrun`, `overrun`);
    createMetric(outcomes, t.earlyCompleted, stats.tasks.early, `task`, `task-early`, `early`);
    createMetric(outcomes, t.onTimeCompleted, stats.tasks.onTime, `task`, `task-on-time`, `on-time`);

    const progress = card.createDiv(`pmi-member-completion`);
    const progressHead = progress.createDiv(`pmi-member-completion-legend`);
    progressHead.createSpan({ text: t.completionProgress });
    progressHead.createSpan({ text: `${stats.tasks.completed}/${stats.tasks.total}` });
    const track = progress.createDiv(`pmi-member-completion-track`);
    track.createDiv(`pmi-member-completion-fill`).style.width = `${stats.tasks.total ? stats.tasks.completed / stats.tasks.total * 100 : 0}%`;
  }
};

InsightsView.prototype.renderTaskDetail = function(root, member, projects, priorities, stages, statuses, t) {
  const header = root.createDiv(`pmi-pane-header pmi-detail-header`);
  const identity = header.createDiv(`pmi-detail-identity`);
  identity.createEl(`h2`, { text: member?.name ?? t.tasks });
  identity.createSpan({ text: member ? t.memberWorkCount(member.tasks, this.quickSource) : `0` });
  if (!member) {
    root.createDiv({ cls: `pmi-list-empty`, text: t.noTasks });
    return;
  }
  this.renderMemberRatios(header, member, t);
  this.renderMemberViewSwitcher(header, () => {
    root.empty();
    this.renderTaskDetail(root, member, projects, priorities, stages, statuses, t);
  });

  const source = this.memberDetailSource ?? this.quickSource;
  const sourceItems = member.tasks.filter((task) => {
    if (source === `requirement`) return task.sourceType === `requirement`;
    if (source === `task`) return task.sourceType === `task` && !task.contextOnly;
    return !task.contextOnly || task.sourceType === `requirement`;
  });
  const cardStats = member.pmiCardStats ?? pmiBuildMemberCardStats(member);
  const statusDefinitions = new Map(statuses.map((status) => [status.id, status]));
  const sourceStatusOptions = [...new Set(sourceItems.map((task) => task.status))].map((value) => ({
    value,
    label: statusDefinitions.get(value)?.label ?? value,
    count: sourceItems.filter((task) => task.status === value).length
  }));
  const priorityDefinitions = new Map(priorities.map((priority) => [priority.id, priority]));
  const priorityOptions = [...new Set(sourceItems.map((task) => task.priority ?? TASK_PRIORITY_NONE))].map((value) => ({
    value,
    label: priorityDefinitions.get(value)?.label ?? (value || t.noPriority),
    color: priorityDefinitions.get(value)?.color ?? ``,
    count: sourceItems.filter((task) => (task.priority ?? TASK_PRIORITY_NONE) === value).length
  }));
  const requirementOptions = [
    [`requirement-responsible`, t.currentResponsible],
    [`requirement-unstarted`, t.unstarted],
    [`requirement-in-progress`, t.inProgress],
    [`requirement-completed`, t.completed]
  ].map(([value, label]) => ({ value, label, count: cardStats.requirements[value.replace(`requirement-`, ``).replace(`in-progress`, `inProgress`)] ?? 0 }));
  const taskOptions = [
    [`task-unstarted`, t.unstarted],
    [`task-in-progress`, t.inProgress],
    [`task-completed`, t.completed],
    [`task-open`, t.pendingWork]
  ].map(([value, label]) => ({ value, label, count: sourceItems.filter((task) => pmiMatchesScope(task, member, value)).length }));
  const completionOptions = [
    [`task-overrun`, t.overrunCompleted],
    [`task-early`, t.earlyCompleted],
    [`task-on-time`, t.onTimeCompleted]
  ].map(([value, label]) => ({ value, label, count: sourceItems.filter((task) => pmiMatchesScope(task, member, value)).length }));

  this.requirementStatusFilters = this.normalizeTaskFilter(this.requirementStatusFilters, requirementOptions);
  this.memberTaskStatusFilters = this.normalizeTaskFilter(this.memberTaskStatusFilters, taskOptions);
  this.completionStatusFilters = this.normalizeTaskFilter(this.completionStatusFilters, completionOptions);
  this.taskStatuses = this.normalizeTaskFilter(this.taskStatuses, sourceStatusOptions);
  this.taskPriorities = this.normalizeTaskFilter(this.taskPriorities, priorityOptions);

  const filters = root.createDiv(`pmi-task-filter-bar`);
  const searchWrap = filters.createDiv(`pmi-task-filter-search`);
  (0, import_obsidian5.setIcon)(searchWrap.createSpan(), `search`);
  const search = searchWrap.createEl(`input`, { type: `search`, placeholder: t.taskSearch, cls: `pmi-pane-search` });
  search.value = this.taskQuery;
  const result = filters.createDiv({ cls: `pmi-task-filter-result`, attr: { "aria-live": `polite` } });
  const reset = filters.createEl(`button`, { cls: `pmi-task-filter-reset`, attr: { type: `button`, title: t.resetFilters } });
  (0, import_obsidian5.setIcon)(reset, `rotate-ccw`);
  reset.createSpan({ text: t.resetFilters });

  const renderRows = () => {
    this.taskQuery = search.value.normalize(`NFKC`).trim().toLocaleLowerCase();
    const visible = sourceItems.filter((task) => {
      const matchesText = !this.taskQuery || task.title.normalize(`NFKC`).toLocaleLowerCase().includes(this.taskQuery) || task.projectTitle.normalize(`NFKC`).toLocaleLowerCase().includes(this.taskQuery);
      const matchesSourceStatus = this.taskStatuses === null || this.taskStatuses.has(task.status);
      const matchesPriority = this.taskPriorities === null || this.taskPriorities.has(task.priority ?? TASK_PRIORITY_NONE);
      const matchesRequirement = task.sourceType !== `requirement` || this.requirementStatusFilters === null || [...this.requirementStatusFilters].some((scope) => pmiMatchesScope(task, member, scope));
      const matchesTask = task.sourceType !== `task` || this.memberTaskStatusFilters === null || [...this.memberTaskStatusFilters].some((scope) => pmiMatchesScope(task, member, scope));
      const matchesCompletion = task.sourceType !== `task` || this.completionStatusFilters === null || [...this.completionStatusFilters].some((scope) => pmiMatchesScope(task, member, scope));
      return matchesText && matchesSourceStatus && matchesPriority && matchesRequirement && matchesTask && matchesCompletion;
    });
    result.setText(t.memberDetailResult(visible.length, sourceItems.length));
    reset.disabled = this.taskQuery.length === 0 && this.requirementStatusFilters === null && this.memberTaskStatusFilters === null && this.completionStatusFilters === null && this.taskStatuses === null && this.taskPriorities === null;
    this.renderMemberTaskView(root, visible, projects, priorities, stages, statuses, t, () => {});
  };

  const menu = (icon, label, allLabel, options, selection, change) => this.renderTaskFilterMenu(filters, icon, label, allLabel, options, selection, (next) => { change(next); renderRows(); }, t);
  menu(`filter`, t.requirementStatus, t.allRequirementStatuses, requirementOptions, this.requirementStatusFilters, (next) => { this.requirementStatusFilters = next; });
  menu(`list-checks`, t.taskStatusByMember, t.allTaskStatusesByMember, taskOptions, this.memberTaskStatusFilters, (next) => { this.memberTaskStatusFilters = next; });
  menu(`circle-check-big`, t.completionStatus, t.allCompletionStatuses, completionOptions, this.completionStatusFilters, (next) => { this.completionStatusFilters = next; });
  menu(`workflow`, t.sourceStatus, t.allTaskStatuses, sourceStatusOptions, this.taskStatuses, (next) => { this.taskStatuses = next; });
  menu(`signal-high`, t.priority, t.allPriorities, priorityOptions, this.taskPriorities, (next) => { this.taskPriorities = next; });
  search.addEventListener(`input`, renderRows);
  reset.addEventListener(`click`, () => {
    this.clearDetailFilters();
    root.empty();
    this.renderTaskDetail(root, member, projects, priorities, stages, statuses, t);
  });
  renderRows();
};

function pmiMatchesScope(task, member, scope) {
  if (scope === `requirement-responsible`) return !task.contextOnly;
  if (scope.startsWith(`requirement-`)) {
    const state = member.pmiCardStats?.requirements.states.get(task.id);
    return state === scope.replace(`requirement-`, ``);
  }
  if (scope === `task-open`) return !task.completed;
  if (scope === `task-unestimated`) return task.unestimated;
  if (scope === `task-overrun`) return pmiTaskOutcome(task) === `overrun`;
  if (scope === `task-early`) return pmiTaskOutcome(task) === `early`;
  if (scope === `task-on-time`) return pmiTaskOutcome(task) === `on-time`;
  if (scope.startsWith(`task-`)) return pmiTaskState(task) === scope.replace(`task-`, ``);
  return true;
}

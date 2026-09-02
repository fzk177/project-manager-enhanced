
/**
 * 判断当前事项是否直接命中文本搜索条件。
 */
function projectSearchMatchesTaskText(task, text) {
  const keyword = text.trim().toLowerCase();
  if (!keyword) return false;

  const completedBy = String(task.customFields.completedBy ?? ``).toLowerCase();
  return task.id.toLowerCase() === keyword
    || projectSearchMatchesZentaoId(task, keyword)
    || task.title.toLowerCase().includes(keyword)
    || task.stage.includes(keyword)
    || task.status.includes(keyword)
    || task.priority.includes(keyword)
    || task.assignees.some((assignee) => assignee.toLowerCase().includes(keyword))
    || completedBy.includes(keyword)
    || task.tags.some((tag) => tag.toLowerCase().includes(keyword));
}

/**
 * 克隆需求下的可见任务树，避免搜索结果视图直接复用原始层级数组。
 */
function projectSearchCloneVisibleTasks(tasks, showArchived) {
  const visibleTasks = [];

  for (const task of tasks) {
    if (task.archived && !showArchived) continue;

    visibleTasks.push({
      ...task,
      subtasks: projectSearchCloneVisibleTasks(task.subtasks, showArchived),
    });
  }

  return visibleTasks;
}

/**
 * 收集需求下需要随搜索结果展示的任务 ID。
 */
function projectSearchCollectVisibleTaskIds(tasks, showArchived, taskIds) {
  for (const task of tasks) {
    if (task.archived && !showArchived) continue;

    taskIds.add(task.id);
    projectSearchCollectVisibleTaskIds(task.subtasks, showArchived, taskIds);
  }
}

/**
 * 过滤表格使用的扁平事项列表，需求命中搜索时将其后代任务一并加入结果。
 */
function Ad(entries, filter, statuses = []) {
  const matchedTaskIds = new Set();

  for (const entry of entries) {
    if (Od(entry.task, filter, statuses)) matchedTaskIds.add(entry.task.id);
  }

  if (filter.text.trim()) {
    for (const entry of entries) {
      const requirementMatched = matchedTaskIds.has(entry.task.id)
        && quickSourceType(entry.task) === `requirement`
        && projectSearchMatchesTaskText(entry.task, filter.text);

      if (requirementMatched) {
        projectSearchCollectVisibleTaskIds(entry.task.subtasks, filter.showArchived, matchedTaskIds);
      }
    }
  }

  return entries.filter((entry) => matchedTaskIds.has(entry.task.id));
}

/**
 * 按层级过滤事项。文本搜索直接命中需求时，保留该需求下的完整可见任务树。
 */
function kd(tasks, filter, statuses = []) {
  const result = [];

  for (const task of tasks) {
    const filteredSubtasks = task.subtasks.length ? kd(task.subtasks, filter, statuses) : [];

    if (Od(task, filter, statuses)) {
      const requirementMatched = quickSourceType(task) === `requirement`
        && projectSearchMatchesTaskText(task, filter.text);
      const subtasks = requirementMatched
        ? projectSearchCloneVisibleTasks(task.subtasks, filter.showArchived)
        : filteredSubtasks;

      result.push({
        ...task,
        collapsed: requirementMatched ? false : task.collapsed,
        subtasks,
      });
    } else {
      result.push(...filteredSubtasks);
    }
  }

  return result;
}

/**
 * 表格虚拟滚动的缓冲行数和默认可视高度。
 */
const PM_ITERATION_TABLE_OVERSCAN = 8;
const PM_ITERATION_TABLE_VIRTUAL_THRESHOLD = 120;
const PM_ITERATION_TABLE_FALLBACK_VIEWPORT = 600;
const PM_ITERATION_TABLE_PAGE_OVERSCAN = 24;
const PM_ITERATION_TABLE_MEDIUM_OVERSCAN = 48;
const PM_ITERATION_TABLE_FAST_OVERSCAN = 96;
const PM_ITERATION_TABLE_MEDIUM_VELOCITY = 0.8;
const PM_ITERATION_TABLE_FAST_VELOCITY = 2;
const PM_ITERATION_TABLE_INITIAL_BATCH = 24;
const PM_ITERATION_TABLE_APPEND_BATCH = 16;

/**
 * 根据整页滚动位置计算表格可见行，避免进入大迭代时一次创建全部事项节点。
 */
function Np(state) {
  const wrapper = state.wrapper;
  const pageRoot = wrapper?.closest(`.pm-project-detail-root--table`);
  if (wrapper && pageRoot) {
    const rootRect = pageRoot.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const tableHeader = wrapper.querySelector(`thead`);
    const tableHeaderHeight = tableHeader instanceof HTMLElement ? tableHeader.offsetHeight : 0;
    const stickyFilter = pageRoot.querySelector(`:scope > .pm-iteration-filter-sticky`);
    const stickyBottom = stickyFilter instanceof HTMLElement
      ? stickyFilter.getBoundingClientRect().bottom
      : rootRect.top;
    const visibleRowTop = Math.max(0, stickyBottom - wrapperRect.top);
    const visibleRowBottom = Math.max(0, rootRect.bottom - wrapperRect.top - tableHeaderHeight);
    const velocity = Number(state.pageScrollVelocity ?? 0);
    const directionalOverscan = velocity >= PM_ITERATION_TABLE_FAST_VELOCITY
      ? PM_ITERATION_TABLE_FAST_OVERSCAN
      : velocity >= PM_ITERATION_TABLE_MEDIUM_VELOCITY
        ? PM_ITERATION_TABLE_MEDIUM_OVERSCAN
        : PM_ITERATION_TABLE_PAGE_OVERSCAN;
    const scrollingUp = state.pageScrollDirection === `up`;
    const scrollingDown = state.pageScrollDirection === `down`;
    const beforeOverscan = scrollingUp ? directionalOverscan : PM_ITERATION_TABLE_PAGE_OVERSCAN;
    const afterOverscan = scrollingDown ? directionalOverscan : PM_ITERATION_TABLE_PAGE_OVERSCAN;
    let start = Math.floor(visibleRowTop / state.rowHeight) - beforeOverscan;
    let end = Math.ceil(visibleRowBottom / state.rowHeight) + afterOverscan;

    if (start < 0) start = 0;
    if (start > state.visibleRows.length) start = state.visibleRows.length;
    if (end > state.visibleRows.length) end = state.visibleRows.length;
    if (end < start) end = start;
    return { start, end };
  }

  if (state.visibleRows.length <= PM_ITERATION_TABLE_VIRTUAL_THRESHOLD) {
    return { start: 0, end: state.visibleRows.length };
  }

  if (!wrapper) return { start: 0, end: state.visibleRows.length };

  const tableHeader = wrapper.querySelector(`thead`);
  const tableHeaderHeight = tableHeader instanceof HTMLElement ? tableHeader.offsetHeight : 0;
  const scrollTop = Math.max(0, wrapper.scrollTop - tableHeaderHeight);
  const viewportHeight = wrapper.clientHeight || PM_ITERATION_TABLE_FALLBACK_VIEWPORT;
  let start = Math.floor(scrollTop / state.rowHeight) - PM_ITERATION_TABLE_OVERSCAN;
  if (start < 0) start = 0;

  let end = Math.ceil((scrollTop + viewportHeight) / state.rowHeight) + PM_ITERATION_TABLE_OVERSCAN;
  if (end > state.visibleRows.length) end = state.visibleRows.length;
  return { start, end };
}

/**
 * 逐帧追加完整表格行；已经渲染的事项不会再因滚动被删除或替换。
 */
function pmAppendIterationTableBatch(context, generation) {
  const state = context.state;
  const tableBody = state.tableBody;
  if (!tableBody || state.pageProgressiveGeneration !== generation) return;

  const visibleRows = state.visibleRows;
  const start = state.pageProgressiveRendered ?? 0;
  const batchSize = start === 0
    ? PM_ITERATION_TABLE_INITIAL_BATCH
    : PM_ITERATION_TABLE_APPEND_BATCH;
  const end = Math.min(start + batchSize, visibleRows.length);
  const spacer = tableBody.querySelector(`.pm-table-progressive-spacer`);
  if (!(spacer instanceof HTMLElement)) return;

  const stagingBody = activeDocument.createElement(`tbody`);
  for (let index = start; index < end; index += 1) {
    const visibleRow = visibleRows[index];
    Cp(
      stagingBody,
      visibleRow.task,
      visibleRow.depth,
      context,
      visibleRow.groupTone ?? `a`,
    );
  }
  for (const row of [...stagingBody.children]) tableBody.insertBefore(row, spacer);

  state.pageProgressiveRendered = end;
  state.windowStart = 0;
  state.windowEnd = end;

  if (!state.heightCalibrated) {
    const firstRow = tableBody.querySelector(`tr[data-task-id]`);
    if (firstRow instanceof HTMLElement && firstRow.offsetHeight > 0) {
      state.heightCalibrated = true;
      if (Math.abs(firstRow.offsetHeight - state.rowHeight) > 0.5) {
        state.rowHeight = firstRow.offsetHeight;
      }
    }
  }

  if (end >= visibleRows.length) {
    spacer.remove();
    state.pageProgressiveFrame = null;
    return;
  }

  const spacerCell = spacer.firstElementChild;
  if (spacerCell instanceof HTMLElement) {
    spacerCell.style.height = `${(visibleRows.length - end) * state.rowHeight}px`;
  }
  state.pageProgressiveFrame = window.requestAnimationFrame(() => {
    state.pageProgressiveFrame = null;
    pmAppendIterationTableBatch(context, generation);
  });
}

/**
 * 当筛选、排序或数据发生变化时重新启动渐进式完整渲染。
 */
function Pp(context) {
  const state = context.state;
  const tableBody = state.tableBody;
  if (!tableBody) return;

  if (state.pageVisibleRowsReference === state.visibleRows) return;

  if (state.pageProgressiveFrame !== null && state.pageProgressiveFrame !== undefined) {
    window.cancelAnimationFrame(state.pageProgressiveFrame);
  }
  state.pageProgressiveFrame = null;
  state.pageVisibleRowsReference = state.visibleRows;
  state.pageProgressiveRendered = 0;
  state.pageProgressiveGeneration = (state.pageProgressiveGeneration ?? 0) + 1;
  state.windowStart = 0;
  state.windowEnd = 0;

  const columnCount = 14 + Ip(context.project).length;
  const stagingBody = activeDocument.createElement(`tbody`);
  const spacer = stagingBody.createEl(`tr`, {
    cls: `pm-table-spacer pm-table-progressive-spacer`,
  });
  spacer.createEl(`td`, { attr: { colspan: String(columnCount) } }).setCssStyles({
    height: `${state.visibleRows.length * state.rowHeight}px`,
  });
  const addRow = stagingBody.createEl(`tr`, { cls: `pm-table-add-row` });
  const addCell = addRow.createEl(`td`, { attr: { colspan: String(columnCount) } });
  Sf(addCell, `添加任务`, () => {
    Q(context.plugin, context.project, { onSave: () => context.onRefresh() });
  });
  tableBody.replaceChildren(...stagingBody.children);
  pmAppendIterationTableBatch(context, state.pageProgressiveGeneration);
}

const PM_ITERATION_DEVELOPMENT_STAGES = new Set([`devel`, `developing`, `developed`]);
const PM_ITERATION_TEST_STAGES = new Set([`test`, `testing`, `tested`]);
const PM_ITERATION_WAIT_STATUSES = new Set([`draft`, `wait`, `todo`, `planned`]);
const PM_ITERATION_BLOCKED_STATUSES = new Set([`blocked`, `pause`, `paused`, `suspended`]);
const PM_ITERATION_MEMBER_LIMIT = 5;
const PM_ITERATION_UNASSIGNED = `未分配`;
const PM_ITERATION_ROLE_LABELS = {
  'project-management': `项目管理`,
  'product-manager': `产品经理`,
  'frontend-development': `前端开发`,
  'backend-development': `后端开发`,
  testing: `测试`,
};

/**
 * 判断事项是否属于取消状态，取消事项不进入迭代进度和工时分母。
 */
function pmIterationIsCancelled(task) {
  return [`cancel`, `cancelled`, `canceled`].includes(String(task.status ?? ``).trim().toLowerCase());
}

/**
 * 获取事项在迭代概览中的互斥进度状态。
 */
function pmIterationTaskState(task, statuses) {
  if (quickIsComplete(task, statuses)) return `completed`;

  const status = String(task.status ?? ``).trim().toLowerCase();
  const consumedHours = gu(task);
  const started = Number(task.progress ?? 0) > 0
    || consumedHours > 0
    || Boolean(task.customFields?.actualStartedAt)
    || !PM_ITERATION_WAIT_STATUSES.has(status);

  return started ? `ongoing` : `pending`;
}

/**
 * 识别需求、开发任务、测试任务和其他任务，需求优先于阶段判断。
 */
function pmIterationTaskKind(task) {
  const sourceType = quickSourceType(task);
  if (sourceType === `requirement`) return `requirement`;
  if (sourceType !== `task`) return `other`;

  const stage = String(task.stage ?? ``).trim().toLowerCase();
  if (PM_ITERATION_TEST_STAGES.has(stage)) return `testing`;
  if (PM_ITERATION_DEVELOPMENT_STAGES.has(stage)) return `development`;
  return `other`;
}

/**
 * 计算单类事项的数量和完成率。
 */
function pmIterationCategoryMetric(tasks, statuses) {
  const completed = tasks.filter((task) => pmIterationTaskState(task, statuses) === `completed`);
  const ongoing = tasks.filter((task) => pmIterationTaskState(task, statuses) === `ongoing`);
  const pending = tasks.filter((task) => pmIterationTaskState(task, statuses) === `pending`);

  return {
    tasks,
    total: tasks.length,
    completed: completed.length,
    ongoing: ongoing.length,
    pending: pending.length,
    unfinished: ongoing.length + pending.length,
    completionRate: tasks.length > 0 ? Math.round(completed.length / tasks.length * 100) : 0,
  };
}

/**
 * 获取任务剩余工时，禅道同步值优先，本地任务按预计与消耗差额回退。
 */
function pmIterationRemainingHours(task, estimate, consumed, completed) {
  const syncedRemaining = projectSyncedHours(task, `displayRemainingHours`)
    ?? projectSyncedHours(task, `remainingHours`);
  if (syncedRemaining !== null) return syncedRemaining;
  return completed ? 0 : Math.max(estimate - consumed, 0);
}

/**
 * 将工时保留一位小数，并省略无意义的小数零。
 */
function pmIterationFormatHours(value) {
  const rounded = Math.round((Number(value) || 0) * 10) / 10;
  return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)}h`;
}

/**
 * 汇总全部任务及人员工时，需求汇总字段不参与，避免和需求下任务重复计算。
 */
function pmIterationEffortSummary(tasks, statuses) {
  const summary = {
    estimate: 0,
    consumed: 0,
    remaining: 0,
    overrun: 0,
    unestimated: 0,
    members: new Map(),
  };

  for (const task of tasks) {
    if (quickSourceType(task) !== `task`) continue;

    const state = pmIterationTaskState(task, statuses);
    const completed = state === `completed`;
    const estimate = projectEstimateHours(task);
    const consumed = gu(task);
    const remaining = pmIterationRemainingHours(task, estimate, consumed, completed);
    const overrun = estimate > 0 ? Math.max(consumed - estimate, 0) : 0;
    const completedBy = completed ? String(task.customFields?.completedBy ?? ``).trim() : ``;
    const memberName = completedBy || task.assignees?.[0] || PM_ITERATION_UNASSIGNED;

    summary.estimate += estimate;
    summary.consumed += consumed;
    summary.remaining += remaining;
    summary.overrun += overrun;
    if (estimate <= 0) summary.unestimated += 1;

    let member = summary.members.get(memberName);
    if (!member) {
      member = {
        name: memberName,
        total: 0,
        completed: 0,
        ongoing: 0,
        pending: 0,
        estimate: 0,
        consumed: 0,
        remaining: 0,
        overrun: 0,
      };
      summary.members.set(memberName, member);
    }

    member.total += 1;
    member[state] += 1;
    member.estimate += estimate;
    member.consumed += consumed;
    member.remaining += remaining;
    member.overrun += overrun;
  }

  summary.members = [...summary.members.values()].sort((left, right) => {
    if (right.overrun !== left.overrun) return right.overrun - left.overrun;
    if (right.remaining !== left.remaining) return right.remaining - left.remaining;
    return right.consumed - left.consumed;
  });

  return summary;
}

/**
 * 判断未完成事项是否已经逾期。
 */
function pmIterationIsOverdue(task, statuses) {
  if (quickIsComplete(task, statuses)) return false;

  const due = K(task.due);
  return due ? G.PlainDate.compare(due, Zl()) < 0 : false;
}

/**
 * 生成迭代详情顶部概览所需的全量数据，不受当前临时筛选影响。
 */
function pmIterationSummary(project, statuses) {
  const tasks = q(project.tasks)
    .map((entry) => entry.task)
    .filter((task) => !task.archived && !pmIterationIsCancelled(task));
  const requirements = tasks.filter((task) => pmIterationTaskKind(task) === `requirement`);
  const developmentTasks = tasks.filter((task) => pmIterationTaskKind(task) === `development`);
  const testingTasks = tasks.filter((task) => pmIterationTaskKind(task) === `testing`);
  const actualTasks = tasks.filter((task) => quickSourceType(task) === `task`);
  const effort = pmIterationEffortSummary(actualTasks, statuses);

  return {
    categories: [
      { id: `requirement`, label: `需求`, metric: pmIterationCategoryMetric(requirements, statuses) },
      { id: `development`, label: `开发任务`, metric: pmIterationCategoryMetric(developmentTasks, statuses) },
      { id: `testing`, label: `测试任务`, metric: pmIterationCategoryMetric(testingTasks, statuses) },
    ],
    effort,
    risks: {
      overdueRequirements: requirements.filter((task) => pmIterationIsOverdue(task, statuses)).length,
      blockedTasks: actualTasks.filter((task) => !quickIsComplete(task, statuses)
        && PM_ITERATION_BLOCKED_STATUSES.has(String(task.status ?? ``).toLowerCase())).length,
      unassignedTasks: actualTasks.filter((task) => !quickIsComplete(task, statuses)
        && (!Array.isArray(task.assignees) || task.assignees.length === 0)).length,
      unestimatedTasks: effort.unestimated,
      overrunTasks: actualTasks.filter((task) => {
        const estimate = projectEstimateHours(task);
        return estimate > 0 && gu(task) > estimate;
      }).length,
    },
  };
}

/**
 * 重置临时筛选并设置概览卡片对应的事项类型。
 */
function pmIterationConfigureCategoryFilter(view, categoryId) {
  Object.assign(view.filter, au());

  if (categoryId === `requirement`) {
    view.filter.quickSource = `requirement`;
  } else if (categoryId === `development`) {
    view.filter.quickSource = `task`;
    view.filter.stages = [...PM_ITERATION_DEVELOPMENT_STAGES];
  } else if (categoryId === `testing`) {
    view.filter.quickSource = `task`;
    view.filter.stages = [...PM_ITERATION_TEST_STAGES];
  }
}

/**
 * 将概览交互产生的筛选应用到下方事项视图。
 */
function pmIterationCommitFilter(view) {
  view.activeSavedViewId = null;
  view.kanbanGroupBy = view.filter.quickSource === `task` ? `status` : `stage`;
  view.renderProjectHeader();
  pmRenderIterationSummary(view);
  view.scheduleFilterRender();
}

/**
 * 点击分类及状态指标时，联动下方表格的临时筛选。
 */
function pmIterationApplyCategoryFilter(view, category, state = ``) {
  view.iterationSummaryActiveFilter = {
    kind: `category`,
    categoryId: category.id,
    state,
  };
  pmIterationConfigureCategoryFilter(view, category.id);
  view.filter.statuses = [...new Set(category.metric.tasks
    .map((task) => task.status)
    .filter(Boolean))];

  if (state === `completed`) {
    view.filter.quickCompletion = `completed`;
  } else if (state === `unfinished`) {
    view.filter.quickCompletion = `unfinished`;
  } else if (state === `ongoing` || state === `pending`) {
    view.filter.quickCompletion = `unfinished`;
    view.filter.statuses = [...new Set(category.metric.tasks
      .filter((task) => pmIterationTaskState(task, view.plugin.store.configFor(view.project).statuses) === state)
      .map((task) => task.status)
      .filter(Boolean))];
  }

  pmIterationCommitFilter(view);
}

/**
 * 点击人员行时，按负责人或完成者筛选下方事项。
 */
function pmIterationApplyMemberFilter(view, memberName) {
  view.iterationSummaryActiveFilter = {
    kind: `member`,
    memberName,
  };
  Object.assign(view.filter, au());
  view.filter.quickSource = `task`;

  if (memberName === PM_ITERATION_UNASSIGNED) {
    view.filter.quickOwnership = `unassigned`;
  } else {
    view.filter.participants = [memberName];
  }

  pmIterationCommitFilter(view);
}

/**
 * 点击风险指标时，应用当前筛选模型可以准确表达的风险条件。
 */
function pmIterationApplyRiskFilter(view, riskId) {
  view.iterationSummaryActiveFilter = {
    kind: `risk`,
    riskId,
  };
  Object.assign(view.filter, au());

  if (riskId === `overdue`) {
    view.filter.quickSource = `requirement`;
    view.filter.quickCompletion = `unfinished`;
    view.filter.quickAttention = [`overdue`];
  } else if (riskId === `blocked`) {
    view.filter.quickSource = `task`;
    view.filter.quickCompletion = `unfinished`;
    view.filter.statuses = [...PM_ITERATION_BLOCKED_STATUSES];
  } else if (riskId === `unassigned`) {
    view.filter.quickSource = `task`;
    view.filter.quickCompletion = `unfinished`;
    view.filter.quickOwnership = `unassigned`;
  }

  pmIterationCommitFilter(view);
}

/**
 * 渲染需求、开发和测试任务进度卡片。
 */
function pmRenderIterationCategoryCard(container, view, category) {
  const activeFilter = view.iterationSummaryActiveFilter;
  const categoryActive = activeFilter?.kind === `category`
    && activeFilter.categoryId === category.id;
  const card = container.createDiv({
    cls: `pm-iteration-summary-card pm-iteration-summary-card--${category.id}`,
    attr: { role: `button`, tabindex: `0` },
  });
  card.toggleClass(`is-active`, categoryActive);
  card.addEventListener(`click`, () => pmIterationApplyCategoryFilter(view, category));
  card.addEventListener(`keydown`, (event) => {
    if (event.target !== card) return;
    if (event.key !== `Enter` && event.key !== ` `) return;

    event.preventDefault();
    pmIterationApplyCategoryFilter(view, category);
  });

  const header = card.createDiv(`pm-iteration-summary-card-header`);
  header.createSpan({ text: category.label, cls: `pm-iteration-summary-card-title` });
  header.createSpan({ text: `${category.metric.completionRate}%`, cls: `pm-iteration-summary-card-rate` });
  card.createDiv({ text: `共 ${category.metric.total} 项`, cls: `pm-iteration-summary-card-total` });

  const metrics = card.createDiv(`pm-iteration-summary-card-metrics`);
  const metricItems = [
    [`completed`, `已完成`, category.metric.completed],
    [`ongoing`, `进行中`, category.metric.ongoing],
    [`pending`, `待开始`, category.metric.pending],
    [`unfinished`, `未完成`, category.metric.unfinished],
  ];
  for (const [state, label, value] of metricItems) {
    const metricActive = categoryActive && activeFilter.state === state;
    const metric = metrics.createEl(`button`, {
      text: `${label} ${value}`,
      cls: `pm-iteration-summary-card-metric${metricActive ? ` is-active` : ``}`,
      attr: { type: `button` },
    });
    metric.addEventListener(`click`, (event) => {
      event.stopPropagation();
      pmIterationApplyCategoryFilter(view, category, state);
    });
  }

  const progress = card.createDiv(`pm-iteration-summary-progress`);
  progress.createDiv(`pm-iteration-summary-progress-fill`).setCssStyles({
    width: `${category.metric.completionRate}%`,
  });
}

/**
 * 渲染迭代总工时概览。
 */
function pmRenderIterationEffort(container, effort) {
  const effortContainer = container.createDiv(`pm-iteration-effort`);
  const items = [
    [`预计工时`, effort.estimate, ``],
    [`已消耗`, effort.consumed, ``],
    [`剩余工时`, effort.remaining, effort.remaining > 0 ? `is-warning` : ``],
    [`超时工时`, effort.overrun, effort.overrun > 0 ? `is-danger` : ``],
    [`未估时`, effort.unestimated, effort.unestimated > 0 ? `is-warning` : ``],
  ];

  for (const [label, value, tone] of items) {
    const item = effortContainer.createDiv(`pm-iteration-effort-item ${tone}`.trim());
    item.createSpan({ text: label, cls: `pm-iteration-effort-label` });
    item.createSpan({
      text: label === `未估时` ? `${value} 项` : pmIterationFormatHours(value),
      cls: `pm-iteration-effort-value`,
    });
  }
}

/**
 * 获取人员在当前迭代中的角色文案。
 */
function pmIterationMemberRole(view, memberName) {
  if (memberName === PM_ITERATION_UNASSIGNED) return `未分配`;

  const roles = pmEffectiveMemberRoles({ plugin: view.plugin }, view.project, memberName);
  return roles.length > 0
    ? roles.map((role) => PM_ITERATION_ROLE_LABELS[role] ?? role).join(`、`)
    : `未标记角色`;
}

/**
 * 渲染人员工时汇总，默认展示风险和剩余工时靠前的五人。
 */
function pmRenderIterationMembers(container, view, effort) {
  const section = container.createDiv(`pm-iteration-members`);
  const header = section.createDiv(`pm-iteration-members-heading`);
  header.createSpan({ text: `人员工时`, cls: `pm-iteration-members-title` });
  header.createSpan({ text: `共 ${effort.members.length} 人`, cls: `pm-iteration-members-count` });

  if (effort.members.length === 0) {
    section.createDiv({ text: `暂无人员工时数据`, cls: `pm-iteration-members-empty` });
    return;
  }

  const table = section.createDiv(`pm-iteration-members-table`);
  const tableHeader = table.createDiv(`pm-iteration-members-row pm-iteration-members-row--header`);
  for (const label of [`人员`, `任务进度`, `预计`, `消耗`, `剩余`, `工时状态`]) {
    tableHeader.createSpan({ text: label });
  }

  const visibleMembers = view.iterationSummaryMembersExpanded
    ? effort.members
    : effort.members.slice(0, PM_ITERATION_MEMBER_LIMIT);
  for (const member of visibleMembers) {
    const completionRate = member.total > 0 ? Math.round(member.completed / member.total * 100) : 0;
    const memberActive = view.iterationSummaryActiveFilter?.kind === `member`
      && view.iterationSummaryActiveFilter.memberName === member.name;
    const row = table.createEl(`button`, {
      cls: `pm-iteration-members-row pm-iteration-members-row--data${memberActive ? ` is-active` : ``}`,
      attr: { type: `button` },
    });
    row.addEventListener(`click`, () => pmIterationApplyMemberFilter(view, member.name));

    const identity = row.createSpan(`pm-iteration-member-identity`);
    identity.createSpan({ text: member.name, cls: `pm-iteration-member-name` });
    identity.createSpan({ text: pmIterationMemberRole(view, member.name), cls: `pm-iteration-member-role` });
    row.createSpan({ text: `${member.completed}/${member.total} · ${completionRate}%` });
    row.createSpan({ text: pmIterationFormatHours(member.estimate) });
    row.createSpan({ text: pmIterationFormatHours(member.consumed) });
    row.createSpan({ text: pmIterationFormatHours(member.remaining) });

    const stateText = member.overrun > 0
      ? `超时 ${pmIterationFormatHours(member.overrun)}`
      : member.remaining > 0
        ? `剩余 ${pmIterationFormatHours(member.remaining)}`
        : `正常`;
    row.createSpan({
      text: stateText,
      cls: `pm-iteration-member-effort-state${member.overrun > 0 ? ` is-danger` : ``}`,
    });
  }

  if (effort.members.length > PM_ITERATION_MEMBER_LIMIT) {
    const toggle = section.createEl(`button`, {
      text: view.iterationSummaryMembersExpanded ? `收起人员` : `展开全部人员`,
      cls: `pm-iteration-members-toggle`,
      attr: { type: `button` },
    });
    toggle.addEventListener(`click`, () => {
      view.iterationSummaryMembersExpanded = !view.iterationSummaryMembersExpanded;
      pmRenderIterationSummary(view);
    });
  }
}

/**
 * 渲染迭代风险入口，可准确映射到现有筛选条件的指标支持点击联动。
 */
function pmRenderIterationRisks(container, view, risks) {
  const section = container.createDiv(`pm-iteration-risks`);
  section.createSpan({ text: `风险`, cls: `pm-iteration-risks-title` });
  const clickableRisks = [
    [`overdue`, `逾期需求`, risks.overdueRequirements],
    [`blocked`, `阻塞任务`, risks.blockedTasks],
    [`unassigned`, `未分配任务`, risks.unassignedTasks],
  ];

  for (const [id, label, value] of clickableRisks) {
    const riskActive = view.iterationSummaryActiveFilter?.kind === `risk`
      && view.iterationSummaryActiveFilter.riskId === id;
    const button = section.createEl(`button`, {
      text: `${label} ${value}`,
      cls: `pm-iteration-risk-chip${value > 0 ? ` is-warning` : ``}${riskActive ? ` is-active` : ``}`,
      attr: { type: `button` },
    });
    button.addEventListener(`click`, () => pmIterationApplyRiskFilter(view, id));
  }

  section.createSpan({
    text: `未估时任务 ${risks.unestimatedTasks}`,
    cls: `pm-iteration-risk-chip${risks.unestimatedTasks > 0 ? ` is-warning` : ``}`,
  });
  section.createSpan({
    text: `超时任务 ${risks.overrunTasks}`,
    cls: `pm-iteration-risk-chip${risks.overrunTasks > 0 ? ` is-warning` : ``}`,
  });
}

/**
 * 渲染迭代详情页顶部全量概览。
 */
function pmRenderIterationSummary(view) {
  if (!view.iterationSummaryEl) return;
  view.iterationSummaryEl.empty();
  if (!view.project) return;

  const config = view.plugin.store.configFor(view.project);
  const summary = pmIterationSummary(view.project, config.statuses);
  const section = view.iterationSummaryEl.createDiv(`pm-iteration-summary`);
  const heading = section.createDiv(`pm-iteration-summary-heading`);
  const title = heading.createDiv(`pm-iteration-summary-title`);
  title.createSpan({ text: `迭代概览`, cls: `pm-iteration-summary-title-text` });

  const status = config.statuses.find((item) => item.id === view.project.status);
  title.createSpan({
    text: status?.label ?? view.project.status ?? `未设置状态`,
    cls: `pm-iteration-summary-status`,
  });
  title.createSpan({
    text: `${pmProjectMembers(view.project).length} 人`,
    cls: `pm-iteration-summary-member-count`,
  });

  const collapseButton = heading.createEl(`button`, {
    text: view.iterationSummaryCollapsed ? `展开` : `收起`,
    cls: `pm-iteration-summary-collapse`,
    attr: { type: `button` },
  });
  collapseButton.addEventListener(`click`, () => {
    view.iterationSummaryCollapsed = !view.iterationSummaryCollapsed;
    pmRenderIterationSummary(view);
  });

  if (view.iterationSummaryCollapsed) return;

  const body = section.createDiv(`pm-iteration-summary-body`);
  const cards = body.createDiv(`pm-iteration-summary-cards`);
  for (const category of summary.categories) pmRenderIterationCategoryCard(cards, view, category);

  pmRenderIterationEffort(body, summary.effort);
  pmRenderIterationMembers(body, view, summary.effort);
  pmRenderIterationRisks(body, view, summary.risks);
}

/**
 * 根据完整吸附操作区的实际高度更新表头吸附偏移。
 */
function pmUpdateIterationStickyOffset(view) {
  if (!view.iterationStickyEl || !view.iterationPageScrollEl) return;
  if (view.iterationLayoutFrame !== null && view.iterationLayoutFrame !== undefined) return;

  // 同一帧内可能收到多次尺寸通知，只保留一次布局计算，避免重复触发布局和样式重算。
  view.iterationLayoutFrame = window.requestAnimationFrame(() => {
    view.iterationLayoutFrame = null;
    if (!view.iterationStickyEl || !view.iterationPageScrollEl) return;

    const stickyHeight = view.iterationStickyEl?.offsetHeight ?? 0;
    const viewportHeight = view.iterationPageScrollEl.clientHeight || view.contentEl.clientHeight;
    const styleWindow = view.bodyEl.ownerDocument.defaultView ?? window;
    const moduleMarginBottom = Number.parseFloat(styleWindow.getComputedStyle(view.bodyEl).marginBottom) || 0;
    const moduleHeight = Math.max(0, viewportHeight - stickyHeight - moduleMarginBottom);
    const stickyHeightValue = `${stickyHeight}px`;
    const moduleHeightValue = `${moduleHeight}px`;

    // 只有计算结果真正变化时才写入样式，切断 ResizeObserver 与布局写入之间的反馈链。
    if (view.contentEl.style.getPropertyValue(`--pm-iteration-sticky-offset`) !== stickyHeightValue) {
      view.contentEl.style.setProperty(`--pm-iteration-sticky-offset`, stickyHeightValue);
    }
    if (view.contentEl.style.getPropertyValue(`--pm-iteration-table-header-top`) !== stickyHeightValue) {
      view.contentEl.style.setProperty(`--pm-iteration-table-header-top`, stickyHeightValue);
    }
    if (view.contentEl.style.getPropertyValue(`--pm-iteration-module-height`) !== moduleHeightValue) {
      view.contentEl.style.setProperty(`--pm-iteration-module-height`, moduleHeightValue);
    }
  });
}

/**
 * 将常用视图、快速组合和详细筛选整体移动到同一个吸附容器。
 */
function pmMountIterationStickyHeader(view) {
  if (!view.iterationStickyEl) return;

  const projectHeader = view.headerEl.querySelector(`.pm-project-header`);
  view.iterationStickyEl.empty();
  if (projectHeader) view.iterationStickyEl.appendChild(projectHeader);

  if (view.iterationLayoutFrame !== null && view.iterationLayoutFrame !== undefined) {
    window.cancelAnimationFrame(view.iterationLayoutFrame);
    view.iterationLayoutFrame = null;
  }
  view.iterationStickyResizeObserver?.disconnect();
  if (typeof ResizeObserver !== `undefined`) {
    view.iterationStickyResizeObserver = new ResizeObserver(() => pmUpdateIterationStickyOffset(view));
    view.iterationStickyResizeObserver.observe(view.iterationStickyEl);
    // 监听稳定的滚动视口，不监听会被本函数写入高度变量的 contentEl，避免尺寸反馈循环。
    view.iterationStickyResizeObserver.observe(view.iterationPageScrollEl);
  }
  pmUpdateIterationStickyOffset(view);
}

const projectTableRender = Yp.prototype.render;

// 表格只执行渐进式完整渲染，不再绑定滚动位置计算。
Yp.prototype.render = function render() {
  projectTableRender.call(this);
};

const projectTableDestroy = Yp.prototype.destroy;

// 切换视图或关闭迭代时取消尚未完成的渐进渲染。
Yp.prototype.destroy = function destroy() {
  if (this.state.pageProgressiveFrame !== null && this.state.pageProgressiveFrame !== undefined) {
    window.cancelAnimationFrame(this.state.pageProgressiveFrame);
  }
  this.state.pageProgressiveFrame = null;
  projectTableDestroy?.call(this);
};

const projectViewEnsureInitialized = Um.prototype.ensureInitialized;

// 在标题和筛选栏之间创建迭代概览挂载点。
Um.prototype.ensureInitialized = function ensureInitialized() {
  projectViewEnsureInitialized.call(this);
  if (this.iterationSummaryEl) return;

  this.contentEl.addClass(`pm-project-detail-root`);
  this.iterationSummaryEl = this.contentEl.createDiv(`pm-iteration-summary-mount`);
  this.headerEl.before(this.iterationSummaryEl);
  this.iterationStickyAnchorEl = this.contentEl.createDiv(`pm-iteration-sticky-anchor`);
  this.bodyEl.before(this.iterationStickyAnchorEl);
  this.iterationStickyEl = this.contentEl.createDiv(`pm-iteration-filter-sticky`);
  this.bodyEl.before(this.iterationStickyEl);
  this.iterationPageScrollEl = this.contentEl.createDiv(`pm-project-detail-scroll`);
  for (const element of [
    this.toolbarEl,
    this.iterationSummaryEl,
    this.headerEl,
    this.iterationStickyAnchorEl,
    this.iterationStickyEl,
    this.bodyEl,
  ]) {
    this.iterationPageScrollEl.appendChild(element);
  }
};

const projectViewRenderProjectHeader = Um.prototype.renderProjectHeader;

// 每次筛选栏重绘后重新挂载到吸附容器。
Um.prototype.renderProjectHeader = function renderProjectHeader() {
  projectViewRenderProjectHeader.call(this);
  pmMountIterationStickyHeader(this);
};

const projectViewHandleSavedViewUpdate = Um.prototype.handleSavedViewUpdate;

// 更新已保存视图会直接刷新头部组件，需要再次挂载完整吸附操作区。
Um.prototype.handleSavedViewUpdate = async function handleSavedViewUpdate(savedViewId) {
  await projectViewHandleSavedViewUpdate.call(this, savedViewId);
  pmMountIterationStickyHeader(this);
};

/**
 * 手动操作筛选栏时清除概览按钮的临时选中态。
 */
function pmClearIterationSummaryActiveFilter(view) {
  if (!view.iterationSummaryActiveFilter) return;

  view.iterationSummaryActiveFilter = null;
  for (const element of view.iterationSummaryEl?.querySelectorAll(`.is-active`) ?? []) {
    element.removeClass(`is-active`);
  }
}

const projectViewHandleQuickFilterMutation = Um.prototype.handleQuickFilterMutation;
Um.prototype.handleQuickFilterMutation = function handleQuickFilterMutation(filter) {
  pmClearIterationSummaryActiveFilter(this);
  return projectViewHandleQuickFilterMutation.call(this, filter);
};

const projectViewHandleQuickPresetSelect = Um.prototype.handleQuickPresetSelect;
Um.prototype.handleQuickPresetSelect = function handleQuickPresetSelect(preset) {
  pmClearIterationSummaryActiveFilter(this);
  return projectViewHandleQuickPresetSelect.call(this, preset);
};

const projectViewHandleFilterMutation = Um.prototype.handleFilterMutation;
Um.prototype.handleFilterMutation = function handleFilterMutation() {
  pmClearIterationSummaryActiveFilter(this);
  return projectViewHandleFilterMutation.call(this);
};

const projectViewHandleClearDetailedFilter = Um.prototype.handleClearDetailedFilter;
Um.prototype.handleClearDetailedFilter = function handleClearDetailedFilter() {
  pmClearIterationSummaryActiveFilter(this);
  return projectViewHandleClearDetailedFilter.call(this);
};

const projectViewHandleClearFilter = Um.prototype.handleClearFilter;
Um.prototype.handleClearFilter = function handleClearFilter() {
  pmClearIterationSummaryActiveFilter(this);
  return projectViewHandleClearFilter.call(this);
};

const projectViewHandleSavedViewSelect = Um.prototype.handleSavedViewSelect;
Um.prototype.handleSavedViewSelect = function handleSavedViewSelect(savedViewId) {
  pmClearIterationSummaryActiveFilter(this);
  return projectViewHandleSavedViewSelect.call(this, savedViewId);
};

const projectViewRenderCurrentView = Um.prototype.renderCurrentView;

// 表格视图启用整页滚动，甘特图和看板继续使用各自的内部布局。
Um.prototype.renderCurrentView = function renderCurrentView() {
  this.contentEl.toggleClass(`pm-project-detail-root--table`, this.currentView === `table`);
  projectViewRenderCurrentView.call(this);
};

const projectViewLoadProject = Um.prototype.loadProject;

// 首次进入或切换迭代后刷新概览。
Um.prototype.loadProject = async function loadProject() {
  await projectViewLoadProject.call(this);
  pmRenderIterationSummary(this);
};

const projectViewRefreshProject = Um.prototype.refreshProject;

// 事项发生变更时同步刷新概览和下方视图。
Um.prototype.refreshProject = function refreshProject() {
  pmRenderIterationSummary(this);
  return projectViewRefreshProject.call(this);
};

const projectViewRenderMissingProject = Um.prototype.renderMissingProject;

// 迭代文件不存在时清空旧概览，避免残留上一迭代数据。
Um.prototype.renderMissingProject = function renderMissingProject() {
  this.project = null;
  this.iterationSummaryEl?.empty();
  projectViewRenderMissingProject.call(this);
};

const PM_ITERATION_OPENING_PROJECTS = new Map();

// 优先复用已打开的迭代页；新页面先切换标签，再在下一帧加载详情内容。
$m.prototype.openProject = async function openProject(file) {
  const existingOpening = PM_ITERATION_OPENING_PROJECTS.get(file.path);
  if (existingOpening) return existingOpening;

  const opening = (async () => {
    const workspace = this.plugin.app.workspace;
    const existingLeaf = workspace.getLeavesOfType(Hm).find((leaf) => {
      const viewFilePath = leaf.view instanceof Um ? leaf.view.filePath : ``;
      const stateFilePath = String(leaf.getViewState()?.state?.filePath ?? ``);
      return viewFilePath === file.path || stateFilePath === file.path;
    });

    if (existingLeaf) {
      await workspace.revealLeaf(existingLeaf);
      return;
    }

    const leaf = workspace.getLeaf(`tab`);
    await workspace.revealLeaf(leaf);
    await new Promise((resolve) => window.requestAnimationFrame(() => resolve()));
    await leaf.setViewState({ type: Hm, state: { filePath: file.path } });
    await workspace.revealLeaf(leaf);
  })();

  PM_ITERATION_OPENING_PROJECTS.set(file.path, opening);
  try {
    await opening;
  } finally {
    PM_ITERATION_OPENING_PROJECTS.delete(file.path);
  }
};

// 当前筛选只在已打开的迭代视图中生效，重新进入迭代时始终使用默认筛选。
Um.prototype.loadFilterFromSettings = function loadFilterFromSettings() {
  this.filter = au();
  this.activeSavedViewId = null;
  this.kanbanGroupBy = `stage`;
  this.iterationSummaryActiveFilter = null;
};

// 禁止将临时筛选状态写入插件配置，避免退出或重启后恢复上次条件。
Um.prototype.persistFilter = async function persistFilter() {};

const projectViewOnClose = Um.prototype.onClose;

// 关闭迭代视图时同步删除可能存在的历史筛选记录。
Um.prototype.onClose = async function onClose() {
  if (this.iterationLayoutFrame !== null && this.iterationLayoutFrame !== undefined) {
    window.cancelAnimationFrame(this.iterationLayoutFrame);
    this.iterationLayoutFrame = null;
  }
  this.iterationStickyResizeObserver?.disconnect();
  this.iterationStickyResizeObserver = null;
  await projectViewOnClose.call(this);

  if (!this.filePath || !Object.prototype.hasOwnProperty.call(this.plugin.settings.projectFilters, this.filePath)) {
    return;
  }

  delete this.plugin.settings.projectFilters[this.filePath];
  await this.plugin.saveSettings();
};

const projectPluginLoadSettings = nh.prototype.loadSettings;

// 插件启动时清理旧版本已经持久化的筛选，覆盖退出或异常关闭的场景。
nh.prototype.loadSettings = async function loadSettings() {
  await projectPluginLoadSettings.call(this);

  if (Object.keys(this.settings.projectFilters).length === 0) return;

  this.settings.projectFilters = {};
  await this.saveSettings();
};

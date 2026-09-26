// 负责人筛选同时包含实际完成人，保留其他筛选条件原有的组合规则。
const pmOwnerFilterOriginalMembers = mu;
mu = function pmOwnerFilterMembers(tasks, extraMembers) {
  const members = pmOwnerFilterOriginalMembers(tasks, extraMembers);
  if (extraMembers !== undefined) return members;

  const names = new Set(members);
  for (const { task } of q(tasks)) {
    for (const value of [task.completedBy, task.customFields?.completedBy]) {
      const name = String(value ?? ``).trim();
      if (name) names.add(name);
    }
  }
  return [...names].sort((left, right) => left.localeCompare(right, `zh-CN`));
};

const pmOwnerFilterOriginalMatch = Od;
Od = function pmOwnerOrCompleterMatches(task, filter, statuses = []) {
  if (!filter.assignees?.length
    || task.assignees?.some((name) => filter.assignees.includes(name))) {
    return pmOwnerFilterOriginalMatch(task, filter, statuses);
  }

  const completedBy = String(task.customFields?.completedBy ?? task.completedBy ?? ``).trim();
  if (!filter.assignees.includes(completedBy)) return false;
  return pmOwnerFilterOriginalMatch(task, { ...filter, assignees: [] }, statuses);
};

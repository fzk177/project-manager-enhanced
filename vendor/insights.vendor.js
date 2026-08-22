"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ProjectManagerInsightsPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian6 = require("obsidian");

// src/adapters/project-manager.ts
var DEFAULT_PRIORITIES = [
  { id: "critical", label: "Critical", color: "#c47070" },
  { id: "high", label: "High", color: "#b8a06b" },
  { id: "medium", label: "Medium", color: "#8a94a0" },
  { id: "low", label: "Low", color: "#79b58d" }
];
function text(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}
function optionalText(value) {
  const result = text(value).trim();
  return result ? result : null;
}
function number(value) {
  const result = typeof value === "number" ? value : Number(value);
  return Number.isFinite(result) && result > 0 ? result : 0;
}
function optionalHours(value) {
  if (value === null || value === void 0 || typeof value === "string" && !value.trim()) return null;
  const result = typeof value === "number" ? value : Number(value);
  return Number.isFinite(result) && result >= 0 ? result : null;
}
function stringList(value) {
  if (Array.isArray(value)) return value.filter((item) => typeof item === "string");
  return typeof value === "string" && value.trim() ? [value.trim()] : [];
}
function taskTags(value) {
  return stringList(value).map((tag) => tag.trim().replace(/^#+/u, "")).filter(Boolean);
}
function quickSourceType(task2) {
  // 需求与任务以禅道来源字段为准，业务对象不再依赖事项层级。
  const sourceType = String(task2.customFields?.zentaoSourceType ?? "");
  if (sourceType === "story" || task2.tags.includes("zentao-requirement")) return "requirement";
  if (sourceType === "task" || task2.tags.includes("zentao-task")) return "task";
  if (sourceType === "execution" || task2.type === "milestone" || task2.tags.includes("zentao-milestone")) return "milestone";
  if (task2.type === "task" || task2.type === "subtask") return "task";
  return "local";
}
function loggedHours(value) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return value.reduce((total, item) => {
    if (!item || typeof item !== "object") return total;
    return total + number(item.hours);
  }, 0);
}
function truthy(value) {
  return value === true || value === "true";
}
function settings(value) {
  var _a, _b;
  const completeStatuses = /* @__PURE__ */ new Set(["done", "completed", "cancelled", "canceled"]);
  let priorities = DEFAULT_PRIORITIES.map((priority) => ({ ...priority }));
  const parsed = value;
  for (const status of (_a = parsed == null ? void 0 : parsed.statuses) != null ? _a : []) {
    if (status.complete === true && typeof status.id === "string") {
      completeStatuses.add(status.id);
    }
  }
  const configuredPriorities = ((_b = parsed == null ? void 0 : parsed.priorities) != null ? _b : []).flatMap((priority) => {
    const id = text(priority.id).trim();
    if (!id) return [];
    return [{
      id,
      label: text(priority.label, id).trim() || id,
      color: text(priority.color).trim()
    }];
  });
  if (configuredPriorities.length > 0) priorities = configuredPriorities;
  const definitions = (items) => (Array.isArray(items) ? items : []).flatMap((item) => {
    const id = text(item?.id).trim();
    if (!id) return [];
    return [{ id, label: text(item?.label, id).trim() || id, color: text(item?.color).trim() }];
  });
  return { completeStatuses, priorities, stages: definitions(parsed?.stages), statuses: definitions(parsed?.statuses) };
}
function project(document2) {
  const frontmatter2 = document2.frontmatter;
  if (!frontmatter2) return null;
  const id = text(frontmatter2.id).trim();
  if (!id) return null;
  return {
    id,
    title: text(frontmatter2.title, document2.basename).trim() || document2.basename,
    path: document2.path,
    icon: text(frontmatter2.icon, "\u{1F4CB}")
  };
}
function task(document2, completeStatuses) {
  const frontmatter2 = document2.frontmatter;
  if (!frontmatter2) return null;
  const id = text(frontmatter2.id).trim();
  const projectId = text(frontmatter2.projectId).trim();
  if (!id || !projectId) return null;
  const status = text(frontmatter2.status, "todo");
  const progress = number(frontmatter2.progress);
  const customFields = frontmatter2.customFields && typeof frontmatter2.customFields === "object" ? frontmatter2.customFields : {};
  const tags = taskTags(frontmatter2.tags);
  const type = text(frontmatter2.type, "task");
  const syncedEstimate = optionalHours(customFields.estimatedHours);
  const syncedLogged = optionalHours(customFields.consumedHours);
  const syncedRemaining = optionalHours(customFields.remainingHours);
  const displayEstimate = optionalHours(customFields.displayEstimatedHours);
  const displayLogged = optionalHours(customFields.displayConsumedHours);
  const displayRemaining = optionalHours(customFields.displayRemainingHours);
  const localLogged = loggedHours(frontmatter2.timeLogs);
  const completedAt = optionalText(frontmatter2.completed);
  const hasSyncedHours = Object.prototype.hasOwnProperty.call(customFields, "estimatedHours") || Object.prototype.hasOwnProperty.call(customFields, "consumedHours") || Object.prototype.hasOwnProperty.call(customFields, "remainingHours");
  return {
    id,
    projectId,
    parentId: optionalText(frontmatter2.parentId),
    type,
    sourceType: quickSourceType({ customFields, tags, type }),
    zentaoId: optionalText(customFields.zentaoId),
    module: optionalText(customFields.zentaoModule),
    title: text(frontmatter2.title, document2.basename).trim() || document2.basename,
    path: document2.path,
    status,
    stage: optionalText(frontmatter2.stage),
    start: optionalText(frontmatter2.start),
    due: optionalText(frontmatter2.due),
    priority: optionalText(frontmatter2.priority),
    tags,
    assignees: stringList(frontmatter2.assignees),
    completedBy: optionalText(customFields.completedBy ?? frontmatter2.completedBy),
    // 禅道同步事项以接口返回的三个工时字段为准，本地事项继续使用 Project Manager 原生字段。
    estimate: hasSyncedHours ? syncedEstimate ?? number(frontmatter2.timeEstimate) : number(frontmatter2.timeEstimate),
    logged: hasSyncedHours ? syncedLogged ?? localLogged ?? 0 : localLogged ?? 0,
    remainingOverride: hasSyncedHours ? syncedRemaining : null,
    displayEstimate,
    displayLogged,
    displayRemaining,
    completedAt,
    actualStartedAt: optionalText(customFields.actualStartedAt),
    actualFinishedAt: optionalText(customFields.actualFinishedAt),
    dependencies: stringList(frontmatter2.dependencies),
    progress,
    completed: Boolean(completedAt) || progress >= 100 || completeStatuses.has(status),
    archived: truthy(frontmatter2.archived),
    customFields
  };
}
function entry(document2, completeStatuses) {
  const frontmatter2 = document2.frontmatter;
  if (!frontmatter2) return null;
  if (truthy(frontmatter2["pm-project"])) {
    const record = project(document2);
    return record ? { kind: "project", record } : null;
  }
  if (truthy(frontmatter2["pm-task"])) {
    const record = task(document2, completeStatuses);
    return record ? { kind: "task", record } : null;
  }
  return null;
}
function stringArraysEqual(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
function entriesEqual(left, right) {
  if (!left && !right) return true;
  if (!left || !right || left.kind !== right.kind) return false;
  if (left.kind === "project" && right.kind === "project") {
    return left.record.id === right.record.id && left.record.title === right.record.title && left.record.path === right.record.path && left.record.icon === right.record.icon;
  }
  if (left.kind !== "task" || right.kind !== "task") return false;
  return left.record.id === right.record.id && left.record.projectId === right.record.projectId && left.record.parentId === right.record.parentId && left.record.type === right.record.type && left.record.sourceType === right.record.sourceType && left.record.zentaoId === right.record.zentaoId && left.record.module === right.record.module && left.record.title === right.record.title && left.record.path === right.record.path && left.record.stage === right.record.stage && left.record.start === right.record.start && left.record.due === right.record.due && left.record.status === right.record.status && left.record.priority === right.record.priority && left.record.completedBy === right.record.completedBy && stringArraysEqual(left.record.tags, right.record.tags) && stringArraysEqual(left.record.assignees, right.record.assignees) && stringArraysEqual(left.record.dependencies, right.record.dependencies) && left.record.estimate === right.record.estimate && left.record.logged === right.record.logged && left.record.remainingOverride === right.record.remainingOverride && left.record.displayEstimate === right.record.displayEstimate && left.record.displayLogged === right.record.displayLogged && left.record.displayRemaining === right.record.displayRemaining && left.record.completedAt === right.record.completedAt && left.record.actualStartedAt === right.record.actualStartedAt && left.record.actualFinishedAt === right.record.actualFinishedAt && left.record.progress === right.record.progress && left.record.completed === right.record.completed && left.record.archived === right.record.archived;
}
function prioritiesEqual(left, right) {
  return left.length === right.length && left.every((priority, index) => {
    const candidate = right[index];
    return candidate !== void 0 && priority.id === candidate.id && priority.label === candidate.label && priority.color === candidate.color;
  });
}
var ProjectManagerCatalog = class {
  constructor(source) {
    __publicField(this, "source", source);
    __publicField(this, "entries", /* @__PURE__ */ new Map());
    __publicField(this, "listeners", /* @__PURE__ */ new Set());
    __publicField(this, "current", null);
    __publicField(this, "currentSettings", settings(null));
    __publicField(this, "operation", null);
    __publicField(this, "queuedChanges", []);
    __publicField(this, "reconcileQueued", false);
    __publicField(this, "stopWatching", null);
  }
  async snapshot() {
    if (this.current) return this.current;
    return this.replaceFromSource(false);
  }
  async reconcile() {
    return this.replaceFromSource(true);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.ensureWatching();
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0 && this.stopWatching) {
        this.stopWatching();
        this.stopWatching = null;
      }
    };
  }
  ensureWatching() {
    if (this.stopWatching) return;
    this.stopWatching = this.source.watch((change) => this.receive(change));
  }
  async replaceFromSource(notify) {
    if (this.operation) return this.operation;
    this.ensureWatching();
    const previous = this.current;
    const operation = (async () => {
      const sourceSnapshot = await this.source.scan();
      const nextSettings = settings(sourceSnapshot.settings);
      const nextEntries = /* @__PURE__ */ new Map();
      for (const document2 of sourceSnapshot.documents) {
        const next = entry(document2, nextSettings.completeStatuses);
        if (next) nextEntries.set(document2.path, next);
      }
      this.entries.clear();
      for (const [path, next] of nextEntries) this.entries.set(path, next);
      this.currentSettings = nextSettings;
      this.current = this.createSnapshot();
      const queued = this.queuedChanges;
      this.queuedChanges = [];
      for (const change of queued) this.apply(change, false);
      if (notify && previous !== null && !this.snapshotsEqual(previous, this.current)) {
        this.notify();
      }
      return this.current;
    })();
    this.operation = operation;
    try {
      return await operation;
    } finally {
      this.operation = null;
      if (this.reconcileQueued) {
        this.reconcileQueued = false;
        void this.reconcile().catch(() => void 0);
      }
    }
  }
  receive(change) {
    if (this.operation) {
      if (change.kind === "reconcile") this.reconcileQueued = true;
      else this.queuedChanges.push(change);
      return;
    }
    if (change.kind === "reconcile") {
      void this.reconcile().catch(() => void 0);
      return;
    }
    if (!this.current) return;
    this.apply(change, true);
  }
  apply(change, notify) {
    if (change.kind === "reconcile") return;
    let changed = false;
    if (change.kind === "upsert") {
      const next = entry(change.document, this.currentSettings.completeStatuses);
      const previous = this.entries.get(change.document.path);
      if (!entriesEqual(previous, next)) {
        if (next) this.entries.set(change.document.path, next);
        else this.entries.delete(change.document.path);
        changed = true;
      }
    } else if (change.recursive) {
      const prefix = `${change.path}/`;
      for (const path of [...this.entries.keys()]) {
        if (path === change.path || path.startsWith(prefix)) {
          this.entries.delete(path);
          changed = true;
        }
      }
    } else {
      changed = this.entries.delete(change.path);
    }
    if (!changed) return;
    this.current = this.createSnapshot();
    if (notify) this.notify();
  }
  createSnapshot() {
    const projects = [];
    const tasks = [];
    for (const catalogEntry of this.entries.values()) {
      if (catalogEntry.kind === "project") projects.push(catalogEntry.record);
      else tasks.push(catalogEntry.record);
    }
    return {
      projects: projects.sort((left, right) => left.title.localeCompare(right.title)),
      tasks,
      priorities: this.currentSettings.priorities.map((priority) => ({ ...priority })),
      stages: this.currentSettings.stages.map((stage) => ({ ...stage })),
      statuses: this.currentSettings.statuses.map((status) => ({ ...status }))
    };
  }
  notify() {
    if (!this.current) return;
    for (const listener of this.listeners) listener(this.current);
  }
  snapshotsEqual(left, right) {
    if (!prioritiesEqual(left.priorities, right.priorities) || !prioritiesEqual(left.stages, right.stages) || !prioritiesEqual(left.statuses, right.statuses)) return false;
    if (left.projects.length !== right.projects.length || left.tasks.length !== right.tasks.length) {
      return false;
    }
    const leftEntries = /* @__PURE__ */ new Map();
    for (const record of left.projects) leftEntries.set(record.path, { kind: "project", record });
    for (const record of left.tasks) leftEntries.set(record.path, { kind: "task", record });
    for (const record of right.projects) {
      if (!entriesEqual(leftEntries.get(record.path), { kind: "project", record })) return false;
    }
    for (const record of right.tasks) {
      if (!entriesEqual(leftEntries.get(record.path), { kind: "task", record })) return false;
    }
    return true;
  }
};

// src/adapters/project-manager-source.ts
var import_obsidian = require("obsidian");
var DEFAULT_PROJECTS_FOLDER = "Projects";
function settingsFolder(settings2) {
  const configured = typeof (settings2 == null ? void 0 : settings2.projectsFolder) === "string" ? settings2.projectsFolder.trim() : "";
  return (0, import_obsidian.normalizePath)(configured || DEFAULT_PROJECTS_FOLDER);
}
function frontmatter(cache) {
  var _a;
  return (_a = cache == null ? void 0 : cache.frontmatter) != null ? _a : null;
}
var ObsidianProjectManagerSource = class {
  constructor(app) {
    __publicField(this, "app", app);
    __publicField(this, "managedFolder", DEFAULT_PROJECTS_FOLDER);
  }
  async scan() {
    const settings2 = await this.readSettings();
    this.managedFolder = settingsFolder(settings2);
    const documents = [];
    const root = this.app.vault.getAbstractFileByPath(this.managedFolder);
    if (root instanceof import_obsidian.TFolder) this.collect(root, documents);
    return { documents, settings: settings2 };
  }
  watch(listener) {
    const metadataRef = this.app.metadataCache.on("changed", (file, _data, cache) => {
      if (!this.isManaged(file.path)) return;
      listener({ kind: "upsert", document: this.document(file, cache) });
    });
    const createRef = this.app.vault.on("create", (file) => {
      if (!(file instanceof import_obsidian.TFile) || file.extension !== "md" || !this.isManaged(file.path)) {
        return;
      }
      const cache = this.app.metadataCache.getFileCache(file);
      if (cache) listener({ kind: "upsert", document: this.document(file, cache) });
    });
    const deleteRef = this.app.vault.on("delete", (file) => {
      if (!this.isManaged(file.path)) return;
      listener({ kind: "remove", path: file.path, recursive: file instanceof import_obsidian.TFolder });
    });
    const renameRef = this.app.vault.on("rename", (file, oldPath) => {
      if (file instanceof import_obsidian.TFolder) {
        if (this.isManaged(oldPath) || this.isManaged(file.path)) listener({ kind: "reconcile" });
        return;
      }
      if (this.isManaged(oldPath)) {
        listener({ kind: "remove", path: oldPath });
      }
      if (!(file instanceof import_obsidian.TFile) || file.extension !== "md" || !this.isManaged(file.path)) {
        return;
      }
      const cache = this.app.metadataCache.getFileCache(file);
      if (cache) listener({ kind: "upsert", document: this.document(file, cache) });
    });
    return () => {
      this.app.metadataCache.offref(metadataRef);
      this.app.vault.offref(createRef);
      this.app.vault.offref(deleteRef);
      this.app.vault.offref(renameRef);
    };
  }
  collect(folder, documents) {
    for (const child of folder.children) {
      if (child instanceof import_obsidian.TFolder) {
        this.collect(child, documents);
      } else if (child instanceof import_obsidian.TFile && child.extension === "md") {
        documents.push(this.document(child, this.app.metadataCache.getFileCache(child)));
      }
    }
  }
  document(file, cache) {
    return {
      path: file.path,
      basename: file.basename,
      frontmatter: frontmatter(cache)
    };
  }
  isManaged(path) {
    return path === this.managedFolder || path.startsWith(`${this.managedFolder}/`);
  }
  async readSettings() {
    const path = `${this.app.vault.configDir}/plugins/project-manager/data.json`;
    try {
      if (!await this.app.vault.adapter.exists(path)) return null;
      const parsed = JSON.parse(await this.app.vault.adapter.read(path));
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (e) {
      return null;
    }
  }
};

// src/adapters/project-manager-navigation.ts
var import_obsidian2 = require("obsidian");
var PROJECT_MANAGER_ID = "project-manager";
var PROJECT_VIEW_TYPE = "pm-project";
var COMPATIBLE_VERSION = /^1\.8\./u;
var RENDER_TIMEOUT_MS = 2500;
var POLL_INTERVAL_MS = 40;
var DetachedProjectLeaf = class extends import_obsidian2.Events {
  constructor(app) {
    super();
    __publicField(this, "app", app);
    __publicField(this, "containerEl");
    __publicField(this, "history", { backHistory: [], forwardHistory: [] });
    __publicField(this, "rootEl");
    this.rootEl = createDiv("pmi-detached-project-host");
    this.rootEl.setAttribute("aria-hidden", "true");
    this.rootEl.append(createDiv());
    this.containerEl = createDiv("pmi-detached-project-container");
    this.containerEl.append(createDiv(), createDiv());
    this.rootEl.append(this.containerEl);
    document.body.append(this.rootEl);
  }
  updateHeader() {
  }
  destroy() {
    this.rootEl.remove();
  }
};
var ProjectManagerNavigationError = class extends Error {
  constructor(code) {
    super(code);
    __publicField(this, "code", code);
    this.name = "ProjectManagerNavigationError";
  }
};
var ProjectManagerNavigator = class {
  constructor(app) {
    __publicField(this, "app", app);
    __publicField(this, "openingTask", false);
  }
  async openProject(projectPath) {
    var _a;
    const plugin = this.plugin();
    if (!((_a = plugin.router) == null ? void 0 : _a.openProjectByPath)) {
      throw new ProjectManagerNavigationError("project-router-unavailable");
    }
    await plugin.router.openProjectByPath(projectPath);
  }
  async editTask(target) {
    var _a, _b;
    if (this.openingTask) return;
    this.openingTask = true;
    let detachedLeaf = null;
    let projectView = null;
    try {
      const plugin = this.plugin();
      if (!COMPATIBLE_VERSION.test((_b = (_a = plugin.manifest) == null ? void 0 : _a.version) != null ? _b : "")) {
        throw new ProjectManagerNavigationError("unsupported-version");
      }
      const existingModals = new Set(document.querySelectorAll(".modal-container"));
      ({ leaf: detachedLeaf, view: projectView } = await this.createDetachedProjectView(
        target.projectPath
      ));
      const taskButton = await this.findTaskButton(projectView, target.taskId);
      if (!taskButton) throw new ProjectManagerNavigationError("task-not-found");
      taskButton.click();
      const modal = await this.waitFor(
        () => [...document.querySelectorAll(".modal-container")].find(
          (candidate) => !existingModals.has(candidate)
        )
      );
      if (!modal) throw new ProjectManagerNavigationError("task-editor-unavailable");
      await this.waitForRemoval(modal);
    } finally {
      try {
        if (detachedLeaf) await this.disposeDetachedProjectView(detachedLeaf, projectView);
      } finally {
        this.openingTask = false;
      }
    }
  }
  async createDetachedProjectView(projectPath) {
    var _a, _b, _c;
    const registry = this.app.viewRegistry;
    const createView = (_a = registry == null ? void 0 : registry.getViewCreatorByType) == null ? void 0 : _a.call(registry, PROJECT_VIEW_TYPE);
    if (!createView) throw new ProjectManagerNavigationError("task-editor-unavailable");
    const leaf = new DetachedProjectLeaf(this.app);
    let view = null;
    try {
      view = createView(leaf);
      if (!view.setState) throw new ProjectManagerNavigationError("task-editor-unavailable");
      (_b = view.load) == null ? void 0 : _b.call(view);
      await ((_c = view.onOpen) == null ? void 0 : _c.call(view));
      await view.setState({ filePath: projectPath }, {});
      // 隐藏导航视图必须使用表格模式，甘特图和看板没有可供任务定位的表格行状态。
      if (view.currentView !== "table" && typeof view.renderCurrentView === "function") {
        view.currentView = "table";
        view.renderCurrentView();
      }
      return { leaf, view };
    } catch (error) {
      await this.disposeDetachedProjectView(leaf, view).catch(() => void 0);
      throw error;
    }
  }
  async disposeDetachedProjectView(leaf, view) {
    var _a, _b;
    try {
      await ((_a = view == null ? void 0 : view.onClose) == null ? void 0 : _a.call(view));
    } finally {
      try {
        (_b = view == null ? void 0 : view.unload) == null ? void 0 : _b.call(view);
      } finally {
        leaf.destroy();
      }
    }
  }
  plugin() {
    const registry = this.app.plugins;
    const plugin = registry == null ? void 0 : registry.getPlugin(PROJECT_MANAGER_ID);
    if (!plugin) throw new ProjectManagerNavigationError("plugin-unavailable");
    return plugin;
  }
  async findTaskButton(view, taskId) {
    var _a, _b, _c, _d, _e, _f, _g;
    const ready = await this.waitFor(() => {
      var _a2;
      return view.project && ((_a2 = view.subview) == null ? void 0 : _a2.state);
    });
    if (!ready) return null;
    this.revealAllTasks(view);
    await ((_b = (_a = view.subview) == null ? void 0 : _a.refresh) == null ? void 0 : _b.call(_a));
    const firstAttempt = await this.waitFor(() => this.taskButton(view.containerEl, taskId), 400);
    if (firstAttempt) return firstAttempt;
    const state = (_c = view.subview) == null ? void 0 : _c.state;
    const rowIndex = (_e = (_d = state == null ? void 0 : state.visibleRows) == null ? void 0 : _d.findIndex((row) => {
      var _a2;
      return ((_a2 = row.task) == null ? void 0 : _a2.id) === taskId;
    })) != null ? _e : -1;
    const wrapper = state == null ? void 0 : state.wrapper;
    if (rowIndex < 0 || !(wrapper instanceof HTMLElement)) return null;
    const rowHeight = Math.max(1, (_f = state == null ? void 0 : state.rowHeight) != null ? _f : 48);
    wrapper.scrollTop = Math.max(0, rowIndex * rowHeight - rowHeight * 2);
    wrapper.dispatchEvent(new Event("scroll"));
    return (_g = await this.waitFor(() => this.taskButton(view.containerEl, taskId))) != null ? _g : null;
  }
  revealAllTasks(view) {
    var _a, _b, _c, _d;
    const resetFilter = (filter) => {
      if (!filter) return;
      Object.assign(filter, {
        text: "",
        stages: [],
        statuses: [],
        priorities: [],
        assignees: [],
        participants: [],
        tags: [],
        dueDateFilter: "any",
        showArchived: true,
        quickSource: "all",
        quickWorkType: "all",
        quickCompletion: "all",
        quickOwnership: "all",
        quickAttention: [],
        quickOwner: "",
        quickPreset: ""
      });
    };
    resetFilter(view.filter);
    resetFilter((_b = (_a = view.subview) == null ? void 0 : _a.state) == null ? void 0 : _b.filter);
    view.activeSavedViewId = null;
    const expand = (tasks) => {
      var _a2;
      for (const task2 of tasks) {
        task2.collapsed = false;
        expand((_a2 = task2.subtasks) != null ? _a2 : []);
      }
    };
    expand((_d = (_c = view.project) == null ? void 0 : _c.tasks) != null ? _d : []);
  }
  taskButton(container, taskId) {
    const rows = container.querySelectorAll("[data-task-id]");
    for (const row of rows) {
      if (row.dataset.taskId !== taskId) continue;
      const button = row.querySelector(".pm-task-title-text");
      if (button) return button;
    }
    return void 0;
  }
  async waitFor(read, timeout = RENDER_TIMEOUT_MS) {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const result = read();
      if (result) return result;
      await new Promise((resolve) => window.setTimeout(resolve, POLL_INTERVAL_MS));
    }
    return null;
  }
  async waitForRemoval(element) {
    if (!element.isConnected) return;
    await new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        if (element.isConnected) return;
        observer.disconnect();
        resolve();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
};

// src/i18n.ts
var en = {
  viewName: "PM Insights",
  commandOpen: "Open workload insights",
  commandRefresh: "Refresh workload insights",
  toolbarTooltip: "Open assignee insights",
  eyebrow: "PROJECT MANAGER \xB7 CURRENT SNAPSHOT",
  heading: "Assignee workload",
  intro: "Compare planned, logged, and remaining work across projects without changing task data.",
  projects: "Projects",
  projectCount: (count) => `${count} selected`,
  projectSearch: "Find a project\u2026",
  selectAll: "Select all",
  clear: "Clear",
  object: "Object",
  all: "All",
  requirement: "Requirement",
  task: "Task",
  refresh: "Refresh",
  planned: "Planned",
  logged: "Logged",
  remaining: "Remaining",
  overrun: "Overrun",
  personal: "Personal",
  shared: "Shared",
  unassigned: "Unassigned",
  unestimated: "Unestimated",
  qualityTitle: "Data quality",
  qualitySummary: (requirements, tasks, unestimated, unassigned) => `${requirements} requirements \xB7 ${tasks} tasks \xB7 ${unestimated} unestimated \xB7 ${unassigned} unassigned`,
  members: "Assignees",
  memberSearch: "Find an assignee\u2026",
  memberRatios: "Delivery ledger",
  deliveryRatios: "Delivery",
  timeRatios: "Time",
  dataRatios: "Data foundation",
  taskClosureRate: "Task closure",
  taskClosureRateHint: "Completed non-cancelled tasks out of all non-cancelled tasks.",
  plannedClosureRate: "Planned work closed",
  plannedClosureRateHint: "Planned hours on completed tasks out of all estimated hours.",
  timeConsumptionRate: "Time consumed",
  timeConsumptionRateHint: "Logged hours on estimated tasks compared with their planned hours.",
  overrunTaskRate: "Tasks over budget",
  overrunTaskRateHint: "Started estimated tasks whose logged hours exceed their plan.",
  estimateAccuracyRate: "Estimate accuracy",
  estimateAccuracyRateHint: "Completed tasks whose logged hours are within 20% of their estimate.",
  estimateCoverageRate: "Estimate coverage",
  estimateCoverageRateHint: "Non-cancelled tasks that have a time estimate.",
  ratioUnavailable: "\u2014",
  percentage: (value) => `${value.toLocaleString(void 0, { maximumFractionDigits: 1 })}%`,
  ratioTasks: (numerator, denominator) => `${numerator} / ${denominator} tasks`,
  ratioHours: (numerator, denominator) => `${numerator.toLocaleString(void 0, { maximumFractionDigits: 2 })}h / ${denominator.toLocaleString(void 0, { maximumFractionDigits: 2 })}h`,
  tasks: "Tasks",
  taskId: "Item ID",
  item: "Item",
  taskSearch: "Find a task\u2026",
  allProjects: "All projects",
  allTaskStatuses: "All statuses",
  allPriorities: "All priorities",
  noneSelected: "None selected",
  selectedCount: (count) => `${count} selected`,
  optionCount: (count) => `${count} available`,
  resetFilters: "Reset filters",
  taskFilterResult: (visible, total) => `Showing ${visible} of ${total} tasks`,
  memberWorkResult: (visibleTasks, totalTasks, source = "all") => {
    const visibleRequirements = visibleTasks.filter((task2) => task2.sourceType === "requirement").length;
    const totalRequirements = totalTasks.filter((task2) => task2.sourceType === "requirement").length;
    const visibleWorkItems = visibleTasks.length - visibleRequirements;
    const totalWorkItems = totalTasks.length - totalRequirements;
    if (source === "requirement") return `Showing ${visibleRequirements} / ${totalRequirements} requirements`;
    if (source === "task") return `Showing ${visibleWorkItems} / ${totalWorkItems} tasks`;
    return `Showing ${visibleRequirements} requirements · ${visibleTasks.length - visibleRequirements} tasks / ${totalRequirements} requirements · ${totalTasks.length - totalRequirements} tasks`;
  },
  resizeColumn: (column) => `Resize ${column} column`,
  resizeColumnHint: (column) => `Drag to resize the ${column} column. Use the arrow keys for precise adjustment. Double-click to reset all columns.`,
  project: "Project",
  module: "Module",
  stage: "Stage",
  assignee: "Assignee",
  completedBy: "Completed by",
  due: "Due date",
  progress: "Progress",
  work: "Work",
  workHours: (logged, planned) => `${logged.toLocaleString(void 0, { maximumFractionDigits: 2 })}/${planned.toLocaleString(void 0, { maximumFractionDigits: 2 })}h`,
  priority: "Priority",
  status: "Status",
  noPriority: "No priority",
  sortPriority: "Sort by priority",
  priorityHighToLow: "High to low",
  priorityLowToHigh: "Low to high",
  assignment: "Assignment",
  noProjectsTitle: "Choose projects to build a workload view",
  noProjectsBody: "Select one or more Project Manager projects above.",
  noDataTitle: "No Project Manager projects found",
  noDataBody: "Enable Project Manager and create a project. This plugin only reads Project Manager notes.",
  noMembers: "No assignees match this search.",
  noTasks: "No tasks match the current filters.",
  openTask: "Open task",
  openProject: "Open project in a new tab",
  projectManagerUnavailable: "Project Manager is unavailable. Make sure the plugin is enabled.",
  projectManagerVersionUnsupported: "This Project Manager version does not support opening task details from PM Insights.",
  taskEditorUnavailable: "Could not open this task in Project Manager.",
  settingsHeading: "PM Insights",
  language: "Language",
  languageDesc: "Use Obsidian's language or choose a language for this plugin.",
  automatic: "Automatic",
  english: "English",
  chinese: "\u7B80\u4F53\u4E2D\u6587",
  aliases: "Member aliases",
  aliasesDesc: "Combine different assignee spellings under one canonical member. Project Manager data is not changed.",
  canonicalName: "Canonical name",
  aliasNames: "Aliases, separated by commas",
  addAlias: "Add member mapping",
  removeAlias: "Remove member mapping",
  hours: (value) => `${value.toLocaleString(void 0, { maximumFractionDigits: 2 })}h`,
  taskCount: (count) => `${count} task${count === 1 ? "" : "s"}`,
  memberWorkCount: (tasks, source = "all") => {
    const requirements = tasks.filter((task2) => task2.sourceType === "requirement").length;
    const workItems = tasks.length - requirements;
    if (source === "requirement") return `${requirements} requirement${requirements === 1 ? "" : "s"}`;
    if (source === "task") return `${workItems} task${workItems === 1 ? "" : "s"}`;
    return `${requirements} requirement${requirements === 1 ? "" : "s"} · ${workItems} task${workItems === 1 ? "" : "s"}`;
  },
  archived: "Archived"
};
var zh = {
  viewName: "PM \u6D1E\u5BDF",
  commandOpen: "\u6253\u5F00\u5DE5\u4F5C\u91CF\u6D1E\u5BDF",
  commandRefresh: "\u5237\u65B0\u5DE5\u4F5C\u91CF\u6D1E\u5BDF",
  toolbarTooltip: "\u6253\u5F00\u6210\u5458\u7EDF\u8BA1",
  eyebrow: "PROJECT MANAGER \xB7 \u5F53\u524D\u5FEB\u7167",
  heading: "\u6210\u5458\u5DE5\u4F5C\u91CF",
  intro: "\u8DE8\u9879\u76EE\u6838\u5BF9\u8BA1\u5212\u3001\u5DF2\u767B\u8BB0\u548C\u5269\u4F59\u5DE5\u65F6\uFF0C\u4E0D\u4FEE\u6539\u4EFB\u4F55\u4EFB\u52A1\u6570\u636E\u3002",
  projects: "\u9879\u76EE",
  projectCount: (count) => `\u5DF2\u9009\u62E9 ${count} \u4E2A`,
  projectSearch: "\u67E5\u627E\u9879\u76EE\u2026",
  selectAll: "\u5168\u9009",
  clear: "\u6E05\u7A7A",
  object: "\u5BF9\u8C61",
  all: "\u5168\u90E8",
  requirement: "\u9700\u6C42",
  task: "\u4EFB\u52A1",
  refresh: "\u5237\u65B0",
  planned: "\u8BA1\u5212",
  logged: "\u5DF2\u767B\u8BB0",
  remaining: "\u5269\u4F59",
  overrun: "\u8D85\u51FA",
  personal: "\u4E2A\u4EBA",
  shared: "\u5171\u4EAB",
  unassigned: "\u672A\u5206\u914D",
  unestimated: "\u672A\u4F30\u7B97",
  qualityTitle: "\u6570\u636E\u8D28\u91CF",
  qualitySummary: (requirements, tasks, unestimated, unassigned) => `${requirements} \u4E2A\u9700\u6C42 \xB7 ${tasks} \u4E2A\u4EFB\u52A1 \xB7 ${unestimated} \u4E2A\u672A\u4F30\u7B97 \xB7 ${unassigned} \u4E2A\u672A\u5206\u914D`,
  members: "\u6210\u5458",
  memberSearch: "\u67E5\u627E\u6210\u5458\u2026",
  memberRatios: "\u4E2A\u4EBA\u4EA4\u4ED8\u8D26\u672C",
  deliveryRatios: "\u4EA4\u4ED8",
  timeRatios: "\u5DE5\u65F6",
  dataRatios: "\u6570\u636E\u57FA\u7840",
  taskClosureRate: "\u4EFB\u52A1\u95ED\u73AF",
  taskClosureRateHint: "\u5DF2\u5B8C\u6210\u4E14\u672A\u53D6\u6D88\u7684\u4EFB\u52A1\uFF0C\u5360\u5168\u90E8\u672A\u53D6\u6D88\u4EFB\u52A1\u7684\u6BD4\u4F8B\u3002",
  plannedClosureRate: "\u8BA1\u5212\u5DE5\u65F6\u95ED\u73AF",
  plannedClosureRateHint: "\u5DF2\u5B8C\u6210\u4EFB\u52A1\u7684\u8BA1\u5212\u5DE5\u65F6\uFF0C\u5360\u5168\u90E8\u5DF2\u4F30\u7B97\u5DE5\u65F6\u7684\u6BD4\u4F8B\u3002",
  timeConsumptionRate: "\u5DE5\u65F6\u6D88\u8017",
  timeConsumptionRateHint: "\u5DF2\u4F30\u7B97\u4EFB\u52A1\u7684\u767B\u8BB0\u5DE5\u65F6\uFF0C\u76F8\u5BF9\u4E8E\u8BA1\u5212\u5DE5\u65F6\u7684\u6BD4\u4F8B\u3002",
  overrunTaskRate: "\u8D85\u652F\u4EFB\u52A1",
  overrunTaskRateHint: "\u5DF2\u5F00\u5DE5\u4E14\u6709\u4F30\u7B97\u7684\u4EFB\u52A1\u4E2D\uFF0C\u767B\u8BB0\u5DE5\u65F6\u8D85\u8FC7\u8BA1\u5212\u7684\u6BD4\u4F8B\u3002",
  estimateAccuracyRate: "\u4F30\u7B97\u547D\u4E2D",
  estimateAccuracyRateHint: "\u5DF2\u5B8C\u6210\u4EFB\u52A1\u4E2D\uFF0C\u767B\u8BB0\u5DE5\u65F6\u5904\u4E8E\u8BA1\u5212\u5DE5\u65F6\u6B63\u8D1F 20% \u8303\u56F4\u5185\u7684\u6BD4\u4F8B\u3002",
  estimateCoverageRate: "\u4F30\u7B97\u8986\u76D6",
  estimateCoverageRateHint: "\u5168\u90E8\u672A\u53D6\u6D88\u4EFB\u52A1\u4E2D\uFF0C\u586B\u5199\u4E86\u8BA1\u5212\u5DE5\u65F6\u7684\u6BD4\u4F8B\u3002",
  ratioUnavailable: "\u2014",
  percentage: (value) => `${value.toLocaleString(void 0, { maximumFractionDigits: 1 })}%`,
  ratioTasks: (numerator, denominator) => `${numerator} / ${denominator} \u4E2A\u4EFB\u52A1`,
  ratioHours: (numerator, denominator) => `${numerator.toLocaleString(void 0, { maximumFractionDigits: 2 })}h / ${denominator.toLocaleString(void 0, { maximumFractionDigits: 2 })}h`,
  tasks: "\u4EFB\u52A1",
  taskId: "\u4E8B\u9879 ID",
  item: "\u4E8B\u9879",
  taskSearch: "\u67E5\u627E\u4EFB\u52A1\u2026",
  allProjects: "\u5168\u90E8\u9879\u76EE",
  allTaskStatuses: "\u5168\u90E8\u72B6\u6001",
  allPriorities: "\u5168\u90E8\u4F18\u5148\u7EA7",
  noneSelected: "\u672A\u9009\u62E9",
  selectedCount: (count) => `\u5DF2\u9009 ${count} \u9879`,
  optionCount: (count) => `${count} \u4E2A\u53EF\u9009\u9879`,
  resetFilters: "\u91CD\u7F6E\u7B5B\u9009",
  taskFilterResult: (visible, total) => `\u663E\u793A ${visible} / ${total} \u4E2A\u4EFB\u52A1`,
  memberWorkResult: (visibleTasks, totalTasks, source = "all") => {
    const visibleRequirements = visibleTasks.filter((task2) => task2.sourceType === "requirement").length;
    const totalRequirements = totalTasks.filter((task2) => task2.sourceType === "requirement").length;
    const visibleWorkItems = visibleTasks.length - visibleRequirements;
    const totalWorkItems = totalTasks.length - totalRequirements;
    if (source === "requirement") return `\u663E\u793A ${visibleRequirements} / ${totalRequirements} \u4E2A\u9700\u6C42`;
    if (source === "task") return `\u663E\u793A ${visibleWorkItems} / ${totalWorkItems} \u4E2A\u4EFB\u52A1`;
    return `\u663E\u793A ${visibleRequirements} \u4E2A\u9700\u6C42 \xB7 ${visibleTasks.length - visibleRequirements} \u4E2A\u4EFB\u52A1 / ${totalRequirements} \u4E2A\u9700\u6C42 \xB7 ${totalTasks.length - totalRequirements} \u4E2A\u4EFB\u52A1`;
  },
  resizeColumn: (column) => `\u8C03\u6574\u201C${column}\u201D\u5217\u5BBD`,
  resizeColumnHint: (column) => `\u62D6\u62FD\u53EF\u8C03\u6574\u201C${column}\u201D\u5217\u5BBD\uFF0C\u4E5F\u53EF\u7528\u65B9\u5411\u952E\u7CBE\u7EC6\u8C03\u6574\uFF1B\u53CC\u51FB\u6062\u590D\u6240\u6709\u5217\u7684\u9ED8\u8BA4\u5BBD\u5EA6\u3002`,
  project: "\u9879\u76EE",
  module: "\u6A21\u5757",
  stage: "\u9636\u6BB5",
  assignee: "\u8D1F\u8D23\u4EBA",
  completedBy: "\u5B8C\u6210\u8005",
  due: "\u622A\u6B62\u65E5\u671F",
  progress: "\u8FDB\u5EA6",
  work: "\u5DE5\u65F6",
  workHours: (logged, planned) => `${logged.toLocaleString(void 0, { maximumFractionDigits: 2 })}/${planned.toLocaleString(void 0, { maximumFractionDigits: 2 })}h`,
  priority: "\u4F18\u5148\u7EA7",
  status: "\u72B6\u6001",
  noPriority: "\u65E0\u4F18\u5148\u7EA7",
  sortPriority: "\u6309\u4F18\u5148\u7EA7\u6392\u5E8F",
  priorityHighToLow: "\u4ECE\u9AD8\u5230\u4F4E",
  priorityLowToHigh: "\u4ECE\u4F4E\u5230\u9AD8",
  assignment: "\u5F52\u5C5E",
  noProjectsTitle: "\u9009\u62E9\u9879\u76EE\u4EE5\u751F\u6210\u5DE5\u4F5C\u91CF\u89C6\u56FE",
  noProjectsBody: "\u8BF7\u5728\u4E0A\u65B9\u9009\u62E9\u4E00\u4E2A\u6216\u591A\u4E2A Project Manager \u9879\u76EE\u3002",
  noDataTitle: "\u6CA1\u6709\u627E\u5230 Project Manager \u9879\u76EE",
  noDataBody: "\u8BF7\u542F\u7528 Project Manager \u5E76\u521B\u5EFA\u9879\u76EE\u3002\u672C\u63D2\u4EF6\u53EA\u8BFB\u53D6 Project Manager \u7B14\u8BB0\u3002",
  noMembers: "\u6CA1\u6709\u5339\u914D\u7684\u6210\u5458\u3002",
  noTasks: "\u6CA1\u6709\u7B26\u5408\u5F53\u524D\u7B5B\u9009\u6761\u4EF6\u7684\u4EFB\u52A1\u3002",
  openTask: "\u6253\u5F00\u4EFB\u52A1",
  openProject: "\u5728\u65B0\u9875\u7B7E\u6253\u5F00\u9879\u76EE",
  projectManagerUnavailable: "Project Manager \u5F53\u524D\u4E0D\u53EF\u7528\uFF0C\u8BF7\u786E\u8BA4\u63D2\u4EF6\u5DF2\u542F\u7528\u3002",
  projectManagerVersionUnsupported: "\u5F53\u524D Project Manager \u7248\u672C\u6682\u4E0D\u652F\u6301\u4ECE PM \u6D1E\u5BDF\u6253\u5F00\u4EFB\u52A1\u8BE6\u60C5\u3002",
  taskEditorUnavailable: "\u65E0\u6CD5\u5728 Project Manager \u4E2D\u6253\u5F00\u6B64\u4EFB\u52A1\u3002",
  settingsHeading: "PM \u6D1E\u5BDF",
  language: "\u8BED\u8A00",
  languageDesc: "\u8DDF\u968F Obsidian\uFF0C\u6216\u5355\u72EC\u6307\u5B9A\u63D2\u4EF6\u754C\u9762\u8BED\u8A00\u3002",
  automatic: "\u81EA\u52A8",
  english: "English",
  chinese: "\u7B80\u4F53\u4E2D\u6587",
  aliases: "\u6210\u5458\u522B\u540D",
  aliasesDesc: "\u628A\u4E0D\u540C\u7684 assignee \u5199\u6CD5\u5408\u5E76\u4E3A\u540C\u4E00\u6210\u5458\uFF0C\u4E0D\u4F1A\u4FEE\u6539 Project Manager \u6570\u636E\u3002",
  canonicalName: "\u89C4\u8303\u540D\u79F0",
  aliasNames: "\u522B\u540D\uFF0C\u4F7F\u7528\u9017\u53F7\u5206\u9694",
  addAlias: "\u6DFB\u52A0\u6210\u5458\u6620\u5C04",
  removeAlias: "\u5220\u9664\u6210\u5458\u6620\u5C04",
  hours: (value) => `${value.toLocaleString(void 0, { maximumFractionDigits: 2 })}h`,
  taskCount: (count) => `${count} \u4E2A\u4EFB\u52A1`,
  memberWorkCount: (tasks, source = "all") => {
    const requirements = tasks.filter((task2) => task2.sourceType === "requirement").length;
    const workItems = tasks.length - requirements;
    if (source === "requirement") return `${requirements} \u4E2A\u9700\u6C42`;
    if (source === "task") return `${workItems} \u4E2A\u4EFB\u52A1`;
    return `${requirements} \u4E2A\u9700\u6C42 \xB7 ${workItems} \u4E2A\u4EFB\u52A1`;
  },
  archived: "\u5DF2\u5F52\u6863"
};
function translations(settings2) {
  const detected = (document.documentElement.lang || navigator.language || "en").toLowerCase();
  const locale = settings2.locale === "auto" ? detected : settings2.locale;
  return locale.startsWith("zh") ? zh : en;
}

// src/model.ts
var DEFAULT_SETTINGS = {
  locale: "auto",
  aliases: [],
  selectedProjectIds: [],
  memberViewMode: "table",
  memberGanttScale: "week",
  quickFilter: {
    quickSource: "all"
  }
};

// src/settings.ts
var import_obsidian3 = require("obsidian");
var InsightsSettingTab = class extends import_obsidian3.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    __publicField(this, "host");
    this.host = plugin;
  }
  getSettingDefinitions() {
    const t = translations(this.host.settings);
    return [
      {
        type: "group",
        heading: t.settingsHeading,
        items: [
          {
            name: t.language,
            desc: t.languageDesc,
            aliases: [t.aliases, t.aliasesDesc, t.canonicalName, t.aliasNames],
            control: {
              type: "dropdown",
              key: "locale",
              options: {
                auto: t.automatic,
                en: t.english,
                "zh-cn": t.chinese
              }
            }
          }
        ]
      },
      {
        type: "list",
        heading: t.aliases,
        addItem: {
          name: t.addAlias,
          action: () => {
            void this.addAlias();
          }
        },
        onDelete: (index) => {
          void this.deleteAlias(index);
        },
        items: this.host.settings.aliases.map((alias) => this.aliasDefinition(alias, t))
      }
    ];
  }
  getControlValue(key) {
    return key === "locale" ? this.host.settings.locale : void 0;
  }
  async setControlValue(key, value) {
    if (key !== "locale" || !this.isLocale(value)) return;
    this.host.settings.locale = value;
    await this.host.saveSettings();
    await this.host.refreshInsights();
    this.updateDefinitions();
  }
  // Obsidian versions before 1.13 use this imperative fallback.
  display() {
    this.renderLegacySettings();
  }
  renderLegacySettings() {
    const { containerEl } = this;
    const t = translations(this.host.settings);
    containerEl.empty();
    new import_obsidian3.Setting(containerEl).setName(t.settingsHeading).setHeading();
    new import_obsidian3.Setting(containerEl).setName(t.language).setDesc(t.languageDesc).addDropdown(
      (dropdown) => dropdown.addOption("auto", t.automatic).addOption("en", t.english).addOption("zh-cn", t.chinese).setValue(this.host.settings.locale).onChange(async (value) => {
        this.host.settings.locale = value;
        await this.host.saveSettings();
        await this.host.refreshInsights();
        this.renderLegacySettings();
      })
    );
    new import_obsidian3.Setting(containerEl).setName(t.aliases).setDesc(t.aliasesDesc).setHeading();
    for (const [index, alias] of this.host.settings.aliases.entries()) {
      this.renderAlias(alias, index);
    }
    new import_obsidian3.Setting(containerEl).addButton(
      (button) => button.setButtonText(t.addAlias).setCta().onClick(async () => {
        this.host.settings.aliases.push({ canonical: "", aliases: [] });
        await this.host.saveSettings();
        this.renderLegacySettings();
      })
    );
  }
  aliasDefinition(alias, t) {
    return {
      name: alias.canonical || t.canonicalName,
      desc: alias.aliases.length > 0 ? alias.aliases.join(", ") : t.aliasesDesc,
      render: (setting) => {
        setting.setName("").setDesc("").addText(
          (input) => input.setPlaceholder(t.canonicalName).setValue(alias.canonical).onChange(async (value) => {
            alias.canonical = value;
            await this.host.saveSettings();
            await this.host.refreshInsights();
          })
        ).addText(
          (input) => input.setPlaceholder(t.aliasNames).setValue(alias.aliases.join(", ")).onChange(async (value) => {
            alias.aliases = this.parseAliases(value);
            await this.host.saveSettings();
            await this.host.refreshInsights();
          })
        );
      }
    };
  }
  async addAlias() {
    this.host.settings.aliases.push({ canonical: "", aliases: [] });
    await this.host.saveSettings();
    this.updateDefinitions();
  }
  async deleteAlias(index) {
    this.host.settings.aliases.splice(index, 1);
    await this.host.saveSettings();
    await this.host.refreshInsights();
    this.updateDefinitions();
  }
  isLocale(value) {
    return value === "auto" || value === "en" || value === "zh-cn";
  }
  parseAliases(value) {
    return value.split(/[,，]/u).map((item) => item.trim()).filter(Boolean);
  }
  updateDefinitions() {
    const update = Reflect.get(this, "update");
    if (typeof update === "function") update.call(this);
  }
  renderAlias(alias, index) {
    const t = translations(this.host.settings);
    new import_obsidian3.Setting(this.containerEl).addText(
      (input) => input.setPlaceholder(t.canonicalName).setValue(alias.canonical).onChange(async (value) => {
        alias.canonical = value;
        await this.host.saveSettings();
        await this.host.refreshInsights();
      })
    ).addText(
      (input) => input.setPlaceholder(t.aliasNames).setValue(alias.aliases.join(", ")).onChange(async (value) => {
        alias.aliases = this.parseAliases(value);
        await this.host.saveSettings();
        await this.host.refreshInsights();
      })
    ).addExtraButton(
      (button) => button.setIcon("trash-2").setTooltip(t.removeAlias).onClick(async () => {
        this.host.settings.aliases.splice(index, 1);
        await this.host.saveSettings();
        await this.host.refreshInsights();
        this.renderLegacySettings();
      })
    );
  }
};

// src/toolbar-integration.ts
var import_obsidian4 = require("obsidian");
var ProjectManagerToolbarIntegration = class {
  constructor(app, host) {
    __publicField(this, "app", app);
    __publicField(this, "host", host);
    __publicField(this, "observer", null);
    __publicField(this, "frame", null);
  }
  start() {
    if (this.observer) return;
    this.observer = new MutationObserver((records) => {
      if (records.some((record) => this.affectsProjectToolbar(record))) this.scheduleSync();
    });
    this.observer.observe(document.body, { childList: true, subtree: true });
    this.sync();
  }
  stop() {
    var _a;
    (_a = this.observer) == null ? void 0 : _a.disconnect();
    this.observer = null;
    if (this.frame !== null) window.cancelAnimationFrame(this.frame);
    this.frame = null;
    document.querySelectorAll(".pmi-open-insights-btn").forEach((element) => element.remove());
  }
  sync() {
    const switchers = document.querySelectorAll(
      ".workspace-leaf-content.pm-view .pm-view-switcher"
    );
    for (const switcher of switchers) {
      if (switcher.querySelector(".pmi-open-insights-btn")) continue;
      const projectPath = this.projectPathFor(switcher);
      if (!projectPath) continue;
      const button = switcher.createEl("button", {
        cls: "clickable-icon pm-view-btn pmi-open-insights-btn",
        attr: {
          type: "button",
          "aria-label": this.host.tooltip(),
          "data-tooltip-position": "top"
        }
      });
      (0, import_obsidian4.setIcon)(button, "chart-no-axes-combined");
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        void this.host.openProjectInsights(projectPath);
      });
    }
  }
  scheduleSync() {
    if (this.frame !== null) return;
    this.frame = window.requestAnimationFrame(() => {
      this.frame = null;
      this.sync();
    });
  }
  affectsProjectToolbar(record) {
    if (record.target.instanceOf(Element) && record.target.closest(".pm-view-switcher")) return true;
    return [...record.addedNodes].some(
      (node) => node.instanceOf(Element) && (node.matches(".pm-view-switcher, .workspace-leaf-content.pm-view") || Boolean(node.querySelector(".pm-view-switcher")))
    );
  }
  projectPathFor(element) {
    let projectPath = null;
    this.app.workspace.iterateAllLeaves((leaf) => {
      var _a;
      if (projectPath || !leaf.view.containerEl.contains(element)) return;
      const state = leaf.getViewState();
      if (state.type !== "pm-project") return;
      const filePath = (_a = state.state) == null ? void 0 : _a.filePath;
      if (typeof filePath === "string") projectPath = filePath;
    });
    return projectPath;
  }
};

// src/view.ts
var import_obsidian5 = require("obsidian");

// src/domain/identity.ts
function normalizeIdentity(value) {
  return value.normalize("NFKC").trim().toLocaleLowerCase("en-US");
}
var IdentityResolver = class {
  constructor(aliases) {
    __publicField(this, "canonicalByIdentity", /* @__PURE__ */ new Map());
    for (const entry2 of aliases) {
      const canonical = entry2.canonical.normalize("NFKC").trim();
      if (!canonical) continue;
      this.canonicalByIdentity.set(normalizeIdentity(canonical), canonical);
      for (const alias of entry2.aliases) {
        const key = normalizeIdentity(alias);
        if (key) this.canonicalByIdentity.set(key, canonical);
      }
    }
  }
  resolve(value) {
    var _a;
    const display = value.normalize("NFKC").trim();
    if (!display) return "";
    return (_a = this.canonicalByIdentity.get(normalizeIdentity(display))) != null ? _a : display;
  }
  resolveMany(values) {
    const resolved = /* @__PURE__ */ new Map();
    for (const value of values) {
      const display = this.resolve(value);
      if (display) resolved.set(normalizeIdentity(display), display);
    }
    return [...resolved.values()];
  }
};

// src/domain/aggregate.ts
var UNASSIGNED_KEY = "__unassigned__";
function emptyMetrics() {
  return {
    planned: 0,
    logged: 0,
    remaining: 0,
    overrun: 0,
    taskCount: 0,
    unestimatedCount: 0
  };
}
function round(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
function addTask(metrics, task2) {
  metrics.planned += task2.estimate;
  metrics.logged += task2.logged;
  metrics.remaining += task2.remaining;
  metrics.overrun += task2.overrun;
  metrics.taskCount += 1;
  if (task2.unestimated) metrics.unestimatedCount += 1;
}
function finalizeMetrics(metrics) {
  return {
    ...metrics,
    planned: round(metrics.planned),
    logged: round(metrics.logged),
    remaining: round(metrics.remaining),
    overrun: round(metrics.overrun)
  };
}
function ratio(numerator, denominator) {
  return {
    numerator: round(numerator),
    denominator: round(denominator),
    percentage: denominator > 0 ? round(numerator / denominator * 100) : null
  };
}
function isCancelled(task2) {
  const status = task2.status.trim().toLocaleLowerCase();
  return status === "cancelled" || status === "canceled";
}
function memberRatios(tasks) {
  const eligible = tasks.filter((task2) => !task2.contextOnly && !isCancelled(task2));
  const completed = eligible.filter((task2) => task2.completed);
  const estimated = eligible.filter((task2) => !task2.unestimated);
  const startedEstimated = estimated.filter((task2) => task2.logged > 0);
  const completedEstimated = startedEstimated.filter((task2) => task2.completed);
  const totalPlanned = estimated.reduce((total, task2) => total + task2.estimate, 0);
  const completedPlanned = estimated.filter((task2) => task2.completed).reduce((total, task2) => total + task2.estimate, 0);
  const estimatedLogged = estimated.reduce((total, task2) => total + task2.logged, 0);
  return {
    taskClosure: ratio(completed.length, eligible.length),
    plannedClosure: ratio(completedPlanned, totalPlanned),
    timeConsumption: ratio(estimatedLogged, totalPlanned),
    overrunTasks: ratio(
      startedEstimated.filter((task2) => task2.logged > task2.estimate).length,
      startedEstimated.length
    ),
    estimateAccuracy: ratio(
      completedEstimated.filter((task2) => {
        const consumption = task2.logged / task2.estimate;
        return consumption >= 0.8 && consumption <= 1.2;
      }).length,
      completedEstimated.length
    ),
    estimateCoverage: ratio(estimated.length, eligible.length)
  };
}
function taskInsight(task2, projectTitle, resolvedAssignees, kind) {
  const unestimated = task2.estimate <= 0;
  const remaining = task2.remainingOverride ?? (!task2.completed && !task2.archived && !unestimated ? Math.max(task2.estimate - task2.logged, 0) : 0);
  const overrun = !unestimated ? Math.max(task2.logged - task2.estimate, 0) : 0;
  return {
    ...task2,
    projectTitle,
    resolvedAssignees,
    assignmentKind: kind,
    remaining: round(remaining),
    overrun: round(overrun),
    unestimated
  };
}
function quickMatches(task2, filter) {
  filter = filter ?? {};
  const source = filter.quickSource ?? "all";
  return source === "all" || task2.sourceType === source;
}
function aggregateInsights(projects, tasks, options) {
  var _a;
  const projectTitles = new Map(projects.map((project2) => [project2.id, project2.title]));
  const selected = tasks.filter((task2) => options.projectIds.has(task2.projectId));
  const resolver = new IdentityResolver(options.aliases);
  // 先按对象组合筛选，再统一汇总工时；需求和任务不再通过父子层级互斥。
  const included = selected.filter(
    (task2) => !task2.archived && quickMatches(task2, options.quickFilter)
  );
  const members = /* @__PURE__ */ new Map();
  const allTasks = [];
  const team = emptyMetrics();
  const getMember = (name, unassigned = false) => {
    const key = unassigned ? UNASSIGNED_KEY : normalizeIdentity(name);
    let member = members.get(key);
    if (!member) {
      member = {
        key,
        name: unassigned ? options.unassignedLabel : name,
        kind: unassigned ? "unassigned" : "member",
        personal: emptyMetrics(),
        shared: emptyMetrics(),
        ratios: memberRatios([]),
        tasks: []
      };
      members.set(key, member);
    }
    return member;
  };
  for (const task2 of included) {
    // 成员归属只认一个人：任务已完成时归到完成人，否则归到负责人。
    const completedBy = resolver.resolve(task2.completedBy ?? "");
    const responsible = resolver.resolveMany(task2.assignees)[0] ?? "";
    const owner = completedBy || responsible;
    const kind = owner ? "personal" : "unassigned";
    const insight = taskInsight(
      task2,
      (_a = projectTitles.get(task2.projectId)) != null ? _a : task2.projectId,
      owner ? [owner] : [],
      kind
    );
    allTasks.push(insight);
    addTask(team, insight);
    if (kind === "unassigned") {
      const member = getMember(options.unassignedLabel, true);
      addTask(member.personal, insight);
      member.tasks.push(insight);
      continue;
    }
    const member = getMember(owner);
    addTask(member.personal, insight);
    member.tasks.push(insight);
  }
  if ((options.quickFilter?.quickSource ?? "all") === "all") {
    const insightById = new Map(allTasks.map((task2) => [task2.id, task2]));
    for (const member of members.values()) {
      const existingIds = new Set(member.tasks.map((task2) => task2.id));
      for (const task2 of [...member.tasks]) {
        const storyId = String(task2.customFields.storyId ?? "");
        if ((task2.parentId && existingIds.has(task2.parentId)) || (!task2.parentId && !storyId)) continue;
        const parent = insightById.get(task2.parentId) ?? allTasks.find((candidate) => candidate.sourceType === "requirement" && candidate.projectId === task2.projectId && String(candidate.zentaoId ?? "") === String(task2.customFields.storyId ?? ""));
        if (!parent) continue;
        if (!task2.parentId) {
          const taskIndex = member.tasks.findIndex((candidate) => candidate.id === task2.id);
          if (taskIndex >= 0) member.tasks[taskIndex] = { ...task2, parentId: parent.id };
        }
        member.tasks.push({ ...parent, contextOnly: true });
        existingIds.add(parent.id);
      }
    }
  }
  const finalizedMembers = [...members.values()].map((member) => {
    const tasks2 = member.tasks.sort(
      (left, right) => right.remaining - left.remaining || left.projectTitle.localeCompare(right.projectTitle)
    );
    return {
      ...member,
      personal: finalizeMetrics(member.personal),
      shared: finalizeMetrics(member.shared),
      ratios: memberRatios(tasks2),
      tasks: tasks2
    };
  }).sort((left, right) => {
    if (left.kind !== right.kind) return left.kind === "unassigned" ? 1 : -1;
    const leftRemaining = left.personal.remaining + left.shared.remaining;
    const rightRemaining = right.personal.remaining + right.shared.remaining;
    return rightRemaining - leftRemaining || left.name.localeCompare(right.name);
  });
  return {
    members: finalizedMembers,
    tasks: allTasks,
    team: finalizeMetrics(team),
    quality: {
      requirementCount: allTasks.filter((task2) => task2.sourceType === "requirement").length,
      taskCount: allTasks.filter((task2) => task2.sourceType === "task").length,
      unassignedCount: allTasks.filter((task2) => task2.assignmentKind === "unassigned").length,
      unestimatedCount: allTasks.filter((task2) => task2.unestimated).length
    }
  };
}

// src/view.ts
var INSIGHTS_VIEW_TYPE = "project-manager-insights-view";
var TASK_PRIORITY_NONE = "";
var TASK_COLUMN_MIN_WIDTHS = [96, 260, 150, 160, 120, 100, 92, 110, 110, 110, 120, 90];
var TASK_COLUMN_GAP = 10;
var TASK_TABLE_INLINE_PADDING = 22;
var TASK_COLUMN_KEYBOARD_STEP = 12;
var MEMBER_GANTT_DAY_MS = 24 * 60 * 60 * 1e3;
var MEMBER_GANTT_MIN_WIDTH = 720;
var MEMBER_GANTT_SCALE_WIDTHS = { day: 132, week: 66, month: 27 };
var MEMBER_GANTT_MIN_DAYS = { day: 30, week: 90, month: 365 };
var MEMBER_GANTT_START_PADDING_DAYS = 7;
var MEMBER_GANTT_END_PADDING_DAYS = 14;
var MEMBER_GANTT_LABEL_DEFAULT_WIDTH = 420;
var MEMBER_GANTT_LABEL_MIN_WIDTH = 300;
var MEMBER_GANTT_LABEL_MAX_WIDTH = 720;
var MEMBER_GANTT_BAR_LABEL_MIN_WIDTH = 56;
function memberDateValue(value) {
  const match = String(value ?? "").match(/^(\d{4})-(\d{2})-(\d{2})/u);
  if (!match) return null;
  const timestamp = Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isFinite(timestamp) ? timestamp : null;
}
function memberDateText(timestamp, scale) {
  const options = scale === "month" ? { year: "numeric", month: "short" } : { month: "numeric", day: "numeric" };
  return new Intl.DateTimeFormat(void 0, options).format(new Date(timestamp));
}
function memberCurrentPeriodStart(scale) {
  const now = /* @__PURE__ */ new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  if (scale === "month") return Date.UTC(now.getFullYear(), now.getMonth(), 1);
  if (scale === "week") {
    const day = new Date(today).getUTCDay();
    const offset = day === 0 ? 6 : day - 1;
    return today - offset * MEMBER_GANTT_DAY_MS;
  }
  return today;
}
function memberWeekdayText(timestamp) {
  return new Intl.DateTimeFormat(void 0, { weekday: "short" }).format(new Date(timestamp));
}
function memberIsoWeek(timestamp) {
  const date = new Date(timestamp);
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const year = date.getUTCFullYear();
  const yearStart = Date.UTC(year, 0, 1);
  const week = Math.ceil(((date.getTime() - yearStart) / MEMBER_GANTT_DAY_MS + 1) / 7);
  return { year, week };
}
var InsightsView = class extends import_obsidian5.ItemView {
  constructor(leaf, host) {
    super(leaf);
    __publicField(this, "host", host);
    __publicField(this, "selectedMemberKey", null);
    __publicField(this, "memberQuery", "");
    __publicField(this, "quickSource", "all");
    __publicField(this, "taskQuery", "");
    __publicField(this, "taskStatuses", null);
    __publicField(this, "taskPriorities", null);
    __publicField(this, "taskPrioritySort", "none");
    __publicField(this, "memberViewMode", "table");
    __publicField(this, "memberGanttScale", "week");
    __publicField(this, "memberGanttLabelWidth", MEMBER_GANTT_LABEL_DEFAULT_WIDTH);
    __publicField(this, "dashboardEl", null);
    __publicField(this, "projectSummaryEl", null);
    __publicField(this, "selectedProjectTagsEl", null);
    __publicField(this, "taskColumnWidths", null);
    __publicField(this, "projectTableColumnWidths", null);
    __publicField(this, "renderVersion", 0);
    this.memberViewMode = ["table", "gantt", "kanban"].includes(host.settings.memberViewMode) ? host.settings.memberViewMode : "table";
    this.memberGanttScale = ["day", "week", "month"].includes(host.settings.memberGanttScale) ? host.settings.memberGanttScale : "week";
    this.navigation = true;
  }
  getViewType() {
    return INSIGHTS_VIEW_TYPE;
  }
  getDisplayText() {
    return translations(this.host.settings).viewName;
  }
  getIcon() {
    return "chart-no-axes-combined";
  }
  async onOpen() {
    this.containerEl.addClass("pmi-view");
    this.registerDomEvent(document, "pointerdown", (event) => {
      const path = event.composedPath();
      const openMenus = this.containerEl.querySelectorAll(
        ".pmi-project-picker[open], .pmi-task-filter-menu[open]"
      );
      for (const menu of openMenus) {
        if (!path.includes(menu)) menu.open = false;
      }
    });
    await this.render();
  }
  async refresh() {
    await this.render();
  }
  async scopeToProjectPath(path) {
    const snapshot = await this.host.readProjectManager();
    const normalizedPath = String(path ?? "").replace(/\\/g, "/");
    const project2 = snapshot.projects.find((candidate) => {
      const candidatePath = String(candidate.path ?? "").replace(/\\/g, "/");
      return candidatePath === normalizedPath || candidatePath.endsWith(`/${normalizedPath}`) || normalizedPath.endsWith(`/${candidatePath}`);
    });
    if (!project2) return;
    this.host.settings.selectedProjectIds = [project2.id];
    this.selectedMemberKey = null;
    await this.host.saveSettings();
    await this.render();
    this.contentEl.scrollTo({ top: 0 });
  }
  async render() {
    const version = ++this.renderVersion;
    const snapshot = await this.host.readProjectManager();
    if (version !== this.renderVersion) return;
    const t = translations(this.host.settings);
    const root = this.contentEl;
    root.empty();
    root.addClass("pmi-root");
    this.renderHeader(root, t);
    if (snapshot.projects.length === 0) {
      this.renderEmpty(root, t.noDataTitle, t.noDataBody, "folder-search-2");
      return;
    }
    const projectIds = new Set(snapshot.projects.map((project2) => project2.id));
    const validSelection = this.host.settings.selectedProjectIds.filter((id) => projectIds.has(id));
    if (validSelection.length !== this.host.settings.selectedProjectIds.length) {
      this.host.settings.selectedProjectIds = validSelection;
      await this.host.saveSettings();
    }
    this.renderControls(root, snapshot, t);
    this.dashboardEl = root.createDiv("pmi-dashboard");
    this.renderDashboard(snapshot, t);
  }
  renderHeader(root, t) {
    const header = root.createDiv("pmi-header");
    const copy = header.createDiv("pmi-header-copy");
    copy.createDiv({ cls: "pmi-eyebrow", text: t.eyebrow });
    copy.createEl("h1", { text: t.heading });
    copy.createEl("p", { text: t.intro });
    const stamp = header.createDiv("pmi-snapshot-stamp");
    (0, import_obsidian5.setIcon)(stamp.createSpan("pmi-snapshot-icon"), "scan-line");
    stamp.createSpan({ text: new Intl.DateTimeFormat(void 0, { hour: "2-digit", minute: "2-digit" }).format(/* @__PURE__ */ new Date()) });
  }
  getQuickFilter() {
    const saved = this.host.settings.quickFilter;
    const filter = saved && typeof saved === "object" ? saved : {};
    this.quickSource = ["all", "requirement", "task"].includes(filter.quickSource) ? filter.quickSource : "all";
    return { quickSource: this.quickSource };
  }
  async saveQuickFilter(filter) {
    this.host.settings.quickFilter = { quickSource: filter.quickSource };
    await this.host.saveSettings();
  }
  renderQuickFilters(root, snapshot, t) {
    const filter = this.getQuickFilter();
    const panel = root.createDiv("pmi-quick-filter-panel");
    const buttons = [];
    // dashboard 只重绘数据区域，按钮选中态需要在当前面板内立即同步。
    const syncButtons = () => {
      for (const button of buttons) {
        const active = filter.quickSource === button.value;
        button.element.classList.toggle("is-active", active);
        button.element.setAttribute("aria-pressed", String(active));
      }
    };
    const update = (patch) => {
      void (async () => {
        Object.assign(filter, patch);
        this.quickSource = filter.quickSource;
        syncButtons();
        await this.saveQuickFilter(filter);
        this.selectedMemberKey = null;
        this.taskQuery = "";
        this.taskStatuses = null;
        this.taskPriorities = null;
        this.renderDashboard(snapshot, t);
      })();
    };
    const group = (label, options) => {
      const row = panel.createDiv("pmi-quick-filter-row");
      row.createSpan({ cls: "pmi-quick-filter-label", text: label });
      for (const option of options) {
        const button = row.createEl("button", {
          cls: "pmi-quick-filter-button",
          text: option.label,
          attr: { type: "button", "aria-pressed": "false" }
        });
        buttons.push({ element: button, value: option.id });
        button.addEventListener("click", () => update({ quickSource: option.id }));
      }
    };
    group(t.object, [
      { id: "all", label: t.all },
      { id: "requirement", label: t.requirement },
      { id: "task", label: t.task }
    ]);
    syncButtons();
  }
  renderControls(root, snapshot, t) {
    const controls = root.createDiv("pmi-controls");
    const picker = controls.createEl("details", { cls: "pmi-project-picker" });
    const summary = picker.createEl("summary");
    (0, import_obsidian5.setIcon)(summary.createSpan(), "layers-3");
    summary.createSpan({ cls: "pmi-control-label", text: t.projects });
    this.projectSummaryEl = summary.createSpan("pmi-project-count");
    this.updateProjectSummary(t);
    const chevron = summary.createSpan("pmi-project-chevron");
    (0, import_obsidian5.setIcon)(chevron, "chevron-down");
    picker.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !picker.open) return;
      picker.open = false;
      summary.focus();
      event.preventDefault();
      event.stopPropagation();
    });
    const panel = picker.createDiv("pmi-project-panel");
    const projectSearch = panel.createEl("input", {
      type: "search",
      placeholder: t.projectSearch,
      cls: "pmi-project-search"
    });
    const actions = panel.createDiv("pmi-project-actions");
    const selectAll = actions.createEl("button", { text: t.selectAll });
    const clear = actions.createEl("button", { text: t.clear });
    const list = panel.createDiv("pmi-project-list");
    const renderProjects = () => {
      const query = projectSearch.value.normalize("NFKC").trim().toLocaleLowerCase();
      list.empty();
      for (const project2 of snapshot.projects) {
        if (query && !project2.title.normalize("NFKC").toLocaleLowerCase().includes(query)) continue;
        const row = list.createEl("label", { cls: "pmi-project-option" });
        const checkbox = row.createEl("input", { type: "checkbox" });
        checkbox.checked = this.host.settings.selectedProjectIds.includes(project2.id);
        row.createSpan({ cls: "pmi-project-icon", text: project2.icon });
        row.createSpan({ text: project2.title });
        checkbox.addEventListener("change", () => {
          void (async () => {
            const selected = new Set(this.host.settings.selectedProjectIds);
            checkbox.checked ? selected.add(project2.id) : selected.delete(project2.id);
            this.host.settings.selectedProjectIds = [...selected];
            this.selectedMemberKey = null;
            await this.host.saveSettings();
            this.updateProjectSummary(t);
            this.updateSelectedProjectTags(snapshot);
            this.renderDashboard(snapshot, t);
          })();
        });
      }
    };
    projectSearch.addEventListener("input", renderProjects);
    selectAll.addEventListener("click", (event) => {
      void (async () => {
        event.preventDefault();
        this.host.settings.selectedProjectIds = snapshot.projects.map((project2) => project2.id);
        this.selectedMemberKey = null;
        await this.host.saveSettings();
        this.updateProjectSummary(t);
        this.updateSelectedProjectTags(snapshot);
        renderProjects();
        this.renderDashboard(snapshot, t);
      })();
    });
    clear.addEventListener("click", (event) => {
      void (async () => {
        event.preventDefault();
        this.host.settings.selectedProjectIds = [];
        this.selectedMemberKey = null;
        await this.host.saveSettings();
        this.updateProjectSummary(t);
        this.updateSelectedProjectTags(snapshot);
        renderProjects();
        this.renderDashboard(snapshot, t);
      })();
    });
    renderProjects();
    this.selectedProjectTagsEl = controls.createDiv("pmi-selected-project-tags");
    this.updateSelectedProjectTags(snapshot);
    this.renderQuickFilters(root, snapshot, t);
    const refresh = controls.createEl("button", {
      cls: "pmi-refresh clickable-icon",
      attr: { "aria-label": t.refresh }
    });
    (0, import_obsidian5.setIcon)(refresh, "refresh-cw");
    refresh.addEventListener("click", () => void this.reconcileAndRender());
  }
  async reconcileAndRender() {
    await this.host.reconcileProjectManager();
    await this.render();
  }
  updateProjectSummary(t) {
    var _a;
    (_a = this.projectSummaryEl) == null ? void 0 : _a.setText(t.projectCount(this.host.settings.selectedProjectIds.length));
  }
  updateSelectedProjectTags(snapshot) {
    if (!this.selectedProjectTagsEl) return;
    this.selectedProjectTagsEl.empty();
    const selectedProjects = snapshot.projects.filter((project2) => this.host.settings.selectedProjectIds.includes(project2.id));
    for (const project2 of selectedProjects) {
      const tag = this.selectedProjectTagsEl.createSpan({ cls: "pmi-selected-project-tag" });
      tag.createSpan({ cls: "pmi-selected-project-icon", text: project2.icon });
      tag.createSpan({ text: project2.title });
    }
  }
  renderDashboard(snapshot, t) {
    var _a, _b;
    const dashboard = this.dashboardEl;
    if (!dashboard) return;
    dashboard.empty();
    const selectedIds = new Set(this.host.settings.selectedProjectIds);
    if (selectedIds.size === 0) {
      this.renderEmpty(dashboard, t.noProjectsTitle, t.noProjectsBody, "list-filter");
      return;
    }
    const insights = aggregateInsights(snapshot.projects, snapshot.tasks, {
      projectIds: selectedIds,
      quickFilter: this.getQuickFilter(),
      aliases: this.host.settings.aliases,
      unassignedLabel: t.unassigned
    });
    this.renderTeamStrip(dashboard, insights.team, t);
    const quality = dashboard.createDiv("pmi-quality-strip");
    (0, import_obsidian5.setIcon)(quality.createSpan(), "scan-search");
    quality.createEl("strong", { text: `${t.qualityTitle}:` });
    quality.createSpan({
      text: t.qualitySummary(
        insights.quality.requirementCount,
        insights.quality.taskCount,
        insights.quality.unestimatedCount,
        insights.quality.unassignedCount
      )
    });
    const layout = dashboard.createDiv("pmi-master-detail");
    const master = layout.createDiv("pmi-master");
    const detail = layout.createDiv("pmi-detail");
    const visibleMembers = insights.members.filter(
      (member) => member.name.normalize("NFKC").toLocaleLowerCase().includes(this.memberQuery)
    );
    if (!visibleMembers.some((member) => member.key === this.selectedMemberKey)) {
      const nextMemberKey = (_b = (_a = visibleMembers[0]) == null ? void 0 : _a.key) != null ? _b : null;
      if (nextMemberKey !== this.selectedMemberKey) {
        this.taskQuery = "";
        this.taskStatuses = null;
        this.taskPriorities = null;
      }
      this.selectedMemberKey = nextMemberKey;
    }
    this.renderMemberList(master, insights.members, visibleMembers, snapshot, t);
    const selected = insights.members.find((member) => member.key === this.selectedMemberKey);
    this.renderTaskDetail(detail, selected, snapshot.projects, snapshot.priorities, snapshot.stages, snapshot.statuses, t);
  }
  renderTeamStrip(root, metrics, t) {
    const strip = root.createDiv("pmi-team-strip");
    this.metric(strip, t.planned, t.hours(metrics.planned));
    this.metric(strip, t.logged, t.hours(metrics.logged));
    this.metric(strip, t.remaining, t.hours(metrics.remaining), "remaining");
    this.metric(strip, t.overrun, t.hours(metrics.overrun), metrics.overrun > 0 ? "overrun" : "");
  }
  metric(root, label, value, kind = "") {
    const item = root.createDiv(`pmi-metric${kind ? ` pmi-metric--${kind}` : ""}`);
    item.createSpan({ cls: "pmi-metric-label", text: label });
    item.createEl("strong", { text: value });
  }
  renderMemberList(root, allMembers, members, snapshot, t) {
    const header = root.createDiv("pmi-pane-header");
    header.createEl("h2", { text: t.members });
    header.createSpan({ text: String(allMembers.length) });
    const search = root.createEl("input", {
      type: "search",
      placeholder: t.memberSearch,
      cls: "pmi-pane-search"
    });
    search.value = this.memberQuery;
    search.addEventListener("input", () => {
      this.memberQuery = search.value.normalize("NFKC").trim().toLocaleLowerCase();
      this.renderDashboard(snapshot, t);
      const next = this.contentEl.querySelector(".pmi-master .pmi-pane-search");
      next == null ? void 0 : next.focus();
      next == null ? void 0 : next.setSelectionRange(next.value.length, next.value.length);
    });
    const list = root.createDiv("pmi-member-list");
    if (members.length === 0) {
      list.createDiv({ cls: "pmi-list-empty", text: t.noMembers });
      return;
    }
    for (const member of members) this.renderMember(list, member, snapshot, t);
  }
  renderMember(root, member, snapshot, t) {
    const active = member.key === this.selectedMemberKey;
    const button = root.createEl("button", {
      cls: `pmi-member${active ? " is-active" : ""}`,
      attr: { "aria-pressed": String(active) }
    });
    const head = button.createDiv("pmi-member-head");
    const avatar = head.createSpan({ cls: "pmi-member-avatar" });
    if (member.kind === "unassigned") (0, import_obsidian5.setIcon)(avatar, "user-round-x");
    else avatar.setText(Array.from(member.name).slice(0, 2).join(""));
    const identity = head.createDiv("pmi-member-identity");
    identity.createEl("strong", { text: member.name });
    identity.createSpan({ text: t.memberWorkCount(member.tasks, this.quickSource) });
    head.createEl("strong", {
      cls: "pmi-member-total",
      text: t.hours(member.personal.remaining + member.shared.remaining)
    });
    this.renderWorkRail(button, t.personal, member.personal, false, t);
    if (member.shared.taskCount > 0) this.renderWorkRail(button, t.shared, member.shared, true, t);
    button.addEventListener("click", () => {
      this.selectedMemberKey = member.key;
      this.taskQuery = "";
      this.taskStatuses = null;
      this.taskPriorities = null;
      this.renderDashboard(snapshot, t);
    });
  }
  renderWorkRail(root, label, metrics, shared, t) {
    const row = root.createDiv(`pmi-work-row${shared ? " is-shared" : ""}`);
    const legend = row.createDiv("pmi-work-legend");
    legend.createSpan({ text: label });
    legend.createSpan({ text: `${t.hours(metrics.logged)} / ${t.hours(metrics.planned)}` });
    const rail = row.createDiv("pmi-work-rail");
    const plannedLogged = metrics.planned > 0 ? Math.min(metrics.logged, metrics.planned) : metrics.logged;
    const scale = Math.max(metrics.planned, plannedLogged + metrics.overrun, 1);
    const logged = rail.createSpan("pmi-work-logged");
    logged.style.width = `${Math.min(plannedLogged / scale * 100, 100)}%`;
    const remaining = rail.createSpan("pmi-work-remaining");
    remaining.style.width = `${Math.min(metrics.remaining / scale * 100, 100)}%`;
    if (metrics.overrun > 0) {
      const overrun = rail.createSpan("pmi-work-overrun");
      overrun.style.width = `${Math.min(metrics.overrun / scale * 100, 100)}%`;
    }
  }
  renderTaskDetail(root, member, projects, priorities, stages, statuses, t) {
    var _a;
    const header = root.createDiv("pmi-pane-header pmi-detail-header");
    const identity = header.createDiv("pmi-detail-identity");
    identity.createEl("h2", { text: (_a = member == null ? void 0 : member.name) != null ? _a : t.tasks });
    identity.createSpan({ text: member ? t.memberWorkCount(member.tasks, this.quickSource) : "0" });
    if (!member) {
      root.createDiv({ cls: "pmi-list-empty", text: t.noTasks });
      return;
    }
    this.renderMemberRatios(header, member, t);
    this.renderMemberViewSwitcher(header, () => {
      root.empty();
      this.renderTaskDetail(root, member, projects, priorities, stages, statuses, t);
    });
    const statusDefinitions = new Map(statuses.map((status) => [status.id, status]));
    const statusOptions = [...new Set(member.tasks.map((task2) => task2.status))].map((value) => ({
      value,
      label: statusDefinitions.get(value)?.label ?? value,
      count: member.tasks.filter((task2) => task2.status === value).length
    })).sort((left, right) => left.label.localeCompare(right.label));
    const priorityDefinitions = new Map(priorities.map((priority) => [priority.id, priority]));
    const memberPriorityKeys = new Set(
      member.tasks.map((task2) => {
        var _a2;
        return (_a2 = task2.priority) != null ? _a2 : TASK_PRIORITY_NONE;
      })
    );
    const priorityOptions = [
      ...priorities.filter((priority) => memberPriorityKeys.has(priority.id)).map((priority) => ({
        value: priority.id,
        label: priority.label,
        color: priority.color,
        count: member.tasks.filter((task2) => task2.priority === priority.id).length
      })),
      ...[...memberPriorityKeys].filter((value) => value !== TASK_PRIORITY_NONE && !priorityDefinitions.has(value)).sort((left, right) => left.localeCompare(right)).map((value) => ({
        value,
        label: value,
        color: "",
        count: member.tasks.filter((task2) => task2.priority === value).length
      })),
      ...memberPriorityKeys.has(TASK_PRIORITY_NONE) ? [{
        value: TASK_PRIORITY_NONE,
        label: t.noPriority,
        color: "",
        count: member.tasks.filter((task2) => task2.priority === null).length
      }] : []
    ];
    this.taskStatuses = this.normalizeTaskFilter(this.taskStatuses, statusOptions);
    this.taskPriorities = this.normalizeTaskFilter(this.taskPriorities, priorityOptions);
    const filters = root.createDiv("pmi-task-filter-bar");
    const searchWrap = filters.createDiv("pmi-task-filter-search");
    (0, import_obsidian5.setIcon)(searchWrap.createSpan(), "search");
    const search = searchWrap.createEl("input", {
      type: "search",
      placeholder: t.taskSearch,
      cls: "pmi-pane-search"
    });
    search.value = this.taskQuery;
    const result = filters.createDiv({ cls: "pmi-task-filter-result", attr: { "aria-live": "polite" } });
    const reset = filters.createEl("button", {
      cls: "pmi-task-filter-reset",
      attr: { type: "button", title: t.resetFilters, "aria-label": t.resetFilters }
    });
    (0, import_obsidian5.setIcon)(reset, "rotate-ccw");
    reset.createSpan({ text: t.resetFilters });
    const renderRows = () => {
      this.taskQuery = search.value.normalize("NFKC").trim().toLocaleLowerCase();
      const tasks = member.tasks.filter((task2) => {
        var _a2;
        const matchesText = !this.taskQuery || task2.title.normalize("NFKC").toLocaleLowerCase().includes(this.taskQuery) || task2.projectTitle.normalize("NFKC").toLocaleLowerCase().includes(this.taskQuery);
        const matchesStatus = this.taskStatuses === null || this.taskStatuses.has(task2.status);
        const matchesPriority = this.taskPriorities === null || this.taskPriorities.has((_a2 = task2.priority) != null ? _a2 : TASK_PRIORITY_NONE);
        return matchesText && matchesStatus && matchesPriority;
      });
      const priorityRanks = new Map(
        priorityOptions.map((priority, index) => [priority.value, index])
      );
      const sortedTasks = tasks.map((task2, index) => ({ task: task2, index })).sort((left, right) => {
        var _a2, _b, _c, _d;
        if (this.taskPrioritySort === "none") return left.index - right.index;
        if (left.task.priority === null && right.task.priority !== null) return 1;
        if (left.task.priority !== null && right.task.priority === null) return -1;
        const leftRank = (_b = priorityRanks.get((_a2 = left.task.priority) != null ? _a2 : TASK_PRIORITY_NONE)) != null ? _b : Number.MAX_SAFE_INTEGER;
        const rightRank = (_d = priorityRanks.get((_c = right.task.priority) != null ? _c : TASK_PRIORITY_NONE)) != null ? _d : Number.MAX_SAFE_INTEGER;
        const rankDifference = leftRank - rightRank;
        if (rankDifference === 0) return left.index - right.index;
        return this.taskPrioritySort === "high-to-low" ? rankDifference : -rankDifference;
      }).map(({ task: task2 }) => task2);
      result.setText(t.memberWorkResult(tasks, member.tasks, this.quickSource));
      reset.disabled = this.taskQuery.length === 0 && this.taskStatuses === null && this.taskPriorities === null;
      this.renderMemberTaskView(root, sortedTasks, projects, priorities, stages, statuses, t, () => {
        this.taskPrioritySort = this.taskPrioritySort === "none" ? "high-to-low" : this.taskPrioritySort === "high-to-low" ? "low-to-high" : "none";
        renderRows();
      });
    };
    this.renderTaskFilterMenu(
      filters,
      "workflow",
      t.status,
      t.allTaskStatuses,
      statusOptions,
      this.taskStatuses,
      (selection) => {
        this.taskStatuses = selection;
        renderRows();
      },
      t
    );
    this.renderTaskFilterMenu(
      filters,
      "signal-high",
      t.priority,
      t.allPriorities,
      priorityOptions,
      this.taskPriorities,
      (selection) => {
        this.taskPriorities = selection;
        renderRows();
      },
      t
    );
    search.addEventListener("input", renderRows);
    reset.addEventListener("click", () => {
      this.taskQuery = "";
      this.taskStatuses = null;
      this.taskPriorities = null;
      root.empty();
      this.renderTaskDetail(root, member, projects, priorities, stages, statuses, t);
    });
    renderRows();
  }
  renderMemberViewSwitcher(root, onChange) {
    const switcher = root.createDiv("pm-view-switcher pmi-member-view-switcher");
    const options = [
      { id: "table", icon: "table", label: "表格" },
      { id: "gantt", icon: "git-fork", label: "甘特图" },
      { id: "kanban", icon: "layout-dashboard", label: "看板" }
    ];
    for (const option of options) {
      const button = switcher.createEl("button", {
        cls: `clickable-icon pm-view-btn${this.memberViewMode === option.id ? " pm-view-btn--active" : ""}`,
        attr: { type: "button", title: option.label, "aria-label": option.label, "aria-pressed": String(this.memberViewMode === option.id) }
      });
      (0, import_obsidian5.setIcon)(button, option.icon);
      button.addEventListener("click", () => {
        if (this.memberViewMode === option.id) return;
        this.memberViewMode = option.id;
        this.host.settings.memberViewMode = option.id;
        void this.host.saveSettings();
        onChange();
      });
    }
  }
  renderMemberRatios(root, member, t) {
    const ledger = root.createDiv({
      cls: "pmi-member-ratios",
      attr: { role: "region", "aria-label": t.memberRatios }
    });
    const groups = [
      {
        kind: "delivery",
        icon: "circle-check-big",
        label: t.deliveryRatios,
        metrics: [
          {
            label: t.taskClosureRate,
            hint: t.taskClosureRateHint,
            metric: member.ratios.taskClosure,
            sample: t.ratioTasks
          },
          {
            label: t.plannedClosureRate,
            hint: t.plannedClosureRateHint,
            metric: member.ratios.plannedClosure,
            sample: t.ratioHours
          }
        ]
      },
      {
        kind: "time",
        icon: "timer",
        label: t.timeRatios,
        metrics: [
          {
            label: t.timeConsumptionRate,
            hint: t.timeConsumptionRateHint,
            metric: member.ratios.timeConsumption,
            sample: t.ratioHours
          },
          {
            label: t.overrunTaskRate,
            hint: t.overrunTaskRateHint,
            metric: member.ratios.overrunTasks,
            sample: t.ratioTasks,
            warning: member.ratios.overrunTasks.numerator > 0
          }
        ]
      },
      {
        kind: "data",
        icon: "scan-search",
        label: t.dataRatios,
        metrics: [
          {
            label: t.estimateAccuracyRate,
            hint: t.estimateAccuracyRateHint,
            metric: member.ratios.estimateAccuracy,
            sample: t.ratioTasks
          },
          {
            label: t.estimateCoverageRate,
            hint: t.estimateCoverageRateHint,
            metric: member.ratios.estimateCoverage,
            sample: t.ratioTasks
          }
        ]
      }
    ];
    for (const group of groups) {
      const row = ledger.createDiv(`pmi-ratio-group pmi-ratio-group--${group.kind}`);
      const heading = row.createDiv("pmi-ratio-group-label");
      (0, import_obsidian5.setIcon)(heading.createSpan(), group.icon);
      heading.createSpan({ text: group.label });
      for (const item of group.metrics) {
        const percentage = item.metric.percentage === null ? t.ratioUnavailable : t.percentage(item.metric.percentage);
        const sample = item.sample(item.metric.numerator, item.metric.denominator);
        const metric = row.createDiv({
          cls: `pmi-ratio-metric${item.warning ? " is-warning" : ""}`,
          attr: {
            title: item.hint,
            "aria-label": `${item.label}: ${percentage}; ${sample}. ${item.hint}`
          }
        });
        metric.createSpan({ cls: "pmi-ratio-name", text: item.label });
        metric.createEl("strong", { text: percentage });
      }
    }
  }
  normalizeTaskFilter(selection, options) {
    if (selection === null) return null;
    const available = new Set(options.map((option) => option.value));
    const normalized = new Set([...selection].filter((value) => available.has(value)));
    return normalized.size === available.size ? null : normalized;
  }
  renderTaskFilterMenu(root, icon, label, allLabel, options, selection, onChange, t) {
    const menu = root.createEl("details", { cls: "pmi-task-filter-menu" });
    const summary = menu.createEl("summary", { attr: { "aria-label": label } });
    (0, import_obsidian5.setIcon)(summary.createSpan("pmi-task-filter-icon"), icon);
    const copy = summary.createSpan("pmi-task-filter-copy");
    copy.createSpan({ cls: "pmi-task-filter-label", text: label });
    const value = copy.createSpan("pmi-task-filter-value");
    const chevron = summary.createSpan("pmi-task-filter-chevron");
    (0, import_obsidian5.setIcon)(chevron, "chevron-down");
    const panel = menu.createDiv("pmi-task-filter-panel");
    const panelHead = panel.createDiv("pmi-task-filter-panel-head");
    panelHead.createEl("strong", { text: label });
    panelHead.createSpan({ text: t.optionCount(options.length) });
    const actions = panel.createDiv("pmi-task-filter-actions");
    const selectAll = actions.createEl("button", { text: t.selectAll, attr: { type: "button" } });
    const clear = actions.createEl("button", { text: t.clear, attr: { type: "button" } });
    const list = panel.createDiv("pmi-task-filter-options");
    let currentSelection = selection;
    const summaryText = () => {
      var _a, _b;
      if (currentSelection === null || currentSelection.size === options.length) return allLabel;
      if (currentSelection.size === 0) return t.noneSelected;
      if (currentSelection.size === 1) {
        return (_b = (_a = options.find((option) => currentSelection == null ? void 0 : currentSelection.has(option.value))) == null ? void 0 : _a.label) != null ? _b : t.selectedCount(1);
      }
      return t.selectedCount(currentSelection.size);
    };
    const update = (next) => {
      var _a;
      currentSelection = next;
      value.setText(summaryText());
      for (const checkbox of list.querySelectorAll('input[type="checkbox"]')) {
        checkbox.checked = currentSelection === null || currentSelection.has((_a = checkbox.dataset.filterValue) != null ? _a : "");
      }
      onChange(currentSelection);
    };
    for (const option of options) {
      const row = list.createEl("label", { cls: "pmi-task-filter-option" });
      const checkbox = row.createEl("input", { type: "checkbox" });
      checkbox.dataset.filterValue = option.value;
      checkbox.checked = currentSelection === null || currentSelection.has(option.value);
      const name = row.createSpan("pmi-task-filter-option-name");
      if (option.color) {
        const signal = name.createSpan({ cls: "pmi-priority-signal", attr: { "aria-hidden": "true" } });
        signal.style.backgroundColor = option.color;
      }
      name.createSpan({ cls: "pmi-task-filter-option-label", text: option.label });
      row.createSpan({ cls: "pmi-task-filter-option-count", text: String(option.count) });
      checkbox.addEventListener("change", () => {
        const next = currentSelection === null ? new Set(options.map((candidate) => candidate.value)) : new Set(currentSelection);
        checkbox.checked ? next.add(option.value) : next.delete(option.value);
        update(next.size === options.length ? null : next);
      });
    }
    value.setText(summaryText());
    selectAll.addEventListener("click", () => update(null));
    clear.addEventListener("click", () => update(/* @__PURE__ */ new Set()));
    menu.addEventListener("toggle", () => {
      if (!menu.open) return;
      for (const sibling of root.querySelectorAll(
        ".pmi-task-filter-menu[open]"
      )) {
        if (sibling !== menu) sibling.open = false;
      }
    });
    menu.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !menu.open) return;
      menu.open = false;
      summary.focus();
      event.preventDefault();
      event.stopPropagation();
    });
  }
  clearMemberTaskViews(detail) {
    for (const selector of [
      ".pmi-pm-table-wrapper",
      ".pmi-member-kanban",
      ".pmi-member-gantt",
      ".pmi-list-empty.pmi-task-empty"
    ]) {
      for (const element of detail.querySelectorAll(selector)) element.remove();
    }
  }
  orderMemberTasks(tasks) {
    const taskById = new Map(tasks.map((task2) => [task2.id, task2]));
    const childrenByParent = new Map();
    for (const task2 of tasks) {
      if (!task2.parentId || !taskById.has(task2.parentId)) continue;
      const children = childrenByParent.get(task2.parentId) ?? [];
      children.push(task2);
      childrenByParent.set(task2.parentId, children);
    }
    const ordered = [];
    const visited = new Set();
    const visit = (task2, depth = 0) => {
      if (visited.has(task2.id)) return;
      visited.add(task2.id);
      ordered.push({ task: task2, depth });
      for (const child of childrenByParent.get(task2.id) ?? []) visit(child, depth + 1);
    };
    for (const task2 of tasks) if (!task2.parentId || !taskById.has(task2.parentId)) visit(task2);
    for (const task2 of tasks) visit(task2);
    return ordered;
  }
  createMemberChip(root, label, color = "var(--text-muted)", variant = "outline") {
    const chip = root.createSpan({ cls: `pm-chip pm-chip--${variant} pm-chip--sm` });
    chip.style.setProperty("--pm-chip-color", color);
    chip.createSpan({ cls: "pm-chip-dot" });
    chip.createSpan({ text: label });
    return chip;
  }
  renderMemberTaskView(detail, tasks, projects, priorities, stages, statuses, t, onPrioritySort) {
    if (this.memberViewMode === "kanban") {
      this.renderMemberKanban(detail, tasks, projects, priorities, stages, statuses, t);
      return;
    }
    if (this.memberViewMode === "gantt") {
      this.renderMemberGantt(detail, tasks, projects, priorities, stages, statuses, t);
      return;
    }
    this.renderTaskRows(detail, tasks, projects, priorities, stages, statuses, t, onPrioritySort);
  }
  renderMemberKanban(detail, tasks, projects, priorities, stages, statuses, t) {
    this.clearMemberTaskViews(detail);
    if (tasks.length === 0) {
      detail.createDiv({ cls: "pmi-list-empty pmi-task-empty", text: t.noTasks });
      return;
    }
    const root = detail.createDiv("pm-root pmi-member-kanban");
    const board = root.createDiv("pm-kanban-board");
    const projectRecords = new Map(projects.map((project2) => [project2.id, project2]));
    const priorityDefinitions = new Map(priorities.map((definition) => [definition.id, definition]));
    const source = this.getQuickFilter().quickSource;
    const groupBy = source === "task" ? "status" : "stage";
    const definitions = groupBy === "status" ? statuses : stages;
    const definitionMap = new Map(definitions.map((definition) => [definition.id, definition]));
    const orderedTasks = this.orderMemberTasks(tasks).map(({ task: task2 }) => task2);
    const groupKeys = new Set(orderedTasks.map((task2) => String(task2[groupBy] ?? "")));
    const columns = [
      ...definitions.filter((definition) => groupKeys.has(definition.id)),
      ...[...groupKeys].filter((key) => !definitionMap.has(key)).sort().map((key) => ({ id: key, label: key || "未设置", color: "var(--text-muted)" }))
    ];
    for (const definition of columns) {
      const columnTasks = orderedTasks.filter((task2) => String(task2[groupBy] ?? "") === definition.id);
      const column = board.createDiv("pm-kanban-col pmi-member-kanban-col");
      const header = column.createDiv("pm-kanban-col-header");
      const topbar = header.createDiv("pm-kanban-col-topbar");
      topbar.style.background = definition.color || "var(--text-muted)";
      const titleRow = header.createDiv("pm-kanban-col-title-row");
      const badge = titleRow.createSpan({ cls: "pm-kanban-col-badge", text: definition.label || definition.id || "未设置" });
      badge.style.color = definition.color || "var(--text-muted)";
      titleRow.createSpan({ cls: "pm-kanban-col-count", text: String(columnTasks.length) });
      const cards = column.createDiv("pm-kanban-cards");
      for (const task2 of columnTasks) {
        const projectRecord = projectRecords.get(task2.projectId);
        const card = cards.createDiv(`pm-kanban-card${task2.completed ? " pm-table-row--done" : ""}`);
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        const priority = task2.priority ? priorityDefinitions.get(task2.priority) : null;
        const priorityBar = card.createDiv("pm-kanban-card-priority-bar");
        priorityBar.style.background = priority?.color ?? "var(--background-modifier-border)";
        const body = card.createDiv("pm-kanban-card-body");
        body.createEl("h4", { cls: "pm-kanban-card-title", text: task2.title });
        if (task2.parentId) {
          const parent = orderedTasks.find((candidate) => candidate.id === task2.parentId);
          if (parent) body.createDiv({ cls: "pm-kanban-card-parent", text: parent.title });
        }
        const tags = body.createDiv("pm-kanban-card-tags");
        this.createMemberChip(tags, task2.sourceType === "requirement" ? t.requirement : t.task, task2.sourceType === "requirement" ? "var(--color-yellow)" : "var(--color-pink)");
        if (projectRecord) this.createMemberChip(tags, projectRecord.title, "var(--interactive-accent)");
        for (const tag of task2.tags.filter((tag) => !["zentao", "zentao-task", "zentao-requirement"].includes(tag)).slice(0, 2)) {
          this.createMemberChip(tags, tag, tag.startsWith("超时") ? "var(--color-red)" : "var(--text-muted)");
        }
        const footer = body.createDiv("pm-kanban-card-footer");
        footer.createSpan({ cls: "pmi-member-card-hours", text: t.workHours(task2.displayLogged ?? task2.logged, task2.displayEstimate ?? task2.estimate) });
        footer.createSpan({ cls: "pmi-member-card-date", text: task2.due ?? "—" });
        this.bindCellAction(card, () => {
          if (!projectRecord) return;
          void this.host.openTask(task2.id, projectRecord.path);
        });
      }
    }
  }
  renderMemberGantt(detail, tasks, projects, priorities, stages, statuses, t) {
    this.clearMemberTaskViews(detail);
    if (tasks.length === 0) {
      detail.createDiv({ cls: "pmi-list-empty pmi-task-empty", text: t.noTasks });
      return;
    }
    const root = detail.createDiv("pmi-member-gantt");
    root.toggleClass("is-day-scale", this.memberGanttScale === "day");
    root.toggleClass("is-week-scale", this.memberGanttScale === "week");
    root.toggleClass("is-month-scale", this.memberGanttScale === "month");
    root.style.setProperty("--pmi-member-gantt-label-width", `${this.memberGanttLabelWidth}px`);
    const toolbar = root.createDiv("pmi-member-gantt-toolbar");
    toolbar.createSpan({ cls: "pmi-member-gantt-title", text: "只读排期" });
    const legend = toolbar.createDiv("pmi-member-gantt-legend");
    for (const item of [
      { label: "已消耗", kind: "logged" },
      { label: "剩余", kind: "remaining" },
      { label: "超时", kind: "overrun" },
      { label: "需求推导", kind: "derived" }
    ]) {
      const legendItem = legend.createSpan("pmi-member-gantt-legend-item");
      legendItem.createSpan(`pmi-member-gantt-legend-signal is-${item.kind}`);
      legendItem.createSpan({ text: item.label });
    }
    const locateLabel = this.memberGanttScale === "day" ? "今天" : this.memberGanttScale === "week" ? "本周" : "本月";
    const locate = toolbar.createEl("button", {
      cls: "pmi-member-gantt-locate",
      attr: { type: "button", title: `定位到${locateLabel}`, "aria-label": `定位到${locateLabel}` }
    });
    (0, import_obsidian5.setIcon)(locate, "locate-fixed");
    locate.createSpan({ text: locateLabel });
    const scale = toolbar.createDiv("pm-segmented pmi-member-gantt-scale");
    for (const option of [
      { id: "day", label: "日" },
      { id: "week", label: "周" },
      { id: "month", label: "月" }
    ]) {
      const button = scale.createEl("button", {
        cls: `pm-chip-btn${this.memberGanttScale === option.id ? " pm-chip-btn--active" : ""}`,
        text: option.label,
        attr: { type: "button", "aria-pressed": String(this.memberGanttScale === option.id) }
      });
      button.addEventListener("click", () => {
        if (this.memberGanttScale === option.id) return;
        this.memberGanttScale = option.id;
        this.host.settings.memberGanttScale = option.id;
        void this.host.saveSettings();
        this.renderMemberGantt(detail, tasks, projects, priorities, stages, statuses, t);
      });
    }
    const projectRecords = new Map(projects.map((project2) => [project2.id, project2]));
    const ordered = this.orderMemberTasks(tasks);
    const taskById = new Map(tasks.map((task2) => [task2.id, task2]));
    const childrenByParent = new Map();
    for (const task2 of tasks) {
      if (!task2.parentId || !taskById.has(task2.parentId)) continue;
      const children = childrenByParent.get(task2.parentId) ?? [];
      children.push(task2);
      childrenByParent.set(task2.parentId, children);
    }
    const rangeCache = new Map();
    const resolveRange = (task2, stack = /* @__PURE__ */ new Set()) => {
      if (rangeCache.has(task2.id)) return rangeCache.get(task2.id);
      if (stack.has(task2.id)) return { start: null, end: null, derived: false };
      const nextStack = new Set(stack);
      nextStack.add(task2.id);
      const ownStart = memberDateValue(task2.start);
      const ownEnd = memberDateValue(task2.due);
      const childRanges = (childrenByParent.get(task2.id) ?? []).map((child) => resolveRange(child, nextStack)).filter((range) => range.start !== null && range.end !== null);
      const childStart = childRanges.length > 0 ? Math.min(...childRanges.map((range) => range.start)) : null;
      const childEnd = childRanges.length > 0 ? Math.max(...childRanges.map((range) => range.end)) : null;
      let start = ownStart;
      let end = ownEnd;
      let derived = false;
      if (task2.sourceType === "requirement") {
        if (start === null && childStart !== null) {
          start = childStart;
          derived = true;
        }
        if (end === null && childEnd !== null) {
          end = childEnd;
          derived = true;
        }
      }
      if (start !== null && end === null) end = start;
      if (end !== null && start === null) start = end;
      if (start !== null && end !== null && end < start) [start, end] = [end, start];
      const range = { start, end, derived };
      rangeCache.set(task2.id, range);
      return range;
    };
    const rows = ordered.map((item) => ({ ...item, range: resolveRange(item.task) }));
    const scheduled = rows.filter((item) => item.range.start !== null && item.range.end !== null);
    const unscheduled = rows.filter((item) => item.range.start === null || item.range.end === null);
    locate.disabled = scheduled.length === 0;
    if (scheduled.length > 0) {
      const dayWidth = MEMBER_GANTT_SCALE_WIDTHS[this.memberGanttScale];
      const currentPeriodStart = memberCurrentPeriodStart(this.memberGanttScale);
      let rangeStart = Math.min(currentPeriodStart, ...scheduled.map((item) => item.range.start)) - MEMBER_GANTT_START_PADDING_DAYS * MEMBER_GANTT_DAY_MS;
      let rangeEnd = Math.max(currentPeriodStart, ...scheduled.map((item) => item.range.end)) + MEMBER_GANTT_END_PADDING_DAYS * MEMBER_GANTT_DAY_MS;
      const minimumDays = MEMBER_GANTT_MIN_DAYS[this.memberGanttScale];
      const currentSpan = Math.round((rangeEnd - rangeStart) / MEMBER_GANTT_DAY_MS);
      if (currentSpan < minimumDays) {
        const extraDays = Math.ceil((minimumDays - currentSpan) / 2);
        rangeStart -= extraDays * MEMBER_GANTT_DAY_MS;
        rangeEnd += extraDays * MEMBER_GANTT_DAY_MS;
      }
      if (this.memberGanttScale === "week") {
        const startDay = new Date(rangeStart).getUTCDay() || 7;
        const endDay = new Date(rangeEnd).getUTCDay() || 7;
        rangeStart -= (startDay - 1) * MEMBER_GANTT_DAY_MS;
        rangeEnd += (7 - endDay) * MEMBER_GANTT_DAY_MS;
      } else if (this.memberGanttScale === "month") {
        const startDate = new Date(rangeStart);
        const endDate = new Date(rangeEnd);
        rangeStart = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1);
        rangeEnd = Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth() + 1, 0);
      }
      const dayCount = Math.max(1, Math.round((rangeEnd - rangeStart) / MEMBER_GANTT_DAY_MS) + 1);
      const timelineWidth = Math.max(MEMBER_GANTT_MIN_WIDTH, dayCount * dayWidth);
      const stepDays = this.memberGanttScale === "day" ? 1 : this.memberGanttScale === "week" ? 7 : 30;
      const dailyWork = new Map();
      const allocateHours = (hours, start, end, field) => {
        if (!(hours > 0) || start === null || end === null) return;
        const first = Math.min(start, end);
        const last = Math.max(start, end);
        const days = Math.max(1, Math.round((last - first) / MEMBER_GANTT_DAY_MS) + 1);
        const perDay = hours / days;
        for (let timestamp = first; timestamp <= last; timestamp += MEMBER_GANTT_DAY_MS) {
          const current = dailyWork.get(timestamp) ?? { planned: 0, logged: 0 };
          current[field] += perDay;
          dailyWork.set(timestamp, current);
        }
      };
      for (const item of scheduled) {
        const task2 = item.task;
        if (task2.sourceType !== "task" || task2.contextOnly) continue;
        const plannedStart = memberDateValue(task2.start) ?? item.range.start;
        const plannedEnd = memberDateValue(task2.due) ?? item.range.end;
        allocateHours(task2.estimate, plannedStart, plannedEnd, "planned");
        const actualStart = memberDateValue(task2.actualStartedAt) ?? plannedStart;
        const actualEnd = memberDateValue(task2.actualFinishedAt) ?? memberDateValue(task2.completedAt) ?? plannedEnd;
        allocateHours(task2.logged, actualStart, actualEnd, "logged");
      }
      const scroll = root.createDiv("pmi-member-gantt-scroll");
      locate.addEventListener("click", () => {
        const target = memberCurrentPeriodStart(this.memberGanttScale);
        const targetX = (target - rangeStart) / MEMBER_GANTT_DAY_MS * dayWidth;
        const viewportWidth = Math.max(0, scroll.clientWidth - this.memberGanttLabelWidth);
        const nextLeft = this.memberGanttScale === "day" ? targetX - viewportWidth / 2 : targetX - 20;
        scroll.scrollTo({ left: Math.max(0, nextLeft), behavior: "smooth" });
      });
      const header = scroll.createDiv("pmi-member-gantt-row pmi-member-gantt-row--header");
      const headerLabel = header.createDiv({ cls: "pmi-member-gantt-label", text: "事项 / 项目" });
      const labelResizer = headerLabel.createDiv("pmi-member-gantt-label-resizer");
      labelResizer.setAttribute("role", "separator");
      labelResizer.setAttribute("aria-orientation", "vertical");
      labelResizer.setAttribute("aria-label", "调整事项区域宽度");
      labelResizer.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        const startX = event.clientX;
        const startWidth = this.memberGanttLabelWidth;
        labelResizer.setPointerCapture(event.pointerId);
        const move = (moveEvent) => {
          const width = Math.min(MEMBER_GANTT_LABEL_MAX_WIDTH, Math.max(MEMBER_GANTT_LABEL_MIN_WIDTH, Math.round(startWidth + moveEvent.clientX - startX)));
          this.memberGanttLabelWidth = width;
          root.style.setProperty("--pmi-member-gantt-label-width", `${width}px`);
        };
        const end = () => {
          labelResizer.removeEventListener("pointermove", move);
          labelResizer.removeEventListener("pointerup", end);
          labelResizer.removeEventListener("pointercancel", end);
          if (labelResizer.hasPointerCapture(event.pointerId)) labelResizer.releasePointerCapture(event.pointerId);
        };
        labelResizer.addEventListener("pointermove", move);
        labelResizer.addEventListener("pointerup", end);
        labelResizer.addEventListener("pointercancel", end);
      });
      const headerTimeline = header.createDiv("pmi-member-gantt-timeline pmi-member-gantt-timeline--header");
      headerTimeline.style.width = `${timelineWidth}px`;
      headerTimeline.style.setProperty("--pmi-member-gantt-day-width", `${dayWidth}px`);
      const periods = [];
      if (this.memberGanttScale === "month") {
        for (let timestamp = rangeStart; timestamp <= rangeEnd; ) {
          const date = new Date(timestamp);
          const next = Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
          const end = Math.min(rangeEnd, next - MEMBER_GANTT_DAY_MS);
          periods.push({ start: timestamp, end, offsetDays: Math.round((timestamp - rangeStart) / MEMBER_GANTT_DAY_MS) });
          timestamp = next;
        }
      } else {
        for (let day = 0; day < dayCount; day += stepDays) {
          periods.push({
            start: rangeStart + day * MEMBER_GANTT_DAY_MS,
            end: rangeStart + Math.min(dayCount - 1, day + stepDays - 1) * MEMBER_GANTT_DAY_MS,
            offsetDays: day
          });
        }
      }
      for (const period of periods) {
        const periodDays = Math.max(1, Math.round((period.end - period.start) / MEMBER_GANTT_DAY_MS) + 1);
        const totals = { planned: 0, logged: 0 };
        for (let timestamp = period.start; timestamp <= period.end; timestamp += MEMBER_GANTT_DAY_MS) {
          const daily = dailyWork.get(timestamp);
          if (!daily) continue;
          totals.planned += daily.planned;
          totals.logged += daily.logged;
        }
        const cell = headerTimeline.createDiv(`pmi-member-gantt-period-summary is-${this.memberGanttScale}`);
        cell.style.left = `${period.offsetDays * dayWidth}px`;
        cell.style.width = `${periodDays * dayWidth}px`;
        if (this.memberGanttScale === "week") {
          const week = memberIsoWeek(period.start);
          const heading = cell.createDiv("pmi-member-gantt-week-heading");
          heading.createSpan({ cls: "pmi-member-gantt-week-label", text: `${week.year} · 第 ${week.week} 周` });
          const work = heading.createDiv({ cls: `pmi-member-gantt-day-work${totals.logged > totals.planned ? " is-overrun" : ""}`, attr: { title: `预计 ${t.hours(totals.planned)} · 实际 ${t.hours(totals.logged)}` } });
          work.createSpan({ text: `预计 ${totals.planned.toLocaleString(void 0, { maximumFractionDigits: 1 })}h` });
          work.createSpan({ text: `实际 ${totals.logged.toLocaleString(void 0, { maximumFractionDigits: 1 })}h` });
          const days = cell.createDiv("pmi-member-gantt-week-days");
          for (let timestamp = period.start; timestamp <= period.end; timestamp += MEMBER_GANTT_DAY_MS) {
            const day = days.createDiv("pmi-member-gantt-week-day");
            day.style.width = `${dayWidth}px`;
            day.createSpan({ cls: "pmi-member-gantt-week-date", text: memberDateText(timestamp, "day") });
            day.createSpan({ cls: "pmi-member-gantt-week-weekday", text: memberWeekdayText(timestamp) });
          }
        } else {
          cell.createSpan({ cls: "pmi-member-gantt-day-label", text: memberDateText(period.start, this.memberGanttScale) });
          const work = cell.createDiv({ cls: `pmi-member-gantt-day-work${totals.logged > totals.planned ? " is-overrun" : ""}`, attr: { title: `预计 ${t.hours(totals.planned)} · 实际 ${t.hours(totals.logged)}` } });
          const compact = this.memberGanttScale === "day";
          work.createSpan({ text: `${compact ? "预" : "预计 "}${totals.planned.toLocaleString(void 0, { maximumFractionDigits: 1 })}${compact ? "" : "h"}` });
          work.createSpan({ text: `${compact ? "实" : "实际 "}${totals.logged.toLocaleString(void 0, { maximumFractionDigits: 1 })}${compact ? "" : "h"}` });
        }
      }
      for (const item of scheduled) {
        const task2 = item.task;
        const projectRecord = projectRecords.get(task2.projectId);
        const row = scroll.createDiv("pmi-member-gantt-row");
        const label = row.createDiv(`pmi-member-gantt-label pmi-member-gantt-label--${task2.sourceType}`);
        label.style.paddingInlineStart = `${item.depth * 16 + 10}px`;
        const copy = label.createDiv("pmi-member-gantt-copy");
        const meta = copy.createDiv("pmi-member-gantt-meta");
        const itemType = task2.sourceType === "requirement" ? t.requirement : task2.sourceType === "milestone" ? "里程碑" : t.task;
        const estimatedHours = task2.displayEstimate ?? task2.estimate;
        const loggedHours2 = task2.displayLogged ?? task2.logged;
        const remainingHours = task2.displayRemaining ?? task2.remaining;
        const overrunHours = Math.max(loggedHours2 - estimatedHours, 0);
        const aheadHours = task2.completed ? Math.max(estimatedHours - loggedHours2, 0) : 0;
        meta.createSpan({ cls: "pmi-member-gantt-id", text: task2.zentaoId ? `${itemType} #${task2.zentaoId}` : itemType });
        this.createMemberChip(meta, itemType, task2.sourceType === "requirement" ? "var(--color-yellow)" : task2.sourceType === "milestone" ? "var(--color-purple)" : "var(--color-pink)");
        meta.createSpan({ cls: "pmi-member-gantt-estimate", text: estimatedHours > 0 ? `预计 ${t.hours(estimatedHours)}` : "未估时" });
        const title = copy.createDiv({ cls: "pmi-member-gantt-task", text: task2.title, attr: { role: "button", tabindex: "0", title: task2.title } });
        const bottom = copy.createDiv("pmi-member-gantt-bottom");
        if (projectRecord) {
          const projectLine = bottom.createDiv({ cls: "pmi-member-gantt-project", attr: { title: projectRecord.title } });
          projectLine.createSpan({ cls: "pmi-member-gantt-project-icon", text: projectRecord.icon });
          projectLine.createSpan({ text: projectRecord.title });
        }
        const effortText = estimatedHours > 0 ? `${t.workHours(loggedHours2, estimatedHours)}${overrunHours > 0 ? ` · 超时 ${t.hours(overrunHours)}` : aheadHours > 0 ? ` · 提前 ${t.hours(aheadHours)}` : remainingHours > 0 ? ` · 剩余 ${t.hours(remainingHours)}` : ""}` : `已消耗 ${t.hours(loggedHours2)} · 未估时`;
        bottom.createSpan({ cls: `pmi-member-gantt-effort-text${overrunHours > 0 ? " is-overrun" : aheadHours > 0 ? " is-ahead" : ""}`, text: effortText });
        const effortRail = copy.createDiv(`pmi-member-gantt-effort-rail${estimatedHours <= 0 ? " is-unestimated" : ""}`);
        const effortScale = Math.max(estimatedHours, loggedHours2, 1);
        const plannedLogged = estimatedHours > 0 ? Math.min(loggedHours2, estimatedHours) : loggedHours2;
        const loggedSegment = effortRail.createSpan("pmi-member-gantt-effort-logged");
        loggedSegment.style.width = `${Math.min(plannedLogged / effortScale * 100, 100)}%`;
        if (remainingHours > 0 && estimatedHours > 0) {
          const remainingSegment = effortRail.createSpan("pmi-member-gantt-effort-remaining");
          remainingSegment.style.width = `${Math.min(remainingHours / effortScale * 100, 100)}%`;
        }
        if (overrunHours > 0) {
          const overrunSegment = effortRail.createSpan("pmi-member-gantt-effort-overrun");
          overrunSegment.style.width = `${Math.min(overrunHours / effortScale * 100, 100)}%`;
        }
        const timeline = row.createDiv("pmi-member-gantt-timeline");
        timeline.style.width = `${timelineWidth}px`;
        timeline.style.setProperty("--pmi-member-gantt-day-width", `${dayWidth}px`);
        const left = (item.range.start - rangeStart) / MEMBER_GANTT_DAY_MS * dayWidth;
        const width = Math.max(dayWidth, ((item.range.end - item.range.start) / MEMBER_GANTT_DAY_MS + 1) * dayWidth);
        const bar = timeline.createDiv(`pmi-member-gantt-bar${task2.completed ? " is-complete" : ""}${item.range.derived ? " is-derived" : ""}`);
        bar.style.left = `${left}px`;
        bar.style.width = `${width}px`;
        bar.setAttribute("role", "button");
        bar.setAttribute("tabindex", "0");
        bar.setAttribute("title", `${task2.title}\n计划日期：${task2.start ?? "未设置"} → ${task2.due ?? "未设置"}\n预计工时：${estimatedHours > 0 ? t.hours(estimatedHours) : "未估时"}\n已消耗：${t.hours(loggedHours2)}\n剩余：${t.hours(remainingHours)}\n进度：${Math.round(task2.progress)}%`);
        const progress = bar.createSpan("pmi-member-gantt-progress");
        progress.style.width = `${Math.max(0, Math.min(100, task2.progress))}%`;
        const barHours = bar.createSpan("pmi-member-gantt-bar-hours");
        if (width >= MEMBER_GANTT_BAR_LABEL_MIN_WIDTH) barHours.setText(estimatedHours > 0 ? t.hours(estimatedHours) : "未估时");
        else (0, import_obsidian5.setIcon)(barHours, "clock-3");
        if (task2.completedAt) {
          const completedAt = memberDateValue(task2.completedAt);
          if (completedAt !== null && completedAt >= rangeStart && completedAt <= rangeEnd) {
            const marker = timeline.createSpan("pmi-member-gantt-completed");
            marker.style.left = `${(completedAt - rangeStart) / MEMBER_GANTT_DAY_MS * dayWidth}px`;
            marker.setAttribute("title", `完成：${task2.completedAt}`);
          }
        }
        const open = () => {
          if (!projectRecord) return;
          void this.host.openTask(task2.id, projectRecord.path);
        };
        this.bindCellAction(title, open);
        this.bindCellAction(bar, open);
      }
    }
    if (unscheduled.length > 0) {
      const section = root.createDiv("pmi-member-gantt-unscheduled");
      section.createEl("h4", { text: `未排期事项（${unscheduled.length}）` });
      const list = section.createDiv("pmi-member-gantt-unscheduled-list");
      for (const item of unscheduled) {
        const projectRecord = projectRecords.get(item.task.projectId);
        const button = list.createEl("button", { attr: { type: "button" } });
        button.createSpan({ text: item.task.title });
        if (projectRecord) button.createSpan({ cls: "pmi-member-gantt-project", text: projectRecord.title });
        button.createSpan({ cls: "pmi-member-gantt-effort-text", text: t.workHours(item.task.displayLogged ?? item.task.logged, item.task.displayEstimate ?? item.task.estimate) });
        button.addEventListener("click", () => {
          if (!projectRecord) return;
          void this.host.openTask(item.task.id, projectRecord.path);
        });
      }
    }
  }
  renderTaskRows(detail, tasks, projects, priorities, stages, statuses, t, onPrioritySort) {
    return this.renderProjectManagerTaskRows(detail, tasks, projects, priorities, stages, statuses, t, onPrioritySort);
    var _a, _b, _c, _d, _e, _f;
    (_a = detail.querySelector(".pmi-task-table")) == null ? void 0 : _a.remove();
    (_b = detail.querySelector(".pmi-list-empty.pmi-task-empty")) == null ? void 0 : _b.remove();
    if (tasks.length === 0) {
      detail.createDiv({ cls: "pmi-list-empty pmi-task-empty", text: t.noTasks });
      return;
    }
    const projectRecords = new Map(projects.map((project2) => [project2.id, project2]));
    const table = detail.createDiv({
      cls: "pmi-task-table",
      attr: {
        role: "region",
        tabindex: "0",
        "aria-label": t.tasks
      }
    });
    const columns = table.createDiv("pmi-task-columns");
    const columnLabels = [
      t.taskId,
      t.tasks,
      t.project,
      t.module,
      t.stage,
      t.status,
      t.priority,
      t.assignee,
      t.completedBy,
      t.due,
      t.progress,
      t.work
    ];
    if (this.taskColumnWidths && this.taskColumnWidths.length !== columnLabels.length) this.taskColumnWidths = null;
    if (this.taskColumnWidths) this.applyTaskColumnWidths(table, this.taskColumnWidths);
    const columnHeaders = columnLabels.map((label) => {
      const header = columns.createDiv({ cls: "pmi-task-column", attr: { role: "columnheader" } });
      if (label === t.priority) {
        header.setAttribute(
          "aria-sort",
          this.taskPrioritySort === "high-to-low" ? "descending" : this.taskPrioritySort === "low-to-high" ? "ascending" : "none"
        );
        const sortAccessibleLabel = this.taskPrioritySort === "none" ? t.sortPriority : `${t.priority}: ${this.taskPrioritySort === "high-to-low" ? t.priorityHighToLow : t.priorityLowToHigh}`;
        const sort = header.createEl("button", {
          cls: "pmi-task-sort",
          attr: { type: "button" }
        });
        sort.createSpan({
          cls: "pmi-task-sort-label",
          text: label,
          attr: { "aria-hidden": "true" }
        });
        sort.createSpan({ cls: "pmi-sr-only", text: sortAccessibleLabel });
        (0, import_obsidian5.setIcon)(
          sort.createSpan({ cls: "pmi-task-sort-icon", attr: { "aria-hidden": "true" } }),
          this.taskPrioritySort === "high-to-low" ? "chevron-down" : this.taskPrioritySort === "low-to-high" ? "chevron-up" : "chevrons-up-down"
        );
        sort.addEventListener("click", (event) => {
          var _a2;
          const restoreFocus = event.detail === 0;
          onPrioritySort(restoreFocus);
          if (restoreFocus) (_a2 = detail.querySelector(".pmi-task-sort")) == null ? void 0 : _a2.focus();
        });
      } else {
        header.createSpan({ text: label });
      }
      return header;
    });
    columnHeaders.forEach((header, index) => {
      var _a2;
      this.addTaskColumnResizer(table, columns, header, index, (_a2 = columnLabels[index]) != null ? _a2 : "", t);
    });
    const priorityDefinitions = new Map(priorities.map((priority) => [priority.id, priority]));
    for (const task2 of tasks) {
      const projectRecord = projectRecords.get(task2.projectId);
      const row = table.createDiv({
        cls: "pmi-task-row",
        attr: { role: "row" }
      });
      const taskId = row.createDiv({
        cls: "pmi-task-id pmi-task-open",
        attr: { role: "button", tabindex: "0", "aria-label": `${t.openTask}: ${task2.title}`, title: t.openTask, "data-task-id": task2.id }
      });
      taskId.createSpan({ text: task2.zentaoId ? `${task2.sourceType === "requirement" ? t.requirement : t.task} #${task2.zentaoId}` : "—" });
      const title = row.createDiv({
        cls: "pmi-task-title pmi-task-open",
        attr: {
          role: "button",
          tabindex: "0",
          "aria-label": `${t.openTask}: ${task2.title}`,
          title: t.openTask,
          "data-task-id": task2.id
        }
      });
      title.createEl("strong", { text: task2.title });
      const badges = title.createDiv("pmi-task-badges");
      if (task2.sourceType === "requirement" || task2.sourceType === "task") {
        badges.createSpan({ cls: `pmi-task-type pmi-task-type--${task2.sourceType}`, text: task2.sourceType === "requirement" ? t.requirement : t.task });
      }
      if (task2.assignmentKind === "shared") badges.createSpan({ text: t.shared });
      if (task2.unestimated) badges.createSpan({ text: t.unestimated });
      if (task2.archived) badges.createSpan({ text: t.archived });
      for (const tag of task2.tags) {
        badges.createSpan({ cls: "pmi-task-tag", text: tag });
      }
      const project2 = row.createDiv({
        cls: "pmi-task-project pmi-project-open",
        attr: {
          role: "button",
          tabindex: "0",
          "aria-label": `${t.openProject}: ${task2.projectTitle}`,
          title: t.openProject,
          "data-project-path": (_c = projectRecord == null ? void 0 : projectRecord.path) != null ? _c : ""
        }
      });
      project2.createSpan({ text: (_d = projectRecord == null ? void 0 : projectRecord.icon) != null ? _d : "\u{1F4CB}" });
      project2.createSpan({ text: task2.projectTitle });
      row.createSpan({ cls: "pmi-task-module", text: task2.module ?? "—" });
      row.createSpan({ cls: "pmi-task-stage", text: task2.stage ?? "—" });
      row.createSpan({ cls: "pmi-task-status", text: task2.status });
      const priorityDefinition = task2.priority ? priorityDefinitions.get(task2.priority) : void 0;
      const priority = row.createDiv("pmi-task-priority");
      if (priorityDefinition == null ? void 0 : priorityDefinition.color) {
        const signal = priority.createSpan({
          cls: "pmi-priority-signal",
          attr: { "aria-hidden": "true" }
        });
        signal.style.backgroundColor = priorityDefinition.color;
      }
      priority.createSpan({
        cls: `pmi-task-priority-label${task2.priority ? "" : " is-empty"}`,
        text: (_f = (_e = priorityDefinition == null ? void 0 : priorityDefinition.label) != null ? _e : task2.priority) != null ? _f : t.noPriority
      });
      row.createSpan({ cls: "pmi-task-assignee", text: task2.resolvedAssignees?.join("、") || task2.assignees.join("、") || "—" });
      row.createSpan({ cls: "pmi-task-completed-by", text: task2.completedBy ?? "—" });
      row.createSpan({ cls: "pmi-task-due", text: task2.due ?? "—" });
      const progress = row.createDiv("pmi-task-progress");
      const progressTrack = progress.createDiv("pmi-task-progress-track");
      const progressFill = progressTrack.createDiv("pmi-task-progress-fill");
      progressFill.style.width = `${Math.max(0, Math.min(100, task2.progress))}%`;
      progress.createSpan({ cls: "pmi-task-progress-label", text: `${Math.round(task2.progress)}%` });
      row.createSpan({ cls: "pmi-task-hours", text: t.workHours(task2.logged, task2.estimate) });
      this.bindCellAction(taskId, () => {
        if (!projectRecord) return;
        void this.host.openTask(task2.id, projectRecord.path);
      });
      this.bindCellAction(title, () => {
        if (!projectRecord) return;
        void this.host.openTask(task2.id, projectRecord.path);
      });
      this.bindCellAction(project2, () => {
        if (!projectRecord) return;
        void this.host.openProject(projectRecord.path);
      });
    }
  }
  renderProjectManagerTaskRows(detail, tasks, projects, priorities, stages, statuses, t, onPrioritySort) {
    detail.querySelector(".pmi-task-table")?.remove();
    detail.querySelector(".pmi-pm-table-wrapper")?.remove();
    detail.querySelector(".pmi-list-empty.pmi-task-empty")?.remove();
    if (tasks.length === 0) {
      detail.createDiv({ cls: "pmi-list-empty pmi-task-empty", text: t.noTasks });
      return;
    }

    const projectRecords = new Map(projects.map((project2) => [project2.id, project2]));
    const priorityDefinitions = new Map(priorities.map((definition) => [definition.id, definition]));
    const stageDefinitions = new Map(stages.map((definition) => [definition.id, definition]));
    const statusDefinitions = new Map(statuses.map((definition) => [definition.id, definition]));
    const groupTones = new Map();
    let groupIndex = 0;
    const wrapper = detail.createDiv("pm-root pm-table-wrapper pmi-pm-table-wrapper");
    const table = wrapper.createEl("table", { cls: "pm-table pmi-pm-table" });
    table.setCssStyles({ minWidth: "1560px", tableLayout: "fixed" });
    const headerRow = table.createEl("thead").createEl("tr");
    const headers = [
      [t.taskId, 96], [t.item, 397], [t.module, 180], [t.stage, 130], [t.status, 120],
      [t.priority, 100], [t.progress, 120], [t.work, 90], [t.assignee, 110], [t.completedBy, 110], [t.due, 110]
    ];
    for (const [index, [label, width]] of headers.entries()) {
      const header = headerRow.createEl("th", { text: label });
      const currentWidth = this.projectTableColumnWidths?.[index] ?? width;
      header.setCssStyles({ width: `${currentWidth}px`, minWidth: `${currentWidth}px` });
      if (label === t.priority) {
        header.addClass("pm-table-th-sortable");
        header.addEventListener("click", onPrioritySort);
        header.createSpan({ text: this.taskPrioritySort === "high-to-low" ? " ↓" : this.taskPrioritySort === "low-to-high" ? " ↑" : "", cls: "pm-sort-indicator" });
      }
      const resizer = header.createDiv({ cls: "pm-table-column-resizer", attr: { role: "separator", tabindex: "0", "aria-label": t.resizeColumn(label) } });
      resizer.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.projectTableColumnWidths ??= headers.map(([, defaultWidth]) => defaultWidth);
        const startX = event.clientX;
        const startWidth = this.projectTableColumnWidths[index] ?? width;
        resizer.setPointerCapture(event.pointerId);
        const move = (moveEvent) => {
          const nextWidth = Math.max(64, Math.round(startWidth + moveEvent.clientX - startX));
          this.projectTableColumnWidths[index] = nextWidth;
          header.setCssStyles({ width: `${nextWidth}px`, minWidth: `${nextWidth}px` });
        };
        const end = () => {
          resizer.removeEventListener("pointermove", move);
          resizer.removeEventListener("pointerup", end);
          resizer.removeEventListener("pointercancel", end);
          if (resizer.hasPointerCapture(event.pointerId)) resizer.releasePointerCapture(event.pointerId);
        };
        resizer.addEventListener("pointermove", move);
        resizer.addEventListener("pointerup", end);
        resizer.addEventListener("pointercancel", end);
      });
    }

    const body = table.createEl("tbody");
    const taskById = new Map(tasks.map((task2) => [task2.id, task2]));
    const childrenByParent = new Map();
    for (const task2 of tasks) {
      if (!task2.parentId || !taskById.has(task2.parentId)) continue;
      const children = childrenByParent.get(task2.parentId) ?? [];
      children.push(task2);
      childrenByParent.set(task2.parentId, children);
    }
    const orderedTasks = [];
    const taskDepths = new Map();
    const visited = new Set();
    const visit = (task2, depth = 0) => {
      if (visited.has(task2.id)) return;
      visited.add(task2.id);
      taskDepths.set(task2.id, depth);
      orderedTasks.push(task2);
      for (const child of childrenByParent.get(task2.id) ?? []) visit(child, depth + 1);
    };
    for (const task2 of tasks) if (!task2.parentId || !taskById.has(task2.parentId)) visit(task2);
    for (const task2 of tasks) visit(task2);
    const createChip = (cell, label, color, variant = "solid") => {
      const chip = cell.createSpan({ cls: `pm-chip pm-chip--${variant} pm-chip--sm` });
      chip.style.setProperty("--pm-chip-color", color || "var(--text-muted)");
      chip.createSpan({ cls: "pm-chip-dot" });
      chip.createSpan({ text: label });
      return chip;
    };
    const createPerson = (cell, name) => {
      if (!name) {
        cell.createSpan({ text: "—", cls: "pm-cf-value" });
        return;
      }
      const stack = cell.createDiv("pm-avatar-stack");
      const avatar = stack.createSpan({ cls: "pm-avatar", text: Array.from(name).slice(0, 2).join(""), attr: { "aria-label": name } });
      avatar.style.backgroundColor = "var(--interactive-accent)";
    };

    for (const task2 of orderedTasks) {
      // 需求使用自身禅道 ID，任务使用关联需求 ID，确保父需求及其子任务始终属于同一色组。
      const parentTask = task2.parentId ? taskById.get(task2.parentId) : null;
      const storyId = task2.sourceType === "requirement" ? String(task2.zentaoId ?? task2.id) : String(task2.customFields.storyId || parentTask?.zentaoId || task2.parentId || task2.zentaoId || task2.id);
      const groupKey = `${task2.projectId}:${storyId}`;
      if (!groupTones.has(groupKey)) groupTones.set(groupKey, groupIndex++ % 2 === 0 ? "a" : "b");
      const tone = groupTones.get(groupKey);
      const sourceClass = task2.sourceType === "requirement" ? "story" : "task";
      const row = body.createEl("tr", { cls: `pm-table-row pm-zentao-type-${sourceClass} pm-requirement-group-${tone}${task2.completed ? " pm-table-row--done" : ""}` });
      const projectRecord = projectRecords.get(task2.projectId);

      const idCell = row.createEl("td", { cls: "pm-table-cell pm-table-cell-zentao-id" });
      const idLabel = task2.zentaoId ? `${task2.sourceType === "requirement" ? t.requirement : t.task} #${task2.zentaoId}` : "—";
      const idChip = idCell.createSpan({ cls: "pm-chip pm-chip--plain pm-chip--sm", text: idLabel });
      idChip.addEventListener("click", () => projectRecord && void this.host.openTask(task2.id, projectRecord.path));

      const titleCell = row.createEl("td", { cls: "pm-table-cell-title" });
      titleCell.setCssStyles({ paddingLeft: `${(taskDepths.get(task2.id) ?? 0) * 20 + 8}px` });
      const title = titleCell.createSpan({ cls: "pm-task-title-text", text: task2.title });
      title.addEventListener("click", () => projectRecord && void this.host.openTask(task2.id, projectRecord.path));
      const tagRow = titleCell.createDiv("pm-table-tags");
      createChip(tagRow, task2.sourceType === "requirement" ? t.requirement : t.task, task2.sourceType === "requirement" ? "var(--color-yellow)" : "var(--color-pink)", "outline").addClass("pm-chip--tag");
      for (const tag of task2.tags.filter((tag) => !["zentao", "zentao-task", "zentao-requirement"].includes(tag))) createChip(tagRow, tag, tag.startsWith("超时") ? "var(--color-red)" : "var(--text-muted)", "outline").addClass("pm-chip--tag");

      const moduleCell = row.createEl("td", { cls: "pm-table-cell pm-table-cell-module" });
      moduleCell.createSpan({ text: task2.module ?? "—", cls: "pm-cf-value" });
      const stageCell = row.createEl("td", { cls: "pm-table-cell" });
      const stage = stageDefinitions.get(task2.stage);
      createChip(stageCell, stage?.label ?? task2.stage ?? "—", stage?.color, "solid");
      const statusCell = row.createEl("td", { cls: "pm-table-cell" });
      const status = statusDefinitions.get(task2.status);
      createChip(statusCell, status?.label ?? task2.status ?? "—", status?.color, "solid");
      const priorityCell = row.createEl("td", { cls: "pm-table-cell" });
      const priority = task2.priority ? priorityDefinitions.get(task2.priority) : null;
      createChip(priorityCell, priority?.label ?? task2.priority ?? t.noPriority, priority?.color, "plain");
      const progressCell = row.createEl("td", { cls: "pm-table-cell pm-table-cell-progress" });
      const progress = progressCell.createDiv("pm-progress");
      const progressTrack = progress.createDiv("pm-progress-track");
      const progressFill = progressTrack.createDiv("pm-progress-fill");
      progressFill.style.width = `${Math.max(0, Math.min(100, task2.progress))}%`;
      progress.createSpan({ cls: "pm-progress-label", text: `${Math.round(task2.progress)}%` });
      const timeCell = row.createEl("td", { cls: "pm-table-cell pm-table-cell-time" });
      timeCell.createSpan({ cls: "pm-chip pm-chip--plain pm-chip--sm", text: t.workHours(task2.displayLogged ?? task2.logged, task2.displayEstimate ?? task2.estimate) });
      const assigneeCell = row.createEl("td", { cls: "pm-table-cell pm-table-cell-assignees" });
      createPerson(assigneeCell, task2.resolvedAssignees?.[0] ?? task2.assignees[0] ?? "");
      const completedByCell = row.createEl("td", { cls: "pm-table-cell pm-table-cell-assignees" });
      createPerson(completedByCell, task2.completedBy ?? "");
      row.createEl("td", { cls: "pm-table-cell", text: task2.due ?? "—" });
    }
  }
  bindCellAction(element, action) {
    element.addEventListener("click", action);
    element.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      action();
    });
  }
  addTaskColumnResizer(table, columns, header, index, label, t) {
    var _a, _b, _c;
    const minimumWidth = (_a = TASK_COLUMN_MIN_WIDTHS[index]) != null ? _a : 64;
    const resizer = header.createDiv({
      cls: "pmi-task-column-resizer",
      attr: {
        role: "separator",
        tabindex: "0",
        "aria-label": t.resizeColumn(label),
        "aria-orientation": "vertical",
        "aria-valuemin": String(minimumWidth),
        title: t.resizeColumnHint(label)
      }
    });
    const currentWidths = () => Array.from(columns.children, (column) => Math.round(column.getBoundingClientRect().width));
    const resize = (width) => {
      var _a2;
      const widths = (_a2 = this.taskColumnWidths) != null ? _a2 : currentWidths();
      widths[index] = Math.max(minimumWidth, Math.round(width));
      this.taskColumnWidths = widths;
      this.applyTaskColumnWidths(table, widths);
      resizer.setAttribute("aria-valuenow", String(widths[index]));
    };
    resizer.setAttribute(
      "aria-valuenow",
      String((_c = (_b = this.taskColumnWidths) == null ? void 0 : _b[index]) != null ? _c : Math.round(header.getBoundingClientRect().width))
    );
    resizer.addEventListener("pointerdown", (event) => {
      var _a2;
      if (event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      const widths = currentWidths();
      this.taskColumnWidths = widths;
      this.applyTaskColumnWidths(table, widths);
      const startX = event.clientX;
      const startWidth = (_a2 = widths[index]) != null ? _a2 : minimumWidth;
      resizer.setPointerCapture(event.pointerId);
      resizer.addClass("is-resizing");
      table.addClass("is-resizing-columns");
      const onPointerMove = (moveEvent) => {
        resize(startWidth + moveEvent.clientX - startX);
      };
      const onPointerEnd = (endEvent) => {
        if (resizer.hasPointerCapture(endEvent.pointerId)) {
          resizer.releasePointerCapture(endEvent.pointerId);
        }
        resizer.removeClass("is-resizing");
        table.removeClass("is-resizing-columns");
        resizer.removeEventListener("pointermove", onPointerMove);
        resizer.removeEventListener("pointerup", onPointerEnd);
        resizer.removeEventListener("pointercancel", onPointerEnd);
      };
      resizer.addEventListener("pointermove", onPointerMove);
      resizer.addEventListener("pointerup", onPointerEnd);
      resizer.addEventListener("pointercancel", onPointerEnd);
    });
    resizer.addEventListener("keydown", (event) => {
      var _a2, _b2;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const widths = (_a2 = this.taskColumnWidths) != null ? _a2 : currentWidths();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      const step = event.shiftKey ? TASK_COLUMN_KEYBOARD_STEP * 4 : TASK_COLUMN_KEYBOARD_STEP;
      resize(((_b2 = widths[index]) != null ? _b2 : minimumWidth) + direction * step);
    });
    resizer.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.taskColumnWidths = null;
      table.style.removeProperty("--pmi-task-grid-columns");
      table.style.removeProperty("--pmi-task-grid-min-width");
      const headers = columns.querySelectorAll(".pmi-task-column-resizer");
      headers.forEach((handle) => {
        const column = handle.parentElement;
        if (column) handle.setAttribute("aria-valuenow", String(Math.round(column.getBoundingClientRect().width)));
      });
    });
  }
  applyTaskColumnWidths(table, widths) {
    const gridWidth = widths.reduce((total, width) => total + width, 0) + TASK_COLUMN_GAP * (widths.length - 1) + TASK_TABLE_INLINE_PADDING;
    table.style.setProperty("--pmi-task-grid-columns", widths.map((width) => `${width}px`).join(" "));
    table.style.setProperty("--pmi-task-grid-min-width", `${gridWidth}px`);
  }
  renderEmpty(root, title, body, icon) {
    const empty = root.createDiv("pmi-empty");
    (0, import_obsidian5.setIcon)(empty.createSpan("pmi-empty-icon"), icon);
    empty.createEl("h2", { text: title });
    empty.createEl("p", { text: body });
  }
};

// src/main.ts
var ProjectManagerInsightsPlugin = class extends import_obsidian6.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "settings", structuredClone(DEFAULT_SETTINGS));
    __publicField(this, "catalog");
    __publicField(this, "navigator");
    __publicField(this, "toolbarIntegration");
    __publicField(this, "refreshTimer", null);
  }
  async onload() {
    await this.loadSettings();
    this.catalog = new ProjectManagerCatalog(new ObsidianProjectManagerSource(this.app));
    this.navigator = new ProjectManagerNavigator(this.app);
    this.toolbarIntegration = new ProjectManagerToolbarIntegration(this.app, this);
    this.registerView(INSIGHTS_VIEW_TYPE, (leaf) => new InsightsView(leaf, this));
    this.registerObsidianProtocolHandler("open-pm-insights", async () => {
      await this.openInsights();
    });
    this.addRibbonIcon("chart-no-axes-combined", translations(this.settings).viewName, () => {
      void this.openInsights();
    });
    this.addCommand({
      id: "open-assignee-workload-insights",
      name: translations(this.settings).commandOpen,
      callback: () => void this.openInsights()
    });
    this.addCommand({
      id: "refresh-assignee-workload-insights",
      name: translations(this.settings).commandRefresh,
      callback: () => void this.reconcileInsights()
    });
    this.addSettingTab(new InsightsSettingTab(this.app, this));
    this.register(this.catalog.subscribe(() => this.scheduleRefresh()));
    this.app.workspace.onLayoutReady(() => this.toolbarIntegration.start());
  }
  onunload() {
    this.toolbarIntegration.stop();
    if (this.refreshTimer !== null) window.clearTimeout(this.refreshTimer);
    this.refreshTimer = null;
  }
  async loadSettings() {
    const saved = await this.loadData();
    const savedQuickFilter = saved?.quickFilter ?? {};
    this.settings = {
      ...structuredClone(DEFAULT_SETTINGS),
      ...saved,
      aliases: Array.isArray(saved == null ? void 0 : saved.aliases) ? saved.aliases : [],
      selectedProjectIds: Array.isArray(saved == null ? void 0 : saved.selectedProjectIds) ? saved.selectedProjectIds : [],
      quickFilter: {
        ...structuredClone(DEFAULT_SETTINGS.quickFilter),
        ...(savedQuickFilter && typeof savedQuickFilter === "object" ? savedQuickFilter : {})
      }
    };
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async readProjectManager() {
    return this.catalog.snapshot();
  }
  async reconcileProjectManager() {
    const snapshot = await this.catalog.reconcile();
    if (this.refreshTimer !== null) window.clearTimeout(this.refreshTimer);
    this.refreshTimer = null;
    return snapshot;
  }
  tooltip() {
    return translations(this.settings).toolbarTooltip;
  }
  async openProjectInsights(projectPath) {
    await this.openInsights(projectPath);
  }
  async openInsights(projectPath) {
    let leaf;
    const existing = this.app.workspace.getLeavesOfType(INSIGHTS_VIEW_TYPE)[0];
    if (existing) {
      leaf = existing;
    } else {
      leaf = this.app.workspace.getLeaf("tab");
      await leaf.setViewState({ type: INSIGHTS_VIEW_TYPE, active: true });
    }
    await this.app.workspace.revealLeaf(leaf);
    if (projectPath && leaf.view instanceof InsightsView) {
      await leaf.view.scopeToProjectPath(projectPath);
    } else if (projectPath) {
      const snapshot = await this.readProjectManager();
      const normalizedPath = String(projectPath).replace(/\\/g, "/");
      const project2 = snapshot.projects.find((candidate) => {
        const candidatePath = String(candidate.path ?? "").replace(/\\/g, "/");
        return candidatePath === normalizedPath || candidatePath.endsWith(`/${normalizedPath}`) || normalizedPath.endsWith(`/${candidatePath}`);
      });
      if (project2) {
        this.settings.selectedProjectIds = [project2.id];
        await this.saveSettings();
      }
    }
  }
  async openTask(taskId, projectPath) {
    try {
      await this.navigator.editTask({ taskId, projectPath });
    } catch (error) {
      const t = translations(this.settings);
      const unsupported = error instanceof ProjectManagerNavigationError && error.code === "unsupported-version";
      new import_obsidian6.Notice(unsupported ? t.projectManagerVersionUnsupported : t.taskEditorUnavailable);
    }
  }
  async openProject(projectPath) {
    try {
      await this.navigator.openProject(projectPath);
    } catch (e) {
      new import_obsidian6.Notice(translations(this.settings).projectManagerUnavailable);
    }
  }
  async refreshInsights() {
    if (this.refreshTimer !== null) window.clearTimeout(this.refreshTimer);
    this.refreshTimer = null;
    const views = this.app.workspace.getLeavesOfType(INSIGHTS_VIEW_TYPE).map((leaf) => leaf.view).filter((view) => view instanceof InsightsView);
    await Promise.all(views.map((view) => view.refresh()));
    this.toolbarIntegration.sync();
  }
  async reconcileInsights() {
    await this.reconcileProjectManager();
    await this.refreshInsights();
  }
  scheduleRefresh() {
    if (this.refreshTimer !== null) window.clearTimeout(this.refreshTimer);
    this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = null;
      void this.refreshInsights();
    }, 250);
  }
};

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.0] - 2026-09-02

### Added

- 人员综合健康新增统一风险标签与风险详情面板，集中展示阻塞、超期、节点缺口、未分配、未估时、缺少交付时间和负载紧张等风险。
- 节点缺口支持展示剩余工作、可用产能、计算公式和构成任务，并可从每条任务打开原生任务详情弹窗。

### Changed

- 单一风险压缩为摘要、计算依据和任务构成，多风险按任务去重并保留分类切换，减少重复信息。
- 人员综合健康默认折叠；没有未安排需求或独立任务时隐藏对应范围筛选。
- 移除重复的任务风险明细和迭代总工时概览，将风险查看、计算说明和任务入口收敛到风险详情面板。
- 优化迭代详情吸附区域的尺寸计算与帧内去重，降低重复布局开销。

### Fixed

- 修复风险详情任务入口跳转 Markdown 文件的问题，改为打开 Project Manager Enhanced 原生任务详情弹窗。
- 修复风险标签点击触发人员筛选、多个风险浮层相互冲突及同一任务被重复计数的问题。

## [1.3.0] - 2026-08-26

### Added

- 新增迭代与人员健康度分析，结合计划进度、实际进度、剩余工时、成员压力和风险来源展示项目状态。
- 新增多交付批次配置，支持维护提测与上线日期、关联需求及独立任务，并按批次重算进度指标。
- 新增迭代总结、交付批次归纳、质量与 Bug 指标，以及适合向领导和业务同步的更新通知文案。
- 新增关注迭代能力，可从项目页和迭代详情点亮星标，并在首页待办中集中查看。
- 新增未关联交付批次事项筛选、总结本地刷新和数据完整性原因提示。

### Changed

- 优化 PM 洞察成员卡片、需求与任务双分区统计、对象指标和右侧联动筛选。
- 交付批次状态、项目压力分布和预计提测时间统一使用工作日、成员剩余工时与批次节点计算。
- 将近期安装版调试成果恢复为带 SHA-256 门禁的确定性编译基线，避免重新构建或发布时覆盖定制。

### Fixed

- 修复筛选按钮二次点击无法取消、点击反馈卡顿和部分响应式布局内容被截断的问题。
- 修复表格横向滚动覆盖冻结列、顶部区域随横向滚动以及迭代总结页面无法完整滚动的问题。
- 修复刷新后版本示例残留、迭代总结未更新和数据不完整提示缺少具体原因的问题。

## [1.2.2] - 2026-08-23

### Added

- 迭代详情顶部新增需求、开发任务和测试任务进度概览，展示完成率、人员工时与风险指标。
- 概览分类、状态、人员和风险指标支持联动事项筛选，并展示当前临时选中状态。

### Changed

- 事项搜索支持禅道需求与任务 ID；命中需求时同时展示其下任务。
- 临时筛选不再持久化，关闭视图或重启 Obsidian 后恢复默认筛选。
- 迭代详情改用独立整页滚动与纯 CSS 吸附操作区，表格采用渐进式完整渲染。
- 首页手工日期简化为提测时间，并优化单日期输入布局。

### Fixed

- 修复大型迭代进入详情响应慢、快速滚动短暂白屏以及吸附操作区延迟和横向错位的问题。
- 修复搜索需求编号时只展示需求、不展示关联任务的问题。

## [1.2.1] - 2026-08-22

### Added

- 项目首页支持按系统归属查看迭代，并以单行卡片展示需求周期、进度、风险与人员角色。
- 支持在首页展开迭代需求列表，并通过完成、优先级、延期和到期统计快捷筛选需求。
- 支持本地维护提测时间、计划上线时间，以及项目归档、归档筛选和批量同步排除标记。
- 支持全局人员角色与迭代角色覆盖，区分项目管理、产品经理、前端开发、后端开发和测试人员。

### Changed

- 迭代按系统分组并按迭代 ID 倒序排列，查看全部时已归档项目排在分组底部。
- 首页需求名称改为先进入对应迭代，再打开需求事项详情弹窗。
- 迭代参与人员同时统计团队成员、事项负责人和事项完成者。
- 简化 PM 洞察成员事项筛选与对象统计展示，并增加 Obsidian 协议打开入口。

### Fixed

- 修复归档筛选重复使用已过滤数据，导致切换后项目数量变为零的问题。
- 修复人员信息列宽不足时姓名被省略的问题。

## [1.2.0] - 2026-08-21

### Added

- PM 洞察成员明细支持在表格、只读甘特图和只读看板之间切换。
- 甘特图支持日、周、月三种时间尺度，以及今天、本周、本月快速定位。
- 甘特图展示任务预计、实际、剩余、超时与提前工时，并在时间表头汇总周期预计和实际工时。
- 周视图按周一至周日展示日期与星期，并标识 ISO 年份和周数。

### Changed

- 扩大甘特图日、周、月刻度宽度，优化事项层级、项目归属、工时轨道和可拖拽事项区域。
- PM 洞察甘特图和看板取消内部纵向滚动，随页面内容完整展示。
- 成员视图模式和甘特图时间尺度会随插件设置保存。

### Fixed

- 修复从 PM 洞察打开甘特图时无法定位 Project Manager 任务的问题。
- 修复选择全部对象后看板分组与任务纳入范围不正确的问题。
- 修复日、周、月表头工时与日期信息拥挤、周范围未严格对齐的问题。

## [1.1.3] - 2026-08-21

### Added

- 支持禅道同步事项的预计、已消耗、剩余及需求派生展示工时。
- 支持 `超时*h` 红色标签和需求任务管理标签展示。
- Project Manager 详细筛选改为 PM 洞察同款横向工具栏与内嵌下拉面板。

### Changed

- PM 洞察表格将进度、工时移动到优先级后，并统一需求任务分组色系。
- Project Manager 主表格、看板、任务弹窗与 PM 洞察统一工时读取口径。
- 冻结事项列增加明确边缘线，并优化搜索框、筛选控件及下拉面板样式。

### Fixed

- 修复禅道已消耗工时显示为 0、表格工时与自定义字段不一致的问题。
- 修复快速组合选择任务后，看板未纳入需求下任务而显示为空的问题。
- 修复搜索图标与占位文字重叠、筛选面板被表格遮挡等问题。

## [1.1.2] - 2026-08-21

### Added

- PM 洞察支持按需求、任务或全部对象筛选，并按需求与任务层级展示事项。
- 洞察任务表格复用 Project Manager 列、状态、优先级和视觉样式，支持冻结识别列与手工调整列宽。
- 已选项目以标签形式展示，从迭代进入洞察时自动选择当前项目。

### Changed

- 成员工作量优先归属完成人；没有完成人时归属负责人。
- 移除父任务统计、快速组合和包含已归档入口，扩大洞察页面横向内容空间。

### Fixed

- 修复对象筛选选中状态、需求任务计数、需求任务归并和筛选下拉框被表格遮挡的问题。

## [1.1.1] - 2026-08-21

### Changed

- 统一独立增强版的发布版本与最低 Obsidian 兼容版本元数据。

## [1.1.0] - 2026-08-21

### Added

- 内置 Project Manager Insights 0.2.4 工作量洞察。
- 跨项目成员计划、登记、剩余和超支工时统计。
- 项目、成员、状态、优先级和任务筛选。
- 从洞察页面打开项目和任务详情。
- 自动迁移独立 Insights 插件的本地设置。

## [1.0.0] - 2026-08-20

### Added

- 独立插件 ID，避免官方插件更新覆盖个人改造。
- 禅道需求、任务、里程碑和原始阶段状态支持。
- 看板按列虚拟化和表格行虚拟化。
- 常用视图、快速组合筛选和详细筛选面板。
- 响应式、可折叠的项目筛选界面。

## [1.8.0] - 2026-07-03

### Added

- The gantt timeline header stays pinned to the top when scrolling through tasks
- Selected text in a note can be turned into a task from the right-click menu or the "Create task from selection" command

## [1.7.0] - 2026-07-02

### Added

- New setting "Show tag colors" (default on) controls the presence of a colored dot on tags
- Copy the task ID or file path to the clipboard by clicking the corresponding header or footer text in the task editor

### Changed

- Design overhaul of the task modal, with improved UX and unified components
- Status, priority, type, and dates on a task are now changed via a value picker
- Tags, assignees, and dependencies are edited through a new searchable picker
- Repeat and dependencies are hidden by default and added to a task on demand from an "Add property" menu
- Archive, delete, and opening a task as a note are grouped under a single menu in the task editor
- Subtask progress is calculated only from completed subtasks
- Assignee avatars stack when more than one person is assigned
- Checkbox style now matches the one on the task table
- Task priority is shown with a colored chevron instead of a dot
- A value picker in the task editor sizes to its options instead of a fixed width
- Tags in the task table and on kanban cards show a colored dot, matching the task editor
- Logged time is shown the same way in the task table and on kanban cards

### Fixed

- The task editor's priority strip is now displayed along the top edge of the window
- The task editor title showed an input background when hovered or focused
- Time tracking shows the over-estimate state once logged time passes the estimate

## [1.6.3] - 2026-06-17

### Fixed

- The project view was empty when Pane Relief or Hover Editor was enabled ([#80](https://github.com/StepanKropachev/obsidian-pm/issues/80))

## [1.6.2] - 2026-06-17

### Changed

- Task note filenames keep more of the task title before shortening

### Fixed

- Subtasks added in the task editor were lost on reload ([#90](https://github.com/StepanKropachev/obsidian-pm/issues/90))
- The app froze when duplicating a task with a long title
- The project list showed stale task counts until the view was reopened ([#121](https://github.com/StepanKropachev/obsidian-pm/issues/121))

## [1.6.1] - 2026-06-15

### Changed

- Task and project modals follow Obsidian's native border, shadow, and corner styling
- Status, priority, and tag labels follow Obsidian's native styling
- The accent color follows the Obsidian theme
- Gantt elements follow the Obsidian theme: the today marker, the milestone and subtask buttons, and the row selection and hover highlights
- Kanban cards align the assignee and due date to the bottom of the card

### Fixed

- Subtasks created from the subtasks list or the add-subtask buttons were not set to the subtask type ([#82](https://github.com/StepanKropachev/obsidian-pm/issues/82))
- An assignee written as a note link (`[[People/Jane Doe]]`) showed the link path on its avatar instead of the person's name ([#64](https://github.com/StepanKropachev/obsidian-pm/issues/64))

## [1.6.0] - 2026-06-12

### Added

- Completing a task records a completion date that can be edited in the task modal ([#93](https://github.com/StepanKropachev/obsidian-pm/issues/93))
- Setting "Show description preview on board" (default off) shows the first three lines of each task's description on its kanban card ([#59](https://github.com/StepanKropachev/obsidian-pm/issues/59))

### Changed

- Saving a task updates only the affected task notes instead of every note in the project
- Projects open faster, and reopening a project is instant. Edits made outside the plugin are still detected and reloaded
- The table stays responsive in large projects
- Views update in place after an edit, keeping the scroll position and selection
- Select all in the table selects every task matching the current filter, not just the visible rows
- Collapsing or expanding a subtree no longer changes any task notes
- The expand/collapse subtasks toggle looks the same in the table and Gantt views
- Gantt task bars show stronger contrast between completed and remaining work ([#87](https://github.com/StepanKropachev/obsidian-pm/issues/87))
- Gantt task bars no longer show a stripe on tasks that have subtasks

### Fixed

- Images pasted or dropped onto a task were saved to the vault root instead of the task's own folder. The folder follows the task when it is renamed or archived, and is removed with the task
- Duplicating a task with its subtasks failed with a "note already exists" error and dropped the subtasks ([#90](https://github.com/StepanKropachev/obsidian-pm/issues/90))
- Progress bar labels showed 0% instead of the actual value in some views
- The subtasks toggle did not respond in the Gantt view

## [1.5.0] - 2026-05-25

### Added

- Setting "Save tasks on close" (default on). When off, closing the task modal by X or click-outside discards edits, so only the Save button keeps them ([#62](https://github.com/StepanKropachev/obsidian-pm/issues/62))
- "Open as note" button in the task modal header opens the task's note in a new tab
- Pasting a screenshot or dragging a file onto the task description saves it to the vault attachments folder and embeds it at the cursor
- Search box, filters (status, priority, assignee, tag, due date, archived), and saved views appear above every view, not just the table
- Filter state persists per project across plugin reloads
- Saved views remember the view mode they were created in, and selecting one switches the project to that mode
- Gantt lifts a matching task to the top level when its parent is filtered out, so search reveals deeply nested matches
- Release artifacts carry GitHub build provenance attestations; `gh attestation verify <file> --owner StepanKropachev` confirms a download was built from this repo

### Changed

- The UI follows the Obsidian theme: accent color, near and overdue colors, badges, and avatars
- Toolbar, Gantt, filter, and bulk-action buttons render at Obsidian's native size
- Saved-view tabs match the styling of the filter pills
- The "save view" and inline add buttons render as native Obsidian buttons
- Status and priority badges in the task modal are no longer keyboard-focusable
- The delete confirmation uses Obsidian's native warning style
- Primary buttons in light theme use a solid accent fill
- The project header gear, bulk-action clear, remove, and table row buttons use Obsidian's icons
- Remove buttons on tags, assignees, and dependencies turn red on hover
- Project-card and kanban-card progress bars are 3px tall
- The filter row collapses when no filters are active, and the Filter pill expands it
- Toggling a filter pill no longer moves focus out of the search box
- Gantt milestone labels and dependency arrows follow the active filter
- View switcher buttons show only an icon
- Assignee avatar initials use the first letter of the first two words, so "Michael Jordan" shows "MJ" instead of "MI"
- New task notes are named after the task title. Existing notes keep their name until the task is renamed

### Removed

- The Gantt "Hide completed" button; the Status filter excludes Done and Cancelled instead, and existing settings migrate automatically
- The inline quick-add input above the table; the toolbar "add task" button opens the task modal instead

### Fixed

- A solo avatar had extra spacing on its right in the project edit modal
- Kanban cards dropped the fourth and later assignees
- Duplicate task entries appeared when creating a task
- A saved-view pill stayed highlighted after its filter was changed
- An assignee stored as a wiki link (`[[Wiki Link]]`) showed garbled avatar initials ([#64](https://github.com/StepanKropachev/obsidian-pm/issues/64))
- Renaming a task to a title already used by another note shows an inline error instead of failing silently

## [1.4.0] - 2026-04-29

### Breaking Changes

- Clicking a project file no longer auto-opens the project view. The new "Open current file as project" command restores the old behavior when bound to a hotkey

### Added

- Duplicate task action in the table and Kanban context menus
- "Open current file as project" command

### Fixed

- "Today" rolled over in the evening west of UTC
- Clicking a project from a task tab hijacked the tab
- Opening a project created duplicate tabs
- The ribbon button opened a duplicate project list pane
- The table scroll position was lost across opening and closing the task modal
- Project folders errored on case-insensitive vaults

## [1.3.2] - 2026-04-21

### Fixed

- `file://` links in task descriptions did not open on click

## [1.3.1] - 2026-04-21

### Added

- Redo for Gantt drag actions (Cmd+Shift+Z, Cmd+Y, or the "Redo last action" command)

### Fixed

- Cmd+Z no longer hijacks undo in unrelated notes when a project tab is open

## [1.3.0] - 2026-04-18

### Added

- Custom task statuses, added and removed from settings
- Subtasks as draggable cards on the Kanban board
- Undo for Gantt drag operations (Ctrl/Cmd+Z)
- Interactive checkboxes in the task description preview
- "Hide completed tasks" toggle in Gantt
- Bulk set-parent and remove-parent in the table view

### Removed

- The emoji placeholder in the custom status icon input

### Fixed

- The bulk action bar flickered when toggling filters
- Orphaned subtasks reattach to their parent on load
- Orphaned tasks are remapped when a custom status is deleted

## [1.2.0] - 2026-04-14

### Added

- Import notes as tasks: batch-import vault notes into a project through a multi-file picker
- Click-to-link dependencies on Gantt
- Drag Gantt task bars to reposition them
- Click an empty Gantt row to set start and due dates
- Dependency-based auto-scheduling
- Type `[[` in the description field to link vault notes
- Markdown preview in task descriptions, with a toggle between edit and rendered
- Shift+click range selection for table checkboxes
- Gantt week labels: week number, date range, or both

### Changed

- The dependency picker filters out cycles
- Cross-links to canvases and databases work in task descriptions
- Bulk checkboxes stay hidden until the row is hovered
- Task modal buttons show the Shift+Enter shortcut hint

### Fixed

- Dependent tasks lost a day on each reschedule
- The Gantt scroll position was lost on re-render
- The import modal wrote tasks to the wrong folder
- Subtasks did not render when added through the parent task modal
- Deleting dependent tasks crashed the plugin
- The task modal jumped while typing long descriptions
- Import modal checkboxes responded slowly and double-toggled

## [1.1.1] - 2026-04-11

No release notes. See the [1.1.0...1.1.1 diff](https://github.com/StepanKropachev/obsidian-pm/compare/1.1.0...1.1.1).

## [1.1.0] - 2026-04-08

First stable release.

### Added

- Gantt: drag-to-reschedule, snap-to-grid, resizable sidebar, milestones, and week/month/quarter scales
- Kanban: drag-and-drop board grouped by status
- Table: sort, filter, saved views, inline date editing, and a quick-add bar
- Task modal: subtasks panel, time tracking, custom fields, and auto-save on dismiss
- Bulk actions: multi-select for status changes, deletion, and archive/unarchive
- Custom fields per project: text, number, date, checkbox, select, and multi-select
- Archive system with a toggle to show archived tasks
- Command palette: create tasks and open projects from anywhere
- Tasks stored as YAML frontmatter in Markdown files

## [1.0.0-beta] - 2026-03-30

Initial beta.

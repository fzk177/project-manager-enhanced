'use strict'

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const repositoryRoot = path.join(__dirname, '..')
const vendorPath = path.join(repositoryRoot, 'vendor', 'main.vendor.js')
let source = fs.readFileSync(vendorPath, 'utf8')

/**
 * 定点替换发布文件中的目标逻辑。
 *
 * 每个补丁必须且只能匹配一次，避免插件升级后继续套用不兼容的旧补丁。
 */
function replaceOnce(label, search, replacement) {
  const firstIndex = source.indexOf(search)
  const lastIndex = source.lastIndexOf(search)
  if (firstIndex < 0 || firstIndex !== lastIndex) {
    throw new Error(`Project Manager 补丁匹配失败：${label}`)
  }

  source = `${source.slice(0, firstIndex)}${replacement}${source.slice(firstIndex + search.length)}`
}

/**
 * 按起止标记定位一段发布代码，并通过哈希确认内部实现没有发生变化。
 *
 * 看板补丁覆盖的代码较长，使用哈希可以避免插件升级后只匹配到相同方法名却套用错误实现。
 */
function replaceCheckedRange(label, startMarker, endMarker, expectedHash, replacement) {
  const firstIndex = source.indexOf(startMarker)
  const lastIndex = source.lastIndexOf(startMarker)
  const endIndex = source.indexOf(endMarker, firstIndex)
  if (firstIndex < 0 || firstIndex !== lastIndex || endIndex < 0) {
    throw new Error(`Project Manager 补丁匹配失败：${label}`)
  }

  const original = source.slice(firstIndex, endIndex)
  const actualHash = crypto.createHash('sha256').update(original).digest('hex')
  if (actualHash !== expectedHash) {
    throw new Error(`Project Manager 补丁源码校验失败：${label}`)
  }

  source = `${source.slice(0, firstIndex)}${replacement}${source.slice(endIndex)}`
}

const originalProjectParser = [
  'function Ku(e,t,n,r){return{id:e.id??r,title:e.title??r,',
  'description:e.description??t.trim(),color:e.color??`#8b72be`,icon:e.icon??`📋`,',
  'tasks:[],customFields:Array.isArray(e.customFields)?[...e.customFields]:[],',
  'teamMembers:Array.isArray(e.teamMembers)?[...e.teamMembers]:[],',
  'createdAt:e.createdAt??new Date().toISOString(),',
  'updatedAt:e.updatedAt??new Date().toISOString(),filePath:n,',
  'savedViews:Hu(e.savedViews??[]),config:qu(e.config),taskIndex:new Map}}',
].join('')
const categorizedProjectParser = [
  'function Ku(e,t,n,r){let i=e.description??t.trim(),',
  'a=e.status??(typeof i==`string`?i.match(/禅道状态：([^。\\n]+)/)?.[1]:void 0)??``;',
  'return{id:e.id??r,title:e.title??r,description:i,color:e.color??`#8b72be`,',
  'icon:e.icon??`📋`,status:a,tasks:[],',
  'customFields:Array.isArray(e.customFields)?[...e.customFields]:[],',
  'teamMembers:Array.isArray(e.teamMembers)?[...e.teamMembers]:[],',
  'createdAt:e.createdAt??new Date().toISOString(),',
  'updatedAt:e.updatedAt??new Date().toISOString(),filePath:n,',
  'savedViews:Hu(e.savedViews??[]),config:qu(e.config),taskIndex:new Map}}',
].join('')
replaceOnce('读取项目状态', originalProjectParser, categorizedProjectParser)

replaceOnce(
  '保存项目状态',
  'color:e.color,icon:e.icon,taskIds:i',
  'color:e.color,icon:e.icon,status:e.status,taskIds:i',
)

replaceOnce(
  '统一禅道同步工时读取',
  'function gu(e){return e.timeLogs?.length?e.timeLogs.reduce((e,t)=>e+t.hours,0):0}',
  'function projectSyncedHours(e,t){let n=e.customFields?.[t];'
    + 'if(n===void 0||n===null||n===``)return null;n=Number(n);'
    + 'return Number.isFinite(n)&&n>=0?n:null}'
    + 'function projectEstimateHours(e){return projectSyncedHours(e,`displayEstimatedHours`)??'
    + 'projectSyncedHours(e,`estimatedHours`)??e.timeEstimate??0}'
    + 'function gu(e){return projectSyncedHours(e,`displayConsumedHours`)??'
    + 'projectSyncedHours(e,`consumedHours`)??'
    + '(e.timeLogs?.length?e.timeLogs.reduce((e,t)=>e+t.hours,0):0)}',
)

replaceOnce(
  '任务弹窗使用同步预计工时',
  'i=gu(t),a=t.timeEstimate??0,o=a>0?',
  'i=gu(t),a=projectEstimateHours(t),o=a>0?',
)

replaceOnce(
  '项目表格使用同步预计工时',
  'new yp(c,{logged:gu(n),estimate:n.timeEstimate??0})',
  'new yp(c,{logged:gu(n),estimate:projectEstimateHours(n)})',
)

replaceOnce(
  '看板使用同步预计工时',
  'vp(i,t.loggedHours,n.timeEstimate??0,`sm`)',
  'vp(i,t.loggedHours,projectEstimateHours(n),`sm`)',
)

replaceOnce(
  '超时标签使用红色',
  'function bp(e,t,n){if(t===`zentao`)return null;'
    + 'let r=t===`zentao-requirement`?`需求`:t===`zentao-task`?`任务`:t,'
    + 'i=new Z(e).setLabel(r).setVariant(`outline`).setTag();'
    + 'return n&&i.setDot(!0).setColor(Zu(t)),i}',
  'function bp(e,t,n){if(t===`zentao`)return null;'
    + 'let r=t===`zentao-requirement`?`需求`:t===`zentao-task`?`任务`:t,'
    + 'i=new Z(e).setLabel(r).setVariant(`outline`).setTag();'
    + 'return t.startsWith(`超时`)?i.setDot(!0).setColor(`var(--color-red)`):'
    + 'n&&i.setDot(!0).setColor(Zu(t)),i}',
)

const originalDashboard = [
  'async function qm(t){let n=await t.plugin.store.loadAllProjects(',
  't.plugin.settings.projectsFolder);if(t.isStale())return;',
  'if(t.contentEl.empty(),n.length===0){new Wm(t.contentEl).setIcon(`📋`)',
  '.setTitle(`暂无项目`).setBody(`创建第一个项目即可开始使用。`)',
  '.setAction(`+ 新建项目`,()=>Jm(t));return}',
  'let r=t.contentEl.createDiv(`pm-project-grid`);for(let i of n){',
  'let n=Xm(i.tasks,!1),a=Xm(i.tasks,!0);new Gm(r,{title:i.title,icon:i.icon,',
  'color:i.color,tasksDone:a,tasksTotal:n,onClick:Y(async()=>{',
  'let n=t.plugin.app.vault.getAbstractFileByPath(i.filePath);',
  'n instanceof e.TFile&&await t.openProjectFile(n)}),',
  'onContextMenu:e=>Ym(t,i,e)})}}',
].join('')
const categorizedDashboard = [
  'async function qm(t){let n=await t.plugin.store.loadAllProjects(',
  't.plugin.settings.projectsFolder);if(t.isStale())return;',
  'if(t.contentEl.empty(),n.length===0){new Wm(t.contentEl).setIcon(`📋`)',
  '.setTitle(`暂无项目`).setBody(`创建第一个项目即可开始使用。`)',
  '.setAction(`+ 新建项目`,()=>Jm(t));return}',
  'let r=[{id:`active`,label:`进行中`,projects:[]},',
  '{id:`pending`,label:`待开始`,projects:[]},',
  '{id:`backlog`,label:`待规划`,projects:[]},',
  '{id:`completed`,label:`已完成`,projects:[]}];',
  'for(let e of n){let t=Xm(e.tasks,!1),n=Xm(e.tasks,!0),',
  'i=String(e.status??``).toLowerCase(),',
  'a=e.id.endsWith(`-backlog`)?`backlog`:',
  '[`done`,`closed`].includes(i)||t>0&&n===t?`completed`:',
  '[`wait`,`waiting`,`draft`,`planned`].includes(i)||n===0?`pending`:`active`;',
  'r.find(e=>e.id===a)?.projects.push({project:e,tasksTotal:t,tasksDone:n})}',
  'for(let n of r){if(!n.projects.length)continue;',
  'let r=t.contentEl.createDiv(`pm-project-section`);',
  'r.setCssStyles({marginBottom:`28px`});',
  'let i=r.createEl(`h3`,{text:`${n.label}（${n.projects.length}）`,',
  'cls:`pm-project-section-title`});',
  'i.setCssStyles({margin:`0 0 12px`,fontSize:`16px`,color:`var(--text-normal)`});',
  'let a=r.createDiv(`pm-project-grid`);for(let r of n.projects){',
  'let n=r.project,i=r.tasksTotal,o=r.tasksDone;new Gm(a,{title:n.title,',
  'icon:n.icon,color:n.color,tasksDone:o,tasksTotal:i,onClick:Y(async()=>{',
  'let r=t.plugin.app.vault.getAbstractFileByPath(n.filePath);',
  'r instanceof e.TFile&&await t.openProjectFile(r)}),',
  'onContextMenu:e=>Ym(t,n,e)})}}}',
].join('')
replaceOnce('项目面板状态分组', originalDashboard, categorizedDashboard)

replaceOnce(
  '扩展快速组合筛选状态',
  'function au(){return{text:``,stages:[],statuses:[],priorities:[],assignees:[],participants:[],'
    + 'tags:[],dueDateFilter:`any`,showArchived:!1}}',
  'function au(){return{text:``,stages:[],statuses:[],priorities:[],assignees:[],participants:[],'
    + 'tags:[],dueDateFilter:`any`,showArchived:!1,quickSource:`all`,quickWorkType:`all`,'
    + 'quickCompletion:`all`,quickOwnership:`all`,quickAttention:[],quickOwner:``,quickPreset:``}}',
)

replaceOnce(
  '读取 Saved View 快速组合筛选状态',
  'participants:Array.isArray(n.participants)?n.participants:[],tags:Array.isArray(n.tags)?n.tags:[],'
    + 'dueDateFilter:n.dueDateFilter??`any`,showArchived:n.showArchived??!1}',
  'participants:Array.isArray(n.participants)?n.participants:[],tags:Array.isArray(n.tags)?n.tags:[],'
    + 'dueDateFilter:n.dueDateFilter??`any`,showArchived:n.showArchived??!1,'
    + 'quickSource:n.quickSource??`all`,quickWorkType:n.quickWorkType??`all`,'
    + 'quickCompletion:n.quickCompletion??`all`,quickOwnership:n.quickOwnership??`all`,'
    + 'quickAttention:Array.isArray(n.quickAttention)?n.quickAttention:[],'
    + 'quickOwner:n.quickOwner??``,quickPreset:n.quickPreset??``}',
)

const quickFilterHelpers = [
  'function quickSourceType(e){let t=String(e.customFields.zentaoSourceType??``);',
  'return t===`story`||e.tags.includes(`zentao-requirement`)?`requirement`:',
  't===`task`||e.tags.includes(`zentao-task`)?`task`:',
  't===`execution`||e.type===`milestone`?`milestone`:',
  'e.type===`task`||e.type===`subtask`?`task`:`local`}',
  'function quickCurrentUser(e){for(let t of [`zentao-my-work`,`zentao-my-participated`]){',
  'let n=e.savedViews.find(e=>e.id===t),r=n?.filter.participants?.[0]??n?.filter.assignees?.[0];',
  'if(r)return r}return``}',
  'function quickIsComplete(e,t=[]){let n=t.find(t=>t.id===e.status);',
  'return Boolean(e.completed)||n?.complete===!0||[`done`,`closed`,`finished`].includes(String(e.status))}',
  'function quickFilterActive(e){return(e.quickSource??`all`)!==`all`||',
  '(e.quickWorkType??`all`)!==`all`||(e.quickCompletion??`all`)!==`all`||',
  '(e.quickOwnership??`all`)!==`all`||(Array.isArray(e.quickAttention)&&e.quickAttention.length>0)}',
  'function detailedFilterCount(e){let t=0;return e.stages?.length&&t++,e.statuses.length&&t++,',
  'e.priorities.length&&t++,e.assignees.length&&t++,e.participants?.length&&t++,',
  'e.tags.length&&t++,e.dueDateFilter!==`any`&&t++,e.showArchived&&t++,t}',
  'function quickMatches(e,t,n=[]){let r=t.quickSource??`all`,i=quickSourceType(e);',
  'if(r!==`all`&&i!==r)return!1;let a=t.quickWorkType??`all`;',
  'if(a!==`all`&&(i!==`task`&&i!==`requirement`||e.stage!==a))return!1;',
  'let o=quickIsComplete(e,n),s=t.quickCompletion??`all`;',
  'if(s===`unfinished`&&o||s===`completed`&&!o)return!1;',
  'let c=t.quickOwnership??`all`,l=String(t.quickOwner??``),u=String(e.customFields.completedBy??``);',
  'if(c===`mine`&&(!l||!e.assignees.includes(l))||c===`participated`&&',
  '(!l||!e.assignees.includes(l)&&u!==l)||c===`unassigned`&&e.assignees.length>0)return!1;',
  'let d=Array.isArray(t.quickAttention)?t.quickAttention:[];',
  'for(let r of d){if(r===`high`&&![`critical`,`high`].includes(e.priority))return!1;',
  'if(r===`overdue`&&!jd(e,`overdue`,n))return!1;',
  'if(r===`blocked`&&![`blocked`,`pause`,`paused`,`suspended`].includes(String(e.status)))return!1}',
  'return!0}',
  'function quickStageOptions(e,t,n){let r=new Set(q(e.tasks).map(e=>e.task)',
  '.filter(e=>quickSourceType(e)===n).map(e=>e.stage).filter(Boolean)),i=[];',
  'for(let e of t)r.has(e.id)&&(i.push({id:e.id,label:e.label}),r.delete(e.id));',
  'for(let e of r)i.push({id:e,label:e});return i}',
  'function quickPreferredStage(e,t,n,r=[]){let i=quickStageOptions(e,t,`task`);',
  'return i.find(e=>e.label.includes(n))?.id??i.find(e=>r.includes(e.id))?.id??r[0]??`all`}',
].join('')
replaceOnce('注入快速组合筛选语义', 'function Ed(e){', `${quickFilterHelpers}function Ed(e){`)

replaceOnce(
  '识别快速组合筛选激活状态',
  'function Ed(e){return!!(e.text||',
  'function Ed(e){return!!(quickFilterActive(e)||e.text||',
)

replaceOnce(
  '保持详细筛选条件计数',
  'function Dd(e){let t=0;return e.text&&t++,',
  'function Dd(e){let t=0;return ',
)

replaceOnce(
  '应用快速组合筛选条件',
  'function Od(e,t,n=[]){if(e.archived&&!t.showArchived)return!1;let r=',
  'function Od(e,t,n=[]){if(e.archived&&!t.showArchived||!quickMatches(e,t,n))return!1;let r=',
)

const hierarchicalViewHeader = [
  'QuickFilterBar=class{props;el;expanded=!1;constructor(e,t){this.props=t,',
  'this.el=e.createDiv(`pm-project-header-quick`),this.render()}refresh(){this.render()}',
  'change(e){Object.assign(this.props.filter,e,{quickPreset:``}),this.props.onChange(e)}',
  'group(e,t,n,r,i=!1){let a=this.el.createDiv(`pm-quick-filter-row`);',
  'a.createSpan({text:e,cls:`pm-quick-filter-label`});for(let e of t){',
  'let t=i?Array.isArray(n)&&n.includes(e.id):n===e.id;',
  'new Im(a).setLabel(e.label).setShape(`pill`).setActive(t).onClick(()=>r(e.id))}}',
  'summary(e,t){let n=[];t===`requirement`?n.push(`需求`):t===`task`&&n.push(`任务`);',
  'let r=e.quickWorkType??`all`;if(r!==`all`){let e=quickStageOptions(this.props.project,',
  'this.props.stages,t).find(e=>e.id===r);n.push(e?.label??r)}',
  'let i=e.quickCompletion??`all`;i===`unfinished`?n.push(`未完成`):i===`completed`&&n.push(`已完成`);',
  'let a=e.quickOwnership??`all`;a===`mine`?n.push(`我负责`):a===`participated`?',
  'n.push(`我参与`):a===`unassigned`&&n.push(`未指派`);let o={high:`高优先级`,overdue:`逾期`,',
  'blocked:`阻塞`};for(let t of Array.isArray(e.quickAttention)?e.quickAttention:[])',
  'o[t]&&n.push(o[t]);return n}',
  'render(){this.el.empty();let e=this.props.filter,t=e.quickSource??`all`,s=this.summary(e,t),',
  'c=this.el.createDiv(`pm-quick-filter-toggle-row`);',
  'new Im(c).setLabel(this.expanded?`快速组合 ▾`:`快速组合 ▸`).setShape(`pill`)',
  '.setActive(this.expanded).onClick(()=>{this.expanded=!this.expanded,this.render()}),',
  's.length&&c.createSpan({text:`当前组合：${s.join(` / `)}`,cls:`pm-quick-filter-summary`});',
  'if(!this.expanded)return;',
  'this.group(`对象`,[{id:`all`,label:`全部`},{id:`requirement`,label:`需求`},',
  '{id:`task`,label:`任务`}],t,t=>this.change({quickSource:t,quickWorkType:`all`}));',
  'if(t===`requirement`||t===`task`){let n=quickStageOptions(this.props.project,this.props.stages,t),',
  'r=[{id:`all`,label:`全部`},...n];this.group(t===`task`?`类型`:`阶段`,r,',
  'e.quickWorkType??`all`,e=>this.change({quickWorkType:e}))}',
  'this.group(`进度`,[{id:`all`,label:`全部`},{id:`unfinished`,label:`未完成`},',
  '{id:`completed`,label:`已完成`}],e.quickCompletion??`all`,',
  'e=>this.change({quickCompletion:e}));let n=quickCurrentUser(this.props.project),',
  'r=[{id:`all`,label:`全部`}];n&&(r.push({id:`mine`,label:`我负责`}),',
  'r.push({id:`participated`,label:`我参与`})),r.push({id:`unassigned`,label:`未指派`});',
  'this.group(`归属`,r,e.quickOwnership??`all`,t=>this.change({quickOwnership:t,',
  'quickOwner:t===`mine`||t===`participated`?n:e.quickOwner??``}));',
  'let i=Array.isArray(e.quickAttention)?e.quickAttention:[],a=[{id:`high`,label:`高优先级`},',
  '{id:`overdue`,label:`逾期`},{id:`blocked`,label:`阻塞`}],o=[{id:`all`,label:`全部`},...a];',
  'this.group(`关注`,o,i,t=>{if(t===`all`){this.change({quickAttention:[]});return}',
  'let n=i.includes(t)?i.filter(e=>e!==t):[...i,t];this.change({quickAttention:n})},!0)}};',
  'let Lm=class{props;el;volatileEl=null;constructor(e,t){this.props=t,',
  'this.el=e.createDiv(`pm-project-header-primary`),',
  'this.volatileEl=this.el.createDiv(`pm-project-header-actions`),this.renderVolatile()}',
  'setActiveSavedViewId(e){this.props.activeSavedViewId=e,this.renderVolatile()}',
  'refresh(){this.renderVolatile()}refreshVolatile(){this.renderVolatile()}',
  'renderVolatile(){this.volatileEl&&(this.volatileEl.empty(),this.renderSavedViewPills(this.volatileEl),',
  'this.renderSaveViewAction(this.volatileEl))}',
  'renderSavedViewPills(t){let n=t.createDiv(`pm-project-header-saved-views`);',
  'n.createSpan({text:`常用`,cls:`pm-quick-filter-label`});',
  'new Im(n).setLabel(`全部`).setShape(`pill`).setActive(!this.props.activeSavedViewId&&',
  '!Ed(this.props.filter)&&!this.props.filter.showArchived).onClick(()=>this.props.onSavedViewSelect(null));',
  'let r=[{id:`unfinished-requirements`,label:`未完成需求`},',
  '{id:`unfinished-development`,label:`未完成开发`},',
  '{id:`my-unfinished-requirements`,label:`我的未完成需求`},',
  '{id:`my-unfinished-tasks`,label:`我的未完成任务`},{id:`overdue`,label:`逾期事项`}];',
  'for(let e of r)new Im(n).setLabel(e.label).setShape(`pill`)',
  '.setActive(this.props.filter.quickPreset===e.id).onClick(()=>this.props.onQuickPresetSelect(e.id));',
  'let i=this.props.project.savedViews.find(e=>e.id===this.props.activeSavedViewId),',
  'a=new Im(n).setLabel(i?`更多 · ${i.name}`:`更多视图`).setShape(`pill`)',
  '.setActive(Boolean(i)).onClick(t=>{let n=new e.Menu;if(this.props.project.savedViews.length===0)',
  'n.addItem(e=>e.setTitle(`暂无其他视图`).setDisabled(!0));else for(let e of this.props.project.savedViews)',
  'n.addItem(t=>t.setTitle(e.name).setChecked(this.props.activeSavedViewId===e.id)',
  '.onClick(()=>this.props.onSavedViewSelect(e.id)));n.showAtMouseEvent(t)});',
  'i&&a.onContextMenu(t=>this.showViewContext(t,i))}',
  'showViewContext(t,n){t.preventDefault();let r=new e.Menu;',
  'r.addItem(e=>e.setTitle(`使用当前筛选更新`).setIcon(`refresh-cw`)',
  '.onClick(Y(()=>this.props.onSavedViewUpdate(n.id)))),',
  'r.addItem(e=>e.setTitle(`删除视图`).setIcon(`trash`)',
  '.onClick(Y(()=>this.props.onSavedViewDelete(n.id)))),r.showAtMouseEvent(t)}',
  'renderSaveViewAction(t){if(!Ed(this.props.filter)&&!this.props.filter.showArchived)return;',
  'let n=new e.ButtonComponent(t).setButtonText(`+ 保存视图`);n.onClick(()=>this.beginInlineSave(t,n))}',
  'beginInlineSave(e,t){t.buttonEl.addClass(`pm-hidden`);let n=e.createDiv(`pm-project-header-save-input`),',
  'r=n.createEl(`input`,{type:`text`,placeholder:`视图名称…`,cls:`pm-project-header-save-input-field`});',
  'r.focus();let i=!1,a=()=>{n.remove(),t.buttonEl.removeClass(`pm-hidden`)},o=Y(async()=>{',
  'if(i)return;i=!0;let e=r.value.trim();if(!e){a();return}await this.props.onSavedViewSave(e)});',
  'r.addEventListener(`keydown`,e=>{e.key===`Enter`?(e.preventDefault(),o()):',
  'e.key===`Escape`&&a()}),r.addEventListener(`blur`,()=>{r.value.trim()?o():a()})}}',
].join('')
replaceCheckedRange(
  '分层常用视图与快速组合筛选器',
  'Lm=class{props;el;volatileEl=null;',
  ';function Rm',
  'f518ec220669b40d71b4bc4b1e5c4438d2270bed718c11123ccc96fed48872ff',
  hierarchicalViewHeader,
)

const insightStyleFilterMenus = [
  'function projectFilterIcon(e){return{阶段:`layers-3`,状态:`workflow`,优先级:`signal-high`,',
  '负责人:`users`,标签:`tags`,截止日期:`calendar-clock`}[e]??`list-filter`}',
  'function projectFilterMenuBehavior(e,t,n){e.addEventListener(`toggle`,()=>{',
  'if(!e.open)return;for(let n of t.querySelectorAll(`.pm-insight-project-filter-menu[open]`))',
  'n!==e&&(n.open=!1)}),e.addEventListener(`keydown`,t=>{',
  't.key===`Escape`&&e.open&&(e.open=!1,n.focus(),t.preventDefault(),t.stopPropagation())})}',
  'function Rm(t,n,r,i,a){let o=t.createEl(`details`,',
  '{cls:`pmi-task-filter-menu pm-insight-project-filter-menu`}),',
  's=o.createEl(`summary`,{attr:{"aria-label":`按${n}筛选`}});',
  '(0,e.setIcon)(s.createSpan(`pmi-task-filter-icon`),projectFilterIcon(n));',
  'let c=s.createSpan(`pmi-task-filter-copy`);c.createSpan({cls:`pmi-task-filter-label`,text:n});',
  'let l=c.createSpan(`pmi-task-filter-value`),u=s.createSpan(`pmi-task-filter-chevron`);',
  '(0,e.setIcon)(u,`chevron-down`);let d=o.createDiv(`pmi-task-filter-panel`),',
  'f=d.createDiv(`pmi-task-filter-panel-head`);f.createEl(`strong`,{text:n}),',
  'f.createSpan({text:`${i.length} 项`});let p=d.createDiv(`pmi-task-filter-actions`),',
  'm=p.createEl(`button`,{text:`全部`,attr:{type:`button`}}),',
  'h=d.createDiv(`pmi-task-filter-options`),g=[...r],_=()=>{if(g.length===0)return`全部${n}`;',
  'if(g.length===1)return i.find(e=>e.id===g[0])?.label??`已选 1 项`;',
  'return`已选 ${g.length} 项`},v=t=>{g=[...t],l.setText(_());',
  'for(let e of h.querySelectorAll(`input[type="checkbox"]`))e.checked=g.includes(e.dataset.filterValue??``);',
  'a([...g])};for(let t of i){let n=h.createEl(`label`,{cls:`pmi-task-filter-option`}),',
  'r=n.createEl(`input`,{type:`checkbox`});r.dataset.filterValue=t.id,r.checked=g.includes(t.id);',
  'let i=n.createSpan(`pmi-task-filter-option-name`);',
  'i.createSpan({cls:`pmi-task-filter-option-label`,text:t.label}),',
  'r.addEventListener(`change`,()=>{let e=new Set(g);r.checked?e.add(t.id):e.delete(t.id),v([...e])})}',
  'return l.setText(_()),m.addEventListener(`click`,()=>v([])),',
  'projectFilterMenuBehavior(o,t,s),o}',
  'function projectSingleFilter(t,n,r,i,a,o){let s=t.createEl(`details`,',
  '{cls:`pmi-task-filter-menu pm-insight-project-filter-menu`}),',
  'c=s.createEl(`summary`,{attr:{"aria-label":r}});',
  '(0,e.setIcon)(c.createSpan(`pmi-task-filter-icon`),n);',
  'let l=c.createSpan(`pmi-task-filter-copy`);l.createSpan({cls:`pmi-task-filter-label`,text:r});',
  'let u=l.createSpan(`pmi-task-filter-value`),d=c.createSpan(`pmi-task-filter-chevron`);',
  '(0,e.setIcon)(d,`chevron-down`);let f=s.createDiv(`pmi-task-filter-panel`),',
  'p=f.createDiv(`pmi-task-filter-panel-head`);p.createEl(`strong`,{text:r}),',
  'p.createSpan({text:`${a.length} 项`});let m=f.createDiv(`pmi-task-filter-options`),',
  'h=()=>u.setText(a.find(e=>e.id===i)?.label??r);for(let t of a){',
  'let n=m.createEl(`label`,{cls:`pmi-task-filter-option`}),',
  'r=n.createEl(`input`,{type:`radio`,attr:{name:`pm-filter-${i}`}});',
  'r.checked=t.id===i,n.createSpan({cls:`pmi-task-filter-option-label`,text:t.label}),',
  'r.addEventListener(`change`,()=>{if(!r.checked)return;i=t.id,h(),o(i),s.open=!1})}',
  'return h(),projectFilterMenuBehavior(s,t,c),s}',
].join('')
replaceCheckedRange(
  'PM 洞察风格筛选下拉菜单',
  'function Rm(',
  'const zm=',
  '3e0e44f315478b2041333dccc3ccd42b2fb0a5e9cf68fb88942fbb302524931a',
  insightStyleFilterMenus,
)

const insightStyleDetailedFilter = [
  'Bm=class{props;el;clearBtn=null;constructor(e,t){this.props=t,',
  'this.el=e.createDiv(`pm-project-header-filter`),this.render()}',
  'refresh(){this.render()}',
  'render(){this.el.empty();let{filter:t,stages:n,statuses:r,priorities:i,project:a}=this.props,',
  'o=()=>{this.props.onFilterChange(),this.updateClearButton()},',
  's=this.el.createDiv(`pm-insight-filter-search`);(0,e.setIcon)(s.createSpan(),`search`);',
  'let c=s.createEl(`input`,{type:`search`,placeholder:`搜索事项…`,',
  'cls:`pm-insight-filter-search-input`});c.value=t.text,c.addEventListener(`input`,()=>{',
  't.text=c.value,o()}),Rm(this.el,`阶段`,t.stages??[],',
  'n.map(e=>({id:e.id,label:pd(e.icon,e.label)})),e=>{t.stages=e,o()}),',
  'Rm(this.el,`状态`,t.statuses,r.map(e=>({id:e.id,label:pd(e.icon,e.label)})),',
  'e=>{t.statuses=e,o()}),Rm(this.el,`优先级`,t.priorities,',
  'i.map(e=>({id:e.id,label:pd(e.icon,e.label)})),e=>{t.priorities=e,o()});',
  'let l=mu(a.tasks);l.length&&Rm(this.el,`负责人`,t.assignees,',
  'l.map(e=>({id:e,label:e})),e=>{t.assignees=e,o()});let u=hu(a.tasks);',
  'u.length&&Rm(this.el,`标签`,t.tags,u.map(e=>({id:e,label:e})),',
  'e=>{t.tags=e,o()}),this.renderDueDateButton(o),this.renderArchivedButton(o),',
  'this.renderClearButton()}',
  'renderDueDateButton(t){let{filter:n}=this.props,r=',
  '[`any`,`overdue`,`this-week`,`this-month`,`no-date`].map(e=>({id:e,label:zm[e]}));',
  'projectSingleFilter(this.el,`calendar-clock`,`截止日期`,n.dueDateFilter,r,e=>{',
  'n.dueDateFilter=e,t()})}',
  'renderArchivedButton(e){let{filter:t}=this.props,n=new Im(this.el).setLabel(`已归档`)',
  '.setActive(t.showArchived);n.el.addClass(`pm-insight-filter-archive`),n.onClick(()=>{',
  't.showArchived=!t.showArchived,n.setActive(t.showArchived),e()})}',
  'renderClearButton(){let e=Dd(this.props.filter)+(this.props.filter.text?1:0);',
  'this.clearBtn=new Im(this.el).setLabel(`重置筛选`),',
  'this.clearBtn.el.addClass(`pm-insight-filter-reset`),this.clearBtn.el.disabled=e===0,',
  'this.clearBtn.onClick(()=>{if(e===0)return;this.props.onClear(),this.render()})}',
  'refreshClearButton(){this.updateClearButton()}',
  'updateClearButton(){this.clearBtn&&=(this.clearBtn.el.remove(),null),this.renderClearButton()}}',
].join('')
replaceCheckedRange(
  'PM 洞察风格详细筛选器',
  'Bm=class',
  ',Vm=class',
  'fdfaa57d6309550c56fc86f2d43a4b0e89671b24c283a763066b29eac67f1248',
  insightStyleDetailedFilter,
)

const hierarchicalViewContainer = [
  'Vm=class{props;el;primaryRow=null;quickRow=null;filterPanel=null;filterRow=null;',
  'constructor(e,t){this.props=t,this.el=e.createDiv(`pm-project-header`),this.render()}',
  'refresh(){this.render()}notifyMutation(){this.primaryRow?.refreshVolatile(),',
  'this.quickRow?.refresh(),this.filterRow?.refreshClearButton()}',
  'setActiveSavedViewId(e){this.props.activeSavedViewId=e,',
  'this.primaryRow?.setActiveSavedViewId(e),this.quickRow?.refresh(),this.filterRow?.refresh()}',
  'render(){this.el.empty(),this.primaryRow=new Lm(this.el,{project:this.props.project,',
  'filter:this.props.filter,activeSavedViewId:this.props.activeSavedViewId,',
  'onSavedViewSelect:this.props.onSavedViewSelect,onQuickPresetSelect:this.props.onQuickPresetSelect,',
  'onSavedViewSave:this.props.onSavedViewSave,onSavedViewUpdate:this.props.onSavedViewUpdate,',
  'onSavedViewDelete:this.props.onSavedViewDelete}),this.quickRow=new QuickFilterBar(this.el,{',
  'project:this.props.project,stages:this.props.stages,filter:this.props.filter,',
  'onChange:this.props.onQuickFilterChange}),this.mountFilterPanel()}',
  'mountFilterPanel(){this.filterPanel=this.el.createDiv(`pm-project-header-filter-panel`),',
  'this.filterPanel.addClass(`pm-insight-filter-bar`),this.filterRow=new Bm(this.filterPanel,{',
  'project:this.props.project,stages:this.props.stages,statuses:this.props.statuses,',
  'priorities:this.props.priorities,filter:this.props.filter,',
  'onFilterChange:this.props.onFilterChange,onClear:this.props.onClearFilter})}}',
].join('')
replaceCheckedRange(
  '挂载快速组合筛选器',
  'Vm=class{props;el;',
  ';const Hm',
  'ebac65fb496a6450f5d3095c0ef26f57821b6f4acb763992a56fbbd480d5bef2',
  hierarchicalViewContainer,
)

replaceOnce(
  '连接快速组合筛选事件',
  'onSavedViewDelete:e=>this.handleSavedViewDelete(e)})}',
  'onSavedViewDelete:e=>this.handleSavedViewDelete(e),'
    + 'onQuickFilterChange:e=>this.handleQuickFilterMutation(e),'
    + 'onQuickPresetSelect:e=>this.handleQuickPresetSelect(e)})}',
)

replaceOnce(
  '详细筛选使用独立清除操作',
  'onClearFilter:()=>this.handleClearFilter(),',
  'onClearFilter:()=>this.handleClearDetailedFilter(),',
)

replaceOnce(
  '处理快速组合与常用视图',
  'handleFilterMutation(){this.activeSavedViewId===null?',
  'handleQuickFilterMutation(e){this.activeSavedViewId=null,'
    + 'this.kanbanGroupBy=e.quickSource===`task`?`status`:`stage`,'
    + 'this.header?.setActiveSavedViewId(null),this.persistFilter(),this.scheduleFilterRender()}'
    + 'handleQuickPresetSelect(t){if(!this.project)return;let n=au(),'
    + 'r=quickCurrentUser(this.project);if(t.startsWith(`my-`)&&!r){'
    + 'new e.Notice(`当前项目尚未识别“我的”用户，请先配置包含当前用户的个人视图。`);return}'
    + 'n.quickPreset=t,t===`unfinished-requirements`?('
    + 'n.quickSource=`requirement`,n.quickCompletion=`unfinished`):'
    + 't===`unfinished-development`?(n.quickSource=`task`,n.quickWorkType=quickPreferredStage('
    + 'this.project,this.plugin.store.configFor(this.project).stages,`开发`,[`devel`,`develop`,`development`]),'
    + 'n.quickCompletion=`unfinished`):t===`my-unfinished-requirements`?('
    + 'n.quickSource=`requirement`,n.quickCompletion=`unfinished`,n.quickOwnership=`mine`,n.quickOwner=r):'
    + 't===`my-unfinished-tasks`?(n.quickSource=`task`,n.quickCompletion=`unfinished`,'
    + 'n.quickOwnership=`mine`,n.quickOwner=r):t===`overdue`&&('
    + 'n.quickCompletion=`unfinished`,n.quickAttention=[`overdue`]),Object.assign(this.filter,n),'
    + 'this.activeSavedViewId=null,this.kanbanGroupBy=n.quickSource===`task`?`status`:`stage`,'
    + 'this.persistFilter(),this.header?.setActiveSavedViewId(null),this.scheduleFilterRender()}'
    + 'handleFilterMutation(){this.filter.quickPreset=``,this.activeSavedViewId===null?',
)

replaceOnce(
  '清除详细筛选时保留快速组合',
  'handleClearFilter(){Object.assign(this.filter,au()),',
  'handleClearDetailedFilter(){Object.assign(this.filter,{text:``,stages:[],statuses:[],priorities:[],'
    + 'assignees:[],participants:[],tags:[],dueDateFilter:`any`,showArchived:!1}),'
    + 'this.filter.quickPreset=``,this.activeSavedViewId=null,this.persistFilter(),'
    + 'this.header?.setActiveSavedViewId(null),this.scheduleFilterRender()}'
    + 'handleClearFilter(){Object.assign(this.filter,au()),',
)

// 表格已有窗口化能力，但原发布版本只在超过 300 行时启用，常见中型迭代仍会全量创建 DOM。
replaceOnce(
  '降低表格虚拟化阈值',
  'function Np(e){if(e.visibleRows.length<=300)',
  'function Np(e){if(e.visibleRows.length<=120)',
)

replaceOnce(
  '保存表格排序指示刷新器',
  '})):n.setText(t.label),zp(e,n,t.id)}c();for(let t of Ip(e.project)){',
  '})):n.setText(t.label),zp(e,n,t.id)}e.state.updateSortIndicators=c,c();'
    + 'for(let t of Ip(e.project)){',
)

replaceOnce(
  '初始化表格排序指示刷新器',
  'windowStart:-1,windowEnd:-1,renderWindow:null}}',
  'windowStart:-1,windowEnd:-1,renderWindow:null,updateSortIndicators:null}}',
)

replaceOnce(
  'Saved View 复用表格实例',
  'getViewState(){return{sortKey:this.state.sortKey,sortDir:this.state.sortDir}}render(){',
  'getViewState(){return{sortKey:this.state.sortKey,sortDir:this.state.sortDir}}'
    + 'updateFilter(e,t){this.state.filter=e,t&&(this.state.sortKey=t.sortKey??this.state.sortKey,'
    + 'this.state.sortDir=t.sortDir??this.state.sortDir),this.state.selectedTaskId=null,'
    + 'this.state.selectedTaskIds.clear(),this.state.lastCheckedTaskId=null,'
    + 'this.state.updateSortIndicators?.();let n=this.getScrollTop();this.doRefreshTable();'
    + 'let r=this.state.wrapper;r&&(r.scrollTop=Math.min(n,Math.max(0,r.scrollHeight-r.clientHeight)),'
    + 'this.state.renderWindow?.()),this.updateBulkBar()}render(){',
)

const virtualizedKanbanColumn = [
  'Mm=class{',
  'el;cardsEl;props;cards;devHeight=128;overscan=4;heightCache=new Map;',
  'start=-1;end=-1;frame=null;measureFrame=null;dragging=!1;destroyed=!1;viewportObserver=null;',
  'constructor(t,n){this.props=n,this.cards=n.cards,this.heightCache=n.heightCache??this.heightCache;',
  'let r=t.createDiv(`pm-kanban-col`);r.dataset.status=n.status.id,this.el=r;',
  'let i=r.createDiv(`pm-kanban-col-header`);i.style.setProperty(`--col-color`,n.status.color),',
  'i.createDiv(`pm-kanban-col-topbar`).setCssStyles({background:n.status.color});',
  'let a=i.createDiv(`pm-kanban-col-title-row`),o=a.createSpan({cls:`pm-kanban-col-badge`});',
  'n.status.icon&&fd(n.status.icon)?((0,e.setIcon)(o.createSpan({cls:`pm-kanban-col-badge-icon`}),n.status.icon),',
  'o.appendText(n.status.label)):o.setText(pd(n.status.icon,n.status.label)),o.style.color=n.status.color,',
  'a.createDiv(`pm-kanban-col-header-right`).createSpan({text:String(n.cards.length),cls:`pm-kanban-col-count`});',
  'let s=r.createDiv(`pm-kanban-cards pm-kanban-cards--virtual`);this.cardsEl=s,s.dataset.status=n.status.id,',
  's.style.display=`block`,',
  's.addEventListener(`scroll`,()=>this.scheduleRender()),',
  's.addEventListener(`dragover`,e=>{e.preventDefault(),s.addClass(`pm-kanban-drop-target`);',
  'let t=Nm(s,e.clientY),n=s.querySelector(`.pm-kanban-card--dragging`);if(n){',
  'let e=n.closest(`.pm-kanban-virtual-item`),r=t?.closest(`.pm-kanban-virtual-item`);',
  'e&&e.parentElement===s&&(r?s.insertBefore(e,r):s.appendChild(e))}}),',
  's.addEventListener(`dragleave`,()=>{s.removeClass(`pm-kanban-drop-target`)}),',
  's.addEventListener(`drop`,Y(async e=>{e.preventDefault(),s.removeClass(`pm-kanban-drop-target`);',
  'let t=e.dataTransfer?.getData(`text/plain`)??``;t&&await n.onDrop(t,n.status.id)})),',
  'typeof ResizeObserver!=`undefined`&&(this.viewportObserver=new ResizeObserver(()=>this.scheduleRender(!0)),',
  'this.viewportObserver.observe(s)),this.renderWindow(!0),n.scrollTop&&(s.scrollTop=n.scrollTop,this.renderWindow(!0))}',
  'offsets(){let e=[0];for(let t=0;t<this.cards.length;t+=1){let n=this.cards[t],',
  'r=this.heightCache.get(n.task.id)??this.devHeight;e.push(e[t]+r)}return e}',
  'range(e){if(this.cards.length===0)return[0,0];let t=this.cardsEl.scrollTop,',
  'n=this.cardsEl.clientHeight||640,r=Math.max(0,t-this.devHeight*this.overscan),',
  'i=t+n+this.devHeight*this.overscan,a=0;for(;a<this.cards.length&&e[a+1]<r;)a+=1;',
  'let o=a;for(;o<this.cards.length&&e[o]<i;)o+=1;return[a,Math.min(this.cards.length,Math.max(a+1,o))]}',
  'scheduleRender(e=!1){if(this.destroyed||this.dragging&&!e)return;',
  'this.frame!==null&&cancelAnimationFrame(this.frame),this.frame=requestAnimationFrame(()=>{',
  'this.frame=null,this.renderWindow(e)})}',
  'renderWindow(e=!1){if(this.destroyed)return;let t=this.offsets(),[n,r]=this.range(t);',
  'if(!e&&n===this.start&&r===this.end)return;this.start=n,this.end=r;',
  'let i=this.cardsEl.scrollTop;this.cardsEl.empty();',
  'let a=this.cardsEl.createDiv(`pm-kanban-virtual-spacer`);a.style.height=`${t[n]}px`;',
  'for(let e=n;e<r;e+=1)this.renderCard(this.cards[e],e);',
  'let o=this.cardsEl.createDiv(`pm-kanban-virtual-spacer`);',
  'o.style.height=`${Math.max(0,t[this.cards.length]-t[r])}px`,this.cardsEl.scrollTop=i,',
  'this.measureFrame!==null&&cancelAnimationFrame(this.measureFrame),',
  'this.measureFrame=requestAnimationFrame(()=>{this.measureFrame=null,this.measureVisible()})}',
  'renderCard(e,t){let n=this.cardsEl.createDiv(`pm-kanban-virtual-item`);',
  'n.dataset.virtualIndex=String(t),n.style.marginBottom=`8px`,n.style.contain=`layout style`,',
  'new jm(n,{task:e.task,draggable:e.draggable,',
  'statusLabel:e.statusLabel,statusColor:e.statusColor,priorityColor:e.priorityColor,',
  'descriptionPreview:e.descriptionPreview,parentTitle:e.parentTitle,loggedHours:e.loggedHours,',
  'overdue:e.overdue,showTagColors:e.showTagColors,onClick:()=>this.props.onCardClick(e.task),',
  'onContextMenu:t=>this.props.onCardContextMenu(e.task,t),',
  'onDragStart:()=>this.props.onCardDragStart(e.task),onDragEnd:()=>this.props.onCardDragEnd()})}',
  'measureVisible(){if(this.destroyed)return;let e=!1;',
  'for(let t of this.cardsEl.querySelectorAll(`.pm-kanban-virtual-item`)){',
  'let n=Number(t.dataset.virtualIndex),r=t.querySelector(`.pm-kanban-card`);',
  'if(!r||!Number.isInteger(n)||!this.cards[n])continue;',
  'let i=Math.ceil(r.getBoundingClientRect().height)+8,a=this.cards[n].task.id,',
  'o=this.heightCache.get(a);(!o||Math.abs(o-i)>1)&&(this.heightCache.set(a,i),e=!0)}',
  'e&&this.renderWindow(!0)}',
  'setDragging(e){this.dragging=e;if(e){this.frame!==null&&cancelAnimationFrame(this.frame),',
  'this.frame=null,this.measureFrame!==null&&cancelAnimationFrame(this.measureFrame),',
  'this.measureFrame=null;return}this.scheduleRender(!0)}',
  'getScrollTop(){return this.cardsEl.scrollTop}',
  'destroy(){this.destroyed=!0,this.frame!==null&&cancelAnimationFrame(this.frame),',
  'this.measureFrame!==null&&cancelAnimationFrame(this.measureFrame),this.viewportObserver?.disconnect()}',
  '}',
].join('')
replaceCheckedRange(
  '看板列虚拟化',
  'Mm=class{el;constructor',
  ';function Nm',
  '81c9ce96d94e9192d20846fe1a901c25b92292d34c0d6bd43ad50f7597991696',
  virtualizedKanbanColumn,
)

const optimizedKanbanView = [
  'let Pm=class{container;project;plugin;onRefresh;filter;groupBy;dragTask=null;config;',
  'columns=[];parentTitles=new Map;allTasks=[];includeSubtasks=!1;',
  'scrollPositions=new Map;heightCaches=new Map;boardScrollLeft=0;',
  'constructor(e,t,n,r,i,a=`stage`){this.container=e,this.project=t,this.plugin=n,',
  'this.onRefresh=r,this.filter=i,this.groupBy=a}',
  'render(){this.renderBoard(),this.config.kanbanShowDescriptionPreview&&this.hydrateDescriptions()}',
  'updateFilter(e,t){this.filter=e,this.renderBoard(t),',
  'this.config.kanbanShowDescriptionPreview&&this.hydrateDescriptions()}',
  'destroyColumns(){let e=this.container.querySelector(`.pm-kanban-board`);',
  'e&&(this.boardScrollLeft=e.scrollLeft);for(let e of this.columns){',
  'this.scrollPositions.set(`${this.groupBy}:${e.props.status.id}`,e.getScrollTop()),e.destroy()}',
  'this.columns=[]}',
  'destroy(){this.destroyColumns()}',
  'renderBoard(e=this.groupBy){this.config=this.plugin.store.configFor(this.project),',
  'this.destroyColumns(),this.groupBy=e,this.container.empty(),this.container.addClass(`pm-kanban-view`);',
  'let t=this.container.createDiv(`pm-kanban-board`),n=this.groupBy===`status`,',
  'r=q(this.project.tasks);this.parentTitles=new Map;',
  'for(let{task:e}of r)for(let t of e.subtasks)this.parentTitles.set(t.id,e.title);',
  'this.includeSubtasks=this.config.kanbanShowSubtasks||this.filter.quickSource!==`requirement`,',
  'this.allTasks=this.includeSubtasks?r.map(e=>e.task):this.project.tasks;',
  'let i=new Set(this.allTasks.map(e=>n?e.status:e.stage)),',
  'a=this.allTasks.filter(e=>Od(e,this.filter,this.config.statuses)),o=new Map;',
  'for(let e of a){let t=n?e.status:e.stage,r=o.get(t);r?r.push(e):o.set(t,[e])}',
  'let s=(n?this.config.statuses:this.config.stages).filter(e=>i.has(e.id));',
  'for(let e of s){let n=(o.get(e.id)??[]).map(e=>this.buildCardData(e)),',
  'r=`${this.groupBy}:${e.id}`,i=this.heightCaches.get(r)??new Map;this.heightCaches.set(r,i);',
  'let a=new Mm(t,{status:e,cards:n,heightCache:i,scrollTop:this.scrollPositions.get(r)??0,',
  'onCardClick:e=>this.openTask(e),onCardContextMenu:(e,t)=>this.openContextMenu(e,t),',
  'onCardDragStart:e=>{this.dragTask=e;for(let e of this.columns)e.setDragging(!0)},',
  'onCardDragEnd:()=>{this.dragTask=null;for(let e of this.columns)e.setDragging(!1)},',
  'onDrop:(e,t)=>this.handleDrop(e,t)});this.columns.push(a)}t.scrollLeft=this.boardScrollLeft}',
  'async hydrateDescriptions(){let e=this.allTasks.filter(e=>e.filePath&&!e.description&&',
  'Od(e,this.filter,this.config.statuses));e.length&&(await Promise.all(e.map(e=>',
  'this.plugin.store.loadTaskBody(e))),e.some(e=>e.description)&&this.renderBoard())}',
  'buildCardData(e){let t=ud(this.config.priorities,e.priority),n=sd(this.config.statuses,e.status),',
  'r=t&&e.priority!==`medium`&&e.priority!==`low`?t.color:void 0,i;',
  'if(this.config.kanbanShowDescriptionPreview&&e.description.trim()){let t=e.description',
  '.replace(/```[\\s\\S]*?```/g,` `).replace(/`([^`]*)`/g,`$1`)',
  '.replace(/!?\\[([^\\]]*)\\]\\([^)]*\\)/g,`$1`).replace(/^[ \\t]*[#>\\-*+]+[ \\t]+/gm,``)',
  '.replace(/[*~]/g,``).replace(/\\s+/g,` `).trim();i=t?t.slice(0,240):void 0}',
  'let a=this.includeSubtasks&&e.type===`subtask`?this.parentTitles.get(e.id):void 0;',
  'return{task:e,draggable:!e.customFields.zentaoSourceType,statusLabel:n?.label??e.status,',
  'statusColor:n?.color??`var(--text-muted)`,priorityColor:r,descriptionPreview:i,parentTitle:a,',
  'loggedHours:gu(e),overdue:rd(e,this.config.statuses)===`overdue`,',
  'showTagColors:this.plugin.settings.showTagColors}}',
  'openTask(e){Q(this.plugin,this.project,{task:e,onSave:async()=>{await this.onRefresh()}})}',
  'openContextMenu(t,n){let r=new e.Menu;np(r,t,{plugin:this.plugin,project:this.project,',
  'onRefresh:this.onRefresh}),r.showAtMouseEvent(n)}',
  'async handleDrop(e,t){!this.dragTask||this.dragTask.id!==e||',
  'this.dragTask.customFields.zentaoSourceType||t!==this.dragTask.stage&&(',
  'await this.plugin.store.updateTask(this.project,this.dragTask.id,{stage:t}),await this.onRefresh())}}',
].join('')
replaceCheckedRange(
  '看板单次筛选分组',
  'var Pm=class{container;',
  ',Fm=class',
  '294362165f715cf65b1711b5bdb0c93547e5aa2a9d0ed7b03a133f6fffc81d25',
  optimizedKanbanView,
)

replaceOnce(
  'Saved View 复用看板实例',
  'scheduleFilterRender(){this.filterRenderTimer!==null&&window.clearTimeout(this.filterRenderTimer),'
    + 'this.bodyEl.addClass(`pm-filter-switching`),this.filterRenderTimer=window.setTimeout(()=>{'
    + 'this.filterRenderTimer=null,this.renderCurrentView(),this.bodyEl.removeClass(`pm-filter-switching`)},0)}',
  'scheduleFilterRender(){this.filterRenderTimer!==null&&window.clearTimeout(this.filterRenderTimer),'
    + 'this.bodyEl.addClass(`pm-filter-switching`),this.filterRenderTimer=window.setTimeout(()=>{'
    + 'this.filterRenderTimer=null,this.subview instanceof Pm?'
    + 'this.subview.updateFilter(this.filter,this.kanbanGroupBy):this.subview instanceof Yp?'
    + 'this.subview.updateFilter(this.filter,this.savedTableViewState):this.renderCurrentView(),'
    + 'this.bodyEl.removeClass(`pm-filter-switching`)},0)}',
)

// 只编译替换后的发布代码，不执行插件逻辑或访问 Obsidian API。
new Function('require', 'module', 'exports', source)

const outputDirectory = path.join(repositoryRoot, 'build')
const outputPath = path.join(outputDirectory, 'enhanced.js')
fs.mkdirSync(outputDirectory, { recursive: true })
fs.writeFileSync(outputPath, source, 'utf8')
process.stdout.write(`Project Manager Enhanced 主模块已生成：${outputPath}\n`)

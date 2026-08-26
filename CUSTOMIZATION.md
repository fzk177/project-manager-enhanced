# 定制能力清单

## 精确复现基线

- 上游标签：`1.8.0`
- 上游标签 Commit：`0cfc934167cec9fac129fbeb532c316af6d0f548`
- 当前定制基线 SHA-256：`031642008b8afbdb9f300825623efcc62dc213b7abeb529f06ac827bb1bb60d1`
- 构建入口：`scripts/patch-main.cjs`

`vendor/main.vendor.js` 已包含早期个人改造；`scripts/patch-main.cjs` 记录后续可验证补丁。二者共同构成当前精确复现层。

## 近期安装版恢复基线

- 恢复日期：`2026-08-26`
- `vendor/main.recovered.js` SHA-256：`699edf0ac794519da27b90500acaa821f2388cf4e4cff59b60f0338f2c5d3003`
- `vendor/styles.recovered.css` SHA-256：`3d38025cd8cfd4f866ba2554ab76cb3b4793d3a1dae547e5c2bb14763e310e14`
- 构建入口：`scripts/build-recovered-runtime.cjs`

近期多轮界面调试曾直接修改 vault 安装产物，现有 TypeScript 与旧补丁层不能完整重建这些能力。为避免发布时再次丢失定制，当前生产构建以本地已验收 Bundle 为不可变恢复基线，并在复制前强制校验哈希。该恢复层不宣称已经还原缺失的 TypeScript 源码。

## 后续补丁

- 项目状态读取、保存与项目面板分类。
- 快速组合筛选数据结构、匹配语义和 Saved View 兼容。
- 常用视图、更多视图、快速组合和详细筛选面板。
- 看板按列虚拟化、动态高度缓存和视图复用。
- 表格虚拟化阈值调整、视图复用和排序指示同步。
- 响应式头部布局、折叠面板和分组卡片样式。
- `custom/dashboard.js` 与 `custom/dashboard.css` 提供按系统分组的迭代首页、需求展开、人员角色、手工日期和归档能力。
- `custom/insights-member-dashboard.js` 与 `custom/insights-member-dashboard.css` 提供 PM 洞察顶部对象统计、成员需求/任务双分区卡片和右侧联动筛选。
- `custom/iteration-detail.js` 与 `custom/iteration-detail.css` 提供迭代概览、需求搜索层级、临时筛选、渐进表格和吸附操作区。
- Project Manager Insights 0.2.4 内部模块、设置迁移和工作量洞察页面。

## 验收基线

- 迭代 146、148 的需求、任务、里程碑及父子关系可完整加载。
- 表格、甘特图和看板可切换。
- 常用视图和快速组合可叠加详细过滤。
- 原 Saved View 可从“更多视图”加载。
- 看板和表格切换无明显卡顿。
- 项目首页可按归属、状态和归档范围筛选，并通过统计卡片展开对应需求。

# Project Manager Enhanced

这是一个可独立安装的 Obsidian Project Manager 增强版，插件 ID 为 `project-manager-enhanced`。它用于稳定保存当前个人改造成果，避免官方插件更新、Obsidian 重装或系统迁移覆盖定制内容。

## 当前能力

- 支持嵌套项目目录和同级 `01.需求与任务` 目录。
- 支持禅道需求、任务、里程碑及其原始阶段和状态。
- 表格展示事项 ID、模块、阶段、状态、负责人、完成者等字段。
- 看板按列虚拟化，表格在中型项目中启用行虚拟化。
- Saved View 切换复用当前视图实例。
- 提供常用视图和可组合的对象、类型、进度、归属、关注筛选。
- 快速组合和详细筛选使用可折叠、响应式面板。
- 项目面板按系统归属分组，以单行迭代卡片展示需求进度、风险、人员角色、提测和计划上线时间。
- 支持展开迭代需求、统计快捷筛选、本地项目归档及全局/迭代人员角色配置。
- 内置 Project Manager Insights，可跨项目查看成员工作量、工时比例和任务明细。

## 安装

1. 禁用官方 `project-manager` 插件，避免重复注册 Project Manager 页面。
2. 将 `main.js`、`styles.css`、`manifest.json` 放入：

   ```text
   <vault>/.obsidian/plugins/project-manager-enhanced/
   ```

3. 如需保留现有插件设置，将旧目录中的 `data.json` 复制到新目录。
4. 如果已经安装独立的 Project Manager Insights，请禁用它；增强版会自动迁移其设置。
5. 在 Obsidian 第三方插件中启用 Project Manager Enhanced。

项目 Markdown、Frontmatter、稳定 ID 和 Wiki-link 不需要迁移。

## 构建

当前精确复现层不依赖 TypeScript 重新编译：

```bash
npm run build
# 或 pnpm build
```

构建过程：

1. 校验 `vendor/main.recovered.js` 和 `vendor/styles.recovered.css` 的 SHA-256。
2. 从已经过本地使用验证的恢复基线逐字节生成根目录 `main.js` 和 `styles.css`。
3. 对生成的 `main.js` 执行 JavaScript 语法检查。

恢复基线来自当前 vault 安装版，包含健康度、交付批次、关注迭代、迭代总结与近期 PM 洞察调试成果。它是可重复构建的编译 Bundle，不代表已经恢复成原始 TypeScript 源码。

官方 TypeScript 源码仍保留，可以单独执行 `pnpm build:upstream`，但该命令生成的是上游版本，不包含当前完整定制。

## 数据与隐私

- `data.json` 是运行时设置，不提交到 Git。
- 仓库不包含禅道 Token、密码、Cookie 或项目业务数据。
- 禅道迭代 Markdown 继续由 Obsidian vault 自行备份。

## 上游更新

仓库使用两个逻辑层：

- `upstream/main`：跟踪官方源码。
- `custom/main`：维护当前独立增强版。

升级时先在单独分支获取官方版本，再重新校验补丁定位和界面基线。禁止直接用官方 `main.js` 覆盖当前产物。

## 许可证与来源

本项目基于 [StepanKropachev/obsidian-pm](https://github.com/StepanKropachev/obsidian-pm)，遵循 MIT License，并保留原作者版权声明。

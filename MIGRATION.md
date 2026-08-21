# 从官方插件迁移

## 迁移前

1. 关闭 Obsidian。
2. 备份原插件目录和整个 vault。
3. 记录原插件 `data.json` 的位置。

## 安装增强版

1. 创建 `.obsidian/plugins/project-manager-enhanced/`。
2. 复制 `main.js`、`styles.css`、`manifest.json`。
3. 将原插件 `data.json` 复制到增强版目录。
4. 如果安装了独立的 Project Manager Insights，保留其 `data.json` 供首次启动迁移，然后禁用该插件。
5. 启动 Obsidian，禁用官方 Project Manager 和独立 Insights，再启用增强版。

## 验证

- 项目总览能够递归发现。
- 任务目录能够正确加载。
- 表格列宽、Saved View 和筛选状态存在。
- 看板、表格、甘特图显示正常。

官方插件和增强版不得同时启用。
独立 Insights 和已内置 Insights 的增强版也不得同时启用。

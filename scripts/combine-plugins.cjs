'use strict'

const fs = require('fs')
const path = require('path')

const repositoryRoot = path.join(__dirname, '..')
const enhancedPath = path.join(repositoryRoot, 'build', 'enhanced.js')
const insightsPath = path.join(repositoryRoot, 'build', 'insights.js')
const dashboardPath = path.join(repositoryRoot, 'custom', 'dashboard.js')
const outputPath = path.join(repositoryRoot, 'main.js')
const enhancedSource = fs.readFileSync(enhancedPath, 'utf8')
const insightsSource = fs.readFileSync(insightsPath, 'utf8')
const dashboardSource = fs.readFileSync(dashboardPath, 'utf8')

const combinedSource = `'use strict'
const enhancedModule = { exports: {} }
const insightsModule = { exports: {} }

;(function loadEnhanced(module, exports, require) {
${enhancedSource}
${dashboardSource}
})(enhancedModule, enhancedModule.exports, require)

;(function loadInsights(module, exports, require) {
${insightsSource}
})(insightsModule, insightsModule.exports, require)

const EnhancedPlugin = enhancedModule.exports.default ?? enhancedModule.exports
const InsightsPlugin = insightsModule.exports.default ?? insightsModule.exports

module.exports = class ProjectManagerEnhancedPlugin extends EnhancedPlugin {
  insightsPlugin = null

  async onload() {
    await super.onload()
    await this.migrateInsightsSettings()

    try {
      const insightsPlugin = new InsightsPlugin(this.app, this.manifest)
      await insightsPlugin.load()
      this.insightsPlugin = insightsPlugin
      this.syncInsightsSettings()
      insightsPlugin.saveSettings = async () => {
        this.syncInsightsSettings()
        await this.saveSettings()
      }
    } catch (error) {
      console.error('Project Manager Insights 内部模块加载失败', error)
    }
  }

  onunload() {
    try {
      this.insightsPlugin?.unload()
      this.insightsPlugin = null
    } finally {
      super.onunload()
    }
  }

  syncInsightsSettings() {
    const insightsSettings = this.insightsPlugin?.settings
    if (!insightsSettings) return

    this.settings.locale = insightsSettings.locale
    this.settings.aliases = structuredClone(insightsSettings.aliases)
    this.settings.selectedProjectIds = [...insightsSettings.selectedProjectIds]
    this.settings.memberViewMode = insightsSettings.memberViewMode
    this.settings.memberGanttScale = insightsSettings.memberGanttScale
    this.settings.quickFilter = structuredClone(insightsSettings.quickFilter ?? {
      quickSource: "all"
    })
  }

  async migrateInsightsSettings() {
    if (Array.isArray(this.settings.selectedProjectIds)) return

    const legacyPath = \`${'${this.app.vault.configDir}'}/plugins/project-manager-insights/data.json\`
    try {
      if (!(await this.app.vault.adapter.exists(legacyPath))) return
      const legacySettings = JSON.parse(await this.app.vault.adapter.read(legacyPath))
      Object.assign(this.settings, legacySettings)
      await this.saveSettings()
    } catch (error) {
      console.error('Project Manager Insights 旧设置迁移失败', error)
    }
  }
}
`

new Function('require', 'module', 'exports', combinedSource)
fs.writeFileSync(outputPath, combinedSource, 'utf8')
process.stdout.write(`Project Manager Enhanced 合并插件已生成：${outputPath}\n`)

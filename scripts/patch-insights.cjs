'use strict'

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const repositoryRoot = path.join(__dirname, '..')
const sourcePath = path.join(repositoryRoot, 'vendor', 'insights.vendor.js')
const outputDirectory = path.join(repositoryRoot, 'build')
const outputPath = path.join(outputDirectory, 'insights.js')
let source = fs.readFileSync(sourcePath, 'utf8')

const expectedHash = '468830cc929ae1a6fa66fe1601a188bf83a507426effef39dbe6f2b46ab8cd17'
const actualHash = crypto.createHash('sha256').update(source).digest('hex')
if (actualHash !== expectedHash) {
  throw new Error('Project Manager Insights 0.2.4 定制基线校验失败')
}

/** 每个集成补丁必须且只能匹配一次，避免上游构建变化后继续静默套用。 */
function replaceOnce(label, search, replacement) {
  const firstIndex = source.indexOf(search)
  const lastIndex = source.lastIndexOf(search)
  if (firstIndex < 0 || firstIndex !== lastIndex) {
    throw new Error(`Project Manager Insights 集成补丁匹配失败：${label}`)
  }

  source = `${source.slice(0, firstIndex)}${replacement}${source.slice(firstIndex + search.length)}`
}

replaceOnce(
  '读取 Enhanced 设置路径',
  '/plugins/project-manager/data.json',
  '/plugins/project-manager-enhanced/data.json'
)
replaceOnce(
  '导航到 Enhanced 插件',
  'var PROJECT_MANAGER_ID = "project-manager";',
  'var PROJECT_MANAGER_ID = "project-manager-enhanced";'
)
replaceOnce(
  '兼容 Enhanced 版本',
  'var COMPATIBLE_VERSION = /^1\\.8\\./u;',
  'var COMPATIBLE_VERSION = /^(?:1\\.8\\.|1\\.[0-9]+\\.)/u;'
)
replaceOnce(
  '由主插件统一管理设置页',
  '    this.addSettingTab(new InsightsSettingTab(this.app, this));\n',
  ''
)

fs.mkdirSync(outputDirectory, { recursive: true })
new Function('require', 'module', 'exports', source)
fs.writeFileSync(outputPath, source, 'utf8')
process.stdout.write(`Project Manager Insights 内部模块已生成：${outputPath}\n`)

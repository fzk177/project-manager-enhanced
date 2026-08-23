import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = join(repositoryRoot, 'custom', 'styles.css')
const insightsPath = join(repositoryRoot, 'custom', 'insights.css')
const dashboardPath = join(repositoryRoot, 'custom', 'dashboard.css')
const iterationDetailPath = join(repositoryRoot, 'custom', 'iteration-detail.css')
const outputPath = join(repositoryRoot, 'styles.css')

const source = readFileSync(sourcePath, 'utf8')
const insights = readFileSync(insightsPath, 'utf8')
const dashboard = readFileSync(dashboardPath, 'utf8').trimEnd()
const iterationDetail = readFileSync(iterationDetailPath, 'utf8')
writeFileSync(
  outputPath,
  `${source}\n\n/* Project Manager Insights 0.2.4 · MIT */\n${insights}\n\n${dashboard}\n\n${iterationDetail}`,
  'utf8',
)
process.stdout.write(`Project Manager Enhanced 样式已生成：${outputPath}\n`)

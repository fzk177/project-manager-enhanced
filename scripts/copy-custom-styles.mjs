import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = join(repositoryRoot, 'custom', 'styles.css')
const insightsPath = join(repositoryRoot, 'custom', 'insights.css')
const outputPath = join(repositoryRoot, 'styles.css')

const source = readFileSync(sourcePath, 'utf8')
const insights = readFileSync(insightsPath, 'utf8')
writeFileSync(outputPath, `${source}\n\n/* Project Manager Insights 0.2.4 · MIT */\n${insights}`, 'utf8')
process.stdout.write(`Project Manager Enhanced 样式已生成：${outputPath}\n`)

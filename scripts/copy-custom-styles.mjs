import { copyFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = join(repositoryRoot, 'custom', 'styles.css')
const outputPath = join(repositoryRoot, 'styles.css')

copyFileSync(sourcePath, outputPath)
process.stdout.write(`Project Manager Enhanced 样式已生成：${outputPath}\n`)

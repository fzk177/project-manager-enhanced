'use strict'

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const repositoryRoot = path.join(__dirname, '..')
const recoveredMainPath = path.join(repositoryRoot, 'vendor', 'main.recovered-20260923.js')
const recoveredStylesPath = path.join(repositoryRoot, 'vendor', 'styles.recovered-20260923.css')
const outputMainPath = path.join(repositoryRoot, 'main.js')
const outputStylesPath = path.join(repositoryRoot, 'styles.css')

const RECOVERED_MAIN_SHA256 = '408efdea370a8554ba255b8a8951c7650f6f38bf82eb231676f2a617d5d65c29'
const RECOVERED_STYLES_SHA256 = '0bb4338c0b3bc0bac94e97ea56c9001980ac6852f69490080b9dc189f8315814'

/**
 * 校验从本地安装版恢复的编译产物，避免基线被意外修改后继续生成不可追溯的发布文件。
 */
function readVerifiedSource(sourcePath, expectedHash, label) {
  const content = fs.readFileSync(sourcePath)
  const actualHash = crypto.createHash('sha256').update(content).digest('hex')
  if (actualHash !== expectedHash) {
    throw new Error(`${label}恢复基线校验失败：expected=${expectedHash} actual=${actualHash}`)
  }
  return content
}

const mainSource = readVerifiedSource(recoveredMainPath, RECOVERED_MAIN_SHA256, 'main.js')
const stylesSource = readVerifiedSource(recoveredStylesPath, RECOVERED_STYLES_SHA256, 'styles.css')

// 当前完整定制以 2026-09-23 的安装版 Bundle 为基线；旧恢复基线保留在 vendor 中。
fs.writeFileSync(outputMainPath, mainSource)
fs.writeFileSync(outputStylesPath, stylesSource)

new Function('require', 'module', 'exports', mainSource.toString('utf8'))
process.stdout.write(`Project Manager Enhanced 恢复构建完成：${outputMainPath}\n`)

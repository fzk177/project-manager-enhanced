'use strict'

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const repositoryRoot = path.join(__dirname, '..')
const recoveredMainPath = path.join(repositoryRoot, 'vendor', 'main.recovered.js')
const recoveredStylesPath = path.join(repositoryRoot, 'vendor', 'styles.recovered.css')
const outputMainPath = path.join(repositoryRoot, 'main.js')
const outputStylesPath = path.join(repositoryRoot, 'styles.css')

const RECOVERED_MAIN_SHA256 = '6f36322c06b2a8e5174444edd96b217d78a3711042b57ea1318146102c1da3ae'
const RECOVERED_STYLES_SHA256 = '1701fe1b44387e14f204451a0ef08503f9d7c3870cd53c7ccb6120fad27be3a6'

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

// 当前完整定制只保存在经过本地验收的编译 Bundle 中，构建时逐字节恢复，防止历史补丁再次丢失。
fs.writeFileSync(outputMainPath, mainSource)
fs.writeFileSync(outputStylesPath, stylesSource)

new Function('require', 'module', 'exports', mainSource.toString('utf8'))
process.stdout.write(`Project Manager Enhanced 恢复构建完成：${outputMainPath}\n`)

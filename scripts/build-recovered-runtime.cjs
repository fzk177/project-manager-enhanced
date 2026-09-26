'use strict'

const crypto = require('crypto')
const { execFileSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const repositoryRoot = path.join(__dirname, '..')
const recoveredMainPath = path.join(repositoryRoot, 'vendor', 'main.recovered-20260923.js')
const recoveredStylesPath = path.join(repositoryRoot, 'vendor', 'styles.recovered-20260923.css')
const outputMainPath = path.join(repositoryRoot, 'main.js')
const outputStylesPath = path.join(repositoryRoot, 'styles.css')

const RECOVERED_MAIN_SHA256 = '408efdea370a8554ba255b8a8951c7650f6f38bf82eb231676f2a617d5d65c29'
const RECOVERED_STYLES_SHA256 = '0bb4338c0b3bc0bac94e97ea56c9001980ac6852f69490080b9dc189f8315814'
const ASSEMBLED_MAIN_SHA256 = '8047dee449402deb2300a92a419bbc273edf561e7adf51f55e5ecbc7d40e9115'
const ASSEMBLED_STYLES_SHA256 = '6e7ffe2bdc3cda4ac021f6255fd6330db302721bd6be04f00f0beb541636f044'
const INSTALLED_MAIN_SHA256 = '0a3c35519b881a26cc5226101c83ea933b850e021ffbad662cd939865534d919'
const INSTALLED_STYLES_SHA256 = '8e4c559661f929bd1ce99a5e6d0cd150daf3b3a7721697ba98350d7f295280ae'

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

function verifyHash(content, expectedHash, label) {
  const actualHash = crypto.createHash('sha256').update(content).digest('hex')
  if (actualHash !== expectedHash) {
    throw new Error(`${label}校验失败：expected=${expectedHash} actual=${actualHash}`)
  }
}

const mainSource = readVerifiedSource(recoveredMainPath, RECOVERED_MAIN_SHA256, 'main.js')
const stylesSource = readVerifiedSource(recoveredStylesPath, RECOVERED_STYLES_SHA256, 'styles.css')
const cardScrollSource = fs.readFileSync(path.join(repositoryRoot, 'custom', 'iteration-card-scroll.js'), 'utf8').trimEnd()
const ownerFilterSource = fs.readFileSync(path.join(repositoryRoot, 'custom', 'iteration-owner-filter.js'), 'utf8').trimEnd()
const syncSource = fs.readFileSync(path.join(repositoryRoot, 'custom', 'zentao-sync.js'), 'utf8').trimEnd()
const syncStyles = fs.readFileSync(path.join(repositoryRoot, 'custom', 'zentao-sync.css'), 'utf8').trimEnd()
const insertionPoint = 'qm = pmRenderProjectsBySystem;'
const mainText = mainSource.toString('utf8')
if (mainText.split(insertionPoint).length !== 2) {
  throw new Error('禅道同步入口定位失败：项目首页初始化位置不唯一')
}
const combinedMain = mainText.replace(insertionPoint, `${insertionPoint}\n\n${cardScrollSource}\n\n${ownerFilterSource}\n\n${syncSource}`)
const combinedStyles = `${stylesSource.toString('utf8')}\n\n${syncStyles}\n`
verifyHash(combinedMain, ASSEMBLED_MAIN_SHA256, '安装版补丁前 main.js')
verifyHash(combinedStyles, ASSEMBLED_STYLES_SHA256, '安装版补丁前 styles.css')

// 当前完整定制以 2026-09-23 的安装版 Bundle 为基线；旧恢复基线保留在 vendor 中。
fs.writeFileSync(outputMainPath, combinedMain)
fs.writeFileSync(outputStylesPath, combinedStyles)

// 2026-09-26 安装版的后续人工改动由固定补丁重放，确保重建结果逐字节一致。
execFileSync('git', ['apply', '--unidiff-zero', path.join(repositoryRoot, 'custom', 'installed-20260926.patch')], {
  cwd: repositoryRoot,
  stdio: 'inherit',
})
const releaseMain = fs.readFileSync(outputMainPath)
const releaseStyles = fs.readFileSync(outputStylesPath)
verifyHash(releaseMain, INSTALLED_MAIN_SHA256, '安装版 main.js')
verifyHash(releaseStyles, INSTALLED_STYLES_SHA256, '安装版 styles.css')

new Function('require', 'module', 'exports', releaseMain.toString('utf8'))
process.stdout.write(`Project Manager Enhanced 恢复构建完成：${outputMainPath}\n`)

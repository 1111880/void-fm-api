#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const tmpPath = require('os').tmpdir()

async function start() {
  // 检测是否存在 anonymous_token 文件,没有则生成
  if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
    fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8')
  }
  // 跳过 generateConfig（可能因网络原因失败）
  try {
    const generateConfig = require('./generateConfig')
    await generateConfig()
  } catch(e) {
    console.warn('generateConfig failed, continuing...')
  }
  require('./server').serveNcmApi({
    checkVersion: false,
  })
}
start()

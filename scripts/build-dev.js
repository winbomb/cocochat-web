const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');

// 删除 build 目录
if (fs.existsSync(buildDir)) {
  console.log('正在删除 build 目录...');
  fs.rmSync(buildDir, { recursive: true, force: true });
}

// 设置环境变量
process.env.REACT_APP_BUILD_TIME = Math.floor(Date.now() / 1000);
process.env.GENERATE_SOURCEMAP = 'false';

console.log('正在构建...');
console.log(`REACT_APP_BUILD_TIME=${process.env.REACT_APP_BUILD_TIME}`);

require('./build.js');

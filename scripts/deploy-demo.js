const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const buildDir = path.join(__dirname, '..', 'build');

// 设置环境变量
process.env.REACT_APP_BUILD_TIME = Math.floor(Date.now() / 1000);
process.env.REACT_APP_OFFICIAL_DEMO = 'true';
process.env.GENERATE_SOURCEMAP = 'false';

// 删除 build 目录
if (fs.existsSync(buildDir)) {
  console.log('正在删除 build 目录...');
  fs.rmSync(buildDir, { recursive: true, force: true });
}

console.log('正在构建 demo 版本...');
console.log(`REACT_APP_BUILD_TIME=${process.env.REACT_APP_BUILD_TIME}`);

try {
  execSync('node scripts/build.js', { stdio: 'inherit' });
  console.log('构建成功，正在部署...');
  execSync('gh-pages -d build', { stdio: 'inherit' });
  console.log('部署成功!');
} catch (error) {
  console.error('失败!');
  process.exit(1);
}

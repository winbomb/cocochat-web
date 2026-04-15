// 设置环境变量
process.env.REACT_APP_BUILD_TIME = Math.floor(Date.now() / 1000);

console.log(`REACT_APP_BUILD_TIME=${process.env.REACT_APP_BUILD_TIME}`);

require('./start.js');

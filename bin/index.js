#! /usr/bin/env node

const commander = require('commander');
const {
  version
} = require('../package');
const {
  printHelp
} = require('../src/helper');


// 设置版本号
commander.version(version);

// 处理命令


commander.parse(process.argv);

// 仅输入脚手架名称时
if (process.argv.length === 2) {
  printHelp();
};

// 监听错误命令事件
commander.on('command:*', function() {
  printHelp();
});

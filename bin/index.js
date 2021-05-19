#! /usr/bin/env node

const commander = require('commander');

const {
  version
} = require('../package');

const {
  addCommand,
  printHelp
} = require('../src/helper');

const commands = require("../src/commands/index");

const {
  initDB
} = require("../src/db/initDB");

async function init() {

  // 初始化数据库
  await initDB();

  // 设置版本号
  commander.version(version);

  // 添加命令
  for (let key in commands) {
    addCommand(commands[key]);
  }

  // 解析命令
  commander.parse(process.argv);

  // 仅输入脚手架名称时
  if (process.argv.length === 2) {
    printHelp();
  };

  // 监听错误命令事件
  commander.on('command:*', function() {
    printHelp();
  });
}

init();

const chalk = require('chalk');
const Table = require('cli-table3');

const {
  handleException,
} = require('../helper');

const openDB = require('../db/dao');

let sceneMap = new Map();
let tplList;

async function query() {

  let res = await openDB.query({}, {
    sceneType: 1,
  });

  if (res.state === 'success') {

    res.data.filter(item => item.type && item.type >= 1).forEach(item => {
      sceneMap.set(item.type, item.name);
    });

    tplList = res.data.filter(item => item.sceneType && item.sceneType >= 1);

  } else {
    handleException();
  }

}

async function handleQueryAction() {

  await query();

  let table = new Table({
    head: ['应用场景', '技术栈', '描述', '安装操作或下载链接', '预安装操作'],
    colWidths: [20, 20, 45, 45, 40],
  });

  let arr = tplList.map(item => {
    return [sceneMap.get(item.sceneType), item.name, item.desc, item.install, item.preInstall];
  });

  table.push(...arr);

  console.log(chalk.hex('#3399FF')(table.toString()));

}

module.exports = {
  cmd: "ls",
  desc: "列举当前已有的所有项目模板信息",
  action: function() {
    handleQueryAction();
  },
}

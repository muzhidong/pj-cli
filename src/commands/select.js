const inquirer = require('inquirer');
const autocomplete = require('inquirer-autocomplete-prompt');
const ora = require('ora');
const chalk = require('chalk');

const {
  promptPromise,
  handleException,
  execCmd,
} = require('../helper');

const openDB = require('../db/dao');

// 问题
const {
  selectScene,
  selectTpl,
} = require('../config/questions');

let sceneList;
let tplList;

function handleTemplateFromGit(cmd, spinner){
  const projName = cmd.replace(/.*\/(.*)\.git.*/, '$1');

  let branchName = cmd.replace(/.*\-b (.*) .*/, '$1');
  branchName = branchName === cmd? '' : branchName;

  let command = `rm -rf ${projName}/.git`;
  if(branchName){
    command += ` && mv ${projName} ${branchName}`
  }

  execCmd(command, function() {
    spinner.succeed('下载模板成功');
  })
}

function setUpTpl(tpl) {

  let result = tplList.find(item => item.name === tpl);
  const isClone = /^git clone/g.test(result.install);

  let spinner = ora({
    text: `开始${isClone? '下载模板' : '安装'}...\r\n`,
    color: 'yellow',
  }).start();

  if (result.install) {
    execCmd(`${result.install}`, function() {
      if (isClone) {
        // 删除.git文件夹，并将下载的根文件夹命名为分支名
        handleTemplateFromGit(result.install, spinner);
        return;
      }
      spinner.succeed('安装成功');
    }, function() {
      if(isClone){
        spinner.fail(`下载模板失败。请检查是否有重名的文件夹`);
        return;
      }
      spinner.fail(`安装失败。请先执行该命令，安装必要的脚手架：${chalk.yellow.bold(`${result.preInstall}`)} 或检查是否有重名的文件夹`);
    })
  } else {
    spinner.fail(`安装失败。尚未配置安装命令。`);
  }

}

async function handleTpl(scene) {

  let s = sceneList.find(item => {
    return item.name === scene;
  })

  let res = await openDB.query({
    sceneType: s.type,
  });

  if (res.state === 'success') {
    tplList = res.data;
    selectTpl.pageSize = tplList.length;
    selectTpl.source = function(answersSoFar, input) {
      let tpl = tplList.map(item => item.name).filter(item => item.search(input) > -1);
      return Promise.resolve(tpl);
    };

  } else {
    handleException();
  }

}

async function handleScene() {

  let res = await openDB.query({
    "type": {
      $gte: 1
    }
  });

  if (res.state === 'success') {

    sceneList = res.data;
    selectScene.pageSize = sceneList.length;
    selectScene.source = function(answersSoFar, input) {
      let scenes = sceneList.map(item => item.name).filter(item => item.search(input) > -1);
      return Promise.resolve(scenes);
    };

  } else {
    handleException();
  }

}

async function handleSelectAction() {

  inquirer.registerPrompt('autocomplete', autocomplete);

  await handleScene();
  let res = await promptPromise([selectScene]);
  if (res.state === 'success') {

    await handleTpl(res.data.scene);
    res = await promptPromise([selectTpl]);
    if (res.state === 'success') {
      setUpTpl(res.data.projTpl);
    } else {
      handleException(res.err);
    }

  } else {
    handleException(res.err);
  }

}

module.exports = {
  cmd: "select",
  desc: "选择项目模板并安装",
  action: function() {
    handleSelectAction();
  },
}

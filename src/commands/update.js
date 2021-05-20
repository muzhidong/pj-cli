const inquirer = require('inquirer');
const autocomplete = require('inquirer-autocomplete-prompt');
const chalk = require('chalk');

const {
  promptPromise,
  handleException,
} = require('../helper');

const openDB = require('../db/dao');

// 问题
const {
  selectTpl,
  selectScene,
  updateTplName,
  updateTplDesc,
  updateInstall,
  updatePreInstall,
} = require('../config/questions');

let tplList;
let sceneList;

async function updateData(oldData, newData) {

  let res = await openDB.update(oldData, newData);
  if (res.state === 'success') {
    console.info(chalk.green('更改成功'));
  } else {
    console.info(chalk.red('更改失败'));
    handleException();
  }

}

function initDefault(name, type) {

  let item = tplList.find(item => item.name === name && item.sceneType === type)
  updateTplName.default = item.name;
  updateTplDesc.default = item.desc;
  updateInstall.default = item.install;
  updatePreInstall.default = item.preInstall;
  return item;

}

async function queryScene(type) {

  let res = await openDB.query({
    "type": {
      $gte: 1
    }
  });

  if (res.state === 'success') {

    sceneList = res.data;
    selectScene.pageSize = sceneList.length;
    selectScene.message = '请选择更改后的项目模板场景：';
    selectScene.default = sceneList.find(item => item.type === type).name;
    selectScene.source = function(answersSoFar, input) {
      let scenes = sceneList.map(item => item.name).filter(item => item.search(input) > -1);
      return Promise.resolve(scenes);
    };

  } else {
    handleException();
  }

}

async function queryTpl() {

  let res = await openDB.query({
    "sceneType": {
      $gte: 1,
    },
  });

  if (res.state === 'success') {
    tplList = res.data;
    selectTpl.pageSize = 10;
    selectTpl.source = function(answersSoFar, input) {
      let tpl = tplList.map(item => item.name).filter(item => item.search(input) > -1);
      return Promise.resolve(tpl);
    };

  } else {
    handleException();
  }

}

async function handleUpdateAction() {

  inquirer.registerPrompt('autocomplete', autocomplete);

  await queryTpl();

  let res = await promptPromise([selectTpl]);
  if (res.state === 'success') {

    let projTpl = res.data.projTpl;

    let sceneType = tplList.find(item => item.name === projTpl).sceneType;

    await queryScene(sceneType);

    let oldData = initDefault(projTpl, sceneType);

    res = await promptPromise([selectScene, updateTplName, updateTplDesc, updateInstall, updatePreInstall]);
    if (res.state === 'success') {

      let {
        scene,
        updateTplName,
        updateTplDesc,
        updateInstall,
        updatePreInstall,
      } = res.data;

      updateData(oldData, {
        sceneType: sceneList.find(item => item.name === scene).type,
        name: updateTplName,
        desc: updateTplDesc,
        install: updateInstall,
        preInstall: updatePreInstall,
      })

    } else {
      handleException();
    }

  } else {
    handleException();
  }

}

module.exports = {
  cmd: "up",
  desc: "更改项目模板信息",
  action: function() {
    handleUpdateAction();
  },
}

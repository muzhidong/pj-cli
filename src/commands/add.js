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
  operateScene,
  addScene,
  selectScene,
  addTplName,
  addTplDesc,
  addInstall,
  addPreInstall,
} = require('../config/questions');

let sceneList;

async function insertData(data) {
  let res = await openDB.add(data);
  if (res.state === 'success') {
    console.info(chalk.green('添加成功'));
  } else {
    console.info(chalk.red('添加失败'));
    handleException();
  }
}

async function insertScene(name) {

  let type = sceneList.length + 1;
  let res = await openDB.add({
    type,
    name
  });

  if (res.state === 'success') {
    return Promise.resolve(type);
  } else {
    handleException();
  }
}

async function queryScene() {

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

async function handleAddAction() {

  let res = await promptPromise([operateScene]);
  if (res.state === 'success') {

    let val = res.data.sceneOpType;
    // 1表示新增，2表示选择已有
    let opType = val === '新增' ? 1 : 2;

    let questions = opType === 1 ? [addScene] : [selectScene];
    questions = questions.concat([addTplName, addTplDesc, addInstall, addPreInstall]);

    if (opType === 2) {

      inquirer.registerPrompt('autocomplete', autocomplete);

      await queryScene();
    }

    res = await promptPromise(questions);
    if (res.state === 'success') {
      let {
        addScene,
        scene,
        addTplName,
        addTplDesc,
        addInstall,
        addPreInstall,
      } = res.data;

      let sceneType;
      if (opType === 1) {
        sceneType = await insertScene(addScene);
      } else {
        sceneType = sceneList.find(item => {
          return item.name === scene;
        }).type;
      }

      insertData({
        sceneType,
        name: addTplName,
        desc: addTplDesc,
        install: addInstall,
        preInstall: addPreInstall,
      });

    } else {
      handleException();
    }

  } else {
    handleException();
  }

}

module.exports = {
  cmd: "add",
  desc: "添加项目模板",
  action: function() {
    handleAddAction();
  },
}

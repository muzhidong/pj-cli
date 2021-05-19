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
  selectScene,
  selectTpl,
} = require('../config/questions');

let sceneList;
let tplList;

async function deleteTpl(projTpl) {

  let result = tplList.find(item => item.name === projTpl);
  let res = await openDB.remove(result);
  console.info(`${res.state === 'success'? chalk.green('删除成功'):chalk.red('删除失败')}`);

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

async function handleDelAction() {

  inquirer.registerPrompt('autocomplete', autocomplete);

  await handleScene();
  let res = await promptPromise([selectScene]);
  if (res.state === 'success') {

    await handleTpl(res.data.scene);
    res = await promptPromise([selectTpl]);
    if (res.state === 'success') {
      deleteTpl(res.data.projTpl);
    } else {
      handleException(res.err);
    }

  } else {
    handleException(res.err);
  }

}

module.exports = {
  cmd: "del",
  desc: "删除某一项目模板",
  action: function() {
    handleDelAction();
  },
}

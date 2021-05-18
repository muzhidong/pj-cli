const inquirer = require('inquirer');
const autocomplete = require('inquirer-autocomplete-prompt');

// 问题配置数据
const {
  selectScene,
  sceneMap,
} = require('../config/questions');

const {
  promptPromise,
  handleException,
} = require('../helper');

function setUpTpl(tpl) {
  console.log(tpl);
}

async function handleSelectAction() {

  inquirer.registerPrompt('autocomplete', autocomplete);

  let res = await promptPromise([selectScene]);
  if (res.state === 'success') {

    let choices = sceneMap.get(res.data.scene);
    res = await promptPromise([{
      type: 'autocomplete',
      name: 'projTpl',
      message: '请选择或搜索项目模板：',
      pageSize: choices.length,
      source: function(answersSoFar, input) {
        let tpl = choices.filter(item => item.search(input) > -1);
        return Promise.resolve(tpl);
      },
    }]);

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
  desc: "请选择您要的项目模板",
  action: function() {
    handleSelectAction();
  },
}

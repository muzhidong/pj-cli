const inquirer = require('inquirer');
const autocomplete = require('inquirer-autocomplete-prompt');

const {
  promptPromise,
  handleException,
} = require('../helper');

const openDB = require('../db/dao');

// 问题
const {

} = require('../config/questions');

async function handleDelAction() {

}

module.exports = {
  cmd: "del",
  desc: "删除某一项目模板",
  action: function() {
    handleDelAction();
  },
}

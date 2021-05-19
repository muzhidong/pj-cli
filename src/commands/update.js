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

async function handleUpdateAction() {

}

module.exports = {
  cmd: "up",
  desc: "更改项目模板信息",
  action: function() {
    handleUpdateAction();
  },
}

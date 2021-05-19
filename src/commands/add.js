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

async function handleAddAction() {

}

module.exports = {
  cmd: "add",
  desc: "添加项目模板",
  action: function() {
    handleAddAction();
  },
}

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

async function handleQueryAction() {

}

module.exports = {
  cmd: "ls",
  desc: "列举当前已有的所有项目模板信息",
  action: function() {
    handleQueryAction();
  },
}

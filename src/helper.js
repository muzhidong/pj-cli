const commander = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const {
  execSync,
} = require('child_process');

// 添加命令
function addCommand(param = {
  cmd: "",
  alias: "",
  desc: "",
  action,
}) {

  const {
    cmd = '',
    alias = '',
    desc = '',
    action,
  } = param;
  const commanderRef = commander.command(cmd).alias(alias).description(desc);

  const type = toString.call(action);
  switch (type) {
    case "[object Function]":
      commanderRef.action(action);
      break;
    case "[object Array]":
      for (let item of action) {
        commanderRef.option(...item.option);
        commanderRef.action(item.action);
      }
      break;
    default:
      break;
  }
}

// 打印帮助信息
function printHelp() {
  commander.help((info) => {
    console.info(info);
    return "请根据以上提供的的选项或命令使用工具。\r\n";
  });
}

// Promise化
function promptPromise(question) {

  return new Promise((resolve, reject) => {
    inquirer.prompt(question).then((res) => {
      resolve({
        state: 'success',
        data: res
      });
    }).catch(err => {
      resolve({
        state: 'error',
        err,
      });
    });
  })

}

// 错误统一处理
function handleException(err) {
  console.log(chalk.red.bold('程序出现异常，请重新执行'));
  process.exit(1);
}

// 执行命令
function execCmd(cmd, successCb, errorCb) {
  try {
    execSync(cmd, { stdio: 'inherit'});
    successCb && successCb();
  } catch (error) {
    if (errorCb) {
      errorCb();
    } else {
      handleException(error);
    }
  }
}

// 警醒
function warn(content) {
  console.log(chalk.hex('#ffa500').bold(content));
}

module.exports = {
  addCommand,
  printHelp,
  promptPromise,
  handleException,
  execCmd,
  warn,
}

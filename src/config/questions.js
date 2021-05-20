const {
  warn
} = require('../helper');

// 选择场景
const selectScene = {
  type: 'autocomplete',
  name: 'scene',
  message: '请选择或搜索项目的使用场景：',
  source: function(answersSoFar, input) {},
};

// 选择项目模板
const selectTpl = {
  type: 'autocomplete',
  name: 'projTpl',
  message: '请选择或搜索项目模板：',
  source: function(answersSoFar, input) {},
}

// 场景操作
const operateScene = {
  type: 'checkbox',
  name: 'sceneOpType',
  message: '场景是新增还是选择已有？',
  choices: ['新增', '去选择'],
}

// 新增场景
const addScene = {
  type: 'input',
  name: 'addScene',
  message: '场景名称：',
  validate: function(val) {
    if (val) {
      return true;
    } else {
      warn('场景不能为空');
      return false;
    }
  }
}

// 新增项目模板名称
const addTplName = {
  type: 'input',
  name: 'addTplName',
  message: '项目模板名称：',
  validate: function(val) {
    if (val) {
      return true;
    } else {
      warn('项目模板名不能为空');
      return false;
    }
  }
}

// 新增项目模板描述
const addTplDesc = {
  type: 'input',
  name: 'addTplDesc',
  message: '项目模板描述：',
}

// 新增项目模板安装命令
const addInstall = {
  type: 'input',
  name: 'addInstall',
  message: '项目模板安装命令：',
}

// 新增项目模板预安装命令
const addPreInstall = {
  type: 'input',
  name: 'addPreInstall',
  message: '项目模板预安装命令：',
}

// 更改项目模板名称
const updateTplName = {
  type: 'input',
  name: 'updateTplName',
  message: '更改项目模板名称为：',
  validate: function(val) {
    if (val) {
      return true;
    } else {
      warn('项目模板名不能为空');
      return false;
    }
  }
}

// 更改项目模板描述
const updateTplDesc = {
  type: 'input',
  name: 'updateTplDesc',
  message: '更改项目模板描述为：',
}

// 更改项目模板安装命令
const updateInstall = {
  type: 'input',
  name: 'updateInstall',
  message: '更改项目模板安装命令为：',
}

// 更改项目模板预安装命令
const updatePreInstall = {
  type: 'input',
  name: 'updatePreInstall',
  message: '更改项目模板预安装命令为：',
}


module.exports = {

  selectScene,
  selectTpl,

  operateScene,
  addScene,
  addTplName,
  addTplDesc,
  addInstall,
  addPreInstall,

  updateTplName,
  updateTplDesc,
  updateInstall,
  updatePreInstall,

}

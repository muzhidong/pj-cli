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

module.exports = {
  selectScene,
  selectTpl,
}

// 场景列表
const SCENE_LIST = ['MVVM应用', '集成客户端应用', 'SSR应用', '中台应用', '博客网站应用', '服务侧应用', '移动侧APP', 'PC侧APP'];

// MVVM场景
const MVVM = ['Vue', 'React', 'Angular'];

// 集成场景
const INTEGRATION = ['Dva', 'Umi'];

// SSR场景
const SSR = ['Nuxt', 'Next'];

// 中台场景
const MIDDLE_GROUND = ['AntDesignPro'];

// 博客场景
const BLOG = ['VuePress', 'Hexo'];

// 服务侧
const SERVER = ['Express', 'Loa', 'Egg', 'Nest'];

// 移动侧
const MOBILE = ['ReactNative', 'Weex'];

// PC侧
const PC = ['Electron'];


// 选择场景
const selectScene = {
  type: 'autocomplete',
  name: 'scene',
  message: '请选择或搜索项目的使用场景：',
  pageSize: SCENE_LIST.length,
  source: function(answersSoFar, input) {
    let scenes = SCENE_LIST.filter(item => item.search(input) > -1);
    return Promise.resolve(scenes);
  },
};

// 映射
const sceneMap = new Map();
// 必须与SCENE_LIST一一对应
const arr = [MVVM, INTEGRATION, SSR, MIDDLE_GROUND, BLOG, SERVER, MOBILE, PC];
for (let idx in SCENE_LIST) {
  sceneMap.set(SCENE_LIST[idx], arr[idx]);
}

module.exports = {
  selectScene,
  sceneMap,
}

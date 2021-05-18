/*
 * @Author: Liu Xiaodong
 * @Date: 2021-01-20 10:42:40
 * @LastEditTime: 2021-01-20 10:56:03
 * @Description: 辅助工具
 */

const commander = require('commander');
const br = "\r\n";
exports.printHelp = function() {
  commander.help((info) => {
    console.log(info);
    return `目前该微信小程序脚手架不断完善中，如果觉得不错，欢迎到Github加个星吧。${br}`;
  });
}

# mpj-cli

## 功能
- 默认提供前端项目的常用模板，方便开发者快速选择、下载安装；
- 支持**本地**添加额外的项目模板，进行扩展；

## yarn安装
```bash
yarn global add mpj-cli
```

## 命令
- select

  选择项目模板并安装

- ls

  列举当前已有的所有项目模板信息

- add

  添加项目模板

- del

  删除某一项目模板

- up

  更改项目模板信息

## 选项
- -V/--version

  打印版本号

- -h/--help

  显示命令帮助信息

<!-- 
## TODO
- 后续补充通用项目模板，如VuePress博客项目、React技术栈模板、Vue技术栈模板、PWA项目模板、Koa项目模板。 

## 问题
发布包避免使用`postinstall`钩子，对于`yarn`安装不友好。因为`yarn`会对已安装的包存档缓存，减少安装大小，而`postinstall`会破坏这一规则，告知`yarn`这些包可能改变目录，迫使它们放到磁盘物理位置，导致安装更重更慢，不稳定。
```json
"scripts": {
  // 同步修改的依赖
  "postinstall": "patch-package",
  // 生成依赖修改的增量文件
  "patch": "patch-package"
}
```
-->

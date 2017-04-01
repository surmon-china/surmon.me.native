# surmon.me.native
A react-native applaction for surmon.me

## Build Setup

```bash
# install dependencies
$ npm install # Or yarn install

# 清除缓存并开启服务器（不执行编译）
$ npm run dev

# 编译IOS并开启服务器
$ npm run dev:ios

# 编译Android并开启服务器
$ npm run dev:android

# 替换debug插件，仅项目初次安装完后执行
$ npm run postinstall

# 启用测试服务
$ npm run test
```

## 坑
- run-ios失败的时候，可以需要删除ios/build文件夹重新编译
- run起来提示，无法找到文件夹的时候，关掉js包服务器，在项目目录下执行`npm run dev`，这是由于babel的别名插件未通过`npm start`启动服务器造成的
- iconsa略复杂
- 项目出现诸多异常的时候，直接执行`. reset.sh`会自动清理缓存并重装，而后执行命令即可
- react-native-vector-icons - Issues：
   * [安装说明](https://github.com/oblador/react-native-vector-icons)
   * Podfile的更新需要使用`gem`安装`cocoapods`
      + http://code4app.com/article/cocoapods-install-usage
      + https://github.com/CocoaPods/CocoaPods/issues/3692
      + https://github.com/oblador/react-native-vector-icons/issues/394

## 目录结构
```
surmon.me.native/
   |
   ├──ios/                       * IOS
   |
   ├──android/                   * Android
   |
   ├──src/                       * 主程序
   │   │
   │   │──components             * 所有组件
   │   │
   │   └──pages                  * 所有页面
   │   │
   │   └──images                 * 本地图片资源
   │   │
   │   └──utils                  * Utils, custom libraries, functions
   │   │
   │   └──styles                 * 所有样式变量集中管理
   │   │
   │   └──config                 * 全局配置
   │   │
   │   └──index.js               * App入口
   │
   │──package.json               * 包信息
   │
   │──.babelrc                   * Babel配置
   │
   └──reset.sj                   * 清空项目依赖并重新安装
```

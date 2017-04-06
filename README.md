# surmon.me.native
A react-native applaction for [surmon.me](https://surmon.me)

一个非常适合入门学习的react-native项目，代码清晰、结构合理。

相关的其他项目：[Web（Nuxt.js）](https://github.com/surmon-china/surmon.me)、[服务端（Node.js）](https://github.com/surmon-china/nodepress)、[Web后台（Angular4）](https://github.com/surmon-china/angular-admin)

## Screenshot

### IOS

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshot/ios/full-01.jpg)

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshot/ios/full-02.jpg)

### Android

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshot/android/full-01.jpg)

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshot/android/full-02.jpg)

## 页面结构
- Welcome(安卓下首屏启动页)
   + 1.666秒后跳渲染布局组件
- Home
   + 文章列表组件
   + 可下拉刷新
   + 上拉点击加载更多
- Detail 文章详情页
   + markdown解析器
- Projects
   + 一个Webview组件
- About
   + 一些图标组件

## 程序结构
- 组件:components（公用组件抽象）
- 页面:pages（主程序的主要构成部分）
- 布局:layouts（既将两端公用的布局进行封装、又可以用于不同页面下的不同布局，类似nuxt.js中的layout）
- 服务:service（公共服务抽象，如：网络、缓存...）
- 样式:styles（类似Web端对样式变量的内聚管理，如果项目较大，路由也可类似管理）
- 扩展:utils（将任何不涉及依赖的复用纯函数进行封装）

## 坑和经验

### 项目问题
- run-ios失败的时候，可以需要删除ios/build文件夹重新编译
- 不再使用`babel-plugin-module-resolver`插件，使用内fbjs模块管理别名
- 项目出现诸多异常的时候，直接执行`. reset.sh`会自动清理缓存并重装，而后执行命令即可

### Icons图标库问题
安装完毕若有异常，则需要执行`rnpm link`/`react-native link`

### Markdown解析库异常
使用了[react-native-simple-markdown](https://github.com/CharlesMangwa/react-native-simple-markdown)，由于其暂不支持多层列表，故使用黑名单去除了list的解析，同时由于其内部的组件机制，导致无法使用[react-native-fit-image](https://github.com/huiseoul/react-native-fit-image)组件

### IOS
- react-native-vector-icons - Issues：
   * [安装说明](https://github.com/oblador/react-native-vector-icons)
   * Podfile的更新需要使用`gem`安装`cocoapods`
      + http://code4app.com/article/cocoapods-install-usage
      + https://github.com/CocoaPods/CocoaPods/issues/3692
      + https://github.com/oblador/react-native-vector-icons/issues/394
- AppName和启动页修改 http://www.cnblogs.com/allenxieyusheng/p/5802179.html
- App图标尺寸 
   + http://blog.csdn.net/leiyu231/article/details/52830151
   + https://medium.com/the-react-native-log/change-default-launch-screen-in-react-native-ios-app-544f94f1e947
- 打包为IPA包的步骤 
   + http://stackoverflow.com/questions/35476349/how-to-build-ipa-for-react-native
   + 中文版 http://www.jianshu.com/p/7683efdd31f5

### Android
- 打包为APK http://reactnative.cn/docs/0.43/signed-apk-android.html
- 安卓打包签名问题
   + Build failed with an exception：https://github.com/soliury/noder-react-native/issues/44
   + http://reactnative.cn/docs/0.42/signed-apk-android.html#content
- Genymotion模拟器安装和设置
   + https://facebook.github.io/react-native/releases/0.23/docs/android-setup.html
   + Genymotion模拟器SDK未知未手动指定会导致无法installdebug http://stackoverflow.com/questions/35959350/react-native-android-genymotion-adb-server-didnt-ack
- 找不到安卓设备或运行巨慢
   + https://github.com/facebook/react-native/issues/2711
- 版本不兼容问题
   + http://stackoverflow.com/questions/34749299/gradle-version-2-2-is-required-current-version-is-2-10
- AppName修改路径 android/app/src/main/res/values/strings.xml
- AppName和启动页修改 
   + http://www.cnblogs.com/allenxieyusheng/p/5804023.html
   + http://stackoverflow.com/questions/33390013/how-to-create-some-kind-of-splash-screen-launching-screen-which-disappears-afte


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
   │   └──utils                  * Utils
   │   │
   │   └──styles                 * 所有样式变量集中管理
   │   │
   │   └──service                * 封装服务性质的包，如api网络服务、全局配置、缓存封装..
   │   │
   │   └──index.js               * App入口
   │
   │──package.json               * 包信息
   │
   │──.babelrc                   * Babel配置
   │
   └──reset.sh                   * 清空项目依赖并重新安装
```


## Build Setup

```bash
# install dependencies
$ npm install # Or yarn install

# 清除缓存并开启服务器（不执行客户端）
$ npm run dev

# 编译两端并开启服务器（执行前需开启安卓模拟器）
$ npm run dev:all

# 编译IOS并开启服务器
$ npm run dev:ios

# 编译Android并开启服务器（执行前需开启安卓模拟器）
$ npm run dev:android

# 替换debug插件，仅项目初次安装完后执行
$ npm run postinstall

# 启用测试服务
$ npm run test
```

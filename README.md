# surmon.me.native 

[![](https://badge.juejin.im/entry/58e53578a0bb9f0069055b23/likes.svg?style=flat-square)](https://juejin.im/entry/58e53578a0bb9f0069055b23/detail)
[![GitHub issues](https://img.shields.io/github/issues/surmon-china/surmon.me.native.svg?style=flat-square)](https://github.com/surmon-china/surmon.me.native/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/surmon.me.native.svg?style=flat-square)](https://github.com/surmon-china/surmon.me.native/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/surmon.me.native.svg?style=flat-square)](https://github.com/surmon-china/surmon.me.native/stargazers)

A blog applaction for [Surmon.me](https://surmon.me) by [react-native](https://github.com/facebook/react-native).

相关的其他项目：
- [Web（Nuxt）](https://github.com/surmon-china/surmon.me)
- [服务端（Nodejs）](https://github.com/surmon-china/nodepress)
- [Web后台（Angular）](https://github.com/surmon-china/angular-admin)

## Screenshot

### IOS

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshot/ios/full-01.jpg)

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshot/ios/full-02.jpg)

### Android

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshot/android/full-01.jpg)

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshot/android/full-02.jpg)


## 设计细节
- 职能单元的划分：...
- Markdown 的实现：...
- 动画效果缺陷：...
- Typescript 的应用：...
- 两端异同方案：
  - Android 只能通过自定义方式来定义启动屏，所以安卓上多了一层

## 业务结构
- **Welcome**
   + 安卓下首屏启动页（1.666秒后跳渲染布局组件）
- **Layout**
   + 总布局组件
- **Articles**
   + 文章列表组件
   + 可下拉刷新
   + 上拉点击加载更多
- **Detail** 
   + 文章详情页（markdown解析器）
- **Projects**
   + Webview组件
- **About**
   + 一些图标组件
- **component/navbar**
   + 顶部栏组件（StatusBar）
- **component/menu**
   + 菜单栏组件（DrawerLayoutAndroid/TabBarIOS）的封装
- **component/AutoActivityIndicator**
   + 加载指示器组件（ActivityIndicator）的封装
- **component/articel**
   + 文章列表所需的组件
- 组件:components（公用组件抽象）
- 页面:pages（主程序的主要构成部分）
- 布局:layouts（既将两端公用的布局进行封装、又可以用于不同页面下的不同布局，类似nuxt.js中的layout）
- 服务:service（公共服务抽象，如：网络、缓存...）
- 样式:styles（类似Web端对样式变量的内聚管理，如果项目较大，路由也可类似管理）
- 扩展:utils（将任何不涉及依赖的复用纯函数进行封装）

## 开始开发

当你决定要开始开发，或开发遇到异常找不到答案时，请打开为你准备的万能锦囊： [ISSUE_COLLECTION.md](https://github.com/surmon-china/surmon.me.native/blob/master/ISSUE_COLLECTION.md)


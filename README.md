# surmon.me.native 

[![](https://badge.juejin.im/entry/58e53578a0bb9f0069055b23/likes.svg?style=flat-square)](https://juejin.im/entry/58e53578a0bb9f0069055b23/detail)
[![GitHub issues](https://img.shields.io/github/issues/surmon-china/surmon.me.native.svg?style=flat-square)](https://github.com/surmon-china/surmon.me.native/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/surmon.me.native.svg?style=flat-square)](https://github.com/surmon-china/surmon.me.native/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/surmon.me.native.svg?style=flat-square)](https://github.com/surmon-china/surmon.me.native/stargazers)

A blog applaction for [Surmon.me](https://surmon.me) by [react-native](https://github.com/facebook/react-native).

#### 相关的其他项目：
- SRE service: [sre.surmon.me](https://github.com/surmon-china/sre.surmon.me)
- Web client for user: [surmon.me](https://github.com/surmon-china/surmon.me) By Nuxt.js(Vue)
- Web client for admin: [angular-admin](https://github.com/surmon-china/angular-admin) powered by Angular + Bootstrap4
- Web Service: [nodepress](https://github.com/surmon-china/nodepress) powered by nestjs

## Screenshot

### IOS

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/ios/p-01.jpg)

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/ios/p-02.jpg)

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/ios/p-03.jpg)

### Android

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/android/p-01.jpg)

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/android/p-02.jpg)

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/android/p-03.jpg)


## 业务结构
- **assets**
   + 静态资源（字体、图片）
- **types**
   + 被公共消费的任何类型扩展
- **constants**
   + 被公共消费的任何直接量
- **languages** 
   + i18n 语言包
- **style**
   + 类似 Web 平台的 CSS 集合，包含字体、颜色、尺寸、混入
- **services**
   + 所有会产生（数据、UI）IO 的数据交互接口
- **utils**
   + 不发生 IO 行为的所有工具性质的 pure function
- **components**
   + 所有公共组件（全局、局部、布局）
- **pages**
   + 所有被导航器消费的页面级组件
- **stores**
   + 全局性质的公共 store
- **config**
   + App 全局配置
- **routes**
   + App 路由表（枚举量）
- **index**
   + 不涉及 UI 风格的导航栈实例及配置

## 设计细节
- darkTheme：
   + 使用 Mobx 的 [observable](https://github.com/surmon-china/surmon.me.native/blob/master/style/colors.ts) 实现配色更新
- Markdown 的实现：
   + 使用 [Webview 注入的形式实现 Markdown 渲染](https://github.com/surmon-china/surmon.me.native/blob/master/components/markdown/index.tsx)，及 [响应式主题切换](https://github.com/surmon-china/surmon.me.native/blob/master/components/markdown/style.ts)
- i18n：
   + 同样使用 Mobx 的 [observable 实现语言更新](https://github.com/surmon-china/surmon.me.native/blob/master/services/i18n.ts)
- 了解更多的实现细节：
   + 阅读源码
   + [读博客](https://surmon.me/article/)

## 开始开发

当你决定要开始开发，或开发遇到异常找不到答案时，请打开为你准备的万能锦囊： [ISSUE_COLLECTION.md](https://github.com/surmon-china/surmon.me.native/blob/master/ISSUE_COLLECTION.md)

<p align="center">
  <img src="https://raw.githubusercontent.com/surmon-china/surmon.me/master/static/icon.png" height="90" alt="surmon.me logo" />
</p>

# surmon.me.native
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/surmon.me.native.svg?style=for-the-badge)](https://github.com/surmon-china/surmon.me.native/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/surmon-china/surmon.me.native.svg?style=for-the-badge)](https://github.com/surmon-china/surmon.me.native/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/surmon.me.native.svg?style=for-the-badge)](https://github.com/surmon-china/surmon.me.native/network)
[![GitHub license](https://img.shields.io/github/license/surmon-china/surmon.me.native.svg?style=for-the-badge)](https://github.com/surmon-china/surmon.me.native)

## Introduction

**Applaction for [Surmon.me](https://surmon.me) blog, powered by [react-native](https://github.com/facebook/react-native).**

**Onlint site:** https://surmon.me/app

<p align="center">
  <img src="https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/dist/download-url.png" height="300" alt="qrcode" />
  <br>
  <strong>
    <span>Scan QRcode or</span>
    <a href="https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/dist/surmon.me.apk">download Android apk</a>
  </strong>
</p>

---

**其他相关项目：**
- **RESTful API service:** [nodepress](https://github.com/surmon-china/nodepress) powered by [nestjs](https://github.com/nestjs/nest)
- **web client for user:** [surmon.me](https://github.com/surmon-china/surmon.me) powered by [Nuxt.js](https://github.com/nuxt/nuxt.js)
- **web client for admin:** [angular-admin](https://github.com/surmon-china/angular-admin) powered by [Angular](https://github.com/angular/angular) & [Bootstrap](https://github.com/twbs/bootstrap)
- **SRE service:** [sre.surmon.me](https://github.com/surmon-china/sre.surmon.me)

---

**IOS Runtime**

<a href="https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/g-1.gif" target="_blank">
  <img src="https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/g-1.gif" width="260px" />
</a>
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
<a href="https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/g-2.gif" target="_blank">
  <img src="https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/g-2.gif" width="260px" />
</a>
<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
<a href="https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/g-3.gif" target="_blank">
  <img src="https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/g-3.gif" width="260px" />
</a>

## Screenshot

### IOS

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/ios/p-1.jpg)

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/ios/p-2.jpg)

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/ios/p-3.jpg)

### Android

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/android/p-1.jpg)

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/android/p-2.jpg)

![](https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/screenshots/android/p-3.jpg)


## 业务结构
- **[assets](https://github.com/surmon-china/surmon.me.native/tree/master/src/assets)**
   + 静态资源（字体、图片）
- **[types](https://github.com/surmon-china/surmon.me.native/tree/master/src/types)**
   + 被公共消费的任何类型扩展
- **[constants](https://github.com/surmon-china/surmon.me.native/tree/master/src/constants)**
   + 被公共消费的任何直接量
- **[languages](https://github.com/surmon-china/surmon.me.native/tree/master/src/languages)**
   + i18n 语言包
- **[style](https://github.com/surmon-china/surmon.me.native/tree/master/src/style)**
   + 类似 Web 平台的 CSS 集合，包含字体、颜色、尺寸、混入
- **[services](https://github.com/surmon-china/surmon.me.native/tree/master/src/services)**
   + 所有会产生（数据、UI）IO 的数据交互接口
- **[utils](https://github.com/surmon-china/surmon.me.native/tree/master/src/utils)**
   + 不发生 IO 行为的所有工具性质的 pure function
- **[components](https://github.com/surmon-china/surmon.me.native/tree/master/src/components)**
   + 所有公共组件（全局、局部、布局）
- **[pages](https://github.com/surmon-china/surmon.me.native/tree/master/src/pages)**
   + 所有被导航器消费的页面级组件
- **[stores](https://github.com/surmon-china/surmon.me.native/tree/master/src/stores)**
   + 全局性质的公共 store
- **[config](https://github.com/surmon-china/surmon.me.native/blob/master/src/config.ts)**
   + App 全局配置
- **[routes](https://github.com/surmon-china/surmon.me.native/blob/master/src/routes.ts)**
   + App 路由表（枚举量）
- **[index](https://github.com/surmon-china/surmon.me.native/blob/master/src/index.tsx)**
   + 不涉及 UI 风格的导航栈实例及配置

## 设计细节
- darkTheme：
   + [使用 Mobx 的 observable 实现配色更新](https://github.com/surmon-china/surmon.me.native/blob/master/src/style/colors.ts#L83)
- Markdown 的实现：
   + [使用 Webview 注入的形式实现 Markdown 渲染](https://github.com/surmon-china/surmon.me.native/blob/master/src/components/common/markdown/index.tsx#L47)，及 [响应式主题切换](https://github.com/surmon-china/surmon.me.native/blob/master/src/components/common/markdown/styles.ts#L13)
- i18n：
   + [同样使用 Mobx 的 observable 实现语言实时响应](https://github.com/surmon-china/surmon.me.native/blob/master/src/services/i18n.ts#L51)
- 本地存储：
  + 使用 [AsyncStorage](https://github.com/surmon-china/surmon.me.native/blob/master/src/services/storage.ts) 及本机数据 [初始化用户数据](https://github.com/surmon-china/surmon.me.native/blob/master/src/stores/option.ts#L24)
- 了解更多的实现细节：
   + 阅读源码
   + [读博客](https://surmon.me/article/145)

## 开始开发

**当你决定要开始开发，或开发遇到异常找不到答案时，请打开为你准备的万能锦囊： [ISSUE_COLLECTION.md](https://github.com/surmon-china/surmon.me.native/blob/master/ISSUE_COLLECTION.md)**

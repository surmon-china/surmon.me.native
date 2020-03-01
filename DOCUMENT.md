
### Upgrade CLI

```bash
npm uninstall -g react-native-cli
npm i -g @react-native-community/cli
```

### Init

```bash
# react-native init surmon_me_native --template react-native-template-typescript
git clone git@github.com:surmon-china/surmon.me.native.git

# Install dependencies
yarn

# IOS
cd ios && pod install && cd ..

# Android
# https://reactnavigation.org/docs/getting-started/#installing-dependencies-into-a-bare-react-native-project

# link assets
react-native link

yarn ios # or react-native run-ios --device "Surmon’s iPhone 18 pro"
yarn android
```

### Run

```bash
# 清除缓存并开启服务器（不执行客户端）
yarn start

# 编译 IOS 并开启服务器
yarn ios

# 编译 Android 并开启服务器
yarn android

# 编译两端并开启服务器
yarn all

# 编译 IOS 的包并输出到 ./ios/bundle -> XCode -> Product -> Archive
npm run build:ios

# 编译 Android 的包并输出到 android/app/build/outputs/apk/app-release.apk
npm run build:android
npm run release:android

# 测试
npm run lint
npm run test
```

### Relase

#### Android

```bash
# generate app-release-key.keystore
yarn release:android
```

#### IOS

1. Product -> Schema -> Edit Schema
2. Build Config: relase & debug executable = false
3. Select your device & Run

### Issues

##### Unrecognized font family 'DIN-Regular'

```bash
react-native link
```

### Links

[Sentry.io for react-native](https://docs.sentry.io/platforms/react-native/?_ga=2.245117389.977930320.1583413657-1615820818.1583413657)
1. `yarn add @sentry/react-native`
2. `yarn sentry-wizard -i reactNative -p ios android`
3. `cd ios && pod install`

Version
- `yarn postversion`
- ~~`build.gradle`~~
- ~~`info.plist`~~

无障碍支持（accessibility）：
- https://reactnative.cn/docs/accessibility.html
- https://code.fb.com/ios/making-react-native-apps-accessible/

启动屏：
- https://juejin.im/entry/59c741adf265da066a1043b0
- https://github.com/crazycodeboy/react-native-splash-screen

[App icon](https://medium.com/@scottianstewart/react-native-add-app-icons-and-launch-screens-onto-ios-and-android-apps-3bfbc20b7d4c)

[Display name](https://stackoverflow.com/a/38582258)
- ios: `/ios/surmon_me/Info.plist:CFBundleDisplayName`
- android: `android/app/src/main/res/values/strings.xml`

##### IOS
- [官方提供的屏幕尺寸标准](https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/launch-screen/)
- [开发者证书签名的区别](https://www.pgyer.com/doc/view/app_developer_account)
- 打包为 Ipa 包（没有 $99 || $299 的账户是无法 Export 的）
   + http://stackoverflow.com/questions/35476349/how-to-build-ipa-for-react-native
   + http://www.jianshu.com/p/a19d2d0747ee
   + https://blog.whezh.com/react-native-ios-bundle/

##### Android
- [Icon 转换生成工具](http://romannurik.github.io/AndroidAssetStudio/icons-generic.html)
- [ANDROID_HOME 配置](https://stackoverflow.com/questions/19986214/setting-android-home-enviromental-variable-on-mac-os-x)
- [打包为APK](http://reactnative.cn/docs/0.43/signed-apk-android.html)
- [安卓打包签名问题](https://www.jianshu.com/p/32a99c273be1)
- 生成证书：
   + `keytool -genkey -v -keystore app-release-key.keystore -alias surmon-app -keyalg RSA -keysize 2048 -validity 10000`
- 真机调试：
   + 呼出菜单：`adb shell input keyevent 82`
   + 映射 IP：`adb -s [device-id] reverse tcp:8081 tcp:8081`


### 业务结构
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
- **[index](https://github.com/surmon-china/surmon.me.native/blob/master/src/app.tsx)**
   + 不涉及 UI 风格的导航栈实例及配置

### 设计细节
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

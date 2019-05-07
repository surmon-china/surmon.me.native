
### Init

```bash
react-native init surmon_me --template typescript
```

### Run

```bash
# install dependencies
npm install # Or yarn install

# 清除缓存并开启服务器（不执行客户端）
npm run dev

# 编译 IOS 并开启服务器
npm run dev:ios

# 编译 Android 并开启服务器（执行前需开启安卓模拟器）
npm run dev:android

# 编译两端并开启服务器（执行前需开启安卓模拟器）
npm run dev:all

# 编译 IOS 的包并输出到 ./ios/bundle -> XCode -> Product -> Archive
npm run build:ios

# 编译 Android 的包并输出到 android/app/build/outputs/apk/app-release.apk
npm run build:android
npm run release:android

# 替换 debug 插件，仅项目初次安装完后执行
npm run postinstall

# 启用测试服务
npm run test
```

### Issues

##### `Loading dependency graph, done.`

```bash
# in terminal in root of the project:
# it generates 'IOS' and 'Android' folders again
react-native upgrade n - yyyyyyyy
react-native link
```

##### null is not an object (evaluating 'RNGestureHandlerModule.State')

```bash
npm install
npm install --save react-navigation
npm install --save react-native-gesture-handler
react-native link
```
##### not opened WebSocket.send | Module RCTEventEmitter is not a registered callable module

```bash
rm -rf node_modules
yarn
rm -rf ios/build
npm run dev:ios
```

##### null is not an object (evaluating 'RNGestureHandlerModule.State')

```bash
pod 'RNGestureHandler', :path => '../node_modules/react-native-gesture-handler/ios'
```

##### Print: Entry, ":CFBundleIdentifier", Does Not Exist

```bash
rm -rf ~/.rncache/* | https://github.com/facebook/react-native/issues/14423#issuecomment-311927464
```

##### null is not an object ( evaluating 'RNGestureHandlerModule.Direction')

```bash
react-native link react-native-gesture-handler
```

##### Unrecognized font family 'DIN-Regular'

```bash
react-native link
```

##### Error Execution failed for task ':app:mergeReleaseResources' building APK

```bash
rm -rf android/app/src/main/res/drawable-*
```

### Links

无障碍支持（accessibility）：
- https://reactnative.cn/docs/accessibility.html
- https://code.fb.com/ios/making-react-native-apps-accessible/

启动屏：
- https://juejin.im/entry/59c741adf265da066a1043b0
- https://github.com/crazycodeboy/react-native-splash-screen

App icon:
- https://medium.com/@scottianstewart/react-native-add-app-icons-and-launch-screens-onto-ios-and-android-apps-3bfbc20b7d4c

Display name:
https://stackoverflow.com/a/38582258
- ios: `/ios/surmon_me/Info.plist:CFBundleDisplayName`
- android: `android/app/src/main/res/values/strings.xml`

##### IOS
- 官方提供屏幕尺寸：https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/launch-screen/
- 开发者证书签名的区别：https://www.pgyer.com/doc/view/app_developer_account
- 打包为 Ipa 包（没有 $99 || $299 的账户是无法 Export 的）
   + http://stackoverflow.com/questions/35476349/how-to-build-ipa-for-react-native
   + http://www.jianshu.com/p/a19d2d0747ee
   + https://blog.whezh.com/react-native-ios-bundle/

##### Android
- Icon 转换生成工具：http://romannurik.github.io/AndroidAssetStudio/icons-generic.html
- ANDROID_HOME 配置：https://stackoverflow.com/questions/19986214/setting-android-home-enviromental-variable-on-mac-os-x
- 打包为APK http://reactnative.cn/docs/0.43/signed-apk-android.html
- 安卓打包签名问题
   + https://www.jianshu.com/p/32a99c273be1
- 生成证书：
   + `keytool -genkey -v -keystore app-release-key.keystore -alias surmon-app -keyalg RSA -keysize 2048 -validity 10000`
- 真机调试：
   + 呼出菜单：`adb shell input keyevent 82`
   + 映射 IP：`adb -s [device-id] reverse tcp:8081 tcp:8081`
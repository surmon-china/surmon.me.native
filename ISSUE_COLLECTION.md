
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

# 编译两端并开启服务器（执行前需开启安卓模拟器）
npm run dev:all

# 编译 IOS 并开启服务器
npm run dev:ios

# 编译 Android 并开启服务器（执行前需开启安卓模拟器）
npm run dev:android

# 编译 IOS 的包并输出到 ./ios/react.bundle
npm run build:ios

# 编译 Android 的包并输出到 android/app/build/outputs/apk/app-release.apk
npm run build:android

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

### Links

无障碍支持：https://reactnative.cn/docs/accessibility.html
accessibility: https://code.fb.com/ios/making-react-native-apps-accessible/

##### IOS
- AppName和启动页修改 http://www.cnblogs.com/allenxieyusheng/p/5802179.html
- App图标尺寸 
   + http://blog.csdn.net/leiyu231/article/details/52830151
   + https://medium.com/the-react-native-log/change-default-launch-screen-in-react-native-ios-app-544f94f1e947
- 打包和生产模式的切换步骤 
   + http://stackoverflow.com/questions/35476349/how-to-build-ipa-for-react-native
   + 中文版 http://www.jianshu.com/p/7683efdd31f5
- 打包为IPA包
   + http://www.jianshu.com/p/a19d2d0747ee
- 开发者账户显示测试机id不符合
   + http://stackoverflow.com/questions/39754341/none-of-your-accounts-are-a-member-code-signing-errors-after-upgrading-to-xcode 
- 机构id备份
   + `org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)`

##### Android
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

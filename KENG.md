
### Typescript

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

### `Loading dependency graph, done.`

```bash
# in terminal in root of the project:
# it generates 'IOS' and 'Android' folders again
react-native upgrade n - yyyyyyyy
react-native link
```

### null is not an object (evaluating 'RNGestureHandlerModule.State')

```bash
npm install
npm install --save react-navigation
npm install --save react-native-gesture-handler
react-native link
```
### not opened WebSocket.send | Module RCTEventEmitter is not a registered callable module

```bash
rm -rf node_modules
yarn
rm -rf ios/build
npm run dev:ios
```

### null is not an object (evaluating 'RNGestureHandlerModule.State')

pod 'RNGestureHandler', :path => '../node_modules/react-native-gesture-handler/ios'

### Print: Entry, ":CFBundleIdentifier", Does Not Exist

rm -rf ~/.rncache/* | https://github.com/facebook/react-native/issues/14423#issuecomment-311927464


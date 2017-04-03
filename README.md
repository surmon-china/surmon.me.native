# surmon.me.native
A react-native applaction for surmon.me

## Build Setup

```bash
# install dependencies
$ npm install # Or yarn install

# 清除缓存并开启服务器（不执行编译）
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

## 坑

### 项目问题
- run-ios失败的时候，可以需要删除ios/build文件夹重新编译
- 不再使用`babel-plugin-module-resolver`插件，使用内fbjs模块管理别名
- 
- 项目出现诸多异常的时候，直接执行`. reset.sh`会自动清理缓存并重装，而后执行命令即可

### Icons图标库问题

#### IOS下

#### Android下
- icons略复杂

### IOS
- react-native-vector-icons - Issues：
   * [安装说明](https://github.com/oblador/react-native-vector-icons)
   * Podfile的更新需要使用`gem`安装`cocoapods`
      + http://code4app.com/article/cocoapods-install-usage
      + https://github.com/CocoaPods/CocoaPods/issues/3692
      + https://github.com/oblador/react-native-vector-icons/issues/394

### Android
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
- 


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

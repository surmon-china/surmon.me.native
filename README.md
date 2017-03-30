# surmon.me.native
A react-native applaction for surmon.me

## 坑

## 目录结构
```
surmon.me.native/
   |
   ├──ios/                       * IOS配置
   |
   ├──android/                   * 安卓配置
   |
   ├──src/                       * 主程序
   │   │
   │   │──components             * 所有组件
   │   │
   │   └──constants              * 应用变量和配置
   │   │
   │   └──containers             * 'Smart-components' / the business logic.
   │   │
   │   └──images                 * 本地图片资源
   │   │
   │   └──lib                    * Utils, custom libraries, functions
   │   │
   │   └──navigation             * Routes - wire up the router with any & all screens.
   │   │
   │   └──redux                  * Redux Reducers & Actions grouped by type. Read More
   │   │
   │   └──theme                  * 主题样式和变量
   │   │
   │   └──index.js               * Appp根组件
   │
   │──package.json               * 包信息
   │
   │──.eslintrc.js               * Eslint配置
   │
   │──.babelrc                   * Babel配置
   │
   │──.gitignore                 * Git忽略文件配置
   │
   │──nuxt.config.js             * Nuxt.js程序配置
   │
   │──server.js                  * Nuxt.js程序入口文件（节省内存 + 优化内存）
   │
   │──ecosystem.config           * pm2部署配置（日志文件的路径需要自行修改）
   │
   └──.editorconfig              * 编码风格配置
```

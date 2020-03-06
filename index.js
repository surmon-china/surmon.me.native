/**
 * App entry.
 * @file App 入口文件
 * @module app/entry
 * @author Surmon <https://github.com/surmon-china>
 */

import * as Sentry from '@sentry/react-native'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import { App } from './src/app'
import { IS_DEV, projectName, version } from './src/config'

Sentry.init({
  debug: IS_DEV,
  environment: IS_DEV ? 'development' : 'production',
  // 默认 Sentry 已做了足够的事，不再需要维护，若手动维护，则需与 sentry.js 逻辑对应
  // release: `${projectName}@${version}`,
  deactivateStacktraceMerging: true,
  dsn: require('./product.json').sentryDSN
})

AppRegistry.registerComponent(appName, () => App)

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
  release: `${projectName}@${version}`,
  deactivateStacktraceMerging: true,
  dsn: require('./product.json').sentryDSN
})

AppRegistry.registerComponent(appName, () => App)

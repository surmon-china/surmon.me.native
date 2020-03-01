/**
 * App entry.
 * @file App 入口文件
 * @module app/entry
 * @author Surmon <https://github.com/surmon-china>
 */

import * as Sentry from '@sentry/react-native'
import { AppRegistry } from 'react-native'
import { name } from './app.json'
import { App } from './src/app'
import { IS_DEV, appName, version } from './src/config'

Sentry.init({
  debug: IS_DEV,
  environment: IS_DEV ? 'development' : 'production',
  release: `${appName}@${version}`,
  dsn: require('./product.json').sentryDSN
})

AppRegistry.registerComponent(name, () => App)

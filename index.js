/**
 * App entry.
 * @file App 入口文件
 * @module app/entry
 * @author Surmon <https://github.com/surmon-china>
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { App } from './src/app';

AppRegistry.registerComponent(appName, () => App);

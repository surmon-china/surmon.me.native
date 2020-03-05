/**
 * App config
 * @file App 配置
 * @module app/config
 * @author Surmon <https://github.com/surmon-china>
 */

import { Platform } from 'react-native'
import packageJSON from '../package.json'

export const appName = 'Surmon.me'
export const email = 'i@surmon.me'
export const webUrl = 'https://surmon.me'
export const appApi = 'https://api.surmon.me'
export const staticApi = 'https://cdn.surmon.me'
export const gravatarApi = 'https://static.surmon.me/avatar'
export const GitHubUrl = 'https://github.com/surmon-china'
export const projectName = packageJSON.name
export const projectUrl = packageJSON.homepage
export const version = packageJSON.version
export const license = packageJSON.license
export const dependencies = packageJSON.dependencies

export const IS_DEV = __DEV__
export const IS_IOS = Object.is(Platform.OS, 'ios')
export const IS_ANDROID = !IS_IOS

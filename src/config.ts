/**
 * App config
 * @file App 配置
 * @module app/config
 * @author Surmon <https://github.com/surmon-china>
 */

import { Platform } from 'react-native'

export const appName = 'Surmon.me'
export const webUrl = 'https://surmon.me'
export const appApi = 'https://api.surmon.me'
export const staticApi = 'https://cdn.surmon.me'
export const gravatarApi = 'https://static.surmon.me/avatar'
export const navigationPersistenceKey = __DEV__ ? '___NavigationStateDEV__' : null

export const IS_DEV = __DEV__
export const IS_IOS = Object.is(Platform.OS, 'ios')
export const IS_ANDROID = !IS_IOS

/**
 * Storage service
 * @file 本地存储服务 TODO: react-native-community 会造成存储刷新后自动清空的问题
 * @module app/services/storage
 * @author Surmon <https://github.com/surmon-china>
 */

import { AsyncStorage } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage'
import { STORAGE } from '@app/constants/storage'

export function get<T>(key: STORAGE): Promise<T> {
  return AsyncStorage.getItem(key).then(data => {
    return data ? JSON.parse(data) : data
  })
}

export function set(key: STORAGE, value: any): Promise<void> {
  return AsyncStorage.setItem(key, JSON.stringify(value))
}

export function remove(key: STORAGE): Promise<void> {
  return AsyncStorage.removeItem(key)
}

export function clear(): Promise<void> {
  return AsyncStorage.clear()
}

export default {
  get,
  set,
  remove,
  clear
}

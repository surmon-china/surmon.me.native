
import { AsyncStorage } from 'react-native'

export function get<T>(key: string): Promise<T> {
  return AsyncStorage.getItem(key).then(data => {
    return data ? JSON.parse(data) : data
  })
}

export function set(key: string, value: any): Promise<void> {
  return AsyncStorage.setItem(key, JSON.stringify(value))
}

export function del(key: string): Promise<void> {
  return AsyncStorage.removeItem(key)
}

export function clear(): Promise<void> {
  return AsyncStorage.clear()
}

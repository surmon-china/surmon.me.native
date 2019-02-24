
import { ImageSourcePropType } from 'react-native'
import i18n from '@app/services/i18n'
import * as LANGUAGE from '@app/constants/language'

// 时间转换
export function toYMD(dateString: string): string {
  if (!dateString) {
    return dateString
  }
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  return `${year}/${month}/${day} ${hour > 11 ? i18n.t(LANGUAGE.PM) : i18n.t(LANGUAGE.AM)}`
}

// 文本限制
export function stringLimit(description: string, limit: number = 80): string {
  return description.length < limit ? description : `${description.slice(0, limit)}...`
}

// 缩略图构造
const localThumb = require('@app/assets/images/thumb-article.jpg')
export function buildThumb(thumb: string): ImageSourcePropType {
  return thumb ? { uri: thumb } : localThumb
}

/**
 * App util filters.
 * @file 过滤器扩展
 * @module app/utils/filters
 * @author Surmon <https://github.com/surmon-china>
 */

import { LANGUAGE_KEYS } from '@app/constants/language'
import i18n from '@app/services/i18n'

// 时间转换
export function dateToYMD(dateString: string): string {
  if (!dateString) {
    return dateString
  }
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  return `${year}/${month}/${day} ${hour > 11 ? i18n.t(LANGUAGE_KEYS.PM) : i18n.t(LANGUAGE_KEYS.AM)}`
}

// 文本限制
export function stringLimit(description: string, limit: number = 80): string {
  return description.length < limit ? description : `${description.slice(0, limit)}...`
}

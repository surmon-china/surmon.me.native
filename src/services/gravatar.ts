/**
 * Gravatar service
 * @file 头像计算器
 * @module app/services/gravatar
 * @author Surmon <https://github.com/surmon-china>
 */

import gravatar from 'gravatar'
import { EMAIL } from '@app/constants/regexp'
import { gravatarApi } from '@app/config'

export const getUrlByEmail = (email: string): string => {
  if (!EMAIL.test(email)) {
    return `${gravatarApi}/anonymous.jpg`
  }
  return gravatar
    .url(email, { protocol: 'https' })
    .replace('https://s.gravatar.com/avatar', gravatarApi)
}

export default gravatar

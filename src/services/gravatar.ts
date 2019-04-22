
import gravatar from 'gravatar'
import { EMAIL } from '@app/constants/regexps'
import { gravatarApi } from '@app/config'

export function getUrlByEmail(email: string): string {
  if (EMAIL.test(email)) {
    return `${gravatarApi}/anonymous.jpg`
  }
  return gravatar
    .url(email, { protocol: 'https' })
    .replace('https://s.gravatar.com/avatar', gravatarApi)
}

export default gravatar

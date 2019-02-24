
import { observable, action } from 'mobx'
import { NativeModules } from 'react-native'
import { IS_IOS } from '@app/config'
import en from '@app/languages/en'
import zh from '@app/languages/zh'
import * as LANGUAGE from '@app/constants/language'

export type TLanguageKey = keyof typeof LANGUAGE
export type TLanguage = typeof LANGUAGE.ZH | typeof LANGUAGE.EN

// 语言包
type TLanguages = {
  [key in TLanguage]: {
    [key: string]: string
  }
}

// UI 层用的语言列表
export type TLanguageList = {
  [key in TLanguage]: {
    name: string
    english: string
  }
}

export const languages: TLanguageList = {
  [LANGUAGE.ZH]: {
    name: zh[LANGUAGE.CHINESE],
    english: en[LANGUAGE.CHINESE]
  },
  [LANGUAGE.EN]: {
    name: en[LANGUAGE.ENGLISH],
    english: en[LANGUAGE.ENGLISH]
  }
}

class I18nStore {
  
  private languages: TLanguages = { en, zh }

  @observable
  private language: TLanguage = LANGUAGE.ZH

  @action.bound
  public updateLanguage(language: TLanguage) {
    this.language = language
  }

  public t(key: string): string {
    return this.languages[this.language][key]
  }

  public translate(key: string, language: TLanguage = this.language): string {
    return this.languages[language][key]
  }
}

export const i18n = new I18nStore()
export default i18n
export const updateLanguage = i18n.updateLanguage.bind(i18n)
export function getDeviceLanguage(): Promise<TLanguage> {
  let language = IS_IOS
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier
  return language
    ? Promise.resolve(language)
    : NativeModules.RNi18n.getLanguages().then(
      ([language]: TLanguage[]) => language
    )
}

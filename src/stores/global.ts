
import { observable, action } from 'mobx'
import { getDeviceLanguage, updateLanguage, TLanguage } from '@app/services/i18n'
import { updateTheme } from '@app/style/colors'
import * as storage from '@app/services/storage'
import * as STORAGE from '@app/constants/storage'
import * as LANGUAGE from '@app/constants/language'

export interface IGlobalStore {
  language: TLanguage
  darkTheme: boolean
}

class GlobalStore {

  constructor() {
    this.initLanguage()
    this.initDarkTheme()
  }
  
  @observable.ref language: TLanguage = LANGUAGE.ZH
  @observable.ref darkTheme: boolean = false

  @action.bound updateLanguage(language: TLanguage) {
    this.language = language
    storage.set(STORAGE.LOCAL_LANGUAGE, language)
    updateLanguage(language)
  }

  @action.bound updateDarkTheme(darkTheme: boolean) {
    this.darkTheme = darkTheme
    storage.set(STORAGE.LOCAL_DARK_THEME, darkTheme)
    updateTheme(darkTheme)
  }

  private initLanguage() {
    // 获取本机默认语言
    function getDeviceDefaultLanguage(): Promise<TLanguage> {
      return getDeviceLanguage().then(language => {
        return language.includes(LANGUAGE.EN)
          ? LANGUAGE.EN
          : LANGUAGE.ZH
      })
    }
    // 获取本地存储的用户设置语言
    storage.get<TLanguage>(STORAGE.LOCAL_LANGUAGE)
      .then(localLanguage => {
        return localLanguage
          ? Promise.resolve(localLanguage)
          : getDeviceDefaultLanguage()
      })
      .then(language => {
        console.log('init app language:', language)
        this.updateLanguage(language)
      })
  }

  private initDarkTheme() {
    storage.get<boolean>(STORAGE.LOCAL_DARK_THEME).then(darkTheme => {
      if (darkTheme != null) {
        console.log('init app daekTheme:', darkTheme)
        this.updateDarkTheme(darkTheme)
      }
    })
  }
}

export default new GlobalStore()

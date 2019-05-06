/**
 * App global option store
 * @file App 全局公共存储
 * @module app/stores/option
 * @author Surmon <https://github.com/surmon-china>
 */

import { observable, action, computed } from 'mobx'
import { boundMethod } from 'autobind-decorator'
import { LANGUAGES } from '@app/constants/language'
import { STORAGE } from '@app/constants/storage'
import { getDeviceLanguage, updateLanguage, TLanguage } from '@app/services/i18n'
import storage from '@app/services/storage'
import { updateTheme } from '@app/style/colors'

export interface IOptionStore {
  language: TLanguage
  darkTheme: boolean
}

class OptionStore {

  constructor() {
    this.resetStore()
  }
  
  @observable.ref language: TLanguage = LANGUAGES.ZH
  @observable.ref darkTheme: boolean = false

  @computed
  get isEnLang() {
    return this.language === LANGUAGES.EN
  }

  @action.bound
  updateLanguage(language: TLanguage) {
    this.language = language
    storage.set(STORAGE.LOCAL_LANGUAGE, language)
    updateLanguage(language)
  }

  @action.bound
  updateDarkTheme(darkTheme: boolean) {
    this.darkTheme = darkTheme
    storage.set(STORAGE.LOCAL_DARK_THEME, darkTheme)
    updateTheme(darkTheme)
  }

  @boundMethod
  resetStore() {
    this.initLanguage()
    this.initDarkTheme()
  }

  private initLanguage() {
    // 获取本机默认语言
    function getDeviceDefaultLanguage(): Promise<TLanguage> {
      return getDeviceLanguage().then(language => {
        return language.includes(LANGUAGES.EN)
          ? LANGUAGES.EN
          : LANGUAGES.ZH
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
        console.log('Init app language:', language)
        this.updateLanguage(language)
      })
  }

  private initDarkTheme() {
    storage.get<boolean>(STORAGE.LOCAL_DARK_THEME).then(darkTheme => {
      if (darkTheme != null) {
        console.log('Init app darkTheme:', darkTheme)
        this.updateDarkTheme(darkTheme)
      }
    })
  }
}

export const optionStore = new OptionStore()

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
import { updateTheme, isDarkSystemTheme } from '@app/style/colors'

export interface IOptionStore {
  language: TLanguage
  darkTheme: boolean
}

class OptionStore {

  constructor() {
    this.resetStore()
  }
  
  @observable.ref language: TLanguage = LANGUAGES.ZH
  @observable.ref darkTheme: boolean = isDarkSystemTheme

  @computed get isEnLang() {
    return this.language === LANGUAGES.EN
  }

  @action.bound
  updateLanguageWithOutStorage(language: TLanguage) {
    this.language = language
    updateLanguage(language)
  }

  @action.bound
  updateLanguage(language: TLanguage) {
    this.updateLanguageWithOutStorage(language)
    storage.set(STORAGE.LOCAL_LANGUAGE, language)
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
    // 获取本地存储的用户设置语言，若用户未设置语言，则首选本机语言
    storage.get<TLanguage>(STORAGE.LOCAL_LANGUAGE)
      .then(localLanguage => {
        return localLanguage
          ? Promise.resolve(localLanguage)
          : getDeviceLanguage()
      })
      .then(language => {
        console.log('Init app language:', language)
        this.updateLanguageWithOutStorage(language)
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

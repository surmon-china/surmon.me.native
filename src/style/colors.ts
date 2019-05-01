/**
 * Style colors.
 * @file Theme 主题/颜色配置
 * @module app/colors
 * @author Surmon <https://github.com/surmon-china>
 */

import { observable } from 'mobx'

export enum EThemes {
  Default = 'default',
  Dark = 'Dark'
}

type TThemeKey =
  | 'primary'// 主题色
  | 'secondary' // 次要主题色

  | 'primary' // 主题色
  | 'secondary' // 次要主题色

  | 'accent' // 强调色
  | 'red' // 红色，错误色
  | 'yellow' // 黄色，警告色
  | 'grey' // 银灰色
  | 'inverse' // 反色

  | 'border' // 边框色
  | 'background' // 全局背景色
  | 'cardBackground' // 模块背景色

  | 'textDefault' // 默认文本
  | 'textSecondary' // 次要文本
  | 'textMuted' // 禁用文本

  | 'textTitle' // 标题文本
  | 'textLink' // 链接文本

type TTheme = Record<TThemeKey, string>

export const Default: TTheme = {
  primary: '#0d86ff',
  secondary: '#262626',
  accent: '#4caf50',
  red: '#ff5722',
  yellow: '#ffeb3b',
  grey: '#efefef',
  inverse: '#333333',
  border: '#BBBBBB',
  background: '#EEEEEE',
  cardBackground: '#FFFFFF',
  
  textDefault: '#555',
  textSecondary: '#bbb',
  textMuted: '#eee',

  textTitle: '#222',
  textLink: '#000'
}

export const Dark: TTheme = {
  primary: 'red',
  secondary: '#262626',
  accent: '#4caf50',
  red: '#ff5722',
  yellow: '#ffeb3b',
  grey: '#efefef',
  inverse: '#000',
  border: '#c8c7cc',
  background: '#000',
  cardBackground: 'blue',

  textDefault: '#AAA',
  textSecondary: '#333',
  textMuted: '#c8c7cc',
  textTitle: '#555',
  textLink: '#009688'
}

const colors = observable<TTheme>(Default)

export function updateTheme(darkTheme: boolean) {
  Object.keys(Default).forEach(key => {
    const themeKty = (key as keyof TTheme)
    colors[themeKty] = darkTheme ? Dark[themeKty] : Default[themeKty]
  })
}

export default colors



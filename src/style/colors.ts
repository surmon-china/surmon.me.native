

import { observable } from 'mobx'

export enum EThemes {
  Default = 'default',
  Dark = 'Dark'
}

export interface ITheme {
  primary: string // 主题色
  secondary: string // 次要主题色
  accent: string // 强调色
  red: string // 红色，错误色
  yellow: string // 黄色，警告色
  grey: string // 银灰色
  black: string // 黑色
  background: string // 全局背景色
  cardBackground: string // 模块背景色
  textTitle: string // 标题文本
  textDefault: string // 默认文本
  textPrimary: string // 主要文本
  textSecondary: string // 次要文本
  textLink: string // 链接文本
  textMuted: string // 禁用文本
}

export const Default: ITheme = {
  primary: '#0d86ff',
  secondary: '#262626',
  accent: '#4caf50',
  red: '#ff5722',
  yellow: '#ffeb3b',
  grey: '#efefef',
  black: '#000',
  background: '#EEEEEE',
  cardBackground: '#FFFFFF',
  textTitle: '#555',
  textDefault: '#AAA',
  textPrimary: '#EEE',
  textSecondary: '#333333',
  textLink: '#009688',
  textMuted: '#c8c7cc'
}

export const Dark: ITheme = {
  primary: 'red',
  secondary: '#262626',
  accent: '#4caf50',
  red: '#ff5722',
  yellow: '#ffeb3b',
  grey: '#efefef',
  black: '#000',
  background: '#000',
  cardBackground: 'blue',
  textTitle: '#555',
  textDefault: '#AAA',
  textPrimary: '#EEE',
  textSecondary: '#333333',
  textLink: '#009688',
  textMuted: '#c8c7cc'
}

const colors = observable<ITheme>(Default)

export function updateTheme(darkTheme: boolean) {
  Object.keys(Default).forEach(key => {
    const themeKty = (key as keyof ITheme)
    colors[themeKty] = darkTheme ? Dark[themeKty] : Default[themeKty]
  })
}

export default colors



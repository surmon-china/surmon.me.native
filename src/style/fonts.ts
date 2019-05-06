/**
 * Style fonts
 * @file Fonts 字体样式
 * @module app/fonts
 * @author Surmon <https://github.com/surmon-china>
 */

import { Platform } from 'react-native'

export function getLineHeight(fontSize: number): number {
  const multiplier = (fontSize > 20) ? 0.1 : 0.33;
  return parseInt(String(fontSize + (fontSize * multiplier)), 10);
}

export const fontFamily = 'DIN-Regular'

export const base = {
  fontSize: 14,
  lineHeight: getLineHeight(14),
  ...Platform.select({
    ios: {
      fontFamily
    },
    android: {
      fontFamily
    }
  })
};

export const small = { ...base, fontSize: base.fontSize * 0.85, lineHeight: getLineHeight(base.fontSize) }
export const h1 = { ...base, fontSize: base.fontSize * 1.75, lineHeight: getLineHeight(base.fontSize * 2) }
export const h2 = { ...base, fontSize: base.fontSize * 1.5, lineHeight: getLineHeight(base.fontSize * 1.75) }
export const h3 = { ...base, fontSize: base.fontSize * 1.25, lineHeight: getLineHeight(base.fontSize * 1.5) }
export const h4 = { ...base, fontSize: base.fontSize * 1.1, lineHeight: getLineHeight(base.fontSize * 1.25) }
export const h5 = base

export default {
  fontFamily, base, small, h1, h2, h3, h4, h5
}

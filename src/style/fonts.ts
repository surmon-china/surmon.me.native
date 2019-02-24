/**
 * App Theme - Fonts
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { Platform } from 'react-native';

function lineHeight(fontSize: number) {
  const multiplier = (fontSize > 20) ? 0.1 : 0.33;
  return parseInt(String(fontSize + (fontSize * multiplier)), 10);
}

export const fontFamily = 'DIN-Regular'

export const base = {
  fontSize: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      fontFamily
    },
    android: {
      fontFamily
    },
  }),
};

export const small = { ...base, fontSize: base.fontSize * 0.85, lineHeight: lineHeight(base.fontSize) }
export const h1 = { ...base, fontSize: base.fontSize * 1.75, lineHeight: lineHeight(base.fontSize * 2) }
export const h2 = { ...base, fontSize: base.fontSize * 1.5, lineHeight: lineHeight(base.fontSize * 1.75) }
export const h3 = { ...base, fontSize: base.fontSize * 1.25, lineHeight: lineHeight(base.fontSize * 1.5) }
export const h4 = { ...base, fontSize: base.fontSize * 1.1, lineHeight: lineHeight(base.fontSize * 1.25) }
export const h5 = base

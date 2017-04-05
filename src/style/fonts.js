/**
 * App Theme - Fonts
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { Platform } from 'react-native';

function lineHeight(fontSize) {
  const multiplier = (fontSize > 20) ? 0.1 : 0.33;
  return parseInt(fontSize + (fontSize * multiplier), 10);
}

const base = {
  fontSize: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      // fontFamily: 'HelveticaNeue',
    },
    android: {
      fontFamily: 'Roboto',
    },
  }),
};

export default {
  base: { ...base },
  h1: { ...base, fontSize: base.fontSize * 1.75, lineHeight: lineHeight(base.fontSize * 2) },
  h2: { ...base, fontSize: base.fontSize * 1.5, lineHeight: lineHeight(base.fontSize * 1.75) },
  h3: { ...base, fontSize: base.fontSize * 1.25, lineHeight: lineHeight(base.fontSize * 1.5) },
  h4: { ...base, fontSize: base.fontSize * 1.1, lineHeight: lineHeight(base.fontSize * 1.25) },
  h5: { ...base },
};

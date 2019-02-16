/**
 * App Theme - Colors
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

// themes
export enum ETheme {
  Default = 'default',
  Dark = 'Dark'
}

export const themes = {
  [ETheme.Default]: {
    primary: '#0d86ff',
    secondary: '#262626',
    black: '#000',
    background: '#EEEEEE',
    cardBackground: '#FFFFFF',
    textTitle: '#555',
    textDefault: '#AAA',
    textPrimary: '#EEE',
    textSecondary: '#333333',
    textLink: '#009688',
    textMuted: '#c8c7cc'
  },
};

export default themes[ETheme.Default]

// export const getColors = (theme: ETheme) => themes[theme]

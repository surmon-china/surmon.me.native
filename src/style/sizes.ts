

import { Dimensions, StyleSheet } from 'react-native'
import { IS_IOS } from '@app/config'

const goldenRatio = 0.618
const safeAreaViewTop = 44
const safeAreaViewBottom = 34

const { width, height } = Dimensions.get('window')
const screenHeight = width < height ? height : width
const screenWidth = width < height ? width : height

export const screen = {
  height: screenHeight,
  width: screenWidth,
  widthHalf: screenWidth * 0.5,
  widthThird: screenWidth * 0.333,
  widthTwoThirds: screenWidth * 0.666,
  widthQuarter: screenWidth * 0.25,
  widthThreeQuarters: screenWidth * 0.75,
  heightTwoThirds: screenWidth * 0.666,
  heightSafeArea: screenHeight - safeAreaViewTop - safeAreaViewBottom,
  heightHoldenRatio: screenHeight * goldenRatio
}

export default {
  // Window Dimensions
  screen,
  goldenRatio,
  thumbHeightRatio: 1190 / 420,

  // Navbar
  navbarHeight: IS_IOS ? 50 : 50,
  statusBarHeight: IS_IOS ? 16 : 24,

  // base
  gap: 20,
  gapGoldenRatio: 20 * goldenRatio,
  touchOpacity: 0.6,
  borderWidth: StyleSheet.hairlineWidth
}

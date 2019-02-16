/**
 * App Theme - Sizes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { Dimensions } from 'react-native';
import { IS_IOS } from '@app/config';

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

// Window Dimensions
export const screen = {
  height: screenHeight,
  width: screenWidth,

  widthHalf: screenWidth * 0.5,
  widthThird: screenWidth * 0.333,
  widthTwoThirds: screenWidth * 0.666,
  widthQuarter: screenWidth * 0.25,
  widthThreeQuarters: screenWidth * 0.75,
}

// Navbar
export const navbarHeight = IS_IOS ? 50 : 50
export const statusBarHeight = IS_IOS ? 16 : 24

// base
export const borderWidth = 0.5
export const gap = 20

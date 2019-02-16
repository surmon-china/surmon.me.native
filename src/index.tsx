/**
 * IOS entry.
 * @file IOS 入口文件
 * @module app/ios
 * @author Surmon <https://github.com/surmon-china>
 */

import React from 'react';
import { createStackNavigator } from "react-navigation";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Articles from '@app/pages/articles';
import { Home } from '@app/pages/home';
import { About } from '@app/pages/about';
import { Github } from '@app/pages/about/github';
import { Guestbook } from '@app/pages/guestbook';
import colors from '@app/style/colors';
import * as fonts from '@app/style/fonts';

const commonHeaderStyle = {
  headerTintColor: colors.background,
  headerStyle: {
    backgroundColor: colors.primary,
  }
}

function humanizeIconStyle(options: any) {
  const { focused, tintColor } = options
  const color = focused && tintColor ? tintColor : undefined
  return { style: fonts.h3, color }
}

export enum EHomeRoutes {
  Home = 'Home',
  ArticleSearch = 'ArticleSearch',
  ArticleDetail = 'ArticleDetail'
}

export enum EGuestbookRoutes {
  Guestbook = 'Guestbook',
}

export enum EAboutRoutes {
  About = 'About',
  Github = 'Github'
}

export const HomeStack = createStackNavigator({
  [EHomeRoutes.Home]: {
    screen: Home,
    navigationOptions: commonHeaderStyle
  },
  // [EHomeRoutes.ArticleDetail]: ArticleDetail
}, {
  navigationOptions: {
    tabBarIcon(options) {
      return <FontAwesome name="home" {...humanizeIconStyle(options)} />
    }
  }
})

export const GuestbookStack = createStackNavigator({
  Guestbook: {
    screen: Guestbook,
    navigationOptions: commonHeaderStyle
  }
}, {
  navigationOptions: {
    tabBarIcon(options) {
      return <FontAwesome name="comments" {...humanizeIconStyle(options)} />
    }
  }
})

export const AboutStack = createStackNavigator({
  [EAboutRoutes.About]: {
    screen: About,
    navigationOptions: commonHeaderStyle
  },
  [EAboutRoutes.Github]: Github,
}, {
  navigationOptions: {
    tabBarIcon(options) {
      return <FontAwesome5 name="user-alt" {...humanizeIconStyle(options)} />
    }
  }
})

export const NavigatorStacks = {
  [EHomeRoutes.Home]: HomeStack,
  [EGuestbookRoutes.Guestbook]: GuestbookStack,
  [EAboutRoutes.About]: AboutStack,
}

export const NavigatorBaseOpions = {
  initialRouteName: EHomeRoutes.Home
}

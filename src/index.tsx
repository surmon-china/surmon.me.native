/**
 * App main.
 * @file App 骨架
 * @module app/main
 * @author Surmon <https://github.com/surmon-china>
 */

import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ViewStyle } from 'react-native'
import { createStackNavigator, NavigationComponent, NavigationRouteConfig } from "react-navigation"
import { EHomeRoutes, EGuestbookRoutes, EAboutRoutes } from '@app/routes'
import { headerStyles } from '@app/components/layouts/header'
import { Home } from '@app/pages/home'
import { ArticleSearch } from '@app/pages/home/search'
import { Guestbook } from '@app/pages/guestbook'
import { About } from '@app/pages/about'
import { Github } from '@app/pages/about/github'
import { Setting } from '@app/pages/about/setting'
import i18n from '@app/services/i18n'
import colors from '@app/style/colors'
import * as LANGUAGE from '@app/constants/language'

export function getCommonHeaderStyles() {
  return () => {
    const { title } = headerStyles.styles
    return {
      headerTitleStyle: title,
      headerTintColor: title.color,
      headerStyle: {
        backgroundColor: colors.primary
      }
    }
  }
}

function getNavigationRouteConfig(component: NavigationComponent, titleName: string): NavigationRouteConfig {
  return {
    screen: component,
    navigationOptions: () => ({ title: i18n.t(titleName) })
  }
}

function humanizeTabIconStyles(options: any, extendStyle?: ViewStyle) {
  const { focused, tintColor } = options
  const color = focused && tintColor
    ? tintColor
    : colors.textTitle
  const style = {
    opacity: focused ? 1 : 0.8,
    ...extendStyle
  }
  return { size: 19, style, color }
}

export const HomeStack = createStackNavigator({
  [EHomeRoutes.Home]: getNavigationRouteConfig(Home, LANGUAGE.HOME),
  [EHomeRoutes.ArticleSearch]: {
    screen: ArticleSearch
  }
  // [EHomeRoutes.ArticleDetail]: ArticleDetail
}, {
  defaultNavigationOptions: getCommonHeaderStyles(),
  navigationOptions({ navigation }) {
    return {
      // 非根 Home 屏都要隐藏 Tabbar（Search、Detail）
      tabBarVisible: navigation.state.index === 0,
      tabBarLabel: i18n.t(LANGUAGE.HOME),
      tabBarIcon(options) {
        return <MaterialIcons name="chrome-reader-mode" {...humanizeTabIconStyles(options)} />
      }
    }
  }
})

export const GuestbookStack = createStackNavigator({
  Guestbook: getNavigationRouteConfig(Guestbook, LANGUAGE.GUESTBOOK)
}, {
  defaultNavigationOptions: getCommonHeaderStyles(),
  navigationOptions: () => ({
    tabBarLabel: i18n.t(LANGUAGE.GUESTBOOK),
    tabBarIcon(options) {
      return (
        <Foundation
          name="comment-minus"
          {...humanizeTabIconStyles(options, { marginBottom: -4 })}
          size={21}
        />
      )
    }
  })
})

export const AboutStack = createStackNavigator({
  [EAboutRoutes.About]: getNavigationRouteConfig(About, LANGUAGE.ABOUT),
  [EAboutRoutes.Github]: getNavigationRouteConfig(Github, LANGUAGE.GITHUB),
  [EAboutRoutes.Setting]: getNavigationRouteConfig(Setting, LANGUAGE.SETTING)
}, {
  defaultNavigationOptions: getCommonHeaderStyles(),
  navigationOptions: () => ({
    tabBarLabel: i18n.t(LANGUAGE.ABOUT),
    tabBarIcon(options) {
      return (
        <FontAwesome
          name="heartbeat"
          {...humanizeTabIconStyles(options, { marginBottom: -2 })}
        />
      )
    }
  })
})

export const navigatorStacks = {
  [EHomeRoutes.Home]: HomeStack,
  [EGuestbookRoutes.Guestbook]: GuestbookStack,
  [EAboutRoutes.About]: AboutStack,
}

export const navigatorBaseOptions = {
  initialRouteName: EHomeRoutes.Home
}

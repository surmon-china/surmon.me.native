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
import { ViewStyle, View, Text } from 'react-native'
import { createStackNavigator, NavigationComponent, NavigationRouteConfig, NavigationScreenConfig, NavigationScreenOptions } from 'react-navigation'
import { EHomeRoutes, EGuestbookRoutes, EAboutRoutes } from '@app/routes'
import { headerStyles } from '@app/components/layouts/header'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { WebviewPage } from '@app/pages/common/webview'
import { Home } from '@app/pages/home'
import { ArticleSearch } from '@app/pages/home/search'
import { ArticleDetail } from '@app/pages/home/detail'
import { Guestbook } from '@app/pages/guestbook'
import { About } from '@app/pages/about'
import { Github } from '@app/pages/about/github'
import { Setting } from '@app/pages/about/setting'
import i18n from '@app/services/i18n'
import colors from '@app/style/colors'

export function getCommonHeaderStyles() {
  const { title } = headerStyles.styles
  return {
    headerTitleStyle: title,
    headerTintColor: title.color,
    headerStyle: {
      backgroundColor: colors.primary
    }
  }
}

export function getDefaultNavigationOptions() {
  return () => ({ ...getCommonHeaderStyles() })
}

function getNavigationRouteConfig(
  component: NavigationComponent,
  titleName: LANGUAGE_KEYS,
  options?: () => NavigationScreenConfig<NavigationScreenOptions>
): NavigationRouteConfig {
  return {
    screen: component,
    navigationOptions: () => Object.assign({
      title: i18n.t(titleName),
    }, options ? options() : null)
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
  [EHomeRoutes.Home]: getNavigationRouteConfig(Home, LANGUAGE_KEYS.HOME, getCommonHeaderStyles),
  [EHomeRoutes.ArticleSearch]: ArticleSearch,
  [EHomeRoutes.ArticleDetail]: ArticleDetail,
  [EHomeRoutes.ArticleWebview]: WebviewPage
}, {
  navigationOptions({ navigation }) {
    return {
      // 非根 Home 屏都要隐藏 Tabbar（Search、Detail）
      tabBarVisible: navigation.state.index === 0,
      tabBarLabel: i18n.t(LANGUAGE_KEYS.HOME),
      tabBarIcon(options) {
        return <MaterialIcons name="chrome-reader-mode" {...humanizeTabIconStyles(options)} />
      }
    }
  }
})

export const GuestbookStack = createStackNavigator({
  Guestbook: getNavigationRouteConfig(Guestbook, LANGUAGE_KEYS.GUESTBOOK)
}, {
  defaultNavigationOptions: getDefaultNavigationOptions(),
  navigationOptions: () => ({
    tabBarLabel: i18n.t(LANGUAGE_KEYS.GUESTBOOK),
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
  [EAboutRoutes.About]: getNavigationRouteConfig(About, LANGUAGE_KEYS.ABOUT),
  [EAboutRoutes.Github]: getNavigationRouteConfig(Github, LANGUAGE_KEYS.GITHUB),
  [EAboutRoutes.Setting]: getNavigationRouteConfig(Setting, LANGUAGE_KEYS.SETTING)
}, {
  defaultNavigationOptions: getDefaultNavigationOptions(),
  navigationOptions: () => ({
    tabBarLabel: i18n.t(LANGUAGE_KEYS.ABOUT),
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
  [EAboutRoutes.About]: AboutStack
}

export const navigatorBaseOptions = {
  initialRouteName: EHomeRoutes.Home
}

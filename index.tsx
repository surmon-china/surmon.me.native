/**
 * App entry.
 * @file App 入口文件
 * @module app/entry
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component } from 'react'
import { AppRegistry, Vibration } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { Observer } from 'mobx-react'
import { optionStore } from '@app/stores/option'
import { indexStore } from '@app/pages/home/index'
import { guestbookStore } from '@app/pages/guestbook/index'
import { EHomeRoutes, EGuestbookRoutes } from '@app/routes'
import { navigatorStacks, navigatorBaseOptions } from '@app/index'
import { navigationPersistenceKey } from '@app/config'
import colors from '@app/style/colors'
import fonts from '@app/style/fonts'

const { BottomTabBar } = require('react-navigation-tabs')
const appJson = require('./app.json')

class AppTabBar extends Component<any> {
  render() {
    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.textTitle}
        activeBackgroundColor={colors.cardBackground}
        inactiveBackgroundColor={colors.cardBackground}
        style={{ backgroundColor: colors.cardBackground }}
        allowFontScaling={true}
        showIcon={true}
        showLabel={true}
        labelStyle={{
          marginTop: -5,
          fontFamily: fonts.fontFamily
        }}
      />
    )
  }
}

const AppTabNavigator = createBottomTabNavigator(
  navigatorStacks,
  {
    ...navigatorBaseOptions,
    tabBarComponent: AppTabBar,
    tabBarPosition: 'bottom',
    defaultNavigationOptions: {
      tabBarOnPress(options) {
        // 点击后震动一下
        Vibration.vibrate(0, false)
        // 如果是在首页、评论页进行点击，则做特殊处理
        const { routeName } = options.navigation.state
        const isFocused = options.navigation.isFocused()
        if (isFocused && routeName === EHomeRoutes.Home) {
          return indexStore.scrollToArticleListTop()
        }
        if (isFocused && routeName === EGuestbookRoutes.Guestbook) {
          return guestbookStore.scrollToCommentListTop()
        }
        // 否则执行默认处理
        options.defaultHandler()
      }
    }
  }
)

// https://reactnavigation.org/docs/zh-Hans/app-containers.html
const AppContainer = createAppContainer(AppTabNavigator)

class App extends Component {
  render() {
    return (
      <Observer
        render={() => (
          <AppContainer
            persistenceKey={navigationPersistenceKey}
            screenProps={{
              language: optionStore.language,
              darkTheme: optionStore.darkTheme
            }}
          />
        )}
      />
    )
  }
}

AppRegistry.registerComponent(appJson.name, () => App)

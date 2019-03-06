/**
 * App entry.
 * @file App 入口文件
 * @module app/entry
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component } from 'react'
import { AppRegistry, Vibration } from 'react-native'
import { Observer } from 'mobx-react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { navigatorStacks, navigatorBaseOptions } from '@app/index'
import { navigationPersistenceKey } from '@app/config'
import globalStore from '@app/stores/global'
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
        activeBackgroundColor={colors.cardBackground}
        inactiveTintColor={colors.textTitle}
        inactiveBackgroundColor={colors.cardBackground}
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
      tabBarOnPress({ defaultHandler }) {
        Vibration.vibrate(0, false)
        defaultHandler()
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
              language: globalStore.language,
              darkTheme: globalStore.darkTheme
            }}
          />
        )}
      />
    )
  }
}

AppRegistry.registerComponent(appJson.name, () => App)

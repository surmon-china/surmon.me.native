/**
 * App entry.
 * @file App 入口文件
 * @module app/entry
 * @author Surmon <https://github.com/surmon-china>
 */

import 'react-native-gesture-handler'
import React, { Component } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { StyleSheet } from 'react-native'
import { boundMethod } from 'autobind-decorator'
import { computed, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { NavigationContainer, NavigationState } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppearanceProvider } from 'react-native-appearance'
import { optionStore } from '@app/stores/option'
import { indexStore } from '@app/pages/home/index'
import { guestbookStore } from '@app/pages/guestbook/index'
import { Home } from '@app/pages/home'
import { ArticleSearch } from '@app/pages/home/search'
import { ArticleDetail } from '@app/pages/home/detail'
import { About } from '@app/pages/about'
import { Github } from '@app/pages/about/github'
import { Setting } from '@app/pages/about/setting'
import { OpenSource } from '@app/pages/about/open-source'
import { Guestbook } from '@app/pages/guestbook'
import { WebViewPage } from '@app/pages/common/webview'
import { Iconfont } from '@app/components/common/iconfont'
import { CustomHeaderTitle, AutoI18nTitle, headerStyles } from '@app/components/layout/title'
import { HomeRoutes, GuestbookRoutes, AboutRoutes } from '@app/constants/routes'
import { LANGUAGE_KEYS } from '@app/constants/language'
import colors from '@app/style/colors'
import { IS_ANDROID } from '@app/config'

const Tab = createBottomTabNavigator()

const commonStackOptions = computed(() => ({
  headerTitleStyle: headerStyles.styles.title,
  headerTintColor: headerStyles.styles.title.color,
  headerStyle: {
    backgroundColor: colors.primary
  }
}))

const HomeStackComponent = observer(() => {
  const HomeStack = createStackNavigator()
  return (
    <HomeStack.Navigator
      initialRouteName={HomeRoutes.Home}
      screenOptions={commonStackOptions.get()}
    >
      <HomeStack.Screen
        name={HomeRoutes.Home}
        component={Home}
        options={Home.getPageScreenOptions}
      />
      <HomeStack.Screen
        name={HomeRoutes.ArticleSearch}
        component={ArticleSearch}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name={HomeRoutes.ArticleDetail}
        component={ArticleDetail}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name={HomeRoutes.ArticleWebview}
        component={WebViewPage}
        options={WebViewPage.getPageScreenOptions}
      />
    </HomeStack.Navigator>
  )
})

const GuestbookStackComponent = observer(() => {
  const GuestbookStack = createStackNavigator()
  return (
    <GuestbookStack.Navigator
      initialRouteName={GuestbookRoutes.Guestbook}
      screenOptions={commonStackOptions.get()}
    >
      <GuestbookStack.Screen
        name={GuestbookRoutes.Guestbook}
        component={Guestbook}
        options={Guestbook.getPageScreenOptions}
      />
    </GuestbookStack.Navigator>
  )
})

const AboutStackComponent = observer(() => {
  const AboutStack = createStackNavigator()
  return (
    <AboutStack.Navigator
      initialRouteName={AboutRoutes.About}
      screenOptions={commonStackOptions.get()}
    >
      <AboutStack.Screen
        name={AboutRoutes.About}
        component={About}
        options={{
          headerTitle: () => <CustomHeaderTitle i18nKey={LANGUAGE_KEYS.ABOUT} />
        }}
      />
      <AboutStack.Screen
        name={AboutRoutes.Github}
        component={Github}
        options={{
          headerTitle: () => <CustomHeaderTitle i18nKey={LANGUAGE_KEYS.GITHUB} />
        }}
      />
      <AboutStack.Screen
        name={AboutRoutes.Setting}
        component={Setting}
        options={{
          headerTitle: () => <CustomHeaderTitle i18nKey={LANGUAGE_KEYS.SETTING} />
        }}
      />
      <AboutStack.Screen
        name={AboutRoutes.OpenSource}
        component={OpenSource}
        options={{
          headerTitle: () => <CustomHeaderTitle i18nKey={LANGUAGE_KEYS.OPEN_SOURCE} />
        }}
      />
    </AboutStack.Navigator>
  )
})

@observer export class App extends Component {

  @observable.ref
  private navigationState: NavigationState | undefined

  @boundMethod
  @action
  private updateNavigationState(state: NavigationState | undefined) {
    this.navigationState = state
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    const labelStyle = StyleSheet.create({
      text: {
        marginTop: IS_ANDROID ? -2 : 0,
        marginBottom: IS_ANDROID ? 5 : 0
      }
    })

    return (
      <AppearanceProvider>
        <NavigationContainer
          onStateChange={this.updateNavigationState}
          theme={{
            dark: optionStore.darkTheme,
            colors: {
              primary: colors.primary,
              background: colors.background,
              card: colors.cardBackground,
              text: colors.textDefault,
              border: colors.border
            }
          }}
        >
          <Tab.Navigator initialRouteName={HomeRoutes.Home}>
            <Tab.Screen
              name={HomeRoutes.Home}
              component={HomeStackComponent}
              options={({ route, navigation }) => {
                const isFocused = navigation.isFocused()
                const isHomeRoute = route.name === HomeRoutes.Home
                navigation.addListener('tabPress', () => {
                  if (isFocused && isHomeRoute) {
                    return indexStore.scrollToArticleListTop()
                  }
                })

                // WORKAROUND: route.state 是一个非常 HACK 的处理方式，皆因其他数据维护太过繁琐
                const routeState = (route as any).state
                const isHomeRoot = !routeState || routeState?.index === 0
                return {
                  // 非根 Home 屏都要隐藏 Tabbar（Search、Detail）
                  tabBarVisible: isFocused && isHomeRoute && isHomeRoot,
                  tabBarLabel: ({ color }) => (
                    <AutoI18nTitle
                      i18nKey={LANGUAGE_KEYS.HOME}
                      size={12}
                      color={color}
                      style={labelStyle.text}
                    />
                  ),
                  tabBarIcon: ({ color }) => (
                    <Iconfont name="read" size={20} color={color} />
                  )
                }
              }}
            />
            <Tab.Screen
              name={GuestbookRoutes.Guestbook}
              component={GuestbookStackComponent}
              options={({ route, navigation }) => {
                navigation.addListener('tabPress', () => {
                  if (navigation.isFocused() && route.name === GuestbookRoutes.Guestbook) {
                    return guestbookStore.scrollToCommentListTop()
                  }
                })
                return {
                  tabBarLabel: ({ color }) => (
                    <AutoI18nTitle
                      i18nKey={LANGUAGE_KEYS.GUESTBOOK}
                      size={12}
                      color={color}
                      style={labelStyle.text}
                    />
                  ),
                  tabBarIcon: ({ color }) => (
                    <Iconfont name="comment-discussion" size={20} color={color} />
                  )
                }
              }}
            />
            <Tab.Screen
              name={AboutRoutes.About}
              component={AboutStackComponent}
              options={({ route }) => {
                // WORKAROUND: route.state 是一个非常 HACK 的处理方式，皆因其他数据维护太过繁琐
                const routeState = (route as any).state
                const isAboutRoot = !routeState || routeState?.index === 0
                const isAboutRoute = route.name === AboutRoutes.About
                return {
                  // 非根 About 屏都要隐藏 Tabbar（Github、Setting）
                  tabBarVisible: isAboutRoute && isAboutRoot,
                  tabBarLabel: ({ color }) => (
                    <AutoI18nTitle
                      i18nKey={LANGUAGE_KEYS.ABOUT}
                      size={12}
                      color={color}
                      style={labelStyle.text}
                    />
                  ),
                  tabBarIcon: ({ color }) => (
                    <Iconfont name="user" size={19} color={color} />
                  )
                }
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AppearanceProvider>
    )
  }
}

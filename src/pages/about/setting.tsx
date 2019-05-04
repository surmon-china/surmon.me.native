/**
 * About setting
 * @file 设置页面
 * @module pages/about/setting
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component } from 'react'
import { Animated, StyleSheet, View, Switch, Alert } from 'react-native'
import { observable, action, reaction } from 'mobx'
import { observer } from 'mobx-react/native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Text } from '@app/components/common/text'
import { TouchableView } from '@app/components/common/touchable-view'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { IPageProps } from '@app/types/props'
import { optionStore } from '@app/stores/option'
import { likeStore } from '@app/stores/like'
import i18n, { TLanguage, languageMaps } from '@app/services/i18n'
import storage from '@app/services/storage'
import colors from '@app/style/colors'
import fonts from '@app/style/fonts'
import sizes from '@app/style/sizes'

interface ILanguageDetailIconProps {
  close: boolean
}

@observer
class LanguageDetailIcon extends Component<ILanguageDetailIconProps> {

  constructor(props: ILanguageDetailIconProps) {
    super(props)
    reaction(
      () => this.props.close,
      close => this.updateOpacityAnimate(close ? 1 : 0)
    )
  }

  @observable private opacity = new Animated.Value(1)

  private updateOpacityAnimate(value: number) {
    Animated.timing(
      this.opacity,
      { duration: 30, toValue: value }
    ).start()
  }

  render() {
    const { styles } = obStyles
    return (
      <>
        <Animated.View style={{ opacity: this.opacity }}>
          <Text style={styles.lineItemTitle}>
            {languageMaps[optionStore.language].name}
          </Text>
        </Animated.View>
        <Ionicon
          style={[styles.lineDetailIcon, styles.lineItemTitle]}
          name={this.props.close ? 'ios-arrow-forward' : 'ios-arrow-down'}
        />
      </>
    )
  }
}

export interface ISettingProps extends IPageProps {}

@observer
export class Setting extends Component<ISettingProps> {

  constructor(props: ISettingProps) {
    super(props)
  }

  @observable.ref isLanguageBoxCollapsed: boolean = true

  @action.bound
  private updateLanguageBoxCollapsedState(collapsed: boolean) {
    this.isLanguageBoxCollapsed = collapsed
  }

  private handleToggleLanguages = () => {
    this.updateLanguageBoxCollapsedState(!this.isLanguageBoxCollapsed)
  }

  private handleUpdateLanguage(language: TLanguage): void {
    optionStore.updateLanguage(language)
  }

  private handleToggleDarkThemeState(value: boolean): void {
    optionStore.updateDarkTheme(value)
  }

  private handleClearCache(): void {
    Alert.alert(
      i18n.t(LANGUAGE_KEYS.CLEAR_CACHE),
      i18n.t(LANGUAGE_KEYS.CLEAR_CACHE_TEXT),
      [
        {
          text: i18n.t(LANGUAGE_KEYS.CANCEL),
          style: 'cancel',
        },
        {
          text: i18n.t(LANGUAGE_KEYS.OK),
          onPress() {
            const done = () => {
              likeStore.resetStore()
              Alert.alert(i18n.t(LANGUAGE_KEYS.SUCCESS))
            }
            storage.clear().then(done).catch(done)
          }
        },
      ],
      { cancelable: false }
    )
  }

  private renderLanguagesView(): JSX.Element | null {
    if (this.isLanguageBoxCollapsed) {
      return null
    }

    const { styles } = obStyles
    return (
      <>
        {Object.keys(languageMaps).map(language => {
          const lang = language as TLanguage
          return (
            <View key={lang}>
              <TouchableView
                style={[styles.lineItem, styles.lineItemLanguage]}
                onPress={() => this.handleUpdateLanguage(lang)}
              >
                <View style={styles.lineItemLanguageContent}>
                  <Text style={styles.lineItemLanguageTitle}>{languageMaps[lang].name}</Text>
                  <Text style={styles.lineItemLanguageEnglish}>{languageMaps[lang].english}</Text>
                </View>
                <View style={styles.lineItemContent}>
                  <Ionicon
                    name="ios-checkmark"
                    style={[
                      styles.lineItemTitle,
                      fonts.h1,
                      {
                        color:
                          lang === optionStore.language
                          ? colors.primary
                          : colors.textSecondary
                      }
                    ]}
                  />
                </View>
              </TouchableView>
              <View style={styles.lineSeparator}></View>
            </View>
          )
        })}
      </>
    )
  }

  render() {
    const { styles } = obStyles
    return (
      <View style={styles.container}>
        <View style={styles.lineSeparator}></View>
        <View style={styles.lineItem}>
          <View style={styles.lineItemContent}>
            <Ionicon
              name="ios-moon"
              style={[styles.lineItemIcon, styles.lineItemTitle]}
            />
            <Text style={styles.lineItemTitle}>
              {i18n.t(LANGUAGE_KEYS.DARK_THEME)}
            </Text>
          </View>
          <View style={styles.lineItemContent}>
            <Switch
              value={optionStore.darkTheme}
              onValueChange={this.handleToggleDarkThemeState}
            />
          </View>
        </View>
        <View style={styles.lineSeparator}></View>
        <TouchableView
          style={styles.lineItem}
          onPress={this.handleToggleLanguages}
        >
          <View style={styles.lineItemContent}>
            <Ionicon
              name="ios-globe"
              style={[styles.lineItemIcon, styles.lineItemTitle]}
            />
            <Text style={styles.lineItemTitle}>
              {i18n.t(LANGUAGE_KEYS.SWITCH_LANGUAGE)}
            </Text>
          </View>
          <View style={styles.lineItemContent}>
            <LanguageDetailIcon close={this.isLanguageBoxCollapsed} />
          </View>
        </TouchableView>
        <View style={styles.lineSeparator}></View>
        {this.renderLanguagesView()}
        <View style={[styles.lineSeparator, { marginTop: sizes.gap / 2 }]} />
        <TouchableView
          style={[styles.lineItem, styles.lineClearCache]}
          onPress={this.handleClearCache}
        >
          <Ionicon
            name="ios-refresh"
            style={[styles.lineItemIcon, styles.lineItemTitle]}
          />
          <Text style={styles.lineItemTitle}>
            {i18n.t(LANGUAGE_KEYS.CLEAR_CACHE)}
          </Text>
        </TouchableView>
        <View style={styles.lineSeparator}></View>
      </View>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: sizes.gap,
        backgroundColor: colors.background
      },
      lineSeparator: {
        width: '100%',
        height: sizes.borderWidth,
        backgroundColor: colors.border
      },
      lineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: sizes.gap * 2,
        paddingHorizontal: sizes.gap * 0.8,
        backgroundColor: colors.cardBackground
      },
      lineItemLanguage: {
        height: sizes.gap * 3,
        backgroundColor: colors.background
      },
      lineClearCache: {
        justifyContent: 'center'
      },
      lineItemContent: {
        flexDirection: 'row'
      },
      lineItemLanguageContent: {
        flexDirection: 'column',
        justifyContent: 'center'
      },
      lineItemTitle: {
        lineHeight: sizes.gap * 2
      },
      lineItemLanguageTitle: {
        ...fonts.h4
      },
      lineItemLanguageEnglish: {
        ...fonts.small
      },
      lineItemIcon: {
        ...fonts.h3,
        color: colors.textDefault,
        width: sizes.gap,
        marginRight: sizes.gap / 2
      },
      lineDetailIcon: {
        ...fonts.h4,
        color: colors.textSecondary,
        marginLeft: sizes.gap / 2
      }
    })
  }
})

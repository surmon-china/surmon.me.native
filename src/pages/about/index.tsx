/**
 * About
 * @file 关于我页面
 * @module pages/about
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component } from 'react'
import { ImageSourcePropType, ImageBackground, SectionList, Linking, StyleSheet, Image, View, Alert } from 'react-native'
import { NavigationScreenConfigProps } from 'react-navigation'
import { observable, computed, action } from 'mobx'
import { observer } from 'mobx-react/native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { webUrl, IS_ANDROID } from '@app/config'
import { EAboutRoutes } from '@app/routes'
import { IPageProps } from '@app/types/props'
import { THttpSuccessResponse } from '@app/types/http'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { TouchableView } from '@app/components/common/touchable-view'
import { Remind } from '@app/components/common/remind'
import { Text } from '@app/components/common/text'
import { CustomHeader } from '@app/components/layout/header'
import i18n from '@app/services/i18n'
import fetch from '@app/services/fetch'
import colors from '@app/style/colors'
import fonts from '@app/style/fonts'
import sizes from '@app/style/sizes'
import mixins from '@app/style/mixins'

enum ESection {
  Follow = 'follow',
  Social = 'social',
  Setting = 'setting'
}

interface IUserInfo {
  gravatar: ImageSourcePropType
  name: string
  slogan: string
}

type TStatisticValue = number | '-'

interface ITodayStatistic {
  tags: TStatisticValue
  views: TStatisticValue
  articles: TStatisticValue
  comments: TStatisticValue
}

export interface IAboutProps extends IPageProps {}

@observer
export class About extends Component<IAboutProps> {

  constructor(props: IAboutProps) {
    super(props)
    this.fetchUserInfo()
    this.fetchStatistic()
  }

  static navigationOptions = (config: NavigationScreenConfigProps) => {
    if (IS_ANDROID) {
      return null
    }
    return {
      headerTitle: (
        <CustomHeader title={i18n.t(LANGUAGE_KEYS.ABOUT)} />
      )
    }
  }
  
  @observable.ref
  private userInfo: IUserInfo = {
    gravatar: require('@app/assets/images/gravatar.png'),
    name: '-',
    slogan: '-'
  }
  
  @observable.ref
  private statistic: ITodayStatistic = {
    tags: '-',
    views: '-',
    articles: '-',
    comments: '-'
  }

  private fetchUserInfo() {
    fetch.get<IUserInfo>('/auth/admin')
      .then(action((userInfo: THttpSuccessResponse<IUserInfo>) => {
        this.userInfo = {
          ...userInfo.result,
          gravatar: { uri: userInfo.result.gravatar as string }
        }
      }))
      .catch(error => {
        console.warn('Get user info data failed:', error)
      })
  }

  private fetchStatistic() {
    fetch.get<ITodayStatistic>('/expansion/statistic')
      .then(action((statistic: THttpSuccessResponse<ITodayStatistic>) => {
        this.statistic = statistic.result
      }))
      .catch(error => {
        console.warn('Get statistic data failed:', error)
      })
  }

  private openUrl(url: string): Promise<any> {
    return Linking
      .openURL(url)
      .catch(error => {
        console.warn('Open url failed:', error)
        return Promise.reject(error)
      })
  }

  @computed
  private get socials() {
    return [
      {
        name: 'Stack Overflow',
        key: 'stack-overflow',
        icon: (
          <FontAwesome
            name="stack-overflow"
            style={[obStyles.styles.lineIcon, fonts.h4, obStyles.styles.lineTitle]}
          />
        ),
        url: 'https://stackoverflow.com/users/6222535/surmon?tab=profile'
      },
      {
        name: 'Twitter',
        key: 'twitter',
        icon: 'logo-twitter',
        url: 'https://twitter.com/surmon_me'
      },
      {
        name: i18n.t(LANGUAGE_KEYS.WEIBO),
        key: 'weibo',
        remind: true,
        icon: (
          <FontAwesome
            name="weibo"
            style={[obStyles.styles.lineIcon, fonts.h4, obStyles.styles.lineTitle]}
          />
        ),
        url: 'https://weibo.com/surmon'
      },
      {
        name: i18n.t(LANGUAGE_KEYS.LINKEDIN),
        key: 'linkedin',
        icon: 'logo-linkedin',
        url: 'http://www.linkedin.com/in/surmon-ma-713bb6a2/'
      },
      {
        name: 'Telegram',
        key: 'telegram',
        icon: (
          <FontAwesome
            name="telegram"
            style={[obStyles.styles.lineIcon, fonts.h4, obStyles.styles.lineTitle]}
          />
        ),
        url: 'https://t.me/surmon'
      },
      {
        name: 'Instagram',
        key: 'instagram',
        icon: 'logo-instagram',
        url: 'https://www.instagram.com/surmon666/'
      }
    ]
  }

  @computed
  private get follows() {
    return [
      {
        name: i18n.t(LANGUAGE_KEYS.GITHUB),
        key: 'github',
        icon: 'logo-github',
        onPress: () => {
          this.props.navigation.push(EAboutRoutes.Github)
        }
      },
      {
        name: i18n.t(LANGUAGE_KEYS.VLOG),
        key: 'vlog',
        icon: 'ios-film',
        onPress: () => this.openUrl(`${webUrl}/vlog`)
      },
      {
        name: i18n.t(LANGUAGE_KEYS.EMAIL_ME),
        key: 'email',
        icon: 'ios-mail',
        onPress: () => this
          .openUrl('mailto:surmon@foxmail.com')
          .catch(() => Alert.alert(i18n.t(LANGUAGE_KEYS.CALL_EMAIL_ERROR)))
      }
    ]
  }

  @computed
  private get settings() {
    return [
      {
        name: i18n.t(LANGUAGE_KEYS.SETTING),
        key: 'setting',
        icon: 'ios-settings',
        onPress: () => {
          this.props.navigation.push(EAboutRoutes.Setting)
        }
      }
    ]
  }

  @computed
  private get sections() {
    return [
      { key: ESection.Follow, data: this.follows },
      { key: ESection.Social, data: this.socials },
      { key: ESection.Setting, data: this.settings }
    ]
  }

  render() {
    const { styles } = obStyles
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.user}
          source={this.userInfo.gravatar}
          blurRadius={90}
        >
          <Image
            style={styles.userGravatar}
            source={this.userInfo.gravatar}
          />
          <View>
            <Text style={styles.userName}>{this.userInfo.name}</Text>
            <Text style={styles.userSlogan}>{this.userInfo.slogan}</Text>
          </View>
        </ImageBackground>
        <View style={styles.statistic}>
          <View style={styles.statisticItem}>
            <Text style={styles.statisticCount}>{this.statistic.articles}</Text>
            <Text style={styles.statisticTitle}>{i18n.t(LANGUAGE_KEYS.ARTICLE)}</Text>
          </View>
          <View style={styles.statisticSeparator}></View>
          <View style={styles.statisticItem}>
            <Text style={styles.statisticCount}>{this.statistic.tags}</Text>
            <Text style={styles.statisticTitle}>{i18n.t(LANGUAGE_KEYS.TAG)}</Text>
          </View>
          <View style={styles.statisticSeparator}></View>
          <View style={styles.statisticItem}>
            <Text style={styles.statisticCount}>{this.statistic.comments}</Text>
            <Text style={styles.statisticTitle}>{i18n.t(LANGUAGE_KEYS.COMMENT)}</Text>
          </View>
          <View style={styles.statisticSeparator}></View>
          <View style={styles.statisticItem}>
            <Text style={styles.statisticCount}>{this.statistic.views}</Text>
            <Text style={styles.statisticTitle}>{i18n.t(LANGUAGE_KEYS.TODAY_VIEWS)}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <SectionList
            sections={this.sections}
            ListHeaderComponent={<View style={styles.listHeaderAndFooter} />}
            ListFooterComponent={<View style={styles.listHeaderAndFooter} />}
            SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
            ItemSeparatorComponent={() => <View style={styles.lineItemSeparator} />}
            renderItem={({ item, index, section }) => (
              <TouchableView
                style={[
                  styles.line,
                  index === 0 ? styles.firstLineSeparator : null,
                  index === section.data.length - 1
                    ? styles.lastLineSeparator
                    : null
                ]}
                onPress={() => {
                  section.key === ESection.Social
                    ? this.openUrl(item.url)
                    : item.onPress()
                }}
              >
                <View style={styles.lineContent}>
                  {typeof item.icon === 'string'
                    ? <Ionicon style={[styles.lineIcon, styles.lineTitle]} name={item.icon} />
                    : item.icon
                  }
                  <Text style={styles.lineTitle}>{item.name}</Text>
                  {item.remind && (
                    <Remind style={[styles.lineTitle, styles.lineRemindIcon]} />
                  )}
                </View>
                <Ionicon
                  name="ios-arrow-forward"
                  style={[styles.lineDetailIcon, styles.lineTitle]}
                />
              </TouchableView>
            )}
          />
        </View>
      </View>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background
      },
      user: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: sizes.gap / 2,
        paddingHorizontal: sizes.gap,
        backgroundColor: colors.cardBackground,
        borderBottomColor: colors.border,
        borderBottomWidth: sizes.borderWidth
      },
      userGravatar: {
        width: 70,
        height: 70,
        marginRight: sizes.gap,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: colors.border
      },
      userName: {
        ...fonts.h2,
        fontWeight: 'bold',
        color: colors.cardBackground,
        marginTop: sizes.gap,
        marginBottom: sizes.gap / 2
      },
      userSlogan: {
        ...fonts.base,
        color: colors.cardBackground,
        marginBottom: sizes.gap
      },
      statistic: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: sizes.gap * 3,
        borderBottomWidth: sizes.borderWidth,
        borderBottomColor: colors.border,
        backgroundColor: colors.cardBackground
      },
      statisticItem: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      },
      statisticCount: {
        ...fonts.h3
      },
      statisticTitle: {
        ...fonts.small
      },
      statisticSeparator: {
        width: sizes.borderWidth,
        height: sizes.gap * 2,
        marginTop: sizes.gap / 2,
        backgroundColor: colors.border
      },
      section: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
      },
      listHeaderAndFooter: {
        height: sizes.gap / 2
      },
      sectionSeparator: {
        height: sizes.gap / 4
      },
      line: {
        ...mixins.rowCenter,
        justifyContent: 'space-between',
        height: sizes.gap * 2,
        paddingHorizontal: sizes.gap * 0.8,
        backgroundColor: colors.cardBackground
      },
      firstLineSeparator: {
        borderTopWidth: sizes.borderWidth,
        borderTopColor: colors.border
      },
      lastLineSeparator: {
        borderBottomWidth: sizes.borderWidth,
        borderBottomColor: colors.border
      },
      lineContent: {
        ...mixins.rowCenter
      },
      lineTitle: {
      },
      lineIcon: {
        ...fonts.h3,
        width: sizes.gap,
        marginRight: sizes.gap / 2,
        color: colors.textDefault
      },
      lineDetailIcon: {
        ...fonts.h4,
        color: colors.textSecondary
      },
      lineRemindIcon: {
        marginLeft: sizes.gap / 2
      },
      lineItemSeparator: {
        height: sizes.borderWidth,
        backgroundColor: colors.border
      }
    })
  }
})

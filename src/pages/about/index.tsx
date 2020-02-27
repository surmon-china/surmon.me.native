/**
 * About
 * @file 关于我页面
 * @module pages/about
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component } from 'react'
import { ImageSourcePropType, ImageBackground, SectionList, Linking, StyleSheet, Image, View, Alert } from 'react-native'
import { observable, computed, action } from 'mobx'
import { observer } from 'mobx-react'
import { webUrl, email } from '@app/config'
import { AboutRoutes } from '@app/constants/routes'
import { IPageProps } from '@app/types/props'
import { THttpSuccessResponse } from '@app/types/http'
import { Iconfont } from '@app/components/common/iconfont'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { TouchableView } from '@app/components/common/touchable-view'
import { Remind } from '@app/components/common/remind'
import { Text } from '@app/components/common/text'
import i18n from '@app/services/i18n'
import fetch from '@app/services/fetch'
import colors from '@app/style/colors'
import fonts from '@app/style/fonts'
import sizes from '@app/style/sizes'
import mixins from '@app/style/mixins'

enum Sections {
  Follow = 'follow',
  Social = 'social',
  Setting = 'setting'
}

interface ISectionItem {
  name: string
  key: string
  iconName: string
  url?: string
  remind?: boolean
  onPress?(): void
}

interface IUserInfo {
  gravatar: ImageSourcePropType
  name: string
  slogan: string
}

type StatisticValue = number | '-'

interface ITodayStatistic {
  tags: StatisticValue
  views: StatisticValue
  articles: StatisticValue
  comments: StatisticValue
}

export interface IAboutProps extends IPageProps {}

@observer
export class About extends Component<IAboutProps> {

  constructor(props: IAboutProps) {
    super(props)
    this.fetchUserInfo()
    this.fetchStatistic()
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
        name: 'Twitter',
        key: 'twitter',
        iconName: 'twitter',
        url: 'https://twitter.com/surmon_me'
      },
      {
        name: i18n.t(LANGUAGE_KEYS.LINKEDIN),
        key: 'linkedin',
        iconName: 'linkedin',
        url: 'http://www.linkedin.com/in/surmon-ma-713bb6a2/'
      },
      {
        name: 'Telegram',
        key: 'telegram',
        iconName: 'telegram',
        url: 'https://t.me/surmon'
      },
      {
        remind: true,
        name: 'Instagram',
        key: 'instagram',
        iconName: 'instagram',
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
        iconName: 'github',
        onPress: () => {
          this.props.navigation.push(AboutRoutes.Github)
        }
      },
      {
        name: i18n.t(LANGUAGE_KEYS.VLOG),
        key: 'vlog',
        iconName: 'vlog',
        onPress: () => this.openUrl(`${webUrl}/vlog`)
      },
      {
        name: i18n.t(LANGUAGE_KEYS.EMAIL_ME),
        key: 'email',
        iconName: 'mail',
        onPress: () => this
          .openUrl(`mailto:${email}`)
          .catch(() => Alert.alert(i18n.t(LANGUAGE_KEYS.CALL_EMAIL_ERROR)))
      },
      {
        name: i18n.t(LANGUAGE_KEYS.SPONSOR),
        key: 'sponsor',
        iconName: 'dollar',
        onPress: () => this.openUrl(`${webUrl}/sponsor`)
      },
      {
        name: 'RSS',
        key: 'rss',
        iconName: 'rss',
        onPress: () => this.openUrl(`${webUrl}/rss.xml`)
      }
    ]
  }

  @computed
  private get settings() {
    return [
      {
        name: i18n.t(LANGUAGE_KEYS.SETTING),
        key: 'setting',
        iconName: 'setting',
        onPress: () => {
          this.props.navigation.push(AboutRoutes.Setting)
        }
      }
    ]
  }

  render() {
    const { styles } = obStyles
    const sections = [
      { key: Sections.Follow, data: this.follows.slice() },
      { key: Sections.Social, data: this.socials.slice() },
      { key: Sections.Setting, data: this.settings.slice() }
    ]

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
            <Text style={styles.statisticTitle}>{i18n.t(LANGUAGE_KEYS.ARTICLES)}</Text>
          </View>
          <View style={styles.statisticSeparator} />
          <View style={styles.statisticItem}>
            <Text style={styles.statisticCount}>{this.statistic.tags}</Text>
            <Text style={styles.statisticTitle}>{i18n.t(LANGUAGE_KEYS.TAGS)}</Text>
          </View>
          <View style={styles.statisticSeparator} />
          <View style={styles.statisticItem}>
            <Text style={styles.statisticCount}>{this.statistic.comments}</Text>
            <Text style={styles.statisticTitle}>{i18n.t(LANGUAGE_KEYS.COMMENTS)}</Text>
          </View>
          <View style={styles.statisticSeparator} />
          <View style={styles.statisticItem}>
            <Text style={styles.statisticCount}>{this.statistic.views}</Text>
            <Text style={styles.statisticTitle}>{i18n.t(LANGUAGE_KEYS.TODAY_VIEWS)}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <SectionList<ISectionItem>
            sections={sections}
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
                  if (section.key === Sections.Social && item.url) {
                    this.openUrl(item.url)
                  } else if (item.onPress) {
                    item.onPress()
                  }
                }}
              >
                <View style={styles.lineContent}>
                  <Iconfont style={styles.lineIcon} name={item.iconName} />
                  <Text>{item.name}</Text>
                  {item.remind && (<Remind style={styles.lineRemindIcon} />)}
                </View>
                <Iconfont name="next" style={styles.lineDetailIcon} />
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
        ...fonts.small,
        marginTop: 2,
        textTransform: 'capitalize'
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
        width: sizes.gap,
        marginRight: sizes.gap / 2,
        color: colors.textDefault
      },
      lineDetailIcon: {
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

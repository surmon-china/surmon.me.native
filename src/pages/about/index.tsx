
import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react/native'
import { ImageSourcePropType, ImageBackground, TouchableOpacity, SectionList, Linking, StyleSheet, Image, Text, View, Alert } from 'react-native'
import { NavigationContainerProps } from "react-navigation"
import Ionicon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import colors from '@app/style/colors'
import { EAboutRoutes } from '@app/index'
import * as fonts from '@app/style/fonts'
import * as sizes from '@app/style/sizes'
import * as fetchService from '@app/services/fetch'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  user: {
    paddingVertical: sizes.gap / 2,
    paddingHorizontal: sizes.gap,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.cardBackground,
    borderBottomColor: colors.textPrimary,
    borderBottomWidth: sizes.borderWidth,
  },
  userGravatar: {
    width: 70,
    height: 70,
    marginRight: sizes.gap,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.textPrimary
  },
  userName: {
    ...fonts.h2,
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
    height: sizes.gap * 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: sizes.borderWidth,
    borderBottomColor: colors.textMuted,
    backgroundColor: colors.cardBackground,
  },
  statisticItem: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  statisticCount: {
    ...fonts.h3,
  },
  statisticTitle: {
    ...fonts.small
  },
  statisticSeparator: {
    width: sizes.borderWidth,
    height: sizes.gap * 2,
    marginTop: sizes.gap / 2,
    backgroundColor: colors.textPrimary
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizes.gap / 2
  },
  sectionHeaderSeparator: {
    height: sizes.gap,
  },
  sectionItem: {
    height: sizes.gap * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.cardBackground,
  },
  sectionItemContent: {
    flexDirection: 'row',
  },
  sectionTitle: {
    lineHeight: sizes.gap * 2,
  },
  sectionIcon: {
    ...fonts.h3,
    width: sizes.gap,
    marginLeft: sizes.gap * 0.8,
    marginRight: sizes.gap / 2,
    color: colors.textTitle
  },
  sectionDetailIcon: {
    ...fonts.h3,
    marginRight: sizes.gap * 0.8,
    color: colors.textDefault
  },
  sectionRemindIcon: {
    marginLeft: sizes.gap / 2,
    color: '#e85e58'
  },
  sectionItemSeparator: {
    height: sizes.borderWidth,
    backgroundColor: colors.textMuted,
  }
})

enum ESection {
  Follow = 'follow',
  Social = 'social',
  Setting = 'setting',
}

interface IUserInfo {
  gravatar: ImageSourcePropType
  name: string
  slogan: string
}

interface ITodayStatistic {
  tags: number | string
  views: number | string
  articles: number | string
  comments: number | string
}

interface IProps extends NavigationContainerProps {}

@observer export class About extends Component<IProps> {

  static navigationOptions = {
    title: 'About',
  }

  constructor(props: IProps) {
    super(props)
    this.fetchUserInfo()
    this.fetchStatistic()
  }
  
  @observable.ref private userInfo: IUserInfo = {
    gravatar: require('@app/assets/images/gravatar.jpg'),
    name: 'Surmon',
    slogan: 'Talk is cheap. Show me the code.'
  }
  
  @observable.ref private statistic: ITodayStatistic = {
    tags: '-',
    views: '-',
    articles: '-',
    comments: '-'
  }

  @action.bound private updateUserInfo(userInfo: IUserInfo) {
    this.userInfo = userInfo
  }

  @action.bound private updateStatistic(statistic: ITodayStatistic) {
    this.statistic = statistic
  }

  private fetchUserInfo() {
    fetchService.get<IUserInfo>('/auth/admin')
      .then(userInfo => {
        this.updateUserInfo(Object.assign(userInfo.result, {
          gravatar: {
            uri: userInfo.result.gravatar
          }
        }))
      })
      .catch(error => {
        console.warn('个人资料请求失败啦', error)
      })
  }

  private fetchStatistic() {
    fetchService.get<ITodayStatistic>('/expansion/statistic')
      .then(statistic => {
        this.updateStatistic(statistic.result)
      })
      .catch(error => {
        console.warn('统计信息请求失败啦', error)
      })
  }

  private handleOpenUrl(url: string): Promise<any> {
    return Linking
      .openURL(url)
      .catch(error => {
        console.warn('打开链接出错啦: ', error)
        return Promise.reject(error)
      })
  }

  private socials = [
    {
      name: 'Stack Overflow',
      key: 'stack-overflow',
      icon: <FontAwesome style={[styles.sectionIcon, styles.sectionTitle]} name="stack-overflow" />,
      url: 'https://stackoverflow.com/users/6222535/surmon?tab=profile'
    },
    { name: 'Twitter', key: 'twitter', icon: 'logo-twitter', url: 'https://twitter.com/surmon_me' },
    {
      name: 'Weibo',
      key: 'weibo',
      remind: true,
      icon: <FontAwesome style={[styles.sectionIcon, styles.sectionTitle]} name="weibo" />,
      url: 'https://weibo.com/surmon'
    },
    {
      name: 'Linkedin',
      key: 'linkedin',
      icon: <FontAwesome style={[styles.sectionIcon, styles.sectionTitle]} name="linkedin-square" />,
      url: 'http://www.linkedin.com/in/surmon-ma-713bb6a2/'
    },
    {
      name: 'Telegram',
      key: 'telegram',
      icon: <FontAwesome style={[styles.sectionIcon, styles.sectionTitle]} name="telegram" />,
      url: 'https://t.me/surmon'
    },
    {
      name: 'Instagram',
      key: 'instagram',
      icon: <FontAwesome style={[styles.sectionIcon, styles.sectionTitle]} name="instagram" />,
      url: 'https://www.instagram.com/surmon666/'
    },
  ];

  private follows = [
    {
      name: 'Github',
      key: 'github',
      icon: 'logo-github',
      onPress() {
        // (this as About).handleOpenUrl
        (this as any).props.navigation.push(EAboutRoutes.Github)
        console.log('跳转到 github')
      }
    },
    {
      name: 'Email me',
      key: 'email',
      icon: 'md-mail',
      onPress() {
        (this as any)
        .handleOpenUrl('mailto:surmon@foxmail.com')
        .catch(() => {
          Alert.alert('不知道啥原因，反正调不起邮件客户端')
        })
      }
    },
  ];

  private settings = [
    {
      name: '设置',
      key: 'setting',
      icon: 'md-settings',
      onPress() {
        Alert.alert('当然没有设置这么牛逼的功能啦，小可爱')
      }
    },
  ];

  private sections = [
    { key: ESection.Follow, data: this.follows },
    { key: ESection.Social, data: this.socials },
    { key: ESection.Setting, data: this.settings },
  ]

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={this.userInfo.gravatar}
          style={styles.user}
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
            <Text style={styles.statisticTitle}>文章</Text>
          </View>
          <View style={styles.statisticSeparator}></View>
          <View style={styles.statisticItem}>
            <Text style={styles.statisticCount}>{this.statistic.tags}</Text>
            <Text style={styles.statisticTitle}>标签</Text>
          </View>
          <View style={styles.statisticSeparator}></View>
          <View style={styles.statisticItem}>
            <Text style={styles.statisticCount}>{this.statistic.comments}</Text>
            <Text style={styles.statisticTitle}>评论</Text>
          </View>
          <View style={styles.statisticSeparator}></View>
          <View style={styles.statisticItem}>
            <Text style={styles.statisticCount}>{this.statistic.views}</Text>
            <Text style={styles.statisticTitle}>今日阅读</Text>
          </View>
        </View>
        <View style={styles.section}>
          <SectionList
            sections={this.sections}
            renderItem={({ item, section }) => (
              <TouchableOpacity
                style={styles.sectionItem}
                onPress={() => {
                  section.key === ESection.Social
                    ? this.handleOpenUrl(item.url)
                    : item.onPress.bind(this)()
                }}
              >
                <View style={styles.sectionItemContent}>
                  {typeof item.icon === 'string'
                    ? <Ionicon style={[styles.sectionIcon, styles.sectionTitle]} name={item.icon} />
                    : item.icon
                  }
                  <Text style={styles.sectionTitle}>{item.name}</Text>
                  {item.remind && (
                    <FontAwesome style={[styles.sectionTitle, styles.sectionRemindIcon]} size={8} name="circle" />
                  )}
                </View>
                <FontAwesome style={[styles.sectionDetailIcon, styles.sectionTitle]} name="angle-right" />
              </TouchableOpacity>
            )}
            renderSectionHeader={() => <View style={styles.sectionHeaderSeparator}></View>}
            SectionSeparatorComponent={() => <View style={styles.sectionItemSeparator}></View>}
            ItemSeparatorComponent={() => <View style={styles.sectionItemSeparator}></View>}
          />
        </View>
      </View>
    )
  }
}

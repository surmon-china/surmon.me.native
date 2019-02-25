
import React, { Component } from 'react'
import { Observer } from 'mobx-react'
import { observer } from 'mobx-react/native'
import { observable, action, computed } from 'mobx'
import { NavigationContainerProps } from 'react-navigation'
import { TouchableOpacity, AsyncStorage, Alert, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
// import Markdown from 'react-native-simple-markdown'
import { AutoActivityIndicator } from '@app/components/common/activity-indicator'
import { toYMD, buildThumb } from '@app/utils/filters'
import { IArticle } from '@app/types/business'
import colors from '@app/style/colors'
import * as sizes from '@app/style/sizes'
import * as fonts from '@app/style/fonts'
import * as fetch from '@app/services/fetch'

interface IProps extends NavigationContainerProps {}

@observer export class ArticleDetail extends Component<IProps> {

  // static navigationOptions = () => ({ title: i18n.t(LANGUAGE.ABOUT) })

  constructor(props: IProps) {
    super(props)
  }

  @observable isLoading: boolean = false
  @observable article: IArticle | null = null

  @computed get articleContent(): string | null {
    return this.article && this.article.content
  }

  @computed get isLikedArticle(): boolean {
    return true
  }

  private markdownRules = {
    inlineCode: {
      react(node, output, state) {
        state.withinText = true
        return (
          <Text style={markdownStyles.inlineCode} key={state.key}>{node.content}</Text>
        )
      }
    },
    text: {
      react(node, output, state) {
        return (
          <Text style={markdownStyles.text} key={state.key}>{`\u00A0\u00A0\u00A0\u00A0${node.content}`}</Text>
        )
      }
    },
    image: {
      react(node, output, state) {
        const imageSrc = node.target.replace(/^http:\/\//ig, "https://surmon.me/proxy/")
        return (
          <Image
            key={state.key}
            source={{uri: imageSrc}}
            style={markdownStyles.image}
          />
        )
      }
    }
  }

  fetchArticleDatail(): Promise<any> {
    this.setState({loading: true})
    fetch.getArticleDetail(this.props.article.id).then(data => {
      this.setState({
        loading: false,
        article: data.result,
        articleContent: data.result.content
      })
      if (this.historyLikes.length) {
        if (this.historyLikes.includes(this.state.article.id)) {
          this.setState({ liked: true })
        }
      }
    }).catch(err => {
      console.log(err)
    })
  }

  // 喜欢文章
  likeArticle() {
    if (this.state.liked) return false
    Api.likeArticleOrSite({
      type: 2,
      id: this.props.article.id
    }).then(data => {
      this.state.liked = true
      this.state.article.meta.likes += 1
      this.forceUpdate()
      this.historyLikes.push(this.state.article.id)
      AsyncStorage.setItem('user_like_history', JSON.stringify(this.historyLikes))
    }).catch(err => {
      console.log(err)
    })
  }

  // 去留言板
  toComment() {
    Alert.alert('功能还没做')
  }

  render() {
    const { detail, article, loading, articleContent } = this.state
    const _navigator = this.props.navigator
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={{height: sizes.screen.height - 200}}>
          <Image source={buildThumb(article.thumb)} style={styles.image}>
            <View style={styles.innerImage}>
              <Text style={styles.title}>{ article.title }</Text>
              <View style={styles.meta}>
                { article.category.length
                   ? <View style={[styles.metaItem, styles.metaItemLeft]}>
                      <CommunityIcon name="book-open-variant" size={17} style={[styles.metaIcon, styles.metaText]}/>
                      <Text style={styles.metaText}>{ String(article.category.map(c => c.name).join('、')) }</Text>
                     </View>
                   : null
                }
                <View style={[styles.metaItem, styles.metaItemLeft]}>
                  <CommunityIcon name="eye" size={17} style={[styles.metaIcon, styles.metaText]}/>
                  <Text style={styles.metaText}>{ article.meta.views }</Text>
                </View>
                <View style={styles.metaItem}>
                  <CommunityIcon name="clock" size={17} style={[styles.metaIcon, styles.metaText, styles.metaDateIcon]}/>
                  <Text style={styles.metaText}>{ toYMD(article.create_at) }</Text>
                </View>
              </View>
            </View>
          </Image>
          {/* { loading 
              ? <AutoActivityIndicator style={styles.indicator}/>
              : <View style={styles.content}>
                  <Markdown styles={markdownStyles} 
                  rules={markdownRules}
                  blacklist={['list']}>{articleContent}</Markdown>
                </View>
          } */}
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem} onPress={this.toComment}>
            <Icon name="comment" size={17} style={styles.footerItemIcon}/>
            <Text style={styles.footerItemIconText}>{ `评论 (${article.meta.comments})` }</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={this.likeArticle.bind(this)}>
            <Icon name={this.state.liked ? 'favorite' : 'favorite-border'} 
                  size={17} 
                  style={[styles.footerItemIcon, {
                    color: this.state.liked ? 'red' : colors.textTitle
                  }]}/>
            <Text style={[styles.footerItemIconText, {
                    color: this.state.liked ? 'red' : colors.textTitle
                  }]}>{ `${this.state.liked ? '已' : ''}喜欢 (${article.meta.likes})` }</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const containerWidth = sizes.screen.width - sizes.gap * 2
const markdownStyles = {
  // 链接
  link: {
    fontWeight: 'bold',
    color: colors.textTitle,
    textDecorationLine: 'underline'
  },
  mailTo: {
    fontWeight: 'bold',
    color: colors.textTitle,
    textDecorationLine: 'underline'
  },
  del: {
    textDecorationLine:'line-through'
  },
  // 段落
  text: {
    color: colors.textTitle,
    fontSize: fonts.base.size,
    fontFamily: fonts.base.family,
    lineHeight: Platform.OS == 'ios' ? fonts.h3.lineHeight : fonts.h2.lineHeight
  },
  // 粗体
  strong: {
    fontWeight: '900',
    marginTop: 0,
    marginBottom: 10
  },
  // 引用
  blockQuoteSection: {
    padding: 10,
    paddingTop: 5,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: colors.textPrimary
  },
  blockQuoteSectionBar: {
    height: null,
    backgroundColor: colors.textMuted
  },
  // 行内代码块
  inlineCode: {
    margin: 3,
    padding: 3,
    fontFamily: 'Courier',
    fontWeight: '200',
    color: colors.black
  },
  // 图片
  image: {
    flex: 1,
    width: containerWidth,
    height: Platform.OS == 'ios' ? 166 : (containerWidth) * 2,
    resizeMode: 'contain',
    marginBottom: 0
  },
  heading1: {
    ...fonts.h1,
    color: colors.textTitle,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 10
  },
  heading2: {
    ...fonts.h2,
    color: colors.textTitle,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 10
  },
  heading3: {
    ...fonts.h3,
    color: colors.textTitle,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10
  },
  heading4: {
    ...fonts.h4,
    color: colors.textTitle,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 10
  },
  heading5: {
    ...fonts.h5,
    color: colors.textTitle,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 10
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: sizes.screen.width,
    height: 260,
    resizeMode: 'cover',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  innerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200
  },
  title: {
    margin: 15,
    ...fonts.h1,
    lineHeight: 40,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.cardBackground
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: sizes.padding / 2,
    borderTopColor: colors.cardBackground,
    borderTopWidth: 1
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  metaItemLeft: {
    marginRight: sizes.padding / 2,
  },
  metaIcon: {
    padding: 3,
    marginRight: 5
  },
  metaText: {
    color: colors.cardBackground
  },
  metaDateIcon: {
    marginTop: 2
  },
  indicator: {
    marginTop: (sizes.screen.height - 260) / 2
  },
  content: {
    padding: sizes.padding,
    marginBottom: sizes.padding * 2
  },
  footer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: sizes.screen.width,
    height: sizes.padding * 2.2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
  },
  footerItem: {
    width: sizes.screen.width / 2,
    height: sizes.padding * 2.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerItemIcon: {
    marginRight: 10,
    color: colors.textTitle
  },
  footerItemIconText: {
    color: colors.textTitle
  }
})


import React, { Component } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { observer } from 'mobx-react/native'
import { observable, action, computed, reaction } from 'mobx'
import { boundMethod } from 'autobind-decorator'
import { TouchableOpacity, Animated, ImageBackground, Alert, ScrollView, StyleSheet, View, SafeAreaView } from 'react-native'
import { AutoActivityIndicator } from '@app/components/common/activity-indicator'
import { Markdown } from '@app/components/common/markdown'
import { Text } from '@app/components/common/text'
import { DoubleClick } from '@app/components/common/double-click'
import { toYMD } from '@app/utils/filters'
import { IArticle } from '@app/types/business'
import { IPageProps } from '@app/types/props'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { EHomeRoutes } from '@app/routes'
import mixins, { getHeaderButtonStyle } from '@app/style/mixins'
import i18n from '@app/services/i18n'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'
import fetch from '@app/services/fetch'

const headerHeight = sizes.gap * 3
const headerHeightCollapsed = sizes.gap * 2.5
const headerDescriptionHeight = 20
const thumbHeight = sizes.screen.width / sizes.thumbHeightRatio

interface IProps extends IPageProps {}

@observer export class ArticleDetail extends Component<IProps> {

  static navigationOptions = () => ({
    title: i18n.t(LANGUAGE_KEYS.ARTICLE_DETAIL),
    headerBackTitle: null,
    header: null
  })

  constructor(props: IProps) {
    super(props)
    this.fetchArticleDatail()
    reaction(
      () => this.isHeaderCollapsed,
      collapse => this.startHeaderAnimate(collapse),
      { fireImmediately: true }
    )
  }

  private articleDetailRef: any = null
  
  @boundMethod updateArticleDetailRef(ref: any) {
    this.articleDetailRef = ref
  }

  @observable isLoading: boolean = false
  @observable article: IArticle | null = null
  @observable isHeaderCollapsed: boolean = false
  @observable headerHeight = new Animated.Value(headerHeight)
  @observable headerDescriptionOpacity = new Animated.Value(1)
  @observable headerDescriptionHeight = new Animated.Value(headerDescriptionHeight)

  private startHeaderAnimate(collapse: boolean) {
    Animated.parallel([
      Animated.timing(this.headerHeight, {
        toValue: collapse ? headerHeightCollapsed : headerHeight,
        duration: 288
      }),
      Animated.timing(this.headerDescriptionOpacity, {
        toValue: collapse ? 0 : 1,
        duration: 188
      }),
      Animated.timing(this.headerDescriptionHeight, {
        toValue: collapse ? 0 : headerDescriptionHeight,
        duration: 288
      })
    ]).start()
  }

  @computed get articleContent(): string | null {
    return this.article && this.article.content
  }

  @computed get isLikedArticle(): boolean {
    // return globalStore.articleLikes.includes(this.article.id)
    return true
  }

  @action private updateHeaderCollapsedState(collapse: boolean) {
    this.isHeaderCollapsed = collapse
  }

  @action private updateLoadingState(loading: boolean) {
    this.isLoading = loading
  }

  @action private updateArticle(article: IArticle | null) {
    if (article && article.content) {
      const { content } = article
      const thumbContent = `![](${article.thumb})`
      const isBrStart = content.startsWith('\n')
      const isIncludeThumb = content && content.includes(thumbContent)
      if (isIncludeThumb) {
        article.content = article.content.replace(thumbContent, '')
      }
      if (isBrStart) {
        article.content = article.content.replace('\n', '')
      }
      // FIX: Lazy loading content
      article.content = article.content.replace(/data-src=/ig, 'src=')
      // FIX: Did not receive response to shouldStartLoad in time, defaulting to YES
      article.content = article.content.replace(/src="\/\//ig, 'src="https://')
    }
    this.article = article
  }

  @action private updateResultData(article: IArticle) {
    this.updateLoadingState(false)
    this.updateArticle(article)
  }

  private fetchArticleDatail(): Promise<any> {
    this.updateLoadingState(true)
    return fetch.get<IArticle>(`/article/${this.getArticleId()}`)
      .then(article => {
        this.updateResultData(article.result)
        return article
      })
      .catch(error => {
        this.updateLoadingState(false)
        console.warn('Fetch article detail error:', error)
        return Promise.reject(error)
      })
  }

  @boundMethod private getParamArticle(): IArticle {
    const { params } = this.props.navigation.state
    return params && params.article
  }

  @boundMethod private getArticleId(): string {
    const { params } = this.props.navigation.state
    const article = this.getParamArticle()
    const articleId = params && params.articleId
    return article ? article.id : articleId
  }

  @boundMethod private handleGoBack() {
    this.props.navigation.goBack(null)
  }

  @boundMethod private handleScrollToTop() {
    this.articleDetailRef.scrollTo({ y: 0 })
  }

  @boundMethod private handleToNewArticle(article: IArticle) {
    this.props.navigation.navigate({
      key: String(article.id),
      routeName: EHomeRoutes.ArticleDetail,
      params: { article }
    })
  }

  @boundMethod private handleLikeArticle() {
    if (this.isLikedArticle) {
      return true
    }
    fetch.patch<any>('/like/article', { post_id: 130 })
      .then(_ => {
        // Object.assign({}, this.article, )
        // globalStore.updateArticleLikes(130)
        // this.updateArticle()
      })
      .catch(error => console.warn('Fetch like article error:', error))
  }

  @boundMethod private handlePageScroll(event: any) {
    const pageOffsetY = event.nativeEvent.contentOffset.y
    this.updateHeaderCollapsedState(pageOffsetY > headerHeight)
  }

  // 去留言板
  toComment() {
    Alert.alert('功能还没做')
  }

  render() {
    const { styles } = obStyles
    const { article, isLoading } = this
    const automaticArticle = this.article || this.getParamArticle()
    return (
      <SafeAreaView style={[styles.container, styles.cardBackground]}>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.header,
              mixins.rowCenter,
              styles.cardBackground,
              { height: this.headerHeight }
            ]}
          >
            <TouchableOpacity onPress={this.handleGoBack}>
              <Ionicon name="ios-arrow-back" {...getHeaderButtonStyle()} />
            </TouchableOpacity>
            <View style={styles.name}>
              <DoubleClick onDoubleClick={this.handleScrollToTop}>
                <Text style={styles.title} numberOfLines={1}>
                  {automaticArticle ? automaticArticle.title : '...'}
                </Text>
              </DoubleClick>
              <Animated.View
                style={{
                  height: this.headerDescriptionHeight,
                  opacity: this.headerDescriptionOpacity
                }}
              >
                <Text style={styles.description} numberOfLines={1}>
                  {automaticArticle ? automaticArticle.description : '...'}
                </Text>
              </Animated.View>
            </View>
          </Animated.View>
          <Animated.View
            style={[styles.container, { transform: [{ translateY: this.headerHeight }] }]}
          >
            <ScrollView
              ref={this.updateArticleDetailRef}
              style={styles.container}
              scrollEventThrottle={16}
              onScroll={this.handlePageScroll}
            >
              <ImageBackground
                style={styles.thumb}
                source={automaticArticle ? { uri: automaticArticle.thumb } : {}}
              />
              {automaticArticle && (
                <View style={[styles.meta, styles.cardBackground, styles.headerMeta]}>
                  <Text style={styles.metaText}>阅读 {automaticArticle.meta.views}  ∙  </Text>
                  <Text style={styles.metaText}>喜欢 {automaticArticle.meta.likes}  ∙  </Text>
                  <Text style={styles.metaText}>评论 {automaticArticle.meta.comments}  ∙  </Text>
                  <Text style={styles.metaText}>最后编辑于 {toYMD(automaticArticle.update_at)}</Text>
                </View>
              )}
              <View style={[styles.content, styles.cardBackground]}>
                { isLoading
                  ? <AutoActivityIndicator style={styles.indicator} text="加载中..." />
                  : <Markdown
                      navigation={this.props.navigation}
                      sanitize={false}
                      style={styles.markdown}
                      padding={sizes.goldenRatioGap}
                      markdown={this.articleContent}
                    />
                }
                {article && (
                  <View style={[styles.cardBackground, styles.footerMeta]}>
                    <Text style={styles.metaText}>发布于 {toYMD(automaticArticle.create_at)}</Text>
                    <View style={styles.footerMetaItems}>
                      <Text style={styles.metaText}>
                        { article.category.length
                          ? `${String(article.category.map(c => c.name).join('、'))}  ∙  `
                          : '无分类'
                        }
                      </Text>
                      <Text style={styles.metaText}>
                        { article.tag.length
                          ? `${String(article.tag.map(t => t.name).join('、'))}`
                          : '无标签'
                        }
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              {article && article.related.length && (
                <View style={[styles.related, styles.cardBackground]}>
                  <Text style={styles.relatedTitle}>相关文章</Text>
                  {article.related.slice(0, 3).map((item, index) => (
                    <TouchableOpacity
                      key={`${item.id}-${index}`}
                      style={styles.relatedItem}
                      onPress={(() => this.handleToNewArticle(item))}
                    >
                      <Text style={styles.relatedItemTitle}numberOfLines={1}>{item.title}</Text>
                      <View style={[mixins.rowCenter, styles.cardBackground]}>
                        <Text style={styles.metaText}>阅读 {item.meta.views}  ∙  </Text>
                        <Text style={styles.metaText}>喜欢 {item.meta.likes}  ∙  </Text>
                        <Text style={styles.metaText}>评论 {item.meta.comments}  ∙  </Text>
                        <Text style={styles.metaText}>发布于 {toYMD(item.create_at)}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>
          </Animated.View>
          
          {/* {this.article && (
            <View style={styles.footer}>
              <TouchableOpacity style={styles.footerItem} onPress={this.toComment}>
                <Icon name="comment" size={17} style={styles.footerItemIcon}/>
                <Text style={styles.footerItemIconText}>{ `评论 (${this.article.meta.comments})` }</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerItem} onPress={this.handleLikeArticle}>
                <Icon
                  size={17}
                  name={this.isLikedArticle ? 'favorite' : 'favorite-border'} 
                  style={[styles.footerItemIcon, {
                    color: this.isLikedArticle ? 'red' : colors.textTitle
                  }]}
                />
                <Text
                  style={[
                    styles.footerItemIconText, {
                      color: this.isLikedArticle ? 'red' : colors.textTitle
                    }
                  ]}
                >{ `${this.isLikedArticle ? '已' : ''}喜欢 (${this.article.meta.likes})` }</Text>
              </TouchableOpacity>
            </View>
          )} */}
        </View>
      </SafeAreaView>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        position: 'relative',
        backgroundColor: colors.background
      },
      cardBackground: {
        backgroundColor: colors.cardBackground
      },
      header: {
        borderColor: colors.border,
        borderBottomWidth: sizes.borderWidth,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
      },
      name: {
        justifyContent: 'center',
        width: sizes.screen.width - sizes.gap * 3.5
      },
      title: {
        ...fonts.h3,
        color: colors.textTitle
      },
      description: {
        ...fonts.small,
        marginTop: 2
      },
      thumb: {
        flex: 1,
        width: sizes.screen.width,
        height: thumbHeight,
        resizeMode: 'cover',
        backgroundColor: colors.inverse
      },
      meta: {
        ...mixins.rowCenter,
        paddingHorizontal: sizes.goldenRatioGap
      },
      metaText: {
        ...fonts.small,
        color: colors.textSecondary
      },
      headerMeta: {
        paddingBottom: 0,
        paddingTop: sizes.goldenRatioGap
      },
      footerMeta: {
        paddingHorizontal: sizes.goldenRatioGap,
        paddingBottom: sizes.goldenRatioGap
      },
      footerMetaItems: {
        ...mixins.rowCenter,
        marginTop: sizes.goldenRatioGap
      },
      content: {
        minHeight: sizes.screen.heightSafeArea - thumbHeight - sizes.borderWidth - headerHeight - sizes.gap - sizes.goldenRatioGap
      },
      indicator: {
        flex: 1
      },
      markdown: {
        marginVertical: sizes.goldenRatioGap,
      },
      related: {
        marginTop: sizes.gap
      },
      relatedTitle: {
        padding: sizes.goldenRatioGap,
        borderBottomColor: colors.border,
        borderBottomWidth: sizes.borderWidth,
        color: colors.textSecondary
      },
      relatedItem: {
        padding: sizes.goldenRatioGap,
        borderTopColor: colors.border,
        borderTopWidth: sizes.borderWidth
      },
      relatedItemTitle: {
        ...fonts.h4,
        marginBottom: 5
      },
      footer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: sizes.screen.width,
        height: sizes.gap * 2.2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background
      },
      footerItem: {
        width: sizes.screen.width / 2,
        height: sizes.gap * 2.2,
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
  }
})

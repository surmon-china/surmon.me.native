/**
 * Article detail
 * @file 文章详情
 * @module pages/article-detail
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component, RefObject } from 'react'
import { Animated, ImageBackground, ScrollView, Share, StyleSheet, View, SafeAreaView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { observable, action, computed, reaction } from 'mobx'
import { observer } from 'mobx-react/native'
import { boundMethod } from 'autobind-decorator'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { webUrl } from '@app/config'
import { EHomeRoutes } from '@app/routes'
import { IPageProps } from '@app/types/props'
import { IArticle } from '@app/types/business'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { likeStore } from '@app/stores/like'
import { TouchableView } from '@app/components/common/touchable-view'
import { AutoActivityIndicator } from '@app/components/common/activity-indicator'
import { Markdown } from '@app/components/common/markdown'
import { BetterModal } from '@app/components/common/modal'
import { DoubleClick } from '@app/components/common/double-click'
import { Text } from '@app/components/common/text'
import { Comment } from '@app/components/comment'
import { dateToYMD } from '@app/utils/filters'
import mixins, { getHeaderButtonStyle } from '@app/style/mixins'
import sizes, { safeAreaViewBottom } from '@app/style/sizes'
import i18n from '@app/services/i18n'
import colors from '@app/style/colors'
import fonts from '@app/style/fonts'
import fetch from '@app/services/fetch'

const headerHeight = sizes.gap * 3
const headerHeightCollapsed = sizes.gap * 2.5
const headerDescriptionHeight = 20
const thumbHeight = sizes.screen.width / sizes.thumbHeightRatio
const footerHeight = headerHeightCollapsed

export interface IArticleDetailProps extends IPageProps {}

@observer
export class ArticleDetail extends Component<IArticleDetailProps> {

  constructor(props: IArticleDetailProps) {
    super(props)
    this.fetchArticleDatail()
    reaction(
      () => this.isHeaderCollapsed,
      collapse => this.runHeaderAnimate(collapse),
      { fireImmediately: true }
    )
  }

  static navigationOptions = () => ({
    title: i18n.t(LANGUAGE_KEYS.ARTICLE_DETAIL),
    headerBackTitle: null,
    header: null
  })

  private scrollContentElement: RefObject<ScrollView> = React.createRef()

  @observable isLoading: boolean = false
  @observable article: IArticle | null = null

  @observable isHeaderCollapsed: boolean = false
  @observable commentModalVisible: boolean = false

  @observable headerHeight: Animated.Value = new Animated.Value(headerHeight)
  @observable headerDescriptionOpacity: Animated.Value = new Animated.Value(1)
  @observable headerDescriptionHeight: Animated.Value = new Animated.Value(headerDescriptionHeight)

  @boundMethod
  private getParamArticle(): IArticle {
    const { params } = this.props.navigation.state
    return params && params.article
  }

  @boundMethod
  private getArticleId(): number {
    const { params } = this.props.navigation.state
    const articleId = params && params.articleId
    const article = this.getParamArticle()
    return article ? article.id : articleId
  }

  @computed
  private get articleContent(): string | null {
    return this.article && this.article.content
  }

  @computed
  private get isLikedArticle(): boolean {
    return likeStore.articles.includes(this.getArticleId())
  }

  private runHeaderAnimate(collapse: boolean) {
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

  @action
  private updateHeaderCollapsedState(collapse: boolean) {
    this.isHeaderCollapsed = collapse
  }

  @action
  private updateLoadingState(loading: boolean) {
    this.isLoading = loading
  }

  @action
  private updateCommentModalVisible(visible: boolean) {
    this.commentModalVisible = visible
  }

  @action
  private updateAndCorrectArticle(article: IArticle | null) {
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

  @action
  private updateResultData(article: IArticle) {
    this.updateLoadingState(false)
    this.updateAndCorrectArticle(article)
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

  @boundMethod
  private handleGoBack() {
    this.props.navigation.goBack(null)
  }

  @boundMethod
  private handleScrollToTop() {
    const element = this.scrollContentElement.current
    element && element.scrollTo({ y: 0 })
  }

  private handleToNewArticle(article: IArticle) {
    this.props.navigation.navigate({
      key: String(article.id),
      routeName: EHomeRoutes.ArticleDetail,
      params: { article }
    })
  }

  @boundMethod
  private handleLikeArticle() {
    if (!this.isLikedArticle) {
      const articleId = this.getArticleId()
      const doLike = action(() => {
        likeStore.likeArticle(articleId)
        this.article && this.article.meta.likes++
      })
      fetch.patch<boolean>('/like/article', { article_id: articleId })
        .then(doLike)
        .catch(error => {
          doLike()
          console.warn('Fetch like article error:', error)
        })
    }
  }

  @boundMethod
  private handlePageScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const pageOffsetY = event.nativeEvent.contentOffset.y
    this.updateHeaderCollapsedState(pageOffsetY > headerHeight)
  }

  @boundMethod
  private handleOpenComment() {
    this.updateCommentModalVisible(true)
  }

  @boundMethod
  private async handleShare() {
    try {
      const result = await Share.share({
        title: this.article && this.article.title || '',
        url: `${webUrl}/article/${this.getArticleId()}`
      })
    } catch (error) {
      console.warn('Share article failed:', error.message);
    }
  }

  render() {
    const { styles } = obStyles
    const { article, isLoading } = this
    const automaticArticle = this.article || this.getParamArticle()

    const TextSeparator = (
      <Text style={styles.metaTextSeparator}>∙</Text>
    )

    return (
      <SafeAreaView style={[styles.container, styles.cardBackground]}>
        <View style={[styles.container, styles.article]}>
          <Animated.View
            style={[
              styles.header,
              mixins.rowCenter,
              styles.cardBackground,
              { height: this.headerHeight }
            ]}
          >
            <TouchableView
              accessibilityLabel="返回"
              accessibilityHint="返回列表页"
              onPress={this.handleGoBack}
            >
              <Ionicon
                name="ios-arrow-back"
                color={colors.textTitle}
                {...getHeaderButtonStyle()}
              />
            </TouchableView>
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
            style={[
              styles.container,
              { transform: [{ translateY: this.headerHeight }] }
            ]}
          >
            <ScrollView
              ref={this.scrollContentElement}
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
                  <Text style={styles.metaText}>
                    {i18n.t(LANGUAGE_KEYS.VIEW)} {automaticArticle.meta.views}
                  </Text>
                  {TextSeparator}
                  <Text style={styles.metaText}>
                    {i18n.t(LANGUAGE_KEYS.LIKE)} {automaticArticle.meta.likes}
                  </Text>
                  {TextSeparator}
                  <Text style={styles.metaText}>
                    {i18n.t(LANGUAGE_KEYS.LAST_UPDATE_AT)} {dateToYMD(automaticArticle.update_at)}
                  </Text>
                </View>
              )}
              <View
                accessibilityLabel={`文章内容：${this.articleContent}`}
                style={[styles.content, styles.cardBackground]}
              >
                { isLoading
                  ? <AutoActivityIndicator
                      style={styles.indicator}
                      text={i18n.t(LANGUAGE_KEYS.LOADING)}
                    />
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
                    <Text style={styles.metaText}>
                      {i18n.t(LANGUAGE_KEYS.CREATE_AT)} {dateToYMD(automaticArticle.create_at)}
                    </Text>
                    <View style={styles.footerMetaItems}>
                      <Text style={styles.metaText}>
                        { article.category.length
                          ? `${String(article.category.map(c => c.name).join('、'))}  ∙  `
                          : i18n.t(LANGUAGE_KEYS.EMPTY)
                        }
                      </Text>
                      <Text style={styles.metaText}>
                        { article.tag.length
                          ? `${String(article.tag.map(t => t.name).join('、'))}`
                          : i18n.t(LANGUAGE_KEYS.EMPTY)
                        }
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              {article && article.related.length && (
                <View style={[styles.related, styles.cardBackground]}>
                  <Text style={styles.relatedTitle}>
                    {i18n.t(LANGUAGE_KEYS.RELATED_ARTICLE)}
                  </Text>
                  {article.related.slice(0, 3).map((item, index) => (
                    <TouchableView
                      key={`${item.id}-${index}`}
                      style={styles.relatedItem}
                      onPress={(() => this.handleToNewArticle(item))}
                    >
                      <Text
                        style={styles.relatedItemTitle}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      <View style={[mixins.rowCenter, styles.cardBackground]}>
                        <Text style={styles.metaText}>
                          {i18n.t(LANGUAGE_KEYS.VIEW)} {item.meta.views}
                        </Text>
                        {TextSeparator}
                        <Text style={styles.metaText}>
                          {i18n.t(LANGUAGE_KEYS.LIKE)} {item.meta.likes}
                        </Text>
                        {TextSeparator}
                        <Text style={styles.metaText}>
                          {i18n.t(LANGUAGE_KEYS.COMMENT)} {item.meta.comments}
                        </Text>
                        {TextSeparator}
                        <Text style={styles.metaText}>
                          {i18n.t(LANGUAGE_KEYS.CREATE_AT)} {dateToYMD(item.create_at)}
                        </Text>
                      </View>
                    </TouchableView>
                  ))}
                </View>
              )}
            </ScrollView>
          </Animated.View>
          {article && (
            <View style={[styles.footer, styles.cardBackground]}>
              <TouchableView
                style={styles.footerItem}
                onPress={this.handleOpenComment}
              >
                <Ionicon
                  name="ios-chatbubbles"
                  size={15}
                  style={styles.footerItemIcon}
                />
                <Text style={styles.footerItemText}>
                  {i18n.t(LANGUAGE_KEYS.COMMENTS)}
                  {` (${article.meta.comments})`}
                </Text>
              </TouchableView>
              <TouchableView
                style={styles.footerItem}
                onPress={this.handleLikeArticle}
              >
                <Ionicon
                  size={15}
                  name="ios-heart" 
                  style={[
                    styles.footerItemIcon,
                    { color: this.isLikedArticle ? colors.red : styles.footerItemIcon.color }
                  ]}
                />
                <Text
                  style={[
                    styles.footerItemText,
                    { color: this.isLikedArticle ? colors.red : styles.footerItemText.color }
                  ]}
                >
                  {i18n.t(LANGUAGE_KEYS.LIKE)}
                  {` (${article.meta.likes})`}
                </Text>
              </TouchableView>
              <TouchableView
                style={styles.footerItem}
                onPress={this.handleShare}
              >
                <Ionicon
                  size={17}
                  name="ios-share" 
                  style={styles.footerItemIcon}
                />
                <Text style={styles.footerItemText}>
                  {i18n.t(LANGUAGE_KEYS.SHARE)}
                </Text>
              </TouchableView>
            </View>
          )}
        </View>
        <BetterModal
          visible={this.commentModalVisible}
          onClose={() => this.updateCommentModalVisible(false)}
          top={this.isHeaderCollapsed ? headerHeightCollapsed : headerHeight}
        >
          <Comment postId={this.getArticleId()} />
        </BetterModal>
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
      article: {
        paddingBottom: safeAreaViewBottom + footerHeight
      },
      header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        borderColor: colors.border,
        borderBottomWidth: sizes.borderWidth
      },
      name: {
        justifyContent: 'center',
        width: sizes.screen.width - sizes.gap * 3.5
      },
      title: {
        ...fonts.h3,
        fontWeight: 'bold',
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
      metaTextSeparator: {
        marginHorizontal: 5,
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
        minHeight: sizes.screen.heightSafeArea - thumbHeight - headerHeight - footerHeight,
        marginBottom: sizes.gap
      },
      indicator: {
        flex: 1
      },
      markdown: {
        marginVertical: sizes.goldenRatioGap,
      },
      related: {
        marginBottom: sizes.gap * 1.9
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
        height: footerHeight,
        flex: 1,
        ...mixins.rowCenter,
        justifyContent: 'space-evenly',
        borderTopColor: colors.border,
        borderTopWidth: sizes.borderWidth,
        opacity: 0.9
      },
      footerItem: {
        ...mixins.rowCenter,
        justifyContent: 'center'
      },
      footerItemIcon: {
        marginRight: 5,
        color: colors.textDefault
      },
      footerItemText: {
        color: colors.textDefault
      }
    })
  }
})

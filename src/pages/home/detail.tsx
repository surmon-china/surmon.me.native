
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { observer } from 'mobx-react/native'
import { observable, action, computed } from 'mobx'
import { boundMethod } from 'autobind-decorator'
import { TouchableOpacity, ImageBackground, Alert, ScrollView, StyleSheet, View, SafeAreaView } from 'react-native'
import { AutoActivityIndicator } from '@app/components/common/activity-indicator'
import { Markdown } from '@app/components/common/markdown'
import { Text } from '@app/components/common/text'
import { toYMD } from '@app/utils/filters'
import { IArticle } from '@app/types/business'
import { IPageProps } from '@app/types/props'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { EHomeRoutes } from '@app/routes'
import i18n from '@app/services/i18n'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'
import mixins from '@app/style/mixins'
import fetch from '@app/services/fetch'

interface IProps extends IPageProps {}

@observer export class ArticleDetail extends Component<IProps> {

  static navigationOptions = () => ({
    title: i18n.t(LANGUAGE_KEYS.ARTICLE_DETAIL),
    header: null,
  })

  constructor(props: IProps) {
    super(props)
    this.fetchArticleDatail()
  }

  @observable isLoading: boolean = false
  @observable article: IArticle | null = null

  @computed get articleContent(): string | null {
    return this.article && this.article.content
  }

  @computed get isLikedArticle(): boolean {
    // return globalStore.articleLikes.includes(this.article.id)
    return true
  }

  @action private updateLoadingState(loading: boolean) {
    this.isLoading = loading
  }

  @action private updateArticleDetail(article: IArticle | null) {
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
    this.updateArticleDetail(article)
  }

  private fetchArticleDatail(): Promise<any> {
    this.updateArticleDetail(null)
    this.updateLoadingState(true)
    return fetch.get<IArticle>(`/article/${this.getParamArticle().id}`)
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

  @boundMethod private handleGoBack() {
    this.props.navigation.goBack(null)
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
        // this.updateArticleDetail()
      })
      .catch(error => console.warn('Fetch like article error:', error))
  }

  // 去留言板
  toComment() {
    Alert.alert('功能还没做')
  }

  render() {
    const { styles } = obStyles
    const { getParamArticle, article, isLoading } = this
    const automaticArticle = article || getParamArticle()
    return (
      <SafeAreaView style={[styles.container, styles.cardBackground]}>
        <ScrollView style={styles.container}>
          <View style={[styles.header, mixins.rowCenter, styles.cardBackground]}>
            <TouchableOpacity style={styles.backButton} onPress={this.handleGoBack}>
              <Feather name="chevron-left" size={26} />
            </TouchableOpacity>
            <View style={styles.name}>
              <Text style={styles.title} numberOfLines={1}>{automaticArticle.title}</Text>
              <Text style={styles.description} numberOfLines={1}>{automaticArticle.description}</Text>
            </View>
          </View>
          <ImageBackground style={styles.thumb} source={{ uri: automaticArticle.thumb }} />
          <View style={[styles.meta, styles.cardBackground, styles.headerMeta]}>
            <Text style={styles.metaText}>阅读 {automaticArticle.meta.views}  ∙  </Text>
            <Text style={styles.metaText}>喜欢 {automaticArticle.meta.likes}  ∙  </Text>
            <Text style={styles.metaText}>评论 {automaticArticle.meta.comments}  ∙  </Text>
            <Text style={styles.metaText}>最后编辑于 {toYMD(automaticArticle.update_at)}</Text>
          </View>
          <View style={[styles.content, styles.cardBackground]}>
            { isLoading
              ? <AutoActivityIndicator style={styles.indicator} text="加载中..." />
              : <Markdown
                  sanitize={false}
                  style={styles.markdown}
                  padding={sizes.gapGoldenRatio}
                  markdown={this.articleContent}
                />
            }
            {article && (
              <View style={[styles.meta, styles.cardBackground, styles.footerMeta]}>
                <View style={styles.footerMetaItem}>
                  {article.category.length && (
                    <Text style={styles.metaText}>{String(article.category.map(c => c.name).join('、'))}  ∙  </Text>
                  )}
                  {article.tag.length && (
                    <Text style={styles.metaText}>{String(article.tag.map(t => t.name).join('、'))}  ∙  </Text>
                  )}
                  <Text style={styles.metaText}>发布于 {toYMD(automaticArticle.create_at)}</Text>
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
      </SafeAreaView>
    )
  }
}

const thumbHeight = sizes.screen.width / sizes.thumbHeightRatio
const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background
      },
      cardBackground: {
        backgroundColor: colors.cardBackground
      },
      header: {
        borderTopColor: colors.border,
        borderTopWidth: sizes.borderWidth
      },
      backButton: {
        marginHorizontal: sizes.gapGoldenRatio
      },
      name: {
        justifyContent: 'center',
        width: sizes.screen.width - sizes.gap * 3,
        height: sizes.gap * 3
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
        paddingHorizontal: sizes.gapGoldenRatio
      },
      metaText: {
        ...fonts.small,
        color: colors.textSecondary
      },
      headerMeta: {
        paddingBottom: 0,
        paddingTop: sizes.gapGoldenRatio
      },
      footerMeta: {
        paddingBottom: sizes.gapGoldenRatio
      },
      footerMetaItem: {
        ...mixins.rowCenter,
        marginRight: sizes.gap
      },
      content: {
        minHeight: sizes.screen.heightSafeArea - thumbHeight - sizes.borderWidth - sizes.gap * 4 - sizes.gapGoldenRatio
      },
      indicator: {
        flex: 1
      },
      markdown: {
        marginVertical: sizes.gapGoldenRatio,
      },
      related: {
        marginTop: sizes.gap
      },
      relatedTitle: {
        padding: sizes.gapGoldenRatio,
        borderBottomColor: colors.border,
        borderBottomWidth: sizes.borderWidth,
        color: colors.textSecondary
      },
      relatedItem: {
        padding: sizes.gapGoldenRatio,
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

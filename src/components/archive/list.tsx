
import React, { Component, RefObject } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { boundMethod } from 'autobind-decorator'
import { Observer } from 'mobx-react'
import { observer } from 'mobx-react/native'
import { observable, action, computed, reaction } from 'mobx'
import { FlatList, StyleSheet, View, TouchableHighlight } from 'react-native'
import { optionStore } from '@app/stores/option'
import { IHttpPaginate, IRequestParams, IHttpResultPaginate } from '@app/types/http'
import { AutoActivityIndicator } from '@app/components/common/activity-indicator'
import { Text } from '@app/components/common/text'
import { IArticle, ITag, ICategory } from '@app/types/business'
import { ArticleListItem } from './item'
import { ArticleArchiveHeader } from './header'
import { archiveFilterStore, EFilterType, TFilterValue } from './filter'
import { INavigationProps } from '@app/types/props'
import { STORAGE } from '@app/constants/storage'
import { EHomeRoutes } from '@app/routes'
import fetch from '@app/services/fetch'
import storage from '@app/services/storage'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'

type THttpResultPaginateArticles = IHttpResultPaginate<IArticle[]>

export type TArticleListElement = RefObject<FlatList<IArticle>>
export interface IArticleListProps extends INavigationProps {}

@observer
export class ArticleList extends Component<IArticleListProps> {
 
  constructor(props: IArticleListProps) {
    super(props)
    // 初始化得到缓存 Likes 数据后再请求数据
    this.getLocalArticleLikes().then(() => {
      this.fetchArticles()
    })
    // 当过滤条件变化时进行重请求
    reaction(
      () => [
        archiveFilterStore.filterActive,
        archiveFilterStore.filterType,
        archiveFilterStore.filterValue
      ],
      ([isActive, type, value]: any) => this.handleFilterChanged(isActive, type, value)
    )
  }

  private listElement: TArticleListElement = React.createRef()

  @observable private isLoading: boolean = false
  @observable.ref private articleLikes: number[] = []
  @observable.ref private params: IRequestParams = {}
  @observable.ref private pagination: IHttpPaginate | null = null
  @observable.shallow private articles: IArticle[] = []

  @boundMethod
  scrollToListTop() {
    const listElement = this.listElement.current
    listElement && listElement.scrollToIndex({ index: 0, viewOffset: 0 })
  }

  @action
  private updateLoadingState(loading: boolean) {
    this.isLoading = loading
  }

  @action
  private updateParams(params: IRequestParams) {
    this.params = params
  }

  @action
  private updateArticleLikes(articleLikes: number[]) {
    this.articleLikes = articleLikes || []
  }

  @action
  private updateArticles(articles: IArticle[], isAdd: boolean) {
    if (isAdd) {
      this.articles.push(...articles)
    } else {
      this.articles = articles
    }
  }

  @action
  private updateResultData(resultData: THttpResultPaginateArticles) {
    const { data, pagination } = resultData
    this.updateLoadingState(false)
    this.updateArticles(data, pagination.current_page > 1)
    this.pagination = pagination
  }

  @computed get listExtraData(): any {
    return [this.articleLikes, optionStore.language, optionStore.darkTheme]
  }

  @computed get articleListData(): IArticle[] | null {
    const { articles } = this
    return articles && articles.length
      ? articles.slice()
      : null
  }

  @computed get isNoMoreData(): boolean {
    return !!this.pagination && this.pagination.current_page === this.pagination.total_page
  }

  private getLocalArticleLikes(): Promise<any> {
    return storage.get<number[]>(STORAGE.ARTICLE_LIKES)
      .then(likes => {
        this.updateArticleLikes(likes)
        return likes
      })
      .catch(error => {
        console.warn('Get local arrticle likes error:', error)
        return Promise.reject(error)
      })
  }

  private fetchArticles(page: number = 1): Promise<any> {
    this.updateLoadingState(true)
    console.log('发起请求', { ...this.params, page })
    return fetch.get<THttpResultPaginateArticles>('/article', { ...this.params, page })
      .then(article => {
        this.updateResultData(article.result)
        return article
      })
      .catch(error => {
        this.updateLoadingState(false)
        console.warn('Fetch article list error:', error)
        return Promise.reject(error)
      })
  }

  private getArticleIdKey(article: IArticle, index?: number): string {
    return `index:${index}:sep:${article._id}:${article.id}`
  }

  private getAricleLikedState(articleId: number): boolean {
    return this.articleLikes.indexOf(articleId) > -1
  }

  private getAricleItemLayout(_: any, index: number) {
    const height = 250
    return {
      index,
      length: height,
      offset: height * index
    }
  }

  @boundMethod private handleFilterChanged(isActive: boolean, type: EFilterType, value: TFilterValue) {
    // 归顶
    if (this.pagination && this.pagination.total > 0) {
      this.scrollToListTop()
    }
    // 修正参数，更新数据
    setTimeout(() => {
      const params: IRequestParams = {}
      if (isActive && value) {
        Object.assign(
          params,
          type === EFilterType.Search && {
            keyword: value as string
          },
          type === EFilterType.Tag && {
            tag_slug: (value as ITag).slug 
          },
          type === EFilterType.Category && {
            category_slug: (value as ICategory).slug
          }
        )
      }
      this.updateParams(params)
      this.fetchArticles()
    }, 266)
  }

  @boundMethod private handleRefreshArticle() {
    this.fetchArticles()
  }

  @boundMethod private handleLoadmoreArticle() {
    if (!this.isNoMoreData && !this.isLoading && this.pagination) {
      this.fetchArticles(this.pagination.current_page + 1)
    }
  }

  @boundMethod private handleToDetailPage(article: IArticle) {
    this.props.navigation.navigate({
      key: String(article.id),
      routeName: EHomeRoutes.ArticleDetail,
      params: { article }
    })
  }

  /**
   * Empty or skeleton view
   * @function renderSkeletonOrEmptyView
   * @description 渲染文章列表为空时的两种状态：骨架屏、无数据
   */
  @boundMethod private renderSkeletonOrEmptyView(): JSX.Element {
    const { styles } = obStyles
    if (this.isLoading) {
      return <Text style={styles.h4Title}>骨架屏</Text>
    }
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.h4Title}>暂无数据，下拉刷新重试</Text>
        <TouchableHighlight
          underlayColor={colors.textSecondary}
          style={{ marginTop: sizes.gap }}
        >
          <Feather name="chevrons-down" size={22} style={{color: colors.textSecondary}} />
        </TouchableHighlight>
      </View>
    )
  }

  /**
   * 渲染加载更多
   * @function renderLoadmoreView
   * @description 渲染文章列表加载更多时的三种状态：加载中、无更多、上拉加载
   */
  @boundMethod private renderLoadmoreView(): JSX.Element | null {
    const { styles } = obStyles
    if (!this.articleListData || !this.articleListData.length) {
      return null
    }
    if (this.isLoading) {
      return (
        <View style={[styles.centerContainer, styles.loadmoreViewContainer]}>
          <AutoActivityIndicator style={{ marginRight: sizes.gap / 4 }} />
          <Text style={styles.smallTitle}>加载中...</Text>
        </View>
      )
    }
    if (this.isNoMoreData) {
      return (
        <View style={[styles.centerContainer, styles.loadmoreViewContainer]}>
          <Text style={styles.smallTitle}>没有更多啦</Text>
        </View>
      )
    }
    return (
      <View style={[styles.centerContainer, styles.loadmoreViewContainer]}>
        <Text style={[styles.smallTitle, { marginRight: sizes.gap / 4 }]}>上拉以加载更多</Text>
        <Feather name="arrow-up-circle" style={{color: colors.textSecondary}} />
      </View>
    )
  }

  render() {
    const { styles } = obStyles
    return (
      <View style={styles.listViewContainer}>
        <ArticleArchiveHeader />
        <FlatList
          style={styles.articleListView}
          data={this.articleListData}
          ref={this.listElement}
          // 首屏渲染多少个数据
          initialNumToRender={3}
          // 手动维护每一行的高度以优化性能
          getItemLayout={this.getAricleItemLayout}
          // 列表为空时渲染
          ListEmptyComponent={this.renderSkeletonOrEmptyView}
          // 加载更多时渲染
          ListFooterComponent={this.renderLoadmoreView}
          // 额外数据
          extraData={this.listExtraData}
          // 当前列表 loading 状态
          refreshing={this.isLoading}
          // 刷新
          onRefresh={this.handleRefreshArticle}
          // 加载更多安全距离（相对于屏幕高度的比例）
          onEndReachedThreshold={0}
          // 加载更多
          onEndReached={this.handleLoadmoreArticle}
          // 唯一 ID
          keyExtractor={this.getArticleIdKey}
          // 单个主体
          renderItem={({ item: article, index }) => {
            return (
              <Observer
                render={() => (
                  <ArticleListItem
                    article={article}
                    darkTheme={optionStore.darkTheme}
                    language={optionStore.language}
                    liked={this.getAricleLikedState(article.id)}
                    key={this.getArticleIdKey(article, index)}
                    onPress={this.handleToDetailPage}
                  />
                )}
              />
            )
          }}
        />
      </View>
    )
  }
}

const obStyles = observable({
  get styles() {
    return StyleSheet.create({
      listViewContainer: {
        position: 'relative',
        flex: 1
      },
      articleListView: {
        width: sizes.screen.width
      },
      centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: sizes.gap
      },
      loadmoreViewContainer: {
        flexDirection: 'row',
        padding: sizes.gap * 0.66
      },
      h4Title: {
        ...fonts.h4,
        color: colors.textSecondary
      },
      smallTitle: {
        ...fonts.small,
        color: colors.textSecondary
      }
    })
  }
})

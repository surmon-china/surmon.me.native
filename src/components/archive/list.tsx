
import React, { Component } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { Observer } from 'mobx-react'
import { observer } from 'mobx-react/native'
import { observable, action, computed } from 'mobx'
import { NavigationContainerProps } from 'react-navigation'
import { FlatList, StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { boundMethod } from 'autobind-decorator'
import { AutoActivityIndicator } from '@app/components/common/activity-indicator'
import { IHttpPaginate, IHttpResultPaginate } from '@app/types/http'
import { IArticle } from '@app/types/business'
import { ArticleListItem } from './item'
import { ArticleListHeader } from './header'
import globalStore from '@app/stores/global'
import colors from '@app/style/colors'
import * as sizes from '@app/style/sizes'
import * as fonts from '@app/style/fonts'
import * as fetch from '@app/services/fetch'
import * as storage from '@app/services/storage'
import * as STORAGE from '@app/constants/storage'

type THttpResultPaginateArticles = IHttpResultPaginate<IArticle[]>

interface IProps extends NavigationContainerProps {
  getListRef?(ref: any): void
}

@observer export class ArticleList extends Component<IProps> {
 
  constructor(props: IProps) {
    super(props)
    this.getLocalArticleLikes().then(() => {
      this.fetchArticles()
    })
  }

  @observable.ref private isLoading: boolean = false
  @observable.ref private articleLikes: number[] = []
  @observable.ref private pagination: IHttpPaginate | null = null
  @observable.shallow private articles: IArticle[] = []

  @action private updateLoadingState(loading: boolean) {
    this.isLoading = loading
  }

  @action private updatePagination(pagination: IHttpPaginate) {
    this.pagination = pagination
  }

  @action private updateArticleLikes(articleLikes: number[]) {
    this.articleLikes = articleLikes || []
  }

  @action private updateArticles(articles: IArticle[], isAdd: boolean) {
    if (isAdd) {
      this.articles.push(...articles)
    } else {
      this.articles = articles
    }
  }

  @action private updateResultData(resultData: THttpResultPaginateArticles) {
    const { data, pagination } = resultData
    this.updateLoadingState(false)
    this.updateArticles(data, pagination.current_page > 1)
    this.updatePagination(pagination)
  }

  @computed get listExtraData(): any {
    return [this.articleLikes, globalStore.language, globalStore.darkTheme]
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
        console.log('Get local arrticle likes error:', error)
        return Promise.reject(error)
      })
  }

  private fetchArticles(page: number = 1): Promise<any> {
    this.updateLoadingState(true)
    return fetch.get<THttpResultPaginateArticles>('/article', { page })
      .then(article => {
        this.updateResultData(article.result)
        return article
      })
      .catch(error => {
        this.updateLoadingState(false)
        console.warn('文章列表请求失败啦', error)
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
    const height = 262
    return {
      index,
      length: height,
      offset: height * index
    }
  }

  @boundMethod private handleRefreshArticle() {
    this.fetchArticles()
  }

  @boundMethod private handleLoadmoreArticle() {
    if (!this.isNoMoreData && !this.isLoading && this.pagination) {
      this.fetchArticles(this.pagination.current_page + 1)
    }
  }

  @boundMethod private handleToDetailPage(articleId: number) {
    console.log('跳转到文章详情页', articleId)
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
          underlayColor={colors.textDefault}
          style={{ marginTop: sizes.gap }}
        >
          <Feather name="chevrons-down" size={22} style={{color: colors.textDefault}} />
        </TouchableHighlight>
      </View>
    )
  }

  /**
   * 渲染加载更多
   * @function renderLoadmoreView
   * @description 渲染文章列表加载更多时的三种状态：加载中、无更多、上拉加载
   */
  @boundMethod private renderLoadmoreView(): JSX.Element {
    const { styles } = obStyles
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
        <Feather name="arrow-up-circle" style={{color: colors.textDefault}} />
      </View>
    )
  }

  render() {
    const { styles } = obStyles
    return (
      <View style={styles.listViewContainer}>
        <ArticleListHeader />
        <FlatList
          style={styles.articleListView}
          data={this.articleListData}
          ref={this.props.getListRef}
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
              <Observer render={() => (
                <ArticleListItem
                  article={article}
                  darkTheme={globalStore.darkTheme}
                  language={globalStore.language}
                  liked={this.getAricleLikedState(article.id)}
                  key={this.getArticleIdKey(article, index)}
                  onPress={this.handleToDetailPage}
                />
              )}/>
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
        flex: 1,
      },
      articleListView: {
        width: sizes.screen.width,
      },
      centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: sizes.gap,
      },
      loadmoreViewContainer: {
        padding: sizes.gap * 0.66,
        flexDirection: 'row'
      },
      h4Title: {
        ...fonts.h4,
        color: colors.textDefault,
      },
      smallTitle: {
        ...fonts.small,
        color: colors.textDefault,
      }
    })
  }
})

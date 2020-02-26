/* eslint-disable react-native/no-inline-styles */
/**
 * App article list component
 * @file 文章列表组件
 * @module app/components/archive/list
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component, RefObject } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { observable, action, computed, reaction } from 'mobx'
import { Observer, observer } from 'mobx-react'
import { CommonActions } from '@react-navigation/native'
import { boundMethod } from 'autobind-decorator'
import { IS_IOS } from '@app/config'
import { likeStore } from '@app/stores/like'
import { optionStore } from '@app/stores/option'
import { HomeRoutes } from '@app/constants/routes'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { IHttpPaginate, IRequestParams, IHttpResultPaginate } from '@app/types/http'
import { IArticle, ITag, ICategory } from '@app/types/business'
import { NavigationProps } from '@app/types/props'
import { Iconfont } from '@app/components/common/iconfont'
import { Text } from '@app/components/common/text'
import { AutoActivityIndicator } from '@app/components/common/activity-indicator'
import { archiveFilterStore, EFilterType, TFilterValue } from './filter'
import { ArticleArchiveHeader } from './header'
import { ArticleListItem } from './item'
import i18n from '@app/services/i18n'
import fetch from '@app/services/fetch'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'
import mixins from '@app/style/mixins'

type THttpResultPaginateArticles = IHttpResultPaginate<IArticle[]>

export type TArticleListElement = RefObject<FlatList<IArticle>>
export interface IArticleListProps extends NavigationProps {}

@observer export class ArticleList extends Component<IArticleListProps> {
 
  constructor(props: IArticleListProps) {
    super(props)
    this.fetchArticles()
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

  @boundMethod
  scrollToListTop() {
    const listElement = this.listElement.current
    if (this.articleListData.length) {
      listElement && listElement.scrollToIndex({ index: 0, viewOffset: 0 })
    }
  }

  @observable private isLoading: boolean = false
  @observable.ref private params: IRequestParams = {}
  @observable.ref private pagination: IHttpPaginate | null = null
  @observable.shallow private articles: IArticle[] = []

  @computed
  private get articleListData(): IArticle[] {
    return this.articles.slice() || []
  }

  @computed
  private get isNoMoreData(): boolean {
    return (
      !!this.pagination &&
      this.pagination.current_page === this.pagination.total_page
    )
  }

  @action
  private updateLoadingState(loading: boolean) {
    this.isLoading = loading
  }

  @action
  private updateResultData(resultData: THttpResultPaginateArticles) {
    const { data, pagination } = resultData
    this.updateLoadingState(false)
    this.pagination = pagination
    if (pagination.current_page > 1) {
      this.articles.push(...data)
    } else {
      this.articles = data
    }
  }

  @boundMethod
  private fetchArticles(page: number = 1): Promise<any> {
    this.updateLoadingState(true)
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

  private getAricleItemLayout(_: any, index: number) {
    const height = 250
    return {
      index,
      length: height,
      offset: height * index
    }
  }

  @boundMethod
  private handleFilterChanged(isActive: boolean, type: EFilterType, value: TFilterValue) {
    // 归顶
    if (this.pagination && this.pagination.total > 0) {
      this.scrollToListTop()
    }
    // 修正参数，更新数据
    setTimeout(() => {
      action(() => {
        const params: IRequestParams = {}
        if (isActive && value) {
          if (type === EFilterType.Search) {
            params.keyword = value as string
          } else if (type === EFilterType.Tag) {
            params.tag_slug = (value as ITag).slug 
          } else if (type === EFilterType.Category) {
            params.category_slug = (value as ICategory).slug
          }
        }
        this.params = params
      })()
      this.fetchArticles()
    }, 266)
  }

  @boundMethod
  private handleLoadmoreArticle() {
    if (!this.isNoMoreData && !this.isLoading && this.pagination) {
      this.fetchArticles(this.pagination.current_page + 1)
    }
  }

  @boundMethod
  private handleToDetailPage(article: IArticle) {
    this.props.navigation.dispatch(
      CommonActions.navigate({
        key: String(article.id),
        name: HomeRoutes.ArticleDetail,
        params: { article }
      })
    )
  }

  // 渲染文章列表为空时的状态：无数据
  @boundMethod
  private renderListEmptyView(): JSX.Element | null {
    const { styles } = obStyles
    const commonIconOptions = {
      name: 'tobottom',
      size: 19,
      color: colors.textSecondary
    }

    if (this.isLoading) {
      return null
    }

    return (
      <Observer
        render={() => (
          <View style={styles.centerContainer}>
            <Text style={styles.normalTitle}>{i18n.t(LANGUAGE_KEYS.NO_RESULT_RETRY)}</Text>
            <View style={{ marginTop: sizes.goldenRatioGap }}>
              <Iconfont {...commonIconOptions} />
              <Iconfont {...commonIconOptions} style={{ marginTop: -13 }} />
            </View>
          </View>
        )}
      />
    )
  }

  // 渲染文章列表脚部的三种状态：空、加载中、无更多、上拉加载
  @boundMethod
  private renderListFooterView(): JSX.Element | null {
    const { styles } = obStyles

    if (!this.articleListData.length) {
      return null
    }

    if (this.isLoading) {
      return (
        <Observer
          render={() => (
            <View style={[styles.centerContainer, styles.loadmoreViewContainer]}>
              <AutoActivityIndicator style={{ marginRight: sizes.gap / 4 }} />
              <Text style={styles.smallTitle}>{i18n.t(LANGUAGE_KEYS.LOADING)}</Text>
            </View>
          )}
        />
      )
    }

    if (this.isNoMoreData) {
      return (
        <Observer
          render={() => (
            <View style={[styles.centerContainer, styles.loadmoreViewContainer]}>
              <Text style={styles.smallTitle}>{i18n.t(LANGUAGE_KEYS.NO_MORE)}</Text>
            </View>
          )}
        />
      )
    }

    return (
      <Observer
        render={() => (
          <View style={[styles.centerContainer, styles.loadmoreViewContainer]}>
            <Iconfont name="next-bottom" color={colors.textSecondary} />
            <Text style={[styles.smallTitle, { marginLeft: sizes.gap / 4 }]}>
              {i18n.t(LANGUAGE_KEYS.LOADMORE)}
            </Text>
          </View>
        )}
      />
    )
  }

  render() {
    return (
      <View style={obStyles.styles.listViewContainer}>
        <ArticleArchiveHeader />
        <FlatList
          style={obStyles.styles.articleListView}
          data={this.articleListData}
          ref={this.listElement}
          // 首屏渲染多少个数据
          initialNumToRender={5}
          // 手动维护每一行的高度以优化性能
          getItemLayout={this.getAricleItemLayout}
          // 列表为空时渲染
          ListEmptyComponent={this.renderListEmptyView}
          // 加载更多时渲染
          ListFooterComponent={this.renderListFooterView}
          // 当前列表 loading 状态
          refreshing={this.isLoading}
          // 刷新
          onRefresh={this.fetchArticles}
          // 加载更多安全距离（相对于屏幕高度的比例）
          onEndReachedThreshold={IS_IOS ? 0.05 : 0.2}
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
                    liked={likeStore.articles.includes(article.id)}
                    onPress={this.handleToDetailPage}
                    darkTheme={optionStore.darkTheme}
                    language={optionStore.language}
                    key={this.getArticleIdKey(article, index)}
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
        ...mixins.rowCenter,
        padding: sizes.goldenRatioGap
      },
      normalTitle: {
        ...fonts.base,
        color: colors.textSecondary
      },
      smallTitle: {
        ...fonts.small,
        color: colors.textSecondary
      }
    })
  }
})

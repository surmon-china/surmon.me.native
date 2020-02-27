/* eslint-disable react-native/no-inline-styles */
/**
 * Comment list component
 * @file 评论列表组件
 * @module app/components/comment-list
 * @author Surmon <https://github.com/surmon-china>
 */

import React, { Component, RefObject } from 'react'
import { FlatList, StyleSheet, View, Alert, NativeSyntheticEvent, NativeScrollEvent, Linking } from 'react-native'
import { observable, action, computed } from 'mobx'
import { Observer } from 'mobx-react'
import { observer } from 'mobx-react'
import { boundMethod } from 'autobind-decorator'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { IComment, IAuthor } from '@app/types/business'
import { IHttpPaginate, IHttpResultPaginate } from '@app/types/http'
import { webUrl, IS_IOS } from '@app/config'
import { likeStore } from '@app/stores/like'
import { optionStore } from '@app/stores/option'
import { Iconfont } from '@app/components/common/iconfont'
import { Text } from '@app/components/common/text'
import { TouchableView } from '@app/components/common/touchable-view'
import { AutoActivityIndicator } from '@app/components/common/activity-indicator'
import { CommentItem } from './item'
import fetch from '@app/services/fetch'
import i18n from '@app/services/i18n'
import colors from '@app/style/colors'
import sizes from '@app/style/sizes'
import fonts from '@app/style/fonts'
import mixins from '@app/style/mixins'

export type TCommentListElement = RefObject<FlatList<IComment>>

type THttpResultPaginateComments = IHttpResultPaginate<IComment[]>

interface ICommentProps {
  postId: number
  onScroll?(event: NativeSyntheticEvent<NativeScrollEvent>): void
}

@observer
export class Comment extends Component<ICommentProps> {
 
  constructor(props: ICommentProps) {
    super(props)
    this.fetchComments()
  }

  private listElement: TCommentListElement = React.createRef()

  @boundMethod
  scrollToListTop() {
    const listElement = this.listElement.current
    if (this.commentListData.length) {
      listElement && listElement.scrollToIndex({ index: 0, viewOffset: 0 })
    }
  }

  @observable.ref private isLoading: boolean = false
  @observable.ref private isSortByHot: boolean = false

  @observable.ref private pagination: IHttpPaginate | null = null
  @observable.shallow private comments: IComment[] = []

  @computed
  private get commentListData(): IComment[] {
    return this.comments.slice() || []
  }

  @computed
  private get isNoMoreData(): boolean {
    return !!this.pagination && this.pagination.current_page === this.pagination.total_page
  }

  @action
  private updateLoadingState(loading: boolean) {
    this.isLoading = loading
  }

  @action
  private updateResultData(resultData: THttpResultPaginateComments) {
    const { data, pagination } = resultData
    this.updateLoadingState(false)
    this.pagination = pagination
    if (pagination.current_page > 1) {
      this.comments.push(...data)
    } else {
      this.comments = data
    }
  }

  @boundMethod
  private fetchComments(page: number = 1): Promise<any> {
    this.updateLoadingState(true)
    const params = {
      sort: this.isSortByHot ? 2 : -1,
      post_id: this.props.postId,
      per_page: 66,
      page
    }
    return fetch.get<THttpResultPaginateComments>('/comment', params)
      .then(comment => {
        this.updateResultData(comment.result)
        return comment
      })
      .catch(error => {
        this.updateLoadingState(false)
        console.warn('Fetch comment list error:', error)
        return Promise.reject(error)
      })
  }

  private getCommentKey(comment: IComment, index?: number): string {
    return `index:${index}:sep:${comment.id}`
  }

  // 切换排序模式
  @boundMethod
  private handleToggleSortType() {
    // 归顶
    if (this.pagination && this.pagination.total > 0) {
      this.scrollToListTop()
    }
    // 修正参数
    action(() => {
      this.isSortByHot = !this.isSortByHot
    })()
    // 重新请求数据
    setTimeout(this.fetchComments, 266)
  }

  @boundMethod
  private handleLoadmoreArticle() {
    if (!this.isNoMoreData && !this.isLoading && this.pagination) {
      this.fetchComments(this.pagination.current_page + 1)
    }
  }

  @boundMethod
  private handlePressAuthor(author: IAuthor) {
    const url = author?.site
    if (url && url !== webUrl) {
      Linking.canOpenURL(url).then(
        canOpen => canOpen && Linking.openURL(url)
      )
    }
  }

  @boundMethod
  private handleReplyComment(comment: IComment) {
    Alert.alert(
      optionStore.isEnLang
        ? 'More action on PC.'
        : '回复评论要去 Web 端操作'
    )
  }

  @boundMethod
  private handleLikeComment(comment: IComment) {
    const comment_id = comment.id
    const doLike = () => {
      const targetCommentIndex = this.comments.findIndex(item => item.id === comment_id)
      likeStore.likeComment(comment_id)
      this.comments.splice(targetCommentIndex, 1, {
        ...comment,
        likes: comment.likes + 1
      })
    }
    fetch.patch<boolean>('/like/comment', { comment_id })
      .then(doLike)
      .catch(error => {
        doLike()
        console.warn('Like comment error:', error)
      })
  }

  // 渲染评论列表为空时的状态：无数据
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
            <Text style={styles.normalTitle}>
              {i18n.t(LANGUAGE_KEYS.NO_RESULT_RETRY)}
            </Text>
            <View style={{ marginTop: sizes.gap }}>
              <Iconfont {...commonIconOptions} />
              <Iconfont {...commonIconOptions} style={{ marginTop: -14 }} />
            </View>
          </View>
        )}
      />
    )
  }

  // 渲染列表脚部的三种状态：空、加载中、无更多、上拉加载
  @boundMethod
  private renderListFooterView(): JSX.Element | null {
    const { styles } = obStyles

    if (!this.commentListData.length) {
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

  private renderToolBoxView(): JSX.Element {
    const { isLoading, pagination } = this
    const { styles } = obStyles

    return (
      <View style={styles.toolBox}>
        {pagination && pagination.total ? (
          <Text>{pagination.total} {i18n.t(LANGUAGE_KEYS.TOTAL)}</Text>
        ) : (
          <Text>{i18n.t(isLoading ? LANGUAGE_KEYS.LOADING : LANGUAGE_KEYS.EMPTY)}</Text>
        )}
        <TouchableView
          accessibilityLabel="切换排序模式"
          disabled={isLoading}
          onPress={this.handleToggleSortType}
        >
          <Iconfont
            name={this.isSortByHot ? 'mood' : 'clock-stroke'}
            color={this.isSortByHot ? colors.primary : colors.textDefault}
            size={16}
            style={styles.toolSort}
          />
        </TouchableView>
      </View>
    )
  }

  render() {
    const { styles } = obStyles
    return (
      <View style={styles.container}>
        {this.renderToolBoxView()}
        <FlatList
          style={styles.commentListView}
          data={this.commentListData}
          ref={this.listElement}
          // 首屏渲染多少个数据
          initialNumToRender={16}
          // 列表为空时渲染
          ListEmptyComponent={this.renderListEmptyView}
          // 加载更多时渲染
          ListFooterComponent={this.renderListFooterView}
          // 当前列表 loading 状态
          refreshing={this.isLoading}
          // 刷新
          onRefresh={this.fetchComments}
          // 加载更多安全距离（相对于屏幕高度的比例）
          onEndReachedThreshold={IS_IOS ? 0.02 : 0.2}
          // 加载更多
          onEndReached={this.handleLoadmoreArticle}
          // 手势滚动
          onScroll={this.props.onScroll}
          // 唯一 ID
          keyExtractor={this.getCommentKey}
          // 单个主体
          renderItem={({ item: comment, index }) => {
            return (
              <Observer
                render={() => (
                  <CommentItem
                    key={this.getCommentKey(comment, index)}
                    darkTheme={optionStore.darkTheme}
                    language={optionStore.language}
                    comment={comment}
                    liked={likeStore.comments.includes(comment.id)}
                    onLike={this.handleLikeComment}
                    onReply={this.handleReplyComment}
                    onPressAuthor={this.handlePressAuthor}
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
      container: {
        flex: 1,
        position: 'relative'
      },
      toolBox: {
        ...mixins.rowCenter,
        justifyContent: 'space-between',
        height: sizes.gap * 2,
        paddingHorizontal: sizes.gap,
        borderColor: colors.border,
        borderTopWidth: sizes.borderWidth,
        borderBottomWidth: sizes.borderWidth,
        backgroundColor: colors.cardBackground
      },
      toolSort: {
        color: colors.textDefault
      },
      commentListView: {
        backgroundColor: colors.cardBackground
      },
      centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: sizes.gap
      },
      loadmoreViewContainer: {
        flexDirection: 'row',
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

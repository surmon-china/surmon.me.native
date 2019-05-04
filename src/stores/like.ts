/**
 * App global like store
 * @file App 全局喜欢数据的存储
 * @module app/stores/like
 * @author Surmon <https://github.com/surmon-china>
 */

import { observable, action } from 'mobx'
import { boundMethod } from 'autobind-decorator'
import { STORAGE } from '@app/constants/storage'
import storage from '@app/services/storage'

class LikeStore {

  constructor() {
    this.resetStore()
  }
  
  @observable.shallow articles: number[] = []
  @observable.shallow comments: number[] = []

  @boundMethod
  resetStore() {
    this.initArticles()
    this.initComments()
  }

  private initArticles() {
    storage.get<number[]>(STORAGE.ARTICLE_LIKES).then(this.updateArticles)
  }

  private initComments() {
    storage.get<number[]>(STORAGE.COMMENT_LIKES).then(this.updateComments)
  }

  private syncArticles() {
    storage.set(STORAGE.ARTICLE_LIKES, this.articles.slice())
  }

  private syncComments() {
    storage.set(STORAGE.COMMENT_LIKES, this.comments.slice())
  }

  @action.bound
  updateArticles(articles: number[]) {
    this.articles = articles || []
    this.syncArticles()
  }
  
  @action.bound
  likeArticle(articleId: number) {
    this.articles.push(articleId)
    this.syncArticles()
  }
  
  @action.bound
  updateComments(comments: number[]) {
    this.comments = comments || []
    this.syncComments()
  }
  
  @action.bound
  likeComment(commentId: number) {
    this.comments.push(commentId)
    this.syncComments()
  }
}

export const likeStore = new LikeStore()

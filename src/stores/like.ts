/**
 * App global like store.
 * @file App 全局喜欢数据的存储
 * @module app/stores/like
 * @author Surmon <https://github.com/surmon-china>
 */

import { observable, action } from 'mobx'
import { STORAGE } from '@app/constants/storage'
import storage from '@app/services/storage'

class LikeStore {

  constructor() {
    this.initArticles()
    this.initComments()
  }
  
  @observable.shallow articles: number[] = []
  @observable.shallow comments: number[] = []

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
    storage.set(STORAGE.COMMENT_LIKES, this.comments.slice())
  }
  
  @action.bound
  likeComment(commentId: number) {
    this.updateComments(
      [...new Set([...this.comments.slice(), commentId])]
    )
  }

  private syncArticles() {
    storage.set(STORAGE.ARTICLE_LIKES, this.articles.slice())
  }

  private initArticles() {
    storage.get<number[]>(STORAGE.ARTICLE_LIKES).then(this.updateArticles)
  }

  private initComments() {
    storage.get<number[]>(STORAGE.COMMENT_LIKES).then(this.updateComments)
  }
}

export const likeStore = new LikeStore()

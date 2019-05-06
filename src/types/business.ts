/**
 * Bussniss types
 * @file 业务数据模型
 * @module types/business
 * @author Surmon <https://github.com/surmon-china>
 */

import { EOriginState } from './state'

// 分类数据
export interface ICategory {
  id: number
  _id: string
  pid: string
  name: string
  slug: string
  count: number
  description: string
  update_at: string
  create_at: string
}

// 标签数据
export interface ITag {
  id: number
  _id: string
  name: string
  slug: string
  count: number
  description: string
  update_at: string
  create_at: string
}

export interface IArticle {
  id: number
  _id: string
  title: string
  description: string
  content: string
  keywords: string[]
  thumb: string
  meta: {
    likes: number
    views: number
    comments: number
  }
  origin: EOriginState
  update_at: string
  create_at: string
  tag: ITag[]
  category: ICategory[]
  related: IArticle[]
}

export interface IAuthor {
  name: string
  email: string
  site: string
}

export interface IComment {
  post_id: number
  id: number
  pid: number
  content: string
  agent?: string
  author: IAuthor
  likes: number
  ip?: string
  ip_location?: {
    city: string
    country: string
  }
  create_at: string
  update_at: string
}

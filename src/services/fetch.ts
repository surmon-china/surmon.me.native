
import { stringify } from 'query-string'
import { TRequestUrlPath, TRequestData, IRequestParams, THttpSuccessResponse } from '@app/types/http'
import { appApi } from '@app/config'
import { showToast } from './toast'
import i18n from '@app/services/i18n'
import * as LANGUAGE from '@app/constants/language'

// 构造参数
export function formatURL(url: TRequestUrlPath, params?: IRequestParams): TRequestUrlPath {
  let query = ''
  if (params && Object.keys(params).length) {
    query = url.includes('?')
      ? `&${stringify(params)}`
      : `?${stringify(params)}`
  }
  return `${url}${query}`
}

// 请求服务
export function httpService<T>(url: TRequestUrlPath, options: RequestInit = {}): Promise<THttpSuccessResponse<T>> {
  const defaultOptions = {
    includeCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  return fetch(appApi + url, Object.assign(defaultOptions, options))
    .then(response => response.json())
    .catch(error => {
      const text = i18n.t(LANGUAGE.NETWORK_ERROR)
      showToast(text)
      console.warn(`${text}：`, `url：${url}`, error)
    })
}

export function get<T>(url: TRequestUrlPath, getParams?: IRequestParams): Promise<THttpSuccessResponse<T>> {
  return httpService<T>(formatURL(url, getParams), { method: 'GET' })
}

export function post<T>(url: TRequestUrlPath, data?: TRequestData): Promise<THttpSuccessResponse<T>> {
  return httpService<T>(url, { method: 'POST', body: JSON.stringify(data) })
}

export function put<T>(url: TRequestUrlPath, data?: TRequestData): Promise<THttpSuccessResponse<T>> {
  return httpService<T>(url, { method: 'PUT', body: JSON.stringify(data) })
}

export function patch<T>(url: TRequestUrlPath, data?: TRequestData): Promise<THttpSuccessResponse<T>> {
  return httpService<T>(url, { method: 'PATCH', body: JSON.stringify(data) })
}

export function deleteData<T>(url: TRequestUrlPath, data?: TRequestData): Promise<THttpSuccessResponse<T>> {
  return httpService<T>(url, { method: 'DELETE', body: JSON.stringify(data) })
}

/*


// 获取文章详情
export const getArticleDetail = (article_id: TId) => {
  return httpService(`${appApi}/article/${article_id}`)
}

// 给文章点赞
export const likeArticle = (likeId: TId) => {
  return httpService(`${appApi}/like/article`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post_id: likeId })
  })
}
*/

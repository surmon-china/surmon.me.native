/**
 * Fetch service.
 * @file 数据请求器
 * @module app/services/fetch
 * @author Surmon <https://github.com/surmon-china>
 */

import { stringify } from 'query-string'
import { LANGUAGE_KEYS } from '@app/constants/language'
import { TRequestUrlPath, TRequestData, IRequestParams, THttpSuccessResponse } from '@app/types/http'
import i18n from '@app/services/i18n'
import { appApi } from '@app/config'
import { showToast } from './toast'

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
      const text = i18n.t(LANGUAGE_KEYS.NETWORK_ERROR)
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

export function remove<T>(url: TRequestUrlPath, data?: TRequestData): Promise<THttpSuccessResponse<T>> {
  return httpService<T>(url, { method: 'DELETE', body: JSON.stringify(data) })
}

export default {
  get,
  post,
  put,
  patch,
  remove
}

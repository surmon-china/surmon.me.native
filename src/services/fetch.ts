
import { stringify } from 'query-string'
import { showToast } from './toast';
import { appApi } from '@app/config';

type TRequestUrlPath = string;
type TRequestData = object;

// 响应状态
export enum EHttpStatus {
  Error = 'error',
  Success = 'success',
}

// 请求参数
export interface IRequestParams {
  [key: string]: string | number;
}

// 响应体
export interface IResponse {
  status: number;
  statusText?: string;
  message?: string;
  error?: any;
}

// 响应数据
export interface IResponseData<T> {
  status: EHttpStatus;
  debug?: any;
  error: string;
  message: string;
  result: T;
}

export function formatURL(url: TRequestUrlPath, params?: IRequestParams): TRequestUrlPath {
  let query = ''

  if (params && Object.keys(params).length) {
    query = url.indexOf('?') > -1 ? `&${stringify(params)}` : `?${stringify(params)}`
  }

  return `${url}${query}`
}

// 请求服务
export function httpService<T>(url: TRequestUrlPath, options: RequestInit = {}): Promise<IResponseData<T>> {
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
      showToast('网络错误');
      console.warn('网络请求错误：', `url：${url}`, error);
    });
};

export function get<T>(url: TRequestUrlPath, getParams?: IRequestParams): Promise<IResponseData<T>> {
  return httpService<T>(formatURL(url, getParams), { method: 'GET' })
}

export function post<T>(url: TRequestUrlPath, data?: TRequestData): Promise<IResponseData<T>> {
  return httpService<T>(url, { method: 'POST', body: JSON.stringify(data) })
}

export function put<T>(url: TRequestUrlPath, data?: TRequestData): Promise<IResponseData<T>> {
  return httpService<T>(url, { method: 'PUT', body: JSON.stringify(data) })
}

export function patch<T>(url: TRequestUrlPath, data?: TRequestData): Promise<IResponseData<T>> {
  return httpService<T>(url, { method: 'PATCH', body: JSON.stringify(data) })
}

export function deleteData<T>(url: TRequestUrlPath, data?: TRequestData): Promise<IResponseData<T>> {
  return httpService<T>(url, { method: 'DELETE', body: JSON.stringify(data) })
}

/*
// 获取用户信息
export const getUserInfo = () => {
  return httpService(`${appApi}/auth/admin`)
}

// 获取统计信息
export const getStatisticInfo = () => {
  return httpService(`${appApi}/expansion/statistic`)
}

// 获取文章列表
export const getArticleList = (page: TId) => {
  const queryParams = page ? `?page=${page}` : '';
  return httpService(`${appApi}/article${queryParams}`);
}

// 获取文章详情
export const getArticleDetail = (article_id: TId) => {
  return httpService(`${appApi}/article/${article_id}`);
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

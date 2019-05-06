/**
 * Global HTTP types
 * @file HTTP 响应模型
 * @module types/http
 * @author Surmon <https://github.com/surmon-china>
 */

export type TRequestUrlPath = string
export type TRequestData = object

// 请求参数
export interface IRequestParams {
  [key: string]: string | number
}

// 响应状态
export enum EHttpStatus {
  Error = 'error',
  Success = 'success'
}

export interface IHttpPaginate {
  total: number
  current_page: number
  total_page: number
  per_page: number
}

// 翻页数据
export interface IHttpResultPaginate<T> {
  data: T
  params: any
  pagination: IHttpPaginate
}

// HTTP 状态返回
export interface IHttpResponseBase {
  status: EHttpStatus
  message: string
}

// HTTP error
export type THttpErrorResponse = IHttpResponseBase & {
  error: any
  debug?: string
}

// HTTP success
export type THttpSuccessResponse<T> = IHttpResponseBase & {
  debug?: any
  result: T
}

// HTTP Response
export type THttpResponse<T> = THttpErrorResponse | THttpSuccessResponse<T>

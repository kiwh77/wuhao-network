import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Pipeline } from './compose/pipeline'
import { iMiddleware, MiddlewareStack } from './compose/middleware'
import { ProcessorStack } from './compose/processor'
import {
  ServiceStack,
  iService,
  iArrayService,
  PropType
} from './compose/service'
import { Bucket } from './compose/bucket'
import { Emitter } from './compose/emitter'
import { UpperFirstWord } from './utils/string'

/**
 * 请求配置
 */
export interface RequestConfig extends AxiosRequestConfig {}

/**
 * 请求参数
 */
export type RequestParams = {
  /**
   * url后query参数
   * 例：[GET]/api/user/list?pageNo=1&pageSize=10，参数传递应是{ params: { pageNo: 1, pageSize: 10 } }
   */
  params?: { [key: string]: any }
  /**
   * 请求体参数
   * 例：[POST]/api/user，请求体参数使用{ body: { key: value } }
   */
  data?: any
  /**
   * 路径参数，例：/api/user/:id，传递id参数时，应传递 { path: { id: 'xxx' } }
   */
  path?: { [key: string]: any }
  /**
   * 取消函数
   */
  cancel?: Function

  middleware?: PropType<iService, 'middleware'>
  url?: PropType<iService, 'url'>
  method?: PropType<iService, 'method'>
}

export type RequestOptions = {
  config?: RequestConfig
} & RequestParams

/**
 * 初始化请求类参数
 */
export interface NetworkInit {
  /** 重复请求间隔，默认为0，表示不限制 */
  interval?: number
  /** 请求配置 */
  requesterConfig?: RequestConfig
  /** 服务配置列表 */
  services?: Array<iService | iArrayService>
  /** 服务中间件 */
  middlewares?: Array<iMiddleware>
}

export interface Env {
  pipe: Pipeline
  bucket: Bucket
  emitter: Emitter
  service: ServiceStack
  processor: ProcessorStack
  middleware: MiddlewareStack
}

export interface Stack<T> {
  sources: T[]
  register<E extends T>(module: E): void
}

export interface iHandler {
  name: string
  handle(ctx: Context, env?: Env): Promise<Error | void> | void | Error
}

export type ContextInit = RequestParams & Pick<iService, 'name'>

export class Context {
  // 当前请求id
  id: string
  // 当前运行到那个处理器
  step: string
  initParams: ContextInit
  params: RequestOptions
  service: iService
  emitter: Emitter
  config?: AxiosRequestConfig
  response?: AxiosResponse & {
    /** 是否请求成功，默认请求成功即设置为true */
    success?: boolean
  }
  cancel?: Function

  constructor(props: ContextInit) {
    this.initParams = props
  }
}

export enum ProcessType {
  request = 'request',
  config = 'config',
  unique = 'unique'
}

type ProcessTypeTip = keyof typeof ProcessType | string

/**
 * beforeXxxx
 * @param type {string} processor name
 * @returns
 */
export function Before(type: ProcessTypeTip) {
  return 'before' + UpperFirstWord(type)
}

/**
 * afterXxxx
 * @param type {string} processor name
 * @returns
 */
export function After(type: ProcessTypeTip) {
  return 'after' + UpperFirstWord(type)
}

/**
 * wrongXxxx
 * @param type {string} processor name
 * @returns
 */
export function Wrong(type: ProcessTypeTip) {
  return 'error' + UpperFirstWord(type)
}

import { RequestParams } from './../context'
import { NetworkInit, Stack } from '../context'
import { isArray, isObject } from '../utils/type'
import { iMiddleware } from './middleware'
import 'reflect-metadata'

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK'

/**
 * 接口、服务基本信息
 */
export interface iServiceBase {
  /**
   * 服务名
   */
  name?: string
  /**
   * 服务url
   */
  url: string
  /**
   * 服务类型
   */
  method: Method | string
}

/**
 * 接口、服务进阶信息
 */
export interface iService extends iServiceBase {
  /**
   * 服务标签
   */
  tag?: Array<string> | string
  /**
   * 自定义数据，会跟随整个请求流程，可在中间件中拿到后进行个性化操作
   */
  customData?: { [key: string]: any }
  /**
   * 描述
   */
  description?: string
  /**
   * 默认参数
   */
  default?: Pick<RequestParams, 'path'> &
    Pick<RequestParams, 'params'> &
    Pick<RequestParams, 'data'> & {
      /**
       * 混合模式
       * last: 默认，使用时传入为主
       * default: 默认参数为主
       */
      assign?: 'default' | 'replace' | 'mixin'
    }
  /**
   * 特性
   */
  middleware?: Array<iMiddleware | string>
}

/**
 * 数组式申明
 */
export type iArrayService =
  | [PropType<iService, 'method'>, PropType<iService, 'url'>]
  | [
      PropType<iService, 'name'>,
      PropType<iService, 'method'>,
      PropType<iService, 'url'>
    ]
  | [
      PropType<iService, 'method'>,
      PropType<iService, 'url'>,
      Omit<iService, 'method' | 'url'>
    ]
  | [
      PropType<iService, 'name'>,
      PropType<iService, 'method'>,
      PropType<iService, 'url'>,
      Omit<iService, 'name' | 'method' | 'url'>
    ]

export function isService(obj: any) {
  return isObject(obj) && 'url' in obj && 'method' in obj
}

export class ServiceStack implements Stack<iService> {
  sources: iService[] = []

  constructor(props: NetworkInit) {
    if (props && props.services && props.services.length) {
      this.sources = props.services.reduce(
        (total: Array<iService>, item: iService | iArrayService) => {
          const service = transformService(item)
          if (service && service.name) total.push(service)
          return total
        },
        []
      )
    }
  }

  register(service: iService | iArrayService) {
    const s = transformService(service)
    if (s && s.name) this.sources.push(s)
  }

  find(name: string) {
    return this.sources.find(item => item.name === name)
  }
}

export function transformService(params: iService | iArrayService): iService {
  let service: iService
  if (isService(params)) service = params as iService

  if (isArray(params)) {
    const length = (params as any).length
    // 未配置
    if (length < 2) {
      console.warn(params, ' not a complete service configuration item')
      return
    }
    const [name, method, url, advance] = params as iArrayService
    // 配置项为2，method，url
    if (length === 2) {
      return { method: name, url: method }
    } else if (length === 3) {
      // 无advance配置项，但url位置是对象，表示用户未配置名称
      if (isObject(url)) {
        return {
          method: name,
          url: method,
          ...(url as Object)
        }
      } else {
        return {
          name,
          method,
          url: url as string
        }
      }
    }
    service = {
      name,
      method,
      url: url as string,
      ...(isObject(advance) ? advance : {})
    }
  }
  return service
}

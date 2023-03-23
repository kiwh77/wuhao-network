import { PipeAxiosInit, Stack } from '../context'
import { isArray, isObject } from '../utils/type'
import { iMiddleware } from './middleware'

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
   * 描述
   */
  description?: string
  /**
   * 默认参数
   */
  defaultParams?: object
  /**
   * 特性
   */
  middleware?: Array<iMiddleware>
}

/**
 * 数组式申明
 */
export type iArrayService = [
  PropType<iService, 'name'>,
  PropType<iService, 'method'>,
  PropType<iService, 'url'>,
  Omit<iService, 'name' | 'method' | 'url'>?
]

export function isService(obj: any) {
  return isObject(obj) && 'name' in obj && 'url' in obj && 'method' in obj
}

export class ServiceStack implements Stack<iService> {
  sources: iService[] = []

  constructor(props: PipeAxiosInit) {
    if (props && props.services && props.services.length) {
      this.sources = props.services.reduce(
        (total: Array<iService>, item: iService | iArrayService) => {
          const service = this.transform(item)
          if (service) total.push(service)
          return total
        },
        []
      )
    }
  }

  register(service: iService | iArrayService) {
    const s = this.transform(service)
    if (s) this.sources.push(s)
  }

  transform(params: iService | iArrayService): iService {
    let service: iService
    if (isService(params)) service = params as iService

    if (isArray(params)) {
      const [name, method, url, advance] = params as iArrayService
      if (!name || !method || !url) return

      service = {
        name,
        method,
        url,
        ...(isObject(advance) ? advance : {})
      }
    }
    return service
  }

  find(name: string) {
    return this.sources.find(item => item.name === name)
  }
}

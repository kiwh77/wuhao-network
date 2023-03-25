import 'reflect-metadata'
import {
  iArrayService,
  iService,
  ServiceStack,
  transformService
} from './compose/service'
import { ProcessorStack } from './compose/processor'
import { iMiddleware, MiddlewareStack } from './compose/middleware'
import { Bucket } from './compose/bucket'
import { Emitter } from './compose/emitter'
import { Pipeline } from './compose/pipeline'
import { Context, ContextInit, PipeAxiosInit, RequestParams } from './context'

export class PipeAxios {
  static simpleInstance: PipeAxios

  pipe: Pipeline = new Pipeline()
  bucket: Bucket = new Bucket()
  emitter: Emitter = new Emitter()

  processor: ProcessorStack
  service: ServiceStack
  middleware: MiddlewareStack

  constructor(props?: PipeAxiosInit) {
    this.processor = new ProcessorStack(props)
    this.service = new ServiceStack(props)
    this.middleware = new MiddlewareStack(props)
  }

  async send(options: ContextInit) {
    try {
      const result = await this.pipe.exec(
        this.processor.sources,
        new Context(options),
        {
          pipe: this.pipe,
          bucket: this.bucket,
          emitter: this.emitter,
          service: this.service,
          processor: this.processor,
          middleware: this.middleware
        }
      )
      return result
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /**
   * 快速发起get请求
   * @param url
   * @param options
   */
  get(url: string, options?: RequestParams) {
    return this.send({
      ...options,
      method: 'get',
      url
    })
  }
  post(url: string, options?: RequestParams) {
    return this.send({
      ...options,
      method: 'post',
      url
    })
  }
  put(url: string, options?: RequestParams) {
    return this.send({
      ...options,
      method: 'put',
      url
    })
  }
  delete(url: string, options?: RequestParams) {
    return this.send({
      ...options,
      method: 'delete',
      url
    })
  }
  patch(url: string, options?: RequestParams) {
    return this.send({
      ...options,
      method: 'patch',
      url
    })
  }

  install(app: any) {
    if (app.config && app.config.globalProperties) {
      app.config.globalProperties.$http = this
    } else if (app.constructor) {
      app.prototype.$http = this
    }
  }
}

const SERVICE_FLAG = Symbol('service')
const MIDDLEWARE_FLAG = Symbol('middleware')

/**
 * 初始化
 * @param props 初始化参数
 * @returns
 * @example
 *  app.use(createPipeAxios())
 */
export function createPipeAxios(props?: PipeAxiosInit) {
  if (!PipeAxios.simpleInstance) {
    const reflectServices =
      Reflect.getMetadata(SERVICE_FLAG, ServiceStack) || []
    const reflectMiddlewares =
      Reflect.getMetadata(MIDDLEWARE_FLAG, MiddlewareStack) || []
    const { services = [], middlewares = [], ...remain } = props
    PipeAxios.simpleInstance = new PipeAxios({
      ...remain,
      services: [...services, ...reflectServices],
      middlewares: [...middlewares, ...reflectMiddlewares]
    })
  }
  return PipeAxios.simpleInstance
}

/**
 * 定义服务接口，返回调用函数
 * @param serviceDefine: iService | iArrayService
 * @returns request(params: RequestParams)
 */
export function useService(serviceDefine: iService | iArrayService) {
  const service: iService = transformService(serviceDefine)
  if (!service) return
  if (PipeAxios.simpleInstance) {
    PipeAxios.simpleInstance.service.register(service)
  } else {
    const services = Reflect.getMetadata(SERVICE_FLAG, ServiceStack) || []

    if (
      services.length === 0 ||
      services.some((item: iService) => item.name !== service.name)
    ) {
      services.push(service)
    }
    Reflect.defineMetadata(SERVICE_FLAG, services, ServiceStack)
  }

  return function (params: RequestParams) {
    return PipeAxios.simpleInstance.send({
      ...service,
      ...params
    })
  }
}

/**
 * 注册中间件
 * @param middleware 中间件参数
 * @returns 中间件名称
 */
export function useMiddleware(middleware: iMiddleware) {
  if (!middleware) return
  if (!PipeAxios.simpleInstance) {
    const mids: iMiddleware[] =
      Reflect.getMetadata(MIDDLEWARE_FLAG, MiddlewareStack) || []
    if (mids.some(mid => mid.name === middleware.name)) {
      throw new Error(`middleware [${middleware.name}] duplicate definition!`)
    }
    mids.push(middleware)
    Reflect.defineMetadata(MIDDLEWARE_FLAG, mids, MiddlewareStack)
    return middleware.name
  }
  return PipeAxios.simpleInstance.middleware.register(middleware)
}

/**
 * 发起请求
 * @param name 服务配置中的名称
 * @param params 请求参数
 * @returns
 */
export function useFetch(name: string, params?: RequestParams) {
  if (!PipeAxios.simpleInstance) return
  const service = PipeAxios.simpleInstance.service.sources.find(
    item => item.name === name
  )
  return PipeAxios.simpleInstance.send({
    ...service,
    ...params
  })
}

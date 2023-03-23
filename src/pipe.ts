import { ProcessorStack } from './compose/processor'
import { iService, iArrayService, ServiceStack } from './compose/service'
import { MiddlewareStack } from './compose/middleware'
import { Bucket } from './compose/bucket'
import { Emitter } from './compose/emitter'
import { Pipeline } from './compose/pipeline'
import { Context, ContextInit, PipeAxiosInit, RequestParams } from './context'

export class PipeAxios {
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
  get(url: string, options: RequestParams) {
    return this.send({
      ...options,
      method: 'get',
      url
    })
  }
  post(url: string, options: RequestParams) {
    return this.send({
      ...options,
      method: 'post',
      url
    })
  }
  put(url: string, options: RequestParams) {
    return this.send({
      ...options,
      method: 'put',
      url
    })
  }
  delete(url: string, options: RequestParams) {
    return this.send({
      ...options,
      method: 'delete',
      url
    })
  }
  patch(url: string, options: RequestParams) {
    return this.send({
      ...options,
      method: 'patch',
      url
    })
  }

  install(app: any) {
    console.log('🚀 - file: index.ts:86 - install - app:', app)

    app.config.globalProperties.$http = this
  }
}

export function createPipeAxios(props?: PipeAxiosInit) {
  return new PipeAxios(props)
}

let instance: PipeAxios
export function usePipe() {
  if (!instance) instance = new PipeAxios()
  return instance
}

export function useService(service: iService | iArrayService) {
  const existInstance = usePipe()
  existInstance.service.register(service)
  return function (options: RequestParams) {
    return existInstance.send(options)
  }
}

export function useRequest(options: RequestParams) {
  return usePipe().send(options)
}

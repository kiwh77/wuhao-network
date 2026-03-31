import { isFunction } from '../utils/type'
import { NetworkInit, Stack, iHandler } from '../context'

export interface iMiddleware extends iHandler {
  /**
   * 中间件执行位置，同处理器勾子名称，例'beforeRequest'或before(ProcessorType.request)
   */
  at: string
  /**
   * 是否全局中间件，注册为全局中间件会应用到所有服务
   */
  global?: boolean
  /**
   * @deprecated please use `global`
   */
  isGlobal?: boolean
}

export class BaseMiddleware implements iMiddleware {
  at: string
  name = 'base'
  handle() {}
}

export class MiddlewareStack implements Stack<iMiddleware> {
  sources: iMiddleware[] = []

  constructor(props: NetworkInit) {
    if (props?.middlewares?.length > 0) {
      this.sources = props.middlewares
        .map(middleware => this.normalize(middleware))
        .filter(this.verify)
    }
  }

  register<T extends iMiddleware>(middleware: T) {
    const normalized = this.normalize(middleware)
    if (this.verify(normalized)) {
      this.sources.push(normalized)
      return normalized.name
    }
  }

  normalize<T extends iMiddleware>(mid: T): T {
    if (!mid) return mid
    return {
      ...mid,
      global: typeof mid.global === 'boolean' ? mid.global : mid.isGlobal
    }
  }

  verify(mid: iMiddleware) {
    return mid?.at && mid?.name && mid?.handle && isFunction(mid.handle)
  }

  find(name: string) {
    return this.sources.find(mid => mid.name === name)
  }
  getGlobal(at: string) {
    return this.sources.filter(mid => mid.global === true && mid.at === at)
  }
}

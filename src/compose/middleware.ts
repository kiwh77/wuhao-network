import { isFunction } from '../utils/type'
import { NetworkInit, Stack, iHandler } from '../context'

export interface iMiddleware extends iHandler {
  at: string
  global?: boolean
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
      this.sources = props.middlewares.filter(this.verify)
    }
  }

  register<T extends iMiddleware>(middleware: T) {
    if (this.verify(middleware)) {
      this.sources.push(middleware)
      return middleware.name
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

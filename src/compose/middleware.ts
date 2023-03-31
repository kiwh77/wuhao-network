import { isFunction } from '../utils/type'
import { WuhaoNetworkInit, Stack, iHandler } from '../context'

export interface iMiddleware extends iHandler {
  at: string
}

export class BaseMiddleware implements iMiddleware {
  at: string
  name = 'base'
  handle() {}
}

export class MiddlewareStack implements Stack<iMiddleware> {
  sources: iMiddleware[] = []

  constructor(props: WuhaoNetworkInit) {
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
}

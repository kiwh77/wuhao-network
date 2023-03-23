import { PipeAxiosInit, Stack, iHandler } from '../context'

export interface iMiddleware extends iHandler {
  at: string
}

export class BaseMiddleware implements iMiddleware {
  at: string
  name = 'baseMiddleware'
  handle() {}
}

export class MiddlewareStack implements Stack<iMiddleware> {
  sources: iMiddleware[] = []

  constructor(props: PipeAxiosInit) {
    if (props && props.middlewares && props.middlewares.length > 0) {
      this.sources = props.middlewares.filter(this.verify)
    }
  }

  register<T extends iMiddleware>(middleware: T) {
    if (this.verify(middleware)) this.sources.push(middleware)
  }

  verify(mid: iMiddleware) {
    return mid && mid instanceof BaseMiddleware
  }
}

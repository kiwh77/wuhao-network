export enum NetworkLifeEvent {
  /** 处理请求成功，此时还未发起请求 */
  RequestFulfilled = 'RequestFulfilled',
  /** 拒绝请求，配置或参数不符合要求 */
  RequestRejected = 'RequestRejected',
  /** 请求成功，已返回响应数据 */
  ResponseFulfilled = 'ResponseFulfilled',
  /** 请求失败 */
  ResponseRejected = 'ResponseRejected'
}

/**
 * 请求事件处理器
 */
export class Emitter {
  events: { [key: string]: Array<Function> } = {}

  on(event: string, func: Function) {
    if (!event || !func) return

    const handlers = this.events[event]
    if (!handlers) {
      this.events[event] = [func]
    } else {
      handlers.push(func)
    }
  }
  off(event: string, func: Function) {
    if (!event) return

    const handlers = this.events[event]
    if (!handlers) return
    const index = handlers.indexOf(func)
    if (index > -1) {
      handlers.splice(index, 1)
    } else {
      this.events[event] = []
    }
  }
  emit(event: string, ...args: any[]) {
    const handlers = this.events[event] || []
    handlers.forEach(handler => {
      if (handler) handler(...args)
    })
  }
}

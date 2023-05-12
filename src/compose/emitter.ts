type eventType = string | number | symbol
/**
 * 请求事件处理器
 */
export class Emitter {
  events: { [key: eventType]: Array<Function> } = {}

  on(event: eventType, func: Function) {
    if (!event || !func || typeof func !== 'function') return

    const handlers = this.events[event]
    if (!handlers) {
      this.events[event] = [func]
    } else {
      handlers.push(func)
    }
  }
  off(event: eventType, func: Function) {
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
  emit(event: eventType, ...args: any[]) {
    const handlers = this.events[event] || []
    handlers.forEach(handler => {
      if (handler) handler(...args)
    })
  }
}

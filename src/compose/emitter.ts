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

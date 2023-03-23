import { PipeAxiosInit, Stack } from '../context'
import { UniqueProcessor } from '../processor/unique.processor'
import { ConfigProcessor } from '../processor/config.processor'
import { RequestProcessor } from '../processor/request.processor'
import { LifecycleProcessor } from '../processor/lifecycle.processor'
import { iProcessor } from 'src/processor/interface'

export class ProcessorStack implements Stack<iProcessor> {
  sources: iProcessor[] = []

  constructor(props: PipeAxiosInit) {
    const { unique, uniqueInterval, requesterConfig } = props || {}

    const processors: typeof this.sources = []
    // 配置处理
    processors.push(new ConfigProcessor())
    // 去重处理
    if (unique) {
      processors.push(new UniqueProcessor({ interval: uniqueInterval }))
    }
    // 生命周期-请求前
    processors.push(new LifecycleProcessor('before'))
    // 请求处理
    if (typeof window === 'object') {
      processors.push(new RequestProcessor(requesterConfig))
    } else {
      throw new Error('not support current system env!')
    }
    // 生命周期-请求完成
    processors.push(new LifecycleProcessor('after'))

    this.sources = processors
  }

  push(processor: iProcessor) {
    this.sources.push(processor)
    return this
  }
  before(index: string | number, processor: iProcessor) {
    const idx = this._getIndex(index)
    if (idx === 0) {
      this.sources.unshift(processor)
    } else if (idx === this.sources.length - 1) {
      this.sources.push(processor)
    } else {
      this.sources.splice(idx - 1, 0, processor)
    }
    return this
  }
  after(index: string | number, processor: iProcessor) {
    const idx = this._getIndex(index)
    if (idx === 0) {
      this.sources.unshift(processor)
    } else if (idx === this.sources.length - 1) {
      this.sources.push(processor)
    } else {
      this.sources.splice(idx + 1, 0, processor)
    }
    return this
  }
  replace(index: string | number, processor: iProcessor) {
    const idx = this._getIndex(index)
    this.sources[idx] = processor
    return this
  }
  remove(index: string | number) {
    const idx = this._getIndex(index)
    this.sources.splice(idx, 1)
    return this
  }
  private _getIndex(index: string | number) {
    return typeof index === 'number'
      ? Math.floor(index)
      : this.sources.findIndex(item => item.name === index)
  }

  register<T extends iProcessor>(processor: T) {
    this.sources.push(processor)
  }
}

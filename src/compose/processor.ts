import { PipeAxiosInit, Stack } from '../context'
import { UniqueProcessor } from '../processor/unique.processor'
import { ConfigProcessor } from '../processor/config.processor'
import { RequestProcessor } from '../processor/request.processor'
import { iProcessor, ProcessorTypes } from '../processor/interface'

export class ProcessorStack implements Stack<iProcessor> {
  sources: iProcessor[] = []

  constructor(props: PipeAxiosInit) {
    const { interval, requesterConfig } = props || {}

    const processors: typeof this.sources = []
    // 配置处理
    processors.push(new ConfigProcessor())
    // 去重处理
    if (interval > 0) {
      processors.push(new UniqueProcessor({ interval }))
    }
    // 请求处理
    if (typeof window === 'object') {
      processors.push(new RequestProcessor(requesterConfig))
    } else {
      throw new Error('not support current system env!')
    }

    this.sources = processors
  }

  push(processor: iProcessor) {
    this.sources.push(processor)
    return this
  }
  before(index: ProcessorTypes | string | number, processor: iProcessor) {
    const idx = this._getIndex(index)
    if (idx === 0) {
      this.sources.unshift(processor)
    } else {
      this.sources.splice(idx, 0, processor)
    }
    return this
  }
  after(index: ProcessorTypes | string | number, processor: iProcessor) {
    const idx = this._getIndex(index)
    this.sources.splice(idx === 0 ? 1 : idx + 1, 0, processor)
    return this
  }
  replace(index: ProcessorTypes | string | number, processor: iProcessor) {
    const idx = this._getIndex(index)
    this.sources[idx] = processor
    return this
  }
  remove(index: ProcessorTypes | string | number) {
    const idx = this._getIndex(index)
    this.sources.splice(idx, 1)
    return this
  }
  private _getIndex(index: ProcessorTypes | string | number) {
    return typeof index === 'number'
      ? Math.floor(index)
      : this.sources.findIndex(item => item.name === index)
  }

  register<T extends iProcessor>(processor: T) {
    this.sources.push(processor)
  }
}

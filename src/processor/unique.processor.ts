import { Context, Env, ProcessType } from '../context'
import { BaseProcessor, iProcessor } from './interface'

interface UniqueInit {
  interval: number
}

export class UniqueError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'UniqueError'
  }
}

export class UniqueProcessor extends BaseProcessor implements iProcessor {
  name = ProcessType.unique

  interval = 0

  constructor(props: UniqueInit) {
    super()
    this.interval = props.interval
  }

  async handle(ctx: Context, env: Env) {
    if (env.bucket.verify(ctx.id, this.interval)) return
    return new UniqueError(ctx.service.name || ctx.service.url)
  }
}

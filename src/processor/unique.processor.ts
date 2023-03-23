import { Context, Env } from 'src/context'
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
  name = 'unique'

  interval = 1000

  constructor(props: UniqueInit) {
    super()
    this.interval = props.interval
  }

  async handle(ctx: Context, env: Env) {
    super.handle(ctx, env)

    if (env.bucket.verify(ctx.params, this.interval)) return
    return new UniqueError(ctx.service.name || ctx.service.url)
  }
}

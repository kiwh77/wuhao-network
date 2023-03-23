import { Context, Env, iHandler } from 'src/context'

export class BaseProcessor implements iProcessor {
  name = 'base'
  handle(ctx: Context, env: Env) {
    env.emitter.emit('process', { name: this.name, ctx })

    if (
      ctx.service &&
      ctx.service.middleware &&
      ctx.service.middleware.length > 0
    ) {
      env.pipe.exec(ctx.service.middleware, ctx, env)
    }
  }
}

export interface iProcessor extends iHandler {}

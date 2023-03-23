import { BaseProcessor, iProcessor } from './interface'
import { Context, Env } from '../context'
import { isString } from '../utils/type'

export class ConfigProcessor extends BaseProcessor implements iProcessor {
  name: 'config'

  async handle(ctx: Context, env: Env) {
    const { name, ...remain } = ctx.initParams
    if (name && isString(name)) {
      const service = env.service.find(name)
      ctx.service = service
    } else if (!remain.url) {
      return new Error('service not config!')
    }
    ctx.params = remain

    super.handle(ctx, env)
  }
}

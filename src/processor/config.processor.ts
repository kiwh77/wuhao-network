import { BaseProcessor, iProcessor } from './interface'
import { Context, Env } from '../context'
import { isString } from '../utils/type'

export class ConfigProcessor extends BaseProcessor implements iProcessor {
  name = 'config'

  async handle(ctx: Context, env: Env) {
    const { name, ...remain } = ctx.initParams
    if (name && isString(name)) {
      const service = env.service.find(name)
      ctx.service = service

      ctx.params = {
        ...service.default,
        ...ctx.params
      }
    } else if (remain.url) {
      ctx.params = {
        method: remain.method || 'get',
        ...remain
      }
    } else {
      return new Error('service not config!')
    }
    ctx.params = remain
    ctx.id = env.bucket.getId(ctx.params)

    super.handle(ctx, env)
  }
}

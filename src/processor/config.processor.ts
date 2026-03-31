import { BaseProcessor, iProcessor } from './interface'
import { Context, Env, ProcessType } from '../context'
import { isString } from '../utils/type'
import { iService } from '../compose/service'

export class ConfigProcessor extends BaseProcessor implements iProcessor {
  name = ProcessType.config

  async handle(ctx: Context, env: Env) {
    const { name, ...remain } = ctx.initParams
    let service: iService

    if (name && isString(name)) {
      service = env.service.find(name)
      if (!service && remain.url) {
        service = remain as iService
      }
      if (!service) {
        return new Error(`service [${name}] not found!`)
      }
    } else if (remain.url) {
      service = remain as iService
    } else {
      return new Error('service not config!')
    }

    ctx.service = service
    ctx.params = {
      ...service,
      ...remain,
      method: remain.method || service.method || 'get',
      url: remain.url || service.url
    }
    ctx.id = env.bucket.getId(ctx.params)
  }
}

import { BaseProcessor, iProcessor } from './interface'
import { Context, Env } from '../context'

export class LifecycleProcessor extends BaseProcessor implements iProcessor {
  name: string = 'life'
  type: string

  constructor(cycle: string) {
    super()
    this.type = cycle
  }

  handle(ctx: Context, env: Env) {
    super.handle(ctx, env)
    env.emitter.emit('lifecycle:' + this.name)
  }
}

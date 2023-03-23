import { Context, Env, iHandler } from '../context'

export class Pipeline {
  async exec(handlers: iHandler[], ctx: Context, env: Env) {
    async function dispatch(index: number) {
      if (index >= handlers.length) return

      const processor = handlers[index]
      ctx.step = processor.name
      const error = await processor.handle(ctx, env)
      if (error) throw error

      await dispatch(index + 1)
    }
    await dispatch(0)
    return ctx.response
  }
}

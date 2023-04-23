import { Context, Env, iHandler } from '../context'
import { UpperFirstWord } from '../utils/string'

export class BaseProcessor implements iProcessor {
  name = 'base'

  constructor() {
    const originHandle = this.handle
    this.handle = async function (ctx: Context, env: Env) {
      const middlewares = ctx.service?.middleware || []

      const beforeName = 'before' + UpperFirstWord(this.name)

      env.emitter.emit(beforeName, { name: this.name, ctx })
      const beforeMiddlewares = middlewares.reduce((total, middleware) => {
        if (typeof middleware === 'string') {
          const midInstance = env.middleware.find(middleware)
          if (midInstance && midInstance.at === beforeName)
            total.push(midInstance)
        } else if (middleware.at === beforeName) {
          total.push(middleware)
        }
        return total
      }, [])

      const globalBeforeMiddlewares = env.middleware.getGlobal(beforeName)
      if (beforeMiddlewares.length > 0 || globalBeforeMiddlewares.length > 0) {
        await env.pipe.exec(
          [...globalBeforeMiddlewares, ...beforeMiddlewares],
          ctx,
          env
        )
      }

      const result = await originHandle.call(this, ctx, env)

      const afterName = 'after' + UpperFirstWord(this.name)
      const afterMiddlewares = middlewares.reduce((total, middleware) => {
        if (typeof middleware === 'string') {
          const midInstance = env.middleware.find(middleware)
          if (midInstance && midInstance.at === afterName)
            total.push(midInstance)
        } else {
          if (middleware.at === afterName) total.push(middleware)
        }
        return total
      }, [])
      const globalAfterMiddlewares = env.middleware.getGlobal(afterName)

      if (afterMiddlewares.length > 0 || globalAfterMiddlewares.length > 0) {
        await env.pipe.exec(
          [...globalAfterMiddlewares, ...afterMiddlewares],
          ctx,
          env
        )
      }

      env.emitter.emit(beforeName, { name: this.name, ctx })

      return result
    }.bind(this)
  }

  handle(ctx: Context, env: Env) {}
}

export interface iProcessor extends iHandler {}

export type ProcessorTypes = 'config' | 'request' | 'unique'

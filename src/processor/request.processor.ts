import { Context, Env } from '../context'
import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults
} from 'axios'
import { BaseProcessor, iProcessor } from './interface'
import { transformPathParams } from '../utils/transform'

export class RequestProcessor extends BaseProcessor implements iProcessor {
  name = 'request'

  axiosInstance: AxiosInstance

  constructor(props?: CreateAxiosDefaults) {
    super()
    this.axiosInstance = Axios.create(props)
  }

  async handle(ctx: Context, env: Env) {
    const { id, params: ctxParams, config } = ctx

    const { url, path, method, params, data, cancel } = ctxParams

    const requestParams: AxiosRequestConfig = { url, method, ...config }

    if (id) {
      requestParams.cancelToken = new Axios.CancelToken(cancelFunction => {
        ctx.cancel = cancelFunction
        if (cancel && typeof cancel === 'function') cancel(cancelFunction, id)
      })
    }

    if (path) requestParams.url = transformPathParams(url, path)
    if (params) requestParams.params = params
    if (data) requestParams.data = data

    ctx.response = await this.axiosInstance.request(requestParams)

    env.bucket.pop(ctx.id)
  }
}

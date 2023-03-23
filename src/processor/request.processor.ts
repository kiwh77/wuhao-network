import { Context, Env } from '../context'
import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults
} from 'axios'
import { BaseProcessor, iProcessor } from './interface'

export class RequestProcessor extends BaseProcessor implements iProcessor {
  name = 'request'

  axiosInstance: AxiosInstance

  constructor(props?: CreateAxiosDefaults) {
    super()
    this.axiosInstance = Axios.create(props)
  }

  async handle(ctx: Context, env: Env) {
    super.handle(ctx, env)
    const { id, service, params: ctxParams, config } = ctx

    const { url, path, method, params, body, cancel } = ctxParams

    const requestParams: AxiosRequestConfig = { ...config }

    if (id) {
      requestParams.cancelToken = new Axios.CancelToken(cancelFunction => {
        ctx.cancel = cancelFunction
        if (cancel && typeof cancel === 'function') cancel(cancelFunction, id)
      })
    }

    if (path) requestParams.url = this.transformPathParams(url, path)

    switch (method.toLowerCase()) {
      case 'get':
        if (params) {
          requestParams.params = params
        }
        break
      case 'put':
        if (body) {
          requestParams.data = body
        }
        break
    }

    ctx.response = await this.axiosInstance.request(requestParams)
  }

  /**
   * 转换path参数
   * @param url 需要转换的url
   * @param params 参数
   */
  transformPathParams(
    url: string,
    path: { [key: string]: string } = {}
  ): string {
    const urlComponents = url.split('/')
    return urlComponents
      .map((component: string) => {
        if (
          new RegExp('^:').test(component) &&
          path[component.replace(':', '')]
        ) {
          return path[component.replace(':', '')]
        }
        return component
      })
      .join('/')
  }

  /**
   * 拼接query参数
   * @param url 需要拼接的url
   * @param params 参数
   */
  transformQueryParams(
    url: string,
    query: { [key: string]: string } = {}
  ): string {
    const keys = Object.keys(query)
    if (keys.length === 0) {
      return url
    }
    const queryString = keys.map(key => `${key}=${query[key]}`).join('&')
    return `${url}?${queryString}`
  }
}

import { Context, Env, ProcessType, Wrong } from '../context'
import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults
} from 'axios'
import { BaseProcessor, iProcessor } from './interface'
import { transformPathParams } from '../utils/transform'
import { objectAssignDeep, objectAssignDeepNoMutate } from '../utils/assign'

export class RequestProcessor extends BaseProcessor implements iProcessor {
  name = ProcessType.request

  axiosInstance: AxiosInstance

  constructor(props?: CreateAxiosDefaults) {
    super()
    this.axiosInstance = Axios.create(props)
  }

  async handle(ctx: Context, env: Env) {
    const { id, params: ctxParams, config, service } = ctx

    const { url, path, method, params, data, cancel } = ctxParams

    const requestParams: AxiosRequestConfig = { url, method, ...config }

    if (id) {
      requestParams.cancelToken = new Axios.CancelToken(cancelFunction => {
        ctx.cancel = cancelFunction
        if (cancel && typeof cancel === 'function') cancel(cancelFunction, id)
      })
    }

    let newPath, newParams, newData
    switch (service?.default?.assign) {
      case 'default':
        newPath = objectAssignDeep(path, service?.default?.path)
        newParams = objectAssignDeep(params, service?.default?.params)
        newData = objectAssignDeep(data, service?.default?.data)
        break
      case 'mixin':
        newPath = objectAssignDeepNoMutate(service?.default?.path, path)
        newParams = objectAssignDeepNoMutate(service?.default?.params, params)
        newData = objectAssignDeepNoMutate(service?.default?.data, data)
        break
      case 'replace':
      default:
        newPath = objectAssignDeep(service?.default?.path, path)
        newParams = objectAssignDeep(service?.default?.params, params)
        newData = objectAssignDeep(service?.default?.data, data)
        break
    }

    requestParams.url = transformPathParams(url, newPath)
    requestParams.params = newParams
    requestParams.data = newData

    try {
      ctx.response = await this.axiosInstance.request(requestParams)
    } catch (e) {
      // 收集错误
      env.emitter.emit(Wrong(ProcessType.request), e)
      env.bucket.pop(ctx.id)
      throw e
    } finally {
      env.bucket.pop(ctx.id)
    }
  }
}

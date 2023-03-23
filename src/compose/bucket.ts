import MD5 from '../utils/md5'
import { RequestOptions } from '../context'

export class Bucket {
  requests: {
    [key: string]: (RequestOptions & { timestamp: number }) | undefined
  } = {}

  verify(service: RequestOptions, interval: number) {
    const { url, method, params, path, body } = service
    const id = this._getId({
      url,
      method,
      params,
      path,
      body
    })

    const request = this.requests[id]
    if (request?.timestamp + interval < Date.now()) return false

    this.requests[id] = {
      ...service,
      timestamp: Date.now()
    }
    return true
  }

  pop(id: string) {
    this.requests[id] = undefined
  }

  private _getId(params: { [key: string]: any }) {
    return MD5(
      Object.keys(params)
        .sort()
        .map(item => {
          const value = params[item]
          let transformResult
          if (typeof value === 'object') {
            try {
              transformResult = JSON.stringify(value)
            } catch {}
          } else {
            transformResult = `${item}=${value}`
          }
          return transformResult
        })
        .join('&')
    )
  }
}

import MD5 from '../utils/md5'
import { RequestOptions } from '../context'

export class Bucket {
  requests: {
    [key: string]: { timestamp: number }
  } = {}

  getId(service: RequestOptions) {
    const { url, method, params, path, body } = service
    return this._getId({
      url,
      method,
      params,
      path,
      body
    })
  }

  verify(id: string, interval: number) {
    const request = this.requests[id]
    if (request?.timestamp + interval > Date.now()) return false

    this.requests[id] = {
      timestamp: Date.now()
    }
    return id
  }

  pop(id: string) {
    delete this.requests[id]
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

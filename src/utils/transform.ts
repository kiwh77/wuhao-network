/**
 * 转换path参数
 * @param url 需要转换的url
 * @param params 参数
 */
export function transformPathParams(
  url: string,
  path: { [key: string]: string } = {}
): string {
  const urlComponents = url.split('/')
  return urlComponents
    .map((component: string) => {
      const colonMatched = component.match(/^:(.+)$/)
      const bracketMatched = component.match(/^\{(.+)\}$/)
      const key = colonMatched?.[1] || bracketMatched?.[1]

      if (key && path[key]) {
        return path[key]
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
export function transformQueryParams(
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

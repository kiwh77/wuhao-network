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

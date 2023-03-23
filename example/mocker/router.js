const Path = require('path')
const Router = require('koa-router')
const router = new Router()
const Utils = require('./utils')

const mockRootPath = Path.join(__dirname, '/mocks')
const routes = Utils.valuesOfPath(mockRootPath)

/**
 * 注入路由
 */
Object.keys(routes).forEach(key => {
  if (typeof key !== 'string') return
  const methods = key.match(/\[get\]|\[GET\]|\[post\]|\[POST\]|\[put\]|\[PUT\]|\[delete\]|\[DELETE\]/g)
  if (!methods || methods.length === 0) return
  const method = methods.join('')
  const routeKey = key.replace(method, '').replace(/\ +/g, '').replace(/[\r\n]/g, '')
  const routeMethod = method.replace('[', '').replace(']', '').toLocaleLowerCase()
  console.log(`${routeMethod} ${routeKey} 添加成功`)
  router[routeMethod] && router[routeMethod](routeKey, routes[key])
})

module.exports = router

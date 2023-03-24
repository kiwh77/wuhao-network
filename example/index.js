export { axios } from 'https://cdn.skypack.dev/axios'

import { PipeAxios } from '../dist/index.esm.js'

const services = [
  {
    name: 'FetchUserList',
    url: '/api/users',
    method: 'get',
    middleware: [
      {
        name: 'beforeOfFetchUserList',
        type: 'before',
        handle(ctx, env) {}
      }
    ]
  },
  ['InsertUser', 'post', '/api/user'],
  {
    name: 'UpdateUser',
    url: '/api/user',
    method: 'put'
  },
  ['DeleteUser', 'delete', '/api/user']
]

const pipe = new PipeAxios({
  services
})
// 注册服务处理中间件
pipe.middleware.register({
  name: 'isArrayBody',
  at: 'beforeRequest',
  handle(ctx, env) {
    console.log('custom middleware isArrayBody')
  }
})

// 插入处理流程
pipe.processor.before('request', {
  name: 'setToken',
  handle(ctx, env) {
    console.log('custom process setToken', ctx)
  }
})

// 监听事件
pipe.emitter.on('process', function ({ name, ctx }) {
  console.log('process:', name, ctx)
})

const serviceListEle = document.getElementById('service_list')
const fragment = document.createDocumentFragment()

pipe.service.sources.forEach(service => {
  const li = document.createElement('li')
  li.innerText = service.name || `[${service.method}]${service.url}`
  li.addEventListener('click', function () {
    pipe.send({ ...service, params: { a: '1', b: 2 } }).then(
      res => {
        console.log(res)
      },
      error => {
        console.error(error)
      }
    )
  })
  fragment.appendChild(li)
})
serviceListEle.append(fragment)

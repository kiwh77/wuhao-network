# WuhaoNetwork

中文 | [English](README.md)

管道式发起请求，秩序化管理服务

> 管道式，指请求发起的流程，如同管道一样，请求如同水一样从管道中流过。

> 秩序化，以简单且有序的形式管理服务，同时支持复用

## 为什么要用这个框架？

在项目中使用网络请求常见如下几个模式：
### 简单粗暴型
简单粗暴型往往直接使用fetch\axios等通过url发起请求
* 优点：直接方便，拿到接口粘贴在业务处就完事
* 缺点：不方便复用，每个地方都得写一样的；混杂在众多业务逻辑中。

### 稍做封装
针对项目做简单封装，导出对应方法或实例
* 优点：功能复用起来容易很多
* 缺点：更多只是对发起接口请求的功能做了封装，对于服务本身的特性关注不够

### 详细配置
事先配置好服务接口、个性化设置，调用处只需要传业务参数
* 优点：对接口管理更精细，与业务代码耦合降低，更利于复用
* 缺点：增加一些学习成本，团队使用需要规范支持才能用的更好

> 本框架就属于详细配置型，同时还支持接口全生命周期随时自定义介入，用户可以通过处理器、中间件、服务三者配置形成对服务的矩阵式管理。

## 功能

- 集中管理接口配置信息
- 自定义扩展流程步骤
- OpenApi/AsyncApi 规范数据批量转换为接口列表及实体申明，需要使用[插件](https://github.com/kiwh77/wuhao-sequence)
- 接口列表启动模拟服务器
- 自定义生成模板

## 安装

```sh
# pnpm
pnpm add wuhao-network
# yarn
yarn add wuhao-network
# npm
npm install wuhao-network -S
```

## 使用

```ts
// network.ts
import { createNetwork } from 'wuhao-network'
import services from './services'
import middlewares from './middlewares'

const network = createNetwork({
  services,
  middlewares: [...middlewares, {
    name: 'TEMP_MIDDLEWARE',
    at: before(ProcessorType.request),
    handle (ctx, env) {
      // do some thing
    }
  }]
})

network.emit.on('')

export default network

// main.ts when Vue3
import { createApp } from 'vue'
import App from './App.vue'
import WuhaoNetwork from './network'

createApp(App).use(WuhaoNetwork).mount('#app')

// services.ts
import { Logger } from './middlewares'

export default [
  ['FetchUsers', 'get', '/api/user', {
    middlewares: [Logger],
    default: {
      params: {
        pageSize: 10,
        pageNum: 1
      }
    }
  }],
  ['InsertUser', 'post', '/api/user', {
    middlewares: ['Logger']
  }],
  ['UpdateUser', 'put', '/api/user/:id', {
    customData: 'some data of any type'
  }],
  ['DeleteUser', 'delete', '/api/user/:id'],
]

// middlewares.ts
import { useMiddleware } from 'wuhao-network'

export const Logger = useMiddleware({
  name: 'Logger',
  at: after(ProcessorType.request),
  handle(env, ctx) {
    console.log('请求参数 ：', ctx.params)
    console.log('返回结果 ：', ctx.response)
  }
})

export default [
  {
    name: 'SetToken',
    isGlobal: true,
    at: before(ProcessorType.request),
    handle(env, ctx) {
      if (!ctx.config) ctx.config = {}
      if (!ctx.config.headers) ctx.config.headers = {}
      ctx.config.headers.Authorization = 'TOKEN'
    }
  }
]

// place of use
import { useFetch, useService } from 'wuhao-network'

useFetch('FetchUsers', { params: { pageSize: 50, pageNum: 1 }}).then(res => {
  // ...
})

// temp
useService({
  url: '/api/temp',
  method: 'post'
})({
  data: {
    arg: 'xxx'
  }
}).then(res => {
  // ...
})

// in modules
// modules/services.ts
export const updateEntity = useService({
  url: '/api/update/entity/:id',
  method: 'put'
})

// place of use in module
updateEntity({
  path: {
    id: 'ID'
  },
  data: {
    name: 'NAME'
  },
  params: {
    t: Date.now()
  }
}).then(res => {
  // ...
})

// functional use
export const insertEntity = useService(['post', '/api/insert/entity'], 'data')

insertEntity({
  name: 'NAME',
  other: 'OTHER'
})

```

## 核心概念

### 流程图


![流程图](./docs/process.jpg)


### 管道式

管道中如同过滤一样，按顺序布满各种处理器，请求如水一般流过每个处理器，最后得到请求的处理结果。
当前内置三个处理器：
```
ConfigProcessor -> UniqueProcessor -> RequestProcessor
```

当实际业务开发中，有需要时，可以根据需要在任意位置添加或替换处理器，见[自定义处理器](#自定义处理器)

同时支持处理器前后的勾子，可在任意处理器前后添加中间件执行业务逻辑

### 服务注册
把服务先注册起来，在具体使用地方直接调用，有如下好处：
* 利于复用，服务一处配置，多处使用
* 利于维护，只要修改一处，多处生效

#### 集中注册

```ts
// services.ts

export default [
  // 形式一
  ['SERVICE_NAME', 'REQUEST_METHOD', 'REQUEST_URL', {
    middlewares: [ ... ],
  }],
  // 形式二
  {
    name: 'SERVICE_NAME',
    method: 'REQUEST_METHOD',
    url: 'REQUEST_URl',
    middlewares: [ ... ]
  }
]

```

#### 业务模块注册
如果业务模块区分特别清晰，例如按业务做前端微模块划分，此时每个模块内都独立管理自己的服务，可直接配置为函数式直接调用

此种方式也可享受到应用对于wuhao-network的全局配置
```ts
// xx_modules/services.ts
import { useService } from 'wuhao-network'

export const FUNC_NAME_A = useService(['SERVICE_NAME', 'REQUEST_METHOD', 'REQUEST_URL', {
    middlewares: [ ... ],
  }])

export const FUNC_NAME_B = useService({
    name: 'SERVICE_NAME',
    method: 'REQUEST_METHOD',
    url: 'REQUEST_URl',
    middlewares: [ ... ]
  })

```

#### 服务结构
此处服务的意思是为配置服务的相关信息，可在`types/compose/services.d.ts`中`iService`查看到最新结构

```ts
/**
 * 服务名
 */
name?: string;
/**
 * 服务url
 */
url: string;
/**
 * 服务类型
 */
method: Method | string;
/**
 * 服务标签
 */
tag?: Array<string> | string;
/**
 * 自定义数据，会跟随整个请求流程，可在中间件中拿到后进行个性化操作
 */
customData?: {
    [key: string]: any;
};
/**
 * 描述
 */
description?: string;
/**
 * 默认参数
 */
default?: Pick<RequestParams, 'path'> & Pick<RequestParams, 'params'> & Pick<RequestParams, 'data'> & {
    /**
     * 混合模式
     * last: 默认，使用时传入为主
     * default: 默认参数为主
     */
    assign?: 'default' | 'replace' | 'mixin';
};
/**
 * 特性
 */
middleware?: Array<iMiddleware | string>;
```

### 处理器

每个处理器只负责某个单一功能的处理

#### 内置处理器

##### ConfigProcessor 

此处理器中会对于本次发起请求的服务信息做较验

##### UniqueProcessor
此处理器功能为对服务发起做去重，如果配置了interval，则同样参数在配置时间内只发送一次

##### RequestProcessor
此处理器为最后发起请求的位置，目前集成的Axios发起请求

#### 处理器勾子
在处理器前后各设置有一个勾子，分别为`before`和`after`加上处理器名字首字母大写，也可使用的时候的拼接函数直接拼接

```ts
import { Before, ProcessType } from 'wuhao-network'

{
  middlewares: [
    {
      name: 'NAME',
      at: Before(ProcessType.request), // 或者直接使用 'beforeRequest'
      handle(ctx) {}
    }
  ]
}

```

#### 自定义处理器
当目前内置处理器不能满足业务需要时，支持自定义处理器，可分为替换当前处理器和插入新处理器到指定位置

处理器需要继承`BaseProcessor`、实现`iProcessor`接口

```ts
export class CustomProcessor extends BaseProcessor implements iProcessor {
  // 处理器实际名称，同样也会有相对应的before和after勾子
  name = 'custom'

  async handle(ctx: Context, env: Env) {
    
    // ... 业务逻辑

    // 调用基类handle，中间件在此方法处理
    super.handle(ctx, env)
  }
}

```

* 替换处理器
```ts

import { createNetwork, ProcessorType } from 'wuhao-network'

const network = createNetwork()

// 把名叫unique的处理器替换为新处理器
network.processor.replace(ProcessorType.unique, CustomProcessor)
network.processor.replace('unique', CustomProcessor)
network.processor.replace(1, CustomProcessor) // 1为处理器中对应下标

```

* 插入新处理器
```ts

import { createNetwork, ProcessorType } from 'wuhao-network'

const network = createNetwork()

// 在request处理器前插入新处理器
network.processor.before(ProcessorType.request, CustomProcessor)
network.processor.before('request', CustomProcessor)
network.processor.before(2, CustomProcessor) // 2为处理器中对应下标

// 在处理器列表最后面插入新处理器
network.register(CustomProcessor)

```

* 删除处理器

```ts
import { createNetwork, ProcessorType } from 'wuhao-network'

const network = createNetwork()

// 删除unique处理器
network.processor.remove(ProcessorType.unique)
network.processor.remove('unique')
network.processor.remove(1) // 1为处理器中对应下标
```


### 中间件
中间件是服务请求发起过程中调用的处理器，中间件的机制让服务能配置的能力更个性化，也增加封装和复用性。

#### 中间件结构

```ts
{
  /**
   * 中间件执行位置，同处理器勾子名称，例'beforeRequest'或before(ProcessorType.request)
   */
  at: string
  /**
   * 中间件名称
   */
  name: string
  /**
   * 是否全局中间件，注册为全局中间件会应用到所有服务
   */
  global?: boolean
  /**
   * 中间件处理函数
   */
  handle(ctx: Context, env?: Env): Promise<Error | void> | void | Error
}
```

#### 全局中间件
全局中间件一般配置在生成network实例处

``` ts
// middlewares.ts

// 方式一，直接返回对应结构对象
export const SetToken = {
  name: 'SetToken',
  global: true,
  at: Before(ProcessType.request),
  handle(ctx) {
    if (!ctx.config) ctx.config = {}
    if (!ctx.config.headers) ctx.config.headers = {}
    ctx.config.headers.Authorization = 'TOKEN'
  }
}
// 方式二，使用useMiddleware注册，然后使用名字
import { useMiddleware } from 'wuhao-network'
useMiddleware({name: 'SetToken',
  global: true,
  at: Before(ProcessType.request),
  handle(ctx) {
    if (!ctx.config) ctx.config = {}
    if (!ctx.config.headers) ctx.config.headers = {}
    ctx.config.headers.Authorization = 'TOKEN'
  }
})

// network.ts
import { SetToken } from './middlewares'

export const network = createNetwork({
  middlewares: [SetToken]
  // or
  middlewares: ['SetToken']
})
```

#### 服务个性化中间件

```ts

const Logger = {
  name: 'Logger',
  at: Before(ProcessorType.request)
  handle(ctx) {
    console.log('Begin Request : ' ctx.params)
  }
}

export const FUNC_NAME = useService(['SERVICE_NAME', 'SERVICE_METHOD', 'SERVICE_URL', {
  middlewares: [
    Logger
  ]
}])

```



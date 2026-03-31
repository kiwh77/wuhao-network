import { WuhaoNetwork, createNetwork, useFetch, useService } from './pipe'
import { Before, ProcessType } from './context'
import { BaseProcessor } from './processor/interface'
import { Context } from './context'
import { transformPathParams } from './utils/transform'

class MockRequestProcessor extends BaseProcessor {
  name = ProcessType.request

  calls: Array<{
    url: string
    method: string
    headers?: Record<string, string>
    tags?: string[] | string
  }> = []

  async handle(ctx: Context) {
    const resolvedUrl = transformPathParams(ctx.params.url, ctx.params.path)

    this.calls.push({
      url: resolvedUrl,
      method: ctx.params.method,
      headers: ctx.config?.headers as Record<string, string> | undefined,
      tags: ctx.service?.tags || ctx.service?.tag
    })

    ctx.response = {
      data: {
        url: resolvedUrl,
        method: ctx.params.method,
        headers: ctx.config?.headers || {},
        tags: ctx.service?.tags || ctx.service?.tag
      },
      success: true
    } as any
  }
}

function resetNetworkSingleton() {
  ;(WuhaoNetwork as any).simpleInstance = undefined
}

describe('WuhaoNetwork behaviors', () => {
  beforeEach(() => {
    resetNetworkSingleton()
  })

  afterEach(() => {
    resetNetworkSingleton()
  })

  it('resolves registered services and normalizes middleware aliases', async () => {
    const order: string[] = []
    const requestProcessor = new MockRequestProcessor()

    const network = createNetwork({
      services: [
        [
          'FetchUsers',
          'get',
          '/api/user/{id}',
          {
            middlewares: ['ServiceBefore'],
            tags: ['users']
          }
        ]
      ],
      middlewares: [
        {
          name: 'GlobalBefore',
          isGlobal: true,
          at: Before(ProcessType.request),
          handle(ctx) {
            order.push('global')
            ctx.config = {
              ...ctx.config,
              headers: {
                ...(ctx.config?.headers || {}),
                'X-Global': '1'
              }
            }
          }
        }
      ]
    })

    network.middleware.register({
      name: 'ServiceBefore',
      at: Before(ProcessType.request),
      handle(ctx) {
        order.push('service')
        ctx.config = {
          ...ctx.config,
          headers: {
            ...(ctx.config?.headers || {}),
            'X-Service': '1'
          }
        }
      }
    })

    network.processor.replace(ProcessType.request, requestProcessor)

    const response = await useFetch('FetchUsers', {
      path: { id: '42' }
    })

    expect(response.data).toEqual({
      url: '/api/user/42',
      method: 'get',
      headers: {
        'X-Global': '1',
        'X-Service': '1'
      },
      tags: ['users']
    })
    expect(order).toEqual(['global', 'service'])
    expect(requestProcessor.calls).toHaveLength(1)
  })

  it('supports direct useService requests and OpenAPI style path params', async () => {
    const requestProcessor = new MockRequestProcessor()
    const network = createNetwork()
    network.processor.replace(ProcessType.request, requestProcessor)

    const updateEntity = useService({
      url: '/api/entity/{id}',
      method: 'post'
    })

    const response = await updateEntity({
      path: { id: 'abc' },
      data: {
        enabled: true
      }
    })

    expect(response.data.url).toBe('/api/entity/abc')
    expect(response.data.method).toBe('post')
    expect(requestProcessor.calls).toHaveLength(1)
  })

  it('keeps duplicate request protection active during the configured interval', async () => {
    const requestProcessor = new MockRequestProcessor()
    const network = createNetwork({
      interval: 1000
    })
    network.processor.replace(ProcessType.request, requestProcessor)

    await network.get('/api/once')

    await expect(network.get('/api/once')).rejects.toMatchObject({
      name: 'UniqueError'
    })
    expect(requestProcessor.calls).toHaveLength(1)
  })
})

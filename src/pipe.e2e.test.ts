import axios from 'axios'
import { Before, ProcessType } from './context'
import { createNetwork, useFetch, WuhaoNetwork } from './pipe'

const requestMock = jest.fn()
let createSpy: jest.SpyInstance

function resetNetworkSingleton() {
  ;(WuhaoNetwork as any).simpleInstance = undefined
  requestMock.mockReset()
}

describe('WuhaoNetwork end-to-end', () => {
  beforeEach(() => {
    resetNetworkSingleton()
    createSpy = jest.spyOn(axios, 'create').mockReturnValue({
      request: requestMock
    } as any)
    requestMock.mockResolvedValue({
      data: {
        ok: true
      }
    })
  })

  afterEach(() => {
    createSpy.mockRestore()
    resetNetworkSingleton()
  })

  it('executes the full request pipeline with alias normalization and merged defaults', async () => {
    const cancelSpy = jest.fn()

    createNetwork({
      services: [
        [
          'FetchPet',
          'get',
          '/pet/{petId}',
          {
            middlewares: ['SetHeader'],
            tags: ['pet'],
            default: {
              params: {
                locale: 'zh-CN'
              },
              data: {
                source: 'default'
              },
              assign: 'mixin'
            }
          }
        ]
      ],
      middlewares: [
        {
          name: 'SetHeader',
          at: Before(ProcessType.request),
          isGlobal: true,
          handle(ctx) {
            ctx.config = {
              ...(ctx.config || {}),
              headers: {
                ...(ctx.config?.headers || {}),
                Authorization: 'TOKEN'
              }
            }
          }
        }
      ]
    })

    const response = await useFetch('FetchPet', {
      path: { petId: '42' },
      params: {
        page: 1
      },
      data: {
        source: 'custom'
      },
      cancel: cancelSpy
    })

    expect(createSpy).toHaveBeenCalledTimes(1)
    expect(requestMock).toHaveBeenCalledTimes(1)
    expect(cancelSpy).toHaveBeenCalledTimes(1)
    expect(requestMock).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/pet/42',
        method: 'get',
        params: {
          locale: 'zh-CN',
          page: 1
        },
        data: {
          source: 'custom'
        },
        headers: {
          Authorization: 'TOKEN'
        }
      })
    )
    expect(response.success).toBe(true)
    expect(response.data).toEqual({ ok: true })
  })
})

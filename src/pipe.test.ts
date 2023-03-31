import { WuhaoNetwork } from './pipe'
describe('Pipe.ts', () => {
  let instance: WuhaoNetwork
  beforeAll(() => {
    instance = new WuhaoNetwork()
  })
  it('Has Created', () => {
    expect(instance).toBeDefined()
  })
  it('HTTP Methods', () => {
    expect(instance.send).toBeDefined()
    expect(instance.get).toBeDefined()
    expect(instance.post).toBeDefined()
    expect(instance.put).toBeDefined()
    expect(instance.delete).toBeDefined()
    expect(instance.patch).toBeDefined()
  })
  it('Property', () => {
    expect(instance.pipe).toBeDefined()
    expect(instance.bucket).toBeDefined()
    expect(instance.emitter).toBeDefined()
    expect(instance.processor).toBeDefined()
    expect(instance.service).toBeDefined()
    expect(instance.middleware).toBeDefined()
  })
})

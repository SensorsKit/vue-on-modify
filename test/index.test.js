import { mount, createLocalVue } from '@vue/test-utils'
import Component from '../example/Input'
import isModified from '../src/isModified'
import VueOnModify from '../src'

const localVue = createLocalVue()
localVue.use(VueOnModify)

describe('DOM测试', () => {
  const wrapper = mount(Component, { localVue })
  const input = wrapper.find('input')

  test('输入框聚焦时为空失焦时也为空', () => {
    wrapper.setData({value: ''})
    input.trigger('focus')
    input.trigger('blur')
    expect(wrapper.vm.count).toBe(0)
  })

  test('输入框聚焦时为空失焦时不为空', () => {
    wrapper.setData({value: '', count: 0})
    input.trigger('focus')
    wrapper.setData({value: '123'})
    input.trigger('blur')
    expect(wrapper.vm.count).toBe(1)
  })

  test('输入框聚焦时不为空失焦时为空', () => {
    wrapper.setData({value: '123', count: 0})
    input.trigger('focus')
    wrapper.setData({value: ''})
    input.trigger('blur')
    expect(wrapper.vm.count).toBe(1)
  })

  test('输入框聚焦时不为空失焦时也不为空且值不变', () => {
    wrapper.setData({value: '123', count: 0})
    input.trigger('focus')
    input.trigger('blur')
    expect(wrapper.vm.count).toBe(0)
  })

  test('输入框聚焦时不为空失焦时也不为空且值改变', () => {
    wrapper.setData({value: '123', count: 0})
    input.trigger('focus')
    wrapper.setData({value: '456'})
    input.trigger('blur')
    expect(wrapper.vm.count).toBe(1)
  })
})

describe('逻辑测试', () => {
  test('新值与旧值相等', () => {
    const before = '123'
    const after = '123'
    const result = isModified(before, after)
    expect(result).toBe(false)
  })

  test('新值与旧值不相等', () => {
    const before = '123'
    const after = '12345'
    const result = isModified(before, after)
    expect(result).toBe(true)
  })
})

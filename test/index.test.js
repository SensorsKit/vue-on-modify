import { mount, createLocalVue } from '@vue/test-utils'
import Component from '../example/Input'
import isModified from '../src/isModified'
import VueOnModify from '../src'

const localVue = createLocalVue()
localVue.use(VueOnModify)

describe('DOM测试', () => {
  const wrapper = mount(Component, { localVue })
  const input = wrapper.find('input')

  test('xx', () => {

  })
})

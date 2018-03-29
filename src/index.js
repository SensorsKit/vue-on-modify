import isModified from './isModified'
import { getInputFromEl } from './util'

const OnModifyPlugin = {}
const registeredHandlers = []

const log = {
  e(...args) {
    console.error('[vue-on-modify]', ...args)
  }
}
const on = (el, eventName, callback) => {
  el.addEventListener(eventName, callback, false)
  return {
    el,
    destroy: () => el.removeEventListener(eventName, callback, false)
  }
}

const bind = (el, binding, vnode) => {
  el = getInputFromEl(el)

  if (!el) {
    return log.e('绑定的元素内未找到 input 标签！')
  }

  const onModify = binding.value
  let strOld = el.value
  let strNew = null

  if (typeof onModify !== 'object' && typeof onModify !== 'function') {
    log.e('指令需要传入一个函数或对象！')
    return
  } else if (typeof onModify === 'object' && !onModify.method) {
    log.e('指令对象必须包含method！')
    return
  }

  unbind(el)

  const onFocus = () => {
    strOld = el.value
  }

  const onBlur = () => {
    strNew = el.value
    if (isModified(strOld, strNew)) {
      if (typeof onModify === 'object') {
        let { method, ...args } = onModify

        if (Object.keys(args).length === 0) {
          onModify.method(strOld, strNew)
        } else {
          onModify.method(strOld, strNew, args)
        }
      } else {
        onModify(strOld, strNew)
      }
    }
  }

  registeredHandlers.push(on(el, 'focus', onFocus), on(el, 'blur', onBlur))
}

const unbind = el => {
  el = getInputFromEl(el)

  if (!registeredHandlers.length) {
    return
  }
  let index = registeredHandlers.length - 1
  while (index >= 0) {
    const handler = registeredHandlers[index]

    if (handler.el === el) {
      handler.destroy()
      registeredHandlers.splice(index, 1)
    }

    index -= 1
  }
}

const update = (el, binding) => {
  if (binding.value === binding.oldValue) {
    return
  } else if (
    typeof binding.value === 'function' &&
    typeof binding.oldValue === 'object' &&
    binding.value === binding.oldValue.method
  ) {
    return
  } else if (
    typeof binding.oldValue === 'function' &&
    typeof binding.value === 'object' &&
    binding.oldValue === binding.value.method
  ) {
    return
  } else if (
    typeof binding.oldValue === 'object' &&
    typeof binding.value === 'object' &&
    binding.value.method === binding.oldValue.method
  ) {
    return
  }
  bind(el, binding)
}

OnModifyPlugin.install = function(Vue, options) {
  const directiveName =
    options && options.directive ? options.directive : 'on-modify'
  Vue.directive(directiveName, {
    bind,
    update,
    unbind
  })
}

export default OnModifyPlugin

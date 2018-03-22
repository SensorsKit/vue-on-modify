import isModified from './isModified'

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
  const onModify = binding.value
  let strOld = el.value
  let strNew = null

  if (typeof onModify !== 'function') {
    log.e('指令需要传入一个函数')
    return
  }

  unbind(el)

  const onFocus = () => {
    strOld = el.value
  }

  const onBlur = () => {
    strNew = el.value
    if (isModified(strOld, strNew)) {
      onModify(strOld, strNew)
    }
  }

  registeredHandlers.push(
    on(el, 'focus', onFocus),
    on(el, 'blur', onBlur)
  )
}

const unbind = el => {
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
  }
  bind(el, binding)
}

OnModifyPlugin.install = function (Vue, options) {
  const directiveName =
    options && options.directive ? options.directive : 'on-modify'
  Vue.directive(directiveName, {
    bind,
    update,
    unbind
  })
}

export default OnModifyPlugin

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
}

const unbind = el => {
}

const update = (el, binding) => {
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

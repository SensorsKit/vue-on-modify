import Vue from 'vue'
import App from './App'
import VueOnModify from '../src/index'

const hostname = window.location.hostname

if (
  hostname === 'localhost' ||
  !Number.isNaN(Number(hostname.split('.').join('')))
) {
  import('vconsole').then(result => new result.default())
}

Vue.use(VueOnModify)

new Vue({
  el: '#app',
  render: h => h(App)
})

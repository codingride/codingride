// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bulma/css/bulma.css'
import 'swiper/dist/css/swiper.min.css'
import './assets/css/style.css'

import './services/tools'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'

// Validation
import VeeValidate from 'vee-validate'
const veeConfig = {
  delay: 3
}
Vue.use(VeeValidate, veeConfig)

// Axsios Config
let headers = null
let token = sessionStorage.getItem('xbToken')
if (token) {
  headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('xbToken')
  }
} else {
  headers = {
    'Content-Type': 'application/json'
  }
}

axios.defaults.baseURL = `${store.state.config.config.xbUrl}/${store.state.config.config.xbPath}/${store.state.config.config.xbUser}/${store.state.config.config.xbProject}`
axios.defaults.headers = headers

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

new Vue({
  el: 'meta'
})

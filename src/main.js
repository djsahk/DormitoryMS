import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/normalize.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import fetch from './util/fetch'
import api from './util/APIUtil'
const extend = Vue.prototype
extend.$post = fetch.post
extend.$get = fetch.get
extend.$upload = fetch.upload2
extend.$api = api
extend.$patch = fetch.patch
extend.$delete = fetch.deletes
extend.$getTime = fetch.time

Vue.config.productionTip = false

new Vue({
	el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import {catalogAxios, userCenterAxios} from '@/config/axiosDefault'
import store from '@/store/index'


Vue.config.productionTip = false

Vue.use(ElementUI)

//把两个不同请求地址的axios实例对象添加到vue原型上
Vue.prototype.axiosC = catalogAxios
Vue.prototype.axiosU = userCenterAxios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

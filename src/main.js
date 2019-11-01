import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/font/iconfont.css'
import '@/assets/css/common.css'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif',
  attempt: 2
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

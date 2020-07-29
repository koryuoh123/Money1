import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router' //这里其实省掉了index.ts
import store from './store'

Vue.config.productionTip = false

new Vue({
  router: router, //缩写成router,
  store,
  render: h => h(App)
}).$mount('#app')

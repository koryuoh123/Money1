import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router' //这里其实省掉了index.ts
import store from './store'
import Nav from '@/components/Nav.vue'

Vue.config.productionTip = false
Vue.component('Nav',Nav);
new Vue({
  router: router, //缩写成router,
  store,
  render: h => h(App)
}).$mount('#app')

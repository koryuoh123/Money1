import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router"; //这里其实省掉了index.ts
import store from "./store";
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";
import Add from "@/components/Add.vue"
import Tabs from "@/components/Tabs.vue";
import { Radio } from "ant-design-vue";
Vue.use(Radio)
Vue.config.productionTip = false;
Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icon", Icon);
Vue.component("Add", Add);
Vue.component("Tabs", Tabs);
new Vue({
  router: router, //缩写成router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 9999);
  }, 0);
};

if(document.documentElement.clientWidth > 500){
  window.alert('为了保证浏览效果，建议使用手机浏览。您也可以按F12进入开发者模式模拟手机环境')

}
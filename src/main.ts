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

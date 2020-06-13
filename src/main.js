import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "@tensorflow/tfjs"
import VueResource from 'vue-resource';
import AV from "leancloud-storage";

Vue.use(Antd);
Vue.use(VueResource)
Vue.use(AV)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

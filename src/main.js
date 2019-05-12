import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import "./../node_modules/uikit/dist/js/uikit.min.js";
import "./../node_modules/uikit/dist/css/uikit.min.css";
import '@/firebase/';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
 
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ChartKick from "vue-chartkick"
import Chart from 'chart.js'

Vue.use(ChartKick.use(Chart))
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

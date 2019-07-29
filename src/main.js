import Vue from "vue";
import App from "./App";
import fly from "./api/config";

Vue.config.productionTip = false;
Vue.prototype.$fly = fly;
App.mpType = "app";

const app = new Vue(App);
app.$mount();

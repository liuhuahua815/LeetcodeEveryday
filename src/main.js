import Vue from "vue";
import axios from 'axios';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {Card ,Button, Radio, RadioGroup, RadioButton,Tag} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/base.css";

Vue.prototype.$http = axios
Vue.config.productionTip = false;
Vue.use(Card)
Vue.use(Button)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Tag)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

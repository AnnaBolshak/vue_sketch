import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSort, faSortDown, faSortUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false;
library.add(faSort, faSortDown, faSortUp, faMagnifyingGlass)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

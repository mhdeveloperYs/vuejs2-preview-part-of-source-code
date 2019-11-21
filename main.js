import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'

Vue.use(Vuesax);



// Theme Configurations
import '../themeConfig.js'

// Globally Registered Components
import './globalComponents.js'

// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'


// i18n
import i18n from './i18n/i18n'


// Vuesax Admin Filters
import './filters/filters'


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer);

// PrismJS
import 'prismjs'
// import 'prismjs/themes/prism-tomorrow.css'

// axios and Vueaxios
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth'

Vue.use(VueAxios, axios);
const token = localStorage.getItem('token');
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
axios.defaults.baseURL = 'http://memo.test/api';
Vue.use(VueAuth, {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    rolesVar: 'role'
});

// VeeValidate
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import Multiselect from 'vue-multiselect'
// register globally
  Vue.component('multiselect', Multiselect)

// Vtooltip
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');

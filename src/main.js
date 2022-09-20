import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import store from '@/store'
import '@/mock/mock_serve'
import api from "@/api"
/* import { MessageBox } from 'element-ui';
Vue.component(MessageBox.name, MessageBox); */

Vue.config.productionTip = false

Vue.component('TypeNav', TypeNav)

new Vue({
    render: h => h(App),
    router,
    store,
    beforeCreate() {
        Vue.prototype.$api = api;
    }
}).$mount('#app')

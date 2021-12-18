import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import {
    ModalPlugin,
    ToastPlugin,
    ButtonPlugin
} from 'bootstrap-vue';

[ModalPlugin, ToastPlugin, ButtonPlugin].forEach(comp => {
    Vue.use(comp);
});

Vue.config.productionTip = false
Vue.config.performance = true

if (process.env.VUE_APP_ENV === 'production') {
    Vue.config.devtools = false;
    Vue.config.debug = false;
    Vue.config.silent = true;
}

new Vue({
    router,
    store,
    render: h => h(App),
    computed: {
    },
    methods: {
    },
    created() {
        
    }
}).$mount('#app')

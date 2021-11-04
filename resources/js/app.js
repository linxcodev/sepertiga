import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import {
    TablePlugin,
    ButtonPlugin,
    CardPlugin,
    SpinnerPlugin,
    FormGroupPlugin,
    InputGroupPlugin,
    PaginationPlugin,
    FormCheckboxPlugin,
    BadgePlugin,
    FormSelectPlugin,
    ProgressPlugin,
    FormInputPlugin,
    ModalPlugin,
    ToastPlugin,
    FormRadioPlugin,
    CollapsePlugin,
} from 'bootstrap-vue';

[TablePlugin, ButtonPlugin, CardPlugin, SpinnerPlugin, FormGroupPlugin,
    InputGroupPlugin, PaginationPlugin, FormCheckboxPlugin, BadgePlugin,
    FormSelectPlugin, ProgressPlugin, FormInputPlugin, ModalPlugin, ToastPlugin,
    FormRadioPlugin, CollapsePlugin].forEach(comp => {
        Vue.use(comp);
    });

Vue.config.productionTip = false
Vue.config.performance = true

if (process.env.VUE_APP_ENV === 'production') {
    Vue.config.devtools = false;
    Vue.config.debug = false;
    Vue.config.silent = true;
}

import { successToas } from './entities/notif'

new Vue({
    router,
    store,
    render: h => h(App),
    computed: {
    },
    methods: {
    },
    created() {
        this.$bvToast.toast("sukses jalan", successToas())
    }
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@/assets/css/main.css'
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

Vue.config.productionTip = false

Vue.component('VueTimepicker', VueTimepicker)
new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
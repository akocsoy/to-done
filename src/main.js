import { createApp } from 'vue'
import App from './App.vue'

import "primevue/resources/themes/saga-blue/theme.css"      //theme
import "primevue/resources/primevue.min.css"                //core css
import "primeicons/primeicons.css"                          //icons
import store from './store'
import ToastService from "primevue/toastservice"
import Toast from 'primevue/toast'
import PrimeVue from 'primevue/config';

const app=createApp(App)

app.component("ToastMessage",Toast)
app.use(ToastService)
app.use(PrimeVue);
app.use(store)
app.mount('#app')

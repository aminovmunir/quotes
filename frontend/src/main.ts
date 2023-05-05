import { createApp } from 'vue'
import App from './App.vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import vSelect from 'vue-select'
import './assets/main.css'
import 'vue3-easy-data-table/dist/style.css';
import 'vue-select/dist/vue-select.css';

import { router } from '@/router'




const app = createApp(App)

app.use(router)

app.component('v-select', vSelect)
app.component('EasyDataTable', Vue3EasyDataTable)


app.mount('#app')

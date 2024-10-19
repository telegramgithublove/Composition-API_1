import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import store from './store/vuexstore'

const app = createApp(App);
app.use(store); // Подключите store к приложению
app.mount('#app'); 
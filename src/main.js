import './assets/main.css'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import axios from 'axios';
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { pinia } from './store'

const app = createApp(App);  
app.use(pinia);
app.use(router);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app');


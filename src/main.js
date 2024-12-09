import './assets/main.css'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios';
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { pinia } from './store'
// createApp(App).mount('#app')
// 创建一个 Axios 实例并设置根路径
const api = axios.create({
    baseURL: 'http://192.168.181.161:3566/'
});
const app = createApp(App);  
// 将 Axios 实例挂载到 Vue 的原型上，使其在所有组件中可用
app.config.globalProperties.$api = api;
app.use(pinia);
app.use(router);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app');


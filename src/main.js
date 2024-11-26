import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'
import './assets/main.css'

// 设置 axios 默认配置
axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.withCredentials = true

// 设置默认主题
document.documentElement.setAttribute('data-theme', 'default')

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')

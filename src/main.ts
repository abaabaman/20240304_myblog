import './common/styles/main.css'
// import "element-plus/theme-chalk/src/message.scss";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

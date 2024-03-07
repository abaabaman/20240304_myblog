import './common/styles/main.css'
// import "element-plus/theme-chalk/src/message.scss";
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import  './router/routerGuards'
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import { createPinia } from 'pinia'

// import VMdPreview from '@kangc/v-md-editor/lib/preview';
// import '@kangc/v-md-editor/lib/style/preview.css';
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
// import '@kangc/v-md-editor/lib/theme/style/github.css';

// import Prism from 'prismjs';

// VMdPreview.use(githubTheme);


const pinia = createPinia()
const app = createApp(App);

app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(router);
app.use(pinia)
// app.use(VMdPreview);

app.mount('#app')

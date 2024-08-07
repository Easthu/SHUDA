import { createApp } from 'vue'
import App from './App.vue'
import 'assets/style/global.css'
import router from '@/router'
import { createPinia } from 'pinia'
import VConsole from 'vconsole';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// if (import.meta.env.MODE == "development") {
const vConsole = new VConsole();
// }

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// 计算设置rem的基准值，即html的font-size
import 'amfe-flexible'

// import {
//     vant
// } from './pulgins/vant.js'
// vant(app)

// 引入懒加载组件 VantResolver()不会自动引入
import { Lazyload } from 'vant';
app.use(Lazyload, {
  lazyComponent: true,
});

//引入vant样式
import 'vant/lib/index.css';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

// 全局组件挂载
import globalComponents from './utils/globalComponents.js'
globalComponents(app)

// 全局挂载方法
import globalProperties from './utils/globalProperties'
globalProperties(app)

if (import.meta.env.MODE == "development") {
  console.log('import.meta.env>>', import.meta.env);
}


// pinia
app.use(pinia)
// 路由
app.use(router)

app.mount('#app')

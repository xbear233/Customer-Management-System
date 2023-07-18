import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPersist from 'pinia-plugin-persist'

/**
 * pinia的持久化
 * https://www.cnblogs.com/fqh123/p/16515284.html
 */
const pinia = createPinia()
pinia.use(piniaPersist)

/**
 * mock数据
 */
import '@/mock/index'

const app = createApp(App)

// app.use(createPinia())
app.use(pinia)
app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WujieVue from 'wujie-vue2'
import microApps from './micro-app'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/common.css'
import '@/icons'
Vue.use(ElementUI)

const { setupApp, preloadApp, bus } = WujieVue
Vue.use(WujieVue)

Vue.config.productionTip = false

bus.$on("click", (msg) => console.log(msg))

const props = {
  state: store.state,
  jump: (name) => {
    router.push({ name })
  }
}

microApps.forEach(item => {
  setupApp({
    ...item,
    props
  })
})

if (window.localStorage.getItem('preload') !== 'false') {
  preloadApp({
    name: 'wms'
  })
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

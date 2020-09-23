import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//加載vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 加載全局樣式(記的放在vant後面才能覆蓋)
import'./styles/index.scss'
import 'amfe-flexible'

Vue.config.productionTip = false
// 全局註冊VANT的組件
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

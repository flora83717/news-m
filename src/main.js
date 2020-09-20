import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加載全局樣式
import style from './styles/index.scss'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'


Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from "vue";
import Vuex from "vuex";
import {getItem,setItem} from '@/utils/storage'
Vue.use(Vuex);
// 保險起見，將key值以一個常量代替，避免set或get時寫錯
const USER_KEY = 'news_user';
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) //當前用戶的登錄資訊
  },
  mutations: {
    setUser: function(state, data) {
      state.user = data;
      setItem(USER_KEY ,data);
    }
  },
  actions: {},
  modules: {}
});

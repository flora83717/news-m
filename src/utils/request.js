// 封裝axios模塊
import axios from 'axios'

const request = axios.create({
  baseURL:' http://ttapi.research.itcast.cn/' //基礎路徑
})

// 請求攔截

// 響應攔截

// 導出
export default request
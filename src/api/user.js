// 用戶相關請求模塊

import request from '@/utils/request.js'

//登錄註冊 

export const login = (data) => {
  return request({
    method:'post',
    url:'/app/v1_0/authorizations',
    data
  })
}

// 驗證短信

export const sendSms = (mobile) => {
  return request({
    method:'GET',
    url:`/app/v1_0/sms/codes/${mobile}`,
  })
}
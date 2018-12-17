/**
 * @author joe
 * @email 1047649886@qq.com
 * @create date 2018-11-06 19:53:17
 * @modify date 2018-11-06 19:54:14
 * @desc 请求处理
*/

import axios from 'axios'
import { getStore } from '@/api/localStorage'
import { baseUrl } from '@/api/config'
import Vue from 'vue'
import Toast from 'muse-ui-toast'
Vue.use(Toast, {
  position: 'top', // 弹出的位置
  time: 2000, // 显示的时长
  closeIcon: ':fa fa fa-times', // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: ':fa fa fa-ok', // 成功信息图标
  infoIcon: ':fa fa fa-infoo', // 信息信息图标
  warningIcon: ':fa fa fa-warning', // 提醒信息图标
  errorIcon: ':fa fa fa-error' // 错误信息图标
})

/**
 * 请求拦截器
 * 登陆后 从 localstorage 中 取到 token currentUserId 带入 header 发送
 */
axios.interceptors.request.use(function (config) {
  config.baseURL = baseUrl
  const token = getStore('token')
  const currentUserId = getStore('currentUserId')
  if (token) {
    config.headers.Authorization = token
    config.headers.currentUserId = currentUserId
  }
  config.timeout = 5000
  return config
}, function (error) {
  return Promise.reject(error)
})

/**
 * 响应拦截器
 */
axios.interceptors.response.use(function (response) {
  if (response.data && response.data.code === 200) {
    return response.data.data
  } else {
    // eslint-disable-next-line no-undef
    Toast.message({
      message: '( ╯□╰ ) 服务器错误 ( ╯□╰ )',
      color: '#d76d2f'
    })
    return null
  }
}, function (error) {
  // eslint-disable-next-line no-undef
  Toast.message({
    message: '( ╯□╰ ) 网络不佳 ( ╯□╰ )',
    color: '#d76d2f'
  })
  return Promise.reject(error)
})

/**
 * 以下封装 get post del put
 */

export function get (url) {
  return axios.get(url)
}

export function post (url, data, config) {
  return axios.post(url, data)
}

export function put (url, data) {
  return axios.put(url, data)
}

export function del (url) {
  return axios.delete(url)
}

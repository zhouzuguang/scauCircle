/**
 * @author joe
 * @email 1047649886@qq.com
 * @create date 2018-11-20 15:56:32
 * @modify date 2018-11-20 15:58:34
 * @desc 状态管理
*/
import Vue from 'vue'
import Vuex from 'vuex'
import { getStore, saveStore } from '@/api/localStorage'
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
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getStore('user')
  },
  getters: {
    /**
     * 检查登陆
     * @param {Object} state
     */
    checkLogin: state => {
      const isLogin = state.user !== null
      // 提醒登陆
      if (!isLogin) {
        // eslint-disable-next-line no-undef
        Toast.message({
          color: '#1ABC9C',
          message: '请登陆'
        })
      }
      return isLogin
    }
  },
  mutations: {
    /**
     * 储存本地信息
     * @param {Object} state
     * @param {Object} user
     */
    storeUser (state, user) {
      state.user = user
      saveStore('user', user)
      saveStore('token', user.token)
      saveStore('currentUserId', user.ybUser.ybUserId)
    },
    /**
     * 删除本地用户信息
     * @param {Object} state
     */
    deleteUser (state) {
      state.user = null
      saveStore('user', null)
      saveStore('token', null)
      saveStore('currentUserId', null)
    }
  },
  actions: {

  }
})

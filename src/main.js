import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'muse-ui/lib/styles/base.less'
import { Button, BottomNav, Icon, Grid, Snackbar, Progress, AppBar, List, Badge, Paper, Form, Select, TextField, Popover, Tabs } from 'muse-ui'
import Helpers from 'muse-ui/lib/Helpers'
import 'muse-ui/lib/styles/theme.less'
import 'muse-ui-loading/dist/muse-ui-loading.css'
import Loading from 'muse-ui-loading'
import theme from 'muse-ui/lib/theme'
import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from './alloy_finger.vue'
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
Vue.use(AlloyFingerPlugin, { AlloyFinger })
Vue.use(Helpers)
Vue.use(theme)
Vue.use(Button)
Vue.use(BottomNav)
Vue.use(Icon)
Vue.use(Grid)
Vue.use(Snackbar)
Vue.use(Progress)
Vue.use(AppBar)
Vue.use(List)
Vue.use(Badge)
Vue.use(Paper)
Vue.use(Form)
Vue.use(Select)
Vue.use(Popover)
Vue.use(TextField)
Vue.use(Tabs)
Vue.use(Loading)
theme.add('circle', {
  primary: '#1ABC9C'
}, 'light')
theme.use('circle')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// TODO: 垂直居中 水平居中 position flex布局
// TODO: 消息删除
// TODO: 跳转
// TODO: IOS 启动页面
// TODO: 手势
// TODO: 下拉误触
// TODO: IOS 滚动问题 !!!

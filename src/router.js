import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Store from './store'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        alive: true
      }
    },
    {
      path: '/square',
      name: 'Sqaure',
      component: () => import('./views/Square.vue'),
      meta: {
        alive: true
      }
    },
    {
      path: '/preference',
      name: 'Preference',
      component: () => import('./views/Preference.vue'),
      meta: {
        alive: true,
        user: true
      }
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('./views/User.vue'),
      meta: {
        alive: true
      }
    },
    {
      path: '/mypublish',
      name: 'MyPublish',
      component: () => import('./views/MyPublish.vue'),
      meta: {
        alive: true,
        user: true
      }
    },
    {
      path: '/mycollection',
      name: 'MyCollection',
      component: () => import('./views/MyCollection.vue'),
      meta: {
        alive: true,
        user: true
      }
    },
    {
      path: '/addcol',
      name: 'AddCol',
      component: () => import('./views/AddCol.vue'),
      meta: {
        alive: false
      }
    },
    {
      path: '/mycomment',
      name: 'MyComment',
      component: () => import('./views/MyComment.vue'),
      meta: {
        alive: true,
        user: true
      }
    },
    {
      path: '/news/:id',
      name: 'NewsDetail',
      component: () => import('./views/News.vue'),
      meta: {
        alive: true
      }
    },
    {
      path: '/message/:id',
      name: 'MessageDetail',
      component: () => import('./views/Message.vue'),
      meta: {
        alive: true
      }
    },
    {
      path: '/publish',
      name: 'Publish',
      component: () => import('./views/Publish.vue'),
      meta: {
        alive: false,
        user: true
      }
    },
    {
      path: '/callback',
      name: 'Callback',
      component: () => import('./views/Callback.vue'),
      meta: {
        alive: false
      }
    }
  ]
})
// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.user) {
    if (Store.getters.checkLogin) {
      next()
    } else {
      next('/user')
    }
  } else {
    next()
  }
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),

  },
  {
    path: '/home',
    meta: { isFotterShow: true },

    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/musicitem',
    meta: { isFotterShow: true },

    component: () => import(/* webpackChunkName: "musicitem" */ '../views/MusicItem.vue'),
  },
  {
    path: '/musicdetail',
    meta: { isFotterShow: false },
    component: () => import(/* webpackChunkName: "musicdetail" */ '../views/MusicDetail.vue'),

  },
  {
    path: '/search',
    meta: { isFotterShow: false },
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue'),
  },
  {
    path: '/login',
    meta: { isFotterShow: false },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),

  },
  {
    path: '/user',
    meta: { isFotterShow: false },
    // 独享守卫
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next();
      } else {
        // 未登录进入login页面
        // router.push('/login',)
        next('/login');
      }
    },
    component: () => import(/* webpackChunkName: "infouser" */ '../views/InfoUser.vue'),

  }

]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.isFotterShow == false) {
    store.state.isFotterShow = false
  }
  else {
    store.state.isFotterShow = true
  }
  next()
})

export default router

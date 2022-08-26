import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
const basename = process.env.NODE_ENV === "production" ? "/micro-app/" : ""

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component:() => import(/* webpackChunkName: "login" */ '@/components/login.vue')
  },
  {
    path: '/',
		component: Layout,
		redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home.vue')
      },
      {
        path: 'userInfo',
        name: 'UserInfo',
        component: () => import('@/views/userInfo.vue')
      },
      {
        path: 'wms/:path',
        name: 'wms',
        component: () => import('@/views/wms.vue')
      },
      {
        path: '404',
        name: '404',
        component: () => import('@/views/404.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: basename,
  routes
})

export default router

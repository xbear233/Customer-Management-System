import { makeInstaller } from 'element-plus'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/Home-3.vue'
import Main from '../views/Main.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:"/login",
      name:"login",
      component:()=>import("../views/Login.vue")
    },
    {
      path:'/',
      component:Main,
      children:[
        {
          path:"/",
          redirect:'/home',
        },
        {
          path:'/home',
          name:'home',
          component: () => import('../views/Home-3.vue')
        },
        {
          path:'/user',
          name:'user',
          component: () => import('../views/User-2.vue')
        }
      ]
    }
  ]
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: Home
  //   },
  //   {
  //     path: '/user2',
  //     component: () => import('../views/User-2.vue')
  //   },

  //   {
  //     path: '/user0',
  //     component: () => import('../views/User-0.vue')
  //   },
  //   {
  //     path: '/home1',
  //     name: 'home1',
  //     component: () => import('../views/Home-1.vue')
  //   },
  //   {
  //     path: '/about',
  //     name: 'about',
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import('../views/About.vue')
  //   }
  // ]
})

export default router

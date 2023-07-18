import { makeInstaller } from 'element-plus'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

import Home from '../views/Home-3.vue'
import Main from '../views/Main.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue")
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
          component: () => import('../views/User-0.vue')
        }
      ],
    //  {
    //   path:"*",
    //   component:()=>import("../views/404.vue")
    // },
    },
    {
      path:'/:pathMatch(.*)*',
      component:()=>import("../views/404.vue")
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

//vuerouter访问pinia，需要注意的问题
//https://blog.csdn.net/youyacoder/article/details/127244318
//判断哪些页面不需要登录，可以用路由元信息

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.name !== 'login' && userStore.token == '') next({ name: 'login' })
  else next()
})


export default router

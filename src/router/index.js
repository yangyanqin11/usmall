import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由规则的配置
const index = ()=>import('../pages/index')
const cate = ()=>import('../pages/cate')
const goodsList = ()=>import('../pages/goodsList')
const cart = ()=>import('../pages/cart')
const mime = ()=>import('../pages/mime')
const home = ()=>import('../pages/home')
const login = ()=>import('../pages/login')
const register = ()=>import('../pages/register')

export default new Router({
  routes: [
    {
      path:'/',
      name:'首页',
      redirect:'/home',
      component:index,
      children:[
        {
          path:'home',
          component:home
        },
        {
          path:'cate',
          component:cate
        },
        
        {
          path:'cart',
          component:cart
        },
        {
          path:'mime',
          component:mime
        },
      ]
    },
    {
      path:'/goodsList',
      component:goodsList
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/register',
      component:register
    },
    {
      path:'*',
      redirect:'/login'
    },
  ]
})

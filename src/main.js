// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 在全局中引入vant移动端组件
import Vant, { Toast } from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.prototype.$preImg = 'http://localhost:3000';
 import store from './store/index';
 router.beforeEach((to,from,next)=>{
   if(to.path =='/mime' || to.pat =='/cart' ){
      // 获取用户信息
      const user = JSON.parse(sessionStorage.getItem('user'));
      if(!user){
        Toast.fail('请先去登录');
        // 去到登录页面
        router.push('/login');
        return
      }
   }
   next()
 })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

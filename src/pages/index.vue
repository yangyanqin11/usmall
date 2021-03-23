<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="blue" route>
      <van-tabbar-item icon="home-o" to='/home'>首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/cate">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart" :badge="total">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/mime">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      active: 0,
    };
  },
  // 计算属性
  computed:{
    ...mapGetters({
      'user':'user',
      'total':'total',
    }
  )},
  methods:{
    ...mapActions({
      'requestCartList':'cartListActions'
    })
  },
  mounted(){
  if(this.user){
      this.requestCartList(this.user.uid)
    }
  }
};
</script>

<style>
</style>
<template>
  <div>
    <van-nav-bar  left-arrow title="会员管理"  @click-left="$router.go(-1)"  />
    <div id='pic'>
      <van-image 
      round
      width="10rem"
      height="10rem"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <p>{{user.nickname}}</p>
    </div>
    <van-button type="danger" block @click="loginOut">安全退出</van-button>
    <div>
      <van-cell title="我的收藏" is-link />
      <van-cell title="我的评论" is-link />
      <van-cell title="我的订单" is-link />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
 computed:{
  //在这里我们是通过存储在vux中的用户信息，直接从里面去取出来
   ...mapGetters({
     'user':'user'
   })
 },
 methods:{
   loginOut(){
    //将用户的信息在我们的状态管理中清除，
     this.requestUser(null);
    //  用户退出后消息提示
     this.$toast.success('退出成功')
    //  退出页面到登录信息页面
     this.$router.push('/login');
   },
   ...mapActions({
     'requestUser':'userActions'
   })
 }

}
</script>

<style scoped>
#pic{
  width:100%;
  height: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: gainsboro;
}
.van-button{
  margin:20px 0px;
  border-radius: 20px;
}

</style>
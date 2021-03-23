<template>
  <div>
      <van-nav-bar   left-arrow title="购物车"  @click-left="$router.go(-1)"/>
      <div class="main">
      <div v-if="cartList!==null">
      <van-card
       v-for='item in cartList' :key='item.id'
      :price="item.price"
      :title="item.goodsname"
      :thumb="$preImg+item.img"
     >
    <template #footer>
    <van-stepper v-model="item.num" theme="round" button-size="22" disable-input />
    <van-button type="primary" size="mini" @click="del(item.id)">删除</van-button>
     </template>
     
    </van-card>
    <van-submit-bar :price="sumAcount" button-text="提交订单" class='bottom'/>
    </div>
    
      <van-empty v-else
     class="custom-image"
     image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
     description="购物车空空如也！！！"
      />
   
    </div>
    
  </div>
</template>

<script>
import { delCart } from "../utils/request";
import { mapActions, mapGetters } from 'vuex';
export default {
  computed:{
    ...mapGetters({
      'user':'user',
      'cartList':'cartList',
      "sumAcount":'sumAcount'
    })
  },
  methods:{
    ...mapActions({
      'requestCartList':'cartListActions'
    }),
    // 删除
    del(id){
      delCart({id}).then(res=>{
        this.$toast.fail(res.data.msg);
        this.requestCartList(this.user.uid);
      })
    }
  },
// 在页面挂载完成的时候，我们取出用户的uid,利用此用户的uid我们可以得到该用户的购物车列表，在购物车列表中做操作
mounted(){
  if(this.user){
    //因为在其他的页面中也会涉及到购物车列表数据的请求，所以在这里的时候我们使用状态管理
      //   var uid = this.user.uid;
      //   getCart({uid}).then(res=>{
      //     this.cartList = res.data.list;
      //   })
      // }
      // 在这个自定义函数中将后台需要的参数传递过去
      this.requestCartList(this.user.uid);
    }
    }
 }
</script>

<style scoped>
.main{
  margin-bottom:50px;
}
.bottom{
  margin-bottom:50px;
}
</style>
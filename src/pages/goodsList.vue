<template>
  <div>
     <van-nav-bar  left-arrow title="商品列表"  @click-left="$router.go(-1)"/>
     <div v-if='goodsList!==null'>
         <van-card  v-for='item in goodsList' :key="item.id"
         :price="item.price"
         :title="item.goodsname"
         :thumb="$preImg+item.img"
         >  
         <template #footer>
           <van-button size="mini" icon='cart-o' type='primary' @click="add(item.id)"></van-button>
         </template>
         </van-card>
     </div>
     <div v-else>
      <van-empty
     class="custom-image"
     image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
     description="暂无该商品信息！！！"
      />
     </div>
   
 
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {  getGoodsList,addCart} from "../utils/request";
export default {
  data(){
    return {
      goodsList:[],
    }
  },
  computed:{
    ...mapGetters({
      'user':'user'
    })
  },
  methods:{
    requestGoodsList(){
      var fid = this.$route.query.fid;
      getGoodsList({fid}).then(res=>{
        this.goodsList = res.data.list;
      })
    },

    // 添加商品操作
    add(id){
      var data ={
        uid:this.user.uid,
        goodsid:id,
        num:1
      };
      // 发起后端的请求
      addCart(data).then(res=>{
        // 成功后给我们提示添加成功
        this.$toast.success(res.data.msg);
        // 重现渲染购物车页面
        this.requestCartList(this.user.uid);
      })
    },
    ...mapActions({
      'requestCartList':'cartListActions'
    })
   },
    // 当页面刚加载的时候，请求商品列表
    mounted(){
      this.requestGoodsList();
    }
}
</script>

<style scoped>
  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
</style>
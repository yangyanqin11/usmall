<template>
  <div>
      <van-nav-bar title="首页"/>    
      <!-- 轮播图部分 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key='item.id'>
        <img :src="$preImg+item.img">
      </van-swipe-item>
      </van-swipe>

      <van-tabs v-model="active" class="main">

       <!-- 热门推荐 -->
       <van-tab title="热门推荐">
        <van-card v-for='item in goodsList[0].content' :key='item.id'
         tag="hot"
         :price="item.price"
         :title="item.goodsname"
         :thumb="$preImg+item.img" >
         <!-- 当点击添加按钮时候 -->
         <template #footer>
           <van-button  type='primary' icon='cart-o' size='mini' @click="add(item.id)">
           </van-button>
         </template> 
       </van-card>
       </van-tab>

       <!-- 商品收藏 -->
       <van-tab title="商品收藏">
         <van-card v-for='item in goodsList[1].content' :key='item.id'
         tag="new"
         :price="item.price"
         :title="item.goodsname"
         :thumb="$preImg+item.img">
         <template #footer>
           <van-button  type='primary' icon='cart-o' size='mini' @click="add(item.id)">
           </van-button>
         </template> 
       </van-card>

       </van-tab>
       <van-tab title="全部商品">
         <van-card v-for='item in goodsList[2].content' :key='item.id'
         :price="item.price"
         :title="item.goodsname"
         :thumb="$preImg+item.img">
         <template #footer>
           <van-button  type='primary' icon='cart-o' size='mini' @click="add(item.id)">
           </van-button>
         </template> 
       </van-card>
       </van-tab>
       </van-tabs>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { getBanner,getGoods,addCart } from "../utils/request";
export default {
    data(){
        return {
            bannerList:[],//banner图
            active:0,
            goodsList:[{content:[]},{content:[]},{content:[]}]
        }
    },
    methods:{
      ...mapActions({
        'requestCartList':'cartListActions'
      }),
        requestBanner(){
            //在这里向后端发起请求
            getBanner().then(res=>{
              this.bannerList = res.data.list;
            })
        },
        requestGoodsList(){
          //商品列表请求
          getGoods().then(res=>{
           this.goodsList = res.data.list;
          })
        },

      add(id){
               var data = {
                 uid:this.user.uid,
                 num:1,
                 goodsid:id,
               }
        // 发起添加购物车请求,添加成功后，提示添加成功
        addCart(data).then(res=>{
          this.$toast.success(res.data.msg);
          // 更新购物车列表，之后我们发起更新购物车列表的请求
          this.requestCartList(this.user.uid);
        })
        }
    },
    computed:{
      ...mapGetters({
        'user':'user'
      })
    },
    // 当我们的页面挂载完成的时候
    mounted(){
      // 我们需要向后端去请求轮播图数据
      this.requestBanner();
      // 商品列表的请求
      this.requestGoodsList();
     }
    }
</script>

<style scpoed>
  .main{
      margin-bottom:50px;
  }
  .van-swipe img{
    width: 100%;
    height: 200px;
  }
</style>
<template>
  <div>
    <van-nav-bar   left-arrow title="分类"  @click-left="$router.go(-1)"/>
    <van-sidebar v-model="activeKey">
    <van-sidebar-item :title="item.catename" v-for="(item,index) in cateList" :key="item.id" @click="changeCate(index)"/>
      </van-sidebar>
     <van-grid :border="false" :column-num="3" class="main">
       <!-- 当我点击每一个商品的时候，应该跳转到对应的商品列表，在这里需要有个跳转的功能 -->
     <van-grid-item v-for='item in secondCate' :key='item.id' 
     :to='"/goodsList?fid="+item.id'>
     <van-image :src="$preImg+item.img" />
     <p>{{item.catename}}</p>
    </van-grid-item>
   </van-grid>
  </div>
</template>

<script>
import {  getCate} from "../utils/request";
export default {
   data() {
    return {
      cateList:[],
      secondCate:[],//二级菜单
      activeKey: 0,
    };
  },
  methods:{
    requestCateList(){
      getCate().then(res=>{
        this.cateList = res.data.list;
        //页面需要在我们不点击的时候，也要显示出来第一条信息，所以这个时候我们需要调用一下，changeCate这个方法
         this.changeCate(0);
      })
    },
    //获取二级菜单
    changeCate(index){
      this.secondCate = this.cateList[index].children;
    }
  },
  mounted(){
    this.requestCateList();
  }
}
</script>

<style scoped>
.main{
  position: absolute;
  right: 0;
  top:50px;
  margin-left: 80px;

}

</style>
<template>
  <div>
    <van-nav-bar  right-text="注册"  @click-right="$router.push('/register')" title="欢迎登录"/>
      <van-form @submit="onSubmit" class="onSubmit">
        <van-field
          v-model="user.phone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="user.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "../utils/request";
 import { mapActions} from "vuex";
export default {
  data(){
    return{
      user:{
        phone:'18822223333',
        password:'111'
      }
    }
  },
  methods:{
   
       onSubmit(){
          login(this.user).then(res=>{
            console.log(res);
             //（1）将用户信息存入vuex和sessionStorage中
             this.requestUser(res.data.list);
             // (2)我们向提示登录成功  
             this.$toast.success(res.data.msg);
             // （3）跳转页面
             this.$router.push('/mime')
          })
          
        },
         ...mapActions({
      'requestUser':'userActions'
    }),
    }
  }
</script>

<style>

</style>
import qs from 'qs';
import axios from 'axios';
const baseUrl = '/api';
import { Toast } from 'vant';

// 设置请求头
axios.interceptors.request.use(config=>{
    console.log('本次请求路径为：'+config.url);
    const user = JSON.parse(sessionStorage.getItem('user'))
    if(user){
      // 设置请求头
      config.headers.authorization = user.token;
    }
    return config;
})

// 设置响应路径的拦截；
axios.interceptors.response.use(res=>{
    console.log('本次响应路径'+res.config.url);
    if(res.data.code!==200){
        Toast.fail(res.data.msg);
        return;
    }
    console.log(res);
    return res
})

// 获取轮播图数据（首页）
export const getBanner = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/getbanner'
    })
}
// 获取商品信息(首页)
export const getGoods = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/getindexgoods'
    })
}
// 获取分类树形信息（分类页面）
export const getCate=()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/getcatetree'
    })
}
// 获取秒杀信息
export const getSeckill = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/getseckill'
    })
}

// 获取商品信息
export const getGoodsList = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/getgoods',
        params,
    })

}
// 注册信息
export const register = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/register',
        data:qs.stringify(data)
    })
}
// 会员登录
export const login = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/login',
        data:qs.stringify(data),
    })
}
// 购物车列表请求
export const getCart = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/cartlist',
        params
    })
}
// 添加购物车请求
export const addCart = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/cartadd',
        data:qs.stringify(data)
    })
}
// 删除购物车
export const delCart = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/cartdelete',
        data:qs.stringify(data)
    })
}

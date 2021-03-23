import { getCart} from "../utils/request";

export default{userActions(context,user){
      context.commit('changeUser',user)
  },
  cartListActions(context,uid){
    // 获取数据
    getCart({uid}).then(res=>{
      context.commit('changeCartList',res.data.list)
    })
  }
}
export const  state = {
    user:sessionStorage.getItem("user")?JSON.parse(sessionStorage.getItem('user')):null,
    cartList:[]
};
export const  mutations = {
    changeUser(state,user){
        state.user = user;
        // 在这里做个判断要是用户名不为空的话，同时将这个信息存入我们的本地存储，方便后期使用
        if(user){
            sessionStorage.setItem('user',JSON.stringify(user));
        }else{
            // 若是这个user是为空的话，则将移除
            sessionStorage.removeItem('user')
        }
    },
    // 购物车
    changeCartList(state,arr){
        state.cartList = arr;
    }
};
export const getters ={
    user(state){
        return state.user;
    },
    // 返回购物车列表
    
    cartList(state){
    return state.cartList
     },

    // 在这里将购物车额度总数得到；
    sumAcount (state){
        let sumAcount = 0;
        if(state.cartList !== null){
        // 在购物车有值之后遍历
        state.cartList.map(item=>{
            sumAcount += item.price*item.num;
         })
        }
        return sumAcount*100;
    },

    // 求购物车的总和
    total(state){
        let total = 0 ;
        if(state.cartList != null){
            // 当购物车不是空的时候，进行遍历
            state.cartList.map(item=>{
                total += item.num;
            })
        }
        // 之后将我们的总数返回即可；
        return total;
    }
}
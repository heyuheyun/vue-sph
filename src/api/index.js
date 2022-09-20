import axios from 'axios'
import store from '@/store'
import {getUUID} from '@/utils/uuid_token'

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token=store.state.userInfo.token;
    if(token){
        config.headers.token=token;
        return config;
    }
    else{
        let uuid_token=getUUID();
        if(uuid_token){
            config.headers.userTempId=uuid_token;
        }
        return config;
    }
  }, function (error) {
    // 对请求错误做些什么
    alert(error);
  });


export default {

    reTypeNav(){
        return axios.get('/api/product/getBaseCategoryList');
    },
    
    reBanner(){
        return axios.get('/mock/banner');
    },
    
    reFloors(){
        return axios.get('/mock/floors');
    },
    
    reProductList(params){
        return axios.post('/api/list',params)
    },
    
    reProductDetail(skuid){
        return axios.get(`/api/item/${skuid}`)
    },
    
    addToCart(skuid,skunum){
        return axios.post(`/api/cart/addToCart/${skuid}/${skunum}`)
    },
    
    reShopCart(){
        return axios.get('/api/cart/cartList')
    },

    checkCart(skuID,isChecked){
        return axios.get(`/api/cart/checkCart/${skuID}/${isChecked}`)
    },
    
    delShop(skuID){
        return axios.delete(`/api/cart/deleteCart/${skuID}`)
    },
    
    modifyNum(skuID,skuNum){
        return axios.post(`/api/cart/addToCart/${skuID}/${skuNum}`)
    },
    
    reCode(phone){
        return axios.get(`/api/user/passport/sendCode/${phone}`)
    },
    
    reRegister(params){
        return axios.post('/api/user/passport/register',params)
    },
    
    reLogin(params){
        return axios.post('/api/user/passport/login',params)
    },
    
    reUserInfo(){
        return axios.get("api/user/passport/auth/getUserInfo")
    },

    /* async judgeLogin(){
        //判断用户是否登录
        //失败的函数，返回的是promise
        let result=await axios.get("api/user/passport/auth/getUserInfo");
        if(result.data.code==200) return true;
        else return false;
    }, */
    /* judgeLogin(){
        //判断用户是否登录
        //失败的函数，返回的是Null
        let result=null;
        axios.get("api/user/passport/auth/getUserInfo").then(res=>{
            if(res.data.code==200) result=true;
            else result=false;
        })
        return result;
    }, */
    
    reLogout(){
        return axios.get("/api/user/passport/logout")
    },
    
    reTrade(){
        return axios.get("/api/order/auth/trade")
    },
    
    submitOrder(params,tradeNo){
        return axios.post(`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,params)
    },

    reOrderPay(orderId){
        return axios.get(`/api/payment/weixin/createNative/${orderId}`)
    },

    rePayResult(orderId){
        return axios.get(`/api/payment/weixin/queryPayStatus/${orderId}`)
    },

    reOrderList(page,limit){
        return axios.get(`/api/order/auth/${page}/${limit}`)
    },
}


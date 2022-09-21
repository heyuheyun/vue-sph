import store from '@/store'
import {getUUID} from '@/utils/uuid_token'
import axios from 'axios';

const request = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout: 5000,
});

request.interceptors.request.use(function (config) {
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
        return request.get('/api/product/getBaseCategoryList');
    },
    
    reBanner(){
        return request.get('/mock/banner');
    },
    
    reFloors(){
        return request.get('/mock/floors');
    },
    
    reProductList(params){
        return request.post('/api/list',params)
    },
    
    reProductDetail(skuid){
        return request.get(`/api/item/${skuid}`)
    },
    
    addToCart(skuid,skunum){
        return request.post(`/api/cart/addToCart/${skuid}/${skunum}`)
    },
    
    reShopCart(){
        return request.get('/api/cart/cartList')
    },

    checkCart(skuID,isChecked){
        return request.get(`/api/cart/checkCart/${skuID}/${isChecked}`)
    },
    
    delShop(skuID){
        return request.delete(`/api/cart/deleteCart/${skuID}`)
    },
    
    modifyNum(skuID,skuNum){
        return request.post(`/api/cart/addToCart/${skuID}/${skuNum}`)
    },
    
    reCode(phone){
        return request.get(`/api/user/passport/sendCode/${phone}`)
    },
    
    reRegister(params){
        return request.post('/api/user/passport/register',params)
    },
    
    reLogin(params){
        return request.post('/api/user/passport/login',params)
    },
    
    reUserInfo(){
        return request.get("api/user/passport/auth/getUserInfo")
    },
    
    reLogout(){
        return request.get("/api/user/passport/logout")
    },
    
    reTrade(){
        return request.get("/api/order/auth/trade")
    },
    
    submitOrder(params,tradeNo){
        return request.post(`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,params)
    },

    reOrderPay(orderId){
        return request.get(`/api/payment/weixin/createNative/${orderId}`)
    },

    rePayResult(orderId){
        return request.get(`/api/payment/weixin/queryPayStatus/${orderId}`)
    },

    reOrderList(page,limit){
        return request.get(`/api/order/auth/${page}/${limit}`)
    },
}


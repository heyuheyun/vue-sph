import Vue from "vue";
import VueRouter from "vue-router";
import Search from '@/pages/Search';
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import store from "@/store";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import api from "@/api";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder"

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        { 
            path:'/search',
            name:'search',
            component:Search,
            meta: { FooterShow: true },
        },

        {
            path:'/login',
            component:Login,
            beforeEnter: (to, from, next) => {
                api.reUserInfo().then((res)=>{
                    if(res.data.code==200) next("/home");
                    else next();
                }).catch(err=>{
                    next();
                })
            },
            meta: { FooterShow: false },
        },

        {
            path:'/home',
            component:Home,
            name:'home',
            meta: { FooterShow: true },
        },

        {
            path:'/register',
            component:Register,
            meta: { FooterShow: false },
        },

        {
            path:'/detail',
            component:Detail,
            meta: { FooterShow: true },
        },

        {
            path:'/addcartsuccess',
            component:AddCartSuccess,
            meta: { FooterShow: true },
        },

        {
            path:'/shopcart',
            component:ShopCart,
            meta: { FooterShow: true },
        },

        {
            path:'/trade',
            component:Trade,
            meta: { FooterShow: true },
            beforeEnter: (to, from, next) => {
                api.reUserInfo().then((res)=>{
                    if(res.data.code==200) next();
                    else next("/login");
                }).catch(err=>{
                    next("/login");
                })
            },
        },

        {
            path:'/pay',
            component:Pay,
            beforeEnter: (to, from, next) => {
                api.reUserInfo().then((res)=>{
                    if(res.data.code==200) next();
                    else next("/login");
                }).catch(err=>{
                    next("/login");
                })
            },
            meta: { FooterShow: true },
        },

        {
            path:'/paysuccess',
            component:PaySuccess,
            beforeEnter: (to, from, next) => {
                api.reUserInfo().then((res)=>{
                    if(res.data.code==200) next();
                    else next("/login");
                }).catch(err=>{
                    next("/login");
                })
            },
            meta: { FooterShow: true },
        },

        {
            path:'/center',
            component:Center,
            children: [
                {
                    path: 'myorder',
                    component: MyOrder
                },
                {
                    path: 'grouporder',
                    component: GroupOrder
                },
                {
                    path:'/center',
                    redirect:'/center/myorder',
                },
            ],
            beforeEnter: (to, from, next) => {
                api.reUserInfo().then((res)=>{
                    if(res.data.code==200) next();
                    else next("/login");
                }).catch(err=>{
                    next("/login");
                })
            },
            meta: { FooterShow: true },
        },

        {
            path:'/',
            redirect:'/home',
        },
    ]
})

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (to) {
	return VueRouterPush.call(this, to).catch(err => err);
};
import Vue from "vue";
import Vuex from "vuex";
import api from "@/api";

Vue.use(Vuex);

const home = {
    namespaced: true,
    mutations: {
        async getnav(state) {
            let result = await api.reTypeNav();
            if (200 <= result.status <= 304) state.nav_data = result.data.data;
        },

        async getbanner(state) {
            let result = await api.reBanner();
            if (200 <= result.status <= 304) {
                state.banner_data = result.data.data;
                state.banner_data_ok = true;
            }
        },

        async getfloors(state) {
            let result = await api.reFloors();
            if (200 <= result.status <= 304) {
                state.floors_data = result.data.data;
                state.floors_data_ok = true;
            }
        },
    },
    state: {
        nav_data: {},
        banner_data: [],
        banner_data_ok: false,
        floors_data: [],
        floors_data_ok: false,
    },
};

const search = {
    namespaced: true,
    mutations: {
        async getProductList(state, params_ = {}) {
            let params = { ...params_ };
            for (let key in params) {
                if (params[key] == "" || params[key] == undefined) delete params[key];
            }
            const result = await api.reProductList(params);
            if (200 <= result.status <= 304) {
                state.product_list = result.data.data;
                state.product_list_ok = true;
            }
        },
    },
    state: {
        product_list: {},
        product_list_ok: false,
    },
};

const detail = {
    namespaced: true,
    mutations: {
        async reProductDetail(state, skuid) {
            const result = await api.reProductDetail(skuid);
            if (200 <= result.status <= 304) {
                state.product_detail = result.data.data;
                state.product_detail_ok = true;
            }
        },

        updata_img(state, imgpage) {
            state.imgpage = imgpage;
        },
    },
    state: {
        product_detail: {},
        product_detail_ok: false,

        imgpage: 0,
    },
};

const shopcart = {
    //namespaced:true,
    mutations: {
        async reShopCart(state) {
            const result = await api.reShopCart();
            if (200 <= result.status <= 304) {
                state.shop_cart = result.data.data;
                state.shop_cart_ok = true;
            }
        },
    },
    state: {
        shop_cart: {},
        shop_cart_ok: false,
    },
    getters: {
        shopCartList(state) {
            return state.shop_cart[0].cartInfoList;
        },
    },
};

const userInfo = {
    namespaced: true,
    actions: {
        async login(context, params) {
            let result = await api.reLogin(params);
            if (result.status == 200) {
                if (result.data.code == 200) {
                    context.commit("set_token", result.data.data.token);
                    return {
                        ok: true,
                        message: "????????????",
                    };
                } else
                    return {
                        ok: false,
                        message: result.data.message,
                    };
            } else
                return {
                    ok: false,
                    message: "????????????",
                };
        },
    },
    mutations: {
        set_token(state, token) {
            localStorage.setItem("USERTOKEN", token);
            state.token = token;
        },
        /* judge_login(){
            //??????.then??????????????????promise?????????return?????????????????????promise???result???
            //judge_login??????????????????????????????.then?????????promise??????????????????????????????????????????undefine
            api.reUserInfo().then(res=>{
                if(res.data.code==200) return true;
                else return false;
            })
        }, */
        get_userdata(state) {
            api.reUserInfo()
                .then(res => {
                    if (res.data.code == 200) {
                        state.userdata = res.data.data;
                    } else {
                        state.userdata = null;
                        localStorage.removeItem("USERTOKEN");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        logout(state) {
            api.reLogout()
                .then(res => {
                    //?????????????????????????????????token??????
                    state.token = null;
                    state.userdata = null;
                    localStorage.removeItem("USERTOKEN");
                })
                .catch(err => {
                });
        },
    },
    state: {
        token: localStorage.getItem("USERTOKEN"),
        userdata: null,
    },
};

const trade = {
    namespaced: true,
    mutations: {
        async retrade(state) {
            let result = await api.reTrade();
            if (result.data.code == 200) {
                state.tradedata = result.data.data;
                state.tradedata_ok = true;
            }
        },
    },
    state: {
        tradedata: null,
        tradedata_ok: false,
        consign: [
            {
                consignee: "??????",
                deliveryAddress: "??????????????????????????????????????????6???",
                consigneeTel: "15010658793",
                addressDefult: true,
            },
            {
                consignee: "??????",
                deliveryAddress: "??????????????????????????????????????????6???",
                consigneeTel: "13590909098",
                addressDefult: false,
            },
            {
                consignee: "??????",
                deliveryAddress: "??????????????????????????????????????????6???",
                consigneeTel: "18012340987",
                addressDefult: false,
            },
        ],
    },
};

const center = {
    namespaced: true,
    mutations: {
        async recenter(state, payload) {
            let result = await api.reOrderList(payload.page, payload.limit);
            if (result.data.code == 200) {
                state.centerdata = result.data.data;
            }
        },
    },
    state: {
        centerdata: null,
    },
};

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        userInfo,
        trade,
        center,
    },
});

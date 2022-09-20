<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>

            <!-- 购物车列表 -->
            <div class="cart-body" v-if="$store.state.shopcart.shop_cart_ok">
                <ul class="cart-list" v-for="(goods, index) in $store.getters.shopCartList">
                    <!-- 选框 -->
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list" id="" value="" :checked="goods.isChecked == 1" @click="check_state(index, $event)" />
                    </li>
                    <!-- 商品图片 -->
                    <li class="cart-list-con2">
                        <img :src="goods.imgUrl" />
                        <div class="item-msg">{{ goods.skuName }}</div>
                    </li>
                    <!-- 删除按钮 -->
                    <li class="cart-list-con7">
                        <a class="sindelet" @click="del_shop(index)">删除</a>
                        <br />
                    </li>
                    <!-- 总金额 -->
                    <li class="cart-list-con6">
                        <span class="sum">{{ goods.skuPrice * goods.skuNum }}</span>
                    </li>
                    <!-- 数量增减 -->
                    <li class="cart-list-con5">
                        <a class="mins" @click="modify_num(index, -1)">-</a>
                        <input autocomplete="off" type="text" :value="goods.skuNum" minnum="1" class="itxt" @blur="modify_num_byinput(index, $event)" />
                        <a class="plus" @click="modify_num(index, 1)">+</a>
                    </li>
                    <!-- 单价 -->
                    <li class="cart-list-con4">
                        <span class="price">{{ goods.skuPrice }}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 底部选项 -->
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" checked="false" @click="all_check" />
                <span>全选</span>
            </div>
            <div class="option">
                <a @click="del_check_shop">删除选中的商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择 <span>0</span>件商品</div>
                <div class="sumprice" v-if="$store.state.shopcart.shop_cart_ok">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{ total_price }}</i>
                </div>
                <div class="sumbtn">
                    <a class="sum-btn" @click="into_trade">结算</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ShopCart",
    methods: {
        //选择或取消商品
        check_state(i, event) {
            let isChecked = event.target.checked ? "1" : "0";
            this.$api.checkCart(this.$store.getters.shopCartList[i].skuId, isChecked)
                .then(res => {
                    if (200 <= res.status <= 304) {
                        this.$store.commit("reShopCart");
                    } else alert("失败");
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //全选
        all_check(event) {
            let isCheckAll = event.target.checked;
            let shopCartList = this.$store.getters.shopCartList;
            let promiselist = [];
            if (isCheckAll) {
                shopCartList.forEach(element => {
                    //选择每一个商品
                    if (!element.isChecked) {
                        let promise = this.$api.checkCart(element.skuId, "1");
                        promiselist.push(promise);
                    }
                });
                if (promiselist) {
                    Promise.all(promiselist)
                        .then(res => {
                            if (200 <= res.status <= 304) {
                                this.$store.commit("reShopCart");
                            } else alert("失败");
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            } else {
                //全不选
                shopCartList.forEach(element => {
                    if (element.isChecked) {
                        let promise = this.$api.checkCart(element.skuId, "0");
                        promiselist.push(promise);
                    }
                });
                if (promiselist) {
                    Promise.all(promiselist)
                        .then(res => {
                            if (200 <= res.status <= 304) {
                                this.$store.commit("reShopCart");
                            } else alert("失败");
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
        },

        //删除商品
        del_shop(i) {
            this.$api.delShop(this.$store.getters.shopCartList[i].skuId)
                .then(res => {
                    if (200 <= res.status <= 304) {
                        this.$store.commit("reShopCart");
                    } else alert("失败");
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //删除全部所选商品
        del_check_shop() {
            let shopCartList = this.$store.getters.shopCartList;
            let promiselist = [];
            shopCartList.forEach(element => {
                if (element.isChecked) {
                    let promise = this.$api.delShop(element.skuId);
                    promiselist.push(promise);
                }
            });
            if (promiselist) {
                Promise.all(promiselist)
                    .then(res => {
                        if (200 <= res.status <= 304) {
                            this.$store.commit("reShopCart");
                        } else alert("失败");
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },

        //修改商品数量
        modify_num(i, num) {
            if (this.$store.getters.shopCartList[i].skuNum > 0 || num > 0) {
                this.$api.modifyNum(this.$store.getters.shopCartList[i].skuId, num)
                    .then(res => {
                        if (200 <= res.status <= 304) {
                            this.$store.commit("reShopCart");
                        } else alert("失败");
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },

        //通过输入修改商品数量
        modify_num_byinput(i, event) {
            let value = Number(event.target.value);
            if (value < 0 || value == NaN) {
                //为什么无法获取焦点？
                //event.target.focus();
                //几个月后，发现当初因为使用target而无法获得焦点
                event.currentTarget.focus();
            } else {
                let num = value - this.$store.getters.shopCartList[i].skuNum;
                if (num == 0) return;
                else this.modify_num(i, num);
            }
        },

        //结算
        into_trade() {
            this.$router.push("trade");
        },
    },
    computed: {
        //计算总价
        total_price: function () {
            let price = 0;
            if (this.$store.getters.shopCartList) {
                for (let goods of this.$store.getters.shopCartList) {
                    price = price + (goods.skuNum * goods.skuPrice*goods.isChecked);
                }
            }
            return price;
        },
    },
    created() {
        this.$store.commit("reShopCart");
    },
};
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            & > div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                & > li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 4.1667%;

                    input{
                        cursor: pointer;
                    }
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 250px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                .cart-list-con3 {
                    width: 20.8333%;

                    .item-txt {
                        text-align: center;
                    }
                }

                .cart-list-con4 {
                    width: 12.5%;
                    float: right;
                }

                .cart-list-con5 {
                    width: 12.5%;
                    float: right;

                    a{
                        cursor: pointer;
                    }

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }

                .cart-list-con6 {
                    width: 12.5%;
                    float: right;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 12.5%;
                    float: right;

                    a {
                        color: #666;
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
                cursor: pointer;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>

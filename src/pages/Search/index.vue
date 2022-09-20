<template>
    <div>
        <TypeNav :navshow="false" />
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a>全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <li class="with-x" v-if="$route.query.categoryName">
                            {{ search_params.categoryName }}
                            <i @click="del_categoryName">x</i>
                        </li>
                        <li class="with-x" v-if="$route.query.keyword">
                            {{ search_params.keyword }}
                            <i @click="del_keyword">x</i>
                        </li>
                        <li class="with-x" v-if="search_params.trademark">
                            {{ search_params.trademark.split(":")[1] }}
                            <i @click="del_trademark">x</i>
                        </li>
                        <li class="with-x" v-for="(attr, index) in search_params.props" :key="index">
                            {{ attr.split(":")[1] }}
                            <i @click="del_prop(index)">x</i>
                        </li>
                    </ul>
                </div>

                <!--selector-->
                <SearchSelector :getProductList="getProductList" />

                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li :class="{ active: search_params.order.indexOf('1') != -1 }" @click="change_order(1)">
                                    <a>综合
                                        <i class="iconfont" v-show="search_params.order.indexOf('1') != -1" :class="icon_name"></i>
                                    </a>
                                </li>
                                <li :class="{ active: search_params.order.indexOf('2') != -1 }" @click="change_order(2)">
                                    <a>价格
                                        <i class="iconfont" v-show="search_params.order.indexOf('2') != -1" :class="icon_name"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 商品 -->
                    <div class="goods-list">
                        <ul class="yui3-g" v-if="$store.state.search.product_list_ok">
                            <li class="yui3-u-1-5" v-for="(product, index) in $store.state.search.product_list.goodsList" :key="index">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <a @click="goto_detail(product.id)"><img :src="product.defaultImg" /></a>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i> {{ product.price }}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a @click="goto_detail(product.id)" :title="product.title">{{ product.title }}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="fr page">
                        <Pagination v-show="$store.state.search.product_list.totalPages>1"
                            :current_page="$store.state.search.product_list.pageNo"
                            :totel_page="$store.state.search.product_list.totalPages"
                            :continues="5"
                            :change_page="change_page"
                        >
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import Pagination from "@/components/pagination.vue";

export default {
    name: "Search",
    data() {
        return {
            search_params: {
                category1Id: "",
                category2Id: "",
                category3Id: "",
                categoryName: "",
                keyword: "",
                order: "1:desc",
                pageNo: 1,
                pageSize: 10,
                props: [],
                trademark: "",
            },
        };
    },
    methods: {
        //获取数据
        getProductList() {
            Object.assign(this.search_params, this.$route.query);
            //回头看不推荐通过仓库获取数据
            this.$store.commit("search/getProductList", this.search_params);
            this.search_params.category1Id = "";
            this.search_params.category2Id = "";
            this.search_params.category3Id = "";
        },

        //解决vue无法深度监听到路由的query变化而无法跳转的问题
        copyQuery(){
            let query = {};
            for (let key in this.$route.query) {
                query[key] = this.$route.query[key];
            }
            return query;
        },
        
        //删除分类
        del_categoryName() {
            this.search_params.categoryName = "";
            let query = this.copyQuery();
            delete query["categoryName"];
            this.$router.push({
                name: "search",
                query,
            });
        },
        //删除关键词
        del_keyword() {
            this.search_params.keyword = "";
            let query = this.copyQuery();
            delete query["keyword"];
            this.$router.push({
                name: "search",
                query,
            });
        },
        //删除商标
        del_trademark() {
            this.search_params.trademark = "";
            let query = this.copyQuery();
            delete query["trademark"];
            this.$router.push({
                name: "search",
                query,
            });
        },
        //删除商品属性
        del_prop(index) {
            this.search_params.props.splice(index, 1);
            let query = this.copyQuery();
            query.props.splice(index, 1);
            if (query.void == "") delete query["void"];
            else query.void = "";
            this.$router.push({
                name: "search",
                query,
            });
        },

        //改变排序
        change_order(number) {
            if (number == 1) {
                if (this.search_params.order.indexOf("desc") != -1) this.search_params.order = "1:asc";
                else this.search_params.order = "1:desc";
            }
            if (number == 2) {
                if (this.search_params.order.indexOf("desc") != -1) this.search_params.order = "2:asc";
                else this.search_params.order = "2:desc";
            }
            this.getProductList();
        },

        change_page(pagei) {
            this.search_params.pageNo = pagei;
            this.getProductList();
        },

        //进入商品详情
        goto_detail(id) {
            this.$router.push({
                path: "/detail",
                query: { skuid: id },
            });
        },
    },

    computed: {
        //排序方式的图标
        icon_name() {
            if (this.search_params.order.indexOf("desc") != -1) return "icon-todown";
            else return "icon-up";
        },
    },

    watch: {
        "$route.query": {
            //deep:true,
            handler() {
                this.getProductList();
            },
        },
    },
    components: {
        SearchSelector,
        Pagination,
    },
    created() {
        this.getProductList();
    },
};
</script>

<style lang="less" scoped>
.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }

        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;
                                cursor:pointer;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .page {
                width: 733px;
                height: 66px;
                overflow: hidden;
                float: right;
            }
        }
    }
}
</style>

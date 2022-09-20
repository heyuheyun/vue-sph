<template>
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="$store.state.userInfo.userdata">
                        <a>{{ $store.state.userInfo.userdata.name }}</a>
                        <a class="register" @click="logout">退出登录</a>
                    </p>
                    <p v-else>
                        <span>请</span>
                        <a @click="intoLogin">登录</a>
                        <a class="register" @click="intoRegister">免费注册</a>
                    </p>
                </div>
                <div class="typeList">
                    <a @click="into_center">我的订单</a>
                    <a @click="into_shopcart">我的购物车</a>
                    <a>我的尚品汇</a>
                    <a>尚品汇会员</a>
                    <a>企业采购</a>
                    <a>关注尚品汇</a>
                    <a>合作招商</a>
                    <a>商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <a class="logo" title="尚品汇" @click="intoHome">
                    <img src="./images/logo.png" alt="logo" />
                </a>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" ref="search_input" @keydown.enter="intoSearch" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="intoSearch"> 搜索 </button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    methods: {
        intoSearch() {
            let keyword = this.$refs.search_input.value;
            if (this.$route.path != "/search") {
                this.$router.push({
                    path: "/search",
                    query: { keyword },
                });
            } else {
                //解决vue无法深度监听到路由的query变化而无法跳转的问题
                let query = {};
                for (let key in this.$route.query) {
                    query[key] = this.$route.query[key];
                }
                query.keyword = keyword;
                this.$router.push({
                    path: "/search",
                    query,
                });
            }
        },
        intoLogin() {
            this.$router.push("login");
        },
        intoRegister() {
            this.$router.push("register");
        },
        intoHome() {
            this.$router.push({name:"home"});
        },
        logout() {
            this.$store.commit("userInfo/logout");
        },
        into_shopcart() {
            this.$router.push("shopcart");
        },
        into_center() {
            this.$router.push("center");
        },
    },
};
</script>

<style lang="less" scoped>
.header {
    & > .top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                a {
                    cursor:pointer;
                }

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;
                    cursor: pointer;

                    & + a {
                        border-left: 1px solid #b3aeae;
                    }
                }
            }
        }
    }

    & > .bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    cursor: pointer;
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>

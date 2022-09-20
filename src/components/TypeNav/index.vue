<template>
    <div class="type-nav">
        <div class="container" @mouseleave="nav_hidden">
            <h2 class="all" @mouseenter="nav_show">全部商品分类</h2>
            <nav class="nav">
                <a>服装城</a>
                <a>美妆馆</a>
                <a>尚品汇超市</a>
                <a>全球购</a>
                <a>闪购</a>
                <a>团购</a>
                <a>有趣</a>
                <a>秒杀</a>
            </nav>
            <div class="sort" v-show="navshow_">
                <div class="all-sort-list2" @click="intoSearch">
                    <!-- 三级分类 -->
                    <div class="item" v-for="(nav1, index) in $store.state.home.nav_data" :key="nav1.categoryId" v-if="index < 15">
                        <h3>
                            <a :data-category1Id="nav1.categoryId" :data-categoryName="nav1.categoryName">{{ nav1.categoryName }}</a>
                        </h3>
                        <div class="item-list clearfix">
                            <div class="subitem">
                                <dl class="fore" v-for="nav2 in nav1.categoryChild" :key="nav2.categoryId">
                                    <dt>
                                        <a :data-category2Id="nav2.categoryId" :data-categoryName="nav2.categoryName">{{ nav2.categoryName }}</a>
                                    </dt>
                                    <dd>
                                        <em v-for="nav3 in nav2.categoryChild" :key="nav3.categoryId">
                                            <a :data-category3Id="nav3.categoryId" :data-categoryName="nav3.categoryName">{{ nav3.categoryName }}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navshow_: this.navshow,
        };
    },
    methods: {
        intoSearch(event) {
            //HTMLElement 接口的只读属性 dataset 提供了对元素上自定义数据属性（data-*）读/写访问。它暴露了一个字符串映射（DOMStringMap），其中包含每个 data-* 属性条目。
            let { categoryname, category1id, category2id, category3id } = event.target.dataset;
            //判断点击的是否为三级分类元素
            if (categoryname) {
                let query = { categoryName: categoryname };
                if (category1id) query.category1Id = category1id;
                if (category2id) query.category2Id = category2id;
                if (category3id) query.category3Id = category3id;
                this.$router.push({
                    path: "/search",
                    query,
                });
            }
        },
        nav_show() {
            if (!this.navshow) {
                this.navshow_ = true;
            }
        },
        nav_hidden() {
            if (!this.navshow) {
                this.navshow_ = false;
            }
        },
    },
    props: {
        navshow: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                            cursor: pointer;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;

                                    a {
                                        cursor: pointer;
                                    }
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;

                                        a {
                                            cursor: pointer;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }
                .item:hover {
                    background-color: rgb(212, 212, 212);
                }
            }
        }
    }
}
</style>

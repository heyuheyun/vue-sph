<template>
    <div class="clearfix selector">
        <!-- 品牌 -->
        <div class="type-wrap logo">
            <div class="fl key brand">品牌</div>
            <div class="value logos">
                <ul class="logo-list">
                    <li v-for="(trademark, index) in $store.state.search.product_list.trademarkList" :key="index" @click="sel_trademark(trademark)">
                        {{ trademark.tmName }}
                    </li>
                </ul>
            </div>
            <div class="ext">
                <a class="sui-btn">多选</a>
                <a class="sui-btn">更多</a>
            </div>
        </div>
        <!-- 商品属性 -->
        <div class="type-wrap" v-for="(attrs, index) in $store.state.search.product_list.attrsList" :key="index">
            <div class="fl key">{{ attrs.attrName }}</div>
            <div class="fl value">
                <ul class="type-list">
                    <li v-for="(attrs_value, index) in attrs.attrValueList" :key="index">
                        <a @click="sel_attr(attrs, attrs_value)">{{ attrs_value }}</a>
                    </li>
                </ul>
            </div>
            <div class="fl ext"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SearchSelector",
    props: ["getProductList"],
    methods: {
        //选择品牌
        //隔几个月回过头来看这种数据获取方式很傻，不过作为第一个练习的项目也懒得优化了
        sel_trademark(trademark) {
            let trademark_ = `${trademark.tmId}:${trademark.tmName}`;
            let query = {};
            
            for (let key in this.$route.query) {
                query[key] = this.$route.query[key];
            }
            query.trademark = trademark_;
            this.$router.push({
                name: "search",
                query,
            });
        },
        //选择商品属性
        sel_attr(attrs, attrs_value) {
            let prop = `${attrs.attrId}:${attrs_value}:${attrs.attrName}`;
            let query = {};
            for (let key in this.$route.query) {
                query[key] = this.$route.query[key];
            }
            let props = query.props || [];
            if (props.indexOf(prop) == -1) props.push(prop);
            query.props = props;
            if (query.void == "") delete query["void"];
            else query.void = "";
            this.$router.push({
                name: "search",
                query,
            });
        },
    },
};
</script>

<style lang="less" scoped>
.selector {
    border: 1px solid #ddd;
    margin-bottom: 5px;
    overflow: hidden;

    .logo {
        border-top: 0;
        margin: 0;
        position: relative;
        overflow: hidden;

        .key {
            padding-bottom: 87px !important;
        }
    }

    .type-wrap {
        margin: 0;
        position: relative;
        border-top: 1px solid #ddd;
        overflow: hidden;

        .key {
            width: 100px;
            background: #f1f1f1;
            line-height: 26px;
            text-align: right;
            padding: 10px 10px 0 15px;
            float: left;
        }

        .value {
            overflow: hidden;
            padding: 10px 0 0 15px;
            color: #333;
            margin-left: 120px;
            padding-right: 90px;

            .logo-list {
                li {
                    float: left;
                    border: 1px solid #e4e4e4;
                    margin: -1px -1px 0 0;
                    width: 105px;
                    height: 52px;
                    text-align: center;
                    line-height: 52px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 700;
                    color: #e1251b;
                    font-style: italic;
                    font-size: 14px;
                    cursor: pointer;

                    img {
                        max-width: 100%;
                        vertical-align: middle;
                    }
                }
            }

            .type-list {
                li {
                    float: left;
                    display: block;
                    margin-right: 30px;
                    line-height: 26px;
                    cursor:pointer;

                    a {
                        text-decoration: none;
                        color: #666;
                    }
                }
            }
        }

        .ext {
            position: absolute;
            top: 10px;
            right: 10px;

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
                padding: 0 10px;
                background: #fff;
                border: 1px solid #d5d5d5;
            }

            a {
                color: #666;
            }
        }
    }
}
</style>

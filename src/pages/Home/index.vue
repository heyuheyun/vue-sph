<template>
    <div>
        <!-- 菜单导航 -->
        <TypeNav :navshow="true"></TypeNav>
        <!-- 主轮播图右侧菜单 -->
        <ListContainer></ListContainer>
        <!-- 商品推荐 -->
        <Recommend></Recommend>
        <!-- 热卖排行 -->
        <Rank></Rank>
        <!-- 猜你喜欢 -->
        <Like></Like>
        <!-- 分类内容聚合 -->
        <div v-if="$store.state.home.floors_data_ok">
            <Floor v-for="floor_data in $store.state.home.floors_data" :key="floor_data.id" :floor_data="floor_data"></Floor>
        </div>
        <Brand></Brand>
    </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Brand from "./Brand";
import Floor from "./Floor";
import Like from "./Like";
import Rank from "./Rank";
import Recommend from "./Recommend";

export default {
    components: {
        ListContainer,
        Brand,
        Floor,
        Like,
        Rank,
        Recommend,
    },
};
</script>

<style></style>

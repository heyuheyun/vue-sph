<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(skuimg, index) in $store.state.detail.product_detail.skuInfo.skuImageList" @click="change_img(index)">
                <img :src="skuimg.imgUrl" :class="{ active: $store.state.detail.imgpage == index }" />
            </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
</template>

<script>
import Carousel from "@/components/Carousel";

export default {
    name: "ImageList",
    methods: {
        change_img(imgpage) {
            this.$store.commit("detail/updata_img", imgpage);
        },
    },
    components: {
        Carousel,
    },
};
</script>

<style lang="less" scoped>
.swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
        width: 56px;
        height: 56px;
        display: inline-block;
        margin-right: 10px;

        img {
            width: 100%;
            height: 100%;
            border: 1px solid #ccc;
            padding: 2px;
            width: 50px;
            height: 50px;
            display: block;

            &.active {
                border: 2px solid #f60;
                padding: 1px;
            }

            &:hover {
                border: 2px solid #f60;
                padding: 1px;
            }
        }
    }

    .swiper-button-next {
        left: auto;
        right: 0;
    }

    .swiper-button-prev {
        left: 0;
        right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
        box-sizing: border-box;
        width: 12px;
        height: 56px;
        background: rgb(235, 235, 235);
        border: 1px solid rgb(204, 204, 204);
        top: 0;
        margin-top: 0;
        &::after {
            font-size: 12px;
        }
    }
}
</style>

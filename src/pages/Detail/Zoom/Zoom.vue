<template>
    <div class="spec-preview">
        <img :src="$store.state.detail.product_detail.skuInfo.skuImageList[$store.state.detail.imgpage].imgUrl" />
        <div class="event" @mousemove="img_zoom"></div>
        <div class="big">
            <img :src="$store.state.detail.product_detail.skuInfo.skuImageList[$store.state.detail.imgpage].imgUrl" ref="bigimg" />
        </div>
        <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
export default {
    name: "Zoom",
    methods: {
        img_zoom(event) {
            this.$refs.mask.style.left = event.offsetX - 100 + "px";
            this.$refs.mask.style.top = event.offsetY - 100 + "px";
            if (this.$refs.mask.offsetLeft < 0) this.$refs.mask.style.left = 0 + "px";
            if (this.$refs.mask.offsetLeft > 200) this.$refs.mask.style.left = 200 + "px";
            if (this.$refs.mask.offsetTop < 0) this.$refs.mask.style.top = 0 + "px";
            if (this.$refs.mask.offsetTop > 200) this.$refs.mask.style.top = 200 + "px";
            this.$refs.bigimg.style.left = -this.$refs.mask.offsetLeft * 2 + "px";
            this.$refs.bigimg.style.top = -this.$refs.mask.offsetTop * 2 + "px";
        },
    },
};
</script>

<style lang="less">
.spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
        width: 100%;
        height: 100%;
    }

    .event {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
    }

    .mask {
        width: 50%;
        height: 50%;
        background-color: rgba(0, 255, 0, 0.3);
        position: absolute;
        left: 0;
        top: 0;
        display: none;
    }

    .big {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -1px;
        left: 100%;
        border: 1px solid #aaa;
        overflow: hidden;
        z-index: 998;
        display: none;
        background: white;

        img {
            width: 200%;
            max-width: 200%;
            height: 200%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    .event:hover ~ .mask,
    .event:hover ~ .big {
        display: block;
    }
}
</style>

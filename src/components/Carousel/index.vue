<template>
  <div class="imgcontainer">
            <transition :name="cutmodel">
            <img class="swiper" :key="imglist[i].id" :src="imglist[i].url">
            </transition>

            <div class="lbt" @click="lcut">&lt;</div>
            <div class="rbt" @click="rcut">&gt;</div>

            <div class="bottom_nav" ref="bottom_nav">
                <button v-for="n in maxindex+1" :style='s_navbt(n-1)' @click="change_img(n-1)" :key="n"></button>
            </div>
        </div>
</template>

<script>
export default {
    data(){
        return{
            id:0,
            i:0,
            maxindex:2,
            cutmodel:'rightcut',
            imglist:[],
        }
    },
    methods:{
        lcut(){
            this.cutmodel='leftcut';
            this.i-=1;
            if(this.i<0) this.i=this.maxindex;
        },
        rcut(){
            this.cutmodel='rightcut';
            this.i+=1;
            if(this.i>this.maxindex) this.i=0;
        },

        s_navbt(i){
            if(i==this.i) return "background-color:blue";
            else return "background-color:rgb(200, 200, 200)";
        },
        change_img(i){
            if(i>this.i) this.cutmodel='rightcut';
            else this.cutmodel='leftcut';
            this.i=i;
        }
    },
    props:{
        imgUrls:Array
    },
    created:function(){
        this.maxindex=this.imgUrls.length-1;
        for(let n=0;n<=this.maxindex;n++){
            let temp={
                url:this.imgUrls[n],
                id:this.id++
            };
            this.imglist.push(temp);
        }
    }
}
</script>

<style scoped>
    *{
        box-sizing: border-box;
    }
    .imgcontainer{
        width:100%;
        height:100%;
        position: relative;
        overflow: hidden;
    }
    .swiper{
        position: absolute;
        top:50%;
        left:0%;
        transform: translateY(-50%);
        transition: all .5s linear;
    }
    .lbt,.rbt{
        padding:18px 6px;
        font-size:24px;
        font-weight:bolder;
        color:black;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        cursor: pointer;
        opacity: 0.4;
    }
    .lbt{
        left:0%;
    }
    .rbt{
        right: 0%;
    }
    .lbt:hover,.rbt:hover{
        background-color: rgb(199, 199, 199);
    }
    .bottom_nav{
        position: absolute;
        display: inline-block;
        bottom:0%;
        left: 50%;
        transform: translate(-50%);
    }
    .bottom_nav button{
        margin:5px;
        opacity:0.5;
        width: 15px;
        height:15px;
        border:none;
        border-radius: 50%;
        cursor: pointer;
    }

    .rightcut-enter,.leftcut-leave-to{
        left:100%;
    }
    .rightcut-leave-to,.leftcut-enter{
        left:-100%;
    }
</style>
<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="this.$route.meta.FooterShow"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'


export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  created:function(){
    this.$store.commit('home/getnav');
    this.$store.commit('home/getbanner');
    this.$store.commit('home/getfloors');
    this.$store.commit('userInfo/get_userdata');
  }
}
</script>

<style>

</style>

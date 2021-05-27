<template>
    <div class="send_content">
        <van-nav-bar class="_title" v-if="title" :title="title" left-arrow @click-left="out" />
        <div :class="title ? '_content' : '_contentFull' ">
            <transition name="fade">
                <router-view :key="key"/>
            </transition>
        </div>
    </div>
</template>
<script>
import { NavBar , Tabbar , TabbarItem } from 'vant';
export default {
        components:{
          'van-nav-bar':NavBar,
          'van-tabbar':Tabbar,
          'van-tabbar-item':TabbarItem
        },
        name:"send_conetnt",
        data(){
            return{

            }
        },
        mounted(){
            console.log(this.$route)
        },
        computed:{
            key(){
               return this.$route.path
            },
            title(){
               return this.$route.meta.title
            },
        },
        methods:{
            out(){
                this.$router.go(-1)
            }
        }
    }
</script>
<style lang="scss" scoped >
    .send_content{
        height: 100%;
        background: #f1f1f1;
        ._contentFull{
            height: 100%;
            position: relative;
        }
        ._content{
            height: calc(100vh - 46px);
            position: relative;
            overflow-y:scroll;
        }
        ._passFooter{
            height: calc(100vh - 96px);
            position: relative;
            overflow-y:scroll;
        }
    }
</style>

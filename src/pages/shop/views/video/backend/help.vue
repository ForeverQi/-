<!--
 * @Author       : qwguo
 * @description  : description
 * @Date         : 2020-02-18 20:11:14
 * @LastEditors  : qwguo
 * @LastEditTime : 2020-07-06 15:25:54
 * @FilePath     : \ev-frontend-test\src\pages\shop\views\video\backend\help.vue
 -->
<template>
    <div class="page-wrap help-video-page">
        <!-- 页面内容 -->
        <div class="page-layout help-video-wrap">
            <!-- 页面顶部 -->
            <PageHead :title="'短视频说明'" />
            <!-- 页面内容 -->
            <div class="page-body">
                <div class="help-content" v-html="helpCon"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    Setting
} from "@/api/shop/video.bac";
import PageHead from "./components/PageHead";
export default {
    data(){
        return{
            helpCon: null
        }
    },
    created(){
        let that = this;
        that.getHelp();
        that.$util.app.Shop.Refresh(false, 0);
    },
    beforeDestroy(){
        this.$util.app.Shop.Refresh(true, 0);
    },
    methods:{
        backPage(){
            this.$util.functions.GoBack();
        },
        getHelp(){
            let that = this;
            Setting().then(res=>{
                that.helpCon = res.help;
            })
        }
    },
    components:{
        PageHead
    }
}
</script>

<style lang="scss">
@import "./css/videoPublic";
.help-video-page{
    &.animated{
        position: absolute;
        left: 0;
        bottom: 0;
        animation-duration: .3s;
        z-index: 5;
    }
    .help-content{
        margin: .5rem .3rem;
        img{
            max-width: 100%;
        }
    }
}
</style>

<!--
 * @Author: fengting
 * @Date: 2020-11-11 17:55:13
 * @LastEditTime: 2020-11-12 11:29:14
 * @LastEditors: Please set LastEditors
 * @Description: 海报物料
 * @FilePath: \vue_test_qian\src\pages\distribution\views\PosterList.vue
-->
<template>
    <!-- PosterList-center -->
    <div class="PosterList-home">
        <section class="wrapper-c">
            <div class="bg-div">
                <p></p>
            </div>
            <article class="max-center"> 
                <!-- 头部开始 -->
                <slot-publicHead :linkreturn="linkreturn">
                    <div slot="headTit">海报物料</div>
                </slot-publicHead>
                <!-- 头部结束 -->
                <div class="PosterList-content">
                    <ul class="PosterList-ul">
                        <li @click="PosterAlert">
                            <span></span>
                            <p>上次使用</p>
                        </li>
                        <li>
                            <span></span>
                            <p>上次使用</p>
                        </li>
                        <li>
                            <span></span>
                            <p>上次使用</p>
                        </li>
                        <li>
                            <span></span>
                            <p>上次使用</p>
                        </li>
                        <li>
                            <span></span>
                            <p>上次使用</p>
                        </li>
                    </ul>
                </div>
                <!-- 弹窗开始 -->
                <div v-if="show">
                    <div class="alert-bg"></div>
                    <div class="alert-con"><img src="../assets/images/Poster-img.jpg" ></div>
                    <div class="alert-bottom">
                        <p>海报名称海报名称海报名称海报名称海报名称海报名称</p>
                        <van-button round type="danger">
                            生成并使用此海报
                        </van-button>
                    </div>
                </div>
                <!-- 弹窗结束 -->
            </article>
        </section>
    </div>
</template>
<script>
import publicHead from '@/components/distribution/publicHead';
import Vue from 'vue';

export default {
    components: {
        'slot-publicHead': publicHead
    },
    data() {
        return {
            linkreturn:'index',//头部跳转链接
            show:false
        };
    },
    methods: {
        /**
         * @Date: 2020-11-06 16:01
         * @LastEditors: fengting
         * @description: 弹窗
         */
        PosterAlert(){
            this.show = true;
        }
    }
};
</script>
<style lang="scss">
    @import "@/pages/distribution/assets/css/distribution.scss";
</style>





 

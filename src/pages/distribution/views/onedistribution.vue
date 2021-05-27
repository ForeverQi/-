<!--
 * @Author: fengting
 * @Date: 2020-11-09 11:27:13
 * @LastEditTime: 2020-11-30 17:40:36
 * @LastEditors: Please set LastEditors
 * @Description: 一级分销商
 * @FilePath: \vue_test_qian\src\pages\distribution\views\onedistribution.vue
-->
<template>
    <!-- onedistribution-center -->
    <div class="onedistribution-home">
        <section class="wrapper-c">
            <div class="bg-div">
                <p></p>
            </div>
            <article class="max-center"> 
                <!-- 头部开始 -->
                <slot-publicHead :linkreturn="linkreturn">
                    <div slot="headTit">一级分销商（999）</div>
                </slot-publicHead>
                <!-- 头部结束 -->
                <div class="onedistribution-content">
                   <div class="one-search"><van-search shape="round" left-icon="" right-icon="search" v-model="value" placeholder="请输入商品名称" /></div>
                   <div class="onedistribution-ul">
                        <div class="onedistribution-li">
                            <div class="onedistribution-top">
                                <div class="onedistribution-img">
                                    <img src="../assets/images/superiorImg.png">
                                </div>
                                <div class="onedistribution-text">
                                    <span>分销商名称</span>
                                    <p>等级等级</p>
                                </div>
                            </div>
                            <div class="onedistribution-bottom">
                                <van-button round type="default">查看订单</van-button>
                                <van-button round type="default">详细</van-button>
                            </div>
                        </div>
                        <div class="onedistribution-li">
                            <div class="onedistribution-top">
                                <div class="onedistribution-img">
                                    <img src="../assets/images/superiorImg.png">
                                </div>
                                <div class="onedistribution-text">
                                    <span>分销商名称<em>已冻结</em></span>
                                    <p>等级等级</p>
                                </div>
                            </div>
                            <div class="onedistribution-bottom">
                                <van-button round type="default">查看订单</van-button>
                                <van-button round type="default">详细</van-button>
                            </div>
                        </div>
                   </div>
                </div>
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
            value:'',
        };
    },
    methods: {
        /**
         * @Date: 2020-11-06 16:01
         * @LastEditors: fengting
         * @description: 
         */
        
    }
};
</script>
<style lang="scss">
    @import "@/pages/distribution/assets/css/distribution.scss";
</style>





 

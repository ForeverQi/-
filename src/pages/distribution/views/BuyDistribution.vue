<!--
 * @Author: fengting
 * @Date: 2020-11-13 11:02:08
 * @LastEditTime: 2020-11-13 11:27:55
 * @LastEditors: Please set LastEditors
 * @Description: 购买成为分销商
 * @FilePath: \vue_test_qian\src\pages\distribution\views\BuyDistribution.vue
-->
<template>
    <!-- BuyDistribution-center -->
    <div class="BuyDistribution-home">
        <section class="wrapper-c">
            <div class="bg-div">
                <p></p>
            </div>
            <article class="max-center"> 
                <!-- 头部开始 -->
                <slot-publicHead :linkreturn="linkreturn">
                    <div slot="headTit">成为分销商</div>
                </slot-publicHead>
                <!-- 头部结束 -->
                <div class="BuyDistribution-content">
                    <div class="">
                        <van-notice-bar :scrollable="false" text="购买以下指定商品即可成为分销商"/>
                    </div>
                    <div class="BuyDistribution-ul">
                        <div class="BuyDistribution-li">
                            <div class="BuyDistribution-li-l"><img src="../assets/images/superiorImg.png" ></div>
                            <div class="BuyDistribution-li-r">
                                <span>荣耀Play4T 全网通6GB+128GB大内存 蓝水翡翠 4000mAh大电池</span>
                                <div class="BuyDistribution-mony">
                                    <em>￥</em> 
                                    <strong>699.00</strong> 
                                    <i>¥599.00</i> 
                                    <p><img src="../assets/images/tag-img1.png" ></p>
                                </div>
                                <div class="Buy-cart"><img src="../assets/images/cart.png" ></div>
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
        };
    },

    methods: {
        /**
         * @Date: 2020-11-12 16:22
         * @LastEditors: fengting
         * @description: 自定义单选项
         */
       
    }
};
</script>
<style lang="scss">
    @import "@/pages/distribution/assets/css/distribution.scss";
</style>

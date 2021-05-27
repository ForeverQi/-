<!--
 * @Author       : fengting
 * @description  : 我的上级
 * @Date         : 2020-11-05 18:25:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-09 15:05:08
 * @FilePath     : /vue-test_qian/src/pages/distribution/views/mysuperior.vue
-->

<template>
    <!-- mysuperior-center -->
    <div class="mysuperior-home">
        <section class="wrapper-c">
            <div class="bg-div">
                <p></p>
            </div>
            <article class="max-center"> 
                <!-- 头部开始 -->
                <slot-publicHead :linkreturn="linkreturn">
                    <div slot="headTit">我的上级</div>
                </slot-publicHead>
                <!-- 头部结束 -->
                <div class="mysuperior-content">
                    <div class="mysuperior-ul">
                        <div class="mysuperior-li mysuperior-li1">
                            <span>分销商名/昵称/用户名</span>
                            <p><img src="../assets/images/superiorImg.png" /></p>
                        </div>
                        <div class="mysuperior-li">
                            <span>状态</span>
                            <em class="size-color">已冻结</em>
                        </div>
                        <div class="mysuperior-li">
                            <span>分销商等级/会员等级</span>
                            <em>分销商等级/会员等级</em>
                        </div>
                    </div>
                    <div class="mysuperior-ul">
                        <div class="mysuperior-li">
                            <span>电话号码</span>
                            <em>13111111111</em>
                        </div>
                        <div class="mysuperior-li">
                            <span>微信号</span>
                            <em>asadasdasdsad</em>
                        </div>
                        <div class="mysuperior-li mysuperior-li2">
                            <span>分销商名/昵称/用户名</span>
                            <p><img src="../assets/images/superiorImg.png" /></p>
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
            linkreturn:'index',
        };
    },
    methods: {
        /**
         * @Date: 2020-11-05 18:22
         * @LastEditors: fengting
         * @description: 自定义单选项
         */
    }
};
</script>
<style lang="scss">
@import "@/pages/distribution/assets/css/distribution.scss";
</style>





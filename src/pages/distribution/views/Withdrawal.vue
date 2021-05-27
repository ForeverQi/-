<!--
 * @Author: fengting
 * @Date: 2020-11-06 17:21:35
 * @LastEditTime: 2020-11-10 11:18:30
 * @LastEditors: Please set LastEditors
 * @Description: 立即提现
 * @FilePath: \vue_test_qian\src\pages\distribution\views\Withdrawal.vue
-->
<template>
    <!-- Withdrawal-center -->
    <div class="Withdrawal-home">
        <section class="wrapper-c">
            <div class="bg-div">
                <p></p>
            </div>
            <article class="max-center"> 
                <!-- 头部开始 -->
                <slot-publicHead :linkreturn="linkreturn">
                    <div slot="headTit">立即提现</div>
                </slot-publicHead>
                <!-- 头部结束 -->
                <div class="Withdrawal-content">
                    <van-cell title="提现账号" is-link value="请选择" @click="show = true"/>
                    <div class="expect">
                        <span>预计1个工作日内到帐</span>
                        <router-link to="" class="">提现账号管理</router-link>
                    </div>
                    <div class="Withdrawal-mony">
                        <div class="Withdrawal-mony-tit">
                            <span>提现金额</span>
                            <p>当前可提佣金为9999.99<em>全部提现</em></p>
                        </div>
                        <div class="Withdrawal-input">
                            <span>&yen;</span>
                            <p><input type="text"></p>
                        </div>
                        <div class="Withdrawal-text">
                            <em>将收取10%的手续费</em>
                            <em>扣除手续费后实际到账¥71.30</em>
                        </div>
                    </div>
                    <div class="alert-action-but">
                        <van-button round block type="info" native-type="submit">
                            确认提现
                        </van-button>
                    </div>
                    <!-- 选择提现账号弹窗开始 -->
                    <van-action-sheet :closeable="false" v-model="show" title="请选择" class="action-tit">
                        <div class="alert-content">
                            <div>
                                <div class="alert-action-li action-cur">
                                    <span><img src="../assets/images/icon-ok.png"></span>
                                    <p>支付宝-啊啊啊啊嗄</p>
                                </div>
                                <div class="alert-action-li">
                                    <span><img src="../assets/images/icon-ok.png"></span>
                                    <p>提现到微信零钱</p>
                                </div>
                                <div class="alert-action-li">
                                    <span><img src="../assets/images/icon-ok.png"></span>
                                    <p>开户行1号-尾号6666</p>
                                </div>
                            </div>
                            <!-- <div class="no-data">
                                <p>您没有添加的提现账号</p>
                                <van-button round type="default">立即添加</van-button>
                            </div> -->
                            <div class="alert-action-but">
                                <van-button round block type="info" native-type="submit">
                                    确认
                                </van-button>
                            </div>
                        </div>
                    </van-action-sheet>
                    <!-- 选择提现账号弹窗结束 -->
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
            show: false,//选择提现账号弹窗
        };
    },
    methods: {
        /**
         * @Date: 2020-11-06 16:01
         * @LastEditors: fengting
         * @description: 日期选择
         */
        onSelect(item) {
            this.show = false;
        },
        
    }
};
</script>
<style lang="scss">
    @import "@/pages/distribution/assets/css/distribution.scss";
</style>





 
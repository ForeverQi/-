<!--
 * @Author: fengting
 * @Date: 2020-11-09 10:12:57
 * @LastEditTime: 2020-11-09 11:30:56
 * @LastEditors: Please set LastEditors
 * @Description: 提现记录
 * @FilePath: \vue_test_qian\src\pages\distribution\views\WithdrawalList.vue
-->
<template>
    <!-- Withdrawallist-center -->
    <div class="Withdrawallist-home">
        <section class="wrapper-c">
            <div class="bg-div">
                <p></p>
            </div>
            <article class="max-center"> 
                <!-- 头部开始 -->
                <slot-publicHead :linkreturn="linkreturn">
                    <div slot="headTit">提现记录</div>
                </slot-publicHead>
                <!-- 头部结束 -->
                <div class="Withdrawallist-content">
                    <ul class="Withdrawallist-ul">
                        <li>
                            <span>19280.92</span>
                            <p>可提佣金 (元)</p>
                        </li>
                        <li>
                            <span>19280.92</span>
                            <p>已提佣金 (元)</p>
                        </li>
                    </ul>
                    <div class="orderdetailed-ul">
                        <div class="orderdetailed-li">
                            <div class="detailed-li-top">
                                <span>提现编号:123123</span>
                                <em>已完成</em>
                            </div>
                            <div class="detailed-li-bottom">
                                <div class="detailed-li-txt">
                                    <span>提现时间</span>
                                    <p>2019-111-11 12:00:00</p>
                                </div>
                                <div class="detailed-li-txt">
                                    <span>提现账号</span>
                                    <p>开户行1号-尾号6666</p>
                                </div>
                                <div class="detailed-li-txt">
                                    <span>提现金额</span>
                                    <p>￥99.99</p>
                                </div>
                                <div class="detailed-li-txt">
                                    <span>手续费</span>
                                    <p>￥9(1%)</p>
                                </div>
                                <div class="detailed-li-txt">
                                    <span>实际提现金额</span>
                                    <p>￥9.99</p>
                                </div>
                            </div>
                        </div>
                        <div class="orderdetailed-li">
                            <div class="detailed-li-top">
                                <span>提现编号:123123</span>
                                <em class="colorred">待审核</em>
                            </div>
                            <div class="detailed-li-bottom">
                                <div class="detailed-li-txt">
                                    <span>提现时间</span>
                                    <p>2019-111-11 12:00:00</p>
                                </div>
                                <div class="detailed-li-txt">
                                    <span>提现账号</span>
                                    <p>开户行1号-尾号6666</p>
                                </div>
                                <div class="detailed-li-txt">
                                    <span>提现金额</span>
                                    <p>￥99.99</p>
                                </div>
                                <div class="detailed-li-txt">
                                    <span>手续费</span>
                                    <p>￥9(1%)</p>
                                </div>
                                <div class="detailed-li-txt">
                                    <span>实际提现金额</span>
                                    <p>￥9.99</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 空数据开始 -->
                    <!-- <div class="no-data">
                        <van-empty description="没有找到相关记录" :image="require('../assets/images/no-data.png')">
                            <van-button round type="danger" class="bottom-button">
                                去添加
                            </van-button>
                        </van-empty>
                    </div> -->
                    <!-- 空数据结束 -->
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





 
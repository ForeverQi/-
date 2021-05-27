<!--
 * @Author: fengting
 * @Date: 2020-11-06 15:43:04
 * @LastEditTime: 2020-11-06 17:23:37
 * @LastEditors: Please set LastEditors
 * @Description: 订单详细
 * @FilePath: \vue_test_qian\src\pages\distribution\views\orderdetailed.vue
-->
<template>
    <!-- orderdetailed-center -->
    <div class="orderdetailed-home">
        <section class="wrapper-c">
            <div class="bg-div">
                <p></p>
            </div>
            <article class="max-center"> 
                <!-- 头部开始 -->
                <slot-publicHead :linkreturn="linkreturn">
                    <div slot="headTit">订单详细</div>
                </slot-publicHead>
                <!-- 头部结束 -->
                <div class="orderdetailed-content">
                    <div class="orderdetailed-time">
                        <div class="max-mony">
                            <div class="mony-li">订单总额<em>&yen;999999.99</em></div>
                            <div class="mony-li">累计收益<em>&yen;999.99</em></div>
                        </div>
                        <div class="orderdetailed-l">
                            <van-icon name="underway-o" />
                            <div class="txt-time" :value="date" @click="show = true" v-if="date">{{date}}</div>
                            <div class="txt-time" :value="date" @click="show = true" v-else>按时间</div>
                            <van-calendar v-model="show" type="range" @confirm="onConfirm" :show-confirm="false" />
                        </div>
                    </div>
                    <div class="orderdetailed-ul">
                        <div class="orderdetailed-li">
                            <div class="detailed-li-top">
                                <span>订单号:123123</span>
                                <p><img src="../assets/images/team-r.png"></p>
                                <em>未完成订单</em>
                            </div>
                            <div class="detailed-li-bottom">
                                <div class="detailed-li-txt">
                                    <span>收益</span>
                                    <p>￥9.99</p>
                                </div>
                                <div class="detailed-li-txt">
                                    <span>下单时间</span>
                                    <p>2019-11-11 12:00:00</p>
                                </div>
                                <div class="detailed-li-txt">
                                    <span>下单会员</span>
                                    <p>啊啊啊啊</p>
                                </div>
                                <div class="detailed-li-txt">
                                    <span>分销商</span>
                                    <p>asdasd</p>
                                </div>
                                <div class="detailed-li-txt">
                                    <span>订单金额</span>
                                    <p>￥90.99</p>
                                </div>
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
import { Calendar } from 'vant';

Vue.use(Calendar);

export default {
    components: {
        'slot-publicHead': publicHead
    },
    data() {
        return {
            linkreturn:'index',
            date: '',
            show: false,
        };
    },
    methods: {
        /**
         * @Date: 2020-11-06 16:01
         * @LastEditors: fengting
         * @description: 日期选择
         */
        formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    }
};
</script>
<style lang="scss">
    @import "@/pages/distribution/assets/css/distribution.scss";
</style>





 
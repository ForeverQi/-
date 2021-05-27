<template>
<div class="page-layout buy-member-wrap">

    <!-- 页面头部 -->
    <PageHead :title="'短视频'" />

    <!-- 页面内容 -->
    <div class="page-body">
        <!-- 会员信息 -->
        <div class="member-info-box">
            <div class="member-portrait">
                <div class="portrait-box">
                    <img :src="baseinfo.logo ? baseinfo.logo : 'https://aimg8.dlssyht.cn/wap/public/shop_nopic.png'" />
                </div>
            </div>
            <div class="member-attr">
                <div class="attr-left">
                    <div class="member-rank" :class="baseinfo.isRenew != 1 ? 'rank-0' : 'rank-1'">
                        <i class="rank-icon"></i>
                        <!-- <b class="rank-text">{{baseinfo.isRenew == 1 ? '包月会员' : '体验会员'}}</b> -->
                        <b class="rank-text">{{baseinfo.userStatusName}}</b>
                        <!-- <i class="rank-help"></i> -->
                    </div>
                    <div class="rank-date" v-if="baseinfo.userStatus!=1">
                        <span v-if="baseinfo.userStatus === 2">有效期至:{{baseinfo.vipEndDate}}</span>
                        <em v-if="baseinfo.userStatus === 3">您的服务已到期,请及时充值</em>
                    </div>
                </div>
            </div>
        </div>

        <div class="tab-box version-tab">
            <div class="tab-b">
                <div class="version-select standard-version">
                    <ul class="select-item-box">
                        <li class="select-item" @click="year = 1" :class="{'selected': year === 1}">
                            <h6>一年</h6>
                            <span class="price"><i>&yen;</i><b>{{ product.price || 0 }}</b></span>
                            <span v-if="year === 1" class="sjzs-icon s-icon-duigou-1 radio-select"></span>
                        </li>
                        <li class="select-item" @click="year = 2" :class="{'selected': year === 2}">
                            <h6>两年</h6>
                            <span class="price"><i>&yen;</i><b>{{ product.price * 2 || 0 }}</b></span>
                            <span v-if="year === 2" class="sjzs-icon s-icon-duigou-1 radio-select"></span>
                        </li>
                    </ul>
                    <p class="remarks-text">{{ product.name }}</p>
                </div>
                <div class="version-select profession-version"></div>
                <div class="version-select vip-version"></div>
            </div>
        </div>
        <ul class="pay-list">
            <li class="pay-item" @click="payType = 'wechat'">
                <span class="item-left">
                    <i class="pay-icon wxpay-icon"></i>
                    <b>微信支付</b>
                </span>
                <span class="item-right">
                    <i :data-selected="payType == 'wechat' ? 1 : 0" class="sjzs-icon s-icon-duigou-1 radio-select"></i>
                </span>
            </li>
        </ul>

        <a v-if="$util.functions.Len(product)" href="javascript:;" @click="Pay" style="color: #fff;">
            <div class="btn-area">
                <a class="orange-btn buy-btn">支付￥{{ product.price * year || 0 }}立即开通</a>
            </div>
        </a>
        <div class="loading" v-else>
            <van-loading color="#1989fa" />
        </div>
    </div>
</div>
</template>

<script>
import {
    PayConf,
    setMealQuery
} from "@/api/shop/video.bac";
import PageHead from "./components/PageHead";
import {
    mapGetters
} from 'vuex'
import Hint from '@/plugins/hint'

export default {
    data() {
        return {
            year: 1,
            price: 0,
            product: {},
            // 基础信息
            baseinfo: {},
            payType: "wechat"
        }
    },

    computed: {
        ...mapGetters([
            'variables'
        ])
    },

    created() {
        // 基础信息
        setMealQuery({}).then(data => {
            this.baseinfo = data;
            this.proid = this.baseinfo.proid * 1 ? this.baseinfo.proid : 0;
            this.GetPayConf();
        });
    },

    methods: {
        /**
         * 获取产品信息
         * @constructor
         */
        GetPayConf() {
            PayConf().then(data => {
                this.product = data;
            })
        },

        /**
         * 支付
         * @returns {*|void}
         * @constructor
         */
        Pay() {
            let thisS = this;
            // app 支付
            thisS.$util.pay.app.run({
                // alipay 支付宝app wechat 微信app  [1 微信 4 微信app 5 支付宝app]
                pay_type: this.payType,
                // 产品类型 62
                id: thisS.product.id,
                // 购买年限
                year: thisS.year,
                // 流量数量
                callback: function (res) {
                    let message = res;
                    if (thisS.$util.app.Platform() === 1) {
                        res = JSON.parse(res);
                        if (res.errCode * 1 === 0) {
                            message = '支付成功';
                        } else {
                            message = '支付失败';
                        }
                    }

                    Hint.Alert({
                        title: '提示',
                        message
                    }).then(() => {
                        if (message === '支付失败') {
                            return false;
                        }

                        thisS.$router.push({
                            path: '/shop/bac/video/index'
                        })
                    });
                }
            });
        }
    },
    components:{
        PageHead
    }
}
</script>

<style lang="scss">
@import "./css/videoPublic";
@import "./css/buyStyle";
</style>

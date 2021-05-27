<template>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInLeftBig" leave-active-class="animated fadeOutRightBig" >
        <div class="page-layout buy-member-wrap">

            <!-- 页面头部 -->
            <div class="page-title" :style="{'margin-top': $store.getters.variables.many.BarHeight+'px'}">
                <em @click="$util.functions.GoBack()" class="back-btn"></em>
                <h5>开通短视频会员</h5>
            </div>

            <!-- 页面内容 -->
            <div class="page-body">
                <!-- 会员信息 -->
                <div class="member-info-box">
                    <div class="member-portrait">
                        <img :src="baseinfo.logo ? baseinfo.logo : './images/member_portrait.png'"/>
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
                    <div class="tab-h" v-if="!baseinfo.proid">
                        <h5 v-if="$route.query.proType == 4 && baseinfo.isRenew >= 1">{{baseinfo.space}}G存储空间<em>如需变更存储空间请联系客服</em></h5>
                        <ul v-else>
                            <li v-for="(item, index) in product" @click="proid = item.id, proidIndex = index, ChangePrice()" :class="{'active': item.id == proid}">
                                {{item.name}}
                                <i v-if="index === 0" class="move-line" :style="{ 'transform': 'translateX(' + (proidIndex * 100) + '%)' }"></i>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-b">
                        <div class="version-select standard-version" v-if="$route.query.proType != 4">
                            <ul class="select-item-box">
                                <li class="select-item" v-for="item in price"
                                    @click="dateType = item.key, ChangePrice()" :class="{'selected': dateType == item.key}">
                                    <h6>{{item.name}}</h6>
                                    <span class="price"><i>&yen;</i><b>{{item.price}}</b></span>
                                    <p v-if="item.marketprice > item.price">原价:&yen;{{item.marketprice}} </p>
                                    <span v-if="dateType == item.key" class="radio-select"></span>
                                </li>
                            </ul>
                            <!--<p class="remarks-text">{{proDescription}}</p>-->
                        </div>
                        <div class="version-select profession-version"></div>
                        <div class="version-select vip-version"></div>

                        <div v-if="$route.query.proType == 4" class="flow-select">
                            <ul class="select-item-box">
                                <li class="select-item">
                                    <div class="img-box">
                                        <span>{{flow.unit}}<em>G</em></span>
                                    </div>
                                    <div class="attr-box">
                                        <h6>{{flow.unit}}G短视频流量包</h6>
                                        <p>服务期内有效</p>
                                        <div class="flow-info-box">
                                            <span class="price">
                                                <b>￥{{flow.price}}</b><i>/</i><em>{{flow.init}}G</em>
                                            </span>
                                            <div class="option">
                                                <i :class="['sub', flow.num <= 1 ? 'disabled' : '']" @click="FlowAct(-1)"></i>
                                                <span>{{flow.num}}</span>
                                                <i class="add" @click="FlowAct(1)"></i>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ul class="pay-list" v-if="payType != 1">
                    <li class="pay-item" @click="payType = 'wechat'">
                        <span class="item-left">
                            <i class="pay-icon wxpay-icon"></i>
                            <b>微信支付</b>
                        </span>
                        <span class="item-right">
                            <i :data-selected="payType == 'wechat' ? 1 : 0" class="radio-select"></i>
                        </span>
                    </li>
                    <!--<li class="pay-item" @click="payType = 'alipay'">
                        <span class="item-left">
                            <i class="pay-icon alipay-icon"></i>
                            <b>支付宝</b>
                        </span>
                        <span class="item-right">
                            <i :data-selected="payType == 'alipay' ? 1 : 0" class="radio-select"></i>
                        </span>
                    </li>-->
                </ul>
                <ul class="pay-list" v-else>
                    <li class="pay-item">
                        <span class="item-left">
                            <i class="pay-icon wxpay-icon"></i>
                            <b>微信支付</b>
                        </span>
                        <span class="item-right">
                            <i data-selected="1" class="radio-select"></i>
                        </span>
                    </li>
                </ul>
                <a v-if="!$store.getters.variables.many.pay" href="javascript:;" @click="Pay" style="color: #fff;">
                    <div class="btn-area" v-if="total > 0">
                        <a class="orange-btn buy-btn">支付￥{{total}}立即开通</a>
                    </div>
                </a>
                <div class="loading" v-else>
                    <van-loading color="#1989fa" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { PayConf, setMealQuery } from "@/api/shop/video.bac";
    import { mapGetters } from 'vuex'
    import Hint from '@/plugins/hint'

    export default {
        data() {
            return {
                // 产品类型
                proid: '',
                // 当前类型的索引用来记录移动效果
                proidIndex: 0,
                // 购买时间
                dateType: '',
                // 支付类型  1 微信 'alipay' 微信app 'wechat' 支付宝app
                payType: 'wechat',
                // 产品信息
                product: [],
                // 产品价格信息
                price: [],
                // 产品详细
                proDescription: "",
                // 购买空间
                flow: {
                    // 初始
                    init: 0,
                    unit: 0,
                    num: 1,
                    total: 0,
                    price: 0,
                },
                // 总价格
                total: 0,
                // 基础信息
                baseinfo: {}
            }
        },

        computed: {
            ...mapGetters([
                'variables'
            ])
        },

        created() {
            if (this.$util.functions.IsWX()) {
                // 微信内置浏览器使用微信js 支付
                this.payType = 1;
                this.$util.pay.wechat.h5.init()
            }

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
                let thisS = this;
                PayConf().then(res => {
                    res.list.forEach(function (value, index, array) {
                        if (
                            thisS.$route.query.proType == 4
                            && thisS.$route.query.proType == value.id
                            || value.id != 4
                            && !thisS.$route.query.proType
                        ) {
                            thisS.product.push(value);
                            // thisS.dateType = "month";
                            thisS.dateType = "year";
                            if (!thisS.proid && value.id != 4) {
                                thisS.proid = value.id;
                                thisS.proDescription = value.description;
                                // 套餐
                                thisS.price = [
                                    /*{
                                        name: "包月",
                                        key: "month",
                                        marketprice: value.marketprice,
                                        price: value.marketprice.month * value.discount.month,
                                    }, */{
                                        name: "包年",
                                        key: "year",
                                        marketprice: value.marketprice,
                                        price: value.marketprice.year * value.discount.year,
                                    }
                                ];
                            }

                            if (value.id == 4) {
                                thisS.proDescription = value.description;
                                thisS.proid = value.id;
                                // 流量
                                thisS.flow.init = thisS.flow.unit = thisS.flow.total = value.flow;
                                thisS.flow.price = value.marketprice * value.discount;
                            }
                        }
                    });

                    thisS.ChangePrice();
                })
            },

            /**
             * 价格变化
             * @constructor
             */
            ChangePrice() {
                let thisS = this;
                thisS.product.forEach(function (value, index, array) {
                    if (value.id == thisS.proid) {
                        if (thisS.$route.query.proType == 4) {
                            // 流量购买
                            thisS.total = value.marketprice * value.discount * thisS.flow.num;
                        } else {
                            thisS.total = value.marketprice[thisS.dateType] * value.discount[thisS.dateType];
                            thisS.price = [
                                /*{
                                    name: "包月",
                                    key: "month",
                                    marketprice: value.marketprice,
                                    price: value.marketprice.month * value.discount.month,
                                }, */{
                                    name: "包年",
                                    key: "year",
                                    marketprice: value.marketprice,
                                    price: value.marketprice.year * value.discount.year,
                                }
                            ];
                        }

                        thisS.proDescription = value.description;
                        return false;
                    }
                });
            },

            /**
             * 支付
             * @returns {*|void}
             * @constructor
             */
            Pay() {
                let
                    thisS = this,
                    indent = {
                        // alipay 支付宝app wechat 微信app  [1 微信 4 微信app 5 支付宝app]
                        pay_type: this.payType,
                        // 产品类型
                        id: this.proid,
                        // 包月或者包年 month 包月 year 包年
                        date_type: this.dateType,
                        // 流量数量
                        flow_num: this.flow.num
                    }
                ;

                if (this.payType == 1) {
                    // 微信h5支付
                    return this.$util.pay.wechat.h5.run({
                        indent,
                        success: function(res) {
                            Hint.Alert({
                                title: '提示',
                                message: "支付成功"
                            }).then(() => {
                                thisS.$router.push({
                                    path: '/shop/bac/video/index'
                                });
                            });
                        },
                        failed: function(res) {
                            Hint.Alert({
                                title: '提示',
                                message: "支付失败"
                            });
                        }
                    });
                }

                // app 支付
                thisS.$util.pay.app.run({
                    ...indent,
                    callback: function(res) {
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
            },

            /**
             * 流量计算
             * @param num
             * @constructor
             */
            FlowAct(num) {
                this.flow.num += num;
                if (this.flow.num <= 1) {
                    this.flow.num = 1;
                }

                this.ChangePrice();
            },
        }
    }
</script>

<style lang="scss">
    @import "./css/videoPublic";
    @import "./css/buyStyle";
    .buy-member-wrap{
        .loading {
            margin: 0 auto;
            width: 30px;
            height: 1rem;
            line-height: 1rem;
        }
    }
</style>

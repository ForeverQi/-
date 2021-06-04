<!--
 * @Author       : zhouqi
 * @description  : 支付成功页
 * @Date         : 2020-12-07 15:36:59
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-06-02 14:26:32
 * @FilePath     : /vue-VFrontend/src/pages/order/views/submitOrder/paySuccess.vue
-->
<template>
    <section class="paySuccess-box">
        <section
            class="paySuccess"
            v-if="orderData != ''"
            v-wechat-title="($route.meta.title = orderData.tips.tijiaochenggong)"
        >
            <van-loading v-if="showLoading" size="50px" color="#1989fa" />
            <van-overlay :show="showLoading" />
            <Nav :numerical="8" :tips="orderData.tips" />
            <!-- 未支付 -->
            <!-- orderStatus:1 未支付，orderStatus:2 货到付款，orderStatus:3 已支付，orderStatus:4 已完成 -->
            <div class="notPay" v-if="orderData.orderStatus == 1">
                <div class="notPay_top" v-if="orderData.orderStatus == 1">
                    <img src="@/pages/order/assets/images/order_block.png" alt="" />
                    {{ orderData.tips.nindedingdanyizhifuchenggong }},{{ orderData.tips.qingjinkuaiwanchengzhifu }}！
                </div>
                <div class="notPay_content">
                    <p>
                        <span style="font-size:0.28rem;color:#888888;font-weight:400;">{{
                            orderData.tips.rengxuzhifu
                        }}</span>
                        {{ orderData.currencySymbol
                        }}<span style="font-size:0.8rem">{{ orderData.orderAmountJson.left }}</span
                        >.{{ orderData.orderAmountJson.right }}
                    </p>
                    <div class="notPay_btn">
                        <div class="notPay_left" @click="goLink(1)">{{ orderData.tips.kankanbiede }}</div>
                        <div class="notPay_right" @click="goLink(3)" v-if="orderData.orderStatus == 1">
                            {{ orderData.tips.quzhifu }}
                        </div>
                    </div>
                </div>
                <div class="notPay_bottom">
                    <p>
                        <span>{{ orderData.tips.tijiaoshijian }}:</span> {{ orderData.inputTime }}
                    </p>
                    <p>
                        <span>{{ orderData.tips.dingdanhao }}:</span> {{ orderData.orderId }}
                    </p>
                    <p>
                        <span>{{ orderData.tips.dingdanjine }}:</span> {{ orderData.currencySymbol
                        }}{{ orderData.orderAmount }}
                    </p>
                </div>
            </div>
            <!-- 已支付成功 -->
            <div
                class="alreadyPay"
                v-if="
                    orderData.orderStatus == 4 ||
                        orderData.orderStatus == 3 ||
                        orderData.orderStatus == 2 ||
                        orderData.orderStatus == 5
                "
            >
                <div class="alreadyPayFath">
                    <div class="alreadyPay_top">
                        <div class="at_left">
                            <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png" alt="check" />
                        </div>
                        <div class="at_right">
                            <p v-if="orderData.orderStatus == 4 || orderData.orderStatus == 5">
                                {{ orderData.tips.jiaoyiyiwancheng }}！
                            </p>
                            <p class="at_right_c" v-if="orderData.orderStatus == 4">
                                {{ orderData.tips.nindedingdanyizhifuchenggong }}
                            </p>
                            <p v-if="orderData.orderStatus == 2">{{ orderData.tips.dingdantijiaochenggong }}！</p>
                            <p class="at_right_c" v-if="orderData.orderStatus == 2">
                                {{ orderData.tips.jiaoyifangshi }}:{{ orderData.paymentMethod }}
                            </p>
                            <p v-if="orderData.orderStatus == 3">{{ orderData.tips.nindedingdanyizhifuchenggong }}</p>
                        </div>
                    </div>
                    <div class="alreadyPay_bottom">
                        <p v-if="orderData.deliveryCode != ''">{{orderData.tips.qingdaodingdanxiangqingchakantihuoma}}</p>
                    </div>
                </div>
                    
                <div class="alreadyPay_content">
                    <div class="notPay_bottom" style="margin-bottom: 0.48rem;">
                        <p>
                            <span>{{ orderData.tips.tijiaoshijian }}:</span> {{ orderData.inputTime }}
                        </p>
                        <p>
                            <span>{{ orderData.tips.dingdanhao }}:</span> {{ orderData.orderId }}
                        </p>
                        <p>
                            <span>{{ orderData.tips.dingdanjine }}:</span> {{ orderData.currencySymbol
                            }}{{ orderData.orderAmount }}
                        </p>
                    </div>
                    <div class="alreadyPay_btn">
                        <div class="ab_left" @click="goLink(1)">
                            <span>{{ orderData.tips.jixugouwu }}</span>
                        </div>
                        <div class="ab_right" @click="goLink(2)">
                            <span>{{ orderData.tips.wodedingdan }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 序列号 -->
            <div class="fileDown" v-if="serial != ''">
                <!-- 序列号 -->
                <div class="fileDown_child" v-for="(item, index) in serial" :key="index">
                    <div class="file_left">{{ item.name }}</div>
                    <div class="file_right">
                        <em>{{ item.val }}</em> <span @click="fileFun(1, item.val)">{{ orderData.tips.fuzhi }}</span>
                    </div>
                </div>
            </div>
            <!-- 文件下载 -->
            <div class="fileDown" v-if="files != ''">
                <!-- 文件下载 -->
                <div class="fileDown_child" v-for="(item, index) in files" :key="index">
                    <div class="file_left">{{  orderData.tips.wenjian }}</div>
                    <div class="file_right">
                        <span style="background:transparent;">{{ item.name }}</span>
                        <!-- 文件 -->
                        <a :href="href + item.path" :download="item.name" v-if="item.img != 1">{{
                            orderData.tips.xiazai
                        }}</a>
                        <!-- 图片 -->
                        <span @click="openImg(item.path)" v-else>{{ orderData.tips.chakantupian }}</span>
                    </div>
                </div>
            </div>
            <!-- 文件下载图片 -->
            <div class="openImgAlert" @click="openImgUrl = ''" v-if="openImgUrl">
                <img :src="openImgUrl" alt="" />
            </div>
            <!-- 广告 -->
            <div class="bottom_img" v-if="advert != ''">
                <div class="bottom_img_child bottom_advert">
                    <div v-html="advert"></div>
                </div>
            </div>
            <!-- 活动 -->
            <div
                class="bottom_img"
                v-if="activityInfo != '' && (activityInfo.red.list.length > 0 || activityInfo.turn.list.length > 0)"
            >
                <section v-for="(item, index) in activityInfo" :key="index">
                    <!-- 红包 -->
                    <div
                        class="bottom_img_child bottom_img_child2"
                        v-if="index == 'red' && item.list.length > 0"
                        :style="{ marginBottom: activityInfo.turn.list.length > 0 ? '0.2rem' : 0, alignItems: item.list.length > 2 ? 'flex-end' : 'inherit' }"
                    >
                        <div class="bottom_left">
                            <p v-for="(listItem, listIndex) in item.list" :key="listIndex">
                                {{ listItem[0] }} <span>{{ listItem[1] }}!</span>
                            </p>
                            <div @click="activyBtn(item.button.url)" v-if=" item.button && Object.keys(item.button).length">
                                <span>{{ item.button.name
                                    }}<img
                                        style="width:0.09rem;height:0.11rem;display:inline-block;margin-left:0.08rem;margin-bottom:0.04rem;"
                                        src="@/pages/order/assets/images/rightArrow.png"
                                /></span>
                            </div>
                            <div></div>
                        </div>
                        <div class="bottom_right">
                            <img src="@/pages/order/assets/images/order_hongbao.png" alt="" />
                        </div>
                    </div>
                    <!-- 大转盘 -->
                    <div
                        class="bottom_img_child bottom_img_child2 bottom_img_child3"
                        v-if="index == 'turn' && item.list.length > 0"
                    >
                        <div class="bottom_left">
                            <p v-for="(listItem, listIndex) in item.list" :key="listIndex">
                                {{ listItem[0] }} <span>{{ listItem[1] }}!</span>
                            </p>
                            <div
                                v-if="item.button && Object.keys(item.button).length"
                                @click="activyBtn(item.button.url)"
                            >
                                <span style="background:#5263FF;"
                                    >{{ item.button.name
                                    }}<img
                                        style="width:0.12rem;height:0.14rem;display:inline-block;margin-left:0.08rem;margin-bottom:0.04rem;"
                                        src="@/pages/order/assets/images/rightArrow.png"
                                /></span>
                            </div>
                            <div></div>
                        </div>
                        <div class="bottom_right">
                            <img src="@/pages/order/assets/images/order_zhuanpan.png" alt="" />
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </section>
</template>

<script>
// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";

// vant组件
import Hint from "@/plugins/hint";

import { getOrderSuccess } from "@/api/order/submitOrder.js";
import util from "@/libs/util";

// // 全局注册
// Vue.use(ImagePreview);
export default {
    components: {
        Nav
    },
    data() {
        return {
            openImgUrl:'',
            show: true,
            images: ["https://img.yzcdn.cn/vant/apple-1.jpg", "https://img.yzcdn.cn/vant/apple-2.jpg"],
            showLoading: true,
            orderData: "",
            serial: "",
            files: "",
            href: location.protocol+'//'+location.host + "/",
            activityInfo: ""
        };
    },
    mounted() {
        // this.$cookies.set("zz_userid","16705514");
        if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            return false;
        }
        this.getOrderSuccessFun();
    },
    methods: {
        //  订单提交成功接口
        getOrderSuccessFun() {
            const that = this;
            let paramValue = {
                username: this.$route.query.username,
                zz_userid: util.cookies.get("zz_userid"),
                order_id: this.$route.query.order_id
            };
            getOrderSuccess(paramValue)
                .then(res => {
                    that.showLoading = false;
                    that.orderData = res;
                    if (util.functions.ifHaveFun(that.orderData.orderAmount)) {
                        that.orderData.orderAmountJson = util.functions.separatePrice(that.orderData.orderAmount);
                    }
                    // 序列号
                    that.serial = util.functions.ifHaveFun(res.serial) ? res.serial : "";
                    // 文件下载
                    that.files = util.functions.ifHaveFun(res.file) ? res.file : "";
                    // 广告
                    that.advert = util.functions.ifHaveFun(res.advert) ? res.advert : "";
                    // 活动
                    that.activityInfo = util.functions.ifHaveFun(res.activityInfo) ? res.activityInfo : "";
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Alert({
                        message: err.msg
                    }).then(res => {
                        // that.$route.push({
                        //     path: "/personalCenter/personal-center-home",
                        //     query: {
                        //         username: that.$route.query.username,
                        //         action: 0
                        //     }
                        // });
                        location.href = "//" + document.domain + "/wap_" + that.$route.query.username + ".html"
                    });
                });
        },
        /**
         * @Date: 2020-12-22 15:12:09
         * @LastEditors: zhouqi
         * @LastEditTime: Do not edit
         * @description: 函数说明
         * @param {1:继续购物  2:我的订单 3:订单详情} type
         * @return {*}
         */
        goLink(type) {
            if (type == 1) {
                location.href = "//" + document.domain + "/wap_" + this.$route.query.username + ".html";
            } else if (type == 2) {
                if(this.orderData.orderType == 5){
                    this.$router.push({
                        path: "/vipCartmarketing/views/list",
                        query: {
                            username: this.$route.query.username
                        }
                    });
                }else{
                    this.$router.push({
                        path: "/order/orderRelated/orderList",
                        query: {
                            username: this.$route.query.username
                        }
                    });
                    util.cookies.set("orderList_state", 0);
                }
            } else if (type == 3) {
                location.href =
                    "//" +
                    document.domain +
                    `/dom/sc_order_detail.php?id=${this.$route.query.order_id}&username=${this.$route.query.username}&wap=1`;
            }
        },
        /**
         * @Date: 2020-12-22 16:21:24
         * @LastEditors: zhouqi
         * @description: 序列号复制，文件下载
         * @param {1：序列号，2：文件下载} type
         * @param {序列号名,文件路径} link
         * @return {*}
         */
        fileFun(type, link) {
            if (type == 1) {
                // 请求处理
                this.$copyText(link).then(
                    function(e) {
                        Hint.Msg({
                            message: "复制成功"
                        });
                    },
                    function(e) {
                        Hint.Msg({
                            message: "复制失败"
                        });
                    }
                );
            }
        },
        // 活动跳转
        activyBtn(url) {
            location.href = "//" + document.domain + url;
        },
        // 图片查看
        openImg(url) {
            this.openImgUrl = location.origin + "/" + url;
        },
    }
};
</script>

<style lang="scss">
@import "@/pages/order/assets/css/paySuccess.scss";
</style>

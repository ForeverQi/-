<!--
 * @Author       : zhouqi
 * @description  : description
 * @Date         : 2020-12-06 22:19:15
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-03-18 19:34:01
 * @FilePath     : /vue-VFrontend/src/pages/order/views/orderRelated/jdAfterType.vue
-->
<template>
    <section class="jdAfterType-box">
        <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" />
        <section class="jdAfterType" v-if="pro_info != ''">
            <Nav :numerical="14" :tips="{}" />
            <div class="jdAfterType_top" v-for="(item, index) in pro_list" :key="index">
                <div class="jdAfterType_top_left">
                    <img :src="item.pic" />
                </div>
                <div class="jdAfterType_top_center">
                    <div class="jdAfterType_top_center_up">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="jdAfterType_top_center_bottom">
                        <span>{{ pro_info.param_info }}</span>
                    </div>
                </div>
                <div class="jdAfterType_top_right">
                    <span
                        >{{ pro_Data.currency_symbol }}<span style="font-size:32rpx;">{{ item.shiji_money_left }}</span
                        >.{{ item.shiji_money_right }}</span
                    >
                    <span style="font-size:22rpx;color:#999;font-weight:400;">{{ item.num_info }}</span>
                </div>
            </div>
            <div class="jdAfterType_bottom">
                <div class="jdAfterType_bottom_child" @click="changeJdAfter(2)" v-if="pro_Data.shops_user_id != 2002 || huanhuoStatus">
                    <div class="jdAfterType_bottom_child_left">
                        <img
                            v-if="huanhuoStatus"
                            src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/afterSales_huanhuo.png"
                        />
                        <img v-else src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/afterSales_huanhuo2.png" />
                    </div>
                    <div class="jdAfterType_bottom_child_center">
                        <span :class="huanhuoStatus ? ' exchange_noChange' : 'exchange_change'">换货</span>
                        <span>更换收到的商品</span>
                    </div>
                    <div class="jdAfterType_bottom_child_right">
                        <div class="right_arrow"></div>
                    </div>
                </div>
                <div class="jdAfterType_bottom_child" @click="changeJdAfter(4)" v-if="pro_Data.shops_user_id != 2002 || weixiuStatus">
                    <div class="jdAfterType_bottom_child_left">
                        <img
                            v-if="weixiuStatus"
                            src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/afterSales_weixiu.png"
                        />
                        <img v-else src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/afterSales_weixiu2.png" />
                    </div>
                    <div class="jdAfterType_bottom_child_center">
                        <span :class="weixiuStatus ? 'exchange_noChange' : 'exchange_change'">维修</span>
                        <span>维修收到的商品</span>
                    </div>
                    <div class="jdAfterType_bottom_child_right">
                        <div class="right_arrow"></div>
                    </div>
                </div>
                <div class="jdAfterType_bottom_child" @click="changeJdAfter(1)" v-if="pro_Data.shops_user_id != 2002 || tuihuoStatus">
                    <div class="jdAfterType_bottom_child_left">
                        <img
                            v-if="tuihuoStatus"
                            src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/afterSales_tuihuo.png"
                        />
                        <img v-else src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/afterSales_tuihuo2.png" />
                    </div>
                    <div class="jdAfterType_bottom_child_center">
                        <span :class="tuihuoStatus ? 'exchange_noChange' : 'exchange_change'">退货</span>
                        <span>退回收到的商品</span>
                    </div>
                    <div class="jdAfterType_bottom_child_right">
                        <div class="right_arrow"></div>
                    </div>
                </div>
            </div>
            <!-- 退换货说明-->
            <!-- <div class="instructions" @click="payWayFlg">
        <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_addressOrder.png"><span>退换货说明</span>
    </div> -->
            <!-- 说明弹窗 -->
            <div class="payWayMyBox" v-if="instructions">
                <div class="payWayMy">
                    <div class="payWayMy_title">
                        <span>说明</span>
                    </div>
                    <!-- 支付方式 -->
                    <div class="payWayMy_content" v-if="true">
                        <!-- <rich-text nodes="{{companiesStr}}"></rich-text> -->
                        <span>事发地时发送到发大水发送到发阿的事发地时发送到发大水</span>
                    </div>
                    <!-- 确认按钮 -->
                    <div class="payWayMy_btn" catchtap="closePayWayFlg">
                        <span :style="{ color: bgcColor1 }">确认</span>
                    </div>
                </div>
            </div>
            <!-- 蒙版 -->
            <div class="mengbanBox" v-if="instructions"></div>
        </section>
    </section>
</template>

<script>
const { log } = console;
// vant组件
import Hint from "@/plugins/hint";
import util from "@/libs/util";

// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";

import { NumberCompInfo } from "@/api/gyl.js";
// 订单详情
import { getOrderDetail } from "@/api/order/orderDetail.js";
export default {
    components: {
        Nav
    },
    data() {
        return {
            showLoading: true,
            CurrencySymbol: "￥",
            bgcColor1: "#f00",
            instructions: false,
            pro_info: "",
            huanhuoStatus:false,
            weixiuStatus:false,
            tuihuoStatus:false,
            pro_Data:{},
        };
    },
    mounted() {
        if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            return false;
        }
        this.queryShop(this.$route.query.orderId, this.$route.query.proid);
        this.orderDetail(this.$route.query.orderId);
    },
    methods: {
        // 查询可售后商品
        queryShop(orderid, detailId) {
            const that = this;
            let paramJson = {
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                order_id: orderid,
                proId: detailId
            };
            NumberCompInfo(paramJson)
                .then(res => {
                    let afterData = res;
                    if (
                        util.functions.ifHaveFun(afterData.result) &&
                        util.functions.ifHaveFun(afterData.result.allowOperations)
                    ) {
                        this.tuihuoStatus = util.functions.in_array(10, afterData.result.allowOperations);
                        this.huanhuoStatus = util.functions.in_array(20, afterData.result.allowOperations);
                        this.weixiuStatus = util.functions.in_array(30, afterData.result.allowOperations);
                        this.$forceUpdate();
                    }
                })
                .catch(err => {
                    Hint.Alert({
                        message: err.msg
                    }).then(() => {
                        window.history.back();
                    });
                });
        },
        // 查询商品数据
        orderDetail(orderId) {
            let that = this;
            let paramJson = {
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                order_id: orderId
            };
            getOrderDetail(paramJson)
                .then(res => {
                    that.showLoading = false;
                    let pro_info_val = res.pro_info,
                        pro_info = "",
                        pro_list = "";
                    if (util.functions.ifHaveFun(pro_info_val)) {
                        for (let i in pro_info_val.group_info) {
                            for (let j in pro_info_val.group_info[i].pro_list) {
                                let val = String(pro_info_val.group_info[i].pro_list[j].total_price);
                                let val_left = val.substring(0, val.indexOf("."));
                                let val_right = val.replace(/\d+\.(\d*)/, "$1");
                                pro_info_val.group_info[i].pro_list[j].shiji_money_left = val_left;
                                pro_info_val.group_info[i].pro_list[j].shiji_money_right = val_right;
                            }
                        }
                        for (let i in pro_info_val.group_info) {
                            pro_list = pro_info_val.group_info[i].pro_list;
                            pro_info = pro_info_val.group_info[i];
                        }
                    }

                    let isCheckValue = pro_list.filter(item => item.id == that.$route.query.detailId);
                    that.pro_info = pro_info;
                    that.pro_Data = res;

                    that.pro_list = [...isCheckValue];
                })
                .catch(err => {
                    that.showLoading = false;
                    
                });
        },
        // 退换货说明
        payWayFlg() {
            this.instructions = true;
        },
        // 关闭说明弹窗
        closePayWayFlg() {
            this.instructions = false;
        },
        // 跳转售后提交页面
        changeJdAfter(type) {
            if (type == 1 && !this.tuihuoStatus) {
                //退货
                return false;
            }
            if (type == 2 && !this.huanhuoStatus) {
                //换货
                return false;
            }
            if (type == 4 && !this.weixiuStatus) {
                //维修
                return false;
            }
            this.$router.push({
                path: "/order/orderRelated/returnGoods",
                query: {
                    username: this.$route.query.username,
                    jdStatus: 1,
                    salesType: type,
                    detailId: this.$route.query.detailId,
                    orderId: this.$route.query.orderId
                }
            });
        }
    }
};
</script>

<style lang="scss">
@import "@/pages/order/assets/css/jdAfterType.scss";
</style>

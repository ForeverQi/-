<!--
 * @Author       : zhouqi
 * @description  : 评价列表
 * @Date         : 2020-12-06 20:37:10
 * @LastEditors  : zhouqi
 * @LastEditTime : 2020-12-21 18:50:57
 * @FilePath     : /vue-VFrontend/src/pages/order/views/orderRelated/evaluationList.vue
-->
<template>
    <section class="evaluationList-box">
        <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" />
        <section class="evaluationList" v-if="evaList != ''" :style="{ paddingBottom: page > pageCnt ? 0 : '' }">
            <Nav :numerical="12" :tips="evaList.tips" />
            <div class="wrapper">
                <div class="wrapper_c">
                    <div class="wrapper_bg">
                        <div class="wrapper_bg_c"></div>
                    </div>
                    <div class="Max_Center">
                        <!-- 头部开始 -->
                        <div class="tab_head">
                            <div @click="tabChange(0)" class="tab_head_li">
                                <div :style="{ fontWeight: tableValue == 0 ? 'bold' : '', fontSize: '0.28rem' }">
                                    {{ evaList.tips.daipingjia
                                    }}<span
                                        :style="{ background: bgcColor1 }"
                                        v-if="tableValue == 0"
                                        class="bottomXian"
                                    ></span>
                                </div>
                            </div>
                            <div @click="tabChange(1)" class="tab_head_li">
                                <div :style="{ fontWeight: tableValue == 1 ? 'bold' : '', fontSize: '0.28rem' }">
                                    {{ evaList.tips.yipingjia
                                    }}<span
                                        :style="{ background: bgcColor1 }"
                                        v-if="tableValue == 1"
                                        class="bottomXian"
                                    ></span>
                                </div>
                            </div>
                        </div>

                        <div class="order_list" v-if="orderList.length">
                            <div>
                                <div class="order_li" v-for="(item, index) in orderList" :key="index">
                                    <div class="order_top">
                                        <div class="shop_name">
                                            <div class="home_img" @click="shopMallFun(item.shops_user_id)">
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_home.png"
                                                />
                                            </div>

                                            <div class="home_txt" @click="shopMallFun(item.shops_user_id,item.shopsChannelId,item.shops_id)">
                                                {{ item.shops_name }}
                                            </div>
                                            <div class="arrow1" v-if="item.shops_user_id > 0">
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow1.png"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div v-for="(itemChild, indexChild) in item.pro_list" :key="'indexChild_'+indexChild">
                                        <div class="order_center" @click="goEvalution(item.order_id, itemChild.id)">
                                            <div class="order_money">
                                                <div class="money">
                                                    <span>{{ evaList.currency_symbol }}</span
                                                    >{{ itemChild.shiji_money_left
                                                    }}<span>.{{ itemChild.shiji_money_right }}</span>
                                                </div>
                                                <div class="Number">{{ itemChild.num_info }}</div>
                                            </div>
                                            <div class="order_name">
                                                <div class="shop_img"><img :src="itemChild.pic" /></div>
                                                <div class="shop_link">
                                                    <div class="shop_link_tit">{{ itemChild.name }}</div>
                                                    <div class="shop_link_txt">{{ itemChild.param_info }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="order_foot">
                                            <div
                                                @click="goEvaluation(0, item.order_id, itemChild.id)"
                                                class="navigator1"
                                                v-if="itemChild.button_type == 1"
                                            >
                                                <span>{{ evaList.tips.pingjiashaidan }}</span>
                                            </div>
                                            <div
                                                @click="goEvaluation(1, item.order_id, itemChild.id)"
                                                class="navigator1"
                                                v-if="itemChild.button_type == 2"
                                            >
                                                <span>{{ evaList.tips.zhuijiapingjia }}</span>
                                            </div>
                                        </div>
                                        <div class="order_border" v-if="item.pro_list.length - 1 != indexChild"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="footerBox" v-if="page > pageCnt">
                                <span>我也是有底线的~</span>
                            </div>
                        </div>
                        <div class="no_data" v-if="orderList.length == 0">
                            <div class="no_data_img">
                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_no_data1.png" />
                            </div>
                            <div class="no_data_txt" v-show="!showLoading">{{ evaList.tips.zanwukepingjiadingdan }}～</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
const { log } = console;
// vant组件
import Hint from "@/plugins/hint";
import util from "@/libs/util";

import { getProEvaluate } from "@/api/order/afterSales.js";

// 色系
import { getColor } from "@/api/order/submitOrder.js";
// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";
export default {
    components: {
        Nav
    },
    data() {
        return {
            page: 1,
            pageCnt: 0,
            type: 0,
            orderList: [],
            evaluate_list: [],
            tableValue: 0,
            evaList: "",
            bgcColor1: "",
            showLoading: true,
            bottomNum: 0
        };
    },
    mounted() {
        if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            return false;
        }
        this.getColorFun();
        let that = this,
            orderId = that.$route.query.orderId,
            detailId = that.$route.query.detailId,
            req = { type: 1 };
        that.orderId = orderId;
        that.detailId = detailId;
        that.req = req;
        if(that.$cookies.get("evaluation_state") == 1){
            that.type = that.$cookies.get("evaluation_state");
        }
        // if(that.$route.query.is_add){
        //     that.type = that.$route.query.is_add;
        // }
        that.tableValue = that.type;
        that.evaListFun(that.type);
    },
    methods: {
        // 评价列表
        evaListFun(type) {
            let that = this;
            that.showLoading = true;
            let jsonValue = {
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                state: type,
                page: that.page,
                client_type: 1
            };
            if (type == 0) {
                that.orderId ? (jsonValue.order_id = that.orderId) : "";
            }
            getProEvaluate(jsonValue)
                .then(res => {
                    that.showLoading = false;
                    let orderList = that.orderList;
                    orderList = orderList.concat(res.evaluate_list);

                    for (let i in orderList) {
                        for (let j in orderList[i].pro_list) {
                            let val = String(orderList[i].pro_list[j].pay_price);
                            let val_left = val.substring(0, val.indexOf("."));
                            let val_right = val.replace(/\d+\.(\d*)/, "$1");
                            orderList[i].pro_list[j].shiji_money_left = val_left;
                            orderList[i].pro_list[j].shiji_money_right = val_right;
                        }
                    }
                    that.evaList = res;
                    // that.evaluate_list = util.functions.ifHaveFun(orderList) ? orderList : false;

                    that.orderList = orderList;
                    that.pageCnt = res.page_cnt;
                    that.bottomNum = 1;
                    setTimeout(() => {
                        $(".evaluationList").scroll(function() {
                            let nScrollHight = $(this)[0].scrollHeight;
                            let nScrollTop = $(this)[0].scrollTop;
                            let nDivHight = $(this).height();
                            if (nScrollTop + nDivHight + 100 >= nScrollHight) {
                                if (that.page > that.pageCnt || that.bottomNum == 0 || !that.orderList.length) {
                                    return false;
                                }
                                that.bottomNum = 0;
                                that.page = that.page + 1;
                                that.evaListFun(that.type);
                            }
                        });
                    });
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Alert({
                        message: err.msg
                    }).then(() => {
                        window.history.back();
                    });
                });
        },

        // 色系接口
        getColorFun() {
            let that = this;
            getColor({ username: this.$route.query.username }).then(res => {
                that.bgcColor1 = util.functions.newColor(res.color).bgcColor1;
            });
        },

        goEvalution(orderId, detailId) {
            this.$router.push({
                path: "/order/orderRelated/aleryEvaList",
                query: {
                    username: this.$route.query.username,
                    orderId: orderId,
                    detailId: detailId
                }
            });
        },

        // 顶部切换
        tabChange(type) {
            this.tableValue = type;
            this.page = 1;
            this.orderList = [];
            this.type = type;
            this.evaListFun(type);
            this.$cookies.set("evaluation_state", type);
        },

        // 跳转评价页
        goEvaluation(type, orderId, detailId) {
            // type:0 未评价  type:1 已评价
            this.$router.push({
                path: "/order/orderRelated/evaluation",
                query: {
                    username: this.$route.query.username,
                    orderId: orderId,
                    detailId: detailId,
                    is_add: type,
                    evaList: 1,
                    orderIdUp: this.orderId
                }
            });
        },
        // 跳转商铺
        shopMallFun(id,shopsChannelId,shopsId) {
            if (id > 0) {
                location.href =
                    "//" +
                    document.domain +
                    `/wap/shops/shop.php?username=${this.$route.query.username}&channel_id=${shopsChannelId}&u_u_id=${id}&wap=1`;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/pages/order/assets/css/evaluationList.scss";
</style>

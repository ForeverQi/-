<!--
 * @Author       : zhouqi
 * @description  : 我的评价
 * @Date         : 2020-12-06 21:25:30
 * @LastEditors  : zhouqi
 * @LastEditTime : 2020-12-21 16:38:33
 * @FilePath     : /vue-VFrontend/src/pages/order/views/orderRelated/aleryEvaList.vue
-->
<template>
    <section class="aleryEvaList-box">
        <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" />
        <section class="aleryEvaList" v-if="aleryEva != ''">
            <Nav :numerical="13" :tips="aleryEva.tips" />
            <div class="wrapper">
                <div class="wrapper_c">
                    <div class="Max_Center">
                        <div class="order_list">
                            <div class="order_li">
                                <div class="order_top">
                                    <div class="shop_name">
                                        <div class="home_img" @click="shopMallFun">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_home.png"
                                            />
                                        </div>

                                        <div class="home_txt" @click="shopMallFun">{{ aleryEva.shops_name }}</div>
                                        <div class="arrow1"  v-if="aleryEva.shops_user_id > 0">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow1.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="order_center">
                                    <div class="order_money">
                                        <div class="money">
                                            <span>{{ aleryEva.currency_symbol }}</span
                                            >{{ aleryEva.pro_info.shiji_money_left
                                            }}<span>.{{ aleryEva.pro_info.shiji_money_right }}</span>
                                        </div>
                                        <div class="Number">{{ aleryEva.pro_info.num_info }}</div>
                                    </div>
                                    <div class="order_name">
                                        <div class="shop_img"><img :src="aleryEva.pro_info.pic" /></div>
                                        <div class="shop_link">
                                            <div class="shop_link_tit">{{ aleryEva.pro_info.name }}</div>
                                            <div class="shop_link_txt">{{ aleryEva.pro_info.param_info }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="order_foot" v-if="aleryEva.pro_info.button != ''">
                                    <div
                                        class="navigator1"
                                        @click="goEvaltion(0)"
                                        v-if="aleryEva.pro_info.button.type == 0"
                                    >
                                        <span>{{ aleryEva.pro_info.button.info }}</span>
                                    </div>
                                    <div
                                        class="navigator1"
                                        @click="goEvaltion(1)"
                                        v-if="aleryEva.pro_info.button.type == 1"
                                    >
                                        <span>{{ aleryEva.pro_info.button.info }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="evaluate" v-for="(item, index) in aleryEva.evaluate_info" :key="index">
                            <!-- 用户评价 -->
                            <div v-if="index == 0" style="border-top:1px solid #ededed;padding:0.25rem 0;">
                                <div class="evaluate_top">
                                    <div class="Stars_txt">{{ aleryEva.tips.xingji }}</div>
                                    <div class="Stars">
                                        <div
                                            class="Stars_li"
                                            v-for="(starItem, starIndex) in item.level"
                                            :key="'starIndex_'+starIndex"
                                        >
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_Stars_img1.png"
                                            />
                                        </div>

                                        <div
                                            class="Stars_li"
                                            v-for="(levelItem, levelIndex) in (5 - Number(item.level))"
                                            :key="'levelIndex_'+levelIndex"
                                        >
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_Stars_img2.png"
                                            />
                                        </div>
                                    </div>
                                    <div class="Stars_txt1">{{ item.input_time }}</div>
                                </div>
                                <div class="evaluate_txt">{{ item.content }}</div>
                                <div class="evaluate_img" v-if="item.pic_info.length">
                                    <div
                                        class="evaluate_img_li"
                                        v-for="(picItem, picIndex) in item.pic_info"
                                        :key="'picIndex_'+picIndex"
                                    >
                                        <img :src="picItem.pic" />
                                    </div>
                                </div>
                            </div>
                            <!-- 商家评价 -->
                            <div
                                v-if="index == 0 && item.reply_info != '' && item.reply_info != '{}'"
                                style="border-top:1px solid #ededed;padding:0.25rem 0;"
                            >
                                <div class="evaluate_top">
                                    <div class="Stars_txt">{{ aleryEva.tips.shangjiahuifu }}</div>
                                    <div class="Stars_txt1">{{ item.reply_info.input_time }}</div>
                                </div>
                                <div class="evaluate_txt">{{ item.reply_info.content }}</div>
                            </div>
                            <!-- 追评 -->
                            <div v-if="index == 1" style="border-top:1px solid #ededed;padding:0.25rem 0;">
                                <div class="evaluate_top">
                                    <div class="Stars_txt">{{ aleryEva.tips.xingji }}</div>
                                    <div class="Stars">
                                        <div
                                            class="Stars_li"
                                            v-for="(starLItem, starLIndex) in item.level"
                                            :key="'starLIndex_'+starLIndex"
                                        >
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_Stars_img1.png"
                                            />
                                        </div>

                                        <div
                                            class="Stars_li"
                                            v-for="(starRItem, starRIndex) in 5 - item.level"
                                            :key="'starRIndex_'+starRIndex"
                                        >
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_Stars_img2.png"
                                            />
                                        </div>
                                    </div>
                                    <div class="Stars_txt1">{{ item.input_time }}</div>
                                </div>
                                <div class="evaluate_txt">
                                    <span style="color:#f00;">【{{ aleryEva.tips.zhuiping }}】</span>{{ item.content }}
                                </div>
                                <div class="evaluate_img" v-if="item.pic_info.length">
                                    <div
                                        class="evaluate_img_li"
                                        v-for="(picItem, picIndex) in item.pic_info"
                                        :key="'picIndex_'+picIndex"
                                    >
                                        <img :src="picItem.pic" />
                                    </div>
                                </div>
                            </div>

                            <!-- 追评的商家评价 -->
                            <div
                                v-if="index == 1 && item.reply_info != '' && item.reply_info != '{}'"
                                style="border-top:1px solid #ededed;padding:0.25rem 0;"
                            >
                                <div class="evaluate_top">
                                    <div class="Stars_txt">{{ aleryEva.tips.shangjiahuifu }}</div>
                                    <div class="Stars_txt1">{{ item.reply_info.input_time }}</div>
                                </div>
                                <div class="evaluate_txt">{{ item.reply_info.content }}</div>

                                <!-- <div class="evaluate_img" v-if="item.pic_info.length}}">
                                    <div class="evaluate_img_li" v-for="item.pic_info}}" wx:for-item="{{picItem}}" wx:for-index="{{picIndex}}" :key="picIndex"><img  :src="picItem.pic}}">
                                    </div>
                                </div> -->
                            </div>
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

import { getEvaluateInfo } from "@/api/order/afterSales.js";

// 订单详情
import { getOrderDetail } from "@/api/order/orderDetail.js";

// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";
export default {
    components: {
        Nav
    },
    data() {
        return {
            aleryEva: "",
            showLoading: true
        };
    },
    mounted() {
        if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            return false;
        }
        let orderId = this.$route.query.orderId,
            detailId = this.$route.query.detailId,
            req = { type: 3 };
        this.orderId = orderId;
        this.detailId = detailId;

        this.aleryEvaFun(orderId, detailId, JSON.stringify(req));
    },
    methods: {
        aleryEvaFun(orderId, detailId, req) {
            let that = this;
            let jsonParam = {
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                order_id: orderId,
                detail_id: detailId,
                req: req,
                client_type: 1
            };
            getEvaluateInfo(jsonParam)
                .then(res => {
                    that.showLoading = false;
                    let aleryEvaValue = res,
                        val = aleryEvaValue.pro_info.price,
                        val_left = val.substring(0, val.indexOf(".")),
                        val_right = val.replace(/\d+\.(\d*)/, "$1");
                    aleryEvaValue.pro_info.shiji_money_left = val_left;
                    aleryEvaValue.pro_info.shiji_money_right = val_right;
                    that.aleryEva = aleryEvaValue;
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

        goEvaltion(type) {
            this.$router.push({
                path: "/order/orderRelated/evaluation",
                query: {
                    username: this.$route.query.username,
                    orderId: this.orderId,
                    detailId: this.detailId,
                    is_add: type,
                    aleryValue: 1
                }
            });
        },
         // 跳转商铺
        shopMallFun() {
            if (this.aleryEva.shops_user_id > 0) {
                location.href =
                    "//" +
                    document.domain +
                    `/wap/shops/shop.php?username=${this.$route.query.username}&channel_id=${this.aleryEva.shopsChannelId}&u_u_id=${this.aleryEva.shops_user_id}&wap=1`;
            }
        }
    }
};
</script>

<style lang="scss">
@import "@/pages/order/assets/css/aleryEvaList.scss";
</style>

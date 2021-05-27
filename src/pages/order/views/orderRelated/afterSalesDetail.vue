<!--
 * @Author       : zhouqi
 * @description  : description
 * @Date         : 2020-12-01 17:33:54
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-03-18 19:31:47
 * @FilePath     : /vue-VFrontend/src/pages/order/views/orderRelated/afterSalesDetail.vue
-->
<template>
    <div
        class="afterSales-box"
        v-if="salesDetail != ''"
        v-wechat-title="($route.meta.title = salesDetail.tips.shouhouxiangxi)"
    >
        <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" />
        <Nav :numerical="7" :tips="salesDetail.tips" />
        <div class="mYAfterSales">
            <div class="salesDetails">
                <div class="salesDetails_top" :style="{ background: bgcColor1 }">
                    <div class="salesDetails_top_content">
                        <!-- 横线 -->
                        <div class="hengLine"></div>
                        <div class="salesDetails_text" v-for="(item, index) in salesDetail.head_info" :key="index">
                            <div>
                                <i
                                    v-if="item.is_check == 1"
                                    :style="{
                                        color: bgcColor1 + '!important',
                                        transform: phoneModel == 'ios' ? 'translate(-0.04rem,-0.1rem)' : ''
                                    }"
                                    class="iconImage iconfont icon-duihao"
                                ></i>
                            </div>
                            <span class="noneOpacity">{{ item.name }}</span>
                        </div>
                    </div>
                </div>

                <div class="salesDetails_content">
                    <!-- 退款进度 -->
                    <div class="salesDetails_progress">
                        <div class="salesDetails_progress_top">
                            <span>{{ salesDetail.tips.jiaoyidingdanhao }}：{{ salesDetail.order_id }}</span>
                            <span>{{ salesDetail.tips.tuihuanhuohao }}：{{ salesDetail.return_id }}</span>
                        </div>
                        <!-- 供应链 -->
                        <div class="salesDetails_progress_bottom" v-if="resultJson != ''">
                            <!-- <div class="progress_left">
                                <div class="refundHengxian"></div>
                                <div
                                    style="margin-bottom:1.6rem;"
                                    v-for="(item, index) in upAsContent.serviceTrackInfoDTOs"
                                    :key="index"
                                    :class="index == 0 ? 'changeRefund' : ''"
                                ></div>
                            </div> -->
                            <div class="progress_right">
                                <!-- <div class="refundHengxian"></div> -->
                                <div class="progress_refund" v-for="(item, index) in upAsContent.serviceTrackInfoDTOs" :key="index">
                                    <div class="pr_child" ></div>
                                    <em :class="index == 0 ? 'changeRefund' : ''"></em>
                                    <span style="margin-bottom:0.1rem;display:inline-block;color:#222;line-height:1;">{{item.title}}</span>
                                    <span>{{ item.createDate }}</span>
                                    <span>{{ item.context }}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 非供应链 -->
                        <div class="salesDetails_progress_bottom" v-else>
                            <!-- <div class="progress_left">
                                <div class="refundHengxian"></div>
                                <div
                                    v-for="(item, index) in salesDetail.return_progress"
                                    :key="index"
                                    :class="index == 0 ? 'changeRefund' : ''"
                                ></div>
                            </div> -->
                            <!-- <div class="progress_right">
                                <div v-for="(item, index) in salesDetail.return_progress" :key="index">
                                    <span>{{ item.input_time }}</span>
                                    <span>{{ item.description }}</span>
                                </div>
                            </div> -->
                            <div class="progress_right">
                                <!-- <div class="refundHengxian"></div> -->
                                <div class="progress_refund" v-for="(item, index) in salesDetail.return_progress" :key="index">
                                    <div class="pr_child" ></div>
                                    <em :class="index == 0 ? 'changeRefund' : ''"></em>
                                    <span style="margin-bottom:0.1rem;display:inline-block;color:#222;line-height:1;">{{item.title}}</span>
                                    <span>{{ item.input_time }}</span>
                                    <span>{{ item.description }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 应退总额 -->
                    <div class="refund_amount" v-if="salesDetail.refund_pro_info.pro_list.length">
                        <div class="refund_amount_top">
                            <span>{{ salesDetail.refund_pro_info.title }}</span>
                            <span v-if="salesDetail.server_type != 2"
                                >{{ salesDetail.currency_symbol }}{{ salesDetail.refund_pro_info.refund_money }}</span
                            >
                        </div>
                        <div class="refund_amount_bottom">
                            <div
                                class="refund_amount_bottom_content"
                                v-for="(item, index) in salesDetail.refund_pro_info.pro_list"
                                :key="index"
                            >
                                <div class="refund_amount_content_left">
                                    <img :src="item.pic" />
                                </div>
                                <div class="refund_amount_content_right">
                                    <div class="refund_amount_content_rightTitleFath">
                                        <div class="refund_amount_content_rightTitle">{{ item.name }}</div>
                                        <span>{{ item.param_info }}</span>
                                    </div>
                                    <div class="refund_amount_content_rightBottom">
                                        <span>{{ salesDetail.tips.shuliang }}：{{ item.num }}</span>
                                        <span
                                            >{{ salesDetail.tips.shifudanjia }}：<span
                                                style="font-weight:bold;font-size:0.24rem;color:rgba(34,34,34,1);"
                                                >{{ salesDetail.currency_symbol }}{{ item.single_price }}</span
                                            ></span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 退款详情 -->
                    <div class="refundDetail" v-if="salesDetail.refund_amount_info.refund_detail.length">
                        <div class="refund_amount_top">
                            <span>{{ salesDetail.refund_amount_info.title }}</span>
                        </div>
                        <div class="refundDetail_content">
                            <div
                                class="refundDetail_content_child"
                                v-for="(item, index) in salesDetail.refund_amount_info.refund_detail"
                                :key="index"
                            >
                                <div class="refundDetail_content_left">
                                    {{ item.name }}
                                </div>
                                <div
                                    class="refundDetail_content_right"
                                    style="flex-direction: column;"
                                    v-if="item.type == 6"
                                >
                                    <div
                                        style="margin-bottom:0.1rem;"
                                        v-for="(valItem, valIndex) in item.val"
                                        :key="valIndex"
                                    >
                                        <span>{{ valItem.name }}：</span><span>{{ valItem.val }}</span>
                                    </div>
                                </div>
                                <div class="refundDetail_content_right" v-else>
                                    <span v-if="item.type == 1 && salesDetail.return_stat > 0">{{
                                        salesDetail.currency_symbol
                                    }}</span
                                    >{{ item.val }}
                                    <span
                                        style="color:#999999;margin-left:0.1rem;"
                                        v-if="(item.type == 1 || item.type == 2) && salesDetail.return_stat > 0"
                                    >
                                        ({{ salesDetail.tips.yihuitui }})</span
                                    >
                                    <span
                                        style="color:#999999;margin-left:0.1rem;"
                                        v-if="item.type == 4 && salesDetail.return_stat > 0"
                                    >
                                        ({{ salesDetail.tips.yikouchu }})</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 退货信息-->
                    <div class="refundDetail" v-if="salesDetail.return_detail.info.length">
                        <div class="refund_amount_top">
                            <span>{{ salesDetail.return_detail.title }}</span>
                        </div>
                        <div class="refundDetail_content">
                            <div
                                class="refundDetail_content_child"
                                v-for="(item, index) in salesDetail.return_detail.info"
                                :key="index"
                            >
                                <div class="refundDetail_content_left">
                                    {{ item.name }}
                                </div>
                                <div class="refundDetail_content_right" v-if="item.type == 0">
                                    {{ item.val }}
                                </div>
                                <!-- 联系人信息 -->
                                <div
                                    class="refundDetail_content_right"
                                    style="flex-direction: column;"
                                    v-if="item.type == 1 || item.type == 3"
                                >
                                    <section v-if="item.val != []">
                                        <div
                                            style="margin-bottom:0.1rem;"
                                            v-for="(textItem, textIndex) in item.val"
                                            :key="textIndex"
                                        >
                                            <span>{{ textItem.name }}：</span>
                                            <span>{{ textItem.val }}</span>
                                        </div>
                                    </section>
                                    <div v-else>-</div>
                                </div>
                                <!-- 图片 -->
                                <div class="refundDetail_content_right" v-if="item.type == 2">
                                    <section
                                        v-if="
                                            item.val != undefined &&
                                                item.val != '' &&
                                                item.val != null &&
                                                item.val != '{}'
                                        "
                                    >
                                        <div
                                            class="refundImage"
                                            v-for="(picItem, picIndex) in item.val"
                                            :key="picIndex"
                                        >
                                            <img :src="picItem" />
                                        </div>
                                    </section>
                                    <section v-else>-</section>
                                </div>
                                <div v-if="item.type == 666" style="color:#f00;font-size:0.26rem;">
                                    {{ item.val }}
                                    <p>请将该编号写于纸上和商品一同寄回</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 底部按钮 -->
                <div class="footer_info" @click="submitBtn(button_info.type)" v-if="button_info">
                    <div :style="{ background: bgcColor1 }">{{ button_info.name }}</div>
                </div>
            </div>
            <!-- 蒙版 -->
            <div class="mengban" v-if="customState" @click="customClose"></div>
            <!-- 商品返回物流信息弹窗 -->
            <div class="shopCustom_box" v-if="customState">
                <div class="shopCustom">
                    <div class="shopCustom_top">
                        <div class="shopCustom_top_left">
                            <span>{{ salesDetail.return_tracking.name }}</span>
                        </div>
                        <div class="shopCustom_top_right" @click="customClose">
                            <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/videoDengluclose.png" />
                        </div>
                    </div>
                    <div class="shopCustom_center">
                        <span>{{ salesDetail.tips.jiangshangpinfanhuigeishangjiadewuliuxinxi }}</span>
                        <textarea
                            :placeholder="salesDetail.tips.qingshuruwuliudanhaohewuliugongsimingcheng"
                            :value="return_tracking"
                            @input="trackInput($event.target.value)"
                            v-if="jdStatus != 1"
                        ></textarea>
                        <div v-else>
                            <input
                                type="text"
                                v-model="kd_val"
                                :disabled="button_info && button_info.type == 1 ? true : false"
                                placeholder="请输入快递公司"
                            />
                            <input
                                type="text"
                                v-model="dh_val"
                                :disabled="button_info && button_info.type == 1 ? true : false"
                                placeholder="请输入物流单号"
                            />
                        </div>
                    </div>
                    <div :style="{ background: bgcColor1 }" class="shopCustom_btn" @click="customBtn">
                        <span>{{ salesDetail.tips.queding }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const { log } = console;
// vant组件
import Hint from "@/plugins/hint";
import util from "@/libs/util";
// 色系
import { getColor } from "@/api/order/submitOrder.js";

import { getReturnsDetail, getUserReturnsApplication, ServiceDetailInfo } from "@/api/order/afterSales.js";
// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";
export default {
    components: {
        Nav
    },
    data() {
        return {
            bgcColor1: "",
            salesDetail: "",
            customState: false,
            resultJson: "",
            showLoading: true,
            jdStatus: 0,
            phoneModel: "",
            kd_val: "",
            dh_val: "",
            button_info: ""
        };
    },
    created() {
        // this.$cookies.set("zz_userid","24423335")
        // if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
        //     location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
        //     return false;
        // }
    },
    mounted() {
        let that = this;
        if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            return false;
        }
        this.getColorFun();
        that.idValue = that.$route.query.id;
        that.jdStatus = that.$route.query.jdStatus;
        that.phoneModel = util.functions.appSource();
        // 售后详情
        that.salesDetailFun(that.$route.query.id);
        if (that.$route.query.jdStatus == 1) {
            // 供应链售后详情
            // that.jdDetailFun(that.$route.query.id);
        }
    },
    methods: {
        // 售后详情接口
        salesDetailFun(id) {
            let that = this;
            let paramJson = {
                id: id,
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid")
            };
            getReturnsDetail(paramJson)
                .then(res => {
                    that.showLoading = false;
                    that.salesDetail = res;
                    that.button_info = util.functions.ifHaveFun(res.button_info) ? res.button_info : false;
                    that.return_tracking = res.return_tracking.val;

                    that.resultJson = util.functions.ifHaveFun(res.supply_chain_info) ? res.supply_chain_info : "";
                    that.upAsContent =
                        util.functions.ifHaveFun(res.supply_chain_info) &&
                        util.functions.ifHaveFun(res.supply_chain_info.upAsContent)
                            ? res.supply_chain_info.upAsContent
                            : "";
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Alert({
                        message: err.msg
                    }).then(() => {
                        // window.history.back();
                        that.$router.replace({
                            path: "/order/orderRelated/afterSalesList",
                            query: {
                                username: that.$route.query.username
                            }
                        });
                        this.$cookies.set("afterSales_state", 0);
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
        // 确认
        customBtn() {
            let req = {};
            req.return_id = this.idValue;
            req.type = 2;
            req.tracking_no = this.return_tracking;

            if (this.jdStatus == 1 && this.button_info) {
                if (!util.functions.ifHaveFun(this.kd_val)) {
                    Hint.Msg({
                        message: "请输入快递公司"
                    });
                    return false;
                }
                if (!util.functions.ifHaveFun(this.dh_val)) {
                    Hint.Msg({
                        message: "请输入物流单号"
                    });
                    return false;
                }
                req.expressCompany = this.kd_val;
                req.expressCode = this.dh_val;
                req.is_JD = 1;
            }
            this.returnGoods(req);
            this.customState = false;
        },
        // 查看物流信息按钮
        submitBtn() {
            this.customState = true;
        },
        customClose() {
            this.customState = false;
        },
        // 退换货详情接口
        returnGoods(req) {
            let that = this;
            let paramJson = {};
            paramJson.req = JSON.stringify(req);
            paramJson.username = that.$route.query.username;
            paramJson.zz_userid = that.$cookies.get("zz_userid");
            paramJson.client_type = 1;
            that.showLoading = true;
            getUserReturnsApplication(paramJson)
                .then(res => {
                    that.salesDetailFun(that.idValue);
                    that.showLoading = false;
                })
                .catch(err => {
                    that.showLoading = false;
                });
        },

        trackInput(value) {
            this.return_tracking = value;
        },
        // 京东售后详情接口
        jdDetailFun(id) {
            let that = this;
            let paramJson = {
                returnOrderNo: id,
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid")
            };
            ServiceDetailInfo(paramJson)
                .then(res => {
                    that.showLoading = false;
                    that.result_code = res.result_code;
                    that.resultJson = util.functions.ifHaveFun(res.result) ? res.result : "";
                    that.upAsContent =
                        util.functions.ifHaveFun(res.result) && util.functions.ifHaveFun(res.result.upAsContent)
                            ? res.result.upAsContent
                            : "";
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Alert({
                        message: res.msg
                    }).then(() => {
                        window.history.back();
                    });
                });
        }
    }
};
</script>

<style lang="scss">
@import "@/pages/order/assets/css/afterSalesDetail.scss";
</style>

<style lang="css">
@import "../../../../assets/fonts/order/duihao/iconfont.css";
</style>

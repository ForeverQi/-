<!--
 * @Author       : zhouqi
 * @description  : description
 * @Date         : 2020-11-13 11:15:33
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-06-05 14:13:44
 * @FilePath     : /vue-VFrontend/src/pages/order/components/popup.vue
-->
<template>
    <section class="popupBox_active">
        <section class="popup">
            <van-loading v-if="showLoading" size="50px" color="#1989fa" />
            <van-overlay :show="showLoading" />
            <!-- 支付卡 -->
            <CustomPopup v-if="popupParam.num == 1" ref="zhifuka" @closeZhifukaFun="closePayWay(1)">
                <div slot="PoperContent" class="changeCityClass">
                    <div class="changeCityBox" v-if="payWayData != ''">
                        <div class="changeCityBox_top" style="border-bottom:0;">
                            <div class="changeCityBox_top_left changeCityBox_top_left_heng">
                                <span>{{ payWayData.la.cardName }}</span>
                                <!-- <span class="allShopChildren">{{ shop_jianshu }}</span> -->
                            </div>
                            <div class="changeCityBox_top_right" @click="closePayWay(1)">
                                <div class="weixinAdress_closeIcon">
                                    <span class="weixinAdress_closeIcon_left"></span>
                                    <span class="weixinAdress_closeIcon_right"></span>
                                </div>
                            </div>
                        </div>
                        <!-- 有支付卡 -->
                        <div v-if="payWayData.paymentCardInfo.length">
                            <div
                                @click="operationCard(1)"
                                class="binding_new"
                                style="padding-top:0.1rem;padding-bottom:0.3rem;"
                            >
                                <div class="binding_left"></div>
                                <p>{{ payWayData.la.bangdingxinde + payWayData.la.cardName }}</p>
                            </div>
                            <div
                                class="changeCityBox_content"
                                style="background-color:#F6F6F6;padding: 0.2rem 0.25rem;"
                            >
                                <div class="zhifuka" id="payCardId">
                                    <div
                                        class="zhifuka_child"
                                        v-for="(item, index) in paymentCardInfo"
                                        :key="index"
                                        @click="changePayCard(index)"
                                    >
                                        <div class="zhifuka_child_left">
                                            {{ popupParam.CurrencySymbol
                                            }}<span style="font-size:0.58rem;font-weight:bold;">{{
                                                item.card_money_json.left
                                            }}</span>
                                            <span style="font-size:0.4rem;" v-if="item.card_money_json.right"
                                                >.{{ item.card_money_json.right }}</span
                                            >
                                        </div>
                                        <div class="zhifuka_child_center">
                                            <span>{{ item.card_number }}</span>
                                            <span>{{ payWayData.la.youxiaoqizhi }}：{{ item.end_time }}</span>
                                        </div>
                                        <div class="zhifuka_child_right">
                                            <div class="customFrom_content_ridao">
                                                <div
                                                    :class="
                                                        item.is_check == 1
                                                            ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                            : 'shoppingContent_radio'
                                                    "
                                                    :style="{
                                                        background:
                                                            item.ifChange == 0 && item.is_check != 1
                                                                ? '#ccc !important'
                                                                : item.is_check == 1
                                                                ? bgcColor1 + '!important'
                                                                : '',
                                                        borderColor:
                                                            item.is_check == 1
                                                                ? bgcColor1
                                                                : 'rgb(204, 204, 204) !important'
                                                    }"
                                                >
                                                    <img
                                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                        alt="check"
                                                        v-if="item.is_check == 1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 没有支付卡 -->
                        <div class="changeCityBox_content" v-else>
                            <div class="changeCityBox_content_noValueBox">
                                <div class="changeCityBox_content_noValue payCard_noCard">
                                    <img
                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/submit_envelopeOrder.png"
                                        alt="城市"
                                    />
                                    <span class="openPermissions" style="margin-bottom:0.56rem;">{{
                                        payWayData.la.ninhaimeiyoukeyongde + payWayData.la.cardName
                                    }}</span>
                                    <div class="binding_new" @click="operationCard(1)">
                                        <div class="binding_left"></div>
                                        <p>{{ payWayData.la.bangdingxinde + payWayData.la.cardName }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="PoperContentBtn" :style="{ color: bgcColor1 }" @click="closePayWay(1)">
                        {{ cluesData.queren }}
                    </div>
                </div>
            </CustomPopup>
            <!-- 绑定支付卡 -->
            <div
                class="bindingCard"
                v-if="Edit.card && popupParam.num == 1"
                :style="{ height: payWayData.needCardNum != 0 ? '5.5rem' : '4.5rem' }"
            >
                <p>{{ payWayData.la.bangding + payWayData.la.cardName }}</p>
                <div class="bindingCard-content">
                    <div class="bindingCard-child" v-if="payWayData.needCardNum != 0">
                        <span>{{ cluesData.qingshuru + payWayData.la.cardName + payWayData.la.kahao }}</span>
                        <input type="text" v-model="kaNumber" />
                    </div>
                    <div class="bindingCard-child">
                        <span>{{ cluesData.qingshuru + payWayData.la.cardName + payWayData.la.mima }}</span>
                        <input type="password" v-model="kaPwd" />
                    </div>
                </div>
                <div class="bindingCard-bottom">
                    <div @click="operationCard(2)">
                        {{ payWayData.la.quxiao }}
                    </div>
                    <div @click="bindPayCardFun()">
                        {{ payWayData.la.lijibangding }}
                    </div>
                </div>
            </div>
            <!-- 阴影蒙版 -->
            <div @click="closeYy" class="yinying" v-if="Edit.yinying"></div>

            <!-- 支付方式 -->
            <CustomPopup ref="payWay" class="payWay" v-if="popupParam.num == 2" @closePayMyWayFun="closePayWay(2)">
                <div slot="PoperContent" class="changeCityClass">
                    <div class="changeCityBox">
                        <div class="changeCityBox_top" style="border-bottom:0;padding-bottom:0.2rem;">
                            <div class="changeCityBox_top_left changeCityBox_top_left_heng">
                                <span>{{ cluesData.querenzhifu }}</span>
                            </div>
                            <div class="changeCityBox_top_right" @click="closePayWay(2)">
                                <div class="weixinAdress_closeIcon">
                                    <span class="weixinAdress_closeIcon_left"></span>
                                    <span class="weixinAdress_closeIcon_right"></span>
                                </div>
                            </div>
                        </div>
                        <div
                            class="changeCityBox_content"
                            style="padding-bottom:0.2rem;overflow-y:scroll;height:6.6rem;"
                        >
                            <div
                                class="payWay-child-father"
                                v-for="(item, index) in onlineList"
                                :key="index"
                                :class="item.is_check == 1 ? ' pc-active' : ''"
                            >
                                <div
                                    class="payWay-child"
                                    @click="
                                        changeWay(
                                            index,
                                            item.is_huabei == 1 && (item.pay_id == 12 || item.pay_id == 27)
                                        )
                                    "
                                >
                                    <div class="payWay-left">
                                        <img :src="url + item.img" alt="" />
                                    </div>
                                    <div class="payWay-center">
                                        <p>
                                            {{ item.name
                                            }}<span
                                                v-if="item.is_huabei == 1 && (item.pay_id == 12 || item.pay_id == 27)"
                                                >{{ item.hbName }}</span
                                            >
                                        </p>
                                        <p v-html="item.payment_brief"></p>
                                    </div>
                                    <div class="payWay-right">
                                        <div
                                            :class="
                                                item.is_check
                                                    ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                    : 'shoppingContent_radio'
                                            "
                                            :style="{
                                                background: false
                                                    ? '#ccc'
                                                    : item.is_check
                                                    ? bgcColor1
                                                    : '' + '!important',
                                                borderColor: item.is_check ? bgcColor1 : '' + '!important'
                                            }"
                                        >
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                alt="check"
                                                v-if="item.is_check"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="payWayBtn" :style="{ color: bgcColor1 }" @click="payFun()">
                        <div class="payWayBtn_text">
                            {{ cluesData.lijizhifu }}
                        </div>
                    </div>
                </div>
            </CustomPopup>
            <!-- 花呗分期 -->
            <CustomPopup ref="huabeiHight" class="payWay" v-if="huabeiStatus" @closeHuabeiFun="closePayWay(3)">
                <div slot="PoperContentHigh" class="changeCityClass">
                    <div class="changeCityBox">
                        <div class="changeCityBox_top" style="border-bottom:0;padding-bottom:0.2rem;">
                            <div class="changeCityBox_top_left changeCityBox_top_left_heng">
                                <span>{{ cluesData.qingxuanze }}</span>
                            </div>
                            <div class="changeCityBox_top_right" @click="closePayWay(3)">
                                <div class="weixinAdress_closeIcon">
                                    <span class="weixinAdress_closeIcon_left"></span>
                                    <span class="weixinAdress_closeIcon_right"></span>
                                </div>
                            </div>
                        </div>
                        <div class="distribution_content">
                            <div class="distribution_content_stores_List">
                                <!-- 不分期，3期，6期，12期 -->
                                <div
                                    class="distribution_content_stores_ListValue"
                                    v-for="(item, index) in stagingInfo"
                                    :key="index"
                                    @click="selectHuabei(index, item.who_pay_fee, item.single, item.no)"
                                >
                                    <div class="distribution_content_stores_ListTop">
                                        <div class="distribution_ListTop_right">
                                            <div
                                                :class="
                                                    item.is_check
                                                        ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                        : 'shoppingContent_radio'
                                                "
                                                :style="{
                                                    background: item.is_check ? bgcColor1 : '',
                                                    borderColor: item.is_check ? bgcColor1 : '' + '!important'
                                                }"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                    alt="check"
                                                    v-if="item.is_check"
                                                />
                                            </div>
                                        </div>
                                        <div class="distribution_ListTop_left" v-if="index > 0">
                                            <span v-if="item.who_pay_fee > 0"
                                                ><span v-if="item.single > 0">{{ item.single }}*</span>{{ index }}
                                                {{ cluesData.qi }}</span
                                            >
                                            <span v-else
                                                ><span v-if="item.no > 0">{{ item.no }}*</span>{{ index }}
                                                {{ cluesData.qi }}</span
                                            >
                                        </div>
                                        <div class="distribution_ListTop_left" v-else>
                                            <span>{{ cluesData.bufenqi }}</span>
                                        </div>
                                    </div>
                                    <div
                                        class="distribution_content_stores_ListBottom"
                                        style="color:#222;"
                                        v-if="index > 0"
                                    >
                                        <span v-if="item.who_pay_fee > 0"
                                            >{{ cluesData.fenqifei }}{{ item.interest }}/{{ cluesData.qi }}，{{
                                                cluesData.qi
                                            }}：{{ item.zongji }}</span
                                        >
                                        <span v-else>{{ cluesData.mianxiwufuwufei }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="PoperContentBtn"
                        :style="{ color: bgcColor1 }"
                        @click="closePayWay(3)"
                        v-if="onlineList.length"
                    >
                        {{ cluesData.queren }}
                    </div>
                    <div class="payWayBtn" :style="{ color: bgcColor1 }" @click="payFun()" v-else>
                        <div class="payWayBtn_text">
                            {{ cluesData.lijizhifu }}
                        </div>
                    </div>
                </div>
            </CustomPopup>
        </section>
    </section>
</template>

<script>
const { log } = console;
// vant组件
import Hint from "@/plugins/hint";
// 弹窗插槽组件
import CustomPopup from "@/components/CustomPopup/custompopup.vue";
// 用户支付信息、绑定支付卡
import { getPaymentCardInfo, bindPayCard } from "@/api/order/submitOrder.js";
import util from "@/libs/util";
export default {
    props: {
        popupParam: {
            type: Object
        },
        cluesData: {
            // type: (prop) => typeof prop === "object" || prop === null,
        },
        CurrencySymbol: {
            type: String,
            default: "￥"
        },
        onlineArr: {
            type: Array,
            default: []
        }
    },
    components: {
        CustomPopup
    },
    data() {
        return {
            bgcColor1: "#f00",
            Edit: {
                yinying: false, //阴影
                card: false, //支付卡
                pay: false //支付方式
            },
            showLoading: false,
            // 支付卡页码
            wayPage: 1,
            payWayData: "",
            // 支付卡列表
            paymentCardInfo: [],
            cardId: 0,
            // 支付卡号
            kaNumber: "",
            // 支付卡密码
            kaPwd: "",
            changeArr: [],
            url: location.origin,
            // url: "http://m.evyun.cn",
            payMentmentsId: 0,
            huabeiStatus: false, //花呗分期是否显示
            huabei: "不分期",
            stagingInfo: {},
            payIndex: 0,
            onlineList: []
        };
    },
    mounted() {
        this.bgcColor1 = this.popupParam.bgcColor1;
    },
    methods: {
        /**
         * @Date: 2020-11-13 11:23:34
         * @LastEditors: zhouqi
         * @description: 打开支付卡
         * @param {*}
         * @return {*}
         */

        openZfk() {
            this.getPaymentCardInfoFun();
        },
        /**
         * @Date: 2020-11-13 18:39:17
         * @LastEditors: zhouqi
         * @description: 关闭弹窗
         * @param {type} 1:支付卡，2：支付方式 3：花呗分期
         * @return {*}
         */

        closePayWay(type) {
            if (type == 1) {
                let changeArr = this.paymentCardInfo.filter(item => item.is_check == 1);
                this.$refs.zhifuka.maskClickHidden();
                this.changeArr = changeArr;
                this.$emit("payCard", changeArr);
            } else if (type == 2) {
                this.$refs.payWay.maskClickHidden();
            } else if (type == 3) {
                this.$refs.huabeiHight.maskClickHidden();
                if (!this.$util.functions.ifHaveFun(this.onlineList)) {
                    this.Edit.yinying = false;
                }
            }
        },
        /**
         * @Date: 2020-11-13 18:39:03
         * @LastEditors: zhouqi
         * @description: 支付卡绑定取消
         * @param {*}  {type}1:显示添加支付卡,2:关闭支付卡
         * @return {*}
         */
        operationCard(type) {
            if (type == 1) {
                this.Edit.yinying = true;
                this.Edit.card = true;
            } else if (type == 2) {
                this.Edit.yinying = false;
                this.Edit.card = false;
            }
        },
        /**
         * @Date: 2020-11-16 10:59:28
         * @LastEditors: zhouqi
         * @description: 支付方式选择
         * @param {*}
         * @return {*}
         */
        payWayFun() {
            let that = this;
            that.onlineList = that.onlineArr;
            // if (that.$util.functions.ifHaveFun(that.popupParam.payment_info_id)) {
            // 有数据时 代表有可选支付方式
            if (that.$util.functions.ifHaveFun(that.onlineList)) {
                for (let i in that.onlineList) {
                    that.onlineList[i].hbName = "不分期";
                    if (that.onlineList[i].id == that.popupParam.payment_info_id) {
                        that.onlineList[i].is_check = 1;
                    } else {
                        that.onlineList[i].is_check = 0;
                    }
                    if (that.$util.functions.ifHaveFun(that.popupParam.stagingInfo)) {
                        that.onlineList[i].stagingInfo = that.popupParam.stagingInfo;
                        that.onlineList[i].stagingInfo[0] = { name: "不分期" };
                        for (let j in that.onlineList[i].stagingInfo) {
                            that.onlineList[i].stagingInfo[j].is_check = 0;

                            if (
                                that.$util.functions.ifHaveFun(that.popupParam.huabeiKey) ||
                                that.popupParam.huabeiKey == 0
                            ) {
                                that.onlineList[i].stagingInfo[that.popupParam.huabeiKey].is_check = 1;
                                if (that.onlineList[i].stagingInfo[that.popupParam.huabeiKey].who_pay_fee > 0) {
                                    that.onlineList[i].hbName =
                                        (that.popupParam.huabeiKey > 0
                                            ? that.onlineList[i].stagingInfo[that.popupParam.huabeiKey].single > 0
                                                ? that.onlineList[i].stagingInfo[that.popupParam.huabeiKey].single +
                                                  "*" +
                                                  that.popupParam.huabeiKey
                                                : that.popupParam.huabeiKey
                                            : "不分") + "期";
                                } else {
                                    that.onlineList[i].hbName =
                                        (that.popupParam.huabeiKey > 0
                                            ? that.onlineList[i].stagingInfo[that.popupParam.huabeiKey].no > 0
                                                ? that.onlineList[i].stagingInfo[that.popupParam.huabeiKey].no +
                                                  "*" +
                                                  that.popupParam.huabeiKey
                                                : that.popupParam.huabeiKey
                                            : "不分") + "期";
                                }
                            } else {
                                that.onlineList[i].stagingInfo[0].is_check = 1;
                            }
                        }
                    }
                }
            } else {
                //无数据时是直接弹出花呗分期
                that.huabeiStatus = true;
                if (that.$util.functions.ifHaveFun(that.popupParam.stagingInfo)) {
                    that.stagingInfo = that.popupParam.stagingInfo;
                    that.stagingInfo[0] = { name: "不分期" };
                    for (let j in that.stagingInfo) {
                        that.stagingInfo[j].is_check = 0;
                        if (
                            that.$util.functions.ifHaveFun(that.popupParam.huabeiKey) ||
                            that.popupParam.huabeiKey == 0
                        ) {
                            that.stagingInfo[that.popupParam.huabeiKey].is_check = 1;
                        } else {
                            that.stagingInfo[0].is_check = 1;
                        }
                    }
                }
                setTimeout(() => {
                    that.Edit.yinying = true;
                    that.$refs.huabeiHight.showCustomZindex();
                }, 100);
                return false;
            }
            // }
            setTimeout(() => {
                that.$forceUpdate();
                that.$refs.payWay.showCustom();
            });
        },

        /**
         * @Date: 2020-11-16 15:48:36
         * @LastEditors: zhouqi
         * @description: 支付卡信息
         * @param {type} 1:添加支付卡
         * @return {*}
         */

        getPaymentCardInfoFun(type) {
            const that = this;
            that.showLoading = true;
            const paramsJson = {
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                pages: that.wayPage
            };
            getPaymentCardInfo(paramsJson)
                .then(res => {
                    that.showLoading = false;
                    that.$refs.zhifuka.showCustom();
                    that.payWayData = res;
                    let paymentCardInfo2 = res.paymentCardInfo,
                        money = 0,
                        paymentCardInfo = that.paymentCardInfo;
                    for (let i in paymentCardInfo) {
                        if (paymentCardInfo[i].is_check == 1) {
                            money = money + Number(paymentCardInfo[i].money);
                        }
                    }
                    if (type == 1) {
                        let addPay = paymentCardInfo2[paymentCardInfo2.length - 1];
                        addPay.is_check = 0;
                        if (money < that.popupParam.payment_amount && money != 0) {
                            addPay.ifChange = 1;
                        } else {
                            addPay.ifChange = 0;
                        }
                        paymentCardInfo.push(addPay);
                    }
                    paymentCardInfo = that.$util.functions.ifHaveFun(paymentCardInfo)
                        ? paymentCardInfo
                        : paymentCardInfo2;
                    if (that.$util.functions.ifHaveFun(paymentCardInfo)) {
                        for (let i in paymentCardInfo) {
                            if (!util.functions.ifHaveFun(that.changeArr)) {
                                paymentCardInfo[i].ifChange = 1;
                            }
                            paymentCardInfo[i].is_check = 0;
                            let card_money_json = util.functions.separatePrice(paymentCardInfo[i].money, 1);
                            paymentCardInfo[i].card_money_json = card_money_json;
                            for (let j in that.changeArr) {
                                if (paymentCardInfo[i].id == that.changeArr[j].id) {
                                    paymentCardInfo[i].is_check = 1;
                                } else if (money < that.popupParam.payment_amount && money < Number(this.popupParam.can_deduction_amount) && money != 0) {
                                    paymentCardInfo[i].ifChange = 1;
                                }
                            }
                        }
                    }
                    if(Number(that.popupParam.can_deduction_amount) <= 0){
                        for(let i in paymentCardInfo){
                            paymentCardInfo[i].ifChange = 0;
                            paymentCardInfo[i].is_check = 0;
                        }
                    }
                    that.paymentCardInfo = paymentCardInfo;
                    that.$forceUpdate();
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Msg({
                        message: err.msg
                    });
                });
        },

        /**
         * @Date: 2020-11-16 16:43:44
         * @LastEditors: zhouqi
         * @description: 选择支付卡
         * @param {index}索引值
         * @return {*}
         */

        changePayCard(index) {
            let money = 0;
            if(Number(this.popupParam.can_deduction_amount) <= 0){
                return false;
            }
            for (let i in this.paymentCardInfo) {
                if (i == index && this.paymentCardInfo[i].ifChange == 1) {
                    this.paymentCardInfo[i].is_check = this.paymentCardInfo[i].is_check == 0 ? 1 : 0;
                }
            }
            for (let i in this.paymentCardInfo) {
                if (this.paymentCardInfo[i].is_check == 1) {
                    money = money + Number(this.paymentCardInfo[i].money);
                }
            }
            for (let i in this.paymentCardInfo) {
                if ((money >= Number(this.popupParam.payment_amount) || money >= Number(this.popupParam.can_deduction_amount)) && money != 0) {
                    if (this.paymentCardInfo[i].is_check != 1) {
                        this.paymentCardInfo[i].ifChange = 0;
                    }
                } else {
                    this.paymentCardInfo[i].ifChange = 1;
                }
            }
            this.$forceUpdate();
        },
        /**
         * @Date: 2020-11-16 17:20:42
         * @LastEditors: zhouqi
         * @description: 绑定支付卡
         * @param {*}
         * @return {*}
         */

        bindPayCardFun() {
            const that = this;
            //  判断支付卡是否在6-20个字符(字母/数字)
            if (that.payWayData.needCardNum != 0 && !that.$util.functions.ifHaveFun(that.getZifu(that.kaNumber))) {
                Hint.Msg({
                    message: that.payWayData.la.cardName + that.payWayData.la.zifuxianzhi
                });
                return false;
            }
            // that.showLoading = true;
            let paramJson = {
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                number: that.kaNumber,
                pwd: that.kaPwd
            };
            bindPayCard(paramJson)
                .then(res => {
                    // that.showLoading = false;
                    // 关闭支付卡弹窗
                    that.operationCard(2);
                    that.wayPage = 1;
                    // that.paymentCardInfo = [];
                    // 支付卡列表接口
                    that.getPaymentCardInfoFun(1);
                })
                .catch(err => {
                    // that.showLoading = false;
                    // that.operationCard(2);
                    // that.getPaymentCardInfoFun();
                });
        },
        /**
         * @Date: 2020-11-17 17:30:22
         * @LastEditors: zhouqi
         * @description: 选择支付方式
         * @param {*}
         * @return {*}
         */
        changeWay(index, type) {
            let payArr = this.changeFun(this.onlineList, 1, index, "nocancel"),
                that = this;
            that.payIndex = index;
            that.payMentmentsId = that.$util.functions.ifHaveFun(payArr.id) ? payArr.id : 0;
            // 满足条件才弹出花呗分期
            if (that.payMentmentsId && type == true) {
                that.huabeiStatus = true;
                setTimeout(() => {
                    that.$refs.huabeiHight.showCustomZindex();
                    // 花呗分期信息
                    that.stagingInfo = this.onlineList[index].stagingInfo;
                });
            }
            let jsonParam = {
                    id: that.payMentmentsId
                },
                num = 0;
            for (let i in that.onlineList) {
                if (
                    that.onlineList[i].is_check == 1 &&
                    that.onlineList[i].is_huabei == 1 &&
                    (that.onlineList[i].pay_id == 12 || that.onlineList[i].pay_id == 27)
                ) {
                    num++;
                    for (let j in that.onlineList[i].stagingInfo) {
                        if (that.onlineList[i].stagingInfo[j].is_check == 1) {
                            jsonParam.huabeiKey = j;
                        }
                    }
                }
            }
            if (num == 0) {
                jsonParam.huabeiKey = null;
            }
            that.$emit("payMentments", jsonParam);
        },

        /**
         * @Date: 2020-11-18 11:48:11
         * @LastEditors: zhouqi
         * @description: 选择花呗分期
         * @param {*}
         * @return {*}
         */

        selectHuabei(index, who_pay_fee, single, no) {
            const that = this;
            let name = "";

            if (index > 0) {
                if (who_pay_fee > 0) {
                    name = (single > 0 ? single + "*" + index : index) + "期";
                } else {
                    name = (no > 0 ? no + "*" + index : index) + "期";
                }
            } else {
                name = "不分期";
            }
            let jsonParam = {
                    id: that.payMentmentsId
                },
                num = 0;
            let onlineList = JSON.parse(JSON.stringify(that.onlineList));
            onlineList.forEach(e => {
                if (e.is_check == 1) {
                    e.hbName = name;
                    Object.keys(e.stagingInfo).forEach(j => {
                        if (j == index) {
                            e.stagingInfo[j].is_check = 1;
                        } else {
                            e.stagingInfo[j].is_check = 0;
                        }
                    });
                }
            });
            for (let i in onlineList) {
                if (
                    onlineList[i].is_check == 1 &&
                    onlineList[i].is_huabei == 1 &&
                    (onlineList[i].pay_id == 12 || onlineList[i].pay_id == 27)
                ) {
                    num++;
                    for (let j in onlineList[i].stagingInfo) {
                        if (onlineList[i].stagingInfo[j].is_check == 1) {
                            jsonParam.huabeiKey = j;
                        }
                    }
                }
            }
            that.onlineList = [...onlineList];
            if (num == 0) {
                jsonParam.huabeiKey = null;
            }
            if (!that.$util.functions.ifHaveFun(that.onlineList)) {
                jsonParam.id = that.popupParam.payment_info_id;
                //不关闭弹窗,这种情况是只有花呗分期一种支付方式
                for (let i in that.stagingInfo) {
                    if (i == index) {
                        that.stagingInfo[i].is_check = 1;
                    } else {
                        that.stagingInfo[i].is_check = 0;
                    }
                    if (that.stagingInfo[i].is_check == 1) {
                        jsonParam.huabeiKey = i;
                    }
                }
                that.$forceUpdate();
            } else {
                setTimeout(() => {
                    that.$forceUpdate();
                    that.closePayWay(3);
                });
            }
            that.$emit("payMentments", jsonParam);
        },
        // 点击阴影
        closeYy() {
            // 支付卡点击不关闭，只有花呗分期弹窗的时候
            if (this.$util.functions.ifHaveFun(this.huabeiStatus)) {
                this.Edit.yinying = false;
                this.$refs.huabeiHight.maskClickHidden();
            }
        },
        // 返回选中的Array
        changeFun(changeArray, id, index, type) {
            let changeJson = {};
            for (let i in changeArray) {
                if (i == index) {
                    if (type == "nocancel") {
                        //不可取消
                        changeArray[i].is_check = 1;
                    } else {
                        changeArray[i].is_check = changeArray[i].is_check == 1 ? 0 : 1;
                        id = changeArray[i].is_check == 1 ? changeArray[i].id : 0;
                    }
                    if (this.payWayVal == 1) {
                        //返回支付方式的pay_id
                        changeJson.zf_pay_id = changeArray[i].is_check == 1 ? changeArray[i].pay_id : 0;
                        if (id == 0 || id == 2) {
                            changeArray[i].is_check == 1 ? id : -1;
                        }
                    } else {
                        changeJson.zf_pay_id = 0;
                    }
                    if (changeArray[i].is_check == 0) {
                        if (this.payWayVal == 1) {
                            //返回支付方式的pay_id
                            changeJson.zf_pay_id = 0;
                            id = 0;
                        }
                        break;
                    }

                    if (id == 1) {
                        id = changeArray[i].is_check == 1 ? changeArray[i].id : 0;
                    } else if (id == 0) {
                        this.yearDate = changeArray[i].date;
                    }
                } else {
                    changeArray[i].is_check = 0;
                }
            }
            changeJson.array = changeArray;
            changeJson.id = id;
            return changeJson;
        },
        // 立即支付
        payFun() {
            if (util.functions.ifHaveFun(this.onlineList)) {
                if (this.onlineList.filter(item => item.is_check == 1).length != 1) {
                    Hint.Msg({ message: this.cluesData.qingxuanze + this.cluesData.zhifufangshi });
                    return false;
                }
            }
            this.closePayWay(2);
            this.$emit("sublitOrderBtn", "popup");
        },
        // 6-20个字符
        getZifu(val) {
            let result =
                String(val).match(/^[A-Za-z]{6,20}$/) ||
                String(val).match(/^[0-9]{6,20}$/) ||
                String(val).match(/^[0-9A-Za-z]{6,20}$/);
            return result;
        }
    }
};
</script>

<style lang="scss">
@import "@/pages/order/assets/css/index.scss";
@import "@/pages/order/assets/css/popup.scss";
@import "@/pages/order/assets/css/color.scss";
</style>

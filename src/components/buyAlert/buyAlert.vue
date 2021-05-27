<!--
 * @Author       : zhouqi
 * @description  : 购买组件
 * @Date         : 2021-01-29 10:13:21
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-01-29 16:59:42
 * @FilePath     : /vue-VFrontend/src/components/buyAlert/buyAlert.vue
-->
<template>
    <div class="buyAlert-box">
        <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" />
        <!-- 规格弹窗 -->
        <CustomPopup ref="shoppingStatus" @guigeFun="closeShoppingStatusBtn">
            <div
                slot="PoperContent"
                class="PoperContentView shoppingStatusView"
                v-if="JSON.stringify(guigeData) != '{}'"
            >
                <!-- :style="{
                    paddingBottom:
                        guigeData.is_show_button_info == 1 &&
                        allData.foot_info.button_list.length != 0
                            ? ''
                            : 0,
                }" -->
                <!-- 顶部商品信息价格 -->
                <div class="shoppingStatus_top">
                    <!-- 顶部商品图片 -->
                    <!-- <div class="shoppingStatus_topImg" @click="openImg(guigeData.pro_pic)"> -->
                    <div class="shoppingStatus_topImg">
                        <img :src="guigeData.pro_pic" @click.stop="toPic(guigeData.pro_pic)" alt="图片" />
                    </div>

                    <!-- 顶部规格 -->
                    <div class="shoppingStatus_topStatus" v-if="guigeTopFlg">
                        <div class="shoppingStatus_topPrice">
                            <!-- v-if="allData.pro_price_show == 1" -->
                            <div class="shoppingStatus_PriceBox" v-if="true">
                                <!-- 原价 -->
                                <span
                                    v-if="
                                        (guigeData.pro_original_price_show > 0 ||
                                            guigeData.pro_original_price_show != '') &&
                                            guigeData.pro_original_price_show != guigeData.pro_price
                                    "
                                >
                                    <span v-html="guigeData.currency_symbol" style="font-size:0.28rem"></span>
                                    <em>{{ guigeData.pro_original_price_show }}</em>
                                    <!-- <em>139.</em>00 -->
                                </span>
                                <!-- 折扣价 -->
                                <div
                                    class="shoppingStatus_topReduction"
                                    v-if="
                                        guigeData.pro_price != '' &&
                                            guigeData.pro_price != guigeData.pro_original_price_show
                                    "
                                >
                                    <!-- 原价为空 -->
                                    <span
                                        v-if="
                                            guigeData.pro_original_price_show == '' ||
                                                guigeData.pro_original_price_show == 0
                                        "
                                        style="color: #F0250F !important;font-size: 0.34rem !important;"
                                    >
                                        <span v-html="guigeData.currency_symbol"></span>
                                        <span>{{ guigeData.pro_price_show }}</span>
                                    </span>
                                    <!-- 原价不为空 -->
                                    <span v-else>
                                        <span v-html="guigeData.currency_symbol" style="color:#111"></span>
                                        {{ guigeData.pro_price_show }}
                                    </span>

                                    <div class="status_thrid" v-if="guigeData.pro_tag != ''">
                                        <div
                                            class="status_thrid_box"
                                            v-if="guigeData.pro_tag == '会员价' || guigeData.pro_tag == '会员折扣'"
                                        >
                                            <span>{{ guigeData.pro_tag }}</span>
                                        </div>
                                        <div class="status_thrid_box2" v-else>
                                            <span>{{ guigeData.pro_tag }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span v-if="guigeData.jifen_must_num > 0"
                                >{{ guigeData.laguage_info.bixushiyong }}{{ guigeData.jifen_must_num
                                }}{{ guigeData.xf_name }}</span
                            >
                        </div>
                        <div
                            v-if="
                                (guigeName != undefined || guigeName != '' || guigeName != null) &&
                                    guigeData.spec_info.length
                            "
                        >
                            <span>
                                {{ guigeData.laguage_info.yixuan }}：
                                <em v-for="(itemName, indexName) in guigeName" :key="indexName"
                                    >{{ '"' + itemName + '"' }}&nbsp;&nbsp;</em
                                >
                            </span>
                        </div>
                    </div>

                    <!-- 关闭按钮 -->
                    <div class="shoppingStatus_colseBtn" @click="closeShoppingStatusBtn">
                        <img
                            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/close.png"
                            alt="关闭"
                        />
                    </div>
                </div>

                <!-- 下部规格部分 -->
                <div class="shoppingStatus_infos">
                    <!-- 规格选择,购买数量等 -->
                    <div class="shoppingStatus_infosBox">
                        <!-- 规格选择 -->
                        <div class="shoppingStatus_colorSize" v-if="guigeData.spec_info.length">
                            <div
                                class="shoppingStatus_infosColor"
                                v-for="(itemSpec, indexSpec) in guigeData.spec_info"
                                :key="indexSpec"
                            >
                                <div class="shoppingStatus_colorTitle">
                                    <span>{{ itemSpec.name }}</span>
                                </div>
                                <div class="shoppingStatus_colorValue">
                                    <span
                                        :class="itemSpecSecond.is_default == 1 ? 'activeColor' : ''"
                                        :style="{
                                            background: itemSpecSecond.is_default == 1 ? allData.bgcColor3 : '',
                                            color: itemSpecSecond.is_default == 1 ? allData.bgcColor2 : '',
                                            borderColor: itemSpecSecond.is_default == 1 ? allData.bgcColor2 : ''
                                        }"
                                        @click="changColorClick(indexSpec, indexSPecSecond)"
                                        v-for="(itemSpecSecond, indexSPecSecond) in itemSpec.spec"
                                        :key="indexSPecSecond"
                                        >{{ itemSpecSecond.name }}</span
                                    >
                                </div>
                            </div>
                        </div>

                        <!-- 购买数量 -->
                        <div v-if="guigeData.is_show_button_info == 1">
                            <div class="shoppingStatus_infosNumbers" v-if="guigeData.phone_info.length == 0">
                                <em>{{ guigeData.laguage_info.goumaishuliang }}</em>
                                <div class="shoppingStatus_numbersChange">
                                    <span v-if="guigeData.pro_small > 1 && guigeData.is_specia_wholesale != 1"
                                        >{{ guigeData.pro_small }}{{ guigeData.laguage_info.meijian
                                        }}{{ guigeData.laguage_info.qishou }}</span
                                    >
                                    <span
                                        v-if="
                                            guigeData.pro_small > 1 &&
                                                restrict_num > 0 &&
                                                guigeData.is_specia_wholesale != 1
                                        "
                                        >&nbsp;&nbsp;</span
                                    >
                                    <span v-if="restrict_num > 0 && guigeData.is_specia_wholesale != 1"
                                        >{{ guigeData.laguage_info.xiangou }}{{ restrict_num
                                        }}{{ guigeData.laguage_info.meijian }}</span
                                    >

                                    <div class="shoppingStatus_numbersChangeBox">
                                        <span class="reduce" @click.stop="reduceBuyNumbers">—</span>
                                        <input
                                            type="number"
                                            v-model="changeNumbers"
                                            v-on:input="numberInput"
                                            @blur="numberBlur"
                                        />
                                        <span
                                            class="add"
                                            :style="{ background: allData.bgcColor2 }"
                                            @click.stop="addBuyNumbers"
                                            >+</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 未选手机号 -->
                    <div class="shoppingStatus_Nophone" v-if="phoneValue == 0 && guigeData.phone_info.length > 0">
                        <span>{{ guigeData.laguage_info.qingxuanze }}{{ guigeData.laguage_info.shoujihao }}</span>
                        <button @click="changePhone">
                            {{ guigeData.laguage_info.lijixuanhao }}
                        </button>
                    </div>

                    <!-- 已选手机号 -->
                    <div class="shoppingStatus_Yesphone" v-show="phoneValue == 1">
                        <span>{{ guigeData.laguage_info.yixuan }}{{ guigeData.laguage_info.shoujihao }}:</span>
                        <div class="shoppingStatus_changePhone">
                            <span class="shoppingStatus_Phone">{{ myPhone }}</span>
                            <em @click="changePhone">{{ guigeData.laguage_info.genghuan }}</em>
                        </div>
                    </div>
                    <!-- 批发商品 -->
                    <div
                        class="shoppingStatus_infosWholesale"
                        v-if="guigeData.wholesale_info.length && guigeData.pro_type == 5"
                    >
                        <span>{{ guigeData.laguage_info.pifa }}</span>
                        <div class="shoppingStatus_wholesaleBox">
                            <span v-for="(itemShop, indexShop) in guigeData.wholesale_info" :key="indexShop">
                                <em v-if="indexShop == 0">
                                    {{ guigeData.laguage_info.man }}{{ itemShop.split("_")[0]
                                    }}{{ guigeData.laguage_info.meijian }}
                                    <span style="padding:0" v-html="guigeData.currency_symbol"></span>
                                    {{ itemShop.split("_")[1] }}/{{ guigeData.laguage_info.meijian }}
                                </em>
                                <em v-else>
                                    {{ guigeData.laguage_info.man }}{{ parseInt(itemShop.split("_")[0]) + 1
                                    }}{{ guigeData.laguage_info.meijian }}
                                    <span style="padding:0" v-html="guigeData.currency_symbol"></span>
                                    {{ itemShop.split("_")[1] }}/{{ guigeData.laguage_info.meijian }}
                                </em>
                            </span>
                        </div>
                    </div>
                </div>
                <!-- v-if="
                        guigeData.is_show_button_info == 1 &&
                            allData.foot_info.button_list.length != 0
                    " -->
                <div v-if="guigeData.is_show_button_info == 1">
                    <div
                        class="shoppingNoPopup"
                        v-if="ifBuy == 0 || (phone_infoFlg == 0 && ifBuy == 1 && guigeData.phone_info.length > 0)"
                    >
                        <span v-if="phone_infoFlg == 0 && ifBuy == 1 && guigeData.phone_info.length > 0">{{
                            guigeData.button_info.buy_define_name
                        }}</span>
                        <span v-else>{{ err_msg }}</span>
                    </div>

                    <div
                        class="shoppingChangeBtn"
                        :class="{
                            shoppingChangeBtn:
                                guigeData.is_show_buy != 0 &&
                                guigeData.is_show_add != 0 &&
                                guigeData.is_specia_wholesale != '1'
                        }"
                        v-show="
                            (ifBuy == 1 &&
                                phone_infoFlg == 1 &&
                                guigeData.phone_info.length > 0 &&
                                guigeData.is_show_buy == 1) ||
                                (ifBuy == 1 && guigeData.phone_info.length == 0)
                        "
                    >
                        <!-- <div
                                    :class="{shoppingStatusPopup2 : guigeData.is_show_buy == 0 || guigeData.is_specia_wholesale == '1'}"
                                    @click="joinShoppCat"
                                    v-show="guigeData.is_show_add == 1"
                            >{{ guigeData.button_info.add_define_name }}</div> -->
                        <div
                            :class="{ shoppingStatusPopup2: guigeData.is_show_buy == 0 }"
                            @click="joinShoppCat"
                            v-show="guigeData.is_show_add == 1"
                            :style="{ background: allData.bgcColor2 }"
                        >
                            {{ guigeData.button_info.add_define_name }}
                        </div>
                        <!-- 立即购买 -->
                        <!-- <div
                                    :class="{shoppingStatusPopup : guigeData.is_show_add == 0 || guigeData.phone_info.length > 0}"
                                    @click="immediatelyBuy(0,1)"
                                    v-if="guigeData.is_show_buy == 1 && guigeData.is_specia_wholesale != '1'"
                            >{{ guigeData.button_info.buy_define_name }}</div> -->
                        <div
                            :class="{
                                shoppingStatusPopup: guigeData.is_show_add == 0 || guigeData.phone_info.length > 0
                            }"
                            @click="immediatelyBuy(0, 1)"
                            v-if="guigeData.is_show_buy == 1"
                            :style="{ background: allData.bgcColor1 }"
                        >
                            {{ guigeData.button_info.buy_define_name }}
                        </div>
                    </div>
                </div>
            </div>
        </CustomPopup>

        <!-- 选择手机号弹窗 -->
        <CustomPopup ref="CustomChangePhone">
            <div slot="PoperContentFull" class="changePhoneBox" v-if="JSON.stringify(guigeData) != '{}'">
                <!-- 标题 -->
                <div class="contentFullTitle">
                    <span>{{ guigeData.laguage_info.qingxuanze }}{{ guigeData.laguage_info.shoujihao }}</span>
                    <!-- 关闭按钮 -->
                    <div class="closeContentFull" @click="colseChangePhone()">
                        <img
                            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/close2.png"
                            alt="关闭"
                        />
                    </div>
                </div>
                <!-- <div class="contentFullTitle">
                        <input type="text" placeholder="请输入" v-model="phoneModel" />

                    </div>-->
                <!-- 搜索 -->
                <div class="contentFull_search">
                    <div class="contentFull_searchInput">
                        <input type="text" placeholder="请输入" v-model="phoneModel" />
                        <img
                            @click="seachPhone"
                            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/search.png"
                            alt="搜索"
                        />
                    </div>
                </div>
                <div class="phoneBoxList_box">
                    <!-- 手机号 -->
                    <div class="phoneBoxList" v-if="phone_info_arr.length">
                        <div
                            :class="indexClass == indexPhone ? 'phoneBoxActive phoneBox' : 'phoneBox'"
                            v-for="(itemPhone, indexPhone) in phone_info_arr"
                            :key="indexPhone"
                            @click="phoneCick(indexPhone, itemPhone.id)"
                        >
                            <span
                                :style="{
                                    color: itemPhone.use == 1 ? '#ededed !important' : '#333333'
                                }"
                                >{{ itemPhone.phone }}</span
                            >
                            <span :class="indexClass == indexPhone ? 'selectedActive' : ''"></span>
                        </div>
                    </div>

                    <!-- 无手机号样式 -->
                    <div class="phoneBoxList_no" v-if="phone_info_arr.length == 0">
                        <span>{{ guigeData.laguage_info.zanwushuju }}</span>
                    </div>
                </div>

                <div class="phoneBoxBtn" @click="colseChangePhone()">
                    <button>确认</button>
                </div>
            </div>
        </CustomPopup>
    </div>
</template>

<script>
const { log } = console;
import { ImagePreview } from "vant";
import util from "@/libs/util";
// vant组件
import Hint from "@/plugins/hint";
// 引入弹出框
import CustomPopup from "@/components/CustomPopup/custompopup.vue";
export default {
    props: {
        allData: {
            type: Object
        }
    },
    components: {
        CustomPopup
    },
    data() {
        return {
            showLoading: false,
            guigeData: {},
            // 规格显示隐藏
            guigeTopFlg: true,
            // 已选规格
            guigeName: [],
            // 已选规格
            guigeNameHY: [],
            restrict_num: 0,
            // 规格弹窗购买数量
            changeNumbers: 1,
            // 手机号选择列表
            phoneList: [],
            // 手机号判断条件
            indexClass: 0,
            // 选择的手机号
            myPhone: 0,
            // 未选择手机号(0),已选择手机号(1),规格选择(2),三种状态选择
            phoneValue: 0,
            button_list: [],
            // 取出规格param_id
            guige_param_id: "",
            // 判断立即购买的状态
            ifBuy: 0,
            // 定义一个参数,用来判断立即购买的状态(0:不能买,1:能买)
            phone_infoFlg: 0,
            // 规格的id
            guige_repeat: 0,
            // 错误信息
            err_msg: "",
            // 组合数据
            guige_arr: {},
            // 手机号内容
            phoneModel: "",
            // pro_id
            guige_pro_id: "",
            // 选则手机号数据
            phone_info_arr: [],
            phone_info_change: []
        };
    },
    mounted() {},
    methods: {
        // 规格选项
        shoppingStatusBtn() {
            this.$refs.shoppingStatus.showCustom();
        },

        // 关闭规格弹窗
        closeShoppingStatusBtn() {
            this.$refs.shoppingStatus.maskClickHidden();
        },
        // 规格弹窗函数封装
        specificationsFun() {
            let that = this;
            that.showLoading = true;
            that.$F.Response({
                url: "mallorder/api/specinfo.php",
                param: {
                    username: this.$route.query.username,
                    pro_id: this.allData.pro_id,
                    channel_id: this.allData.channel_id,
                    regionCode: util.functions.ifHaveFun(this.$cookies.get("supplyCoding"))
                        ? this.$cookies.get("supplyCoding")
                        : ""
                },
                success: res => {
                    if (res.code == 200) {
                        that.showLoading = false;
                        that.$refs.shoppingStatus.showCustom();
                        that.guigeData = res;

                        // 先判断是不是无规格商品
                        if (res.spec_info.length) {
                            // 默认第一组规格
                            let param_id = 0;
                            for (let i in res.pro_spec) {
                                if (param_id) {
                                    break;
                                } else {
                                    param_id = i;
                                }
                            }
                            // 组合数据
                            let pro_specValue = res.pro_spec[param_id];

                            that.guige_param_id = param_id;
                            that.guige_arr = pro_specValue;

                            // 判断组合数据是不是为undefined,防止paramid传错的情况出现
                            if (pro_specValue != undefined) {
                                let spec_info = res.spec_info;
                                if (spec_info.length > 0) {
                                    for (let j = 0; j < spec_info.length; j++) {
                                        for (let k = 0; k < spec_info[j].spec.length; k++) {
                                            // 先判断是否有默认规格,如果没有默认选择接口返回的规格
                                            if (JSON.stringify(that.guigeData.pro_spec) != "{}") {
                                                if (
                                                    that.guigeData.spec_info[j].spec[k].param_ids.indexOf(param_id) !=
                                                    -1
                                                ) {
                                                    that.guigeData.spec_info[j].spec[k].is_default = 1;
                                                } else {
                                                    that.guigeData.spec_info[j].spec[k].is_default = 0;
                                                }
                                                that.spec_info = that.guigeData.spec_info;
                                            } else {
                                                that.spec_info = that.guigeData.spec_info;
                                            }
                                        }
                                    }
                                } else {
                                    //请求购物车列表接口
                                    // that.againRequest();
                                }

                                // 手机号
                                that.phone_info_arr = res.phone_info;
                                that.phone_info_change = res.phone_info;
                                if (res.phone_info.length) {
                                    that.phoneId = res.phone_info[0].id;
                                }
                                // 已选规格
                                if (pro_specValue.name != undefined) {
                                    that.guigeName = pro_specValue.name.split("#");
                                }
                                // 优惠金额
                                that.guigeData.pro_price = pro_specValue.pro_price;
                                // 金额
                                that.guigeData.pro_original_price = pro_specValue.pro_original_price;
                                // 优惠方式
                                that.guigeData.pro_tag = pro_specValue.pro_tag;
                                // 是否能购买
                                that.guigeData.is_buy = pro_specValue.is_buy;
                                //  必须使用积分
                                that.guigeData.jifen_must_num = pro_specValue.jifen_must_num;

                                // 判断是否是批发组的情况,如果是组,不显示最小定量,只能加入购物车
                                if (res.is_specia_wholesale == 1) {
                                    that.changeNumbers = 1;
                                } else {
                                    // 购买数量默认是最小定量
                                    that.changeNumbers = parseInt(that.guigeData.pro_small);
                                }

                                // 原价
                                that.guigeData.pro_original_price_show = pro_specValue.pro_original_price_show;
                                // 折扣价
                                that.guigeData.pro_price_show = pro_specValue.pro_price_show;
                                // 限购数量
                                that.restrict_num = pro_specValue.restrict_num;
                                // 批发标签
                                that.guigeData.wholesale_info = pro_specValue.wholesale_info;
                                if (pro_specValue.is_buy == 0) {
                                    that.ifBuy = 0;
                                } else {
                                    that.ifBuy = 1;
                                }
                                // 错误信息
                                that.err_msg = pro_specValue.err_msg;
                                // 图片
                                if (pro_specValue.pro_pic != "") {
                                    that.guigeData.pro_pic = pro_specValue.pro_pic;
                                } else {
                                    if (that.guigeData.pro_pic != "") {
                                    } else {
                                        that.guigeData.pro_pic = that.guigeData.pro_nopic;
                                    }
                                }
                            } else {
                                let yixuanValueLast = [];
                                if (that.guigeData.spec_info.length) {
                                    return;
                                }
                                // 这个循环取出选中的值
                                for (let i = 0; i < that.guigeData.spec_info.length; i++) {
                                    for (let j = 0; j < that.guigeData.spec_info[i].spec.length; j++) {
                                        if (that.guigeData.spec_info[i].spec[j].is_default == "1") {
                                            yixuanValueLast = yixuanValueLast.concat(
                                                that.guigeData.spec_info[i].spec[j].param_ids
                                            );
                                        }
                                    }
                                }
                                // 手机号
                                that.phone_info_arr = res.phone_info;
                                that.phone_info_change = res.phone_info;
                                if (res.phone_info.length) {
                                    that.phoneId = res.phone_info[0].id;
                                }
                                // 输出重复项
                                let repeat = "";
                                if (yixuanValueLast.length > 1) {
                                    var nary = yixuanValueLast.sort();
                                    for (var i = 0; i < nary.length; i++) {
                                        if (nary[i] == nary[i + 1]) {
                                            repeat = nary[i];
                                        }
                                    }
                                } else {
                                    repeat = yixuanValueLast[0];
                                }
                                that.guige_param_id = repeat;
                                // 取出对应pro_spec的值,
                                let guigeLastValue = that.guigeData.pro_spec[repeat];
                                that.guige_arr = guigeLastValue;

                                // 价格
                                that.guigeData.pro_original_price = guigeLastValue.pro_original_price;
                                // 优惠价
                                that.guigeData.pro_price = guigeLastValue.pro_price;
                                // 批发
                                that.guigeData.pro_tag = guigeLastValue.pro_tag;
                                // 规格名称
                                that.guigeName = guigeLastValue.name.split("#");
                                // is_buy
                                that.guigeData.is_buy = guigeLastValue.is_buy;
                                // 限购
                                that.restrict_num = guigeLastValue.restrict_num;
                                // 原价
                                that.guigeData.pro_original_price_show = guigeLastValue.pro_original_price_show;
                                // 折扣价
                                that.guigeData.pro_price_show = guigeLastValue.pro_price_show;
                                // 必须使用积分
                                that.guigeData.jifen_must_num = guigeLastValue.jifen_must_num;

                                // 判断是否是批发组的情况,如果是组,不显示最小定量,只能加入购物车
                                if (res.is_specia_wholesale == 1) {
                                    that.changeNumbers = 1;
                                } else {
                                    // 购买数量默认是最小定量
                                    that.changeNumbers = parseInt(that.guigeData.pro_small);
                                }
                                if (guigeLastValue.is_buy == 0) {
                                    that.ifBuy = 0;
                                } else {
                                    that.ifBuy = 1;
                                }
                                // 批发标签
                                that.guigeData.wholesale_info = guigeLastValue.wholesale_info;

                                // 图片
                                if (guigeLastValue.pro_pic != "") {
                                    that.guigeData.pro_pic = guigeLastValue.pro_pic;
                                    return;
                                }
                                if (that.guigeData.pro_pic != "") {
                                    return;
                                }
                                that.guigeData.pro_pic = that.guigeData.pro_nopic;
                            }
                        } else {
                            // 手机号
                            that.phone_info_arr = res.phone_info;
                            that.phone_info_change = res.phone_info;
                            if (res.phone_info.length) {
                                that.phoneId = res.phone_info[0].id;
                            }
                            // 优惠金额
                            that.guigeData.pro_price = res.pro_price;
                            // 金额
                            that.guigeData.pro_original_price = res.pro_original_price;
                            // 优惠方式
                            that.guigeData.pro_tag = res.pro_tag;
                            // 是否能购买
                            that.guigeData.is_buy = res.is_buy;
                            // 必须使用积分
                            that.guigeData.jifen_must_num = res.jifen_must_num;
                            // 判断是否是批发组的情况,如果是组,不显示最小定量,只能加入购物车
                            if (res.is_specia_wholesale == 1) {
                                that.changeNumbers = 1;
                            } else {
                                // 购买数量默认是最小定量
                                that.changeNumbers = res.pro_small;
                            }

                            if (res.is_buy == 0) {
                                that.ifBuy = 0;
                            } else {
                                that.ifBuy = 1;
                            }
                            // 错误信息
                            that.err_msg = res.err_msg;
                            // 限购
                            that.restrict_num = res.restrict_num;
                            // 图片
                            if (res.pro_pic != "") {
                                that.guigeData.pro_pic = res.pro_pic;
                            } else {
                                if (that.guigeData.pro_pic != "") {
                                } else {
                                    that.guigeData.pro_pic = res.pro_nopic;
                                }
                            }
                        }
                        that.$forceUpdate();
                    } else {
                        Hint.Alert({
                            message: res.msg
                        }).then(() => {
                            // window.history.back();
                        });
                    }
                }
            });
        },

        // 规格分类选择
        changColorClick(index, indexSecond) {
            let that = this;
            // let yixuanValueLast = that.yixuanValue;
            let yixuanValueLast = [];
            // 这个循环改变选中的状态值
            for (let j = 0; j < that.guigeData.spec_info[index].spec.length; j++) {
                if (indexSecond == j) {
                    that.guigeData.spec_info[index].spec[j].is_default = 1;
                } else {
                    that.guigeData.spec_info[index].spec[j].is_default = 0;
                }
            }
            // 这个循环取出选中的值
            for (let i = 0; i < that.guigeData.spec_info.length; i++) {
                for (let j = 0; j < that.guigeData.spec_info[i].spec.length; j++) {
                    if (that.guigeData.spec_info[i].spec[j].is_default == 1) {
                        yixuanValueLast = yixuanValueLast.concat(that.guigeData.spec_info[i].spec[j].param_ids);
                    }
                }
            }

            // 输出重复项
            let repeat = "";

            if (yixuanValueLast.length > 1) {
                var nary = yixuanValueLast.sort();
                var result = {};
                for (let i = 0; i < nary.length; i++) {
                    if (!result[nary[i]]) {
                        result[nary[i]] = 1;
                    } else {
                        result[nary[i]]++;
                    }
                }

                let keys = Object.keys(result);
                let maxNum = 0,
                    maxVal = "",
                    length = 0,
                    lengthBefore = 0;
                // 循环对象，取出value值最大的对应的key值
                for (let i = 0; i < keys.length; i++) {
                    length++;
                    if (result[keys[i]] == 1) {
                        lengthBefore++;
                    }
                    if (result[keys[i]] > maxNum) {
                        maxNum = result[keys[i]];
                        maxVal = keys[i];
                    }
                }
                // 判断是否没有找到该规格
                if (lengthBefore == length || that.guigeData.spec_info.length != maxNum) {
                    // 错误信息
                    that.err_msg = that.guigeData.laguage_info.gaiguigebucunzai;
                    that.ifBuy = 0;
                    that.guigeTopFlg = false;
                    return false;
                } else {
                    that.guigeTopFlg = true;
                }
                repeat = maxVal;
            } else {
                repeat = yixuanValueLast[0];
            }
            // 取出对应pro_spec的值,
            // let guigeLastValue = that.pro_specList[repeat];
            // 取出param_id
            that.guige_param_id = repeat;

            // 取出对应pro_spec的值,
            let guigeLastValue = that.guigeData.pro_spec[repeat];
            that.guige_arr = guigeLastValue;
            // 错误信息
            that.err_msg = guigeLastValue.err_msg;
            // 价格
            that.guigeData.pro_original_price = guigeLastValue.pro_original_price;
            // 优惠价
            that.guigeData.pro_price = guigeLastValue.pro_price;
            // 批发
            that.guigeData.pro_tag = guigeLastValue.pro_tag;
            // 规格名称
            that.guigeName = guigeLastValue.name.split("#");
            // is_buy
            that.guigeData.is_buy = guigeLastValue.is_buy;
            // 限购数量
            that.restrict_num = guigeLastValue.restrict_num;
            // 原价
            that.guigeData.pro_original_price_show = guigeLastValue.pro_original_price_show;
            // 折扣价
            that.guigeData.pro_price_show = guigeLastValue.pro_price_show;
            // 批发标签
            that.guigeData.wholesale_info = guigeLastValue.wholesale_info;
            //  必须使用积分
            that.guigeData.jifen_must_num = guigeLastValue.jifen_must_num;
            if (guigeLastValue.is_buy == 0) {
                that.ifBuy = 0;
            } else {
                that.ifBuy = 1;
            }
            that.changeNumbersFun(1);
            // 图片
            if (guigeLastValue.pro_pic != "") {
                that.guigeData.pro_pic = guigeLastValue.pro_pic;
                return;
            }
            if (that.guigeData.pro_pic != "") {
                return;
            }
            that.guigeData.pro_pic = that.guigeData.pro_nopic;
        },
        // 手机号搜索
        seachPhone() {
            let arr = [];
            let search_id = "";
            let phoneModelVal = this.phoneModel;
            for (let i = 0; i < this.phone_info_change.length; i++) {
                if (phoneModelVal == this.phone_info_change[i].phone) {
                    search_id = this.phone_info_change[i].id;
                }
            }

            let Json = {
                id: search_id,
                phone: phoneModelVal
            };
            arr.push(Json);

            if (phoneModelVal != "") {
                if (JSON.stringify(this.phone_info_change).indexOf(JSON.stringify(Json)) >= 0) {
                    this.phone_info_arr = arr;
                    this.myPhone = phoneModelVal;
                    this.indexClass = 0;
                } else {
                    this.phone_info_arr = [];
                }
            }
            let inputValue = phoneModelVal.replace(/(^\s*)|(\s*$)/g, "").length;
            if (inputValue == 0) {
                this.phone_info_arr = this.phone_info_change;
                this.myPhone = this.phone_info_change[0].phone;
            }
        },
        // 自定义数量变化方法
        changeNumbersFun(type1, type2) {
            let that = this;
            // 库存
            let kuncun;
            // 最大限购
            let restrict_num;
            // 判断组合数据中是否有数据
            if (JSON.stringify(that.guige_arr) != "{}") {
                kuncun = parseInt(that.guige_arr.pro_stock);
                restrict_num = parseInt(that.guige_arr.restrict_num);
            } else {
                kuncun = parseInt(that.guigeData.pro_stock);
                restrict_num = parseInt(that.guigeData.restrict_num);
            }
            // 最小定量
            let zuiSamll = parseInt(that.guigeData.pro_small);

            // 如果大于库存
            let max = parseInt(kuncun);
            let tmp_flag = 0;
            if (restrict_num > 0) {
                if (restrict_num < kuncun) {
                    tmp_flag = 1;
                    max = parseInt(restrict_num);
                }
            }
            // 加加调取方法
            if (type1 == 1) {
                if (parseInt(that.changeNumbers) > max) {
                    if (tmp_flag == 1) {
                        that.changeNumbers = max;
                        if (that.activity_state == 2) {
                            that.ifBuy = 0;
                        }
                    } else {
                        that.ifBuy = 0;
                        that.err_msg = that.guigeData.laguage_info.kucunbuzu;
                    }
                    return;
                } else if (parseInt(that.changeNumbers) >= parseInt(zuiSamll)) {
                    if (that.activity_state == 2) {
                        that.ifBuy = 0;
                    } else {
                        that.ifBuy = 1;
                    }
                }
            }

            // 减减调取方法
            if (type2 == 2) {
                let min = kuncun;
                let tmp_flag = 0;

                if (parseInt(that.changeNumbers) < parseInt(zuiSamll) && that.guigeData.is_specia_wholesale != "1") {
                    // that.changeNumbers = parseInt(zuiSamll);
                    this.ifBuy = 0;
                    this.err_msg = this.guigeData.button_info.buy_define_name;
                    return false;
                } else if (that.guigeData.is_specia_wholesale == "1" && that.changeNumbers < 1) {
                    that.changeNumbers = 1;
                } else if (parseInt(that.changeNumbers) <= max) {
                    if (that.activity_state == 2) {
                        that.ifBuy = 0;
                    } else {
                        that.ifBuy = 1;
                    }
                }
            }
        },

        // 规格弹出框数量减少
        reduceBuyNumbers() {
            this.changeNumbers = parseInt(this.changeNumbers) - 1;
            if (parseInt(this.changeNumbers) <= 1) {
                this.changeNumbers = 1;
            }
            this.changeNumbersFun(2, 2);
        },
        // 规格弹出框数量增加
        addBuyNumbers() {
            this.changeNumbers = parseInt(this.changeNumbers) + 1;

            this.changeNumbersFun(1, 1);
        },
        // 规格弹出框数量变化事件
        numberInput() {
            if (this.changeNumbers != "") {
                var re = /^\d+$/; //判断字符串是否为数字
                if (re.test(this.changeNumbers)) {
                    if (
                        parseInt(this.changeNumbers) < parseInt(this.guigeData.pro_small) &&
                        this.guigeData.is_specia_wholesale != "1" &&
                        this.changeNumbers > 0
                    ) {
                        // this.changeNumbers = parseInt(this.guigeData.pro_small);
                        // this.changeNumbers = 1;
                        if (parseInt(this.changeNumbers) <= 1) {
                            this.changeNumbers = 1;
                        }
                        this.ifBuy = 0;
                        this.err_msg = this.guigeData.button_info.buy_define_name;
                        return false;
                    } else if (this.guigeData.is_specia_wholesale == "1" && parseInt(this.changeNumbers) <= 1) {
                        this.changeNumbers = 1;
                    }
                } else {
                    if (this.guigeData.is_specia_wholesale != "1") {
                        this.changeNumbers = parseInt(that.guigeData.pro_small);
                    } else {
                        this.changeNumbers = 1;
                    }
                }
                this.changeNumbersFun(1, 2);
            } else {
                this.ifBuy = 0;
                this.err_msg = this.guigeData.button_info.buy_define_name;
            }
        },
        // 规格弹窗失去焦点事件
        numberBlur() {
            if (this.changeNumbers == "") {
                if (this.guigeData.is_specia_wholesale != "1") {
                    this.changeNumbers = parseInt(this.guigeData.pro_small);
                } else {
                    this.changeNumbers = 1;
                }
                this.changeNumbersFun(1, 2);
            }
        },
        // 立即购买
        immediatelyBuy(value, type) {
            let that = this;
            if (type == 1) {
                //点击了弹窗中的立即购买
                // 存入cookie
                that.getBuyCookie(1);
            }
        },
        // 加入购物车
        joinShoppCat(type) {
            let proId = "";
            if (type == 1) {
                proId = this.allData.pro_id;
            } else {
                proId = this.guigeData.pro_id;
            }
            let num = 1;
            if (JSON.stringify(this.guigeData) != "{}") {
                if (this.guigeData.phone_info.length) {
                    num = 1;
                } else {
                    num = parseInt(this.changeNumbers);
                }
            } else {
                num = 1;
            }

            this.changeCookie(proId, this.guige_param_id, num);
            this.$refs.shoppingStatus.maskClickHidden();
        },

        // 加入购物车,获取cookie的方法
        changeCookie(proId, specId, proNum) {
            let that = this;
            // 读取cookie
            let gouwuche = this.$cookies.get(this.$route.query.username + "_gouwuche"),
                user_id = this.$cookies.get("zz_userid"),
                data = {};

            var param_id = 0;

            if (specId) {
                param_id = specId;
            }

            var isUpdate = 0;
            var i = 0;
            var price_val = 0;
            if (gouwuche != null || gouwuche) {
                var aOrder = gouwuche;
                var carAllnum = 0;
                for (var key in aOrder) {
                    carAllnum = carAllnum + parseInt(aOrder[key].num);
                    if (key == proId + "_" + param_id) {
                        aOrder[key] = {
                            num: parseInt(aOrder[key].num) + parseInt(proNum),
                            sort: aOrder[key].sort
                        };
                        var tmp_str = JSON.stringify(aOrder);
                        that.$cookies.set(this.$route.query.username + "_gouwuche", tmp_str, 3600 * 7);
                        Hint.Msg({ message: "已加入购物车" });
                        isUpdate = 1;
                        i = i + 1;
                    } else {
                        i = i + 1;
                    }
                }
                if (!isUpdate) {
                    i = i + 1;
                    aOrder[proId + "_" + param_id] = { num: parseInt(proNum), sort: i };
                    var tmp_str = JSON.stringify(aOrder);
                    this.$cookies.set(this.$route.query.username + "_gouwuche", tmp_str, 3600 * 7);
                    Hint.Msg({ message: "已加入购物车" });
                } else {
                }
            } else {
                //存入cookie
                var arrayObj = {};
                arrayObj[proId + "_" + param_id] = { num: parseInt(proNum), sort: i };
                var tmp_str = JSON.stringify(arrayObj);
                that.$cookies.set(this.$route.query.username + "_gouwuche", tmp_str, 3600 * 7);
                Hint.Msg({ message: "已加入购物车" });
            }
        },
        // 立即购买存cookie的函数
        getBuyCookie(type) {
            this.$cookies.set("is_liji", 1, 3600 * 24);
            this.$cookies.set("liji_pro_num", this.changeNumbers, 3600 * 24);
            if (this.guige_param_id == "" || this.guige_param_id == undefined || this.guige_param_id == null) {
                this.guige_param_id = 0;
            }

            // 弹窗中的立即购买
            if (type == 1) {
                this.$cookies.set("liji_param_pro", this.guigeData.pro_id + "_" + this.guige_param_id, 3600 * 24);
            }

            if (this.$cookies.get("zz_userid")) {
                var buy_now_param = [
                    {
                        pro_id: type == 1 ? this.guigeData.pro_id : type == 2 ? this.allData.pro_id : "",
                        param_id: type == 1 ? (this.guige_param_id ? this.guige_param_id : 0) : 0,
                        num: this.changeNumbers,
                        val: this.myPhone ? this.myPhone : ""
                    }
                ];
                let encodeURI = JSON.stringify(buy_now_param);
                location.href =
                    "//" +
                    document.domain +
                    "/VFrontend/order/submitOrder/index?username=" +
                    this.$route.query.username +
                    "&buy_now_param=" +
                    encodeURI;
            } else {
                location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            }
        },

        // 未登录点击立即领取
        qujiesuanClick() {
            if (!util.ifHaveFun(this.$cookies.get("zz_userid"))) {
                location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            }
        },
        // 选择手机号
        changePhone() {
            this.$refs.CustomChangePhone.showMaskFull();
        },
        // 手机号选择之后弹窗
        colseChangePhone() {
            let that = this;
            let user_id = this.$cookies.get("zz_userid");
            if (!user_id || user_id == "") {
                location.href = "/dom/denglu.php?username=" + this.$route.query.username + "&wap=1";
                return false;
            }
            that.$F.Response({
                url: "Ajax/PhoneBind.php?username=" + this.$route.query.username,
                param: {
                    pro_id: this.allData.pro_id,
                    user_user_id: user_id,
                    use_phone_id: that.phoneId
                },
                success: res => {
                    if (res.status == 200) {
                        this.$refs.CustomChangePhone.maskCloseFull();

                        // 把选择的手机号输出
                        if (this.phone_info_arr.length == this.phone_info_change.length) {
                            this.myPhone = this.guigeData.phone_info[this.indexClass].phone;
                        }
                        this.phoneValue = 1;
                        this.phone_infoFlg = 1;
                    } else {
                        // 有不可选手机号
                        let errorStatus = res.list;
                        let phone_info_arr = that.phone_info_arr;
                        for (let i = 0; i < phone_info_arr.length; i++) {
                            for (let j = 0; j < errorStatus.length; j++) {
                                if (errorStatus[j].phone_id == phone_info_arr[i].id) {
                                    phone_info_arr[i].use = 1;
                                }
                            }
                        }
                        that.phone_info_arr = phone_info_arr;
                        Hint.Msg({ message: res.msg });
                    }
                }
            });
        },
        // 手机号点击事件
        phoneCick(index, id) {
            this.indexClass = index;
            this.phoneId = id;
        },
        // 放大商品图片
        toPic(pic){
            ImagePreview([pic]);
        }
    }
};
</script>

<style lang="scss" scoped>
/*  引入外部scss文件 */
@import "@/components/buyAlert/assets/css/buyAlert.scss";
</style>

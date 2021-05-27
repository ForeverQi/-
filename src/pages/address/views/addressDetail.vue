<template>
    <section class="addressDetail-box" :class="theme">
        <section class="addressContent">
            <van-loading v-if="showLoading" size="50px" color="#1989fa" />
            <van-overlay :show="showLoading" />
            <div class="wrapper" v-if="addressInfo.length">
                <Nav v-if="ifNav" :numerical="2" :tips="clues" />
                <div class="Tips" @click="getWeixinAddress()" v-if="getWxStatus && is_define == 0">
                    <div class="Tips_img">
                        <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_weixin.png" />
                    </div>
                    <div class="Tips_txt">点击获取微信收货地址</div>
                    <div class="Tips_close" @click.stop="getWxStatus = false">
                        <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_colse1.png" />
                    </div>
                </div>
                <div class="wrapper_c" v-wechat-title="($route.meta.title = clues.tianjiashouhuodizhi)">
                    <div class="Max_Center">
                        <div class="Tips_view1">
                            <div class="Tips_txt1">{{ clues.sheweimorendizhi }}</div>
                            <div class="defaultAddress_right">
                                <div
                                    @click="selectStatus"
                                    :class="valueFlg ? 'marquee marqueeSelect' : 'marquee'"
                                    :style="{
                                        background: valueFlg ? cssColor : '',
                                        borderColor: valueFlg ? cssColor : 'rgba(219, 219, 219, 1)'
                                    }"
                                >
                                    <div
                                        :class="valueFlg ? 'marqueeButton marqueeButtonSelect' : 'marqueeButton'"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div class="Tips_view2">
                            <div class="Tips_name1_father">
                                <div
                                    class="Tips_name1"
                                    v-for="(item, index) in addressInfo.filter(function(item) {
                                        return item.system_status != 1;
                                    })"
                                    :key="index"
                                >
                                    <!-- 姓名 -->
                                    <div v-if="item.system_type == 1">
                                        <div class="Tips_name1_L">
                                            <span v-if="item.is_have == 1" class="is_have">*</span>{{ item.name }}
                                        </div>
                                        <div class="Tips_name1_R">
                                            <input
                                                maxlength="10"
                                                :placeholder="clues.qingshuru"
                                                @input="inputFun(1, $event.target.value)"
                                                :value="nameValue ? nameValue : ''"
                                            />
                                        </div>
                                    </div>
                                    <!-- 城市 -->
                                    <div v-if="item.system_type == 2">
                                        <div class="Tips_name1_L">
                                            <span v-if="item.is_have == 1" class="is_have">*</span>{{ item.name }}
                                        </div>
                                        <div class="Tips_name1_R">
                                            <input
                                                :placeholder="clues.qingshuru"
                                                class="new_input1"
                                                :value="cityValue ? cityValue : ''"
                                            />
                                            <div class="input_mb" @click="cityFun()"></div>
                                            <div class="map" @click="getMyLocation" v-if="is_define == 0">
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_map.png"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 详细地址 -->
                                    <div v-if="item.system_type == 3">
                                        <div class="Tips_name1_L">
                                            <span v-if="item.is_have == 1" class="is_have">*</span>{{ item.name }}
                                        </div>
                                        <div class="Tips_name1_R" style="height:2.50rem;">
                                            <textarea
                                                :placeholder="clues.qingshuru"
                                                @input="inputFun(3, $event.target.value)"
                                                :value="addressValue ? addressValue : ''"
                                                maxlength="100"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <!-- 电话 -->
                                    <div v-if="item.system_type == 4">
                                        <div class="Tips_name1_L">
                                            <span v-if="item.is_have == 1" class="is_have">*</span>{{ item.name }}
                                        </div>
                                        <div class="Tips_name1_R">
                                            <input
                                                :placeholder="clues.qingshuru"
                                                placeholder-class="place"
                                                @input="inputFun(4, $event.target.value)"
                                                :value="phoneValue ? phoneValue : ''"
                                            />
                                        </div>
                                    </div>
                                    <!-- 邮编 -->
                                    <div v-if="item.system_type == 5">
                                        <div class="Tips_name1_L">
                                            <span v-if="item.is_have == 1" class="is_have">*</span>{{ item.name }}
                                        </div>
                                        <div class="Tips_name1_R">
                                            <input
                                                :placeholder="clues.qingshuru"
                                                placeholder-class="place"
                                                @input="inputFun(5, $event.target.value)"
                                                :value="codeValue ? codeValue : ''"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 自定义 -->
                            <div class="Tips_name1_system" v-if="systemzdy.length" style="margin-top:0.20rem;">
                                <div v-for="(item, index) in systemzdy" class="Tips_name1" :key="index">
                                    <!-- 单行文本 -->
                                    <div v-if="item.system_type == 0 && item.type == 3">
                                        <div class="Tips_name1_L">
                                            <span v-if="item.is_have == 1" class="is_have">*</span>{{ item.name }}
                                        </div>
                                        <div class="Tips_name1_R">
                                            <!-- 添加时 -->
                                            <input
                                                maxlength="250"
                                                :placeholder="item.placeValue ? item.placeValue : clues.qingshuru"
                                                @input="inputFun(6, $event.target.value, item.id, index)"
                                                v-if="tianjia"
                                            />
                                            <!-- 修改时 -->
                                            <input
                                                maxlength="250"
                                                :placeholder="clues.qingshuru"
                                                :value="item.default_value"
                                                @input="inputFun(6, $event.target.value, item.id, index)"
                                                v-if="!tianjia"
                                            />
                                        </div>
                                    </div>
                                    <!-- 多选 -->
                                    <div v-if="item.system_type == 0 && item.type == 2" @click="changeYL1(item.id)">
                                        <div class="Tips_name1_L">
                                            <span v-if="item.is_have == 1" class="is_have">*</span>{{ item.name }}
                                        </div>
                                        <div class="Tips_name1_R">
                                            <div class="new_input2">
                                                <span v-if="item.checkbox" style="color:#222;">{{
                                                    item.checkbox
                                                }}</span>
                                                <span v-else>{{ clues.qingxuanze }}</span>
                                            </div>
                                            <div class="arrow">
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_arrow.png"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 单选 -->
                                    <div v-if="item.system_type == 0 && item.type == 1" @click="changeYL(item.id)">
                                        <div class="Tips_name1_L">
                                            <span v-if="item.is_have == 1" class="is_have">*</span>{{ item.name }}
                                        </div>
                                        <div class="Tips_name1_R">
                                            <div
                                                v-for="(checkItem, checkIndex) in item.default_value"
                                                :key="checkIndex"
                                            >
                                                <div
                                                    v-if="checkItem.c == 1 && item.changeText == true"
                                                    class="new_input2"
                                                    style="color:#222;"
                                                >
                                                    {{ checkItem.v }}
                                                </div>
                                            </div>
                                            <div class="new_input2" v-if="item.changeText == false">
                                                {{ clues.qingxuanze }}
                                            </div>
                                            <div class="arrow">
                                                <img
                                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/redesign_arrow.png"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="height:1.10rem;"></div>
                    <div class="bottom" @click="saveAddress">
                        <div :style="{ background: cssColor }">{{ clues.baocunshouhuodizhi }}</div>
                    </div>
                    <!-- 弹窗开始 -->
                    <div class="alert_bg" v-if="showModal_bg" @click="closeModal"></div>
                    <!-- 多选 -->
                    <div class="alert_view2" v-if="showModal1">
                        <div class="alert_view2_tit">
                            <div class="view2_tit_L">{{ clues.qingxuanze }}</div>
                            <div class="view2_tit_R" @click="closeModal">
                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_colse.jpg" />
                            </div>
                        </div>
                        <div style="overflow-y:scroll;" class="scroll_view1">
                            <div
                                class="scroll_view1_li"
                                v-for="(item, index) in objarray1"
                                :key="index"
                                @click="switchTab1(index, 2)"
                            >
                                <div class="scroll_view1_R" :class="item.c == 1 ? 'sv_active' : ''">
                                    <img
                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_order_icon5.png"
                                    />
                                </div>
                                <div class="scroll_view1_L">{{ item.v }}</div>
                            </div>
                        </div>
                        <div class="OK" @click="closeModal">{{ clues.queren }}</div>
                    </div>
                    <!-- 单选 -->
                    <div class="alert_view2" v-if="showModal">
                        <div class="alert_view2_tit">
                            <div class="view2_tit_L">{{ clues.qingxuanze }}</div>
                            <div class="view2_tit_R" @click="closeModal">
                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_colse.jpg" />
                            </div>
                        </div>
                        <div style="overflow-y:scroll;" class="scroll_view">
                            <div
                                class="scroll_li"
                                v-for="(item, index) in objarray"
                                :key="index"
                                @click="switchTab1(index, 1)"
                            >
                                <div class="scroll_li_img" :class="item.c == 1 ? 'scroll_img_active' : ''">
                                    <img
                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_order_icon5.png"
                                    />
                                </div>
                                <div class="scroll_li_txt">{{ item.v }}</div>
                            </div>
                        </div>
                        <div class="OK" @click="closeModal">{{ clues.queren }}</div>
                    </div>
                    <!-- 自定义城市选择 -->
                    <div class="City" v-if="City1">
                        <div class="alert_view2_tit" style="border:0;">
                            <div class="view2_tit_L">{{ clues.qingxuanzechengshi }}</div>
                            <div class="view2_tit_R" @click="closeModal">
                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_colse.jpg" />
                            </div>
                        </div>
                        <div class="City_top">
                            <div class="City_li" @click.stop="changeTitle(0)">
                                <div class="City_txt">{{ province ? province : clues.qingxuanzesheng }}</div>
                                <div class="City_bor" :style="{ background: cityStatus == 0 ? cssColor : '' }"></div>
                            </div>
                            <div class="City_li" v-if="province1" @click.stop="changeTitle(1)">
                                <div class="City_txt">{{ province1 ? province1 : clues.qingxuanzeshi }}</div>
                                <div class="City_bor" :style="{ background: cityStatus == 1 ? cssColor : '' }"></div>
                            </div>
                            <div class="City_li" v-if="province2" @click.stop="changeTitle(2)">
                                <div class="City_txt">{{ province2 ? province2 : clues.qingxuanzequ }}</div>
                                <div class="City_bor" :style="{ background: cityStatus == 2 ? cssColor : '' }"></div>
                            </div>
                            <div class="City_li" v-if="province3" @click.stop="changeTitle(3)">
                                <div class="City_txt">{{ province3 ? province3 : clues.qingxuanzejiedao }}</div>
                                <div class="City_bor" :style="{ background: cityStatus == 3 ? cssColor : '' }"></div>
                            </div>
                            <div class="City_li" v-if="province4" @click.stop="changeTitle(4)">
                                <div class="City_txt">{{ province4 ? province4 : clues.qingxuanzexiaoqu }}</div>
                                <div class="City_bor" :style="{ background: cityStatus == 4 ? cssColor : '' }"></div>
                            </div>
                        </div>
                        <div style="overflow-y: scroll;" class="City_bottom" v-if="cityStatus == 0">
                            <div
                                :class="item.is_check == 1 ? 'City_bottom_li ischeck' : 'City_bottom_li'"
                                v-for="(item, index) in cityArr"
                                :key="index"
                                @click.stop="changeCity(item.id, item.name, index)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <div style="overflow-y: scroll;" class="City_bottom" v-if="cityStatus == 1">
                            <div
                                :class="item.is_check == 1 ? 'City_bottom_li ischeck' : 'City_bottom_li'"
                                v-for="(item, index) in cityArr1"
                                :key="index"
                                @click.stop="changeCity(item.id, item.name, index)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <div style="overflow-y: scroll;" class="City_bottom" v-if="cityStatus == 2">
                            <div
                                :class="item.is_check == 1 ? 'City_bottom_li ischeck' : 'City_bottom_li'"
                                v-for="(item, index) in cityArr2"
                                :key="index"
                                @click.stop="changeCity(item.id, item.name, index)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <div style="overflow-y: scroll;" class="City_bottom" v-if="cityStatus == 3">
                            <div
                                :class="item.is_check == 1 ? 'City_bottom_li ischeck' : 'City_bottom_li'"
                                v-for="(item, index) in cityArr3"
                                :key="index"
                                @click.stop="changeCity(item.id, item.name, index)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <div style="overflow-y: scroll;" class="City_bottom" v-if="cityStatus == 4">
                            <div
                                :class="item.is_check == 1 ? 'City_bottom_li ischeck' : 'City_bottom_li'"
                                v-for="(item, index) in cityArr4"
                                :key="index"
                                @click.stop="changeCity(item.id, item.name, index)"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                    <!-- 省市区选择 -->
                    <!-- <city ref='cityRef' id="changeCity" bind:passCity="passCityFun"></city> -->
                    <CityAlert ref="cityRef" @passCity="passCityFun" :theme="theme" :cluesStr="clues" />
                    <!-- 位置授权 -->
                    <BaiduGPS v-if="dtStatus" ref="BaiduGPSLayer" @backFunction="bdGetCity" :point="null" />
                </div>
            </div>
        </section>
    </section>
</template>

<script>
const { log } = console;
// vant组件
import Hint from "@/plugins/hint";
// 添加地址，编辑地址
import { addressInfo } from "@/api/address/addressList.js";
// 色系
import { getColor } from "@/api/order/submitOrder.js";
// 供应链编码
import { getJdAddressCode } from "@/api/gyl.js";
// 省市区组件
import CityAlert from "@/pages/address/components/city-alert.vue";
// 地图组件
import BaiduGPS from "@/pages/shop/views/video/backend/components/BaiduGPS.vue";
// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";

import { weixinShare } from "@/api/shop/video.frontend";

import util from "@/libs/util";
export default {
    name: "addressDetail",
    components: {
        CityAlert,
        BaiduGPS,
        Nav
    },
    data() {
        return {
            showLoading: true,
            addressInfo: "",
            textareaStatus: false,
            showModal_bg: false,
            showModal1: false,
            showModal: false,
            City1: false,
            valueFlg: false,
            dtStatus: false,
            province: false,
            province1: false,
            province2: false,
            province3: false,
            province4: false,
            cityStatus: 0,
            addrInfo2: {},
            cityValue: "",
            cityValue2: "",
            ifNav: true,
            cityJson: "",
            cityValueJson: "",
            // 颜色
            theme: "color1",
            cssColor: "#f00",
            cityNum: 0,
            getWxStatus: false,
            orderstatus:0
        };
    },
    mounted() {
        let that = this,
            queryJsonAdress = {};
        that.weixinShareFun();
        // 调取颜色
        that.getColorFun();
        if (!this.$util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            return false;
        }

        if (util.functions.ifHaveFun(that.$cookies.get("queryJsonAdress"))) {
            queryJsonAdress = that.$cookies.get("queryJsonAdress");
        }
        log(queryJsonAdress)
        that.is_set = queryJsonAdress.is_set ? queryJsonAdress.is_set : 0;
        that.detail_id = queryJsonAdress.detail_id;
        that.order_id = queryJsonAdress.order_id;
        that.redirect = queryJsonAdress.redirect;
        that.subMitJson = queryJsonAdress.subMitJson;
        that.orderstatus = queryJsonAdress.orderstatus;
        that.takeout = queryJsonAdress.takeout ? queryJsonAdress.takeout : 0;
        that.jdWay = queryJsonAdress.jdWay;
        that.jdStatus = queryJsonAdress.jdStatus;
        that.goodsValueType = queryJsonAdress.goodsValueType;
        that.textareaValue = queryJsonAdress.textareaValue;
        that.imagesList_back = queryJsonAdress.imagesList_back;
        var id = util.functions.ifHaveFun(queryJsonAdress.id) ? queryJsonAdress.id : 0;
        if (util.functions.ifHaveFun(id)) {
            that.addressId2 = id;
        }

        if (!util.functions.ifHaveFun(that.addressId2)) {
            that.addresInfoFun(4, "");
            that.tianjia = true;
        } else {
            let req = {
                id: id
            };
            that.tianjia = false;
            that.addresInfoFun(4, JSON.stringify(req));
        }
    },
    methods: {
        // 地址详情
        addresInfoFun(type, req, cindex) {
            let that = this;
            that.showLoading = true;
            let paramsJson = {
                type: type,
                req: req,
                zz_userid: that.$cookies.get("zz_userid"),
                username: that.$route.query.username
            };
            addressInfo(paramsJson)
                .then(res => {
                    that.showLoading = false;
                    setTimeout(() => {
                        that.$cookies.set("queryJsonAdress", {});
                    });
                    if (type == 4) {
                        //修改
                        let addressList = res.form_info,
                            nameValue,
                            cityValue = "",
                            addressValue,
                            phoneValue,
                            codeValue,
                            objarray1,
                            personWrite,
                            checkBoxValuesLast = "";
                        for (let i = 0; i < addressList.length; i++) {
                            // 姓名
                            if (addressList[i].system_type == 1) {
                                nameValue = addressList[i].default_value;
                            }
                            // 城市
                            if (addressList[i].system_type == 2) {
                                let cityValue2 = addressList[i].default_value;
                                if (util.functions.ifHaveFun(cityValue2)) {
                                    // 省
                                    if (util.functions.ifHaveFun(cityValue2.province)) {
                                        cityValue = cityValue + cityValue2.province + " ";
                                    }
                                    // 市
                                    if (util.functions.ifHaveFun(cityValue2.city)) {
                                        cityValue = cityValue + cityValue2.city + " ";
                                    }
                                    // 区
                                    if (util.functions.ifHaveFun(cityValue2.district)) {
                                        cityValue = cityValue + cityValue2.district + " ";
                                    }
                                    // 街道
                                    if (util.functions.ifHaveFun(cityValue2.street)) {
                                        cityValue = cityValue + cityValue2.street + " ";
                                    }
                                    // 小区
                                    if (util.functions.ifHaveFun(cityValue2.xiaoqu)) {
                                        cityValue = cityValue + cityValue2.xiaoqu;
                                    }
                                    that.addrInfo2 = cityValue2;
                                }
                            }
                            // 详细地址
                            if (addressList[i].system_type == 3) {
                                addressValue = addressList[i].default_value;
                            }
                            // 电话
                            if (addressList[i].system_type == 4) {
                                phoneValue = addressList[i].default_value;
                            }
                            // 邮编
                            if (addressList[i].system_type == 5) {
                                codeValue = addressList[i].default_value;
                            }
                            // 单选数组
                            if (addressList[i].system_type == 0 && addressList[i].type == 1) {
                                let objarray = addressList[i].default_value,
                                    radioValueLast;
                                for (let j = 0; j < objarray.length; j++) {
                                    if (objarray[j].c == 1) {
                                        radioValueLast = objarray[j].v;
                                    }
                                }
                                if (util.functions.ifHaveFun(radioValueLast)) {
                                    addressList[i].changeText = true;
                                } else {
                                    addressList[i].changeText = false;
                                }
                            }
                            // 多选数组
                            if (addressList[i].system_type == 0 && addressList[i].type == 2) {
                                (objarray1 = addressList[i].default_value), (addressList[i].checkbox = "");
                                for (let j = 0; j < objarray1.length; j++) {
                                    if (objarray1[j].c == 1) {
                                        addressList[i].checkbox = addressList[i].checkbox + objarray1[j].v + ",";
                                    }
                                }
                                if (addressList[i].checkbox != "") {
                                    addressList[i].checkbox = addressList[i].checkbox.substring(
                                        0,
                                        addressList[i].checkbox.length - 1
                                    );
                                }
                            }
                            // 单选文本
                            if (addressList[i].system_type == 0 && addressList[i].type == 3) {
                                if (util.functions.ifHaveFun(addressList[i].default_value)) {
                                    addressList[i].placeValue = addressList[i].default_value;
                                }
                                if (that.tianjia == true) {
                                    addressList[i].default_value = "";
                                }
                            }
                            if (addressList[i].system_type == 0) {
                                addressList[i].system_status = 1;
                            }
                        }
                        let systemzdy = [];
                        for (let i = 0; i < addressList.length; i++) {
                            if (addressList[i].system_type == 0) {
                                systemzdy.push(addressList[i]);
                            }
                        }
                        that.addressInfo = addressList;
                        that.is_define = res.is_define;
                        that.nameValue = nameValue;
                        that.cityValue = cityValue;
                        that.addressValue = addressValue;
                        that.phoneValue = phoneValue;
                        that.codeValue = codeValue;
                        that.valueFlg = res.is_default;
                        that.systemzdy = systemzdy;
                        that.clues = res.la;
                    } else if (type == 3) {
                        // 跳转提交订单
                        if (that.orderstatus == 1) {
                            let subMitJson = JSON.parse(decodeURIComponent(that.subMitJson));
                            subMitJson.address_id = res.address_id;
                            that.$router.push({
                                path: "/order/submitOrder/index",
                                query: {
                                    subMitJson: encodeURIComponent(JSON.stringify(subMitJson)),
                                    username: that.$route.query.username
                                }
                            });
                            //跳转列表页
                        } else {
                            let queryJson = {};
                            queryJson.is_set = that.is_set;
                            queryJson.orderId = that.order_id;
                            queryJson.username = that.$route.query.username;
                            queryJson.detailId = that.detail_id;
                            queryJson.redirect = that.redirect;
                            util.functions.ifHaveFun(that.subMitJson) ? (queryJson.subMitJson = that.subMitJson) : "";
                            util.functions.ifHaveFun(that.takeout) ? (queryJson.takeout = that.takeout) : "";
                            util.functions.ifHaveFun(that.jdWay) ? (queryJson.jdWay = that.jdWay) : "";
                            util.functions.ifHaveFun(that.jdStatus) ? (queryJson.jdStatus = that.jdStatus) : "";
                            util.functions.ifHaveFun(that.goodsValueType) ? (queryJson.goodsValueType = that.goodsValueType) : "";
                            util.functions.ifHaveFun(that.textareaValue) ? (queryJson.textareaValue = that.textareaValue) : "";
                            util.functions.ifHaveFun(that.imagesList_back) ? (queryJson.imagesList_back = that.imagesList_back) : "";
                            that.$router.replace({
                                path: "/address/views/addressList",
                                query: queryJson
                            });
                        }
                    } else if (type == 5) {
                        //自定义城市
                        switch (Number(that.cityStatus)) {
                            case 0:
                                let provinceCity = that.proFun(that.cityArr, cindex);
                                that.cityArr = provinceCity;
                                if (!util.functions.ifHaveFun(res)) {
                                    that.closeModal();
                                }
                                break;
                            case 1:
                                if (!util.functions.ifHaveFun(res) || Number(res[0].type) > 1) {
                                    let provinceCity1 = that.proFun(
                                        that.cityArr1,
                                        !util.functions.ifHaveFun(res) || Number(res[0].type) > 1 ? cindex : -1
                                    );
                                    that.cityArr1 = provinceCity1;
                                }
                                if (!util.functions.ifHaveFun(res)) {
                                    that.closeModal();
                                }
                                break;
                            case 2:
                                if (!util.functions.ifHaveFun(res) || Number(res[0].type) > 2) {
                                    let provinceCity2 = that.proFun(
                                        that.cityArr2,
                                        !util.functions.ifHaveFun(res) || Number(res[0].type) > 2 ? cindex : -1
                                    );
                                    that.cityArr2 = provinceCity2;
                                }
                                if (!util.functions.ifHaveFun(res)) {
                                    that.closeModal();
                                }
                                break;
                            case 3:
                                if (!util.functions.ifHaveFun(res) || Number(res[0].type) > 3) {
                                    let provinceCity3 = that.proFun(
                                        that.cityArr3,
                                        !util.functions.ifHaveFun(res) || Number(res[0].type) > 3 ? cindex : -1
                                    );
                                    that.cityArr3 = provinceCity3;
                                }
                                if (!util.functions.ifHaveFun(res)) {
                                    that.closeModal();
                                }
                                break;
                            case 4:
                                if (!util.functions.ifHaveFun(res)) {
                                    let provinceCity4 = that.proFun(
                                        that.cityArr4,
                                        !util.functions.ifHaveFun(res) ? cindex : -1
                                    );
                                    that.cityArr4 = provinceCity4;
                                }
                                if (!util.functions.ifHaveFun(res)) {
                                    that.closeModal();
                                }
                                break;
                        }
                        if (util.functions.ifHaveFun(res)) {
                            let addressLastValue = res;
                            switch (Number(addressLastValue[0].type)) {
                                // 省
                                case 0:
                                    that.cityArr = that.cityArr ? that.cityArr : addressLastValue;
                                    that.againStatus = 1;
                                    break;
                                //  市
                                case 1:
                                    that.againStatus = 1;
                                    that.province = that.cityName;
                                    that.cityStatus = 1;
                                    that.province1 = util.functions.ifHaveFun(addressLastValue)
                                        ? that.clues.qingxuanzeshi
                                        : 0;
                                    that.cityArr1 = addressLastValue;
                                    that.ityJson = 2;
                                    that.province2 = false;
                                    that.province3 = false;
                                    that.province4 = false;
                                    that.cityArr2 = [];
                                    that.cityArr3 = [];
                                    that.cityArr4 = [];
                                    break;
                                //  区
                                case 2:
                                    that.province1 = that.cityName;
                                    that.province2 = util.functions.ifHaveFun(addressLastValue)
                                        ? that.clues.qingxuanzequ
                                        : 0;
                                    that.cityStatus = 2;
                                    that.cityArr2 = addressLastValue;
                                    that.cityJson = 3;
                                    that.province3 = false;
                                    that.province4 = false;
                                    that.cityArr3 = [];
                                    that.cityArr4 = [];
                                    break;
                                // 街道
                                case 3:
                                    that.province2 = that.cityName;
                                    that.province3 = util.functions.ifHaveFun(addressLastValue)
                                        ? that.clues.qingxuanzejiedao
                                        : 0;
                                    that.cityStatus = 3;
                                    that.cityArr3 = addressLastValue;
                                    that.cityJson = 4;
                                    that.province4 = false;
                                    that.cityArr4 = [];
                                    break;
                                // 小区
                                case 4:
                                    that.province3 = that.cityName;
                                    that.province4 = util.functions.ifHaveFun(addressLastValue)
                                        ? that.clues.qingxuanzexiaoqu
                                        : 0;
                                    that.cityStatus = 4;
                                    that.cityJson = 5;
                                    that.cityArr4 = addressLastValue;
                                    break;
                            }
                            that.City1 = true;
                            that.showModal_bg = true;
                            that.ifRadio = 3;
                        } else {
                            switch (Number(that.cityStatus)) {
                                // 省
                                case 0:
                                    if (!util.functions.ifHaveFun(req)) {
                                        // 刷新页面
                                        Hint.Msg({
                                            message: "暂无城市可选择"
                                        });
                                    } else {
                                        that.province1 = false;
                                        that.province2 = false;
                                        that.province3 = false;
                                        that.province4 = false;
                                        that.cityArr1 = [];
                                        that.cityArr2 = [];
                                        that.cityArr3 = [];
                                        that.cityArr4 = [];
                                        that.province = that.cityName;
                                        that.cityJson = 1;
                                    }
                                    break;
                                //  市
                                case 1:
                                    for (let i in that.cityArr1) {
                                        if (that.cityArr1[i].is_check == 1) {
                                            that.province1 = that.cityArr1[i].name;
                                        }
                                    }
                                    that.province2 = false;
                                    that.province3 = false;
                                    that.province4 = false;
                                    that.cityArr2 = [];
                                    that.cityArr3 = [];
                                    that.cityArr4 = [];
                                    that.province1 = that.cityName;
                                    that.cityJson = 2;
                                    break;
                                //  区
                                case 2:
                                    for (let i in that.cityArr2) {
                                        if (that.cityArr2[i].is_check == 1) {
                                            that.province2 = that.cityArr2[i].name;
                                        }
                                    }
                                    that.province3 = false;
                                    that.province4 = false;
                                    that.cityArr3 = [];
                                    that.cityArr4 = [];
                                    that.province2 = that.cityName;
                                    that.cityJson = 3;
                                    break;
                                //  街道
                                case 3:
                                    for (let i in that.cityArr3) {
                                        if (that.cityArr3[i].is_check == 1) {
                                            that.province3 = that.cityArr3[i].name;
                                        }
                                    }
                                    that.province4 = false;
                                    that.cityArr4 = [];
                                    that.province3 = that.cityName;
                                    that.cityJson = 4;
                                    break;
                                //  小区
                                case 4:
                                    for (let i in that.cityArr4) {
                                        if (that.cityArr4[i].is_check == 1) {
                                            that.province4 = that.cityArr4[i].name;
                                        }
                                    }
                                    that.province4 = that.cityName;
                                    that.cityJson = 5;
                                    break;
                            }
                        }
                    } else if (type == 6) {
                        let cityValueSix = res,
                            shiArr = [],
                            shiArr2 = [],
                            shiArr3 = [],
                            shiArr4 = [],
                            sixNum = 0,
                            sixNum1 = 0,
                            sixNum2 = 0,
                            sixNum3 = 0,
                            numValue = 0,
                            numValue1 = 0,
                            numValue2 = 0,
                            numValue3 = 0;
                        for (let i in cityValueSix) {
                            // 省
                            if (i == 0 && util.functions.ifHaveFun(cityValueSix[i])) {
                                for (let j in cityValueSix[i]) {
                                    if (cityValueSix[i][j].is_check == 1) {
                                        that.province = cityValueSix[i][j].name;
                                        sixNum = cityValueSix[i][j].id;
                                    }
                                }
                                that.cityArr = cityValueSix[i];
                            }
                            // 市
                            if (i == 1 && util.functions.ifHaveFun(cityValueSix[i])) {
                                for (let j in cityValueSix[i]) {
                                    if (cityValueSix[i][j].parent_id == sixNum) {
                                        shiArr = shiArr.concat(cityValueSix[i][j]);
                                        if (cityValueSix[i][j].is_check == 1) {
                                            (that.province1 = cityValueSix[i][j].name), (that.cityStatus = 1);
                                            sixNum1 = cityValueSix[i][j].id;
                                            numValue++;
                                        }
                                        if (!numValue) {
                                            that.province2 = that.clues.qingxuanzeshi;
                                        }
                                    }
                                }
                                that.cityArr1 = shiArr;
                            }
                            // 区
                            if (i == 2 && util.functions.ifHaveFun(cityValueSix[i])) {
                                for (let j in cityValueSix[i]) {
                                    if (cityValueSix[i][j].parent_id == sixNum1) {
                                        shiArr2 = shiArr2.concat(cityValueSix[i][j]);
                                        if (cityValueSix[i][j].is_check == 1) {
                                            that.province2 = cityValueSix[i][j].name;
                                            that.cityStatus = 2;
                                            sixNum2 = cityValueSix[i][j].id;
                                            numValue1++;
                                        }
                                        if (!numValue1) {
                                            that.province2 = that.clues.qingxuanzequ;
                                        }
                                    }
                                }
                                that.cityArr2 = shiArr2;
                            }
                            // 街道
                            if (i == 3 && util.functions.ifHaveFun(cityValueSix[i])) {
                                for (let j in cityValueSix[i]) {
                                    if (cityValueSix[i][j].parent_id == sixNum2) {
                                        shiArr3 = shiArr3.concat(cityValueSix[i][j]);
                                        if (cityValueSix[i][j].is_check == 1) {
                                            (that.province3 = cityValueSix[i][j].name), (that.cityStatus = 3);
                                            sixNum3 = cityValueSix[i][j].id;
                                            numValue2++;
                                        }
                                        if (!numValue2) {
                                            that.province3 = that.clues.qingxuanzejiedao;
                                        }
                                    }
                                }
                                that.cityArr3 = shiArr3;
                            }
                            // 小区
                            if (i == 4 && util.functions.ifHaveFun(cityValueSix[i])) {
                                for (let j in cityValueSix[i]) {
                                    if (cityValueSix[i][j].parent_id == sixNum3) {
                                        shiArr4 = shiArr4.concat(cityValueSix[i][j]);
                                        if (cityValueSix[i][j].is_check == 1) {
                                            (that.province4 = cityValueSix[i][j].name), (that.cityStatus = 4);
                                            numValue3++;
                                        }
                                        if (!numValue3) {
                                            that.province4 = that.clues.qingxuanzexiaoqu;
                                        }
                                    }
                                }
                                that.cityArr4 = shiArr4;
                            }
                        }
                        that.City1 = true;
                        that.showModal_bg = true;
                        that.typeSix = 1;
                        that.ifRadio = 3;
                        that.againStatus = 1;
                    }
                })
                .catch(err => {
                    that.showLoading = false;
                    setTimeout(() => {
                        that.$cookies.set("queryJsonAdress", {});
                    });
                    if (err.code == 500007) {
                        Hint.Confirm({
                            title: "提示",
                            message: "暂未登录"
                        }).then(() => {
                            // location.href =
                            // "/dom/denglu.php?username=" +
                            // this.$F.username +
                            // "&wap=1&trespass=" +
                            // "this.allData.trespass";
                        });
                    } else if (err.code != 200) {
                        Hint.Msg({
                            message: err.msg
                        });
                    }
                });
        },
        // 添加选中状态
        proFun(value, cindex) {
            for (let i in value) {
                if (i == cindex) {
                    value[i].is_check = 1;
                } else {
                    value[i].is_check = 0;
                }
            }
            return value;
        },
        // 选择省市区
        changeCity(id, name, index) {
            let req = {
                pid: id
            };
            req = JSON.stringify(req);
            this.cityName = name;
            this.cityValueJson = 1;
            this.addresInfoFun(5, req, index);
        },
        // 选择省市区顶部导航
        changeTitle(num) {
            this.cityStatus = num;
        },
        // 保存地址
        saveAddress() {
            let that = this,
                addressLast = that.addressInfo,
                req = {
                    params: {}
                },
                message = that.clues.qingshuru;
            for (let i in addressLast) {
                // 姓名
                if (addressLast[i].system_type == 1 && addressLast[i].is_have == 1) {
                    if (!util.functions.ifHaveFun(that.nameValue)) {
                        Hint.Msg({
                            message: message + addressLast[i].name
                        });
                        return false;
                    } else {
                        req.name = that.nameValue;
                    }
                } else {
                    req.name = that.nameValue;
                }
                // 城市
                if (addressLast[i].system_type == 2 && addressLast[i].is_have == 1) {
                    if (!util.functions.ifHaveFun(that.addrInfo2)) {
                        Hint.Msg({
                            message: message + addressLast[i].name
                        });
                        return false;
                    }
                }
                // 详细地址
                if (addressLast[i].system_type == 3) {
                    if (!util.functions.ifHaveFun(that.addressValue) && addressLast[i].is_have == 1) {
                        Hint.Msg({
                            message: message + addressLast[i].name
                        });
                        return false;
                    } else {
                        req.address = that.addressValue;
                    }
                } else {
                    req.address = that.addressValue;
                }
                // 电话
                if (addressLast[i].system_type == 4) {
                    if (!util.functions.ifHaveFun(that.phoneValue) && addressLast[i].is_have == 1) {
                        Hint.Msg({
                            message: message + addressLast[i].name
                        });
                        return false;
                    } else {
                        req.shouji_tel = that.phoneValue;
                        // if (this.phoneFun(this.phoneValue) || this.telFun(this.phoneValue)) {
                        // } else {
                        //   wx.showToast({
                        //     title: "输入" + addressLast[i].name + "有误",
                        //     icon: 'none'
                        //   })
                        //   return false;
                        // }
                    }
                }
                // 邮编
                if (addressLast[i].system_type == 5) {
                    if (!util.functions.ifHaveFun(that.codeValue) && addressLast[i].is_have == 1) {
                        Hint.Msg({
                            message: message + addressLast[i].name
                        });
                        return false;
                    } else {
                        if (!that.codeFun(that.codeValue)) {
                            Hint.Msg({
                                message: addressLast[i].name + that.clues.xinxiyouwu
                            });
                            return false;
                        }
                        req.postcode = that.codeValue;
                    }
                }
            }
            // 自定义
            let systemzdy = that.systemzdy;
            for (let i in systemzdy) {
                // 单行文本
                if (systemzdy[i].system_type == 0 && systemzdy[i].type == 3) {
                    if (systemzdy[i].is_have == 1) {
                        if (!util.functions.ifHaveFun(systemzdy[i].default_value)) {
                            Hint.Msg({
                                message: message + systemzdy[i].name
                            });
                            return false;
                        } else {
                            req.params[systemzdy[i].id] = systemzdy[i].default_value;
                            // 供应链需要传入的城市
                            if(!util.functions.ifHaveFun(that.cityValue)){
                                that.cityValue = systemzdy[i].default_value;
                            }
                        }
                    } else {
                        req.params[systemzdy[i].id] = systemzdy[i].default_value;
                    }
                }

                // 单选
                if (systemzdy[i].system_type == 0 && systemzdy[i].type == 1) {
                    if (systemzdy[i].is_have == 1) {
                        let num = 0,
                            radioVe = "";
                        if (!util.functions.ifHaveFun(systemzdy[i].changeText)) {
                            Hint.Msg({
                                message: that.clues.qingxuanze + systemzdy[i].name
                            });
                            return false;
                        } else {
                            for (let j in systemzdy[i].default_value) {
                                if (systemzdy[i].default_value[j].c == 1) {
                                    req.params[systemzdy[i].id] = systemzdy[i].default_value[j].v;
                                }
                            }
                        }
                    } else {
                        for (let j in systemzdy[i].default_value) {
                            if (systemzdy[i].default_value[j].c == 1) {
                                req.params[systemzdy[i].id] = systemzdy[i].default_value[j].v;
                            }
                        }
                    }
                }
                // 多选
                if (systemzdy[i].system_type == 0 && systemzdy[i].type == 2) {
                    if (systemzdy[i].is_have == 1) {
                        let num = 0,
                            checkVe = "";
                        if (!util.functions.ifHaveFun(systemzdy[i].checkbox)) {
                            Hint.Msg({
                                message: that.clues.qingxuanze + systemzdy[i].name
                            });
                            return false;
                        } else {
                            let duoxuan = systemzdy[i].checkbox.replace(/,/g, "#");
                            req.params[systemzdy[i].id] = duoxuan;
                        }
                    } else {
                        if (systemzdy[i].checkbox != "") {
                            let duoxuan2 = systemzdy[i].checkbox.replace(/,/g, "#");
                            req.params[systemzdy[i].id] = duoxuan2;
                        }
                    }
                }
            }
            req.is_default = that.valueFlg ? 1 : 0;
            req.id = that.addressId2;
            if((typeof that.$cookies.get("supplyCity")) == 'string'){
                that.$cookies.set("supplyCity",1);
            }
            // 更新地址编码
            let supplyJson = util.functions.ifHaveFun(that.$cookies.get("supplyCity"))
                ? that.$cookies.get("supplyCity")
                : {};
            if (util.functions.ifHaveFun(that.addrInfo2)) {
                supplyJson[2] =
                    (util.functions.ifHaveFun(that.addrInfo2.province) ? that.addrInfo2.province : "") +
                    " " +
                    (util.functions.ifHaveFun(that.addrInfo2.city) ? that.addrInfo2.city : "") +
                    " " +
                    (util.functions.ifHaveFun(that.addrInfo2.district) ? that.addrInfo2.district : "");

                that.$cookies.set("supplyCity", supplyJson);
                that.cityInfo =
                    supplyJson[2] + " " + (util.functions.ifHaveFun(that.addressValue) ? that.addressValue : "");
                req = Object.assign(req, that.addrInfo2);
                var cityJsonValue = Object.keys(that.addrInfo2);
                if (cityJsonValue.length == that.cityJson || that.cityValueJson != 1) {
                    that.addresInfoFun(3, JSON.stringify(req));
                } else {
                    Hint.Msg({
                        message: "请完善城市内容"
                    });
                }
                that.getAddressCodingt();
                that.getAddressCodingt2();
            } else {
                that.addresInfoFun(3, JSON.stringify(req));
            }
        },
        // 自定义城市
        cityFun() {
            let that = this;
            let address = that.cityArr,
                addressInfo = that.addressInfo;
            if (that.is_define == 1) {
                if (util.functions.ifHaveFun(address)) {
                    for (let i = 0; i < address.length; i++) {
                        if (address[i].is_check == 1) {
                            that.addresInfoFun(5, "", i);
                            return false;
                        }
                    }
                }
                let req = {};
                for (let i in addressInfo) {
                    if (addressInfo[i].system_type == 2 && addressInfo[i].type == 4) {
                        let value = addressInfo[i].default_value;
                        if (util.functions.ifHaveFun(value) && that.typeSix == 0) {
                            if (util.functions.ifHaveFun(value.province)) {
                                req[0] = value.province;
                            }
                            if (util.functions.ifHaveFun(value.city)) {
                                req[1] = value.city;
                            }
                            if (util.functions.ifHaveFun(value.district)) {
                                req[2] = value.district;
                            }
                            if (util.functions.ifHaveFun(value.street)) {
                                req[3] = value.street;
                            }
                            if (util.functions.ifHaveFun(value.xiaoqu)) {
                                req[4] = value.xiaoqu;
                            }
                            that.addresInfoFun(6, req);
                        } else {
                            that.addresInfoFun(5, "");
                        }
                    }
                }
            } else {
                if (!util.functions.ifHaveFun(that.cityValue) || this.cityNum == 0) {
                    that.$refs.cityRef.cityOne();
                    this.cityNum++;
                }
                that.$refs.cityRef.showCity();
                // if (isWho == 'ali') {
                //     this.$refs.cityRef.showCity();
                // } else if (isWho == 'weixin') {
                //     this.selectComponent('#changeCity').showCity();
                // } else {
                //     this.getMyLocation();
                // }
            }
        },
        // 回显省市区
        passCityFun(city) {
            // 必须选到区才更新数据
            if (city == "") {
                return false;
            }
            this.addrInfo2.province = city.split(" ")[0];
            this.addrInfo2.city = city.split(" ")[1];
            this.addrInfo2.district = city.split(" ")[2];
            this.cityValue = city;
        },
        // 文本输入事件
        inputFun(num, value, id, index) {
            let that = this;
            switch (Number(num)) {
                //姓名
                case 1:
                    that.nameValue = value;
                    break;
                //城市
                case 2:
                    break;
                //详细地址
                case 3:
                    that.addressValue = value;
                    break;
                //电话
                case 4:
                    that.phoneValue = value;
                    break;
                //邮编
                case 5:
                    that.codeValue = value;
                    break;
                //单行文本
                case 6:
                    let systemzdy = that.systemzdy;
                    for (let i in systemzdy) {
                        if (i == index) {
                            systemzdy[i].default_value = value;
                        }
                    }
                    that.systemzdy = systemzdy;
                    break;
            }
        },
        // 阴影点击
        closeModal() {
            let that = this;
            this.showModal = false;
            this.showModal1 = false;
            this.showModal_bg = false;
            this.City1 = false;

            // 获取多选框的值
            if (this.ifRadio == 2) {
                let systemzdy = this.systemzdy,
                    json = {},
                    num = 0,
                    objarray1 = this.objarray1;
                for (let i = 0; i < systemzdy.length; i++) {
                    if (systemzdy[i].id == this.objarray1_id) {
                        systemzdy[i].checkbox = "";
                        for (let j in objarray1) {
                            if (objarray1[j].c == 1) {
                                num++;
                                systemzdy[i].checkbox = systemzdy[i].checkbox + objarray1[j].v + ",";
                            }
                        }
                        if (num > 0) {
                            systemzdy[i].checkbox = systemzdy[i].checkbox.substring(
                                0,
                                systemzdy[i].checkbox.length - 1
                            );
                        }
                    }
                }

                this.systemzdy = systemzdy;
            }
            // 获取城市的值
            if (this.ifRadio == 3 && this.againStatus == 1) {
                let cityValue = "",
                    addrInfo2 = {},
                    aityVal_city = "";
                // 省
                if (util.functions.ifHaveFun(this.cityArr)) {
                    cityValue = cityValue + this.getIsCheck(this.cityArr) + " ";
                    // aityVal_city = aityVal_city + this.getIsCheck(this.cityArr) + ' '
                    if (this.getIsCheck(this.cityArr)) {
                        addrInfo2.province = this.getIsCheck(this.cityArr);
                    }
                }
                // 市
                if (util.functions.ifHaveFun(this.cityArr1)) {
                    cityValue = cityValue + this.getIsCheck(this.cityArr1) + " ";
                    if (this.getIsCheck(this.cityArr1)) {
                        addrInfo2.city = this.getIsCheck(this.cityArr1);
                    }
                }
                // 区
                if (util.functions.ifHaveFun(this.cityArr2)) {
                    cityValue = cityValue + this.getIsCheck(this.cityArr2) + " ";
                    if (this.getIsCheck(this.cityArr2)) {
                        addrInfo2.district = this.getIsCheck(this.cityArr2);
                    }
                }
                // 街道
                if (util.functions.ifHaveFun(this.cityArr3)) {
                    cityValue = cityValue + this.getIsCheck(this.cityArr3) + " ";
                    if (this.getIsCheck(this.cityArr3)) {
                        addrInfo2.street = this.getIsCheck(this.cityArr3);
                    }
                }
                // 小区
                if (util.functions.ifHaveFun(this.cityArr4)) {
                    cityValue = cityValue + this.getIsCheck(this.cityArr4);
                    if (this.getIsCheck(this.cityArr4)) {
                        addrInfo2.xiaoqu = this.getIsCheck(this.cityArr4);
                    }
                }
                if (this.$util.functions.ifHaveFun(cityValue)) {
                    this.cityValue = cityValue;
                }
                this.addrInfo2 = addrInfo2;
            }
        },
        // 获取ischeck为1的值
        getIsCheck(value) {
            let num = 0;
            if (value.length) {
                for (let i in value) {
                    if (value[i].is_check == 1) {
                        num++;
                        return value[i].name;
                    }
                }
                if (num == 0) {
                    return "";
                }
            } else {
                return "";
            }
        },
        // 单选框
        changeYL(id) {
            this.showModal = true;
            this.showModal_bg = true;
            this.objarrayId = id;
            let systemzdy = this.systemzdy;
            for (let i in systemzdy) {
                if (systemzdy[i].id == this.objarrayId) {
                    this.objarray = systemzdy[i].default_value;
                }
            }
        },
        // 多选框
        changeYL1(id) {
            this.showModal_bg = true;
            this.showModal1 = true;
            this.objarray1_id = id;
            let systemzdy = this.systemzdy;
            for (let i in systemzdy) {
                if (systemzdy[i].id == this.objarray1_id) {
                    this.objarray1 = systemzdy[i].default_value;
                }
            }
        },
        // 单选框,多选框点击事件
        switchTab1(index, num) {
            let objarray = this.objarray,
                objarray1 = this.objarray1,
                systemzdy = this.systemzdy;
            if (num == 1) {
                // 单选框
                for (let i = 0; i < objarray.length; i++) {
                    if (index == i) {
                        objarray[i].c = 1;
                        this.radioValueLast = objarray[i].v;
                    } else {
                        objarray[i].c = 0;
                    }
                }
                for (let i in systemzdy) {
                    if (systemzdy[i].id == this.objarrayId) {
                        systemzdy[i].changeText = true;
                        for (let j in systemzdy[i].default_value) {
                            if (j == index) {
                                systemzdy[i].default_value[j].c = 1;
                            } else {
                                systemzdy[i].default_value[j].c = 0;
                            }
                        }
                    }
                }
                this.systemzdy = systemzdy;
                this.objarray = objarray;
            } else if (num == 2) {
                //多选框
                for (let i = 0; i < objarray1.length; i++) {
                    if (index == i) {
                        objarray1[i].c = !objarray1[i].c;
                    }
                }
                this.objarray1 = objarray1;
                this.ifRadio = 2;
            }
        },

        // 设为默认地址
        selectStatus() {
            this.valueFlg = !this.valueFlg;
        },
        // 地图
        getMyLocation() {
            let that = this;
            that.dtStatus = true;
            // this.ifNav = false;
            setTimeout(() => {
                that.$refs.BaiduGPSLayer.showHideLayer(1);
            }, 10);
        },
        // textarea聚焦
        // textareaFocus() {
        //     this.textareaStatus = false;
        //     this.textareaStatus2 = false;
        // },
        // textareaBlur() {
        //     this.textareaStatus = true;
        // },

        /**
         * @Date: 2020-11-10 14:14:07
         * @LastEditors: zhouqi
         * @description: 百度地图更改地址后回调
         * @param {*}
         * @return {*}
         */
        bdGetCity(res) {
            const that = this,
                addrInfo2 = {};
            setTimeout(() => {
                that.dtStatus = false;
            }, 400);
            if (res.address != res.title) {
                let mapVal = util.functions.getMapValue(res);
                that.cityValue = mapVal.cityValue;
                that.addressValue = mapVal.addressValue;
                that.addrInfo2 = mapVal.addrInfo2;
            }
        },

        // 循环取出对象的值，并用逗号隔开
        takeObjectFun(obj) {
            let value = "";
            for (let i in obj) {
                value = value + obj[i] + ",";
            }
            value = value.slice(0, value.length - 1);
            return value;
        },
        //判断是否为手机号的正则表达式
        phoneFun(phones) {
            var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if (!myreg.test(phones)) {
                return false;
            } else {
                return true;
            }
        },

        // 判断是否为电话号
        telFun(tels) {
            var myreg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
            if (!myreg.test(tels)) {
                return false;
            } else {
                return true;
            }
        },
        // 判断是否为邮编
        codeFun(code) {
            var myreg = /^[a-zA-Z0-9\s]{0,20}$/gi;
            if (!myreg.test(code)) {
                return false;
            } else {
                return true;
            }
        },
        // 判断输入内容长度
        chengkLength(value, maxLength) {
            let length = value.length;
            if (length > maxLength) {
                return false;
            } else {
                return true;
            }
        },
        // 色系接口
        getColorFun() {
            let that = this;
            // 色系接口
            getColor({ username: this.$route.query.username }).then(res => {
                // 调取颜色
                // setTimeout(function() {
                that.theme = util.functions.colorFun(res.color);
                // }, 100);
            });
        },
        // 供应链编码获取
        getAddressCodingt() {
            let that = this,
                supplyCity = util.functions.ifHaveFun(that.$cookies.get("supplyCity"))
                ? that.$cookies.get("supplyCity")
                : {};
            that.$cookies.set("obtainStatus", "1");
            supplyCity = util.functions.ifHaveFun(supplyCity[2]) ? supplyCity[2] : "";
            getJdAddressCode({
                username: that.$route.query.username,
                address: util.functions.ifHaveFun(this.cityInfo)
                        ? this.cityInfo
                        : util.functions.ifHaveFun(supplyCity)
                        ? supplyCity
                        : ""
            }).then(res=>{
                that.$cookies.set("supplyCoding", res);
            })
        },
        // 列表页只需要传入省获取地址编码
        getAddressCodingt2() {
            let that = this,
                supplyCity = util.functions.ifHaveFun(that.$cookies.get("supplyCity"))
                ? that.$cookies.get("supplyCity")
                : {},
                supplyArr = [];
            supplyArr = util.functions.ifHaveFun(supplyCity[2]) ? supplyCity[2] : "";
            if (util.functions.ifHaveFun(supplyArr)) {
                supplyArr = supplyArr.split(" ")[0];
            }
           getJdAddressCode({
                username: that.$route.query.username,
                address: supplyArr
            }).then(res=>{
                that.$cookies.set("supplyCoding_address", res);
            })
        },

        addWechatAddress(options) {
            var postalCode = +options.postalCode;
            var provinceCode = parseInt(postalCode / 10000) * 10000;
            var countryCode = parseInt(postalCode / 100) * 100;
            var region = [provinceCode, countryCode, postalCode].join("-");

            var postData = {
                receiver_name: options.userName,
                receiver_phone: options.telNumber,
                receiver_state: options.provinceName,
                receiver_city: options.cityName,
                receiver_district: options.countryName,
                receiver_address: options.detailInfo,
                receiver_zip: postalCode,
                region: region,
                tag: "",
                is_default: 1
            };
        },
        // 判断是否显示获取微信地址
        weixinShareFun() {
            weixinShare({
                username: this.$route.query.username,
                url: location.href
            }).then(res => {
                // 这里判断如果没配置过微信签名，则返回空
                if (util.functions.ifHaveFun(res.signPackage) && util.functions.IsWX()) {
                    this.getWxStatus = true;
                }
            });
        },
        /**
         * @Date: 2020-11-27 13:58:46
         * @LastEditors: zhouqi
         * @description: 获取微信收货地址
         * @param {*}
         * @return {*}
         */
        getWeixinAddress() {
            util.wechat.share(this.wxRegCallback, location.href, this.$route.query.username, 3);
        },
        wxRegCallback(data) {
            this.cityNum = 0;
            this.nameValue = data.userName; // 收货人姓名
            this.cityValue = data.provinceName + " " + data.cityName + " " + data.countryName; //(省、市、区)
            this.addressValue = data.detailInfo; //详细收货地址信息
            this.addressValue = data.detailInfo; //详细收货地址信息
            this.phoneValue = data.telNumber; //收货人手机号码
            this.codeValue = data.postalCode; // 邮编
            // 隐藏获取微信收货地址
            this.getWxStatus = false;

            this.addrInfo2.province = data.provinceName;
            this.addrInfo2.city = data.cityName;
            this.addrInfo2.district = data.countryName;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/pages/address/assets/addressDetail.scss";
@import "@/pages/order/assets/css/color.scss";
</style>

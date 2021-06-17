<!--
 * @Author       : zhouqi
 * @description  : description
 * @Date         : 2020-11-19 17:28:41
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-06-15 09:55:56
 * @FilePath     : /vue-VFrontend/src/pages/order/components/buystore.vue
-->
<template>
    <div class="buystore-box">
        <!-- <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" /> -->
        <div class="buystore">
            <!-- 购买门店 -->
            <CustomPopup ref="buyStoreRef" class="payWay" v-if="buyStoreStatus" @closeStoreFun="closeStoreFun(1)">
                <div slot="PoperContentHigh" class="changeCityClass">
                    <div class="changeCityBox">
                        <div class="changeCityBox_top" style="border-bottom:0;">
                            <div class="changeCityBox_top_left changeCityBox_top_left_heng">
                                <span>请选择自提门店</span>
                                <img
                                    @click="againLocation"
                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_VFrontend/VF_shuaxin.png"
                                    alt=""
                                />
                            </div>
                            <div class="changeCityBox_top_right" @click="closeStoreFun(1)">
                                <div class="weixinAdress_closeIcon">
                                    <span class="weixinAdress_closeIcon_left"></span>
                                    <span class="weixinAdress_closeIcon_right"></span>
                                </div>
                            </div>
                        </div>
                        <div id="Distribution" class="distribution_content">
                            <div v-if="store_list.length && ZT_status == 1">
                                <div
                                    class="distribution_ListValue"
                                    @click="sotesClick(index)"
                                    v-for="(item, index) in store_list"
                                    :key="index"
                                >
                                    <div class="weixinAdress_closeIcon">
                                        <i class="sjzs-icon s-icon-location-1" style="color:#000;flex:none;"></i>
                                        <div class="distribution_ListTop_left" style="align-items:flex-start;">
                                            <div>{{ item.name }}</div>
                                            <div style="color:#000;">
                                                {{ item.province + item.city + item.district + item.address }}
                                            </div>
                                            <div v-if="newOrderJson != ''">{{ item.distanceInfo }}</div>
                                        </div>
                                        <div class="distribution_ListTop_right">
                                            <div
                                                :class="
                                                    item.is_check == 1
                                                        ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                        : 'shoppingContent_radio'
                                                "
                                                :style="{
                                                    background: item.is_check == 1 ? bgcColor1 : '',
                                                    borderColor: item.is_check == 1 ? bgcColor1 : '' + '!important'
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

                                <div class="dixian" v-if="pages > pageCnt && store_list.length > 4">
                                    我也是有底线的~
                                </div>
                            </div>
                            <div
                                v-else-if="!newOrderJson.lat && !newOrderJson.lng && !showLoading && ZT_status == 0"
                                class="noPeiSong"
                                style="margin-left:-0.26rem;"
                            >
                                <div class="changeCityBox_content_noValue payCard_noCard">
                                    <img
                                        style="width: 1.56rem;height:1.5rem"
                                        src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_VFrontend/VF_buystore.png"
                                        alt="城市"
                                    />
                                    <span class="openPermissions" style="font-size:0.28rem;color:#222;"
                                        >没有查询到您的定位</span
                                    >
                                    <span class="openPermissions">请确认您已打开位置获取权限</span>
                                    <span
                                        class="openPermissions"
                                        @click="submitStores(1)"
                                        :style="{ color: bgcColor1 }"
                                        style="font-size:0.28rem;"
                                        >查看全部门店</span
                                    >
                                </div>
                            </div>
                            <div v-if="showLoading" class="noPeiSong" style="margin-left:-0.26rem;">
                                <div class="changeCityBox_content_noValue payCard_noCard">
                                    <span style="font-size:0.28rem;color:#A9A9A9">努力加载中...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="PoperContentBtn" @click="closeStoreFun(1)" :style="{ color: bgcColor1 }">
                        {{ storesData.tips.queren }}
                    </div>
                </div>
            </CustomPopup>
        </div>
    </div>
</template>

<script>
const { log } = console;
import { getStoreinfo } from "@/api/order/submitOrder.js";
// vant组件
import Hint from "@/plugins/hint";
// 弹窗插槽组件
import CustomPopup from "@/components/CustomPopup/custompopup.vue";
import util from "@/libs/util";
export default {
    props: {
        storeParam: {
            type: Object,
            default: {}
        },
        againNum: {
            type: Number,
            default: {}
        }
    },
    data() {
        return {
            bgcColor1: "#f00",
            buyStoreStatus: false,
            pages: 1,
            store_list: [],
            pageCnt: 0,
            storesData: {},
            showLoading: false,
            pages2: 1,
            bottomNum: 0,
            newOrderJson: "",
            ZT_status: 0,
            showLoadingStatus:0
        };
    },
    components: {
        CustomPopup
    },
    mounted() {
        if (util.functions.ifHaveFun(this.$cookies.get("newOrderJson"))) {
            this.newOrderJson = this.$cookies.get("newOrderJson");
        }
        if(util.functions.ifHaveFun(this.$cookies.get("ZT_status"))){
            this.ZT_status = this.$cookies.get("ZT_status");
        }
    },
    methods: {
        //购买门店
        submitStores(type) {
            let that = this;
            that.showLoading = true;
            if (util.functions.ifHaveFun(that.$cookies.get("newOrderJson"))) {
                that.newOrderJson = that.$cookies.get("newOrderJson");
            }
            // ZT_status这个参数用来判断当用户拒绝授权点击全部门店时为1，或者同意授权为1
            if (util.functions.ifHaveFun(that.$cookies.get("ZT_status"))) {
                that.ZT_status = that.$cookies.get("ZT_status");
            }
            that.showLoadingStatus = 0;
            let req = {
                type: 1,
                store_id: that.storeParam.buy_store_id
            };
            if (util.functions.ifHaveFun(that.newOrderJson)) {
                req.lng = that.newOrderJson.lng;
                req.lat = that.newOrderJson.lat;
                if (req.lng && req.lat) {
                    that.ZT_status = 1;
                    that.$cookies.set("ZT_status", 1);
                }
            } else {
                if (type == 1) {
                    that.ZT_status = 1;
                    that.$cookies.set("ZT_status", 1);
                }
            }
            let paramsJson = {
                zz_userid: that.$cookies.get("zz_userid"),
                page: that.pages,
                req: JSON.stringify(req),
                username: that.$route.query.username,
                client_type: 1
            };

            getStoreinfo(paramsJson)
                .then(res => {
                    that.showLoading = false;
                    that.storesData = res;
                    that.pageCnt = res.page_cnt;

                    if (res.store_list.length > 0) {
                        that.store_list = that.store_list.concat(res.store_list);
                    }
                    that.buyStoreStatus = true;
                    that.bottomNum = 1;
                    setTimeout(() => {
                        that.$refs.buyStoreRef.showCustom();
                        $("#Distribution").scroll(function() {
                            let nScrollHight = $(this)[0].scrollHeight;
                            let nScrollTop = $(this)[0].scrollTop;
                            let nDivHight = $(this).height();
                            if (nScrollTop + nDivHight + 1 >= nScrollHight) {
                                if (that.pages > that.pageCnt || that.bottomNum == 0) {
                                    return false;
                                }
                                that.bottomNum = 0;
                                that.pages = that.pages + 1;
                                that.submitStores();
                            }
                        });
                    });
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Msg({
                        message: err.msg
                    });
                });
        },
        // 展开购买门店
        buyShow() {
            if (this.storeParam.numData > 2) {
                this.$refs.buyStoreRef.showCustom();
                return false;
            }
            this.submitStores();
        },
        /**
         * @Date: 2020-11-19 19:25:05
         * @LastEditors: zhouqi
         * @description: 关闭弹窗
         * @param {type} 1:购买门店
         * @return {*}
         */
        closeStoreFun(type) {
            if (type == 1) {
                this.$refs.buyStoreRef.maskClickHidden();
                this.$emit("closeStoreFun");
            }
        },
        /**
         * @Date: 2020-11-19 19:57:30
         * @LastEditors: zhouqi
         * @description: 购买门店点击
         * @param {*} index:索引
         * @return {*}
         */

        sotesClick(index) {
            let that = this,
                data = that.changeFun(that.store_list, 1, index, "cancel"),
                dataJson = {},
                num = 0;
            for (let i in data.array) {
                if (data.array[i].is_check == 1) {
                    num++;
                    dataJson.id = data.array[i].id;
                    dataJson.name = data.array[i].name;
                }
            }
            if (num == 0) {
                dataJson.id = 0;
                dataJson.id = "";
            }
            if(util.functions.ifHaveFun(that.newOrderJson)){
                dataJson.lng = that.newOrderJson.lng;
                dataJson.lat = that.newOrderJson.lat;
            }
            that.$forceUpdate();
            that.$emit("storeFun", dataJson);
        },
        // 重新获取位置
        againLocation() {
            const that = this;
            if(that.showLoadingStatus == 1){
                return false;
            }
            that.showLoadingStatus = 1;
            //H5页面
            let geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(res) {
                // 同意位置授权
                if (res != null) {
                    let json = {
                        lat: res.latitude,
                        lng: res.longitude
                    };
                    that.$cookies.set("newOrderJson", json);
                    this.newOrderJson = json;
                    that.store_list = [];
                    that.pages = 1;
                    that.pageCnt = 0;
                    that.submitStores();
                } else {
                    //失败的回调
                    that.showLoading = true;
                    that.ZT_status = 0;
                    setTimeout(function() {
                        that.showLoading = false;
                        // 如果已经拒绝了授权，再次点击重新授权，并且点击过了查看全部门店，这个时候需要请求下接口
                        if(that.$cookies.get("ZT_status") == 1){
                            that.$cookies.set("newOrderJson", "");
                            that.store_list = [];
                            that.pages = 1;
                            that.pageCnt = 0;
                            that.submitStores();
                        }else{
                            that.showLoadingStatus = 0;
                        }
                    },1000)
                }
            });
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
        }
    }
};
</script>

<style lang="scss">
@import "@/pages/order/assets/css/buystore.scss";
</style>

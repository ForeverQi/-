<!--
 * @Author       : zhouqi
 * @description  : 同城配送添加地址
 * @Date         : 2021-04-19 14:51:19
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-06-05 14:05:32
 * @FilePath     : /vue-VFrontend/src/pages/address/views/tcpsAdd.vue
-->
<template>
    <div class="TCPS_ADD">
        <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" />
        <div class="tspsAdd" v-if="allAddressInfo != ''">
            <Nav :numerical="2" :tips="clues" />
            <div class="tspsAdd_box" >
                <div class="tspsAdd_top">
                    <div v-for="(item, index) in addressInfo" :key="index">
                        <!--地址-->
                        <div class="tc_child" v-if="item.system_type == 3">
                            <div class="tc_left">{{ item.name }}</div>
                            <div class="tc_right" @click="getMyLocation">
                                <input
                                    class="cityInput"
                                    :placeholder="clues.qingshuru + item.name"
                                    :value="addressValue ? cityValue +' '+ addressValue : ''"
                                    :disabled="true"
                                    type="text"
                                />
                                <div class="nowLocation">
                                    <i
                                        style="font-size: 24rpx;font-weight: 400;"
                                        class="sjzs-icon s-icon-location-1"
                                    ></i>
                                    <!-- <span>当前位置</span> -->
                                </div>
                            </div>
                        </div>
                        <!--门牌号-->
                        <div class="tc_child" v-if="item.system_type == 6">
                            <div class="tc_left">{{ item.name }}</div>
                            <div class="tc_right">
                                <input
                                    :placeholder="clues.qingshuru + item.name"
                                    @input="inputFun(0,$event.target.value)"
                                    :value="houseValue"
                                    type="text"
                                />
                            </div>
                        </div>
                        <!--收货人-->
                        <div class="tc_child" v-if="item.system_type == 1">
                            <div class="tc_left">{{ item.name }}</div>
                            <div class="tc_right">
                                <input
                                    :placeholder="clues.qingshuru + item.name"
                                    @input="inputFun(1,$event.target.value)"
                                    :value="nameValue"
                                    type="text"
                                />
                            </div>
                        </div>
                        <!--手机号-->
                        <div class="tc_child" v-if="item.system_type == 4">
                            <div class="tc_left">{{ item.name }}</div>
                            <div class="tc_right">
                                <input
                                    :placeholder="clues.qingshuru + item.name"
                                    @input="inputFun(2,$event.target.value)"
                                    :value="phoneValue"
                                    type="number"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!--默认收货地址-->
                <div class="tspsAdd_bottom">
                    <div class="Tips_view1">
                        <div class="Tips_txt1">{{ clues.sheweimorendizhi }}</div>
                        <div class="defaultAddress_right">
                            <div
                                @click="selectStatus"
                                :class="valueFlg ? 'marquee marqueeSelect' : 'marquee'"
                                :style="{
                                    background: valueFlg ? newColor1 : '',
                                    borderColor: valueFlg ? newColor1 : 'rgba(219, 219, 219, 1)'
                                }"
                            >
                                <div :class="valueFlg ? 'marqueeButton marqueeButtonSelect' : 'marqueeButton'"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--保存-->
                <div class="tc_save" @click="saveAddress" :style="{ background: newColor1 }">保存</div>
            </div>
        </div>
        <!-- 位置授权 -->
        <BaiduGPS v-if="dtStatus" ref="BaiduGPSLayer" :set-point="SetPoint" @backFunction="bdGetCity" :point="null" />
    </div>
</template>

<script>
const {log} = console;
// 色系
import { getColor } from "@/api/order/submitOrder.js";
// 添加地址，编辑地址
import { addressInfo } from "@/api/address/addressList.js";
// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";
import util from "@/libs/util";
// vant组件
import Hint from "@/plugins/hint";
// 地图组件
import BaiduGPS from "@/pages/shop/views/video/backend/components/BaiduGPS.vue";
export default {
    components:{
        Nav,
        BaiduGPS
    },
    data() {
        return {
            SetPoint:'',
            dtStatus:false,
            valueFlg: false,
            newColor1: "",
            houseValue: "",
            nameValue: "",
            phoneValue: "",
            cityValue: "",
            addressId: 0,
            addressInfo: "",
            allAddressInfo: "",
            subMitJson: {},
            latitude: "",
            longitude: "",
            showLoading:true,
            addressId:0,
            queryJsonAdress:{},
            clues:'',
            addrInfo2:{}
        };
    },
    mounted() {
        const that = this;
        let queryJsonAdress = {};
        if (!util.functions.ifHaveFun(that.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${that.$route.query.username}&wap=1`;
            return false;
        }
        // 调取颜色
        this.getColorFun();
        if (util.functions.ifHaveFun(this.$cookies.get("queryJsonAdress"))) {
            queryJsonAdress = this.$cookies.get("queryJsonAdress");
            this.queryJsonAdress = queryJsonAdress;
        }
        var id = util.functions.ifHaveFun(queryJsonAdress.id) ? queryJsonAdress.id : 0;
        if (util.functions.ifHaveFun(id)) {
            that.addressId = id;
        }
        if (!util.functions.ifHaveFun(this.addressId)) {
            this.addresInfoFun(4, "",1);
            this.tianjia = true;
        } else {
            let req = {
                id: id
            };
            this.tianjia = false;
            this.addresInfoFun(4, req,1);
        }
    },
    methods: {
        // 地址详情
        addresInfoFun(type, req,cindex) {
            let that = this,nowReq = util.functions.ifHaveFun(req) ? req : {};
            that.showLoading = true;
            nowReq.deliveryType = "city";
            if(util.functions.ifHaveFun(that.$route.query.id)){
                nowReq.id = that.$route.query.id;
            }
            let paramsJson = {
                type: type,
                req: JSON.stringify(nowReq),
                zz_userid: that.$cookies.get("zz_userid"),
                username: that.$route.query.username,
                client_type: 1
            };
            addressInfo(paramsJson)
                .then(res => {
                    that.showLoading = false;
                    that.allAddressInfo =res;
                    // 编辑地址的时候传入坐标
                    if(that.allAddressInfo.x && that.allAddressInfo.y){
                        that.SetPoint = {lng:res.x,lat:res.y};
                        that.latitude = res.y;
                        that.longitude = res.x;
                    }
                    // 编辑地址 刚进入的时候先赋值省、市、区
                    if(cindex == 1 && that.allAddressInfo.province && that.allAddressInfo.city){
                        that.addrInfo2.province = that.allAddressInfo.province;
                        that.addrInfo2.city = that.allAddressInfo.city;
                        that.addrInfo2.district = that.allAddressInfo.district;
                        that.cityValue = that.allAddressInfo.province+" " + that.allAddressInfo.city+" "+that.allAddressInfo.district
                    }
                    setTimeout(() => {
                        that.$cookies.set("queryJsonAdress", {});
                    });
                    if (type == 4) {
                        //修改
                        let addressList = res.form_info;
                        for (let i = 0; i < addressList.length; i++) {
                            // 姓名
                            if (addressList[i].system_type == 1) {
                                that.nameValue = addressList[i].default_value;
                            }
                            // 详细地址
                            if (addressList[i].system_type == 3) {
                                that.addressValue = addressList[i].default_value;
                            }
                            // 电话
                            if (addressList[i].system_type == 4) {
                                that.phoneValue = addressList[i].default_value;
                            }
                            // 门牌号
                            if (addressList[i].system_type == 6) {
                                that.houseValue = addressList[i].default_value;
                            }
                        }
                        that.addressInfo = addressList;
                        that.valueFlg = res.is_default;
                        that.clues = res.la;
                    } else if (type == 3) {
                        // 跳转提交订单
                        if (that.queryJsonAdress.orderstatus == 1) {
                            let subMitJson = JSON.parse(decodeURIComponent(that.queryJsonAdress.subMitJson));
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
                            queryJson.deliveryType = "city";
                            util.functions.ifHaveFun(that.queryJsonAdress.subMitJson) ? (queryJson.subMitJson = that.queryJsonAdress.subMitJson) : "";
                            util.functions.ifHaveFun(that.queryJsonAdress.takeout) ? (queryJson.takeout = that.queryJsonAdress.takeout) : "";
                            util.functions.ifHaveFun(that.queryJsonAdress.jdWay) ? (queryJson.jdWay = that.queryJsonAdress.jdWay) : "";
                            util.functions.ifHaveFun(that.queryJsonAdress.jdStatus) ? (queryJson.jdStatus = that.queryJsonAdress.jdStatus) : "";
                            util.functions.ifHaveFun(that.queryJsonAdress.goodsValueType) ? (queryJson.goodsValueType = that.queryJsonAdress.goodsValueType) : "";
                            util.functions.ifHaveFun(that.queryJsonAdress.textareaValue) ? (queryJson.textareaValue = that.queryJsonAdress.textareaValue) : "";
                            util.functions.ifHaveFun(that.queryJsonAdress.imagesList_back) ? (queryJson.imagesList_back = that.queryJsonAdress.imagesList_back) : "";
                            that.$router.replace({
                                path: "/address/views/addressList",
                                query: queryJson
                            });
                        }
                    }
                })
                .catch(err => {
                    that.showLoading = false;
                    if (err.code != 200) {
                        Hint.Msg({
                            message: err.msg
                        });
                    }
                });
        },
        //输入内容
        inputFun(num,value){
            switch(Number(num)){
                case 0:
                    this.houseValue= value;
                    break;
                case 1:
                    this.nameValue= value;
                    break;
                case 2:
                    this.phoneValue= value;
                    break;
            }
        },
        // 地图
        getMyLocation() {
            let that = this;
            that.dtStatus = true;
            setTimeout(() => {
                that.$refs.BaiduGPSLayer.showHideLayer(1);
            }, 10);
        },
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
            if (res && res.address != res.title) {
                log(res)
                let mapVal = util.functions.getMapValue(res);
                that.cityValue = mapVal.cityValue;
                that.addressValue = mapVal.addressValue;
                that.addrInfo2 = mapVal.addrInfo2;
                this.latitude = res.point.lat;
                this.longitude = res.point.lng;
            }
        },
        // 设为默认地址
        selectStatus() {
            this.valueFlg = !this.valueFlg;
        },
         // 保存
        saveAddress(){
            let req = {},addressList=this.addressInfo;
            for (let i in addressList) {
                if(addressList[i].system_type == 3 && addressList[i].is_have == 1){
                    if(!util.functions.ifHaveFun(this.addressValue)){
                        Hint.Msg({
                            message: this.clues.qingshuru + addressList[i].name
                        });
                        return false;
                    }else{
                        req = Object.assign(req, this.addrInfo2);
                        req.address = this.addressValue;
                    }
                }else{
                    req = Object.assign(req, this.addrInfo2);
                    req.address = this.addressValue;
                }
                if(addressList[i].system_type == 6 && addressList[i].is_have == 1 ){
                    if(!util.functions.ifHaveFun(this.houseValue)){
                        Hint.Msg({
                            message: this.clues.qingshuru + addressList[i].name
                        });
                        return false;
                    }else{
                        req.newAddress = this.houseValue;
                    }
                }else{
                    req.newAddress = this.houseValue;
                }
                if( addressList[i].system_type == 1 && addressList[i].is_have == 1){
                    if(!util.functions.ifHaveFun(this.nameValue)){
                        Hint.Msg({
                            message: this.clues.qingshuru + addressList[i].name
                        });
                        return false;
                    }else{
                        req.name = this.nameValue;
                    }
                }else{
                    req.name = this.nameValue;
                }
                if( addressList[i].system_type == 4 && addressList[i].is_have == 1){
                    if(!util.functions.ifHaveFun(this.phoneValue)){
                        Hint.Msg({
                            message: this.clues.qingshuru + addressList[i].name,
                        });
                        return false;
                    }else{
                        req.shouji_tel = this.phoneValue;
                    }
                }else{
                    req.shouji_tel = this.phoneValue;
                }
            }
            req.is_default = this.valueFlg ? 1 : 0;
            req.id = this.addressId;
            req.lat = this.latitude;
            req.lng = this.longitude;
            if(util.functions.ifHaveFun(this.addressId)){
                req.id = this.addressId;
            }
            // console.log(req);
            // return  false;
            this.addresInfoFun(3, req);
        },
        // 色系接口
        getColorFun() {
            let that = this;
            getColor({ username: this.$route.query.username }).then(res => {
                // 调取颜色
                that.theme = util.functions.colorFun(res.color);
                // 这个是优化之后，直接取色系值
                that.newColor1 = util.functions.newColor(res.color).bgcColor1;
            });
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/pages/address/assets/tcps.scss";
</style>

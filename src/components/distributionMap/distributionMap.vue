<!--
 * @Author       : zhouqi
 * @description  : 达达配送地图展示
 * @Date         : 2021-04-20 14:50:52
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-05-14 11:14:46
 * @FilePath     : /VFrontend开发版/src/components/distributionMap/distributionMap.vue
-->
<template>
    <div>
        <baidu-map
            class="map"
            @ready="handler"
            :scroll-wheel-zoom="true"
            :center="center"
            :zoom="scale"
        >
            <mapPopup
                :position="{ lng: lng, lat: lat }"
                :location="1"
                :active="active"
                :optionsVal="optionsVal"
                :distanceData="distanceData"
                @mouseover.native="active = true"
                @mouseleave.native="active = false"
            >
            </mapPopup>
            <mapPopup
                :position="{
                    lng: optionsVal.transporterLng,
                    lat: optionsVal.transporterLat
                }"
                :location="2"
                :active="active"
                :optionsVal="optionsVal"
                :distanceData="distanceData"
                @mouseover.native="active = true"
                @mouseleave.native="active = false"
            >
            </mapPopup>
            <!-- 骑手正在送货 -->
            <div class="qsDelivery">
                <div class="qsDelivery_left" @click="getDaDaOrderProgressFun">
                    <div>
                        {{ mapJson.head_info.title }}
                        <i style="font-size: 0.34rem;color:#ababab;" class="sjzs-icon s-icon-right-1"></i>
                    </div>
                    <div></div>
                </div>
                <div class="qsDelivery_right">
                    <div @click="telClick">
                        <i style="font-size: 0.38rem;color: #fff" class="sjzs-icon s-icon-tel-1"></i>
                    </div>
                </div>
            </div>
            <!-- 配送信息 -->
            <div class="ps_top">
                <span>{{ mapJson.tips.peisongxinxi }}</span>
            </div>
        </baidu-map>
    </div>
</template>

<script>
const {log} = console;
import {
    getDaDaOrderDetails
} from "@/api/order/orderDetail.js";

// map组件
import mapPopup from "@/components/mapPopup/mapPopup.vue"

import util from "@/libs/util"
// vant组件
import Hint from "@/plugins/hint";
export default {
    components: {
        mapPopup
    },
    props: {
        mapJson: {
            type: Object
        }
    },
    data() {
        return {
            distanceData: "",
            active: false,
            optionsVal: {},
            lat: 0,
            lng: 0,
            scale: 15,
            daDaData:'',
            center: { lng: 0, lat: 0 },
            markers: [],
            testNum:0.001,
            dadaInterVal:0
        };
    },
    mounted() {
        // log(this.optionsVal)
        // this.getDaDaOrderDetailsFun();
    },
    methods: {
        // 同城配送骑手正在配送中
        getDaDaOrderDetailsFun(map) {
            var that = this;
            let paramVal = {
                order_id: that.mapJson.order_id,
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                client_type: 1
            };
            getDaDaOrderDetails(paramVal)
                .then(res => {
                        //用户的坐标
                        that.lat = res.userLat;
                        that.lng = res.userLng;
                        // let lngg = res.transporterLng;
                        // let latt = res.transporterLat;
                        // let lngg = 116.22267700195;
                        // let latt = 39.763851165771;
                        let mark1 = { lng: that.lng, lat: that.lat };
                        let mark2 = {
                            lng: res.transporterLng,
                            lat: res.transporterLat
                        };
                        // let mark2 = {
                        //     lng: lngg - that.testNum,
                        //     lat: latt - that.testNum
                        // };
                        that.optionsVal.transporterLng = res.transporterLng;
                        that.optionsVal.transporterLat = res.transporterLat;

                        that.distanceData = util.functions.distance(
                            that.lat,
                            that.lng,
                            // res.transporterLat,
                            // res.transporterLng
                            that.optionsVal.transporterLat,
                            that.optionsVal.transporterLng,
                        );
                        let markers = [];
                        markers.push(mark1);
                        markers.push(mark2);
                        that.markers = markers;

                        // 设置缩放级别
                        let view = map.getViewport(eval(that.markers));
                        this.scale = view.zoom - 1;
                        this.center = view.center;

                        //每隔30s执行一次，小于30米清除定时器
                        that.dadaInterVal = setInterval(() => {
                            clearInterval(that.dadaInterVal);
                            //送达之后不再请求
                            if(!res.transporterLng){
                               this.$parent.ddRefureFun();
                              return false;
                            }
                            // if(that.distanceData < 0.3){
                            //   that.scale = 20;
                            // }
                            // that.testNum = that.testNum - 0.001;
                            that.getDaDaOrderDetailsFun(map);
                        }, 30000);
                        that.$forceUpdate();
                })
                .catch(err => {
                    clearInterval(that.dadaInterVal);
                    Hint.Msg({
                        message: err.msg
                    });
                });
        },
        handler({ BMap, map }) {
            this.getDaDaOrderDetailsFun(map);
        },
        //拨打电话
        telClick() {
            window.location.href = 'tel://' + this.distanceData.transporterPhone
        },
        getDaDaOrderProgressFun() {
            this.$parent.getDaDaOrderProgressFun();
        },
    },
        destroyed() {
            clearInterval(this.dadaInterVal);
        }
};
</script>

<style lang="scss" scoped>
.map {
    height: 9rem;
    position: relative;
}
.qsDelivery{
    position: absolute;
    bottom: .74rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 15;
    width: 95%;
    height: 2.00rem;
    border-radius: .16rem;
    box-sizing: border-box;
    padding: .40rem .50rem;
    overflow: hidden;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.qsDelivery_left div{
    display: flex;
    align-items: center;
}
.qsDelivery_left div:first-child{
    font-size: .48rem;
    font-weight: bold;
    color: #222;
}
.qsDelivery_left div:last-child{
    font-size: .28rem;
    color: #999999;
}
.qsDelivery_right{
    width: .80rem;
    height: .80rem;
    border-radius: 50%;
    overflow: hidden;
    background: #fc273c;
    box-shadow: 1px 1px 0.09rem #999;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ps_top{
    height: .60rem;
    border-radius: .16rem .16rem 0 0;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    background : #fafafa;
    padding: 0 .30rem 0 .30rem;
    font-size: .28rem;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    color: #222;
}
</style>

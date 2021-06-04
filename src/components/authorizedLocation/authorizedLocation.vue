<!--
 * @Author       : zhouqi
 * @description  : description
 * @Date         : 2021-04-18 14:58:03
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-05-31 13:45:28
 * @FilePath     : /VFrontend开发版/src/components/authorizedLocation/authorizedLocation.vue
-->
<template>
    <div></div>
</template>

<script>
import util from "@/libs/util.js";
export default {
    props: {
        againNum: {
            type: Number
        }
    },
    mounted() {
        //   this.getLocation();
    },
    methods: {
        // 获取定位
        getLocation() {
            let orderData = util.functions.ifHaveFun(this.$cookies.get("newOrderJson"))
                    ? this.$cookies.get("newOrderJson")
                    : "",
                that = this;
            // 如果详情页已经选择过地址，并且并未再次点击授权则不授权
            if (util.functions.ifHaveFun(orderData)) {
                return false;
            }
            // app中
            if (that.$util.app.Platform()) {
                that.$util.app.Shop.GetLocation({
                    callback: function(res) {
                        if ("failure" == res) {
                            //失败的回调
                            if (this.$cookies.get("zz_userid")) {
                                // 取地址列表中的省市区
                                that.$cookies.set("newOrderJson", "");
                            }
                        } else {
                            let json = {
                                lat: res.latitude,
                                lng: res.longitude
                            };
                            that.$cookies.set("newOrderJson", json);
                            that.$cookies.set("newOrderStatus", 1);
                            that.$emit("getLocation");
                        }
                    }
                });
            } else {
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
                    } else {
                        //失败的回调
                        that.$cookies.set("newOrderJson", "");
                        that.$cookies.set("newOrderStatus", 1);
                    }
                    that.$emit("getLocation");
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>

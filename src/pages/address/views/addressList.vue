<template>
    <section class="addressList-box">
        <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" style="z-index:2001 !important;" />
        <section class="addressList" :class="theme">
            <Nav v-if="clues" :numerical="1" :tips="clues" />
            <div class="address" v-wechat-title="($route.meta.title = clues.shouhuodizhi)">
                <div class="wrapper">
                    <div class="wrapper_c">
                        <div class="wrapper_bg">
                            <div class="wrapper_bg_c"></div>
                        </div>
                        <div v-if="address.length > 0">
                            <div class="Max_Center">
                                <div
                                    class="address_list"
                                    v-for="(item, index) in address"
                                    :key="index"
                                    @click="addressFun(item.id)"
                                >
                                    <div class="address_list_t">
                                        <div class="user_name">
                                            <div class="user_name_txt">{{ item.name }}</div>
                                            <div class="user_name_txt">{{ item.shouji_tel }}</div>
                                        </div>
                                        <div class="address_txt">
                                            {{ item.province }}{{ item.city }}{{ item.district }}{{ item.street
                                            }}{{ item.xiaoqu }}{{ item.address }}
                                        </div>
                                    </div>
                                    <div class="address_list_b">
                                        <div class="default">
                                            <div
                                                class="default_img"
                                                :class="item.is_default == 1 ? 'dc_active' : ''"
                                                @click.stop="defaultAdd(item.id, index)"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_order_icon5.png"
                                                />
                                            </div>
                                            <div
                                                class="default_txt"
                                                :class="item.is_default == 1 ? 'default_txt_active' : ''"
                                                @click.stop="defaultAdd(item.id, index)"
                                            >
                                                {{ clues.sheweimoren }}
                                            </div>
                                        </div>
                                        <div class="del_img" @click.stop="delList(item.id, index)">
                                            <img
                                                src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/redesign_del.png"
                                            />
                                        </div>
                                        <div class="del_img" @click.stop="editadd(item.id)">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_modify.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="height:1rem;"></div>
                            <div class="bottom">
                                <div class="bottom_navi" @click="addadd" :style="{ background: cssColor }">
                                    <div class="add_img">
                                        <img
                                            src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_add_img.png"
                                        />
                                    </div>
                                    <div class="add_address">{{ clues.xinzengshouhuodizhi }}</div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="Max_Center_noData"
                            @tap="addadd"
                            v-if="address.length == 0 && deliveryType == 'city'"
                        >
                            <img
                                class="noDataImg"
                                style="width: 1.60rem;height: 1.90rem;margin-bottom: 0.60rem"
                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/tcpsAddress.png"
                            />
                            <span style="color: #222222;font-size: 0.34rem;margin-bottom: 0.10rem;">暂无可用地址</span>
                            <span style="font-size: 0.24rem;color: #a9a9a9;white-space: nowrap;"
                                >同城配送需要通过地图定位位置新的配送方式</span
                            >
                            <div class="tcps_address" @click="addadd" :style="'background:' + newColor1">
                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_add_img.png"/>
                                <span>新增地址</span>
                            </div>
                        </div>
                        <div class="Max_Center_noData" @click="addadd" v-if="address.length == 0 && deliveryType != 'city'">
                            <img
                                class="noDataImg"
                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_addressOrder.png"
                            />
                            <span>{{ clues.ninhaimeiyoushouhuodizhi }}</span>
                            <div class="Max_Center_noDataBtn" :style="{ background: newColor1 }">
                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/redesign_add_img.png" />
                                <span>{{ clues.tianjiashouhuodizhi }}</span>
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
// 地址列表，删除地址
import { addressInfo } from "@/api/address/addressList.js";
// 供应链编码
import { getJdAddressCode } from "@/api/gyl.js";
// 色系
import { getColor } from "@/api/order/submitOrder.js";
// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";

import util from "@/libs/util";
export default {
    name: "addressList",
    components: {
        Nav
    },
    data() {
        return {
            // 头部
            titUrl: "",
            Htitle: "收货地址",
            address: 0,
            showLoading: true,
            clues: "",
            // 颜色
            theme: "color1",
            listStatus: "",
            deliveryType: "",
            newColor1:'',
            listData:''
        };
    },
    mounted() {
        var that = this;
        // 调取颜色
        that.getColorFun();
        if (!util.functions.ifHaveFun(that.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${that.$route.query.username}&wap=1`;
            return false;
        }
        that.is_set = util.functions.ifHaveFun(that.$route.query.is_set) ? that.$route.query.is_set : 1;
        var zz_userid = that.$cookies.get("zz_userid"),
            channel_id = that.$route.query.channel_id ? that.$route.query.channel_id : 0,
            takeout = that.$route.query.takeout ? that.$route.query.takeout : 0,
            order_id = that.$route.query.orderId,
            detail_id = that.$route.query.detailId,
            redirect = that.$route.query.redirect,
            subMitJson = that.$route.query.subMitJson,
            jdWay = that.$route.query.jdWay;
        that.channel_id = channel_id;
        that.takeout = takeout;
        that.order_id = order_id;
        that.detail_id = detail_id;
        that.redirect = redirect;
        that.subMitJson = subMitJson;
        that.jdWay = jdWay;
        that.deliveryType = that.$route.query.deliveryType;
        // 色系值
        that.cssColor = "#f00";
        // 列表接口
        that.listFun(1, "");
        // 判断是否滚动触底
        // $(window).scroll(function(){
        //     if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        //         that.listFun(1,"");
        //     }
        // });
        // $("#div1").scroll(function(){
        //     nScrollHight = $(this)[0].scrollHeight;
        //     nScrollTop = $(this)[0].scrollTop;
        //     if(nScrollTop + nDivHight >= nScrollHight)
        //     alert("滚动条到底部了");
        // });
    },
    methods: {
        // 列表接口
        listFun(type, req, detail) {
            let that = this,
                zz_userid = that.$cookies.get("zz_userid"),
                reqNow = util.functions.ifHaveFun(req) ? req : {};
            if (that.is_set == 3 && detail == 1) type = 1;
            if (util.functions.ifHaveFun(this.deliveryType) && this.deliveryType == 'city' ) {
                reqNow.deliveryType = "city";
            }
            let paramsJson = {
                zz_userid: zz_userid,
                type: that.is_set == 2 && detail == 1 ? 1 : type,
                req: JSON.stringify(reqNow),
                username: that.$route.query.username,
                client_type: 1,
                pageSize:40
            };
            addressInfo(paramsJson)
                .then(res => {
                    that.showLoading = false;
                    that.listData = util.functions.ifHaveFun(res) ? res : '';
                    // if (type != 2) {
                    //     that.showLoading = false;
                    // }
                    that.clues = util.functions.ifHaveFun(res.la) ? res.la : that.clues;
                    if (type == 1) {
                        let addresValue = util.functions.ifHaveFun(res.list);
                        if (addresValue) {
                            that.address = res.list;
                        } else {
                            that.address = [];
                        }
                        if (that.is_set == 3 && detail == 1) {
                            //提交订单
                            // 供应链地址编码接口
                            that.getAddressCodingt();
                            that.getAddressCodingt2();
                            let city = "",
                                addresValue2 = util.functions.ifHaveFun(res.list) ? res.list : [];

                            for (let i in addresValue2) {
                                if (addresValue2[i].id == req.id) {
                                    city =
                                        addresValue2[i].province +
                                        " " +
                                        addresValue2[i].city +
                                        " " +
                                        addresValue2[i].district +
                                        " " +
                                        addresValue2[i].street +
                                        " " +
                                        addresValue2[i].xiaoqu;
                                }
                            }
                            let supplyJson = util.functions.ifHaveFun(that.$cookies.get("supplyCity"))
                                ? that.$cookies.get("supplyCity")
                                : {};
                            supplyJson[2] = city;
                            that.$cookies.set("supplyCity", supplyJson);
                            let subMitJson = JSON.parse(decodeURIComponent(that.subMitJson));
                            subMitJson.address_id = req.id;
                            that.$router.push({
                                path: "/order/submitOrder/index",
                                query: {
                                    subMitJson: encodeURIComponent(JSON.stringify(subMitJson)),
                                    username: that.$route.query.username
                                }
                            });
                        }
                    } else if (type == 2) {
                        if (that.is_set == 2) {
                            //申请售后
                            let req3 = {
                                address_id: req.id
                            };
                            that.$router.push({
                                path: "/order/orderRelated/returnGoods",
                                query: {
                                    username: that.$route.query.username,
                                    req: JSON.stringify(req3),
                                    detailId: that.detail_id,
                                    orderId: that.order_id,
                                    redirect: that.redirect,
                                    jdWay: that.jdWay,
                                    jdStatus: that.$route.query.jdStatus,
                                    goodsValueType: that.$route.query.goodsValueType,
                                    textareaValue: that.$route.query.textareaValue,
                                    imagesList_back: that.$route.query.imagesList_back
                                }
                            });
                            // location.href =
                            //     "//" +
                            //     document.domain +
                            //     `/VFrontend/order/orderRelated/returnGoods?username=${
                            //         that.$route.query.username
                            //     }&req=${JSON.stringify(req3)}&detailId=${that.detail_id}&orderId=${
                            //         that.order_id
                            //     }&redirect=${that.redirect}&jdWay=${that.jdWay}&jdStatus=${that.$route.query.jdStatus}&textareaValue=${that.$route.query.textareaValue}`;
                        } else {
                            let types = that.$cookies.get("types");
                            if (detail == 1) {
                                location.href =
                                    "//" +
                                    document.domain +
                                    `/VFrontend/order/orderRelated/orderDetail?username=${that.$route.query.username}&type=${types}`;
                            }
                        }
                    }
                })
                .catch(err => {
                    that.showLoading = false;
                    if (err.code == 500003) {
                        wx.hideLoading();
                        if (type == 2) {
                            if (that.is_set == 2) {
                                //申请售后
                                let req3 = {
                                    address_id: req.id
                                };
                                that.$router.push({
                                    path: "/order/orderRelated/returnGoods",
                                    query: {
                                        username: that.$route.query.username,
                                        req: JSON.stringify(req3),
                                        detailId: that.detail_id,
                                        orderId: that.order_id,
                                        redirect: that.redirect,
                                        jdWay: that.jdWay,
                                        jdStatus: that.$route.query.jdStatus,
                                        goodsValueType: that.$route.query.goodsValueType,
                                        textareaValue: that.$route.query.textareaValue,
                                        imagesList_back: that.$route.query.imagesList_back
                                    }
                                });
                            } else if (that.is_set == 3 && type == 2) {
                                //提交订单
                                // 供应链地址编码接口
                                that.getAddressCodingt();
                                that.getAddressCodingt2();
                                let city = "",
                                    addresValue2 = util.functions.ifHaveFun(res) ? res : [];
                                for (let i in addresValue2) {
                                    if (addresValue2[i].id == req.id) {
                                        city =
                                            addresValue2[i].province +
                                            " " +
                                            addresValue2[i].city +
                                            " " +
                                            addresValue2[i].district +
                                            " " +
                                            addresValue2[i].street +
                                            " " +
                                            addresValue2[i].xiaoqu;
                                    }
                                }
                                let supplyJson = util.functions.ifHaveFun(that.$cookies.get("supplyCity"))
                                    ? that.$cookies.get("supplyCity")
                                    : {};
                                supplyJson[2] = city;
                                that.$cookies.set("supplyCity", supplyJson);

                                let subMitJson = JSON.parse(decodeURIComponent(that.subMitJson));
                                subMitJson.address_id = req.id;
                                wx.navigateTo({
                                    url: `/pages/order/newDetail?subMitJson=${encodeURIComponent(
                                        JSON.stringify(subMitJson)
                                    )}`
                                });
                            } else {
                                let types = that.$cookies.get("types");
                                if (detail == 1) {
                                    wx.navigateTo({
                                        url: "/pages/order/detailed?type=" + types
                                    });
                                }
                            }
                        } else {
                            Hint.Msg({
                                message: err.msg
                            });
                        }
                    } else {
                        Hint.Msg({
                            message: err.msg
                        });
                    }
                });
        },
        // 删除地址
        delList(id) {
            var that = this;
            var zz_userid = that.$cookies.get("zz_userid");
            var flag = "del";
            let req = {
                id: id,
                state: 2
            };
            req = JSON.stringify(req);
            let paramsJson = {
                zz_userid: zz_userid,
                req: req,
                flag: flag,
                type: 2,
                username: that.$route.query.username
            };
            Hint.Confirm({
                title: "提示",
                message: that.clues.shifoushanchucidizhi
            }).then(() =>
                addressInfo(paramsJson).then(res => {
                    let address = that.address;
                    let reqValue = JSON.parse(req);
                    let indexValue = 0;
                    for (let i = 0; i < address.length; i++) {
                        if (address[i].id == reqValue.id) {
                            address.splice(i, 1);
                            that.address = address;
                        }
                    }
                    if (that.address.length == 0) {
                        let supplyCity = util.functions.ifHaveFun(that.$cookies.get("supplyCity"))
                            ? that.$cookies.get("supplyCity")
                            : {};
                        supplyCity[2] = "";
                        that.$cookies.set("supplyCity", supplyCity);
                    }
                })
            );
        },
        // 地址
        addressFun(id) {
            var takeout = this.takeout ? this.takeout : 0,
                channel_id = this.channel_id,
                is_set = this.is_set,
                that = this;

            if (id && takeout > 0) {
                that.$cookies.set("address_id", id);
            }
            if (takeout > 0) {
                // wx.redirectTo({
                //     url: "/pages/takeaway/takeaway?channel_id = " + channel_id
                // });
            } else {
                if (is_set == 1) {
                    //修改默认地址
                    // this.changeAddress(id)
                } else {
                    //跳转订单详情
                    this.changeAddress(id, 1);
                }
            }
        },
        // 供应链编码获取
        getAddressCodingt() {
            let that = this,
                supplyCity = util.functions.ifHaveFun(that.$cookies.get("supplyCity"))
                    ? that.$cookies.get("supplyCity")
                    : {};
            // 存储一个字段用来判断是取收货地址的省市区还是详情页的省市区
            // obtainStatus ：1 收货地址 obtainStatus ：0 详情页
            that.$cookies.set("obtainStatus", "1");
            supplyCity = util.functions.ifHaveFun(supplyCity) ? supplyCity[2] : "";

            getJdAddressCode({
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                address: util.functions.ifHaveFun(this.cityInfo)
                    ? this.cityInfo
                    : util.functions.ifHaveFun(supplyCity)
                    ? supplyCity
                    : ""
            }).then(res => {
                that.$cookies.set("supplyCoding", res);
            });
        },
        // 列表页只需要传入省获取地址编码
        getAddressCodingt2() {
            let that = this,
                supplyCity = util.functions.ifHaveFun(that.$cookies.get("supplyCity"))
                    ? that.$cookies.get("supplyCity")
                    : {},
                supplyArr = [];
            supplyArr = util.functions.ifHaveFun(supplyCity) ? supplyCity[2] : "";
            if (util.functions.ifHaveFun(supplyArr)) {
                supplyArr = supplyArr.split(" ")[0];
            }

            getJdAddressCode({
                username: that.$route.query.username,
                address: supplyArr
            }).then(res => {
                that.$cookies.set("supplyCoding_address", res);
            });
        },

        //默认地址
        defaultAdd(id, index) {
            if (this.address[index].is_default == 1) {
                return false;
            }
            this.changeAddress(id);
        },
        // 修改默认地址函数
        changeAddress(id, detail) {
            let that = this;
            let req = {
                id: id
            };
            let address = that.address;
            if (this.is_set == 1) {
                for (let i = 0; i < address.length; i++) {
                    if (address[i].is_default == 1 && id == address[i].id) {
                        return false;
                    }
                }
            }
            

            if (detail != 1) {
                Hint.Msg({
                    message: that.clues.xiugaimorendizhichenggong
                });
                let city = "",
                    cityInfo = "";
                for (let i = 0; i < address.length; i++) {
                    if (address[i].id == id) {
                        address[i].is_default = 1;
                        city = address[i].province + " " + address[i].city + " " + address[i].district;
                        cityInfo =
                            address[i].province +
                            " " +
                            address[i].city +
                            " " +
                            address[i].district +
                            " " +
                            address[i].address;
                    } else {
                        address[i].is_default = 0;
                    }
                }
                // if(!util.functions.ifHaveFun(this.$route.query.deliveryType) && this.$route.query.deliveryType != 'city'){
                    // 更新地址编码
                    let supplyJson = util.functions.ifHaveFun(that.$cookies.get("supplyCity"))
                        ? that.$cookies.get("supplyCity")
                        : {};
                    supplyJson[2] = city;
                    this.cityInfo = cityInfo;
                    that.$cookies.set("supplyCity", supplyJson);
                    that.getAddressCodingt();
                    that.getAddressCodingt2();
                // }
            }
            that.address = address;
            that.listFun(2, req, detail);
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
        //编辑地址
        editadd(id) {
            // 同城配送跳转页面判断
            if (util.functions.ifHaveFun(this.$route.query.deliveryType) && this.$route.query.deliveryType == 'city') {
                this.setCookies();
                this.$router.push({
                    path: "/address/views/tcpsAdd",
                    query: {
                        username: this.$route.query.username,
                        id:id
                    }
                });
            } else {
                this.setCookies(id);
                location.href =
                    "//" +
                    document.domain +
                    `/VFrontend/address/views/addressDetail?username=${this.$route.query.username}`;
                //  this.$router.push({
                //     path: "/address/views/addressDetail",
                //     query: {
                //         username: this.$route.query.username,
                //         id:id
                //     }
                // });   
            }
        },
        //新增地址
        addadd() {
            this.setCookies();
            if (util.functions.ifHaveFun(this.$route.query.deliveryType) && this.$route.query.deliveryType == 'city') {
                this.$router.push({
                    path: "/address/views/tcpsAdd",
                    query: {
                        username: this.$route.query.username
                    }
                });
            }else{
                location.href =
                    "//" +
                    document.domain +
                    `/VFrontend/address/views/addressDetail?username=${this.$route.query.username}`;
            }
        },
        // 存入缓存数据
        setCookies(id) {
            var that = this,
                takeout = that.takeout ? that.takeout : 0,
                queryJson = {};

            // queryJson.username = that.$route.query.username;
            queryJson.takeout = takeout;
            queryJson.is_set = that.is_set;
            util.functions.ifHaveFun(id) ? (queryJson.id = id) : "";
            util.functions.ifHaveFun(that.detail_id) ? (queryJson.detail_id = that.detail_id) : "";
            util.functions.ifHaveFun(that.order_id) ? (queryJson.order_id = that.order_id) : "";
            util.functions.ifHaveFun(that.redirect) || that.redirect == 0 ? (queryJson.redirect = that.redirect) : "";
            util.functions.ifHaveFun(that.subMitJson) ? (queryJson.subMitJson = that.subMitJson) : "";
            util.functions.ifHaveFun(that.jdWay) || that.jdWay == 0 ? (queryJson.jdWay = that.jdWay) : "";
            util.functions.ifHaveFun(that.$route.query.jdStatus) || that.$route.query.jdStatus == 0
                ? (queryJson.jdStatus = that.$route.query.jdStatus)
                : "";
            util.functions.ifHaveFun(that.$route.query.goodsValueType || that.$route.query.goodsValueType == 0)
                ? (queryJson.goodsValueType = that.$route.query.goodsValueType)
                : "";
            util.functions.ifHaveFun(that.$route.query.textareaValue)
                ? (queryJson.textareaValue = that.$route.query.textareaValue)
                : "";
            util.functions.ifHaveFun(that.$route.query.imagesList_back)
                ? (queryJson.imagesList_back = that.$route.query.imagesList_back)
                : "";
            util.functions.ifHaveFun(that.$route.query.deliveryType)
                ? (queryJson.deliveryType = that.$route.query.deliveryType)
                : "";

            if (that.$route.query.orderstatus == 1) {
                //编辑地址传入的参数
                queryJson.orderstatus = 1;
            } else {
                if (util.functions.ifHaveFun(that.$cookies.get("queryJsonAdress"))) {
                    //新增地址传入的
                    if (util.functions.ifHaveFun(that.$cookies.get("queryJsonAdress").orderstatus == 1)) {
                        queryJson.orderstatus = 1;
                    }
                }
            }
            that.$cookies.set("queryJsonAdress", queryJson);
            // this.$router.push({
            //     path: "/address/views/addressDetail",
            //     query: {
            //         username: this.$route.query.username,
            //         id:id
            //     }
            // });  
        }
    }
};
</script>

<style lang="scss">
@import "@/pages/address/assets/addressList.scss";
@import "@/pages/order/assets/css/color.scss";
</style>

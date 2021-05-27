<template>
    <section class="afterSalesList-box">
        <section class="afterSalesList">
            <van-loading v-if="showLoading" size="50px" color="#1989fa" />
            <van-overlay :show="showLoading" />
            <div
                class="wrapper"
                v-if="salesDate != ''"
                v-wechat-title="($route.meta.title = salesDate.tips.shouhoushenqing)"
            >
                <Nav :numerical="6" :tips="salesDate.tips" />
                <div class="wrapper_c">
                    <div class="wrapper_bg">
                        <div class="wrapper_bg_c"></div>
                    </div>
                    <div class="Max_Center">
                        <!-- 头部开始 -->
                        <div class="tab_head">
                            <div class="tab_head_li" @click="changeTab(0)">
                                <div :style="{ fontWeight: tabNume == 0 ? 'bold' : '', fontSize: '0.28rem' }">
                                    {{ salesDate.tips.shouhoushenqing
                                    }}<span
                                        :style="{ background: bgcColor1 }"
                                        v-if="tabNume == 0"
                                        class="bottomXian"
                                    ></span>
                                </div>
                            </div>
                            <div class="tab_head_li" @click="changeTab(1)">
                                <div :style="{ fontWeight: tabNume == 1 ? 'bold' : '', fontSize: '0.28rem' }">
                                    {{ salesDate.tips.shenqingjilu
                                    }}<span
                                        :style="{ background: bgcColor1 }"
                                        v-if="tabNume == 1"
                                        class="bottomXian"
                                    ></span>
                                </div>
                            </div>
                        </div>

                        <!-- 售后申请 -->
                        <section v-if="type == 0">
                            <!-- 有数据 -->
                            <div class="order_list" v-show="salesDateList.length > 0">
                                <div class="order_li" v-for="(item, index) in salesDateList" :key="index">
                                    <div class="order_top">
                                        <div class="shop_name">
                                            <div class="home_img">
                                                <img
                                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_home.png"
                                                />
                                            </div>
                                            <div class="home_txt">{{ item.shops_name }}</div>
                                            <!-- <div class="arrow1" v-if="item.shops_name != '自营'}}"><img mode="widthFix" src="{{AIMG8}}/xcx_pack/vip_shopmall/newOrder_arrow1.png"></div> -->
                                        </div>
                                    </div>
                                    <div v-for="(proItem, proIndex) in item.pro_list" :key="proIndex">
                                        <div class="order_center">
                                            <div class="order_money">
                                                <div class="money">
                                                    <span>{{ salesDate.currency_symbol }}</span
                                                    >{{ proItem.shiji_money_left
                                                    }}<span>.{{ proItem.shiji_money_right }}</span>
                                                </div>
                                                <div class="Number">{{ proItem.num_info }}</div>
                                            </div>
                                            <div class="order_name">
                                                <div class="shop_img">
                                                    <img :src="proItem.pic" />
                                                </div>
                                                <div class="shop_link">
                                                    <div class="shop_link_tit">{{ proItem.name }}</div>
                                                    <div class="shop_link_txt">{{ proItem.param_info }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="order_foot"
                                            @click="
                                                salesDetails(
                                                    item.order_id,
                                                    proItem.id,
                                                    proItem.pro_id,
                                                    item.there_are_third_party_goods
                                                )
                                            "
                                        >
                                            <div class="navigator1">{{ salesDate.tips.shouhoushenqing }}</div>
                                        </div>
                                        <div class="order_border" v-if="item.pro_list.length - 1 != proIndex"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- 没有数据 -->
                            <div class="no_data" v-show="salesDateList.length == 0">
                                <div class="no_data_img">
                                    <img
                                        src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_no_data.png"
                                    />
                                </div>

                                <div class="no_data_txt" v-show="!showLoading">
                                    {{ salesDate.tips.meiyouxiangguandingdan }}~
                                </div>
                            </div>
                        </section>

                        <!-- 申请记录 -->
                        <section v-if="type == 1">
                            <div class="order_list" v-show="salesDateList.length > 0">
                                <div class="order_li_jilu" v-for="(item, index) in salesDateList" :key="index">
                                    <div class="order_li_top">
                                        <div>
                                            {{ salesDate.tips.tuihuanhuohao }}：<span>{{ item.id }}</span>
                                        </div>
                                        <div>
                                            {{ salesDate.tips.fuwuleixing }}：<span>{{ item.server_type.info }}</span>
                                        </div>
                                        <div>
                                            {{ salesDate.tips.chulishijian }}：<span>{{ item.time }}</span>
                                        </div>
                                    </div>
                                    <!-- 单个商品 -->
                                    <div class="order_li_center" v-if="item.pro_list.length == 1">
                                        <div class="order_li_center_left">
                                            <img :src="item.pro_list[0].pic" />
                                        </div>
                                        <div class="order_li_center_right">
                                            <span>{{ item.pro_list[0].name }}</span>
                                        </div>
                                    </div>
                                    <!-- 多个商品 -->
                                    <div class="order_li_center_more" v-else>
                                        <div
                                            class="order_li_center_left"
                                            v-for="(proItem, proIndex) in item.pro_list"
                                            :key="proIndex"
                                        >
                                            <img :src="proItem.pic" />
                                        </div>
                                    </div>
                                    <div class="order_li_bottom">
                                        <div class="order_li_bottom_left">
                                            {{ salesDate.tips.chulizhuangtai }}:
                                            <span style="color:#FC273C" v-if="item.state.type == 5">{{
                                                item.state.info
                                            }}</span>
                                            <span style="color:#222222" v-else>{{ item.state.info }}</span>
                                        </div>
                                        <div
                                            class="order_li_bottom_right"
                                            @click="goSalesDetail(item.id, item.there_are_third_party_goods)"
                                        >
                                            {{ salesDate.tips.chakan }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 没有数据 -->
                            <div class="no_data" v-show="salesDateList.length == 0">
                                <div class="no_data_img">
                                    <img
                                        src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_no_data.png"
                                    />
                                </div>
                                <div class="no_data_txt" v-show="!showLoading">
                                    {{ salesDate.tips.meiyouxiangguandingdan }}～
                                </div>
                            </div>
                        </section>

                        <div class="footerBox" v-if="page > pageCnt && salesDateList.length > 2">
                            <span>我也是有底线的~</span>
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
// 色系
import { getColor } from "@/api/order/submitOrder.js";

import { getUserReturns } from "@/api/order/afterSales.js";
// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";
export default {
    components: {
        Nav
    },
    data() {
        return {
            salesDate: "",
            page: 1,
            pageCnt: 0,
            salesDateList: [],
            type: 0,
            tabNume: 0,
            options: "",
            showLoading: false,
            bgcColor1: "",
            bottomNum: 0
        };
    },
    created() {
        // this.$cookies.set("zz_userid", "21940075");
        // if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
        //     location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
        //     return false;
        // }
    },
    mounted() {
        if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            return false;
        }
        this.getColorFun();
        this.orderId = this.$route.query.orderId;
        this.salesDateList = [];
        this.page = 1;
        
        if (this.$cookies.get("afterSales_state") == 1) {
            this.tabNume = 1;
            this.type = 1;
        }
        //  if (util.functions.ifHaveFun(this.$route.query) && util.functions.ifHaveFun(this.$route.query.state)){
        //     this.tabNume = this.$route.query.state;
        //     this.type = this.$route.query.state;
        // }
        this.salesDateFun(this.$route.query.orderId);
    },
    methods: {
        // 申请售后接口
        salesDateFun(id) {
            let that = this;
            that.showLoading = true;
            var dataJson = {
                state: that.type,
                page: that.page,
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                client_type: 1
            };
            id ? (dataJson.order_id = parseInt(id)) : "";
            getUserReturns(dataJson)
                .then(res => {
                    that.showLoading = false;
                    let salesDateList = that.salesDateList;
                    salesDateList = salesDateList.concat(res.returns_list);
                    if (util.functions.ifHaveFun(salesDateList)) {
                        for (let i in salesDateList) {
                            for (let j in salesDateList[i].pro_list) {
                                let val = String(salesDateList[i].pro_list[j].pay_price);
                                let val_left = val.substring(0, val.indexOf("."));
                                let val_right = val.replace(/\d+\.(\d*)/, "$1");
                                salesDateList[i].pro_list[j].shiji_money_left = val_left;
                                salesDateList[i].pro_list[j].shiji_money_right = val_right;
                            }
                        }
                    }
                    that.salesDate = res;
                    that.salesDateList = util.functions.ifHaveFun(salesDateList) ? salesDateList : [];
                    that.pageCnt = res.page_cnt;
                    that.bottomNum = 1;
                    setTimeout(() => {
                        $(".afterSalesList").scroll(function() {
                            let nScrollHight = $(this)[0].scrollHeight;
                            let nScrollTop = $(this)[0].scrollTop;
                            let nDivHight = $(this).height();
                            if (nScrollTop + nDivHight + 100 >= nScrollHight) {
                                if (that.page > that.pageCnt || that.bottomNum == 0 || !that.salesDateList.length) {
                                    return false;
                                }
                                that.bottomNum = 0;
                                that.page = that.page + 1;
                                that.salesDateFun(id);
                            }
                        });
                    });
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Alert({
                        message: res.msg
                    }).then(() => {
                        window.history.back();
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
        changeTab(num) {
            this.type = num;
            this.salesDateList = [];
            this.tabNume = num;
            this.page = 1;
            this.salesDateFun(this.orderId);
            this.$cookies.set("afterSales_state", num);
        },
        salesDetails(orderId, detailId, proid, partygoods) {
            if (partygoods == 1) {
                this.$router.push({
                    path: "/order/orderRelated/jdAfterType",
                    query: {
                        jdStatus: 1,
                        detailId: detailId,
                        orderId: orderId,
                        proid: proid,
                        username: this.$route.query.username
                    }
                });
            } else {
                this.$router.push({
                    path: "/order/orderRelated/returnGoods",
                    query: {
                        detailId: detailId,
                        orderId: orderId,
                        redirect: "returnListnone",
                        username: this.$route.query.username
                    }
                });
            }
        },
        // 售后详情
        goSalesDetail(id, partygoods) {
            this.$router.push({
                path: "/order/orderRelated/afterSalesDetail",
                query: {
                    id: id,
                    jdStatus: partygoods,
                    redirect: "returnListnone",
                    username: this.$route.query.username
                }
            });
        },
        onReachBottom: function() {
            let page = this.page;
            if (page <= this.pageCnt) {
                page++;
                this.page = page;
                this.salesDateFun();
            } else {
                this.noData = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/pages/order/assets/css/afterSalesList.scss";
</style>

<!--
 * @Author       : zhouqi
 * @description  : 物流信息
 * @Date         : 2020-12-07 11:29:04
 * @LastEditors  : zhouqi
 * @LastEditTime : 2020-12-28 15:23:30
 * @FilePath     : /vue-VFrontend/src/pages/order/views/orderRelated/orderRecord.vue
-->
<template>
    <section class="orderRecord-box">
        <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" />
        <section class="orderRecord" v-if="recordInfo != ''">
            <Nav :numerical="9" :tips="recordInfo.tips" />
            <div class="wrapper">
                <div class="wrapper_c">
                    <div class="wrapper_bg">
                        <div class="wrapper_bg_c"></div>
                    </div>
                    <div class="Max_Center" v-if="recordInfo.logistics_info.length && recordInfo.common_info.length">
                        <div class="head_tab">
                            <div
                                :class="recordValue == index ? 'head_tab_li cur' : 'head_tab_li'"
                                @click="changeTitle(index)"
                                v-for="(item, index) in recordInfo.logistics_info"
                                :key="index"
                            >
                                {{ item.title }}
                                <div class="bor_color"></div>
                            </div>
                        </div>
                        <div class="company_ul">
                            <div v-for="(item2, index2) in recordInfo.logistics_info" :key="index2">
                                <div v-if="recordValue == index2">
                                    <div
                                        class="company_li"
                                        v-for="(contItem, contIndex) in item2.content"
                                        :key="contIndex"
                                    >
                                        <div class="company_li_txt">{{ contItem.name }}：{{ contItem.val }}</div>
                                        <div
                                            class="company_li_txt1"
                                            @click="copyText(contItem.val)"
                                            v-if="contItem.type == 2"
                                        >
                                            {{ recordInfo.tips.fuzhi }}
                                        </div>
                                    </div>
                                    <div
                                        class="company_li"
                                        v-for="(commomItem, commonIndex) in recordInfo.common_info"
                                        :key="'item2' + commonIndex"
                                    >
                                        <div class="company_li_txt" @click="checkPic(commomItem.type, commomItem.val)">
                                            {{ commomItem.name }}：{{
                                                commomItem.type == 3 ? recordInfo.tips.dianjichakan : commomItem.val
                                            }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="logistics">
                            <div
                                class="logistics_c"
                                :style="{
                                    borderLeft: recordInfo.logistics_info[recordValue].logis.length == 0 ? 0 : ''
                                }"
                            >
                                <div v-for="(item3, index3) in recordInfo.logistics_info" :key="index3">
                                    <div v-if="recordValue == index3">
                                        <div v-if="item3.logis.length">
                                            <div
                                                class="logistics_li"
                                                v-for="(logisItem, lgoisIndex) in item3.logis"
                                                :key="lgoisIndex"
                                            >
                                                <div class="logistics_OK2"></div>
                                                <div class="logistics_text">
                                                    <div class="logistics_text2">{{ logisItem.context }}</div>
                                                    <div class="logistics_text3">{{ logisItem.time }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="noLoginsDate" v-else>
                                            <img src="https://aimg8.dlssyht.cn/xcx_pack/images/nolist.jpg" />
                                            <div>{{ recordInfo.tips.zanwuxiangguanwuliuxinxi }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="Max_Center noDateInfoFather" v-else>
                        <div class="noLoginsDate noDateInfo">
                            <img src="https://aimg8.dlssyht.cn/xcx_pack/images/nolist.jpg" />
                            <div>{{ recordInfo.tips.zanwuxiangguanwuliuxinxi }}</div>
                        </div>
                    </div>

                    <!-- 文件下载图片 -->
                    <div class="openImgAlert" @click="openImgUrl = ''" v-if="openImgUrl">
                        <img :src="openImgUrl" alt="" />
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

// 物流信息
import { getLogisticsInfo } from "@/api/order/afterSales.js";

// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";

export default {
    components: {
        Nav
    },
    data() {
        return {
            showLoading: true,
            recordValue: 0,
            recordInfo: "",
            openImgUrl:''
        };
    },
    mounted() {
        if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            return false;
        }
        let id = this.$route.query.id;
        this.orderId = id;
        this.orderDetail(id);
    },
    methods: {
        // 物流信息
        orderDetail(orderId) {
            let that = this;
            let paramJson = {
                order_id: orderId,
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                 client_type: 1
            };
            getLogisticsInfo(paramJson)
                .then(res => {
                    that.showLoading = false;
                    that.recordInfo = res;
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Alert({
                        message: err.msg
                    }).then(() => {
                        window.history.back();
                    });
                });
        },

        changeTitle(index) {
            this.recordValue = index;
        },
        // 复制功能
        copyText(text) {
            // 请求处理
            this.$copyText(text).then(
                function(e) {
                    Hint.Msg({
                        message: "复制成功"
                    });
                },
                function(e) {
                    Hint.Msg({
                        message: "复制失败"
                    });
                }
            );
        },
        // 查看图片
        checkPic(type, val) {
            if (type == 3) {
                this.openImgUrl = val;
            }
        }
    }
};
</script>

<style lang="scss">
@import "@/pages/order/assets/css/orderRecord.scss";
</style>

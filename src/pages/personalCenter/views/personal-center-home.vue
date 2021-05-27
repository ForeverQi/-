<!--
 * @Author       : zhouqi
 * @description  : 个人中心页面
 * @Date         : 2020-02-01 15:51:57
 * @FilePath     : \ev-frontend-test\src\pages\personalCenter\views\personal-center-home.vue
-->

<template>
    <!-- pc:personal-center -->
    <div class="pc-homePage">
        <div class="personal-box" v-if="loaded">
            <section class="wrapper-c">
                <div class="bg-div">
                    <p></p>
                </div>
                <article class="max-center">
                    <header class="cen-head">
                        <div class="cen-head-left">
                            <div class="back-left-icon" @click="goBack('home')">
                                <img src="../assets/images/top_back_icon.png" />
                            </div>
                            <div class="home-btn" @click="goBack('home')">
                                <img src="../assets/images/top_home_icon.png" />
                            </div>
                        </div>
                        <div class="cen-head-right">
                            <div
                                class="vip-ma"
                                @click="createQRCode"
                                v-if="getData.head.member_code.qr_type == 2"
                            >
                                <img src="../assets/images/vip_ma.png" alt />
                                <i>会员码</i>
                            </div>
                            <a
                                :href="hosts + getData.head.message_url"
                                class="link-info"
                            >
                                <p>
                                    <img src="../assets/images/info.png" alt />
                                </p>
                                <i v-if="getData.head.message_cnt"></i>
                            </a>
                            <a :href="hosts + getData.head.set_url" class="set-up">
                                <img src="../assets/images/set_up.png" alt />
                            </a>
                        </div>
                    </header>
                    <div class="user-head">
                        <van-notice-bar
                            left-icon="volume-o"
                            :scrollable="false"
                            class="top-notice"
                            v-if="getData.head.notice"
                        >
                            <van-swipe
                                vertical
                                class="notice-swipe"
                                :autoplay="3000"
                                :show-indicators="false"
                            >
                                <van-swipe-item
                                    v-for="(item, index) in getData.head.notice" :key="index"
                                    ><a :href="hosts + item.url">{{
                                        item.title
                                    }}</a></van-swipe-item
                                >
                            </van-swipe>
                        </van-notice-bar>
                        <div class="user-info">
                            <div class="user-info-l">
                                <a
                                    :href="hosts + getData.head.head_url"
                                    class="user-avatar"
                                >
                                    <img :src="getData.head.user_pic" alt />
                                </a>
                                <div class="info">
                                    <div>
                                        <span>{{ getData.head.user_name }}</span
                                        ><i v-if="getData.head.reg_days">{{
                                            getData.head.reg_days
                                        }}</i>
                                    </div>
                                    <p>
                                        {{ getData.head.member_code_title }}:{{
                                            getData.head.card_id
                                        }}
                                    </p>
                                </div>
                            </div>
                            <div class="user-info-r">
                                <a
                                    v-if="getData.head.sign_url"
                                    :href="hosts + getData.head.sign_url"
                                    >{{ getData.head.sign_title }}</a
                                >
                                <a
                                    href="###"
                                    v-if="getData.head.relation_cnt > 0"
                                    @click="showSwitchUserDialog"
                                    >{{ getData.head.change_title }}</a
                                >
                                <a
                                    :href="hosts + getData.head.relation_url"
                                    v-else
                                    >{{ getData.head.relation_title }}</a
                                >
                            </div>
                        </div>
                        <a
                            :href="
                                getData.head.vipcard_url
                                    ? hosts + getData.head.vipcard_url
                                    : '###'
                            "
                            class="vip-link"
                        >
                            <div>
                                <img src="../assets/images/V_icon.png" />
                                <i>{{ getData.head.vip }}</i>
                            </div>
                            <div v-if="getData.head.vipcard_url">
                                <em>{{ getData.head.vipcard_title }}</em>
                                <div class="voerTop-menuRight">
                                    <span></span>
                                </div>
                            </div>
                        </a>
                        <div class="binding" v-if="getData.head.mobile_bind">
                            <template v-if="getData.head.mobile_bind == 1">
                                {{ getData.head.no_blind_title }}&nbsp;&nbsp;
                                <span @click="showPhoneDialog">{{
                                    getData.head.goblind_title
                                }}</span>
                            </template>
                            <template v-if="getData.head.mobile_bind == 2">
                                {{ getData.head.is_blind_title }}
                            </template>
                        </div>
                    </div>
                    <!-- 我的订单 start -->
                    <div class="my-order" v-if="getData.order||getData.assets">
                        <div class="my-order-li" v-if="getData.order">
                            <div
                                class="my-order-tit"
                                v-if="getData.order.order_all"
                            >
                                <span>{{ getData.order.order_my }}</span>
                                <a
                                    class="my-order-more"
                                    :href="hosts + getData.order.order_all.url"
                                    @click="orderJump('all')"
                                >
                                    <em>{{ getData.order.order_all.name }}</em>
                                    <div class="voerTop-menuRight">
                                        <span></span>
                                    </div>
                                </a>
                            </div>
                            <div
                                class="my-order-c"
                                v-if="getData.order.order_status"
                            >
                                <a
                                    class="order-state"
                                    v-for="(item, index) in getData.order
                                        .order_status"
                                    :key="index"
                                    :href="hosts + item.url"
                                    @click="orderJump(item)"
                                >
                                    <span>
                                        <p>
                                            <img :src="item.icon" />
                                        </p>
                                        <em v-if="item.num > 0">{{
                                            item.num > 99 ? "99+" : item.num
                                        }}</em>
                                    </span>
                                    <i>{{ item.name }}</i>
                                </a>
                            </div>
                        </div>
                        <!-- 我的订单 end -->
                        <!-- 我的钱包 start -->
                        <div
                            class="my-order-li"
                            v-if="getData.assets && getData.assets.my_assets"
                        >
                            <a
                                class="my-order-tit my-order-tit1"
                                :href="hosts + getData.assets.my_wallet_url"
                            >
                                <span>{{ getData.assets.my_wallet }}</span>
                                <div class="my-order-more">
                                    <div class="voerTop-menuRight">
                                        <span></span>
                                    </div>
                                </div>
                            </a>
                            <div
                                class="my-order-c my-order-c1"
                                style="padding-top:0.38rem;"
                            >
                                <template
                                    v-for="(item, index) in getData.assets
                                        .my_assets"
                                >
                                    <a
                                        class="order-state1"
                                        v-if="item && item.name"
                                        :href="hosts + item.url"
                                    >
                                        <span>{{ item.money }}</span>
                                        <i>{{ item.name }}</i>
                                    </a>
                                </template>
                            </div>
                        </div>
                        <!-- 我的钱包 end -->
                    </div>
                    <!-- 我的表单 -->
                    <!-- <div class="my-from">
                        <div class="my-from-R">
                            <span>
                                <img src="../assets/images/order_img8.png" alt />
                            </span>
                            <p>我的表单</p>
                        </div>
                        <div class="my-from-C">
                            <img src="../assets/images/border.png" alt />
                        </div>
                        <div class="my-from-L">
                            <div>
                                <span>
                                    <img src="../assets/images/order_img5.png" alt />
                                </span>
                                <p>待处理</p>
                            </div>
                            <div>
                                <span>
                                    <img src="../assets/images/order_img6.png" alt />
                                    <i>9</i>
                                </span>
                                <p>处理中</p>
                            </div>
                            <div>
                                <span>
                                    <img src="../assets/images/order_img7.png" alt />
                                </span>
                                <p>已完成</p>
                            </div>
                        </div>
                    </div> -->
                    <div class="assembly" v-if="getData.assembly">
                        <div class="assembly-tit">
                            {{ getData.head.assembly_name }}
                        </div>
                        <div class="assembly-con">
                            <a
                                v-for="(item, index) in getData.assembly"
                                class="item"
                                :href="item.link ? (hosts + item.link) : '###'"
                            >
                                <span>
                                    <img :src="item.icon" alt />
                                </span>
                                <p>{{ item.name }}</p>
                                <i v-if="item.msg">{{ item.msg }}</i>
                            </a>
                        </div>
                    </div>
                    <div class="sign-out" @click="signOut">
                        {{ getData.head.login_out }}
                    </div>
                </article>
            </section>
        </div>
        <div class="no-personal-box" v-else>
            <img
                src="@/pages/personalCenter/assets/images/center-loading.png"
                alt=""
            />
        </div>
        <!-- 绑定手机号 弹出层 start -->
        <!-- <van-dialog v-if="loaded" v-model="phoneDialogShow" class="personal-dialog" title="绑定手机" :show-confirm-button="false" :show-cancel-button="false">
            <van-icon name="cross" @click="phoneDialogShow = false" />
            <div class="dialog-inner bind-phone-f">
                <div class="input-li">
                    <input type="text" v-model="inputPhone" placeholder="请输入手机号" />
                </div>
                <div class="input-li">
                    <input type="text" v-model="inputCode" class="input-txt" placeholder="输入短信验证码" />
                    <div v-if="codeStatus" @click="getCode">获取验证码</div>
                    <div class="input-a" v-else>{{ time }}S后重新获取</div>
                </div>
                <div class="button-a" @click="enterBindPhone">绑定手机号</div>
            </div>
        </van-dialog> -->
        <!-- 绑定手机号 弹出层  end-->
        <!-- 切换账号弹出层 start -->
        <van-dialog
            v-if="loaded"
            v-model="switchUserDialogShow"
            class="personal-dialog"
            :title="getData.head.change_title"
            :show-confirm-button="false"
            :show-cancel-button="false"
        >
            <van-icon name="cross" @click="switchUserDialogShow = false" />
            <div class="dialog-inner user-name-box">
                <ul class="user-name-list">
                    <li
                        v-for="(item, index) in getData.head.relation_list"
                        :key="item.id"
                        @click="selectUser(item)"
                        :class="{
                            active:
                                selectedUserItem &&
                                selectedUserItem.id == item.id
                        }"
                    >
                        {{ item.user_name }}
                    </li>
                </ul>
                <a class="button-a" :href="hosts + getData.head.relation_url">{{
                    getData.head.relation_title
                }}</a>
            </div>
        </van-dialog>
        <!-- 切换账号弹出层 end -->
        <!-- 会员码弹出层 start -->
        <van-dialog
            v-model="userQRCodeDialogShow"
            class="personal-dialog"
            :show-confirm-button="false"
            :show-cancel-button="false"
        >
            <van-icon name="cross" @click="userQRCodeDialogShow = false" />
            <div id="userCode" class="user-qr-code" ref="userCode"></div>
        </van-dialog>
        <!-- 会员码弹出层 end -->
        <phonePopup
            :showPoneJson="showPoneJson"
            :showText="showPoneText"
            v-if="phoneDialogShow"
            ref="phonePopup"
            @bindSuccess="bindSuccess"
        />
    </div>
</template>

<script>
import Vue from "vue";
import { NoticeBar, Swipe, SwipeItem } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(NoticeBar);
import QRCode from "qrcodejs2";
import {
    personalCenter,
    ajaxZhuceCode
} from "@/api/personalCenter/personalCenter";

import phonePopup from "@/components/phonePopup/phonePopup.vue";
// 倒计时函数
var timeCode;
export default {
    components: {
        phonePopup
    },
    data() {
        return {
            // 控制绑定手机号弹窗显示和隐藏
            phoneDialogShow: false,
            // 切换账号弹窗状态
            switchUserDialogShow: false,
            // 会员码弹出层状态
            userQRCodeDialogShow: false,
            // 会员二维码
            userQRCode: false,
            hosts: "",
            // 发送验证码
            codeStatus: true,
            time: 60,
            loaded: false,
            show: true,
            // 输入的手机号
            inputPhone: "",
            // 输入的验证码
            inputCode: "",
            getData: {},
            selectedUserItem: null,
            showPoneJson: {
                userId: 765194,
                show: 1,
                text: {}
            },
            showPoneText: {
                blind_mobile_title: "绑定手机",
                put_mobile_title: "请输入手机号",
                get_code_again_title: "s后重新获取",
                shuruduanxinyanzhengma: "请输入验证码",
                get_code_title: "获取验证码",
                cihaomayibangding: "此手机号码已绑定，请重新输入",
                wangluofanmang: "网络繁忙，请稍后重试",
                shoujihaobunengweikong: "手机号不能为空",
                shoujihaoweishuzi: "手机号为11位数字",
                duanxinyanzhengmabunengweikong: "短信验证码不能为空"
            }
        };
    },
    created() {
        if (this.$route.query.action == 1) {
            let Domain = document.domain.toLowerCase();
            var tmp_arr = Domain.match(
                /[\w][\w-]*\.(?:com\.cn|net\.cn|org\.cn|com|cn|co|net|org|gov|cc|biz|info|hn|xyz|hk|icu|us|mobi|art|wang|me|so|top|win|vip|ltd|red|ru|ac\.cn|xn--kput3i|xin|xn--3ds443g|shop|site|club|fun|online|link|gov\.cn|name|pro|work|tv|kim|group|tech|store|ren|ink|pub|live|wiki|design|xn--fiq228c5hs|xn--6qq986b3xl|xn--fiqs8s|xn--ses554g|xn--hxt814e|xn--55qx5d|xn--io0a7i|xn--3bst00m)(\/|$)/
            );
            Domain = tmp_arr[0];
            document.domain = Domain;
        }
        this.hosts = window.location.origin;
        this.personalFun();
    },

    methods: {
        goBack(tag) {
            if (window.history.length && tag != 'home') {
                window.history.go(-1);
            } else {
                window.location.href = `${this.hosts}/wap_${this.$route.query.username}.html`;
            }
        },
        /**
         * @Date: 2020-10-13 10:28:15
         * @LastEditors: zhouqi
         * @description: 个人中心接口
         * @param {type} 参数说明
         */
        personalFun() {
            let that = this;
            let json = {
                // username: "banish2015",
                username: that.$route.query.username,
                // user_user_id: "2329219",
                user_user_id: that.$cookies.get("zz_userid"),
                zz_shellCode: that.$cookies.get("zz_shellCode"),
                action: that.$route.query.action
                // user_user_id:this.$route.query.user_user_id
            };
            personalCenter(json)
                .then(res => {
                    that.getData = res;
                    if(that.getData.head.user_center_style == 0){
                        window.location.href = `${that.hosts}${that.getData.head.old_user_center_url}`;
                    }
                    that.showPoneJson.userId = that.getData.head.user_id;
                    that.showPoneJson.show = that.getData.head.blind_type;
                    that.showPoneText.put_mobile_title = that.getData.head.put_mobile_title;
                    that.showPoneText.blind_mobile_title = that.getData.head.blind_mobile_title;
                    that.showPoneText.get_code_title = that.getData.head.get_code_title;
                    that.showPoneText.cihaomayibangding= that.getData.head.cihaomayibangding;
                    that.showPoneText.shuruduanxinyanzhengma= that.getData.head.shuruduanxinyanzhengma;
                    that.showPoneText.get_code_again_title= that.getData.head.get_code_again_title;
                    that.showPoneText.wangluofanmang=that.getData.head.wangluofanmang;
                    that.showPoneText.shoujihaobunengweikong=that.getData.head.shoujihaobunengweikong;
                    that.showPoneText.shoujihaoweishuzi=that.getData.head.shoujihaoweishuzi;
                    that.showPoneText.duanxinyanzhengmabunengweikong=that.getData.head.duanxinyanzhengmabunengweikong;
                    if (
                        that.getData.head.mobile_bind == 1 &&
                        that.getData.head.blind_type == 2
                    ) {
                        that.showPhoneDialog();
                    }
                    if (that.getData.head.web_icon) {
                        document
                            .getElementById("faviconIcon")
                            .setAttribute("href", that.getData.head.web_icon);
                    }
                    if (that.getData.head.web_title) {
                        document.getElementsByTagName("title")[0].innerText =
                            that.getData.head.web_title;
                    }
                    that.loaded = true;
                    if(that.$route.query.action == 1){
                        setTimeout(() => {
                            let a = document.getElementsByTagName('a');
                            for(let x = 0; x < a.length;x++){
                                a[x].removeAttribute('href');
                            }
                        }, 100);
                    }
                })
                .catch(res => {
                    that.signOut();
                });
        },
        /**
         * @Date: 2020-12-03 16:13:21
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 打开切换账号弹窗
         * @param {*}
         * @return {*}
         */
        showSwitchUserDialog() {
            setTimeout(() => {
                this.switchUserDialogShow = true;
            });
        },
        selectUser(item) {
            let time = new Date();
            this.$cookies.set(
                "zz_userid",
                item.id,
                time.getTime() + 3600 * 24 * 3600
            );
            this.$cookies.set(
                "zz_shellCode",
                item.zz_shellCode,
                time.getTime() + 3600 * 24 * 3600
            );
            window.location.reload();
        },
        /**
         * @Date: 2020-12-03 15:20:33
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 退出函数
         * @param {*}
         * @return {*}
         */
        signOut() {
            this.$cookies.remove("zz_userid");
            this.$cookies.remove("zz_shellCode");
            window.location.href = `${this.hosts}/dom/denglu.php?wap=1&username=${this.$route.query.username}`;
        },
        /**
         * @Date: 2020-12-03 15:20:55
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 确定绑定手机
         * @param {*}
         * @return {*}
         */
        enterBindPhone() {},
        /**
         * @Date: 2020-12-03 18:13:16
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 创建二维码
         * @param {*}
         * @return {*}
         */
        createQRCode() {
            this.userQRCodeDialogShow = true;
            !this.userQRCode &&
                setTimeout(() => {
                    this.userQRCode = new QRCode("userCode", {
                        width: 200,
                        height: 200, // 高度
                        text: this.getData.head.member_code.link, // 二维码内容
                        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                        background: "#fff",
                        foreground: "#000"
                    });
                }, 10);
        },
        /**
         * @Date: 2020-12-08 19:34:30
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 绑定手机号弹窗
         * @param {*}
         * @return {*}
         */
        showPhoneDialog() {
            this.phoneDialogShow = true;
            setTimeout(() => {
                this.$refs.phonePopup.mbStatus = true;
            }, 10);
        },
        /**
         * @Date: 2020-12-09 15:12:20
         * @LastEditors: qwguo
         * @description: 手机号绑定成功后的回调函数
         * @param {*}
         * @return {*}
         */
        bindSuccess(){
            console.log(999999);
            this.personalFun();
        },
        /**
        * @Date: 2020-12-22 11:49:09
        * @LastEditors: qwguo
        * @LastEditTime: Do not edit
        * @description: 我的订单跳转
        * @param {*}
        * @return {*}
        */
        orderJump(item){
            let that = this,
                time = new Date();
            if(that.getData.order.order_type == 0){
                if(item == 'all'){
                    that.$cookies.set(
                        'orderList_state',
                        0,
                        time.getTime() + 3600 * 24 * 3600
                    );
                }else{
                    let curCookie = item.cookie;
                    if(curCookie != null){
                        for(let key in curCookie){
                            that.$cookies.set(
                                key,
                                curCookie[key],
                                time.getTime() + 3600 * 24 * 3600
                            );
                        }
                    }
                }
            }

        }
    }
};
</script>

<style lang="scss">
@import "@/pages/personalCenter/assets/css/personal-center.scss";
// @import "../assets/css/personal-center.css";
</style>

<!--
 * @Author       : zhouqi
 * @description  : description
 * @Date         : 2020-11-15 20:43:25
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-05-23 17:09:18
 * @FilePath     : /VFrontend开发版/src/components/Nav/Nav.vue
-->
<template>
    <section class="nav_only_box">
        <div
            class="nav"
            :class="newColor == '#ffffff' ? '' : 'setColor'"
            :style="{ backgroundColor: newColor ? newColor : '#fff', color: newColor == '#ffffff' ? '#222' : '#fff' }"
        >
            {{ tip }}
            <!-- 返回按钮 -->
            <div class="back_page" @click="backPage">
                <div class="back_page_box">
                    <div class="back_page_arrow"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        numerical: {
            type: Number,
            default: 0
        },
        tips: {
            type: Object
        },
        // 判断是从新版个人中心还是旧版个人中心跳转
        userCenterStyle: {
            type: Number,
            default: 1
        },
        newColor: {
            type: String,
            default:"#ffffff"
        }
    },
    data() {
        return {
            tip: "订单结算"
        };
    },
    created() {
        // 0 代表“订单结算”
        // 1 代表“地址列表”
        // 2 代表“添加地址”
        switch (this.numerical) {
            case 0:
                this.tip = this.tips.dingdanjiesuan;
                break;
            case 1:
                this.tip = this.tips.shouhuodizhi;
                break;
            case 2:
                this.tip = this.tips.tianjiashouhuodizhi;
                break;
            case 3:
                this.tip = "去支付";
                break;
            case 4:
                this.tip = this.tips.wodedingdan;
                break;
            case 5:
                this.tip = this.tips.wodedingdan;
                break;
            case 6:
                this.tip = this.tips.shouhoushenqing;
                break;
            case 7:
                this.tip = this.tips.shouhouxiangxi;
                break;
            case 8:
                this.tip = this.tips.tijiaochenggong;
                break;
            case 9:
                this.tip = this.tips.dingdangenzong;
                break;
            case 10:
                this.tip = this.tips.pingjiashaidan;
                break;
            case 11:
                this.tip = this.tips.tuihuanhuo;
                break;
            case 12:
                this.tip = this.tips.pingjiashaidan;
                break;
            case 13:
                this.tip = this.tips.wodepingjia;
                break;
            case 14:
                this.tip = "请选择售后类型";
                break;
        }
        // this.tip =
        //     this.numerical == 0
        //         ? this.tips.dingdanjiesuan
        //         : this.numerical == 1
        //         ? this.tips.shouhuodizhi
        //         : this.numerical == 2
        //         ? this.tips.tianjiashouhuodizhi
        //         : this.numerical == 3
        //         ? "去支付"
        //         : "";
    },
    methods: {
        /**
         * @Date: 2020-11-15 20:56:07
         * @LastEditors: zhouqi
         * @description: 返回
         * @param {*}
         * @return {*}
         */
        backPage() {
            switch (Number(this.numerical)) {
                // 订单列表返回个人中心
                case 4:
                    //新版个人中心
                    if (this.userCenterStyle == 1) {
                        this.$router.push({
                            path: "/personalCenter/personal-center-home",
                            query: {
                                action: 0,
                                username: this.$route.query.username
                            }
                        });
                    } else {
                        //旧版个人中心
                        location.href =
                            "//" +
                            document.domain +
                            `/dom/sc_user_center.php?username=${this.$route.query.username}&wap=1`;
                    }
                    break;
                // 订单详情、返回订单列表
                case 5:
                    this.$router.push({
                        path: "/order/orderRelated/orderList",
                        query: {
                            username: this.$route.query.username
                        }
                    });
                    break;
                //支付成功页,返回订单列表
                case 8:
                    this.$cookies.set("orderList_state", 0);
                    this.$router.push({
                        path: "/order/orderRelated/orderList",
                        query: {
                            username: this.$route.query.username
                        }
                    });
                    break;
                case 12:
                    //新版个人中心
                    if (this.userCenterStyle == 1) {
                        this.$router.push({
                            path: "/personalCenter/personal-center-home",
                            query: {
                                action: 0,
                                username: this.$route.query.username
                            }
                        });
                    } else {
                        //旧版个人中心
                        location.href =
                            "//" +
                            document.domain +
                            `/dom/sc_user_center.php?username=${this.$route.query.username}&wap=1`;
                    }
                    break;
                case 13:
                    // 我的评价详情跳转至列表页
                    location.href =
                        "//" +
                        document.domain +
                        `/VFrontend/order/orderRelated/evaluationList?username=${this.$route.query.username}`;
                    break;
                default:
                    window.history.go(-1);
                    break;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.nav_only_box {
    .nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 1rem;
        background-color: #fff;
        font-size: 0.32rem;
        color: #222222;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 19;
    }
    // 返回按钮
    .back_page {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0rem;
        font-size: 0.12rem;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent !important;
        width: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .back_page_arrow::after {
            content: "";
            display: block;
            width: 0.2rem;
            height: 0.2rem;
            border-left: 2px solid #969799;
            border-top: 2px solid #969799;
            transform: rotate(-45deg);
            margin-left: 0.1rem;
        }
    }

    // 色系值
    .setColor {
        .back_page_arrow::after {
            border-left: 2px solid #fff;
            border-top: 2px solid #fff;
        }
    }
}
</style>

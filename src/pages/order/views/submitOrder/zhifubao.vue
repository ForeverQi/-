<!--
 * @Author       : zhouqi
 * @description  : description
 * @Date         : 2020-11-24 18:37:49
 * @LastEditors  : zhouqi
 * @LastEditTime : 2020-11-27 10:38:34
 * @FilePath     : /vue-VFrontend/src/pages/order/views/submitOrder/zhifubao.vue
-->
<template>
    <div class="container-zfb">
        <div class="zfbBox">
            <Nav :numerical="3" />
            <div class="zfb-content">
                <img src="@/pages/order/assets/images/zfb.png" alt="" />
                <div class="zfb-btn">
                    <span @click="goDetailPage">付款已完成，点击查看订单</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";
export default {
    components: {
        Nav
    },
    data: {
    },
    moutend(){
        let isWeixin = this.is_weixin();
        if(!isWeixin){
            location.href= `/dom/sc_pay.php?username=${that.$route.query.username}&orderid=${this.$route.query.orderid}&fq_num=${that.$route.query.fq_num}&wap=1&showType=1`
        }
    },
    methods: {
        goDetailPage() {
            location.href = `/dom/sc_order_detail.php?username=${this.$route.query.username}&id=${this.$route.query.orderid}&wap=1`;
        },
        is_weixin() {
            if (/(micromessenger)/i.test(navigator.userAgent)) {
                return true;
            } else {
                return false;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.container-zfb {
    .zfb-content {
        width: 100%;
        position: absolute;
        top: 28%;
        left: 50%;
        transform: translate(-50%, -50%);
        img {
            width: 100%;
            height: 4.4rem;
            margin-bottom: 0.4rem;
        }
        .zfb-btn {
            text-align: center;
            span {
                padding: 0.26rem 1.13rem;
                background: #fc273c;
                border-radius: 40px;
                color: #fff;
                font-size: 0.28rem;
            }
        }
    }
}
</style>

<template>
    <div>
        <!--遮罩层 -->
        <div
            v-show="showCustomPopup"
            class="CustomPopupBefore"
            :class="{ CustomPopup: showCustomPopup }"
            @click="maskClick"
        ></div>
        <!-- 从下往上的弹出层 -->
        <div class="CustomPopupContent" :class="{ CustomPopupContentShow: showCustomPopup }">
            <slot name="PoperContent"></slot>
        </div>

        <!-- 遮罩层，层级高，透明 -->
        <div
            v-if="showCustomPopup_Trans"
            class="CustomPopupBefore"
            @click="maskClickTrans"
            :style="{ zIndex: 1301, backgroundColor: ifMengbanStatus ? 'rgba(0, 0, 0, 0.6)' : '' }"
        ></div>
        <!-- 从下往上的弹出层，层级高 -->
        <div
            :class="
                showCustomPopup_Trans || showCustomPopup
                    ? 'CustomPopupContentShow CustomPopupContent'
                    : 'CustomPopupContent'
            "
            style="z-index:1310;"
        >
            <slot name="PoperContentHigh"></slot>
        </div>

        <!-- 从上往下的弹出层 -->
        <!-- 遮罩层 -->
        <div
            v-show="showCustomPopupMask"
            class="CustomPopupBefore"
            :class="{ CustomPopup: showCustomPopupMask }"
            @click="maskClickTwo"
        ></div>

        <div class="CustomPopupContentMask" :class="{ CustomPopupContentShow: showCustomPopupMask }">
            <slot name="PoperContentMask"></slot>
        </div>

        <!-- 全屏弹窗,层级低 -->
        <div class="CustomPopupContentFull" :class="{ CustomPopupContentShow: showCustomPopupFull }">
            <slot name="PoperContentFull"></slot>
        </div>
        <!-- 全屏弹窗，层级高 -->
        <div
            class="CustomPopupContentFull"
            :class="{ CustomPopupContentShow: showCustomPopupFullUp }"
            style="z-index:1500;"
        >
            <slot name="PoperContentFullUp"></slot>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 从下往上的弹窗
            showCustomPopup: false,
            showCustomPopupChild: false,
            // 从下往上弹窗层级高
            showCustomPopup_Trans: false,

            // 从上往下弹窗
            showCustomPopupMask: false,

            // 全屏弹窗(层级低)
            showCustomPopupFull: false,
            //全屏弹窗(层级高)
            showCustomPopupFullUp: false,

            ifMengbanStatus: false
        };
    },
    methods: {
        showCustom() {
            this.showCustomPopup = true;
        },
        // 遮罩层点击事件
        maskClick() {
            // 配送门店、配送时间
            this.$emit("closePayWayStore");
            // 商品列表
            this.$emit("closeShopNameFun");
            // 单选框
            this.$emit("closeRadioFun");
            // 发票列表
            this.$emit("closeFpList");
            // 添加发票
            this.$emit("closeFpWrite");
            // 代金券
            this.$emit("closeMyVouchersFun");
            // 红包
            this.$emit("closeHongbaoFun");
            // 支付卡
            this.$emit("closeZhifukaFun");
            // 支付方式
            this.$emit("closePayMyWayFun");
            // 花呗分期
            this.$emit("closeHuabeiFun");
            // 购买门店
            this.$emit("closeStoreFun");

            // 规格弹窗
            this.$emit("guigeFun");
        },

        // 让遮罩层和弹窗隐藏
        maskClickHidden() {
            this.showCustomPopup = false;
            this.showCustomPopupChild = false;
            this.showCustomPopup_Trans = false;
        },

        // 半窗弹窗(层级高)
        showCustomZindex() {
            this.showCustomPopup_Trans = true;
        },
        // 半窗弹窗(层级高)判断此时的蒙版是否显示透明
        ifMengban() {
            this.ifMengbanStatus = true; //不显示透明
        },
        // 层级高的遮罩层点击事件
        maskClickTrans() {
            if (this.ifMengbanStatus) {
                this.showCustomPopup_Trans = false;
            }
        },

        PopupChildClick() {
            this.showCustomPopupChild = true;
        },
        closePopupChild() {
            this.showCustomPopupChild = false;
        },

        // 从上往下弹窗
        showMask() {
            this.showCustomPopupMask = true;
        },
        maskClickTwo() {
            this.showCustomPopupMask = false;
        },

        // 全屏弹窗
        showMaskFull() {
            this.showCustomPopupFull = true;
        },
        maskCloseFull() {
            this.showCustomPopupFull = false;
        },

        // 关闭全屏弹窗
        colseChangePhone() {
            this.showCustomPopupFull = false;
        },
        // 全屏弹窗（层级高）
        showMaskFullUp() {
            this.showCustomPopupFullUp = true;
        },
        // 关闭全屏弹窗，层级高
        maskCloseFullUp() {
            this.showCustomPopupFullUp = false;
        },

        // 让分享的弹窗详情显示
        fenxiangDetailClick() {}
    }
};
</script>

<style lang="scss" scoped>
.CustomPopupBefore {
    height: 100%;
    position: fixed;
    z-index: 500;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    transition: all 0.3s ease;
}
.CustomPopup {
    background: rgba(0, 0, 0, 0.6) !important;
}
// 从下往上
.CustomPopupContent {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: all 0.3s ease;
    transform: translateY(100%);
    z-index: 500;
}
// 从上往下
.CustomPopupContentMask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transition: all 0.3s ease;
    transform: translateY(-101%);
    z-index: 500;
    background-color: #fff;
}
// 全屏弹窗
.CustomPopupContentFull {
    position: fixed;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
    // height: 100vh;
    transition: all 0.3s ease;
    transform: translateY(100%);
    z-index: 1200;
    background-color: #fff;
}

.CustomPopupContentShow {
    transform: translateY(0);
}

// 全屏弹窗
.contentFullTitle {
    height: 0.88rem;
    font-size: 0.34rem;
    color: #222222;
    line-height: 0.88rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    margin-bottom: 0.3rem;
    // 关闭按钮
    .closeContentFull {
        position: absolute;
        width: 0.3rem;
        height: 0.3rem;
        right: 0.26rem;
        top: 0;
        img {
            width: 100%;
            height: 100%;
            margin-top: 0.3rem;
            margin-bottom: 0.3rem;
        }
    }
}

// 搜索框
.contentFull_search {
    padding-left: 0.26rem;
    padding-right: 0.26rem;
    .contentFull_searchInput {
        position: relative;
        margin-bottom: 0.4rem;
        input {
            width: 100%;
            height: 0.8rem;
            box-sizing: border-box;
            border-radius: 0.5rem;
            background-color: #f5f5f5;
            padding-left: 0.41rem;
            padding-right: 0.85rem;
            outline: none;
        }
        img {
            width: 0.34rem;
            height: 0.34rem;
            position: absolute;
            right: 0.4rem;
            top: 50%;
            transform: translateY(-50%);
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
        }
    }
}
</style>

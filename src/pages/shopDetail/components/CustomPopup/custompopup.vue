 <template>
  <div>
    <!--遮罩层 -->
    <div
      v-show="showCustomPopup"
      class="CustomPopupBefore"
      :class="{'CustomPopup':showCustomPopup}"
      @click="maskClick"
    ></div>
    <!-- 从下往上的弹出层 -->
    <div class="CustomPopupContent" :class="{'CustomPopupContentShow':showCustomPopup}">
      <slot name="PoperContent"></slot>
      
    </div>

    <!-- 从上往下的弹出层 -->
    <!-- 遮罩层 -->
    <div
      v-show="showCustomPopupMask"
      class="CustomPopupBefore"
      :class="{'CustomPopup':showCustomPopupMask}"
      @click="maskClickTwo"
    ></div>

    <div class="CustomPopupContentMask" :class="{'CustomPopupContentShow':showCustomPopupMask}">
      <slot name="PoperContentMask"></slot>
    </div>

    <!-- 全屏弹窗 -->
    <div class="CustomPopupContentFull" :class="{'CustomPopupContentShow':showCustomPopupFull}">
      <slot name="PoperContentFull"></slot>
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

      // 从上往下弹窗
      showCustomPopupMask: false,

      // 全屏弹窗
      showCustomPopupFull: false
    };
  },
  methods: {
    showCustom() {
      this.showCustomPopup = true;
    },
    // 遮罩层点击事件
    maskClick() {
      // 代金券
      this.$emit("closeMask");
      // 满减
      this.$emit("closeManjian");
      // 批发
      this.$emit("closePifa");
      // 规格
      this.$emit("closeGuige");

      // 首页中的弹窗
      // 分享
      this.$emit("fenxiangFun");
      // 分享弹窗
      this.$emit("fenxiangDetailFun")
      // 指定区域
      this.$emit("zhidingquyuFun");
      // 批发
      this.$emit("manjianFun");
      // 专享
      this.$emit("zhuanxiangFun");
      // 限时
      this.$emit("xianshiFUn");
      // 领券
      this.$emit("lingquanFun");
      // 优惠
      this.$emit("youhuiFun");
      // 规格
      this.$emit("guigeFun");
      // 服务
      this.$emit("fuwuFun");
      // 产品属性
      this.$emit("canpinshuxiangFun");
    },

    // 让遮罩层和弹窗隐藏
    maskClickHidden() {
      this.showCustomPopup = false;
      this.showCustomPopupChild = false;
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

    // 让分享的弹窗详情显示
    fenxiangDetailClick(){

    }
}
};
</script>

<style lang="scss" scoped>
.CustomPopupBefore {
  height: 100%;
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  transition: all 0.3s ease;
}
.CustomPopup {
  background: rgba(0, 0, 0, 0.6) !important;
  // height: 100%;
  // position: fixed;
  // z-index: 1000;
  // top: 0;
  // right: 0;
  // left: 0;
  // bottom: 0;
  // // background: rgba(0, 0, 0, 0);
  // transition: all 0.3s ease;
}
// 从下往上
.CustomPopupContent {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 11000;
}
// 从上往下
.CustomPopupContentMask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(-101%);
  z-index: 11000;
  background-color: #fff;
}
// 全屏弹窗
.CustomPopupContentFull {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 12000;
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
 <template>
  <div>
    <!-- 弹出层 -->
    <div
      v-show="showCustomPopup"
      class="CustomPopupBefore"
      :class="{'CustomPopup':showCustomPopup}"
      @click="coloseBounced"
    ></div>
    <div
      class="CustomPopupContent"
      :class="{'CustomPopupContentShow':showCustomPopup}"
      v-show=" showCustomPopup == true "
    >
      <div class="customPopupContent_box">
        <slot name="bouncedContent"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showCustomPopup: false,
      showCustomPopupChild: false
    };
  },
  methods: {
    // 显示内容
    showBounced() {
      this.showCustomPopup = true;
    },
    // 隐藏内容
    coloseBounced() {
      this.showCustomPopup = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.CustomPopupBefore {
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 11000;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0);
}
.CustomPopup {
  background: rgba(0, 0, 0, 0.6) !important;
}

.CustomPopupContentShow {
  transform: translateY(0);
}

.CustomPopupContent {
  position: fixed;
  width: 5.4rem;
  height: 3.3rem;
  background-color: #fff;
  border-radius: 0.22rem;
  bottom: 28%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  z-index: 11100;
  .customPopupContent_box {
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
  }
}
</style>
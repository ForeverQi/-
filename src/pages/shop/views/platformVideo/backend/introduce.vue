<template>
  <div id="introduce">
    <van-loading v-if="showLoading" size="50px" color="#1989fa" />
    <van-overlay :show="showLoading" />
    <div
      class="introduce_box"
      :style="{backgroundImage: 'url('+ 'https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/platform_sxd.png'+ ')'}"
    >
      <div class="introduce_button">
        <button>立即开通</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";

export default {
  name: "introduce",
  data() {
    return {
      showLoading: false
    };
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.introduce_box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.introduce_button {
  position: absolute;
  bottom: 1.55rem;
  left: 50%;
  transform: translateX(-50%);
  button {
    width: 3.25rem;
    height: 0.98rem;
    background: rgba(255, 115, 12, 1);
    box-shadow: 0 0.09rem 0.17rem 1 rgba(248, 61, 7, 0.26);
    border-radius: 0.18rem;
    font-size: 0.32rem;
    color: #fff;
    font-weight: bold;
    outline: none;
    border: 0;
  }
}
</style>

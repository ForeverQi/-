<template>
  <div id="introduce">
    <van-loading v-if="showLoading" size="50px" color="#1989fa" />
    <van-overlay :show="showLoading" />
    <div class="introduce_box">
      <div class="introduce_top">
        <div class="searchNoteTop_left">
          <div class="voerTop_menuLeft">
            <span></span>
          </div>
        </div>
      </div>
      <div class="introduce_title">
          <span>请完成资质后才可以开通视小店</span>
      </div>
      <div class="introduce_content">
          <img src="@/pages/shop/views/platformVideo/frontend/images/platform_personal.png"/>
          <img src="@/pages/shop/views/platformVideo/frontend/images/platform_busindess.png"/>
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
// 返回按钮
.introduce_top {
  height: 1rem;
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
  .searchNoteTop_left {
    position: absolute;
    left: 0.25rem;
    top: 50%;
    transform: translateY(-50%);
    .voerTop_menuLeft {
      width: 0.45rem;
      height: 0.45rem;
      display: flex;
      justify-content: center;
      align-items: center;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

      span::after {
        content: "";
        display: block;
        width: 0.2rem;
        height: 0.2rem;
        border-left: 2px solid #000;
        border-top: 2px solid #000;
        transform: rotate(-45deg);
        // margin-left: 0.1rem;
      }
    }
  }
}
.introduce_title{
    display: flex;
    justify-content: center;
    font-size: 0.34rem;
    color: #8E540F; 
    font-weight: bold;
    margin-bottom: 0.98rem;
    span{
    position: relative;
        &::before{
            content: '';
            display:block;
            position: absolute;
            width: 0.37rem;
            height: 1px;
            background: #A76E2B;
            left: -0.58rem;
            top: 50%;
            transform: translateY(-50%);
        }
        &::after{
            content: '';
            display:block;
            position: absolute;
            width: 0.37rem;
            height: 1px;
            background: #A76E2B;
            right: -0.58rem;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
.introduce_content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
        width: 5.74rem;
        height: 2.25rem;
        margin-bottom: 0.15rem;
    }
}
</style>

<template>
  <div class="liveEnd_box">
    <div class="liveEnd">
      <p class="liveEnd_title">直播已结束</p>
      <p class="liveEnd_liuliang">该直播累计使用流量:123MB</p>
      <div class="liveEnd_content">
        <div class="liveEnd_child">
          <p>123123</p>
          <span>观看人数</span>
        </div>
        <div class="liveEnd_child">
          <p>123123</p>
          <span>新增关注</span>
        </div>
        <div class="liveEnd_child">
          <p>123123</p>
          <span>直播时长</span>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="liveEnd_btn">
        <button style="background:rgba(255,255,255,0.2)">已保存</button>
        <button style="background:#007AFF;">分享</button>
        <button style="background:#007AFF;">保存回放</button>
        <button style="background:#fff;color:#222222;">不保存回放</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {},

  created() {},

  methods: {}
};
</script>
<style lang="scss" scoped>
.liveEnd_box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/live_indexBgc.png")
    no-repeat;
  background-size: 100% 100%;
  z-index: 1;
  .liveEnd {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: #ffffff;
    text-align: center;
    width: 100%;
    .liveEnd_title {
      font-size: 0.46rem;
      font-weight: bold;
      margin-bottom: 0.1rem;
    }
    .liveEnd_liuliang {
      font-size: 0.28rem;
      margin-bottom: 1.2rem;
    }
    .liveEnd_content {
      display: flex;
      align-items: center;
      margin-bottom: 1.4rem;
      .liveEnd_child {
        position: relative;
        flex: 1;
        &::after{
          content: '';
          display:block;
          position: absolute;
          width: 1px;
          height: 0.77rem;
          background: #fff;
          opacity: 0.3;
          right: 0rem;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .liveEnd_btn{
      button{
        margin: 0 auto;
        width: 3.78rem;
        height: 0.9rem;
        line-height: 0.9rem;
        display: block;
        border-radius:45px;
        text-align: center;
        color: #fff;
        font-size: 0.28rem;
        margin-bottom: 0.3rem;
        border: 0;
        outline: none;
      }
    }
  }
}
</style>
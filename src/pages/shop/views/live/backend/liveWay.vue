<template>
  <div>
    <div class="liveWay_box" v-wechat-title="$route.meta.title= '开始直播'">
      <div class="liveWay">
        <!-- 顶部标题 -->
        <!-- <div class="searchNoteTop">
          <div class="searchNoteTop_left">
            <div class="voerTop_menuLeft">
              <span></span>
            </div>
          </div>
          <div class="searchNoteTop_right">
            <span>开始直播</span>
          </div>
        </div> -->
        <!-- 主题内容 -->
        <div class="liveWay_content">
          <div class="liveWay_top">
            <div class="liveWay_top_left"></div>
            <div class="liveWay_top_right">
              <p>如何高效管理团队？明确大家明确大家都认同的目标</p>
              <span>2019-11-11 12:00 开播</span>
            </div>
          </div>

          <!-- 手机摄像头直播 -->
          <div class="liveWay_content_box">
              <img src="@/pages/shop/views/live/backend/images/createLive_camera.png" alt=""/>
              <p>手机摄像头直播</p>
              <span>支持使用手机摄像头横竖屏直播</span>
          </div>
          <!-- 第三方推流直播 -->
          <div class="liveWay_content_box">
              <img src="@/pages/shop/views/live/backend/images/createLive_three.png" alt=""/>
              <p>第三方推流直播</p>
              <span>使用OBS等第三放软件进行推流直播</span>
          </div>
        </div>
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
// 返回按钮
.searchNoteTop {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.88rem;
  background: #fff;
  font-size: 0.34rem;
  color: #222222;
  position: relative;

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
      }
    }
  }
}
.liveWay_box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f3f3f5;
  overflow-y: scroll;
  .liveWay {
    .liveWay_content {
      .liveWay_top {
        display: flex;
        justify-content: space-between;
        padding: 0.3rem 0.31rem;
        background: #fff;
        border-bottom-left-radius: 0.26rem;
        border-bottom-right-radius: 0.26rem;
        margin-bottom: 0.2rem;
        .liveWay_top_left {
          flex: none;
          width: 2.1rem;
          height: 1.35rem;
          background: rgba(96, 96, 96, 1);
          border-radius: 0.05rem;
          margin-right: 0.37rem;
        }
        .liveWay_top_right{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
                font-size: 0.26rem;
                color: #031332;
            }
            span{
                font-size: 0.22rem;
                color: #7C8290;
            }
        }
      }
      .liveWay_content_box{
          width: 100%;
          height: 4.75rem;
          background: #fff;
          border-radius:0.26rem;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-bottom: 0.21rem;
          img{
              width: 1.55rem;
              height: 1.54rem;
              margin-bottom: 0.1rem;
          }
          p{
              font-size: 0.32rem;
              color: #222222;
              margin-bottom: 0.13rem;
          }
          span{
              font-size: 0.24rem;
              color: #999999;
          }
      }
    }
  }
}
</style>
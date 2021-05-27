<template>
  <div class="playback_content">
    <div class="playback_content_child">
      <div class="back_child_left">
        <img
          src="http://aimg8.dlszywz.com/product/800_1500/1586/3170800_1249735_11467971359.jpg?x-oss-process=image/resize,m_mfit,h_600,w_600,limit_0"
          alt
        />
        <span>回放</span>
      </div>
      <div class="back_child_right">
        <div class="back_child_right_top">
          <span>高效管理团队01</span>
        </div>
        <div class="back_child_right_center">
            <div>
                <img src="@/pages/shop/views/live/frontend/images/back_ encryption.png" alt="">
                <span style="font-size:0.24rem;color:#7C8290;">加密</span>
            </div>
          <!-- <span style="font-weight:bold;">￥9.99</span> -->
          <span style="font-size:0.22rem;color:#B9BFC6;">2019-11-11 12:00</span>
        </div>
        <div class="back_child_right_bottom">
          <span>123123人正在观看</span>
        </div>
      </div>
    </div>
    <div class="playback_content_child">
      <div class="back_child_left">
        <img
          src="http://aimg8.dlszywz.com/product/800_1500/1586/3170800_1249735_11467971359.jpg?x-oss-process=image/resize,m_mfit,h_600,w_600,limit_0"
          alt
        />
        <span>回放</span>
      </div>
      <div class="back_child_right">
        <div class="back_child_right_top">
          <span>高效管理团队01</span>
        </div>
        <div class="back_child_right_center">
            <div>
                <img src="@/pages/shop/views/live/frontend/images/back_ encryption.png" alt="">
                <span style="font-size:0.24rem;color:#7C8290;">加密</span>
            </div>
          <!-- <span style="font-weight:bold;">￥9.99</span> -->
          <span style="font-size:0.22rem;color:#B9BFC6;">2019-11-11 12:00</span>
        </div>
        <div class="back_child_right_bottom">
          <span>123123人正在观看</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="scss">
.playback_content {
  .playback_content_child {
    width: 100%;
    height: 2.01rem;
    padding: 0.21rem 0.19rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .back_child_left {
      width: 2.8rem;
      height: 1.58rem;
      border-radius: 0.05rem;
      overflow: hidden;
      position: relative;
      margin-right: 0.35rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      span {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 0.1rem;
        height: 0.34rem;
        line-height: 0.34rem;
        background: rgba(30, 196, 120, 1);
        border-radius: 0.05rem;
        font-size: 0.22rem;
        color: #ffffff;
      }
    }
    .back_child_right{
        height: 100%;
        flex: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 0.16rem;
        padding-bottom: 0.06rem;
        .back_child_right_top{
            font-size: 0.28rem;
            color: #031332;
            flex: none;
            span{
                display: block;
                line-height: 1;
            }
        }
        .back_child_right_bottom{
            flex: none;
            font-size: 0.22rem;
            color: #7C8290;
            span{
                line-height: 1;
            }
        }
        .back_child_right_center{
            flex: auto;
            font-size: 0.28rem;
            color: #FF2121;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-top: 0.1rem;
            box-sizing: border-box;
            span{
                line-height: 1;
            }
            div{
                display: flex;
                align-items: center;
                img{
                    width: 0.17rem;
                    height: 0.21rem;
                    margin-right: 0.09rem;
                    margin-bottom: 0.025rem;
                }
            }
        }
    }
  }
}
</style>

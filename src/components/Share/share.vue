<template>
  <div>
    <!-- 蒙版 -->
    <div class="mengban" v-if="shareType != 0" @click="mengbanClick"></div>
    <!-- 弹窗 -->
    <div :class="shareType == 0 ? 'classification_box' : 'classification_box transformCation'">
      <div class="share_top">
        <div class="share_top_title">
          <span>分享</span>
        </div>
        <div class="share_top_icon">
          <div class="share_top_icon_child" @click="shareWeixin">
            <img src="@/pages/shop/views/live/frontend/images/share_weixin.png" alt />
            <span>微信好友</span>
          </div>
          <div
            class="share_top_icon_child"
            v-clipboard:copy="shareLink"
            v-clipboard:success="onCopyUrl"
            v-clipboard:error="onErrorUrl"
          >
            <img src="@/pages/shop/views/live/frontend/images/share_link.png" alt />
            <span>复制链接</span>
          </div>
        </div>
      </div>
      <div class="share_botom" @click="mengbanClick">
        <span>取消</span>
      </div>
    </div>
    <!-- 右上角分享给好友 -->
    <div
      class="weixinShareBox"
      v-if="wixinShareStatus"
      @click="wixinShareStatus = !wixinShareStatus"
    >
      <div class="wx_right">
        <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/rightArrow.png" />
      </div>
      <div class="wx_center">
        <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/rightText.png" />
      </div>
      <div class="wx_bottom">
        <img
          src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/rightBottonText.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import util from '@/libs/util'
export default {
  props: {
    shareType: {
      type: Number
    }
  },
  data() {
    return {
      channelStatus: false,
      wixinShareStatus: false, //微信分享
      shareLink: location.href
    };
  },
  computed: {},
  mounted(){
    this.shareFun();
  },
  methods: {
    mengbanClick() {
      this.$emit("ShareTypeFun", 0);
    },
    // 分享引导
    shareWeixin() {
      this.$emit("ShareTypeFun", 0);
      this.wixinShareStatus = true;
    },
    // 复制链接
    onCopyUrl: function(e) {
      Toast({ message: "复制成功", forbidClick: true });
    },
    onErrorUrl: function(e) {
      Toast({ message: "复制失败", forbidClick: true });
    },
    // 微信分享
    shareFun() {
      let href = location.href;
      util.wechat.share(
        this.wxRegCallback,
        href,
        this.$route.query.username,
        1
      );
    },
    // 微信分享
    wxRegCallback(data) {
      // 用于微信JS-SDK回调
      this.shareInfo = {
        title: 'this.videoData[this.nowIndex].title',
        desc: 'this.videoData[this.nowIndex].description',
        link: location.href,
        imgUrl: 'this.videoData[this.nowIndex].share_conver'
      };
      this.wxShareTimeline();
      this.wxShareAppMessage();
    },
      // 微信自定义分享到朋友圈
    wxShareTimeline() {
      let option = {
        title: 'this.shareInfo.title', // 分享标题, 请自行替换
        link: 'this.shareInfo.link', // 分享链接，根据自身项目决定是否需要split
        imgUrl: 'this.shareInfo.imgUrl', // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          // alert('分享成功')
        },
        error: () => {
          alert("已取消分享");
        }
      };
      // 将配置注入通用方法
      util.wechat.ShareTimeline(option);
    },
      // 微信自定义分享给朋友
    wxShareAppMessage() {
      let that = this;
      let option = {
        title: 'this.shareInfo.title', // 分享标题, 请自行替换
        desc: 'this.shareInfo.desc', // 分享描述, 请自行替换
        link: 'this.shareInfo.link', // 分享链接，根据自身项目决定是否需要split
        imgUrl: 'this.shareInfo.imgUrl', // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert("分享成功");
        },
        error: () => {
          alert("已取消分享");
        }
      };
      // 将配置注入通用方法
      util.wechat.ShareAppMessage(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.mengban {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  z-index: 100;
}
.classification_box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4.14rem;
  background: #f5f5f5;
  border-radius: 0.26 0.26 0px 0px;
  transform: translateY(100%);
  transition: all 0.3s ease-in-out 0s;
  z-index: 110;
  border-top-left-radius: 0.26rem;
  border-top-right-radius: 0.26rem;
  overflow: hidden;
  .classification {
    .classification_top {
      font-size: 0.34rem;
      color: #333333;
      display: flex;
      justify-content: center;
      padding-top: 0.3rem;
    }
    .classification_content {
      padding-left: 0.29rem;
      height: 5.3rem;
      overflow-y: scroll;
      .classification_child {
        padding: 0.3rem 0;
        border-bottom: 1px solid #ededed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:last-child {
          border: 0;
        }
        .classification_child_left {
          font-size: 0.28rem;
          color: #222222;
          img {
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            overflow: hidden;
            vertical-align: middle;
            margin-right: 0.05rem;
          }
        }
        .classification_child_right {
          flex: none;
        }
      }
    }
  }
  .classification_shop {
    .classification_shopTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.28rem;
      color: #222222;
      padding: 0 0.3rem;
      height: 0.92rem;
      // line-height: 0.92rem;
      border-bottom: 1px solid #ededed;
      .classification_shopTopLeft {
        height: 0.92rem;
        line-height: 1rem;
      }
      .classification_shopTopRight {
        // display: flex;
        // align-items: center;
        height: 0.92rem;
        line-height: 1rem;
        img {
          width: 0.16rem;
          height: 0.27rem;
          vertical-align: middle;
          margin-left: 0.02rem;
          margin-bottom: 0.065rem;
        }
      }
    }
    .classification_shop_content_box {
      position: relative;

      .classification_shop_content {
        height: 5.1rem;
        overflow-y: scroll;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        // height: 0;
        // overflow: hidden;

        .newLive_hostShop_child {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.19rem;
          padding-bottom: 0.19rem;
          border-bottom: 1px solid #ededed;
          background: #fff;
          &:last-child {
            border: 0;
          }

          .newLive_hostShop_child_left {
            width: 1.4rem;
            height: 1.4rem;
            overflow: hidden;
            flex: none;
            border-radius: 0.06rem;

            img {
              width: 100%;
              height: 100%;
              // object-fit: contain;
            }
          }

          .newLive_hostShop_child_center {
            flex: auto;
            padding-left: 0.28rem;
            padding-right: 0.52rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 1.4rem;

            .newLive_hostShop_child_center_title {
              font-size: 0.24rem;
              color: #222222;
              span {
                display: inline-block;
                line-height: 0.32rem;
              }
            }

            .newLive_hostShop_child_label {
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 0.1rem;
              height: 0.35rem;
              overflow: hidden;

              span {
                display: inline-block;
                padding: 0 0.1rem;
                background: rgba(255, 239, 239, 1);
                border-radius: 3px;
                font-size: 0.22rem;
                color: #ff3535;
                margin-right: 0.1rem;
                margin-bottom: 0.1rem;
              }
            }

            .newLive_hostShop_child_price {
              font-size: 0.24rem;
              color: #fc273c;
              display: flex;
              align-items: center;
            }
          }

          .newLive_hostShop_child_right {
            flex: none;

            img {
              width: 0.22rem;
              height: 0.22rem;
            }
          }
        }
      }
      .channel_list {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        max-height: 3.48rem;
        background: #fff;
        padding: 0.38rem 0.29rem !important;
        box-sizing: border-box;
        overflow-y: scroll;
        z-index: -1;
        opacity: 0;
        transition: all 0.4s ease-in-out 0s;
        .channel_list_child {
          display: flex;
          align-items: center;
          font-size: 0.28rem;
          color: #333333;
          margin-bottom: 0.3rem;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .share_top {
    height: 3.1rem;
    background: #fff;
    padding-top: 0.47rem;
    box-sizing: border-box;
    text-align: center;
    margin-bottom: 0.1rem;

    .share_top_title {
      font-size: 0.26rem;
      color: #222222;
      margin-bottom: 0.26rem;
      span {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          width: 0.69rem;
          height: 1px;
          background: #dbdbdb;
          left: -165%;
          top: 50%;
          transform: translateY(-50%);
        }
        &::after {
          content: "";
          position: absolute;
          width: 0.69rem;
          height: 1px;
          background: #dbdbdb;
          left: 120%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .share_top_icon {
      font-size: 0.26rem;
      color: #222222;
      display: flex;
      align-items: center;
      justify-content: center;
      .share_top_icon_child {
        display: flex;
        flex-direction: column;
        margin-right: 1rem;
        &:last-child {
          margin-right: 0;
        }
        img {
          width: 1.34rem;
          height: 1.28rem;
        }
      }
    }
  }
  .share_botom {
    height: 0.94rem;
    background: #fff;
    font-size: 0.28rem;
    color: #031332;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.transformCation {
  transform: translateY(0) !important;
  transition: all 0.3s ease-in-out 0s;
}

// 微信指导分享
.weixinShareBox {
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 10000;
  top: 0;
  left: 0;
  background: rgba(35, 32, 29, 0.8);
  .wx_right {
    position: absolute;
    top: 0.33rem;
    right: 0.47rem;
    width: 1.42rem;
    height: 1.68rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .wx_center {
    width: 2.45rem;
    height: 0.85rem;
    position: absolute;
    top: 2.56rem;
    left: 50%;
    transform: translateX(-50%);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .wx_bottom {
    width: 6.46rem;
    height: 0.35rem;
    position: absolute;
    top: 3.74rem;
    left: 50%;
    transform: translateX(-50%);
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<template>
  <div class="liveIndex_box">
    <div class="liveIndex">
      <!-- 粉丝，观看数 -->
      <div class="liveIndex_username_box">
        <div class="liveIndex_username">
          <div class="liveIndex_username_left"></div>
          <div class="liveIndex_username_right">
            <p>粉丝:0</p>
            <p>观看:123</p>
          </div>
        </div>
        <div class="liveIndex_username_data">
          <p class="live_time">
            <span></span>
            <span>12:12:12</span>
          </p>
          <p class="live_speed">
            <img src="@/pages/shop/views/live/backend/images/createLive_speed.png" alt />
            <span>123kb/s</span>
          </p>
        </div>
      </div>
      <!-- 直播聊天内容 -->
      <div class="live_chatData">
        <div class="live_chatData_child">
          <span>川普：</span>
          <span>法拒绝的理由</span>
        </div>
        <div class="live_chatData_child">
          <span>川普：</span>
          <span>法拒绝的理由法拒绝的理由法拒绝的理由</span>
        </div>
        <div class="live_chatData_child">
          <span>川普：</span>
          <span>法拒绝的理由</span>
        </div>
        <div class="live_chatData_child">
          <span>川普：</span>
          <span>法拒绝的理由</span>
        </div>
        <div class="live_chatData_child">
          <span>川普：</span>
          <span>法拒绝的理由</span>
        </div>
        <div class="live_chatData_child">
          <span>川普：</span>
          <span>法拒绝的理由</span>
        </div>
        <div class="live_chatData_child">
          <span>川普：</span>
          <span>法拒绝的理由</span>
        </div>
      </div>
      <!-- 右下角结束下播，分享设置 -->
      <div class="liveIndex_endLive">
        <div class="liveIndex_endLive_top">
          <img
            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoShare.png"
            alt
          />
        </div>
        <div class="liveIndex_endLive_top">
          <img
            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoShare.png"
            alt
          />
        </div>
        <div class="endLive_child_bottom" @click="endLiveBtn">
          <span>结束下播</span>
        </div>
      </div>
      <!-- 开始直播 -->
      <div class="beginLive" v-if="false">
        <p>开始直播</p>
        <span>3</span>
      </div>
      <!-- 蒙版 -->
      <div class="mengban" v-if="shadowStatus" @click="shadowStatus = false,nicengStatus=false,hostNameStatus=false"></div>
      <!-- 用户名昵称 -->
      <div class="username_nichen" v-if="nicengStatus">
        <div class="username_nichen_top">
          <div class="nicheng_pic"></div>
          <span>用户名昵称</span>
        </div>
        <div class="username_nichen_bottom">
          <div @click="selectStatus" :class="valueFlg ? 'marquee marqueeSelect' : 'marquee'">
            <div :class="valueFlg ? 'marqueeButton marqueeButtonSelect' : 'marqueeButton'"></div>
            <!-- 关闭 -->
            <span :class="valueFlg ? 'closeText changeText' : 'closeText'">关闭</span>
            <!-- 加密 -->
            <span :class="valueFlg ? 'passwordText changePassword' : ' passwordText'">加密</span>
          </div>
        </div>
        <!-- 关闭按钮 -->
        <div class="nineng_closeImg" @click="shadowStatus = false,nicengStatus=false">
          <img
            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoDengluclose.png"
            alt
          />
        </div>
      </div>
      <!-- 主播名称 -->
      <div class="hostName" v-if="hostNameStatus">
        <div class="hostName_top">
          <div class="hostName_top_left"></div>
          <div class="hostName_top_right">
            <p>主播名称</p>
            <span>简介简介简介简介简介简介简介</span>
          </div>
        </div>
        <div class="hostName_bottom">
          <div class="hostName_bottom_up">
            <img src="@/pages/shop/views/live/backend/images/createLive_house.png" alt />
            <span>直播间名</span>
          </div>
          <div class="hostName_bottom_up">
            <img src="@/pages/shop/views/live/backend/images/create_hostTime.png" alt />
            <span>直播间名</span>
          </div>
        </div>
        <!-- 关闭按钮 -->
        <div class="nineng_closeImg" @click="shadowStatus = false,hostNameStatus=false">
          <img style="width:0.22rem;height:0.22rem;"
            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoDengluclose.png"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hint from '@/plugins/hint'
export default {
  data() {
    return {
      shadowStatus: false,
      valueFlg: false,
      nicengStatus: false,
      hostNameStatus:false
    };
  },

  computed: {},

  created() {},

  methods: {
    //switch
    selectStatus() {
      this.valueFlg = !this.valueFlg;
    },
    // 结束下播
    endLiveBtn(){
        Hint.Confirm({
            title: '',
            message: '确认要结束下播吗?',
            confirmButtonText:"确认",
            cancelButtonText:'取消',
            className:'confirmBox'
        }).then(() => {
            console.log(1)
        }).catch(() => {
            console.log(2)
         
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.liveIndex_box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/live_indexBgc.png")
    no-repeat;
  background-size: 100% 100%;
  z-index: 1;
  .liveIndex {
    .liveIndex_username_box {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.23rem;
      padding-top: 0.26rem;
      padding-right: 0.2rem;
      box-sizing: border-box;

      .liveIndex_username {
        height: 0.9rem;
        padding: 0.05rem 0.43rem 0.05rem 0.05rem;
        border-radius: 0.45rem;
        background: rgba(0, 0, 0, 0.2);
        overflow: hidden;
        z-index: 10;
        display: flex;
        align-items: center;
        .liveIndex_username_left {
          width: 0.8rem;
          height: 0.8rem;
          overflow: hidden;
          border-radius: 50%;
          border: 1px solid #f00;
          margin-right: 0.18rem;
        }
        .liveIndex_username_right {
          font-size: 0.24rem;
          color: #ffffff;
        }
      }

      .liveIndex_username_data {
        font-size: 0.24rem;
        color: #fff;
        .live_time {
          span {
            &:first-child {
              width: 0.1rem;
              height: 0.1rem;
              border-radius: 50%;
              background: #ff5533;
              display: inline-block;
              margin-right: 0.06rem;
            }
          }
        }
        .live_speed {
          display: flex;
          align-items: center;
          img {
            width: 0.16rem;
            height: 0.16rem;
            margin-right: 0.09rem;
            display: inline-block;
          }
        }
      }
    }
    .live_chatData {
      position: absolute;
      left: 0.19rem;
      bottom: 0.29rem;
      z-index: 10;
      height: 4.6rem;
      overflow-y: scroll;
      .live_chatData_child {
        padding: 0.12rem 0.36rem 0.12rem 0.3rem;
        border-radius: 0.3rem;
        background: rgba(0, 0, 0, 0.2);
        font-size: 0.26rem;
        color: #fff;
        max-width: 5rem;
        margin-bottom: 0.1rem;
        width: max-content;
        span {
          &:first-child {
            color: #ffd488;
          }
        }
      }
    }
    .liveIndex_endLive {
      position: absolute;
      right: 0.2rem;
      bottom: 0.2rem;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      .endLive_child_bottom {
        width: 1.21rem;
        height: 1.21rem;
        background: linear-gradient(
          45deg,
          rgba(255, 20, 20, 1),
          rgba(255, 84, 0, 1)
        );
        box-shadow: 0.03rem 0.05rem 0.2rem 0px rgba(255, 33, 16, 0.42);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 0.28rem;
          color: #fefefe;
          display: inline-block;
          width: 0.58rem;
          line-height: 1.4;
        }
      }
      .liveIndex_endLive_top {
        width: 0.9rem;
        height: 0.9rem;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.29rem;
        img {
          width: 0.45rem;
          height: 0.35rem;
        }
      }
    }
    .beginLive {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      p {
        width: 3.9rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        background: rgba(0, 122, 255, 1);
        border-radius: 0.45rem;
        font-size: 0.28rem;
        color: #ffffff;
        margin-bottom: 0.5rem;
      }
      span {
        width: 1.2rem;
        height: 1.2rem;
        background: #fff;
        border-radius: 50%;
        font-size: 0.48rem;
        color: #333333;
        line-height: 1.2rem;
        text-align: center;
        display: inline-block;
      }
    }
  }
}

// 蒙版
.mengban {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
}
.hostName {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 25;
  width: 5.8rem;
  box-sizing: border-box;
  padding: 0.57rem 0.5rem 0.4rem;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .hostName_top {
    width: 4.78rem;
    border-bottom: 1px solid #ededed;
    display: flex;
    padding-bottom: 0.5rem;
    .hostName_top_left {
      width: 1rem;
      height: 1rem;
      border: 1px solid #f00;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.2rem;
    }
    .hostName_top_right {
      color: #222222;
      font-size: 0.24rem;
      p {
        font-size: 0.28rem;
        font-weight: bold;
        margin-bottom: 0.1rem;
      }
      span {
        display: inline-block;
        max-width: 2.4rem;
      }
    }
  }
  .hostName_bottom {
    padding-top: 0.35rem;
    width: 100%;
    .hostName_bottom_up {
      margin-bottom: 0.08rem;
      font-size: 0.24rem;
      color: #222222;
      img {
        width: 0.25rem;
        height: 0.21rem;
        margin-right: 0.1rem;
        vertical-align: middle;
      }
    }
  }
}
.username_nichen {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 25;
  width: 5.8rem;
  height: 3.9rem;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .username_nichen_top {
    width: 4.78rem;
    border-bottom: 1px solid #ededed;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.4rem 0;
    .nicheng_pic {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #f00;
      margin-bottom: 0.15rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    span {
      font-size: 0.28rem;
      color: #222222;
    }
  }
}
.nineng_closeImg {
  position: absolute;
  top: 0.1rem;
  right: 0.23rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  img {
    width: 0.28rem;
    height: 0.28rem;
  }
}
// switch开关
.username_nichen_bottom {
  padding-top: 0.43rem;
  .marquee {
    width: 1.7rem;
    height: 0.6rem;
    border-radius: 0.4rem;
    overflow: hidden;
    background-color: #cfd9e3;
    margin-left: 0.29rem;
    transition: all 0.4s ease-in-out 0s;
    position: relative;

    .marqueeButton {
      position: absolute;
      left: 2px;
      top: 50%;
      transform: translateY(-50%);
      width: 0.53rem;
      height: 0.53rem;
      box-shadow: 0.02rem 0.03rem 0.08rem 0 rgba(2, 2, 2, 0.2);
      border-radius: 50%;
      background-color: #fff;
      transition: all 0.4s ease-in-out 0s;
      z-index: 10;
    }

    .closeText {
      position: absolute;
      font-size: 0.24rem;
      color: #fff;
      left: 56%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
      transition: all 0.3s ease-in-out 0s;
      z-index: 2;
    }

    .passwordText {
      position: absolute;
      font-size: 0.24rem;
      color: #fff;
      left: 43%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: all 0.3s ease-in-out 0s;
      z-index: 2;
    }
  }

  .marqueeSelect {
    background-color: #007aff !important;
  }

  .marqueeButtonSelect {
    left: 66% !important;
  }
}

.changeText {
  opacity: 0 !important;
}

.changePassword {
  opacity: 1 !important;
}
</style>
<style lang="scss">
.confirmBox{
    font-size: 0.28rem;
    color: #222222;
    font-weight: bold;
    .van-dialog__message{
      padding:0.95rem !important;
    }
}
</style>
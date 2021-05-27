<template>
  <div>
    <!-- 蒙版 -->
    <div class="mengban" v-if="cationType != 0" @click="mengbanClick"></div>
    <!-- 弹窗 -->
    <div :class="cationType == 0 ? 'classification_box' : 'classification_box transformCation'">
      <!-- 选择主播 -->
      <div class="classification" v-if="shopStatus == 0">
        <div class="classification_top">
          <span>请选择主播或员工</span>
        </div>
        <div class="classification_content" v-if="true">
          <div class="classification_child">
            <div class="classification_child_left">
              <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png" alt />
              <span>主播名称</span>
            </div>
            <div class="classification_child_right">
              <div
                :class=" true ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'"
                v-if="true"
              >
                <img
                  src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/check.png"
                  alt="check"
                  v-show="true"
                />
              </div>
            </div>
          </div>
          <div class="classification_child">
            <div class="classification_child_left">
              <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png" alt />
              <span>主播名称</span>
            </div>
            <div class="classification_child_right">
              <div
                :class=" false ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'"
                v-if="true"
              >
                <img
                  src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/check.png"
                  alt="check"
                  v-show="false"
                />
              </div>
            </div>
          </div>
          <div class="classification_child">
            <div class="classification_child_left">
              <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png" alt />
              <span>主播名称</span>
            </div>
            <div class="classification_child_right">
              <div
                :class=" false ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'"
                v-if="true"
              >
                <img
                  src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/check.png"
                  alt="check"
                  v-show="false"
                />
              </div>
            </div>
          </div>
          <div class="classification_child">
            <div class="classification_child_left">
              <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png" alt />
              <span>主播名称</span>
            </div>
            <div class="classification_child_right">
              <div
                :class=" false ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'"
                v-if="true"
              >
                <img
                  src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/check.png"
                  alt="check"
                  v-show="false"
                />
              </div>
            </div>
          </div>
          <div class="classification_child">
            <div class="classification_child_left">
              <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png" alt />
              <span>主播名称</span>
            </div>
            <div class="classification_child_right">
              <div
                :class=" false ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'"
                v-if="true"
              >
                <img
                  src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/check.png"
                  alt="check"
                  v-show="false"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="classification_btn" v-if="true">
          <span>确认</span>
        </div>

        <!-- 没有数据 -->
        <div class="classification_noData" v-if="false">
          <img src="@/pages/shop/views/live/backend/images/createLive_zhuboNodata.png" alt />
          <p>您还没有可以添加的主播或员工</p>
        </div>
      </div>
      <!-- 选择商品 -->
      <div class="classification_shop" v-if="shopStatus == 1">
        <div class="classification_shopTop" v-if="liveDetail != 1">
          <div class="classification_shopTopLeft">
            <span>栏目</span>
          </div>
          <div class="classification_shopTopRight" @click="channelClick">
            <span>公司产品</span>
            <img
              :class="channelStatus ? 'scaleChannel checkChannel' : 'scaleChannel'"
              src="@/pages/shop/views/live/backend/images/liveList_rightArrow.png"
              alt
            />
          </div>
        </div>
        <div class="classification_shop_content_box">
          <div class="classification_shop_content" :class="liveDetail == 1 ? 'detailLive': ''">
            <div class="newLive_hostShop_child">
              <div class="newLive_hostShop_child_left">
                <img
                  src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png"
                  alt
                />
              </div>
              <div class="newLive_hostShop_child_center" :style="{paddingRight:liveDetail == 1 ? 0 : ''}">
                <div class="newLive_hostShop_child_center_title">
                  <span class="tag_text">限时购</span>
                  <span :style="{display:liveDetail == 1 ? 'inline':''}">米家 （MIJIA）扫地机器人 小米扫拖一体机器人 家用吸尘器</span>
                </div>
                <div class="newLive_hostShop_child_label">
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                </div>
                <div class="newLive_hostShop_child_price">
                  <div style="margin-right:0.1rem;" :class="liveDetail == 1 ? 'liveDetailFont':''">
                    <span>￥1999.00</span>
                  </div>
                  <span style="position:relative;color:#000000;">
                    ￥1999.00
                    <div class="status_thrid">
                      <div class="status_thrid_box" v-if="true">
                        <!-- <div
                                  class="status_thrid_box"
                                  v-if="guigeData.pro_tag == '会员价' || guigeData.pro_tag == '会员折扣'"
                        >-->
                        <span>会员价</span>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="classification_child_right"  v-if="liveDetail != 1">
                <div
                  :class=" false ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'"
                  v-if="true"
                >
                  <img
                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/check.png"
                    alt="check"
                    v-show="false"
                  />
                </div>
              </div>
            </div>
            <div class="newLive_hostShop_child">
              <div class="newLive_hostShop_child_left">
                <img
                  src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png"
                  alt
                />
              </div>
              <div class="newLive_hostShop_child_center" :style="{paddingRight:liveDetail == 1 ? 0 : ''}">
                <div class="newLive_hostShop_child_center_title">
                  <span class="tag_text">限时购</span>
                  <span :style="{display:liveDetail == 1 ? 'inline':''}">米家 （MIJIA）扫地机器人 小米扫拖一体机器人 家用吸尘器</span>
                </div>
                <div class="newLive_hostShop_child_label">
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                </div>
                <div class="newLive_hostShop_child_price">
                  <div style="margin-right:0.1rem;" :class="liveDetail == 1 ? 'liveDetailFont':''">
                    <span>￥1999.00</span>
                  </div>
                  <span style="position:relative;color:#000000;">
                    ￥1999.00
                    <div class="status_thrid">
                      <div class="status_thrid_box" v-if="true">
                        <!-- <div
                                  class="status_thrid_box"
                                  v-if="guigeData.pro_tag == '会员价' || guigeData.pro_tag == '会员折扣'"
                        >-->
                        <span>会员价</span>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="classification_child_right"  v-if="liveDetail != 1">
                <div
                  :class=" false ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'"
                  v-if="true"
                >
                  <img
                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/check.png"
                    alt="check"
                    v-show="false"
                  />
                </div>
              </div>
            </div>
            <div class="newLive_hostShop_child">
              <div class="newLive_hostShop_child_left">
                <img
                  src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png"
                  alt
                />
              </div>
              <div class="newLive_hostShop_child_center" :style="{paddingRight:liveDetail == 1 ? 0 : ''}">
                <div class="newLive_hostShop_child_center_title">
                  <span class="tag_text">限时购</span>
                  <span :style="{display:liveDetail == 1 ? 'inline':''}">米家 （MIJIA）扫地机器人 小米扫拖一体机器人 家用吸尘器</span>
                </div>
                <div class="newLive_hostShop_child_label">
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                </div>
                <div class="newLive_hostShop_child_price">
                  <div style="margin-right:0.1rem;" :class="liveDetail == 1 ? 'liveDetailFont':''">
                    <span>￥1999.00</span>
                  </div>
                  <span style="position:relative;color:#000000;">
                    ￥1999.00
                    <div class="status_thrid">
                      <div class="status_thrid_box" v-if="true">
                        <!-- <div
                                  class="status_thrid_box"
                                  v-if="guigeData.pro_tag == '会员价' || guigeData.pro_tag == '会员折扣'"
                        >-->
                        <span>会员价</span>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="classification_child_right"  v-if="liveDetail != 1">
                <div
                  :class=" false ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'"
                  v-if="true"
                >
                  <img
                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/check.png"
                    alt="check"
                    v-show="false"
                  />
                </div>
              </div>
            </div>
            <div class="newLive_hostShop_child">
              <div class="newLive_hostShop_child_left">
                <img
                  src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png"
                  alt
                />
              </div>
              <div class="newLive_hostShop_child_center" :style="{paddingRight:liveDetail == 1 ? 0 : ''}">
                <div class="newLive_hostShop_child_center_title">
                  <span class="tag_text">限时购</span>
                  <span :style="{display:liveDetail == 1 ? 'inline':''}">米家 （MIJIA）扫地机器人 小米扫拖一体机器人 家用吸尘器</span>
                </div>
                <div class="newLive_hostShop_child_label">
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                  <span>满200减30</span>
                </div>
                <div class="newLive_hostShop_child_price">
                  <div style="margin-right:0.1rem;" :class="liveDetail == 1 ? 'liveDetailFont':''">
                    <span>￥1999.00</span>
                  </div>
                  <span style="position:relative;color:#000000;">
                    ￥1999.00
                    <div class="status_thrid">
                      <div class="status_thrid_box" v-if="true">
                        <!-- <div
                                  class="status_thrid_box"
                                  v-if="guigeData.pro_tag == '会员价' || guigeData.pro_tag == '会员折扣'"
                        >-->
                        <span>会员价</span>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
              <div class="classification_child_right"  v-if="liveDetail != 1">
                <div
                  :class=" false ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'"
                  v-if="true"
                >
                  <img
                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/check.png"
                    alt="check"
                    v-show="false"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- 栏目列表 -->
          <div class="channel_list" :class="{channel_list_check : channelStatus}">
            <div class="channel_list_child">
              <div
                :class=" false ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'"
                v-if="true"
              >
                <img
                  src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/check.png"
                  alt="check"
                  v-show="false"
                />
              </div>
              <span>栏目名栏目名栏目名栏目</span>
            </div>
            <div class="channel_list_child">
              <div
                :class=" false ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'"
                v-if="true"
              >
                <img
                  src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/check.png"
                  alt="check"
                  v-show="false"
                />
              </div>
              <span>栏目名栏目名栏目名</span>
            </div>
          </div>
        </div>

        <div class="classification_btn" v-if="liveDetail != 1">
          <span>添加</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cationType: {
      type: Number
    },
    shopStatus:{
      type:Number
    },
    liveDetail:{//在直播详情弹出
      type:Number
    }
  },
  data() {
    return {
      channelStatus: false
    };
  },
  computed: {},
  created() {},
  methods: {
    mengbanClick() {
      this.$emit("cationTypeFun", 0);
    },
    // 选择栏目
    channelClick() {
      this.channelStatus = !this.channelStatus;
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
// 单选框,公用
.shoppingContent_radio {
  margin-right: 0.23rem;
  flex: none;
  width: 0.38rem;
  height: 0.38rem;
  background: #ecf0f4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
//   单选按钮被选中样式,公用
.shoppingContent_checkRadio {
  background-color: #007aff;
  border: 2px solid #007aff !important;

  img {
    width: 0.2rem;
    height: 0.14rem;
  }
}
.classification_box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 7.09rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.26 0.26 0px 0px;
  transform: translateY(100%);
  transition: all 0.3s ease-in-out 0s;
  z-index: 350;
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
      .classification_shopTopLeft{
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
    .classification_shop_content_box{
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
              span{
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
}
.transformCation {
  transform: translateY(0) !important;
  transition: all 0.3s ease-in-out 0s;
}
.classification_btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.88rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #007aff;
  font-size: 0.28rem;
  color: #fff;
  z-index: 130;
}
.classification_noData {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  img {
    width: 2.11rem;
    height: 1.69rem;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 0.24rem;
    color: #999999;
  }
}

.status_thrid {
  position: absolute;
  // width: 0.88rem;
  height: 0.33rem;
  left: 123%;
  top: 0;

  .status_thrid_box {
    background: linear-gradient(45deg, #3c3a38, #6a6564);
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    // border-radius: 2px;
    padding: 0 0.03rem;
    height: 0.27rem;
    line-height: 0.27rem;

    span {
      color: #f1e9c7;
      font-size: 0.2rem;
      white-space: nowrap;
      display: inline-block;
      line-height: 1;
      margin-top: 0.03rem;
    }

    &:before {
      content: "";
      width: 0;
      height: 0;
      border-top: 0.1rem solid transparent;
      border-bottom: 0.1rem solid transparent;
      border-right: 0.1rem solid #3c3a38;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -3px;
      z-index: 2;
    }
  }
}
.scaleChannel {
  transform: rotate(0);
  transition: all 0.4s ease-in-out 0s;
}
.checkChannel {
  transform: rotate(90deg);
}
.channel_list_check {
  z-index: 200 !important;
  opacity: 1 !important;
}
.tag_text{
  padding: 0 0.08rem;
  border-radius: 0.03rem;
  background: #f00;
  display: inline !important;
  color: #fff;
}
.detailLive{
  height: 7.09rem !important;
  box-sizing: border-box;
  padding: 0.25rem 0 0 0.32rem !important;
  .newLive_hostShop_child{
    .newLive_hostShop_child_left{
    border-bottom: #fff !important;
      width: 1.8rem !important;
      height: 1.8rem !important;
    }
    .newLive_hostShop_child_center_title{
      padding-right: 0.2rem;
      font-size: 0.26rem !important;
    }
    .tag_text{
      font-size: 0.22rem !important;
    }
  }
  .newLive_hostShop_child_label{
    // margin-bottom: 0.3rem !important;
  }
  .newLive_hostShop_child_center{
    height: 1.8rem !important;
  }
}
.liveDetailFont{
  font-size: 0.32rem;
  color: #FF3535;
  font-weight: bold;
}
</style>

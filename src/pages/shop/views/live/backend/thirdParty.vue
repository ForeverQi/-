<template>
  <div class="thirdParty_box" v-wechat-title="$route.meta.title= '使用第三方软件进行推流直播'">
    <div class="thirdParty">
      <!-- 顶部标题 -->
      <!-- <div class="searchNoteTop">
        <div class="searchNoteTop_left">
          <div class="voerTop_menuLeft">
            <span></span>
          </div>
        </div>
        <div class="searchNoteTop_right">
          <span>使用第三方软件进行推流直播</span>
        </div>
      </div> -->
      <!-- 内容 -->
      <div class="thirdParty_content_box">
        <div class="thirdParty_content" style="margin-bottom:0.6rem;">
          <!-- 第一步 -->
          <div class="thirdParty_content_first">
            <div class="thirdParty_party">
              <div class="thirdParty_party_text">第一步</div>
              <span>复制推流地址和直播码</span>
            </div>
            <div class="thirdParty_first_data">
              <div class="thirdParty_first_data_child">
                <div class="thirdParty_first_data_childTop">
                  <p>推流地址</p>
                  <span>复制</span>
                </div>
                <div class="thirdParty_first_data_childBottom">
                  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit</span>
                </div>
              </div>
              <div class="thirdParty_first_data_child">
                <div class="thirdParty_first_data_childTop">
                  <p>推流地址</p>
                  <span>复制</span>
                </div>
                <div class="thirdParty_first_data_childBottom">
                  <span style="font-size:0.46rem;font-weight:bold;line-height:1;">23123123</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 第二步 -->
          <div class="thirdParty_content_first">
            <div class="thirdParty_party">
              <div class="thirdParty_party_text">第二步</div>
              <span>将复制内容填入第三方软件</span>
            </div>
            <div class="thirdParty_second_data">
              <div class="thirdParty_second_dataBox">
                <div class="thirdParty_second_child">
                  <span>FMS URL</span>
                  <input type="text" />
                </div>
                <div class="thirdParty_second_child">
                  <span>播放路径/串流码</span>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>
          <!-- 第三步 -->
          <div class="thirdParty_content_first" >
            <div class="thirdParty_party">
              <div class="thirdParty_party_text">第三步</div>
              <span>开启第三方软件推流</span>
            </div>
            <div class="thirdParty_three_data">
              <div class="thirdParty_three_dataBox">
                <span>开始串流</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 开播按钮 -->
        <div class="kaibo">
            <span>我已配置完成  立即开播</span>
        </div>
        <!-- 开播按钮 -->
        <div class="kaibo kaibo_over" @click="endFun">
            <span>结束下播</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hint from '@/plugins/hint'
export default {
  data() {
    return {};
  },

  computed: {},

  created() {},

  methods: {
      endFun(){
          Hint.Confirm({
            title: '',
            message: '您有正在进行中的直播,请继续直播或结束该直播',
            confirmButtonText:"结束下播",
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
  .thirdParty_box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(0deg, rgba(52, 65, 90, 1), rgba(38, 49, 71, 1));
    overflow-y: scroll;
    padding-bottom: 0.46rem;
    .thirdParty {
      .thirdParty_content_box {
        padding-top: 0.4rem;
        .thirdParty_content {
          .thirdParty_content_first {
            margin-bottom: 0.41rem;
            .thirdParty_party {
              font-size: 0.28rem;
              color: #ffffff;
              display: flex;
              align-items: center;
              margin-bottom: 0.3rem;
              .thirdParty_party_text {
                width: 1.55rem;
                height: 0.59rem;
                background: #fff;
                border-top-right-radius: 0.3rem;
                border-bottom-right-radius: 0.3rem;
                margin-right: 0.4rem;
                color: #2a364e;
                line-height: 0.65rem;
                text-align: center;
              }
              span{
                margin-top: 0.01rem;
              }
            }
            .thirdParty_first_data {
              width: 94%;
              border-right: 0.28rem;
              overflow: hidden;
              background: rgba(0, 0, 0, 0.1);
              padding: 0rem 0.29rem 0.38rem 0;
              margin-left: 0.3rem;
              border-radius: 0.28rem;
              .thirdParty_first_data_child {
                padding-bottom: 0.37rem;
                border-bottom: 1px solid #34415a;
                padding-top: 0.32rem;
                &:last-child {
                  padding-bottom: 0rem;
                  border-bottom: 0;
                }
                .thirdParty_first_data_childTop {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  font-size: 0.28rem;
                  color: #ffffff;
                  margin-bottom: 0.2rem;
                  p {
                    margin-left: 0.55rem;
                    position: relative;
                    &::before {
                      content: "";
                      display: inline-block;
                      position: absolute;
                      left: -0.2rem;
                      top: 48%;
                      transform: translateY(-50%);
                      background: #007aff;
                      border-radius: 0.03rem;
                      width: 0.05rem;
                      height: 0.24rem;
                    }
                  }
                  span {
                    height: 0.54rem;
                    line-height: 0.57rem;
                    padding: 0rem 0.32rem;
                    background: #007aff;
                    border-radius: 0.37rem;
                  }
                }
                .thirdParty_first_data_childBottom {
                  font-size: 0.24rem;
                  color: #9ca5b6;
                  padding-left: 0.34rem;
                }
              }
            }
  
            .thirdParty_second_data {
              .thirdParty_second_dataBox {
                width: 4.96rem;
                height: 1.94rem;
                border: 3px dashed rgba(74, 86, 110, 1);
                border-radius: 0.25rem;
                margin: 0 auto;
                padding: 0.19rem 0.5rem 0.24rem 0.31rem;
                box-sizing: border-box;
                .thirdParty_second_child {
                  display: flex;
                  align-items: center;
                  margin-bottom: 0.15rem;
                  span {
                    width: 2.2rem;
                    font-size: 0.24rem;
                    color: #6f7d98;
                    text-align: right;
                    margin-right: 0.3rem;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    word-break: break-all;
                  }
                  input {
                    width: 2.2rem;
                    height: 0.64rem;
                    background: #2a364e;
                    border-radius: 0.1rem;
                    overflow: hidden;
                    outline: none;
                    border: 0;
                    padding: 0 0.2rem;
                    font-size: #9ca5b6;
                  }
                }
              }
            }
  
            .thirdParty_three_data {
              .thirdParty_three_dataBox {
                width: 1.82rem;
                height: 1.82rem;
                border-radius: 50%;
                overflow: hidden;
                border: 3px dashed #4a566e;
                margin: 0 auto;
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                  font-size: 0.24rem;
                  color: #6f7d98;
                  height: 0.8rem;
                  width: 100%;
                  line-height: 0.8rem;
                  text-align: center;
                  background: #2A364E;
                }
              }
            }
          }
        }
        .kaibo{
            width: 6.91rem;
            height: 0.9rem;
            background: #007AFF;
            line-height: 0.9rem;
            text-align: center;
            border-radius:0.45rem;
            font-size: 0.28rem;
            color: #FFFFFF;
            margin: 0 auto;
        }
        .kaibo_over{
            background: #FF3D3D;
        }
      }
    }
  }
</style>

<style lang="scss">
.confirmBox{
    font-size: 0.28rem;
    color: #222222;
    font-weight: bold;
    .van-dialog__message{
      padding:0.95rem !important;
      line-height: 0.45rem;
    }
}
</style>
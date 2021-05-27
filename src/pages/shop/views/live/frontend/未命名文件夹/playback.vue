<template>
  <div class="playback_content">
    <video
      :webkit-playsinline="true"
      :playsinline="true"
      id="videoId"
      class="video_box"
      muted
      x5-video-player-type="h5-page"
      x5-video-player-fullscreen="true"
      preload="auto"
      autoplay
      src="http://genwoxue.evyun.cn/cec262163cb743a78df7cef90dc1e62b/ef8e626023ec455fa5fe098840037c39-2eb109fac6d260978e4587bc821a377e-ld.mp4"
      :playOrPause="playOrPause"
    >
    </video>
    <!-- 顶部 -->
    <div class="content_top">
        <div class="content_top_left">
            <div class="content_left">
                <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_VFrontend/live_noData.png" alt=""/>
            </div>
            <div class="content_center">
                <span>猫耳朵黄猫耳</span>
            </div>
            <div class="content_right">
                <img src="@/pages/shop/views/live/frontend/images/playback_add.png" alt=""/>
                <span>关注</span>
            </div>
        </div>
        <div class="content_top_right">
            <img src="@/pages/shop/views/live/frontend/images/livedetail_close.png" alt=""/>
        </div>
    </div>
    <!-- 实时消息 -->
    <div class="content_bottom">
        <div class="message_info_box">
            <!-- 底部新消息按钮 -->
            <div class="downInfo">
                <span>底部有新消息</span>
                <img src="@/pages/shop/views/live/frontend/images/live_newMes.png" alt=""/>
            </div>
            <div class="message_info">
                <div class="message_info_child_box">
                    <div class="message_info_child">
                        <span style="color:#FFD488;">蕾哈娜：</span>
                        <span>我将给他一个他无个他无个他无</span>
                    </div>
                </div>
                <div class="message_info_child_box">
                    <div class="message_info_child">
                        <span style="color:#FFD488;">蕾哈娜：</span>
                        <span>fd</span>
                    </div>
                </div>
                <div class="message_info_child_box">
                    <div class="message_info_child">
                        <span style="color:#FFD488;">蕾哈娜：</span>
                        <span>fd</span>
                    </div>
                </div>
                <div class="message_info_child_box">
                    <div class="message_info_child">
                        <span style="color:#FFD488;">蕾哈娜：</span>
                        <span>fd</span>
                    </div>
                </div>
                <div class="message_info_child_box">
                    <div class="message_info_child">
                        <span style="color:#FFD488;">蕾哈娜：</span>
                        <span>fd</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="content_bottom_send">
            <div class="send_left" @click="cationTypeFun">
                <div class="shopInfo">
                  <img src="@/pages/shop/views/live/frontend/images/live_shopIcon.png" alt="">
                  <div class="shopInfo_num">99</div>
              </div>
            </div>
            <div class="send_center">
                <input type="text" placeholder="发弹幕和主播互动...">
            </div>
            <div class="send_right">
                <div class="send_right_child1" @click="introduceFun">
                    <img src="@/pages/shop/views/live/frontend/images/back_borderRadius.png" alt=""/>
                </div>
                <div class="send_right_child2" @click="shareFun">
                    <img src="@/pages/shop/views/live/frontend/images/back_share.png" alt=""/>
                </div>
            </div>
        </div>
        <!-- 进度条 -->
        <Progress @playStatus="progressFun" :gressType="1" :duration="duration" :currentTime="currentTime" :videoProcess="videoProcess" :videoProcessEnd="videoProcessEnd"  :allDuration="allDuration" @proClick="proClickFun"></Progress>
    </div>
    <!-- 介绍弹窗 -->
    <CustomPopup ref="CustomBakRef" @backFun="closeBackInfo">
        <div slot="PoperContent" class="PoperContentView_box">
            <div>介绍</div>
            <div class="back_data"></div>
        </div>
    </CustomPopup>
    <!-- 商品弹窗 -->
    <CustomPopup ref="CustomBakRef" @backFun="closeBackInfo">
        <div slot="PoperContent" class="PoperContentView_box">
            <div>介绍</div>
            <div class="back_data"></div>
        </div>
    </CustomPopup>
    <Cation :cationType="cationType" :shopStatus="shopStatus" :liveDetail="liveDetail" @cationTypeFun="udateCation"/>
    <Share :shareType="shareType" @ShareTypeFun="udateShare"></Share>
  </div>
</template>

<script>
import CustomPopup from "@/components/CustomPopup/custompopup.vue"
import Share from "@/components/Share/share.vue"
import Cation from "@/pages/shop/views/live/backend/components/classification"
import Progress from "@/pages/shop/views/live/frontend/components/progress"
let videoProcessInterval;
export default {
  name: "",
  components:{
    CustomPopup,
    Cation,
    Share,
    Progress
  },
  data() {
    return {
        playOrPause: false,
        cationType:0,//商品弹窗
        shopStatus:1,
        liveDetail:1,
        shareType:0,//分享弹窗
        duration:'00:00',//视频总时长
        currentTime:'00:00',//视频播放进度
        videoProcess:0,
        videoProcessEnd:0,
        allDuration:0
    };
  },
  mounted(){
      let that = this;
          let video = document.querySelectorAll('video')[0];
          video.play()
          
         
        let autoPlay = function(){
            if(video.currentTime!=0 && video.currentTime!=0.001){
                video.removeEventListener("timeupdate",autoPlay)
            }
             // 播放进度条
            videoProcessInterval = setInterval(() => {
                that.changeProcess(video)
            }, 100)
        }
        // 实时监听video播放状态会记录之前的index
        video.addEventListener("timeupdate",autoPlay)
  },
  methods:{
    //   介绍
    introduceFun(){
        this.$refs.CustomBakRef.showCustom();
    },
    closeBackInfo(){
        this.$refs.CustomBakRef.maskClickHidden()
    },
     // 子传父的值
    udateCation(type){
        this.cationType = type
    },
    cationTypeFun(){
        this.cationType = 1//1:商品，2：主播
    },
    // 分享
    shareFun(){
        this.shareType = 1
    },
    udateShare(type){
        this.shareType = type
    },
     //记录播放进度
    changeProcess() {
        let video = document.querySelectorAll('video')[0];
        let currentTime = video.currentTime.toFixed(0);
        let duration = video.duration.toFixed(0);
        this.allDuration = Number(video.duration)
        let durationLeft= Number(duration/60) < 10 ? '0'+ Math.floor(duration/60): Math.floor(duration/60);
        let durationRight= Number(duration)%60;
        this.duration = durationLeft +':'+ durationRight;
        
        let currentTimeLeft = Number(currentTime/60) < 10 ? '0'+ Math.floor(currentTime/60): Math.floor(currentTime/60);
        let currentTimeRight = Number(currentTime) < 10 ? '0'+currentTime : currentTime;
        this.currentTime = currentTimeLeft +':'+ currentTimeRight
        this.videoProcess = Number((video.currentTime / video.duration)* 100);
        if(this.videoProcess == 100){
            this.videoProcessEnd = 1;
            clearInterval(videoProcessInterval);
        }
    },
    progressFun(type){
        let video = document.querySelectorAll('video')[0],that=this;
        that.videoProcessEnd = type
        if(type == 1){
            clearInterval(videoProcessInterval);
            video.pause()
        }else if(type == 0){
            video.play();
            let autoPlay = function(){
            if(video.currentTime!=0 && video.currentTime!=0.001){
                video.removeEventListener("timeupdate",autoPlay)
            }
             // 播放进度条
            videoProcessInterval = setInterval(() => {
                that.changeProcess(video)
            }, 100)
        }
            // 实时监听video播放状态会记录之前的index
            video.addEventListener("timeupdate",autoPlay)
        }
    },
    // 子组件点击之后改变进度条的长度
    proClickFun(number){
      this.videoProcess = number
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/pages/shop/views/live/frontend/css/playback.scss";
</style>

<template>
  <div class="paid-container">
    <div class="cover">
      <img
        class="icon-back"
        src="@/pages/shop/views/live/frontend/images/icon-back2.png"
        alt=""
      />
      <!-- <img
        class="cover-img"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580754562447&di=d7787f1dd33dd42943d512ab3300451a&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120302%2F6445-1203021G20399.jpg"
        alt=""
      /> -->
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
      <!-- 主播已结束直播 -->
      <div class="endLive" v-if="false">
        <div class="endLive_title">
          <img src="@/pages/shop/views/live/frontend/images/liveDetail_camera.png" alt="">
          <span>主播已结束直播</span>
        </div>
        <div class="refresh_live">
          <img src="@/pages/shop/views/live/frontend/images/liveDetail_again.png" alt="">
        </div>
      </div>
       <!-- 主播已关闭摄像头-->
      <div class="endLive endLive2" v-if="false">
        <div class="endLive_title">
          <img style="width:0.48rem;height:0.53rem;" src="@/pages/shop/views/live/frontend/images/liveDetail_camera2.png" alt="">
          <span>主播已结束直播</span>
        </div>
      </div>
      <!-- 进度条 -->
      <div class="progressDiv" v-show="ifShowPro">
        <!-- 进度条 -->
        <Progress ref="CustomPlayRef" @playStatus="progressFun" :gressType="1" :duration="duration" :currentTime="currentTime" :videoProcess="videoProcess" :videoProcessEnd="videoProcessEnd" :allDuration="allDuration" @proClick="proClickFun"></Progress>
      </div>
      <!-- 播放按钮 -->
      <div class="playerBtn" @click.stop="playBigFun" v-show="ifShowPro">
        <img v-show="videoProcessEnd == 1 || videoProcessEnd == 1" src="@/pages/shop/views/live/frontend/images/video_play.png" alt=""/>
        <img v-show="videoProcessEnd == 0 && videoProcessEnd == 0" src="@/pages/shop/views/live/frontend/images/video_pause.png" alt=""/>
      </div>
      <!-- 点击区域 -->
      <div class="clickArea" @click="ifShowProFun"></div>
    </div>
    <div class="live_title">
        <div :class="titleStatus == 0 ? 'live_title_child activeTitle' : 'live_title_child'" @click="changeLiveTit(0)">聊天
            <div :class="titleStatus == 0 ? 'live_child_active' : ''"></div>
        </div>
        <div :class="titleStatus == 1 ? 'live_title_child activeTitle' : 'live_title_child'" @click="changeLiveTit(1)">介绍
            <div :class="titleStatus == 1 ? 'live_child_active' : ''"></div>
        </div>
    </div>
    <div class="info wrap" v-show="titleStatus == 0" style="background: #F2F1F6;">
      <div class="wrap_chat">
          <div><span style="font-size:0.24rem;color:#84B6EA;">迈克：</span>时间不多了！时间不多了！时间不多了！时间不多了！时间不多了！时间不多了！时间不多了！</div>
          <div><span style="font-size:0.24rem;color:#84B6EA;">迈克：</span>时间不多了！</div>
      </div>
        <!-- 发送消息 -->
      <div class="sendMessage">
          <div class="sendMessage_left" >
              <div class="shopInfo">
                  <img src="@/pages/shop/views/live/frontend/images/live_shopIcon.png" alt="">
                  <div class="shopInfo_num">99</div>
              </div>
          </div>
          <div class="sendMessage_center">
              <input type="text" placeholder="发消息和主播互动">
              <div style="position: relative;"><img v-if="false" src="@/pages/shop/views/live/frontend/images/live_plane.png" alt="">
              <img style="width:0.54rem;height:0.51rem;transform: translateY(0.1rem);" src="@/pages/shop/views/live/frontend/images/live_plane2.png" alt="">
              </div>
          </div>

          <div class="prohibitSpeak" v-if="false">您已被禁止发言</div>
          <div class="sendMessage_right">
              <div class="shopInfo">
                  <img style="transform: translate(0.02rem,0.05rem);" src="@/pages/shop/views/live/frontend/images/live_share.png" alt="">
              </div>
          </div>
      </div>
      <!-- 底部有新消息 -->
      <div class="bottonMes">
          <span>底部有新消息</span>
          <img src="@/pages/shop/views/live/frontend/images/live_newMes.png" alt=""/>
      </div>
    </div>
    <!-- 介绍 -->
    <div class="info wrap" v-show="titleStatus == 1">
      <div class="wrap_title">介绍</div>
      <div class="wrap_content">

      </div>
      <!-- 商品 -->
      <div class="shopInfo_box" @click="cationTypeFun">
          <div class="shopInfo">
            <img src="@/pages/shop/views/live/frontend/images/live_shopIcon.png" alt="">
            <div class="shopInfo_num">99</div>
          </div>
      </div>
    </div>
    <Cation :cationType="cationType" :shopStatus="shopStatus" :liveDetail="liveDetail" @cationTypeFun="udateCation"/>
  </div>
</template>

<script>
import Cation from "@/pages/shop/views/live/backend/components/classification"
import Progress from "@/pages/shop/views/live/frontend/components/progress"
let videoProcessInterval,ifShowProTime;


export default {
  name: "liveDetail",
  components:{
      Cation,
      Progress
  },
  data() {
    return {
        titleStatus:0,
        cationType:0,
        shopStatus:1,
        liveDetail:1,
        playOrPause:false,
        duration:'00:00',//视频总时长(处理后)
        currentTime:'00:00',//视频播放进度
        videoProcess:0,
        videoProcessEnd:0,
        allDuration:0, //总时长(未处理)
        ifShowPro:true,//是否显示播放进度条
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
            if(that.ifShowPro == true){
              setTimeout(()=>{
                that.ifShowPro = false
              },3000)
            }
        }
        // 实时监听video播放状态会记录之前的index
        video.addEventListener("timeupdate",autoPlay)
  },
  methods:{
      changeLiveTit(index){
          this.titleStatus = index
      },
       // 子传父的值
        udateCation(type){
          this.cationType = type
        },
        cationTypeFun(){
          this.cationType = 1//1:商品，2：主播
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
       //记录播放进度
    changeProcess() {
        let video = document.querySelectorAll('video')[0];
        let currentTime = video.currentTime.toFixed(0);
        let duration = video.duration.toFixed(0);
        this.allDuration = video.duration;
        
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
            this.ifShowPro = true;
        }
    },
    proClickFun(number){
      this.videoProcess = number;
    },
    // 点击中间播放按钮
    playBigFun(){
      let that = this;
      that.$refs.CustomPlayRef.playStatus();
      clearTimeout(ifShowProTime);
      if(that.ifShowPro == true){
        ifShowProTime = setTimeout(()=>{
          that.ifShowPro = false
        },3000);
      }
    },
    ifShowProFun(){
      let that = this;
      that.ifShowPro = !that.ifShowPro;
      clearTimeout(ifShowProTime);
      if(that.ifShowPro == true){
       ifShowProTime = setTimeout(()=>{
          that.ifShowPro = false
        },3000);
      }
    }
    
  },
};
</script>

<style scoped lang="scss">
@import '@/pages/shop/views/live/frontend/css/liveDetail.scss'
</style>

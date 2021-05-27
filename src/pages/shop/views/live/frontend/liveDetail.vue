<template>
  <div class="paid-container">
    <div class="cover">
        <van-loading v-if="showLoading" size="50px" color="#1989fa"/>
       <!-- 封面图 -->
        <img class="posterImgStyle" v-if="poseterStatus" src="https://m.360buyimg.com/livecms/jfs/t1/127623/30/8964/302877/5f2d1403E834aee7e/5b41cbeadad4aec4.jpg!q70.dpg" alt=""/>
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
        <!-- <video
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
      <source data-v-16fc8678="" type="application/x-mpegURL" src="https://jdpull.jd.com/live/1827385.m3u8">
      </video> -->

     <video id="roomVideo" class="video_box video-js vjs-default-skin vjs-big-play-centered" x-webkit-airplay="allow" poster="" webkit-playsinline playsinline x5-video-player-type="h5" x5-video-player-fullscreen="true" preload="auto">
	    <source src="https://jdpull.jd.com/live/1908560.m3u8"  type="application/x-mpegURL">
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
      <div class="playerBtn" @click.stop="playBigFun" v-show="ifShowPlayBtn">
        <img v-show="videoProcessEnd == 1" src="@/pages/shop/views/live/frontend/images/video_play.png" alt=""/>
        <img style="margin-left:0;" v-show="videoProcessEnd == 0" src="@/pages/shop/views/live/frontend/images/video_pause.png" alt=""/>
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
    <div class="wrap" v-show="titleStatus == 0" style="background: #F2F1F6;">
      <div class="wrap_chat_meng" v-if="mengbanStatus"></div>
      <div class="wrap_chat">
        <div class="wrap_chat_box">
          <div v-for="(item,index) in  msgList" class="wrap_chat_box_child" :key="index"><span style="font-size:0.24rem;color:#84B6EA;">{{item.name}}：</span>{{item.text}}</div>
        </div>
      </div>
      
      <!-- 发送消息 -->
      <div class="sendMessage">
          <div class="sendMessage_left" >
              <div class="shopInfo" @click="cationTypeFun">
                  <img src="@/pages/shop/views/live/frontend/images/live_shopIcon.png" alt="">
                  <div class="shopInfo_num">99</div>
              </div>
          </div>
          <div class="sendMessage_center">
              <input type="text" id="msgId" v-model="sendMsg" @focus="mengbanStatus = true" @blur="mengbanStatus = true" placeholder="发消息和主播互动">
              <div style="position: relative;" @click.stop="sendMessage"><img v-if="false" src="@/pages/shop/views/live/frontend/images/live_plane.png" alt="">
              <img style="width:0.54rem;height:0.51rem;transform: translateY(0.1rem);" src="@/pages/shop/views/live/frontend/images/live_plane2.png" alt="">
              </div>
          </div>

          <div class="prohibitSpeak" v-if="false">您已被禁止发言</div>
          <div class="sendMessage_right" @click="shareFun">
              <div class="shopInfo">
                  <img style="transform: translate(0.02rem,0.05rem);" src="@/pages/shop/views/live/frontend/images/live_share.png" alt="">
              </div>
          </div>
      </div>
      <!-- 底部有新消息 -->
      <div class="bottonMes" @click.stop="scrollStatus = true">
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
    <Share :shareType="shareType" @ShareTypeFun="udateShare"></Share>
  </div>
</template>

<script>
import { Toast } from 'vant';
import Share from "@/components/Share/share.vue"
import Cation from "@/pages/shop/views/live/backend/components/classification"
import Progress from "@/pages/shop/views/live/frontend/components/progress"
let videoProcessInterval,ifShowProTime,listTime;

export default {
  name: "liveDetail",
  components:{
      Cation,
      Progress,
      Share
  },
  data() {
    return {
      mengbanStatus:false,//防止弹起键盘是向上滚动
        sendMsg:'',//发送聊天信息
        titleStatus:0,
        cationType:0,
        shopStatus:1,
        liveDetail:1,
        playOrPause:false,
        duration:'00:00',//视频总时长(处理后)
        currentTime:'00:00',//视频播放进度
        videoProcess:0,
        videoProcessEnd:1,
        allDuration:0, //总时长(未处理)
        ifShowPro:false,//是否显示播放进度条
        ifShowPlayBtn:true,
        poseterStatus:true,//高斯模糊是否显示
        showLoading:false,
        scrollStatus:true,//判断评论列表是否继续监听滚动
        msgList:[
            {
                id:0,
                name:'我是名字',
                text:'哈哈哈0'
            },
            {
                id:1,
                name:'我是名字',
                text:'哈哈哈1'
            },
            {
                id:2,
                name:'我是名字',
                text:'哈哈哈2'
            },
            {
                id:3,
                name:'我是名字',
                text:'哈哈哈3'
            },
            {
                id:4,
                name:'我是名字',
                text:'哈哈哈4'
            },
            {
                id:5,
                name:'我是名字',
                text:'哈哈哈5'
            },
            {
                id:6,
                name:'我是名字',
                text:'哈哈哈6'
            }
        ],
        p:0,
        t:0,
        aaa:false,
        shareType:0,//分享弹窗
    };
  },
  mounted(){
    let that = this;
    // 自带键盘点击发送事件
    $("#msgId").on('keypress',function(e) {
        var keycode = e.keyCode;
        if(keycode=='13') {
            // e.preventDefault();  
            //请求搜索接口 
            that.sendMessage()
        }
  });
    //   评论列表
      that.mseListFun();
      //   判断讨论区是向上滚动还是向下滚动
      that.scrollPan();
      this.myPlayer = videojs('roomVideo',{
            bigPlayButton : false,
            textTrackDisplay : false,
            posterImage: true,
            errorDisplay : false,
            controlBar : false
        },function(){
            // this.on('loadedmetadata',function(){
            //     //加载到元数据后开始播放视频
            //     that.startVideo();
            // })

            this.on('ended',function(){
            console.log('ended')
            })
            // 点击按钮播放
            this.on('firstplay',function(){
              that.ifShowPlayBtn = false;
            })
            this.on('loadstart',function(){
            //开始加载
            console.log('loadstart')
            // that.showLoading = false
            })
            this.on('loadeddata',function(){
            console.log('loadeddata')
            })
            this.on('seeking',function(){
            //正在去拿视频流的路上
            console.log('seeking')
            })
            this.on('seeked',function(){
            //已经拿到视频流,可以播放
            console.log('seeked')
            })
            this.on('waiting',function(){
                console.log('waiting')
            })
            this.on('pause',function(){
                console.log('pause')
            })
            this.on('play',function(){
                console.log('play')
            })

        });
        // let that = this;
        // let video = document.querySelectorAll('video')[0];
        // video.play()
         
        // let autoPlay = function(){
        //     if(video.currentTime!=0 && video.currentTime!=0.001){
        //         video.removeEventListener("timeupdate",autoPlay)
        //     }
        //      // 播放进度条
        //     videoProcessInterval = setInterval(() => {
        //         that.changeProcess(video)
        //     }, 100)
        //     if(that.ifShowPro == true){
        //       setTimeout(()=>{
        //         that.ifShowPro = false
        //       },3000)
        //     }
        // }
        // // 实时监听video播放状态会记录之前的index
        // video.addEventListener("timeupdate",autoPlay)
  },
  methods:{
      changeLiveTit(index){
          this.titleStatus = index
      },
       // 子传父的值
        udateCation(type){
          this.cationType = type;
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
                  video.removeEventListener("timeupdate",autoPlay);
              }
              // 播放进度条
              videoProcessInterval = setInterval(() => {
                  that.changeProcess(video);
              }, 100)
              
          }
              // 实时监听video播放状态会记录之前的index
              video.addEventListener("timeupdate",autoPlay);
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
      //直播
      if(true){
          that.showLoading = true;
          that.myPlayer.play();
          that.startVideo();
        return false;
      }else{//回放
        that.$refs.CustomPlayRef.playStatus();
        clearTimeout(ifShowProTime);
        if(that.ifShowPro == true){
          ifShowProTime = setTimeout(()=>{
            that.ifShowPro = false
            that.ifShowPlayBtn = false
          },3000);
        }
      }

    },
    ifShowProFun(){
      let that = this;
      that.ifShowPro = !that.ifShowPro;
      that.ifShowPlayBtn = !that.ifShowPlayBtn
      clearTimeout(ifShowProTime);
      if(that.ifShowPro == true){
       ifShowProTime = setTimeout(()=>{
          that.ifShowPro = false
          that.ifShowPlayBtn = false
        },3000);
      }
    },
    // 播放直播
    startVideo(type) {
            let that = this,video = document.querySelectorAll('video')[0];
            that.myPlayer.play();
	        //判断开始播放视频，移除高斯模糊等待层
	        var isVideoPlaying = setInterval(function(){
	            // var currentTime = that.myPlayer.currentTime();
	            if(that.myPlayer.currentTime() > (that.$util.functions.appSource() == 'ios' ? 10 : 0)){
                  that.poseterStatus = false;
                  that.showLoading = false;
                  clearInterval(isVideoPlaying);
	            }
	        },1)

	        //判断视频是否卡住，卡主3s重新load视频
	        var lastTime = -1,tryTimes = 0;
	        
	        clearInterval(that.isVideoBreak);
	        that.isVideoBreak = setInterval(function(){
	            var currentTime = that.myPlayer.currentTime();
	            if(currentTime == lastTime){
	            	//此时视频已卡主3s
	            	//设置当前播放时间为超时时间，此时videojs会在play()后把currentTime设置为0
	                that.myPlayer.currentTime(currentTime+10000);
	                that.myPlayer.play();

	                //尝试5次播放后，如仍未播放成功提示刷新
	                if(++tryTimes > 5){
                      Toast({message: "您的网速有点慢，刷新下试试"});
	                    tryTimes = 0;
	                }
	            }else{
	                lastTime = currentTime;
	                tryTimes = 0;
	            }
	        },3000);
        },
    // 评论列表
    mseListFun(msg){
        let data = {},that=this;
          for(let i in that.msgList){
              if(i == that.msgList.length-1){
                if(that.$util.functions.ifHaveFun(msg)){
                   data = {
                      id:i+1,
                      name:'第'+(Number(i)+1)+'个',
                      text: msg
                  }
                  that.sendMsg = ''
                }else{
                  data = {
                      id:i+1,
                      name:'第'+(Number(i)+1)+'个',
                      text:i+1
                  }
                }
          }
        }
        that.msgList.push(data);
        listTime=setTimeout(()=>{
            that.mseListFun();
        },100000);
    },
    // 判断是向上滚动还是向下滚动
    scrollPan(){
      let that = this;
        $('.wrap_chat').scroll(function(){
          that.p=$(this).scrollTop();
            if(that.t<that.p){
                //下滚
            }else{
                //上滚
                that.scrollStatus = false;
            }
            setTimeout(function(){ that.t = that.p ; },0);
          })
    },
    // 发送信息
    sendMessage(){
      if(this.$util.functions.ifHaveFun(this.sendMsg)){
        clearTimeout(listTime);
        this.mseListFun(this.sendMsg);
        this.mengbanStatus = false;
      }
    },
     // 分享
    shareFun(){
        this.shareType = 1;
    },
    udateShare(type){
        this.shareType = type;
    },
  },
   watch:{
        msgList: {
            handler(val, oldVal) {
                if (val != "[]" && this.scrollStatus) {
                let self = this;
                // 页面数据发生变化之后，加载滚动函数
                setTimeout(function() {
                    var h = $(".wrap_chat_box").innerHeight();
                        $(".wrap_chat").scrollTop(h);
                });
                }
            },
            deep: true
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/pages/shop/views/live/frontend/css/liveDetail.scss'
</style>

<template>
  <div class="playback_content">
      <van-loading v-if="showLoading" size="50px" color="#1989fa"/>
      <!-- 直播封面图 -->
    <img v-if="poseterStatus" class="posterImgStyle" src="https://m.360buyimg.com/livecms/jfs/t1/111821/29/14710/308083/5f326b73E5c92a322/14b19ff0850f7f1d.jpg" alt=""/>
    <!-- 回放封面图 -->
    <div class="fenmian_cover" v-if="ifPause">
        <img class="fenmian_cover" src="http://genwoxue.evyun.cn/95cfc324ac464be89356a56303801797/snapshots/d04adc85383a4b5f9867171e776b4f53-00002.jpg?x-oss-process=image/resize,fim_lfit,h_667,w_375,limit_0" alt=""/>
    </div>
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
      :playOrPause="playOrPause"
    >
    <source src="http://sp.sydlmbc.com/sv/3fd50768-16e63be82a9/3fd50768-16e63be82a9.mp4" >
    </video>
    <video v-if="false" id="roomVideo" class="video_box video-js vjs-default-skin vjs-big-play-centered" x-webkit-airplay="allow" poster="" webkit-playsinline playsinline x5-video-player-type="h5" x5-video-player-fullscreen="true" preload="auto">
	    <source src="https://jdpull.jd.com/live/1908560.m3u8"  type="application/x-mpegURL">
	  </video>
      <!-- 播放按钮 -->
    <div class="playerBtn" @click.stop="playBigFun" v-show="ifShowPlayBtn || backStatus">
        <img v-show="videoProcessEnd == 1" src="@/pages/shop/views/live/frontend/images/video_play.png" alt=""/>
        <img style="margin-left:0;" v-show="videoProcessEnd == 0" src="@/pages/shop/views/live/frontend/images/video_pause.png" alt=""/>
    </div>
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
            <div class="downInfo" @click.stop="scrollStatus = true">
                <span>底部有新消息</span>
                <img src="@/pages/shop/views/live/frontend/images/live_newMes.png" alt=""/>
            </div>
            <div class="message_info">
                <div class="message_info_child_box">
                    <div v-for="(item,index) in msgList" :key="index">
                            <div class="message_info_child">
                                <span style="color:#FFD488;">{{item.name}}：</span>
                                <span>{{item.text}}</span>
                            </div>
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
                <input type="text" id="msgId" v-model="sendMsg" @click="sendMessage" placeholder="发弹幕和主播互动...">
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
import { Toast } from 'vant';
import CustomPopup from "@/components/CustomPopup/custompopup.vue"
import Share from "@/components/Share/share.vue"
import Cation from "@/pages/shop/views/live/backend/components/classification"
import Progress from "@/pages/shop/views/live/frontend/components/progress"
let videoProcessInterval,listTime;
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
        ifPause:true,
        backStatus:false,
        playOrPause: false,
        cationType:0,//商品弹窗
        shopStatus:1,
        liveDetail:1,
        shareType:0,//分享弹窗
        duration:'00:00',//视频总时长
        currentTime:'00:00',//视频播放进度
        videoProcess:0,
        videoProcessEnd:1,
        allDuration:0,
        ifShowPlayBtn:false,
        sendMsg:'',
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
        showLoading:false,
        p:0,
        t:0,
        scrollStatus:true,//判断评论列表是否继续监听滚动
        poseterStatus:false,//直播封面图
        videoCurrentTime:0
    };
  },
  mounted(){
      let that = this;
        //   评论列表
        that.mseListFun();
        //   判断讨论区是向上滚动还是向下滚动
        that.scrollPan();
        //   直播
        if(false){
            that.ifShowPlayBtn = true;
            // 自带键盘点击发送事件
            $("#msgId").on('keypress',function(e) {
                var keycode = e.keyCode;
                if(keycode=='13') {
                    // e.preventDefault();  
                    //请求搜索接口 
                    that.sendMessage();
                }
            });
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
        }else{//回放
            // that.showLoading = true;
            that.backStatus = true;
            //     let video = document.getElementById('videoId');
            //     video.play();
    
            //     let autoPlay = function(){
            //     if(video.currentTime!=0 && video.currentTime!=0.001){
            //         video.removeEventListener("timeupdate",autoPlay);
            //         that.showLoading = false;
            //         that.backStatus = false;
            //     }
            //     // 播放进度条
            //         that.changeProcess()
            //     videoProcessInterval = setInterval(() => {
            //     }, 100)
            // }
            //     // 实时监听video播放状态会记录之前的index
            //     video.addEventListener("timeupdate",autoPlay);
        }
      
  },
  methods:{
      scrollPan(){
        //    var p=0,t=0;
        let that = this;
          $('.message_info').scroll(function(){
            that.p=$(this).scrollTop();
             if(that.t<that.p){
                  //下滚
             }else{
                  //上滚
                  that.scrollStatus = false
             }
             setTimeout(function(){ that.t = that.p ; },0)
           })
      },
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
    // 实时播放进度
    changeProcess(type) {
     //记录播放进度
        var video = document.getElementById('videoId');
        var currentTime = video.currentTime;
        var setTimeFlag= 1;
        if(type == 1){
            currentTime = this.videoCurrentTime;
            video.currentTime = this.videoCurrentTime;
        }
        let duration = video.duration;
        this.allDuration = Number(video.duration);
        
        // 总时长
        let durationLeft= Number(duration/60) < 10 ? '0'+ Math.round(duration/60): Math.round(duration/60);
        let durationRight= Math.round(Number(duration)%60);
        this.duration = durationLeft +':'+ durationRight;

        // 播放时长
        let currentTimeLeft = Number(currentTime/60) < 10 ? '0'+ Math.round(currentTime/60): Math.round(currentTime/60);
        let currentTimeRight = Number(currentTime) < 10 ? '0'+Math.floor(currentTime) : Math.floor(currentTime);
        this.currentTime = currentTimeLeft +':'+ currentTimeRight;
        // 进度条百分比
        this.videoProcess = Number((currentTime / duration)* 100);
        if(this.videoProcess == 100){
            this.videoProcessEnd = 1;
            clearInterval(videoProcessInterval);
        }
    },
    // 播放视频   type:1是暂停，type:0是播放
    progressFun(type){
        let video = document.getElementById('videoId'),that=this;
        that.videoProcessEnd = type;
        if(type == 1){
            clearInterval(videoProcessInterval);
            video.pause();
        }else if(type == 0){
            video.play();
            let autoPlay = function(){
                if(video.currentTime!=0 && video.currentTime!=0.001){
                    video.removeEventListener("timeupdate",autoPlay);
                        that.showLoading = false;
                        that.ifPause =false;
                }
                if(!video.duration){
                    return false;
                }
                that.changeProcess();
                // 播放进度条
                // videoProcessInterval = setInterval(() => {
                    
                // }, 100);
            }
            // 实时监听video播放状态会记录之前的index
            // video.addEventListener("timeupdate",autoPlay);
            // videoProcessInterval = setInterval(() => {
                $("#videoId").on("timeupdate",autoPlay);
            // }, 100);

        }
    },
    // 子组件点击之后改变进度条的长度
    proClickFun(number){
        
        this.videoProcess = number;
      let video = document.getElementById('videoId');
        
      this.videoCurrentTime = parseInt(Number(number)/100 * Number(video.duration));
      this.changeProcess(1);
    },
    // 播放直播
    startVideo() {
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
        },100);

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
        },30000)
    },
    // 点击播放
    playBigFun(){
        // 直播
        if(false){
            this.startVideo();
            this.showLoading = true;
            this.myPlayer.play();
        }else{//回放
            this.showLoading = true;
            this.progressFun(0,1);
            this.backStatus = false;
        }
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
            },1000);
        },
        // 发送信息
        sendMessage(){
        if(this.$util.functions.ifHaveFun(this.sendMsg)){
            clearTimeout(listTime);
            this.mseListFun(this.sendMsg);
        }
        },

  },
  watch:{
        msgList: {
        handler(val, oldVal) {
            if (val != "[]" && this.scrollStatus) {
            let self = this;
            // 页面数据发生变化之后，加载滚动函数
            setTimeout(function() {
                var h = $(".message_info_child_box").innerHeight();
                    $(".message_info").scrollTop(h);
            });
            }
            },
            deep: true
        }
    }
};</script>

<style scoped lang="scss">
@import "@/pages/shop/views/live/frontend/css/playback.scss";
</style>

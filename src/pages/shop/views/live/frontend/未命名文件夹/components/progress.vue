<template>
   <div class="container">
     <div class="progress" v-if="gressType == 1">
            <div class="progress_left" @click="playStatus">
                <img v-show="play == 0 && videoProcessEnd == 0" src="@/pages/shop/views/live/frontend/images/video_pause.png" alt=""/>
                <img v-show="play == 1 || videoProcessEnd == 1" src="@/pages/shop/views/live/frontend/images/video_play.png" alt=""/>
            </div>
            <div class="progress_center" id="progress_center" @click="proClick">
                <div class="progress_div" :style="'width:'+videoProcess+'%'"></div>
                <div class="progress_center_btn" id="progress_btn" :style="'left:'+(videoProcess - 1)+'%'"></div>
            </div>
            <div class="progress_right">
                <span>{{currentTime}}</span>/<span>{{duration}}</span>
            </div>
        </div>
   </div>
</template>

<script>
export default {
   name: '',
   props:{
    //    判断播放组件是否显示
       gressType:{
           type:Number
       },
    //    总时长
       duration:{
           type:String
       },
    //    实时播放时间
       currentTime:{
           type:String
       },
    //    播放百分比
       videoProcess:{
           type:Number
       },
       videoProcessEnd:{
           type:Number
       },
       allDuration:{
           type:Number
       }
   },
   data() {
       return {
           play:0
       }
   },
  components: {},
  mounted(){
      this.dragFun()
  },
  methods:{
      playStatus(){
          if(this.videoProcessEnd == 1){
              this.play=this.videoProcessEnd 
          }
          this.play = this.play == 0 ? 1 : 0;
          this.$emit("playStatus",this.play);
      },
    //   点击进度条
    proClick(){
        let that = this;
        let progress_center = document.getElementById('progress_center').offsetLeft;
        let progress_btn = document.getElementById('progress_btn').offsetLeft;
        // 进度条距离左边的距离
        let  progressVal = Number(progress_btn) - Number(progress_center) + 43;
        // 进度条总长度
        let lengthAll = Number(document.getElementById('progress_center').offsetWidth);
        // 点击位置距离总进度条左边的距离
        let event = event||window.event;
        let x=event.clientX - Number(progress_center);

        // 动态改变video的时间位置
        let video = document.querySelectorAll('video')[0];
        video.currentTime = (this.allDuration/lengthAll) * x;
        // 改变播放按钮的位置
        this.$emit('proClick',Number((video.currentTime / video.duration)* 100))
    },
    // 拖动进度条
    dragFun(){
        let that = this;
        let progress_center = Number(document.getElementById('progress_center').offsetLeft);
      document.getElementById('progress_btn').addEventListener('touchmove', { passive: false })
       // 进度条总长度
        let lengthAll = Number(document.getElementById('progress_center').offsetWidth);
      $('#progress_btn').on('touchmove',function(e){
          e.preventDefault();
          var moveEndX = Number(e.originalEvent.changedTouches[0].pageX) - progress_center;
          let video = document.querySelectorAll('video')[0];
          video.currentTime = (that.allDuration/lengthAll) * moveEndX;
          // 改变播放按钮的位置
        that.$emit('proClick',Number((video.currentTime / video.duration)* 100));
      })
    }
  }
}
</script>

<style scoped lang="scss">
* { touch-action:none; }
 .progress {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 0.2rem;
            margin-top: 0.19rem;

            .progress_left {
                flex: none;
                width: 0.25rem;
                height: 0.32rem;
                margin-right: 0.35rem;
                margin-bottom: 0.1rem;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .progress_center {
                flex: auto;
                margin-right: 0.3rem;
                width: 4.85rem;
                height: 0.04rem;
                background: rgba(255, 255, 255, 0.2);
                position: relative;

                .progress_center_btn {
                    width: 0.24rem;
                    height: 0.24rem;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 50%;
                    position: absolute;
                    left: 0.1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 5;
                }
                .progress_div{
                    position: absolute;
                    z-index: 4;
                    width: 0.1rem;
                    height: 100%;
                    background-color: #fff;
                }
            }

            .progress_right {
                flex: none;
                font-size: 0.22rem;
                color: #FFFFFF;
            }
        }
</style>

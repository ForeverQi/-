<template>
  <div id="videoNoData">
      <div class="videoNoData_box">
          <div class="videoNoData_box_img">
              <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoNoData.png" />
          </div>
          <div class="videoNoData_text">
              <span>抱歉,您访问的资源不存在哦</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "videoNoData",
  data(){
      return {
      }
  },
  created(){
      this.abc = true
  },
   computed: {
    },
    mounted(){

    },
    methods:{

    },
    watch:{
    }
};
</script>

<style scoped lang="scss">
.videoNoData_box{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .videoNoData_box_img{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.6rem;
        img{
            width: 1.49rem;
            height: 1.7rem;
        }
    }

    .videoNoData_text{
        text-align: center;
        span{
            font-size: 0.32rem;
            color: #333333;
        }
    }
    
}
</style>

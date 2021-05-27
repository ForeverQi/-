<template>
   <div class="special-container">
     <div class="title-bar">
       <img class="icon-back" src="@/pages/shop/views/live/frontend/images/icon-back2.png" alt="">
       <img class="icon-collect" src="@/pages/shop/views/live/frontend/images/icon-collect.png" alt="">
       <img class="icon-share" src="@/pages/shop/views/live/frontend/images/icon-share.png" alt="">
     </div>
     <div class="subtitle-bar" v-if="false">
       <img class="icon-back" src="@/pages/shop/views/live/frontend/images/icon-back.png" alt="">
       <div class="text">栏目名称</div>
       <img class="icon-collect" src="@/pages/shop/views/live/frontend/images/icon-collect2.png" alt="">
       <img class="icon-share" src="@/pages/shop/views/live/frontend/images/icon-share2.png" alt="">
     </div>
     <div class="banner">
       <img src="@/pages/shop/views/live/frontend/images/banner2.png" alt="">
     </div>
     <div class="introduce">
       <div class="title">如何高效管理团队？</div>
       <div class="desc">明确大家都认同的目标，目标是方向，是团队存在的理由，是高绩效的基础。有了目标，就让所有成员明白了他们为什么会聚在一起，他们到底要做什么</div>
     </div>
     <div class="list">
       <special></special>
       <special></special>
       <special></special>
       <special></special>
       <special></special>
     </div>
   </div>
</template>

<script>
import Special from "./components/Special";
export default {
   name: '',
   data() {
       return {}
   },
  components: {
    Special
  }
}
</script>

<style scoped lang="scss">
.title-bar,
.subtitle-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  height: .92rem;
  > img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: block;
  }
  .text {
    font-size: .32rem;
    color: #031332;
    text-align: center;
    line-height: .92rem;
  }
  .icon-back {
    left: .3rem;
    width: .2rem;
    height: .36rem;
  }
  .icon-collect {
    right: 1.12rem;
    width: .45rem;
    height: .42rem;
  }
  .icon-share {
    right: .3rem;
    width: .37rem;
    height: .36rem;
  }
}
.subtitle-bar {
  background: #fff;
  border-radius: 0 0 .25rem .25rem;
}
.banner {
  width: 100%;
  height: 4.8rem;
  > img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.introduce {
  position: relative;
  z-index: 99;
  margin-top: -1rem;
  border-radius: .25rem;
  background: #fff;
  padding: 0 .5rem;
  margin-bottom: .1rem;
  .title {
    font-size: .34rem;
    line-height: .34rem;
    color: #000;
    font-weight: 600;
    padding: .5rem 0 .24rem;
  }
  .desc {
    font-size: .24rem;
    line-height: .34rem;
    color: #7C8290;
    padding-bottom: .38rem;
  }
}
</style>

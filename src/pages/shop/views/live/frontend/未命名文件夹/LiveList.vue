<template>
  <div class="live-container">
    <div class="live-title">
      <div class="title-back">
        <img class="icon-img" src="@/pages/shop/views/live/frontend/images/icon-back.png" alt="">
      </div>
      <div class="title-text">直播列表</div>
      <div class="title-menu" @click="switchStatus">
        <img class="icon-img" src="@/pages/shop/views/live/frontend/images/icon-menu.png" alt=""/>

        <div class="title-menuBox" v-show="switchFlg">
            <div class="title-child">
              <img src="@/pages/shop/views/live/frontend/images/icon-mySearch.png" alt=""/>
              <span>搜索</span>
            </div>
            <div class="title-child">
              <img src="@/pages/shop/views/live/frontend/images/icon-myLive.png" alt=""/>
              <span>刷新</span>
            </div>
            <div class="title-child">
              <img src="@/pages/shop/views/live/frontend/images/icon-my Refresh.png" alt=""/>
              <span>我的直播</span>
            </div>
        </div>
      </div>
    </div>
    <div class="live-header bg_fff">
      <div class="live-banner">
        <swiper class="swiper-container" :options="swiperOptionBanner">
          <swiper-slide>
            <img class="banner-img" src="@/pages/shop/views/live/frontend/images/banner1.png" alt="">
          </swiper-slide>
          <swiper-slide>
            <img class="banner-img" src="@/pages/shop/views/live/frontend/images/banner1.png" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="live-recommend">
        <div class="lr-left">
          <img class="rome-avatar" src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2034740944,4251903193&fm=26&gp=0.jpg" alt="">
          <p class="rome-name">歌手大比拼</p>
        </div>
        <div class="lr-right">
          <div class="rome-hot">3892W访问量</div>
          <div class="rome-into">
            <img class="icon-into" src="@/pages/shop/views/live/frontend/images/icon-into.png" alt="">
          </div>
        </div>
      </div>
      <div class="live-type">
        <div class="tab-item" :class="{active : tabCur == 0}" @click="handleToggleType(0)">
          <img class="tab-img" src="@/pages/shop/views/live/frontend/images/icon-live.png" alt="">
          <p class="tab-text">直播</p>
          <i class="tab-line"></i>
        </div>
        <!-- <div class="tab-item" :class="{active : tabCur == 1}" @click="handleToggleType(1)">
          <img class="tab-img" src="@/pages/shop/views/live/frontend/images/icon-special.png" alt="">
          <p class="tab-text">专题</p>
          <i class="tab-line"></i>
        </div> -->
        <div class="tab-item" :class="{active : tabCur == 2}" @click="handleToggleType(2)">
          <img class="tab-img" src="@/pages/shop/views/live/frontend/images/icon-like.png" alt="">
          <p class="tab-text">关注</p>
          <i class="tab-line"></i>
        </div>
      </div>
    </div>
    <div class="live-list">
      <div v-show="tabCur == 0">
        <!-- <swiper :options="swiperOptionTabs" class="live-tab-wrap">
          <swiper-slide class="live-tab active">全部</swiper-slide>
          <swiper-slide class="live-tab">英雄联盟</swiper-slide>
          <swiper-slide class="live-tab">户外</swiper-slide>
          <swiper-slide class="live-tab">颜值</swiper-slide>
          <swiper-slide class="live-tab">赶海直播</swiper-slide>
          <swiper-slide class="live-tab">电影</swiper-slide>
        </swiper> -->
        <Room></Room>
        <Room></Room>
      </div>
      <!-- <div v-show="tabCur == 1">
        <Special></Special>
        <Special></Special>
        <Special></Special>
        <Special></Special>
      </div> -->
      <div v-show="tabCur == 2">
        <Room></Room>
        <Room></Room>
      </div>
    </div>
    <div class="live-list-nodate" v-if="false">
      <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_VFrontend/live_noData.png" alt=""/>
      还没有相关内容哦～
    </div>
  </div>
</template>

<script>
import Room from "./components/Room";
import Special from "./components/Special";

export default {
  name: "",
  data() {
    return {
      tabInfos: [ // tab栏信息
        {
          url: '@/pages/shop/views/live/frontend/images/icon-live.png',
          text: '直播',
          id: '0'
        },
        {
          url: '@/pages/shop/views/live/frontend/images/icon-special.png',
          text: '专题',
          id: '1'
        },
        {
          url: '@/pages/shop/views/live/frontend/images/icon-like.png',
          text: '关注',
          id: '2'
        }
      ],
      tabCur: 0, // tab栏
      subTabCur: 0, // 直播列表tab栏
      swiperOptionBanner: { // 广告swiper参数
        pagination: {
          el: ".swiper-pagination",
          type: "bullets"
        }
      },
      swiperOptionTabs: { // 直播列表tab栏swiper参数
        slidesPerView: 5,
        spaceBetween: 10,
        freeMode: true
      },
      switchFlg:false,
    };
  },
  components: {
    Room,
    Special
  },
  methods: {
    // 切换类型tab栏
    handleToggleType(index) {
      this.tabCur = index
    },
    // 搜索，刷新，我的直播显示
    switchStatus(){
      this.switchFlg = !this.switchFlg
    }
  }
};
</script>
<style scoped lang="scss">
 @import '@/pages/shop/views/live/frontend/css/LiveList.scss';
</style>
<style lang="scss" scoped>
  .contents{
    height:100%;
  }
</style>

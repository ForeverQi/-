<template>
  <div id="storePage" v-wechat-title="$route.meta.title= pageListTitle">
    <van-loading v-if="showLoading" size="50px" color="#1989fa" />
    <van-overlay :show="showLoading" />
    <div class="storePage_box">
      <div class="storePage">
        <!-- 顶部背景 -->
        <div
          class="storePage_bac"
          :style="{backgroundImage: 'url('+ 'https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/duanxin.png'+ ')'}"
        >
          <div class="storePage_shadow"></div>
          <div class="storePage_bac_radian">
            <!-- <div class="storePage_bac_radian_box"></div> -->
            <img src="@/pages/shop/views/platformVideo/frontend/images/platform_shopHomeBgc.png" alt=""/>
          </div>
        </div>
        <!-- 内容 -->
        <div class="storePage_content_box">
          <div class="storePage_content">
            <!-- 顶部搜索 -->
            <div class="storePage_content_search">
              <div class="storePage_content_search_left">
                <div class="voerTop_menuLeft">
                  <span></span>
                </div>
              </div>
              <div class="storePage_content_search_center">
                  <input type="text" placeholder="请输入搜索内容">
                  <img src="@/pages/shop/views/platformVideo/frontend/images/platform_whiteSearch.png" alt=""/>
                  <!-- 搜索 -->
                  <div class="storePage_searchText">搜索</div>
              </div>
              <div class="storePage_content_search_right">
                <div class="storePage_search_div">
                  <img src="@/pages/shop/views/platformVideo/frontend/images/platform_addImg.png" alt=""/>
                </div>
                <span>视小店</span>
              </div>
            </div>
            <!-- 商铺简介 -->
            <div class="storePage_content_Introduction_box">
              <div class="storePage_content_Introduction">
                <div class="storePage_content_Introduction_top" :style="{backgroundImage: 'url('+ 'https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/platform_shopNameBgc.png'+ ')'}">
                    <div class="storePage_Introduction_left">
                      <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/duanxin.png" alt=""/>
                    </div>
                    <div class="storePage_Introduction_center">
                      <span>HUI购水果自营</span>
                      <span>3338.万人关注</span>
                    </div>
                    <div class="storePage_Introduction_right">
                      <!-- 关注 -->
                      <img v-if="focusStatus" @click="focusStatusFun(0)" src="@/pages/shop/views/platformVideo/frontend/images/platform_alerayFocus.png" alt=""/>
                      <!-- 未关注 -->
                      <img v-if="!focusStatus" @click="focusStatusFun(1)" src="@/pages/shop/views/platformVideo/frontend/images/platform_noFocus.png" alt=""/>
                    </div>
                </div>
                <div class="storePage_content_Introduction_bottom">
                  <div class="storePage_content_Introduction_location">
                    <img class="location_img" src="@/pages/shop/views/platformVideo/frontend/images/platform_shopFocusLocation.png" alt=""/>
                    <div class="storePage_Introduction_location_text">
                      <span>地址：北京海淀区农光里小区45街道</span>
                    </div>
                    <img class="phone_img" src="@/pages/shop/views/platformVideo/frontend/images/platform_shopFocusPhone.png" alt=""/>
                  </div>
                  <div class="storePage_content_Introduction_intruduction">
                    <span>产品介绍不超过100字产品介绍不超过100字产品介绍不超100字产品介绍不超过100字</span>
                  </div>
                </div>
              </div>
            </div>
            <!--主题内容-->
            <div class="storePage_content_main_box">
              <div class="storePage_content_main">
                <div class="storePage_content_main_title">
                  <span :class="checkTitleStatus == 1 ? 'checkTitle' : ''" @click="chengTitleFun(1)">精选</span>
                  <span :class="checkTitleStatus == 2 ? 'checkTitle' : ''" @click="chengTitleFun(2)">商品</span>
                  <span :class="checkTitleStatus == 3 ? 'checkTitle' : ''" @click="chengTitleFun(3)">视频</span>
                </div>
                <!-- 视频 -->
                <div class="storePage_content_main_data" v-if="false">
                  <div class="main_data_children">
                    <div class="main_data_children_top">
                      <span>对抗新冠肺炎病毒全靠自身免疫力</span>
                    </div>
                    <div class="main_data_children_center">
                      <div class="main_data_children_center_bgc">
                        <img src="https://aimg8.dlszyht.net.cn/public/src/upload/424150/Shop/files/short_video_info/jpeg/5e460a6fc6fee.jpeg?x-oss-process=image/resize,limit_1,m_mfit,w_800,h_800/crop,w_800,h_800,g_center" alt=""/>
                      </div>
                      <div class="video_box_father" style="background-image:url('https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoBgcImg.png')">
                        <video :webkit-playsinline="true" :playsinline="true"
                          id="playId1" class="video_box" loop x5-video-player-type="h5-page"
                          x5-video-player-fullscreen="true" preload="auto" 
                          autoplay src="http://genwoxue.evyun.cn/c8d1afd49dea4fb18b5e8318dc0fb4cf/1aaa049e1cbd493b8e3e3c930258f55f-63e520b4e59cdebc08744e24dfcd9656-ld.mp4"
                          :playOrPause="true"
                        ></video>
                      </div>
                      <!-- 右上角放大 -->
                      <img class="fullBig" src="@/pages/shop/views/platformVideo/frontend/images/platform_fullScreen.png" alt=""/>
                      <!-- 阴影 -->
                      <img class="video_boxshadow" src="@/pages/shop/views/platformVideo/frontend/images/platform_progressImg.png" alt=""/>
                      <!-- 声音和进度条 -->
                      <div class="progroess">
                        <img src="@/pages/shop/views/platformVideo/frontend/images/platform_shengyinImg.png" alt=""/>
                        <div></div>
                      </div>
                    </div>
                    <div class="main_data_children_bottom">
                      <div class="main_data_children_state">
                        <div>
                          <img src="@/pages/shop/views/platformVideo/frontend/images/platform_shareImg.png" alt=""/>
                          <span>4567</span>
                        </div>
                        <div>
                          <img src="@/pages/shop/views/platformVideo/frontend/images/platform_zanImg.png" alt=""/>
                          <span>4567</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="main_data_children">
                    <div class="main_data_children_top">
                      <span>对抗新冠肺炎病毒全靠自身免疫力</span>
                    </div>
                    <div class="main_data_children_center">
                      <div class="main_data_children_center_bgc">
                        <img src="https://aimg8.dlszyht.net.cn/public/src/upload/424150/Shop/files/short_video_info/jpeg/5e460a6fc6fee.jpeg?x-oss-process=image/resize,limit_1,m_mfit,w_800,h_800/crop,w_800,h_800,g_center" alt=""/>
                      </div>
                      <div class="video_box_father" style="background-image:url('https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoBgcImg.png')">
                        <video :webkit-playsinline="true" :playsinline="true"
                          id="playId1" class="video_box" loop x5-video-player-type="h5-page"
                          x5-video-player-fullscreen="true" preload="auto" 
                          autoplay src="http://genwoxue.evyun.cn/c8d1afd49dea4fb18b5e8318dc0fb4cf/1aaa049e1cbd493b8e3e3c930258f55f-63e520b4e59cdebc08744e24dfcd9656-ld.mp4"
                          :playOrPause="true"
                        ></video>
                      </div>
                      <!-- 右上角放大 -->
                      <img class="fullBig" src="@/pages/shop/views/platformVideo/frontend/images/platform_fullScreen.png" alt=""/>
                      <!-- 阴影 -->
                      <img class="video_boxshadow" src="@/pages/shop/views/platformVideo/frontend/images/platform_progressImg.png" alt=""/>
                      <!-- 声音和进度条 -->
                      <div class="progroess">
                        <img src="@/pages/shop/views/platformVideo/frontend/images/platform_shengyinImg.png" alt=""/>
                        <div></div>
                      </div>
                    </div>
                    <div class="main_data_children_bottom">
                      <div class="main_data_children_state">
                        <div>
                          <img src="@/pages/shop/views/platformVideo/frontend/images/platform_shareImg.png" alt=""/>
                          <span>4567</span>
                        </div>
                        <div>
                          <img src="@/pages/shop/views/platformVideo/frontend/images/platform_afterZanImg.png" alt=""/>
                          <span>4567</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 精选 -->
                <div class="storePage_content_main_data" v-if="true">
                  <div class="main_shop_father">
                    <div class="main_shop_children">
                      <div class="main_shop_children_img">
                        <img src="https://aimg8.dlssyht.cn/product/800_1500/8662/17322183_226482_11584008667.jpg?x-oss-process=image/resize,m_lfit,w_800,h_800,limit_0" alt=""/>
                      </div>
                      <span class="overflowEs">商品名称商品名称商品名称商品名称</span>
                      <div class="main_shop_children_price"><span><span class="price_sysmbol">￥</span>36</span> <span class="price_sysmbol2">￥48</span></div>
                    </div>
                    <div class="main_shop_children">
                      
                    </div>
                    <div class="main_shop_children">
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 底部开店 -->
            <div class="storePage_bottom_box">
              <div class="storePage_bottom">
                <span class="storePage_bottom_title">本店由视小店支持</span>
                <div>
                  <span>我也开视频店</span>
                  <img src="@/pages/shop/views/platformVideo/frontend/images/platform_shopRightArrow.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";

export default {
  name: "introduce",
  data() {
    return {
      showLoading: false,
      pageListTitle: "个人资质认证",
      // 是否关注
      focusStatus:1,
      // 标题切换状态
      checkTitleStatus:1
    };
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    focusStatusFun(num){
      this.focusStatus = num
    },

    // 标题切换
    chengTitleFun(num){
      this.checkTitleStatus = num
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/pages/shop/views/platformVideo/frontend/css/storePage.scss";
</style>

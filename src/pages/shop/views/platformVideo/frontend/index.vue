<template>
  <div id="platformVideo">
    <van-loading v-if="showLoading" size="50px" color="#1989fa" />
    <van-overlay :show="showLoading" />
    <div class="platformVideo_box">
      <div class="platformVideo_top">
        <div class="platformVideo_top_left">
          <div class="voerTop_menuLeft" @click="backPages">
            <span></span>
          </div>
        </div>
        <div class="platformVideo_top_center">
          <div class="swiper-pagination" slot="pagination" >
              
              <div :class="checkTitleStatus == 1 ? 'checkTitle' : ''" @click="chcekStatusClick(0)">附近
                <img
                v-if="checkTitleStatus == 1"
                src="@/pages/shop/views/platformVideo/frontend/images/platformTitleIcon.png"
              />
              </div>
              <div :class="checkTitleStatus == 2 ? 'checkTitle' : ''" @click="chcekStatusClick(1)">推荐
                <img
                v-if="checkTitleStatus == 2"
                src="@/pages/shop/views/platformVideo/frontend/images/platformTitleIcon.png"
              />
              </div>
              <div :class="checkTitleStatus == 3 ? 'checkTitle' : ''" @click="chcekStatusClick(2)">关注
                <img
                v-if="checkTitleStatus == 3"
                src="@/pages/shop/views/platformVideo/frontend/images/platformTitleIcon.png"
              />
              </div>
          </div>
        </div>
        <div class="platformVideo_top_right" @click="searchClick">
          <img src="@/pages/shop/views/platformVideo/frontend/images/platformSearch.png" alt="搜索" />
        </div>
      </div>
      
      <div class="platformVideo_content">
        <swiper ref="mySwiper" :options="swiperOption">
          <swiper-slide v-for="(swiperItem,swiperIndex) in videoData" :key="swiperIndex">
            <div v-if="swiperIndex == 0" id="scrollViewId" style="height:100%;overflow-y:scroll;">
              <!-- 没有网络，没有授权-->
              <div class="platformVideo_content_noHttp" v-if="false">
                <div class="platformVideo_content_noHttp_box">
                  <!-- 没有网络 -->
                  <img src="@/pages/shop/views/platformVideo/frontend/images/platform_noWang.png" />
                  <span class="noHttp_span1">网络错误</span>
                  <span class="noHttp_span2">请检查网络链接后重试～</span>
                  <button>
                    <span>重试</span>
                  </button>
                </div>
                <!-- 没有授权 -->
                <div class="platformVideo_content_noHttp_box" v-if="false">
                  <img src="@/pages/shop/views/platformVideo/frontend/images/platform_shouquan.png" />
                  <span class="noHttp_span1">授权地理位置</span>
                  <span class="noHttp_span2">发现身边的美好~</span>
                  <button class="noAuthorization" @click="authorClick">
                    <span>去授权</span>
                  </button>
                </div>
              </div>
              <div
                class="scrollView"
                style="padding-top:0;"
                v-if="Object.keys(videoListData).length"
              >
                <div class="videoList_box">
                  <div class="videoList_box_content">
                    <div class="videoList_box_content_box clearfix">
                      <div class="item" ref="lBox">
                        <div
                          class="videoList_box_content_children"
                          @click="goDetailPage(itemList.detail_url)"
                          v-for="(itemList,indexList) in evArr.left"
                          :key="indexList"
                        >
                          <div class="videoList_box_content_childrenImg">
                            <div class="shadowBox"></div>
                            <img :src="itemList.conver" alt="图片" />
                          </div>
                          <div class="videoList_box_content_childrentitle">
                            <div class="childrentitle_width1">
                              <img
                                src="@/pages/shop/views/platformVideo/frontend/images/platform_location.png"
                                alt
                              />
                              <span class="ellipsis">王府井大街王府井王府井大街王府井</span>
                              <span>2.3km</span>
                            </div>
                            <div class="childrentitle_width2">
                              <span>正宗陕西美食正宗陕西美食正宗陕西美食正宗陕西美食正宗陕西美食正宗陕西美食正宗陕西美食正宗陕西美食</span>
                            </div>
                            <div class="childrentitle_width3">
                              <img :src="itemList.conver" alt />
                              <span>陕西油泼面旗舰店陕西油泼面旗舰店陕西油泼面旗舰店</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="item" ref="rBox">
                        <div
                          class="videoList_box_content_children"
                          @click="goDetailPage(itemList.detail_url)"
                          v-for="(itemList,indexList) in evArr.right"
                          :key="indexList"
                        >
                          <div class="videoList_box_content_childrenImg">
                            <div class="shadowBox"></div>
                            <img :src="itemList.conver" alt="图片" />
                          </div>
                          <div class="videoList_box_content_childrentitle">
                            <div class="childrentitle_width">
                              <span>{{itemList.title}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="noData_bottom" v-if="psgeNum == page_num">
                  <span>我也是有底线的~</span>
                </div>
              </div>
            </div>
            <div v-if="swiperIndex==1" style="height:100%;">
              <swiper :options="swiperOption2">
                <swiper-slide
                  v-for="(swiperItem2,swiperIndex2) in videoData"
                  :key="swiperIndex2"
                >{{swiperItem.id}}</swiper-slide>
              </swiper>
            </div>
            <div v-if="swiperIndex==2" style="height:100%;background:#F7F5F6;">
              <div class="platformVideo_content_focusBox">
                <div class="platformVideo_content_noFocus">
                  <div class="platformVideo_content_noFocusTop">
                    <img
                      src="@/pages/shop/views/platformVideo/frontend/images/platform_shopImg.png"
                      alt
                    />
                    <span>您还没有关注的店铺哦～</span>
                  </div>
                </div>

                <div class="platformVideo_content_noFocusContent">
                  <div class="noFocusContent_title">
                    <span class="noFocusContent_title_left">你可能感兴趣的店铺你可能感兴趣的店铺你可能感兴趣的店铺</span>
                    <div @click="checkMoreClick">
                      <span>查看更多</span>
                      <img
                        src="@/pages/shop/views/platformVideo/frontend/images/plartform_rightArrow.png"
                        alt
                      />
                    </div>
                  </div>
                  <div class="noFocusContent_box">
                    <div class="noFocusContent_box_child">
                      <div class="shop_tuijian">
                        <img
                          src="@/pages/shop/views/platformVideo/frontend/images/platform_noWang.png"
                          alt
                        />
                      </div>
                      <img
                        class="shop_tuijian_remen"
                        src="@/pages/shop/views/platformVideo/frontend/images/platform_reshop.png"
                        alt
                      />
                      <span class="shenlue">陕西真有味面陕西真有味面</span>
                      <div class="shop_fensi">
                        <img
                          src="@/pages/shop/views/platformVideo/frontend/images/platform_person.png"
                          alt
                        />
                        <span>22.2w粉丝</span>
                      </div>
                      <button>
                        <span>关注</span>
                      </button>
                    </div>
                    <div class="noFocusContent_box_child">
                      <div class="shop_tuijian">
                        <img
                          src="@/pages/shop/views/platformVideo/frontend/images/platform_noWang.png"
                          alt
                        />
                      </div>
                      <img
                        class="shop_tuijian_remen"
                        src="@/pages/shop/views/platformVideo/frontend/images/platform_reshop.png"
                        alt
                      />
                      <span class="shenlue">陕西真有味面陕西真有味面</span>
                      <div class="shop_fensi">
                        <img
                          src="@/pages/shop/views/platformVideo/frontend/images/platform_person.png"
                          alt
                        />
                        <span>22.2w粉丝</span>
                      </div>
                      <button>
                        <span>关注</span>
                      </button>
                    </div>
                    <div class="noFocusContent_box_child">
                      <div class="shop_tuijian">
                        <img
                          src="@/pages/shop/views/platformVideo/frontend/images/platform_noWang.png"
                          alt
                        />
                      </div>
                      <img
                        class="shop_tuijian_remen"
                        src="@/pages/shop/views/platformVideo/frontend/images/platform_reshop.png"
                        alt
                      />
                      <span class="shenlue">陕西真有味面陕西真有味面</span>
                      <div class="shop_fensi">
                        <img
                          src="@/pages/shop/views/platformVideo/frontend/images/platform_person.png"
                          alt
                        />
                        <span>22.2w粉丝</span>
                      </div>
                      <button>
                        <span>关注</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <!-- <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div> -->
        </swiper>
      </div>

      <!-- 遮罩层 -->
      <div class="advertising_mengban" @click.stop="mengbanClose" v-if="zhezhaoStatus"></div>
      <!-- 授权弹窗 -->
      <div class="publicTanchuang" v-if="tanchuangStatus">
        <div class="publicTanchuang_box">
          <div class="publicTanchuang_box_top">
            <span>允许访问您的“位置”？</span>
            <span>发现身边的美好，去热爱生活</span>
          </div>
          <div class="publicTanchuang_box_bottom">
            <div class="publicTanchuang_box_bottom_left" @click="cacelClick">
              <span>取消</span>
            </div>
            <div class="publicTanchuang_box_bottom_right" @click="allowClick">
              <span>允许</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 搜索弹窗 -->
      <CustomPopup ref="CustomSearchRef" @searchFun="closerSearchBtn">
        <div slot="PoperContentFull" class="PoperContentView">
          <div class="searchNoteTop">
            <div class="searchNoteTop_left">
              <div class="voerTop_menuLeft" @click="closerSearchBtn">
                <span></span>
              </div>
            </div>
            <div class="searchNoteTop_right">
              <input type="text" placeholder="请输入关键词" v-model="searchModel" />
              <img src="@/pages/shop/views/platformVideo/frontend/images/platform_tcsearch.png" />
              <span @click="searchBtn">搜索</span>
            </div>
          </div>
          <div class="searchNoteContent">
            <div class="searchNoteContent_box" v-if="false">
              <div class="searchNoteContent_top">
                <span>历史记录</span>
                <div>
                  <img src="@/pages/shop/views/platformVideo/frontend/images/platform_tcdelete.png" />
                  <span>清空历史</span>
                </div>
              </div>
              <div class="searchNoteContent_bottom">
                <div class="searchNoteContent_bottom_child">
                  <div class="searchNoteContent_child_left">
                    <img src="@/pages/shop/views/platformVideo/frontend/images/platform_clock.png" />
                  </div>
                  <div class="searchNoteContent_child_center">
                    <span>22这是一条很长很长很长很长很长的历史记录这是一条很长很长很长很长很长的历史记录</span>
                  </div>
                  <div class="searchNoteContent_child_right">
                    <img
                      src="@/pages/shop/views/platformVideo/frontend/images/platform_searchClose.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="platformVideo_content_noHttp_box" style="height:70%;">
              <!-- 没有搜索内容 -->
              <img
                class="noSearchContent"
                src="@/pages/shop/views/platformVideo/frontend/images/platform_noSearchContent.png"
              />
              <span class="noHttp_span3">没有找到您想要的～</span>
              <button>
                <span>重试</span>
              </button>
            </div>
          </div>
        </div>
      </CustomPopup>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
// 引入弹出框
import CustomPopup from "./components/CustomPopup/custompopup.vue";
import { videoList } from "@/api/shop/video.frontend";
export default {
  name: "platformvideo",
  components: {
    swiper,
    swiperSlide,
    CustomPopup,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    let that = this;
    return {
      active:0,
      // 标题选中状态
      checkTitleStatus: 1,
      // swiper
      swiperOption: {
        on: {
          slideChangeTransitionEnd: function() {
            // that.activeIndex = this.realIndex;
            // // 切换结束时，告诉我现在是第几个slide
            that.onChange(this.realIndex);
          }
        }
      },
      swiperOption2: {
        direction: "vertical"
      },
      videoData: [
        { id: "方式对是的发送到" },
        { id: "风萧萧兮寻寻" },
        { id: "吾问无为谓" }
      ],
      // 授权弹窗
      tanchuangStatus: 0,
      // 遮罩层
      zhezhaoStatus: 0,
      // 搜索内容
      searchModel: "",
      videoListData: {},
      titleFixedStatus: false,
      mescroll: null, // mescroll实例对象
      evArr: {
        left: [],
        right: []
      }, // 列表数据
      isEdit: false, // 是否获取编辑的列表数据
      showLoading: false,
      pageListTitle: "",
      mescrollDown: {},
      httpData: location.protocol + "//",
      psgeNum: 1,
      page_num: 0
    };
  },
  created() {},
  computed: {},
  mounted() {
    let that = this;
    // 短视频列表
    that.videeListFun(1);
    $("#scrollViewId").scroll(function() {

      var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
      var nScrollTop = 0; //滚动到的当前位置
      var nDivHight = $("#scrollViewId").height();
      nScrollHight = $(this)[0].scrollHeight;
      nScrollTop = $(this)[0].scrollTop;
      if (nScrollTop + nDivHight >= nScrollHight) {
        let psgeNum = that.psgeNum;
        psgeNum = Number(psgeNum) + 1;
        if (psgeNum > that.page_num) {
          return false;
        }
        that.videeListFun(psgeNum);
      }
    });
  },
  methods: {
    backPages() {},
    onChange(index) {
      if (index == 0) {
        this.checkTitleStatus = 1;
        this.swiperIndex = 0
      } else if (index == 1) {
        this.checkTitleStatus = 2;
        this.swiperIndex = 1
      } else if (index == 2) {
        this.checkTitleStatus = 3;
        this.swiperIndex = 2
      }
    },
    // 短视频列表
    videeListFun(page) {
      let that = this;
      this.showLoading = true;
      videoList({
        username: that.$route.query.username,
        page: page,
        real_host: location.host
      })
        .then(res => {
          // 关闭加载层
          that.showLoading = false;
          that.loading = false;
          that.videoListData = res;
          that.page_num = res.page_num;
          that.psgeNum = page;
          //如果是第一页需手动置空列表
          if (page == 1) {
            that.evArr.left = [];
            that.evArr.right = [];
          }
          that.loopAdd(0, res.video_list);
          that.pageListTitle = res.channel_name;
        })
        .catch(res => {
          that.showLoading = false;
          that.loading = false;
          Dialog.alert({
            message: res.msg
          }).then(() => {
            location.href = "/wap_shenyue.html";
          });
        });
    },
    // 循环加载数据
    loopAdd(n, data, callback) {
      const that = this;
      that.$nextTick(() => {
        if (n < data.length) {
          let lH, rH;
          lH = $(that.$refs.lBox).height();
          rH = $(that.$refs.rBox).height();
          if (lH < rH || lH == rH) {
            that.evArr.left.push(data[n]);
            that.$nextTick(() => {
              let imgurl = $(that.$refs.lBox).find(
                ".videoList_box_content_children:last img"
              )[0].src;
              let img = new Image();
              img.onload = function() {
                that.loopAdd(++n, data);
              };
              img.src = imgurl;
            });
          } else {
            that.evArr.right.push(data[n]);
            that.$nextTick(() => {
              let imgurl = $(that.$refs.rBox).find(
                ".videoList_box_content_children:last img"
              )[0].src;
              let img = new Image();
              img.onload = function() {
                that.loopAdd(++n, data);
              };
              img.src = imgurl;
            });
          }
        }
      });
    },
    // 授权
    authorClick() {
      this.zhezhaoStatus = 1;
      this.tanchuangStatus = 1;
    },
    // 遮罩层点击
    mengbanClose() {
      this.zhezhaoStatus = 0;
      this.tanchuangStatus = 0;
    },
    // 取消
    cacelClick() {
      this.zhezhaoStatus = 0;
      this.tanchuangStatus = 0;
    },
    // 允许
    allowClick() {
      this.zhezhaoStatus = 0;
      this.tanchuangStatus = 0;
    },
    // 关闭搜索弹窗
    closerSearchBtn() {
      this.$refs.CustomSearchRef.maskCloseFull();
    },
    // 搜索弹窗
    searchClick() {
      this.$refs.CustomSearchRef.showMaskFull();
    },
    // 搜索按钮
    searchBtn() {
      if (this.searchModel.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        return false;
      } else {
      }
    },
    // 查看更多
    checkMoreClick() {
      this.$router.replace({
        path: "/shop/plvideo/focusOn",
        query: {
          username: this.$route.query.username
        }
      });
    },
    // 轮播图切换
    chcekStatusClick(index) {
      this.onChange(index);
    }
  },
  watch: {}
};
</script>

<style scoped lang="scss">
@import "@/pages/shop/views/platformVideo/frontend/css/platVideo.scss";
@import "@/pages/shop/views/platformVideo/frontend/css/platSearch.scss";
</style>
<style lang="scss">
// .van-tabs__nav{
//   display: block;
// }
// .van-tab{
//   display: inline-block;
//   margin-right: 0.2rem;
// }
</style>
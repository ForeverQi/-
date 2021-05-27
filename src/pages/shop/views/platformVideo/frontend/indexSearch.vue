<template>
  <div id="videoList" v-wechat-title="$route.meta.title= pageListTitle" >
    <van-loading v-if="showLoading" size="50px" color="#1989fa" />
    <van-overlay :show="showLoading" />
    <div v-if="Object.keys(videoListData).length" style="height:100%;overflow:hidden;" >
      <div class="searchNoteTop">
        <div class="searchNoteTop_left">
          <div class="voerTop_menuLeft">
            <span></span>
          </div>
        </div>
        <div class="searchNoteTop_right">
          <input type="text" placeholder="请输入关键词" v-model="searchModel" />
          <img src="@/pages/shop/views/platformVideo/frontend/images/platform_tcsearch.png" />
          <span @click="searchBtn">搜索</span>
        </div>
      </div>
      <div ref="mescroll" class="scrollView"  v-if="false">
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
      </div>
      <!-- 没有搜索内容 -->
       <div class="searchNoteContent">
              <div class="platformVideo_content_noHttp_box">
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
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import util from "@/libs/util";

import { videoList } from "@/api/shop/video.frontend";

import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";

export default {
  name: "indexSearch",
  data() {
    return {
      videoListData: {},
      titleFixedStatus: false,

      mescroll: null, // mescroll实例对象
      evArr: {
        left: [],
        right: []
      }, // 列表数据
      isEdit: false, // 是否获取编辑的列表数据
      abc: false,
      showLoading: true,
      pageListTitle: "",
      mescrollDown: {},
      httpData: location.protocol + "//",
      searchModel: ""
    };
  },
  created() {},
  computed: {},
  mounted() {
    // 创建MeScroll对象
    this.mescroll = new MeScroll(this.$refs.mescroll, {
      // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
      down: { use: false, isLock: true },
      up: {
        callback: this.videeListFun,
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        htmlNodata: '<p class="upwarp-nodata">我也是有底线的~</p>',
        htmlLoading:
          '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip"></p>',
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        // toTop: { // 配置回到顶部按钮
        //   src: './static/mescroll/mescroll-totop.png'
        // },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        },
        toTop: {
          //回到顶部按钮
          src:
            "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoBackTop.png", //图片路径,默认null,支持网络图
          offset: 10 //列表滚动1000px才显示回到顶部按钮
        }
      }
    });
  },

  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      if (vm.mescroll) {
        // 恢复到之前设置的isBounce状态
        if (vm.mescroll.lastBounce != null)
          vm.mescroll.setBounce(vm.mescroll.lastBounce);
        // 滚动到之前列表的位置(注意:路由使用keep-alive才生效)
        if (vm.mescroll.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop);
          setTimeout(() => {
            // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0); // 设置回到顶部按钮显示时无渐显动画
          }, 16);
        }
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    if (this.mescroll) {
      this.mescroll.lastBounce = this.mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true); // 允许bounce
      this.mescroll.lastScrollTop = this.mescroll.getScrollTop(); // 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
    }
    next();
  },
  methods: {
    // 短视频列表
    videeListFun(page) {
      let that = this;
      this.showLoading = true;
      // page = JSON.stringify(page)
      videoList({
        username: that.$route.query.username,
        page: page.num,
        real_host: location.host
      })
        .then(res => {
          // 关闭加载层
          that.showLoading = false;
          that.loading = false;
          that.videoListData = res;
          this.abc = false;
          //如果是第一页需手动置空列表
          if (page == 1) {
            that.evArr.left = [];
            that.evArr.right = [];
          }
          that.loopAdd(0, res.video_list);
          that.pageListTitle = res.channel_name;
          that.$nextTick(() => {
            that.mescroll.endSuccess(res.video_list.length);
          });
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

    // 跳转详情页
    goDetailPage(url) {
      location.href = this.httpData + url;
    },
    scrollFun() {
      // window.addEventListener("scroll", this.handleScroll);
    },
    // 滚动函数
    // handleScroll(){
    //     let scrollTop =
    //         window.pageYOffset ||
    //         document.documentElement.scrollTop ||
    //         document.body.scrollTop;

    //     if(scrollTop > 15){
    //         this.titleFixedStatus = true
    //     }else{
    //         this.titleFixedStatus = false
    //     }
    // },

    // 返回上一页
    backPages() {
      if (document.referrer.length > 0) {
        history.back();
      } else {
        location.href = this.videoListData.index_url;
      }
    },
    searchBtn() {}
  },
  watch: {
    videoListData: {
      handler(val, oldval) {
        if (val != "{}") {
          let that = this;
          setTimeout(function() {
            that.scrollFun();
          });
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/pages/shop/views/platformVideo/frontend/css/platSearch.scss";
</style>

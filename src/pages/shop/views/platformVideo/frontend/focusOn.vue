<template>
  <div id="videoFocusOn">
    <van-loading v-if="showLoading" size="50px" color="#1989fa" />
    <van-overlay :show="showLoading" />
    <div v-if="true" style="height:100%;position:relative;">
      <div class="searchNoteTop">
        <div class="searchNoteTop_left">
          <div class="voerTop_menuLeft">
            <span></span>
          </div>
        </div>
        <div class="searchNoteTop_right">
          <span @click="searchBtn">推荐关注</span>
        </div>
      </div>
      <div ref="mescroll" class="scrollView">
        <div class="videoList_box" id="scrollId">
          <div class="videoList_box_content">
            <div class="videoList_box_content_child" v-for="(item,index) in evArr" :key="index">
              <div class="focusChild_left">
                <img :src="item.conver" />
              </div>
              <div class="focusChild_center">
                <div class="focusChild_center_top">
                  <span>正宗陕西面馆旗舰店正宗陕西面馆旗舰店正宗陕西面馆旗舰店</span>
                </div>
                <div class="focusChild_center_bottom">
                  <span class="jujia">居家好货</span>
                  <div>
                    <img
                      src="@/pages/shop/views/platformVideo/frontend/images/platform_person.png"
                      alt
                    />
                    <span>22.2w粉丝</span>
                  </div>
                </div>
              </div>
              <div class="focusChild_right">
                <button>
                  <span>关注</span>
                </button>
              </div>
            </div>
          </div>
          <div class="noData_bottom" v-if="psgeNum == page_num">
            <span>我也是有底线的~</span>
          </div>
        </div>
      </div>
      <!-- 没有搜索内容 -->
      <div class="searchNoteContent" v-if="false">
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
      evArr: [], // 列表数据
      isEdit: false, // 是否获取编辑的列表数据
      abc: false,
      showLoading: true,
      pageListTitle: "",
      mescrollDown: {},
      httpData: location.protocol + "//",
      searchModel: "",
      psgeNum: 1,
      page_num: 0
    };
  },
  created() {},
  computed: {},
  mounted() {
    let that = this;
    that.videeListFun(1);
    $("#scrollId").scroll(function() {
      var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
      var nScrollTop = 0; //滚动到的当前位置
      var nDivHight = $("#scrollId").height();
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
        page: page,
        real_host: location.host
      })
        .then(res => {
          // 关闭加载层
          that.showLoading = false;
          that.loading = false;
          that.page_num = res.page_num;
          that.psgeNum = page;
          let evArr = that.evArr;
          evArr = evArr.concat(res.video_list);
          that.evArr = evArr;
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
        // location.href = this.videoListData.index_url;
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
            // that.scrollFun();
          });
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
// 返回按钮
.searchNoteTop_left {
  position: absolute;
  left: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
  .voerTop_menuLeft {
    width: 0.45rem;
    height: 0.45rem;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    span::after {
      content: "";
      display: block;
      width: 0.2rem;
      height: 0.2rem;
      border-left: 2px solid #000;
      border-top: 2px solid #000;
      transform: rotate(-45deg);
      // margin-left: 0.1rem;
    }
  }
}

// vant的样式
.van-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
}

.van-overlay {
  position: fixed;
  z-index: 1000 !important;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}

.van-dialog {
  border-radius: 8px;
  top: 50% !important;
}
#videoFocusOn {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.searchNoteTop {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.1rem;
  background: #f6f6f6;
  font-size: 0.36rem;
  color: #303030;
  font-weight: bold;
  position: relative;
}
.videoList_box {
  height: 100%;
  overflow-y: scroll;
  .videoList_box_content {
    display: flex;
    flex-direction: column;
    padding-left: 0.27rem;
    padding-right: 0.29rem;
    .videoList_box_content_child {
      height: 1.7rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #dedad5;
      .focusChild_left {
        flex: none;
        img {
          width: 1.2rem;
          height: 1.15rem;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .focusChild_center {
        flex: auto;
        padding-left: 0.16rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        word-wrap: break-word;
        .focusChild_center_top {
          font-size: 0.32rem;
          color: #333333;
          margin-bottom: 0.1rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          word-wrap: break-word;
        }
        .focusChild_center_bottom {
          display: flex;
          font-size: 0.24rem;
          color: #777777;
          .jujia {
            font-size: 0.22rem;
            color: #ff9f39;
            border: 1px solid rgba(255, 205, 126, 1);
            border-radius: 3px;
            display: inline-block;
            padding: 0.06rem 0.06rem;
            line-height: 1;
            margin-right: 0.19rem;
          }
          img {
            width: 0.16rem;
            height: 0.18rem;
          }
        }
      }
      .focusChild_right {
        flex: none;
        button {
          border: 0;
          outline: none;
          background: linear-gradient(
            90deg,
            rgba(255, 78, 0, 1),
            rgba(255, 125, 24, 1)
          );
          width: 1.46rem;
          height: 0.61rem;
          border-radius: 0.31rem;
          font-size: 0.28rem;
          color: #fff;
        }
      }
    }
  }
}
.noData_bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1rem;
  font-size: 0.28rem;
  color: #949494;
  background: #f5f5f5;
}
.scrollView {
  position: absolute;
  top: 1.1rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>

<template>
  <div id="video_liveList" v-wechat-title="$route.meta.title= pageListTitle" :style="{ backgroundColor: !loading ? '#f5f2f5' :''}">
    <div v-if="loading" style="padding-top:0.5rem;">
        <van-skeleton
            title
            avatar
            :row="3"
            :loading="loading"
            >
            </van-skeleton>
            <van-skeleton
            title
            avatar
            :row="3"
            :loading="loading"
            >
            </van-skeleton>
            <van-skeleton
            title
            avatar
            :row="3"
            :loading="loading"
            >
            </van-skeleton>
            <van-skeleton
            title
            avatar
            :row="3"
            :loading="loading"
            >
            </van-skeleton>
            <van-skeleton
            title
            avatar
            :row="3"
            :loading="loading"
            >
            </van-skeleton>

      </div>
    <van-loading v-if="showLoading" size="50px" color="#1989fa" />
    <van-overlay :show="showLoading" />
    <div class="videoList_box" v-if="liveData != ''">
      <div class="searchNoteTop">
        <div class="searchNoteTop_left">
          <div class="voerTop_menuLeft">
            <span></span>
          </div>
        </div>
        <div class="searchNoteTop_right">
          <span>我的直播</span>
        </div>
      </div>
      <div class="videoList_content">
        <div class="videoList">
          <!-- 管理员信息 -->
          <div class="videoList_info" v-if="flowInfo != ''">
            <div class="videoList_info_top">
              <div class="videoList_info_top_img">
                <img
                  :src="topInfo.head_portrait_show"
                  alt
                />
              </div>
              <div class="videoList_info_top_content">
                <div @click="switchTo('/shop/bac/liveHost')">
                  <span>{{topInfo.nickname}}</span>
                  <img v-if="topInfo.relevance_manager_id == 1" src="@/pages/shop/views/live/backend/images/liveList_rightArrow.png" alt />
                </div>
                <span v-if="topInfo.fans > 0">粉丝：{{topInfo.fans}}</span>
              </div>
              <div class="videoList_info_top_editor" v-if="topInfo.relevance_manager_id != 1">
                <span>编辑</span>
                <img src="@/pages/shop/views/live/backend/images/liveList_rightArrow.png" alt />
              </div>
            </div>
            <div class="videoList_info_bottom" v-if="topInfo.relevance_manager_id == 1">
              <div class="videoList_info_bottom_left">
                <van-progress pivot-text="" color="#03C47E" :percentage="flowInfo.flow_bfb" stroke-width="6"/>
                <div class="videoList_info_liuliang">
                    <span class="videoList_info_liuliang_first">流量:{{flowInfo.use_flow }}<span style="color:#999999;">/{{flowInfo.user_all_flow}}</span></span><span>有效期至{{flowInfo.rxpiration_date}}</span>
                </div>
              </div>
              <div class="videoList_info_bottom_right">续费</div>
            </div>
          </div>
          <!-- 列表内容 -->
          <!-- <div class="videoList_main" :style="{height: dataHeight}"> -->
          <div class="videoList_main">
            <!-- 开通了直播 -->
            <div class="videoList_main_box"  style="background:rgba(255, 255, 255, 1);">
              <div class="videoList_title" id="videoList_titleId">
                <span :class="{ checkTitle : checkStatus == 0 }" @click="checkTitleFun(0)">待直播</span>
                <span :class="{ checkTitle : checkStatus == 1 }" @click="checkTitleFun(1)">已结束</span>
                <span :class="{ checkTitle : checkStatus == 2 }" @click="checkTitleFun(2)">已下架</span>
              </div>
              <van-swipe @change="onChangeSwiper" class="vanSwiper" style="height:100%;background:rgba(255, 255, 255, 1);" ref="swiperVan" :loop="false" :show-indicators="false">
                  <van-swipe-item  >
                      <!-- 待直播 -->
                      <div class="toLiveBox">
                        <div class="videoList_child_box" v-show="checkStatus == 0">
                          <div class="videoList_child" v-for="(item,index) in LiveList[0]" :key="index">
                              <div class="videoList_child_left">
                                <img :src="item.cover_pic_show" alt=""/>
                                <!-- 观看人数 -->
                                <div class="watchBox">
                                  <img src="@/pages/shop/views/live/backend/images/liveList_eyeImg.png" alt=""/><span>{{item.look_people_num}}</span>
                                </div>
                                <!-- 播放状态 -->
                                <div class="statePlay" v-if="item.live_status > 0">
                                  <!-- 立即开播 -->
                                  <span v-if="item.live_status == 4">{{item.live_button_text}}</span>
                                  <!-- 继续直播 -->
                                  <span v-if="item.live_status == 2 || item.live_status == 3" style="color:#333333;background:#fff;">{{item.live_button_text}}</span>
                                  <!-- 停播 -->
                                  <span v-if="item.live_status == 1" style="background:#FC273C;" @click="operationFun(item.id,'stop')">{{item.live_button_text}}</span>
                                </div>
                                <!-- 主播名称 -->
                                <div class="hostName" v-if="item.is_anchor == 1">
                                  <div class="hostName_img">
                                    <img :src="item.anchor_info.head_portrait_show" alt=""/>
                                  </div>
                                    
                                  <div class="hostName_text">
                                    <span>{{item.anchor_info.nickname}}</span>
                                  </div>
                                </div>
                              </div>
                              <div class="videoList_child_right">
                                  <div class="videoList_child_right_top">
                                    <span>{{item.title}}</span>
                                    <!-- <span>111</span> -->
                                  </div>
                                  <div class="videoList_child_right_center">
                                    <span v-if="checkStatus == 1">{{item.start_time}} 开播</span>
                                    <span v-else style="color:#999999;">{{item.start_time}} 开播</span>
                                  </div>
                                  <div class="videoList_child_right_bottom" v-if="item.live_status == 4">
                                    <div class="videoList_child_status">
                                      <img src="@/pages/shop/views/live/backend/images/liveList_editor.png" alt=""/><span>编辑</span>
                                    </div>
                                    <div class="videoList_child_status">
                                      <img src="@/pages/shop/views/live/backend/images/liveList_bottom.png" @click="operationFun(item.id,'down')" alt=""/><span>下架</span>
                                    </div>
                                    <div class="videoList_child_status">
                                      <img src="@/pages/shop/views/live/backend/images/liveList_delete.png" @click="operationFun(item.id,'del')" alt=""/><span>删除</span>
                                    </div>
                                  </div>
                                  <!-- 直播中 -->
                                  <div v-if="item.live_status == 1 || item.live_status == 2 || item.live_status == 3">
                                    <span style="font-size:0.22rem;color:#FF5656;">{{item.live_brief_text}}</span>
                                  </div>
                              </div>
                          </div>
                          <div class="fengeBox">
                            <span></span>
                          </div>
                        </div>
                      </div>
                  </van-swipe-item>
                  <van-swipe-item >
                      <!-- 已结束 -->
                      <div class="overLiveBox">
                        <div class="videoList_child_box" v-show="checkStatus == 1">
                          <div class="videoList_child"  v-for="(item,index) in LiveList[1]" :key="index">
                              <div class="videoList_child_left">
                                <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png" alt=""/>
                                <!-- 回放 -->
                                <div class="playbackText2" v-if="topInfo.relevance_manager_id == 1">
                                  <span>回放</span>
                                </div>
                                <div class="playbackText" v-else>
                                  <span>回放已保存</span>
                                </div>
                                <!-- 观看人数 -->
                                <div class="watchBox" v-if="topInfo.relevance_manager_id == 1">
                                  <img src="@/pages/shop/views/live/backend/images/liveList_eyeImg.png" alt=""/><span>999</span>
                                </div>
                                <!-- 主播名称 -->
                                <div class="hostName" v-if="topInfo.relevance_manager_id == 1">
                                  <div class="hostName_img">
                                    <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/qq_icon.png" alt=""/>
                                  </div>
                                    
                                  <div class="hostName_text" v-if="item.is_anchor == 1">
                                    <span>{{item.anchor_info.nickname}}</span>
                                  </div>
                                </div>
                              </div>
                              <div class="videoList_child_right">
                                  <div class="videoList_child_right_top">
                                    <span>{{item.title}}</span>
                                  </div>
                                  <div class="videoList_child_right_center">
                                    <span style="color:#999999;">{{item.start_time}} 开播</span>
                                  </div>
                                  <div class="continue_live" v-if="topInfo.relevance_manager_id != 1">
                                    <!-- 立即开播 -->
                                    <!-- <span v-if="item.live_status == 4">{{item.live_button_text}}</span> -->
                                    <!-- 继续直播 -->
                                    <!-- <span v-if="item.live_status == 2 || item.live_status == 3">{{item.live_button_text}}</span> -->
                                    <span >{{ item.live_button_text }}</span>
                                  </div>
                                  <div class="videoList_child_right_bottom" v-if="topInfo.relevance_manager_id == 1">
                                    <div class="videoList_child_status">
                                        <img src="@/pages/shop/views/live/backend/images/liveList_editor.png" alt=""/><span>编辑</span>
                                      </div>
                                      <div class="videoList_child_status">
                                        <img src="@/pages/shop/views/live/backend/images/liveList_bottom.png" @click="operationFun(item.id,'down')" alt=""/><span>下架</span>
                                      </div>
                                      <div class="videoList_child_status">
                                        <img src="@/pages/shop/views/live/backend/images/liveList_delete.png" @click="operationFun(item.id,'del')" alt=""/><span>删除</span>
                                      </div>
                                    </div>
                                  </div>
                          </div>
                            <div class="fengeBox">
                              <span></span>
                            </div>
                        </div>
                      </div>
                  </van-swipe-item>
                  <van-swipe-item v-show="checkStatus == 2">
                      <!-- 已下架 -->
                      <div class="toLiveBox">
                        <div class="videoList_child_box" v-show="checkStatus == 2">
                          <div class="videoList_child" v-for="(item,index) in LiveList[2]" :key="index">
                              <div class="videoList_child_left">
                                <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png" alt=""/>
                                <!-- 观看人数 -->
                                <div class="watchBox">
                                  <img src="@/pages/shop/views/live/backend/images/liveList_eyeImg.png" alt=""/><span>999</span>
                                </div>
                                <!-- 播放状态 -->
                                <div class="statePlay" v-if="false">
                                  <span v-if="false">立即开播</span>
                                  <span v-if="true" style="color:#333333;background:#fff;">继续直播</span>
                                  <span v-if="false" style="background:#FC273C;">停播</span>
                                </div>
                                <!-- 主播名称 -->
                                <div class="hostName">
                                  <div class="hostName_img">
                                    <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/qq_icon.png" alt=""/>
                                  </div>
                                    
                                  <div class="hostName_text">
                                    <span>主播子管理员名称</span>
                                  </div>
                                </div>
                              </div>
                              <div class="videoList_child_right">
                                  <div class="videoList_child_right_top">
                                    <span>如何高效管理团队？明确大家都认同的目标</span>
                                  </div>
                                  <div class="videoList_child_right_center">
                                    <span v-if="false">2019-11-11 12:00 开播</span>
                                    <span style="color:#999999;">2019-11-11 12:00 开播</span>
                                  </div>
                                  <div class="videoList_child_right_bottom">
                                    <div class="videoList_child_status">
                                      <img src="@/pages/shop/views/live/backend/images/liveList_editor.png" alt=""/><span>编辑</span>
                                    </div>
                                    <div class="videoList_child_status">
                                      <img src="@/pages/shop/views/live/backend/images/liveList_bottom.png" @click="operationFun(item.id,'up')" alt=""/><span>上架</span>
                                    </div>
                                    <div class="videoList_child_status">
                                      <img src="@/pages/shop/views/live/backend/images/liveList_delete.png" @click="operationFun(item.id,'del')" alt=""/><span>删除</span>
                                    </div>
                                  </div>
                                  <div v-if="false">
                                    <span style="font-size:0.22rem;color:#FF5656;">直播中...</span>
                                  </div>
                              </div>
                          </div>
                          <div class="fengeBox">
                            <span></span>
                          </div>
                          <div class="noDataList" v-if="LiveList[2].length == 0">
                              <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_VFrontend/live_noData.png" alt=""/>
                              <span>暂无相关内容哦～</span>
                          </div>
                        </div>
                      </div>
                  </van-swipe-item>
              </van-swipe>
            </div>
            <!-- 未开通直播 -->
            <div class="liveList_noLive" v-if="false" >
              <img src="@/pages/shop/views/live/backend/images/liveList_noLive.png" alt=""/>
              <span style="width:2.68rem;margin-bottom:1rem;text-align:center;">您还没有开通直播功能开通后即可发起直播</span>
              <span class="liveList_noLive_btn">立即开通</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 吸顶导航 -->
      <div class="videoList_title videoList_title2" :style="{ top: topFixed ? 0 : '',opacity: topFixed ? 1 : 0}">
        <span :class="{ checkTitle : checkStatus == 0 }" @click="checkTitleFun(0)">待直播</span>
        <span :class="{ checkTitle : checkStatus == 1 }" @click="checkTitleFun(1)">已结束</span>
        <span :class="{ checkTitle : checkStatus == 2 }" @click="checkTitleFun(2)">已下架</span>
      </div>
      <!-- 回到顶部 -->
      <div class="goScrollTop" v-show="topIfStatus">
        <img src="@/pages/shop/views/live/backend/images/liveList_scrollTop.png" alt=""/>
      </div>
      <!-- 创建直播 -->
      <div class="createLiveBox" @click="createClick">
        <img src="@/pages/shop/views/live/backend/images/liveList_createBgc.png" alt=""/>
        <div class="createLiveBox_content">
          <img src="@/pages/shop/views/live/backend/images/liveList_createLive.png" alt=""/>
          <span>创建直播</span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import Hint from '@/plugins/hint'
import {myLiveHead,myLiveList,liveOperation} from '@/api/shop/live'
export default {
  name: "introduce",
    components:{
    },
  data() {
    return {
      loading:true,
      showLoading: false,
      pageListTitle: "个人资质认证",
      checkStatus:0,
      psgeNum: 1,
      page_num: 0,
      topInfo:'',
      flowInfo:'',
      page_num:1,
      LiveList:{0:[],1:[],2:[]},
      liveData:'',
      dataHeight:0,
      topIfStatus:false,
      topFixed:false,
      offsetValues:50,
      scrollTops:51
    };
  },
  created() {},
  computed: {},
  mounted() {
    let that = this;
    // 头部信息接口
    that.myLiveHead();
    // 直播列表
    // that.myLiveList(0);
    // that.BottomJumpPage()
  },
  methods: {
    BottomJumpPage() {
       $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        var offset = $('#videoList_titleId').offset();
        var offsetValue = offset['top'];
        if (scrollTop > 10) {//滚动到头部部执行事件
          this.topIfStatus = true;
        }else{
          this.topIfStatus = false;
        }
        
      })
 },
    // 头部信息
    myLiveHead(){
      let that = this;
        myLiveHead({
          username: that.$util.shopVideo.username(),
      }).then(res=>{
          that.topInfo = that.$util.functions.ifHaveFun(res.topInfo) ? res.topInfo : '';
          that.flowInfo = that.$util.functions.ifHaveFun(res.flowInfo) ? res.flowInfo : '';
          // 直播列表
          that.myLiveList();
      })
    },
    // 直播列表
    myLiveList(){
        let that = this;
          myLiveList({
            username: this.$util.shopVideo.username(),
            page:that.page_num,
            type:that.checkStatus
        }).then(res=>{
          that.showLoading = false;
          that.loading = false;
          that.liveData = res;
          let list = that.$util.functions.ifHaveFun(res.list) ? res.list : [];
          that.LiveList[that.checkStatus] = that.LiveList[that.checkStatus].concat(list);
          that.LiveList[that.checkStatus].moreStatus = res.more;
          that.LiveList[that.checkStatus].page_num_status = that.page_num;
          if(that.page_num == 1 && that.LiveList[that.checkStatus].aleryStatus != 1){
            that.LiveList[that.checkStatus].aleryStatus = 1;
          }
            //  that.$previewRefresh()
        })
    },
    // 选择标题
    checkTitleFun(num){
      this.$refs.swiperVan.swipeTo(num);
    },
    // 分类滚动加载数据
    scrollJiaZai(){
        let that = this;
        $("#scrollViewId"+that.current).scroll(function() {
            var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
            var nScrollTop = 0; //滚动到的当前位置
            var nDivHight = $("#scrollViewId"+that.current).height();
            nScrollHight = $(this)[0].scrollHeight;
            nScrollTop = $(this)[0].scrollTop;
            if(nScrollTop > 10){
                that.goTopStatus = true;
                that.cationList[that.current].backStatus = 1;
            }else{
                that.goTopStatus = false;
                that.cationList[that.current].backStatus = 0;
            }
            if (nScrollTop + nDivHight >= nScrollHight) {
                that.ifJiaZai = 1;
                let pageNum = that.pageNum;
                pageNum = Number(pageNum) + 1;
                that.cationList[that.current].pageNum = pageNum;
                that.cationList[that.current].page_num = that.page_num;
                if (pageNum > that.page_num) {
                    return false;
                }
                that.pageNum = pageNum;
                that.videeListFun(pageNum);
            }
        });
    },
    // 创建直播
    createClick(){
        Hint.Confirm({
            title: '',
            message: '您有正在进行中的直播,请继续直播或结束该直播',
            confirmButtonText:"继续直播",
            cancelButtonText:'结束下播',
            className:'confirmBox'
        }).then(() => {
            console.log(1)
        }).catch(() => {
            console.log(2)
         
        });
    },
    // 轮播滑动
    onChangeSwiper(index){
      this.checkStatus = index;
      if(this.LiveList[index].aleryStatus == 1){
        this.page_num =this.LiveList[index].page_num_status;
      }else{
        this.showLoading = true;
        this.myLiveList();
      }
    },
    // 主播信息
    switchTo(path){
      this.$router.replace({
        path: path,
        query:{}
      })
    },
    getData() {
      window.addEventListener("scroll", this.handleScroll);
    },
    // 视频操作
    operationFun(id,type){
      let that = this;
      liveOperation({
        live_id: id,
        type:type,
      }).then(res=>{
          that.page_num = 1;
          that.checkStatus = 0;
          that.myLiveList();
      })
    },
    // 滚动函数
    handleScroll() {
      let that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let scrollHeight = $(document).height();
      let windowHeight = $(window).height();
      if (scrollTop + windowHeight == scrollHeight) { //滚动到底部执行事件
          if(that.LiveList[that.checkStatus].moreStatus == 1){
            that.page_num = Number(that.page_num) +1;
            that.myLiveList();
          }
      }

      setTimeout(function() {
        // 获取页面元素距离浏览器工作区顶端的距离
        var theDistance = $("#videoList_titleId").offset().top - $(window).scrollTop();
        if (theDistance < parseInt($(".videoList_title2").height())/2) {
          that.topFixed = true;
        } else if (theDistance >  parseInt($(".videoList_title2").height())/2) {
          that.topFixed = false;
        }
      }, 100);
    },
  },
  watch: {
    liveData:{
      handler(val, oldVal) {
      if (val != "{}") {
        let self = this;
        // 页面数据发生变化之后，加载滚动函数
        setTimeout(function() {
          self.getData();
        });
      }
    },
    deep: true
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/pages/shop/views/live/backend/css/liveList.scss";
</style>
<style lang="scss">
.confirmBox{
    font-size: 0.28rem;
    color: #222222;
    font-weight: bold;
    .van-dialog__message{
      padding:0.95rem !important;
    }
}
.van-swipe__track{
  // overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>

<template>
  <div class="liveRecords_box">
      <div class="liveRecords">
          <div class="liveRecords_top">
              <div class="voerTop_menuLeft" @click="backPages">
                <span></span>
              </div>
              <div @click="changeRecTitle(0)" class="records" :class="recordsIndex == 0 ? 'records_active ':''">关注
                  <span></span>
              </div>
              <div @click="changeRecTitle(1)" class="records" :class="recordsIndex ==1 ? 'records_active':''">购买记录
                  <span></span>
              </div>
          </div>
          <div class="liveRecords_content">
              <!-- 购买记录 -->
              <div class="liveChase" v-if="false">
                  <div class="liveChase_child">
                      <div class="liveChase_child_left">
                          <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/redesign_addressOrder.png" alt=""/>
                          <!-- 直播中，即将开始 -->
                          <!-- <span class="ongoing">直播中</span> -->
                          <!-- 回放 -->
                          <!-- <span class="ongoing" style="background:#1EC478;">回放</span> -->
                          <!-- 已结束 -->
                          <span class="ongoing" style="background:rgba(0,0,0,0.5);">已结束</span>
                      </div>
                      <div class="liveChase_child_right">
                          <div class="liveChase_chilTop">
                              <div class="chilTop_title">如何高效管理团队？明确大家都如何高效管理团队？明确大家都</div>
                              <div class="chilTop_time">支付时间:2019-11-11 12:002019-11-11 12:00</div>
                          </div>
                          <div class="liveChase_chilBottom">
                              <div><span><span style="font-size:0.22rem;"></span>￥</span>999</span></div>
                              <div class="bottomBtn">订单详情</div>
                          </div>
                      </div>
                  </div>
              </div>
              <!-- 关注 -->
              <div class="focusOn_record">
                  <div class="recording_title">直播中</div>
                  <div class="focusOn_recording_box">
                      <div class="focusOn_recording_child">
                          <div class="recording_child_top">
                              <img src="http://aimg8.dlszywz.com/product/800_1500/1586/3170800_1249735_11467971359.jpg?x-oss-process=image/resize,m_mfit,h_600,w_600,limit_0" alt=""/>
                              <span class="nper">小浪鱼儿户外赶海第88期小浪鱼儿户外赶海第88期</span>
                              <div class="money_tip">￥99.00</div>
                          </div>
                          <div class="recording_child_bottom">
                              <div class="child_bottom_left">
                                  <img src="http://aimg8.dlszywz.com/product/800_1500/1586/3170800_1249735_11467971359.jpg?x-oss-process=image/resize,m_mfit,h_600,w_600,limit_0" alt=""/>
                                  <span>主播名称主播名称主播名称</span>
                              </div>
                              <div class="child_bottom_right">
                                  <img src="@/pages/shop/views/live/frontend/images/records_more.png" alt="">
                              </div>
                          </div>

                          <div class="record_mengban">
                              <span>不再关注</span>
                          </div>
                      </div>
                      <div class="focusOn_recording_child">
                          <div class="recording_child_top">
                              <img src="http://aimg8.dlszywz.com/product/800_1500/1586/3170800_1249735_11467971359.jpg?x-oss-process=image/resize,m_mfit,h_600,w_600,limit_0" alt=""/>
                          </div>
                          <div class="recording_child_bottom">
                              <div class="child_bottom_left">
                                  <img src="http://aimg8.dlszywz.com/product/800_1500/1586/3170800_1249735_11467971359.jpg?x-oss-process=image/resize,m_mfit,h_600,w_600,limit_0" alt=""/>
                                  <span>主播名称</span>
                              </div>
                              <div class="child_bottom_right">
                                  <img src="@/pages/shop/views/live/frontend/images/records_more.png" alt="">
                              </div>
                          </div>
                      </div>
                      <div class="focusOn_recording_child">
                          <div class="recording_child_top">
                              <img src="http://aimg8.dlszywz.com/product/800_1500/1586/3170800_1249735_11467971359.jpg?x-oss-process=image/resize,m_mfit,h_600,w_600,limit_0" alt=""/>
                          </div>
                          <div class="recording_child_bottom">
                              <div class="child_bottom_left">
                                  <img src="http://aimg8.dlszywz.com/product/800_1500/1586/3170800_1249735_11467971359.jpg?x-oss-process=image/resize,m_mfit,h_600,w_600,limit_0" alt=""/>
                                  <span>主播名称</span>
                              </div>
                              <div class="child_bottom_right">
                                  <img src="@/pages/shop/views/live/frontend/images/records_more.png" alt="">
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="recording_title">未开播</div>
                  <div class="focusOn_recordNoing_box">
                        <div class="recordNoing_box_child" style="padding-right:2.02rem;" @click="hostFun">
                            <div class="recordNoing_box_child_left">
                                <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_VFrontend/live_noData.png" alt=""/>
                            </div>
                            <div class="recordNoing_box_child_center">
                                <div style="font-size:0.26rem;color:#031332;">小浪鱼儿小浪鱼儿小浪鱼儿小浪鱼儿</div>
                                <div>快来看我赶海拾贝吧！快来看我赶海拾贝吧！快来看我赶海拾贝吧！</div>
                            </div>
                            <div class="recordNoing_box_child_right">
                                <img src="@/pages/shop/views/live/frontend/images/records_more.png" alt=""/>
                            </div>
                            <div class="focusOn_no">不在关注</div>
                        </div>
                  </div>
              </div>
              <!-- 无数据 -->
              <div class="content_nodate" v-if="false">
                  <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_VFrontend/live_noData.png" alt="">
                  <span>还没有相关内容哦～</span>
                  <div>去逛逛</div>
              </div>
          </div>
      </div>
      <!-- 加载页 -->
      <div class="liveRecords_nodata" v-if="false">
          <img src="@/pages/shop/views/live/frontend/images/records_loading.png" alt="">
      </div>
       <!-- 主播信息弹窗 -->
    <CustomPopup ref="CustomHostRef" @hostFun="closeHostInfo">
        <div slot="PoperContent" class="PoperContentView_box">
            <div class="PoperContentView">
                <!-- 头像 -->
                <div class="hostHeader" :style="{transform: showHeader ? 'translate(-50%,-50%)' : '' }">
                    <img src="http://aimg8.dlszywz.com/product/800_1500/1586/3170800_1249735_11467971359.jpg?x-oss-process=image/resize,m_mfit,h_600,w_600,limit_0" alt=""/>
                </div>
                <!-- 名称，介绍 -->
                <div class="recordTitle">
                    <span style="margin-bottom:0.05rem;">库里南</span>
                    <span style="font-size:0.24rem;color:#B9BFC6;margin-bottom:0.16rem;">快来看我赶海直播吧！</span>
                    <div>
                        <!-- <img src="@/pages/shop/views/live/frontend/images/records_duihao.png" alt=""/> -->
                        <span>关注</span>
                    </div>
                </div>
                <!-- 直播，回放 -->
                <div class="playback">
                    <div class="playback_child" @click="headerFun(0)" :class="headerIndex == 0 ? 'records_active ':''">直播<span></span></div>
                    <div class="playback_child" @click="headerFun(1)" :class="headerIndex ==1 ? 'records_active':''">回放<span></span></div>
                </div>
                <!-- 直播 -->
                <div class="records_room" v-if="headerIndex == 0">
                    <div class="records_room_content" v-if="headerIndex == 0">
                        <Room></Room>
                        <Room></Room>
                        <Room></Room>
                    </div>
                    <div class="records_room_No" v-if="true">
                        <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_VFrontend/live_noData.png" alt=""/>
                        还没有相关内容哦～
                    </div>
                </div>
                <!-- 回放 -->
                <div class="playback_content_box" v-if="headerIndex == 1">
                    <Back></Back>
                </div>
            </div>
        </div>
    </CustomPopup>
  </div>
</template>

<script>
import Room from "./components/Room";
import Special from "./components/Special";
import Back from "./components/back";


import CustomPopup from "@/components/CustomPopup/custompopup.vue"

export default {
  name: "",
  data() {
    return {
      recordsIndex:0,
      headerIndex:0,
    //   判断主播信息头像是否滚动
      showHeader:false
    };
  },
  components: {
    Room,
    Special,
    CustomPopup,
    Back
  },
  methods: {
   changeRecTitle(type){
       this.recordsIndex = type
   },
   headerFun(type){
       this.headerIndex = type
   },
   backPages(){

   },
   //主播信息弹窗
   hostFun(){
       this.$refs.CustomHostRef.showCustom();
       this.showHeader=true
   },
   //关闭主播信息弹窗
   closeHostInfo(){
        this.$refs.CustomHostRef.maskClickHidden();
        this.showHeader=false
   }
  }
};
</script>
<style scoped lang="scss">
 @import '@/pages/shop/views/live/frontend/css/purRecords.scss';
</style>

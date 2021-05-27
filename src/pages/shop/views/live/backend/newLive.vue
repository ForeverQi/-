<template>
  <div id="video_liveList" v-wechat-title="$route.meta.title= pageListTitle">
    <van-loading v-if="showLoading" size="50px" color="#1989fa" />
    <van-overlay :show="showLoading" />
    <div class="videoList_box">
      <!-- 顶部标题 -->
      <div class="searchNoteTop">
        <div class="searchNoteTop_left">
          <div class="voerTop_menuLeft">
            <span></span>
          </div>
        </div>
        <div class="searchNoteTop_right">
          <span>新建直播</span>
        </div>
      </div>
      <!-- 主题内容 -->
      <div class="newLive_box">
        <div class="newLive">
          <div class="newLive_top">
            <!-- 标题封面 -->
            <div class="newLive_cover">
              <div class="newLive_cover_left">
                <span>标题封面</span>
                <textarea placeholder="请输入您的直播标题,最多可输入20个汉字" maxlength="20"></textarea>
              </div>
              <div class="newLive_cover_right">
                <div class="newLive_cover_add">
                  <img src="@/pages/shop/views/live/backend/images/liveList_addCoverImg.png" alt />
                  <span style="width:2.4rem;">请上传您的直播封面建议上宽高16比9的图片</span>

                  <div class="newLive_coverImg" v-if="false">
                    <img
                      src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png"
                      alt
                    />
                    <span>更换</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 直播介绍 -->
            <div class="newLive_cover">
              <div class="newLive_cover_left" style="flex:auto">
                <span>直播介绍</span>
                <textarea
                  placeholder="请输入您的直播介绍,将在直播详情页展示,建议输入50到100个汉字(最多支持200个汉字,非必填)"
                  maxlength="200"
                  style="width:100%;height:1.35rem;"
                ></textarea>
              </div>
            </div>
            <!-- 直播时间 -->
            <div class="newLive_cover" style="padding-bottom:0.35rem;">
              <div class="newLive_cover_left" style="flex:auto">
                <span style="margin-bottom:0.5rem;">直播介绍</span>
                <div class="newLive_cover_introduce" @click="changeTime">
                  <div class="newLive_cover_introduce_left">
                    <img src="@/pages/shop/views/live/backend/images/createLive_time.png" alt />
                    <span>开始时间</span>
                  </div>
                  <span style="width:inherit;">至</span>
                  <div class="newLive_cover_introduce_right" @click="changeTime">
                    <img src="@/pages/shop/views/live/backend/images/createLive_time.png" alt />
                    <span>结束时间</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 直播 -->
            <div class="newLive_host">
              <p>主播</p>
              <div class="newLive_host_add"  @click="cationTypeFun">
                <img src="@/pages/shop/views/live/backend/images/liveList_addCoverImg.png" alt />
                <span>请选择主播或员工</span>
              </div>
              <div class="newLive_host_addafter" v-if="false">
                <div class="newLive_host_addafter_left">
                  <div class="hostName">
                    <img
                      src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png"
                      alt
                    />
                  </div>
                  <span>主播名称</span>
                </div>
                <div class="newLive_host_addafter_right">
                  <span>更换</span>
                  <img src="@/pages/shop/views/live/backend/images/liveList_rightArrow.png" alt />
                </div>
              </div>
            </div>
            <!-- 直播商品 -->
            <div class="newLive_hostShop">
              <span style="margin-bottom:0.2rem;display:block;">直播商品</span>
              <div class="newLive_hostShop_main" v-if="true">
                <div class="newLive_hostShop_main_title">
                  <span>共122件</span>
                  <div class="newLive_hostShop_main_titleUp" @click="packUpBtn">
                    <span v-if="packUpStatus == 0">收起</span>
                    <span v-else>展开</span>
                    <img :class="packUpStatus==1 ? 'transformArrow' : 'transformArrow2'" src="@/pages/shop/views/live/backend/images/createLive_topArrow.png" alt />
                  </div>
                </div>
                <div :class="packUpStatus == 1 ? 'mainContentPack newLive_hostShop_mainContent' : 'newLive_hostShop_mainContent'">
                  <div class="newLive_hostShop_child">
                    <div class="newLive_hostShop_child_left">
                      <img
                        src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png"
                        alt
                      />
                    </div>
                    <div class="newLive_hostShop_child_center">
                      <div class="newLive_hostShop_child_center_title">
                        <span>米家 （MIJIA）扫地机器人 小米扫拖一体机器人 家用吸尘器</span>
                      </div>
                      <div class="newLive_hostShop_child_label">
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                      </div>
                      <div class="newLive_hostShop_child_price">
                        <div style="margin-right:0.1rem;">
                          <span>￥1999.00</span>
                        </div>
                        <span style="position:relative;color:#000000;">￥1999.00
                            <div class="status_thrid">
                                <div
                                class="status_thrid_box"
                                v-if="true"
                                >
                                <!-- <div
                                class="status_thrid_box"
                                v-if="guigeData.pro_tag == '会员价' || guigeData.pro_tag == '会员折扣'"
                                > -->
                                <span>会员价</span>
                                </div>
                            </div>
                        </span>
                      </div>
                    </div>
                    <div class="newLive_hostShop_child_right">
                      <img src="@/pages/shop/views/live/backend/images/createLive_close.png" alt />
                    </div>
                  </div>
                  <div class="newLive_hostShop_child">
                    <div class="newLive_hostShop_child_left">
                      <img
                        src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png"
                        alt
                      />
                    </div>
                    <div class="newLive_hostShop_child_center">
                      <div class="newLive_hostShop_child_center_title">
                        <span>米家 （MIJIA）扫地机器人 小米扫拖一体机器人 家用吸尘器</span>
                      </div>
                      <div class="newLive_hostShop_child_label">
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                      </div>
                      <div class="newLive_hostShop_child_price">
                        <div style="margin-right:0.1rem;">
                          <span>￥1999.00</span>
                        </div>
                        <span style="position:relative;color:#000000;">￥1999.00
                            <div class="status_thrid">
                                <div
                                class="status_thrid_box"
                                v-if="true"
                                >
                                <!-- <div
                                class="status_thrid_box"
                                v-if="guigeData.pro_tag == '会员价' || guigeData.pro_tag == '会员折扣'"
                                > -->
                                <span>会员价</span>
                                </div>
                            </div>
                        </span>
                      </div>
                    </div>
                    <div class="newLive_hostShop_child_right">
                      <img src="@/pages/shop/views/live/backend/images/createLive_close.png" alt />
                    </div>
                  </div>
                  <div class="newLive_hostShop_child">
                    <div class="newLive_hostShop_child_left">
                      <img
                        src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png"
                        alt
                      />
                    </div>
                    <div class="newLive_hostShop_child_center">
                      <div class="newLive_hostShop_child_center_title">
                        <span>米家 （MIJIA）扫地机器人 小米扫拖一体机器人 家用吸尘器</span>
                      </div>
                      <div class="newLive_hostShop_child_label">
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                      </div>
                      <div class="newLive_hostShop_child_price">
                        <div style="margin-right:0.1rem;">
                          <span>￥1999.00</span>
                        </div>
                        <span style="position:relative;color:#000000;">￥1999.00
                            <div class="status_thrid">
                                <div
                                class="status_thrid_box"
                                v-if="true"
                                >
                                <!-- <div
                                class="status_thrid_box"
                                v-if="guigeData.pro_tag == '会员价' || guigeData.pro_tag == '会员折扣'"
                                > -->
                                <span>会员价</span>
                                </div>
                            </div>
                        </span>
                      </div>
                    </div>
                    <div class="newLive_hostShop_child_right">
                      <img src="@/pages/shop/views/live/backend/images/createLive_close.png" alt />
                    </div>
                  </div>
                  <div class="newLive_hostShop_child">
                    <div class="newLive_hostShop_child_left">
                      <img
                        src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/groupBuyingBg2.png"
                        alt
                      />
                    </div>
                    <div class="newLive_hostShop_child_center">
                      <div class="newLive_hostShop_child_center_title">
                        <span>米家 （MIJIA）扫地机器人 小米扫拖一体机器人 家用吸尘器</span>
                      </div>
                      <div class="newLive_hostShop_child_label">
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                        <span>满200减30</span>
                      </div>
                      <div class="newLive_hostShop_child_price">
                        <div style="margin-right:0.1rem;">
                          <span>￥1999.00</span>
                        </div>
                        <span style="position:relative;color:#000000;">￥1999.00
                            <div class="status_thrid">
                                <div
                                class="status_thrid_box"
                                v-if="true"
                                >
                                <!-- <div
                                class="status_thrid_box"
                                v-if="guigeData.pro_tag == '会员价' || guigeData.pro_tag == '会员折扣'"
                                > -->
                                <span>会员价</span>
                                </div>
                            </div>
                        </span>
                      </div>
                    </div>
                    <div class="newLive_hostShop_child_right">
                      <img src="@/pages/shop/views/live/backend/images/createLive_close.png" alt />
                    </div>
                  </div>
                </div>
              </div>
              <div class="newLive_hostShop_mainSecod" v-if="false">
                  <div class="newLive_hostShop_mainSecod_left">
                    <div>
                      <img src="@/pages/shop/views/live/backend/images/createLive_time.png" alt=""/>
                    </div>
                    <div>
                      <img src="@/pages/shop/views/live/backend/images/createLive_time.png" alt=""/>
                    </div>
                    <div>
                      <img src="@/pages/shop/views/live/backend/images/createLive_time.png" alt=""/>
                    </div>
                    <div>
                      <img src="@/pages/shop/views/live/backend/images/createLive_time.png" alt=""/>
                    </div>
                  </div>
                  <div class="newLive_hostShop_mainSecod_right">
                    <div class="borderRadio">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <span>共122件</span>
                  </div>
              </div>
              <div class="newLive_hostShop_change"><div>修改</div></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 营销设置 -->
      <div class="marketingSetting">
        <div class="marketingSetting_top">
          <span>营销设置</span>
        </div>
        <div class="marketingSetting_content">
          <div class="marketingSetting_child">
            <div class="marketingSetting_child_left">
              <span>录播回放:</span>
            </div>
            <div class="marketingSetting_child_right">
              <div class="defaultAddress_right">
                    <div @click="selectStatus" :class="valueFlg ? 'marquee marqueeSelect' : 'marquee'">
                        <div :class="valueFlg ? 'marqueeButton marqueeButtonSelect' : 'marqueeButton'"></div>
                        <!-- 关闭 -->
                        <span :class="valueFlg ? 'closeText changeText' : 'closeText'">关闭</span>
                        <!-- 加密 -->
                        <span :class="valueFlg ? 'passwordText changePassword' : ' passwordText'">加密</span>
                    </div>
                </div>
            </div>
          </div>
          <div class="marketingSetting_child">
            <div class="marketingSetting_child_left">
              <span>录播回放:</span>
            </div>
            <div class="marketingSetting_child_right">
              <div class="defaultAddress_right">
                    <div @click="selectStatus" :class="valueFlg ? 'marquee marqueeSelect' : 'marquee'">
                        <div :class="valueFlg ? 'marqueeButton marqueeButtonSelect' : 'marqueeButton'"></div>
                        <!-- 关闭 -->
                        <span :class="valueFlg ? 'closeText changeText' : 'closeText'">关闭</span>
                        <!-- 加密 -->
                        <span :class="valueFlg ? 'passwordText changePassword' : ' passwordText'">加密</span>
                    </div>
                </div>
            </div>
          </div>
          <div class="marketingSetting_child">
            <div class="marketingSetting_child_left">
              <span>直播密码:</span>
            </div>
            <div class="marketingSetting_child_right">
              <input type="text" placeholder="请输入直播6-20位密码">
            </div>
          </div>
        </div>
      </div>
      <!-- 保存按钮 -->
      <div class="saveShelves" ><span>保存并上架</span></div>
      <div class="saveShelves saveShelves2"><span>保存并上架</span></div>

      <Cation :cationType="cationType" @cationTypeFun="udateCation"/>
      <Time :timeType="timeType" @timeTypeFun="updataTime"/>
    </div>
  </div>
</template>

<script>
import Hint from "@/plugins/hint";
// 弹窗组件
import Cation from "@/pages/shop/views/live/backend/components/classification"
import Time from "@/pages/shop/views/live/backend/components/changeTime"
export default {
  name: "introduce",
  components: {
    Cation,
    Time
  },
  data() {
    return {
      showLoading: false,
      pageListTitle: "个人资质认证",
      packUpStatus:0,
      checked:false,
      marketValue:"true",
      valueFlg:false,
      cationType:0,
      timeType:1
    };
  },
  created() {},
  computed: {},
  mounted() {
    let that = this;
  },
  methods: {
      packUpBtn(){
          this.packUpStatus = !this.packUpStatus
      },
      //switch
        selectStatus(){
            this.valueFlg = !this.valueFlg
        },
        cationTypeFun(){
          this.cationType = 1
        },
        // 子传父的值
        udateCation(type){
          this.cationType = type
        },
        // 选择时间
        changeTime(){
          this.timeType = 1
        },
        updataTime(type){
          this.timeType  = type
        }
  }
};
</script>
<style scoped lang="scss">
@import "@/pages/shop/views/live/backend/css/newLive.scss";
</style>

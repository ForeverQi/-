<template>
  <div class="pub-wrapper wrapper" v-if="couponInfo != ''">
    <div class="wrapper_c">
      <div class="max_color"><div class="max_color_c"></div></div>
      <div class="Max_cart">
        <div class="head-tit">
          <a class="return" :href="couponInfo.cardSet.backUrl"
            ><img src="../static/images/return.jpg" alt=""
          /></a>
          <span>会员卡</span>
          <div class="share" @click="shareFun1">
            <img
              src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/share.png"
              alt=""
              srcset=""
            />
          </div>
        </div>
        <div class="cart_head">
          <div
            class="Tips"
            v-if="noshow && couponInfo.cardList.length != 1"
            @click="cookiesshow"
          >
            <img src="../static/images/Tips.png" alt="" />
          </div>
          <div class="cart_black"></div>
          <div class="cart_head_c">
            <div class="cart_banner">
              <div class="swiperbanner_container">
                <van-swipe
                  class="my-swipe"
                  :loop="false"
                  @change="onChange"
                  :show-indicators="false"
                >
                  <van-swipe-item
                    v-for="(item, index) in couponInfo.cardList"
                    :key="index"
                  >
                    <div class="banner_img">
                      <img :src="item.card_bg" alt="" />
                    </div>

                    <div class="vip_info">
                      <div class="vip_txt" :style="{ color: item.card_color }">
                        {{ item.card_name }}
                      </div>
                      <div class="vip_LOGO" v-if="item.card_logo != ''">
                        <img :src="item.card_logo" />
                      </div>
                      <div class="vip_LOGO" v-else>
                        <img src="../static/images/LOGO.png" alt="" />
                      </div>
                      <div
                        class="vip_phone"
                        :style="{ color: item.card_num_color }"
                      >
                        {{ userid }}
                      </div>
                      <div
                        class="vip_list"
                        @click="linkFun"
                        :style="{ color: item.card_num_color }"
                      >
                        {{ Single.notice }} 购买记录>
                      </div>
                    </div>
                  </van-swipe-item>
                </van-swipe>
              </div>
            </div>
            <!-- 一张图片开始 -->
            <!-- <div class="cart_banner" style="padding-left: 0">
              <div class="cart_banner1">
                <img class="active" src="../static/images/cart_img3-2.png" />
                <div class="vip_info1">
                  <div class="vip_txt">钻石银卡</div>
                  <div class="vip_LOGO">
                    <img src="../static/images/LOGO.png" />
                  </div>
                  <div class="vip_phone">400 599 5999</div>
                </div>
              </div>
            </div> -->
            <!-- 一张图片结束 -->
            <div class="cart_tit" v-if="Single.rights">
              <div class="cart_tit_l"></div>
              <div class="cart_tit_c">
                <img src="../static/images/Equity.png" />
              </div>
              <div class="cart_tit_r"></div>
              <div class="cart_equity">会员权益</div>
            </div>
            <div
              class="cart_scroll cart_scroll1"
              v-if="Single.rights.length == 3"
            >
              <div
                class="cart_scroll_li cart_scroll_li1"
                v-for="(item, index) in Single.rights"
                :key="index"
              >
                <a :href="'#maoDian' + index">
                  <div class="cart_scroll_img">
                    <img :src="item.rightsImg" />
                  </div>
                  <div class="cart_scroll_txt">{{ item.showName }}</div>
                </a>
              </div>
            </div>
            <div class="cart_scroll" v-else>
              <div
                class="cart_scroll_li"
                v-for="(item, index) in Single.rights"
                :key="index"
              >
                <a :href="'#maoDian' + index">
                  <div class="cart_scroll_img">
                    <img :src="item.rightsImg" />
                  </div>
                  <div class="cart_scroll_txt">{{ item.showName }}</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- 特权·1 -->

        <div class="Discount1" v-if="Single.proInfo.length">
          <div class="Discount_tit1">
            <div
              class="Discount_page"
              :style="{ background: couponInfo.cardSet.card_color }"
            >
              特权
            </div>
            <div class="Discount_txt">
              购物折扣，最低{{ Single.discount }}折起
            </div>
          </div>
          <div class="Discount1_ul">
            <div
              class="Discount1_li"
              v-for="(miitem, index) in Single.proInfo"
              :key="index"
            >
              <div class="Discount1_head" @click="prolink(miitem)">
                <div class="Discount1_img">
                  <img :src="miitem.propicpath" />
                </div>
                <div
                  class="Discount1_page"
                  :style="{ background: couponInfo.cardSet.card_color }"
                >
                  会员专享{{ Single.discount }}折
                </div>
              </div>
              <div class="Discount1_tit" @click="prolink(miitem)">
                {{ miitem.proname }}
              </div>
              <div class="Discount1_mony">
                <div class="Discount1_vip">会员价</div>
                <div class="Symbol">¥</div>
                <div class="Symbol_int">{{ miitem.discountPrice }}</div>
                <div class="Symbol_int1">¥{{ miitem.prounitprice }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 特权·1 -->
        <!-- 特权2 -->
        <div class="Discount1" v-if="Single.coupon.length">
          <div class="Discount_tit1">
            <div
              class="Discount_page"
              :style="{ background: couponInfo.cardSet.card_color }"
            >
              特权
            </div>
            <div class="Discount_txt">专属优惠券</div>
          </div>
          <div class="Coupon_ul">
            <div
              class="Coupon_li"
              v-for="(item, index) in Single.coupon"
              :key="index"
            >
              <div class="Coupon_li_img">
                <img src="../static/images/cart_bg.png" />
              </div>
              <div class="Coupon_li_con" v-if="item.is_deal != 0">
                <div class="Part_l">
                  <div class="Part_mony">
                    <div class="Part_Symbol">￥</div>
                    <div class="Part_int">{{ item.price }}</div>
                  </div>
                  <div class="Part_txt">{{ item.over_price_text }}</div>
                </div>
                <div class="Part_r">{{ item.scope_of_use }}</div>
              </div>
              <div class="Coupon_li_con" v-else @click="partFun(item)">
                <div class="Part_l">
                  <div class="Part_mony">
                    <div class="Part_Symbol">￥</div>
                    <div class="Part_int">{{ item.price }}</div>
                  </div>
                  <div class="Part_txt">{{ item.over_price_text }}</div>
                </div>
                <div class="Part_r">{{ item.scope_of_use }}</div>
              </div>
              <div class="deal" v-if="item.is_deal != 0">
                <img
                  src="https://aimg8.dlssyht.cn/website/couponNew/quan_lingqu.png"
                  alt=""
                  srcset=""
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 特权2 -->
        <!-- 更多特权 -->
        <div class="more" v-if="Single.rights">
          <div class="cart_tit">
            <div class="cart_tit_l"></div>
            <div class="cart_tit_c">
              <img src="../static/images/Equity.png" />
            </div>
            <div class="cart_tit_r"></div>
            <div class="cart_equity">更多特权</div>
          </div>
          <div class="more_ul">
            <div
              class="more_li"
              v-for="(item, index) in Single.rights"
              :key="index"
            >
              <div :id="'#maoDian' + index">
                <div class="more_li_l">
                  <img :src="item.rightsImg" />
                </div>
                <div class="more_li_r">
                  <div class="more_tit">{{ item.showName }}</div>
                  <div class="more_con">{{ item.rightsDesc }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 更多特权 -->
        <!-- 会员卡说明 -->
        <div class="Explain" v-if="Single.card_explaination">
          <div class="Explain_tit">
            <div class="Explain_bor"></div>
            <div class="Explain_txt">会员卡使用说明</div>
            <div class="Explain_bor1"></div>
          </div>
          <div class="Explain_con" v-html="Single.card_explaination">
          </div>
        </div>
        <!-- 会员卡说明 -->
        <!-- 底部 -->
        <div style="height: 1rem"></div>
        <div class="foot_view">
          <div class="foot_c">
            <div v-if="Single.renew == 1">
              <div v-if="couponInfo.cardSet.is_exchange">
                <div
                  class="foot_l"
                  :style="{ background: couponInfo.cardSet.assist_color }"
                  @click="changeFun"
                >
                  兑换会员卡
                </div>
                <div
                  class="foot_r"
                  :style="{ background: couponInfo.cardSet.card_color }"
                  @click="butFun(Single.buy_money)"
                >
                  <i v-if="Single.buy_money > 0">￥{{ Single.buy_money }}</i>
                  立即续费
                </div>
              </div>
              <div
                class="foot_r"
                :style="{ background: couponInfo.cardSet.card_color }"
                v-else
                @click="butFun(Single.buy_money)"
              >
                立即续费
              </div>
            </div>
            <div
              class="foot_r"
              v-else-if="Single.isEnjoy == 1"
              @click="shareFun1"
              :style="{ background: couponInfo.cardSet.card_color }"
            >
              已尊享，邀请好友得奖励
            </div>
            <div v-else>
              <div v-if="couponInfo.cardSet.is_exchange">
                <div
                  class="foot_l"
                  :style="{ background: couponInfo.cardSet.assist_color }"
                  @click="changeFun"
                >
                  兑换会员卡
                </div>
                <div
                  class="foot_r"
                  :style="{ background: couponInfo.cardSet.card_color }"
                  @click="butFun(Single.buy_money)"
                  v-if="Single.buy_money > 0"
                >
                  ￥{{ Single.buy_money }} 立即领取
                </div>
                <div
                  class="foot_r"
                  :style="{ background: couponInfo.cardSet.card_color }"
                  @click="butFun(Single.buy_money)"
                  v-else
                >
                  免费领取
                </div>
              </div>
              <div v-else>
                <div
                  class="foot_r"
                  v-if="Single.buy_money > 0"
                  :style="{ background: couponInfo.cardSet.card_color }"
                  @click="butFun(Single.buy_money)"
                >
                  ￥{{ Single.buy_money }} 立即领取
                </div>
                <div
                  class="foot_r"
                  v-else
                  :style="{ background: couponInfo.cardSet.card_color }"
                  @click="butFun(Single.buy_money)"
                >
                  免费领取
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="foot_c">
            <div class="foot_txt">会员卡开启失败，请联系商家处理！</div>
          </div> -->
        </div>
        <!-- 底部 -->
        <!-- 兑换弹窗开始 -->
        <div class="hide_view" v-if="exchange == true">
          <div class="bg_color"></div>
          <div class="exchange_cart">
            <div class="ex_cart_tit">兑换会员卡</div>
            <div class="ex_cart_input">
              <input placeholder="请输入兑换码" v-model="txtinput" />
            </div>
            <div class="button_red button_OK1" @click="okchangeFun(1)">
              确定兑换
            </div>
            <div class="button_red button_OK2" @click="nochange(1)">
              暂不兑换
            </div>
          </div>
        </div>
        <!-- 兑换弹窗结束 -->
        <!-- 填写资料弹窗开始 -->
        <!-- <div class="hide_view" v-if="exchange1 == false">
          <div class="bg_color"></div>
          <div class="exchange">
            <div class="exchange1">
              <div class="ex_txt1">请先完善资料！</div>
            </div>
            <div class="exchange_bottom">
              <div class="botton_li1">确定</div>
            </div>
          </div>
        </div> -->
        <!-- 填写资料弹窗结束 -->
        <!-- 提示弹窗开始 -->
        <div class="hide_view" v-if="exchange2 == true">
          <div class="bg_color1"></div>
          <div class="exchange">
            <div class="exchange1">
              <div class="ex_txt">
                您输入的兑换码可兑换“{{ exname }}”，是否进行兑换？
              </div>
            </div>
            <div class="exchange_bottom">
              <div class="botton_li" @click="nochange(2)">暂不兑换</div>
              <div class="botton_li" v-if="isclick == true" @click="okchangeFun(2)">确定兑换</div>
              <div class="botton_li" v-else>确定兑换</div>
            </div>
          </div>
        </div>
        <!-- 提示弹窗结束 -->
        <!-- 海报开始 -->
        <div class="hide_view" v-if="exchange3 == true">
          <div class="bg_color"></div>
          <div class="bottom_alert">
            <div class="bottom_tit">保存图片到手机发送给您的好友</div>
            <div class="bottom_con">
              <!-- <div class="bottom_li" @click="FriendsFun">
                <div class="bottom_li_img">
                  <img src="../static/images/bottom_img2.png" />
                </div>
                <div class="bottom_li_txt">分享给好友</div>
              </div> -->
              <div class="bottom_li" @click="phoneFun">
                <div class="bottom_li_img">
                  <img src="../static/images/bottom_img1.png" />
                </div>
                <div class="bottom_li_txt">保存到手机</div>
              </div>


            </div>
            <div class="bottom_a" @click="exchange3 = false">关闭</div>
          </div>
          <div class="center">
            <div class="center_bg">
              <img mode="widtgFix" :src="wap_img_src" />
            </div>
          </div>
        </div>
        <!-- 海报结束 -->
        <!-- 发送给朋友 -->
        <div class="sahreFriends" v-if="shareIns" @click.stop="shareInsClick">
          <div class="sahreFriends_box">
            <!-- 文字 -->
            <div class="sahreFriends_box_content">
              <span
                >点击右上角,选择<span style="color: #ff8125">"发送给朋友"</span
                >将会员卡分享给您的好友</span
              >
            </div>
            <!-- 指向分享的图片 -->
            <div class="sahreFriends_box_shareImg">
              <img
                src="@/pages/shop/static/images/video/videoJiantou.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <!-- 提示 -->
        <div class="tishi" v-if="tishitxt">购买成功</div>
        <div class="tishi1" v-if="tishitxt1">长按会员卡，保存到相册</div>
      </div>
    </div>
  </div>
</template>

<script>
//轮播效果
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import md5 from "js-md5";
//接口
import {
  Vipcardindex,
  wxLogin,
  checkCode,
  getShareImg,
  updateFxParent,
} from "@/api/vipCartMarketing/MarketingIndex.js";

// vant组件
import Hint from "@/plugins/hint";
import util from "@/libs/util";
export default {
  data() {
    return {
      couponInfo: "",
      cardId: "",
      current: 0,
      listindex: 0,
      Single: {},
      userid: "",
      exchange: false,
      exchange2: false,
      exchange3: false,
      txtinput: "",
      // 发送给朋友
      shareIns: false,
      tishitxt: false,
      tishitxt1: false,
      exname: "",
      noshow: true,
      isclick:true,
    };
  },
  mounted() {
    let that = this;
    that.VipcardindexFun();

    if (!this.$cookies.get("zz_userid")) {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.wxLoginFun();
      }
    }
  },
  methods: {
    wxLoginFun() {
      let that = this;
      let paramJson = {
        username: that.$route.query.username,
        member_id: that.$route.query.member_id
          ? that.$route.query.member_id
          : that.$cookies.get("member_id"),
        code: that.$route.query.code == "" ? "" : that.$route.query.code,
        real_host: window.location.host,
        isOauth: that.$route.query.isOauth ? that.$route.query.isOauth : 0,
      };
      wxLogin(paramJson)
        .then((res) => {
          //成功
          if (res.wxOauthUrl != "") {
            window.location.href = res.wxOauthUrl;
          }
        })
        .catch((err) => {
          //失败
        });
    },
    cookiesshow() {
      this.noshow = false;
      this.$cookies.set("getcookiesTime", 1, this.couponInfo.cookieTime, "/");
    },
    VipcardindexFun() {
      let that = this;
      let paramJson = {
        username: that.$route.query.username,
      };
      Vipcardindex(paramJson)
        .then((res) => {
          //成功
          if (that.$cookies.get("getcookiesTime")) {
            that.noshow = false; //隐藏
          } else {
            that.noshow = true; //显示
          }
          that.couponInfo = res;
          that.cardId = that.couponInfo.cardList[0].id;
          that.Single = that.couponInfo.cardList[that.listindex];
          that.userid = that.$cookies.get("zz_userid")
            ? that.$cookies.get("zz_userid")
            : "0000000";
          if (that.$route.query.code && that.$route.query.member_id) {
            let md5code = md5(
              that.$route.query.member_id + "*" + that.$route.query.user_id
            );
            if (that.$route.query.code == md5code) {
              this.$cookies.set(
                "member_id",
                that.$route.query.member_id + "###" + that.$route.query.code,
                3600 * 24 * 14,
                "/"
              );
              if (that.couponInfo.cardSet.shareRatioSet) {
                this.$cookies.set(
                  "share_member_id",
                  that.$route.query.member_id,
                  3600 * 24,
                  "/"
                );
              }
              if (that.$cookies.get("zz_userid")) {
                updateFxParent({
                  zz_userid: that.$cookies.get("zz_userid"),
                  member_id: that.$route.query.member_id,
                  username: that.$route.query.username,
                }).then((res) => {});
              }
            }
          }
        })
        .catch((err) => {
          //失败
        });
    },
    onChange(index) {
      let that = this;
      that.listindex = index;
      that.Single = that.couponInfo.cardList[that.listindex];
      that.cardId = that.Single.id;
    },
    //页面提交
    butFun(e) {
      //判断金额，0 直接提交订单，  否则  正常提交
      let that = this;
      if (that.$cookies.get("zz_userid")) {
        if (that.Single.show_buyer == 1) {
          this.$router.push({
            path: `vipInfo?username=${that.$route.query.username}&cardId=${that.cardId}&mony=${e}`,
          });
        } else {
          if (e > 0) {
            this.$router.push({
              path: `/order/submitOrder/index?username=${that.$route.query.username}&req={"order_type":7,"orderParams":{"id":${that.cardId}}}`,
            });
          } else {
            let paramJson = {
              payment_info_val: "on",
              payment_id: -1,
              pay_money: 0,
              share_member_id: that.$cookies.get("share_member_id"),
              order_type: 7,
              orderParams: { id: that.cardId },
            };
            let maxparamJson = {
              req: JSON.stringify(paramJson),
              username: that.$route.query.username,
              zz_userid: that.$cookies.get("zz_userid"),
              client_type: 1,
              wap: 1,
            };
            this.generate(maxparamJson);
          }
        }
      } else {
        window.location.href =
          window.location.origin +
          "/dom/denglu.php?username=" +
          that.$route.query.username +
          "&wap=1";
      }
    },
    //兑换弹窗显示
    changeFun() {
      let that = this;
      if (this.$cookies.get("zz_userid")) {
        that.exchange = true;
      } else {
        window.location.href =
          window.location.origin +
          "/dom/denglu.php?username=" +
          that.$route.query.username +
          "&wap=1";
      }
    },
    nochange(e) {
      if (e == 1) {
        this.exchange = false;
        this.txtinput = "";
      } else {
        this.exchange2 = false;
        this.txtinput = "";
      }
    },
    //确定兑换
    okchangeFun(e) {
      let that = this;
      if (e == 1) {
        if (that.txtinput != "") {
          let paramJson = {
            vipCode: that.txtinput,
            cardId: that.Single.id,
            username: that.$route.query.username,
            zz_userid: that.$cookies.get("zz_userid"),
            zz_shellCode: that.$cookies.get("zz_shellCode"),
          };
          checkCode(paramJson)
            .then((res) => {
              that.exchange2 = true;
              that.exname = res;
            })
            .catch((err) => {
              //失败
              this.txtinput = "";
            });
        }
      } else {
        //会员卡兑换
        this.isclick= false
        let paramJson = {
          payment_info_val: "on",
          payment_id: -1,
          pay_money: 0,
          share_member_id: that.$cookies.get("share_member_id"),
          order_type: 7,
          orderParams: { id: that.cardId, member_vip_code: that.txtinput },
        };
        let maxparamJson = {
          req: JSON.stringify(paramJson),
          username: that.$route.query.username,
          zz_userid: that.$cookies.get("zz_userid"),
          client_type: 1,
          wap: 1,
        };
        this.generate(maxparamJson);
      }
    },

    generate(reqval) {
      let that = this;
      that.$F.Response({
        url: "xiaochengxu/order/order_submit.php",
        param: reqval,
        success: (res) => {
          if (res.code == 200) {
            that.exchange = false;
            that.exchange2 = false;
            that.tishitxt = true;
            setTimeout(function () {
              that.tishitxt = false;
            }, 1500);
            F.isclick= true
            that.VipcardindexFun();
          }else{
            that.showLoading = false;
            Hint.Alert({
              message: res.msg,
            }).then(() => {});
            that.isclick = true;
          }
        },
        error: (err) => {
          that.showLoading = false;
          Hint.Alert({
            message: "请求失败",
          }).then(() => {
            that.isclick = true;
          });
          
        },
      });
    },
    //购买记录跳转
    linkFun() {
      let that = this;
      if (that.$cookies.get("zz_userid")) {
        that.$router.push({
          path: `list?username=${that.$route.query.username}`,
        });
      } else {
        window.location.href =
          window.location.origin +
          "/dom/denglu.php?username=" +
          that.$route.query.username +
          "&wap=1";
      }
    },
    //产品跳转
    prolink(e) {
      window.location.href = window.location.origin + e.link;
    },
    partFun(e) {
      window.location.href = window.location.origin + e.link;
    },
    shareFun1() {
      let that = this;
      if (that.$cookies.get("is_app")) {
        that.exchange3 = false
        let title = that.couponInfo.shareData.shareTitle;
        let shareDesc = that.couponInfo.shareData.shareDesc;
        let shareUrl =
          window.location.origin + that.couponInfo.shareData.shareUrl;
        let shareImg = that.couponInfo.shareData.shareImg;
        if (that.$cookies.get("ios")) {
          // ios
          that.app_share_fn_ios(title, shareUrl, shareDesc, shareImg);
        } else {
          //安卓
          that.app_share_fn_android(title, shareUrl, shareDesc, shareImg);
        }
      } else {

        let paramJson = {
          id: that.Single.id,
          rights_num: that.Single.rights_num,
          type: 0,
          username: that.$route.query.username,
          zz_userid: that.$cookies.get("zz_userid"),
          zz_shellCode: that.$cookies.get("zz_shellCode"),
        };
        getShareImg(paramJson)
          .then((res) => {
            this.exchange3 = true;
            this.wap_img_src = res.wap_img_src;
          })
          .catch((err) => {
            //失败
          });
      }
    },
    // IOS分享
    app_share_fn_ios(title, url, con, pic) {
      if (!con) con = title;
      var info =
        '{"title":"' +
        title +
        '","url":"' +
        url +
        '","con":"' +
        cobn +
        '","pic":"' +
        pic +
        '"}';
      normalShare(info);
    },
    // 安卓分享
    app_share_fn_android(title, url, con, pic) {
      if (!con) con = title;
      window.android.share(title, con, pic, url);
    },
    // 分享好友
    FriendsFun() {
      this.shareFun();
      this.shareIns = true;
    },
    //
    shareInsClick() {
      this.shareIns = false;
    },
    // 微信分享
    shareFun() {
      let href = location.href;
      util.wechat.share(
        this.wxRegCallback,
        href,
        this.$route.query.username,
        1
      );
    },
    // 微信分享
    wxRegCallback(data) {
      // 用于微信JS-SDK回调
      this.shareInfo = {
        title: this.couponInfo.shareData.shareTitle,
        desc: this.couponInfo.shareData.shareDesc,
        link: window.location.origin + this.couponInfo.shareData.shareUrl,
        imgUrl: this.couponInfo.shareData.shareImg,
      };
      this.wxShareTimeline();
      this.wxShareAppMessage();
    },
    wxShareTimeline() {
      // 微信自定义分享到朋友圈
      let option = {
        title: this.shareInfo.title, // 分享标题, 请自行替换
        link: this.shareInfo.link, // 分享链接，根据自身项目决定是否需要split
        imgUrl: this.shareInfo.imgUrl, // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert("分享成功");
        },
        error: () => {
          alert("已取消分享");
        },
      };
      // 将配置注入通用方法
      util.wechat.ShareTimeline(option);
    },
    wxShareAppMessage() {
      let that = this;
      // 微信自定义分享给朋友
      let option = {
        title: this.shareInfo.title, // 分享标题, 请自行替换
        desc: this.shareInfo.desc, // 分享描述, 请自行替换
        // link: this.shareInfo.link + "&app=0", // 分享链接，根据自身项目决定是否需要split
        link: this.shareInfo.link, // 分享链接，根据自身项目决定是否需要split
        imgUrl: this.shareInfo.imgUrl, // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert("分享成功");
        },
        error: () => {
          alert("已取消分享");
        },
      };
      // 将配置注入通用方法
      util.wechat.ShareAppMessage(option);
    },
    phoneFun() {
      let that = this;
      that.tishitxt1 = true;
      setTimeout(function () {
        that.tishitxt1 = false;
      }, 1500);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/pages/vipCartMarketing/static/css/vipCart-style.scss";
.van-swipe-item {
  height: 4.09rem;
  padding: 0rem 0.4rem;
}
.banner_img {
  width: 100%;
  height: 4.09rem;
  border-radius: 0.2rem;
  overflow: hidden;
}
.my-swipe {
  .banner_img img {
    width: 100%;
  }
}
.foot_txt {
  width: 100%;
  text-align: center;
  font-size: 0.28rem;
  color: #555;
  line-height: 1rem;
}
.my-swipe .van-swipe__indicators {
  display: none !important;
}
.vip_list {
  color: #fff;
  margin-right: 0.54rem;
  font-size: 0.24rem;
  text-align: right;
}
.head-tit {
  width: 100%;
  height: 0.88rem;
  background: #fff;
  border-bottom: 1px solid #ededed;
}
.head-tit span {
  font-size: 0.32rem;
  color: #222;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  line-height: 0.88rem;
  text-align: center;
  top: 0;
  width: 50%;
}
.return {
  display: block;
  width: 0.21rem;
  height: 0.38rem;
  padding: 0.24rem 0.25rem;
  box-sizing: initial;
}
.return img {
  display: block;
  width: 0.21rem;
  height: 0.38rem;
}
.share {
  float: right;
  width: 0.36rem;
  height: 0.36rem;
  padding: 0.26rem 0.25rem;
  -webkit-box-sizing: initial;
  box-sizing: initial;
  position: absolute;
  top: 0;
  right: 0;
}
.share img {
  width: 100%;
  display: block;
}
// 分享给好友
.sahreFriends {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 300;
  background: rgba(0, 0, 0, 0.8);
  .sahreFriends_box {
    position: relative;
    widows: 100%;
    height: 100%;
    .sahreFriends_box_content {
      width: 5.6rem;
      height: 2.65rem;
      border: 2px dashed rgba(255, 255, 255, 0.5);
      border-radius: 0.19rem;
      position: absolute;
      top: 1.86rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.32rem;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 0.53rem;
      padding-right: 0.53rem;
      box-sizing: border-box;
    }
    .sahreFriends_box_shareImg {
      position: absolute;
      top: 0.34rem;
      right: 0.13rem;
      width: 1.34rem;
      height: 1.34rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.tishi {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.15rem 0;
  border-radius: 0.2rem;
  color: #fff;
  font-size: 0.24rem;
  left: 50%;
  top: 50%;
  right: 0;
  width: 2.5rem;
  text-align: center;
  transform: translate(-50%, -50%);
}
.tishi1 {
  position: fixed;
  background: rgba(0, 0, 0, 1);
  padding: 0.15rem 0;
  border-radius: 0.2rem;
  color: #fff;
  font-size: 0.24rem;
  left: 50%;
  top: 50%;
  right: 0;
  width: 4rem;
  text-align: center;
  transform: translate(-50%, -50%);
  z-index: 100;
}
.Tips {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  z-index: 1000;
}
.Tips img {
  width: 100%;
  margin-top: 2rem;
}
</style>
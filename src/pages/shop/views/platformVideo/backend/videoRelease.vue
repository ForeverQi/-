<template>
  <div id="certification" v-wechat-title="$route.meta.title= pageListTitle">
    <van-loading v-if="showLoading" size="50px" color="#1989fa" />
    <van-overlay :show="showLoading" />
    <div class="videoRelease" id="videoRelease">
      <div class="videoRelease_top">
        <div class="searchNoteTop">
          <div class="searchNoteTop_left">
            <div class="voerTop_menuLeft">
              <span></span>
            </div>
          </div>
        </div>
        <div class="videoRelease_top_content">
            <div class="videoRelease_shop_left">
                <img src="@/pages/shop/views/platformVideo/frontend/images/platform_cardNumber.png"/>
            </div>
            <div class="videoRelease_shop_center">
                <div>
                    <span>商铺或者个人名称商铺或者个人名称商铺或者个人名称商铺或者个人名称</span>
                </div>
                <div>
                    <span>ID：23233999</span>
                </div>
            </div>
            <div class="videoRelease_shop_right">
                <img src="@/pages/shop/views/platformVideo/frontend/images/platform_cardNumber.png"/>
            </div>
        </div>
      </div>
      <!-- 导航菜单 -->
      <div class="videoRelease_menu">
          <div class="videoRelease_menu_left">
              <span class="checkMenu">视频</span>
              <span>商品</span>
              <span>订单</span>
              <span>结算</span>
              <span>账单</span>
          </div>
          <div class="videoRelease_menu_right">
              <img src="@/pages/shop/views/platformVideo/frontend/images/platform_tv.png"/>
          </div>
      </div>
      <!-- 发布商品 -->
      <div class="videoRelease_fabu">
          <div class="videoRelease_menu_box">
              <div class="videoRelease_menu_boxTop">
                <div class="videoRelease_title_left">
                    <span>我的商品</span>
                    <span>在售3个商品</span>
                </div>
                <div class="videoRelease_title_right">
                    <button>发布 <img src="@/pages/shop/views/platformVideo/frontend/images/plus.png" alt=""/></button>
                    <button>管理 <img src="@/pages/shop/views/platformVideo/frontend/images/platForm_ management.png" alt=""/></button>
                </div>
              </div>
              <div class="videoRelease_menu_boxContent">
                  <div class="videoRelease_boxContent_children">
                      <div class="myShop_left">
                          <img src="@/pages/shop/views/platformVideo/frontend/images/platform_cardNumber.png" alt=""/>
                      </div>
                      <div class="myShop_right">
                          <div class="myShop_right_top">
                              <span>超级蛋黄夹心面包</span>
                          </div>
                          <div class="myShop_right_center">
                              <span>售价：¥63</span>
                              <span>库存：300件／剩余89件</span>
                              <span>订单数：3435件</span>
                          </div>
                          <div class="myShop_right_bottom">
                              <span>编辑</span>
                              <span>上架/下架</span>
                          </div>
                      </div>
                  </div>
                  <div class="videoRelease_boxContent_children">
                      <div class="myShop_left">
                          <img src="@/pages/shop/views/platformVideo/frontend/images/platform_cardNumber.png" alt=""/>
                      </div>
                      <div class="myShop_right">
                          <div class="myShop_right_top">
                              <span>超级蛋黄夹心面包</span>
                          </div>
                          <div class="myShop_right_center">
                              <span>售价：¥63</span>
                              <span>库存：300件／剩余89件</span>
                              <span>订单数：3435件</span>
                          </div>
                          <div class="myShop_right_bottom">
                              <span>编辑</span>
                              <span>上架/下架</span>
                          </div>
                      </div>
                  </div>
                  <div class="videoRelease_boxContent_children">
                      <div class="myShop_left">
                          <img src="@/pages/shop/views/platformVideo/frontend/images/platform_cardNumber.png" alt=""/>
                      </div>
                      <div class="myShop_right">
                          <div class="myShop_right_top">
                              <span>超级蛋黄夹心面包</span>
                          </div>
                          <div class="myShop_right_center">
                              <span>售价：¥63</span>
                              <span>库存：300件／剩余89件</span>
                              <span>订单数：3435件</span>
                          </div>
                          <div class="myShop_right_bottom">
                              <span>编辑</span>
                              <span>上架/下架</span>
                          </div>
                      </div>
                  </div>
                  <div class="videoRelease_boxContent_children">
                      <div class="myShop_left">
                          <img src="@/pages/shop/views/platformVideo/frontend/images/platform_cardNumber.png" alt=""/>
                      </div>
                      <div class="myShop_right">
                          <div class="myShop_right_top">
                              <span>超级蛋黄夹心面包</span>
                          </div>
                          <div class="myShop_right_center">
                              <span>售价：¥63</span>
                              <span>库存：300件／剩余89件</span>
                              <span>订单数：3435件</span>
                          </div>
                          <div class="myShop_right_bottom">
                              <span>编辑</span>
                              <span>上架/下架</span>
                          </div>
                      </div>
                  </div>
                  <div class="videoRelease_boxContent_children">
                      <div class="myShop_left">
                          <img src="@/pages/shop/views/platformVideo/frontend/images/platform_cardNumber.png" alt=""/>
                      </div>
                      <div class="myShop_right">
                          <div class="myShop_right_top">
                              <span>超级蛋黄夹心面包</span>
                          </div>
                          <div class="myShop_right_center">
                              <span>售价：¥63</span>
                              <span>库存：300件／剩余89件</span>
                              <span>订单数：3435件</span>
                          </div>
                          <div class="myShop_right_bottom">
                              <span>编辑</span>
                              <span>上架/下架</span>
                          </div>
                      </div>
                  </div>
                  <div class="videoRelease_boxContent_children">
                      <div class="myShop_left">
                          <img src="@/pages/shop/views/platformVideo/frontend/images/platform_cardNumber.png" alt=""/>
                      </div>
                      <div class="myShop_right">
                          <div class="myShop_right_top">
                              <span>超级蛋黄夹心面包</span>
                          </div>
                          <div class="myShop_right_center">
                              <span>售价：¥63</span>
                              <span>库存：300件／剩余89件</span>
                              <span>订单数：3435件</span>
                          </div>
                          <div class="myShop_right_bottom">
                              <span>编辑</span>
                              <span>上架/下架</span>
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
      psgeNum:1,
      page_num:0
    };
  },
  created() {},
  computed: {
      
  },
  mounted() {
      let that = this
      $("#videoRelease").scroll(function() {
      var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
      var nScrollTop = 0; //滚动到的当前位置
      var nDivHight = $("#videoRelease").height();
      nScrollHight = $(this)[0].scrollHeight;
      nScrollTop = $(this)[0].scrollTop;
      if (nScrollTop + nDivHight >= nScrollHight) {
        let psgeNum = that.psgeNum;
        psgeNum = Number(psgeNum) + 1;
        if (psgeNum > that.page_num) {
          return false;
        }
        // that.videeListFun(psgeNum);
      }
    });
  },
  methods: {}
};
</script>

<style scoped lang="scss">
@import "@/pages/shop/views/platformVideo/backend/css/videoRelease.scss";
</style>

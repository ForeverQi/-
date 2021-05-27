<template>
  <div id="certification" v-wechat-title="$route.meta.title= pageListTitle">
    <van-loading v-if="showLoading" size="50px" color="#1989fa" />
    <van-overlay :show="showLoading" />
    <div class="certification">
      <div class="searchNoteTop">
        <div class="searchNoteTop_left">
          <div class="voerTop_menuLeft">
            <span></span>
          </div>
        </div>
        <div class="searchNoteTop_right">
          <span>个人资质认证</span>
        </div>
      </div>
      <div class="certification_box">
        <div class="certification_title">
          <span class="title_style">完善实名信息</span>
          <span>已认证/未认证/认证中请完善信息,完善实名信息验证后 才可以开通</span>
        </div>
        <div class="certification_box_top">
          <!-- 姓名 -->
          <div class="certification_name">
            <span class="title_style">姓名</span>
            <input type="text" placeholder="请输入姓名" />
          </div>
          <!-- 身份证号 -->
          <div class="certification_name certification_lastName">
            <span class="title_style">本人身份证号</span>
            <input type="text" placeholder="请输入本人身份证号" />
          </div>
          <!-- 身份证号 -->
          <div class="certification_name certification_lastName">
            <span class="title_style">公司名称</span>
            <input type="text" placeholder="请输入公司姓名" />
          </div>
          <!-- 上传身份证号 -->
          <div class="cardNumber">
            <div class="cardNumber_box">
              <img src="@/pages/shop/views/platformVideo/frontend/images/platform_cardNumber.png" />
              <div class="cardNumber_box_title">
                <div class="cardNumber_title_left">
                  <img src="@/pages/shop/views/platformVideo/frontend/images/platform_plus.png" />
                </div>
                <div class="cardNumber_title_right">
                  <span>身份证正面图</span>
                </div>
              </div>
            </div>
            <div class="cardNumber_box">
              <img src="@/pages/shop/views/platformVideo/frontend/images/platform_cardNumber.png" />
              <div class="cardNumber_box_title">
                <div class="cardNumber_title_left">
                  <img src="@/pages/shop/views/platformVideo/frontend/images/platform_plus.png" />
                </div>
                <div class="cardNumber_title_right">
                  <span>身份证反面图</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="certification_content">
        <div class="certification_content_title">
          <span class="info">小店信息</span>
          <div class="certification_content_div">
            <span>小店名称</span>
            <input type="text" placeholder="请输入小店名称" />
          </div>
        </div>
        <div class="certification_imgFile">
          <div class="imgFile_title">
            <span>小店门头</span>
          </div>
          <div class="imgFile_box">
            <div class="imgFile_box_child">
              <div class="imgFile_box_child_file">
                <img src="@/pages/shop/views/platformVideo/frontend/images/platform_fileUp.png"/>
                <input class="upFile" type="file" />
              </div>
            </div>
            <div class="imgFile_box_child">
              <img
                src="@/pages/shop/views/platformVideo/frontend/images/platform_personal.png"
                alt
              />
            </div>
            <div class="imgFile_box_child">
              <img
                src="@/pages/shop/views/platformVideo/frontend/images/platform_personal.png"
                alt
              />
            </div>
            <div class="imgFile_box_child">
              <img
                src="@/pages/shop/views/platformVideo/frontend/images/platform_personal.png"
                alt
              />
            </div>
            <div class="imgFile_box_child">
              <img
                src="@/pages/shop/views/platformVideo/frontend/images/platform_personal.png"
                alt
              />
            </div>
          </div>
          <div class="shopName">
            <div class="shopName_left">
              <span>小店地址</span>
            </div>
            <div class="shopName_right">
              <input type="text" placeholder="请设置小店地址" />
              <img src="@/pages/shop/views/platformVideo/frontend/images/plartform_rightArrow.png" alt="">
            </div>
          </div>
          <div class="shopName">
            <div class="shopName_left">
              <span>联系人</span>
            </div>
            <div class="shopName_right">
              <input style="padding-right:0;" type="text" placeholder="请设置小店地址" />
            </div>
          </div>

          <div class="nextButton">
            <button class="nextButtonSuccess">下一步</button>
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
      pageListTitle:'个人资质认证'
    };
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
@import "@/pages/shop/views/platformVideo/backend/css/certification.scss";
</style>

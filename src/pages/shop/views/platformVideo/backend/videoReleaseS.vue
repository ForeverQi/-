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
          <span>发布商品</span>
        </div>
      </div>
      <div class="certification_box">
        <div class="release_box_title">
            <span><span class="release_box_num">2/3</span> 选择商品类型</span>
          </div>
        <div class="certification_box_top">
          <!-- 商品名称 -->
          <div class="certification_name">
            <div class="certification_nameNumer">
              <span class="title_style">商品名称</span>
              <span class="title_style_num"><span style="color:#FF9F16;">{{ nameNum }}</span>/20</span>
            </div>
            <input type="text" maxlength="20" placeholder="请输入商品名称" @input="shapNameFun" v-model="nameNum_length"/>
          </div>
        </div>
        <div class="certification_title">
          <div class="certification_titleNumber">
            <span class="title_style">商品描述</span>
            <span style="color:#C5C5C5;">{{ descNum }}/200</span>
          </div>
          <!-- <textarea placeholder="对商品进行摘要描述，重点说明商品的优势特点等" @input="descNumFun" v-model="descNumModel"></textarea> -->
          <div class="certification_title_father" contenteditable="true"><span style="z-index:1;">{{descNumModel}}</span>
            <textarea class="certification_title_child" maxlength="200" @input="descNumFun" v-model="descNumModel" placeholder="对商品进行摘要描述，重点说明商品的优势特点等"></textarea>
          </div>
          
        </div>
      </div>
      <div class="certification_content">
        <div class="certification_imgFile">
          <div class="imgFile_title">
            <span>商品图片</span>
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
              <span>商品售价</span>
            </div>
            <div class="shopName_right">
              <!-- <input type="text" placeholder="请设置小店地址" /> -->
              <img src="@/pages/shop/views/platformVideo/frontend/images/plartform_rightArrow.png" alt="">
            </div>
          </div>
          <div class="shopName shopName_inventory shopName_inventory_top">
            <div class="shopName_left">
              <span>库存</span>
            </div>
            <div class="shopName_right">
              <input style="padding-right:0;" type="text" placeholder="请输入商品数量"/>
            </div>
          </div>
          <div class="shopName shopName_inventory">
            <div class="shopName_left">
              <span>类目</span>
            </div>
            <div class="shopName_right">
              <input type="text" placeholder="请选择商品类目" readonly="true" />
              <img src="@/pages/shop/views/platformVideo/frontend/images/plartform_rightArrow.png" alt=""/>
            </div>
          </div>
          <div class="shopName shopName_inventory">
            <div class="shopName_left">
              <span>交付方式</span>
            </div>
            <div class="shopName_right">
              <div @click="payWayClick(1)">
                <img v-if="payWay" src="@/pages/shop/views/platformVideo/frontend/images/platform_distribution1.png" alt=""/>
                <img v-if="!payWay" src="@/pages/shop/views/platformVideo/frontend/images/platform_distribution2.png" alt=""/>
                <span>配送到家</span>
              </div>
              <div @click="payWayClick(2)">
                <img v-if="!payWay" src="@/pages/shop/views/platformVideo/frontend/images/platform_distribution1.png" alt=""/>
                <img v-if="payWay" src="@/pages/shop/views/platformVideo/frontend/images/platform_distribution2.png" alt=""/>
                <span>到家消费</span>
              </div>
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
      pageListTitle:'个人资质认证',
      nameNum:0,
      nameNum_length:'',
      descNum:0,
      descNumModel:'',
      payWay:0
    };
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    shapNameFun(){
      this.nameNum = this.nameNum_length.length
    },
    descNumFun(){
        this.descNum = this.descNumModel.length
    },
    payWayClick(num){
      if(num == 1){
        this.payWay = 0
      }else if(num == 2){
        this.payWay = 1
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/pages/shop/views/platformVideo/backend/css/videoReleaseS.scss";

</style>

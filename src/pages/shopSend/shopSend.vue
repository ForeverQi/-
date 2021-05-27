<template>
  <div class="send_warper ev_page">
    <van-nav-bar title="商品发布" left-arrow @click-left="onClickLeft" />
    <!-- 上传图片 -->
    <div :class="imgList.length === 0 ? 'sd_loadBox flex_center' : 'sd_loadBox'  ">
      <span class="loaderBox" v-for="(item,index) in imgList" @click="setIndex(index)">
        <van-uploader :after-read="uploadImg" :key="index">
          <van-image fit="cover" class="loadImg borderSolid" :src="item"></van-image>
        </van-uploader>
        <van-icon @click="deleteImg(index)" name="clear" class="close_img" color="#FF352B" />
      </span>
      <van-uploader v-if="imgList.length < 6" :after-read="uploadImg" class="verticalTop">
        <div :class="imgList.length === 0 ? 'load_icon1 flex_center' : 'load_icon flex_center'">
          <div>
            <img src="@/assets/images/shopSend/37.png" />
            <p>上传图片</p>
          </div>
        </div>
      </van-uploader>
    </div>
    <!-- 上传视频 -->
    <div class="sd_loadBox flex_center">
      <van-uploader :after-read="uploadVideo" accept="video/*">
        <div v-if="!videoList[0]" class="load_icon1 flex_center">
          <div>
            <img src="@/assets/images/shopSend/37.png" />
            <p>上传视频</p>
          </div>
        </div>
        <div v-else>{{videoList[0].name}}</div>
      </van-uploader>
    </div>
    <!-- 商品分类 -->
    <div @click="showClassFly = true" class="_row mb_20 flex_rowBetwen">
      <span class="_title">商品分类</span>
      <span class="flex_center">
        <span class="_rightInfo">未设置</span>
        <img class="toleft" src="@/assets/images/shopSend/toleft.png" />
      </span>
    </div>
    <!-- 商品名称 -->
    <div class=" _row mb_20 _title_box brder_b">
      <span class="_title ">商品名称</span>
      <input class="input" type="text" placeholder="请输入商品名称" />
    </div>
    <!-- 商品规格 -->
    <div class="mb_20">
      <!-- 未添加状态 -->
      <div v-if="state == 1">
        <div class=" _row _title_box brder_b">
          <span class="_title ">商品售价</span>
          <input class="input" type="text" placeholder="请输入商品售价" />
        </div>
        <div class=" _row _title_box brder_b">
          <span class="_title ">商品原价</span>
          <input class="input" type="text" placeholder="请输入商品原价" />
        </div>
        <div class=" _row _title_box brder_b">
          <span class="_title ">商品成本</span>
          <input class="input" type="text" placeholder="请输入商品成本" />
        </div>
        <div class=" _row _title_box brder_b">
          <span class="_title ">商品库存</span>
          <input class="input" type="text" placeholder="请输入商品库存数量" />
        </div>
        <div @click="showSpec = true" class=" _row  flex_center _title_box brder_b">
          <div class="p_btn">
            <img class="_icon" src="@/assets/images/shopSend/add42.png" />
            添加选项
          </div>
        </div>
      </div>
      <!-- 选择之后状态 -->
      <div v-if="state == 2">
        <div class="_row _title_box flex_rowBetwen brder_b">
          <span class="flex_center">颜色尺寸</span>
          <span class="flex_center">
            <img class="toleft" src="@/assets/images/shopSend/toleft.png" />
          </span>
        </div>
        <div v-for=" (item,index) in list" :key="item.id" class="_rowBox">
          <div @click="change(index,'select') " class="_row paddl_r flex_rowBetwen">
            <span @click.stop="change(index,'checkBox')">
              <span :class="item.checkBox ? 'sd_cBx-active m_r' :'sd_cBx m_r'"></span>{{item.name}}
            </span>
            <span>
              <img :class="item.select ? 'tobottom' : 'toleft' " src="@/assets/images/shopSend/toleft.png" />
            </span>
          </div>
          <transition name="fade">
            <div v-if="item.child.length > 0 && item.select" class="_child paddl_r  ">
              <div class="divBox">
                <span v-for="(iitem,iindex) in item.child" :key="iindex" :class="iitem.select == 1 ? 'sd_btn _mini plain _radius' : 'sd_btn _mini _radius'">
                  {{iitem.name}}
                  <img class="_colse" src="@/assets/images/shopSend/close.png" alt="">
                </span>
              </div>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="item.select" class="flex_rowBetwen inputBox paddt_b paddl_r ">
              <input class="input" v-model="childName" type="text" placeholder="请输入自定义规格参数" />
              <span @click="addChild(index)" class="sd_btn _mini _radius">确 定</span>
            </div>
          </transition>
        </div>
        <div @click="createSpec" class=" _row  flex_center _title_box brder_b brder_t">
          <div class="p_btn">
            <img class="_icon" src="@/assets/images/shopSend/add42.png" />
            生成规格
          </div>
        </div>
      </div>
      <!-- 生成之后状态 -->
      <div v-if="state == 3">
        <div class="_row flex_rowBetwen brder_b">
          <span class="_title ">红色/M</span>
          <span class="flex_center">
            <img class="p_icon" src="@/assets/images/shopSend/close3.png" />
            <img class="p_icon" src="@/assets/images/shopSend/menue.png" />
          </span>
        </div>
        <div class="_row flex_rowBetwen">
          <van-uploader :after-read="uploadVideo" accept="image/*">
            <span class="_title">
              <img src="@/assets/images/shopSend/img1.png" class="p_img" />
              <span class="p_info">请上传规格预览图片，建议300X300像素</span>
            </span>
          </van-uploader>
        </div>
        <div class=" _row _title_box brder_b">
          <span class="_title ">商品售价</span>
          <input class="input" type="text" placeholder="请输入商品售价" />
        </div>
        <div class=" _row _title_box brder_b">
          <span class="_title ">商品原价</span>
          <input class="input" type="text" placeholder="请输入商品原价" />
        </div>
        <div class=" _row _title_box brder_b">
          <span class="_title ">商品成本</span>
          <input class="input" type="text" placeholder="请输入商品成本" />
        </div>
        <div class=" _row _title_box brder_b">
          <span class="_title ">商品库存</span>
          <input class="input" type="text" placeholder="请输入商品库存数量" />
        </div>
        <div @click="showSpec = true" class=" _row  flex_center _title_box brder_b">
          <div class="p_btn">
            <img class="_icon" src="@/assets/images/shopSend/add42.png" />
            修改规格
          </div>
        </div>
      </div>
    </div>
    <!-- 配送 -->
    <div class="mb_20">
      <div class=" _row  flex_rowBetwen  brder_b">
        <span class="_title ">配送物流</span>
        <span class="flex_center">
          <van-switch v-model="checked" size="16px" />
        </span>
      </div>
      <!-- if -->
      <div class="_row flex_rowBetwen">
        <span class="_title">运费</span>
        <span class="flex_center">
          <span class="_rightInfo">按重量估算</span>
          <img class="toleft" src="@/assets/images/shopSend/toleft.png" />
        </span>
      </div>
      <div class=" _row mb_20 _title_box brder_b">
        <span class="_title ">商品名称</span>
        <input class="input" type="text" placeholder="请输入商品重量(kg)" />
      </div>
      <!-- else -->
      <div class=" _row flex_rowBetwen  brder_b">
        <span class="_title ">包邮</span>
        <span class="flex_center">
          <van-switch v-model="checked" size="17px" />
        </span>
      </div>
    </div>
    <!-- 图文设置 -->
    <div @click="showActView = !showActView" class="_row mb_20 flex_rowBetwen">
      <span class="_title">商品图文描述</span>
      <span class="flex_center">
        <span class="_rightInfo">未设置</span>
        <img class="toleft" src="@/assets/images/shopSend/toleft.png" />
      </span>
    </div>
    <!-- 高级设置 收起 -->
    <div @click="showHeight = !showHeight" class="_row mb_20 flex_rowBetwen">
      <span class="_title">高级设置</span>
      <span class="flex_center">
        <!-- 朝上 样式  totop -->
        <span class="_rightInfo">{{showHeight ? '收起' : '展开' }}</span>
        <img :class="showHeight ? 'totop' : 'toleft' " src="@/assets/images/shopSend/toleft.png" />
      </span>
    </div>
    <!-- 展开盒子 -->
    <transition name="fade">
      <div v-if="showHeight">
        <!-- 交易方式 -->
        <div class="mb_20">
          <div class="_row flex_rowBetwen">
            <span class="_title">交易方式</span>
            <span class="flex_center">
              <span class="_rightInfo">购物车</span>
              <img class="toleft" src="@/assets/images/shopSend/toleft.png" />
            </span>
          </div>
          <div class="_row flex_rowBetwen">
            <span class="_title">交易方式</span>
            <span class="flex_center">
              <span class="_rightInfo">无</span>
              <img class="toleft" src="@/assets/images/shopSend/toleft.png" />
            </span>
          </div>
        </div>
        <!-- 优惠 -->
        <div class="mb_20">
          <div class="_row flex_rowBetwen">
            <span class="_title">交易方式</span>
            <span class="flex_center">
              <van-switch size="17" v-model="coupon"></van-switch>
            </span>
          </div>
          <div v-if="coupon" class="padd _checkBox sd_white">
            <van-checkbox class="inblock" v-for=" (item,index) in 4" v-model="checked" shape="square" icon-size="14">优惠标签</van-checkbox>
          </div>
          <div class="_row flex_rowBetwen">
            <span class="_title">服务承诺</span>
            <span class="flex_center">
              <van-switch size="17" v-model="coupon"></van-switch>
            </span>
          </div>
          <div v-if="coupon" class="padd _checkBox sd_white">
            <van-checkbox class="inblock" v-for=" (item,index) in 4" v-model="checked" shape="square" icon-size="14">服务承诺</van-checkbox>
          </div>
        </div>
        <!-- 最小定量 -->
        <div class="mb_20">
          <div class=" _row _title_box brder_b">
            <span class="_title ">最小定量</span>
            <input class="input" type="text" placeholder="最小购买数量" />
          </div>
        </div>
        <div class="mb_20">
          <div class=" _row  flex_rowBetwen  brder_b">
            <span class="_title ">商品分享</span>
            <span class="flex_center">
              <van-switch v-model="checked" size="17px" />
            </span>
          </div>
          <div class=" _row flex_rowBetwen  brder_b">
            <span class="_title ">显示销量</span>
            <span class="flex_center">
              <van-switch v-model="checked" size="17px" />
            </span>
          </div>
          <div class=" _row flex_rowBetwen  brder_b">
            <span class="_title ">跨境电商</span>
            <span class="flex_center">
              <van-switch v-model="checked" size="17px" />
            </span>
          </div>
        </div>
      </div>
    </transition>
    <p class="sd_info">每一个跨境产品都会自动分离成单独订单，需提交收货人身份证号</p>
    <div class="fixedBottomBox _footer">
      <span class="sd_btn sd_white">
        <img class="_icon" src="@/assets/images/shopSend/44.png">
        放到仓库
      </span>
      <span class="sd_btn ">
        <img class="_icon" src="@/assets/images/shopSend/45.png">
        上架售卖
      </span>
    </div>
    <!-- 选择分类弹窗 -->
    <div :class="showClassFly ? 'classFly fixedTop' : 'classFly fixedTop translateY100'">
      <classFly ref="classFly" @close="watch_getClass"></classFly>
    </div>
    <!-- 选择规格弹窗 -->
    <div :class="showSpec ? 'hiddenBottom fixedTop' : 'hiddenBottom fixedTop translateY100'">
      <spec ref="spec" @close="watch_getspec"></spec>
    </div>
    <!-- 图文设置弹窗 -->
    <div :class="showActView ? 'hiddenBottom fixedTop' : 'hiddenBottom fixedTop translateY100'">
      <van-tabs v-model="active">
        <van-tab title="产品说明">
          <div class="tabcontent">
            <div class=" _row mb_20 mt_20 _title_box brder_b">
              <span class="_title ">自定义标签</span>
              <input class="input" type="text" placeholder="请输入自定义标签名称" />
            </div>
            <div v-for="item in actViewList">
              <div class="_textarea mb_20 ">
                <textarea placeholder="商品文字说明"></textarea>
              </div>
              <div :class="imgList.length === 0 ? 'sd_loadBox flex_center' : 'sd_loadBox'  ">
                <span class="loaderBox" v-for="(item,index) in imgList" @click="setIndex(index)">
                  <van-uploader :after-read="uploadImg" :key="index">
                    <van-image fit="cover" class="loadImg borderSolid" :src="item"></van-image>
                  </van-uploader>
                  <van-icon @click="deleteImg(index)" name="clear" class="close_img" color="#FF352B" />
                </span>
                <van-uploader v-if="imgList.length < 6" :after-read="uploadImg" class="verticalTop">
                  <div :class="imgList.length === 0 ? 'load_icon1 flex_center' : 'load_icon flex_center'">
                    <div>
                      <img src="@/assets/images/shopSend/37.png" />
                      <p>上传图片</p>
                    </div>
                  </div>
                </van-uploader>
              </div>
            </div>
            <div @click="addView" class="p_btn _row mb_20 flex_center">
              <span>
                <img class="_icon" src="@/assets/images/shopSend/add42.png" />
                <span class="_rightInfo">新增图文</span>
              </span>
            </div>
          </div>
        </van-tab>
        <van-tab title="产品参数">
          样式和图文一 一样
        </van-tab>
      </van-tabs>
      <div class="F">
        <div class="sn_fiexdH"></div>
        <div @click="saveActView" class="sd_btn">保存</div>
      </div>
    </div>

  </div>
</template>
<script>
import funcjs from './funcjs'
import classFly from "@/pages/shopSend/classFly.vue"
import spec from "@/pages/shopSend/spec.vue"
import { Uploader, Tab, Tabs, Image, Icon, Switch, Checkbox , NavBar , Collapse, CollapseItem } from 'vant';
export default {
  name: "templteDetail",
  mixins: [funcjs],
  components: {
    'van-uploader': Uploader,
    'van-image': Image,
    'van-icon': Icon,
    'van-switch': Switch,
    'van-checkbox': Checkbox,
    "van-collapse-item": CollapseItem,
    'van-collapse': Collapse,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-nav-bar':NavBar,
    classFly,
    spec
  },
  data() {
    return {
      checked: false, //所有checkBox控制  请自行修改
      imgI: null,//图片上传替换所用 目前有个小问题  不行可以用自带的组件
      imgList: [],//图片数据
      videoList: [],//视频数据
      coupon: false,//优惠券checkbox
      showHeight: false,//展开高级设置
      showClassFly: false,//打开分类弹窗
      showActView: false,//打开图文弹窗
      actViewList:[1],//模拟图文列表
      showSpec: false,//打开规格弹窗
      active: 0,//图文弹窗默认显示
      list: [{//模拟的规格数据
        id: 1,
        name: "颜色",
        select: true,
        checkBox: false,
        child: [
          { name: "S", id: 1, select: 1 },
          { name: "M", id: 1, select: 0 },
          { name: "L", id: 1, select: 0 },
          { name: "XL", id: 1, select: 0 },
        ]
      }],
      state:1,//商品规格操作状态  1=>无 2=>生成规格 3=>修改规格
      spceList:[],//模拟已经生成规格数据
    }
  },
  created() {

  },
  computed:{
    token:{
        get(){
          return this.$store.getters.token
        },
        set(){

        }
    },
  },
  mounted() {
  },
  methods: {
    addView(){
      this.actViewList.push(1)
    },
    // 删除图片
    deleteImg(index) {
      this.imgList.splice(index, 1)
    },
    // 更新/上传图片
    uploadImg(base64) {
      if (this.imgI !== null) {
        this.imgList.splice(this.imgI, 1, base64.content)
      } else {
        this.imgList.push(base64.content)
      }
      this.imgI = null
    },
    // 点击已经上传的图片记录下 所点击的图片下标 这里要去清除
    setIndex(index) {
      this.imgI = index
    },
    // 上传视频
    uploadVideo(base64) {
      this.videoList.splice(0, 1, base64.file)
    },
    // 监听分类选择后获得分类页面数据
    watch_getClass(data) {
      console.log(data)
      this.showClassFly = false
    },
    // 监听规格选择后获得规格页面数据
    watch_getspec(data) {
      console.log(data)
      this.showSpec = false
      this.state = 2
    },
    // 生成规格
    createSpec(){
      this.state = 3
    },
    // 保存图文
    saveActView() {
      this.showActView = false
    },
  }
}

</script>
<style lang="scss" scoped>
input {
  border: none;
}
.brder_t{
    border-top:1px solid #f1f1f1;
}
.tabcontent{
  height: calc(100vh - 1.3rem);
  overflow: scroll;
  padding-bottom: 1.0rem;
}
.send_warper {
  .p_icon {
    width: 0.4rem;
    margin-left: 0.2rem;
    vertical-align: middle;
  }

  .p_img {
    width: 0.6rem;
    margin-right: 0.1rem;
    vertical-align: middle;
  }

  .p_info {
    font-size: 0.22rem;
    color: #A9A9A9;
  }

  text-align: left;

  .sd_info {
    padding: 0px 0.16rem;
    font-size: 0.24rem;
    line-height: 0.4rem;
    padding-bottom: 2rem;
  }

  .loadImg {
    width: 2.22rem;
    height: 2.22rem;
    vertical-align: middle;
    margin-right: 0.11rem;
    margin-bottom: 0.2rem;
  }

  .padd {
    padding: 0.25rem;
  }

  .verticalTop {
    vertical-align: top;
  }

  .loaderBox {
    display: inline-block;
    position: relative;

    .close_img {
      position: absolute;
      top: -0.1rem;
      right: 0rem;
      width: 0.3rem;
      height: 0.3rem;
    }
  }

  ._title_box {
    background: #fff;
  }

  .p_btn {
    font-size: 0.28rem;
    color: #555555;

    ._icon {
      width: 0.35rem !important;
      height: 0.35rem !important;
      margin-right: 0.05rem;
      vertical-align: middle;
    }
  }
}

/*图片上传*/
.sd_loadBox {
  background: #fff;
  min-height: 3.0rem;
  padding: 0.5rem 0.25rem;
  margin-bottom: 0.2rem;

  .load_icon1 {
    text-align: center;
    width: 6.0rem;

    img {
      width: 1.12rem;
    }

    p {
      color: #555;
      margin-top: 0.3rem;
      font-size: 0.28rem;
    }
  }

  .load_icon {
    text-align: center;
    width: 2.22rem;
    height: 2.22rem;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(237, 237, 237, 1);

    img {
      width: 0.72rem;
    }

    p {
      color: #555;
      margin-top: 0.23rem;
      font-size: 0.24rem;
    }
  }
}

._checkBox {
  overflow: hidden;

  .inblock {
    float: left;
    margin-right: 0.5rem;
    margin-top: 0.15rem;
  }
}

/**/
._row {
  padding: 0px 0.25rem;
  height: 0.99rem;
  line-height: 0.99rem;
  color: #222;
  font-size: 0.32rem;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;

  ._rightInfo {
    font-size: 0.26rem;
    color: #888;
    margin-right: 0.2rem;
  }

  ._title {
    font-size: 0.32rem;
    width: 2.5rem;
  }

  .input {
    font-size: 0.26rem;
    height: 90%;
  }

}

._footer {
  display: flex;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0px 0px 10px #f1f1f1;

  span {
    width: 100%;
    height: 1.1rem;
    line-height: 1.1rem;

    ._icon {
      width: 0.3rem !important;
      height: 0.3rem !important;
    }

    &:nth-child(1) {
      background: #fff;
      color: #222222;
    }
  }
}

.hiddenBottom,
.classFly {
  transition: 0.25s;
  height: 100%;
  transform: translateY(0%);
}

/*图文设置*/
.hiddenBottom {
  background: #F6F6F6;

  .tabs {}

  ._textarea {
    background: #fff;
    padding: 0.25rem;
    height: 2.2rem;

    textarea {
      border: none;
      height: 100% !important;
      width: 100% !important;
      font-size: 0.32rem;
    }
  }
}
.paddl_r {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.paddt_b {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

._child {
  text-align: left;
  background: #fff;
  padding-top: .2rem;
  .divBox {
    border-bottom: 1px solid #EDEDED;
  }

  .sd_btn {
    margin-right: 0.3rem;
    margin-bottom: 0.2rem;
    width: 1.2rem;
  }
}

.inputBox {
  background: #fff;
  padding-bottom: 0.2rem;

  .input {
    font-size: 0.26rem;
    height: 0.55rem;
    line-height: 0.55rem;
    width: calc(100% - 2rem);
  }
}

</style>

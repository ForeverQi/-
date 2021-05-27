<template>
  <div id="app"></div>
</template>
<script>

// 引入弹出框
import CustomPopup from "@/pages/shopDetail/components/CustomPopup/custompopup.vue";

import wxapi from "~/utils/js/wxapi.js";

import { detail } from "@/api/signin";

export default {
  name: "Home",
  // 弹窗组件
  components: {
    CustomPopup
  },

  data() {
    let that = this;
    return {
      scriptValue: "",
      // 颜色
      theme: "#fe0000",
      // 页面标题
      pageTitle: "",
      // 页面meta关键词
      contentKey: "",
      // 页面meta 描述
      contentDesc: "",
      // 轮播图的配置
      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        //循环
        loop: false,
        //设定初始化时slide的索引
        initialSlide: 0,
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "horizontal",
        //小手掌抓取滑动
        grabCursor: true,
        //分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "fraction"
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      },
      // 放大轮播图配置
      swiperOptionBig: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        // notNextTick: true,
        //循环
        loop: false,
        //设定初始化时slide的索引
        initialSlide: 2,
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "horizontal",
        //小手掌抓取滑动
        // grabCursor: true,
        // observer: true, //修改swiper自己或子元素时，自动初始化swiper
        // observeParents: true, //修改swiper的父元素时，自动初始化swiper
        // // zoom: {
        //   maxRatio: 5, //最大倍数
        //   minRatio: 2, //最小倍数
        //   toggle: false, //不允许双击缩放，只允许手机端触摸缩放。
        //   containerClass: "amplification_swiper" //zoom container 类名
        // },
        // width: window.innerWidth,
        zoom: true
      },

      // 视频分钟数
      video_minute: "00",
      // 视频秒数
      video_second: "30",
      // 默认顶部导航透明度
      flgOpacity: 0,
      // 会员价
      members_values: "会员价",
      // 自营背景色
      bgcColor: "linear-gradient(90deg ,#FF751B 0%,#FFA10B 100%)",
      // 销量
      sales: 900000,
      // 切换标题,规格,参数,默认显示标题
      info: "title",
      // 相关商品列表
      releatedShopList: [],

      // 默认右上角导航隐藏
      flgMenu: false,
      // 默认更多四个状态内容隐藏
      flgFourState: false,

      // 播放器显示
      videoStatus: false,
      // 微团购显示
      weiStatus: true,
      // 轮播图显示
      lunboStatus: true,
      // 图片隐藏
      picStatus: false,
      // 视频隐藏
      videoListStatus: false,
      // 详情规格参数,默认隐藏
      // topFixed: false,

      // 顶部,商品,详情,评价
      topText: 0,

      // 商品顶部的距离
      scrollTop: 1,
      // 详情距离顶部的距离
      scrollTopDetail: 1,

      // 是否点击了商品和详情
      ifStatus: true,
      // 是否点击了评价
      ifEvaluation: true,
      // 颜色值
      colorList: [],
      // 尺码值
      sizeList: [],
      // color颜色是否被选中,默认不被选中
      flgColor: false,
      // 规格弹窗购买数量
      changeNumbers: 1,

      // 点击放大轮播图,默认不显示放大效果
      amplificationFlg: false,
      // 判断点击是否放大图片,默认不放大
      imgFlg: false,
      // 放大的图片路径
      imgSrc:
        "https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/shoppingImg.png",
      // 手机号选择列表
      phoneList: [],
      // 手机号判断条件
      indexClass: 0,
      // 选择的手机号
      myPhone: 0,
      // 未选择手机号(0),已选择手机号(1),规格选择(2),三种状态选择
      phoneValue: 0,

      // 总数据数组
      allData: {},
      // 规格接口数据
      guigeData: {},

      // 轮播数据
      pro_pic_info: [],
      // 视频数据
      pro_mp4: "",
      // 价格是否显示
      pro_price_show: "",
      // 价格
      pro_price: "",
      // 满减tag
      fullRedName: "",
      // 满减标题
      fullRedTitle: "",
      // 更多可用商品
      gengduokeyongshangpin: "",
      //type为1是满减
      type: "",
      // special_type用来判断是批发还是专享
      special_type: "",
      // 满减数据
      popup_info: [],

      // 满减数组
      manjianArray: [],
      // 活动时间
      huodongshijian: "",
      // 至
      zhi: "",

      // 定义变量用来判断,点击了哪一个参数,让参数下加上横线
      indexFlg: 0,

      // 取出规格param_id
      guige_param_id: "",
      // 已选规格
      guigeName: [],
      // 已选规格
      guigeNameHY: [],
      // 判断立即购买的状态
      ifBuy: 0,
      // 判断分享图片是否显示
      ifFxPic: false,
      // 判断分享图片详情是否显示
      ifFxDetail: false,
      // 文章list
      doc_list_Json: {},
      // 默认传入文章接口的参数
      tag_id: 0,
      page: 1,
      // 判断文章标签是否选中的条件
      indexPro: 0,
      // 定义一个参数,用来判断文章接口是否加载
      articleStatus: 0,
      // 标签的page
      doc_page: 1,
      // 存储文章的JSON数据
      allArticleJson: {},
      // 右上角菜单
      menuList: [],
      // 判断用户是否登录
      zz_userid: 0,
      // 判断是否点击了右上角菜单
      flgMenuNum: 0,
      // 定义一个空数组,作为中转,用来拼接分页文章
      articleArr: [],
      // 判断活动是否开始
      activity_state: -1,
      // 结束时间
      end_time: 0,
      // 点击放大的商品图片路径
      shopImgSrc: "",
      // 定义一个参数,用来判断立即购买的状态(0:不能买,1:能买)
      phone_infoFlg: 0,
      // 规格的id
      guige_repeat: 0,
      // 优惠券的总数据
      preferData: {},
      // 优惠券接口需要传入的参数
      idsVar: 0,
      // 优惠弹窗的数据
      preferentialPop: {},
      // 分享海报的所有数据
      shareJson: {},
      // 复制链接的参数
      returnUrl: "",
      // 用来判断,数量是否限时
      numFlg: 0,
      // 判断是限时购还是微团购
      flgSatausGou: 0,
      icon_typeStatus: "",
      // 判断回到顶部按钮是否显示
      topDistance: 1,
      // 文章等标题的总宽度
      box_width: 0,
      // 屏幕的宽度
      window_width: 0,
      // 错误信息
      err_msg: "",
      // 组合数据
      guige_arr: {},
      // 判断按钮是否显示
      changePhoneStatus: 0,
      // 选则手机号数据
      phone_info_arr: [],
      phone_info_change: [],
      // 手机号内容
      phoneModel: "",
      // pro_id
      guige_pro_id: "",
      // 购物车接口返回数据
      shoppingCatList: {},
      // 色系值
      color_style: "",
      // 定义一个参数,用来判断文章接口是否请求失败
      articleRequire: true,
      shareInfo: "",
      // 用来判断,文章标签的总宽度是否再次加载
      window_width_value: 0,
      // 判断是不是有会员价,有的话,显示问号
      MarkValue: false,
      // 判断是不是特殊用户名
      usernameOne: "",
      // 会员等级
      levelValue: "",
      // 页面滚动的距离,用来判断放大图片之后,回到原来的位置
      imgScrollTop: 0
    };
  },
  mounted() {
    // 调取详情页接口
    this.detailFun(0);
  },
  methods: {
    // 详情接口函数
    detailFun(param_id) {
      let that = this;
      // 获取页面链接
      let locationUrl = location.href;
      // 获取用户名和密码
      let name = location.pathname;
      let reg = /(^(http[s]?:\/\/[^\/]*\/)|(^\/))([^\/]+)\/.*$/gi;
      let username = name.replace(reg, "$4");

      let pro_id = name.substring(
        name.lastIndexOf("/") + 1,
        name.lastIndexOf(".")
      );
      // 定义存储参数的对象
      // let paramsValue = {
      //     username: username,
      //     pro_id: pro_id,
      //     param_id: 0
      //     }
      let paramsValue = {
        username: "banish2015",
        pro_id: 15519652,
        param_id: 0
      };
      var abc = detail(paramsValue);
    }
  },

  created() {
    let that = this;
    that.flgMenu = false;
  },
  computed: {},
  watch: {
    allData: {
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
/*  引入外部scss文件 33322*/
@import "@/assets/scss/shopDetail/home.scss";

@import "@/assets/scss/shopDetail/color.scss";
</style>

/*
 * @Author: your name
 * @Date: 2020-08-31 15:41:10
 * @LastEditTime : 2021-06-02 14:34:56
 * @LastEditors  : zhouqi
 * @Description: In User Settings Edit
 * @FilePath     : /vue-VFrontend/src/main.js
 */
import Vue from 'vue'
import router from './router'
import Axios from 'axios'
import Contents from "@/components/Contents.vue"
import store from './store'
import util from '@/libs/util'
import hint from '@/plugins/hint'
import '@/assets/scss/base/default.scss';
import '@/assets/scss/main.scss'

import { Icon,Loading,Dialog,Toast,Skeleton,Overlay,Swipe, SwipeItem, Lazyload, Circle, Popup,Progress,Calendar,DatetimePicker,Tab, Tabs,List,Uploader,Slider,Area,Form,Field,Button,Cell,ActionSheet,Empty,Search,NoticeBar,ImagePreview } from 'vant';

Vue.use(Icon).use(Circle).use(Loading).use(Dialog).use(Toast).use(Skeleton).use(Overlay).use(Swipe).use(SwipeItem).use(Popup).use(Lazyload).use(Progress).use(Calendar).use(DatetimePicker).use(Tab).use(Tabs).use(List).use(Uploader).use(Slider).use(Area).use(Form).use(Field).use(Button).use(Cell).use(ActionSheet).use(Empty).use(Search).use(NoticeBar).use(ImagePreview);

Vue.prototype.$hint = hint;
Vue.prototype.$util = util;
Vue.prototype.$axios = Axios;
Vue.prototype.$EventBus = new Vue();

Axios.defaults.baseURL = '/eeeapi'
Axios.defaults.headers.post['Content-Type'] = 'application/json';

// 引入common AJAX请求
// import common from './api/shop/ajax/common.js'
// Vue.use(common)
import common from '@/plugins/ajaxNew.js'
Vue.use(common)

// 引入vue cookie
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// 动态修改当前页面的标题
Vue.use(require('vue-wechat-title'))
// 动态改变meta中的值
import Meta from 'vue-meta'
Vue.use(Meta)

// 一键复制
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

import vueSwiper from 'vue-awesome-swiper'
/* 样式的话，我这里有用到分页器，就在全局中引入了样式 */
import 'swiper/dist/css/swiper.css'
Vue.use(vueSwiper);

import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'tYLSdsr5kI9c9tjf1Q0CxEPPB8wNgMdG'
})

new Vue({
    el: '#app',
    store,
    router,
    components: {Contents},
    template: '<Contents/>'
})

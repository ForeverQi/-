/*
 * @Author: your name
 * @Date: 2020-11-30 14:50:49
 * @LastEditTime: 2020-11-30 15:13:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue_test_qian\src\router\index.js
 */
import Vue from 'vue'
import util from '@/libs/util'

import Router from 'vue-router'
// 基础路由配置
import base from './base'
// 商家助手客服
import shopChat from './shop/chat'
// 商家助手视频
import shopVideo from './shop/video'
import shopSend from './shopSend/shopSend'
// 短视频平台
import platformVideo from './shop/platformVideo'
// site
import poster from './site/poster'
// site
import live from './shop/live'
// 个人中心
import center from './personal_center/personal_center'
// 订单
import order from './order/submitOrder'
// 地址
import address from './address/address'
// 分销中心
import distributionIndex from './distribution/index'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//会员卡营销
import vipCartMarketing from './vipCartMarketing/vipCartMarketing'
// import VueRouter from "vue-router";
//此VueRouter是自己自定义引入暴露出来的，即是自定义的，以下的VueRouter同样是这样
// 解决两次访问相同路由地址报错
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = new Router({
    mode: 'history',
    base: "/VFrontend",
    routes: [
        ...base,
        ...shopChat,
        ...shopVideo,
        ...shopSend,
        ...platformVideo,
        ...live,
        ...poster,
        ...center,
        ...order,
        ...address,
        ...distributionIndex,
        ...vipCartMarketing
    ]
});

routes.beforeEach((to, from, next) => {
    NProgress.start()

    // 不同项目页面加载也处理
    let proKey = util.functions.proKey(to.name);
    if (proKey) {
        util.init.siteInit(proKey);
    }

    // title
    document.title = process.env.VUE_APP_TITLE + to.meta.title
    if (to.name.indexOf(process.env.VUE_APP_FRONTEND_ALIAS) === 0) {
        if (!util.cookies.get(process.env.VUE_APP_TOKEN)) {
            NProgress.done()
        }
    }

    if (to.name.indexOf(process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-video") === 0) {
        // 商家助手登录验证
        util.shopVideo.checkLogin({
            token: to.query.token
        });
    }

    next();
})

routes.afterEach(to => {
    NProgress.done()
})

export default routes

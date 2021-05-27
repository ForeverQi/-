/*
 * @Author       : qwguo
 * @description  : 直播路由
 * @Date         : 2020-01-28 19:36:10
 * @LastEditors  : qwguo
 * @LastEditTime : 2020-01-28 20:02:24
 * @FilePath     : \ev-frontend-test\src\router\shop\liveVideo.js
 */
import common from "../common";
import util from '@/libs/util'
import Header from '@/pages/shop/views/video/backend/components/header'

// 商家助手直播
export default [
    {
        path: '/shop/bac/liveVideo/index',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-live-video-index",
        // redirect: "/shop/bac/video/index",
        components: {
            Header,
            Contents: () => import('@/pages/shop/views/liveVideo/index'),
        },
        meta: {
            title: "我的直播",
        }
    },
    {
        path: '/shop/bac/liveVideo/editAnchor',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-live-video-editAnchor",
        // redirect: "/shop/bac/video/index",
        components: {
            Header,
            Contents: () => import('@/pages/shop/views/liveVideo/editAnchor'),
        },
        meta: {
            title: "直播信息",
        }
    },
]

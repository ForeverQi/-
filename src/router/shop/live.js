import common from "../common";
import util from '@/libs/util'
import Header from '@/pages/shop/views/live/backend/components/header'

// 商家助手直播
export default [
    {
        path: '/live/bac/index',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-live-pay",
        components: {
            Header,
            Contents: () => import('@/pages/shop/views/live/backend/test'),
        },
        meta: {
            title: "支付测试",
        }
    },
    // 商家助手直播列表页
    {
        path: '/shop/bac/liveList',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-liveList",
        components: {
            Contents: () => import('@/pages/shop/views/live/backend/liveList'),
        },
        meta: {
            title: "",
        }
    },
     // 商家助手直播 主播信息页
     {
        path: '/shop/bac/liveHost',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-hostInfo",
        components: {
            Contents: () => import('@/pages/shop/views/live/backend/hostInfo'),
        },
        meta: {
            title: "",
        }
    },
     // 商家助手直播 新建信息页
     {
        path: '/shop/bac/newLive',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-newLive",
        components: {
            Contents: () => import('@/pages/shop/views/live/backend/newLive'),
        },
        meta: {
            title: "",
        }
    },
    // 商家助手直播 直播方式选择
    {
        path: '/shop/bac/liveWay',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-liveWay",
        components: {
            Contents: () => import('@/pages/shop/views/live/backend/liveWay'),
        },
        meta: {
            title: "",
        }
    },
    // 商家助手直播 第三方推流选择
    {
        path: '/shop/bac/thirdParty',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-thirdParty",
        components: {
            Contents: () => import('@/pages/shop/views/live/backend/thirdParty'),
        },
        meta: {
            title: "",
        }
    },
    // 商家助手直播 直播首页
    {
        path: '/shop/bac/liveIndex',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-liveIndex",
        components: {
            Contents: () => import('@/pages/shop/views/live/backend/liveIndex'),
        },
        meta: {
            title: "",
        }
    },
    // 商家助手直播 直播结束页
    {
        path: '/shop/bac/liveEnd',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-liveEnd",
        components: {
            Contents: () => import('@/pages/shop/views/live/backend/liveEnd'),
        },
        meta: {
            title: "",
        }
    },


    //============================================================================================

    // 直播前台 列表页
    {
        path: '/shop/fro/liveList',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-fro-liveList",
        components: {
            Contents: () => import('@/pages/shop/views/live/frontend/LiveList'),
        },
        meta: {
            title: "",
        }
    },
    // 直播前台 加密页
    {
        path: '/shop/fro/paid',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-fro-paid",
        components: {
            Contents: () => import('@/pages/shop/views/live/frontend/Paid'),
        },
        meta: {
            title: "",
        }
    },
    // 直播前台 专题页
    {
        path: '/shop/fro/special',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-fro-special",
        components: {
            Contents: () => import('@/pages/shop/views/live/frontend/special'),
        },
        meta: {
            title: "",
        }
    },
    // 直播前台 直播详情页
    {
        path: '/shop/fro/liveDetail',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-fro-liveDetail",
        components: {
            Contents: () => import('@/pages/shop/views/live/frontend/liveDetail'),
        },
        meta: {
            title: "",
        }
    },
    // 直播前台 购买记录、关注
    {
        path: '/shop/fro/purRecords',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-fro-purRecords",
        components: {
            Contents: () => import('@/pages/shop/views/live/frontend/purRecords'),
        },
        meta: {
            title: "",
        }
    },
    // 直播前台 回放
    {
        path: '/shop/fro/playBack',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-fro-playBack",
        components: {
            Contents: () => import('@/pages/shop/views/live/frontend/playback'),
        },
        meta: {
            title: "",
        }
    },
    // 直播前台 未知
    {
        path: '/shop/fro/testBefore',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-fro-playBack",
        components: {
            Contents: () => import('@/pages/shop/views/live/frontend/liveBefore'),
        },
        meta: {
            title: "",
        }
    },
]

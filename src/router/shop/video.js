import common from "../common";
import util from '@/libs/util'
import Header from '@/pages/shop/views/video/backend/components/header'


//ceshi
// 商家助手视频
export default [
{
    path: '/shop/bac/video/index',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-video-index",
    components: {
        Header,
        Contents: () => import('@/pages/shop/views/video/backend/index'),
    },
    meta: {
        title: "我的视频",
    }
}, {
    path: '/shop/bac/video/publish',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-video-publish",
    redirect: "/shop/bac/video/publish/upload",
    components: {
        Header,
        Contents: () => import('@/pages/shop/views/video/backend/publish'),
    },
    meta: {
        title: "视频发布",
    },
    children: [{
        path: 'upload', //上传视频
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-video-publish-upload",
        component: resolve => require(['@/pages/shop/views/video/backend/publish/uploadVideo'], resolve),
        meta: {
            title: "上传视频",
        }
    }, {
        path: 'edit', //编辑视频
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-video-publish-edit",
        component: resolve => require(['@/pages/shop/views/video/backend/publish/editVideo'], resolve),
        meta: {
            title: "编辑视频",
        }
    }, ]
}, {
    path: '/shop/bac/video/classifyManage',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-video-classify-manage",
    components: {
        Header,
        Contents: () => import('@/pages/shop/views/video/backend/classifyManage'),
    },
    meta: {
        title: "短视频分类管理",
    }
}, {
    path: '/shop/bac/video/search',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-video-search",
    components: {
        Header,
        Contents: () => import('@/pages/shop/views/video/backend/search'),
    },
    meta: {
        title: "短视频分类管理",
    }
}, {
    path: '/shop/bac/video/help',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-video-help",
    components: {
        Header,
        Contents: () => import('@/pages/shop/views/video/backend/help'),
    },
    meta: {
        title: "短视频帮助说明",
    }
}, {
    path: '/shop/bac/video/buy',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-video-buy",
    components: {
        Header,
        Contents: () => import('@/pages/shop/views/video/backend/buy'),
    },
    meta: {
        title: "购买会员",
    }
}, {
    path: '/shop/bac/video/upload',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-video-buy",
    components: {
        Header,
        Contents: () => import('@/pages/shop/views/video/backend/components/ctrl/upload'),
    },
    meta: {
        title: "购买会员",
    }
}, {
    path: '/shop/bac/video/detail',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-video-detail",
    components: {
        Header,
        Contents: () => import('@/pages/shop/views/video/backend/detail'),
    },
    meta: {
        title: "后台视频详细",
    }
}, {
    path: '/shop/bac/login',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-login",
    components: {
        Header,
        Contents: () => import('@/pages/shop/views/video/backend/login'),
    },
    meta: {
        title: "登录",
    }
}, {
    path: '/shop/bac/pay',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-bac-pay",
    components: {
        Header,
        Contents: () => import('@/pages/shop/views/video/backend/pay.test'),
    },
    meta: {
        title: "支付测试",
    }
}, {
    path: '/shop/video/index',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-frontend-video-index",
    components: {
        Contents: () => import('@/pages/shop/views/video/frontend/index'),
    },
    meta: {
        title: "",
    }
}, {
    path: '/shop/video/videoList',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-frontend-video-videoList",
    components: {
        Contents: () => import('@/pages/shop/views/video/frontend/videoList'),
    },
    meta: {
        title: "",
    }
}, {
    path: '/shop/video/videoNoData',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-frontend-video-videoNoData",
    components: {
        Contents: () => import('@/pages/shop/views/video/frontend/videoNoData'),
    },
    meta: {
        title: "暂无数据",
    }
},
    {
    path: '/shop/video/mapPage',
    name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-frontend-video-mapPage",
    components: {
        Contents: () => import('@/pages/shop/views/video/frontend/mapPage'),
    },
    meta: {
        title: "",
    }
}
]

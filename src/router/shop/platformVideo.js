// 短视频平台
export default [
    {
        path: '/shop/plvideo/index',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-frontend-platformVideo-index",
        components: {
            Contents: () => import('@/pages/shop/views/platformVideo/frontend/index'),
        },
        meta: {
            title: "",
        }
    },
    {
        path: '/shop/plvideo/indexSearch',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-frontend-platformVideo-indexSearch",
        components: {
            Contents: () => import('@/pages/shop/views/platformVideo/frontend/indexSearch'),
        },
        meta: {
            title: "",
        }
    },
    // 推荐关注
    {
        path: '/shop/plvideo/focusOn',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-frontend-platformVideo-focusOn",
        components: {
            Contents: () => import('@/pages/shop/views/platformVideo/frontend/focusOn'),
        },
        meta: {
            title: "",
        }
    },
    {
        path: '/shop/plvideo/introduce',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-backend-platformVideo-introduce",
        components: {
            Contents: () => import('@/pages/shop/views/platformVideo/backend/introduce'),
        },
        meta: {
            title: "",
        }
    },
    {
        path: '/shop/plvideo/openInto',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-backend-platformVideo-openInto",
        components: {
            Contents: () => import('@/pages/shop/views/platformVideo/backend/openIntroduce'),
        },
        meta: {
            title: "",
        }
    },
    {
        path: '/shop/plvideo/certification',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-backend-platformVideo-certification",
        components: {
            Contents: () => import('@/pages/shop/views/platformVideo/backend/certification'),
        },
        meta: {
            title: "",
        }
    },
    // 发布管理页面
    {
        path: '/shop/plvideo/videoRelease',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-backend-platformVideo-videoRelease",
        components: {
            Contents: () => import('@/pages/shop/views/platformVideo/backend/videoRelease'),
        },
        meta: {
            title: "",
        }
    },
     // 店铺展示页面
     {
        path: '/shop/plvideo/storePage',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-backend-platformVideo-storePage",
        components: {
            Contents: () => import('@/pages/shop/views/platformVideo/frontend/storePage'),
        },
        meta: {
            title: "",
        }
    },
    // 发布管理页面
    // 第一步
    {
        path: '/shop/plvideo/videoReleaseF',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-backend-platformVideo-videoReleaseF",
        components: {
            Contents: () => import('@/pages/shop/views/platformVideo/backend/videoReleaseF'),
        },
        meta: {
            title: "",
        }
    },
    // 第二步
    {
        path: '/shop/plvideo/videoReleaseS',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-backend-platformVideo-videoReleaseS",
        components: {
            Contents: () => import('@/pages/shop/views/platformVideo/backend/videoReleaseS'),
        },
        meta: {
            title: "",
        }
    },
    // 第三步
    {
        path: '/shop/plvideo/videoReleaseT',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-backend-platformVideo-videoReleaseT",
        components: {
            Contents: () => import('@/pages/shop/views/platformVideo/backend/videoReleaseT'),
        },
        meta: {
            title: "",
        }
    }
]

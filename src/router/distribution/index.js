/*
 * @Author       : fengting
 * @description  : 分销中心
 * @Date         : 2020-11-04 14:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-13 11:03:31
 * @FilePath     : /vue-VFrontend/src/router/distribution/index.js
 */
export default [
    {
        path: "/distribution/views/index",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-index",
        components: {
            Contents: () => import("@/pages/distribution/views/index")
        },
        meta: {
            title: "分销中心"
        }
    },
    {
        path: "/distribution/views/editpage",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-editpage",
        components: {
            Contents: () => import("@/pages/distribution/views/editpage")
        },
        meta: {
            title: "编辑"
        }
    },
    {
        path: "/distribution/views/mysuperior",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-mysuperior",
        components: {
            Contents: () => import("@/pages/distribution/views/mysuperior")
        },
        meta: {
            title: "我的上级"
        }
    },
    {
        path: "/distribution/views/orderdetailed",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-orderdetailed",
        components: {
            Contents: () => import("@/pages/distribution/views/orderdetailed")
        },
        meta: {
            title: "订单明细"
        }
    },
    {
        path: "/distribution/views/Withdrawal",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-Withdrawal",
        components: {
            Contents: () => import("@/pages/distribution/views/Withdrawal")
        },
        meta: {
            title: "立即提现"
        }
    },
    {
        path: "/distribution/views/WithdrawalList",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-WithdrawalList",
        components: {
            Contents: () => import("@/pages/distribution/views/WithdrawalList")
        },
        meta: {
            title: "提现记录"
        }
    },
    {
        path: "/distribution/views/onedistribution",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-onedistribution",
        components: {
            Contents: () => import("@/pages/distribution/views/onedistribution")
        },
        meta: {
            title: "一级分销商"
        }
    },
    {
        path: "/distribution/views/MyDevelopVip",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-MyDevelopVip",
        components: {
            Contents: () => import("@/pages/distribution/views/MyDevelopVip")
        },
        meta: {
            title: "我发展的会员"
        }
    },
    {
        path: "/distribution/views/DevelopDetailed",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-DevelopDetailed",
        components: {
            Contents: () => import("@/pages/distribution/views/DevelopDetailed")
        },
        meta: {
            title: "分销商详细"
        }
    },
    {
        path: "/distribution/views/BringGoods",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-BringGoods",
        components: {
            Contents: () => import("@/pages/distribution/views/BringGoods")
        },
        meta: {
            title: "分销带货"
        }
    },
    {
        path: "/distribution/views/Selection",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-Selection",
        components: {
            Contents: () => import("@/pages/distribution/views/Selection")
        },
        meta: {
            title: "带货"
        }
    },
    {
        path: "/distribution/views/PosterList",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-PosterList",
        components: {
            Contents: () => import("@/pages/distribution/views/PosterList")
        },
        meta: {
            title: "海报物料"
        }
    },
    {
        path: "/distribution/views/distribution",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-distribution",
        components: {
            Contents: () => import("@/pages/distribution/views/distribution")
        },
        meta: {
            title: "成为分销商"
        }
    },
    {
        path: "/distribution/views/BuyDistribution",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-distribution-views-BuyDistribution",
        components: {
            Contents: () => import("@/pages/distribution/views/BuyDistribution")
        },
        meta: {
            title: "购买成为分销商"
        }
    },
    
];

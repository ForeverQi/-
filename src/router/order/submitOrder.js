/*
 * @Author       : zhouqi
 * @description  : 提交订单相关页面路由定义
 * @Date         : 2020-09-08 15:44:24
 * @LastEditors  : zhouqi
 * @LastEditTime : 2020-12-08 19:17:11
 * @FilePath     : /vue-VFrontend/src/router/order/submitOrder.js
 */
export default [
    {
        path: "/order/submitOrder/index",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-order-submitOrder-index",
        components: {
            Contents: () => import("@/pages/order/views/submitOrder/index")
        },
        meta: {
            title: "订单结算"
        }
    },
    {
        path: "/order/submitOrder/zhifubao",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-order-submitOrder-zhifubao",
        components: {
            Contents: () => import("@/pages/order/views/submitOrder/zhifubao")
        },
        meta: {
            title: ""
        }
    },
    {
        path: "/order/submitOrder/paySuccess",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-order-submitOrder-paySuccess",
        components: {
            Contents: () => import("@/pages/order/views/submitOrder/paySuccess")
        },
        meta: {
            title: ""
        }
    },
    {
        path: "/order/orderRelated/orderList",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-order-orderRelated-orderList",
        components: {
            Contents: () => import("@/pages/order/views/orderRelated/orderList")
        },
        meta: {
            title: "我的订单"
        }
    },
    {
        path: "/order/orderRelated/orderDetail",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-order-orderRelated-orderDetail",
        components: {
            Contents: () => import("@/pages/order/views/orderRelated/orderDetail")
        },
        meta: {
            title: "订单详情"
        }
    },
    {
        path: "/order/orderRelated/afterSalesList",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-order-orderRelated-afterSalesList",
        components: {
            Contents: () => import("@/pages/order/views/orderRelated/afterSalesList")
        },
        meta: {
            title: "售后申请"
        }
    },
    {
        path: "/order/orderRelated/afterSalesDetail",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-order-orderRelated-afterSalesDetail",
        components: {
            Contents: () => import("@/pages/order/views/orderRelated/afterSalesDetail")
        },
        meta: {
            title: "售后详情"
        }
    },
    {
        path: "/order/orderRelated/returnGoods",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-order-orderRelated-returnGoods",
        components: {
            Contents: () => import("@/pages/order/views/orderRelated/returnGoods")
        },
        meta: {
            title: "退换货"
        }
    },
    {
        path: "/order/orderRelated/evaluation",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-order-orderRelated-evaluation",
        components: {
            Contents: () => import("@/pages/order/views/orderRelated/evaluation")
        },
        meta: {
            title: "晒单评价"
        }
    },
    {
        path: "/order/orderRelated/evaluationList",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-order-orderRelated-evaluationList",
        components: {
            Contents: () => import("@/pages/order/views/orderRelated/evaluationList")
        },
        meta: {
            title: "晒单评价列表"
        }
    },
    {
        path: "/order/orderRelated/aleryEvaList",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-order-orderRelated-aleryEvaList",
        components: {
            Contents: () => import("@/pages/order/views/orderRelated/aleryEvaList")
        },
        meta: {
            title: "我的评价"
        }
    },
    {
        path: "/order/orderRelated/jdAfterType",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-order-orderRelated-jdAfterType",
        components: {
            Contents: () => import("@/pages/order/views/orderRelated/jdAfterType")
        },
        meta: {
            title: "请选择售后类型"
        }
    },
    {
        path: "/order/orderRelated/orderRecord",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-order-orderRelated-orderRecord",
        components: {
            Contents: () => import("@/pages/order/views/orderRelated/orderRecord")
        },
        meta: {
            title: "订单跟踪"
        }
    }
];

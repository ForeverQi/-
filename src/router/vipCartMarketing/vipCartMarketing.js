import common from "../common";
import util from '@/libs/util'
export default util.functions.RouterMerge(
    [{
        path: '/vipCartmarketing/views/marketingindex',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-vipCartmarketing-views-marketingindex",
        components: {
            //Menu,
            Contents: () => import('@/pages/vipCartmarketing/views/marketingindex'),
        },
        meta: {
            title: "会员卡",
        }
    }, {
        path: '/vipCartmarketing/views/vipInfo',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-vipCartmarketing-views-vipInfo",
        components: {
            //Menu,
            Contents: () => import('@/pages/vipCartmarketing/views/vipInfo'),
        },
        meta: {
            title: "完善开卡信息",
        }
    }, {
        path: '/vipCartmarketing/views/list',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-vipCartmarketing-views-list",
        components: {
            //Menu,
            Contents: () => import('@/pages/vipCartmarketing/views/list'),
        },
        meta: {
            title: "购买记录",
        }
    }],
    common,
    "components"
)

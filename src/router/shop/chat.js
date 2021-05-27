import common from "../common";
import util from '@/libs/util'
//import Menu from '@/components/frontend/home-statistics/menu'

export default util.functions.RouterMerge(
    [{
        path: '/shop/chat/wap-detail',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-chat-wap-detail",
        components: {
            //Menu,
            Contents: () => import('@/pages/shop/views/chat/wap-detail'),
        },
        meta: {
            title: "会话详情",
        }
    }, {
        path: '/shop/chat/pc-detail',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "chat-pc-detail",
        components: {
            //Menu,
            Contents: () => import('@/pages/shop/views/chat/pc-detail'),
        },
        meta: {
            title: "会话详情",
        }
    }, {
        path: '/shop/chat/wap-leave-msg',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "chat-wap-leave-msg",
        components: {
            //Menu,
            Contents: () => import('@/pages/shop/views/chat/wap-leave-msg'),
        },
        meta: {
            title: "留言",
        }
    }],
    common,
    "components"
)

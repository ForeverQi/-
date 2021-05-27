import common from "./common";
import util from '@/libs/util'

export default util.functions.RouterMerge(
    [{
        path: '*',
        redirect: "/",
        name: 'page-404',
        hidden: true,
        components: {
            Contents: () => import('@/components/home/404')
        },
    }, {
        path: '/404',
        name: '404',
        components: {
            Contents: () => import('@/components/home/404')
        },
        meta: {
            title: "404",
        }
    }, {
        path: '/',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-index",
        components: {
            Contents: () => import('@/components/home/index')
        },
        meta: {
            title: "home",
        }
    }],
    common,
    "components"
)

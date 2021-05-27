import common from "../common";
import util from '@/libs/util'

export default [
    // 销售分享海报
    {
        path: '/site/poster/:id/:agent_id',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-site-poster",
        components: {
            Contents: () => import('@/pages/site/views/poster/index')
        },
        meta: {title: "海报"}
    }
]

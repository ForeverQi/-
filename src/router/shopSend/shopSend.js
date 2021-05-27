import layout from "@/pages/shopSend/components/layout.vue";
export default [
    {
        path: '/shopSend',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shopSend",
        components: {
            Contents: layout
        },
        redirect: '/shopSend/shopSend',
        meta: {title: "商品发布"},
        children: [
            {
                path: 'shopSend',
                component: () => import('@/pages/shopSend/views/shopSend'),
                name: 'shopSend',
                meta: {title: '商品发布', icon: 'shopSend'}
            },
            {
              path: 'classFly',
              component: () => import('@/pages/shopSend/views/classFly'),
              name: 'classFly',
              meta: {
                title: '商品分类',
                icon: 'classFly'
              }
            },
            {
              path: 'spec',
              component: () => import('@/pages/shopSend/views/spec'),
              name: 'spec',
              meta: {
                title: '商品规格',
                icon: 'spec'
              }
            },
            {
              path: 'specDetail',
              component: () => import('@/pages/shopSend/views/specDetail'),
              name: 'specDetail',
              meta: {
                title: '规格详情',
                icon: 'specDetail'
              }
            },
            {
              path: 'feeTemplte',
              component: () => import('@/pages/shopSend/views/feeTemplte'),
              name: 'feeTemplte',
              meta: {
                title: '商品规格',
                icon: 'feeTemplte'
              }
            },
            {
              path: 'templteDetail',
              component: () => import('@/pages/shopSend/views/templteDetail'),
              name: 'templteDetail',
              meta: {
                title: '商品规格详情',
                icon: 'templteDetail'
              }
            },
        ]
    }
]

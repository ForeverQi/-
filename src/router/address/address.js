export default [
    {
        path: "/address/views/addressList",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-address-views-addressList",
        components: {
            Contents: () => import("@/pages/address/views/addressList")
        },
        meta: {
            title: "收货地址"
        }
    },
    {
        path: "/address/views/addressDetail",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-address-views-addressDetail",
        components: {
            Contents: () => import("@/pages/address/views/addressDetail")
        },
        meta: {
            title: "添加收货地址"
        }
    },
    {
        path: "/address/views/tcpsAdd",
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-shop-address-views-tcpsAdd",
        components: {
            Contents: () => import("@/pages/address/views/tcpsAdd")
        },
        meta: {
            title: "添加收货地址"
        }
    }
]
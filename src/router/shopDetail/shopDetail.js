import Home from '@/pages/shopDetail/views/Home/Home'
export default [
    {
        path: '/home',
        name: process.env.VUE_APP_FRONTEND_ALIAS + "-Home",
        components: {
          Contents: Home
        },
    }
]

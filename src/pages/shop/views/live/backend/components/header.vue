<template></template>

<script>
    import util from '@/libs/util'

    export default {
        name: "shop-bac-video-header",
        watch: {
            $route(to, from) {
                this.StatusBar();

                // 初始化安卓返回按钮回调
                window.goGestureCallback = null;
            }
        },
        data() {
            return {
                height: 0
            }
        },

        created() {
            // 隐藏底部菜单
            util.app.Shop.ShowFooterMenu(0);

            // 标注商家助手后台
            util.variable.Set({
                key: "IsShopBackend",
                val: true
            });

            // 初始化安卓返回按钮回调
            window.goGestureCallback = null;
        },

        mounted() {
            this.StatusBar();
        },
        methods: {
            /**
             * 商家助手app头部高度
             * @constructor
             */
            StatusBar() {
                util.app.Shop.StatusBar({
                    // color: '#fff',
                    callback: function (height) {
                        util.variable.Set({
                            key: 'BarHeight',
                            val: height
                        });
                    }
                })
            }
        }
    }
</script>
<style>

</style>

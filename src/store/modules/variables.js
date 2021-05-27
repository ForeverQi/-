import util from '@/libs/util'

export default {
    namespaced: true,
    state: {
        many: {
            // 支付按钮状态
            pay: false,
            // 后台详细页操作按钮是否显示
            ShopVideoBacActions: false,
            // 商家助手app状态栏高度
            BarHeight: 0,
            // 商家助手后台预览视频显示分享按钮
            ShopVideoBacShare: false,
            // 商家助手后台预览视频显示分享海报
            ShopVideoBacPoster: false,
            // 底部高度
            footerHeight: 0,
            // 标注是否是商家助手后台
            IsShopBackend: false,
            // 商家助手视屏分享信息
            ShopVideoXcxShare: {
                // 站点信息 wap 手机 xcx 小程序 all 全部 默认没有
                site: '',
                // 小程序信息
                xcx: {}
            },
            // 商家助分享设置信息
            ShopVideoShareSetting: {},
            // 上传视频信息
            VideoData: {}
        }
    },

    // 同步
    mutations: {
        /**
         * set
         * @param state
         * @param data
         * @constructor
         */
        SetData(state, data = {}) {
            setTimeout(function () {
                state.many[data.key] = data.val;
            });
        },

        /**
         * set 批量操作
         * @param state
         * @param data
         * @constructor
         */
        SetBatchData(state, data = {}) {
            setTimeout(function () {
                data.forEach(function (value, index, array) {
                    state.many[value.key] = value.val;
                });
            });
        }
    },

    // 异步
    actions: {
        /**
         * set
         * @param context
         * @param data
         * @constructor
         */
        Set(context, data = {}) {
            context.commit('SetData', data);
        },

        /**
         * set 批量操作
         * @param context
         * @param data
         * @constructor
         */
        SetBatch(context, data = {}) {
            context.commit('SetBatchData', data);
        }
    }
}

import util from '@/libs/util'

export default {
    namespaced: true,
    state: {
        // 浏览足迹
        showHistory: false,
        // 心跳定时器
        heartBeatInterval: null,
        // 连接对象
        connection: null,
        // 收消息
        eventMessage: {},
        // 客服信息
        server: {
            // 分配状态
            status: false,
            // 客服 user.id
            uid: '',
            // 客服用户类型 user user_manager
            user_type: '',
            // head
            head: '',
        },
        // 用户信息 客户
        userinfo: {
            // 客服 user.id
            uid: '',
            // 客服用户类型 user user_manager
            user_type: '',
            // head
            head: '',
        },
        // 分配客服定时器
        issueInterval: null
    },

    // 同步
    mutations: {
        /**
         * 设置心跳
         * @param state
         * @constructor
         */
        SetshowHistory(state) {
            if (!state.showHistory) {
                $("body").addClass('overflow-hidden');
            } else {
                $("body").removeClass('overflow-hidden');
            }

            state.showHistory = !state.showHistory;
        },

        /**
         * 设置心跳
         * @param state
         * @param param
         * @constructor
         */
        SetHeatBeat(state, param = {clear: false}) {
            // 清除心跳
            if (param.clear && state.heartBeatInterval) {
                return clearInterval(state.heartBeatInterval);
            }

            if (!state.heartBeatInterval) {
                state.heartBeatInterval = setInterval(function () {
                    util.chat.heartBeat();
                }, 4000)
            }
        },

        /**
         * 设置连接对象
         * @param state
         * @param param
         * @constructor
         */
        SetConnectionData(state, param = {}) {
            state.connection = param.connection;
            if ("function" === typeof param.callback) {
                param.callback();
            }
        },

        /**
         * 设置接收消息
         * @param state
         * @param data
         * @constructor
         */
        ResponseMethods(state, data = {}) {
            if (data.length) {
                data.forEach(function (item, index, array) {
                    if (!item.method || !item.callback) {
                        console.log( "method, callback 不能为空")
                    }

                    // 注入消息回调
                    state.eventMessage[item.method] = item.callback;
                });
            }
        },

        /**
         * 设置客服
         * @param state
         * @param param
         * @constructor
         */
        SetServer(state, param = {}) {
            state.server.status = true;
            state.server.uid = param.id;
            state.server.user_type = param.user_type;
            state.server.head = param.head;

            "function" === typeof param.callback && param.callback();
        },

        /**
         * 用户信息
         * @param state
         * @param param
         * @constructor
         */
        UserInfo(state, param = {}) {
            state.userinfo.uid = param.id;
            state.userinfo.user_type = param.user_type;
            state.userinfo.head = param.head;
        },

        /**
         * 分配客服定时器
         * @param state
         * @param param
         * @constructor
         */
        SetIssueInterval(state, param = {interval: '', clear: false}) {
            if (param.interval) {
                state.issueInterval = param.interval;
            }

            // 清除定时器
            if (state.issueInterval && param.clear) {
                clearInterval(state.issueInterval);
            }
        }
    },

    // 异步
    actions: {
        /**
         * 设置socket连接对象
         * @param context
         * @param param
         * @constructor
         */
        SetConnection(context, param = {}) {
            context.commit('SetConnectionData', param);
        },

        /**
         * 设置心跳定时器
         * @param context
         * @param param
         * @constructor
         */
        SetHeatBeatBy(context, param = {}) {
            context.commit('SetHeatBeat', param);
        },

        /**
         * 设置接收消息
         * @param context
         * @param param
         * @constructor
         */
        SetResponseMethods(context, param = {}) {
            context.commit('ResponseMethods', param);
        },

        /**
         * 设置客服
         * @param context
         * @param param
         * @constructor
         */
        SetServerBy(context, param = {}) {
            context.commit('SetServer', param);
        },

        /**
         * 设置客服定时器
         * @param context
         * @param param
         * @constructor
         */
        SetIssueInterval(context, param = {}) {
            context.commit('SetIssueInterval', param);
        },

        /**
         * 用户信息
         * @param context
         * @param param
         * @constructor
         */
        SetUserInfo(context, param = {}) {
            context.commit('UserInfo', param);
        },

        /**
         * 显示隐藏浏览足迹
         * @param context
         * @constructor
         */
        SetshowHistoryBy(context) {
            context.commit('SetshowHistory');
        }
    }
}

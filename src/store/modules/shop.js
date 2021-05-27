import util from '@/libs/util'

export default {
    namespaced: true,
    state: {
        conf: {
            // 请求过期时间（配置项 timeout, 默认 60000）
            timeout: 60000,
            // 分片大小（配置项 partSize, 默认 1048576）
            partSize: 1048576,
            // 上传分片数（配置项 parallel, 默认 5）
            parallel: 5,
            // 网络失败重试次数（配置项 retryCount, 默认 3）
            retryCount: 3,
            // 网络失败重试间隔（配置项 retryDuration, 默认 2）
            retryDuration: 2,
            // 配置项 region, 默认 cn-shanghai
            region: "cn-shanghai",
            // 阿里云账号ID
            userId: '',
            // bucket
            bucket: '',
            // 账号信息
            account: {}
        }
    },

    // 同步
    mutations: {
        /**
         * 上传配置
         * @param state
         * @param data
         * @constructor
         */
        SetConf(state, data = {}) {
            state.conf.timeout = data.timeout || state.conf.timeout;
            state.conf.partSize = data.partSize || state.conf.partSize;
            state.conf.parallel = data.parallel || state.conf.parallel;
            state.conf.retryCount = data.retryCount || state.conf.retryCount;
            state.conf.retryDuration = data.retryDuration || state.conf.retryDuration;
            state.conf.region = data.region || state.conf.region;
            state.conf.userId = data.account.userid || state.conf.userId;
            state.conf.bucket = data.bucket || state.conf.bucket;
            state.conf.account = data.account || state.conf.account;

            typeof data.callback === "function" && data.callback();
        }
    },

    // 异步
    actions: {
        /**
         * 上传配置
         * @param context
         * @param data
         * @constructor
         */
        SetConfBy(context, data = {}) {
            context.commit('SetConf', data);
        }
    }
}

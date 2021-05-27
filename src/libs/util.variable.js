import store from '@/store'

export default {
    // 不显示进度条
    unNProgress: false,

    // 显示error错误
    AxiosErrorPopup: true,

    // 是否formdata提交
    ISFormData: false,

    /**
     * 响应式数据
     * @param data
     * @constructor
     */
    Set(data = {}) {
        store.dispatch("variables/Set", data)
    },

    /**
     * 响应式数据 批量修改
     * @param data
     * @constructor
     */
    Setbatch(data = {}) {
        store.dispatch("variables/SetBatch", data)
    },
}

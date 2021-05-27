import request from '@/plugins/axios'
import util from '@/libs/util'

/**
 * 聊天历史记录
 * @constructor
 */
export function history(data) {
    return request({
        url: '/stranger/chat/history',
        method: 'post',
        data
    })
}

/**
 * 文件上传
 * @constructor
 */
export function fileUpload(data) {
    return request({
        url: '/stranger/chat/upload',
        method: 'post',
        data
    })
}

/**
 * 用户足迹
 * @constructor
 */
export function footprint(data) {
    return request({
        url: '/stranger/chat/footprint',
        method: 'post',
        data
    })
}

/**
 * 发送商品
 * @constructor
 */
export function sendGoods(data) {
    return request({
        url: '/stranger/chat/goodsInfo',
        method: 'post',
        data
    })
}

import request from '@/plugins/axios'
import util from '@/libs/util'

/**
 * 网站版本海报
 * @param data
 * @constructor
 */
export function SitePoster(data) {
    return request({
        url: '/stranger/site/poster',
        method: 'post',
        data
    })
}

/**
 * 网站版本海报
 * @param data
 * @constructor
 */
export function SitePosterForm(data) {
    return request({
        url: '/stranger/site/posterForm',
        method: 'post',
        data
    })
}

/**
 * 生成版本海报
 * @param data
 * @constructor
 */
export function CreatePoster(data) {
    return request({
        url: '/stranger/site/createPoster',
        method: 'post',
        data
    })
}

/**
 * 分享记录
 * @param data
 * @constructor
 */
export function posterShareRecord(data) {
    return request({
        url: '/stranger/site/posterShareRecord',
        method: 'post',
        data
    })
}

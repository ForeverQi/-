import request from '@/plugins/axios'
import util from '@/libs/util'

/**
 * 测试
 * @constructor
 */
export function Indent(data) {
    return request({
        url: '/shop/video/pay',
        method: 'post',
        data
    })
}

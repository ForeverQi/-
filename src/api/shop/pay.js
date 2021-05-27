import request from '@/plugins/axios'
import util from '@/libs/util'

/**
 * 支付购买视频
 * @constructor
 */
export function Indent(data) {
    return request({
        url: '/shop/video/pay',
        method: 'post',
        data
    })
}

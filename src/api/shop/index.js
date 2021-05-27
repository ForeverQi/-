import request from '@/plugins/axios'
import util from '@/libs/util'

/**
 * 商家助手登录
 * @constructor
 */
export function login(data) {
    return request({
        url: '/index/shopLogin',
        method: 'post',
        data
    })
}

/**
 * 获取oss配置
 * @constructor
 */
export function ossconf(data) {
    return request({
        url: '/shop/video/oss',
        method: 'post',
        data
    })
}

/**
 * 获取上传凭证
 * @constructor
 */
export function AliOSSCert(data) {
    return request({
        url: '/shop/video/aliosscert',
        method: 'post',
        data
    })
}

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

/**
 * 直播后台
 */

//  我的直播-头部信息
export function myLiveHead(data) {
    return request({
        url: '/Shop/Zhibo/theCompanyOrAnchor',
        method: 'post',
        data
    })
}
//  我的直播-直播列表
export function myLiveList(data) {
    return request({
        url: '/Shop/Zhibo/myZhiBoList',
        method: 'post',
        data
    })
}

//  我的直播-直播操作
export function liveOperation(data) {
    return request({
        url: '/Shop/Zhibo/handleZhiBoInfo',
        method: 'post',
        data
    })
}
//  主播信息
export function liveInfo(data) {
    return request({
        url: '/Shop/Zhibo/getAnchorInfo',
        method: 'post',
        data
    })
}
//  修改主播信息
export function liveChangeInfo(data) {
    return request({
        url: '/Shop/Zhibo/updateAnchor',
        method: 'post',
        data
    })
}
// 上传封面图片
export function shortLiveImgUpload(data) {
    return request({
        url: '/Shop/Zhibo/liveImgUpload',
        method: 'post',
        data: util.functions.assembleForm(data)
    })
}
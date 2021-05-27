import request from '@/plugins/axios'
import util from '@/libs/util'

// 会员卡首页
export function Vipcardindex(data) {
    return request({
        url: '/Frontend/Vipcard/index',
        method: 'post',
        data
    })
}
// 表单
export function getMemberField(data) {
    return request({
        url: '/Frontend/Vipcard/getMemberField',
        method: 'post',
        data
    })
}
// 图片上传
export function uploadFile(data) {
    return request({
        url: '/Frontend/Vipcard/uploadFile',
        method: 'post',
        data
    })
}
// 兑换码
export function cardExchange(data) {
    return request({
        url: '/Frontend/Vipcard/cardExchange',
        method: 'post',
        data
    })
}
// 验证
export function checkCode(data) {
    return request({
        url: '/Frontend/Vipcard/checkCode',
        method: 'post',
        data
    })
}
// 购买记录
export function getOrderList(data) {
    return request({
        url: '/Frontend/Vipcard/getOrderList',
        method: 'post',
        data
    })
}
// 分享
export function getShareImg(data) {
    return request({
        url: '/Frontend/Vipcard/getShareImg',
        method: 'post',
        data
    })
}
// 兑换嘛/提交
export function order_submit(data) {
    return request({
        url: '/xiaochengxu/order/order_submit.php',
        method: 'post',
        data
    })
}
// 表单提交
export function updateFieldsVal(data) {
    return request({
        url: '/Frontend/Vipcard/updateFieldsVal',
        method: 'post',
        data
    })
}
//判断是否是微信登陆
export function wxLogin(data) {
    return request({
        url: '/Frontend/Vipcard/wxLogin',
        method: 'post',
        data
    })
}
export function updateFxParent(data) {
    return request({
        url: '/Frontend/Vipcard/updateFxParent',
        method: 'post',
        data
    })
}


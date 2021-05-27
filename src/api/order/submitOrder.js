import request from '@/plugins/axios'
import util from '@/libs/util'

var username = util.functions.getParameter("username");
/**
 * @Date: 2020-09-08 16:24:05
 * @LastEditors: zhouqi
 * @description: 提交订单接口
 * @param {type} 参数说明
 */
export function getOrderSubmitInfo(data) {
    return request({
        url: '/frontend/mallorder/getOrderSubmitInfo',
        method: 'post',
        data
    })
}


/**
 * @Date: 2020-09-09 17:12:55
 * @LastEditors: zhouqi
 * @description: 提交订单门店配送列表
 * @param {type} 参数说明
 * @return {type} 返回值
 */
export function getStoreinfo(data) {
    return request({
        url: '/frontend/mallorder/getStoreinfo',
        method: 'post',
        data
    })
}


/**
 * @Date: 2020-09-09 17:13:37
 * @LastEditors: zhouqi
 * @description: 提交订单红包列表
 * @param {type} 参数说明
 * @return {type} 返回值
 */
export function getUserRedPacket(data) {
    return request({
        url: '/frontend/mallorder/getUserRedPacket',
        method: 'post',
        data
    })
}

/**
 * @Date: 2020-09-09 17:14:20
 * @LastEditors: zhouqi
 * @description: 提交订单发票抬头列表
 * @param {type} 参数说明
 * @return {type} 返回值
 */
export function getUserInvoiceTitle(data) {
    return request({
        url: '/frontend/mallorder/getUserInvoiceTitle',
        method: 'post',
        data
    })
}

/**
 * @Date: 2020-09-09 17:15:15
 * @LastEditors: zhouqi
 * @description: 生成订单提交接口
 * @param {type} 参数说明
 * @return {type} 返回值
 */
export function orderSubmit(data) {
    return request({
        url: '/frontend/mallorder/order_submit',
        method: 'post',
        data
    })
}
/**
 * @Date: 2020-09-14 11:11:16
 * @LastEditors: zhouqi
 * @description: 上传图片接口
 * @param {String} file对象
 * @return {String} res.path =>图片路径
 */
export function liveImgUpload(data) {
    return request({
        url: `/frontend/mallorder/uploadFile?username=${username}`,
        method: 'post',
        data: util.functions.assembleForm(data)
    })
}

/**
 * @Date: 2020-11-11 15:25:54
 * @LastEditors: zhouqi
 * @description: 社区团下单佣金
 * @param {*} data
 * @return {*}
 */
export function commissionEntry(data) {
    return request({
        url: '/Frontend/Communitymy/commissionEntry',
        method: 'post',
        data
    })
}

/**
 * @Date: 2020-11-11 15:27:22
 * @LastEditors: zhouqi
 * @description: 自提点
 * @param {*} data
 * @return {*}
 */
export function getheaddetail(data) {
    return request({
        url: '/Frontend/Communitymy/getheaddetail',
        method: 'post',
        data
    })
}

/**
 * @Date: 2020-11-16 15:46:00
 * @LastEditors: zhouqi
 * @description: 用户支付卡信息
 * @param {*} data
 * @return {*}
 */
export function getPaymentCardInfo(data) {
    return request({
        url: '/frontend/mallorder/getPaymentCardInfo',
        method: 'post',
        data
    })
}

/**
 * @Date: 2020-11-16 17:18:59
 * @LastEditors: zhouqi
 * @description: 绑定支付卡
 * @param {*} data
 * @return {*}
 */
export function bindPayCard(data) {
    return request({
        url: '/frontend/mallorder/bindPayCard',
        method: 'post',
        data
    })
}

/**
 * @Date: 2020-11-25 15:18:21
 * @LastEditors: zhouqi
 * @description: 色系接口
 * @param {*} data
 * @return {*}
 */
export function getColor(data) {
    return request({
        url: '/frontend/mallorder/getColor',
        method: 'post',
        data
    })
}
/**
 * @Date: 2020-11-27 15:11:01
 * @LastEditors: zhouqi
 * @description: 获取省市区
 * @param {*} data
 * @return {*}
 */
export function getCity(data) {
    return request({
        url: '/frontend/mallorder/getCity',
        method: 'post',
        data
    })
}
/**
 * @Date: 2020-11-27 15:11:01
 * @LastEditors: zhouqi
 * @description: 验证支付密码
 * @param {*} data
 * @return {*}
 */
export function verifyPaymentPassword(data) {
    return request({
        url: '/frontend/mallorder/verifyPaymentPassword',
        method: 'post',
        data
    })
}
/**
 * @Date: 2020-12-22 14:50:24
 * @LastEditors: zhouqi
 * @description: 订单提交成功页
 * @param {*} data
 * @return {*}
 */
export function getOrderSuccess(data) {
    return request({
        url: '/frontend/mallorder/getOrderSuccess',
        method: 'post',
        data
    })
}
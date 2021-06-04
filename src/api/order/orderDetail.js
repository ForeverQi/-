/*
 * @Author       : zhouqi
 * @description  : 订单详情页面相关的接口
 * @Date         : 2020-11-06 17:18:59
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-06-02 15:19:28
 * @FilePath     : /vue-VFrontend/src/api/order/orderDetail.js
 */
import request from '@/plugins/axios'
import util from '@/libs/util'

/**
 * @Date: 2020-11-06 17:21:06
 * @LastEditors: zhouqi
 * @description: 订单详情接口
 * @param {*} data
 * @return {*}
 */
export function getOrderDetail(data){
    return request({
        url:'/frontend/mallorder/getOrderDetail',
        method: 'post',
        data
    })
}
/**
 * @Date: 2020-11-06 17:25:02
 * @LastEditors: zhouqi
 * @description: 分享图
 * @param {*} data
 * @return {*}
 */
export function GeneratePublicImg(data){
    return request({
        url:'/xiaochengxu/shareAlert/GeneratePublicImg.php',
        method:'post',
        data
    })
}
/**
 * @Date: 2020-12-18 11:35:40
 * @LastEditors: zhouqi
 * @description: 支付方式接口
 * @param {*} data
 * @return {*}
 */
export function getPaymentList(data){
    return request({
        url:'/frontend/mallorder/getPaymentList',
        method:'post',
        data
    })
}

/**
 * @Date: 2020-12-21 18:56:10
 * @LastEditors: zhouqi
 * @description: 去支付跳转之前请求改接口
 * @param {*} data
 * @return {*}
 */
export function setPayment(data){
    return request({
        url:"/frontend/mallorder/setPayment",
        method:'post',
        data
    })
}

/**
 * @Date: 2021-04-20 14:22:43
 * @LastEditors: zhouqi
 * @description: 达达进度接口
 * @param {*}
 * @return {*}
 */
 export function getDaDaOrderProgress(data){
    return request({
        url:"/frontend/mallorder/getDaDaOrderProgress",
        method:'post',
        data
    })
}

/**
 * @Date: 2021-04-20 15:09:07
 * @LastEditors: zhouqi
 * @description: 骑手正在配送获取骑手位置
 * @param {*} data
 * @return {*}
 */
export function getDaDaOrderDetails(data){
    return request({
        url:"/frontend/mallorder/getDaDaOrderDetails",
        method:'post',
        data
    })
}
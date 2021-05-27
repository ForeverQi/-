/*
 * @Author       : zhouqi
 * @description  : description
 * @Date         : 2020-12-01 16:45:07
 * @LastEditors  : zhouqi
 * @LastEditTime : 2020-12-23 17:15:29
 * @FilePath     : /vue-VFrontend/src/api/order/afterSales.js
 */
import request from '@/plugins/axios'
import util from '@/libs/util'

var username = util.functions.getParameter("username");
/**
 * @Date: 2020-12-01 16:45:18
 * @LastEditors: zhouqi
 * @description: 售后列表
 * @param {*} data
 * @return {*}
 */
export function getUserReturns(data){
    return request({
        url:'/frontend/mallorder/getUserReturns',
        method: 'post',
        data
    })
}
/**
 * @Date: 2020-12-01 17:37:09
 * @LastEditors: zhouqi
 * @LastEditTime: Do not edit
 * @description: 售后详情
 * @param {*} data
 * @return {*}
 */
export function getReturnsDetail(data){
    return request({
        url:'/frontend/mallorder/getReturnsDetail',
        method: 'post',
        data
    })
}
/**
 * @Date: 2020-12-01 18:09:19
 * @LastEditors: zhouqi
 * @description: 退换货详情
 * @param {*} data
 * @return {*}
 */
export function getUserReturnsApplication(data){
    return request({
        url:'/frontend/mallorder/getUserReturnsApplication',
        method: 'post',
        data
    })
}
/**
 * @Date: 2020-12-01 18:10:08
 * @LastEditors: zhouqi
 * @description: jd售后详情
 * @param {*} data
 * @return {*}
 */
export function ServiceDetailInfo(data){
    return request({
        url:'/frontend/Supplychainaftersale/ServiceDetailInfo',
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
        url: `/frontend/mallorder/uploadFile?username=${username}&type=evaluation`,
        method: 'post',
        data: util.functions.assembleForm(data)
    })
}
/**
 * @Date: 2020-12-01 18:10:08
 * @LastEditors: zhouqi
 * @description: 评价填写接口
 * @param {*} data
 * @return {*}
 */
export function getEvaluateInfo(data){
    return request({
        url:"/frontend/mallorder/getEvaluateInfo",
        method:'post',
        data
    })
}

/**
 * @Date: 2020-12-01 19:10:08
 * @LastEditors: zhouqi
 * @description: 评价列表接口
 * @param {*} data
 * @return {*}
 */
export function getProEvaluate(data){
    return request({
        url:"/frontend/mallorder/getProEvaluate",
        method:'post',
        data
    })
}
/**
 * @Date: 2020-12-07 13:53:54
 * @LastEditors: zhouqi
 * @description: 物流信息
 * @param {*} data
 * @return {*}
 */
export function getLogisticsInfo(data){
    return request({
        url:"/frontend/mallorder/getLogisticsInfo",
        method:'post',
        data
    })
}


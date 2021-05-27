/*
 * @Author       : zhouqi
 * @description  : 供应链接口
 * @Date         : 2020-11-09 15:22:55
 * @LastEditors  : zhouqi
 * @LastEditTime : 2020-11-09 15:25:51
 * @FilePath     : /vue-VFrontend/src/api/gyl.js
 */
import request from '@/plugins/axios'
import util from '@/libs/util'
/**
 * @Date: 2020-09-08 16:24:05
 * @LastEditors: zhouqi
 * @description: 供应链地址编码
 * @param {type} 参数说明
 */
export function getJdAddressCode(data) {
    return request({
        url: '/Frontend/Supplychain/getJdAddressCode',
        method: 'post',
        data
    })
}
/**
 * @Date: 2020-11-09 15:24:31
 * @LastEditors: zhouqi
 * @description: 供应链进货价校验
 * @param {*} data
 * @return {*}
 */
export function getJdProPriceCheck(data) {
    return request({
        url: '/Frontend/Supplychain/getJdProPriceCheck',
        method: 'post',
        data
    })
}

/**
 * @Date: 2020-11-09 15:25:14
 * @LastEditors: zhouqi
 * @description: 供应链查询售后类型
 * @param {*} data
 * @return {*}
 */
export function NumberCompInfo(data) {
    return request({
        url: '/frontend/supplychainaftersale/NumberCompInfo',
        method: 'post',
        data
    })
}
/**
 * @Date: 2020-11-09 15:25:37
 * @LastEditors: zhouqi
 * @description: 供应链售后详情
 * @param {*} data
 * @return {*}
 */
export function ServiceDetailInfo(data) {
    return request({
        url: '/frontend/supplychainaftersale/ServiceDetailInfo',
        method: 'post',
        data
    })
}
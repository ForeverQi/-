/*
 * @Author       : zhouqi
 * @description  : 地址列表页相关接口
 * @Date         : 2020-11-09 14:53:59
 * @LastEditors  : zhouqi
 * @LastEditTime : 2020-11-17 21:44:09
 * @FilePath     : /vue-VFrontend/src/api/address/addressList.js
 */

import request from '@/plugins/axios'
import util from '@/libs/util'

/**
 * @Date: 2020-11-09 15:18:50
 * @LastEditors: zhouqi
 * @description: 地址列表、详情接口
 * @param {*} data.type=>1:列表，2:修改默认地址
 * @return {*}
 */
export function addressInfo(data){
    return request({
        url: `/frontend/mallorder/${ data.type == 1 ? 'getAddressList' : data.type == 2 ? 'setAddrState' : data.type == 3 ? 'modificationAddress' : data.type == 4 ? 'getAddressForm' : data.type == 5 ? 'getAreaInfo' : data.type == 6 ? 'getAllAreaInfo' : 'getAddressList' }`,
        method: 'post',
        data
    })
    // return request({
    //     url: "/frontend/mallorder/getAddressList?username=banish2015&zz_userid=2329219&req=&client_type=1",
    //     method: 'get',
    //     data
    // })
}


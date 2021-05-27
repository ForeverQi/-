import request from '@/plugins/axios'
/**
 * 个人中心接口
 * @constructor
 */
export function personalCenter(data) {
    return request({
        url: '/Frontend/Wapusercenter/index',
        method: 'post',
        data
    })
}
/**
 * @Date: 2020-12-03 18:44:49
 * @LastEditors: qwguo
 * @LastEditTime: Do not edit
 * @description: 获取验证码
 * @param {*} data
 * @return {*}
 */
export function ajaxZhuceCode(data) {
    console.log(data);
    return request({
        url: '/dom/ajax_zhuce_code.php',
        method: 'get',
        params: data
    })
}

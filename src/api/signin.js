import request from '@/plugins/axios'
import util from '@/libs/util'

/**
 * 登录
 * @constructor
 */
export function Login(data) {
    return request({
        url: '/admin/signin/login',
        method: 'post',
        params: util.functions.FormatData(data)
    })
}

/**
 * 登录短信
 * @constructor
 */
export function Msg(data) {
    return request({
        url: '/home/register/sendCode',
        method: 'post',
        params: util.functions.FormatData(data)
    })
}

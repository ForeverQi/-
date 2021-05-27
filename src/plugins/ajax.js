import Hint from '@/plugins/hint'
import util from '@/libs/util'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建一个错误
function errorCreate(msg) {
    const error = new Error(msg)
    errorLog(error)
    throw error
}

// 记录和显示错误
function errorLog(error) {
    // 打印到控制台
    if (process.env.NODE_ENV === 'development') {
        console.log(error)
    }
    // 显示提示
    Hint.Msg({
        message: error.message
    });
}

export default param => {
    NProgress.start();
    param.data.token = util.cookies.get(process.env.VUE_APP_TOKEN) || '';
    param.data.username = util.functions.GetUName();
    param.data.ev_manager = util.cookies.get('ev_manager') || '';

    if (param.data.ProPlatform == 'ShopVideo') {
        // 商家助手用户名
        param.data.username = util.shopVideo.username()
    }

    return new Promise(function(resolve, reject) {
        $.ajax({
            url: process.env.VUE_APP_AJAX + param.url,
            type: param.method || 'POST',
            dataType: 'json',
            async: true,
            data: param.data || {},

            success: function(res) {
                if (res.code === undefined) {
                    errorLog({message: '系统错误, 请稍后重试, code is undefined'})
                    return false
                } else {
                    switch (res.code * 1) {
                        // success
                        case 200:
                            resolve(res.data);
                            break;
                        default:
                            // 不是正确的 code
                            errorCreate(`[ code: ${dataAxios.code}]${dataAxios.msg}: ${response.config.url}`)
                            break
                    }
                }

                NProgress.done()
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                NProgress.done()
                errorLog({message: '系统错误, 请稍后重试'});
                Promise.reject({XMLHttpRequest, textStatus, errorThrown})
            }
        });
    });
};

/*
// api
import ajax from '@/plugins/ajax'
export function test(data) {
    return ajax({
        url: 'http://m.evyun.cn:12701/index/shopLogin',
        method: 'post',
        data: data
    })
}

// 组件
import { login, test } from '@/api/shop/index'

test({username: 'lichlich', password: 111111}).then(data => {
    console.log(data)
});
*/

// import store from '@/store'
import axios from 'axios'
import Hint from '@/plugins/hint'
import util from '@/libs/util'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Qs from 'qs'

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

// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_APP_API,
    timeout: 10000 * 500, // 请求超时时间
    transformRequest: [
        function (data) {
            data = data || {};
            data.timestamp = (new Date()).valueOf();
            // formdata 提交
            if (util.variable.ISFormData) {
                util.variable.ISFormData = false;
                return data;
            } else {
                return Qs.stringify(data);
            }
        }
    ]
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 设置加载动画
        if (!util.variable.unNProgress) {
            NProgress.start()
        }
        // store.dispatch('frontend/loading/showLoading')

        config.headers['TOKEN'] = util.cookies.get(process.env.VUE_APP_TOKEN) || '';
        config.headers['USERNAME'] = util.cookies.get('username') || '';
        config.headers['EV_MANAGER'] = util.cookies.get('ev_manager') || '';
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

        if (Object.prototype.toString.call(config.data) === '[object Object]') {
            config.data.cacheClear = util.functions.GetQueryString("cacheClear") || 0;
        }

        return config
    },
    error => {
        // 发送失败
        console.log(error)
        NProgress.done()
        // store.dispatch('frontend/loading/hideLoading')
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 停止加载动画
        NProgress.done()
        // store.dispatch('frontend/loading/hideLoading')
        // 初始加载进度条
        util.variable.unNProgress = false;

        const dataAxios = response.data
        // 状态码
        const {code} = dataAxios
        if (code === undefined) {
            // return dataAxios
            if (util.variable.AxiosErrorPopup) {
                errorLog({message: '系统错误, 请稍后重试'})
            }

            return Promise.reject(dataAxios)
        } else {
            switch (code * 1) {
                // success
                case 200:
                    return dataAxios.data
                default:
                    // 商家助手登录超时
                    if (
                        util.functions.InArray(code * 1, [2003, 4000])
                        && store.getters.variables.many.IsShopBackend
                    ) {
                        Hint.Alert({
                            title: '提示',
                            message: '登录超时， 请重新登录'
                        }).then(() => {
                            util.app.Shop.Login();
                        });

                        return Promise.reject(dataAxios)
                    }

                    if (util.variable.AxiosErrorPopup) {
                        errorLog({
                            message: dataAxios.msg
                        })
                    }

                    util.variable.AxiosErrorPopup = true;
                    return Promise.reject(dataAxios)
            }
        }
    },
    error => {
        NProgress.done()
        // 初始加载进度条
        util.variable.unNProgress = false;

        // store.dispatch('frontend/loading/hideLoading')
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误'
                    break
                case 401:
                    error.message = '未授权，请登录'
                    break
                case 403:
                    error.message = '拒绝访问'
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 500:
                    error.message = '服务器内部错误'
                    break
                case 501:
                    error.message = '服务未实现'
                    break
                case 502:
                    error.message = '网关错误'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '网关超时'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
                default:
                    break
            }
        }

        errorLog(error)
        return Promise.reject(error)
    }
)

export default service

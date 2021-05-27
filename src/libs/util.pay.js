import util from '@/libs/util'
import Hint from '@/plugins/hint'
import { Indent } from "@/api/shop/pay"

/**
 * 微信 支付宝 支付
 * @demo
 *      微信 h5支付
 *      首先获取opeid pay.wechat.h5.init()
 *      调取支付 pay.wechat.h5.run({
 *          success() {
 *              ...coding
 *          },
 *          failed() {
 *              ...coding
 *          },
 *          indent: {
 *              支付清单
 *          }
 *      })
 *
 *      app 支付
 *      pay.app.run({
 *          // alipay 支付宝app wechat 微信app  [1 微信 4 微信app 5 支付宝app]
 *          pay_type: "alipay",
 *          // 产品id
 *          id: 1,
 *          // 购买年限
 *          year: 'month',
 *          // 支付成功回调
 *          callback: function(res) {
 *              console.log(res)
 *          }
 *      });
 * @type {{wechat: {app(), h5: {init(): void, jsApiCall(*, *=): void, run(*=): void}}, ali: {}}}
 */

const pay = {
    wechat: {
        /**
         * 微信内置浏览器支付 js支付
         */
        h5: {
            /**
             * jsApiCallback
             */
            jsApiCall(conf, params = {indent: {}, success: null, failed: null}) {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    conf,
                    function (res) {
                        if (res.err_msg == 'get_brand_wcpay_request:ok') {
                            // 支付成功回调
                            typeof params.success === "function" && params.success(res)
                        } else {
                            typeof params.failed === "function" && params.failed(res)
                        }
                    }
                );
            },

            /**
             * 检测是否获取openID
             */
            init() {
                if (!util.functions.GetQueryString('openid')) {
                    location.href = "//" + location.host + "/getopenid.php?redirect=" + encodeURI(location.href);
                }
            },

            /**
             * 调取支付
             * @param params
             */
            run(params = {}) {
                // 引入支付js
                $.getScript("//res.wx.qq.com/open/js/jweixin-1.4.0.js", function (response, status) {
                    Indent({
                        ...params.indent,
                        openid: util.functions.GetQueryString('openid')
                    }).then(data => {
                        util.variable.Set({
                            key: "pay",
                            val: false
                        });

                        if (!data) {
                            return Hint.Msg({
                                message: "服务器繁忙，请稍后重试"
                            });
                        }

                        if (typeof WeixinJSBridge == "undefined") {
                            if (document.addEventListener) {
                                document.addEventListener(
                                    'WeixinJSBridgeReady',
                                    function (data) {
                                        pay.wechat.h5.jsApiCall(data, params)
                                    },
                                    false
                                );
                            } else if (document.attachEvent) {
                                document.attachEvent(
                                    'WeixinJSBridgeReady',
                                    function (data) {
                                        pay.wechat.h5.jsApiCall(data, params)
                                    }
                                );
                                document.attachEvent(
                                    'onWeixinJSBridgeReady',
                                    function (data) {
                                        pay.wechat.h5.jsApiCall(data, params)
                                    }
                                );
                            }
                        } else {
                            pay.wechat.h5.jsApiCall(data, params);
                        }
                    }).catch(res => {
                        Hint.Alert({
                            message: JSON.stringify({res})
                        });
                    });
                });
            }
        }
    },

    /**
     * APP支付
     */
    app: {
        /**
         * 获取支付信息
         * @param params
         */
        run(params = {}) {
            util.variable.Set({
                key: "pay",
                val: true
            });
            // 不显示进度条
            util.variable.unNProgress = true;
            // 不显示默认错误
            util.variable.AxiosErrorPopup = false;

            Indent({
                // alipay 支付宝app wechat 微信app  [1 微信 4 微信app 5 支付宝app]
                pay_type: params.pay_type == 'wechat' ? 4 : 5,
                // 产品类型
                id: params.id,
                // 包月或者包年 month 包月 year 包年
                year: params.year,
                // 流量数量
                flow_num: params.flow_num
            }).then(data => {
                util.variable.Set({
                    key: "pay",
                    val: false
                });

                if (!data) {
                    return Hint.Msg({
                        message: data.msg
                    });
                }

                return pay.app.dispatch({
                    // 支付参数
                    content: data,
                    // 支付成功或者失败回调
                    callback: params.callback,
                    // 支付类型
                    pay_type: params.pay_type
                });
            }).catch(res => {
                // 恢复支付点击
                util.variable.Set({
                    key: "pay",
                    val: false
                });

                Hint.Msg({
                    message: data.msg
                });
            });
        },

        /**
         * app支付
         * @param params
         * @returns {*|VanToast}
         */
        dispatch(params = {}) {
            if (!params.content) {
                return Hint.Msg({
                    message: '参数错误'
                });
            }

            if ("function" !== typeof params.callback) {
                return Hint.Msg({
                    message: '参数错误'
                });
            }

            // 支付回调
            window.payCallback = function (res) {
                params.callback(res);
            };

            let platform = util.app.Platform();
            if (params.pay_type == "alipay") {
                // 支付宝
                if (platform === 1) {
                    // 安卓
                    pay.app.android.alipay(params);
                } else if (platform === 2) {
                    // ios
                    pay.app.ios.alipay(params);
                }
            } else if (params.pay_type == "wechat") {
                // 微信
                if (platform === 1) {
                    // 安卓
                    pay.app.android.wechat(params);
                } else if (platform === 2) {
                    // ios
                    pay.app.ios.wechat(params);
                }
            }
        },

        /**
         * 安卓支付
         * @constructor
         */
        android: {
            /**
             * 微信
             * @param params
             */
            wechat(params = {}) {
                window.android.pay(
                    2,
                    JSON.stringify({
                        content: JSON.stringify(params.content),
                        callback: "payCallback"
                    })
                );
            },

            /**
             * 支付宝
             * @param params
             */
            alipay(params = {}) {
                window.android.pay(
                    1,
                    JSON.stringify({
                        content: params.content,
                        callback: "payCallback"
                    })
                );
            },
        },

        /**
         * ios支付
         * @constructor
         */
        ios: {
            /**
             * 微信
             * @param params
             */
            wechat(params = {}) {
                window.webkit.messageHandlers.KIosWeXPayCall.postMessage({
                    content: params.content,
                    callback: "payCallback"
                });
            },

            /**
             * 支付宝
             * @param params
             */
            alipay(params = {}) {
                window.webkit.messageHandlers.KIosWeXPayCall.postMessage({
                    content: params.content,
                    callback: "payCallback"
                });
            },
        }
    }
};

export default pay

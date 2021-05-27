/*
 * @Author       : zhouqi
 * @description  : description
 * @Date         : 2020-11-12 13:33:01
 * @LastEditors  : zhouqi
 * @LastEditTime : 2020-11-23 19:18:35
 * @FilePath     : /vue-VFrontend/src/plugins/ajaxNew.js
 */
import Vue from "vue";

export default {
    install() {
        // 获取用户名和密码
        // let name = location.pathname;
        // let reg = /(^(http[s]?:\/\/[^\/]*\/)|(^\/))([^\/]+)\/.*$/gi;
        // let username = name.replace(reg, "$4");

        // let prosId = name.substring(name.lastIndexOf('/')+1,name.lastIndexOf('.'))

        /**
         * 依赖 app,vue
         * @type {}
         */
        let $F = {
            /**
             * 异步请求
             * @param data
             * @constructor
             */
            Response(data) {
                if (!data || !data.url) {
                    return;
                }
                // data.url = "/api" + data.url;

                let 
                url = "//" + document.domain + "/" + data.url;
                // url = "http://m.evyun.cn" + "/" + data.url;
                // url = "http://xcx.dlszywz.cn" + "/" + data.url;
                // url = data.url;
                // url = 'http://m.ev123.com'+'/'+data.url;
                // url = 'http://m.evyun.cn:12701'+'/'+data.url;

                if (data.ou) {
                    url = data.url;
                }

                $F.Ajax({
                    url: url,
                    method: data.method || "POST",
                    data: data.param || {},
                    checkLogin: data.checkLogin || 1,
                    error: data.error,
                    success: data.success
                });
            },

            /**
             * ajax
             * @param param
             * @constructor
             */
            Ajax(param) {
                $.ajax({
                    // url: $F.PushToken(param.url, "token=" + VueCookies.get('token')),
                    url: param.url,
                    type: param.method || "POST",
                    dataType: "json",
                    async: true,
                    data: param.data || {},
                    /*headers: {
                        HTTP_TOKEN: VueCookies.get('token')
                    },*/
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        typeof param.error === "function" && param.error(XMLHttpRequest, textStatus, errorThrown);
                    },
                    success: function(data) {
                        typeof param.success === "function" && param.success(data, param.data);
                    }
                });
            }

            // username: username
            // pro_id:prosId
        };

        Vue.prototype.$F = $F;
    }
};

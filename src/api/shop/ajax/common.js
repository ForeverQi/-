import Vue from 'vue'

export default {
    install () {

        // 获取用户名和密码
        let name=location.pathname
        let reg=/(^(http[s]?:\/\/[^\/]*\/)|(^\/))([^\/]+)\/.*$/ig
        let username=name.replace(reg,"$4")

        let prosId = name.substring(name.lastIndexOf('/')+1,name.lastIndexOf('.'))

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
            Response (data) {
                if (!data || !data.url) {
                    return;
                }
                // data.url = "/api" + data.url;

                let
                    url = "//" + document.domain+'/'+data.url
                    // url = 'http://m.evyun.cn'+'/'+data.url;
                    
                    // url = 'http://shenyue.m.evyun.cn'+'/'+data.url;
                    // url = 'http://shenyue.m.evyun.cn:12701'+'/'+data.url;

                if (data.ou) {
                    url = data.url;
                }

                $F.Ajax({
                    url: url,
                    method: data.method || 'POST',
                    data: data.param || {},
                    checkLogin: data.checkLogin || 1,
                    error: data.error,
                    success: data.success,
                });
                /*
                // 加载动画
                if (loading) {
                    thisS.AppCtrl.Loading(true)
                }
                axios.defaults.withCredentials = true;
                if (data.type == 'get') {
                    axios.get(url, {
                        token: this.token
                    }).then(function(res) {
                        if (loading) {
                            thisS.AppCtrl.Loading(false)
                        }

                        typeof data.success === "function" && data.success(res.data || {}, data);
                    }).catch(function (error) {
                        typeof data.error === "function" && data.error(error, data);
                    });
                } else {
                    axios.post(url, data.param ? require('qs').stringify(data.param) : {}, {
                        headers: data.header || {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            token: this.token
                        }
                    }).then(function (res) {
                        if (loading) {
                            thisS.AppCtrl.Loading(false)
                        }

                        typeof data.success === "function" && data.success(res.data || {}, data);
                    }).catch(function (error) {
                        typeof data.error === "function" && data.error(error, data);
                    });
                }*/
            },

            /**
             * ajax
             * @param param
             * @constructor
             */
            Ajax (param) {
                $.ajax({
                    // url: $F.PushToken(param.url, "token=" + VueCookies.get('token')),
                    url: param.url,
                    type: param.method || 'POST',
                    dataType: 'json',
                    async: true,
                    data: param.data || {},
                    /*headers: {
                        HTTP_TOKEN: VueCookies.get('token')
                    },*/
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        typeof param.error === "function" && param.error(XMLHttpRequest, textStatus, errorThrown);
                    },
                    success: function (data) {
                        typeof param.success === "function" && param.success(data, param.data);
                    }
                });
            },


            username:username,
            pro_id:prosId
        };

        Vue.prototype.$F = $F;
    }
}

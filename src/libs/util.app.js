import util from '@/libs/util'
import Hint from '@/plugins/hint'
import router from '@/router'

const app = {
    /**
     * 检测安卓 1 ios 2 其他 0
     * app 参数是由app跳转传递
     * @returns {number}
     * @constructor
     */
    Platform () {
        let platform = util.functions.GetQueryString('app');
        if (platform === null) {
            platform = util.cookies.get("app-sign");
        } else {
            util.cookies.set("app-sign", platform, {
                expires: 24 * 3600 * 360,
                path: '/'
            });
        }

        if (platform == 2) {
            return 2;
        } else if (platform == 1) {
            return 1;
        } else {
            // h5
            return 0;
        }
    },

    /**
     * 获取手机型号信息
     * @param data
     * @returns {boolean}
     * @constructor
     */
    PhoneInfomation(data = {}) {
        let platform = app.Platform();

        // 定位回调
        window.PhoneInfomation = function (result) {
            "function" === typeof data.callback && data.callback(result);
        };

        if (platform == 1) {
            // 安卓

        } else if (platform == 2) {
            // ios
            window.webkit.messageHandlers.KIosDeviceName.postMessage({
                callback: "PhoneInfomation"
            });
        }
    },

    /**
     * 商家助手
     */
    Shop: {
        /**
         * 获取定位
         * @param data
         * @returns {*|VanToast}
         * @constructor
         */
        GetLocation(data = {}) {
            if (!data.callback) {
                return Hint.Msg({
                    message: '参数错误'
                });
            }

            // 定位回调
            window.GetLocationCallback = function (result) {
                "function" === typeof data.callback && data.callback(result);
            };

            let platform = app.Platform();
            if (platform == 1) {
                // 安卓
                window.android.getLocation(JSON.stringify({
                    callback: "GetLocationCallback"
                }));
            } else if (platform == 2) {
                // ios
                window.webkit.messageHandlers.KIosGetLoacation.postMessage({
                    callback: "GetLocationCallback"
                });
            }
        },

        /**
         * 分享
         */
        Share: {
            /**
             * 分享到微信
             * @param data
             * @returns {boolean}
             */
            wechat(data) {
                let platform = app.Platform();
                if (platform == 1) {
                    // 安卓 wtype 0:朋友圈、1:好友
                    if (data.type == 0) {
                        // 分享图片
                        window.android.shareThirdPlatform(
                            data.wtype,
                            data.title,
                            data.content,
                            data.link
                        ); //使用应用ICON图片
                    } else if (data.type == 1) {
                        // 分享连接 自定义图片
                        window.android.shareThirdPlatform(
                            data.wtype,
                            data.title,
                            data.content,
                            data.image,
                            data.link
                        );
                    }
                } else if (platform == 2) {
                    // ios
                    if (data.wtype == 0) {
                        // 朋友圈
                        window.webkit.messageHandlers.KIosWXShareToTimeline.postMessage({
                            // 标题
                            title: data.title,
                            // 内容
                            content: data.content,
                            // 图片
                            image: data.image,
                            // 连接
                            link: data.link
                        });
                    } else if (data.wtype == 1) {
                        // 好友
                        window.webkit.messageHandlers.KIosWXShareToFriend.postMessage({
                            // 标题
                            title: data.title,
                            // 内容
                            content: data.content,
                            // 图片
                            image: data.image,
                            // 连接
                            link: data.link
                        });
                    }
                }
            },

            /**
             * 下载图片
             * @param data
             * @returns {*|VanToast}
             */
            download(data = {}) {
                if (!data.url) {
                    return Hint.Msg({
                        message: '参数错误'
                    });
                }

                let platform = app.Platform();
                if (platform == 1) {
                    // 安卓
                    window.android.downloadImage(JSON.stringify(data));
                } else if (platform == 2) {
                    // ios
                    window.webkit.messageHandlers.KIosDownLoadImageToNative.postMessage(data)
                }
            },

            /**
             * 复制内容
             * @param data
             * @returns {*|VanToast}
             */
            copy(data = {}) {
                if (!data.content) {
                    return Hint.Msg({
                        message: '参数错误'
                    });
                }

                let platform = app.Platform();
                if (platform == 1) {
                    // 安卓
                    return window.android.copyToClipboard(JSON.stringify(data));
                } else if (platform == 2) {
                    // ios
                    return window.webkit.messageHandlers.KIosCopyUrlToBoard.postMessage(data)
                }

                return Hint.Msg({
                    message: '复制成功'
                });
            }
        },

        /**
         * 刷新
         * @param enable false关闭 true开启
         * @param type 0:下拉，1:上拉
         * @constructor
         */
        Refresh (enable, type) {
            let Platform = app.Platform();
            if (Platform == 1) {
                android.refreshType(type, enable);
            } else if (Platform == 2) {
                window.webkit.messageHandlers.kIosRefreshViewHide.postMessage({
                    enable: enable ? 1 : 0
                });
            }
        },

        /**
         * 状态栏
         * @param param {color, callback}
         * @constructor
         */
        StatusBar(param) {
            let Platform = app.Platform();

            if ("function" === typeof param.callback) {
                window.ChangeHeaderHeight = param.callback;
                param.callback = 'ChangeHeaderHeight';
            }

            if (Platform == 1) {
                android.updateStatusColor(JSON.stringify(param));
            } else if (Platform == 2) {
                if (param.color) {
                    if (param.color.toLowerCase() == '#fff') {
                        // 状态栏文字黑色
                        app.Shop.StatusBarFontColor(1);
                    } else {
                        // 状态栏文字白色
                        app.Shop.StatusBarFontColor(0);
                    }
                }
                window.webkit.messageHandlers.kIosStatuBarStyle.postMessage(param);
            }
        },

        /**
         * 状态栏文字颜色
         * @param sign 0 白色(默认) 1 黑色
         * @constructor
         */
        StatusBarFontColor (sign) {
            window.webkit.messageHandlers.kIosStatuBarTintColor.postMessage({
                defalut: sign
            });
        },

        /**
         * 显示隐藏底部
         * @param sign
         * @constructor
         */
        ShowFooterMenu(sign) {
            let Platform = app.Platform();

            if (Platform == 1) {
                android.showAndHideNavigation(
                    JSON.stringify({
                        // 0:完全隐藏、1:隐藏内容(导航高度保留)、2：显示导航
                        visible: sign == 1 ? 2 : 0
                    })
                );
            } else if (Platform == 2) {
                if (sign) {
                    window.webkit.messageHandlers.kIosBottomControlShow.postMessage(1);
                } else {
                    window.webkit.messageHandlers.kIosBottomControlHide.postMessage(0);
                }
            }

            // 关闭左右切换
            if (!sign) {
                app.Shop.MenuTab(false);
            }
        },

        /**
         * 退出登录
         * @constructor
         */
        Login() {
            let Platform = app.Platform();

            if (Platform == 1) {
                window.android.login(JSON.stringify({}));
            } else if (Platform == 2) {
                window.webkit.messageHandlers.kIosLogOut.postMessage(1)
            } else {
                router.push("/shop/bac/login")
            }
        },

        /**
         * 是否开启底部菜单切换
         * @param sign 0 关闭 1开启
         * @constructor
         */
        MenuTab(sign) {
            let Platform = app.Platform();

            if (Platform == 1) {
                window.android.setScrollable(!!sign)
            }
        }
    }
};

export default app


/*// 分享有图
util.app.Share.Shop.wechat({
    type: 1,
    wtype: 0,
    title: '有图分享标题',
    content: '有图分享有图分享有图分享',
    link: 'https://www.baidu.com',
    image: 'http://haibao.dlssyht.cn/Uploads/syspic/scene/baaae76afb415e03eaa5ff193d43e4b9.png',
})

// 分享无图
util.app.Share.Shop.wechat({
    type: 1,
    wtype: 0,
    title: '无图分享标题',
    content: '无图分享无图分享无图分享',
    link: 'https://www.baidu.com',
})

// 下载
util.app.Share.Shop.download({url: "http://haibao.dlssyht.cn/Uploads/pic/424150/201805/5afe53c2db1fc.JPG"})

// 复制
util.app.Share.Shop.copy({content: "我是复制内容我是复制内容我是复制内容"})

// 修改状态栏高度
util.app.Shop.StatusBar({
    // color: '#fff',
    callback: function (params) {
        // 获取状态栏高度 修改头部高度
    }
})

// 获取定位
util.app.GetLocation({
    callback: function (res) {
        if ("failure" == res) {
            alert('获取失败')
        } else {
            let platform = util.app.Platform();
            if (platform == 1) {
                // 安卓返回的数据格式
                {
                    "altitude": 4.9E-324,
                    "country": "中国",
                    "locationWhere": 1,
                    "city": "北京市",
                    "cityCode": "131",
                    "latitude": 39.863418,
                    "derect": -1.0,
                    "speed": 0.0,
                    "userIndoorState": 1,
                    "province": "北京市",
                    "operators": 0,
                    "countryCode": "0",
                    "street": "闽龙北路",
                    "adCode": "110105",
                    "addrStr": "中国北京市朝阳区闽龙北路",
                    "satelliteNumber": -1,
                    "networkLocationType": "wf",
                    "indoorNetworkState": 2,
                    "radius": 40.0,
                    "gpsCheckStatus": 0,
                    "direction": -1.0,
                    "longitude": 116.489008,
                    "address": {
                        "adcode": "110105",
                        "address": "中国北京市朝阳区闽龙北路",
                        "city": "北京市",
                        "cityCode": "131",
                        "country": "中国",
                        "countryCode": "0",
                        "district": "朝阳区",
                        "province": "北京市",
                        "street": "闽龙北路",
                        "streetNumber": ""
                    },
                    "streetNumber": "",
                    "coorType": "bd09ll",
                    "indoorLocationSource": 0,
                    "indoorLocationSurpport": 0,
                    "locTypeDescription": "NetWork location successful!",
                    "locationID": "q_W2_PHs57m17rmtvaqst7Kfn-TjyLmdssblu5SQtJHa-IuK_IqP2dr38abbptzdnYDKzsObmcmUl8CRxMGSxbDg6ujv7_Cws_nntKq1vL_7pKGvo_FfOEZE",
                    "district": "朝阳区",
                    "time": "2020-01-06 15:28:28",
                    "locType": 161,
                    "gpsAccuracyStatus": 0
                }
            } else if (platform == 2) {
                // ios
                {"district":"朝阳区","latitude":39.862893569711254,"province":"北京市","city":"北京市","longitude":116.48899440187128,"cityCode":"131"}
            }
            alert(res || '没有接收到数据')
        }
    }
})*/

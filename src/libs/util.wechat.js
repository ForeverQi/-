import router from '@/router'
import store from '@/store'
import util from '@/libs/util'
import Hint from '@/plugins/hint'
import {weixinShare} from "@/api/shop/video.frontend"
import wx from 'weixin-js-sdk'

/**
 * 微信js-sdk
 * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */

const wechat = {
    /**
     * 微信分享
     * @param callback
     * @param url
     * @param name rewrite ^(.*)/([0-9a-zA-Z_-]+)/wap_pro/([0-9]+)\.html$ $1/V/index.html?username=$2&pro_id=$3 last;
     */
    share(callback, url, name,type) {
        let getData = ''
        // 这边的接口请换成你们自己的
        weixinShare({
            username: name,
            url: url
        }).then(res => {
            getData = res.signPackage;
            wx.config({
                debug: false, // 开启调试模式
                appId: res.signPackage.appId, // 必填，公众号的唯一标识
                timestamp: res.signPackage.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.signPackage.nonceStr, // 必填，生成签名的随机串
                signature: res.signPackage.signature, // 必填，签名，见附录1
                jsApiList: [
                    "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ",'checkJsApi','getLocation', 'openLocation','openAddress'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
        });

        wx.ready(() => {
            if(type == 1){
                // 如果需要定制ready回调方法
                if (callback) {
                    callback(getData)
                }
            }else if(type == 2){//获取位置
                wx.openLocation({
                    latitude : callback[3], // 纬度，浮点数，范围为90 ~ -90
                    longitude : callback[2], // 经度，浮点数，范围为180 ~ -180。
                    name : callback[0] ? callback[0] : '门店位置', // 位置名
                    address : callback[1], // 地址详情说明
                    scale : 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
                    infoUrl : 'http://www.gongjuji.net' // 在查看位置界面底部显示的超链接,可点击跳转（测试好像不可用）
                });
            }else if(type == 3){//获取收货地址
                wx.ready(function() {
                    wx.openAddress({
                        success: function(res) {
                            if (callback) {
                                callback(res)
                            }
                        },
                        fail: function(err) {
                            alert(err.errMsg)
                        }
                    });
                });
            }

        })
    },

    /**
     * [ShareTimeline 微信分享到朋友圈]
     * @param {[type]} option [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    ShareTimeline(option) {
        wx.onMenuShareTimeline({
            title: option.title, // 分享标题
            link: option.link, // 分享链接
            imgUrl: option.imgUrl, // 分享图标
            success() {
                // 用户成功分享后执行的回调函数
                option.success()
            },
            cancel() {
                // 用户取消分享后执行的回调函数
                option.error()
            }
        })
    },

    /**
     * [ShareAppMessage 微信分享给朋友]
     * @param {[type]} option [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    ShareAppMessage(option) {

        wx.onMenuShareAppMessage({
            title: option.title, // 分享标题
            desc: option.desc, // 分享描述
            link: option.link, // 分享链接
            imgUrl: option.imgUrl, // 分享图标
            success() {
                // 用户成功分享后执行的回调函数
                option.success()
            },
            cancel() {
                // 用户取消分享后执行的回调函数
                option.error()
            }
        })
    }
};

export default wechat

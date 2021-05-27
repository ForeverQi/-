/**
 * 微信js-sdk
 * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
import Vue from 'vue'
import wx from 'weixin-js-sdk'
const vue = new Vue({})
// 视频详情
import { weixinShare } from "@/api/shop/video.frontend"
const wxApi = {
  /**
  * [wxRegister 微信Api初始化]
  * @param  {Function} callback [ready回调函数]
  */
  wxRegister (callback,url,name) {
    // const url = window.location.href
    // const param = url.split('?')[1].split('&')
    // const paramJson = {}
    // for(let i of param){
    //   paramJson[i.split("=")[0]] = i.split("=")[1];
    // }
    let getData = ''
    // 这边的接口请换成你们自己的
    weixinShare(
      {
        username: name,
        url: url
      }
  ).then(res=>{
    getData = res.signPackage
        wx.config({
          debug: false, // 开启调试模式
          appId: res.signPackage.appId, // 必填，公众号的唯一标识
          timestamp: res.signPackage.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.signPackage.nonceStr, // 必填，生成签名的随机串
          signature: res.signPackage.signature, // 必填，签名，见附录1
          jsApiList: [
            "onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
  })
    // vue.$F.Response({
    //   url: "Frontend/Bargain/bargainWxShare",
    //   param: {
    //     username: name,
    //     url: url
    //     /* timeout: 5000,
    //     withCredentials: true */
    //   },
    //   success:(res) => {
    //     getData = res.data.signPackage
    //     // let data = JSON.parse(res.data) // PS: 这里根据你接口的返回值来使用
    //     wx.config({
    //       debug: false, // 开启调试模式
    //       appId: res.data.signPackage.appId, // 必填，公众号的唯一标识
    //       timestamp: res.data.signPackage.timestamp, // 必填，生成签名的时间戳
    //       nonceStr: res.data.signPackage.nonceStr, // 必填，生成签名的随机串
    //       signature: res.data.signPackage.signature, // 必填，签名，见附录1
    //       jsApiList: [
    //         "onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"
    //       ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //     })

        
    //   },
    //   error: (error)=>{}
    // })
   /*  Axios.post('http://m.evyun.cn/mallorder/api/wx_share_info.php?username='+name, { reqUrl: window.location.href }, { timeout: 5000, withCredentials: true }).then((res) => {
      let data = JSON.parse(res) // PS: 这里根据你接口的返回值来使用
      console.log(data)
      wx.config({
        debug: false, // 开启调试模式
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
					"onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"
			  	] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    }).catch((error) => {
      console.log(error)
    }) */
    wx.ready(() => {
      // 如果需要定制ready回调方法
      if (callback) {
        callback(getData)
      }
    })
  },
  /**
  * [ShareTimeline 微信分享到朋友圈]
  * @param {[type]} option [分享信息]
  * @param {[type]} success [成功回调]
  * @param {[type]} error   [失败回调]
  */
  ShareTimeline (option) {
    wx.onMenuShareTimeline({
      title: option.title, // 分享标题
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel () {
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
  ShareAppMessage (option) {
   
 wx.onMenuShareAppMessage({
      title: option.title, // 分享标题
      desc: option.desc, // 分享描述
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
   

  }
}
export default wxApi
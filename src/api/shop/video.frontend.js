import request from '@/plugins/axios'
import util from '@/libs/util'
import ajax from '@/plugins/ajax'

// 基本信息
export function baseInfoShow(data) {
    return request({
        url: '/shop/video/setting',
        method: 'post',
        data
    })
}
// 更换封面
export function changeFM(data) {
    return request({
        url: '/shop/video/banner',
        method: 'post',
        data
    })
}
// 展示视频列表
export function showVideoList(data) {
    return request({
        url: '/shop/video/list',
        method: 'post',
        data
    })
}
// 上下架视频
export function videoShelf(data) {
    return request({
        url: '/shop/video/publish',
        method: 'post',
        data
    })
}
// 删除视频
export function videoDel(data) {
    return request({
        url: '/shop/video/del',
        method: 'post',
        data
    })
}
// 上传图片
export function upLoadImage(data) {
    return request({
        url: '/shop/index/upload',
        method: 'post',
        data
    })
}

// 第三方视频处理
export function thirdParty(data) {
    return request({
        url: '/shop/video/getResolveInfo',
        method: 'post',
        data
    })
}


// 商品频道展示
export function showProChannel(data){
    return request({
        url: '/Shop/Video/shortVideoProChannel',
        method: 'post',
        data
    });
}
// 视频详细页展示
export function videoDetailShow(data){
    return request({
        url: '/Shop/Video/shortVideoDetailShow',
        method: 'post',
        data
    });
}

// 商品展示
/* export function showProChannel(data){
    return request({
        url: 'http://shenyue.m.evyun.cn/mallorder/api/short_video_pro_list.php?username=shenyue&type=14&channel_id=21284276&pro_ids_str=16885230,16885229,16885228,16885226,16885225&page=1',
        method: 'post',
        data
    });
} */
// 商品展示
export function showProList(data) {
    util.variable.unNProgress = true;
    data.real_host = location.host;
    return ajax({
        url: '/mallorder/api/short_video_pro_list.php',
        method: 'post',
        data: {...{type:14, front: 0}, ...data}
    })
}


/**
 * 获取短视频详情接口
 * @constructor
 */
export function videoDetail(data) {
    data.real_host = location.host;
    return request({
        url: '/Frontend/Shortvideo/shortVideoDetail',
        method: 'post',
        data
    })
}

/**
 * 获取真实地址视频详情接口
 * @constructor
 */
export function videoDetailReally(data) {
    util.variable.unNProgress = true;
    return request({
        url: '/frontend/Shortvideo/getVideoPlayUrl',
        method: 'post',
        data
    })
}

/**
 * 获取短视频分享接口
 * @constructor
 */
export function videoDetailShare(data) {
    // util.variable.unNProgress = true;
    return request({
        url: '/Frontend/Shortvideo/shortVideoShareDetail',
        method: 'post',
        data: {
            ...data,
            real_host: location.host
        }
    })
}
/**
 * 获取短视频分享记录接口
 * @constructor
 */
export function videojiLuShare(data) {
    // util.variable.unNProgress = true;
    return request({
        url: '/Frontend/Shortvideo/shortVideoShareLog',
        method: 'post',
        data
    })
}

/**
 * 获取短视频点赞接口
 * @constructor
 */
export function videoDetailZhan(data) {
    util.variable.unNProgress = true;
    return request({
        url: '/Frontend/Shortvideo/shortVideoLikeLog',
        method: 'post',
        data
    })
}


/**
 * 获取商品列表接口
 * @constructor
 */
export function videoList(data) {
    util.variable.unNProgress = true;
    return request({
        url: '/Frontend/Shortvideo/shortVideoList',
        method: 'post',
        data
    })
}
/**
 * 获取浏览记录接口
 * @constructor
 */
export function browsingHistory(data) {
    util.variable.unNProgress = true;
    return request({
        url: '/Frontend/Shortvideo/shortVideoBrowseLog',
        method: 'post',
        data
    })
}

/**
 * 微信分享接口
 * @constructor
 */
export function weixinShare(data) {
    util.variable.unNProgress = true;
    return request({
        url: '/Frontend/Bargain/bargainWxShare',
        method: 'post',
        data
    })
}

/**
 * 流量验证接口
 * @constructor
 */
export function shortVideo(data) {
    util.variable.unNProgress = true;
    return request({
        url: '/Frontend/Shortvideo/shortVideoFlowCheck',
        method: 'post',
        data
    })
}

/**
 * 流量记录接口
 * @constructor
 */
export function juluVideo(data) {
    util.variable.unNProgress = true;
    return request({
        url: '/Frontend/Shortvideo/shortVideoFlowLog',
        method: 'post',
        data
    })
}

/**
 * 微信自动登录接口
 * @constructor
 */
export function weixinLogin(data) {
    util.variable.unNProgress = true;
    return request({
        url: '/Frontend/Shortvideo/shortVideoWeChat',
        method: 'post',
        data
    })
}
/**
 * 短视频列表微信分享
 * @constructor
 */
export function videoChannelShare(data) {
    // util.variable.unNProgress = true;
    return request({
        url: '/Frontend/Shortvideo/shortVideoChannelShare',
        method: 'post',
        data
    })
}

/**
 * 短视频分类列表
 * @constructor
 */
export function videoFenlei(data) {
    return request({
        url: '/Frontend/Shortvideo/classListShow',
        method: 'post',
        data
    })
}

/**
 * 短视频列表搜索记录获取
 * @constructor
 */
export function videoSearchList(data) {
    return request({
        url: '/Frontend/Shortvideo/searchLog',
        method: 'post',
        data
    })
}


/**
 * 短视频列表删除搜索记录
 * @constructor
 */
export function videoDeleteSearch(data) {
    return request({
        url: '/Frontend/Shortvideo/searchLogDel',
        method: 'post',
        data
    })
}


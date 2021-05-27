import request from '@/plugins/axios'
import util from '@/libs/util'
import ajax from '@/plugins/ajax'

// 基本信息
export function Setting(data) {
    return request({
        url: '/shop/video/setting',
        method: 'post',
        data
    })
}

// 更换封面
export function indexCover(data) {
    return request({
        url: '/shop/video/banner',
        method: 'post',
        data: util.functions.assembleForm(data)
    })
}

// 视频分类列表
export function classListShow(data){
    return request({
        url: '/shop/video/classListShow',
        method: 'post',
        data
    });
}
// 视频分类单个操作
export function classInfoHandle(data){
    return request({
        url: '/shop/video/classInfoHandle',
        method: 'post',
        data
    });
}
// 视频分类批量修改
export function classListHandle(data){
    return request({
        url: 'shop/video/classListHandle',
        method: 'post',
        data
    });
}

// 视频更改分类
export function transferClass(data){
    return request({
        url: '/shop/video/transferClass',
        method: 'post',
        data
    });
}

// 展示视频列表
export function showVideoList(data) {
    return request({
        url: '/shop/video/list',
        method: 'post',
        data
    })
}
// 搜索记录获取
export function searchLog(data) {
    return request({
        url: '/shop/video/searchLog',
        method: 'post',
        data
    })
}
// 搜索记录删除
export function searchLogDel(data) {
    return request({
        url: 'shop/video/searchLogDel',
        method: 'post',
        data
    })
}
// 视频详情获取
export function shortVideoDetail(data) {
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
export function getVideoPlayUrl(data) {
    util.variable.unNProgress = true;
    return request({
        url: '/frontend/Shortvideo/getVideoPlayUrl',
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

// 上传广告图片
export function upLoadImage(data) {
    return request({
        url: '/shop/index/upload',
        method: 'post',
        data: util.functions.assembleForm(data)
    })
}

// 上传封面图片
export function shortVideoImgUpload(data) {
    return request({
        url: '/Shop/Video/shortVideoImgUpload',
        method: 'post',
        data: util.functions.assembleForm(data)
    })
}

// 第三方视频处理
export function getResolveInfo(data) {
    return request({
        url: '/shop/video/getResolveInfo',
        method: 'post',
        data
    })
}

// 上传视频
export function uploadVideo(data) {
    return request({
        url: '/shop/video/upload',
        method: 'post',
        data: util.functions.assembleForm(data)
    })
}

// 视频封面获取
export function getVideoCover(data) {
    return request({
        url: '/shop/video/infomation',
        method: 'post',
        data: data
    })
}

// 视频发布页展示
export function shortVideoDetailShow(data) {
    return request({
        url: '/Shop/Video/shortVideoDetailShow',
        method: 'post',
        data
    });
}

// 视频发布页操作
export function shortVideoDetailHandle(data) {
    return request({
        url: '/Shop/Video/shortVideoDetailHandle',
        method: 'post',
        data
    });
}

// 商品频道展示
export function showProChannel(data) {
    return request({
        url: '/Shop/Video/shortVideoProChannel',
        method: 'post',
        data
    });
}

// 链接二维码链接展示多个
export function shortVideoPosterShow(data) {
    return request({
        url: '/Shop/Video/shortVideoPosterShow',
        method: 'post',
        data
    });
}

// 链接二维码链接展示单个
export function posterDetailShow(data) {
    return request({
        url: '/Shop/Video/posterDetailShow',
        method: 'post',
        data
    });
}

// 链接二维码链接编辑
export function shortVideoPosterHandle(data) {
    return request({
        url: '/Shop/Video/shortVideoPosterHandle',
        method: 'post',
        data
    });
}

// 链接二维码链接删除
export function shortVideoPosterDel(data) {
    return request({
        url: '/Shop/Video/shortVideoPosterDel',
        method: 'post',
        data
    });
}

// 门店展示多个
export function shortVideoPosterStore(data) {
    return request({
        url: '/Shop/Video/shortVideoPosterStore',
        method: 'post',
        data
    });
}

// 门店展示单个
export function storeDetailShow(data) {
    return request({
        url: '/Shop/Video/storeDetailShow',
        method: 'post',
        data
    });
}

// 门店操作
export function shortVideoPosterStoreHandle(data) {
    return request({
        url: '/Shop/Video/shortVideoPosterStoreHandle',
        method: 'post',
        data
    });
}

// 门店删除
export function shortVideoPosterStoreDel(data) {
    return request({
        url: '/Shop/Video/shortVideoPosterStoreDel',
        method: 'post',
        data
    });
}

// 城市选择
export function useStoreCity(data) {
    return request({
        url: '/Shop/Video/useStoreCity',
        method: 'post',
        data
    });
}

// 查找链接
export function shortVideoPosterLink(data) {
    return request({
        url: '/Shop/Video/shortVideoPosterLink',
        method: 'post',
        data
    });
}

// 商品展示
export function showProList(data) {
    /*return ajax({
        url: '/mallorder/api/short_video_pro_list.php',
        method: 'post',
        data: {
            ProPlatform: "ShopVideo",
            type: 14,
            front: 0,
            ...data
        }
    })*/

    return request({
        url: '/Shop/Video/vipProList',
        method: 'post',
        data: {
            ProPlatform: "ShopVideo",
            type: 14,
            front: 0,
            ...data
        }
    });
}

// 分享接口
export function shortVideoShareDetail(data) {
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
 * 产品购买清单
 * @param data
 * @constructor
 */
export function PayConf(data) {
    return request({
        url: '/stranger/shop/videoPayConf',
        method: 'post',
        data
    })
}

/**
 * 套餐接口
 * @param data
 * @constructor
 */
export function setMealQuery(data) {
    return request({
        url: '/shop/video/setMealQuery',
        method: 'post',
        data
    })
}

/* 空间查询接口 */
export function userSpaceFLow(data) {
    return request({
        url: '/Shop/Video/userSpaceFLow',
        method: 'post',
        data
    })
}


/**
 * 套餐接口
 * @constructor
 */
export function shareSetting() {
    return request({
        url: '/shop/video/shareSetting',
        method: 'post',
        data: {real_host: location.host, is_backstage: 1}
    })
}

/**
 * @Date: 2021-01-27 14:54:26
 * @LastEditors: qwguo
 * @LastEditTime: Do not edit
 * @description: 函数说明
 * @param {*}
 * @return {*}
 */

export function productClass(data){
    return request({
        url: '/Shop/Product/productClass',
        method: 'post',
        data: data
    });
}
/**
 * @Date: 2021-01-28 17:05:25
 * @LastEditors: qwguo
 * @LastEditTime: Do not edit
 * @description: 添加产品
 * @param {*} data
 *  token	是	string	用户token
    channel_id	是	int	频道ID
    pro_name	是	string	商品名称
    one_class_id	是	int	1级分类ID
    tow_class_id	否	int	2级分类ID
    three_class_id	否	int	3级分类ID
    pro_price	否	float	商品售价
    pro_pic_arr	否	array	商品图片数组（注：key=0会作为主图）
    pid	否	int	商品ID
 * @return {*}
 */
export function proAddEditInfo(data){
    return request({
        url: '/Shop/Product/proAddEditInfo',
        method: 'post',
        data: data
    });
}


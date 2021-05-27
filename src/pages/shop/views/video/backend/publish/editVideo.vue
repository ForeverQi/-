<!--
 * @Author: your qwguo
 * @Date: 2020-01-13 14:16:17
 * @LastEditTime : 2021-01-29 16:43:30
 * @LastEditors  : zhouqi
 * @Description: 视频编辑
 * @FilePath     : /vue-VFrontend/src/pages/shop/views/video/backend/publish/editVideo.vue
 -->
<template>
<transition name="custom-classes-transition" enter-active-class="animated fadeInRightBig" leave-active-class="animated fadeOutRightBig">
    <div class="page-wrap edit-video-page">
        <!-- 页面内容 -->
        <div class="page-layout edit-video-wrap" :class="{ blur: Advert.addState }">
            <!-- 页面顶部 -->
            <PageHead :title="'发布视频'" />
            <!-- 页面内容 -->
            <div class="page-body" id="pageBody" v-if="!pageLoading">
                <!-- <div id="infoBox"></div> -->
                <!-- 视频信息相关的 -->
                <template v-if="!Video.loading">
                    <div class="head-cover">
                        <div class="prop-box">
                            <h5 class="title">标题封面</h5>
                            <textarea v-model="Video.vTitle" placeholder="请输入您的视频标题(最多支持60个汉字)"></textarea>
                        </div>
                        <div class="cover-box">
                            <div class="img-box">
                                <img :src="Video.vCover.imgUrl" />
                                <span class="loading-icon" v-if="Video.vCover.uploading"><b>封面生成中...大约30秒左右</b></span>
                            </div>
                            <span class="change-btn" v-if="!Video.vCover.uploading">
                                更换封面
                                <input name="coverFile" type="file" accept="image/*" @change="CoverUpload($event)" />
                            </span>
                        </div>
                    </div>
                    <div class="share-explain">
                        <h5 class="title">分享描述</h5>
                        <textarea @blur="textBlur" v-model="Video.vExplain" placeholder="请输入您的分享描述,分享好友时将做为默认的分享文案(最大支持设置40个汉字)"></textarea>
                        <!-- <div class="cover-box">
                                <div class="img-box">
                                    <img :src="Video.vCover.imgUrl" />
                                </div>
                                <span class="change-btn" @click="showCropperPopup">分享图编辑</span>
                            </div> -->
                    </div>
                    <div class="classify-select" @click="selectClassifyShow">
                        <h5 class="title">视频分类</h5>
                        <span class="cur-classify"><b>{{Video.vClassify.name}}</b><i class="sjzs-icon s-icon-right-1"></i></span>
                    </div>
                </template>

                <!-- 广告相关 -->
                <div class="add-advert">
                    <h5 class="title">植入广告</h5>
                    <!-- 广告列表 -->
                    <div class="list-area" v-if="Advert.list && Advert.list.length">
                        <!-- 门店输出样式 -->
                        <template v-if="Advert.type === 2">
                            <div class="list-item store-list-item" v-for="(item, index) in Advert.list" :key="index">
                                <div class="img-box">
                                    <img :src="item.pic" :alt="item.name" />
                                </div>
                                <dl class="attr-box">
                                    <dt>{{ item.name }}</dt>
                                    <dd>
                                        <ul>
                                            <li>
                                                <i class="tel-icon"></i>
                                                <span>{{ item.tel }}</span>
                                            </li>
                                            <li>
                                                <i class="location-icon"></i>
                                                <span>
                                                    {{ item.show_text }}
                                                </span>
                                            </li>
                                        </ul>
                                    </dd>
                                </dl>
                            </div>
                        </template>

                        <!-- 二维码 and 链接 -->
                        <template v-if="Advert.type === 3 || Advert.type === 4">
                            <div class="list-item code-list-item" v-for="(item, index) in Advert.list" :key="index">
                                <div class="img-box">
                                    <img :src="item.pic" :alt="item.brief" />
                                </div>
                                <dl class="attr-box">
                                    <dt><span>{{ item.title }}</span></dt>
                                    <dd>
                                        <p>{{ item.brief }}</p>
                                    </dd>
                                </dl>
                            </div>
                        </template>

                        <!-- 产品 -->
                        <template v-if="Advert.type === 1">
                            <!-- 一个商品 -->
                            <template v-if="Advert.list.length === 1">
                                <div class="list-item pro-list-item" v-for="(item, index) in Advert.list">
                                    <div class="img-box">
                                        <img :src="item.pro_pic" />
                                    </div>
                                    <dl class="attr-box">
                                        <dt><span>{{ item.pro_name }}</span></dt>
                                        <dd>
                                            <div class="price-box">
                                                <span class="vip-p">
                                                    {{ item.pro_price }}
                                                </span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </template>
                            <!-- 多个商品 -->
                            <template v-if="Advert.list.length > 1">
                                <div class="list-item more-pro-item">
                                    <div class="pic-group" v-if="!Advert.listOpen">
                                        <div class="pic-area">
                                            <span class="pic-box" v-for="(item,
                                                    index) in Advert.list" :key="index">
                                                <img :src="item.pro_pic" :alt="item.pro_name" />
                                            </span>
                                        </div>
                                        <div class="pic-more" @click="Advert.listOpen = 1">
                                            <span>
                                                <i></i>
                                                <i></i>
                                                <i></i>
                                            </span>
                                            <b>
                                                共{{ Advert.list.length }}件
                                            </b>
                                        </div>
                                    </div>
                                    <div class="more-pro-list" v-if="Advert.listOpen">
                                        <div class="pro-h">
                                            <b>
                                                共{{ Advert.list.length }}件
                                            </b>
                                            <span @click="Advert.listOpen = 0">收起</span>
                                        </div>
                                        <ul class="pro-b">
                                            <li class="list-item pro-list-item" v-for="(item,
                                                    index) in Advert.list" :key="index">
                                                <div class="img-box">
                                                    <img :src="item.pro_pic" :alt="item.pro_name" />
                                                </div>
                                                <dl class="attr-box">
                                                    <dt>
                                                        <span>{{ item.pro_name }}</span>
                                                    </dt>
                                                    <dd>
                                                        <div class="sales-box" v-if="item.full_cut_info">
                                                            <span v-for="(v, i) in item.full_cut_info.rule_alert">{{v}}</span>
                                                        </div>
                                                        <div class="price-box">
                                                            <template v-if="!item.pro_tag">
                                                                <template v-if="item.pro_original_price_show == 1">
                                                                    <span class="vip-p">{{item.pro_price}}</span>
                                                                    <span class="com-p">{{item.pro_original_price}}</span>
                                                                    <!-- <span v-if="!item.pro_tag" class="del-p">{{item.pro_price}}</span>
                                                                        <span v-if="item.pro_tag" class="tag" :class="{'vip-tag': item.pro_tag== '会员价', 'xsg-tag': item.pro_tag== '限时购'}">{{item.pro_tag}}</span> -->
                                                                </template>
                                                                <template v-if="item.pro_original_price_show == 0">
                                                                    <span class="vip-p">{{item.pro_price}}</span>
                                                                </template>
                                                            </template>
                                                            <template v-if="item.pro_tag">
                                                                <span class="vip-p">{{item.pro_price}}</span>
                                                                <span class="com-p">{{item.pro_original_price}}</span>
                                                                <span class="tag" :class="{'vip-tag': item.pro_tag== '会员价', 'xsg-tag': (['限时购','清仓购'].indexOf(item.pro_tag) != -1 )}">{{item.pro_tag}}</span>
                                                            </template>
                                                        </div>
                                                    </dd>
                                                </dl>
                                                <em class="del-btn" @click="delProAdvert(item.id)"></em>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </div>
                    <div class="btn-box">
                        <button v-if="!Advert.list.length" class="add-btn" @click="addAdvert('add')">
                            <i class="sjzs-icon s-icon-plus-1"></i>添加广告
                        </button>
                        <template v-else>
                            <button class="change-btn" @click="addAdvert('change')">
                                <i class="sjzs-icon s-icon-refresh-1"></i>
                                更换广告
                            </button>
                            <button v-if="Advert.type === 1" class="add-btn" @click="addAdvert('push')">
                                <i class="sjzs-icon s-icon-plus-1"></i>
                                继续添加商品
                            </button>
                        </template>
                    </div>
                </div>

                <!-- 营销相关 -->
                <div class="marketing">
                    <h5 class="title">营销设置</h5>
                    <ul>
                        <li>
                            <b>初始点赞次数</b>
                            <span>
                                <input type="number" value="0" placeholder="请输入" @blur="markIsNum($event, 'link')" :value="Mark.linkNum" />
                            </span>
                        </li>
                        <li v-show="0">
                            <b>初始分享次数</b>
                            <span>
                                <input type="number" value="0" placeholder="请输入" @blur="markIsNum($event, 'share')" :value="Mark.shareNum" />
                            </span>
                        </li>
                        <li>
                            <b>初始浏览人次</b>
                            <span>
                                <input type="number" value="0" placeholder="请输入" @blur="markIsNum($event, 'browse')" :value="Mark.browseNum" />
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="marketing" v-if="videoAllData.is_wx_enterprise == 1">
                    <h5 class="title">
                        <strong class="tit-left">企业微信联系人</strong>
                        <div class="tit-right">
                            <van-switch v-model="QWX.status" size="20" active-color="#FC6631" inactive-color="#F8F8F8" />
                        </div>
                    </h5>
                    <ul v-show="QWX.status">
                        <li>
                            <b>联系人ID</b>
                            <span>
                                <input type="number" placeholder="请输入" v-model="QWX.userId" />
                            </span>
                        </li>
                        <li>
                            <b>重命名</b>
                            <span>
                                <input type="text" placeholder="咨询" v-model="QWX.name" />
                            </span>
                        </li>
                    </ul>
                </div>
                <!-- <div class="size-explain">
                        该视频将占用{{ (Video.vInfo.size/1024/1024).toFixed(2) }}MB存储空间
                    </div> -->
            </div>

            <!-- 页面底部发布 -->
            <div class="page-foot" v-if="!pageLoading">
                <a href="javascript:;" @click="videoPublishEnter" class="orange-btn publish-btn" :class="{'disabled': Video.publishing}">
                    <span v-if="Video.publishing">发布中...</span>
                    <span v-else>确定发布</span>
                </a>
            </div>
        </div>

        <!-- 弹窗代码 -->
        <Popup v-if="Layer.show" ref="popupLayer" :curAdvert="Advert" :Member="Member" @closeBack="closeBack" />
        <!-- <FindLink v-if="true" ref="FindLinkLayer" /> -->
        <!-- <transition
                name="custom-classes-transition"
                enter-active-class="animated fadeInRightBig"
                leave-active-class="animated fadeOutRightBig"
            >
                <div class="cropper-popup" v-show="cropperPopup.show">
                    <div class="cropper-box" id="cropperBox">
                        <img id="cropperCover" class="cropper-cover" :src="Video.vCover.imgUrl" />
                        <img id="cropperCover" class="cropper-cover" src="//t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&f=JPEG" />
                    </div>
                    <a class="orange-btn" @click="getCropperCover">
                        <span>使用</span>
                    </a>
                </div>
            </transition> -->
        <SelectClassify :title="'选择分类'" :enterText="'确定'" ref="selectClassifyLayer" :info="Video.vClassify" @closeBack="selectClassifyBack" />
    </div>
</transition>
</template>

<script>

import Vue from 'vue';
import { Switch } from 'vant';
Vue.use(Switch);
import hint from "@/plugins/hint";
import Popup from "../components/publish/Popup";
import SelectClassify from "../components/SelectClassify";
import PageHead from "../components/PageHead";
// import FindLink from '../components/FindLink'
import {
    shortVideoDetailShow,
    shortVideoDetailHandle,
    getResolveInfo,
    upLoadImage,
    shortVideoImgUpload,
    storeDetailShow,
    showProList,
    posterDetailShow,
    getVideoCover
} from "@/api/shop/video.bac";
import {
    getMemberInfo
} from '../js/getMemberInfo.js';
export default {
    name: "editVideo",
    data() {
        return {
            videoAllData:{},
            username: this.$util.shopVideo.username(),
            pageLoading: false,
            prevPageData: null,
            /* 视频信息相关 */
            Video: {
                publishing: false,
                getCoverTime: null,
                loading: 0,
                // 视频标题
                vTitle: "",
                // 封面相关数据
                vCover: {
                    // 是否处于上传状态
                    uploading: 0,
                    // 封面图片地址
                    imgUrl: ""
                },
                // 视频介绍文字
                vExplain: "长按识别二维码立即查看",
                // 记录上传过来的视频信息
                vInfo: {
                    id: 0
                },
                vClassify: {
                    show: 0,
                    id: 0,
                    name: '请选择'
                }
            },
            /* 广告相关的数据 */
            Advert: {
                addState: 0,
                // 当前广告类型
                type: 0,
                // 当前广告数据
                list: [],
                listOpen: 0
            },
            // 打开层级相关的
            Layer: {
                show: 0
            },
            ClassifyLayer: {
                show: 0
            },
            /* 营销相关 */
            Mark: {
                // 浏览数设置值
                linkNum: 0,
                // 点赞数量
                shareNum: 0,
                // 收藏数量
                browseNum: 0
            },
            // 企业微信
            QWX:{
                status: false,
                userId: 0,
                name: '咨询'
            },
            /* 裁切图片相关 */
            cropperPopup: {
                show: 0
            },
            /* 记录用户的信息 */
            Member: null
        };
    },
    created() {
        let that = this;
        // 获取上个页面传过来的数据，通过本地存储获取
        /* if (localStorage.uploadVideoData) {
            that.prevPageData = JSON.parse(localStorage.uploadVideoData);
        } */

        // console.log(this.$store.getters.variables.many.VideoData)
        if (this.$store.getters.variables.many.VideoData.vid) {
            that.prevPageData = this.$store.getters.variables.many.VideoData;
        }
        // 如果是从上一个页面过来的
        if (that.prevPageData) {
            let prevPageData = that.prevPageData,
                Video = that.Video;
            Video.vCover.imgUrl = prevPageData.cover;
            Video.vInfo.vid = prevPageData.vid;
            Video.vInfo.path = prevPageData.path;
            Video.vInfo.host = prevPageData.host;
            Video.vInfo.platform = prevPageData.platform;
            Video.vInfo.size = prevPageData.size;
            Video.vTitle = prevPageData.vTitle;
            if (!Video.vCover.imgUrl) {
                Video.vCover.uploading = true;
                let getCoverTime = setInterval(() => {
                    that.$util.variable.unNProgress = true;
                    getVideoCover({
                        videoid: Video.vInfo.vid
                    }).then(res => {
                        if (res && res.Video && res.Video.CoverURL) {
                            Video.vCover.imgUrl = res.Video.CoverURL;
                            Video.vCover.uploading = false;
                            clearInterval(getCoverTime);
                        }
                    });
                }, 1000);
            }
        }
        // 如果是编辑视频获取编辑视频的id查询
        if (that.$route.query.id) {
            that.pageLoading = true;
            let Video = that.Video,
                Advert = that.Advert,
                Mark = that.Mark;
            shortVideoDetailShow({
                id: that.$route.query.id
            }).then((data) => {
                that.videoAllData = data;
                let video_info = data.video_info,
                    poster_info = data.poster_info;
                /* 初始化页面数据 */
                Video.vTitle = video_info.title;
                Video.vExplain = video_info.description;
                Video.vCover.imgUrl = video_info.conver;
                Video.vInfo.vid = video_info.video_id;
                Video.vInfo.platform = video_info.platform + '';
                Video.vInfo.size = video_info.size;
                Video.vInfo.id = video_info.id;
                Video.vClassify.id = video_info.class_id;
                Video.vClassify.name = video_info.class_name;
                that.QWX.status = !!video_info.enterprise_wx_open;
                that.QWX.userId = video_info.enterprise_wx_id;
                that.QWX.name = video_info.enterprise_wx_name;
                // 广告数据
                Advert.type = video_info.poster_type;
                switch (Advert.type) {
                    case 0:
                        that.pageLoading = false;
                        Advert.type = 1;
                        break;
                    case 1:
                        showProList({
                            username: that.username,
                            channel_id: poster_info.channel_id,
                            front: 0,
                            pro_ids_str: poster_info.pro_ids_str
                        }).then(res => {
                            res.pro_list.forEach(v => {
                                Advert.list.push(v);
                            });
                            that.pageLoading = false;
                        }).catch(error => {
                            that.pageLoading = false;
                        });
                        break;
                    case 2:
                        storeDetailShow({
                            id: video_info.poster_ids,
                            username: that.username
                        }).then(res => {
                            res.store_detail.selected = 1;
                            Advert.list.push(res.store_detail);
                            that.pageLoading = false;
                        }).catch(error => {
                            hint.Msg({
                                message: error.msg
                            });
                            that.pageLoading = false;
                        });
                        break;
                    case 3:
                    case 4:
                        posterDetailShow({
                            id: video_info.poster_ids
                        }).then(res => {
                            res.poster_detail.selected = 1;
                            Advert.list.push(res.poster_detail);
                            that.pageLoading = false;
                        }).catch(error => {
                            hint.Msg({
                                message: error.msg
                            });
                            that.pageLoading = false;
                        });
                        break;
                }

                // 初始化营销数据
                Mark.linkNum = video_info.default_like_num;
                Mark.shareNum = video_info.default_share_num;
                Mark.browseNum = video_info.default_browse_num;
            }).catch(error => {
                hint.Alert({
                    message: '视频获取失败'
                }).then(res => {
                    that.$util.functions.GoBack();
                });
            });
        }
        /* 获取账号的信息 */
        getMemberInfo().then(res => {
            that.Member = res;
        });
    },
    mounted() {
        // console.log(this.$route);
        let that = this;
    },
    beforeRouteUpdate() {
        // console.log(123);
    },
    methods: {
        /**
         * @Date: 2020-02-05 15:44:36
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 返回上一页
         * @param {type} 参数说明
         * @return: 返回值
         */
        backPage() {
            let id = this.$route.query.id;
            if (id) {
                this.$router.push({
                    path: '/shop/bac/video/detail',
                    query: {
                        id
                    }
                });
            } else {
                this.$util.functions.GoBack();
            }
        },
        /**
         * @description: 上传封面
         * @param {type}
         * @return:
         */
        CoverUpload(event) {
            let that = this,
                Cover = that.Video.vCover,
                file = event.srcElement, //当前file对象
                files = file.files[0];
            if (files.type && !/png|jpeg|gif|jpg/.test(files.type.toLowerCase())) {
                hint.Msg({
                    message: '图片格式必须是png,jpg,gif'
                });
                return
            }
            if (files.size > 31457280) {
                hint.Msg({
                    message: '图片不能大于30M'
                });
                return
            }
            Cover.uploading = 1;
            shortVideoImgUpload(file).then(res => {
                Cover.imgUrl = res.path;
                Cover.uploading = 0;
            });
        },
        /**
         * @description: 添加广告
         * @param {type}
         * @return:
         */
        addAdvert(action) {
            let that = this;
            that.Advert.addState = 1;
            that.Layer.show = 1;
            setTimeout(() => {
                that.$refs.popupLayer.showHideLayer(1, action);
            }, 10);
        },
        /**
         * @description: 删除产品广告中的项
         * @param {type}
         * @return:
         */
        delProAdvert(proId) {
            let that = this,
                Advert = that.Advert,
                curList = Advert.list;
            for (let i = curList.length - 1; i >= 0; i--) {
                if (curList[i].id === proId) {
                    curList[i].selected = 0;
                    curList.splice(i, 1);
                }
            }

        },
        /**
         * @description: 关闭弹窗的回调函数
         * @param {type}
         * @return:
         */
        closeBack(addItem, addType) {
            let that = this;
            that.Advert.addState = 0;
            if (addItem) {
                that.Advert.list.length = 0;
                addItem.forEach(v => {
                    that.Advert.list.push(v);
                });
                that.Advert.type = addType;
            }
        },
        /**
         * @description: 确认发布方法
         * @param {type}
         * @return:
         */
        videoPublishEnter() {
            let that = this,
                Video = that.Video,
                vInfo = Video.vInfo,
                Advert = that.Advert,
                Mark = that.Mark,
                QWX = that.QWX,
                publishData,
                message = false;
            if (!Video.vTitle) {
                message = '请填写分享标题！';
            } else if (Video.vTitle.length > 60) {
                message = '请填写60个字以内的标题！';
            }
            if (!message) {
                /* if(!Video.vCover.imgUrl){
                message = '请上传视频封面图片！';
                } */
            }
            /* if(!message){
                if(!Video.vExplain){
                message = '请填写分享描述！';
                }else if(Video.vExplain.length > 40){
                    message = '请填写40个字以内的标题！';
                }
            } */
            if (message) {
                hint.Msg({
                    message: message
                });
                return false;
            }
            publishData = {
                title: Video.vTitle,
                description: Video.vExplain,
                conver: Video.vCover.imgUrl,
                platform: vInfo.platform + '',
                size: vInfo.size,
                video_id: vInfo.vid,
                default_like_num: Mark.linkNum,
                default_share_num: Mark.shareNum,
                default_browse_num: Mark.browseNum,
                class_id: Video.vClassify.id,
                enterprise_wx_open: QWX.status*1,
                enterprise_wx_id: QWX.userId,
                enterprise_wx_name: QWX.name,
            };
            // !that.prevPageData && (publishData.id = 1);
            vInfo.id && (publishData.id = vInfo.id);
            if (Advert.list.length) {
                publishData.poster_type = Advert.type;
                if (Advert.type === 1) {
                    Advert.list.forEach((v, i) => {
                        publishData["pro_ids[" + i + "]"] = v.id;
                    });
                }
                if (Advert.type === 2) {
                    publishData.store_id = Advert.list[0].id;
                }
                if (Advert.type === 3) {
                    publishData.code_id = Advert.list[0].id;
                }
                if (Advert.type === 4) {
                    publishData.link_id = Advert.list[0].id;
                }
            } else {
                publishData.poster_type = 0;
            }
            if (Video.publishing) {
                hint.Msg({
                    message: '正在发布中'
                });
                return false;
            }
            Video.publishing = true;
            shortVideoDetailHandle(publishData).then(data => {
                if (that.prevPageData) {
                    // localStorage.removeItem("uploadVideoData");
                    that.$util.variable.Set({
                        key: "VideoData",
                        val: {}
                    });
                }
                Video.publishing = false;
                hint.Msg({
                    message: vInfo.id ? '修改成功' : '发布成功'
                });
                that.$router.push({
                    path: "/shop/bac/video/index"
                });
            });
        },
        /**
         * @Date: 2020-02-10 09:54:44
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 营销设置验证
         * @param {type} 事件类型，更改字段型值
         * @return: 返回值
         */
        markIsNum(event, type) {
            let inputDom = event.target,
                val = inputDom.value;
            if (isNaN(val) || val < 0) {
                inputDom.value = 0;
                val = 0;
            } else {
                if ((val + '').length > 10 || val == '') {
                    inputDom.value = 0;
                    val = 0;
                }
            }
            switch (type) {
                case 'link':
                    this.Mark.linkNum = val;
                    break;
                case 'share':
                    this.Mark.shareNum = val;
                    break;
                case 'browse':
                    this.Mark.browseNum = val;
                    break;
            }
        },
        focueFunction() {
            setTimeout(() => {
                let winH = $(window).height();
                let winW = $(window).width();
                let winCH = window.innerHeight;
                let winCW = window.innerWidth;
                let bodyCH = document.getElementsByTagName('body')[0].clientHeight;
                let bodyCW = document.getElementsByTagName('body')[0].clientWidth;
                $("#infoBox").html(`<p>高度：${winH}</p><p>宽度：${winW}</p><p>高度：${winCH}</p><p>宽度：${winCW}</p><p>高度：${bodyCH}</p><p>宽度：${bodyCW}</p>`);
                // $('#pageBody').css({'transform':`translateY(-${winCH/2}px)`});
            }, 1000);
        },
        /**
         * @Date: 2020-04-03 10:56:51
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 解决苹果输入框失去焦点的问题
         * @param {type} 参数说明
         * @return: 返回值
         */
        textBlur() {
            window.scroll();
        },
        selectClassifyShow() {
            // this.ClassifyLayer.show = true;
            this.$refs.selectClassifyLayer.showClassifyLayer(1);
        },
        /**
         * @Date: 2020-07-02 14:55:54
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 选择类型的回调
         * @param {type} 选定的当前类型项
         * @return: 返回值
         */
        selectClassifyBack(item, closeLayer) {
            var that = this;
            that.Video.vClassify.id = item.id;
            that.Video.vClassify.name = item.name;
            closeLayer(0);
        }
        /**
         * @Date: 2020-03-27 15:37:29
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 显示裁切框
         * @param {type} 参数说明
         * @return: 返回值
         */
        /* showCropperPopup(){
            const that = this,
                cropperPopup = that.cropperPopup;
            cropperPopup.show = 1;
            const cropperBox = $('#cropperBox'),
                cropperCover = $('#cropperCover');
            if(!$.fn.cropper){
                $.getScript("//aimg8.oss-cn-shanghai.aliyuncs.com/plugins/public/js/cropper/cropper.min.js", function (script, textStatus, jqXHR) {
                    setTimeout(() => {
                        console.log($.fn.cropper);
                        console.log(cropperCover);
                        cropperCover.cropper({
                            aspectRatio: 1/1,
                            checkCrossOrigin: false,
                            viewMode:3,
                            dragMode: 'move',
                            cropBoxResizable: false,
                            autoCropArea: .8,
                        });
                    }, 1000);
                });
            }
        }, */
        /**
         * @Date: 2020-03-27 22:20:52
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取图片裁切信息
         * @param {type} 参数说明
         * @return: 返回值
         */
        /* getCropperCover(){
            const that = this,
                cropperPopup = that.cropperPopup;
            const cropperCover = $('#cropperCover');
            console.log(cropperCover.cropper('getData'));
            cropperPopup.show = 0;
        } */
    },
    components: {
        Popup,
        // 更改分类弹出层组件
        SelectClassify,
        PageHead
    }
};
</script>

<style lang="scss">
// @import "//aimg8.oss-cn-shanghai.aliyuncs.com/plugins/public/js/cropper/cropper.min.css";
@import "../css/editVideo.scss";

#infoBox {
    position: absolute;
    left: 0;
    top: 0;
    color: #000;
    background-color: #fff;
    font-size: 30px;
    padding: 30px;
    z-index: 1000;
}
</style>

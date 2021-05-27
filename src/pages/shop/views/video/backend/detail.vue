<!--
 * @Author: your name
 * @Date: 2020-01-13 10:54:55
 * @LastEditTime : 2021-01-27 15:33:41
 * @LastEditors  : qwguo
 * @Description: In User Settings Edit
 * @FilePath     : \ev-frontend-test\src\pages\shop\views\video\backend\detail.vue
 -->
<template>
<div class="video-detail-wrap" :style="{'top': $store.getters.variables.many.BarHeight+'px'}">
    <div class="v-l-box" id="VLBox">
        <template v-if="!loading">
            <!-- :class="['v-l-item', {'item-prev': index===0, 'item-next': index===2}]" -->
            <!-- class="v-l-item" -->
            <div v-for="(item, index) in Video.list" :key="item.video_id" :data-id="item.id" class="v-l-item">
                <div class="v-box" @click="playVideo($event)">
                    <video :src="item.video_url" :style="item.styles" :poster="item.cConver" loop x5-video-player-type="h5-page" x5-video-player-fullscreen="true" playsinline="true" webkit-playsinline="true"></video>
                    <transition name="custom-classes-transition" enter-active-class="animated amplifyIn" leave-active-class="animated amplifyOut">
                        <span class="play-btn" v-if="!Video.playing">
                            <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2862">
                                <path d="M780.8 475.733333L285.866667 168.533333c-27.733333-17.066667-64 4.266667-64 36.266667v614.4c0 32 36.266667 53.333333 64 36.266667l492.8-307.2c29.866667-14.933333 29.866667-57.6 2.133333-72.533334z" p-id="2863"></path>
                            </svg>
                        </span>
                    </transition>
                </div>
                <!-- <img v-if="!Video.playing" class="v-conver" :src="item.cConver"/> -->
                <div class="company-info">
                    <i>
                        <img :src="item.companycn_info.logo" />
                    </i>
                    {{item.companycn_info.name}}
                </div>
                <i class="sjzs-icon s-icon-cross-1" @click="backPage"></i>
                <!-- 广告 -->
                <div class="advert-box" v-if="advertLayer.show" @click="showHideAdvert(0, item, 'bg')">
                    <transition name="custom-classes-transition" enter-active-class="animated fadeInLeftBig" leave-active-class="animated fadeOutLeftBig">
                        <ul class="list-box link-advert" v-if="item.poster_type != 3 && advertLayer.conShow">
                            <li v-if="advertLayer.loading" class="loading-icon"></li>
                            <template v-else>
                                <li class="list-item store-list-item" v-if="item.poster_type === 2" @click.stop="golook">
                                    <div class="img-box">
                                        <img :src="item.poster_info[0].poster_storepic" alt="我的链接描述我的链接描述我的链接描述我的链接描述" />
                                    </div>
                                    <dl class="attr-box">
                                        <dt>
                                            <span>{{item.poster_info[0].poster_storename}}</span>
                                        </dt>
                                        <dd>
                                            <ul>
                                                <li>
                                                    <span><em>电话：</em><b>{{ item.poster_info[0].poster_storetel }}</b></span>
                                                    <i class="tel-icon"></i>
                                                </li>
                                                <li>
                                                    <span><em>地址：</em><b>{{ item.poster_info[0].poster_storeaddress }}</b></span>
                                                    <i class="location-icon"></i>
                                                </li>
                                            </ul>
                                        </dd>
                                    </dl>
                                </li>
                                <li class="list-item link-list-item" v-if="item.poster_type === 4">
                                    <div class="img-box">
                                        <img :src="item.poster_info[0].pic" />
                                    </div>
                                    <dl class="attr-box">
                                        <dt>
                                            <span>{{item.poster_info[0].title}}</span>
                                        </dt>
                                        <dd>
                                            <p>{{item.poster_info[0].brief}}</p>
                                        </dd>
                                    </dl>
                                    <div class="edit-box">
                                        <span class="look-btn" @click.stop="golook">去看看</span>
                                    </div>
                                </li>
                                <template v-if="item.poster_type === 1">
                                    <li class="list-item pro-list-item" v-for="(item,
                                        index) in advertLayer.proList" :key="index">
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
                                                <div class="edit-box"><span class="look-btn" @click="golook">去看看</span></div>
                                            </dd>
                                        </dl>
                                        <em class="del-btn" @click="delProAdvert(item.id)"></em>
                                    </li>
                                </template>
                            </template>
                        </ul>
                    </transition>

                    <div class="popup-area" v-if="item.poster_type == 3">
                        <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                            <div class="popup-box" v-if="advertLayer.conShow">
                                <div class="code-popup">
                                    <h5>{{item.poster_info[0].title}}</h5>
                                    <p>{{item.poster_info[0].brief}}</p>
                                    <div class="pic-box">
                                        <img :src="item.poster_info[0].pic" />
                                    </div>
                                    <p>长按识别二维码</p>
                                </div>
                                <i class="close" @click="showHideAdvert(0)"></i>
                            </div>
                        </transition>
                    </div>
                </div>
                <div class="v-foot">
                    <div class="v-classify">
                        <span>分类：{{item.class_name}}</span>
                        <i @click="selectClassifyShow(item)">更换</i>
                    </div>
                    <h5>{{item.title}}</h5>
                    <div class="v-func">
                        <span v-if="item.poster_type!=0" :class="['func-icon','func-' + ['pro','store','code','link'][item.poster_type-1]]" @click="showHideAdvert(1, item)"></span>
                        <div class="func-list">
                            <span class="func-item">
                                <b>{{item.browse_num_show}}</b>
                                <i>浏览人次</i>
                            </span>
                            <span class="func-item">
                                <b>{{item.like_num_show}}</b>
                                <i>点赞次数</i>
                            </span>
                            <span class="func-item">
                                <b>{{item.share_num_show}}</b>
                                <i>分享次数</i>
                            </span>
                        </div>
                        <div class="func-more" @click="handleVideo(item)">
                            <i></i>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
    <SelectClassify v-if="!loading" :title="'更改视频分类'" :enterText="'确定'" ref="selectClassifyLayer" :info="vClassify" @closeBack="selectClassifyBack" />
    <!-- <div class="select-layer" v-if="Layer.show && Layer.curState==='share'">
            <div class="bg" @click="showHideLayer(0)"></div>
            <transition name="custom-classes-transition" enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
                <div class="layer-con-wrap" v-if="Layer.conShow">
                    <div class="share-list-box">
                        <h5><span>分享</span></h5>
                        <div class="share-list">
                            <span class="share-wx" @click="VideoShareManage('send')">
                                <i></i>
                                <b>发送给朋友</b>
                            </span>
                            <span class="share-pic" @click="VideoShareManage('pic')">
                                <i><img src="" alt=""></i>
                                <b>分享海报</b>
                            </span>
                            <span class="share-link" @click="VideoShareManage('link')">
                                <i><img src="" alt=""></i>
                                <b>复制链接</b>
                            </span>
                        </div>
                    </div>
                    <ul class="func-more-list">
                        <li class="cancel-btn" @click="showHideLayer(0)">取消</li>
                    </ul>
                </div>
            </transition>
        </div>-->
    <!-- ./ 商家助手后台操作按钮 -->
    <actions v-if="Video.curEditItem && $store.getters.variables.many.ShopVideoBacActions" :data="{item: Video.curEditItem, index: Video.curEditItem.id}" />
    <share v-if="Video.curEditItem && $store.getters.variables.many.ShopVideoBacShare" :data="{item: Video.curEditItem, index: Video.curEditItem.id}" />
    <poster v-if="Video.curEditItem && $store.getters.variables.many.ShopVideoBacPoster" :data="{item: Video.curEditItem, index: Video.curEditItem.id}" />
</div>
</template>

<script>
import hint from "@/plugins/hint";
import Share from "@/pages/shop/views/video/frontend/share.vue";
import SelectClassify from "./components/SelectClassify";
import {
    transferClass,
    showProList,
    getVideoPlayUrl,
    shortVideoDetail
} from "@/api/shop/video.bac";
import {
    Dialog
} from 'vant';
export default {
    name: "detail",
    data() {
        return {
            loading: false,
            Video: {
                playing: false,
                curVideo: null,
                curEditItem: null,
                sumList: [],
                list: [],
                info: {}
            },
            vClassify: {id: 0, name: '无'},
            curVideoItem: null,
            // 打开层级相关的
            advertLayer: {
                loading: false,
                // 层是否显示
                show: 0,
                // 层内容是否显示
                conShow: 0,
                // 当前状态，tab:标签切换，edit:编辑模式
                curState: "edit",
                proList: []
            }
        };
    },
    components: {
        // 操作按钮
        actions: () => import("./components/ctrl/actions"),
        // 分享
        share: () => import("./components/ctrl/share"),
        // 分享海报
        poster: () => import("./components/ctrl/poster"),
        // 更改分类弹出层组件
        SelectClassify
    },
    created() {
        this.$util.app.Shop.Refresh(false, 0);

        this.$util.variable.Setbatch([{
            key: "ShopVideoBacActions",
            val: false
        }, {
            key: "ShopVideoBacShare",
            val: false
        }, {
            key: "ShopVideoBacPoster",
            val: false
        }]);
    },
    mounted() {
        // this.bindEvent();
        let that = this,
            Video = that.Video;
        that.getVideoData();

        that.GestureGoHome();
        // 隐藏商家助手的底部
        that.$util.app.Shop.ShowFooterMenu(0);
        // 修改头部高度
        /* setTimeout(function () {
            util.app.Shop.StatusBar({
                // color: '#fff',
                callback: function (height) {
                    util.variable.Set({
                        key: 'BarHeight',
                        val: 0
                    });
                }
            })
        }); */
        /* $("#VLBox")
        .find(".v-l-item")
        .eq(0)
        .find(".v-box")
        .click(); */
    },
    methods: {
        /**
         * @Date: 2020-02-07 14:59:42
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取视频数据
         * @param {type} 参数说明
         * @return: 返回值
         */
        getVideoData() {
            let that = this,
                VLBox = $('#VLBox'),
                winH = VLBox.height(),
                winW = VLBox.width(),
                winBL = winW / winH,
                Video = that.Video,
                curVideoId = null;
            that.loading = true;
            if (Video.curVideo) {
                curVideoId = Video.id;
            } else {
                curVideoId = that.$route.query.id;
            }

            shortVideoDetail({
                username: this.$util.shopVideo.username(),
                not_publish: 1,
                id: curVideoId,
                back: 1,
                is_backstage: 1,
                class_id: that.$route.query.class_id,
                search_title: that.$route.query.search_title
            }).then(dataList => {
                Video.list.length = 0;
                let v = dataList[0];
                // v.cConver = v.conver_origina + `?x-oss-process=image/resize,m_mfit,h_${winH},w_${winW},limit_0`;
                Video.list.push(v);

                this.$util.variable.AxiosErrorPopup = false;
                getVideoPlayUrl({
                    username: this.$util.shopVideo.username(),
                    play_id: v.video_id,
                    video_id: v.id
                }).then(data => {
                    let vW = data.width,
                        vH = data.height,
                        vBL = vW / vH;
                    /* 原图宽高 */
                    let imgOrigina = new Image();
                    imgOrigina.onload = function () {
                        if (imgOrigina.width > imgOrigina.height) {
                            v.cConver = v.conver_origina + `?x-oss-process=image/resize,m_lfit,h_${winH},w_${winW},limit_0`;
                        } else {
                            v.cConver = v.conver_origina + `?x-oss-process=image/resize,m_mfit,h_${winH},w_${winW},limit_0`;
                        }
                        that.loading = false;

                        if (vBL > winBL && vBL < 0.75) {
                            v.styles = {
                                height: '100%'
                            }
                        } else {
                            v.styles = {
                                width: '100%'
                            }
                        }
                        v.video_url = data.url;
                    }
                    imgOrigina.onerror = function () {
                        that.loading = false;
                        v.video_url = data.url;
                    }
                    /* var videoDom = document.createElement('video');
                    videoDom.src = data.url;
                    setTimeout(() => {
                        console.log("getVideoData -> videoDom.duration", videoDom.duration)
                        console.log(videoDom.videoHeight)
                        console.log(videoDom.videoWidth)
                    }, 500); */
                    imgOrigina.src = v.conver_origina;
                }).catch(error => {
                    hint.Alert({
                        message: error.msg
                    }).then(res => {
                        this.$util.functions.GoBack();
                    });
                });
                /* dataList.forEach(v => {
                    v.cConver = v.conver_origina + `?x-oss-process=image/resize,m_mfit,h_${winH},w_${winW}`;
                    Video.sumList.push(v);
                    getVideoPlayUrl({
                        username: this.$util.shopVideo.username(),
                        play_id: v.video_id,
                        video_id: v.id
                    }).then(data => {
                        v.video_url = data;
                    });
                }); */
            }).catch(error => {
                hint.Alert({
                    message: '视频获取失败'
                }).then(res => {
                    this.$util.functions.GoBack();
                });
            });
        },
        /**
         * @Date: 2020-01-20 15:42:42
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 播放暂停视频
         * @param {type} 事件
         * @return: 返回值
         */
        playVideo(event) {
            let that = this,
                Video = that.Video,
                vBoxDom = $(event.srcElement).closest(".v-box"),
                videoDom = vBoxDom.find("video")[0],
                playBtnDom = vBoxDom.find(".play-btn");
            if (!videoDom.getAttribute("ended")) {
                videoDom.onended = function () {
                    Video.playing = false;
                    videoDom.setAttribute("ended", "ended");
                };
            }
            if (videoDom.paused) {
                setTimeout(() => {
                    videoDom.play();
                }, 10);
                Video.playing = true;
            } else {
                videoDom.pause();
                Video.playing = false;
            }
        },
        /**
         * @Date: 2020-01-20 17:23:12
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 绑定事件
         * @param {type} 参数说明
         * @return: 返回值
         */
        bindEvent() {
            let that = this,
                Video = that.Video,
                VLBox = $("#VLBox"),
                curItem = null,
                prevItem = null,
                nextItem = null,
                startY = null,
                startTime = null,
                moveY = null,
                movePx = null,
                endTime = null,
                canMove = true;
            VLBox.on({
                touchstart(event) {
                    if (canMove) {
                        movePx = null;
                        curItem = $(event.originalEvent.srcElement).closest(".v-l-item");
                        prevItem = curItem.siblings(".item-prev");
                        nextItem = curItem.siblings(".item-next");
                        startY = event.originalEvent.changedTouches[0].pageY;
                        startTime = new Date().getTime();
                    }
                },
                touchmove(event) {
                    if (canMove) {
                        moveY = event.originalEvent.changedTouches[0].pageY;
                        movePx = startY - moveY;
                        curItem.css({
                            transform: "translateY(" + -movePx + "px)"
                        });
                        if (movePx < 0) {
                            nextItem.css({
                                transform: "translateY(0px)"
                            });
                            prevItem.css({
                                transform: "translateY(" + -movePx + "px)"
                            });
                        } else {
                            prevItem.css({
                                transform: "translateY(0px)"
                            });
                            nextItem.css({
                                transform: "translateY(" + -movePx + "px)"
                            });
                        }
                        event.preventDefault();
                    }
                },
                touchend(event) {
                    if (!canMove) {
                        return;
                    }
                    if (movePx !== null) {
                        VLBox.addClass("animated");
                        canMove = false;
                        endTime = new Date().getTime();
                        if (
                            Math.abs(movePx) > 200 ||
                            (endTime - startTime < 200 && Math.abs(movePx) > 30)
                        ) {
                            if (movePx > 0) {
                                curItem.css({
                                    transform: "translateY(-100%)"
                                });
                                nextItem.css({
                                    transform: "translateY(-100%)"
                                });
                            } else {
                                curItem.css({
                                    transform: "translateY(100%)"
                                });
                                prevItem.css({
                                    transform: "translateY(100%)"
                                });
                            }
                            setTimeout(() => {
                                VLBox.removeClass("animated");
                                let curVidDom = curItem.find("video")[0];
                                curVidDom.pause();
                                curVidDom.currentTime = 0;
                                if (movePx > 0) {
                                    curItem.addClass("item-prev");
                                    nextItem.removeClass("item-next");
                                    prevItem.removeClass("item-prev").addClass("item-next");
                                    setTimeout(() => {
                                        let vidDom = nextItem.find("video")[0];
                                        Video.playing = true;
                                        vidDom.play();
                                    });
                                } else if (movePx < 0) {
                                    curItem.addClass("item-next");
                                    prevItem.removeClass("item-prev");
                                    nextItem.removeClass("item-next").addClass("item-prev");
                                    setTimeout(() => {
                                        let vidDom = prevItem.find("video")[0];
                                        vidDom.play();
                                        Video.playing = true;
                                    });
                                }
                                curItem.css({
                                    transform: "translateY(0px)"
                                });
                                nextItem.css({
                                    transform: "translateY(0px)"
                                });
                                prevItem.css({
                                    transform: "translateY(0px)"
                                });
                                // setTimeout(() => {
                                canMove = true;
                                // }, 100);
                            }, 300);
                        } else {
                            curItem.css({
                                transform: "translateY(0px)"
                            });
                            nextItem.css({
                                transform: "translateY(0px)"
                            });
                            prevItem.css({
                                transform: "translateY(0px)"
                            });
                            setTimeout(() => {
                                VLBox.removeClass("animated");
                                // setTimeout(() => {
                                canMove = true;
                                // }, 100);
                            }, 200);
                        }
                    }
                }
            });
        },
        /**
         * @description:显示隐藏弹窗选择层
         * @param {action: 1表示打开，0表示关闭}
         * @return:
         */
        showHideLayer(action, actionType) {
            var that = this,
                curAdvert = that.curAdvert;
            if (action === 1) {
                that.Layer.show = action;
                that.Layer.curState = actionType;
                setTimeout(() => {
                    that.Layer.conShow = action;
                }, 1);
            } else {
                that.Layer.conShow = action;
                setTimeout(() => {
                    that.Layer.show = action;
                }, 200);
            }
        },
        /**
         * @Date: 2020-02-07 15:34:20
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 视频操作
         * @param {type} 对象形式，操作的当前视频对象
         * @return: 返回值
         */
        handleVideo(item) {
            let that = this;
            that.Video.curEditItem = item;
            this.$util.variable.Set({
                key: "ShopVideoBacActions",
                val: true
            });
        },
        /**
         * @Date: 2020-02-10 09:21:47
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 点击关闭，返回上一级
         * @param {type} 参数说明
         * @return: 返回值
         */
        backPage() {
            var that = this;
            that.$util.app.Shop.Refresh(true, 0);

            if(that.$route.query.search_title){
                that.$router.push({
                    path: '/shop/bac/video/search',
                    query:{
                        search_title: that.$route.query.search_title
                    }
                });
            }else{
                that.$router.push({
                    path: '/shop/bac/video/index',
                    query:{
                        class_id: that.$route.query.class_id
                    }
                });
            }
        },
        /**
         * @Date: 2020-02-11 19:54:58
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 显示隐藏广告
         * @param {type} action:0表示显示，1表示隐藏
         * @return: 返回值
         */
        showHideAdvert(action, item, actionType) {
            let that = this,
                advertLayer = that.advertLayer;
            if (action === 1) {
                advertLayer.show = action;
                setTimeout(() => {
                    advertLayer.conShow = action;
                }, 1);
                if (item.poster_type === 1 && !advertLayer.proList.length) {
                    advertLayer.loading = true;
                    showProList({
                        username: this.$util.shopVideo.username(),
                        channel_id: item.poster_info.channel_id,
                        front: 0,
                        pro_ids_str: item.poster_info.pro_ids_str
                    }).then(res => {
                        advertLayer.loading = false;
                        res.pro_list.forEach(v => {
                            advertLayer.proList.push(v);
                        });
                    });
                }
            } else {
                if (item && item.poster_type === 3 && actionType === 'bg') {
                    return false
                } else {
                    setTimeout(() => {
                        advertLayer.show = action;
                    }, 300);
                    advertLayer.conShow = action;
                }
            }
        },
        golook() {
            hint.Msg({
                message: 'App中不能查看'
            });
        },
        /**
         * 安卓原生返回
         * @constructor
         */
        GestureGoHome() {
            let that = this;
            setTimeout(function () {
                window.goGestureCallback = function () {
                    // that.$util.functions.GoBack();
                    that.backPage();

                    that.$util.app.Shop.Refresh(true, 0);
                }
            });
        },
        selectClassifyShow(item){
            // this.ClassifyLayer.show = true;
            this.curVideoItem = item;
            this.vClassify.id = item.class_id;
            this.vClassify.name = item.class_name;
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
        selectClassifyBack(selectItem, closeLayer){
            if(!selectItem || selectItem.id == 0){
                hint.Msg({
                    message: '请选择分类项'
                });
                return;
            }
            let that = this;
            let Classify = that.vClassify;
            if(selectItem.id == Classify.id){
                hint.Msg({
                    message: '当前视频已经在此分类下'
                });
                return;
            }
            Dialog.confirm({
                className: 'video-dialog-alert',
                message: '确认把该视频更改到"'+ selectItem.name +'"分类下吗?',
                confirmButtonColor: '#FF9900'
            }).then(() => {
                transferClass({
                    ...{"video_ids[0]": that.curVideoItem.id},
                    class_id: selectItem.id
                }).then(res=>{
                    that.vClassify.id = selectItem.id;
                    that.vClassify.name = selectItem.name;
                    that.curVideoItem.class_id = selectItem.id;
                    that.curVideoItem.class_name = selectItem.name;
                    hint.Msg({
                        message: '更改成功'
                    });
                    setTimeout(() => {
                        closeLayer(0);
                    }, 100);
                });
            }).catch(() => {
                // on cancel
            });
        }
    }
};
</script>

<style lang="scss">
@import "./css/videoPublic.scss";
@import "./css/videoDetail.scss";
</style>

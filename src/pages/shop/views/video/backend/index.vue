<!--
 * @Author       : qwguo
 * @description  : 短视频首页
 * @Date         : 2020-07-06 09:31:21
 * @LastEditors  : qwguo
 * @LastEditTime : 2021-01-27 15:16:10
 * @FilePath     : \ev-frontend-test\src\pages\shop\views\video\backend\index.vue
-->
<template>
    <div class="video-list-page">
        <!-- 页面顶部 -->
        <PageHead :title="'短视频'" @backFun="goBack">
            <template>
                <i class="sjzs-icon s-icon-help-1" @click="goHelp"></i>
            </template>
        </PageHead>
        <!-- 页面主要区域 -->
        <div class="page-main-wrap" id="pageMainWrap">
            <!-- 信息区域 -->
            <div class="info-area">
                <!-- 会员信息 -->
                <div class="member-info-box" v-if="!Member.loading">
                    <a class="member-portrait" :href="(node_env === 'production' ? `https://sjzs.dlszywz.cn` : `https://sjzstest.dlszywz.cn`) +  `/home/user/baseinfo?token=${token}`">
                        <div class="portrait-box">
                            <img v-if="!Member.logo" src="./images/member_portrait.png" />
                            <img v-else :src="Member.logo+'?x-oss-process=image/resize,m_fill,h_130,w_130,limit_0'" />
                        </div>
                        <span class="sjzs-icon s-icon-edit-1"></span>
                    </a>
                    <div class="member-attr">
                        <div class="attr-left">
                            <!-- rank-0默认等级，rank-1体验会员 -->
                            <div class="member-rank" :class="{'rank-0': Member.isVipIcon !== 1, 'rank-1': Member.isVipIcon === 1}">
                                <i class="rank-icon"></i>
                                <b class="rank-text">{{Member.userStatusName}}</b>
                                <!-- <i class="rank-help"></i> @click="showHidePopup(1, 'info')"-->
                            </div>
                            <div class="rank-date" v-if="Member.vipEndDate || Member.isVipPassData === 1">
                                <em v-if="Member.isVipPassData === 1">您的服务已到期,请及时充值</em>
                                <span v-else-if="Member.vipEndDate">有效期至:{{Member.vipEndDate}}</span>
                            </div>
                        </div>
                        <div class="attr-right">
                            <button v-if="Member.isRenew" @click="goBuy()">续费</button>
                            <button v-if="!Member.isRenew" @click="goBuy()">付费购买</button>
                        </div>
                    </div>
                </div>
                <!-- banner图片轮播区域 -->
            </div>
            <!-- <div class="banner-ad">
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(image, index) in Banner.listData" :key="index">
                        <img v-lazy="image" />
                    </van-swipe-item>
                </van-swipe>
            </div> -->

            <!-- 页面列表区域 -->
            <div class="video-list-wrap">
                <div class="list-head">
                    <div class="list-head-inner">
                        <div class="space-info-box">
                            <i v-if="showBackBtn" @click="$util.functions.GoBack('top', $route)" class="sjzs-icon s-icon-left-1"></i>
                            <b>我的视频</b>
                            <i class="sjzs-icon s-icon-search-1" @click="showHideSearchLayer(true)"></i>
                        </div>
                        <div class="list-manage-btn">
                            <button v-if="Member.isPublicBut && !VideoList.manage" class="publish-btn" @click="toPublish">
                                <i class="sjzs-icon s-icon-plus-1"></i>
                                发布
                            </button>
                            <button v-if="VideoList.listData && !VideoList.manage" class="admin-btn" @click="VideoManageSwitch(1)">
                                <i class="sjzs-icon s-icon-set-1"></i>
                                管理
                            </button>
                            <button v-if="VideoList.manage" @click="VideoManageSwitch(0)" class="finish-btn">
                                完成
                            </button>
                        </div>

                    </div>
                </div>
                <div class="classify-box" v-show="!VideoList.manage">
                    <ul class="classify-list" ref="classifyList">
                        <li :class="{'active':!Classify.curItem.id}" @click="switchClassify({id:0})">全部</li>
                        <li v-for="(item, index) in Classify.list" :key="'classify_'+item.id" :class="{'active':item.id == Classify.curItem.id}" @click="switchClassify(item)">{{item.name}}</li>
                    </ul>
                    <i class="vertical-line"></i>
                    <span class="manage-btn" @click="classifyManage">分类管理</span>
                </div>
                <div :class="['list-body', { 'list-body-manage': VideoList.manage }]">
                    <!-- 视频列表模块 -->
                    <VideoListComponent v-if="!VideoList.firstLoad" v-show="VideoList.show" ref="VideoListComponent" :listData="VideoList.listData" :manage="VideoList.manage" :listType="'list'"></VideoListComponent>
                    <span class="loading-icon" v-if="VideoList.loading"></span>
                    <span class="no-data-text" :class="(VideoList.ajaxFinish && VideoList.listData.length) ? 'visible':''" v-if="">没有更多数据了~~</span>
                </div>
                <!-- 管理视频列表按钮组件 -->
                <VideoManageBtn ref="VideoManageBtn" v-show="VideoList.manage" :listData="VideoList.listData" />
            </div>
        </div>

        <div class="popup-area" v-if="popupLayer.show && popupLayer.curState === 'flow'">
            <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                <div class="popup-box" v-if="popupLayer.conShow">
                    <div class="but-flow-popup">
                        <h5>您的短视频流量已用尽 请及时充值流量</h5>
                        <button class="orange-btn buy-btn" @click="$router.push({ path: 'buy', query: {proType: 4} })">购买流量</button>
                        <button class="default-btn cancel-btn" @click="showHidePopup(0)">取消</button>
                    </div>
                </div>
            </transition>
        </div>
        <div class="popup-area" v-if="popupLayer.show && popupLayer.curState === 'testMember'">
            <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                <div class="popup-box" v-if="popupLayer.conShow">
                    <div class="but-flow-popup">
                        <h5>抱歉，体验会员仅支持免费发布一个短视频</h5>
                        <button class="orange-btn buy-btn" @click="goBuy()">开通付费账号</button>
                        <button class="default-btn cancel-btn" @click="showHidePopup(0)">取消</button>
                    </div>
                </div>
            </transition>
        </div>
        <div class="popup-area" v-if="popupLayer.show && popupLayer.curState === 'info'">
            <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                <div class="popup-box" v-if="popupLayer.conShow">
                    <div class="my-info-popup">
                        <h5>短视频套餐</h5>
                        <template v-if="Member.userStatus === 1">
                            <dl class="bar-area">
                                <dt>短视频流量</dt>
                                <dd>
                                    <div class="finish-text" v-if="Member.userFlowPer >= 100">您的流量已用尽,可购买流量包提升短视频流量</div>
                                    <div class="bar" :class="{'finish': Member.userFlowPer > 70, 'disabled': Member.userStatus === 4}"><i :style="{'width': Member.userFlowPer + '%'}"></i></div>
                                    <p>共{{Member.userFlowBytes/1024/1024/1024}}G,已使用{{Member.userUseFlowBytes=== 0 ? Member.userUseFlowBytes : (Member.userUseFlowBytes/1024/1024/1024).toFixed(1)}}G(服务期内有效)</p>
                                </dd>
                            </dl>
                            <div class="btn-box">
                                <button class="orange-btn buy-btn" @click="goBuy()">付费开通</button>
                            </div>
                        </template>
                        <template v-else>
                            <dl class="bar-area">
                                <dt>存储空间</dt>
                                <dd>
                                    <div class="finish-text" v-if="Member.userSpacePer >= 100">您的存储空间已用尽,如需提升请联系客服</div>
                                    <div class="bar" :class="{'finish': Member.userSpacePer > 70, 'disabled': Member.userStatus === 4}"><i :style="{'width': Member.userSpacePer + '%'}"></i></div>
                                    <p>共{{Member.userSpaceBytes/1024/1024/1024}}G,已使用{{Member.userSpaceBytes=== 0 ? Member.userSpaceBytes : (Member.userUseSpaceBytes/1024/1024/1024).toFixed(1)}}G</p>
                                </dd>
                                <dt>短视频流量</dt>
                                <dd>
                                    <div class="finish-text" v-if="Member.userFlowPer >= 100">您的流量已用尽,可购买流量包提升短视频流量</div>
                                    <div class="bar" :class="{'finish': Member.userFlowPer > 70, 'disabled': Member.userStatus === 4}"><i :style="{'width': Member.userFlowPer + '%'}"></i></div>
                                    <p>共{{Member.userFlowBytes/1024/1024/1024}}G,已使用{{Member.userUseFlowBytes=== 0 ? Member.userUseFlowBytes : (Member.userUseFlowBytes/1024/1024/1024).toFixed(1)}}G(服务期内有效)</p>
                                </dd>
                            </dl>
                            <div class="data-box">
                                <b>服务器</b>
                                <span :class="{'red': Member.userStatus === 4}">有效期至{{Member.vipEndDate}}</span>
                            </div>
                            <div class="btn-box">
                                <button class="orange-btn buy-btn" @click="goBuy()">续费</button>
                                <button class="default-btn cancel-btn" @click="goBuy(4)">流量包</button>
                            </div>
                        </template>
                    </div>
                    <i class="close" @click="showHidePopup(0)"></i>
                </div>
            </transition>
        </div>
        <div class="popup-area" v-if="popupLayer.show && popupLayer.curState === 'help'">
            <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                <div class="popup-box" v-if="popupLayer.conShow">
                    <div class="help-info-popup">
                        <p></p>
                    </div>
                    <i class="close" @click="showHidePopup(0)"></i>
                </div>
            </transition>
        </div>
        <!-- 分类选择组件 -->
        <SelectClassify :title="'选择分类'" :enterText="'转移至该分类'" ref="selectClassifyLayer" :info="Classify.curItem" @closeBack="changeVideoClass" @addClassBack="refreshClassListData" />
    </div>
</template>

<script>
import {
    Setting,
    classListShow,
    showVideoList,
    videoShelf,
    videoDel,
    indexCover,
    transferClass,
    setMealQuery
} from "@/api/shop/video.bac";
import {
    Dialog
} from 'vant';
import VideoListComponent from "./components/VideoList";
import SelectClassify from "./components/SelectClassify";
import PageHead from "./components/PageHead";
import VideoSearch from "./components/VideoSearch";
import VideoManageBtn from "./components/VideoManageBtn";
import hint from "@/plugins/hint";

export default {
    name: "videoList",
    data() {
        return {
            noPicUrl: 'https://aimg8.dlssyht.cn/wap/public/shop_nopic.png',
            // 轮播图相关
            Banner: {
                listData: []
            },
            // 分类列表数据
            Classify:{
                // 类层是否显示
                show: false,
                // 类层内容是否显示
                conShow: false,
                // 是否加载
                loading: false,
                // 标签当前选中项
                curItem: {id:0, name:"全部"},
                // class列表数据
                list: []
            },
            // 视频列表相关
            VideoList: {
                // 当前是否处于管理状态
                manage: 0,
                // 是否第一次加载
                firstLoad: 1,
                // 当前页码
                curPage: 1,
                // 每页取的条数
                pageLimit: 30,
                // 列表加载状态
                loading: 0,
                // 是否已经没有数据
                ajaxFinish: 0,
                // 列表数据
                listData: [],
                // 当前组件是否显示
                show: 0
            },
            SearchVideo:{
                keyword: ''
            },
            //会员相关
            Member: {
                // 是否处于异步加载状态
                loading: false,
                // 封面图是否处于上传状态
                coverUploading: false
            },
            // 弹出层相关
            popupLayer: {
                show: false,
                conShow: false,
                curState: null
            },
            showBackBtn: false,
            node_env: this.$util.functions.environment(),
            token: this.$util.cookies.get(process.env.VUE_APP_TOKEN) || ''
        };
    },
    watch: {
        $route(to, from) {
            this.GestureGoHome();
        },
        curItem(){
            setTimeout(() => {
                let activeItem = this.$refs.classifyList.querySelector('.active');
                if(activeItem){
                    let left = Math.max(activeItem.offsetLeft - this.$refs.classifyList.offsetWidth/2, 0);
                    this.$refs.classifyList.scrollLeft = left;
                }

            }, 700);
        }
    },
    created() {
        // 获取会员信息
        this.getMemberInfo();
        // 获取banner图数据
        this.getBannerData();
        // 初始化分类数据
        this.getClassListData();
        // this.getVideoListData();
    },
    mounted: function () {
        let that = this,
            VideoList = that.VideoList;
        if(that.$route.query.class_id){
            that.Classify.curItem.id = that.$route.query.class_id*1;
        }
        /* 初始化绑定事件 */
        that.bindEvent();
        that.GestureGoHome();
    },
    methods: {
        goHelp(){
            this.$router.push({
                path: 'help'
            });
        },
        /**
         * 绑定事件方法
         */
        bindEvent() {
            let that = this,
                VideoList = that.VideoList,
                pageMainWrap = $("#pageMainWrap"),
                noDataText = pageMainWrap.find('.no-data-text'),
                listHead = pageMainWrap.find(".list-head"),
                listHeadH = listHead.outerHeight(),
                listBody = pageMainWrap.find(".list-body"),
                listBodySTop = null,
                Document = $(document),
                prevY = Document.scrollTop(),
                setTimeLoad = null,
                Win = $(window);

            // 给Document绑定滚动事件
            Document.on("scroll", function () {
                listBodySTop = listBodySTop || listBody.offset().top;
                let scrollTop = Document.scrollTop();
                // 发布按钮的定位效果
                if (scrollTop >= listBodySTop) {
                    listHead.addClass("fixed animated fadeInDown").css({
                        'padding-top': that.$store.getters.variables.many.BarHeight/2 + 'px'
                    });
                    // listHead.css({"position":"fixed", left: 0, top: '0', right: 0});
                    listBody.css("padding-top", listHeadH);
                } else {
                    if (listHead.hasClass("fixed")) {
                        if (scrollTop < listBodySTop - listHeadH) {
                            listHead.removeClass("fixed animated fadeInDown").css({
                                'padding-top': ''
                            });
                            listBody.css("padding-top", 0);
                        }
                    }
                }
                clearTimeout(setTimeLoad);
                // 滚动加载视频数据
                if (prevY < scrollTop && Win.outerHeight() >= noDataText.offset().top - scrollTop) {
                    prevY = scrollTop;
                    setTimeLoad = setTimeout(() => {
                        that.getVideoListData('add');
                    }, 200);
                }
            });
        },
        /**
         * @description: 获取用户信息
         * @param {type}
         * @return:
         */
        getMemberInfo() {
            let that = this,
                Member = that.Member;
            Member.loading = true;
            // 获取用户数据并执行相关操作
            setMealQuery().then(res => {
                for (let key in res) {
                    Member[key] = res[key];
                }
                // 判断用户是否快到期，或者已到期，弹出不同提示
                if (Member.userStatus === 5 || Member.userStatus === 4) {
                    Dialog.alert({
                        className: 'video-dialog',
                        title: "温馨提示",
                        message: Member.userStatus === 5 ? '您的短视频服务即将到期,到期后您的短视频将被全部下架,请及时充值': '您的短视频服务已到期,即将删除您的全部短视频,请及时续费',
                        confirmButtonText: '关闭',
                        confirmButtonColor: '#FF9900'
                    });
                }
                Member.loading = false;
                // 短视频商家助手版本
                if (res.siteid != 84) {
                    this.showBackBtn = true;
                } else {
                    setTimeout(function () {
                        that.$util.app.Shop.ShowFooterMenu(1);
                    }, 10);
                }
                that.$util.shopVideo.username(res.username);
            });
        },
        /**
         * @description: 上传封面
         * @param {type}
         * @return:
         */
        CoverUpload(event) {
            let that = this,
                Member = that.Member,
                file = event.srcElement; //当前file对象
            Member.coverUploading = true;
            indexCover(file).then((data) => {
                Member.videoBanner = data;
                Member.coverUploading = false;
            });
        },
        /**
         * @description: 获取Banner图信息
         * @param {type}
         * @return:
         */
        getBannerData() {
            var that = this,
                Banner = that.Banner;
            Setting().then(function (data) {
                JSON.parse(data.banners).forEach((v, i) => {
                    Banner.listData.push(v);
                });
            });
        },
        refreshClassListData(){
            this.getClassListData('refresh');
        },
        /**
         * @Date: 2020-06-23 14:45:11
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取分类数据
         * @param {type} 参数说明
         * @return: 返回值
         */
        getClassListData(action){
            let that = this;
            let classify = that.Classify;
            that.$util.app.Shop.Refresh(true, 0);
            classify.list.splice(0, classify.list.length);
            classListShow({}).then((res)=>{
                if(res.list && res.list.length){
                    res.list.forEach(v=>{
                        classify.list.push(v);
                    })
                }
                if(action === 'refresh'){
                    return;
                }
                // 初始化视频列表
                that.getVideoListData();
            });
        },
        /**
         * @Date: 2020-07-03 14:20:06
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 打开选择类别层
         * @param {type} 无
         * @return: 返回值
         */
        selectClassifyShow(){
            this.$util.app.Shop.Refresh(false, 0);
            this.$refs.selectClassifyLayer.showClassifyLayer(1);
        },
        /**
         * @Date: 2020-06-23 15:11:34
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 切换分类方法，根据分类显示视频
         * @param {type} 单击的当前项id
         * @return: 返回值
         */
        switchClassify(item){
            var that = this,
                VideoList = that.VideoList;
            if(that.Classify.curItem.id != item.id && !VideoList.loading){
                that.Classify.curItem.id = item.id;
                that.Classify.curItem.name = item.name;
                VideoList.loading = false;
                VideoList.ajaxFinish = false;
                VideoList.curPage = 1;
                VideoList.show = 0;
                VideoList.listData.splice(0, VideoList.listData.length);
                that.getVideoListData('switchClass');
            }
        },
        /**
         * @Date: 2020-06-23 19:46:02
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 更改视频分类，供SelectClassify组件回调使用
         * @param {type} 参数说明
         * @return: 返回值
         */
        changeVideoClass(selectItem, closeLayer){
            if(!selectItem || selectItem.id == 0){
                hint.Msg({
                    message: '请选择转移到的分类项'
                });
                return;
            }
            let that = this;
            let Classify = that.Classify;
            if(selectItem.id == Classify.curItem.id){
                hint.Msg({
                    message: '当前视频已经在此分类下'
                });
                return;
            }
            let VideoList = that.VideoList;
            let editArr = {},
                selectTag = 0;
            VideoList.listData.forEach(function (v, i) {
                v.selected && !v.del && (editArr["video_ids[" + i + "]"] = v.id, selectTag++);
            });

            if(selectTag){
                Dialog.confirm({
                    className: 'video-dialog-alert',
                    message: '确认将所选'+selectTag+'个视频批量转移至分类"'+ selectItem.name +'"吗?',
                    confirmButtonColor: '#FF9900'
                }).then(() => {
                    transferClass({
                        ...editArr,
                        class_id: selectItem.id
                    }).then(res=>{
                        VideoList.listData.forEach(function (v, i) {
                            v.selected && (v.class_id = selectItem.id, v.selected = 0);
                        });
                        hint.Msg({
                            message: '转移成功'
                        });
                        that.switchClassify(selectItem);
                        that.VideoList.manage = false;
                        setTimeout(() => {
                            closeLayer(0);
                        }, 100);
                    });
                }).catch(() => {
                    // on cancel
                });

            }
        },
        /**
         * @description: 获取视频列表数据
         * @param {type}
         * @return:
         */
        getVideoListData(action) {
            var that = this,
                VideoList = that.VideoList,
                Classify = that.Classify;
            if (!VideoList.loading && !VideoList.ajaxFinish) {
                // 更改加载状态
                VideoList.loading = true;
                // 异步请求数据
                showVideoList({
                    limit: VideoList.pageLimit,
                    page: VideoList.curPage,
                    class_id: Classify.curItem.id
                }).then(function (data) {
                    // VideoList.loading = false;
                    VideoList.firstLoad = false;
                    VideoList.show = 1;
                    let getDataList = data.list;
                    if (getDataList.length) {
                        getDataList.forEach((v, i) => {
                            v.opacity = 0;
                            v.left = 0;
                            v.top = 0;
                            v.height = 0;
                            v.col = 0;
                            v.selected = 0;
                            VideoList.listData.push(v);
                        });
                        // 调用列表组件重置瀑布流布局
                        if(action){
                            that.$refs.VideoListComponent.counLayout(action);
                        }
                        VideoList.curPage += 1;
                    } else {
                        VideoList.ajaxFinish = 1;
                        VideoList.loading = false;
                    }
                }).catch((error) => {
                    // that.$router.push({path:'/shop/bac/login'});
                });
            }
        },
        /**
         * @Date: 2020-02-07 10:53:21
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 去续费或者购买
         * @param {type} 参数说明
         * @return: 返回值
         */
        goBuy(type) {
            let that = this,
                Member = that.Member;
            // 如果网站非vip会员提示
            if (!Member.siteVip) {
                Dialog.alert({
                    className: 'video-dialog-alert',
                    message: '该功能仅对付费网站开放,免费网站不支持购买',
                    confirmButtonColor: '#FF9900',
                    confirmButtonText: '关闭'
                })
                return;
            }
            // 是否支持app内购买
            if (!Member.isAppShopping) {
                hint.Alert({
                    message: '请联系客服'
                });
                return
            }
            if (type) {
                this.$router.push({
                    path: 'buy',
                    query: {
                        proType: type
                    }
                })
            } else {
                this.$router.push({
                    path: 'buy'
                });
            }
        },
        /**
         * @Date: 2020-06-29 10:30:20
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 视频管理开启关闭方法
         * @param {type} 当前状态
         * @return: 返回值
         */
        VideoManageSwitch(action){
            var that = this,
                Member = that.Member,
                VideoList = that.VideoList;
            if(VideoList.listData.length){
                VideoList.manage = action;
                that.$refs.VideoManageBtn.allSelected = 0;
                VideoList.listData.forEach((v, i)=>{
                    v.selected = 0;
                })
                if(Member.appFooterVersion === 1){
                    that.$util.app.Shop.ShowFooterMenu(!action);
                }
            }else{
                hint.Msg({
                    message: '当前没有可管理视频'
                });
            }
        },
        /**
         * @description: 点击按钮发布的方法
         * @param {type}
         * @return:
         */
        toPublish() {
            let that = this,
                Member = that.Member,
                VideoList = that.VideoList;
            // 网站vip判断
            if (!Member.siteVip) {
                Dialog.alert({
                    className: 'video-dialog-alert',
                    message: '抱歉,该功能仅对付费网站开放使用',
                    confirmButtonColor: '#FF9900',
                    confirmButtonText: '关闭'
                })
                return
            }
            // 如果是免费用户并且判断是否有上传过1个视频，如果有不能发布
            if (Member.userStatus === 1 && VideoList.listData.length) {
                that.showHidePopup(1, 'testMember');
                return;
            }

            // 判断空间是否已经用完
            /* if (Member.userStatus !== 1 && Member.surplusSpace <= 0) {
                Dialog.alert({
                    className: 'video-dialog-alert',
                    message: '您的存储空间已用尽',
                    confirmButtonColor: '#FF9900',
                    confirmButtonText: '关闭'
                })
                return
            } */
            that.$util.variable.Set({
                key: "VideoData",
                val: {}
            });
            // 跳转发布页
            location.href = "/VFrontend/shop/bac/video/publish/upload"
            /* that.$router.push({
                path: 'publish'
            }); */
        },
        /**
         * @Date: 2020-02-11 19:54:58
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 显示隐藏购买弹窗
         * @param {type} action:0表示显示，1表示隐藏， actionType: flow表示购买流量，info表示展示信息
         * @return: 返回值
         */
        showHidePopup(action, actionType) {
            let that = this,
                popupLayer = that.popupLayer;
            if (action === 1) {
                popupLayer.show = action;
                popupLayer.curState = actionType;
                setTimeout(() => {
                    popupLayer.conShow = action;
                }, 1);
            } else {
                setTimeout(() => {
                    popupLayer.show = action;
                }, 300);
                popupLayer.conShow = action;
            }
        },

        /**
         * 安卓原生返回 跳转主页
         * @constructor
         */
        GestureGoHome() {
            let that = this;
            setTimeout(function () {
                window.goGestureCallback = function () {
                    // 测试
                    that.$util.functions.GoBack('top', that.$route);
                }
            });
        },
        /**
         * @Date: 2020-06-22 11:52:36
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 打开搜索页
         * @param {type} 参数说明
         * @return: 返回值
         */
        showHideSearchLayer(action){
            // var that = this;
            // that.pageSearch = action;
            this.$router.push({
                path: 'search'
            });
            // that.$refs.VideoSearchLayer.
        },
        /**
         * @Date: 2020-06-24 18:37:28
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 跳转到类别管理页面
         * @param {type} 参数说明
         * @return: 返回值
         */
        classifyManage(){
            var that = this;
            that.$router.push({
                path: 'classifyManage'
            });
        },
        /**
         * @Date: 2020-07-07 20:28:18
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 返回首页
         * @param {type} 参数说明
         * @return: 返回值
         */
        goBack(){
            this.$util.functions.GoBack('top', this.$route);
        }
    },
    computed:{
        curItem(){
            return this.Classify.curItem.id;
        }
    },
    components: {
        PageHead,
        SelectClassify,
        VideoSearch,
        VideoManageBtn,
        VideoListComponent
    }
};
</script>

<style lang="scss">
@import "./css/videoPublic";
@import "./css/viedoList";
@import "./css/findLink";
.select-link-layer{
    .list-layout-t{
        .title-text{
            height: 1rem;
            line-height: 1rem;
            font-size: .32rem;
            color: rgba(34, 34, 34, 1);
            margin-left: .2rem;
        }
    }
    .list-layout-b{
        height: 7rem;
        overflow-y:auto;
    }
    .list-layout-f{
        display: flex;
    }
}
</style>

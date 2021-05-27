<!--
 * @Author       : qwguo
 * @description  : description
 * @Date         : 2020-07-05 11:36:36
 * @LastEditors  : qwguo
 * @LastEditTime : 2020-07-08 19:37:27
 * @FilePath     : \ev-frontend-test\src\pages\shop\views\video\backend\search.vue
-->
<template>
<!-- 视频搜索页面 video-search-page-->
<div class="V-S-P">
    <!-- 页面头部 -->
    <div class="page-title-area">
        <PageHead @backFun="goBack">
            <template>
                <div class="input-box">
                    <input type="text" ref="keywordDom" v-model="keyWord" @keydown.enter="enterSearch" @focus="showHideHistory(true)" placeholder="请输入您要搜索的内容" />
                </div>
                <div class="btn-box" @click="enterSearch">
                    <button>搜索</button>
                </div>
            </template>
        </PageHead>
        <div class="head-info-box" v-if="VideoList.total">
            <div class="list-count-text">共找到{{VideoList.total}}个相关视频</div>
            <div class="manage-btn">
                <button class="admin-btn default-btn" v-if="!VideoList.manage" @click="VideoManageSwitch(1)">管理</button>
                <button class="finish-btn orange-btn" v-if="VideoList.manage" @click="VideoManageSwitch(0)">完成</button>
            </div>
        </div>
    </div>
    <!-- 页面内容页 -->
    <div class="page-main-wrap" id="pageMainWrap" v-show="pageState" :style="{'margin-top': $store.getters.variables.many.BarHeight/2+'px'}">
        <VideoListComponent ref="VideoListComponent" v-if="pageState === 2" :listData="VideoList.listData" :manage="VideoList.manage" :listType="'search'"></VideoListComponent>
        <span class="loading-icon" v-if="VideoList.loading"></span>
        <span class="no-data-text" :class="(VideoList.ajaxFinish && VideoList.listData.length) ? 'visible':''" v-if="">没有更多数据了~~</span>
    </div>
    <!-- 管理视频列表按钮组件 -->
    <VideoManageBtn ref="VideoManageBtn" v-show="VideoList.manage" :listData="VideoList.listData" />
    <!-- 搜索历史记录 -->
    <div class="search-history" v-if="History.show" :style="{'margin-top': $store.getters.variables.many.BarHeight/2+'px'}">
        <dl>
            <dt>
                <strong>历史搜索</strong>
                <i class="sjzs-icon s-icon-delete" @click="delHistory"></i>
            </dt>
            <dd>
                <ul class="history-list" v-if="!History.loading && History.list.length">
                    <li v-for="(item, index) in History.list" :key="item.id" @click="selectItemSearch(item)">
                        <span class="key-word">{{item.name}}</span>
                        <i class="sjzs-icon s-icon-cross" @click.stop="delHistory(item, index)"></i>
                    </li>
                </ul>
                <span class="loading-icon" v-if="History.loading"></span>
                <div class="history-empty" v-if="!History.loading && !History.list.length">暂无搜索记录</div>
            </dd>
        </dl>
    </div>
    <!-- 分类选择组件 -->
    <SelectClassify :title="'选择分类'" :enterText="'转移至该分类'" ref="selectClassifyLayer" :info="Classify.curItem" @closeBack="changeVideoClass" />

</div>
</template>

<script>
import hint from "@/plugins/hint";
import {
    Dialog
} from 'vant';
import VideoListComponent from "./components/VideoList";
import PageHead from "./components/PageHead";
import VideoManageBtn from "./components/VideoManageBtn";
import SelectClassify from "./components/SelectClassify";
import {
    showVideoList,
    searchLog,
    searchLogDel,
    transferClass,
} from "@/api/shop/video.bac";
export default {
    name: "videoList",
    data() {
        return {
            pageState: 0,
            History: {
                loading: false,
                show: false,
                list: [],
            },
            keyWord: '',
            pageLoading: false,
            // 视频列表相关
            VideoList: {
                // 当前是否处于管理状态
                manage: 0,
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
                // 视频总条数
                total: 0
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
                list: null
            },
        };
    },
    mounted(){
        var that = this;
        var Win = $(window);
        var Document = $(document);
        var pageMainWrap = $('#pageMainWrap');
        var noDataText = pageMainWrap.find('.no-data-text');
        var prevY = Document.scrollTop();
        var setTimeLoad = null;
        $(document).on("scroll", function () {
            let $this = $(this);
            let scrollTop = $this.scrollTop();
            clearTimeout(setTimeLoad);
            // 滚动加载视频数据
            if (prevY < scrollTop && Win.outerHeight() && Win.outerHeight() >= noDataText.offset().top - scrollTop) {
                prevY = scrollTop;
                setTimeLoad = setTimeout(() => {
                    that.getVideoListData('add');
                }, 200);
            }
        });
        if(that.$route.query.search_title){
            that.keyWord = that.$route.query.search_title;
            that.enterSearch();
        }else{
            that.$refs.keywordDom.focus();
        }
    },
    methods: {
        /**
         * @Date: 2020-07-03 16:55:10
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取搜索历史记录信息
         * @param {type} 参数说明
         * @return: 返回值
         */
        gethHistoryData() {
            let that = this;
            that.History.loading = true;
            searchLog({}).then(res => {
                that.History.loading = false;
                if (res.cnt) {
                    that.History.list = res.list;
                }
            })
        },
        /**
         * @Date: 2020-07-03 17:15:43
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 显示搜索记录层
         * @param {type} 参数说明
         * @return: 返回值
         */
        showHideHistory(action) {
            let that = this;
            if (action) {
                that.gethHistoryData();
            }
            that.History.show = action;
        },
        /**
         * @Date: 2020-07-06 17:24:06
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 删除搜索记录
         * @param {type} 有参数表示单个删除，没有表示全部删除
         * @return: 返回值
         */
        delHistory(item, index) {
            let that = this;
            let j = {};
            if (index === undefined) {
                j.all_log = 1
            } else {
                j.log_id = item.id
            }
            searchLogDel({
                log_id: item.id,
                all_log: 1
            }).then(res => {
                hint.Msg({
                    message: '删除成功!'
                });
                if (j.log_id) {
                    that.History.list.splice(index, 1);
                } else {
                    that.History.list.splice(0, that.History.list.length);
                }
            })
        },
        /**
         * @Date: 2020-07-06 16:08:45
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 搜索视频方法
         * @param {type} 参数说明
         * @return: 返回值
         */
        enterSearch() {
            let that = this;
            if (that.keyWord.length) {
                that.pageState = 1;
                that.VideoList.listData.splice(0, that.VideoList.listData.length);
                that.VideoList.ajaxFinish = 0;
                that.VideoList.curPage = 1;
                that.getVideoListData();
                that.showHideHistory(false);
            } else {
                hint.Msg({
                    message: '请输入关键字'
                });
            }
        },
        /**
         * @Date: 2020-07-06 16:09:21
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 选择项搜索
         * @param {type} 当前单击的项目
         * @return: 返回值
         */
        selectItemSearch(item) {
            let that = this;
            that.keyWord = item.name;
            that.enterSearch();
        },
        /**
         * @description: 获取视频列表数据
         * @param {type}
         * @return:
         */
        getVideoListData(action) {
            var that = this,
                VideoList = that.VideoList;
            if (!VideoList.loading && !VideoList.ajaxFinish) {
                // 更改加载状态
                VideoList.loading = true;
                console.log(VideoList.curPage)
                // 异步请求数据
                showVideoList({
                    limit: VideoList.pageLimit,
                    page: VideoList.curPage,
                    class_id: 0,
                    search_title: that.keyWord
                }).then(function (data) {
                    that.pageState = 2;
                    // VideoList.loading = false;
                    VideoList.total = data.total;
                    let getDataList = data.list;
                    if (getDataList.length) {
                        VideoList.curPage += 1;
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
                        that.$refs.VideoListComponent.counLayout(action);
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
         * @Date: 2020-06-29 10:30:20
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 视频管理开启关闭方法
         * @param {type} 当前状态
         * @return: 返回值
         */
        VideoManageSwitch(action) {
            var that = this,
                Member = that.Member,
                VideoList = that.VideoList;
            if(VideoList.listData.length){
                VideoList.manage = action;
                that.$refs.VideoManageBtn.allSelected = 0;
                VideoList.listData.forEach((v, i)=>{
                    v.selected = 0;
                })
            }else{
                hint.Msg({
                    message: '当前没有可管理视频'
                });
            }
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
            this.$refs.selectClassifyLayer.showClassifyLayer(1);
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
                        setTimeout(() => {
                            that.VideoList.manage = false;
                            closeLayer(0);
                        }, 100);
                    });
                }).catch(() => {
                    // on cancel
                });

            }
        },
        goBack(){
            this.$router.push({
                path: '/shop/bac/video/index'
            });
        }
    },
    components: {
        VideoListComponent,
        PageHead,
        VideoManageBtn,
        SelectClassify
    }
};
</script>

<style lang="scss">
@import "./css/videoPublic";
@import "./css/videoSearch";
</style>

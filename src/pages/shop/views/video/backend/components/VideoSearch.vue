<!--
 * @Author       : qwguo
 * @description  : description
 * @Date         : 2020-06-22 10:42:22
 * @LastEditors  : qwguo
 * @LastEditTime : 2021-01-27 15:40:06
 * @FilePath     : \ev-frontend-test\src\pages\shop\views\video\backend\components\VideoSearch.vue
-->
<template>
<!-- 视频搜索页面 video-search-page-->
<div class="V-S-P">
    <!-- 页面头部 -->
    <div class="page-title" :style="{'margin-top': $store.getters.variables.many.BarHeight/2+'px'}">
        <i @click="backList" class="sjzs-icon s-icon-left-1"></i>
        <div class="input-box">
            <input type="text" v-model="keyWord" @keydown.enter="enterSearch" placeholder="请输入您要搜索的内容" />
        </div>
        <div class="btn-box" @click="enterSearch">
            <button>搜索</button>
        </div>
    </div>
    <!-- 搜索历史记录 -->
    <div class="search-history">
        <dl>
            <dt>
                <strong>历史搜索</strong>
                <i class="sjzs-icon s-icon-delete-1"></i>
            </dt>
            <dd>
                <ul class="history-list" v-if="HistoryList && HistoryList.length">
                    <li v-for="(item, index) in HistoryList" :key="item.id">
                        <span class="key-word">{{item.name}}</span>
                        <i class="sjzs-icon s-icon-cross-1"></i>
                    </li>
                </ul>
                <div v-else>暂无搜索记录</div>
            </dd>
        </dl>
    </div>

</div>
</template>

<script>
import hint from "@/plugins/hint";
import {
    searchLog
} from "@/api/shop/video.bac";
export default {
    name: "videoList",
    data() {
        return {
            showBackBtn: true,
            showSearchHistory: false,
            HistoryList: null,
            keyWord:''
        };
    },
    created(){
        this.gethHistoryData();
    },
    methods:{
        /**
         * @Date: 2020-07-03 16:55:10
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取搜索历史记录信息
         * @param {type} 参数说明
         * @return: 返回值
         */
        gethHistoryData(){
            let that = this;
            searchLog({}).then(res=>{
                if(res.cnt){
                    that.HistoryList = res.list;
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
        showHideHistory(action){
            let that = this;
            if(that.HistoryList && that.HistoryList.length){
                that.showSearchHistory = true;
                that.HistoryList = res.list;
            }
        },
        backList(){
            this.$parent.showHideSearchLayer(false);
        },
        enterSearch(){
            let that = this;
            if(that.keyWord.length){
                that.$emit('searchBack', that.keyWord);
            }else{
                 hint.Msg({
                    message:'请输入关键字'
                });
            }
        }
    }
};
</script>

<style lang="scss">
@import "../css/videoSearch";
</style>

<template>
<div class="select-layer select-link-layer" v-if="Layer.show">
    <div class="bg" @click="showHideLayer(0)"></div>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
        <div class="layer-con-wrap" v-if="Layer.conShow">
            <div class="list-layout add-item-wrap">
                <div class="list-layout-t">
                    <a class="back-btn" @click="backPrevLeve"></a>
                    <span class="title-text">{{Link.titleText}}</span>
                </div>
                <div class="list-layout-b">
                    <div class="search-box" v-if="Link.list.length">
                        <input v-model="Link.searchWord" type="search" @keyup.enter="searchLink" placeholder="栏目名称搜索" />
                        <i class="clear-icon" @click="Link.searchWord='',getOneLevelData()"></i>
                    </div>
                    <div class="list-box">
                        <span class="loading-icon" v-if="Link.loading"></span>
                        <span class="no-data-text" v-if="!Link.loading && !Link.list.length">没有相关数据</span>
                        <ul v-if="!Link.loading && Link.list.length">
                            <li v-for="(item, index) in Link.list" :key="item.id">
                                <div class="text-box">{{item.name}}</div>
                                <div class="btn-box">
                                    <button class="default-btn" v-if="item.lowerLevel" @click="getTwoLevelData(item)">下一级</button>
                                    <button class="orange-btn" @click="selectedLink(item)">选定</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import hint from "@/plugins/hint";
import {
    shortVideoPosterLink
} from "@/api/shop/video.bac";
export default {
    name: "FindLink",
    props:['setLinkType'],
    data() {
        return {
            Selected: [],
            Layer: {
                show: true,
                conShow: true
            },
            Link: {
                loading: false,
                list: [],
                backType: null,
                titleText: null,
                linkKey: null,
                searchWord: ''
            },
            /**
             * @Date: 2020-02-14 12:13:39
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 记录已经的数据
             * @param {type} 参数说明
             * @return: 返回值
             */
            OneLevel:{
                list: []
            }
        };
    },
    created() {
        let that = this;
        that.getOneLevelData();
    },
    methods: {
        /**
         * @Date: 2020-02-13 23:06:37
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取一级数据
         * @param {type} 参数说明
         * @return: 返回值
         */
        getOneLevelData(action){
            let that = this,
                Link = that.Link,
                OneLevel = that.OneLevel;
            Link.loading = true;
            Link.titleText = '栏目名称';
            let whiteData = function(){
                let list = Link.list;
                list.length = 0;
                OneLevel.list.forEach(v=>{
                    if(action==='search'){
                        if(v.name.indexOf(Link.searchWord)!=-1){
                            list.push(v);
                        }
                    }else{
                        list.push(v);
                    }

                });
                Link.loading = false;
            };
            if(OneLevel.list.length){
                whiteData();
            }else{
                shortVideoPosterLink({
                    type: that.setLinkType,
                    grade: 1
                }).then(res => {
                    let linkData = res.linkData;
                    if(linkData){
                        for(let v in linkData){
                            linkData[v].forEach(v_ => {
                                v_.linkKey = v;
                                OneLevel.list.push(v_);
                            });
                        }
                        whiteData();
                    }else{
                        Link.loading = false;
                    }
                });
            }
        },
        /**
         * @Date: 2020-02-13 23:15:42
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取二级列表
         * @param {type} item:对象形式，一级列表中的对象
         * @return: 返回值
         */
        getTwoLevelData(item){
            let that = this,
                Link = that.Link;
            Link.loading = true;
            Link.backType = item;
            let postData = {type: that.setLinkType,chType: item.type};
            // console.log(postData)
            if(item === 'back'){
                that.Selected.length = that.Selected.length - 1;
                item = that.Selected[that.Selected.length-1];
                if(!item){
                    that.getOneLevelData();
                    return
                }
            }else{
                that.Selected.push(item);
            }
            if(item.linkKey){
                postData.linkKey = item.linkKey;
                postData.grade = 2;
                postData.chId = item.id;
                Link.titleText = item.name;
                Link.linkKey = item.linkKey;
            }else{
                postData.grade = 3;
                postData.chId = item.channel_id;
                postData.linkId = item.id;
                Link.titleText += ' >> '+item.name;
            }
            shortVideoPosterLink(postData).then(res => {
                let list = Link.list,
                    linkData = res.linkData;
                list.length = 0;
                if(typeof(linkData) === 'object'){
                    linkData.forEach(v => {
                        list.push(v);
                    });
                }
                Link.loading = false;
            });
        },
        /**
         * @Date: 2020-02-14 20:13:31
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 返回上一级函数
         * @param {type} 参数说明
         * @return: 返回值
         */
        backPrevLeve(){
            let that = this;
            if(!that.Selected.length){
                that.showHideLayer(0);
            }else{
                that.getTwoLevelData('back');
            }
        },
        /**
         * @Date: 2020-02-14 20:13:51
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 搜索方法
         * @param {type} 参数说明
         * @return: 返回值
         */
        searchLink(event){
            this.getOneLevelData('search');
            event.target.blur();
        },
        /**
         * @Date: 2020-02-04 19:18:21
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 显示隐藏弹窗
         * @param {type} 参数说明
         * @return: 返回值
         */
        showHideLayer(action, changeType) {
            var that = this;
            action = !!action;
            if (action) {
                that.Layer.show = action;
                setTimeout(() => {
                    that.Layer.conShow = action;
                }, 100);
            } else {
                that.Layer.conShow = action;
                if (changeType) {
                    that.$emit("backFunction", that.Selected);
                } else {
                    that.$emit("backFunction");
                }
                setTimeout(() => {
                    that.Layer.show = action;
                }, 100);
            }
        },
        /**
         * @Date: 2020-02-14 18:02:23
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 选择当前项
         * @param {type} 参数说明
         * @return: 返回值
         */
        selectedLink(item){
            this.Selected.push(item);
            this.showHideLayer(0, 'change')
        }
    }
};
</script>

<style lang="scss">
@import "../css/findLink";
</style>

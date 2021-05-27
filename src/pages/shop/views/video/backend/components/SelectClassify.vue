<template>
    <div class="select-layer select-link-layer" v-if="show">
        <div class="bg" @click="showClassifyLayer(0)"></div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
            <div class="layer-con-wrap" v-if="conShow">
                <div class="list-layout add-item-wrap">
                    <div class="list-layout-t">
                        <span class="title-text">{{title}}</span>
                    </div>
                    <div class="list-layout-b">
                        <div class="list-box">
                            <span class="loading-icon" v-if="loading"></span>
                            <span class="no-data-text" v-if="!loading && !list.length">没有相关数据</span>
                            <ul v-if="list.length">
                                <li v-for="(item, index) in list" :key="item.id" @click="selectClassify(item)">
                                    <div class="text-box">{{item.name}}</div>
                                    <div class="btn-box">
                                        <span class="sjzs-icon s-icon-duigou-1 radio-select" :data-selected="item.id == selectItem.id ? 1 : 0"></span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="list-layout-f">
                        <span class="default-btn add-btn" @click="changeDialog = true">添加分类</span>
                        <span class="orange-btn transfer-btn" @click="enderSelectItem">{{enterText}}</span>
                    </div>
                </div>
            </div>
        </transition>
        <van-dialog v-model="changeDialog" title="请输入分类名称" :before-close="closeFun" show-cancel-button confirm-button-color="#FF9900">
        <div class="change-classify-input">
            <input type="text" v-model="addItemName" placeholder="最多支持8个汉字" />
        </div>
    </van-dialog>
    </div>
</template>

<script>
import hint from "@/plugins/hint";
import {
    classListShow,
    classInfoHandle
} from "@/api/shop/video.bac";
export default {
    name: "SelectClassify",
    data() {
        return {
            // 添加弹窗状态
            changeDialog: false,
            // 添加新的分类名称
            addItemName: '',
            // 类层是否显示
            show: false,
            // 类层内容是否显示
            conShow: false,
            // 是否加载
            loading: false,
            // 标签当前选中项
            curItem: {id:0, name:"全部"},
            // 转移当前选中项
            selectItem: {id: 0, name:"全部"},
            // class列表数据
            list: []
        };
    },
    props:{
        info: {type: Object},
        title: {type: String},
        enterText: {type: String}
    },
    created(){
        this.getClassListData();
    },
    methods:{
        /**
         * @Date: 2020-06-23 14:45:11
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取分类数据
         * @param {type} 参数说明
         * @return: 返回值
         */
        getClassListData(){
            let that = this;
            that.loading = true;
            that.list.splice(0, that.list.length);
            classListShow({}).then((res)=>{
                that.loading = false;
                if(res.list && res.list.length){
                    res.list.forEach(v => {
                        that.list.push(v);
                    });
                }
            });
        },
        /**
         * @Date: 2020-06-23 18:27:56
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 选定要转移的分类项
         * @param {type} 单击的类
         * @return: 返回值
         */
        selectClassify(item){
            this.selectItem.id = item.id;
            this.selectItem.name = item.name;
        },
        /**
         * @Date: 2020-06-23 19:43:02
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 展示分类层
         * @param {type} 参数说明
         * @return: 返回值
         */
        showClassifyLayer(action){
            var that = this;
            action = !!action;
            if (action) {
                that.selectItem.id = that.info.id;
                that.selectItem.name = that.info.name;
                that.show = action;
                setTimeout(() => {
                    that.conShow = action;
                }, 100);
            } else {
                that.conShow = action;
                setTimeout(() => {
                    that.show = action;
                }, 100);
            }
        },
        /**
         * @Date: 2020-06-29 11:16:04
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 更改分类名称方法
         * @param {type}
         * @return: 返回值
         */
        enderSelectItem(){
            var that = this;
            that.$emit('closeBack', that.selectItem, that.showClassifyLayer);
        },
        /**
         * @Date: 2020-07-03 09:47:57
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 关闭添加弹窗方法
         * @param {type} 事件类型，done对象
         * @return: 返回值
         */
        closeFun(action, done){
            var that = this;
            switch(action){
                case 'cancel':
                    done();
                    break;
                case 'confirm':
                    var message = false;
                    that.addItemName = that.addItemName.trim();
                    if(that.addItemName.gblen() > 16){
                        message = '分类名称最多支持8个汉字或16个字符';
                    }
                    if(that.addItemName.gblen()<1){
                        message = '分类名称不能为空'
                    }
                    if(message){
                        hint.Msg({
                            message
                        });
                        done(false);
                        return;
                    }
                    classInfoHandle({type: 'add', name: that.addItemName}).then((res)=>{
                         hint.Msg({
                            message: '添加成功'
                        });
                        that.getClassListData();
                        that.addItemName = '';
                        that._events.addClassBack && that.$emit('addClassBack');
                        done();
                    })
                    break;
            }

        }
    }
}
</script>

<style lang="scss">
@import "../css/findLink";
.select-link-layer{
    .list-layout-t{
        .title-text{
            height: 1rem;
            line-height: 1rem;
            font-size: .32rem;
            color: rgba(34, 34, 34, 1);
            margin-left: .2rem;
            font-weight: 700;
        }
        border-bottom: 1px solid #EDEDED;
    }
    .list-layout-b{
        height: 7rem;
        overflow-y:auto;
    }
    .list-layout-f{
        display: flex;
    }
    .list-layout{
        .list-layout-b{
            margin-top: 0;
            .list-box{
                margin-top: 0;
                min-height: 6rem;
            }
        }
    }
    .change-classify-input{
        margin: .2rem 0 .7rem;
        text-align: center;
        input{
            padding: .25rem .5rem;
            border-width: 0 0 1px;
            border-color: #EDEDED;
            border-style: solid;
            color:#212121;
            font-weight: 700;
            width: 3.85rem;
            text-align: center;
        }
    }
}
</style>

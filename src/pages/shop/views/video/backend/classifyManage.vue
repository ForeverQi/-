<!--
 * @Author       : qwguo
 * @description  : description
 * @Date         : 2020-06-24 18:28:21
 * @LastEditors  : qwguo
 * @LastEditTime : 2021-01-27 15:49:32
 * @FilePath     : \ev-frontend-test\src\pages\shop\views\video\backend\classifyManage.vue
-->
<template>
<!-- 视频搜索页面 video-search-page-->
<div class="C-M-P">
    <!-- 页面头部 -->
    <PageHead :title="'分类管理'">
        <template>
            <div class="btn-box">
                <span v-if="!listChange" class="add-btn" @click="changeItemFun('add')">添加分类</span>
                <button v-if="listChange" class="orange-btn" @click="saveChange">保存</button>
            </div>
        </template>
    </PageHead>
    <!-- 分类列表 -->
    <div class="classify-lsit-wrap">
        <dl v-if="!loading">
            <dd>
                <ul class="classify-list" ref="classifyList" v-if="list.length">
                    <template v-for="(item, index) in list">
                        <li :key="item.id" :class="{moveUp:item.up,'moveDown':item.down}">
                            <div class="li-inner">
                                <span class="key-word">{{item.name}}</span>
                                <div class="btn-box">
                                    <i :class="[{hidden: index === 0}, 'sjzs-icon', 's-icon-up-1']" @click="changeSort('up', item, index)"></i>
                                    <i :class="[{hidden:index == list.length-1}, 'sjzs-icon', 's-icon-down-1']" @click="changeSort('down', item, index)"></i>
                                    <i class="sjzs-icon s-icon-edit-1" @click="changeItemFun('edit', item, index)"></i>
                                    <i class="sjzs-icon s-icon-cross-1" @click="changeItemFun('del', item, index)"></i>
                                </div>
                            </div>
                        </li>
                    </template>
                </ul>
                <span class="no-data-text" v-if="!list.length">没有相关数据</span>
            </dd>
        </dl>
        <span class="loading-icon" v-if="loading"></span>

    </div>
    <van-dialog v-model="changeDialog" title="请输入分类名称" :before-close="closeFun" show-cancel-button confirm-button-color="#FF9900" @confirm="enderChangeName">
        <div class="change-classify-input">
            <input type="text" v-model="curItem.name" placeholder="最多支持8个汉字" />
        </div>
    </van-dialog>
</div>
</template>

<script>
import hint from "@/plugins/hint";
import {
    Dialog
} from 'vant';
import PageHead from "./components/PageHead";
import {
    classListShow,
    classInfoHandle,
    classListHandle
} from "@/api/shop/video.bac";
export default {
    name: "classManage",
    data() {
        return {
            changeDialog: false,
            dialogAction: false,
            // 是否加载
            loading: false,
            // 标签当前选中项
            curItem: {
                id: 0,
                name: '',
                order_sort: 0
            },
            // class列表数据
            list: [],
            listChange: false
        };
    },
    created() {
        this.$util.app.Shop.Refresh(false, 0);
        this.getClassListData();
    },
    methods: {
        /**
         * @Date: 2020-06-23 14:45:11
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 获取分类数据
         * @param {type} 参数说明
         * @return: 返回值
         */
        getClassListData() {
            let that = this;
            that.loading = true;
            classListShow({}).then((res) => {
                that.loading = false;
                if (res.list && res.list.length) {
                    res.list.forEach(v => {
                        v.up = 0;
                        v.down = 0;
                        that.list.push(v);
                    });
                }
            });
        },
        /**
         * @Date: 2020-06-29 11:16:26
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 打开更改分类项弹窗
         * @param {type} 当前项
         * @return: 返回值
         */
        changeItemFun(action, item, index) {
            var that = this;
            if (item) {
                that.curItem.id = item.id;
                that.curItem.name = item.name;
                that.curItem.order_sort = item.order_sort;
                that.curItem.index = index;
            }
            switch (action) {
                case 'del':
                    that.deleteClassify(item, index);
                    break;
                case 'edit':
                case 'add':
                    if (action == 'add') {
                        that.curItem.id = 0;
                        that.curItem.name = '';
                        that.curItem.order_sort = 0;
                    }
                    that.changeDialog = true;
                    that.dialogAction = action;
                    break;
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
        enderChangeName() {

        },
        /**
         * @Date: 2020-06-29 11:15:48
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 删除分类方法
         * @param {type} 当前项
         * @return: 返回值
         */
        deleteClassify(item, index) {
            var that = this;
            Dialog.confirm({
                className: 'video-dialog-alert',
                message: '确定要删除该分类吗？',
                confirmButtonColor: '#FF9900'
            }).then(function () {
                classInfoHandle({
                    type: 'del',
                    id: item.id
                }).then((res) => {
                    that.list.splice(index, 1);
                    hint.Msg({
                        message: '删除成功'
                    });
                })
            }).catch(() => {
                // on cancel
            });
        },
        /**
         * @Date: 2020-07-07 16:06:23
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 关闭修改添加弹窗的方法
         * @param {type} 参数说明
         * @return: 返回值
         */
        closeFun(action, done) {
            var that = this;
            switch (action) {
                case 'cancel':
                    done();
                    break;
                case 'confirm':
                    var message = false,
                        curItem = that.curItem;
                    if (curItem.name.gblen() > 16) {
                        message = '分类名称最多支持8个汉字或16个字符';
                    }
                    if (curItem.name.gblen() < 1) {
                        message = '分类名称不能为空'
                    }
                    if (message) {
                        hint.Msg({
                            message
                        });
                        done(false);
                        return;
                    }
                    classInfoHandle({
                        type: that.dialogAction,
                        id: that.curItem.id,
                        name: that.curItem.name
                    }).then((res) => {
                        hint.Msg({
                            message: that.dialogAction == 'add' ? '添加成功' : '修改成功'
                        });
                        if (that.dialogAction == 'add') {
                            that.list.splice(0, that.list.length);
                            that.getClassListData();
                        } else {
                            that.list[that.curItem.index].name = that.curItem.name;
                        }
                        done();
                    })
                    break;
            }

        },
        /**
         * @Date: 2020-07-07 16:19:30
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 排序
         * @param {type} 参数说明-> action: up:上，down下，item当前项，index:当前项索引
         * @return: 返回值
         */
        changeSort(action, item, index){
            var that = this,
                swapItem = null,
                swapArr = function(arr, index1, index2) {
                    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
                };
            that.listChange = true;
            switch(action){
                case 'up':
                    swapItem = that.list[index - 1];
                    item.up = 1;
                    swapItem.down = 1;
                    setTimeout(() => {
                        swapArr(that.list, index, index - 1);
                        item.up = 0;
                        swapItem.down = 0;
                    }, 300);
                    break;
                case 'down':
                    swapItem = that.list[index+1];
                    item.down = 1;
                    swapItem.up = 1;
                    setTimeout(() => {
                        swapArr(that.list, index, index + 1)
                        item.down = 0;
                        swapItem.up = 0;
                    }, 300);
                    break;
            }


        },
        /**
         * @Date: 2020-07-07 17:24:34
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 保存更改
         * @param {type} 参数说明
         * @return: 返回值
         */
        saveChange(){
            let that = this,
                editArr = {};
            that.list.forEach(function (v, i) {
               editArr[i] = v.id;
            });
            classListHandle({ids: editArr}).then(res=>{
                hint.Msg({
                    message: '保存成功'
                });
                that.listChange = false;
            });
        }
    },
    components: {
        PageHead
    },
    beforeDestroy(){
        // 销毁组件更新下拉刷新功能
        this.$util.app.Shop.Refresh(true, 0);
    }
};
</script>

<style lang="scss">
@import "./css/videoPublic";

.C-M-P {
    display: flex;
    height: 100vh;
    flex-direction: column;
    .page-title {
        .inner{
            flex-shrink: 0;
        }
        .btn-box{
            position: absolute;
            right: .21rem;
            bottom: 0;
            top: 0;
            display: flex;
            align-items: center;
            *{
                flex-shrink: 0;
            }
        }
        .add-btn {
            display: inline-flex;
            align-items: center;
            color: #212121;
            font-size: .28rem;
        }
        .orange-btn{
            height: .5rem;
            border-radius: .05rem;
            padding: 0 .2rem;
        }
    }

    .classify-lsit-wrap {
        flex-grow: 1;
        background-color: #fff;
        overflow-y: auto;
        dl {
            height: 100%;
            overflow-y: auto;
            margin-left: 0;
        }

        dd {
            margin-left: 0;
        }

        .loading-icon {
            padding-top: 1rem;
        }
        .no-data-text {
            display: block;
            padding-top: .2rem;
        }
    }

    .classify-list {
        padding-bottom: .5rem;

        li {
            height: 1rem;
            border-bottom: 1px solid rgba(237, 237, 237, 1);
            position: relative;
            margin-left: .2rem;

        }
        .li-inner{
            display: flex;
            height: 100%;
            justify-content: space-between;
            align-items: center;
            background-color:#fff;
            left: 0;
            right: 0;
        }
        li.moveDown{
            .li-inner{
                transition: all .5s ease;
                transform: translateY(100%);
            }
        }
        li.moveUp{
            .li-inner{
                transition: all .5s ease;
                transform: translateY(-100%);
            }
        }

        .key-word {
            font-size: .28rem;
            color:#111;
        }

        .btn-box {
            flex-shrink: 0;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin-right: .2rem;
        }

        i {
            width: .48rem;
            height: .48rem;
            border-radius: 50%;
            background: rgba(241, 241, 241, 1);
            color: #333333;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin-left: .27rem;
            font-weight: 400;
            color: #333333;
            font-size: .26rem;
            font-style: normal;

            &.hidden {
                visibility: hidden;
            }
            &.s-icon-cross-1{
                font-size: .23rem;
            }
        }
    }

    .change-classify-input {
        padding: .2rem 0 .7rem;
        margin:  0 .88rem;
        text-align: center;

        input {
            padding: .25rem 0;
            border-width: 0 0 1px;
            border-color: #EDEDED;
            border-style: solid;
            color: #212121;
            font-weight: 700;
            width: 100%;
            text-align: center;
        }
    }
}
</style>

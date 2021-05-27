<!--
 * @Author       : qwguo
 * @description  : description
 * @Date         : 2020-07-06 18:12:13
 * @LastEditors  : qwguo
 * @LastEditTime : 2021-01-27 15:28:07
 * @FilePath     : \ev-frontend-test\src\pages\shop\views\video\backend\components\VideoManageBtn.vue
-->
<template>
<div class="video-manage-btn list-foot">
    <span class="all-select" @click="VideoListManage('select')">
        <i :data-selected="allSelected" class="sjzs-icon s-icon-duigou-1 radio-select"></i>
        <b>全选</b>
    </span>
    <span class="btn-area">
        <button class="btn-up" @click="VideoListManage('up')">
            上架
        </button>
        <button class="btn-down" @click="VideoListManage('down')">
            下架
        </button>
        <button class="btn-classify" @click="VideoListManage('classify')">
            分类
        </button>
        <button class="btn-del" @click="VideoListManage('del')">
            删除
        </button>
    </span>
</div>
</template>

<script>
import {
    videoShelf,
    videoDel
} from "@/api/shop/video.bac";
import {
    Dialog
} from 'vant';
import hint from "@/plugins/hint";
export default {
    name: 'VideoManage',
    props:['listData'],
    data(){
        return {
            allSelected: 0
        }
    },
    methods:{
        /**
         * @description: 管理视频列表
         * @param {type: string(select:全选，up:上架，down:下架，del:删除) }
         * @return:
         */
        VideoListManage(action) {
            var that = this,
                listData = that.listData;
            switch (action) {
                case "select":
                    that.allSelected = (!that.allSelected) * 1;
                    listData.forEach(function (v, i) {
                        v.selected = that.allSelected;
                    });
                    break;
                case "up":
                case "down":
                case "del":
                case "classify":
                    let editArr = {},
                        selectTag = false;
                    // 通过选中的视频项目遍历
                    listData.forEach(function (v, i) {
                        v.selected && !v.del && (editArr["ids[" + i + "]"] = v.id, selectTag = true);
                    });
                    if (selectTag) {
                        switch(action){
                            case 'del':
                                Dialog.confirm({
                                    className: 'video-dialog-alert',
                                    message: '确定要删除吗？',
                                    confirmButtonColor: '#FF9900'
                                }).then(() => {
                                    // 删除选中视频
                                    videoDel({
                                        ...editArr
                                    }).then(data => {
                                        if (data) {
                                            let i = listData.length - 1;
                                            while (i >= 0) {
                                                if (listData[i].selected) {
                                                    listData[i].del = true;
                                                    listData.splice(i, 1);
                                                }
                                                i--;
                                            }
                                            hint.Msg({
                                                message: '删除成功'
                                            });
                                            that.$parent.$refs.VideoListComponent.counLayout('del');
                                        }
                                    });
                                }).catch(() => {
                                    // on cancel
                                });
                                break;
                            case 'up':
                            case 'down':
                                // 视频上下架操作
                                let state = (action === "up") * 1,
                                    text = action === "up" ? '上架' : '下架';
                                Dialog.confirm({
                                    className: 'video-dialog-alert',
                                    message: '确定要' + text + '吗？',
                                    confirmButtonColor: '#FF9900'
                                }).then(() => {
                                    videoShelf({
                                        ...editArr,
                                        publish: state
                                    }).then(data => {
                                        if (data) {
                                            listData.forEach(function (v, i) {
                                                v.selected && (v.is_publish = state);
                                            });
                                            hint.Msg({
                                                message: text + '成功'
                                            });

                                        }
                                    });
                                }).catch(() => {
                                    // on cancel
                                });
                                break;
                            case 'classify':
                                that.$parent.selectClassifyShow();
                                break;
                        }
                    } else {
                        hint.Msg({
                            message: "请选择视频项目进行操作"
                        });
                    }
                    break;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .video-manage-btn {
        box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.1);
        padding: 0 0.2rem;
        position: fixed;
        z-index: 3;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1rem;
        background-color: #fff;
        z-index: 10;
        display: flex;

        .all-select {
            // cursor: pointer;
            flex-grow: 1;
            display: flex;
            align-items: center;
            padding-top: 0.1rem;
            .radio-select {
                display: inline-block;
                vertical-align: middle;
                margin: 0.01rem 0.14rem 0 0;
            }

            b {
                display: inline-block;
                vertical-align: middle;
                font-size: 0.28rem;
                color: rgba(34, 34, 34, 1);
            }
        }

        .btn-area {
            display: flex;
            align-items: center;

            button {
                cursor: pointer;
                width: 1.1rem;
                height: 0.55rem;
                padding: 0;
                font-size: 0.28rem;
                margin-left: 0.1rem;
                border: none;
                border-width: 1px;
                border-style: solid;
                border-color: transparent;
                border-radius: 0.05rem;
                background-color:#fff;
                border: 1px solid #DBDBDB;
                color:#222222;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                &.btn-up {
                    border-width:0;
                    background-image: linear-gradient(
                        to right,
                        rgba(255, 78, 0, 1),
                        rgba(255, 125, 24, 1)
                    );
                    color: #fff;
                }
            }
        }
    }
</style>

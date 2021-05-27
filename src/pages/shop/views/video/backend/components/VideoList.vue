<!--
 * @Author       : qwguo
 * @description  : description
 * @Date         : 2020-07-05 10:29:28
 * @LastEditors  : qwguo
 * @LastEditTime : 2021-01-27 15:20:37
 * @FilePath     : \ev-frontend-test\src\pages\shop\views\video\backend\components\VideoList.vue
-->
<template>
<div class="list-box-area" id="listBoxArea" ref="listBoxArea">
    <ul ref="listBox" class="list-box" v-show="listData.length">
        <template v-for="(item, index) in listData">
            <li :class="'list-item list-item-'+item.col" v-if="!item.del " :data-id="item.id" :data-classid="item.class_id" :style="{left: item.left +'px', top: item.top + 'px', opacity: item.opacity}">
                <span class="state-box" v-if="item.is_publish" data-state="up">已上线</span>
                <span class="state-box" v-if="!item.is_publish" data-state="down">已下架</span>
                <span class="sjzs-icon s-icon-duigou-1 radio-select" v-if="manage" :data-selected="item.selected" @click="VideoSelectItem(item)"></span>
                <div class="img-box" @click="goDetail(item)">
                    <img :src="item.conver" :alt="item.description" />
                </div>
                <div class="name-box">
                    <span>{{ item.title }}</span>
                </div>
            </li>
        </template>
    </ul>
    <div v-if="!listData.length" class="empty-list-item">
        <template v-if="listType == 'search'">
            <img src="../images/empty_search_item_icon.png" alt />
            <p>没有找到相关内容</p>
        </template>
        <template v-else>
            <img src="../images/empty_list_item_icon.png" alt />
            <p>您还没有添加的视频哦</p>
        </template>
    </div>
</div>
</template>

<script>
export default {
    name: 'VideoList',
    props: ['listData', 'manage', 'listType'],
    data() {
        return {
            loading: false,
            isFirst: true,
            nodeWidth: 0,
            colCount: 2,
            colHeight: [],
            itemDomArr: null,
            lastIndex: 0
        }
    },
    mounted() {
        let that = this;
        that.nodeWidth = that.$refs.listBoxArea.offsetWidth / that.colCount;
        that.itemDomArr = that.$refs.listBox.children;
        that.counLayout(0);
    },
    methods: {
        /**
         * @Date: 2020-07-06 11:55:18
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 等待图片加载完毕以后处理方法
         * @param {type} 参数说明
         * @return: 返回值
         */
        counLayout(action) {
            let that = this,
                listData = that.listData,
                loadFun = function (index) {
                    if (index < listData.length) {
                        let img = new Image(),
                            v = listData[index];
                        img.onerror = img.onload = function (event) {
                            if (event.type === 'error') {
                                v.conver = that.noPicUrl;
                            }
                            v.height = that.itemDomArr[index].offsetHeight;
                            that.waterFall(v);
                            if(index == listData.length -1){
                                that.$parent.VideoList.loading = false;
                            }
                            loadFun(that.lastIndex += 1);
                        }
                        img.src = v.conver;
                    }
                };
            switch(action){
                case 'switchClass':
                case 'del':
                    that.isFirst = true;
                    break;
            }
            if(action!='add'){
                that.lastIndex = 0;
            }
            loadFun(that.lastIndex);
        },
        /**
         * @Date: 2020-07-06 11:52:08
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 计算瀑布流
         * @param {type} 参数说明
         * @return: 返回值
         */
        waterFall: function (item) {
            var that = this;
            if (that.isFirst) {    // 首次调用的时候
                for (var i = 0; i < that.colCount; i++) {
                    that.colHeight[i] = 0;
                }
                that.isFirst = false
            }
            var index = 0,
                minSumHeight = that.colHeight[0];
            for (var i = 0; i < that.colHeight.length; i++) {
                if (that.colHeight[i] < minSumHeight) {
                    index = i
                    minSumHeight = that.colHeight[i]
                }
            }
            item.left = that.nodeWidth * index;
            item.top = minSumHeight;
            item.opacity = 1;
            item.col = index + 1;
            that.colHeight[index] = item.height + that.colHeight[index];
            that.$refs.listBox && (that.$refs.listBox.style.height = Math.max.apply(null, that.colHeight) + 'px');
        },
        /**
         * @Date: 2020-02-07 14:27:47
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 跳转到详情页
         * @param {type} 参数说明
         * @return: 返回值
         */
        goDetail(item) {
            let that = this,
                class_id = 0,
                search_title = '';
            switch(that.listType){
                case 'list':
                    class_id = that.$parent.Classify.curItem.id;
                    break;
                case 'search':
                    search_title= that.$parent.keyWord;
                    break;
            }
            this.$router.push({
                path: 'detail',
                query: {
                    id: item.id,
                    class_id,
                    search_title
                }
            });
        },

        /**
         * @Date: 2020-07-06 18:47:09
         * @LastEditors: qwguo
         * @LastEditTime: Do not edit
         * @description: 单个视频选择
         * @param {type} 当前视频
         * @return: 返回值
         */
        VideoSelectItem(item) {
            let that = this;
            item.selected = (!item.selected) * 1;
            let tag = that.listData.find(v=>{
                return v.selected == 0;
            });
            if(tag && that.$parent.$refs.VideoManageBtn){
                that.$parent.$refs.VideoManageBtn.allSelected = 0;
            }
            if(!tag && that.$parent.$refs.VideoManageBtn){
                that.$parent.$refs.VideoManageBtn.allSelected = 1;
            }
        },
    },
    computed: {
        /* getList: function () {
            this.counLayout();
            return this.listData;
        } */
    }
}
</script>

<style lang="scss" scoped>
.list-box {
    position: relative;
}

.list-item {
    overflow: hidden;
    position: absolute;
    width: 50%;
    padding-bottom: .02rem;
    z-index: 1;
    // transition: all .05s ease-in;
    &.list-item-1{
        z-index: 2;
        padding-right: .02rem;
    }
    &.list-item-2{
        z-index: 2;
        padding-left: .02rem;
    }
}

.img-box {
    border-radius: 0.06rem 0.06rem 0 0;
    overflow: hidden;

    img {
        max-width: 100%;
        vertical-align: top;
    }
}

.name-box {
    border-radius: 0 0 0.06rem 0.06rem;
    margin-bottom: 0.04rem;
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: rgba(245, 245, 245, 1);

    span {
        padding: 0 0 0 0.24rem;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        color: rgba(34, 34, 34, 1);
        font-size: 0.24rem;
    }
}

.state-box {
    position: absolute;
    z-index: 1;
    left: 0.09rem;
    top: 0.15rem;
    z-index: 2;
    width: 1.38rem;
    height: 0.45rem;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 0.45rem;
    color: #fff;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.48rem;
    text-indent: 0.2rem;

    &::before {
        position: absolute;
        content: "";
        width: 0.12rem;
        height: 0.12rem;
        border-radius: 0.08rem;
        font-size: 0;
        left: 0.22rem;
        top: 0.16rem;
    }

    &[data-state="up"] {
        &::before {
            background-color: rgba(51, 207, 124, 1);
        }
    }

    &[data-state="down"] {
        &::before {
            background-color: rgba(255, 85, 51, 1);
        }
    }
}

.radio-select {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    &::before {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
    }
}

.empty-list-item {
    text-align: center;
    flex-basis: 100%;
    padding-top: 1.3rem;

    img {
        width: 1.23rem;
        height: 0.1 0.38rem;
    }

    p {
        font-size: 0.24rem;
        color: rgba(169, 169, 169, 1);
        margin-top: 0.2rem;
    }
}
</style>

<template>
    <div>
        <ul :style="'padding-bottom:' + $store.getters.variables.many.footerHeight">
            <li @click="$router.push({ path: '/shop/bac/video/publish/edit?id=' + data.item.id })">编辑</li>
            <li @click="Publish(!data.item.is_publish)">{{data.item.is_publish == 1 ? '下架' : '上架'}}</li>
            <li @click="Delete">删除</li>
            <li @click="Share">分享</li>
            <li @click="Close">取消</li>
        </ul>
    </div>
</template>

<script>
    import { videoShelf, videoDel } from "@/api/shop/video.bac";
    import Hint from '@/plugins/hint'

    export default {
        data() {
            return {
                link: location.href,
                share: false
            }
        },
        props: ["data"],

        methods: {
            /**
             * 分享微信
             * @constructor
             */
            Share() {
                this.$util.variable.Setbatch([
                    {
                        key: "ShopVideoBacShare",
                        val: true
                    }, {
                        key: "ShopVideoBacActions",
                        val: false
                    },
                ]);
            },

            /**
             * 关闭操作按钮
             * @constructor
             */
            Close() {
                this.$util.variable.Set({
                    key: "ShopVideoBacActions",
                    val: false
                });
            },

            /**
             * 上下架
             * @param publish 0 下架 1 上架
             * @constructor
             */
            Publish(publish) {
                let ids = {};
                publish = publish ? 1 : 0;

                ids["ids[]"] = this.data.item.id;
                videoShelf({
                    ...ids,
                    publish
                }).then(data => {
                    return Hint.Alert({
                        title: '提示',
                        message: '操作成功'
                    }).then(() => {
                        this.Reload({
                            is_publish: publish
                        });
                    });
                });
            },

            /**
             * 删除
             * @constructor
             */
            Delete() {
                let ids = {};
                ids["ids[]"] = this.data.item.id;

                videoDel({...ids}).then(data => {
                    return Hint.Alert({
                        title: '提示',
                        message: '删除成功'
                    }).then(() => {
                        this.$router.push({
                            path: '/shop/bac/video/index'
                        })
                    });
                });
            },

            /**
             * 重新载入数据
             * @param data
             * @constructor
             */
            Reload(data = {}) {
                this.$EventBus.$emit('UpdateList', {
                    index: this.data.index,
                    data
                });
                this.Close();
            }
        }
    }
</script>

<style scoped>
    ul {
        display: block;
        position: fixed;
        bottom: 0;
        background-color: #fff;
        border-top-left-radius: .3rem;
        border-top-right-radius: .3rem;
        z-index: 1000;
        width: 100%;
    }

    li {
        list-style: none;
        width: 100%;
        border-bottom: 1px solid #EDEDED;
        text-align: center;
        font-size: .3rem;
        line-height: .82rem;
        cursor: pointer;
    }
</style>

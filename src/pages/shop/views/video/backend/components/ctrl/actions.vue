<template>
    <div class="select-layer">
        <div class="bg" @click="Close"></div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
            <div v-if="conShow" class="layer-con-wrap" :style="'padding-bottom:' + $store.getters.variables.many.footerHeight">
                <ul class="func-more-list">
                    <li class="edit-btn">
                        <a :href="'/VFrontend/shop/bac/video/publish/edit?id=' + data.item.id">编辑</a>
                    </li>
                    <li class="up-publish-btn" @click="Publish(!data.item.is_publish)">{{data.item.is_publish == 1 ? '下架' : '上架'}}</li>
                    <li class="down-publish-btn" @click="Delete">删除</li>
                    <li class="share-btn" @click="Share">分享</li>
                    <li class="cancel-btn" @click="Close">取消</li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    import { videoShelf, videoDel } from "@/api/shop/video.bac";
    import Hint from '@/plugins/hint'

    export default {
        data() {
            return {
                conShow: false,
                link: location.href,
                share: false
            }
        },
        props: ["data"],
        created(){
            setTimeout(() => {
                this.conShow = true;
            }, 1);
        },
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
                this.conShow = false;
                setTimeout(() => {
                    this.$util.variable.Setbatch([
                        {
                            key: "ShopVideoBacActions",
                            val: false
                        }, {
                            key: "ShopVideoBacShare",
                            val: false
                        }, {
                            key: "ShopVideoBacPoster",
                            val: false
                        },
                    ]);
                }, 200);
            },

            /**
             * 上下架
             * @param publish 0 下架 1 上架
             * @constructor
             */
            Publish(publish) {
                let that = this,
                    ids = {};
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
                        that.data.item.is_publish = publish;
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

                Hint.Confirm({
                    title: '提示',
                    message: "确认删除吗!"
                }).then(res => {
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
                }).catch(e => {});
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

<style scoped lang="scss">
    .func-more-list {
        li {
            height: 0.9rem;
            line-height: 0.9rem;
            font-size: 0.28rem;
            text-align: center;
            border-bottom: 1px solid rgba(237, 237, 237, 1);
            color:#848484;
            a{
                display: inline-block;
                width: 100%;
                height: 100%;
                color: inherit;
            }
            &.share-btn {
                border-bottom: 0;
            }

            &.cancel-btn {
                border-top: .1rem solid rgba(248, 248, 248, 1);
                border-bottom: 0;
                height: 1.1rem;
            }
        }
    }
</style>

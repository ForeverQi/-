<template>
    <div>
        <div v-if="showTypeSelect" class="select-layer">
            <div class="bg" @click="Close()"></div>
            <transition name="custom-classes-transition" enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
                <div class="layer-con-wrap" :style="'padding-bottom:' + $store.getters.variables.many.footerHeight">
                    <ul class="func-more-list">
                        <li class="share-btn" @click="TypeSelect('h5')">微信h5海报</li>
                        <li class="share-btn" @click="TypeSelect('xcx')">小程序海报</li>
                        <li class="cancel-btn" @click="Close()">取消</li>
                    </ul>
                </div>
            </transition>
        </div>

        <div v-if="showXcxidSelect" class="select-layer">
            <div class="bg" @click="Close()"></div>
            <transition name="custom-classes-transition" enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
                <div class="layer-con-wrap" :style="'padding-bottom:' + $store.getters.variables.many.footerHeight">
                    <ul class="func-more-list">
                        <li v-for="item in $store.getters.variables.many.ShopVideoBacPoster.xcx.app_ids" @click="XcxPoster(item)" v-text="item.name ? item.name : item.appid" class="share-btn" />
                        <li class="cancel-btn" @click="showXcxidSelect = false" v-text="'取消'" />
                    </ul>
                </div>
            </transition>
        </div>


        <div v-if="poserImg" class="sharePosters">
            <div class="sharePosters_box">
                <div class="sharePosters_box_all">
                    <div class="sharePosters_box_img_area">
                        <div class="sharePosters_box_img" @click="downSharePosters(poserImg)">
                            <img :src="poserImg" alt="">
                        </div>
                        <div class="sharePosters_box_text">
                            <img src="@/pages/shop/static/images/video/app_postersImg.png" alt="">
                        </div>
                    </div>

                    <div class="sharePosters_box_guanbi" @click="poserImg = ''">
                        <span>关闭</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading" class="sharePosters">
            <van-loading type="spinner" />
        </div>
    </div>
</template>

<script>
    import { videoDetailShare } from "@/api/shop/video.frontend"
    import { shortVideoShareDetail } from "@/api/shop/video.bac"
    import Hint from '@/plugins/hint'

    export default {
        data() {
            return {
                poserImg: '',
                showTypeSelect: false,
                showXcxidSelect: false,
                loading: false
            }
        },
        props: ["data"],

        created() {
            let
                share = this.$store.getters.variables.many.ShopVideoBacPoster,
                thisS = this
            ;

            if (share.site == 'wap') {
                this.loading = true;
                this.WapPoster(function () {
                    thisS.Close(true)
                });
            } else if (share.site == 'xcx') {
                this.XcxPosterAppidSelect();
            } else if (share.site == 'all') {
                this.showTypeSelect = true;
            } else {
                return Hint.Alert({
                    message: "您所属版本不支持分享功能！"
                }).then(res => {
                    this.Close();
                });
            }
        },

        methods: {
            /**
             * 关闭弹窗
             * @param type
             * @constructor
             */
            Close(type) {
                this.loading = false;

                if (!type) {
                    return this.$util.variable.Setbatch([
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
                }

                // 保留显示当前组件
                this.$util.variable.Setbatch([
                    {
                        key: "ShopVideoBacActions",
                        val: false
                    }, {
                        key: "ShopVideoBacShare",
                        val: false
                    }
                ])
            },

            /**
             * 手机h5报
             * @constructor
             */
            WapPoster(callback) {
                videoDetailShare({
                    username: this.$util.shopVideo.username(),
                    id: this.data.item.id,
                    is_backstage: 1
                }).then(data => {
                    "function" === typeof callback && callback();
                    this.Show({...data, img: data.wap_img_src})
                }).catch(error => {
                    "function" === typeof callback && callback();
                    this.loading = false;
                    Hint.Msg({
                        message: "海报获取失败"
                    });
                });
            },

            /**
             * 小程序海报
             * @constructor
             */
            XcxPoster(item) {
                let info = this.$store.getters.variables.many.ShopVideoBacPoster;
                this.loading = true;
                shortVideoShareDetail({
                    username: this.$util.shopVideo.username(),
                    id: this.data.item.id,
                    type: 1,
                    appid: item.appid,
                    online: info.online,
                    who: info.who,
                    is_backstage: 1,
                    version: info.version
                }).then(data => {
                    this.Show({...data, img: data.xcx_img_src})
                }).catch(error => {
                    this.loading = false;
                    Hint.Msg({
                        message: "海报获取失败"
                    });
                });
            },

            /**
             * 显示海报
             * @param data
             * @constructor
             */
            Show(data) {
                this.loading = false;
                if (!data.img) {
                    this.$util.Hint.Msg({
                        message: '海报获取失败, 请稍后重试'
                    });
                }

                this.poserImg = data.img;
                this.$util.variable.Set({
                    key: "ShopVideoBacShare",
                    val: false
                });
            },

            /**
             * 选择分享平台
             * @param item
             * @constructor
             * @return {boolean|Promise|*}
             */
            TypeSelect(item) {
                let thisS = this;
                this.loading = true;
                if (item == 'h5') {
                    return this.WapPoster(function () {
                        thisS.Close(true)
                    });
                } else if (item == 'xcx') {
                    return this.XcxPosterAppidSelect();
                }
            },

            /**
             * 小程序二维码初始化
             * @returns {boolean|void}
             * @constructor
             */
            XcxPosterAppidSelect() {
                let info = this.$store.getters.variables.many.ShopVideoBacPoster;
                if (this.$util.functions.Keys(info.xcx.app_ids).length > 1) {
                    this.loading = false;
                    this.showXcxidSelect = true;
                    return false;
                }

                return this.XcxPoster(info.xcx.app_ids[0]);
            },
            downSharePosters(imgUrl){
                this.$util.app.Shop.Share.download({url: imgUrl});
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "@/pages/shop/static/css/video.scss";

    .func-more-list {
        li {
            height: 0.9rem;
            line-height: 0.9rem;
            font-size: 0.28rem;
            text-align: center;
            border-bottom: 1px solid rgba(237, 237, 237, 1);

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
    .sharePosters_box_img_area{
        position: absolute;
        left: 0;
        top: 0;
        bottom: .9rem;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>

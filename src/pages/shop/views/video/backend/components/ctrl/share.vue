<template>
    <div class="select-layer">
        <div class="bg" @click="Close"></div>
        <div class="shareContet" style="transform: translateY(0);">
            <div class="shareContet_box">
                <div v-if="!showCtrl" class="shareContet_box_top">
                    <van-loading type="spinner" />
                </div>

                <div v-if="showCtrl" class="shareContet_box_top">
                    <div class="shareContet_box_top_title">
                        <span>分享</span>
                    </div>
                    <div class="shareContet_box_top_operation">
                        <div v-if="site && site != 'xcx'" class="shareContet_box_top_operation_cnt" @click="Share(1)">
                            <img src="@/pages/shop/static/images/video/videoShateWeixin.png" alt="">
                            <div><span>分享好友</span></div>
                        </div>
                        <div v-if="site && site != 'xcx'" class="shareContet_box_top_operation_cnt" @click="Share(0)">
                            <img src="@/pages/shop/static/images/video/pyq.png" alt="">
                            <div><span>分享朋友圈</span></div>
                        </div>
                        <div v-if="site" class="shareContet_box_top_operation_cnt" @click="Poster()">
                            <img src="@/pages/shop/static/images/video/videoSharePic.png" alt="">
                            <div><span>分享海报</span></div>
                        </div>
                        <div v-if="site && site != 'xcx'" class="shareContet_box_top_operation_cnt" @click="$util.app.Shop.Share.copy({content: link})">
                            <img src="@/pages/shop/static/images/video/videoShareLink.png" alt="">
                            <div><span>复制链接</span></div>
                        </div>
                    </div>
                </div>
                <div class="shareContet_box_bottom">
                    <span style="cursor: pointer;" @click="Close">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { shareSetting } from "@/api/shop/video.bac";
    import Hint from '@/plugins/hint'

    export default {
        data() {
            return {
                link: '',
                // 显示分享按钮组
                showCtrl: false,
                // 站点信息 wap 手机 xcx 小程序 all 全部 默认没有
                site: '',
                // 小程序信息
                xcx: {}
            }
        },
        props: ["data"],

        created() {
            this.link = this.data.item.detail_url.indexOf("http") === 0 ? this.data.item.detail_url : "http://" + this.data.item.detail_url;
            this.Settings();
        },

        methods: {

            /**
             * 微信分享
             * @param val 0:朋友圈、1:好友
             * @constructor
             */
            Share(val) {
                // this.$util.functions.GetQueryString("id", new URL(this.link));
                // this.$util.functions.GetQueryString("token");
                this.$util.app.Shop.Share.wechat({
                    type: 1,
                    wtype: val * 1,
                    title: this.data.item.title,
                    content: this.data.item.description,
                    image: this.data.item.conver,
                    link: this.link,
                })
            },

            /**
             * 关闭操作按钮
             * @constructor
             */
            Close() {
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
            },

            /**
             * 分享海报
             * @constructor
             */
            Poster() {
                this.Close();
                this.$util.variable.Setbatch([
                    {
                        key: "ShopVideoBacPoster",
                        val: true
                    }, {
                        key: "ShopVideoBacPoster",
                        val: {
                            site: this.site,
                            xcx: this.xcx
                        }
                    },
                ]);
            },

            /**
             * 分享设置
             * @constructor
             */
            Settings() {
                let info = this.$store.getters.variables.many.ShopVideoShareSetting;
                if (this.$util.functions.Len(info)) {
                    return this.SetType(info)
                }

                shareSetting().then(data => {
                    this.$util.variable.Set({
                        key: "ShopVideoShareSetting",
                        val: data
                    });

                    // let url = new URL(this.link);
                    // this.link = "http://" + data.host + url.pathname + url.search;
                    this.SetType(data);
                }).catch(error => {
                    Hint.Msg({
                        message: "分享信息获取失败"
                    });

                    this.Close();
                });
            },

            /**
             * 设置回调
             * @param data
             * @constructor
             */
            SetType(data) {
                this.showCtrl = true;

                if (data.wapArr.is_wap * 1 === 1) {
                    this.site = "wap";
                }

                if (data.xcxArr.is_xcx * 1 === 1) {
                    if (!this.site) {
                        this.site = "xcx";
                    } else {
                        this.site = "all";
                    }
                }

                this.xcx = data.xcxArr;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "@/pages/shop/static/css/video.scss";

    .shareContet {
        z-index: 1001;
    }

    .shareContet_box_top_operation_cnt, .sharePosters_box_guanbi {
        cursor: pointer;
    }
    .shareContet {
        .shareContet_box{
            .shareContet_box_top{
                .shareContet_box_top_operation{
                    .shareContet_box_top_operation_cnt:last-child{
                        margin: 0 .25rem;
                    }
                }

            }

        }
    }
</style>

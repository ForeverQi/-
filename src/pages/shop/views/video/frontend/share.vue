<template>
    <div class="shareContet" style="transform: translateY(0);">
        <div class="shareContet_box">
            <div class="shareContet_box_top">
                <div class="shareContet_box_top_title">
                    <span>分享</span>
                </div>
                <div class="shareContet_box_top_operation">
                    <div class="shareContet_box_top_operation_cnt" @click="Share(1)">
                        <img src="@/pages/shop/static/images/video/videoShateWeixin.png" alt="">
                        <div><span>分享好友</span></div>
                    </div>
                    <div class="shareContet_box_top_operation_cnt" @click="Share(0)">
                        <img src="@/pages/shop/static/images/video/pyq.png" alt="">
                        <div><span>分享朋友圈</span></div>
                    </div>
                    <div class="shareContet_box_top_operation_cnt" @click="Poster()">
                        <img src="@/pages/shop/static/images/video/videoSharePic.png" alt="">
                        <div><span>分享海报</span></div>
                    </div>
                    <div class="shareContet_box_top_operation_cnt" @click="$util.app.Shop.Share.copy({content: link})">
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
</template>

<script>
    import { videoDetailShare } from "@/api/shop/video.frontend"

    export default {
        data() {
            return {
                link: location.href,
                poserImg: '',
            }
        },
        props: ["data"],

        methods: {

            /**
             * 微信分享
             * @param val 0:朋友圈、1:好友
             * @constructor
             */
            Share(val) {
                this.$util.app.Shop.Share.wechat({
                    wtype: val,
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
                this.$util.variable.Set({
                    key: "ShopVideoBacShare",
                    val: false
                });
            },

            /**
             * 分享海报
             * @constructor
             */
            Poster() {
                this.$util.variable.Set({
                    key: "ShopVideoBacPoster",
                    val: true
                });
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
</style>

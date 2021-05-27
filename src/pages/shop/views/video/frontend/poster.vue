<template>
    <div class="sharePosters" v-if="poserImg">
        <div class="sharePosters_box">
            <div class="sharePosters_box_all">
                <div class="sharePosters_box_img" @click.stop>
                    <img :src="poserImg" alt="">
                </div>
                <div class="sharePosters_box_text" @click.stop>
                    <img src="@/pages/shop/static/images/video/postersImg.png" alt="">
                </div>

                <div class="sharePosters_box_guanbi" @click="Close">
                    <span>关闭</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { videoDetailShare } from "@/api/shop/video.frontend"

    export default {
        data() {
            return {
                poserImg: '',
            }
        },
        props: ["data"],

        created() {
            this.Poster()
        },

        methods: {
            /**
             * 关闭
             * @constructor
             */
            Close() {
                this.$util.variable.Set({
                    key: "ShopVideoBacPoster",
                    val: false
                });
            },

            /**
             * 分享海报
             * @constructor
             */
            Poster() {
                videoDetailShare({
                    username: this.$route.query.username,
                    id: this.data.item.id,
                }).then(res => {
                    if (!res.wap_img_src) {
                        this.$util.Hint.Msg({
                            message: '海报获取失败, 请稍后重试'
                        });
                    }

                    this.poserImg = res.wap_img_src;
                    this.$util.variable.Set({
                        key: "ShopVideoBacShare",
                        val: false
                    });
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "@/pages/shop/static/css/video.scss";

</style>

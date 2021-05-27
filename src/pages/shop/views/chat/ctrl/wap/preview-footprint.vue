<template>
    <div>
        <div class="alert_bg"></div>
        <div class="browse">
            <div class="browse_tit">
                <span>我的浏览</span>
                <a class="iconfont icon-cross" href="javascript:;" @click="hideHistory"></a>
            </div>
            <div class="browse_ul" v-show="$util.functions.Len(prolist)">
                <div>
                    <a class="browse_li" v-for="item in prolist" v-if="$util.functions.Len(item.proinfo)" @click="sendGoods(item)">
                        <span><img class="wait" :data-src="item.proinfo.propicpath" src="@/assets/images/chat/Expression_img2.png" alt=""></span>
                        <p>
                            <em>{{item.proinfo.proname}}</em>
                            <strong>&yen;<i>{{item.proinfo.prounitprice}}</i></strong>
                        </p>
                    </a>
                </div>
            </div>
            <div class="no_browse" v-if="!$util.functions.Len(prolist)">
                <span><img src="@/assets/images/chat/no_browse.png" alt=""></span>
                <p>还没有商品浏览记录哦~</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {footprint} from '@/api/shop/chat'
    import util from '@/libs/util'

    export default {
        name: "chat-ctrl-wap-text",
        props: ["data"],
        data() {
            return {
                Page: {
                    limit: 10,
                    // 页码
                    num: 0,
                    // 禁止翻页
                    disabled: false
                },
                prolist: []
            }
        },
        mounted() {
            let thisS = this;
            thisS.LoadMore();
            $(function () {
                let box = $('.browse_ul > div');
                $('.browse_ul').scroll(function () {
                    if (box.height() - $(this).scrollTop() <= box.height() / 2 && !thisS.Page.disabled) {
                        thisS.Page.disabled = true;
                        thisS.LoadMore();
                    }
                });
            });
        },
        methods: {
            /**
             * 显示隐藏浏览记录
             */
            hideHistory() {
                this.$store.dispatch("chat/SetshowHistoryBy");
            },

            sendGoods(item) {

            },

            /**
             * 获取浏览历史
             * @returns {boolean}
             * @constructor
             */
            LoadMore() {
                this.Page.num += 1;
                let params = util.chat.params();

                footprint({
                    user_id: params.user_id,
                    user_user_id: params.uid,
                    page: this.Page.num,
                    limit: this.Page.limit
                }).then(res => {
                    if (this.$util.functions.Len(res)) {
                        this.Page.disabled = false;
                        this.prolist = [...this.prolist, ...res];

                        setTimeout(function () {
                            $(".wait").each(function (index, value) {
                                let img = new Image;
                                img.src = $(this).data('src');
                                img.onload = () => {
                                    $(this).attr("src", img.src);
                                }
                            });
                        }, 500)
                    } else {
                        this.Page.disabled = true;
                    }
                });
            }
        }
    }
</script>

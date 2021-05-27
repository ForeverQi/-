<template>
    <div class="promote_box" v-wechat-title="$route.meta.title = poster.default.title">
        <div class="promote">
            <div class="promote_top">
                <img :src="poster.default.guidance || 'https://aimg8.oss-cn-shanghai.aliyuncs.com/site/poster/2.jpg'" alt="背景图"/>
            </div>
            <div class="promote_content">
                <div class="promote_content_top">
                    <p class="promote_content_top_title">{{ poster.default.title }}</p>
                    <p style="margin-bottom: 0.26rem;">{{ poster.default.brief }}</p>
                    <p class="promote_content_top_focus">
                        <span>关注度：{{ poster.user.attention_num }}</span>
                        <span>成交量：{{ poster.user.order_num }}</span>
                    </p>
                    <div class="promote_content_top_btn">
                        <button @click="visible.pop3 = true">
                            <div class="promote_content_top_btnContent" style="cursor: pointer;">
                                <img src="../../static/images/promote_person.png" alt="分享"/>
                                <span>推 荐</span>
                            </div>
                        </button>
                    </div>
                </div>
                <div class="promote_content_bottom">
                    <div class="promote_bottom_allData" style="position: relative;" contenteditable="true" v-html="poster.default.detail" />
                </div>
            </div>

            <div class="promote_bottom">
                <div class="promote_bottom_box">
                    <div class="promote_bottom_left">
                        <span>特惠抢购正在进行中...</span>
                    </div>
                    <div @click="visible.pop1 = true" class="promote_bottom_right" style="cursor: pointer;">
                        <span>联系我们</span>
                    </div>
                </div>
            </div>

            <div v-if="visible.pop3 || visible.pop1 || visible.pop2" @click="visible.pop3 = false, visible.pop1 = false, visible.pop2 = false" class="zhezhao" style="cursor: pointer;"></div>
            <div v-if="visible.pop1" class="consulting_box">
                <div class="consulting">
                    <div class="consulting_title">
                        <span>请给我们留言或直接下单，我们将24小时内与您联系</span>
                    </div>
                    <div class="consulting_form">
                        <input type="text" v-model="form.company" @blur="Blur" placeholder="公司名称" />
                        <input type="text" v-model="form.name" @blur="Blur" placeholder="联系人" />
                        <input type="text" v-model="form.mobile" @blur="Blur" placeholder="联系电话" />
                    </div>
                    <div class="consulting_submit">
                        <button @click="Submit">提交咨询</button>
                    </div>
                </div>
            </div>

            <div v-if="visible.pop2" class="consulting_box" style="display: none;">
                <div class="consulting">
                    <div class="consulting_title">
                        <span>请给我们留言或直接下单，我们将24小时内与您联系</span>
                    </div>
                    <div class="consulting_form2">
                        <div class="consulting_form2_top">
                            <input type="text" placeholder="公司名称">
                            <input type="text" placeholder="联系人">
                        </div>
                        <div class="consulting_form2_bottom">
                            <input type="text" placeholder="联系电话">
                        </div>
                    </div>
                    <!-- 提交咨询按钮 -->
                    <div class="consulting_submitBtn">
                        <button>提交咨询</button>
                    </div>
                    <div class="consulting_title consulting_title_bottom">
                        <span>在线特惠抢购有惊喜</span>
                        <div class="consulting_title_rightImg">
                            <img class="promote_nocheck" src="../../static/images/promote_nocheck.png" alt="" />
                            <img class="promote_check" src="../../static/images/promote_check.png" alt="" style="display: none;"/>
                        </div>
                    </div>
                    <!-- 服务年限 -->
                    <div class="lengthService">
                        <p style="margin-bottom:0.22rem;">服务年限</p>
                        <div class="lengthService_content">
                            <div class="lengthService_content_children">
                                <div class="lengthService_checkText" >
                                    <span>¥2999 买两年送一年</span>
                                </div>
                                <div>
                                    <span>¥2999 买两年送一年</span>
                                </div>
                                <div>
                                    <span>¥2999 买两年送一年</span>
                                </div>
                                <div>
                                    <span>¥2999 买两年送一年¥2999 买两年送一年</span>
                                </div>
                                <div style="width: 100%;">
                                    <span>¥2999 买两年送一年¥2999 买两年送一年</span>
                                </div>
                            </div>
                            <div class="lengthService_content_childrenLast"></div>
                        </div>
                    </div>

                </div>
                <!-- 支付按钮 -->
                <div class="consulting_pay">
                    <span style="margin-right: 0.33rem;">价格 2999元</span>
                    <span>立即支付</span>
                </div>
            </div>
        </div>

        <div v-if="visible.pop3" class="shareContet" style="transform: translateY(0);">
            <div class="shareContet_box">
                <div class="shareContet_box_top">
                    <div class="shareContet_box_top_title">
                        <span>分享</span>
                    </div>
                    <div class="shareContet_box_top_operation">
                        <div class="shareContet_box_top_operation_cnt" v-if="iswx" @click="Share(1)">
                            <img src="@/pages/shop/static/images/video/videoShateWeixin.png" alt="">
                            <div><span>推荐好友</span></div>
                        </div>
                        <div class="shareContet_box_top_operation_cnt" v-if="iswx" @click="Share(0)">
                            <img src="@/pages/shop/static/images/video/pyq.png" alt="">
                            <div><span>朋友圈</span></div>
                        </div>
                        <div class="shareContet_box_top_operation_cnt" @click="Share(2)">
                            <img src="@/pages/shop/static/images/video/videoSharePic.png" alt="">
                            <div><span>生成海报</span></div>
                        </div>
                        <div class="shareContet_box_top_operation_cnt" v-clipboard:copy="shareLink" v-clipboard:success="CopySuccess" v-clipboard:error="CopyError">
                            <img src="@/pages/shop/static/images/video/videoShareLink.png" alt="">
                            <div><span>复制链接</span></div>
                        </div>
                    </div>
                </div>
                <div class="shareContet_box_bottom" @click="visible.pop3 = false">
                    <span style="cursor: pointer;">取消</span>
                </div>
            </div>
        </div>

        <van-popup v-model="visible.pop4" style="width: 100%; background: rgba(0,0,0,0);">
            <div class="sharePosters2">
                <div class="sharePosters_box">
                    <div class="sharePosters_box_all">
                        <div class="sharePosters_box_allChild">
                            <div class="sharePosters_box_img">
                                <img :src="poster.path" alt="">
                            </div>
                            <div class="sharePosters_box_text">
                                <img src="@/pages/shop/static/images/video/postersImg.png" alt="长按保存"/>
                            </div>
                        </div>
                        <div class="sharePosters_box_guanbi" @click="visible.pop4 = false">
                            <span>关闭</span>
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>

        <van-overlay :show="visible.pop5" @click="visible.pop5 = false">
            <div class="wrapper" @click.stop>
                <van-loading size="24px" vertical>海报生成中...</van-loading>
            </div>
        </van-overlay>

        <div class="sahreFriends" v-if="visible.pop6" @click.stop="visible.pop6 = false">
            <div class="sahreFriends_box">
                <!-- 文字 -->
                <div class="sahreFriends_box_content">
                    <span>点击右上角,选择<span style="color:#FF8125">"发送给朋友"</span>将短视频分享给您的好友</span>
                </div>
                <!-- 指向分享的图片 -->
                <div class="sahreFriends_box_shareImg">
                    <!--<img src="@/pages/shop/static/images/video/videoJiantou.png" alt="">-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { SitePoster, SitePosterForm, posterShareRecord, CreatePoster } from '@/api/site/poster'
    import wx from "weixin-js-sdk";

    export default {
        data() {
            return {
                id: this.$route.params.id,
                agent_id: this.$route.params.agent_id,
                shareLink: location.href,
                poster: {
                    default: {
                        detail: `<img style="width: 100%;display: block;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);" src="https://aimg8.oss-cn-shanghai.aliyuncs.com/site/poster/1.jpg" alt="背景图"/>`
                    },
                    user: {
                        attention_num: 0,
                        order_num: 0,
                    },
                    path: ''
                },
                // 显示表单
                visible: {
                    pop1: false,
                    pop2: false,
                    pop3: false,
                    pop4: false,
                    pop5: false,
                    pop6: false,
                },
                form: {
                    company: '',
                    name: '',
                    mobile: '',
                },
                iswx: false
            }
        },

        destroyed() {
            $("body").removeClass("bgE9ECF2");
        },

        created() {
            if (!this.id || !this.agent_id) {
                return this.errPop();
            }

            $("body").addClass("bgE9ECF2");
            let params = {
                id: this.id,
                agent_id: this.agent_id,
                host: location.host,
                url: location.href,
            };

            this.iswx = this.$util.functions.IsWX();

            this.$util.variable.AxiosErrorPopup = false;
            SitePoster(params).then(data => {
                let thisS = this;
                this.poster = data;

                wx.config({
                    debug: false,
                    appId: data.wxshare.appId,
                    timestamp: data.wxshare.timestamp,
                    nonceStr: data.wxshare.nonceStr,
                    signature: data.wxshare.signature,
                    jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"]
                });

                wx.ready(function () {
                    const option = {
                        title: thisS.poster.default.title,
                        desc: thisS.poster.default.brief,
                        link: thisS.shareLink,
                        imgUrl: thisS.poster.default.guidance,
                        success: () => {
                            thisS.$hint.Alert({
                                message: "分享成功"
                            });
                        },
                        error: () => {
                            thisS.$hint.Alert({
                                message: "已取消分享"
                            });
                        }
                    };

                    thisS.$util.wechat.ShareAppMessage(option);
                    thisS.$util.wechat.ShareTimeline(option);
                });

                this.$util.variable.AxiosErrorPopup = false;
            }).catch(err => {
                this.errPop("海报信息不存在，或已被删除");
            });
        },

        methods: {
            /**
             * 错误提示
             * @param msg
             */
            errPop(msg) {
                this.$hint.Alert({
                    message: msg || "海报信息不存在"
                }).then(res => {
                    this.$router.push({path: '/404'});
                });
            },

            /**
             * 微信分享
             * @param val 0:朋友圈、1:好友
             * @constructor
             */
            Share(val) {
                this.SetShare();

                let thisS = this;

                if (val === 1) {
                    this.visible.pop6 = true;
                    this.visible.pop3 = false;
                } else if (val === 0) {
                    this.visible.pop6 = true;
                    this.visible.pop3 = false;
                } else {
                    this.visible.pop5 = true;

                    CreatePoster({
                        id: this.id,
                        agent_id: this.agent_id,
                        url: location.href,
                    }).then(data => {
                        this.poster.path = data;

                        this.visible.pop5 = false;
                        this.visible.pop3 = false;
                        this.visible.pop4 = true;
                    }).catch(err => {
                        this.visible.pop5 = false;
                        thisS.$hint.Msg({
                            message: "海报获取失败，请稍后重试"
                        });
                    });
                }
            },

            /**
             * 复制成功
             * @param e
             */
            CopySuccess: function (e) {
                this.$hint.Msg({message: "复制成功"})
            },

            /**
             * 复制失败
             * @param e
             * @constructor
             */
            CopyError: function (e) {
                this.$hint.Msg({message: "复制失败"})
            },

            /**
             * 创建表单
             * @constructor
             */
            Submit() {
                if (!this.form.company) {
                    return this.$hint.Msg({
                        message: "请填写公司名称！"
                    });
                }

                if (!this.form.name) {
                    return this.$hint.Msg({
                        message: "请填写联系人！"
                    });
                }

                if (!this.$util.pattern.mobile.test(this.form.mobile)) {
                    return this.$hint.Msg({
                        message: "请填写正确的手机号码！"
                    });
                }

                SitePosterForm({
                    ...this.form,
                    id: this.id,
                    agent_id: this.agent_id
                }).then(data => {
                    this.visible.pop1 = false;
                    this.visible.pop2 = false;
                    this.visible.pop3 = false;
                    this.$hint.Msg({message: "提交成功！"})
                });
            },

            /**
             * 设置分享记录
             * @constructor
             */
            SetShare() {
                posterShareRecord({
                    id: this.id,
                    agent_id: this.agent_id,
                    host: location.host,
                });
            },

            /**
             * 失焦初始化
             * @param event
             * @constructor
             */
            Blur(event) {
                $("body").scroll();
                $(window).scroll();
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../shop/static/css/video.scss";
    @import url("../../static/css/poster.css");

    .shareContet {
        z-index: 1001;
    }

    .shareContet_box_bottom, .shareContet_box_top_operation_cnt, .sharePosters_box_guanbi {
        cursor: pointer;
    }
</style>


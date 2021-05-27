<template>
    <div box class="box">
        <div class="wrapper">
            <div class="wrapper_c">
                <div class="bg_div"><p></p></div>
                <div class="public_div">
                    <div class="Head_Top">
                        <a href="javascript:;" class="Head_Return iconfont icon-jiantou2"></a>
                        <span>聊天会话</span>
                        <a href="javascript:;" class="go_shop">进店</a>
                    </div>
                    <div class="Max_session" id="content">
                        <div v-for="item in $util.chat.HistoryDateMerge(list, userinfo)">
                            <MsgCtrl :item="item" :userinfo="userinfo" />
                        </div>

                        <Goods v-if="proid" :data="{proid}" />
                        <!--<span class="session_time session_time1"><i>会话已结束</i></span>-->
                    </div>
                </div>
                <div class="Dialogue_Footer" chat-form>
                    <div class="I_think">
                        <span>我想：</span>
                        <a href="javascript:;">结束会话</a>
                        <a href="javascript:;">会话转接</a>
                    </div>
                    <div class="Send_out">
                        <a href="javascript:;" class="iconfont icon-smiling" @click="emoji = !emoji"></a>
                        <a href="javascript:;" class="iconfont icon-jiahao" @click="show.chatType = !show.chatType"></a>
                        <div class="Send_out_c">
                            <div
                                class="Send_input placeholder"
                                contenteditable="true"
                                @keyup.enter="SendMsg($event)"
                                id="textarea"
                            ></div>
                        </div>
                    </div>

                    <VEmojiPicker v-if="emoji" @select="selectEmoji" />
                    <ChatType v-if="show.chatType" :data="{after: AppendToTextarea, show}" />
                </div>
            </div>
        </div>
        <PreviewFootprint v-if="$store.getters.chat.showHistory" :data="{}" />
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import util from '@/libs/util'
    import Hint from '@/plugins/hint'
    import {history} from '@/api/shop/chat'
    import VEmojiPicker from 'v-emoji-picker';

    export default {
        name: "ChatDetail",
        computed: {
            ...mapGetters([
                'chat'
            ])
        },
        components: {
            // 当前浏览的商品
            Goods: () => import("./ctrl/wap/goods"),
            // 记录
            MsgCtrl: () => import("./ctrl/wap/msg"),
            // 浏览足迹
            PreviewFootprint: () => import("./ctrl/wap/preview-footprint"),
            // 浏览足迹
            ChatType: () => import("./ctrl/wap/chat-type"),
            // 表情
            VEmojiPicker
        },
        data() {
            return {
                // 当前浏览的商品
                proid: this.$route.query.proid,
                // 显示表情
                emoji: false,
                show: {
                    chatType: false,
                    previewFootprint: false
                },
                // 消息记录列表
                list: [],

                // 客户信息
                customer: {
                    id: this.$route.query.id,
                    type: this.$route.query.type,
                },
                userinfo: {
                    customer: {},
                    server: {},
                },
                // 翻页
                Page: {
                    // 页码
                    num: 0,
                    // 禁止翻页
                    disabled: true,
                    init: true,
                    // offset date
                    tables: {},
                    // 滚动加载标识
                    scrollAppend: false
                }
            }
        },
        mounted() {
            let thisS = this;
            $(function () {
                // 检测页面内容变化
                $("body").on("DOMNodeInserted", '.box', function () {
                    setTimeout(function () {
                        thisS.ScrollInit();
                    })
                });

                $(window).scroll(function () {
                    if ($(this).scrollTop() <= 10 && !thisS.Page.disabled) {
                        thisS.ChatHistory({loadmore: true, scrollAppend: true});
                    }
                });
            });
        },
        created() {
            let thisS = this;
            thisS.$util.chat.init({}, this);

            thisS.$store.dispatch(
                "chat/SetResponseMethods",
                [{
                    // 身份标识
                    method: "client-clientConnection",
                    callback(res) {
                        // 请求分配客服
                        if (res.code == 200) {
                            util.chat.issue();

                            thisS.$store.dispatch("chat/SetUserInfo", res.data.userinfo);
                        } else {
                            return Hint.Alert({
                                title: '提示',
                                message: res.msg || '系统错误'
                            }).then(() => {
                                location.reload();
                            });
                        }
                    }
                }, {
                    // 客服分配
                    method: "issue-action",
                    callback(res) {
                        if (res.code == 200) {
                            thisS.$store.dispatch("chat/SetIssueInterval", {
                                clear: true
                            });

                            Hint.Msg({
                                message: '客服接入成功'
                            });

                            thisS.list.push({
                                content: res.msg,
                                type: "server",
                                date: util.functions.FormatDate(new Date, 'yyyy-MM-dd hh:mm:ss'),
                                userinfo: res.data.sender,
                                msg_type: 99
                            });

                            // 设置客服
                            thisS.$store.dispatch("chat/SetServerBy", {
                                ...res.data.server,
                                callback() {
                                    // 消息历史记录
                                    thisS.ChatHistory();
                                }
                            });

                            // 设置心跳
                            thisS.$store.dispatch("chat/SetHeatBeatBy");
                        } else {
                            return Hint.Alert({
                                title: '提示',
                                message: res.msg || '系统错误'
                            }).then(() => {
                                // 客服分配错误
                                util.chat.issue();
                            }).catch(() => {
                                alert(1)
                            });
                        }
                    }
                }, {
                    // 无客服在线
                    method: "issue-server-offline",
                    callback(res) {
                        if (res.code != 200) {
                            return Hint.Confirm({
                                title: '提示',
                                message: '当前无客服在线，确定尝试重新寻找连接'
                            }).then(() => {
                                // 客服分配错误
                                util.chat.issue();
                            });
                        }
                    }
                }, {
                    // 无客服离线
                    method: "server-offline",
                    callback(res) {
                        thisS.list.push({
                            content: res.msg,
                            type: "server",
                            date: util.functions.FormatDate(new Date, 'yyyy-MM-dd hh:mm:ss'),
                            userinfo: res.data.sender,
                            msg_type: 100
                        });

                        util.chat.issue();
                    }
                }, {
                    // 心跳 获取当前连接记录数据  测试使用
                    method: "heart-beat",
                    callback(res) {
                        // console.log(res)
                    }
                }, {
                    // 接收消息 文本消息
                    method: "text-msg",
                    callback(res) {
                        if (res.code != 200) {
                            console.log(res.msg)
                            return Hint.Msg({message: res.msg});
                        }
                    }
                }, {
                    // 商品消息发送反馈
                    method: "goods-msg",
                    callback(res) {
                        if (res.code != 200) {
                            return Hint.Msg({message: res.msg});
                        }
                    }
                }, {
                    // 文本消息
                    method: "text",
                    callback(res) {
                        thisS.list.push({
                            content: res.data.content,
                            type: "server",
                            date: util.functions.FormatDate(new Date, 'yyyy-MM-dd hh:mm:ss'),
                            userinfo: res.data.sender,
                            msg_type: 0
                        });

                        thisS.ScrollInit();
                    }
                }]
            );
        },
        methods: {
            /**
             * 表情
             * @param emoji
             * @constructor
             */
            selectEmoji(emoji) {
                console.log(emoji.data)
                this.emoji = false;
                let ele = $("#textarea");
                // 插入表情
                ele.focus().html(
                    ele.html() + emoji.data
                );
            },

            /**
             * 初始化滚动
             * @constructor
             */
            ScrollInit() {
                let ctrlHeight = $("[chat-form]").height();
                $("#content").css({
                    "padding-bottom": ctrlHeight + "px"
                });

                if (!this.scrollAppend) {
                    $(window).scrollTop($("#content").height() + ctrlHeight);
                }
            },

            /**
             * 发送消息
             * @param event
             * @constructor
             */
            SendMsg(event) {

                if (!this.$store.getters.chat.server.uid) {
                    return Hint.Confirm({
                        title: '提示',
                        message: '当前无客服在线，确定尝试重新寻找连接111'
                    }).then(() => {
                        // 客服分配错误
                        util.chat.issue();
                    });
                }

                let content = event.target.innerHTML;
                event.target.innerHTML = '';
                event.target.blur();

                // send
                util.chat.send({
                    // 除此建立连接
                    method: 'text',
                    data: {
                        content: content
                    }
                });
                // append
                this.list.push({
                    content: content,
                    type: "server",
                    date: util.functions.FormatDate(new Date, 'yyyy-MM-dd hh:mm:ss'),
                    userinfo: this.$store.getters.chat.userinfo,
                    msg_type: util.chat.MsgType(content)
                });
            },

            /**
             * 消息记录
             * @param data
             * @returns {boolean}
             * @constructor
             */
            ChatHistory(data = {loadmore: false}) {
                let thisS = this;
                // 阻止继续加载
                if (thisS.Page.disabled && !thisS.Page.init) {
                    return false;
                }
                thisS.Page.disabled = true;

                if (!data.loadmore) {
                    thisS.Page.num = 1;
                } else {
                    thisS.Page.num += 1;
                }

                if (data.scrollAppend) {
                    // 查看历史记录时候 阻止滚动到底部
                    thisS.scrollAppend = true;
                }

                let params = util.chat.params();

                params.fid = params.receiver_uid;
                params.ftype = params.receiver_user_type;
                delete params.fid;
                delete params.ftype;

                history({
                    page: thisS.Page.num,
                    ...params,
                    limit: 7,
                    ...thisS.Page.tables
                }).then((res) => {
                    thisS.userinfo.server = res.server;
                    thisS.userinfo.customer = res.customer;

                    if (!thisS.$util.functions.Len(res.list) || res.islast * 1 === 1) {
                        thisS.Page.disabled = true;
                    } else {
                        thisS.list = [...res.list, ...thisS.list];
                        thisS.Page.disabled = false;
                    }

                    if (!data.loadmore) {
                        // 到页面底部
                        setTimeout(function () {
                            $(window).scrollTop($("#content").height());
                        }, 1000)
                    }

                    for (let i in res.tables) {
                        thisS.Page.tables = {
                            "prev-timestamp": i,
                            offset: res.tables[i]
                        };
                        break;
                    }

                    setTimeout(function () {
                        // 初始化
                        thisS.scrollAppend = false;
                        thisS.Page.init = false;
                    }, 500)
                });
            },

            /**
             * 其他内容
             * @param params
             * @constructor
             */
            AppendToTextarea(params = {}) {
                let ele = $("#textarea");
                // 插入图片
                if (params.msg_type == 2) {
                    ele.focus().html(
                        ele.html() + `<img style="max-width: 100%;" src="${params.data}" alt="">`
                    );
                }
            }
        }
    }
</script>

<style lang="scss">
    @import url("../../../../assets/fonts/chat/font_css/iconfont.css");
    @import url("../../../../assets/css/chat/css.css");
</style>

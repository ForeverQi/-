<template>
    <div>
        <span class="session_time" v-if="item.timer"><i>{{item.timer}}</i></span>
        <span v-if="item.msg_type == 100" class="session_time"><i>客服已离线</i></span>
        <span v-else-if="item.msg_type == 99" class="session_time"><i>客服接入成功</i></span>
        <span v-else-if="item.msg_type == 4"></span>
        <div v-else :class="item.type == 'customer' ? 'session_li' : 'session_li1'">
            <span class="session_li_img"><img :src="item.head" alt=""></span>
            <div class="session_li_R">
                <div class="multiple" v-html="$util.chat.MessageFilter(item.content || '')"></div>

                <!--<div v-if="item.msg_type == 2" class="multiple">
                    <p>苏明玉，你妈喊你回家吃饭！</p>
                    <span><img src="@/assets/images/chat/img.jpg" alt=""></span>
                </div>

                <div v-else class="multiple">
                    <p v-html="$util.chat.MessageFilter(item.content || '')"></p>
                </div>-->

                <!--<em>留言消息</em>-->
            </div>
        </div>
    </div>
</template>

<script>
    // 纯文本
    export default {
        name: "chat-ctrl-wap-text",
        props: ["item", "userinfo"]
    }
</script>

<style scoped>
    .session_li1 .session_li_R .multiple {
        color: #FFF;
        font-size: 0.3rem;
    }
    .session_li .session_li_R .multiple {
        color: #333;
        font-size: 0.3rem;
    }
    .session_li1 .session_li_R .multiple > p, .session_li1 .session_li_R .multiple > span,
    .session_li .session_li_R .multiple > p, .session_li .session_li_R .multiple > span
    {
        padding: 0rem 0.05rem 0rem 0.2rem;
    }
</style>

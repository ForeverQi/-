<template>
    <div class="Album">
        <form id="form">
            <a href="javascript:;">
                <input type="hidden" name="file-size" value="20">
                <input type="hidden" name="name" value="fff">
                <input type="file" name="fff" @change="upload">
                <span><img src="@/assets/images/chat/Album_img1.png" alt=""></span>
                <em>相册</em>
            </a>
        </form>
        <a href="javascript:;" @click="history">
            <span><img src="@/assets/images/chat/Album_img2.png" alt=""></span>
            <em>浏览</em>
        </a>
        <!--<a href="javascript:;">
            <span><img src="@/assets/images/chat/Album_img3.png" alt=""></span>
            <em>留言</em>
        </a>-->
    </div>
</template>

<script>
    import {fileUpload} from '@/api/shop/chat'

    export default {
        name: "chat-ctrl-wap-text",
        props: ["data"],
        methods: {
            upload() {
                let thisS = this;
                fileUpload(new FormData($("#form")[0])).then((res) => {
                    thisS.data.after && "function" === typeof thisS.data.after && thisS.data.after({
                        msg_type: 2,
                        data: res.path
                    })
                });
            },

            /**
             * 显示隐藏浏览记录
             */
            history() {
                this.$store.dispatch("chat/SetshowHistoryBy");
            }
        }
    }
</script>

<style lang="scss" scoped>
    .Album a span {
        display: block;
    }

    #form > a {
        position: relative;
    }

    input[type=file] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0;
    }
</style>

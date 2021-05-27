<template>
    <div class="wrapper">
        <div class="wrapper_c">
            <div class="bg_div"><p></p></div>
            <div class="public_div">
                <div class="Head_Top">
                    <a href="javascript:;" class="Head_Return iconfont  icon-jiantou">
                    </a>
                    <span>留言</span>
                </div>
                <div class="Leaving">
                    <textarea placeholder="请输入留言内容，限500字内"></textarea>
                </div>
                <div class="Leaving_c">
                    <div class="Leaving_img">
                        <span></span>
                        <a class="iconfont icon-guanbi" href="javascript:;"></a>
                    </div>
                    <div class="Leaving_img">
                        <span></span>
                        <a class="iconfont icon-guanbi" href="javascript:;"></a>
                    </div>
                    <div class="Leaving_img">
                        <span></span>
                        <a class="iconfont icon-guanbi" href="javascript:;"></a>
                    </div>
                    <div class="Leaving_img">
                        <span></span>
                        <a class="iconfont icon-guanbi" href="javascript:;"></a>
                    </div>
                    <div class="Leaving_img">
                        <span></span>
                        <a class="iconfont icon-guanbi" href="javascript:;"></a>
                    </div>
                    <div class="Leaving_img">
                        <span></span>
                        <a class="iconfont icon-guanbi" href="javascript:;"></a>
                    </div>
                    <p><i class="iconfont icon-jiahao"></i></p>
                </div>
                <a href="javascript:;" class="but_Leaving">提交留言</a>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: "ChatDetail",
        data(){},
        methods:{

        },
        created(){
            (function (x, min, max) {
                min = min || 320;
                var docEl = document.documentElement,
                    clientWidth = null,
                    countFun = function () {
                        clientWidth = Math.max(docEl.clientWidth, min);
                        clientWidth = max ? Math.min(clientWidth, max) : clientWidth;
                        if (clientWidth) {
                            docEl.style.fontSize = 100 * (clientWidth / x) + 'px';
                        }
                    };
                window.addEventListener('resize', countFun, false);
                countFun();
            })(750, 320, 750);
        }

    }
</script>

<style scoped>
    @import url("../../../../assets/fonts/chat/font_css/iconfont.css");
    @import url("../../../../assets/css/chat/css.css");
</style>

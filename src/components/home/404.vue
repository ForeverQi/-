<template>
    <div class="contents">
        <div class="contents_box">
            <div class="img">
                <img src="http://aimg8.dlszyht.net.cn/nopage/wap_404_bg.png" alt/>
            </div>
            <p>404错误！您访问的页面没找到！</p>
            <div class="btn">
                <a href="/">
                    <i>
                        <img src="http://aimg8.dlszyht.net.cn/nopage/wap_back_icon.png" alt/>
                    </i>
                    <b>回到首页</b>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    .contents {
        position: fixed;
        width: 100%;
        height: 100%;
    }

    .contents_box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .contents_box p {
        color: #999999;
        font-size: 0.24rem;
        line-height: 1;
        text-align: center;
        margin-bottom: 0.8rem;
    }

    .img {
        margin-bottom: 0.5rem;
    }

    .img img {
        width: 100%;
    }

    .btn a {
        display: inline-block;
        width: 1.8rem;
        height: 0.55rem;
        text-align: center;
        font-size: 0.22rem;
        border: 1px solid #cccccc;
        border-radius: 0.25rem;
        text-decoration: none;
        line-height: 0.5rem;
    }

    .btn a i {
        display: inline-block;
        width: 0.22rem;
        width: 0.24rem;
        vertical-align: middle;
        margin-right: 0.14rem;
    }

    .btn a i img {
        width: 100%;
        height: 100%;
    }
</style>

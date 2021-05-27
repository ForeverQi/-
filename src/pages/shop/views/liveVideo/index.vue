<template>
    <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeInLeftBig"
        leave-active-class="animated fadeOutLeftBig"
    >
        <div class="page-layout list-page">

            <!-- 页面头部 -->
            <div class="page-title">
                <span class="back-btn" @click="$util.functions.GoBack('', $route)"></span>
                <h5>我的直播</h5>
            </div>

            <!-- 页面内容 -->
            <div class="page-body">

                <div class="radius-box anchor-show" @click="goEditAnchor">
                    <div class="portrait">
                        <img src="" alt="">
                    </div>
                    <div class="attribute">
                        <h5>玛奇朵拉朵</h5>
                        <p>粉丝：20万</p>
                    </div>
                    <div class="go-edit">编辑</div>
                </div>

                <div class="radius-box live-list-wrap">
                    <div class="tab-head">
                        <span class="active">待直播</span>
                        <span>已结束</span>
                    </div>
                    <div class="live-list-box">
                        <ul>
                            <template v-for="i in 4">
                            <li class="list-item live-list-item">
                                <div class="img-box">
                                    <img src="https://aimg8.dlszyht.net.cn/public/src/upload/929460/Shop/files/jpg/5e1d9f9fd19ea.jpg" />
                                </div>
                                <dl class="attr-box">
                                    <dt><span>如何高效管理团队？明确大家 都认同的目标</span></dt>
                                    <dd>
                                        <p class="gray-text">2019-11-11 12:00 开播</p>
                                        <button class="btn">继续直播</button>
                                    </dd>
                                </dl>
                            </li>
                            <li class="list-item live-list-item">
                                <div class="img-box">
                                    <span class="view-text">999</span>
                                    <img src="https://aimg8.dlszyht.net.cn/public/src/upload/929460/Shop/files/jpg/5e1d9f9fd19ea.jpg" />
                                </div>
                                <dl class="attr-box">
                                    <dt><span>如何高效管理团队？明确大家 都认同的目标</span></dt>
                                    <dd>
                                        <p class="red-text">2019-11-11 12:00 开播</p>
                                        <button class="btn">立即开播</button>
                                    </dd>
                                </dl>
                            </li>
                            <li class="list-item live-list-item">
                                <div class="img-box">
                                    <span class="end-text">回复已经结束</span>
                                    <img src="https://aimg8.dlszyht.net.cn/public/src/upload/929460/Shop/files/jpg/5e1d9f9fd19ea.jpg" />
                                </div>
                                <dl class="attr-box">
                                    <dt><span>如何高效管理团队？明确大家 都认同的目标</span></dt>
                                    <dd>
                                        <p class="red-text">2019-11-11 12:00 开播</p>
                                        <button class="btn">查看详情</button>
                                    </dd>
                                </dl>
                            </li>
                            </template>
                        </ul>
                    </div>
                </div>



            </div>

        </div>
    </transition>
</template>

<script>
    export default {
        name: 'liveVideo',
        data(){
            return {

            }
        },
        methods:{
            goEditAnchor(){
                this.$router.push({
                    'path': '/shop/bac/liveVideo/editAnchor'
                })
            }
        }
    }
</script>

<style lang="scss">
@import "./css/public";
.list-page{
    background-color: #F5F2F5;
    .anchor-show{
        border-radius: 0 0 .26rem .26rem;
        margin-bottom: .1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .portrait{
            width: 1rem;
            height: 1rem;
            border-radius: .5rem;
            background-color:#A29FA3;
            margin: .4rem .3rem;
        }
        .attribute{
            flex-grow: 1;
            h5{
                margin: 0;
                font-size: .34rem;
                color: #222;
            }
            p{
                font-size: .24rem;
                color: #666;
            }
        }
        .go-edit{
            margin-right: .3rem;
            font-size: .24rem;
            color:#888;
            &::after{
                content:'';
                width: .15rem;
                height: .15rem;
                overflow: hidden;
                display: inline-block;
                border-width: 1px 1px 0 0;
                border-color: #CCCCCC #CCCCCC transparent transparent;
                border-style: solid solid dashed dashed;
                transform: rotate(45deg);
            }

        }
    }
    .live-list-wrap{
        .tab-head{
            padding: .35rem 0 .3rem;
            display: flex;
            justify-content: center;
            span{
                font-size: .26rem;
                color: #000;
                position: relative;
                z-index: 1;
                height: .6rem;
                line-height: .6rem;
                margin: 0 .5rem;
                padding: 0 .05rem;
                &.active{
                    font-size: .36rem;
                    &::after{
                        content: '';
                        background-image: linear-gradient(to right, #3DCDFD, #3090FF);
                        position: absolute;
                        z-index: -1;
                        left: 0;
                        right: 0;
                        bottom: .1rem;
                        height: .15rem;
                        border-radius: .15rem;

                    }
                }
            }
        }
        .live-list-box{
            ul{
                padding-bottom: 1px;
            }
        }
        .list-item {
            display: flex;
            dl,
            dt,
            dd,
            li,
            ul {
                margin: 0;
            }
            .img-box {
                flex-shrink: 0;
                border-radius: .06rem;
                margin-right: .24rem;
                overflow: hidden;
                text-align: center;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .attr-box {
                flex-grow: 1;
                overflow: hidden;
            }
            dl{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            dt {
                span {
                    font-size: .26rem;
                    color: #031332;
                    line-height: 1.3;
                    white-space: normal;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    display: -webkit-box;
                }
            }
            dd {
                padding: .1rem 0 0;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                p{
                    font-size: .22rem;
                    &.gray-text{
                        color: #7C8290;
                    }
                    &.red-text{
                        color: #FF5656;
                    }
                }
                .btn{
                    width: 1.81rem;
                    height: .6rem;
                    font-size: .26rem;
                    color:#fff;
                    border-radius: .3rem;
                    background-color: #007AFF;
                    border: none;
                }
            }
        }
        .live-list-item {
            margin-bottom: .3rem;
            .img-box {
                width: 3rem;
                height: 2rem;
                background-color: rgba(217, 217, 217, 1);
                margin: 0 .3rem .3rem;
                position: relative;
                .end-text,
                .view-text{
                    position: absolute;
                    color:#fff;
                    font-size: .22rem;
                }
                .end-text{
                    background-color: #21CC80;
                    height: .34rem;
                    border-radius: 0 0 .34rem 0;
                    padding: 0 .2rem;
                }
                .view-text{
                    padding: .1rem;
                    &::before{
                        content: '';
                        display: inline-block;
                        width: .27rem;
                        height: .17rem;
                        background:url('images/view-icon.png') no-repeat center center;
                        background-size: 100% 100%;
                        margin-right: .1rem;
                    }
                }
            }
            dl{
                border-bottom: 1px solid #EDEDED;
                padding: 0 .3rem .3rem 0;
            }
            li {
                font-size: .24rem;
                line-height: 1.5;
                display: flex;
                flex-wrap: nowrap;
                i {
                    vertical-align: middle;
                    width: .3rem;
                    height: .3rem;
                    background-size: 100% 100%;
                    flex-shrink: 0;
                }
                span{
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}
</style>

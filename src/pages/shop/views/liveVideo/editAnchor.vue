<!--
 * @Author       : qwguo
 * @description  : description
 * @Date         : 2020-02-16 17:30:48
 * @LastEditors  : qwguo
 * @LastEditTime : 2020-02-16 17:30:49
 * @FilePath     : \ev-frontend-test\src\pages\shop\views\liveVideo\editAnchor.vue
 -->
<template>
<transition name="custom-classes-transition" enter-active-class="animated fadeInLeftBig" leave-active-class="animated fadeOutLeftBig">
    <div class="page-layout edit-anchor-page">

        <!-- 页面头部 -->
        <div class="page-title">
            <span class="back-btn" @click="$util.functions.GoBack('', $route)"></span>
            <h5>主播信息</h5>
        </div>

        <!-- 页面内容 -->
        <div class="page-body">
            <div class="radius-box portrait-box">
                <b>头像</b>
                <span class="img-box"><img src="" alt=""></span>
            </div>
            <div class="radius-box anchor-attr">
                <ul>
                    <li class="edit-item">
                        <span class="edit-item-name">直播昵称</span>
                        <div class="edit-item-con"><input type="text" placeholder="请输入昵称 最多可设置8个汉字" /></div>
                    </li>
                    <li class="edit-item">
                        <span class="edit-item-name">介绍</span>
                        <div class="edit-item-con"><textarea placeholder="请输入简介 最多可设置30个汉字"></textarea></div>
                    </li>
                </ul>
            </div>

        </div>

    </div>
</transition>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "./css/public";
.edit-anchor-page{
    .portrait-box {
        border-radius: 0 0 .26rem .26rem;
        margin-bottom: .1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        b{
            margin: 0 .3rem;
            font-weight: 400;
        }
        .img-box {
            width: .6rem;
            height: .6rem;
            border-radius: .3rem;
            margin: .3rem .7rem .3rem .3rem;
            background-color: #A1A1A1;
            position: relative;
            &::after{
                content:'';
                position: absolute;
                right: -.33rem;
                top: 50%;
                margin: -.1rem 0 0;
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
    .anchor-attr{
        .edit-item{
            display: flex;
            margin-left: .2rem;
            border-bottom: 1px solid rgba(237, 237, 237, 1);
            padding: .2rem 0;
            flex-wrap: nowrap;
        }
        .edit-item-name{
            padding-right: .5rem;
            font-weight: 400;
            width: 2rem;
            color:rgba(34, 34, 34, 1);
            font-size: .28rem;
            margin-top: .1rem;
            line-height:1.3;
            text-align: right;
            flex-shrink: 0;
            i{
                font-size: .24rem;
                color: #999999;
                text-align: left;
                width: 100%;
                display: inline-block;
                margin-left: .3em;

            }
        }
        .edit-item-con{
            overflow: hidden;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-grow: 1;
            input,textarea{
                height: 100%;
                width: 100%;
                border: none;
                font-size: .24rem;
                color:#222;
            }
            textarea{
                height: 1.6rem;
                padding: .1rem 0;
            }
            .input-text-box{
                flex-grow: 1;
                overflow: hidden;
                margin-right: .2rem;
                .text-box{
                    display: inline-block;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    padding-top: .18rem;
                    font-size: .24rem;
                    color:#222;
                }
            }
            .img-box{
                width: 1.5rem;
                height: 1.5rem;
                margin: .1rem 0;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                position: relative;
                border: 1px solid rgba(219, 219, 219, 1);
                vertical-align: top;

                i{
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    color:#fff;
                    right: -.1rem;
                    top: -.1rem;
                    border-radius: 6px;
                    background-color: #c00;
                    transform: rotate(-45deg);
                    &::after,&::before{
                        position: absolute;
                        background-color:#fff;
                        content: '';
                    }
                    &::after{
                        width: 8px;
                        height: 2px;
                        left: 2px;
                        top: 5px;
                    }
                    &::before{
                        width: 2px;
                        height: 8px;
                        left: 5px;
                        top: 2px;
                    }
                }
                img{
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .up-box{
                width: 1.5rem;
                height: 1.5rem;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                border: 1px dashed rgba(219, 219, 219, 1);
                background-color: #fff;
                position: relative;
                margin-right: .1rem;
                vertical-align: top;
                .plus-icon{
                    width: .58rem;
                    height: .58rem;
                    display: inline-block;
                    position: relative;
                    &::before,&::after{
                        content: '';
                        position: absolute;
                        background-color:#CCCCCC;
                        border-radius: 1px;
                    }
                    &::before{
                        width: 100%;
                        height: 2px;
                        left: 0;
                        top: 50%;
                        transform: translateY(-1px);
                    }
                    &::after{
                        height: 100%;
                        width: 2px;
                        top: 0;
                        left: 50%;
                        transform: translateX(-1px);
                    }
                }
                input[type="file"]{
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    opacity: 0;
                }
                .loading-icon{
                    position: absolute;
                    display: flex;
                    background-color: rgba(255, 255, 255, .3);
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }
            }
            .tip-text{
                font-size: .24rem;
                color: rgba(169, 169, 169, 1);
                vertical-align: top;
                align-self: flex-start;
            }

        }
        .edit-item-icon{
            margin-right: .4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            flex-shrink: 0;
            position: relative;
        }
    }
}
</style>

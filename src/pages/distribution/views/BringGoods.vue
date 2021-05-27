<!--
 * @Author: fengting
 * @Date: 2020-11-09 15:32:57
 * @LastEditTime: 2020-11-30 18:20:50
 * @LastEditors: Please set LastEditors
 * @Description: 分销带货
 * @FilePath: \vue_test_qian\src\pages\distribution\views\BringGoods.vue
-->
<template>
    <!-- BringGoods-center -->
    <div class="BringGoods-home">
        <section class="wrapper-c">
            <div class="bg-div">
                <p></p>
            </div>
            <article class="max-center"> 
                <div class="BringGoods-content">
                    <div class="BringGoods-select">
                        <div class="BringGoods-link"><van-icon name="arrow-left" color="#FFFFFF" /></div>
                        <div class="BringGoods-r"><van-search shape="round" v-model="value" placeholder="请输入商品名称" background=" #FC273C" /></div>
                    </div>
                    <div class="BringGoods-head">
                        <div class="BringGoods-bg"></div>
                        <div class="BringGoods-head-cen">
                            <div class="Small-shop">
                                <span><img src="../assets/images/superiorImg.png"></span>
                                <p>某人的小店</p>
                                <div class="Small-share" @click="ClickShare">
                                    <em><img src="../assets/images/share-icon.png"></em>
                                    <strong>分享</strong>
                                </div>
                            </div>
                            <ul class="Small-tab">
                                <li class="cur">
                                    <p>精选</p>
                                </li>
                                <li>
                                    <p>热销</p>
                                </li>
                                <li>
                                    <p>上新</p>
                                </li>
                                <li>
                                    <p>价格</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="BringGoods-ul-list">
                        <div class="BringGoods-ul-l">
                            <div class="BringGoods-li">
                                <span class="BringGoods-li-img"><img src="../assets/images/Bring-img1.png"></span>
                                <p class="BringGoods-li-tit">Redmi 8A 5000mAh大电量 大字体大音量大内存</p>
                                <div class="BringGoods-mony">
                                    <div class="BringGoods-mony-float">
                                        <em>¥</em>
                                        <strong>699.00</strong>
                                    </div>
                                    <div class="BringGoods-mony-float">
                                        <i>¥599.00</i>
                                        <p><img src="../assets/images/tag-img1.png" alt="" srcset=""></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="BringGoods-ul-r">
                            <div class="BringGoods-li">
                                <span class="BringGoods-li-img"><img src="../assets/images/Bring-img1.png"></span>
                                <p class="BringGoods-li-tit">Redmi 8A 5000mAh大电量 大字体大音量大内存</p>
                                <div class="BringGoods-mony">
                                    <div class="BringGoods-mony-float">
                                        <em>¥</em>
                                        <strong>699.00</strong>
                                    </div>
                                    <div class="BringGoods-mony-float">
                                        <i>¥599.00</i>
                                        <p><img src="../assets/images/tag-img1.png" alt="" srcset=""></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="float-but">
                    <p>管理选品</p>
                </div>
                <!-- 空数据开始 -->
                <!-- <div class="no-data">
                    <van-empty description="您还没有带货的商品" :image="require('../assets/images/no-data.png')">
                        <van-button round type="danger" class="bottom-button">
                            去添加
                        </van-button>
                    </van-empty>
                </div> -->
                <!-- 空数据结束 -->
                <!-- 分享弹窗开始 -->
                <div class="Share-img" v-if="show">图片位置</div>
                <van-action-sheet v-model="show" cancel-text="关闭" close-on-click-action>
                    <div class="content Share-con">
                        
                        <strong>保存图片到手机发送给您的好友</strong>
                        <div class="Share-ul">
                            <div class="Share-li">
                                <span><img src="../assets/images/share-img1.png" ></span>
                                <p>分享给好友</p>
                            </div>
                            <div class="Share-li">
                                <span><img src="../assets/images/share-img2.png" ></span>
                                <p>保存图片</p>
                            </div>
                        </div>
                    </div>
                </van-action-sheet>

                <!-- 分享弹窗结束 -->
            </article>
        </section>
    </div>
</template>
<script>
import publicHead from '@/components/distribution/publicHead';
import Vue from 'vue';

export default {
    components: {
        'slot-publicHead': publicHead
    },
    data() {
        return {
            linkreturn:'index',//头部跳转链接
            value:'',
            show: false,
        };
    },
    methods: {
        /**
         * @Date: 2020-11-06 16:01
         * @LastEditors: fengting
         * @description: 
         */
        ClickShare(){
            this.show = true;
        }
    }
};
</script>
<style lang="scss">
    @import "@/pages/distribution/assets/css/distribution.scss";
</style>


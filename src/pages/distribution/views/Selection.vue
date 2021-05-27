<!--
 * @Author: fengting
 * @Date: 2020-11-09 15:33:10
 * @LastEditTime: 2020-11-11 14:14:13
 * @LastEditors: Please set LastEditors
 * @Description: 带货
 * @FilePath: \vue_test_qian\src\pages\distribution\views\Selection.vue
-->
<template>
    <!-- Selection-center -->
    <div class="Selection-home">
        <section class="wrapper-c">
            <div class="bg-div">
                <p></p>
            </div>
            <article class="max-center"> 
                <div class="Selection-content">
                    <div class="Selection-select">
                        <div class="Selection-link"><van-icon name="arrow-left" color="#FFFFFF" /></div>
                        <div class="Selection-r"><van-search shape="round" v-model="value" placeholder="请输入商品名称" background=" #FC273C" /></div>
                    </div>
                    <div class="Selection-column" @click="ClickColumn">
                        <span>栏目名称1</span>
                        <p><img src="../assets/images/team-r.png" ></p>
                    </div>
                    <div class="screen">
                        <div class="screen-r" @click="showPopup"><p><img src="../assets/images/screen-icon.png" alt=""></p><i>筛选</i></div>
                        <div class="screen-l">
                            <ul class="screen-ul">
                                <li class="cur">精选</li>
                                <li>佣金</li>
                                <li>价格</li>
                            </ul>
                            <div class="sales-volume sales-volume-down">
                                销量
                            </div>
                        </div>
                    </div>
                    <div class="Selection-ul">
                        <div class="Selection-li">
                            <div class="Selection-li-l"><img src="../assets/images/superiorImg.png" ></div>
                            <div class="Selection-li-r">
                                <span>荣耀Play4T 全网通6GB+128GB大内存 蓝水翡翠 4000mAh大电池</span>
                                <div class="Selection-li-mony">
                                    <em>会员价：¥ 1288.00</em>
                                    <em>销量: 123123</em>
                                </div>
                                <div class="Coin">
                                    <div class="Coin-l">
                                        <p><img src="../assets/images/Coin.png" ></p>
                                        <i>赚￥999.99</i>
                                    </div>
                                    <strong class="Selection-red" @click="ClickShare">带货</strong>
                                </div>
                            </div>
                        </div>
                        <div class="Selection-li">
                            <div class="Selection-li-l"><img src="../assets/images/superiorImg.png" ></div>
                            <div class="Selection-li-r">
                                <span>荣耀Play4T 全网通6GB+128GB大内存 蓝水翡翠 4000mAh大电池</span>
                                <div class="Selection-li-mony">
                                    <em>会员价：¥ 1288.00</em>
                                    <em>销量: 123123</em>
                                </div>
                                <div class="Coin">
                                    <div class="Coin-l">
                                        <p><img src="../assets/images/Coin.png" ></p>
                                        <i>赚￥999.99</i>
                                    </div>
                                    <strong class="Selection-cancel">取消带货</strong>
                                </div>
                            </div>
                        </div>

                        <!-- 空数据开始 -->
                        <!-- <div class="no-data">
                            <van-empty description="没有找到相关内容" :image="require('../assets/images/no-data.png')">
                            </van-empty>
                        </div> -->
                        <!-- 空数据结束 -->
                    </div>
                </div>
            </article>
            <!-- 带货弹窗开始 -->
            <van-action-sheet v-model="show" title="带货">
                <div class="action-content">
                    <div class="selection-shop">
                        <span><img src="../assets/images/Bring-img1.png" alt="" srcset=""></span>
                        <div class="selection-shop-r">
                            <p>荣耀Play4T 全网通6GB+128GB大内存 蓝水翡翠 4000mAh大电池</p>
                            <div class="election-shop-mony">
                                <em>会员价：¥ 1288.00</em>
                                <em>销量: 123123</em>
                            </div>
                        </div>
                    </div>
                    <div class="scale">
                        <span>
                            <em>¥9～¥99</em>
                            <i>预计佣金</i>
                        </span>
                        <span>
                            <em>10%</em>
                            <i>佣金比例</i>
                        </span>
                    </div>
                    <div class="danger-button">
                        <van-button round type="danger" class="bottom-button">
                            确认
                        </van-button>
                    </div>
                </div>
            </van-action-sheet>
            <!-- 带货弹窗结束 -->
            <!-- 筛选弹窗开始 -->
            <div v-if="show1">
                <div class="popup-bg"></div>
                <ul class="popup-ul">
                    <li class="cur">全部分类</li>
                    <li>分类1</li>
                    <li>分类1</li>
                    <li>分类1</li>
                    <li>分类1</li>
                    <li>分类1</li>
                    <li>分类1</li>
                    <li>分类1</li>
                    <li>分类1</li>
                </ul>
            </div>
            <!-- 筛选弹窗结束 -->
            <!-- 选择提现账号弹窗开始 -->
            <van-action-sheet :closeable="false" v-model="show2" title="选择栏目" class="action-tit">
                <div class="alert-content">
                    <div>
                        <div class="alert-action-li action-cur">
                            <p>栏目名称1</p>
                            <span><img src="../assets/images/icon-ok.png"></span>
                        </div>
                        <div class="alert-action-li">
                            <p>栏目名称1</p>
                            <span><img src="../assets/images/icon-ok.png"></span>
                        </div>
                        <div class="alert-action-li">
                            <p>栏目名称1</p>
                            <span><img src="../assets/images/icon-ok.png"></span>
                        </div>
                        <div class="alert-action-li">
                            <p>栏目名称1</p>
                            <span><img src="../assets/images/icon-ok.png"></span>
                        </div>
                    </div>
                    <div class="alert-action-but">
                        <van-button round block type="info" native-type="submit">
                            确认
                        </van-button>
                    </div>
                </div>
            </van-action-sheet>
            <!-- 选择提现账号弹窗结束 -->
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
            show1: false,
            show2: false,
        };
    },
    methods: {
        /**
         * @Date: 2020-11-10
         * @LastEditors: fengting
         * @description: 带货弹窗
         */
        ClickShare(){
            this.show = true;
        },
        /**
         * @Date: 2020-11-11
         * @LastEditors: fengting
         * @description: 筛选弹窗
         */
        showPopup(){
            this.show1 = true;
        },
        /**
         * @Date: 2020-11-11
         * @LastEditors: fengting
         * @description: 筛选弹窗
         */
        ClickColumn(){
            this.show2 = true;
        }
    }
};
</script>
<style lang="scss">
    @import "@/pages/distribution/assets/css/distribution.scss";
</style>

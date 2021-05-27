<!--
 * @Author       : fengting
 * @description  : 分销中心首页
 * @Date         : 2020-11-04 10：50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-30 16:33:29
 * @FilePath     : /vue-test_qian/src/pages/distribution/views/index.vue
-->

<template>
    <!-- distribution-center -->
    <div class="distribution-home">
        <section class="wrapper-c">
            <div class="bg-div">
                <p></p>
            </div>
            <article class="max-center"> 
                <div class="dis-head">
                    <div class="dis-head-bg"><img src="../assets/images/head-bg.jpg"></div>
                    <div class="max-head">
                        <!-- 头部开始 -->
                        <header class="cen-head">
                            <div class="link-return">
                                <img src="../assets/images/link-return.png" />
                            </div>
                            <div class="head-tit">
                                分销中心
                            </div>
                            <div class="Brush">
                                <img src="../assets/images/link-brush.png" />
                            </div>
                        </header>
                        <!-- 头部结束 -->
                        <!-- 用户信息开始 -->
                        <div class="dis-head-cen">
                            <div class="dis-head-r">
                                <span>
                                    <em>我的推广码</em>
                                    <p><img src="../assets/images/icon-img1.png"></p>
                                </span>
                                <strong>7685920</strong>
                            </div>
                            <div class="dis-head-l">
                                <div class="dis-head-photo">
                                    <span><img src="../assets/images/head-photo.png"></span>
                                    <router-link to="editpage"><img src="../assets/images/icon-edit.png"></router-link>
                                </div>
                                <div class="dis-head-user">
                                    <div class="dis-head-info">
                                        <div class="dis-head-name">分销商名称</div>
                                        <div class="dis-head-vip">
                                            <span><img src="../assets/images/icon-vip.png"></span>
                                            <p>金牌分销商</p>
                                        </div>
                                    </div>
                                    <router-link to="editpage" class="superior">我的上级：分销商名2</router-link>
                                </div>
                            </div>
                        </div>
                        <!-- 用户信息结束 -->
                    </div>
                    <!-- 提现开始 -->
                        <div class="Cash-top">
                            <router-link to="Withdrawal" class="Cash-but1">立即提现</router-link>
                            <router-link to="WithdrawalList" class="Cash-but2">提现记录</router-link>
                            <div class="Cash-mony">
                                <span>可提佣金 (元)</span>
                                <p>368</p>
                            </div>
                        </div>
                    <!-- 提现结束 -->
                </div>
                <div class="dis-content">
                    <router-link to="orderdetailed" class="profit">
                        <div class="triangle"><img src="../assets/images/triangle.png"></div>
                        <div class="profit_ul">
                            <div class="profit_li">
                                <p>累计收益 (元)</p>
                                <span>2889.99</span>
                            </div>
                            <div class="profit_li">
                                <p>今日收益 (元)</p>
                                <span>2889.99</span>
                            </div>
                        </div>
                    </router-link>
                    <!-- 分销爆款开始 -->
                    <div class="dis-hot">
                        <div class="dis-hot-tit">分销爆款</div>
                        <div class="dis-hot-con">
                            <div class="dis-hot-ul">
                                <div class="dis-hot-li" v-for="(item ,index) in HotList" :key="index">
                                    <div class="hot-li-img">
                                        <span><img :src="item.SrcImg"></span>
                                        <p>赚{{item.PageMony}}</p>
                                    </div>
                                    <strong>{{item.HotTit}}</strong>
                                    <div class="hot-li-mony">&yen;<em>{{item.Mony}}</em></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 分销爆款结束 -->
                    <!-- 分销带货开始 -->
                    <div class="dis-bring" @click="ClickUrl">
                        <div class="dis-bring-img"><img src="../assets/images/bring-img.png"></div>
                        <div class="dis-bring-txt">
                            <strong>分销带货</strong>
                            <p>我的分销商品推广店>></p>
                        </div>
                        <router-link class="dis-bring-choice" to="Selection">选品</router-link>
                    </div>
                    <!-- 分销带货结束 -->
                    <!-- 分销海报开始 -->
                    <div class="dis-hot">
                        <div class="dis-hot-tit">分销海报</div>
                        <div class="dis-hot-con">
                            <div class="dis-poster-ul">
                                <div class="dis-poster-li" v-for="(item ,index) in PosterList" :key="index">
                                    <span><img :src="item.PosImg"></span>
                                    <p>上次使用</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 分销海报结束 -->
                    <!-- 我得团队开始 -->
                    <div class="dis-team">
                        <div class="dis-team-tit">
                            <span>我的团队</span>
                            <p>下级分销商总数<em>3298</em></p>
                        </div>
                        <div class="dis-team-con">
                            <router-link class="dis-team-li" v-for="(item ,index) in TeamList" :key="index" :to="{path:item.disurl}">
                                <div class="team-li-l">
                                    <span><img :src="item.TeamImg"></span>
                                    <em>{{item.text}}</em>
                                </div>
                                <div class="team-li-r">
                                    <p><img src="../assets/images/team-r.png"></p>
                                    <strong>{{item.int}}</strong>
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <!-- 我得团队结束 -->
                </div>
            </article>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //分销爆款
            HotList:[{
                SrcImg:require("../assets/images/img1.png"),
                PageMony:'9.99',
                HotTit:"华为 HUAWEI 麒麟810芯片",
                Mony:"2299.00"
            },{
                SrcImg:require("../assets/images/img1.png"),
                PageMony:'9.99',
                HotTit:"华为 HUAWEI 麒麟810芯片",
                Mony:"2299.00"
            },{
                SrcImg:require("../assets/images/img1.png"),
                PageMony:'9.99',
                HotTit:"华为 HUAWEI 麒麟810芯片",
                Mony:"2299.00"
            },{
                SrcImg:require("../assets/images/img1.png"),
                PageMony:'9.99',
                HotTit:"华为 HUAWEI 麒麟810芯片",
                Mony:"2299.00"
            },{
                SrcImg:require("../assets/images/img1.png"),
                PageMony:'9.99',
                HotTit:"华为 HUAWEI 麒麟810芯片",
                Mony:"2299.00"
            }],
            //分校海报
            PosterList:[{
                PosImg:require("../assets/images/img2.png"),
            },{
                PosImg:require("../assets/images/img3.png"),
            },{
                PosImg:require("../assets/images/img2.png"),
            },{
                PosImg:require("../assets/images/img3.png"),
            },{
                PosImg:require("../assets/images/img2.png"),
            },{
                PosImg:require("../assets/images/img3.png"),
            },{
                PosImg:require("../assets/images/img2.png"),
            }],
            //我的团队
            TeamList:[{
                TeamImg:require("../assets/images/team-icon1.png"),
                text:'一级分销商',
                int:'597',
                disurl:'onedistribution'
            },{
                TeamImg:require("../assets/images/team-icon2.png"),
                text:'二级分销商',
                int:'597',
                disurl:''
            },{
                TeamImg:require("../assets/images/team-icon3.png"),
                text:'三级分销商',
                int:'597',
                disurl:''
            },{
                TeamImg:require("../assets/images/team-icon4.png"),
                text:'我发展的会员',
                int:'597',
                disurl:'MyDevelopVip'
            }]
        };
    },
    methods: {
        /**
         * @Date: 2020-09-08 14:46:52
         * @LastEditors: fengting
         * @description: 分销带货跳转
         */
        ClickUrl(){
            this.$router.push({
                'path': 'BringGoods'
            })
        }
    }
};
</script>
<style lang="scss">
@import "@/pages/distribution/assets/css/distribution.scss";
</style>

<template>
    <section class="orderList-box">
        <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" />
        <section class="orderListCon">
            <div
                class="wrapper"
                @click.self="closeCon"
                v-if="orderListInfo != ''"
                :style="{ paddingTop: orderListInfo.webOrderType != 3 ? '2rem' : '' }"
            >
                <Nav :numerical="4" :tips="orderListInfo.tips" :userCenterStyle="orderListInfo.userCenterStyle" />
                <div class="wrapper_c" v-wechat-title="($route.meta.title = orderListInfo.tips.wodedingdan)">
                    <div class="wrapper_bg">
                        <div class="wrapper_bg_c"></div>
                    </div>
                    <div class="Max_Center">
                        <!-- 顶部 -->
                        <div class="orderListHead" v-if="orderListInfo.webOrderType == 3">
                            <div class="orderListHead_left" :style="{ color: headStatus == 0 ? bgcColor1 : '' }">
                                {{ orderListInfo.tips.shangpindingdan }}
                            </div>
                            <div
                                class="orderListHead_righ"
                                @click="fuwuFun(1)"
                                :style="{ color: headStatus == 1 ? '#f00' : '' }"
                            >
                                {{ orderListInfo.tips.fuwudingdan }}
                            </div>
                        </div>
                        <!-- 头部开始 -->
                        <div
                            class="tab_head"
                            :style="{ top: orderListInfo.webOrderType != 3 ? '0.9rem' : '' }"
                            v-if="head_info.length"
                        >
                            <div v-for="(item, index) in head_info" :key="index">
                                <div class="tab_head_li" v-if="index == 0">
                                    <div :style="{ borderColor: bgcColor1 }" @click="changeTitle(index)">
                                        {{ item
                                        }}<span
                                            :style="{ background: bgcColor1 }"
                                            v-if="type == 0"
                                            class="bottomXian"
                                        ></span>
                                    </div>
                                </div>
                                <div class="tab_head_li " v-if="index == 1">
                                    <div :style="{ borderColor: bgcColor1 }" @click="changeTitle(index)">
                                        {{ item
                                        }}<span
                                            :style="{ background: bgcColor1 }"
                                            v-if="type == 1"
                                            class="bottomXian"
                                        ></span>
                                    </div>
                                </div>
                                <div class="tab_head_li" v-if="index == 2">
                                    <div :style="{ borderColor: bgcColor1 }" @click="changeTitle(index)">
                                        {{ item
                                        }}<span
                                            :style="{ background: bgcColor1 }"
                                            v-if="type == 2"
                                            class="bottomXian"
                                        ></span>
                                    </div>
                                </div>
                                <div class="tab_head_li" v-if="index == 3">
                                    <div :style="{ borderColor: bgcColor1 }" @click="changeTitle(index)">
                                        {{ item
                                        }}<span
                                            :style="{ background: bgcColor1 }"
                                            v-if="type == 3"
                                            class="bottomXian"
                                        ></span>
                                    </div>
                                </div>
                                <div class="tab_head_li" v-if="index == 4">
                                    <div :style="{ borderColor: bgcColor1 }" @click="changeTitle(index)">
                                        {{ item
                                        }}<span
                                            :style="{ background: bgcColor1 }"
                                            v-if="type == 4"
                                            class="bottomXian"
                                        ></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--订单列表 -->
                        <div class="order_list" v-show="orderList.length">
                            <div class="order_li" v-for="(item, index) in orderList" :key="index">
                                <div v-if="item.pro_info.pro_list.length > 0">
                                    <div class="order_top">
                                        <div
                                            class="state3"
                                            :style="{
                                                color:
                                                    item.state_info.color_type == 2
                                                        ? '#999999'
                                                        : item.state_info.color_type == 3
                                                        ? '#333333'
                                                        : ''
                                            }"
                                        >
                                            {{ item.state_info.order_state }}
                                        </div>
                                        <div class="shop_name">
                                            <div
                                                class="home_img"
                                                @click="
                                                    shopMallFun(item.no_jump, item.shops_user_id, item.shopsChannelId)
                                                "
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_home.png"
                                                />
                                            </div>
                                            <div
                                                class="home_txt"
                                                @click="
                                                    shopMallFun(item.no_jump, item.shops_user_id, item.shopsChannelId)
                                                "
                                            >
                                                {{ item.shops_name }}
                                            </div>
                                            <div class="arrow1" v-if="item.shops_user_id > 0 && item.no_jump != 1">
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow1.png"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="order_center" @click="goOrderdetail(item.order_type, item.id)">
                                        <div
                                            class="order_name"
                                            :style="{ paddingTop: item.order_type == 4 ? '0.2rem' : '0.05rem' }"
                                            v-if="item.pro_info.pro_list.length == 1"
                                        >
                                            <div class="shop_img" v-if="item.order_type != 4">
                                                <img mode="aspectFill" :src="item.pro_info.pro_list[0].pic" />
                                            </div>
                                            <div class="shop_link">
                                                <div class="shop_link_tit">
                                                    {{ item.pro_info.pro_list[0].name }}
                                                </div>
                                                <div class="shop_link_txt">
                                                    {{ item.pro_info.pro_list[0].param_info }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="order_name" v-else>
                                            <template  v-for="(proItem, proIndex) in item.pro_info.pro_list">
                                                <div
                                                    class="shop_img1"
                                                    :item="proItem"
                                                    :index="proIndex"
                                                    :key="proIndex"
                                                    v-if="proIndex < 3"
                                                >
                                                    <img v-if="proIndex < 3" :src="proItem.pic" />
                                                </div>
                                            </template>
                                        </div>
                                        <div class="order_money">
                                            <div class="money">
                                                <span :style="{ marginRight: '0.03rem' }">{{ orderListInfo.currency_symbol }}</span
                                                >{{ item.shiji_money_json.left
                                                }}<span>.{{ item.shiji_money_json.right }}</span>
                                            </div>
                                            <div class="Number" v-if="item.order_type != 4 && item.order_type != 34">
                                                {{ item.pro_info.pro_number }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="order_foot" v-if="item.button_info.length">
                                        <div
                                            v-if="item.button_more.length"
                                            style="font-size:0.26rem;position:relative;overflow:inherit;"
                                            @click.stop="item.bm_status = item.bm_status == false ? true : false"
                                        >
                                            {{ orderListInfo.tips.gengduo }}
                                            <span class="moreSpan" v-show="item.bm_status"></span>
                                            <!-- 更多列表 -->
                                            <aside class="button_more" v-show="item.bm_status">
                                                <!-- <i class="iconfont icon-triangle-top"></i> -->
                                                <ul style="position:relative;">
                                                    <li
                                                        v-for="(moreItem, moreIndex) in item.button_more"
                                                        :key="moreIndex"
                                                    >
                                                        <!-- 订单二维码 -->
                                                        <em
                                                            v-if="moreItem.type == 'qrcode'"
                                                            class="navigator1"
                                                            style="border:0 !important;"
                                                            @click="navagatePage(7, 'buyindex=' + index, moreItem.img)"
                                                        >
                                                            {{ moreItem.name }}
                                                        </em>
                                                        <!-- 申请售后-- -->
                                                        <em
                                                            v-if="moreItem.type == 'application'"
                                                            @click="
                                                                navagatePage(
                                                                    3,
                                                                    'orderid=' + item.id,
                                                                    'proid=' +
                                                                        (item.pro_info.pro_list.length == 1
                                                                            ? item.pro_info.pro_list[0].pro_id
                                                                            : 0),
                                                                    'detailid=' +
                                                                        (item.pro_info.pro_list.length == 1
                                                                            ? item.pro_info.pro_list[0].id
                                                                            : 0),
                                                                    'buyindex=' + index,
                                                                    'partygoods=' + item.there_are_third_party_goods
                                                                )
                                                            "
                                                            class="navigator1"
                                                            style="border:0 !important;"
                                                        >
                                                            {{ moreItem.name }}
                                                        </em>
                                                        <em
                                                            v-if="moreItem.type == 'up'"
                                                            class="navigator1"
                                                            style="border:0;"
                                                            @click="navagatePage(9, 'orderid=' + item.id)"
                                                        >
                                                            {{ moreItem.name }}
                                                        </em>
                                                    </li>
                                                </ul>
                                            </aside>
                                        </div>

                                        <aside
                                            v-for="(btnItem, btnIndex) in item.button_info"
                                            :item="btnItem"
                                            :index="btnIndex"
                                            :key="btnIndex"
                                        >
                                            <!-- 去支付 -->
                                            <div
                                                v-if="btnItem.type == 'pay'"
                                                :style="{ background: bgcColor1 }"
                                                @click="
                                                    navagatePage(0, 'orderid=' + item.id, 'price=' + item.total_amount)
                                                "
                                                class="navigator2"
                                            >
                                                {{ btnItem.name }}
                                            </div>
                                            <!-- 取消订单 -->
                                            <div
                                                v-if="btnItem.type == 'del'"
                                                class="navigator1"
                                                @click="changeYL(item.id)"
                                            >
                                                {{ btnItem.name }}
                                            </div>
                                            <!-- 申请退款 -->
                                            <div
                                                v-if="btnItem.type == 'refund'"
                                                class="navigator1"
                                                @click="navagatePage(2, 'orderid=' + item.id)"
                                            >
                                                {{ btnItem.name }}
                                            </div>

                                            <!-- 评价晒单 -->
                                            <div
                                                @click="
                                                    navagatePage(
                                                        4,
                                                        'orderid=' + item.id,
                                                        'proid=' +
                                                            (item.pro_info.pro_list.length == 1
                                                                ? item.pro_info.pro_list[0].pro_id
                                                                : 0),
                                                        'detailid=' +
                                                            (item.pro_info.pro_list.length == 1
                                                                ? item.pro_info.pro_list[0].id
                                                                : 0),
                                                        'buyindex=' + index
                                                    )
                                                "
                                                v-if="btnItem.type == 'evaluate'"
                                                class="navigator1"
                                            >
                                                {{ btnItem.name }}
                                            </div>

                                            <div
                                                @click="
                                                    navagatePage(
                                                        8,
                                                        'orderid=' + item.id,
                                                        'proid=' +
                                                            (item.pro_info.pro_list.length == 1
                                                                ? item.pro_info.pro_list[0].pro_id
                                                                : 0),
                                                        'detailid=' +
                                                            (item.pro_info.pro_list.length == 1
                                                                ? item.pro_info.pro_list[0].id
                                                                : 0)
                                                    )
                                                "
                                                v-if="btnItem.type == 'addevaluate'"
                                                class="navigator1"
                                            >
                                                {{ btnItem.name }}
                                            </div>

                                            <!--  再次购买-->
                                            <div
                                                v-if="btnItem.type == 'buy'"
                                                class="navigator1"
                                                @click="navagatePage(5, 'buyindex=' + index)"
                                            >
                                                {{ btnItem.name }}
                                            </div>
                                            <!-- 查看物流 -->
                                            <div
                                                v-if="btnItem.type == 'logistics'"
                                                :style="{ borderColor: bgcColor1, color: bgcColor1 }"
                                                @click="navagatePage(6, 'orderid=' + item.id)"
                                                class="navigator3"
                                            >
                                                {{ btnItem.name }}
                                            </div>
                                            <!-- 确认收货 -->
                                            <div
                                                v-if="btnItem.type == 'receipt'"
                                                @click="okShouhuo(item.id)"
                                                class="navigator1"
                                            >
                                                {{ btnItem.name }}
                                            </div>
                                            <!-- 订单二维码 -->
                                            <div
                                                v-if="btnItem.type == 'qrcode'"
                                                class="navigator1"
                                                style="width:1.51rem;"
                                                @click="navagatePage(7, 'buyindex=' + index, btnItem.img)"
                                            >
                                                {{ btnItem.name }}
                                            </div>
                                            <!-- 上传附件 -->
                                            <div
                                                v-if="btnItem.type == 'up'"
                                                class="navigator1"
                                                @click="navagatePage(9, 'orderid=' + item.id)"
                                            >
                                                {{ btnItem.name }}
                                            </div>
                                            <!-- 申请售后-- -->
                                            <div
                                                v-if="btnItem.type == 'application'"
                                                @click="
                                                    navagatePage(
                                                        3,
                                                        'orderid=' + item.id,
                                                        'proid=' +
                                                            (item.pro_info.pro_list.length == 1
                                                                ? item.pro_info.pro_list[0].pro_id
                                                                : 0),
                                                        'detailid=' +
                                                            (item.pro_info.pro_list.length == 1
                                                                ? item.pro_info.pro_list[0].id
                                                                : 0),
                                                        'buyindex=' + index,
                                                        'partygoods=' + item.there_are_third_party_goods
                                                    )
                                                "
                                                class="navigator1"
                                            >
                                                {{ btnItem.name }}
                                            </div>
                                        </aside>
                                    </div>
                                    <!-- 已完成 -->
                                    <div class="watermark" v-if="item.state_info.state_type == 3">
                                        <img
                                            src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_complete.png"
                                        />
                                    </div>
                                    <!-- 已失效 -->
                                    <div class="watermark" v-if="item.state_info.state_type == 4">
                                        <img
                                            src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_shixiao.png"
                                        />
                                    </div>
                                </div>
                            </div>
                            <!-- 到底了 -->
                            <div class="footerBox" v-if="(page > pageCnt || pageCnt == 1) && orderList.length > 2">
                                <span>我也是有底线的~</span>
                            </div>
                        </div>

                        <div class="no_data" v-show="orderList.length == 0">
                            <div class="no_data_img">
                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_no_data.png" />
                            </div>
                            <div class="no_data_txt" v-show="!showLoading">
                                {{ orderListInfo.tips.meiyouxiangguandingdan }}
                            </div>
                        </div>
                    </div>
                    <!-- 弹窗开始 -->
                    <div class="alert_bg" catchtouchmove="noMove" v-if="showModal" @click="shadowClose"></div>
                    <div class="alert_c" v-if="refundConfim == 1">
                        <div class="alert_tit" catchtouchmove="noMove" style="margin-bottom:0;">
                            <div class="alert_tit_txt" v-if="cancelModel">{{ orderListInfo.tips.quxiaodingdan }}</div>
                            <div class="alert_tit_txt" v-else>{{ orderListInfo.tips.shenqingtuikuan }}</div>
                            <div class="Close" @click="no_show">
                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_Close.png" />
                            </div>
                        </div>
                        <!-- 申请退款 -->
                        <div class="Reason1" v-if="!cancelModel && refundMethod != ''" catchtouchmove="noMove">
                            <div class="Reason1_left">{{ orderListInfo.tips.dingdanjinetuihuizhi }}:</div>
                            <div class="Reason1_right" style="float: right;" v-if="refundMethod.method == 1">
                                <span v-if="refundMethod.bankInfo.length == 0" @click="fuwuFun(2)">{{
                                    orderListInfo.tips.tianjiayinhangka
                                }}</span>
                                <span @click="click(1)" v-else>{{
                                    refundMethod.bankInfo[refundIndex].bank +
                                        "-" +
                                        refundMethod.bankInfo[refundIndex].receivable
                                }}</span>
                                <div class="arrow3">
                                    <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow3.png" />
                                </div>
                            </div>
                            <div class="Reason1_right" style="float:right;" v-else>{{ refundMethod.name }}</div>
                        </div>
                        <div class="Reason2" v-if="!cancelModel">
                            <div class="Reason1_left" catchtouchmove="noMove">
                                {{ orderListInfo.tips.quxiaodingdanyuanyin }}
                            </div>

                            <div class="Reason1_right" @click="click(2)">
                                {{ cancel_reason[numReson].name }}
                                <div class="arrow3">
                                    <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow3.png" />
                                </div>
                            </div>
                            <!-- <div class="Reason_ul" v-show="hiddenName">
                                <div
                                    class="Reason_li"
                                    v-for="(item, index) in cancel_reason"
                                    :key="index"
                                    @click="switchTab(index)"
                                >
                                    <div
                                        :style="{
                                            borderColor: numReson == index ? bgcColor1 : '',
                                            background: numReson == index ? bgcColor1 : ''
                                        }"
                                        class="Reason_or"
                                    >
                                        <i style="color:#fff;" class="iconImage iconfont icon-duihao"></i>
                                    </div>
                                    <div class="Reason_or_txt">{{ item.name }}</div>
                                </div>
                            </div> -->
                        </div>
                        <div class="Reason3" v-if="!cancelModel" catchtouchmove="noMove">
                            <textarea
                                :placeholder="orderListInfo.tips.miaoshuneirong"
                                :value="describe"
                                @input="describeInput($event.target.value)"
                                style="background:rgb(245, 245,245)"
                            ></textarea>
                            <div class="textareStateClass" v-show="textareState" @click="changeTextarea">
                                <span>{{ describe ? describe : orderListInfo.tips.miaoshuneirong }}</span>
                            </div>
                        </div>
                        <!-- 取消订单文案 -->
                        <div class="cancelModel" catchtouchmove="noMove" v-if="cancelModel">
                            {{ orderListInfo.tips.shifouquxiaogaidingdan }}
                        </div>
                        <div
                            class="button_a"
                            catchtouchmove="noMove"
                            @click="cancelOrderBtn(cancelModel ? 'del' : 'refund')"
                            :style="{ background: bgcColor1 }"
                        >
                            {{ orderListInfo.tips.queren }}
                        </div>
                    </div>
                    <!-- 弹窗结束 -->

                    <!-- 供应链申请退款弹窗 -->
                    <div class="alert_bg" catchtouchmove="noMove" v-if="refundConfim == 2" @click="shadowClose"></div>
                    <div class="alert_c" v-if="refundConfim == 2">
                        <div class="alert_tit" catchtouchmove="noMove">
                            <div class="alert_tit_txt" v-if="cancelModel">{{ orderListInfo.tips.quxiaodingdan }}</div>
                            <div class="alert_tit_txt" v-else>{{ orderListInfo.tips.shenqingtuikuan }}</div>
                            <div class="Close" @click="no_show">
                                <img
                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Close.png"
                                />
                            </div>
                        </div>
                        <!-- 申请退款 -->
                        <div class="Reason2">
                            <div
                                class="Reason1_left"
                                catchtouchmove="noMove"
                                :style="{ flex: none, marginRight: '0.65rem', fontSize: '0.28rem', width: '2rem' }"
                            >
                                {{ orderListInfo.tips.dingdanjinetuihuizhi }}
                            </div>
                            <input
                                class="Reason1_right placeholderClass"
                                :style="{ flex: auto, fontSize: '0.28rem' }"
                                @click="click(2)"
                                :value="cancel_reason[numReson].name"
                                :placeholder="orderListInfo.tips.qingxuanze + orderListInfo.tips.tuikuanyuanyin"
                                :disabled="true"
                            />
                            <div :class="hiddenName == false ? 'arrow3' : 'arrow4 arrow3'">
                                <img
                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_arrow3.png"
                                />
                            </div>
                            <!-- <div class="Reason_ul" v-show="hiddenName">
                                <div
                                    class="Reason_li"
                                    v-for="(item, index) in cancel_reason"
                                    :key="index"
                                    @click="switchTab(2,index)"
                                >
                                    <div
                                        :style="{
                                            borderColor: numReson == index ? bgcColor1 : '',
                                            background: numReson == index ? bgcColor1 : ''
                                        }"
                                        class="Reason_or"
                                    >
                                        <span :style="{ color: '#fff' }" class="iconImage iconfont icon-duihao"></span>
                                    </div>
                                    <div class="Reason_or_txt">{{ item.name }}</div>
                                </div>
                            </div> -->
                        </div>
                        <div class="Reason2">
                            <div
                                class="Reason1_left"
                                catchtouchmove="noMove"
                                :style="{ flex: none, marginRight: '0.65rem', fontSize: '0.28rem', width: '2rem' }"
                            >
                                {{ orderListInfo.tips.lianxiren }}
                            </div>
                            <input
                                class="Reason1_right placeholderClass"
                                :style="{ flex: auto, fontSize: '0.28rem' }"
                                value=""
                                :placeholder="orderListInfo.tips.qingshuru + orderListInfo.tips.lianxiren"
                            />
                        </div>
                        <div class="Reason2" :style="{ marginBottom: '0.35rem' }">
                            <div
                                class="Reason1_left"
                                catchtouchmove="noMove"
                                :style="{ flex: none, marginRight: '0.65rem', fontSize: '0.28rem', width: '2rem' }"
                            >
                                {{ orderListInfo.tips.lianxifangshi }}
                            </div>
                            <input
                                class="Reason1_right placeholderClass"
                                :style="{ flex: auto, fontSize: '0.28rem' }"
                                value=""
                                :placeholder="orderListInfo.tips.qingshuru + orderListInfo.tips.lianxifangshi"
                            />
                        </div>
                        <div class="warnInfo">
                            <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/warn.png" />
                            {{ orderListInfo.tips.quxiaodingdanjinfanhuanshangpinjine }}
                        </div>
                        <div
                            class="button_a"
                            catchtouchmove="noMove"
                            @click="cancelOrderBtn(cancelModel ? 'del' : 'refund')"
                            :style="{ background: bgcColor1 }"
                        >
                            {{ orderListInfo.tips.shenqingtuikuan }}
                        </div>
                    </div>
                </div>

                <!-- 透明层，防止连点 -->
                <div class="opacityView" v-if="payStatus"></div>
                <!-- 二维码弹窗 -->
                <div class="erweima_box" v-if="imgSrc != ''">
                    <div class="erweima">
                        <div class="erweima_top">
                            <img :src="imgSrc" />
                            <span v-if="`$toute.query.username` == 'lxkj_zsc'">{{
                                orderListInfo.tips.shangjiaweixinsaoma
                            }}</span>
                            <span v-else-if="`$toute.query.username` == 'ywgshop'">{{
                                orderListInfo.tips.tongguoshangjiasaomaqueren
                            }}</span>
                            <span v-else>{{ orderListInfo.tips.shiyongshangjiazhushouqueren }}</span>
                        </div>
                        <div class="erweima_bottom" @click.stop="imgSrc = ''">
                            {{ orderListInfo.tips.guanbi }}
                        </div>
                    </div>
                </div>
                <!-- 单选弹窗(申请退款) -->
                <custon-popup ref="customDate" @closePayWayStore="closePayWay">
                    <div slot="PoperContent" class="changeCityClass">
                        <div class="changeCityBox payWayBox">
                            <div class="changeCityBox_top" style="border-bottom:0;">
                                <div class="changeCityBox_top_left changeCityBox_top_left_heng">
                                    <span v-if="refundStatus == 1">{{ refundMethod.name }}</span>
                                    <span v-if="refundStatus == 2">{{ orderListInfo.tips.quxiaodingdanyuanyin }}</span>
                                </div>
                                <div class="changeCityBox_top_right" @click="closePayWay">
                                    <div class="weixinAdress_closeIcon">
                                        <span class="weixinAdress_closeIcon_left"></span>
                                        <span class="weixinAdress_closeIcon_right"></span>
                                    </div>
                                </div>
                            </div>
                            <!-- 订单金额退回至 -->
                            <div class="payWay_content shopName_content" v-if="refundStatus == 1">
                                <div
                                    class="distribution_content_stores_ListValue"
                                    v-for="(item, index) in bankInfo"
                                    :key="index"
                                    @click="changeStore(1, index)"
                                >
                                    <div class="distribution_content_stores_ListTop">
                                        <div class="distribution_ListTop_right">
                                            <div
                                                :class="
                                                    item.is_check == 1
                                                        ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                        : 'shoppingContent_radio'
                                                "
                                                :style="{
                                                    background: item.is_check == 1 ? bgcColor1 : '',
                                                    borderColor: item.is_check == 1 ? bgcColor1 : '' + '!important'
                                                }"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                    alt="check"
                                                    v-if="item.is_check == 1"
                                                />
                                            </div>
                                        </div>
                                        <div class="distribution_ListTop_left">
                                            <span>{{ item.bank }}-{{ item.receivable }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 取消订单 -->
                            <div class="payWay_content shopName_content" v-else-if="refundStatus == 2">
                                <div
                                    class="distribution_content_stores_ListValue"
                                    v-for="(item, index) in cancel_reason"
                                    :key="index"
                                    @click="changeStore(2, index)"
                                >
                                    <div class="distribution_content_stores_ListTop">
                                        <div class="distribution_ListTop_right">
                                            <div
                                                :class="
                                                    item.is_check == 1
                                                        ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                        : 'shoppingContent_radio'
                                                "
                                                :style="{
                                                    background: item.is_check == 1 ? bgcColor1 : '',
                                                    borderColor: item.is_check == 1 ? bgcColor1 : '' + '!important'
                                                }"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                    alt="check"
                                                    v-if="item.is_check == 1"
                                                />
                                            </div>
                                        </div>
                                        <div class="distribution_ListTop_left">
                                            <span>{{ item.name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="PoperContentBtn" :style="{ color: bgcColor1 }" @click="closePayWay">
                                {{ orderListInfo.tips.queren }}
                            </div>
                        </div>
                    </div>
                </custon-popup>
            </div>
        </section>
    </section>
</template>

<script>
var timeOut;
// vant组件
import Hint from "@/plugins/hint";
// 订单列表，购物车列表,确认收货，取消订单,加入购物车
import { getOrderList, cartList, orderHandle } from "@/api/order/orderList.js";
// 色系
import { getColor } from "@/api/order/submitOrder.js";
// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";
// 弹窗插槽组件
import CustomPopup from "@/components/CustomPopup/custompopup.vue";

import util from "@/libs/util";
export default {
    components: {
        Nav,
        "custon-popup": CustomPopup
    },
    data() {
        return {
            headStatus: 0,
            head_info: [],
            // 蒙版显示判断
            showModal: false,
            hiddenName: false,
            num: 0,
            page: 1,
            pageCnt: 0,
            type: 0,
            orderList: [],
            numReson: 0,
            describe: "",
            state: 0,
            fasterNum: 0,
            textareState: false,
            imgSrc: "",
            orderListInfo: "",
            showLoading: true, //加载动画
            refundConfim: 0,
            cancelModel: false,
            payStatus: false,
            bottomNum: 0,
            loadStatus: true,
            bgcColor1: "",
            bgcColor2: "",
            bgcColor3: "",
            bgcColor4: "",
            refundMethod: "",
            refundIndex: 0,
            refundStatus: 1, //1:是订单金额退回至，2：取消订单原因
            bankInfo: []
        };
    },
    created() {
        // this.$cookies.set("zz_userid", "21940075");
        // this.$cookies.set("zz_userid", "20257078");
        
    },
    mounted() {
        let state = 0,
            that = this;
        if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            return false;
        }
        that.getColorFun();

        if (util.functions.ifHaveFun(that.$cookies.get("orderList_state"))) {
            state = that.$cookies.get("orderList_state");
        }
        // if(util.functions.ifHaveFun(that.$route.query.state) || that.$route.query.state == 0){
        //     state = that.$route.query.state;
        // }
        that.type = state;
        // that.bgcColor1 = "#8D524A";
        that.orderListFun(state);
        that.headcolor = 0;
    },
    methods: {
        // 列表接口
        orderListFun(state,refType) {
            let that = this;
            that.showLoading = true;
            let paramJson = {
                state: state,
                page: that.page,
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                client_type: 1
            };
            getOrderList(paramJson)
                .then(res => {
                    that.showLoading = false;
                    // 申请退款成功之后跳转售后列表
                    if(refType == 'refund'){
                        that.$router.push({
                                path: "/order/orderRelated/afterSalesList",
                                query: {
                                    username: this.$route.query.username
                                }
                        });
                        this.$cookies.set("afterSales_state", 1);
                        return false;
                    }
                    // 服务订单
                    if (res.webOrderType == 2) {
                        location.href =
                            "//" + document.domain + "/wap/reservation_list.php?username=" + that.$route.query.username;
                        return false;
                    }
                    let orderList = that.orderList.concat(res.order_list);
                    for (let i in orderList) {
                        let val;
                        if (typeof orderList[i].total_amount == String) {
                            val = orderList[i].total_amount;
                        } else {
                            val = String(orderList[i].total_amount);
                        }
                        orderList[i].shiji_money_json = util.functions.separatePrice(val);
                        if (
                            util.functions.ifHaveFun(orderList[i].button_info) &&
                            !util.functions.ifHaveFun(orderList[i].button_more)
                        ) {
                            orderList[i].button_more = [];
                            orderList[i].bm_status = false;
                            if (orderList[i].button_info.length > 4) {
                                for (let j in orderList[i].button_info) {
                                    // 1.订单二维码 2.申请售后 3.上传附件放在更多里
                                    if (
                                        orderList[i].button_info[j].type == "qrcode" ||
                                        orderList[i].button_info[j].type == "application" ||
                                        orderList[i].button_info[j].type == "up"
                                    ) {
                                        orderList[i].button_more.push(orderList[i].button_info[j]);
                                        orderList[i].button_info.splice(j, 1);
                                    }
                                }
                            }
                        }
                    }
                    that.orderListInfo = res;
                    that.orderList = orderList;
                    that.pageCnt = res.page_cnt;
                    that.head_info = res.head_info;
                    that.wodedingdan = res.tips.wodedingdan;
                    that.bottomNum = 1;
                    // 申请退款原因
                    let cancel_reason = [];
                    for (let i = 0; i < res.cancel_reason.length; i++) {
                        cancel_reason[i] = {};
                        cancel_reason[i].is_check = 0;
                        if (i == 0) {
                            cancel_reason[i].is_check = 1;
                        }
                        cancel_reason[i].name = res.cancel_reason[i];
                    }
                    that.cancel_reason = cancel_reason;
                    // 申请退款订单退回至
                    that.refundMethod = util.functions.ifHaveFun(res.refundMethod) ? res.refundMethod : "";
                    if (that.refundMethod && that.refundMethod.method == 1 && that.refundMethod.bankInfo.length > 0) {
                        that.bankInfo = that.refundMethod.bankInfo;
                        for (let i = 0; i < that.bankInfo.length; i++) {
                            that.bankInfo[i].is_check = 0;
                            if (i == 0) {
                                that.bankInfo[i].is_check = 1;
                            }
                        }
                    }
                    setTimeout(() => {
                        $(".orderListCon").scroll(function() {
                            let nScrollHight = $(this)[0].scrollHeight;
                            let nScrollTop = $(this)[0].scrollTop;
                            let nDivHight = $(this).height();
                            if (nScrollTop + nDivHight + 100 >= nScrollHight) {
                                if (that.page > that.pageCnt || that.bottomNum == 0 || !that.orderList.length) {
                                    return false;
                                }
                                that.bottomNum = 0;
                                that.page = that.page + 1;
                                that.orderListFun(that.state);
                            }
                        });
                    });
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Alert({
                        message: err.msg
                    }).then(() => {
                        // on close
                        if (document.referrer.length > 0) {
                            window.history.back();
                        } else {
                            // location.href = this.videoData[0].index_url
                        }
                    });
                });
        },
        // 选择title
        changeTitle(type) {
            this.page = 1;
            this.type = type;
            this.state = type;
            this.refundIndex = 0;
            this.numReson = 0;
            this.orderList = [];
            this.orderListFun(type);
            this.$cookies.set("orderList_state", type);
        },
        /**
         * 取消订单弹窗
         */
        changeYL(id) {
            this.showModal = true;
            this.refundConfim = 1;
            this.cancelModel = true;
            this.buyCancelId = id;
        },
        shadowClose() {
            this.showModal = false;
            this.refundConfim = 0;
            this.cancelModel = true;
        },
        // 取消订单接口,退款
        cancelOrderBtn(type) {
            let that = this,
                jsonValue = {
                    order_id: that.buyCancelId,
                    zz_userid: that.$cookies.get("zz_userid"),
                    client_type: 1,
                    username: that.$route.query.username
                };
            that.showLoading = true;
            if (type == "del") {
                //取消订单
                jsonValue.operation = "del";
            } else if (type == "refund") {
                //退款
                jsonValue.operation = "refund";
                let req = {};
                if(that.refundMethod != ''){
                    req.return_accounts = that.refundMethod.method;
                    // 银行卡
                    if(that.refundMethod.method == 1){
                        if(that.refundMethod.bankInfo.length == 0){
                            Hint.Msg({
                                message: that.orderListInfo.tips.qingxuanze + that.orderListInfo.tips.dingdanjinetuihuizhi
                            })
                            return false;
                        }else{
                            req.return_bank = that.refundMethod.bankInfo[that.refundIndex].bank;
                            req.return_number = that.refundMethod.bankInfo[that.refundIndex].receivable;
                            req.return_name = that.refundMethod.bankInfo[that.refundIndex].name;
                        }
                    }
                }
                req.other_description = Number(this.numReson) + 1;
                req.description = this.describe;
                jsonValue.req = JSON.stringify(req);
            }
            orderHandle(jsonValue)
                .then(res => {
                    // Hint.Msg({
                    //     message: res.msg
                    // })
                    that.showLoading = false;
                    that.showModal = false;
                    that.refundConfim = 0;
                    that.orderList = [];
                    that.page = 1;
                    that.orderListFun(that.state,type);
                    if (type == "del") {
                        that.$F.Response({
                            url: "dom/sc_order.php",
                            param: {
                                username: that.$route.query.username,
                                apiUse: 1,
                                orderId: that.buyCancelId
                            },
                            success: res => {},
                            error: err => {}
                        });
                    }
                })
                .catch(err => {
                    that.showLoading = false;
                    that.showModal = false;
                    //弹出警示信息
                    Hint.Alert({
                        message: err.msg
                    }).then(() => {
                        that.refundConfim = 0;
                        that.orderList = [];
                        that.page = 1;
                        that.orderListFun(that.state);
                    });
                });
        },

        hideModal() {
            this.showModal = false;
            this.refundConfim = 0;
        },

        changeTextarea() {
            this.textareState = !this.textareState;
        },
        textareaFocus() {
            this.textareState = true;
            this.textareState2 = true;
        },
        textareaBlur() {
            this.textareState = !this.textareState;
            this.textareState2 = false;
        },
        /**
         * 关闭订单弹窗
         */
        no_show() {
            this.showModal = false;
            this.refundConfim = 0;
        },
        /**
         * 取消订单原因
         */
        click(type) {
            this.refundStatus = type;
            this.$refs.customDate.showCustom();
        },
        closePayWay() {
            this.$refs.customDate.maskClickHidden();
        },
        // 申请退款
        changeStore(type, index) {
            // 订单金额退回至
            if (type == 1) {
                for (let i in this.bankInfo) {
                    if (index == i) {
                        this.refundIndex = index;
                        this.bankInfo[index].is_check = 1;
                        this.$refs.customDate.maskClickHidden();
                    } else {
                        this.bankInfo[i].is_check = 0;
                    }
                }
                return false;
            }
            // 取消订单原因
            if (type == 2) {
                for (let i in this.cancel_reason) {
                    if (index == i) {
                        this.numReson = index;
                        this.cancel_reason[index].is_check = 1;
                        this.$refs.customDate.maskClickHidden();
                    } else {
                        this.cancel_reason[i].is_check = 0;
                    }
                }
            }
            this.$forceUpdate();
        },

        // 色系接口
        getColorFun() {
            let that = this;
            getColor({ username: this.$route.query.username }).then(res => {
                that.bgcColor1 = util.functions.newColor(res.color).bgcColor1;
            });
        },

        // 页面跳转
        navagatePage(type, val, val2, val3, val4, val5) {
            let req = {
                    type: 1
                },
                that = this;
            if (val && that.getArrSecond(val)[0] == "orderid") {
                var orderId = that.getArrSecond(val)[1];
            }

            if (val && that.getArrSecond(val)[0] == "buyindex") {
                var buyIndex = that.getArrSecond(val)[1];
            }
            if (val2 && that.getArrSecond(val2)[0] == "price") {
                var price = that.getArrSecond(val2)[1];
            }
            if (val2 && that.getArrSecond(val2)[0] == "proid") {
                var proid = that.getArrSecond(val2)[1];
            }
            if (val2 && that.getArrSecond(val2)[0] == "buyindex") {
                var buyIndex = that.getArrSecond(val)[1];
            }
            if (type == 7) {
                var img = val2;
            }
            if (val3 && that.getArrSecond(val3)[0] == "detailid") {
                var detailId = that.getArrSecond(val3)[1];
            }
            if (val4 && that.getArrSecond(val4)[0] == "buyindex") {
                var buyIndex = that.getArrSecond(val4)[1];
            }
            if (val5 && that.getArrSecond(val5)[0] == "partygoods") {
                var partygoods = that.getArrSecond(val5)[1];
            }

            switch (Number(type)) {
                case 0: // 去支付
                    // this.$router.push({
                    //     path: "/order/orderRelated/orderDetail",
                    //     query: {
                    //         orderId: orderId,
                    //         username: this.$route.query.username
                    //     }
                    // });
                    location.href =
                        "//" +
                        document.domain +
                        `/dom/sc_order_detail.php?id=${orderId}&username=${this.$route.query.username}&wap=1`;
                    break;
                case 2: // 申请退款
                    this.showModal = true;
                    // 1是普通订单 2是供应链订单
                    this.refundConfim = true ? 1 : 2;
                    this.cancelModel = false;
                    this.buyCancelId = orderId;
                    break;
                case 3: // 商品申请售后
                    if (this.orderList[buyIndex].pro_info.pro_list.length == 1) {
                        // 供应链
                        if (partygoods == 1) {
                            this.$router.push({
                                path: "/order/orderRelated/jdAfterType",
                                query: {
                                    jdStatus: 1,
                                    detailId: detailId,
                                    orderId: orderId,
                                    proid: proid,
                                    username: this.$route.query.username
                                }
                            });
                        } else {
                            this.$router.push({
                                path: "/order/orderRelated/returnGoods",
                                query: {
                                    detailId: detailId,
                                    orderId: orderId,
                                    redirect: "orderList",
                                    username: this.$route.query.username
                                }
                            });
                        }
                    } else {
                        this.$router.push({
                            path: "/order/orderRelated/afterSalesList",
                            query: {
                                detailId: detailId,
                                orderId: orderId,
                                username: this.$route.query.username
                            }
                        });
                        this.$cookies.set("afterSales_state", 0);
                    }
                    break;
                case 4:
                    if (this.orderList[buyIndex].order_type == 34) {
                        location.href =
                            "//" +
                            document.domain +
                            "/wap/hotel/comment.php?username=" +
                            this.$route.query.username +
                            "&order_id=" +
                            orderId;
                        return false;
                    } else {
                        //晒单评价
                        if (util.functions.ifHaveFun(detailId)) {
                            this.$router.push({
                                path: "/order/orderRelated/evaluation",
                                query: {
                                    detailId: detailId,
                                    orderId: orderId,
                                    req: JSON.stringify(req),
                                    is_add: 0,
                                    orderValue: 1,
                                    state: this.state,
                                    username: this.$route.query.username
                                }
                            });
                        } else {
                            this.$router.push({
                                path: "/order/orderRelated/evaluationList",
                                query: {
                                    orderId: orderId,
                                    req: JSON.stringify(req),
                                    username: this.$route.query.username
                                }
                            });
                        }
                    }

                    break;
                case 5:
                    //加入购物车||商品详细||点餐
                    let typeValue = this.orderList[buyIndex].pro_info.repurchase_info.type;
                    if (typeValue == 1) {
                        this.shoppingCatFun(buyIndex);
                    } else if (typeValue == 2) {
                        location.href =
                            "//" +
                            document.domain +
                            "/" +
                            this.$route.query.username +
                            "/wap_pro/" +
                            this.orderList[buyIndex].pro_info.repurchase_info.pro_id +
                            ".html";
                    }
                    break;
                case 6:
                    //查看物流
                    this.$router.push({
                        path: "/order/orderRelated/orderRecord",
                        query: {
                            id: orderId,
                            username: this.$route.query.username
                        }
                    });
                    break;
                case 7:
                    //订单二维码
                    let url = location.origin + img;
                    this.imgSrc = url;
                    break;
                case 8:
                    location.href =
                        "//" +
                        document.domain +
                        "/wap/hotel/comment.php?is_add=1&username=" +
                        this.$route.query.username +
                        "&order_id=" +
                        orderId;
                    break;
                case 9:
                    //上传附件
                    location.href =
                        "//" +
                        document.domain +
                        "/wap/wap_up_order.php?username=" +
                        this.$route.query.username +
                        "&order_id=" +
                        orderId +
                        "&wap=1";
                    break;
            }
        },
        // 加入购物车
        shoppingCatFun(index) {
            let that = this,
                proList = that.orderList[index].pro_info.pro_list;
            that.showLoading = true;

            let paramValue,
                add_pro_info_json = {},
                add_pro_info_id,
                add_pro_info_id2 = "";
            for (let i in proList) {
                add_pro_info_id = proList[i].pro_id + "_" + proList[i].param_id;
                add_pro_info_id2 = add_pro_info_id2 + proList[i].pro_id + "_" + proList[i].param_id + ",";
                add_pro_info_json[add_pro_info_id] = {num : proList[i].num};
            }
            add_pro_info_id2 = add_pro_info_id2.substring(0, add_pro_info_id2.length - 1);
            // 购物车列表
            paramValue = {
                type: 1,
                ids: add_pro_info_id2,
                check: 1,
                add_pro_info: JSON.stringify(add_pro_info_json),
                xcx_req: 1,
                is_addtocar: 1,
                user_user_id: that.$cookies.get("zz_userid"),
                client_type: 1,
                username: that.$route.query.username
            };
            that.$F.Response({
                url: "mallorder/api/cart.php",
                param: paramValue,
                success: res => {
                    that.showLoading = false;
                    location.href = "//" + document.domain + "/V/shoppingCat?username=" + that.$route.query.username;
                },
                error: err => {
                    that.showLoading = false;
                }
            });
        },
        // 跳转商铺
        shopMallFun(nojump, id, shopsChannelId) {
            // 供应链的商铺 等于1不能跳转
            if (id > 0 && nojump != 1) {
                location.href =
                    "//" +
                    document.domain +
                    `/wap/shops/shop.php?username=${this.$route.query.username}&channel_id=${shopsChannelId}&u_u_id=${id}&wap=1`;
            }
        },

        // 跳转订单详情
        goOrderdetail(type, id) {
            if (type == 34) {
                //酒店订单
                location.href =
                    "//" +
                    document.domain +
                    `/wap/hotel/order.php?order_id=${id}&username=${this.$route.query.username}&wap=1`;
            } else {
                // this.$router.push({
                //     path: "/order/orderRelated/orderDetail",
                //     query: {
                //         orderId: id,
                //         username: this.$route.query.username
                //     }
                // });
                location.href =
                    "//" +
                    document.domain +
                    `/dom/sc_order_detail.php?id=${id}&username=${this.$route.query.username}&wap=1`;
            }
        },

        // 取消订单描述
        describeInput(value) {
            this.describe = value;
        },

        //确认收货
        okShouhuo(id) {
            var that = this;
            return Hint.Confirm({
                title: that.orderListInfo.tips.querenshouhuo,
                message: that.orderListInfo.tips.ninquedingquerenshouhuoma
            }).then(() => {
                that.showLoading = true;
                that.$F.Response({
                    url: "xiaochengxu/order/order_shouhuo.php",
                    param: {
                        id: id,
                        username: that.$route.query.username,
                        zz_userid: that.$cookies.get("zz_userid"),
                        curl_request_host: document.domain,
                        client_type: 1
                    },
                    success: res => {
                        that.showLoading = false;
                        if (res.data == -1) {
                            Hint.Alert({
                                title: that.orderListInfo.tips.tishi,
                                message: that.orderListInfo.tips.canshuyouwu
                            });
                        } else if (res.data == 0) {
                            Hint.Alert({
                                title: that.orderListInfo.tips.tishi,
                                message: that.orderListInfo.tips.fuwuqifanmang
                            });
                        } else if (res.data == 1) {
                            Hint.Alert({
                                title: that.orderListInfo.tips.tishi,
                                message: that.orderListInfo.tips.nindedingdanbunengquerenshouhuo
                            });
                        } else {
                            Hint.Alert({
                                title: that.orderListInfo.tips.tishi,
                                message: that.orderListInfo.tips.querenshouhuochenggong
                            }).then(() => {
                                that.showModal = false;
                                that.orderList = [];
                                that.page = 1;
                                that.orderListFun(that.state);
                            });
                        }
                    },
                    error: err => {
                        that.showLoading = false;
                    }
                });
            });
        },

        /**
         * 取消订单原因选择
         */
        switchTab(index) {
            this.numReson = parseInt(index);
            this.hiddenName = false;
        },
        noMove() {
            return false;
        },
        fuwuFun(type) {
            // 跳转服务订单
            if (type == 1) {
                location.href =
                    "//" + document.domain + "/wap/reservation_list.php?username=" + this.$route.query.username;
            } else if (type == 2) {
                // 申请退款添加银行卡
                location.href =
                    "//" +
                    document.domain +
                    `/dom/fx_bank_add.php?username=${this.$route.query.username}&this_type=0&isCenter=1&wap=1&bank=1`;
            }
        },
        // 将字符串根据=分开为数组
        getArrSecond(data) {
            return data.split("=");
        },
        // 点击空白处关闭弹窗
        closeCon() {
            if (util.functions.ifHaveFun(this.orderList)) {
                for (let i in this.orderList) {
                    this.orderList[i].bm_status = false;
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/pages/order/assets/css/orderList.scss";
@import "../../../../assets/fonts/order/duihao/iconfont.css";
</style>

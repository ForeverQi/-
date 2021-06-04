<!--
 * @Author       : zhouqi
 * @description  : 订单详情页
 * @Date         : 2020-11-05 19:14:09
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-06-02 15:35:32
 * @FilePath     : /vue-VFrontend/src/pages/order/views/orderRelated/orderDetail.vue
-->
<template>
    <div class="orderDetail-box">
        <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" />
        <div class="orderDetail">
            <div
                class="wrapper"
                v-if="pro_info != ''"
                v-wechat-title="($route.meta.title = detailInfo.tips.wodedingdan)"
            >
                <Nav :numerical="5" :tips="detailInfo.tips" :newColor="bgcColor1" />
                <div class="wrapper_c">
                    <div class="wrapper_bg">
                        <div class="wrapper_bg_c"></div>
                    </div>
                    <!-- 骑手配送地图 -->
                    <distributionMap :mapJson="mapJson" @daDaData="daDaDataFun" @refureFun="ddRefureFun" v-if="detailInfo.head_info && detailInfo.head_info.ps_state == 11"></distributionMap>
                    <div class="Max_Center">
                        <!-- 等待付款 -->
                        <div
                            class="state_head"
                            :style="{ background: bgcColor1,paddingBottom : detailInfo.address_info != '[]' && detailInfo.address_info != '' &&(detailInfo.head_info.pick_up_code == '' || detailInfo.head_info.pick_up_code == undefined || detailInfo.head_info.pick_up_code == null) ? '' : '0.22rem'  }"
                            v-if="detailInfo.head_info && detailInfo.head_info.type == 0"
                        >
                            <!-- <div class="bg">
                                <img
                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_bg.png"
                                />
                            </div> -->
                            <div class="state_head_c">
                                <div class="wait">
                                    <div class="wait_img">
                                        <img
                                            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_time.png"
                                        />
                                    </div>
                                    <div class="wait_txt">{{ detailInfo.head_info.title }}</div>
                                </div>
                                <div class="wait_time" v-if="detailInfo.head_info && detailInfo.head_info.content">
                                    <span v-for="(item, index) in detailInfo.head_info.content" :key="index">
                                        <span style="margin-right:0.22rem;" v-if="item.type == 'pay'"
                                            >{{ item.name }} {{ detailInfo.currency_symbol
                                            }}<span style="font-size:0.34rem;">{{ item.val }}</span></span
                                        >
                                        <span v-if="item.type == 'time'"
                                            >{{ item.name }} {{ allimeJson.hours }}{{ detailInfo.tips.xiaoshi
                                            }}{{ allimeJson.minutes }}{{ detailInfo.tips.fenzhong }}</span
                                        >
                                        <!-- <span style="display:inline-block;width:34rpx;">{{allimeJson.seconds}}</span> -->
                                    </span>
                                </div>
                                <div
                                    class="wait_a"
                                    @click="infoBtn('pay')"
                                    :style="{ color: bgcColor1 }"
                                    v-if="detailInfo.head_info.button_info"
                                >
                                    {{ detailInfo.head_info.button_info }}
                                </div>
                            </div>
                            <div
                                class="bg_color"
                                v-if="
                                    detailInfo.deliveryId != -1 &&
                                        detailInfo.deliveryId != -2 &&
                                        detailInfo.deliveryId != -3
                                "
                            ></div>
                        </div>
                        <div>
                            <div v-if="detailInfo.head_info && detailInfo.head_info.type == 1 && detailInfo.deliveryId != -3">
                                <!-- 正在出库开始 -->
                                <div
                                    class="state_head1"
                                    :style="{ background: bgcColor1 }"
                                    v-if="detailInfo.head_info.ps_state == 1 && detailInfo.head_info.pick_up_code == ''"
                                >
                                    <div class="bg">
                                        <img
                                            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_bg.png"
                                        />
                                    </div>
                                    <div class="state_head_c" style="padding-bottom:0.6rem;">
                                        <div class="wait1">
                                            <div class="wait_img1">
                                                <img
                                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_logistics1.png"
                                                />
                                            </div>
                                            <div class="wait_txt">{{ detailInfo.head_info.title }}</div>
                                        </div>
                                        <div class="wait_time">
                                            {{ detailInfo.head_info && detailInfo.head_info.content }}
                                        </div>
                                    </div>
                                    <div
                                        class="bg_color"
                                        v-if="
                                            detailInfo.deliveryId != -1 &&
                                                detailInfo.deliveryId != -2 &&
                                                detailInfo.deliveryId != -3
                                        "
                                    ></div>
                                </div>
                                <!-- 正在派送开始 -->
                                <div
                                    class="state_head"
                                    :style="{ background: bgcColor1 }"
                                    v-if="
                                        (detailInfo.head_info.ps_state == 2 ||
                                            detailInfo.head_info.ps_state == 3 ||
                                            detailInfo.head_info.ps_state == 4 ||
                                            detailInfo.head_info.ps_state == 5) &&
                                            detailInfo.head_info.pick_up_code == ''
                                    "
                                >
                                    <div class="bg">
                                        <img
                                            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_bg.png"
                                        />
                                    </div>
                                    <div class="state_head_c">
                                        <div class="wait">
                                            <div class="wait_img2">
                                                <img
                                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_logistics2.png"
                                                />
                                            </div>
                                            <div class="wait_txt">{{ detailInfo.head_info.title }}</div>
                                        </div>
                                        <div class="wait_time">
                                            <span>{{ detailInfo.head_info && detailInfo.head_info.content }}</span>
                                        </div>
                                        <div
                                            class="wait_a1"
                                            @click.stop="infoBtn('logistics')"
                                            v-if="detailInfo.head_info.button_info != ''"
                                        >
                                            {{ detailInfo.tips.chakanxiangqing }}
                                        </div>
                                    </div>
                                    <div
                                        class="bg_color"
                                        v-if="
                                            detailInfo.deliveryId != -1 &&
                                                detailInfo.deliveryId != -2 &&
                                                detailInfo.deliveryId != -3
                                        "
                                    ></div>
                                </div>
                                <!-- 待提货开始 -->
                                <div
                                    class="state_head2"
                                    v-if="detailInfo.head_info.pick_up_code != ''"
                                    :style="{ height: '4.1rem', background: bgcColor1 }"
                                >
                                    <div class="bg" style="bottom:0;">
                                        <img
                                            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_bg.png"
                                        />
                                    </div>
                                    <div class="tihuo_title">
                                        <span style="font-size:0.56rem;font-weight:bold;">{{
                                            detailInfo.head_info.pick_up_code
                                        }}</span>
                                        <span>{{ detailInfo.tips.tihuoma }}</span>
                                    </div>
                                    <div class="state_head_c1">
                                        <div class="Take">
                                            <div class="Take_txt1">{{ detailInfo.tips.daitihuo }}</div>
                                            <div class="Take_txt2">
                                                {{ detailInfo.tips.qingchushinindedingdanerweima }}
                                            </div>
                                        </div>
                                        <div
                                            class="ewm"
                                            @click.stop="dowLoadImg(orderMaData)"
                                            style="position:relative;z-index:10;"
                                        >
                                            <div class="ewm_img">
                                                <img v-if="orderMaData != ''" :src="orderMaData" /><img
                                                    wx:else
                                                    style="width:20%;height:20%;"
                                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/community/loading-wait-bg.gif"
                                                />
                                            </div>
                                            <!-- <div class="ewm_img" wx:else style="width:20%;height:20%;"></div> -->
                                            <div class="ewm_txt">{{ detailInfo.tips.dingdanerweima }}</div>
                                        </div>
                                    </div>
                                    <div
                                        class="bg_color"
                                        v-if="
                                            pick_up_info != '' &&
                                                detailInfo.deliveryId != -1 &&
                                                detailInfo.deliveryId != -2 &&
                                                detailInfo.deliveryId != -3
                                        "
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <!-- 2-已完成开始,3-已取消 -->
                        <div
                            class="state_head2"
                            :style="{
                                height:
                                    detailInfo.head_info &&
                                    detailInfo.head_info.button_info != '' &&
                                    detailInfo.head_info.type == 2
                                        ? '3.40rem'
                                        : detailInfo.head_info.type == 2 && detailInfo.head_info.content
                                        ? '2.48rem'
                                        : '2.04rem;',
                                background: bgcColor1
                            }"
                            v-if="
                               (detailInfo.head_info.type == 2 || detailInfo.head_info.type == 3) && detailInfo.deliveryId != -2 && detailInfo.deliveryId != -3
                            "
                        >
                            <!-- <div class="bg">
                                <img
                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_bg.png"
                                />
                            </div> -->
                            <div class="state_head_c2">
                                <div class="OK_view">
                                    <div class="OK_img" v-if="detailInfo.head_info && detailInfo.head_info.type == 2">
                                        <img
                                            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_OK.png"
                                        />
                                    </div>
                                    <div
                                        class="OK_txt"
                                        :style="{
                                            marginBottom:
                                                detailInfo.head_info &&
                                                detailInfo.head_info.button_info != '' &&
                                                detailInfo.head_info.type == 2
                                                    ? '0.3rem'
                                                    : ''
                                        }"
                                    >
                                        {{ detailInfo.head_info.title }}
                                    </div>
                                    <!-- 查看详情按钮 -->
                                    <div
                                        class="wait_a1"
                                        style="clear:both;"
                                        @click.stop="infoBtn('logistics')"
                                        v-if="
                                            detailInfo.head_info &&
                                                detailInfo.head_info.button_info != '' &&
                                                detailInfo.head_info.type == 2
                                        "
                                    >
                                        {{ detailInfo.tips.chakanxiangqing }}
                                    </div>
                                </div>
                                <div
                                    v-if="
                                        detailInfo.head_info &&
                                            detailInfo.head_info.type == 2 &&
                                            detailInfo.head_info.content
                                    "
                                    style="text-align:center;color:#fff;margin-top:0.1rem;"
                                >
                                    {{ detailInfo.head_info.content }}
                                </div>
                            </div>
                            <div
                                class="bg_color"
                                v-if="
                                    detailInfo.deliveryId != -1 &&
                                        detailInfo.deliveryId != -2 &&
                                        detailInfo.deliveryId != -3 &&
                                        ((detailInfo.address_info != '[]' && detailInfo.address_info != '') ||
                                            pick_up_info != '')
                                "
                            ></div>
                        </div>

                        <!-- 同城配送订单顶部信息 -->
                        <div
                            v-if="
                                (detailInfo.deliveryId == -3 && detailInfo.head_info.type !=0) ||
                                    (detailInfo.deliveryId == -2 && detailInfo.head_info.type != 0 &&
                                        detailInfo.head_info.ps_state != 11)
                            "
                        >
                            <div class="state_head1" :style="{ background: bgcColor1, paddingBottom: 0 }">
                                <div
                                    class="state_head_c"
                                    :style="{
                                        paddingBottom:
                                            detailInfo.deliveryId == -1 ||
                                            detailInfo.deliveryId == -2 ||
                                            detailInfo.deliveryId == -3
                                                ? '0.40rem'
                                                : '0.60rem'
                                    }"
                                >
                                    <div class="wait1 wait2" @click="getDaDaOrderProgressFun">
                                        <div class="wait_txt">{{ detailInfo.head_info.title }}</div>
                                        <i
                                            style="font-size: 0.30rem;font-weight: bold;"
                                            class="sjzs-icon s-icon-right-1"
                                            v-if="detailInfo.head_info.dadaOrderNo != ''"
                                        ></i>
                                    </div>
                                    <div
                                        class="wait_time"
                                        style="font-size: 0.28rem;font-weight: 400;"
                                        v-if="detailInfo.head_info.content"
                                    >
                                        {{ detailInfo.head_info.content }}
                                    </div>
                                </div>
                                <div
                                    class="bg_color"
                                    v-if="
                                        detailInfo.deliveryId != -1 &&
                                            detailInfo.deliveryId != -2 &&
                                            detailInfo.deliveryId != -3
                                    "
                                ></div>
                            </div>
                        </div>

                        <div class="transformClass">
                            <!-- 到点自提 -->
                            <div
                                class="company"
                                style="padding-top:0;border-top-left-radius:0;border-top-right-radius:0; flex-direction: column;"
                                v-if="pick_up_info != ''"
                            >
                                <div class="company_phone">
                                    <div class="com_page" style="flex:none;">{{ detailInfo.tips.daodianziti }}</div>
                                    <div class="com_shop_name">{{ detailInfo.pick_up_info.point_name }}</div>
                                    <div class="com_phone" style="flex:none;">
                                        <a :href="'tel:' + pick_up_info.mobile"
                                            ><img
                                                src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_phone.png"
                                        /></a>
                                    </div>
                                </div>
                                <div class="com_add">
                                    <div class="com_add_txt1">
                                        {{ detailInfo.tips.tuanzhang }}：{{ detailInfo.pick_up_info.name }}
                                    </div>
                                    <div class="com_add_txt1">
                                        {{ detailInfo.tips.tuanzhangdianhua }}：{{ detailInfo.pick_up_info.mobile }}
                                    </div>
                                    <div class="com_add_txt1" v-if="detailInfo.pick_up_info.pick_up_address != ''">
                                        {{ detailInfo.tips.tihuodizhi }}：{{ detailInfo.pick_up_info.pick_up_address }}
                                    </div>
                                    <div class="com_add_txt1" v-if="detailInfo.pick_up_info.pick_up_time != ''">
                                        {{ detailInfo.tips.zitishijian }}：{{ detailInfo.pick_up_info.pick_up_time }}
                                    </div>
                                    <div
                                        class="com_add_txt1"
                                        v-if="
                                            detailInfo.pick_up_info.order_people_name != '' &&
                                                detailInfo.pick_up_info.order_people_name != null
                                        "
                                    >
                                        {{ detailInfo.tips.yuliuxingming }}：{{
                                            detailInfo.pick_up_info.order_people_name
                                        }}
                                    </div>
                                    <div
                                        class="com_add_txt1"
                                        v-if="
                                            detailInfo.pick_up_info.order_tel != '' &&
                                                detailInfo.pick_up_info.order_tel != null
                                        "
                                    >
                                        {{ detailInfo.tips.yuliudianhua }}：{{ detailInfo.pick_up_info.order_tel }}
                                    </div>
                                </div>
                            </div>
                            <!-- 达达订单 -->
                            <!---1为自提 -2为同城-->
                            <div
                                class="ddOrder_box"
                                v-if="
                                    detailInfo.deliveryId == -1 ||
                                        detailInfo.deliveryId == -2 ||
                                        detailInfo.deliveryId == -3
                                "
                            >
                                <!-- 达达订单背景色 -->
                                <div
                                    class="newDetail_bgc"
                                    v-if="detailInfo.head_info.ps_state != 11"
                                    :style="{
                                        background:
                                            'linear-gradient(to bottom,' + bgcColor1 + ',rgba(255, 255, 255, 0.1))'
                                    }"
                                ></div>
                                <!-- 同城配送订单 -->
                                <div
                                    class="ddOrder"
                                    v-if="detailInfo.deliveryId == -2 || detailInfo.deliveryId == -3"
                                    :style="{ boxShadow: detailInfo.head_info.ps_state == 11 ? '0rem 0.16rem 0.24rem #ddd' : ''}"
                                >
                                    <div
                                        class="ddOrder_top"
                                        :style="{ background: bgcColor5 }"
                                        v-if="detailInfo.head_info.ps_state != 11"
                                    >
                                        <span style="">{{ detailInfo.tips.peisongxinxi }}</span>
                                    </div>
                                    <!-- 骑手正在配送中的顶部样式有改变 -->
                                    <div
                                        class="ddOrder_top"
                                        style="background : #fafafa;padding-top: 0rem;"
                                        v-else
                                    ></div>
                                    <div class="ddOrder_bottom">
                                        <div
                                            class="ddOrder_father"
                                            v-for="(itemHead, indexHead) in detailInfo.head_info.extendInfo"
                                            :key="indexHead"
                                        >
                                            <div class="ddOrder_child" v-if="indexHead == 'deliveryMode'">
                                                <div class="ddc_left">
                                                    <i class="sjzs-icon s-icon-peisong-1"></i>
                                                    <span>{{ itemHead.title }}</span>
                                                </div>
                                                <div class="ddc_right">
                                                    <span>{{ itemHead.val }}</span>
                                                </div>
                                            </div>
                                            <div class="ddOrder_child" v-if="indexHead == 'deliveryTime'">
                                                <div class="ddc_left">
                                                    <i class="sjzs-icon s-icon-shijian-1"></i>
                                                    <span>{{ itemHead.title }}</span>
                                                </div>
                                                <div class="ddc_right">
                                                    <span>{{ itemHead.val }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ddOrder_child ddOrder_child2" v-if="detailInfo.address_info">
                                            <div class="ddc_left">
                                                <i class="sjzs-icon s-icon-weizhi-1"></i>
                                            </div>
                                            <div class="ddc_right2" style="margin-left: 0.16rem;">
                                                <div style="margin-bottom: 0.08rem;">
                                                    {{ detailInfo.address_info.address }}
                                                </div>
                                                <div>
                                                    <span>{{ detailInfo.address_info.name }}</span>
                                                    <span
                                                        style="color: #dbdbdb;width:1px;margin-left:0.10rem;margin-right: 0.10rem;"
                                                        >|</span
                                                    >
                                                    <span>{{ detailInfo.address_info.tel }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="ddOrder_child ddOrder_qs"
                                            @click="telClick"
                                            v-if="detailInfo.head_info && detailInfo.head_info.ps_state == 11"
                                        >
                                            <div>
                                                <img
                                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_VFrontend/qsContact.png"
                                                    alt=""
                                                />
                                                <span>联系骑手</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 到店自提订单 -->
                                <div
                                    class="ddOrder"
                                    v-if="
                                        detailInfo.deliveryId == -1 &&
                                            detailInfo.head_info &&
                                            detailInfo.head_info.extendInfo
                                    "
                                >
                                    <div class="ddOrder_bottom">
                                        <div
                                            v-for="(itemHead, indexHead) in detailInfo.head_info.extendInfo"
                                            :key="indexHead"
                                            class="ddOrder_father"
                                        >
                                            <!-- 提货码 -->
                                            <div class="ddOrder_child" v-if="indexHead == 'code'">
                                                <div class="ddc_left">
                                                    <i class="sjzs-icon s-icon-tihuoxinxi-1"></i>
                                                    <span>{{ itemHead.title }}</span>
                                                </div>
                                                <div class="ddc_right" @click="thmShow = true">
                                                    <i class="sjzs-icon s-icon-erweima-1"></i>
                                                    <span>{{ itemHead.val }}</span>
                                                    <i class="sjzs-icon s-icon-right-1"></i>
                                                </div>
                                            </div>
                                            <!-- 提货人 -->
                                            <div class="ddOrder_child" v-if="indexHead == 'name'">
                                                <div class="ddc_left">
                                                    <i class="sjzs-icon s-icon-gerenkehuguanli-1"></i>
                                                    <span>{{ itemHead.title }}</span>
                                                </div>
                                                <div class="ddc_right">
                                                    <span>{{ itemHead.val }}</span>
                                                </div>
                                            </div>
                                            <!-- 手机号码 -->
                                            <div class="ddOrder_child" v-if="indexHead == 'tel'">
                                                <div class="ddc_left">
                                                    <i class="sjzs-icon s-icon-tel-2"></i>
                                                    <span>{{ itemHead.title }}</span>
                                                </div>
                                                <div class="ddc_right">
                                                    <span>{{ itemHead.val }}</span>
                                                </div>
                                            </div>
                                            <!-- 提货时间 -->
                                            <div class="ddOrder_child" v-if="indexHead == 'time'">
                                                <div class="ddc_left">
                                                    <i class="sjzs-icon s-icon-shijian-1"></i>
                                                    <span>{{ itemHead.title }}</span>
                                                </div>
                                                <div class="ddc_right">
                                                    <span>{{ itemHead.val }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="ddOrder_child"
                                            v-if="
                                                detailInfo.pro_info &&
                                                    detailInfo.pro_info.group_info &&
                                                    Object.keys(detailInfo.pro_info.group_info).length == 1
                                            "
                                            style="align-items: flex-start;"
                                        >
                                            <div class="ddc_left">
                                                <i class="sjzs-icon s-icon-weizhi-1"></i>
                                                <span>{{ detailInfo.tips.tihuodizhi }}</span>
                                            </div>
                                            <div
                                                class="ddc_right ddc_way"
                                                @click="
                                                    openDT(
                                                        detailInfo.pro_info.group_info[
                                                            Object.keys(detailInfo.pro_info.group_info)[0]
                                                        ].storeInfo.name,
                                                        detailInfo.pro_info.group_info[
                                                            Object.keys(detailInfo.pro_info.group_info)[0]
                                                        ].storeInfo.address,
                                                        detailInfo.pro_info.group_info[
                                                            Object.keys(detailInfo.pro_info.group_info)[0]
                                                        ].storeInfo.lng,
                                                        detailInfo.pro_info.group_info[
                                                            Object.keys(detailInfo.pro_info.group_info)[0]
                                                        ].storeInfo.lat
                                                    )
                                                "
                                            >
                                                <div class="ddc_child">
                                                    <div>
                                                        {{
                                                            detailInfo.pro_info.group_info[
                                                                Object.keys(detailInfo.pro_info.group_info)[0]
                                                            ].shops_name
                                                        }}
                                                    </div>
                                                    <div>
                                                        <!-- <span :style="{color:cssColor}">{{detailInfo.pro_info.group_info[Object.keys(detailInfo.pro_info.group_info)[0]].storeInfo.distanceInfo}}</span> -->
                                                        <i class="sjzs-icon s-icon-right-1"></i>
                                                    </div>
                                                </div>
                                                <div style="padding-right:0.2rem;">
                                                    <span>{{
                                                        detailInfo.pro_info.group_info[
                                                            Object.keys(detailInfo.pro_info.group_info)[0]
                                                        ].storeInfo.address
                                                    }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 地址电话 -->
                            <div
                                class="company"
                                :style="{
                                   paddingTop:pick_up_info == '' && detailInfo.deliveryId != -1 && detailInfo.deliveryId != -2 && detailInfo.deliveryId != -3 ? 0 : '',borderTopLeftRadius: detailInfo.deliveryId != -1 && detailInfo.deliveryId != -2 && detailInfo.deliveryId != -3 ? 0 : '',borderTopRightRadius: detailInfo.deliveryId != -1 && detailInfo.deliveryId != -2 && detailInfo.deliveryId != -3 ? 0 : ''
                                }"
                                v-if="
                                    detailInfo.deliveryId != -1 && detailInfo.deliveryId != -2 && detailInfo.deliveryId != -3 && detailInfo.address_info != '[]' && detailInfo.address_info!= '' && (detailInfo.head_info.pick_up_code == '' ||detailInfo.head_info.pick_up_code == undefined || detailInfo.head_info.pick_up_code == null)
                                "
                            >
                                <!-- <div class="company_img">
                                    <img
                                        src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_map.png"
                                    />
                                </div> -->
                                <img
                                    class="company_img"
                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_map.png"
                                />
                                <div class="company_R">
                                    <div class="company_txt">
                                        {{ detailInfo.address_info.name }} {{ detailInfo.address_info.tel }}
                                    </div>
                                    <div class="company_txt1">{{ detailInfo.address_info.address }}</div>
                                </div>
                            </div>
                            <!-- 商品信息 -->
                            <div>
                                <div class="shop_li" v-for="(item, index) in pro_info.group_info" :key="index">
                                    <div class="shop_name">
                                        <div
                                            class="home_img"
                                            @click="index > 0 ? shopMallFun(item.no_jump, index) : ''"
                                        >
                                            <img
                                                src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_home.png"
                                            />
                                        </div>
                                        <div
                                            class="home_txt"
                                            @click="index > 0 ? shopMallFun(item.no_jump, index) : ''"
                                        >
                                            {{ item.shops_name }}
                                        </div>
                                        <div class="arrow1" v-if="index > 0 && item.no_jump != 1">
                                            <img
                                                src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_arrow1.png"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        :style="{
                                            marginBottom:
                                                (item.pro_list.length > 1 && proIndex != item.pro_list.length - 1
                                                    ? 0.3
                                                    : 0) + 'rem',
                                            paddingBottom:
                                                (item.pro_list.length > 1 && proIndex != item.pro_list.length - 1
                                                    ? 0.3
                                                    : 0) + 'rem',
                                            borderBottom: proIndex == item.pro_list.length - 1 ? 0 : '1px solid #ededed'
                                        }"
                                        v-for="(proItem, proIndex) in item.pro_list"
                                        :key="proIndex"
                                    >
                                        <div
                                            class="order_center"
                                            style="padding-bottom:0.2rem;"
                                            @click="goDetail(index, proIndex, proItem.proLink)"
                                        >
                                            <div class="shop_img" v-if="proItem.pic"><img :src="proItem.pic" /></div>
                                            <div>
                                                <!-- 标题 -->
                                                <div class="shop_link">
                                                    <div class="shop_link_tit">{{ proItem.name }}</div>
                                                </div>
                                                <!-- 立减 -->
                                                <div class="Discount" style="padding-bottom:0.2rem;">
                                                    <div
                                                        class="Discount_li"
                                                        v-if="proItem.other_info.rebate_info.val > 0"
                                                    >
                                                        <div class="Discount_li_L">{{ detailInfo.tips.jiesheng }}</div>
                                                        <div class="Discount_li_R">
                                                            {{ proItem.other_info.rebate_info.title
                                                            }}{{ detailInfo.currency_symbol }}{{ proItem.pay_price }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- 序列号 -->
                                                <div
                                                    class="shop_link"
                                                    v-if="
                                                        proItem.other_info.pro_serial.val != '' ||
                                                            proItem.other_info.pro_number.val != '' ||
                                                            proItem.other_info.param_info.val != ''
                                                    "
                                                >
                                                    <div
                                                        class="shop_link_txt"
                                                        v-if="proItem.other_info.pro_number.val != ''"
                                                    >
                                                        {{ proItem.other_info.pro_number.title }}
                                                        {{ proItem.other_info.pro_number.val }}
                                                    </div>
                                                    <div
                                                        class="shop_link_txt"
                                                        v-if="proItem.other_info.pro_serial.val != ''"
                                                    >
                                                        {{ proItem.other_info.pro_serial.title
                                                        }}<span> {{ proItem.other_info.pro_serial.val }}</span>
                                                    </div>
                                                    <div
                                                        class="shop_link_txt"
                                                        v-if="proItem.other_info.param_info.val != ''"
                                                    >
                                                        {{ proItem.other_info.param_info.title }}
                                                        {{ proItem.other_info.param_info.val }}
                                                    </div>
                                                </div>
                                                <!-- 商品数量 -->
                                                <div v-if="item.pro_list.length > 1" style="height:0.3rem;">
                                                    <span></span>
                                                </div>
                                                <div
                                                    v-if="item.pro_list.length > 1"
                                                    style="color:#343434;font-size:0.22rem;position:absolute;bottom:0;"
                                                >
                                                    <span>{{ proItem.num_info }}</span>
                                                </div>
                                                <!-- 价格 -->
                                                <span
                                                    class="rightPrice"
                                                    :style="{ top: detailInfo.order_type != 4 ? '' : 0 }"
                                                    >{{ detailInfo.currency_symbol }}{{ proItem.pay_price }}</span
                                                >
                                            </div>
                                        </div>
                                        <!-- 按钮 -->
                                        <div v-if="proItem.pro_button.length" class="proButtonFather">
                                            <aside v-for="(btnItem, btnIndex) in proItem.pro_button" :key="btnIndex">
                                                <div
                                                    class="proButton"
                                                    v-if="
                                                        btnItem.type == 'addevaluate' ||
                                                            btnItem.type == 'evaluate' ||
                                                            btnItem.type == 'application' ||
                                                            btnItem.type == 'download'
                                                    "
                                                >
                                                    <!-- 追加评价 -->
                                                    <span
                                                        @click="navagatePg(1, proItem.id)"
                                                        v-if="btnItem.type == 'addevaluate'"
                                                        >{{ btnItem.name }}</span
                                                    >
                                                    <!-- 晒单评价 -->
                                                    <span
                                                        @click="navagatePg(0, proItem.id)"
                                                        v-if="btnItem.type == 'evaluate'"
                                                        >{{ btnItem.name }}</span
                                                    >
                                                    <!-- 申请售后 -->
                                                    <span
                                                        @click="navagatePg(2, proItem.id, proItem.pro_id)"
                                                        v-if="btnItem.type == 'application'"
                                                        >{{ btnItem.name }}</span
                                                    >
                                                    <!-- 文件下载 -->
                                                    <!-- @click="
                                                        navagatePg(3, btnItem.add_info.path, btnItem.add_info.name)
                                                    " -->
                                                    <a
                                                        :href="doamin + '/' + btnItem.add_info.path"
                                                        :download="btnItem.add_info.name"
                                                        v-if="btnItem.type == 'download' && btnItem.add_info.img != 1"
                                                        >{{ btnItem.name }}</a
                                                    >
                                                    <span
                                                        @click="openImg(btnItem.add_info.path)"
                                                        v-if="btnItem.type == 'download' && btnItem.add_info.img == 1"
                                                    >
                                                        {{ btnItem.name }}
                                                    </span>
                                                </div>
                                            </aside>
                                        </div>
                                    </div>
                                    <div class="order_foot" v-if="detailInfo.order_type != 4">
                                        <span v-if="item.is_send == 1"
                                            >{{ detailInfo.tips.peisongfei }}：{{ detailInfo.currency_symbol
                                            }}{{ item.peisong_money }}</span
                                        >{{ item.num_info }}<span class="text1">{{ detailInfo.currency_symbol }}</span
                                        ><span class="text2">{{ item.group_info_Json.left }}</span
                                        ><span class="text1" style="padding-left:0;"
                                            >.{{ item.group_info_Json.right }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <!-- 订单附件 -->
                            <div class="order_file" v-if="detailInfo.attachmentDownInfo">
                                <div class="order_file_left">{{ detailInfo.attachmentDownInfo.name }}</div>
                                <div class="order_file_right">
                                    <span>{{ detailInfo.attachmentDownInfo.fileName }}</span>
                                    <a
                                        :href="detailInfo.attachmentDownInfo.fileUrl"
                                        :download="detailInfo.attachmentDownInfo.fileName"
                                        >{{ detailInfo.tips.xiazai }}</a
                                    >
                                </div>
                            </div>
                            <div class="order_detail">
                                <aside v-for="(item, index) in detailInfo.related_info" :key="index">
                                    <div class="order_detail_li" v-if="index < 2">
                                        <div class="detail_li_L">{{ item.name }}</div>
                                        <div class="detail_li_R">{{ item.val }}</div>
                                    </div>
                                </aside>
                                <div
                                    class="hiddenData"
                                    v-if="detailInfo.related_info.length > 2"
                                    :style="{
                                        height: (hiddenName ? '0' : box_width) + 'px',
                                        transition: 'all 0.3s linear'
                                    }"
                                >
                                    <div class="hiddenData2">
                                        <!-- 订单编号 -->
                                        <aside v-for="(item, index) in detailInfo.related_info" :key="index">
                                            <div class="order_detail_li" v-if="index > 2">
                                                <div class="detail_li_L">{{ item.name }}</div>
                                                <!-- 支付凭证，文件下载 -->
                                                <a
                                                    class="detail_li_R"
                                                    :href="item.val"
                                                    :download="item.name"
                                                    v-if="item.type == 2"
                                                    >{{ detailInfo.tips.xiazai }}</a
                                                >
                                                <!-- 支付凭证，图片查看 -->
                                                <a
                                                    class="detail_li_R"
                                                    @click="dowLoadImg(item.val)"
                                                    v-else-if="item.type == 1"
                                                    >{{ detailInfo.tips.chakantupian }}</a
                                                >
                                                <!-- 非支付凭证 -->
                                                <div class="detail_li_R" v-else>{{ item.val }}</div>
                                            </div>
                                        </aside>
                                        <!-- 发票信息 -->
                                        <div
                                            v-if="
                                                detailInfo.invoice_info &&
                                                    detailInfo.invoice_info.content != '[]' &&
                                                    detailInfo.invoice_info.content != '' &&
                                                    detailInfo.invoice_info.content != '{}'
                                            "
                                        >
                                            <div style="font-size:0.24rem;font-weight:bold;">
                                                {{ detailInfo.invoice_info.title }}
                                            </div>
                                            <div
                                                class="order_detail_li"
                                                v-for="(item, index) in detailInfo.invoice_info.content"
                                                :key="index"
                                            >
                                                <div class="detail_li_L">{{ item.name }}</div>
                                                <div class="detail_li_R">{{ item.val }}</div>
                                            </div>
                                        </div>

                                        <!-- 文件，图片 -->
                                        <div
                                            v-if="
                                                detailInfo.addform_info &&
                                                    detailInfo.addform_info.content != '[]' &&
                                                    detailInfo.addform_info.content != '' &&
                                                    detailInfo.addform_info.content != '{}'
                                            "
                                        >
                                            <div style="font-size:0.24rem;font-weight:bold;color:#222;">
                                                {{ detailInfo.addform_info.title }}
                                            </div>
                                            <div v-for="(item, index) in detailInfo.addform_info.content" :key="index">
                                                <!-- 2: 文件下载，1：查看图片 -->
                                                <div class="order_detail_li" v-if="item.type == 2">
                                                    <div class="detail_li_L">{{ item.name }}</div>
                                                    <a :href="item.val" class="detail_li_R">
                                                        {{ item.param }}
                                                    </a>
                                                </div>
                                                <div class="order_detail_li" v-else-if="item.type == 1">
                                                    <div class="detail_li_L">{{ item.name }}</div>
                                                    <span class="detail_li_R" @click="dowLoadImg(item.val)">
                                                        {{ item.param }}
                                                    </span>
                                                </div>
                                                <div class="order_detail_li" v-else>
                                                    <div class="detail_li_L">{{ item.name }}</div>
                                                    <div class="detail_li_R">{{ item.val }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="arrow2" @click="click">
                                    <div :class="hiddenName ? 'arrow2_c' : 'arrow5 arrow2_c'">
                                        <img
                                            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_arrow2.png"
                                        />
                                    </div>
                                </div>
                                <!-- 商品金额 -->
                                <div
                                    class="order_detail_li"
                                    v-for="(item, index) in detailInfo.amount_info"
                                    :key="'index' + index"
                                >
                                    <div class="detail_li_L">{{ item.name }}</div>
                                    <div class="detail_li_R">
                                        {{ item.symbols }} {{ detailInfo.currency_symbol }}{{ item.val }}
                                    </div>
                                </div>
                                <div class="payment">
                                    {{ detailInfo.need_pay_info.title
                                    }}<span class="text1">{{ detailInfo.currency_symbol }}</span
                                    ><span class="text2">{{ detailInfo.need_pay_Json.left }}</span
                                    ><span class="text1" style="padding-left:0;"
                                        >.{{ detailInfo.need_pay_Json.right }}</span
                                    >
                                </div>
                            </div>
                            <div class="payment_bottom" v-if="detailInfo.bottom_info && detailInfo.bottom_info.length">
                                <!-- <div class="payment_bottom_L viewChild">申请售后</div> -->
                                <div class="payment_bottom_L"></div>
                                <div class="viewFather">
                                    <div
                                        v-if="detailInfo.button_more && detailInfo.button_more.length"
                                        style="font-size:0.26rem;position:relative;overflow:inherit;"
                                        @click.stop="bm_status = bm_status == false ? true : false"
                                    >
                                        {{ detailInfo.tips.gengduo }}
                                        <span class="moreSpan" v-show="bm_status"></span>
                                        <aside class="button_more" v-show="bm_status">
                                            <ul style="position:relative;">
                                                <li
                                                    v-for="(moreItem, moreIndex) in detailInfo.button_more"
                                                    :key="moreIndex"
                                                >
                                                    <!-- 订单二维码 -->
                                                    <em
                                                        v-if="moreItem.type == 'qrcode'"
                                                        class="navigator1"
                                                        style="border:0 !important;"
                                                        @click="infoBtn('qrcode', moreItem.img)"
                                                    >
                                                        {{ moreItem.name }}
                                                    </em>
                                                    <!-- 申请售后-- -->
                                                    <em
                                                        v-if="moreItem.type == 'application'"
                                                        @click="infoBtn('application', moreItem.img)"
                                                        class="navigator1"
                                                        style="border:0 !important;"
                                                    >
                                                        {{ moreItem.name }}
                                                    </em>
                                                    <em
                                                        v-if="moreItem.type == 'up'"
                                                        class="navigator1"
                                                        style="border:0;"
                                                        @click="infoBtn('up')"
                                                    >
                                                        {{ moreItem.name }}
                                                    </em>
                                                </li>
                                            </ul>
                                        </aside>
                                    </div>
                                    <aside v-for="(item, index) in detailInfo.bottom_info" :key="index">
                                        <div
                                            class="viewChild"
                                            :style="{
                                                borderColor: item.type == 'buy' || item.type == 'pay' ? bgcColor1 : '',
                                                background: item.type == 'pay' ? bgcColor1 : '',
                                                width: item.type == 'qrcode' ? '1.65rem' : ''
                                            }"
                                            @click="infoBtn(item.type, item.img)"
                                            v-if="item.type != 'evaluate'"
                                        >
                                            <!-- 再次购买 -->
                                            <span v-if="item.type == 'buy'" :style="{ color: bgcColor1 }">{{
                                                item.name
                                            }}</span>
                                            <!-- 取消订单 -->
                                            <span v-if="item.type == 'del'">{{ item.name }}</span>
                                            <!-- 去支付 -->
                                            <span v-if="item.type == 'pay'" style="color:#fff;">{{ item.name }}</span>
                                            <!-- 申请退款 -->
                                            <span v-if="item.type == 'refund'">{{ item.name }}</span>
                                            <!-- 查看物流 -->
                                            <span v-if="item.type == 'logistics'">{{ item.name }}</span>
                                            <!-- 确认收货 -->
                                            <span v-if="item.type == 'receipt'">{{ item.name }}</span>
                                            <!-- 申请售后 -->
                                            <span v-if="item.type == 'application'">{{ item.name }}</span>
                                            <!-- 评价晒单 -->
                                            <!-- <div v-if="{{item.type == 'evaluate'}}" >{{item.name}}</div> -->
                                            <!-- 订单二维码 -->
                                            <span v-if="item.type == 'qrcode'">{{ item.name }}</span>
                                            <!-- 上传附件 -->
                                            <span v-if="item.type == 'up'">{{ item.name }}</span>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 蒙版 -->
                <div class="mengban" v-if="dowPicStatus" @click="cloaseMengban">
                    <img :src="dowPic" />
                </div>
                <!-- 弹窗开始 -->
                <div class="alert_bg" v-if="showModal" @click="shadowClose"></div>
                <div class="alert_c" v-if="showModal">
                    <div class="alert_tit" catchtouchmove="noMove" style="margin-bottom:0;">
                        <div class="alert_tit_txt" v-if="cancelModel">{{ detailInfo.tips.quxiaodingdan }}</div>
                        <div class="alert_tit_txt" v-else>{{ detailInfo.tips.shenqingtuikuan }}</div>
                        <div class="Close" @click="shadowClose">
                            <img
                                src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Close.png"
                            />
                        </div>
                    </div>

                    <!-- 申请退款 -->
                    <div class="Reason1" catchtouchmove="noMove" v-if="!cancelModel">
                        <div class="Reason1_left">{{ detailInfo.tips.dingdanjinetuihuizhi }}:</div>
                        <div class="Reason1_right" style="float: right;" v-if="refundMethod.method == 1">
                            <span v-if="refundMethod.bankInfo.length == 0" @click="fuwuFun(2)">{{
                                detailInfo.tips.tianjiayinhangka
                            }}</span>
                            <span @click="fuwuFun(1)" v-else>{{
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
                    <div class="Reason2" @click="click2" v-if="!cancelModel">
                        <div class="Reason1_left" catchtouchmove="noMove">
                            {{ detailInfo.tips.quxiaodingdanyuanyin }}
                        </div>

                        <div class="Reason1_right">
                            {{ cancel_reason[numReson].name }}
                            <div class="arrow3" :class="hiddenName2 == true ? '' : 'arrow4'">
                                <img
                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_arrow3.png"
                                />
                            </div>
                        </div>
                        <div class="Reason_ul" v-show="!hiddenName2">
                            <div
                                class="Reason_li"
                                v-for="(item, index) in cancel_reason"
                                :key="index"
                                @click="switchTab(index)"
                            >
                                <div
                                    class="Reason_or"
                                    :style="{
                                        borderColor: numReson == index ? bgcColor1 : '',
                                        background: numReson == index ? bgcColor1 : ''
                                    }"
                                >
                                    <i style="color:#fff;" class="iconImage iconfont icon-duihao"></i>
                                </div>
                                <div class="Reason_or_txt">{{ item }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="Reason3" catchtouchmove="noMove" v-if="!cancelModel">
                        <spanarea
                            :placeholder="detailInfo.tips.miaoshuneirong"
                            v-model="describe"
                            style="background:rgb(245, 245,245)"
                        ></spanarea>
                        <div class="textareStateClass" v-show="textareState" @click="changeTextarea">
                            {{ describe ? describe : detailInfo.tips.miaoshuneirong }}
                        </div>
                    </div>

                    <!-- 取消订单文案 -->
                    <div class="cancelModel" catchtouchmove="noMove" v-if="cancelModel">
                        {{ detailInfo.tips.shifouquxiaogaidingdan }}
                    </div>
                    <div
                        class="button_a"
                        @click="cancelOrderBtn(cancelModel ? 'del' : 'refund')"
                        catchtouchmove="noMove"
                        :style="{ background: bgcColor1 }"
                    >
                        {{ detailInfo.tips.queren }}
                    </div>
                </div>
                <!-- 无背景色的蒙版 -->
                <div class="noMengbanColor" v-if="payStatus"></div>

                <!-- 二维码弹窗 -->
                <div class="erweima_box" v-if="imgSrc != ''">
                    <div class="erweima">
                        <div class="erweima_top">
                            <img :src="imgSrc" />
                            <span v-if="`$toute.query.username` == 'lxkj_zsc'">{{
                                detailInfo.tips.shangjiaweixinsaoma
                            }}</span>
                            <span v-else-if="`$toute.query.username` == 'ywgshop'">{{
                                detailInfo.tips.tongguoshangjiasaomaqueren
                            }}</span>
                            <span v-else>{{ detailInfo.tips.shiyongshangjiazhushouqueren }}</span>
                        </div>
                        <div class="erweima_bottom" @click.stop="claoseMa">
                            {{ detailInfo.tips.guanbi }}
                        </div>
                    </div>
                </div>

                <!-- 文件下载图片 -->
                <div class="openImgAlert" @click="openImgUrl = ''" v-if="openImgUrl">
                    <img :src="openImgUrl" alt="" />
                    <!-- <img src="http://m.evyun.cn/images/down_demo.jpg" alt=""/> -->
                </div>

                <!--  -->

                <!-- 支付卡、支付方式 -->
                <Popup
                    ref="popupRefs"
                    :popupParam="popupParam"
                    :cluesData="payData.tips"
                    :onlineArr="onlineList"
                    @payMentments="payMentmentsFun(arguments)"
                    @sublitOrderBtn="sublitOrderBtn"
                    v-if="payData != ''"
                />

                <!-- 支付再返回的弹窗 -->
                <div class="payBack" v-if="false && payBackStatus">
                    <p>{{ payBackTitle }}</p>
                    <div @click="reloadFun">{{ payBackContent }}</div>
                    <!-- 货到付款这个按钮不显示 -->
                    <div @click="reloadFun" v-if="isPayStatus">稍候再付</div>
                </div>
                <!-- 单选弹窗(申请退款) -->
                <custon-popup ref="customDate" @closePayWayStore="closePayWay">
                    <div slot="PoperContent" class="changeCityClass">
                        <div class="changeCityBox payWayBox">
                            <div class="changeCityBox_top" style="border-bottom:0;">
                                <div class="changeCityBox_top_left changeCityBox_top_left_heng">
                                    <span v-if="refundStatus == 1">{{ refundMethod.name }}</span>
                                    <span v-if="refundStatus == 2">{{ detailInfo.tips.quxiaodingdanyuanyin }}</span>
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
                                {{ detailInfo.tips.queren }}
                            </div>
                        </div>
                    </div>
                </custon-popup>
            </div>
        </div>
        <!-- 提货码弹窗 -->
        <van-dialog
            v-show="thmShow"
            v-model="thmShow"
            @click="thmShow = false"
            :showConfirmButton="false"
            :close-on-click-overlay="true"
        >
            <div class="thmWarp" v-if="detailInfo && detailInfo.head_info && detailInfo.head_info.extendInfo">
                <div class="thmWarp_box" @click.stop>
                    <div style="width:60%;transform: translateY(-10%);">
                        <img
                            class="thmImage"
                            v-if="detailInfo.head_info.extendInfo.img"
                            :src="protocol + hostNow + detailInfo.head_info.extendInfo.img"
                        />
                        <div
                            style="font-size:0.46rem;font-weight:bold;margin-bottom: 0.10rem;"
                            :style="{ color: bgcColor1 }"
                            v-if="detailInfo.head_info.extendInfo.code"
                        >
                            {{ detailInfo.head_info.extendInfo.code.val }}
                        </div>
                        <div style="font-size: 0.24rem;line-height: 0.40rem;">
                            {{ detailInfo.tips.tihuomatishixinxi }}
                        </div>
                    </div>
                    <div class="thmWarp_btn" @click="thmShow = false" :style="{ color: bgcColor1 }">
                        {{ detailInfo.tips.queren }}
                    </div>
                </div>
            </div>
        </van-dialog>
        <!-- 同城配送进度 -->
        <van-action-sheet v-model="jinduShow">
            <div class="jinduContent" v-if="dadaProgress != ''">
                <div class="jinduTop">
                    <span>{{dadaProgress.tips.peisongxiangqing}}</span>
                </div>
                <div class="jdTime">
                    <van-steps  direction="vertical" :active="0" active-color="#FF9900">
                        <van-step v-for="(item,index) in dadaProgress.progress" :key="index">
							<p class="vanStepProp">
								<span class="vanStepBox" :style="{color: index == 0? '#FF9900' : '',fontWeight: index==0? 'bold' : '',}">{{item.name}}
									<div v-if="item.info.length">
                                        <p style="font-size: 0.24rem;color: #999999;font-weight:400;line-height:0.34rem;" v-for="(itemInfo,indexInfo) in item.info" :key="indexInfo">{{itemInfo}}</p>
                                    </div>
								</span>
								<span style="flex:none;padding-left:0.3rem">{{item.val}}</span>
							</p>
						</van-step>
                    </van-steps>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
import Vue from 'vue';
import { Step, Steps,Dialog } from 'vant';
Vue.use(Step).use(Steps).use(Dialog);
// vant组件
import Hint from "@/plugins/hint";
// 订单详情，分享图,支付方式
import { getOrderDetail, GeneratePublicImg, getPaymentList, setPayment,getDaDaOrderProgress } from "@/api/order/orderDetail.js";
// 购物车列表,确认收货，取消订单
import { cartList, orderShouhuo, orderHandle } from "@/api/order/orderList.js";

// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";
// 支付方式组件
import Popup from "@/pages/order/components/popup.vue";

// 色系
import { getColor } from "@/api/order/submitOrder.js";
// 弹窗插槽组件
import CustomPopup from "@/components/CustomPopup/custompopup.vue";
// 地图组件
import distributionMap from "@/components/distributionMap/distributionMap.vue";



import util from "@/libs/util";
export default {
    components: {
        Nav,
        Popup,
        "custon-popup": CustomPopup,
        distributionMap
    },
    data() {
        return {
            jinduShow:false,
            hostNow: location.host,
            thmShow: false,
            payBackTitle: "订单已提交,等待支付",
            payBackContent: "已支付完成",
            payBackStatus: false,
            popupParam: { num: 2 },
            onlineList: [],
            hiddenName: true,
            pro_info: "",
            showModal: false,
            cancelModel: true,
            hiddenName2: true,
            numReson: 0,
            describe: "",
            textareState: false,
            orderMaData: "",
            imgSrc: "",
            showLoading: true, //加载动画
            dowPicStatus: false,
            payStatus: false,
            box_width: "",
            doamin: location.protocol + "//" + location.host,
            protocol:location.protocol + "//",
            openImgUrl: "",
            payData: "",
            huabeiKey: "",
            bgcColor1: "",
            bgcColor5: "",
            bm_status: false,
            refundMethod: "",
            refundIndex: 0,
            refundStatus: 1, //1:是订单金额退回至，2：取消订单原因
            bankInfo: [],
            detailInfo: "",
            dadaProgress:'',
            mapJson:{},
            transporterPhone:''
        };
    },
    created() {
        // if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
        //     location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
        //     return false;
        // }
        // this.$cookies.set("zz_userid", "24433735")
    },
    mounted() {
        let that = this;
        if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            return false;
        }
        // 微信分享
        that.shareFun();
        that.getColorFun();
        // that.bgcColor1 = "#8D524A";
        that.orderDetail(that.$route.query.orderId);
    },
    methods: {
        // 订单详情
        orderDetail(orderId, refType) {
            let that = this;
            const paramsJson = {
                order_id: orderId,
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                client_type: 1
            };
            getOrderDetail(paramsJson)
                .then(res => {
                    that.showLoading = false;
                    // 申请退款成功之后跳转售后列表
                    if (refType == "refund") {
                        that.$router.push({
                            path: "/order/orderRelated/afterSalesList",
                            query: {
                                username: this.$route.query.username
                            }
                        });
                        this.$cookies.set("afterSales_state", 1);
                        return false;
                    }
                    let detailInfoValue = res;
                    if(detailInfoValue.head_info && detailInfoValue.head_info.ps_state == 11){
                        that.mapJson = detailInfoValue;
                    }
                    if (that.$util.functions.ifHaveFun(detailInfoValue.need_pay_info)) {
                        detailInfoValue.need_pay_Json = util.functions.separatePrice(detailInfoValue.need_pay_info.val);
                    }
                    // 订单二维码接口
                    if (
                        detailInfoValue.head_info &&
                        detailInfoValue.head_info.type == 1 &&
                        that.$util.functions.ifHaveFun(detailInfoValue.head_info.pick_up_code)
                    ) {
                        that.orderMa();
                    }
                    // 底部过多时显示过多按钮
                    if (detailInfoValue.bottom_info && detailInfoValue.bottom_info.length > 4) {
                        detailInfoValue.bm_status = false;
                        detailInfoValue.button_more = [];
                        for (let i in detailInfoValue.bottom_info) {
                            // 1.订单二维码 2.申请售后 3.上传附件放在更多里
                            if (
                                detailInfoValue.bottom_info[i].type == "qrcode" ||
                                detailInfoValue.bottom_info[i].type == "application" ||
                                detailInfoValue.bottom_info[i].type == "up"
                            ) {
                                detailInfoValue.button_more.push(detailInfoValue.bottom_info[i]);
                                detailInfoValue.bottom_info.splice(i, 1);
                            }
                        }
                    }
                    that.detailInfo = detailInfoValue;
                    that.wodedingdan = res.tips.wodedingdan;
                    // that.pro_info= res.pro_info;
                    that.orderId = res.order_id;
                    that.cancel_reason = res.cancel_reason;
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
                    that.pick_up_info = that.$util.functions.ifHaveFun(detailInfoValue.pick_up_info)
                        ? detailInfoValue.pick_up_info
                        : "";
                    let pro_info_val = res.pro_info;

                    if (that.$util.functions.ifHaveFun(pro_info_val)) {
                        for (let i in pro_info_val.group_info) {
                            let val = String(pro_info_val.group_info[i].total_price);
                            pro_info_val.group_info[i].group_info_Json = util.functions.separatePrice(val);
                        }
                    }
                    that.pro_info = pro_info_val;
                    if (
                        that.$util.functions.ifHaveFun(res.head_info) &&
                        that.$util.functions.ifHaveFun(res.head_info.content)
                    ) {
                        let headInfo = res.head_info.content;
                        for (let i = 0; i < headInfo.length; i++) {
                            if (headInfo[i].type == "time") {
                                // 获取本地时间(时间戳)
                                let dateLocal = Date.parse(new Date());
                                // 获取接口返回的时间
                                let timeValue = headInfo[i].val;
                                var arrTime = timeValue.split(/[- : \/]/);
                                var newDate = new Date(
                                    arrTime[0],
                                    arrTime[1] - 1,
                                    arrTime[2],
                                    arrTime[3],
                                    arrTime[4],
                                    arrTime[5]
                                );
                                var newDateValue = Date.parse(newDate);
                                // 获取差值
                                let difference = parseInt(newDateValue) - parseInt(dateLocal);
                                // 将时间戳转换为时间
                                var days = parseInt(Math.floor(difference / (1000 * 60 * 60 * 24)));
                                var hours = parseInt((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                var minutes = parseInt((difference % (1000 * 60 * 60)) / (1000 * 60));
                                var seconds = (difference % (1000 * 60)) / 1000;
                                if (days < 10) {
                                    days = "0" + days;
                                }
                                if (hours < 10) {
                                    hours = "0" + hours;
                                }
                                if (minutes < 10) {
                                    minutes = "0" + minutes;
                                }
                                if (seconds < 10) {
                                    seconds = "0" + seconds;
                                }
                                var JsonTime = {
                                    days: days,
                                    hours: hours,
                                    minutes: minutes,
                                    seconds: seconds
                                };
                                that.allimeJson = JsonTime;
                                that.headInfoTime = timeValue;
                                if (difference > 0) {
                                    that.getTimeFun();
                                }
                            }
                        }
                    }
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Alert({
                        message: err.msg
                    }).then(() => {
                        // on close
                        that.$router.replace({
                            path: "/order/orderRelated/orderList",
                            query: {
                                username: that.$route.query.username
                            }
                        });
                        // if (document.referrer.length > 0) {
                        //     window.history.back();
                        // } else {
                        //     // location.href = this.videoData[0].index_url
                        // }
                    });
                });
        },
        // 色系接口
        getColorFun() {
            let that = this;
            getColor({ username: this.$route.query.username }).then(res => {
                that.bgcColor1 = util.functions.newColor(res.color).bgcColor1;
                that.bgcColor5 = util.functions.newColor(res.color).bgcColor5;
            });
        },
        /**
         * 取消订单原因
         */
        click2() {
            this.refundStatus = 2;
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
        // 倒计时
        getTimeFun() {
            let that = this;
            // return;
            that.setInterValue = setTimeout(function() {
                // 获取接口返回的时间
                let timeValue = that.headInfoTime;
                // 获取本地时间(时间戳)
                let dateLocal = Date.parse(new Date());
                var arrTime = timeValue.split(/[- : \/]/);
                var newDate = new Date(arrTime[0], arrTime[1] - 1, arrTime[2], arrTime[3], arrTime[4], arrTime[5]);
                var newDateValue = Date.parse(newDate);
                // 获取差值
                let difference = parseInt(newDateValue) - parseInt(dateLocal);

                if (difference <= 0) {
                    that.orderDetail(that.orderId);
                    clearInterval(that.setInterValue);
                    return false;
                }
                // 将时间戳转换为时间
                var days = parseInt(Math.floor(difference / (1000 * 60 * 60 * 24)));
                var hours = parseInt((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = parseInt((difference % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = (difference % (1000 * 60)) / 1000;
                if (days < 10) {
                    days = "0" + days;
                }
                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                var JsonTime = {
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds
                };
                that.allimeJson = JsonTime;
                that.headInfoTime = timeValue;
                that.getTimeFun();
            }, 1000);
        },

        cloaseMengban() {
            this.dowPicStatus = !this.dowPicStatus;
        },

        // 跳转商铺
        shopMallFun(nojump, index) {
            // 供应链的商铺 等于1不能跳转
            if (index > 0 && nojump != 1) {
                location.href =
                    "//" +
                    document.domain +
                    `/wap/shops/shop.php?username=${this.$route.query.username}&channel_id=${this.pro_info.group_info[index].shopsChannelId}&u_u_id=${index}&wap=1`;
            }
        },

        navagatePg(type, detailUrl, pro) {
            let orderId = this.orderId,
                proid,
                url,
                detailId;
            if (type == 0 || type == 1 || type == 2) {
                detailId = detailUrl;
            }
            if (type == 2) {
                proid = pro;
            }

            if (type == 0 || type == 1) {
                if (this.detailInfo.order_type == 34) {
                    location.href =
                        "m.evyun.cn/wap/hotel/comment.php?username=" +
                        this.$route.query.username +
                        "&order_id=" +
                        orderId +
                        (type == 1 ? "&is_add=1" : "");
                    return false;
                } else {
                    this.$router.push({
                        path: "/order/orderRelated/evaluation",
                        query: {
                            detailId: detailId,
                            orderId: orderId,
                            is_add: type,
                            orderDetail: 1,
                            username: this.$route.query.username
                        }
                    });
                }
            } else if (type == 2) {
                //单个商品
                if (this.detailInfo.there_are_third_party_goods == 1) {
                    //供应链
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
                            redirect: "orderDetail",
                            username: this.$route.query.username
                        }
                    });
                }
            } else if (type == 3) {
                // 在微信中，弹出图片
                if (util.functions.IsWX()) {
                } else {
                    // //文件下载
                    // location.href = "//" + document.domain + `/dom/downFile.php?file_url=${detailUrl}&file_name=${pro}`;
                }
            }
        },

        // 底部跳转按钮
        infoBtn(type, img) {
            switch (type) {
                // 再次购买
                case "buy":
                    this.shoppingCatFun();
                    break;
                // 取消订单
                case "del":
                    this.showModal = true;
                    break;
                case "pay":
                    //去支付
                    // wx.navigateTo({
                    //   url: `/pages/order/detailed2?order_id=${this.orderId}&is_pay=1`,
                    // })
                    // this.payStatus = true;

                    // let success_url = "";
                    // if (isWho == "tt") {
                    //     success_url = "/pages/order/detailed2?order_id=" + this.orderId;
                    // } else {
                    //     success_url = "/extvideo/pages/order/orderDetail?orderId=" + this.orderId;
                    // }
                    // let fail_url = "/extvideo/pages/order/orderDetail?orderId=" + this.orderId;
                    // if (isWho == "tt") {
                    //     fail_url = "/pages/order/detailed2?order_id=" + this.orderId;
                    // }
                    // fail_url = fail_url + "&is_pay=1";
                    // this.payMoney(this.orderId, this.detailInfo.head_info.content[0].val, success_url, fail_url);

                    this.payRequest();
                    break;
                case "logistics":
                    //查看物流
                    this.$router.push({
                        path: "/order/orderRelated/orderRecord",
                        query: {
                            id: this.orderId,
                            username: this.$route.query.username
                        }
                    });
                    break;
                case "refund":
                    //申请退款
                    this.showModal = true;
                    this.cancelModel = false;

                    break;
                case "receipt":
                    //确认收货
                    this.okShouhuo();
                    break;
                case "application":
                    //申请售后
                    if (
                        Object.keys(this.pro_info.group_info).length == 1 &&
                        Object.values(this.pro_info.group_info)[0].pro_list.length == 1
                    ) {
                        let detailId = Object.values(this.pro_info.group_info)[0].pro_list[0].id;
                        //单个商品
                        if (this.detailInfo.there_are_third_party_goods == 1) {
                            //供应链
                            this.$router.push({
                                path: "/order/orderRelated/jdAfterType",
                                query: {
                                    jdStatus: 1,
                                    detailId: detailId,
                                    orderId: this.orderId,
                                    proid: Object.values(this.pro_info.group_info)[0].pro_list[0].pro_id,
                                    username: this.$route.query.username
                                }
                            });
                        } else {
                            this.$router.push({
                                path: "/order/orderRelated/returnGoods",
                                query: {
                                    detailId: detailId,
                                    orderId: this.orderId,
                                    redirect: "orderList",
                                    username: this.$route.query.username
                                }
                            });
                        }
                    } else {
                        this.$router.push({
                            path: "/order/orderRelated/afterSalesList",
                            query: {
                                orderId: this.orderId,
                                username: this.$route.query.username
                            }
                        });
                        this.$cookies.set("afterSales_state", 0);
                    }
                    break;
                case "qrcode":
                    //订单二维码
                    let url = location.origin + img;
                    this.imgSrc = url;
                    break;
                case "up":
                    location.href =
                        "//" +
                        document.domain +
                        "/wap/wap_up_order.php?username=" +
                        this.$route.query.username +
                        "&order_id=" +
                        this.orderId +
                        "&wap=1";
                    break;
            }
        },
        claoseMa() {
            this.imgSrc = "";
        },
        //确认收货
        okShouhuo(id) {
            var that = this;
            return Hint.Confirm({
                title: that.detailInfo.tips.querenshouhuo,
                message: that.detailInfo.tips.ninquedingquerenshouhuoma
            }).then(() => {
                that.showLoading = true;
                that.$F.Response({
                    url: "xiaochengxu/order/order_shouhuo.php",
                    param: {
                        id: that.orderId,
                        username: that.$route.query.username,
                        zz_userid: that.$cookies.get("zz_userid"),
                        curl_request_host: document.domain,
                        client_type: 1
                    },
                    success: res => {
                        that.showLoading = false;
                        if (res.data == -1) {
                            Hint.Alert({
                                title: that.detailInfo.tips.tishi,
                                message: that.detailInfo.tips.canshuyouwu
                            });
                        } else if (res.data == 0) {
                            Hint.Alert({
                                title: that.detailInfo.tips.tishi,
                                message: that.detailInfo.tips.fuwuqifanmang
                            });
                        } else if (res.data == 1) {
                            Hint.Alert({
                                title: that.detailInfo.tips.tishi,
                                message: that.detailInfo.tips.nindedingdanbunengquerenshouhuo
                            });
                        } else {
                            Hint.Alert({
                                title: that.detailInfo.tips.tishi,
                                message: that.detailInfo.tips.querenshouhuochenggong
                            }).then(() => {
                                that.showModal = false;
                                that.orderList = [];
                                that.page = 1;
                                that.orderDetail(that.orderId);
                            });
                        }
                    },
                    error: err => {
                        that.showLoading = false;
                    }
                });
            });
        },
        // 加入购物车
        shoppingCatFun() {
            let that = this,
                indexArr = Object.keys(that.detailInfo.pro_info.group_info),
                proList = [];
            that.showLoading = true;

            for (let i in indexArr) {
                proList = proList.concat(that.detailInfo.pro_info.group_info[indexArr[i]].pro_list);
            }
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
        // 取消订单接口,退款
        cancelOrderBtn(type) {
            let that = this,
                jsonValue = {
                    order_id: that.orderId,
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
                if (that.refundMethod != "") {
                    req.return_accounts = that.refundMethod.method;
                    // 银行卡
                    if (that.refundMethod.method == 1) {
                        if (that.refundMethod.bankInfo.length == 0) {
                            Hint.Msg({
                                message: that.detailInfo.tips.qingxuanze + that.detailInfo.tips.dingdanjinetuihuizhi
                            });
                            return false;
                        } else {
                            req.return_bank = that.refundMethod.bankInfo[that.refundIndex].bank;
                            req.return_number = that.refundMethod.bankInfo[that.refundIndex].receivable;
                            req.return_name = that.refundMethod.bankInfo[that.refundIndex].name;
                        }
                    }
                }
                req.other_description = Number(that.numReson) + 1;
                req.description = that.describe;
                jsonValue.req = JSON.stringify(req);
            }
            orderHandle(jsonValue)
                .then(res => {
                    that.showModal = false;
                    that.orderList = [];
                    that.orderDetail(that.orderId, type);
                    that.showLoading = false;
                    if (type == "del") {
                        that.$F.Response({
                            url: "dom/sc_order.php",
                            param: {
                                username: that.$route.query.username,
                                apiUse: 1,
                                orderId: that.orderId
                            },
                            success: res => {},
                            error: err => {}
                        });
                    }
                })
                .catch(err => {
                    that.showLoading = false;
                    //弹出警示信息
                    Hint.Alert({
                        message: res.msg
                    }).then(() => {
                        that.showModal = false;
                        that.orderList = [];
                        that.orderDetail(that.orderId);
                    });
                });
        },
        shadowClose() {
            this.showModal = false;
        },
        /**
         * 点击箭头显示隐藏
         */
        click() {
            let that = this;
            that.hiddenName = !that.hiddenName;
            that.textareState = false;
            setTimeout(function() {
                that.box_width = $(".hiddenData2").height();
            });
        },
        /**
         * 取消订单原因选择
         */
        switchTab(index) {
            this.numReson = parseInt(index);
        },
        // 取消订单描述
        // describeInput(e) {
        //     let detail = e.detail.value;
        //     this.describe = detail;
        // },
        textareaFocus() {
            this.textareState = true;
            this.textareState2 = true;
        },
        changeTextarea() {
            this.textareState = !this.textareState;
        },
        textareaBlur() {
            this.textareState = !this.textareState;
            this.textareState2 = false;
        },
        // 订单二维码
        orderMa() {
            var zz_userid = this.$cookies.get,
                that = this;

            let json = {
                sid: this.orderId,
                user_user_id: zz_userid,
                oneCode: 1, // 仅二维码
                share_tag: 14
            };
            GeneratePublicImg(json)
                .then(res => {
                    that.orderMaData = res.codeImg;
                })
                .catch(err => {
                    Hint.Msg({
                        message: err.msg
                    });
                });
        },
        noMove() {
            return false;
        },
        // 图片查看
        openImg(url) {
            this.openImgUrl = location.origin + "/" + url;
        },
        // 查看图片
        dowLoadImg(url) {
            //预览图片
            this.openImgUrl = url;
        },
        fuwuFun(type) {
            if (type == 1) {
                this.refundStatus = 1;
                this.$refs.customDate.showCustom();
            } else if (type == 2) {
                // 申请退款添加银行卡
                location.href =
                    "//" +
                    document.domain +
                    `/dom/fx_bank_add.php?username=${this.$route.query.username}&this_type=0&isCenter=1&wap=1&bank=1`;
            }
        },
        // 跳转详情页
        goDetail(index, proindex, proLink) {
            if (util.functions.ifHaveFun(proLink)) {
                location.href = location.origin + proLink;
            }
            // location.href =
            //     location.origin +
            //     "/" +
            //     this.$route.query.username +
            //     "/wap_pro/" +
            //     this.detailInfo.pro_info.group_info[index].pro_list[proindex].pro_id +
            //     ".html";
        },
        // 支付方式接口
        payRequest() {
            const that = this;
            that.showLoading = true;
            let paramJson = {
                user_user_id: that.$cookies.get("zz_userid"),
                client_type: 1,
                username: that.$route.query.username,
                money: that.detailInfo.need_pay_info.val
            };
            getPaymentList(paramJson)
                .then(res => {
                    that.showLoading = false;
                    that.payData = util.functions.ifHaveFun(res) ? res : "";
                    that.onlineList = res.list;
                    that.popupParam.stagingInfo = res.stagingInfo;
                    setTimeout(() => {
                        that.$refs.popupRefs.payWayFun();
                    });
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Msg({
                        message: err.msg
                    });
                });
        },
        // 支付方式数据回显
        payMentmentsFun(e) {
            let data = e[0];
            this.payment_info_id = data.id;
            this.huabeiKey = data.huabeiKey;
            // this.popupParam.payment_info_id = data.id;
            // this.popupParam.huabeiKey = data.huabeiKey;
            // 已经选择过的支付方式列表数据
            // this.huabeiKey = data.huabeiKey;
        },
        /**
         * @Date: 2020-12-18 11:29:30
         * @LastEditors: zhouqi
         * @description: 支付提交
         * @param {*}
         * @return {*}
         */
        sublitOrderBtn() {
            let that = this,
                payId = 0;
            // that.payData = false;
            that.showLoading = true;
            // 如果是支付包，跳转之前的支付页面
            if (util.functions.ifHaveFun(that.payData) && util.functions.ifHaveFun(that.payData.list)) {
                for (let i in that.payData.list) {
                    if (that.payment_info_id == that.payData.list[i].id) {
                        payId = that.payData.list[i].pay_id;
                    }
                }
            }
            setPayment({
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                order_id: that.orderId,
                id: that.payment_info_id
            })
                .then(() => {
                    that.showLoading = false;
                    var aliUrl = `/dom/sc_pay.php?username=${that.$route.query.username}&orderid=${that.orderId}&wap=1`;
                    if (payId == 12 || payId == 27) {
                        if (that.huabeiKey > 0) {
                            aliUrl += `&fq_num=${that.huabeiKey}`;
                        }
                        if (util.functions.IsWX()) {
                            aliUrl += `&showType=1&signId=${that.$cookies.get("zz_userid")}&signStr=${
                                that.payData.signStr
                            }`;
                        }
                    }
                    location.href = aliUrl;
                    setTimeout(() => {
                        that.payBackStatus = true;
                        that.isPayStatus = false;
                    }, 1500);
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Msg({
                        message: err.msg
                    });
                });
        },
        // 跳转订单详情
        reloadFun() {
            location.reload();
        },
        //查看地图
        openDT(name, address, lng, lat) {
            const that = this;
            let store = [];
            store[0] = name;
            store[1] = address;
            store[2] = lng;
            store[3] = lat;
            if (navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1) {
                let href = location.href;
                util.wechat.share(store, href, that.$route.query.username, 2);
            }else{
                location.href = `http://api.map.baidu.com/marker?location=${lat},${lng}&title=${name}&content=${address}&output=html`;
            }
        },
        // 微信分享
        shareFun() {
            let href = location.href;
            util.wechat.share(this.wxRegCallback, href, this.$route.query.username, 1);
        },
        //同城配送进度
        getDaDaOrderProgressFun() {
            const that = this;
            if (!util.functions.ifHaveFun(that.detailInfo.head_info.dadaOrderNo)) {
                return false;
            }
            that.showLoading = true;
            let paramValue ={
                order_id: that.orderId,
                username:that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                client_type:1
            }
            getDaDaOrderProgress(paramValue)
                .then(res => {
                    that.showLoading = false;
                    that.jinduShow = true;
                    that.dadaProgress = util.functions.ifHaveFun(res) ? res :'';
                    that.dadaProgress.progress.reverse();
                })
                .catch(err => {
                    that.showLoading = false;
                });
        },
         daDaDataFun(e){
            this.transporterPhone = e;
        },
        ddRefureFun(){
            this.orderDetail(this.orderId);
        },
        telClick(){
            window.location.href = 'tel://' + this.transporterPhone
        },
    }
};
</script>

<style lang="scss">
@import "@/pages/order/assets/css/orderDetail.scss";
@import "../../../../assets/fonts/order/duihao/iconfont.css";
</style>

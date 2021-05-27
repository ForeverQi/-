<!--
 * @Author       : zhouqi
 * @description  : description
 * @Date         : 2020-12-04 14:23:41
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-01-07 18:07:17
 * @FilePath     : /vue-VFrontend/src/pages/order/views/orderRelated/returnGoods.vue
-->
<template>
    <section class="returnGoods_box">
        <van-loading v-if="showLoading" size="50px" color="#1989fa" />
        <van-overlay :show="showLoading" />
        <section class="returnGoods">
            <div class="wrapper" v-if="goodsDate != ''">
                <Nav :numerical="11" :tips="goodsDate.tips" />
                <div class="wrapper_c">
                    <div class="wrapper_bg">
                        <div class="wrapper_bg_c"></div>
                    </div>
                    <div class="Max_Center">
                        <div class="Explain" @click.stop="instructionsBtn" v-if="jdStatus != 1">
                            <div class="Explain_img">
                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_why.png" />
                            </div>
                            <span class="Explain_txt">{{ goodsDate.tips.tuihuanhuoshuoming }}</span>
                        </div>
                        <div class="order_list">
                            <div class="order_li">
                                <div class="order_top" :style="{ height: jdStatus == 1 ? '0.1rem' : '' }">
                                    <div class="shop_name" v-if="jdStatus != 1">
                                        <div class="home_img">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_home.png"
                                            />
                                        </div>
                                        <div class="home_txt">{{ goodsDate.shops_name }}</div>
                                        <!-- <div class="arrow1" v-if="goodsDate.shops_user_id > 0">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow1.png"
                                            />
                                        </div> -->
                                    </div>
                                </div>
                                <div class="order_center">
                                    <div class="order_money">
                                        <div class="money">
                                            <span>{{ goodsDate.currency_symbol }}</span
                                            >{{ goodsDate.pro_info.shiji_money_left
                                            }}<span>.{{ goodsDate.pro_info.shiji_money_right }}</span>
                                        </div>
                                        <div class="Number">{{ goodsDate.pro_info.num_info }}</div>
                                    </div>
                                    <div class="order_name">
                                        <div class="shop_img">
                                            <img :src="goodsDate.pro_info.pic" />
                                        </div>
                                        <div class="shop_link">
                                            <div class="shop_link_tit">{{ goodsDate.pro_info.name }}</div>
                                            <div class="shop_link_txt">{{ goodsDate.pro_info.param_info }}</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 申请数量 -->
                                <div
                                    class="order_bottom"
                                    v-if="jdStatus != 1 || (jdStatus == 1 && goodsDate.apply_max_num > 1)"
                                >
                                    <div class="order_int_l">{{ goodsDate.tips.shenqingshuliang }}</div>
                                    <div class="order_int_R">
                                        <div class="reduce" @click="reduceNum" v-if="goodsDate.apply_max_num > 1">
                                            <i style="color:#666;" class="iconImage iconfont icon-jianhao" />
                                        </div>
                                        <div class="int">{{ applyNum }}</div>
                                        <div class="plus" @click="addNumer" v-if="goodsDate.apply_max_num > 1">
                                            <i style="color:#666;" class="iconImage iconfont icon-jiahao" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 申请方式 -->
                        <div class="mode mode_way_father" @click="changeYL">
                            <div class="mode_l">{{ goodsDate.tips.shenqingfangshi }}</div>
                            <div class="mode_way">
                                <!-- 供应链商品 -->
                                <div class="mode_r" v-if="jdStatus == 1">
                                    {{
                                        salesType == 1
                                            ? goodsDate.tips.tuihuo
                                            : salesType == 2
                                            ? goodsDate.tips.huanhuo
                                            : salesType == 3
                                            ? goodsDate.tips.tuikuan
                                            : salesType == 4
                                            ? goodsDate.tips.weixiu
                                            : ""
                                    }}
                                </div>
                                <!-- 非供应链商品 -->
                                <div class="mode_r" v-else>{{ goodsValue }}</div>
                                <!-- 非供应链才显示箭头 -->
                                <div class="arrow">
                                    <img
                                        v-if="jdStatus != 1"
                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow3.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <!-- 申请原因 -->
                        <div class="mode1">
                            <!-- 供应链商品状态 -->
                            <div
                                class="Reason"
                                v-if="jdStatus == 1"
                                @click.stop="Reason1(2)"
                                :style="{ borderBottom: jdStatus == 1 ? '1px solid #ededed;' : '' }"
                                style="border-bottom:1px solid #ededed;"
                            >
                                <div class="mode_l">{{ goodsDate.tips.baozhuangzhuangtai }}</div>
                                <div
                                    class="mode_r"
                                    style="display:flex;align-items:center;color:#222;"
                                    @click="shopStatus"
                                    data-type="0"
                                >
                                    <div class="or_view_L1" style="margin-right:0;display:flex;align-items:center;">
                                        <!-- <div
                                            class=" {{shopStatus ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'}}"
                                            style="background:{{ shopStatus ? bgcColor1 : '' }};border-color:{{ shopStatus ? bgcColor1 : '' }}!important;"
                                            >
                                            <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png" alt="check" v-if="shopStatus}}" />
                                            </div> -->
                                        <div>{{ apply_reason3[bagIndex].name }}</div>
                                        <div class="arrow">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow3.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 申请原因选择(供应链商品显示) -->
                            <div class="Reason" @click.stop="jdStatus == 1 && apply_reason_status ? 'Reason1(0)' : ''">
                                <div class="mode_l">{{ goodsDate.tips.shenqingyuanyin }}</div>
                                <div class="arrow" v-if="false && jdStatus == 1">
                                    <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow3.png" />
                                </div>
                                <div class="mode_r" v-if="false && jdStatus == 1 && apply_reason_status">
                                    {{ goodsDate.apply_reason[resonIndex] }}
                                </div>
                            </div>

                            <textarea
                                class="textarea_txt"
                                :value="textareaValue"
                                @input="inputReson($event.target.value)"
                                :placeholder="goodsDate.tips.qingshuru + '...'"
                            ></textarea>

                            <div class="mode1_ul">
                                <div class="mode1_li">
                                    <div class="mode1_li_add">
                                        <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_add.png" />
                                        <input
                                            name="upFile"
                                            type="file"
                                            accept="image/*"
                                            class="upload-file"
                                            @change="coverUpload($event, 1)"
                                            id="uploadImg"
                                        />
                                    </div>
                                </div>
                                <article v-if="imagesList_back.length">
                                    <div class="mode1_li" v-for="(item, index) in imagesList_back" :key="index">
                                        <div class="mode1_li_img">
                                            <img :src="item.path" />
                                        </div>
                                        <div class="del" v-if="imagesList_back.length" @click.stop="deleteImg(index)">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_del.png"
                                            />
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <!-- 京东商品 -->
                            <div class="mode1_li_txt" v-if="jdStatus == 1">
                                {{ goodsDate.tips.qingshangchuanxiangguanzhaopian }}
                            </div>
                            <div class="mode1_li_txt" v-else>
                                {{ goodsDate.tips.qingshangchuanshangpinpingzhengzhaopian }}
                            </div>
                        </div>
                        <!-- 供应链地址选择 -->
                        <div
                            class="mode2"
                            :style="{
                                marginBottom:
                                    jdStatus == 1 ? (returnType.length && returnType[0].code == 40 ? 0 : '') : 0,
                                borderBottomLeftRadius:
                                    jdStatus == 1 ? (returnType.length && returnType[0].code == 40 ? 0 : '') : 0,
                                borderBottomRightRadius:
                                    jdStatus == 1 ? (returnType.length && returnType[0].code == 40 ? 0 : '') : 0
                            }"
                        >
                            <div
                                class="Reason"
                                :style="{
                                    border: jdStatus == 1 ? (returnType.length && returnType[0].code == 40 ? 0 : '') : 0
                                }"
                            >
                                <div class="mode_l">{{ goodsDate.tips.fanhuifangshi }}</div>
                                <!-- <div class="arrow"><img  src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow3.png"></div> -->
                                <div class="mode_r">
                                    {{ jdStatus == 1 ? returnType[0].returnTypeName : goodsDate.tips.zixingjihui }}
                                    <div class="arrow"></div>
                                </div>
                            </div>
                            <div class="send" v-if="jdStatus == 1 && returnType.length && returnType[0].code == 4">
                                <div class="send_R">
                                    <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow3.png" />
                                </div>
                                <div class="send_L" @click="editorAddress">
                                    <div class="send_img">
                                        <div class="send_img1">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_send.png"
                                            />
                                        </div>
                                        <div class="send_img_txt">{{ goodsDate.tips.qu }}</div>
                                    </div>
                                    <div class="send_text" v-if="address_info != ''">
                                        <div class="send_txt1">{{ contactPeople }} {{ editorPhone }}</div>
                                        <div class="send_txt2">
                                            {{ describe || describe == "" ? cityValue + describe : "" }}
                                        </div>
                                        <!-- <div class="send_txt2">{{describe  ? describe : ''}}</div> -->
                                        <!-- <div class="send_txt2">{{ cityValue  ? cityValue + describe : describe}}</div> -->
                                    </div>
                                    <div class="changeAddress" v-else>
                                        <span>{{ goodsDate.tips.qingtianjiaqujiandizhi }}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="or_view ">
          <div class="or_view_L" @click="shopStatus" data-type="1">
            <div
            class=" {{dooCrontact ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'}}"
            style="background:{{ dooCrontact ? bgcColor1 : '' }};border-color:{{ dooCrontact ? bgcColor1 : '' }}!important;"
            >
            <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png" alt="check" v-if="dooCrontact}}" />
            </div>
          </div>
          <div class="or_view_R" @click="shopStatus" data-type="1">请上门取货前与我取得联系</div>
        </div> -->
                            <!-- 供应链商品取件时间 -->
                            <div
                                class="Reason"
                                style="border-bottom:0;border-top:1px solid #ededed;"
                                v-if="false"
                                @click="changeMenTime"
                            >
                                <div class="mode_l" style="color:#555555;">请选择上门取件时间</div>
                                <div class="mode_r">
                                    <div class="arrow">
                                        <img
                                            src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_arrow3.png"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 非供应链 退货时提示语 -->
                        <div
                            class="nojdWarn"
                            v-if="jdStatus != 1 || (jdStatus == 1 && returnType.length && returnType[0].code == 40)"
                        >
                            {{ goodsDate.tips.yunfeizixingchengdan }}
                        </div>
                        <!-- 收货地址(退货的时候不显示) -->
                        <div
                            class="mode2"
                            v-if="(jdStatus == 1 && salesType != 1) || (goodsValueType != 1 && jdStatus != 1)"
                        >
                            <div class="Reason">
                                <div class="mode_l">{{ jdStatus == 1 ? "收货地址" : goodsDate.tips.jijianxinxi }}</div>
                                <div
                                    v-if="
                                        (goodsValueType != 1 && jdStatus != 1) ||
                                            (jdStatus == 1 && (salesType == 2 || salesType == 4))
                                    "
                                    style="color:#999999;float:right;line-height:1rem;font-size: 0.26rem;"
                                >
                                    {{ goodsDate.tips.gaidizhiweijihuidizhi }}
                                </div>
                            </div>
                            <!-- <div class="send" @click="addressList" style="border-bottom:1px solid #ededed;"> -->
                            <div class="send" @click="addressList">
                                <div class="send_R">
                                    <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow3.png" />
                                </div>
                                <div class="send_L send_LD">
                                    <div class="send_img">
                                        <div class="send_img1">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_send.png"
                                            />
                                        </div>
                                        <div class="send_img_txt">{{ goodsDate.tips.shou }}</div>
                                    </div>
                                    <div class="send_text" v-if="user_receive_info">
                                        <!-- 供应链的时候不显示这个姓名电话 -->
                                        <div class="send_txt1" v-if="!(jdStatus == 1)">
                                            {{ user_receive_info.name }} {{ user_receive_info.tel }}
                                        </div>
                                        <div class="send_txt2">{{ user_receive_info.address }}</div>
                                    </div>
                                    <div class="changeAddress" v-else>
                                        <span>{{ goodsDate.tips.qingtianjiashouhuodizhi }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 退款方式 -->
                        <div
                            class="mode"
                            @click="returnClick"
                            v-if="
                                (goodsValueType == 1 && jdStatus != 1) ||
                                    (jdStatus == 1 && salesType != 2 && salesType != 4)
                            "
                        >
                            <div class="mode_l" style="line-height: 1;">{{ goodsDate.tips.tuikuanfangshi }}</div>
                            <div style="display:flex;align-items:center;">
                                <div class="mode_r" v-if="jdStatus != 1">
                                    {{ refundWayVal ? refundWayVal : goodsDate.refundMethod[1] }}
                                </div>
                                <div class="mode_r" v-else>{{ goodsDate.tips.yuanzhifufanhui }}</div>
                                <div class="arrow">
                                    <img
                                        v-if="jdStatus != 1"
                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_arrow3.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <!-- 银行卡信息 -->
                        <div
                            class="bankInfo"
                            v-show="
                                num2 == 2 &&
                                    ((goodsValueType == 1 && jdStatus != 1) ||
                                        (jdStatus == 1 && salesType != 2 && salesType != 4))
                            "
                        >
                            <!-- 开户行 -->
                            <div class="bankInfo-child">
                                <p>{{ goodsDate.tips.kaihuhang }}<span>*</span></p>
                                <div>
                                    <input
                                        type="text"
                                        v-model="kaihuhang_val"
                                        :placeholder="
                                            kaihuhang_val
                                                ? kaihuhang_val
                                                : goodsDate.tips.qingtianxie + goodsDate.tips.kaihuhang
                                        "
                                    />
                                </div>
                            </div>
                            <!-- 卡号 -->
                            <div class="bankInfo-child">
                                <p>{{ goodsDate.tips.kahao }}<span>*</span></p>
                                <div>
                                    <input
                                        type="text"
                                        v-model="kahao_val"
                                        :placeholder="
                                            kahao_val ? kahao_val : goodsDate.tips.qingtianxie + goodsDate.tips.kahao
                                        "
                                    />
                                </div>
                            </div>
                            <!-- 姓名 -->
                            <div class="bankInfo-child">
                                <p>{{ goodsDate.tips.huming }}<span>*</span></p>
                                <div>
                                    <input
                                        type="text"
                                        v-model="huming_val"
                                        :placeholder="
                                            huming_val ? huming_val : goodsDate.tips.qingtianxie + goodsDate.tips.huming
                                        "
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- 备注 -->
                        <div class="bankInfo" v-show="false && jdStatus != 1">
                            <!-- 备注 -->
                            <div class="bankInfo-child">
                                <p>{{ goodsDate.tips.beizhu }}</p>
                                <div>
                                    <textarea
                                        v-model="beizhu_val"
                                        :placeholder="
                                            beizhu_val ? beizhu_val : goodsDate.tips.qingtianxie + goodsDate.tips.beizhu
                                        "
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <!-- 提交申请 -->
                        <div class="button_a" @click="submitDate" :style="{ background: bgcColor1 }">
                            {{ goodsDate.tips.tijiaoshenqing }}
                        </div>
                    </div>
                    <!-- 阴影蒙版 -->
                    <div class="alert_bg" v-if="showModal" @click="coloseModal"></div>
                    <!-- 申请方式弹窗 -->
                    <div class="alert_c" v-if="applicationWay">
                        <div class="alert_cen">
                            <div class="alert_tit">{{ goodsDate.tips.shenqingfangshi }}</div>
                            <div
                                class="or_view1"
                                v-for="(item, index) in goodsDate.apply_method"
                                :key="index"
                                @click="switchTab1(item.name, item.type, index)"
                            >
                                <div class="or_view_L1">
                                    <div
                                        :class="
                                            num1 == index
                                                ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                : 'shoppingContent_radio'
                                        "
                                        :style="{
                                            background: num1 == index ? bgcColor1 : '',
                                            borderColor: num1 == index ? bgcColor1 : ''
                                        }"
                                    >
                                        <img
                                            src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                            alt="check"
                                            v-if="num1 == index"
                                        />
                                    </div>
                                </div>
                                <div class="or_view_R1">{{ item.name }}</div>
                            </div>
                        </div>
                        <div class="alert_bottom" @click="changeYL1">{{ goodsDate.tips.queding }}</div>
                    </div>
                    <!-- 退款方式弹窗 -->
                    <div class="alert_c" v-if="RefundWay">
                        <div class="alert_cen">
                            <div class="alert_tit">{{ goodsDate.tips.tuikuanfangshi }}</div>
                            <div
                                class="or_view1"
                                v-for="(item, index) in goodsDate.refundMethod"
                                :key="index"
                                @click="switchTab2(index)"
                            >
                                <div class="or_view_L1">
                                    <div
                                        :class="
                                            num2 == index
                                                ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                : 'shoppingContent_radio'
                                        "
                                        :style="{
                                            background: num2 == index ? bgcColor1 : '',
                                            borderColor: num2 == index ? bgcColor1 : ''
                                        }"
                                    >
                                        <img
                                            src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                            alt="check"
                                            v-if="num2 == index"
                                        />
                                    </div>
                                </div>
                                <div class="or_view_R1">{{ item }}</div>
                            </div>
                        </div>
                        <div class="alert_bottom" @click="changeYL1">{{ goodsDate.tips.queding }}</div>
                    </div>
                    <!-- 申请原因、返回方式弹窗 -->
                    <div class="alert_c" v-if="Reason1_txt">
                        <!-- 申请原因 -->
                        <div class="alert_cen" v-if="reasonStatus == 0">
                            <div class="alert_tit">{{ goodsDate.tips.shenqingyuanyin }}</div>
                            <div
                                class="or_view1"
                                v-for="(item, index) in goodsDate.apply_reason"
                                :key="index"
                                @click="switchTab(index, item)"
                            >
                                <div class="or_view_L1">
                                    <div
                                        :class="
                                            resonIndex == index
                                                ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                : 'shoppingContent_radio'
                                        "
                                        :style="{
                                            background: resonIndex == index ? bgcColor1 : '',
                                            borderColor: (resonIndex == index ? bgcColor1 : '') + '!important'
                                        }"
                                    >
                                        <img
                                            src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                            alt="check"
                                            v-if="resonIndex == index"
                                        />
                                    </div>
                                </div>
                                <div class="or_view_R1">{{ item }}</div>
                            </div>
                        </div>
                        <!-- 返回方式 -->
                        <!-- <div class="alert_cen" v-if="reasonStatus == 1}}">
                                <div class="alert_tit">返回方式</div>
                                <div class="or_view1" v-for="apply_reason2}}" :key="index" @click="switchTab" data-index="{{index}}" data-name="{{item.name}}">
                                <div class="or_view_L1"> <div
                                    class="{{backIndex == index ? 'shoppingContent_checkRadio shoppingContent_radio' : 'shoppingContent_radio'}}"
                                    style="background:{{ backIndex == index ? bgcColor1 : '' }};border-color:{{ backIndex == index ? bgcColor1 : '' }}!important;"
                                    >
                                    <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png" alt="check" v-if="backIndex == index}}" />
                                    </div></div>
                                <div class="or_view_R1">{{item.name}}</div>
                                </div>
                            </div> -->

                        <!-- 包装状态 -->
                        <div class="alert_cen" v-if="reasonStatus == 2">
                            <div class="alert_tit">{{ goodsDate.tips.baozhuangzhuangtai }}</div>
                            <div
                                class="or_view1"
                                v-for="(item, index) in apply_reason3"
                                :key="index"
                                @click="switchTab(index, item.name)"
                            >
                                <div class="or_view_L1">
                                    <div
                                        :class="
                                            bagIndex == index
                                                ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                : 'shoppingContent_radio'
                                        "
                                        :style="{
                                            background: bagIndex == index ? bgcColor1 : '',
                                            borderColor: (bagIndex == index ? bgcColor1 : '') + '!important'
                                        }"
                                    >
                                        <img
                                            src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                            alt="check"
                                            v-if="bagIndex == index"
                                        />
                                    </div>
                                </div>
                                <div class="or_view_R1">{{ item.name }}</div>
                            </div>
                        </div>
                        <div class="alert_bottom" @click="changeYL1">{{ goodsDate.tips.wancheng }}</div>
                    </div>
                    <!-- 取件时间弹窗 -->
                    <div class="alert_c" v-if="menTime" style="background:#fff;">
                        <div class="alert_c_top">
                            <div class="alert_c_top_left">取件时间</div>
                            <div class="alert_c_top_right" @click="coloseModal2">
                                <img
                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Close.png"
                                />
                            </div>
                        </div>
                        <div class="alert_c_bottom">
                            <div class="alert_c_bottom_left">
                                <div class="alert_c_bottom_left_child alert_child_active">
                                    <span>6月10日(今天)</span>
                                </div>
                                <div class="alert_c_bottom_left_child">
                                    <span>6月10日(今天)</span>
                                </div>
                                <div class="alert_c_bottom_left_child">
                                    <span>6月10日(今天)</span>
                                </div>
                                <div class="alert_c_bottom_left_child">
                                    <span>6月10日(今天)</span>
                                </div>
                                <div class="alert_c_bottom_left_child">
                                    <span>6月10日(今天)</span>
                                </div>
                                <div class="alert_c_bottom_left_child">
                                    <span>6月10日(今天)</span>
                                </div>
                                <div class="alert_c_bottom_left_child">
                                    <span>6月10日(今天)</span>
                                </div>
                                <div class="alert_c_bottom_left_child">
                                    <span>6月10日(今天)</span>
                                </div>
                                <div class="alert_c_bottom_left_child">
                                    <span>6月10日(今天)</span>
                                </div>
                                <div class="alert_c_bottom_left_child">
                                    <span>6月10日(今天)</span>
                                </div>
                            </div>
                            <div class="alert_c_bottom_right">
                                <div class="alert_c_bottom_right_top alert_c_time_active">
                                    <span>上午</span>
                                    <div :style="{ color: bgcColor1, borderColor: bgcColor1 }">9:00-15:00</div>
                                </div>
                                <div class="alert_c_bottom_right_top">
                                    <span>下午</span>
                                    <div>9:00-15:00</div>
                                </div>
                            </div>
                        </div>
                        <!-- 确认按钮 -->
                        <div class="time_confim" :style="{ background: bgcColor1 }">
                            <span>确认</span>
                        </div>
                    </div>

                    <!-- 供应链编辑地址弹窗 -->
                    <div
                        class="supplyChain"
                        :style="{ transform: areaTransform ? 'translateY(-1rem)' : '' }"
                        v-if="editorAddressStatus"
                    >
                        <div class="supplyChain_top">
                            <div class="alert_tit_txt">{{ goodsDate.tips.bianjidizhi }}</div>
                            <div class="Close" @click="coloseModal">
                                <img
                                    src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_Close.png"
                                />
                            </div>
                        </div>
                        <div class="supplyChain_bottom">
                            <div class="supplyChain_bottom_child" @click.stop="chooseAddress">
                                <div class="supplyChain_bottom_child_left">{{ goodsDate.tips.suozaidiqu }}</div>
                                <div class="supplyChain_bottom_child_right" style="padding-right:0.29rem;">
                                    <span>{{
                                        cityValue ? cityValue : goodsDate.tips.qingxuanze + goodsDate.tips.suozaidiqu
                                    }}</span>
                                    <img
                                        src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_arrow1.png"
                                    />
                                </div>
                            </div>
                            <div class="supplyChain_bottom_child">
                                <div class="supplyChain_bottom_child_left">{{ goodsDate.tips.xiangxidizhi }}</div>
                                <div class="supplyChain_bottom_child_right" style="padding-right:1rem;">
                                    <textarea
                                        class="textarea_txt"
                                        :value="describe"
                                        @input="describeInput($event.target.value)"
                                        placeholder="请填写详细地址"
                                        style="border:0;"
                                    ></textarea>
                                </div>
                            </div>
                            <div class="supplyChain_bottom_child">
                                <div class="supplyChain_bottom_child_left">{{ goodsDate.tips.lianxiren }}</div>
                                <div class="supplyChain_bottom_child_right" style="padding-right:1rem;">
                                    <input
                                        type="text"
                                        :value="contactPeople"
                                        @input="contactPeopleInput(0, $event.target.value)"
                                        :placeholder="goodsDate.tips.qingshuru + goodsDate.tips.lianxiren"
                                    />
                                </div>
                            </div>
                            <div class="supplyChain_bottom_child">
                                <div class="supplyChain_bottom_child_left">{{ goodsDate.tips.dianhua }}</div>
                                <div class="supplyChain_bottom_child_right" style="padding-right:1rem;">
                                    <input
                                        type="text"
                                        :value="editorPhone"
                                        @input="contactPeopleInput(1, $event.target.value)"
                                        :placeholder="goodsDate.tips.qingshuru + goodsDate.tips.dianhua"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="supplyChain_btn" :style="{ background: bgcColor1 }" @click="coloseModal(1)">
                            {{ goodsDate.tips.queding }}
                        </div>
                    </div>

                    <!-- 退换货说明弹窗 -->
                    <div class="alert_c1" v-if="instructions">
                        <div class="a_Explain_tit">{{ goodsDate.tips.tuihuanhuoshuoming }}</div>
                        <div class="alert_cen1">
                            <div v-html="goodsDate.explain"></div>
                        </div>
                        <div class="alert_bottom" @click="changeYL1">{{ goodsDate.tips.queding }}</div>
                    </div>
                    <!-- 退换货说明结束 -->
                    <!-- 选择城市 -->
                    <CityAlert
                        ref="cityRef"
                        @passCity="passCityFun"
                        :theme="theme"
                        :bgcColor1="bgcColor1"
                        :cluesStr="clues"
                    />
                </div>
            </div>
        </section>
    </section>
</template>

<script>
const { log } = console;
// vant组件
import Hint from "@/plugins/hint";
import util from "@/libs/util";

// 退换货显示、提交接口
import { getUserReturnsApplication, liveImgUpload } from "@/api/order/afterSales.js";
// 地址
import { addressInfo } from "@/api/address/addressList.js";

// 供应链编码
import { getJdAddressCode } from "@/api/gyl.js";

// 省市区组件
import CityAlert from "@/pages/address/components/city-alert.vue";
// 色系
import { getColor } from "@/api/order/submitOrder.js";
// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";
export default {
    components: {
        Nav,
        CityAlert
    },
    data() {
        return {
            showModal: false,
            // 颜色
            theme: "color1",
            Reason1_txt: false,
            resonIndex: 9,
            num: 0,
            num1: 0,
            num2: 1,
            goodsDate: "",
            applyNum: 1,
            imagesList_back: [],
            imagesList: [],
            textareaValue: "",
            showModal2: false,
            backIndex: 0,
            bagIndex: 0,
            apply_reason3: [],
            cityValue: "",
            showLoading: true,
            placeVal: false,
            applicationWay: false,
            menTime: false,
            areaTransform: false,
            textareState: false,
            describe: "",
            editorPhone: "",
            instructions: false,
            editorAddressStatus: false,
            fileList: "",
            jdStatus: 0,
            goodsValueType: 0,
            address_info: "",
            contactPeople: "",
            cityNum: 0,
            bgcColor1: "",
            RefundWay: false, //退款方式
            refundWayVal: "",
            kaihuhang_val: "", //开户行
            kahao_val: "", //卡号
            huming_val: "", //户名
            beizhu_val: "", //备注
            returnType: []
        };
    },
    mounted() {
        // Hint.ImagePre(['https://img.yzcdn.cn/vant/apple-1.jpg']);
        // this.$cookies.set("zz_userid","22185130");
        if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            return false;
        }
        this.getColorFun();
        let that = this,
            orderId = that.$route.query.orderId,
            detailId = that.$route.query.detailId,
            req = that.$route.query.req ? that.$route.query.req : "",
            redirect = that.$route.query.redirect,
            salesType = that.$route.query.salesType, //1退货 2换货 3退款 4维修(京东供应链使用)
            jdStatus = that.$route.query.jdStatus; //等于1代表是供应链商品
        that.order_id = orderId;
        that.detail_id = detailId;
        that.redirect = redirect;
        that.salesType = salesType;
        that.jdStatus = jdStatus;
        that.jdWay = that.$route.query.jdWay;
        that.textareaValue = util.functions.ifHaveFun(that.$route.query.textareaValue)
            ? that.$route.query.textareaValue
            : "";
        if (util.functions.ifHaveFun(that.$route.query.imagesList_back)) {
            that.imagesList_back = JSON.parse(decodeURIComponent(that.$route.query.imagesList_back));
        }
        // if(util.functions.ifHaveFun(that.$route.query.beizhu_val)){
        //     that.beizhu_val = that.$route.query.beizhu_val
        // }
        // 色系值
        if (jdStatus == 1) {
            if (!util.functions.ifHaveFun(req)) {
                req = {};
                req.is_JD = 1;
            } else {
                if (typeof req == "string") {
                    req = JSON.parse(req);
                }
                req.is_JD = 1;
            }
            req = JSON.stringify(req);
        }
        that.returnGoods(orderId, detailId, req);
    },
    methods: {
        // 退换货接口
        returnGoods(orderId, detailId, req, subNum) {
            let that = this;
            that.showLoading = true;
            let redirect_info = {
                redirect: that.redirect
            };
            let paramJson = {
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                order_id: orderId,
                detail_id: detailId,
                req: req,
                redirect_info: JSON.stringify(redirect_info),
                is_JD: util.functions.ifHaveFun(that.jdStatus) ? 1 : 0,
                client_type: 1
            };
            getUserReturnsApplication(paramJson)
                .then(res => {
                    that.showLoading = false;
                    that.apply_reason3 = [
                        {
                            name: res.tips.wubaozhuang,
                            type: 0
                        },
                        {
                            name: res.tips.baozhuangwanzheng,
                            type: 10
                        },
                        {
                            name: res.tips.baozhuangposun,
                            type: 20
                        }
                    ];
                    if (subNum == 1) {
                        // if (that.jdStatus == 1) {
                        that.$router.replace({
                            path: "/order/orderRelated/afterSalesList",
                            query: {
                                username: this.$route.query.username
                            }
                        });
                        this.$cookies.set("afterSales_state", 1);
                        // }
                        //  else{
                        //     if (res.redirect_info.redirect == "orderList") {
                        //         that.$router.push({
                        //             path: "/order/orderRelated/orderList",
                        //             query: {
                        //                 username: this.$route.query.username
                        //             }
                        //         });
                        //     } else if (res.redirect_info.redirect == "orderDetail") {
                        //         that.$router.push({
                        //             path: "/order/orderRelated/orderDetail",
                        //             query: {
                        //                 orderId: that.order_id,
                        //                 username: this.$route.query.username
                        //             }
                        //         });
                        //     } else if (res.redirect_info.redirect == "returnList") {
                        //         that.$router.push({
                        //             path: "/order/orderRelated/afterSalesList",
                        //             query: {
                        //                 orderId: that.order_id,
                        //                 username: this.$route.query.username
                        //             }
                        //         });
                        //         this.$cookies.set("afterSales_state", 1);
                        //     } else if (res.redirect_info.redirect == "returnListnone") {
                        //         that.$router.push({
                        //             path: "/order/orderRelated/afterSalesList",
                        //             query: {
                        //                 username: this.$route.query.username
                        //             }
                        //         });
                        //         this.$cookies.set("afterSales_state", 1);
                        //     }
                        // }
                        return false;
                    }

                    let goodsDate = res,
                        apply_method = res.apply_method,
                        goodsValue = "",
                        apply_reason = res.apply_reason,
                        goodsValueType = 0;
                    that.clues = res.tips;

                    // 地址编码接口
                    if (util.functions.ifHaveFun(goodsDate.user_receive_info) && that.jdStatus == 1) {
                        that.address_info = util.functions.ifHaveFun(res.address_info) ? res.address_info : "";
                        if (util.functions.ifHaveFun(that.jdWay)) {
                            //从地址列表带过来的参数
                            let jdWayVal = JSON.parse(decodeURIComponent(that.jdWay));
                            that.contactPeople = jdWayVal.contactPeople;
                            that.editorPhone = jdWayVal.editorPhone;
                            that.describe = jdWayVal.describe;
                            that.cityValue = jdWayVal.cityValue;
                            that.salesType = jdWayVal.salesType;
                            that.imagesList_back = util.functions.ifHaveFun(jdWayVal.imagesList_back)
                                ? [...jdWayVal.imagesList_back]
                                : [];
                            that.bagIndex = jdWayVal.bagIndex;
                            that.resonIndex = jdWayVal.resonIndex;
                            that.applyNum = jdWayVal.applyNum;
                            if (util.functions.ifHaveFun(jdWayVal.textareaValue)) {
                                that.textareaValue = jdWayVal.textareaValue;
                            }
                            that.getAddressCodingt(that.cityValue, 1);
                        } else {
                            that.contactPeople = res.address_info.name;
                            that.editorPhone = res.address_info.tel;
                            that.describe = res.address_info.simple_address;
                            that.cityValue =
                                res.address_info.province +
                                " " +
                                res.address_info.city +
                                " " +
                                res.address_info.district;
                        }

                        that.getAddressCodingt(
                            goodsDate.user_receive_info.province +
                                goodsDate.user_receive_info.city +
                                goodsDate.user_receive_info.district,
                            0
                        );
                        if (util.functions.ifHaveFun(res.returnType)) {
                            that.returnType = res.returnType;
                        }
                    }
                    if (apply_method.length) {
                        if (apply_method.length == 1) {
                            goodsValue = apply_method[0].name;
                        } else {
                            goodsValue = apply_method.filter(item => item.type == 1)[0].name;
                            goodsValueType = apply_method.filter(item => item.type == 1)[0].type;
                        }
                    }
                    goodsDate.explain = goodsDate.explain.replace(/\<img/g, '<img class="paragra_img"');
                    // 非供应链，且是换货选择地址之后跳转回来
                    if (that.jdStatus != 1 && util.functions.ifHaveFun(that.$route.query.goodsValueType)) {
                        goodsValueType = that.$route.query.goodsValueType;
                        goodsValue = apply_method.filter(item => item.type == that.$route.query.goodsValueType)[0].name;
                        that.num1 = 1;
                        that.typeScales = apply_method.filter(
                            item => item.type == that.$route.query.goodsValueType
                        )[0].type;
                    }

                    let val = String(goodsDate.pro_info.price);
                    let val_left = val.substring(0, val.indexOf("."));
                    let val_right = val.replace(/\d+\.(\d*)/, "$1");
                    goodsDate.pro_info.shiji_money_left = val_left;
                    goodsDate.pro_info.shiji_money_right = val_right;

                    that.goodsDate = goodsDate;
                    that.applyNum = res.apply_max_num;
                    that.goodsValue = goodsValue;
                    that.goodsValueType = goodsValueType;
                    that.apply_reason_status = util.functions.ifHaveFun(apply_reason) ? true : false;
                    that.user_receive_info = util.functions.ifHaveFun(res.user_receive_info)
                        ? res.user_receive_info
                        : false;
                })
                .catch(err => {
                    that.showLoading = false;
                    if (err.code == 2300002) {
                        that.$router.push({
                            path: "/order/orderRelated/afterSalesDetail",
                            query: {
                                id: res.return_id,
                                username: this.$route.query.username
                            }
                        });
                    } else {
                        if (err.confirm) {
                            that.$router.replace({
                                path: "/order/orderRelated/afterSalesList",
                                query: {
                                    username: this.$route.query.username
                                }
                            });
                            this.$cookies.set("afterSales_state", 1);
                            // if (err.redirect_info.redirect == "orderList") {
                            //     that.$router.push({
                            //         path: "/order/orderRelated/orderList",
                            //         query: {
                            //             id: res.return_id,
                            //             username: this.$route.query.username
                            //         }
                            //     });
                            // } else if (err.redirect_info.redirect == "orderDetail") {
                            //     that.$router.push({
                            //         path: "/order/orderRelated/orderDetail",
                            //         query: {
                            //             orderId: that.order_id,
                            //             username: this.$route.query.username
                            //         }
                            //     });
                            // } else if (err.redirect_info.redirect == "returnList") {
                            //     that.$router.push({
                            //         path: "/order/orderRelated/afterSalesList",
                            //         query: {
                            //             username: this.$route.query.username
                            //         }
                            //     });
                            //     this.$cookies.set("afterSales_state", 1);
                            // }
                        } else {
                            Hint.Alert({
                                message: err.msg
                            }).then(() => {
                                window.history.back();
                            });
                        }
                    }
                });
        },

        // 色系接口
        getColorFun() {
            let that = this;
            getColor({ username: this.$route.query.username }).then(res => {
                that.bgcColor1 = util.functions.newColor(res.color).bgcColor1;
            });
        },

        /**
         * @description: 上传封面
         * @param {event，type} : {获取的file对象}, {1：图片，2：文件}
         * @return:
         */
        coverUpload(event, type) {
            let that = this,
                file = event.srcElement, //当前file对象
                files = file.files[0];
            if (that.imagesList_back.length == 3) {
                Hint.Msg({
                    message: that.goodsDate.tips.zuiduokeshangshuanjizhang
                });
                return false;
            }
            if (type == 1) {
                if (files.type && !/png|jpeg|gif|jpg/.test(files.type.toLowerCase())) {
                    Hint.Msg({
                        message: that.goodsDate.tips.jinzhichigeshi
                    });
                    return false;
                }
                if (files.size > 5242880) {
                    Hint.Msg({
                        message: that.goodsDate.tips.jinzhichigeshi
                    });
                    return false;
                }
            }
            this.showLoading = true;
            liveImgUpload(file).then(res => {
                this.showLoading = false;
                if (type == 1) {
                    this.headImgSrc = res.path;
                }
                that.imagesList_back.push(res);
                that.$forceUpdate();
            });
        },
        // 增加
        addNumer() {
            this.applyNum =
                this.applyNum < this.goodsDate.apply_max_num ? this.applyNum + 1 : this.goodsDate.apply_max_num;
        },
        // 减少
        reduceNum() {
            this.applyNum = this.applyNum > 1 ? this.applyNum - 1 : 1;
        },

        // 删除图片
        deleteImg(index) {
            // let imagesList_back = this.imagesList_back;
            this.imagesList_back.splice(index, 1);
        },
        inputReson(value) {
            this.textareaValue = value;
        },
        // 提交申请
        submitDate() {
            // 判断申请原因
            if (!util.functions.ifHaveFun(this.textareaValue)) {
                Hint.Msg({
                    message: this.goodsDate.tips.qingshuru + this.goodsDate.tips.shenqingyuanyin
                });
                return false;
            }

            // 退换货
            let typeScales = this.typeScales ? this.typeScales : this.goodsDate.apply_method[0].type;
            // 图片
            let imgArr = {};
            for (let i in this.imagesList_back) {
                var key = "pro_pic" + String(parseInt(i) + 1 == 1 ? "" : parseInt(i) + 1);
                imgArr[key] = this.imagesList_back[i].path;
            }
            // 供应链商品且是退货的时候不判断收货地址
            if (!util.functions.ifHaveFun(this.user_receive_info) && this.salesType != 1) {
                Hint.Msg({
                    message: this.goodsDate.tips.qingtianjiashouhuodizhi
                });
                return false;
            }
            let req = {
                type: 1,
                server_type: typeScales,
                description: this.textareaValue,
                pic_info: imgArr,
                pro_num: this.applyNum,
                link_user: this.user_receive_info.name,
                mobile: this.user_receive_info.tel ? this.user_receive_info.tel : "",
                address: this.user_receive_info.address ? this.user_receive_info.address : ""
            };
            // 退款
            if (typeScales == 1) {
                // 退款方式
                req.return_accounts = parseInt(this.num2);
                // 银行卡填写信息
                if (this.num2 == 2) {
                    if (!util.functions.ifHaveFun(this.kaihuhang_val)) {
                        Hint.Msg({
                            message: this.goodsDate.tips.qingtianxie + this.goodsDate.tips.kaihuhang
                        });
                        return false;
                    }
                    if (!util.functions.ifHaveFun(this.kahao_val)) {
                        Hint.Msg({
                            message: this.goodsDate.tips.qingtianxie + this.goodsDate.tips.kahao
                        });
                        return false;
                    }
                    if (!util.functions.ifHaveFun(this.huming_val)) {
                        Hint.Msg({
                            message: this.goodsDate.tips.qingtianxie + this.goodsDate.tips.huming
                        });
                        return false;
                    }
                    req.return_bank = this.kaihuhang_val;
                    req.return_number = this.kahao_val;
                    req.return_name = this.huming_val;
                    // if (util.functions.ifHaveFun(this.beizhu_val)) {
                    //     req.apply_reason = this.beizhu_val;
                    // } else {
                    //     delete req.apply_reason;
                    // }
                }
            } else {
                delete req.return_accounts;
            }
            // 供应链商品
            if (this.jdStatus == 1) {
                if (this.goodsDate.returnType[0].code == 40) {
                    this.coding = 1;
                    this.coding2 = 1;
                    this.describe = 1;
                    this.contactPeople = 1;
                }
                // 所在地区
                if (!util.functions.ifHaveFun(this.coding) && !util.functions.ifHaveFun(this.coding2)) {
                    Hint.Msg({
                        message: this.goodsDate.tips.qingxuanze + this.goodsDate.tips.suozaidiqu
                    });
                    return false;
                }
                // 详细地址
                if (!util.functions.ifHaveFun(this.describe)) {
                    Hint.Msg({
                        message: this.goodsDate.tips.qingtianxie + this.goodsDate.tips.xiangxidizhi
                    });
                    return false;
                }
                if (!util.functions.ifHaveFun(this.contactPeople)) {
                    Hint.Msg({
                        message: this.goodsDate.tips.qingtianxie + this.goodsDate.tips.lianxiren
                    });
                    return false;
                }
                if (!util.functions.ifHaveFun(this.editorPhone)) {
                    Hint.Msg({
                        message: this.goodsDate.tips.qingtianxie + this.goodsDate.tips.dianhua
                    });
                    return false;
                }
                if (!this.phoneFun(this.editorPhone) && this.goodsDate.returnType[0].code != 40) {
                    Hint.Msg({
                        message: this.goodsDate.tips.dianhua + this.goodsDate.tips.canshuyouwu
                    });
                    return false;
                }
                // 商品id
                req.prodId = this.goodsDate.pro_info.proId;
                // 申请原因
                req.apply_reason = this.resonIndex;
                // 商品状态
                req.isHasPackage = this.apply_reason3[this.bagIndex].type == 0 ? false : true;
                req.packageDesc = this.apply_reason3[this.bagIndex].type;
                // 申请方式
                req.server_type = this.salesType;
                // 取件方式为固定是上门取件
                req.pickwareType = this.goodsDate.returnType[0].code;
                // 地址编码
                req.pickwareRegionCode = util.functions.ifHaveFun(this.coding) ? this.coding : this.coding2;
                // 详细地址
                req.pickwareAddress = this.describe;
                // 联系人
                req.customerContactName = this.contactPeople;
                // 电话
                req.customerMobilePhone = this.editorPhone;
                // 返件方式 自营配送(10),第三方配送(20);
                req.returnwareType = 10;
                // 返件信息返件区划代码
                req.returnwareRegionCode = this.coding2;
                // 返件信息返件街道地址
                req.returnwareAddress = this.goodsDate.user_receive_info.address;
                // address
                let cityVal = this.cityValue.replace(/[\s]+/g, "");
                req.address = cityVal + this.describe;
                req.is_JD = 1;
                // 退款方式：原支付返回
                req.return_accounts = 3;
            }
            // console.log(req);
            // return false;
            this.returnGoods(this.order_id, this.detail_id, JSON.stringify(req), 1);
        },
        // 地址详情
        addresInfo(id) {
            let that = this;
            that.showLoading = true;
            let paramsJson = {
                type: 4,
                req: {
                    id: id
                },
                zz_userid: that.$cookies.get("zz_userid"),
                username: that.$route.query.username
            };
            addressInfo(paramsJson)
                .then(res => {
                    that.editorAddressStatus = true;
                    that.showModal = true;
                    that.addressList = res.form_info;
                    let addressList = res.form_info;
                    for (let i in addressList) {
                        if (addressList[i].system_type == 2) {
                            //所在地区
                            let cityValue = addressList[i].default_value,
                                cityValue2 = "";

                            if (util.functions.ifHaveFun(cityValue)) {
                                // 省
                                if (util.functions.ifHaveFun(cityValue.province)) {
                                    cityValue2 = cityValue2 + cityValue.province + " ";
                                }
                                // 市
                                if (util.functions.ifHaveFun(cityValue.city)) {
                                    cityValue2 = cityValue2 + cityValue.city + " ";
                                }
                                // 区
                                if (util.functions.ifHaveFun(cityValue.district)) {
                                    cityValue2 = cityValue2 + cityValue.district + " ";
                                }
                                // 街道
                                if (util.functions.ifHaveFun(cityValue.street)) {
                                    cityValue2 = cityValue2 + cityValue.street + " ";
                                }
                                // 小区
                                if (util.functions.ifHaveFun(cityValue.xiaoqu)) {
                                    cityValue2 = cityValue2 + cityValue.xiaoqu;
                                }
                                that.cityValue = util.functions.ifHaveFun(that.cityValue) ? that.cityValue : cityValue2;
                            }
                        }
                        // 详细地址
                        if (addressList[i].system_type == 3) {
                            that.describe =
                                util.functions.ifHaveFun(that.describe) || that.describe == ""
                                    ? that.describe
                                    : addressList[i].default_value;
                        }
                        //联系人
                        if (addressList[i].system_type == 1) {
                            that.contactPeople =
                                util.functions.ifHaveFun(that.contactPeople) || that.contactPeople == ""
                                    ? that.contactPeople
                                    : addressList[i].default_value;
                        }
                        // 电话
                        if (addressList[i].system_type == 4) {
                            that.editorPhone =
                                util.functions.ifHaveFun(that.editorPhone) || that.editorPhone == ""
                                    ? that.editorPhone
                                    : addressList[i].default_value;
                        }
                    }
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Msg({
                        message: err.msg
                    });
                });
        },
        // 跳转地址列表
        addressList() {
            let jdWay = {},
                tuikuanJson = {};
            if (this.jdStatus == 1) {
                jdWay.contactPeople = this.contactPeople;
                jdWay.editorPhone = this.editorPhone;
                jdWay.describe = this.describe;
                jdWay.cityValue = this.cityValue;
                jdWay.bagIndex = this.bagIndex;
                jdWay.resonIndex = this.resonIndex;
                jdWay.textareaValue = util.functions.ifHaveFun(this.textareaValue) ? this.textareaValue : "";
                jdWay.imagesList_back = this.imagesList_back;
                jdWay.salesType = this.salesType;
                jdWay.applyNum = this.applyNum;
            }

            // let typeScales = this.typeScales ? this.typeScales : this.goodsDate.apply_method[0].type;
            // // 退款的状态存储
            // if(typeScales == 1){
            //     tuikuanJson.typeScales = typeScales;
            //     // 退款方式是银行卡
            //     if(this.num2 == 1){
            //         tuikuanJson.kaihuhang_val = this.kaihuhang_val;
            //         tuikuanJson.kahao_val = this.kahao_val;
            //         tuikuanJson.huming_val = this.huming_val;
            //     }
            // }else{
            //     tuikuanJson = {};
            // }
            this.$router.push({
                path: "/address/views/addressList",
                query: {
                    username: this.$route.query.username,
                    is_set: 2,
                    orderId: this.order_id,
                    detailId: this.detail_id,
                    redirect: this.redirect,
                    jdStatus: this.jdStatus,
                    jdWay: encodeURIComponent(JSON.stringify(jdWay)),
                    goodsValueType: this.goodsValueType,
                    textareaValue: this.textareaValue,
                    imagesList_back: encodeURIComponent(JSON.stringify(this.imagesList_back))
                }
            });
            // location.href =
            //     "//" +
            //     document.domain +
            //     `/VFrontend/address/views/addressList?username=${this.$route.query.username}&is_set=${2}&orderId=${
            //         this.order_id
            //     }&detailId=${this.detail_id}&redirect=${this.redirect}&jdStatus=${
            //         this.jdStatus
            //     }&jdWay=${encodeURIComponent(JSON.stringify(jdWay))}&goodsValueType=${
            //         this.goodsValueType
            //     }&textareaValue=${this.textareaValue}`;
        },
        /**
         * 申请方式
         */
        changeYL() {
            // 供应链商品不可选择
            if (this.jdStatus == 1) {
                return false;
            }
            this.showModal = true;
            this.applicationWay = true;
        },
        changeYL1() {
            this.showModal = false;
            this.applicationWay = false;
            this.Reason1_txt = false;
            this.instructions = false;
            this.RefundWay = false;
        },
        // 阴影点击
        coloseModal(save) {
            // 供应链编辑地址 点击保存信息判断
            if (save == 1) {
                // 详细地址
                if (!util.functions.ifHaveFun(this.describe)) {
                    Hint.Msg({
                        message: this.goodsDate.tips.qingtianxie + this.goodsDate.tips.suozaidiqu
                    });
                    return false;
                }
                if (!util.functions.ifHaveFun(this.contactPeople)) {
                    Hint.Msg({
                        message: this.goodsDate.tips.qingtianxie + this.goodsDate.tips.lianxiren
                    });
                    return false;
                }
                if (!util.functions.ifHaveFun(this.editorPhone)) {
                    Hint.Msg({
                        message: this.goodsDate.tips.qingtianxie + this.goodsDate.tips.dianhua
                    });
                    return false;
                }
                if (!this.phoneFun(this.editorPhone)) {
                    Hint.Msg({
                        message: this.goodsDate.tips.dianhua + this.goodsDate.tips.canshuyouwu
                    });
                    return false;
                }
            }
            this.showModal = false;
            this.applicationWay = false;
            this.Reason1_txt = false;
            this.instructions = false;
            this.editorAddressStatus = false;
            this.menTime = false;
            this.textareState = false;
            this.areaTransform = false;
            this.RefundWay = false;
        },
        /**
         * 申请原因
         */
        Reason1(type) {
            // 0 代表申请原因  1代表返回方式 2代表包装状态
            this.reasonStatus = type;
            this.Reason1_txt = true;
            this.showModal = true;
        },
        // 退换货说明
        instructionsBtn() {
            this.instructions = true;
            this.showModal = true;
            // applicationWay: true,
        },
        switchTab(index, name) {
            if (this.reasonStatus == 0) {
                //0 代表申请原因
                this.resonIndex = index;
                this.whyReason = name;
            } else if (this.reasonStatus == 1) {
                //1代表返回方式
                this.backIndex = index;
                this.backName = name;
            } else if (this.reasonStatus == 2) {
                //2代表包装状态
                this.bagIndex = index;
            }
        },
        // 退换货
        switchTab1(name, type, index) {
            let goodsValueArr = this.goodsDate.apply_method,
                goodsValueType;
            for (let i in goodsValueArr) {
                if (goodsValueArr[i].name == name) {
                    goodsValueType = goodsValueArr[i].type;
                }
            }
            this.num1 = index;
            this.goodsValue = name;
            this.goodsValueType = goodsValueType;
            this.typeScales = type;
        },
        // 退款方式
        switchTab2(index) {
            this.num2 = index;
            this.refundWayVal = this.goodsDate.refundMethod[index];
        },
        changeMenTime() {
            this.menTime = true;
            this.showModal = true;
        },

        // 供应链商品状态选择
        shopStatus(type) {
            // 商品状态
            if (type == 0) {
                this.showModal = true;
                this.Reason1_txt = true;
                this.reasonStatus = 2;
            } else if (type == 1) {
                //请上门取货前与我取得联系
                this.dooCrontact = !this.dooCrontact;
            }
        },
        // 供应链地址信息弹窗
        editorAddress() {
            // 请求地址详情接口
            this.placeVal = false;
            this.editorAddressStatus = true;
            this.showModal = true;
        },
        // 供应链地址选择
        chooseAddress() {
            this.textareState = false;
            this.areaTransform = false;
            if (!util.functions.ifHaveFun(this.cityValue) || this.cityNum == 0) {
                this.$refs.cityRef.cityOne();
                this.cityNum++;
            }
            this.$refs.cityRef.showCity();
        },
        // 回显省市区
        passCityFun(e) {
            // 必须选到区才更新数据
            if (e.detail == "") {
                return false;
            }
            this.cityValue = e.detail;
            this.getAddressCodingt(e.detail, 1);
        },
        // 供应链编码获取
        getAddressCodingt(address, type) {
            let that = this;
            getJdAddressCode({
                username: that.$route.query.username,
                address: address
            }).then(res => {
                if (type == 0) {
                    //收货地址的编码
                    that.coding2 = res;
                } else if (type == 1) {
                    //取件地址的编码
                    that.coding = res;
                }
            });
        },
        describeInput(value) {
            this.describe = value;
        },
        // 回显省市区
        passCityFun(city) {
            // 必须选到区才更新数据
            if (city == "") {
                return false;
            }
            this.cityValue = city;
        },
        // 退款方式弹窗
        returnClick() {
            if (this.jdStatus != 1) {
                this.RefundWay = true;
                this.showModal = true;
            }
        },

        // 供应链编辑地址：联系人 电话
        contactPeopleInput(type, value) {
            if (type == 0) {
                //联系人
                this.contactPeople = value;
            } else if (type == 1) {
                //电话
                this.editorPhone = value;
            }
        },
        //判断是否为手机号的正则表达式
        phoneFun(phones) {
            var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if (!myreg.test(phones)) {
                return false;
            } else {
                return true;
            }
        }
    }
};
</script>

<style lang="scss">
@import "@/pages/order/assets/css/returnGoods.scss";
@import "../../../../assets/fonts/order/duihao/iconfont.css";
</style>

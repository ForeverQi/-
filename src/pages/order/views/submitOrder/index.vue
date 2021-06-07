<!--
 * @Author       : zhouqi
 * @description  : 提交订单页面
 * @Date         : 2020-09-08 15:43:40
 * @LastEditors  : zhouqi
 * @LastEditTime : 2021-06-07 13:57:20
 * @FilePath     : /vue-VFrontend/src/pages/order/views/submitOrder/index.vue
-->
<template>
    <div class="submitOrder-homePage" :class="theme">
        <van-loading v-if="showLoading" size="50px" color="#1989fa" :style="{ top: payBackStatus ? '40%' : '' }" />
        <van-overlay :show="showLoading" />
        <div v-if="submitDate != ''" v-wechat-title="($route.meta.title = submitDate.tips.dingdanjiesuan)">
            <div class="contianer contianer-order">
                <Nav :numerical="0" :tips="submitDate.tips" :newColor="newColor1"/>
                <!--背景色-->
                <div class="newDetail_bgc" v-if="order_type != 21 && (order_type != 14 && !submitDate.otherOrderProductsInfo)" :style="{ background: 'linear-gradient(to bottom,' + newColor1 +',rgba(255, 255, 255, 0.1))'}"></div>
                <!-- 门店配送，自提选择 -->
                <div class="changeWays" v-if="community_delivery == 1">
                    <div
                        :class="changeWay == 0 ? 'changeWays_left changeWays_active' : 'changeWays_left'"
                        @click="changeWayFun(0)"
                        :style="{ color: changeWay == 0 ? bgcColor1 : '' }"
                    >
                        <span>{{ submitDate.community_title }}</span>
                        <div
                            class="changeWays_view"
                            v-if="changeWay == 0"
                            :style="{ background: changeWay == 0 ? bgcColor1 : '' }"
                        ></div>
                    </div>
                    <div
                        :class="changeWay == 1 ? 'changeWays_right changeWays_active' : 'changeWays_right'"
                        @click="changeWayFun(1)"
                        :style="{ color: changeWay == 1 ? bgcColor1 : '' }"
                    >
                        <span>自提</span>
                        <div
                            class="changeWays_view"
                            v-if="changeWay == 1"
                            :style="{ background: changeWay == 1 ? bgcColor1 : '' }"
                        ></div>
                    </div>
                </div>

                <!-- 新版头部快递配送，同城配送，到店自提 -->
                <div class="changeWays newChangeWays" v-if="delNav.length">
                    <div v-for="(item,index) in delNav" :key="index" style="flex:1">
                        <div v-if="item.type == 'express'" :class="changeNewWay == 0 ? 'cleft_news changeWays_active': 'cleft_news'" @click="changeNewWayFun(0,'express')" :style="{borderTopRightRadius: changeNewWay == 0 ? '0.16rem' : '0rem',color:changeNewWay == 0 ? newColor1 : '',background: changeNewWay == 0 ? '#fff' : '',transform: changeNewWay == 0 ? 'translateY(-0.1rem)' : ''}">
                            <span :style="{ color: changeNewWay == 0 ? newColor1 : '',marginTop:isAndroid ? '0.06rem' : '' }">{{ item.name }}</span>
                            <div class="cl_bgc" :style="{ background: changeNewWay == 0 ? '#fff' : newColor1,opacity: changeNewWay == 0 ? '' : 0.1,borderTopRightRadius: changeNewWay == 0 ? '0.16rem' : '0rem'}"></div>
                            <em class="wayShuxian" v-show="changeNewWay == 2 && delNav.length ==3 "></em>
                        </div>
                        <div v-if="item.type == 'pickup'" :class="changeNewWay == 1 ? 'cright_news changeWays_active': 'cright_news'" @click="changeNewWayFun(1,'pickup')" :style="{borderTopLeftRadius: changeNewWay == 1 ? '0.16rem' : '0rem',borderTopRightRadius: changeNewWay == 1 ? '0.16rem' : '0rem',color: changeNewWay == 1 ? newColor1 : '',background: changeNewWay == 1 ? '#fff' : '',transform: changeNewWay == 1 ? 'translateY(-0.1rem)' : ''}">
                            <span :style="{ color: changeNewWay == 1 ? newColor1 : '',marginTop:isAndroid ? '0.06rem' : '' }">{{ item.name }}</span>
                            <div class="cl_bgc" :style="{ background: changeNewWay == 1 ? '#fff' : newColor1,opacity: changeNewWay == 1 ? '' : 0.1,borderTopLeftTadius: '0.16rem'}"></div>
                            <em class="wayShuxian" v-show="changeNewWay == 0 && delNav.length ==3 "></em>
                        </div>
                        <div v-if="item.type == 'city'" :class="changeNewWay == 2 ? 'cleft_news changeWays_active': 'cleft_news'" @click="changeNewWayFun(2,'city')" :style="{borderTopRightRadius: '0.16rem',borderTopLeftRadius:changeNewWay == 2 ? '0.16rem' : '0rem',color:changeNewWay == 2 ? newColor1 : '',background: changeNewWay == 2 ? '#fff' : '',transform: changeNewWay == 2 ? 'translateY(-0.1rem)' : ''}">
                            <span :style="{ color: changeNewWay == 2 ? newColor1 : '',marginTop:isAndroid ? '0.06rem' : '' }">{{ item.name }}</span>
                            <div class="cl_bgc" :style="{ background: changeNewWay == 2 ? '#fff' : newColor1,opacity: changeNewWay == 2 ? '' : 0.1,borderTopRightRadius: '0.16rem',borderTopLeftRadius:changeNewWay == 2 ? '0.16rem' : '0rem'}"></div>
                        </div>
                    </div>
                </div>
                <div v-if="delNav.length">
                    <!-- 到店自提 -->
                    <div class="shippingAddress2" v-if="changeNewWay == 1">
                        <!-- 到店自提 -->
                        <div class="ddzt" v-if="group_info != '' && Object.keys(group_info).length == 1 && group_info[Object.keys(group_info)[0]].storeInfo && group_info[Object.keys(group_info)[0]].storeInfo.id != 0">
                            <div class="ddzt_left">
                                <div>{{group_info[Object.keys(group_info)[0]].storeInfo.name}}</div>
                                <div>{{group_info[Object.keys(group_info)[0]].storeInfo.province}}{{group_info[Object.keys(group_info)[0]].storeInfo.city}}{{group_info[Object.keys(group_info)[0]].storeInfo.district}}{{group_info[Object.keys(group_info)[0]].storeInfo.address}}</div>
                            </div>
                            <div class="ddzt_right">
                                <div @click="buyWayFun" data-index="0" :data-lng="group_info[Object.keys(group_info)[0]].storeInfo.lng"  :data-lat="group_info[Object.keys(group_info)[0]].storeInfo.lat" :data-name="group_info[Object.keys(group_info)[0]].storeInfo.name" v-if="Object.keys(group_info)[0] == 0">
                                    <span>切换</span>
                                    <i style="font-size: 0.24rem;font-weight: 400;" class="sjzs-icon s-icon-right-1"></i>
                                </div>
                                <div style="font-size: 0.24rem;" :data-name="group_info[Object.keys(group_info)[0]].storeInfo.name" @click="openDT(group_info[Object.keys(group_info)[0]].storeInfo.name,group_info[Object.keys(group_info)[0]].storeInfo.address,group_info[Object.keys(group_info)[0]].storeInfo.lng,group_info[Object.keys(group_info)[0]].storeInfo.lat)"><i style="font-weight: 400;margin-right:0.06rem;font-size: 0.24rem;" class="sjzs-icon s-icon-ditu-1"></i> 查看地图</div>
                            </div>
                        </div>
                        <!-- 姓名，预留电话 -->
                        <div class="shoppingAddress_bottom" :style="{ borderTopWidth: (group_info != '' && (Object.keys(group_info).length != 1 || (group_info[Object.keys(group_info)[0]].storeInfo && group_info[Object.keys(group_info)[0]].storeInfo.id == 0))) ? '0rem' : '1px' }">
                            <span style="width:2.3rem;">提货人</span>
                            <div class="shoppingAddress_bottom_view" style="flex:auto;">
                                <input type="text" placeholder="请输入提货人姓名" placeholder-class="ziti-placehoder" :value="reqVal.reservedName ? reqVal.reservedName : reservedName" @input="zitiInputFun(0,$event.target.value)"/>
                            </div>
                        </div>
                        <div class="shoppingAddress_bottom">
                            <span style="width:2.3rem;">手机号</span>
                            <div class="shoppingAddress_bottom_view" style="flex:auto;">
                                <input type="number" placeholder="请输入提货人手机号" placeholder-class="ziti-placehoder" :value="reqVal.reservedTel ? reqVal.reservedTel :reservedTel" @input="zitiInputFun(1,$event.target.value)"/>
                            </div>
                        </div>
                    </div>
                    <!-- 快递发货, 同城配送 -->
                    <div class="shippingAddress" :style="{ borderTopLeftRadius: delNav.length ? '' : '0.16rem',borderTopRightRadius: delNav.length ? '' : '0.16rem',paddingTop: submitDate.address_info.id == 0 ? '0.40rem' : '',paddingBottom: submitDate.address_info.id == 0 ? '0.40rem' : '',}" v-if="changeNewWay == 0 || changeNewWay == 2">
                        <div class="shippingAddress_center ellipsisStatus" @click="addressClick" :data-type="submitDate.address_info.id">
                            <div class="shippingAddress_center_status ellipsisStatus" :style="{paddingBottom: changeNewWay == 2 && !tcps.send_time_info  ? '0px' : ''}" v-if="submitDate.address_info.id == 0">
                                <div class="sc_statusTop" style="padding-bottom:0" :style="{paddingBottom: changeNewWay == 0 ? '0px' : ''}">
                                    <div>
                                        <i class="sjzs-icon s-icon-plus-1"></i>
                                    </div>
                                    <span class="shippingAddress_center_loaction" style="margin-bottom:0;">{{submitDate.address_info.type == 0 ?submitDate.tips.qingtianjiashouhuodizhi : submitDate.tips.qingxuanzeshouhuodizhi}}</span>
                                </div>
                            </div>
                            <div class="ellipsisStatus" style="padding-bottom:0.3rem" v-else>
                                <div style="display:flex;align-items: center;justify-content: space-between;">
                                    <div style="overflow:hidden;">
                                        <div class="shippingAddress_center_loaction"> <span>{{submitDate.address_info.address}}</span> <span class="moren" :style="{ paddingTop: isAndroid ? '0.03rem' : '' }">默认</span></div>
                                        <span class="shippingAddress_center_name">
                                            <span>{{submitDate.address_info.name}}</span> <span class="address_shuxian"></span>
                                            <span>{{submitDate.address_info.tel}}</span>
                                        </span>
                                    </div>
                                    <div class="shippingAddress_right">
                                        <div class="right_arrow"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="sc_statusBottom" v-if="changeNewWay == 2" @click.stop="payWayClick(3,'time='+1)">
                                <span>{{cluesData.peisongshijian}}</span>
                                <div class="sc_right">
                                    <span :style="{color:newColor1}">{{tcps.send_time_info && tcps.send_id_time ? tcps.send_id_time : "立即送出"}}</span>
                                    <div class="shoppingAddress_center_right" v-if="tcps.send_time_info.length">
                                        <div class="right_arrow2" :style="{ marginBottom:isAndroid?'0.06rem':'' }" style="padding:0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="shippingAddress_right" v-if="submitDate.address_info.id == 0 && changeNewWay == 0">
                            <div class="right_arrow"></div>
                        </div>
                    </div>
                </div>

                <!-- 自提 -->
                <div class="shippingAddress2" v-if="community_show != 1 && userChoose != '' && order_type != 21">
                    <div class="shoppingAddress_top">
                        <div class="shoppingAddress_top_left">
                            <span style="font-weight:bold;">自提</span>
                        </div>
                    </div>
                    <div class="shoppingAddress_center">
                        <div class="shoppingAddress_center_left" style="padding-bottom:0;margin-right:0.27rem;">
                            <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/stores_address.png" />
                        </div>
                        <!-- <div class="shoppingAddress_center_center" v-if="submitDate.address_info.id == 0}}">
                        <span>{{submitDate.address_info.type == 0 ?submitDate.tips.qingtianjiashouhuodizhi : submitDate.tips.qingxuanzeshouhuodizhi}}</span>
                    </div> -->
                        <div class="shoppingAddress_center_center">
                            <div class="shoppingAddress_center_ziti">
                                <span>门店地址</span>
                            </div>
                            <div class="ziti_rightView">
                                <span
                                    >{{ userChoose.area }}{{ userChoose.location_name
                                    }}{{ userChoose.pick_up_address }}</span
                                >
                                <a :href="userChoose.mobile">
                                    <img
                                        style="width: 0.38rem;height: 0.38rem;"
                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/newOrder_phone.png"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- 姓名，预留电话 -->
                    <div class="shoppingAddress_bottom">
                        <span style="color:#222222;margin-right:0.43rem;"><span class="title_warn">*</span>姓名</span>
                        <div class="shoppingAddress_bottom_view" style="flex:auto;">
                            <input
                                type="text"
                                placeholder="请输入"
                                class="ziti-placehoder"
                                :value="reqVal.reservedName ? reqVal.reservedName : reservedName"
                                @input="zitiInputFun(0, $event.target.value)"
                            />
                            <span style="margin-right:0.45rem;"><span class="title_warn">*</span>预留电话</span
                            ><input
                                style="width:2rem"
                                type="number"
                                placeholder="请输入"
                                class="ziti-placehoder"
                                :value="reqVal.reservedTel ? reqVal.reservedTel : reservedTel"
                                @input="zitiInputFun(1, $event.target.value)"
                            />
                        </div>
                    </div>
                    <!-- 配送时间 -->
                    <div class="shoppingAddress_bottom">
                        <span style="color:#626365;">自提时间</span>
                        <div class="shoppingAddress_bottom_view">
                            <span>{{ userChoose.pick_up_time }}</span>
                            <!-- <div class="shoppingAddress_center_right">
                            <div class="right_arrow2" style="padding:0;"></div>
                        </div> -->
                        </div>
                    </div>
                </div>
                <!-- 门店 -->
                <div
                    class="shippingAddress2"
                    v-if="
                        submitDate.store_info && (userChoose == '' || (community_delivery == 1 && community_show == 1))
                    "
                >
                    <div class="shoppingAddress_top">
                        <div class="shoppingAddress_top_left">
                            <span style="font-weight:bold;">{{ submitDate.store_info.title }}</span>
                        </div>
                        <div class="shoppingAddress_top_right" @click="payWayClick(3, 'pstop=' + 1)">
                            <span>{{ store_list_name ? store_list_name : submitDate.store_info.prompt }}</span>
                            <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/order_management.png" />
                        </div>
                    </div>
                    <div class="shoppingAddress_center" @click="addressClick(submitDate.address_info.id)">
                        <div class="shoppingAddress_center_left" style="padding-bottom:0;">
                            <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/submit_locationOrder.png" />
                        </div>
                        <div class="shoppingAddress_center_center" v-if="submitDate.address_info.id == 0">
                            <span>{{
                                submitDate.address_info.type == 0
                                    ? submitDate.tips.qingtianjiashouhuodizhi
                                    : submitDate.tips.qingxuanzeshouhuodizhi
                            }}</span>
                            <!-- <div>
                            <span style="font-size:0.24rem;color:#A9A9A9;font-weight:400;">已有地址均不在当前门店配送范围内</span>
                        </div> -->
                        </div>
                        <div class="shoppingAddress_center_center" v-else>
                            <span>{{ submitDate.address_info.address }}</span>
                            <div class="shoppingAddress_center_center_child">
                                <span style="margin-right:0.35rem;">{{ submitDate.address_info.name }} </span>
                                <span>{{ submitDate.address_info.tel }}</span>
                            </div>
                        </div>
                        <div class="shoppingAddress_center_right">
                            <div class="right_arrow2"></div>
                        </div>
                    </div>
                </div>
                <!-- 会员卡营销 -->
                <div class="weiBaoming" v-if="order_type == 7 && submitDate.otherOrderProductsInfo">
                    <div class="weiBaoming_left">
                        <img :src="submitDate.otherOrderProductsInfo.pic"/>
                    </div>
                    <div class="weiBaoming_center">
                        {{submitDate.otherOrderProductsInfo.name}}
                    </div>
                    <div class="weiBaoming_right">{{CurrencySymbol}}{{submitDate.otherOrderProductsInfo.price}}元</div>
                </div>
                <!-- 酒店管理 -->
                <div class="hotelManagement" v-if="order_type == 21">
                    <div class="hotel_title">
                        {{ hotel_info.starttime }}
                        <div class="hotel_title_tag">
                            共{{ hotel_info.night }}晚
                            <div class="hotel_title_tag_sj"></div>
                        </div>
                        {{ hotel_info.endtime }}
                    </div>
                    <div style="font-size:0.24rem;color:#222222;font-weight:bold;margin-bottom:0.2rem;">
                        {{ hotel_info.room.room_name }}
                    </div>
                    <div style="color:#999999;font-size:0.24rem;">
                        {{ hotel_info.room.bed_type }} {{ hotel_info.room.build_area }}
                        {{ hotel_info.room.room_floor }} {{ hotel_info.room.breakfast == 1 ? "有早餐" : "无早餐" }}
                        <article v-if="hotel_info.room.room_window == 0">有窗</article>
                        <article v-if="hotel_info.room.room_window == 1">无窗</article>
                        <article v-if="hotel_info.room.room_window != 0 && hotel_info.room.room_window != 1">
                            部分有窗
                        </article>
                    </div>
                </div>
                <!-- 商品 -->
                <div v-for="(item, index) in submitDate.group_info" :key="index" style="margin:0 0.21rem;">
                    <div v-if="submitDate.group_info">
                        <!-- 多规格店铺 -->
                        <div
                            class="storeShopBox moreShopBox"
                            v-if="item.pro_list.length > 1"
                            style="background:transparent;"
                        >
                            <div class="storeShop" style="padding-bottom:0.1rem;">
                                <!-- 店铺名称 -->
                                <div class="storeShop_name" v-if="item.shop_name">
                                    <span>{{ item.shop_name }}</span>
                                </div>
                                <!-- 商品有多规格 -->
                                <div class="storeShop_moreStatus">
                                    <div
                                        class="storeShop_moreStatus_box"
                                        @click="payWayClick(4, 'jianshu=' + item.total_num_info, 'index=' + index)"
                                    >
                                        <!-- 左边图片 -->
                                        <div class="storeShop_moreStatus_left">
                                            <div
                                                class="storeShop_moreStatus_box"
                                                v-for="(groupItem, groupIndex) in item.pro_list"
                                                :key="groupIndex"
                                            >
                                                <img :src="groupItem.pro_pic" alt="商品图片" />
                                            </div>
                                        </div>
                                        <!-- 右边总件数 -->
                                        <div class="storeShop_moreStatus_right">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/ellipsis.png"
                                                alt="图片"
                                            />
                                            <span>{{ item.total_num_info }}</span>
                                        </div>
                                    </div>
                                    <!-- 备注 -->
                                    <div class="distribution_note">
                                        <span class="distribution_flg">{{ submitDate.tips.beizhu }}：</span>
                                        <div class="textareaParent">
                                            <input
                                                :value="item.shop_remark"
                                                class="textareaNote inputPlaceholder"
                                                @input="changeBeizu(index, $event.target.value)"
                                                :placeholder="submitDate.tips.geishangjialiuyan"
                                                maxlength="45"
                                            />
                                        </div>
                                    </div>
                                    <!-- 商铺距离-->
                                    <div class="shopGroup" v-if="item.storeInfo && item.storeInfo.id != 0 && changeNewWay != 2">
                                        <div class="shopGroup_left">
                                            <div><i style="font-size: 0.26rem;font-weight: 400;display: inline-block;margin-right: 0.10rem;" class="sjzs-icon s-icon-dianpu-1"></i> {{item.shop_name}}</div>
                                            <div  @click="openDT(item.shop_name,item.storeInfo.district+item.storeInfo.address,item.storeInfo.lng,item.storeInfo.lat)">
                                                <div style="font-size: 0.24rem;color: #666666;margin-bottom: 0.10rem;">{{item.storeInfo.province}}{{item.storeInfo.city}}{{item.storeInfo.district}}{{item.storeInfo.address}}</div>
                                                <div class="sl_view" v-if="lngLat.lng && lngLat.lat">
                                                    <span :style="{color:bgcColor1}">{{item.storeInfo.distanceInfo}}</span> <i style="font-size: 0.24rem;font-weight: 400;" class="sjzs-icon s-icon-right-1"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="shopGroup_right" v-if="index  == 0 && changeNewWay == 1" @click="buyWayFun" :data-index="index" :data-lng="item.storeInfo.lng"  :data-lat="item.storeInfo.lat" :data-name="item.storeInfo.name">
                                            <span>切换</span> <i style="font-size: 0.24rem;font-weight: 400;" class="sjzs-icon s-icon-right-1"></i>
                                        </div>
                                    </div>
                                    <!-- 小计，总价格 -->
                                    <div class="storeShop_subtotal" style="margin-left:0;" :style="{marginTop: item.storeInfo && item.storeInfo.id != 0 && changeNewWay != 2 ? 0 :'0.2rem'}">
                                        <div class="storeShop_subtotal_left">
                                            <span v-if="item.total_must_jifen > 0" style="color:#FC273C;">{{
                                                item.total_must_jifen_info
                                            }}</span>
                                        </div>
                                        <div class="storeShop_subtotal_right">
                                            <span class="storeShop_subtotal_num" v-if="item.total_num > 0"
                                                >{{ item.total_num_info }}
                                            </span>
                                            <span class="storeShop_subtotal_price">
                                                <span>{{ submitDate.tips.xiaoji }}：</span>
                                                <span class="price_total">
                                                    <span class="price_left_symbol" style="margin-right:0.05rem;">{{
                                                        CurrencySymbol
                                                    }}</span
                                                    ><span
                                                        >{{ item.total_money_json.left }}.<span
                                                            style="font-size:0.24rem;"
                                                            >{{ item.total_money_json.right }}</span
                                                        ></span
                                                    >
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 单规格店铺 -->
                        <div class="storeShopBox" v-if="item.pro_list.length == 1">
                            <div class="storeShop">
                                <!-- 店铺名称 -->
                                <div
                                    class="storeShop_name"
                                    @click="shopMallFun(index, item.no_jump)"
                                    v-if="item.shop_name"
                                >
                                    <span>{{ item.shop_name }}</span>
                                </div>
                                <!-- 商品单规格 -->
                                <div
                                    class="storeShop_oneStatus"
                                    v-for="(shopItem, shopIndex) in item.pro_list"
                                    :key="shopIndex"
                                >
                                    <div class="storeShop_oneStatus_top">
                                        <div class="storeShop_oneStatus_left">
                                            <img :src="shopItem.pro_pic" alt="商品图片" />
                                        </div>
                                        <div class="storeShop_oneStatus_right">
                                            <span class="storeShop_oneStatus_right_text"
                                                ><span
                                                    class="onestatusProTag"
                                                    :style="{
                                                        background: bgcColor4,
                                                        borderColor: bgcColor2,
                                                        color: bgcColor1
                                                    }"
                                                    v-if="shopItem.pro_tag != ''"
                                                    ><span style="line-height:1;">{{ shopItem.pro_tag }}</span></span
                                                >
                                                {{ shopItem.pro_name }}</span
                                            >
                                            <span
                                                v-if="shopItem.param_name != ''"
                                                style="color:#A9A9A9;margin-top:0.1rem;margin-bottom:0.1rem;"
                                                >{{ shopItem.param_name }}</span
                                            >
                                            <span class="storeShop_oneStatus_right_reduce">
                                                <span v-if="shopItem.lijian > 0"
                                                    >{{ submitDate.tips.shoujixiadanlijian }}{{ CurrencySymbol
                                                    }}{{ shopItem.lijian }}</span
                                                >
                                            </span>
                                            <div class="storeShop_oneStatus_right_price">
                                                <span class="price_left">
                                                    <span class="price_left_symbol" style="margin-right:0.05rem;">{{
                                                        CurrencySymbol
                                                    }}</span
                                                    ><span style="font-weight:bold;"
                                                        >{{ shopItem.total_money_json.left }}.<span
                                                            style="font-size:0.24rem;"
                                                            >{{ shopItem.total_money_json.right }}</span
                                                        ></span
                                                    >
                                                </span>
                                                <span class="price_right"
                                                    >x<span>{{ shopItem.pro_num }}</span></span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 备注 -->
                                <div class="distribution_note">
                                    <span class="distribution_flg">{{ submitDate.tips.beizhu }}：</span>
                                    <div class="textareaParent textareaParent_long">
                                        <input
                                            class="textareaNote inputPlaceholder"
                                            @input="changeBeizu(index, $event.target.value)"
                                            :value="item.shop_remark"
                                            :placeholder="submitDate.tips.geishangjialiuyan"
                                            maxlength="45"
                                        />
                                    </div>
                                </div>
                                <!-- 商铺距离-->
                                <div class="shopGroup" v-if="item.storeInfo && item.storeInfo.id != 0 && (((Object.keys(group_info).length != 1) && changeNewWay == 1))">
                                    <div class="shopGroup_left" style="padding-bottom:0;">
                                        <div><i style="font-size: 0.26rem;font-weight: 400;display: inline-block;margin-right: 0.10rem;" class="sjzs-icon s-icon-dianpu-1"></i> {{item.shop_name}}</div>
                                        <div  @click="openDT(item.shop_name,item.storeInfo.district+item.storeInfo.address,item.storeInfo.lng,item.storeInfo.lat)">
                                            <div style="font-size: 0.24rem;color: #666666;margin-bottom: 0.10rem;">{{item.storeInfo.province}}{{item.storeInfo.city}}{{item.storeInfo.district}}{{item.storeInfo.address}}</div>
                                            <div class="sl_view" v-if="lngLat.lng && lngLat.lat">
                                                <span :style="{color:bgcColor1}">{{item.storeInfo.distanceInfo}}</span> <i style="font-size: 0.24rem;font-weight: 400;" class="sjzs-icon s-icon-right-1"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shopGroup_right" @click="buyWayFun" v-if="index  == 0 && changeNewWay == 1" :data-index="index" :data-lng="item.storeInfo.lng"  :data-lat="item.storeInfo.lat" :data-name="item.storeInfo.name">
                                        <span :style="{color:bgcColor1}">切换</span> <i style="font-size: 0.24rem;font-weight: 400;" class="sjzs-icon s-icon-right-1"></i>
                                    </div>
                                </div>
                            </div>
                            <!-- 小计，总价格 -->
                            <div class="storeShop_subtotal">
                                <div class="storeShop_subtotal_left">
                                    <span v-if="item.total_must_jifen > 0" style="color:#FC273C;">{{
                                        item.total_must_jifen_info
                                    }}</span>
                                </div>
                                <div class="storeShop_subtotal_right">
                                    <span class="storeShop_subtotal_num" v-if="item.total_num > 0"
                                        >{{ item.total_num_info }}
                                    </span>
                                    <span class="storeShop_subtotal_price">
                                        <span>{{ submitDate.tips.xiaoji }}：</span>
                                        <span class="price_total">
                                            <span class="price_left_symbol" style="margin-right:0.05rem;">{{
                                                CurrencySymbol
                                            }}</span
                                            ><span
                                                >{{ item.total_money_json.left }}.<span style="font-size:0.24rem;">{{
                                                    item.total_money_json.right
                                                }}</span></span
                                            >
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 自定义表单名称 -->
                <div class="customFromBox" v-if="add_form_info && add_form_info.length">
                    <div class="customFrom">
                        <div class="customFrom_title">
                            <span>{{ submitDate.add_form_info.name }}</span>
                        </div>
                        <!-- 内容 -->
                        <div class="customFrom_content">
                            <!-- 收起 -->
                            <div :class="hiddenName && add_form_info.length > 2 ? 'packUp' : 'packUpBottiom packUp'">
                                <article v-for="(item, index) in add_form_info" :key="index">
                                    <!-- 单行文本 -->
                                    <div class="customFrom_content_title" v-if="item.param_type == 1">
                                        <span class="title_warn" v-if="item.val_allow > 0">*</span>
                                        <span class="customFrom_content_titleWidth" style="margin-top:0.04rem;">{{
                                            item.param_name
                                        }}</span>
                                        <div class="customFrom_content_title_right">
                                            <div class="title_input_warn">
                                                <input
                                                    @input="changeOnly('form=' + index, $event.target.value)"
                                                    type="text"
                                                    :value="item.param_value"
                                                    :placeholder="submitDate.tips.qingshuru"
                                                    style="height:inherit"
                                                />
                                                <div class="customFrom_content_prompt" v-if="item.notice != ''">
                                                    <img
                                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/warn.png"
                                                        alt="提示语"
                                                    />
                                                    <span>{{ item.notice }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 单选类型标题 -->
                                    <div class="customFrom_content_ridaoBox" v-if="item.param_type == 7">
                                        <div class="radioBox_title">
                                            <span class="title_warn" v-if="item.val_allow > 0">*</span>
                                            <span>{{ item.param_name }}</span>
                                        </div>
                                        <div
                                            class="customFrom_content_ridao"
                                            v-for="(radioItem, radioIndex) in item.param_value"
                                            :key="radioIndex"
                                            @click="changeRadio(0, index, radioIndex)"
                                        >
                                            <div
                                                :class="
                                                    radioItem.c == 1
                                                        ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                        : 'shoppingContent_radio'
                                                "
                                                :style="{
                                                    background: radioItem.c == 1 ? bgcColor1 : '',
                                                    borderColor: radioItem.c == 1 ? bgcColor1 : ''
                                                }"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                    alt="check"
                                                    v-if="radioItem.c == 1"
                                                />
                                            </div>
                                            <span style="line-height:1;margin-bottom:0.04rem;">{{ radioItem.v }}</span>
                                        </div>
                                        <!-- 单选类型提示语 -->
                                        <div class="customFrom_contentPrompt" v-if="item.notice != ''">
                                            <div class="customFrom_content_prompt">
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/warn.png"
                                                    alt="提示语"
                                                />
                                                <span>{{ item.notice }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 多选类型标题 -->
                                    <div class="customFrom_content_ridaoBox" v-if="item.param_type == 2">
                                        <div class="radioBox_title">
                                            <span class="title_warn" v-if="item.val_allow > 0">*</span>
                                            <span>{{ item.param_name }}</span>
                                        </div>
                                        <div
                                            class="customFrom_content_ridao"
                                            v-for="(checkItem, checkIndex) in item.param_value"
                                            :key="checkIndex"
                                            @click="changeRadio(1, index, checkIndex)"
                                        >
                                            <div
                                                :class="
                                                    checkItem.c == 1
                                                        ? 'shoppingContent_checkRadio shoppingContent_radio customFrom_content_checkbox'
                                                        : 'shoppingContent_radio customFrom_content_checkbox'
                                                "
                                                :style="{
                                                    background: checkItem.c == 1 ? bgcColor1 : '',
                                                    borderColor: checkItem.c == 1 ? bgcColor1 : ''
                                                }"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                    alt="check"
                                                    v-if="checkItem.c == 1"
                                                />
                                            </div>
                                            <span style="line-height:1">{{ checkItem.v }}</span>
                                        </div>
                                        <!-- 多选类型提示语 -->
                                        <div class="customFrom_contentPrompt" v-if="item.notice != ''">
                                            <div class="customFrom_content_prompt">
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/warn.png"
                                                    alt="提示语"
                                                />
                                                <span>{{ item.notice }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 下拉类型标题 -->
                                    <div
                                        class="customFrom_content_title customFrom_content_downtitle"
                                        @click="payWayClick(0, 'datevalue=' + 1, 'index=' + index)"
                                        v-if="item.param_type == 3"
                                    >
                                        <!-- :style="{ paddingBottom: item.notice == '' ? '0.05rem' : '' }" -->
                                        <span class="title_warn" v-if="item.val_allow > 0">*</span>
                                        <span class="customFrom_content_titleWidth">{{ item.param_name }}</span>
                                        <div class="customFrom_content_title_right">
                                            <div :style="{ color: item.select_name ? '' : '#a9a9a9' }">
                                                {{ item.select_name ? item.select_name : submitDate.tips.qingxuanze }}
                                            </div>
                                            <div class="customFrom_content_prompt" v-if="item.notice != ''">
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/warn.png"
                                                    alt="提示语"
                                                />
                                                <span>{{ item.notice }}</span>
                                            </div>
                                        </div>
                                        <div class="right_arrow right_arrow_minTop"></div>
                                    </div>

                                    <!-- 日期添加 -->
                                    <div
                                        class="customFrom_content_title customFrom_content_downtitle"
                                        @click="payWayClick(5, '', 'index=' + index)"
                                        :style="{ alignItems: item.notice != '' ? '' : 'center' }"
                                        v-if="item.param_type == 5"
                                    >
                                        <span class="title_warn" v-if="item.val_allow > 0">*</span>
                                        <span class="customFrom_content_titleWidth">{{ item.param_name }}</span>
                                        <div class="customFrom_content_title_right">
                                            <div :style="{ marginBottom: item.notice != '' ? '0.1rem' : '' }">
                                                {{ item.param_value ? item.param_value : submitDate.tips.nianyueri }}
                                            </div>
                                            <div
                                                class="customFrom_content_prompt"
                                                style="margin:0;"
                                                v-if="item.notice != ''"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/warn.png"
                                                    alt="提示语"
                                                />
                                                <span>{{ item.notice }}</span>
                                            </div>
                                        </div>
                                        <div class="right_arrow right_arrow_minTop" style="padding-bottom:0rem;"></div>
                                    </div>
                                    <!-- 图片上传标题 -->
                                    <div class="customFrom_content_uploadImgBox" v-if="item.param_type == 6">
                                        <div class="radioBox_title">
                                            <span class="title_warn" v-if="item.val_allow > 0">*</span>
                                            <span>{{ item.param_name }}</span>
                                        </div>
                                        <div class="uploadPicBox">
                                            <!-- 上传按钮 -->
                                            <div class="uploadImg" v-if="item.param_value == ''">
                                                <input
                                                    name="upFile"
                                                    type="file"
                                                    accept="image/*"
                                                    class="upload-file"
                                                    @change="coverUpload(index, $event, 1,item.id)"
                                                    id="uploadImg"
                                                />
                                                <!-- 中间加号 -->
                                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/add.png" />
                                            </div>
                                            <!-- 上传的图片 -->
                                            <div class="uploadImg" style="border:0;" v-else>
                                                <img class="uploadImgArr_img" :src="item.imgUrl" />
                                                <!-- 关闭 -->
                                                <div class="closeUploadImg" @click="closeImg(index)">
                                                    <img
                                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_del.png"
                                                    />
                                                </div>
                                            </div>
                                            <div class="customFrom_contentPrompt" v-if="item.notice != ''">
                                                <div class="customFrom_content_prompt">
                                                    <img
                                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/warn.png"
                                                        alt="提示语"
                                                    />
                                                    <span>{{ item.notice }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 限制大小 -->
                                        <span class="uploadImg_warning">{{ submitDate.tips.jinzhichigeshi }}</span>
                                    </div>
                                    <!-- 文件上传 -->
                                    <div class="customFrom_content_uploadImgBox" v-if="item.param_type == 4">
                                        <div class="radioBox_title">
                                            <span class="title_warn" v-if="item.val_allow > 0">*</span>
                                            <span>{{ item.param_name }}</span>
                                        </div>
                                        <div class="uploadFileBox">
                                            <!-- 上传按钮 -->
                                            <div class="uploadImg uploadFile" v-if="item.param_value == ''">
                                                <input
                                                    name="coverFile"
                                                    type="file"
                                                    single
                                                    accept="*"
                                                    class="upload-file"
                                                    @change="coverUpload(index, $event, 2)"
                                                />
                                                <img src="@/pages/order/assets/images/upFile.png" />
                                                <span>{{ submitDate.tips.shangchuanwenjian }}</span>
                                            </div>
                                            <div class="uploadImg uploadFile" v-else>
                                                <span style="margin-left:0;">{{ fileName }}</span>
                                                <!-- 关闭 -->
                                                <div class="closeUploadImg" @click="closeImg(index)">
                                                    <img
                                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/newOrder_del.png"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="customFrom_content_prompt" v-if="item.notice != ''">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/warn.png"
                                                alt="提示语"
                                            />
                                            <span>{{ item.notice }}</span>
                                        </div>
                                        <!-- 限制大小 -->
                                        <span class="uploadImg_warning" style="margin-top:0.07rem;">{{
                                            submitDate.tips.zhichiwenjianleixing
                                        }}</span>
                                    </div>
                                    <div
                                        class="hiddenData"
                                        :style="{ height: hiddenName && add_form_info.length > 2 ? '0' : 0 } + 'px'"
                                    >
                                        <div class="hiddenData2"></div>
                                    </div>
                                </article>
                                <div
                                    :class="hiddenName ? 'packUpText_father' : 'packUpText_father packUpText_father2'"
                                    @click="shouqiBtn(1)"
                                    v-if="add_form_info.length > 2"
                                >
                                    <span
                                        :class="
                                            hiddenName && add_form_info.length > 2
                                                ? 'packUpText'
                                                : 'packUpText packUpTextTration'
                                        "
                                    >
                                        {{
                                            hiddenName && add_form_info.length > 2
                                                ? submitDate.tips.zhankaichakanxiangqing
                                                : submitDate.tips.shouqi
                                        }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 酒店表单 -->
                <div class="customFromBox" v-if="hotel_info != ''">
                    <div class="customFrom">
                        <div class="customFrom_title">
                            <span>入住信息</span>
                        </div>
                        <!-- 内容 -->
                        <div class="customFrom_content">
                            <!-- 收起 -->
                            <div
                                :class="hiddenName ? 'packUp' : 'packUpBottiom packUp'"
                                :style="{
                                    position: hiddenName && add_form_info.length > 2 ? '' : 'relative !important'
                                }"
                            >
                                <!-- 下拉类型标题 -->
                                <div
                                    class="customFrom_content_title customFrom_content_downtitle"
                                    :style="{ paddingBottom: item.notice == '' ? '0.05rem' : '' }"
                                    @click="hotelNumBtn"
                                >
                                    <!-- <span class="title_warn" v-if="item.val_allow > 0}}">*</span> -->
                                    <span class="customFrom_content_titleWidth">预定房间数</span>
                                    <div class="customFrom_content_title_right">
                                        <div style="color:'#a9a9a9'">{{ ruzhuren.length }}间</div>
                                    </div>
                                    <div class="right_arrow right_arrow_minTop" style="padding-bottom:0;"></div>
                                </div>
                                <!-- 单行文本 -->
                                <div class="customFrom_content_title" v-for="(item, index) in ruzhuren" :key="index">
                                    <!-- <span class="title_warn" v-if="item.val_allow > 0}}">*</span> -->
                                    <span class="customFrom_content_titleWidth" style="margin-top:0.04rem;"
                                        >房间{{ index + 1 }}入住人</span
                                    >
                                    <div class="customFrom_content_title_right">
                                        <div class="title_input_warn">
                                            <input
                                                @input="hotel_input(index, $event.target.value)"
                                                type="text"
                                                :value="item.val"
                                                placeholder="每个房间填写一个入住人姓名"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <!-- 手机 -->
                                <div class="customFrom_content_title">
                                    <!-- <span class="title_warn" v-if="item.val_allow > 0}}">*</span> -->
                                    <span class="customFrom_content_titleWidth" style="margin-top:0.04rem;"
                                        >联系人电话</span
                                    >
                                    <div class="customFrom_content_title_right">
                                        <div class="title_input_warn">
                                            <input
                                                type="number"
                                                @input="changeOnly('phone=' + index, $event.target.value)"
                                                :value="hotelPhone"
                                                placeholder="用于客服联系入住人"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    :class="hiddenName ? 'packUpText_father' : 'packUpText_father packUpText_father2'"
                                    @click="shouqiBtn(1)"
                                    style="left:-10%"
                                >
                                    <span :class="hiddenName ? 'packUpText' : 'packUpText packUpTextTration'">
                                        {{ hiddenName ? "展开查看详情" : "收起" }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 身份证号 -->
                <div class="idNumber" v-if="user_identity_info != ''">
                    <!-- 标题 -->
                    <div class="customFrom_content_title">
                        <span class="customFrom_content_title_left">{{ submitDate.tips.xingming }}</span>
                        <div class="customFrom_content_title_right">
                            <span>{{ user_identity_info.name }}</span>
                        </div>
                    </div>
                    <div class="customFrom_content_title" style="align-items:center;">
                        <span class="customFrom_content_title_left">{{ submitDate.tips.shenfenzhenghao }}</span>
                        <div class="customFrom_content_title_right">
                            <input
                                type="text"
                                @input="inputIdentity($event.target.value, 1)"
                                :value="user_identity_info.number"
                                :placeholder="submitDate.tips.kuajingtixing"
                            />
                        </div>
                    </div>
                </div>
                <!-- 宽带账号 -->
                <div class="idNumber" v-if="submitDate.device == 1">
                    <div class="customFrom_content_title" style="align-items:center;">
                        <span class="customFrom_content_title_left" style="width:2rem;">请输入宽带账号</span>
                        <div class="customFrom_content_title_right">
                            <input
                                type="text"
                                @input="inputIdentity($event.target.value, 2)"
                                :value="kuandai_info"
                                placeholder="请输入宽带账号"
                            />
                        </div>
                    </div>
                </div>
                <!-- 代金券,红包支付卡 -->
                <div class="paymentCardBox">
                    <div class="paymentCard">
                        <!-- 配送方式 -->
                        <div
                            class="integral"
                            @click="payWayClick(9, '')"
                            style="line-height:0.1rem;"
                            v-if="send_info != '' && if_send_info"
                        >
                            <div class="paymentChild">
                                <span>{{ submitDate.tips.peisongfangshi }}</span>
                                <!-- 请选择 -->
                                <div class="paymentChild_right">
                                    <span v-if="send_id_info" style="color:#222222;">{{ send_id_info }}</span>
                                    <span v-if="!send_id_info">{{ submitDate.tips.qingxuanze }}</span>
                                    <div class="right_arrow"></div>
                                </div>
                            </div>
                        </div>
                        <!-- 支付方式 -->
                        <div
                            class="integral"
                            @click="payWayClick(9, 'paywayval=' + 1)"
                            v-if="payment_info != ''"
                            style="line-height:0.75rem;"
                        >
                            <div class="paymentChild">
                                <span>{{ submitDate.tips.zhifufangshi }}{{paymentList.mobile}}</span>
                                <div class="paymentChild_right">
                                    <span
                                        v-if="changeNewWay != 2"
                                        :style="{
                                            color: '#222222',
                                            marginRight: paymentList.length <= 1 ? '0.23rem' : ''
                                        }"
                                        >{{
                                            mobileValue && payment_info_val && mobileValue[payment_info_val]
                                                ? mobileValue[payment_info_val].name
                                                : ""
                                        }}</span
                                    >
                                    <span
                                        v-else
                                        :style="{
                                            color: '#222222',
                                            marginRight: paymentList.length <= 1 ? '0.23rem' : ''
                                        }"
                                        >{{
                                            payment_info.list && Object.keys(payment_info.list).length && payment_info.list.mobile && payment_info.list.mobile.on ?  payment_info.list.mobile.on.name : '暂无'
                                        }}</span>
                                    <!-- <span v-if="!payment_info_val">{{ submitDate.tips.qingxuanze }}</span> -->
                                    <div class="right_arrow" v-if="paymentList.length > 1"></div>
                                </div>
                            </div>
                        </div>
                        <!-- 购买门店 -->
                        <div class="integral" @click="buyWayFun" v-if="buyStoreInfo != ''" style="line-height:0.75rem;">
                            <div class="paymentChild">
                                <span>{{ buyStoreInfo.title }}</span>
                                <div class="paymentChild_right">
                                    <span v-if="buyStoreInfo.info && buyStoreInfo.info.name" style="color:#222222;">{{
                                        buyStoreInfo.info.name
                                    }}</span>
                                    <span v-else>{{ submitDate.tips.qingxuanze }}</span>
                                    <!-- <div class="right_arrow" v-if="paymentList.length > 1"></div> -->
                                    <div class="right_arrow"></div>
                                </div>
                            </div>
                        </div>
                        <!-- 配送时间 -->
                        <div class="integral" v-if="send_time_info.length && changeNewWay != 1 && changeNewWay != 2" @click="payWayClick(3, 'time=' + 1)">
                            <div class="paymentChild">
                                <span>{{ submitDate.tips.peisongshijian }}</span>
                                <div class="paymentChild_right">
                                    <span v-if="send_id_time" style="color:#222222;">{{ send_id_time }}</span>
                                    <span v-if="!send_id_time">{{ submitDate.tips.qingxuanze }}</span>
                                    <div class="right_arrow"></div>
                                </div>
                            </div>
                        </div>
                        <!-- 发票 -->
                        <div class="integral" @click="payWayClick(6, '')" v-if="invoice_info != ''">
                            <div class="paymentChild">
                                <span>{{ submitDate.tips.fapiaoxinxi }}</span>
                                <div class="paymentChild_right">
                                    <span v-if="fapiaoInfo" style="color:#222222;">{{ fapiaoInfo }}</span>
                                    <span v-if="!fapiaoInfo">{{ submitDate.tips.qingxuanze }}</span>
                                    <div class="right_arrow"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 各种优惠满减2 -->
                <div class="preferentialBox" v-if="submitDate.price_information && submitDate.price_information.length">
                    <div class="preferential">
                        <!-- 商铺 -->
                        <div
                            class="preferential_content"
                            v-for="(item, index) in submitDate.price_information"
                            :key="index"
                        >
                            <span>{{ item.title }}</span>
                            <span class="preferential_children_right"
                                >{{ item.symbol }} {{ CurrencySymbol }}{{ item.money }}</span
                            >
                        </div>
                        <div class="preferential_content" v-if="supply_send_info != ''">
                            <span></span>
                            <div style="display: flex;align-items: center;" @click="jdWarning">
                                <span style="color:#999;font-weight:400;" class="preferential_children_right">{{ supply_send_info.brief_tips }}</span>
                                <img style="width:0.25rem;height:0.25rem;margin-left:0.1rem;" src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/warn.png"/>
                            </div>
                        </div>
                        <div class="preferential_content_bottom_price">
                            <span style="font-size: 0.24rem;margin-right:0.11rem;display:inline-block;">{{
                                submitDate.tips.xiaoji
                            }}</span>
                            <span
                                ><span style="font-size:0.24rem;margin-right:0.05rem;display:inline-block;">
                                    {{ CurrencySymbol }}</span
                                >{{ submitDate.total_money_json.left }}.<span style="font-size:0.24rem;">{{
                                    submitDate.total_money_json.right
                                }}</span></span
                            >
                        </div>
                    </div>
                </div>
                <!-- (balance_info != '' && !(payment_info_id == 0 || (zf_pay_id == 14 && payment_info_id > 0))) -->
                <div
                    class="preferentialBox"
                    v-if="
                        coupon_info != '' ||
                            redpacket_info != '' ||
                            jifen_info != '' ||
                            balance_info != '' ||
                            card_info != ''
                    "
                >
                    <div class="preferential">
                        <!-- 代金券 -->
                        <div class=" preferentialPayWay" @click="payWayClick(2)" v-if="coupon_info != ''">
                            <div class="preferential_payWay_left">
                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/submit_daijinquanPay.png" />
                                <span>{{ submitDate.tips.daijinquan }}</span>
                            </div>
                            <div class="preferential_payWay_right">
                                <span>{{
                                    coupon_info.use_info != "" ? coupon_info.user_amountValue : coupon_info.not_use_info
                                }}</span>
                                <div class="right_arrow right_arrow_xiaofei"></div>
                            </div>
                        </div>
                        <!-- 红包 -->
                        <div class=" preferentialPayWay" @click="payWayClick(1)" v-if="redpacket_info != ''">
                            <div class="preferential_payWay_left">
                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/submit_hongbaoPay.png" />
                                <span>{{ submitDate.tips.hongbao }}</span>
                            </div>
                            <div class="preferential_payWay_right">
                                <span>{{
                                    redpacket_info.use_info != ""
                                        ? redpacket_info.user_hongbaoValue
                                        : redpacket_info.not_use_info
                                }}</span>
                                <div class="right_arrow right_arrow_xiaofei"></div>
                            </div>
                        </div>
                        <!-- 支付卡 -->
                        <div class=" preferentialPayWay" @click="payWayClick(10)" v-if="card_info != ''">
                            <div class="preferential_payWay_left">
                                <img src="@/pages/order/assets/images/zhifuka.png" />
                                <span>{{ submitDate.tips.cardName }}</span>
                            </div>
                            <div class="preferential_payWay_right">
                                <span>{{
                                    card_info.use_info != "" ? card_info.usre_cardInfovalue : card_info.not_use_info
                                }}</span>
                                <div class="right_arrow right_arrow_xiaofei"></div>
                            </div>
                        </div>
                        <!-- 积分 -->
                        <div class="preferentialPayWay" v-if="jifen_info != ''">
                            <div class="preferential_payWay_left">
                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/submit_jifenPay.png" />
                                <span>{{ submitDate.tips.xf_name }}</span>
                            </div>
                            <div class="preferential_payWay_right" style="padding-right:0;padding-left:0.20rem;">
                                <span
                                    >{{ submitDate.tips.yu }}{{ jifen_info.user_user_integral }}
                                    {{ submitDate.tips.keyong }}{{ jifen_info.can_deduction_jifen
                                    }}{{ submitDate.tips.xf_name }}</span
                                >
                                <span
                                    style="padding-left:0.15rem;color:#FC273C;font-weight:bold;flex:none;"
                                    v-if="jifen_info.deduction_amount > 0"
                                    >-{{ CurrencySymbol }}{{ jifen_info.deduction_amount }}</span
                                >

                                <div
                                    @click="
                                        selectStatus(
                                            jifen_info.can_deduction_jifen > 0 && jifen_info.is_default != 1 ? 1 : ''
                                        )
                                    "
                                    :class="
                                        valueFlg1 || jifen_info.is_default == 1 ? 'marquee marqueeSelect' : 'marquee'
                                    "
                                    :style="{
                                        background:
                                            valueFlg1 || jifen_info.is_default == 1 ? bgcColor1 : '' + '!important',
                                        borderColor:
                                            valueFlg1 || jifen_info.is_default == 1 ? bgcColor1 : '' + '!important'
                                    }"
                                >
                                    <div
                                        :class="
                                            valueFlg1 || jifen_info.is_default == 1
                                                ? 'marqueeButton marqueeButtonSelect'
                                                : 'marqueeButton'
                                        "
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <!-- 余额支付 -->
                        <!-- v-if="
                                balance_info != '' &&
                                    !(payment_info_id == 0 || (zf_pay_id == 14 && payment_info_id > 0))
                            " -->
                        <!-- :style="{marginBottom: userName == 'mgzf8' && (valueFlg || (valueFlg1 || jifen_info.is_default == 1)) ? '' : 0}" -->
                        <div
                            class="preferentialPayWay"
                            :style="{
                                marginBottom: submitDate.usePassword != 0 && balance_info != '' && valueFlg ? '' : 0
                            }"
                            v-if="
                                balance_info != '' && (submitDate.noBalance == 1 ? !(payment_info_id == 0 || (zf_pay_id == 14 &&payment_info_id > 0)): true)
                            "
                        >
                            <div class="preferential_payWay_left">
                                <img src="https://aimg8.dlssyht.cn/xcx_pack/vip_VFrontend/submit_yuePay.png" />
                                <span>{{ submitDate.tips.yue }}</span>
                            </div>
                            <div class="preferential_payWay_right" style="padding-right:0;padding-left:0.20rem;">
                                <span
                                    >{{ submitDate.tips.yu }}{{ CurrencySymbol }}{{ balance_info.user_user_amount }}
                                    {{ submitDate.tips.keyong }}{{ CurrencySymbol
                                    }}{{ balance_info.can_deduction_amount }}</span
                                >
                                <span
                                    style="padding-left:0.15rem;color:#FC273C;font-weight:bold;flex:none;"
                                    v-if="balance_info.deduction_amount > 0"
                                    >-{{ CurrencySymbol }}{{ balance_info.deduction_amount }}</span
                                >
                                <div
                                    @click="selectStatus(balance_info.can_deduction_amount > 0 ? 0 : '')"
                                    :class="valueFlg ? 'marquee marqueeSelect' : 'marquee'"
                                    :style="{
                                        background: valueFlg ? bgcColor1 : '' + '!important',
                                        borderColor: valueFlg ? bgcColor1 : '' + '!important'
                                    }"
                                >
                                    <div
                                        :class="valueFlg ? 'marqueeButton marqueeButtonSelect' : 'marqueeButton'"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <!-- 余额、积分输入密码 -->
                        <!-- <div class="preferentialPayWay preMima" v-if="userName == 'mgzf8' && submitDate.usePassword != 0 && ((balance_info != '' && valueFlg)  || (jifen_info != '' && (valueFlg1 || jifen_info.is_default == 1)))"> -->
                        <div class="preMima" v-if="submitDate.usePassword != 0 && balance_info != '' && valueFlg">
                            <div
                                class="preferentialPayWay"
                                :style="{ marginBottom: submitDate.usePassword == 2 ? '' : 0 }"
                            >
                                <div class="preferential_payWay_left">
                                    <span>{{ submitDate.tips.zhifumima }}</span>
                                </div>
                                <div class="preferential_payWay_right">
                                    <input
                                        type="password"
                                        :value="mimaValue"
                                        @input="zhifuMima($event.target.value)"
                                        :placeholder="submitDate.tips.qingshuru + submitDate.tips.zhifumimaleixing"
                                    />
                                    <div v-show="correctMima">
                                        <img src="@/pages/order/assets/images/warnRed.png" />{{
                                            submitDate.tips.qingshuruzhengquedezhifumimaleixing
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="mgzf8Prompt" v-if="submitDate.usePassword == 2">
                                {{ submitDate.tips.zhifumimatishi }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 提交订单 -->
                <div class="upOrder" :style="{ zIndex: !hotelStatus ? 3000 : '' }">
                    <div class="upOrder_left">
                        <span>{{ submitDate.tips.xuzhifu }}</span>
                        <span class="upOrder_left_price" :style="{ color: order_type == 21 ? '#222222' : '' }"
                            ><span style="font-size:0.24rem;margin-right:0.06rem;">{{ CurrencySymbol }}</span
                            >{{ payment_amountJson.left
                            }}<span style="font-size:0.24rem;">.{{ payment_amountJson.right }}</span></span
                        >
                    </div>
                    <div
                        v-if="order_type != 21"
                        class="upOrder_right"
                        :style="{ background: button_info.click == 0 ? '#ccc !important' : bgcColor1 }"
                        @click="sublitOrderBtn()"
                    >
                        {{ button_info.info }}
                    </div>

                    <!-- 酒店费用明细 -->
                    <div
                        v-if="order_type == 21"
                        :class="hotelStatus ? 'hotel_detail' : 'hotel_detail hotel_detail_up'"
                        @click="hotelClick"
                    >
                        明细
                    </div>
                    <div
                        v-if="order_type == 21"
                        class="upOrder_right"
                        :style="{
                            background: button_info.click == 0 ? '#ccc' : bgcColor1,
                            width: '2.80rem',
                            height: '0.7rem',
                            padding: 0
                        }"
                        @click="sublitOrderBtn()"
                    >
                        {{ button_info.info }}
                    </div>
                </div>
            </div>
            <!-- 第一层全屏遮罩层 -->
            <div class="fullScreenRadio" catchtouchmove="noMove" v-if="ScreenFlg" @click="closeShadow"></div>
            <!-- 第二层全屏遮罩层 -->
            <div class="fullScreenRadio2" v-if="ScreenFlg2" @click="closePayWayFlg"></div>
            <!-- 无背景色的蒙版 -->
            <div class="noMengbanColor" v-if="payStatus"></div>
            <!-- 配送门店，配送时间 -->
            <custon-popup ref="customDistribution" @closePayWayStore="closePayWay(send_info_status ? 9 : 3)">
                <div slot="PoperContent" class="changeCityClass">
                    <div class="changeCityBox payWayBox">
                        <!-- <div class="changeCityBox payWayBox" style="height:{{ onlyTime ? '500rem !important' : '' }}"> -->
                        <div class="changeCityBox_top" :style="{ borderBottom: 0, paddingBottom: sendTime ? '' : 0 }">
                            <div class="changeCityBox_top_left">
                                <span v-if="payWayVal == 1">{{ submitDate.tips.zhifufangshi }}</span>
                                <span v-else>{{
                                    send_info_status
                                        ? submitDate.tips.peisongfangshi
                                        : send_info_status2
                                        ? storesList && storesList.tips
                                            ? storesList.tips.qingxuanzepeisongmendian
                                            : ""
                                        : submitDate.tips.peisongshijian
                                }}</span>
                            </div>
                            <div class="changeCityBox_top_right" @click="closePayWay(send_info_status ? 9 : 3)">
                                <div class="weixinAdress_closeIcon">
                                    <span class="weixinAdress_closeIcon_left"></span>
                                    <span class="weixinAdress_closeIcon_right"></span>
                                </div>
                            </div>
                        </div>

                        <!-- 先选择配送时间 -->
                        <div class="distribution_content_box" :style="{height:sendTime && (changeNewWay == 2 || changeNewWay == 0) ?'6.9rem':''}">
                            <div class="distribution_content" :style="{paddingLeft:sendTime && (changeNewWay == 2 || changeNewWay == 0) ? 0:''}">
                                <!-- 同城配送配送时间 -->
                                <div class="distribution_content_time" v-if="sendTime && changeNewWay == 2" style="padding-top:0.16rem;">
                                    <div class="distribution_timeTitle_value">
                                        <!-- <div class="distribution_timeValue_left" @click="payWayClick(0, 'zindex=' + 1)">
                                            <span>{{tcps.yearDate ? tcps.yearDate : tcps.send_time_info[0].date}}</span>
                                            <image class="distribution_timeValue_downimg" src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/submit_downOrder.png"></image>
                                        </div>
                                        <div class="distribution_timeValue_right" @click="payWayClick(0, 'zindex=' + 1, 'block=' + 2)">
                                            <span>{{ tcps.blockDate }}</span>
                                            <img class="distribution_timeValue_downimg" src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/submit_downOrder.png"/>
                                        </div> -->
                                        <div class="distribution_timeValue_left" >
                                            <!-- <span>{{tcps.yearDate ? tcps.yearDate : tcps.send_time_info[0].date}}</span> -->
                                            <div v-for="(item, index) in tcps.send_time_info" @click="payWayClick(0, 'zindex=' + 1,'block=' + 2,index)" :key="index" :style="{ background: item.is_check == 1 ? '#fff' : '' }">{{item.dateVal}}</div>
                                        </div>
                                        <div class="distribution_timeValue_right">
                                            <!-- <span>{{ tcps.blockDate }}</span> -->
                                            <div v-for="(item, index) in tcps.send_time_info[timeCheckIndex].time" :key="index"  @click="payWayClick(0, 'zindex=' + 1, 'block=' + 3,index)" :style="{ borderColor: item.is_check == 1 ? newColor1 :'',color:item.is_check == 1 ? newColor1 :''}">{{ item.time_stare }} - {{ item.time_end }}</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 配送时间 -->
                                <div class="distribution_content_time" v-else-if="sendTime && changeNewWay != 2">
                                    <div class="distribution_timeTitle_value" >
                                        <!-- <div class="distribution_timeValue_left" @click="payWayClick(0, 'zindex=' + 1)">
                                            <span>{{ yearDate ? yearDate : send_time_info[0].date }}</span>
                                            <img
                                                class="distribution_timeValue_downimg"
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/submit_downOrder.png"
                                                alt="下箭头"
                                            />
                                        </div>
                                        <div
                                            class="distribution_timeValue_right"
                                            @click="payWayClick(0, 'zindex=' + 1, 'block=' + 2)"
                                        >
                                            <span>{{ blockDate }}</span>
                                            <img
                                                class="distribution_timeValue_downimg"
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/submit_downOrder.png"
                                                alt="下箭头"
                                            />
                                        </div> -->
                                        <div class="distribution_timeValue_left" >
                                            <!-- <span>{{tcps.yearDate ? tcps.yearDate : tcps.send_time_info[0].date}}</span> -->
                                            <div v-for="(item, index) in send_time_info" @click="payWayClick(0, 'zindex=' + 1,'block=' + 0,index)" :key="index" :style="{ background: item.is_check == 1 ? '#fff' : '' }">{{item.dateVal}}</div>
                                        </div>
                                        <div class="distribution_timeValue_right">
                                            <!-- <span>{{ tcps.blockDate }}</span> -->
                                            <div v-for="(item, index) in send_time_info[timeCheckIndex2].time" :key="index"  @click="payWayClick(0, 'zindex=' + 1, 'block=' + 1,index)" :style="{ borderColor: item.is_check == 1 ? newColor1 :'',color:item.is_check == 1 ? newColor1 :''}">{{ item.time_stare }} - {{ item.time_end }}</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 选择城市，门店 -->
                                <div class="distribution_content_stores" v-else>
                                    <!-- 配送门店列表 -->
                                    <div
                                        class="distribution_content_stores_List"
                                        v-if="store_list && !if_send_info && !payWayVal"
                                    >
                                        <div v-if="store_list.length">
                                            <div
                                                class="distribution_content_stores_ListValue"
                                                v-for="(item, index) in store_list"
                                                :key="index"
                                                @click="changeStore(index)"
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
                                                                borderColor:
                                                                    item.is_check == 1 ? bgcColor1 : '' + '!important'
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
                                        <div v-else class="noPeiSong" style="margin-left:-0.26rem;">
                                            <div class="changeCityBox_content_noValue payCard_noCard">
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/submit_envelopeOrder.png"
                                                    alt="城市"
                                                />
                                                <span class="openPermissions">{{
                                                    submitDate.tips.zanwukexuanmendian
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 配送方式 -->
                                    <div class="distribution_content_stores_List" v-if="if_send_info && !payWayVal">
                                        <div v-if="send_info_list.length">
                                            <div
                                                class="distribution_content_stores_ListValue"
                                                v-for="(item, index) in send_info_list"
                                                :key="index"
                                                @click="changeStore(index)"
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
                                                                borderColor:
                                                                    item.is_check == 1 ? bgcColor1 : '' + '!important'
                                                            }"
                                                        >
                                                            <img
                                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                                alt="check"
                                                                v-if="item.is_check == 1"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="distribution_ListTop_left"
                                                    >
                                                        <span>{{ item.name }}</span>
                                                        <img
                                                            @click.stop="
                                                                warnBtn(item.explain.companiesStr != '' ? item : '')
                                                            "
                                                            v-if="item.explain.companiesStr != ''"
                                                            src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/warn.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    class="distribution_content_stores_ListBottom"
                                                    v-if="item.explain.money > 0 || item.show_send_money == 1"
                                                >
                                                    <span v-if="item.explain.money > 0"
                                                        >{{ submitDate.tips.dingdanman }}{{ CurrencySymbol
                                                        }}{{ item.explain.money }}{{ submitDate.tips.mianyunfei }}</span
                                                    >
                                                    <span v-if="item.show_send_money == 1">
                                                        {{ CurrencySymbol }}{{ item.send_money }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="noPeiSong">
                                            <div class="changeCityBox_content_noValue payCard_noCard">
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/submit_envelopeOrder.png"
                                                    alt="城市"
                                                />
                                                <span class="openPermissions">{{
                                                    submitDate.tips.zanwupeisongfangshi
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 支付方式 -->
                                    <div class="distribution_content_stores_List" v-if="payment_info_list && payWayVal">
                                        <div
                                            class="distribution_content_stores_ListValue"
                                            v-for="(item, index) in payment_info_list"
                                            :key="index"
                                            @click="changeStore(index)"
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
                                                            borderColor:
                                                                item.is_check == 1 ? bgcColor1 : '' + '!important'
                                                        }"
                                                    >
                                                        <img
                                                            src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                            alt="check"
                                                            v-if="item.is_check == 1"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    class="distribution_ListTop_left"
                                                >
                                                    <span>{{ item.name }}</span>
                                                    <img
                                                        @click.stop="
                                                            warnBtn(
                                                                item.payment_brief != '' ? item.payment_brief : '',
                                                                item.payment_brief
                                                            )
                                                        "
                                                        style="flex:none"
                                                        v-if="item.id != 0 && item.id != -1 && item.payment_brief != ''"
                                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/warn.png"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 到底了 -->
                            <div
                                class="footerBox"
                                v-if="
                                    !sendTime &&
                                        (pages > pageCnt || pageCnt == 1) &&
                                        store_listHb &&
                                        store_listHb.length > 4
                                "
                            >
                                <span>我也是有底线的~</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="PoperContentBtn"
                        :style="{ color: bgcColor1 }"
                        @click="closePayWay(send_info_status || payWayVal == 1 ? 9 : 3)"
                    >
                        {{ submitDate.tips.queren }}
                    </div>
                </div>
            </custon-popup>
            <!-- 商铺列表 -->
            <custon-popup ref="customShopName" @closeShopNameFun="closePayWay(4)">
                <div slot="PoperContent" class="changeCityClass">
                    <div class="changeCityBox payWayBox">
                        <div class="changeCityBox_top" style="border-bottom:0;">
                            <div class="changeCityBox_top_left changeCityBox_top_left_heng" v-if="submitDate.group_info">
                                <span>{{
                                    submitDate.group_info[shopIndex] ? submitDate.group_info[shopIndex].shop_name : ""
                                }}</span>
                                <span class="allShopChildren">{{ shop_jianshu }}</span>
                            </div>
                            <div class="changeCityBox_top_right" @click="closePayWay(4)">
                                <div class="weixinAdress_closeIcon">
                                    <span class="weixinAdress_closeIcon_left"></span>
                                    <span class="weixinAdress_closeIcon_right"></span>
                                </div>
                            </div>
                        </div>
                        <div class="payWay_content shopName_content">
                            <div class="payWay_content_children" v-for="(item, index) in shopList" :key="index">
                                <div class="payWay_content_children_left">
                                    <div class="shopNameImg">
                                        <img :src="item.pro_pic" alt="商品图片" />
                                    </div>
                                </div>
                                <div class="payWay_content_children_right shopName_children_right">
                                    <div class="payWay_content_children_right_top shopName_children_right_top">
                                        <div class="top_title">
                                            <span
                                                class="onestatusProTag"
                                                :style="{
                                                    marginRight: '0.10rem',
                                                    color: bgcColor1,
                                                    borderColor: bgcColor2,
                                                    background: bgcColor4
                                                }"
                                                v-if="item.pro_tag != ''"
                                                >{{ item.pro_tag }}</span
                                            ><span>{{ item.pro_name }}</span>
                                        </div>
                                        <!-- 规格 -->
                                        <div
                                            style="color:#A9A9A9;margin-top:0.06rem;font-size:0.26rem;"
                                            v-if="item.param_name != ''"
                                        >
                                            <span>{{ item.param_name }}</span>
                                        </div>
                                        <!-- 立减 -->
                                        <div class="top_reduce" v-if="item.lijian > 0">
                                            <span
                                                >{{ submitDate.tips.shoujixiadanlijian }}{{ CurrencySymbol
                                                }}{{ item.lijian }}</span
                                            >
                                        </div>
                                    </div>
                                    <div class="payWay_content_children_right_bottom">
                                        <div class="price_left" style="height:0.38rem;">
                                            <span
                                                ><span class="price_left_symbol" style="margin-right:0.05rem;">{{
                                                    CurrencySymbol
                                                }}</span
                                                >{{ item.total_money_json.left }}.<span style="font-size:0.24rem;">{{
                                                    item.total_money_json.right
                                                }}</span></span
                                            >
                                        </div>
                                        <div class="price_right">
                                            <span
                                                >x<span>{{ item.pro_num }}</span></span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </custon-popup>
            <!-- 单选弹窗样式 -->
            <custon-popup ref="customPayWay" @closeRadioFun="closePayWay(hotelValue == 1 ? 10 : 0)">
                <div slot="PoperContentHigh" class="changeCityClass">
                    <div class="changeCityBox payWayBox">
                        <div class="changeCityBox_top" style="border-bottom:0;">
                            <div class="changeCityBox_top_left">
                                <span>{{
                                    dateValue == 1 || faType_val == 1 || hotelValue == 1
                                        ? submitDate.tips.qingxuanze
                                        : submitDate.tips.peisongshijian
                                }}</span>
                            </div>
                            <div class="changeCityBox_top_right" @click="closePayWay(hotelValue == 1 ? 10 : 0)">
                                <div class="weixinAdress_closeIcon">
                                    <span class="weixinAdress_closeIcon_left"></span>
                                    <span class="weixinAdress_closeIcon_right"></span>
                                </div>
                            </div>
                        </div>
                        <div class="payWay_content">
                            <!-- 下拉列表测试 -->
                            <article v-if="dateValue == 1">
                                <div
                                    class="payWay_content_children"
                                    v-for="(item, index) in add_form_info[selectIndex].param_value"
                                    :key="index"
                                    @click="changeSelct(index)"
                                >
                                    <div
                                        :class="
                                            item.c == 1
                                                ? 'selectPayWay payWay_content_children_right'
                                                : 'payWay_content_children_right'
                                        "
                                    >
                                        <div class="customFrom_content_ridao">
                                            <div
                                                :class="
                                                    item.c == 1
                                                        ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                        : 'shoppingContent_radio'
                                                "
                                                :style="{
                                                    background: item.c == 1 ? bgcColor1 : '',
                                                    borderColor: item.c == 1 ? bgcColor1 : '' + '!important'
                                                }"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                    alt="check"
                                                    v-if="item.c == 1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="payWay_content_children_left">
                                        <span>{{ item.v }}</span>
                                    </div>
                                </div>
                            </article>
                            <article v-if="is_time == 0 && dateValue == -1">
                                <!-- 普通发票（0），增值税发票（1） -->
                                <div
                                    class="payWay_content_children"
                                    @click="changePZ(index)"
                                    v-for="(item, index) in invoice_info.type_arr"
                                    :key="index"
                                >
                                    <!-- 普通发票 -->
                                    <div class="selectPayWay payWay_content_children_right">
                                        <div class="customFrom_content_ridao">
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
                                    </div>
                                    <div class="payWay_content_children_left">
                                        <span>{{ item.name }}</span>
                                    </div>
                                </div>
                            </article>
                            <!-- 普通发票内容 -->
                            <article v-if="is_time == 2">
                                <div
                                    class="payWay_content_children"
                                    @click="changePerson(index)"
                                    v-for="(item, index) in invoice_info.ord.contents"
                                    :key="index"
                                >
                                    <div class="selectPayWay payWay_content_children_right">
                                        <div class="customFrom_content_ridao">
                                            <div
                                                :class="
                                                    item == fapiaoSelectP
                                                        ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                        : 'shoppingContent_radio'
                                                "
                                                :style="{
                                                    background: item == fapiaoSelectP ? bgcColor1 : '',
                                                    borderColor: item == fapiaoSelectP ? bgcColor1 : '' + '!important'
                                                }"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                    alt="check"
                                                    v-if="item == fapiaoSelectP"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="payWay_content_children_left">
                                        <span>{{ item }}</span>
                                    </div>
                                </div>
                            </article>
                            <!-- 增值税发票内容 -->
                            <article v-if="is_time == 3">
                                <div
                                    class="payWay_content_children"
                                    @click="changePerson(index)"
                                    v-for="(item, index) in invoice_info.vat.contents"
                                    :key="index"
                                >
                                    <div class="selectPayWay payWay_content_children_right">
                                        <div class="customFrom_content_ridao">
                                            <div
                                                :class="
                                                    item == fapiaoSelectS
                                                        ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                        : 'shoppingContent_radio'
                                                "
                                                :style="{
                                                    background: item == fapiaoSelectS ? bgcColor1 : '',
                                                    borderColor: item == fapiaoSelectS ? bgcColor1 : '' + '!important'
                                                }"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                    alt="check"
                                                    v-if="item == fapiaoSelectS"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="payWay_content_children_left">
                                        <span>{{ item }}</span>
                                    </div>
                                </div>
                            </article>

                            <!-- 酒店入住人数选择 -->
                            <article v-if="hotelValue == 1">
                                <div
                                    class="payWay_content_children"
                                    v-for="(item, index) in peope_list"
                                    :key="index"
                                    @click="changeHotelNum(index)"
                                >
                                    <div
                                        :class="
                                            item.is_check == 1
                                                ? 'selectPayWay payWay_content_children_right'
                                                : 'payWay_content_children_right'
                                        "
                                    >
                                        <div class="customFrom_content_ridao">
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
                                    </div>
                                    <div class="payWay_content_children_left">
                                        <span>{{ item.val }}</span>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>

                    <div
                        class="PoperContentBtn"
                        :style="{ color: bgcColor1 }"
                        @click="closePayWay(hotelValue == 1 ? 10 : 0)"
                    >
                        {{ submitDate.tips.queren }}
                    </div>
                </div>
            </custon-popup>
            <!-- 发票信息全屏弹窗 -->
            <custon-popup id="invoiceFullId" ref="invoiceRefFull">
                <div slot="PoperContentFull" class="invoiceRefFull" style="padding-top:0;">
                    <div class="contianer_top" :style="{ background: headcolor === 0 ? '#fff' : headcolor }">
                        <div class="navbar">
                            <span
                                :class="headcolor === 0 ? 'shoppingCat_back shoppingCat_back2' : 'shoppingCat_back'"
                                @click="closePayWay(6, 'back=' + 1)"
                            ></span>
                            <span :style="{ color: headcolor === 0 ? '#222' : '' }">{{
                                submitDate.tips.dingdanjiesuan
                            }}</span>
                        </div>
                    </div>
                    <!-- 开具发票，发票类型 -->
                    <div class="invoiceRefFull_type_box" v-if="invoice_info">
                        <!-- 开具发票 -->
                        <div class="invoiceRefFull_type" :style="{ border: is_use ? '' : 0 }">
                            <div class="invoiceRefFull_type_left">
                                <span>{{ invoice_info.tips.kaijufapiao }}</span>
                            </div>
                            <div class="invoiceRefFull_type_right">
                                <div
                                    @click="changeFp"
                                    :style="{
                                        background: is_use ? bgcColor1 : '' + '!important',
                                        borderColor: is_use ? bgcColor1 : '' + '!important'
                                    }"
                                    :class="is_use ? 'marquee marqueeSelect' : 'marquee'"
                                >
                                    <div :class="is_use ? 'marqueeButton marqueeButtonSelect' : 'marqueeButton'"></div>
                                </div>
                            </div>
                        </div>
                        <!-- 发票类型 -->
                        <div class="invoiceRefFull_type" v-if="is_use">
                            <div class="invoiceRefFull_type_left">
                                <span>{{ invoice_info.tips.fapiaoleixing }}</span>
                            </div>
                            <div class="invoiceRefFull_type_right" @click="invoiceType(0)">
                                <span v-for="(item, index) in invoice_info.type_arr" :key="index"
                                    ><span v-if="item.is_check == 1">{{ item.name }}</span></span
                                >
                                <div
                                    class="right_arrow right_arrow_voice"
                                    v-if="invoice_info.type_arr.length > 1"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div class="invoiceInfo_box" v-if="is_use">
                        <!-- 普通发票 -->
                        <div v-if="invoice_info.type_arr[index_fp].is_status == 0">
                            <!-- 发票信息 -->
                            <div class="invoiceInfo_title">
                                <span>{{ invoice_info.tips.fapiaoxinxi }}</span>
                            </div>
                            <!-- 个人，公司选择 -->
                            <div class="invoiceInfo_content">
                                <div class="invoiceInfo_content_child">
                                    <div class="invoiceInfo_content_child_left">
                                        <div class="invoiceInfo_child_leftValue" @click="changePerAdd(0)">
                                            <div
                                                :class="
                                                    is_fpStatus == 0
                                                        ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                        : 'shoppingContent_radio'
                                                "
                                                :style="{
                                                    marginRight: '0.15rem',
                                                    background: is_fpStatus == 0 ? bgcColor1 : '' + '!important',
                                                    borderColor: is_fpStatus == 0 ? bgcColor1 : '' + '!important'
                                                }"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                    alt="check"
                                                    v-if="is_fpStatus == 0"
                                                />
                                            </div>
                                            <span>{{ invoice_info.tips.geren }}</span>
                                        </div>
                                        <div class="invoiceInfo_child_leftValue" @click="changePerAdd(1)">
                                            <div
                                                :class="
                                                    is_fpStatus == 1
                                                        ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                        : 'shoppingContent_radio'
                                                "
                                                :style="{
                                                    marginRight: '0.15rem',
                                                    background: is_fpStatus == 1 ? bgcColor1 : '' + '!important',
                                                    borderColor: is_fpStatus == 1 ? bgcColor1 : '' + '!important'
                                                }"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                    alt="check"
                                                    v-if="is_fpStatus == 1"
                                                />
                                            </div>
                                            <span>{{ invoice_info.tips.gongsi }}</span>
                                        </div>
                                    </div>
                                </div>
                                <article v-if="is_fpStatus != 0">
                                    <!-- 单位信息 -->
                                    <div class="invoiceInfo_content">
                                        <!-- 发票抬头 -->
                                        <div class="invoiceInfo_content_child">
                                            <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                                <span class="title_warn" v-if="true">*</span>
                                                <span>{{ invoice_info.tips.fapiaotaitou }}</span>
                                            </div>
                                            <div class="invoiceRefFull_type_right" @click="payWayClick(7, '')">
                                                <span style="color:#a9a9a9;">{{
                                                    invoice_info.tips.genghuantaitou
                                                }}</span>
                                                <div class="right_arrow" style="padding:0;"></div>
                                            </div>
                                        </div>
                                        <!-- 抬头信息 -->
                                        <div class="invoiceInfo_content_child">
                                            <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                                <span class="title_warn">*</span>
                                                <span>{{ invoice_info.tips.danweimingcheng }}</span>
                                            </div>
                                            <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                                <input
                                                    :placeholder="
                                                        submitDate.tips.qingtianxie + invoice_info.tips.danweimingcheng
                                                    "
                                                    :value="faListPT[fpttIndex].title ? faListPT[fpttIndex].title : ''"
                                                    @input="ptInput(0, $event.target.value)"
                                                />
                                            </div>
                                        </div>
                                        <div class="invoiceInfo_content_child">
                                            <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                                <span class="title_warn">*</span>
                                                <span>{{ invoice_info.tips.nashuirenshibiehao }}</span>
                                            </div>
                                            <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                                <input
                                                    :placeholder="
                                                        submitDate.tips.qingtianxie +
                                                            invoice_info.tips.nashuirenshibiehao
                                                    "
                                                    :value="
                                                        faListPT[fpttIndex].duty_num ? faListPT[fpttIndex].duty_num : ''
                                                    "
                                                    @input="ptInput(1, $event.target.value)"
                                                />
                                            </div>
                                        </div>
                                        <div class="invoiceInfo_content_child">
                                            <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                                <span>{{ invoice_info.tips.zhucedizhi }}</span>
                                            </div>
                                            <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                                <input
                                                    :placeholder="
                                                        submitDate.tips.qingtianxie + invoice_info.tips.zhucedizhi
                                                    "
                                                    :value="
                                                        faListPT[fpttIndex].address ? faListPT[fpttIndex].address : ''
                                                    "
                                                    @input="ptInput(2, $event.target.value)"
                                                />
                                            </div>
                                        </div>
                                        <div class="invoiceInfo_content_child">
                                            <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                                <span>{{ invoice_info.tips.zhucedianhua }}</span>
                                            </div>
                                            <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                                <input
                                                    :placeholder="
                                                        submitDate.tips.qingtianxie + invoice_info.tips.zhucedianhua
                                                    "
                                                    :value="faListPT[fpttIndex].tel ? faListPT[fpttIndex].tel : ''"
                                                    @input="ptInput(3, $event.target.value)"
                                                />
                                            </div>
                                        </div>
                                        <div class="invoiceInfo_content_child">
                                            <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                                <span>{{ invoice_info.tips.kaihuyinhang }}</span>
                                            </div>
                                            <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                                <input
                                                    :placeholder="
                                                        submitDate.tips.qingtianxie + invoice_info.tips.kaihuyinhang
                                                    "
                                                    :value="faListPT[fpttIndex].bank ? faListPT[fpttIndex].bank : ''"
                                                    @input="ptInput(4, $event.target.value)"
                                                />
                                            </div>
                                        </div>
                                        <div class="invoiceInfo_content_child">
                                            <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                                <span>{{ invoice_info.tips.yinhangzhanghu }}</span>
                                            </div>
                                            <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                                <input
                                                    :placeholder="
                                                        submitDate.tips.qingtianxie + invoice_info.tips.yinhangzhanghu
                                                    "
                                                    :value="
                                                        faListPT[fpttIndex].account ? faListPT[fpttIndex].account : ''
                                                    "
                                                    @input="ptInput(5, $event.target.value)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <!-- 发票内容(普通发票) -->
                            <div
                                class="invoiceRefFull_type_box"
                                @click="invoiceType(2)"
                                style="margin-bottom:0.20rem;"
                                v-if="invoice_info.ord.contents.length"
                            >
                                <div class="invoiceRefFull_type">
                                    <div class="invoiceRefFull_type_left">
                                        <span class="title_warn" v-if="true">*</span>
                                        <span>{{ invoice_info.tips.fapiaoneirong }}</span>
                                    </div>
                                    <div class="invoiceRefFull_type_right">
                                        {{ fapiaoSelectP ? fapiaoSelectP : invoice_info.ord.contents[0] }}
                                        <div class="right_arrow right_arrow_voice"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 增值税发票内容 -->
                        <div v-if="invoice_info.type_arr[index_fp].is_status == 1">
                            <!-- 单位信息 -->
                            <div class="invoiceInfo_content">
                                <!-- 发票抬头 -->
                                <div class="invoiceInfo_content_child">
                                    <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                        <span class="title_warn" v-if="true">*</span>
                                        <span>{{ invoice_info.tips.fapiaotaitou }}</span>
                                    </div>
                                    <div class="invoiceRefFull_type_right" @click="payWayClick(7, '')">
                                        <span style="color:#a9a9a9;">{{ invoice_info.tips.genghuantaitou }}</span>
                                        <div class="right_arrow" style="padding:0;"></div>
                                    </div>
                                </div>
                                <div class="invoiceInfo_content_child">
                                    <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                        <span class="title_warn">*</span>
                                        <span>{{ invoice_info.tips.danweimingcheng }}</span>
                                    </div>
                                    <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                        <input
                                            :placeholder="
                                                submitDate.tips.qingtianxie + invoice_info.tips.danweimingcheng
                                            "
                                            :value="faListZZ[fpzzIndex2].title ? faListZZ[fpzzIndex2].title : ''"
                                            @input="zzsInput(0, $event.target.value)"
                                        />
                                    </div>
                                </div>
                                <div class="invoiceInfo_content_child">
                                    <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                        <span class="title_warn">*</span>
                                        <span>{{ invoice_info.tips.nashuirenshibiehao }}</span>
                                    </div>
                                    <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                        <input
                                            :placeholder="
                                                submitDate.tips.qingtianxie + invoice_info.tips.nashuirenshibiehao
                                            "
                                            :value="faListZZ[fpzzIndex2].duty_num ? faListZZ[fpzzIndex2].duty_num : ''"
                                            @input="zzsInput(1, $event.target.value)"
                                        />
                                    </div>
                                </div>
                                <div class="invoiceInfo_content_child">
                                    <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                        <span class="title_warn">*</span>
                                        <span>{{ invoice_info.tips.zhucedizhi }}</span>
                                    </div>
                                    <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                        <input
                                            :placeholder="submitDate.tips.qingtianxie + invoice_info.tips.zhucedizhi"
                                            :value="faListZZ[fpzzIndex2].address ? faListZZ[fpzzIndex2].address : ''"
                                            @input="zzsInput(2, $event.target.value)"
                                        />
                                    </div>
                                </div>
                                <div class="invoiceInfo_content_child">
                                    <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                        <span class="title_warn">*</span>
                                        <span>{{ invoice_info.tips.zhucedianhua }}</span>
                                    </div>
                                    <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                        <input
                                            :placeholder="submitDate.tips.qingtianxie + invoice_info.tips.zhucedianhua"
                                            :value="faListZZ[fpzzIndex2].tel ? faListZZ[fpzzIndex2].tel : ''"
                                            @input="zzsInput(3, $event.target.value)"
                                        />
                                    </div>
                                </div>
                                <div class="invoiceInfo_content_child">
                                    <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                        <span class="title_warn">*</span>
                                        <span>{{ invoice_info.tips.kaihuyinhang }}</span>
                                    </div>
                                    <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                        <input
                                            :placeholder="submitDate.tips.qingtianxie + invoice_info.tips.kaihuyinhang"
                                            :value="faListZZ[fpzzIndex2].bank ? faListZZ[fpzzIndex2].bank : ''"
                                            @input="zzsInput(4, $event.target.value)"
                                        />
                                    </div>
                                </div>
                                <div class="invoiceInfo_content_child">
                                    <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                        <span class="title_warn">*</span>
                                        <span>{{ invoice_info.tips.yinhangzhanghu }}</span>
                                    </div>
                                    <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                        <input
                                            :placeholder="
                                                submitDate.tips.qingtianxie + invoice_info.tips.yinhangzhanghu
                                            "
                                            :value="faListZZ[fpzzIndex2].account ? faListZZ[fpzzIndex2].account : ''"
                                            @input="zzsInput(5, $event.target.value)"
                                        />
                                    </div>
                                </div>
                            </div>
                            <!-- 发票内容 -->
                            <div
                                class="invoiceRefFull_type_box"
                                style="margin-bottom:0.20rem;"
                                v-if="invoice_info.vat.contents.length"
                                @click="invoiceType(3)"
                            >
                                <div class="invoiceRefFull_type">
                                    <div class="invoiceRefFull_type_left">
                                        <span class="title_warn" v-if="true">*</span>
                                        <span>{{ invoice_info.tips.fapiaoneirong }}</span>
                                    </div>
                                    <div class="invoiceRefFull_type_right">
                                        {{ fapiaoSelectS ? fapiaoSelectS : invoice_info.vat.contents[0] }}
                                        <div class="right_arrow right_arrow_voice"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- 收款人信息 -->
                            <div class="invoiceInfo_content">
                                <div class="invoiceInfo_content_child">
                                    <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                        <span class="title_warn">*</span>
                                        <span>{{ invoice_info.tips.shoupiaorenxingming }}</span>
                                    </div>
                                    <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                        <input
                                            :placeholder="invoice_info.tips.shoupiaorenxingming"
                                            :value="
                                                faListZZ[fpzzIndex2].receive_name
                                                    ? faListZZ[fpzzIndex2].receive_name
                                                    : ''
                                            "
                                            @input="zzsInput(6, $event.target.value)"
                                        />
                                    </div>
                                </div>
                                <div class="invoiceInfo_content_child">
                                    <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                        <span class="title_warn">*</span>
                                        <span>{{ invoice_info.tips.shoupiaorendianhua }}</span>
                                    </div>
                                    <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                        <input
                                            :placeholder="invoice_info.tips.shoupiaorendianhua"
                                            :value="
                                                faListZZ[fpzzIndex2].receive_tel ? faListZZ[fpzzIndex2].receive_tel : ''
                                            "
                                            @input="zzsInput(7, $event.target.value)"
                                        />
                                    </div>
                                </div>
                                <div class="invoiceInfo_content_child" @click="changeUserCity">
                                    <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                        <span class="title_warn">*</span>
                                        <span>{{ invoice_info.tips.shoupiaorenchengshi }}</span>
                                    </div>
                                    <div class="invoiceRefFull_type_right">
                                        <span style="color:#a9a9a9;">{{
                                            cityValue ? cityValue : submitDate.tips.qingxuanze
                                        }}</span>
                                        <div class="right_arrow" style="padding:0;"></div>
                                    </div>
                                </div>
                                <div class="invoiceInfo_content_child" v-if="invoice_info.fapiao_address != 0">
                                    <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                        <span class="title_warn">*</span>
                                        <span>{{ invoice_info.tips.xiangxidizhi }}</span>
                                    </div>
                                    <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                        <input
                                            :placeholder="invoice_info.tips.xiangxidizhiwuxuchongfutianjia"
                                            :value="
                                                faListZZ[fpzzIndex2].receive_address
                                                    ? faListZZ[fpzzIndex2].receive_address
                                                    : ''
                                            "
                                            @input="zzsInput(8, $event.target.value)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 确认 -->
                    <div class="footer_btn" :style="{ background: bgcColor1 }" @click="closePayWay(6)">
                        {{ submitDate.tips.queren }}
                    </div>
                </div>
            </custon-popup>
            <!-- 说明弹窗 -->
            <div class="payWayMyBox" v-if="payWayFlg">
                <div class="payWayMy">
                    <div class="payWayMy_title">
                        <span>{{ submitDate.tips.shuoming }}</span>
                    </div>
                    <!-- 支付方式 -->
                    <div class="payWayMy_content" v-if="payWayVal == 1">
                        <div v-html="companiesStr"></div>
                    </div>
                    <div class="payWayMy_content" v-else-if="payWayVal == 3">
                        <span>{{supply_send_info.detail_tips}}</span>
                    </div>
                    <!-- 配送方式 -->
                    <div class="payWayMy_content" v-else>
                        <div>
                            <span>{{ submitDate.tips.zhichiwuliu }}: {{ companiesStr.explain.companiesStr }}</span>
                        </div>
                        <div>
                            {{ submitDate.tips.morenqibujia }}: {{ CurrencySymbol
                            }}{{ companiesStr.explain.start_price }} {{ submitDate.tips.qibuzhongliang }}:
                            {{ companiesStr.explain.start_weight }}{{ submitDate.tips.ke }}
                            <span v-if="companiesStr.explain.add_weight > 0"
                                >{{ submitDate.tips.jiajiazhongliang }}: {{ companiesStr.explain.add_weight
                                }}{{ submitDate.tips.ke }} {{ submitDate.tips.jiajia }}: {{ CurrencySymbol
                                }}{{ companiesStr.explain.add_price }}</span
                            >
                        </div>
                        <div v-if="companiesStr.explain.special_info && companiesStr.explain.special_info.length">
                            {{ submitDate.tips.teshuquyujiage }}:
                            <span v-for="(psItem, psIndex) in companiesStr.explain.special_info" :key="psIndex"
                                >{{ psItem.area }} {{ submitDate.tips.qibujia }}: {{ CurrencySymbol
                                }}{{ psItem.start_price }} {{ submitDate.tips.qibuzhongliang }}: {{ psItem.start_weight
                                }}{{ submitDate.tips.ke }}
                                <span v-if="psItem.add_weight > 0"
                                    >{{ submitDate.tips.jiajiazhongliang }}: {{ psItem.add_weight
                                    }}{{ submitDate.tips.ke }} {{ submitDate.tips.jiajia }}: {{ CurrencySymbol
                                    }}{{ psItem.add_price }}
                                </span></span
                            >
                        </div>
                        <div v-if="companiesStr.explain.content != ''">
                            {{ submitDate.tips.beizhu }}: {{ companiesStr.explain.content }}
                        </div>
                    </div>
                </div>
                <!-- 确认按钮 -->
                <div class="payWayMy_btn" @click="closePayWayFlg">
                    <span :style="{ color: bgcColor1 }">{{ submitDate.tips.queren }}</span>
                </div>
            </div>
            <!-- 发票信息选择 -->
            <custon-popup ref="invoiceRef" @closeFpList="closePayWay(7)">
                <div slot="PoperContentHigh" class="changeCityClass">
                    <div class="changeCityBox payWayBox">
                        <div class="invoiceRef_top" style="border-bottom:0;">
                            <span>{{ submitDate.tips.xuanzefapiaotaitou }}</span>
                            <div class="changeCityBox_top_right changeCityBox_invoice" @click="closePayWay(7)">
                                <div class="weixinAdress_closeIcon">
                                    <span class="weixinAdress_closeIcon_left"></span>
                                    <span class="weixinAdress_closeIcon_right"></span>
                                </div>
                            </div>
                        </div>
                        <div
                            class="payWay_content"
                            :style="{ paddingTop: '0.31rem', paddingLeft: faList.length == 0 ? 0 : '' }"
                        >
                            <div v-if="faList.length > 0">
                                <div
                                    class="payWay_content_invoice"
                                    v-for="(item, index) in faList"
                                    :key="index"
                                    @click="changeTtContent(index)"
                                >
                                    <div class="payWay_content_left">
                                        <div
                                            :class="
                                                item.is_check == 1
                                                    ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                    : 'shoppingContent_radio'
                                            "
                                            :style="{
                                                background: item.is_check == 1 ? bgcColor1 : '' + '!important',
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
                                    <div class="payWay_content_right">
                                        <div class="payWay_content_right_title">{{ item.title }}</div>
                                        <div style="padding-top:0.28rem;">
                                            <div class="payWay_content_right_text">{{ item.duty_num }}</div>
                                            <div class="payWay_content_right_text">{{ item.address }}</div>
                                            <div class="payWay_content_right_text">{{ item.bank }}</div>
                                            <div class="payWay_content_right_text">{{ item.account }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 暂无抬头 -->
                            <div v-else>
                                <div class="changeCityBox_content" style="height:6.25rem;">
                                    <div class="changeCityBox_content_noValueBox">
                                        <div class="changeCityBox_content_noValue payCard_noCard">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/submit_envelopeOrder.png"
                                                alt="城市"
                                            />
                                            <span class="openPermissions">{{
                                                submitDate.tips.ninhaimeiyoukeyishiyongdefapiaotaiyou
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 到底了 -->
                            <div
                                class="footerBox"
                                v-if="faList.length > 3 && (pagesFp > fpbag_num_max || fpbag_num_max == 1)"
                            >
                                <span>我也是有底线的~</span>
                            </div>
                        </div>
                    </div>

                    <div
                        class="PoperContentBtn PoperContentBtn_volice"
                        style="color:#fff !important;"
                        @click="payWayClick(8, '')"
                        v-if="invoice_info"
                    >
                        {{ invoice_info.tips.tianjiafapiaotaitou }}
                    </div>
                </div>
            </custon-popup>
            <!-- 发票信息填写 -->
            <custon-popup ref="addInvoiceRef" @closeFpWrite="closePayWay(7)" v-if="invoice_info">
                <div slot="PoperContentFullUp" class="invoiceRefFull">
                    <div class="contianer_top" :style="{ background: headcolor === 0 ? '#fff' : headcolor }">
                        <div class="navbar">
                            <span
                                :class="headcolor === 0 ? 'shoppingCat_back shoppingCat_back2' : 'shoppingCat_back'"
                                @click="closePayWay(8)"
                            ></span>
                            <span :style="{ color: headcolor === 0 ? '#222' : '' }">{{
                                invoice_info.tips.tianjiafapiaotaitou
                            }}</span>
                        </div>
                    </div>
                    <!-- <div class="invoiceRefFull_top" v-else>
                        <div class="back_page" @click="closePayWay" data-type="8">
                            <div class="back_page_arrow"></div>
                        </div>
                        <span>{{invoice_info.tips.tianjiafapiaotaitou}}</span>
                    </div> -->
                    <div class="invoiceInfo_box">
                        <!-- 微信获取发票抬头 -->
                        <!-- <div class="Tips" @click.stop="getInvoice" v-if="fapiao_wx && invoice_info.fapiao_wx == 1 ">
                        <div class="Tips_left">
                        <div class="Tips_img">
                            <img mode="widthFix" src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/redesign_weixin.png">
                        </div>
                        <div class="Tips_txt">点击获取微信发票抬头</div>
                        </div>
                        <div class="Tips_close" @click.stop="closrWeixinFp">
                        <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/redesign_colse1.png">
                        </div>
                    </div> -->
                        <!-- 单位信息 -->
                        <div class="invoiceInfo_content">
                            <div class="invoiceInfo_content_child">
                                <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                    <span class="title_warn">*</span>
                                    <span>{{ invoice_info.tips.danweimingcheng }}</span>
                                </div>
                                <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                    <input
                                        :placeholder="submitDate.tips.qingtianxie + invoice_info.tips.danweimingcheng"
                                        @input="tinjiaTT(0, $event.target.value)"
                                        :value="tjTTJSON.title"
                                    />
                                </div>
                            </div>
                            <div class="invoiceInfo_content_child">
                                <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                    <span class="title_warn">*</span>
                                    <span>{{ invoice_info.tips.nashuirenshibiehao }}</span>
                                </div>
                                <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                    <input
                                        :placeholder="
                                            submitDate.tips.qingtianxie + invoice_info.tips.nashuirenshibiehao
                                        "
                                        @input="tinjiaTT(1, $event.target.value)"
                                        :value="tjTTJSON.duty_num"
                                    />
                                </div>
                            </div>
                            <div class="invoiceInfo_content_child">
                                <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                    <span class="title_warn">*</span>
                                    <span>{{ invoice_info.tips.zhucedizhi }}</span>
                                </div>
                                <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                    <input
                                        :placeholder="submitDate.tips.qingtianxie + invoice_info.tips.zhucedizhi"
                                        @input="tinjiaTT(2, $event.target.value)"
                                        :value="tjTTJSON.address"
                                    />
                                </div>
                            </div>
                            <div class="invoiceInfo_content_child">
                                <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                    <span class="title_warn">*</span>
                                    <span>{{ invoice_info.tips.zhucedianhua }}</span>
                                </div>
                                <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                    <input
                                        :placeholder="submitDate.tips.qingtianxie + invoice_info.tips.zhucedianhua"
                                        @input="tinjiaTT(3, $event.target.value)"
                                        :value="tjTTJSON.tel"
                                    />
                                </div>
                            </div>
                            <div class="invoiceInfo_content_child">
                                <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                    <span class="title_warn">*</span>
                                    <span>{{ invoice_info.tips.kaihuyinhang }}</span>
                                </div>
                                <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                    <input
                                        :placeholder="submitDate.tips.qingtianxie + invoice_info.tips.kaihuyinhang"
                                        @input="tinjiaTT(4, $event.target.value)"
                                        :value="tjTTJSON.bank"
                                    />
                                </div>
                            </div>
                            <div class="invoiceInfo_content_child">
                                <div class="invoiceInfo_content_child_left" style="width:2.57rem;">
                                    <span class="title_warn">*</span>
                                    <span>{{ invoice_info.tips.yinhangzhanghu }}</span>
                                </div>
                                <div class="invoiceInfo_content_child_right invoiceInfo_content_auto">
                                    <input
                                        :placeholder="submitDate.tips.qingtianxie + invoice_info.tips.yinhangzhanghu"
                                        @input="tinjiaTT(5, $event.target.value)"
                                        :value="tjTTJSON.account"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- 添加发票抬头 -->
                        <div class="footer_btn" @click="addFpfun">{{ invoice_info.tips.tianjiafapiaotaitou }}</div>
                    </div>
                </div>
            </custon-popup>
            <!-- 代金券弹窗 -->
            <custon-popup ref="customMyVouchers" @closeMyVouchersFun="closePayWay(2)">
                <div slot="PoperContent" class="changeCityClass">
                    <div class="changeCityBox">
                        <div class="myVouchersBox">
                            <div
                                class="changeCityBox_top"
                                style="border-bottom:0;padding-top:0.20rem;margin-bottom:0.16rem;"
                            >
                                <div class="changeCityBox_top_left">
                                    <span>{{ submitDate.tips.daijinquan }}</span>
                                </div>
                                <div class="changeCityBox_top_right" @click="closePayWay(2)">
                                    <div class="weixinAdress_closeIcon">
                                        <span class="weixinAdress_closeIcon_left"></span>
                                        <span class="weixinAdress_closeIcon_right"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="myVouchers_change">
                                <div
                                    :class="vochers_type == 0 ? 'selectMyVouchers' : 'myVouchers_change_children'"
                                    @click="changeVochers(0)"
                                    style="color: #222222 !important;"
                                >
                                    <span
                                        >{{ submitDate.tips.keyongdaijinquan
                                        }}<span>({{ submitDate.coupon_info.can_use_cnt }})</span></span
                                    >
                                    <div class="selectMyVouchers_bot" :style="{ background: bgcColor1 }"></div>
                                </div>
                                <div
                                    :class="vochers_type == 1 ? 'selectMyVouchers' : 'myVouchers_change_children'"
                                    @click="changeVochers(1)"
                                    style="margin-left: 1.24rem;"
                                >
                                    <span
                                        >{{ submitDate.tips.bukeyongdaijinquan
                                        }}<span>({{ submitDate.coupon_info.not_use_cnt }})</span></span
                                    >
                                    <div class="selectMyVouchers_bot" :style="{ background: bgcColor1 }"></div>
                                </div>
                            </div>
                        </div>

                        <div class="changeCityBox_content" style="background:#F6F6F6;">
                            <!-- 没有优惠券 -->
                            <div
                                class="changeCityBox_content_noValueBox"
                                v-if="
                                    (vochers_type == 0 &&
                                        coupon_info.can_use_arr &&
                                        coupon_info.can_use_arr.length == 0) ||
                                        (vochers_type == 1 &&
                                            coupon_info.not_use_arr &&
                                            coupon_info.not_use_arr.length == 0)
                                "
                            >
                                <div class="changeCityBox_content_noValue payCard_noCard">
                                    <img
                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/submit_envelopeOrder.png"
                                        alt="城市"
                                    />
                                    <span class="openPermissions">{{
                                        submitDate.tips.ninhaimeiyouxiangguandequan
                                    }}</span>
                                </div>
                            </div>
                            <!-- 有优惠券 -->
                            <div
                                class="changeVouchers_ValueBox"
                                v-if="vochers_type == 0 && coupon_info.can_use_arr && coupon_info.can_use_arr.length"
                            >
                                <div class="changeVouchers_Value">
                                    <div
                                        class="changeVouchers_Value_children"
                                        v-for="(item, index) in coupon_info.can_use_arr"
                                        :key="index"
                                        @click="bindVoucherBtn(index, item.ifChange)"
                                    >
                                        <!-- 左边价格，规则-->
                                        <div class="changeVouchers_Value_children_left">
                                            <div class="changeVouchers_Value_children_top">
                                                <div class="changeVouchers_children_top_price">
                                                    <span style="display:block;" class="vouchers_price_text"
                                                        ><span style="margin-right:0.06rem;">{{ CurrencySymbol }}</span
                                                        >{{ item.coupon_price_json.left }}.<span
                                                            style="font-size:0.32rem;"
                                                            >{{ item.coupon_price_json.right }}</span
                                                        ></span
                                                    >
                                                    <span class="vouchers_text">{{ submitDate.tips.daijinquan }}</span>
                                                </div>
                                                <div class="changeVouchers_Value_children_top_guize">
                                                    <span class="first_guize" style="display:block;"
                                                        >{{ submitDate.tips.shiyongguize }}：</span
                                                    >
                                                    <div v-html="item.rule"></div>
                                                </div>
                                            </div>
                                            <div class="changeVouchers_Value_children_bottom">
                                                <div>
                                                    <img
                                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/time.png"
                                                        alt="time"
                                                    />
                                                    <span>{{ item.show_msg }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 右边点选按钮 -->
                                        <div class="changeVouchers_Value_children_right">
                                            <div class="customFrom_content_ridao">
                                                <div
                                                    :class="
                                                        item.is_check
                                                            ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                            : 'shoppingContent_radio'
                                                    "
                                                    :style="{
                                                        background: item.is_check ? bgcColor1 : '',
                                                        borderColor: item.is_check ? bgcColor1 : '' + '!important'
                                                    }"
                                                >
                                                    <img
                                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                        alt="check"
                                                        v-if="item.is_check"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 不可用代金券 -->
                            <div
                                class="changeVouchers_ValueBox"
                                v-if="vochers_type == 1 && coupon_info.not_use_arr.length"
                            >
                                <div class="changeVouchers_Value">
                                    <div
                                        class="changeVouchers_Value_children"
                                        v-for="(item, index) in coupon_info.not_use_arr"
                                        :key="index"
                                    >
                                        <!-- 左边价格，规则-->
                                        <div class="changeVouchers_Value_children_left">
                                            <div class="changeVouchers_Value_children_top">
                                                <div class="changeVouchers_children_top_price">
                                                    <span style="display:block;" class="vouchers_price_text"
                                                        ><span style="margin-right:0.06rem;">{{ CurrencySymbol }}</span
                                                        >{{ item.coupon_price_json.left }}.<span
                                                            style="font-size:0.32rem"
                                                            >{{ item.coupon_price_json.right }}</span
                                                        ></span
                                                    >
                                                    <span class="vouchers_text">{{ submitDate.tips.daijinquan }}</span>
                                                </div>
                                                <div class="changeVouchers_Value_children_top_guize">
                                                    <span class="first_guize" style="display:block;"
                                                        >{{ submitDate.tips.shiyongguize }}：</span
                                                    >
                                                    <div v-html="item.rule"></div>
                                                </div>
                                            </div>
                                            <div class="changeVouchers_Value_children_bottom">
                                                <div>
                                                    <span>{{ item.show_msg }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 提示语 -->
                                        <div class="noQuanTip" v-if="item.err_msg != ''">
                                            <img
                                                src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/warn.png"
                                                alt="time"
                                            />
                                            <span>{{ item.err_msg }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="PoperContentBtn" :style="{ color: bgcColor1 }" @click="closePayWay(2)">
                        {{ submitDate.tips.queren }}
                    </div>
                </div>
            </custon-popup>
            <!-- 红包 -->
            <custon-popup ref="customHongbao" @closeHongbaoFun="closePayWay(1)">
                <div slot="PoperContent" class="changeCityClass" v-if="hongbaoData != ''">
                    <div class="changeCityBox">
                        <div
                            class="changeCityBox_top"
                            style="border-bottom:0;align-items:flex-start;padding-top:0.33rem;"
                        >
                            <div class="changeCityBox_top_left" style="margin-bottom:0.30rem;">
                                <span>{{ hongbaoData.tips.hongbao }}</span>
                                <div
                                    class="changeCityBox_changTitle"
                                    v-if="hongbaoData.bag_num_max > 0 && hongbaoData.bag_num_max != 100000000"
                                >
                                    <span>{{ hongbaoData.tips.hongbaozuiduokeshiyongjige }}</span>
                                </div>
                            </div>
                            <div
                                class="changeCityBox_top_right"
                                @click="closePayWay(1)"
                                :style="{ paddingTop: hongbaoData.bag_num_max == 100000000 ? '0.26rem' : '' }"
                            >
                                <div class="weixinAdress_closeIcon">
                                    <span class="weixinAdress_closeIcon_left"></span>
                                    <span class="weixinAdress_closeIcon_right"></span>
                                </div>
                            </div>
                        </div>
                        <!-- 有红包 -->
                        <div class="changeCityBox_content" style="background-color:#F6F6F6;" v-if="hongbaoList.length">
                            <div class="haveHongbao">
                                <div
                                    class="haveHongbao_children"
                                    v-for="(item, index) in hongbaoList"
                                    :key="index"
                                    @click="changeHb(index, noHongbao == 0 ? item.ifChange : 0)"
                                >
                                    <div
                                        class="haveHongbao_children_price"
                                        :style="{
                                            color:
                                                (item.ifChange == 0 && item.is_check != 1) || noHongbao == 1
                                                    ? '#ccc'
                                                    : ''
                                        }"
                                    >
                                        <span>{{ CurrencySymbol }}</span>
                                        <span style="font-weight:bold;">{{ item.money }}</span>
                                    </div>
                                    <div
                                        class="haveHongbao_children_data"
                                        :style="{
                                            color:
                                                (item.ifChange == 0 && item.is_check != 1) || noHongbao == 1
                                                    ? '#ccc'
                                                    : ''
                                        }"
                                    >
                                        <span
                                            >{{ hongbaoData.tips.youxiaoqizhi }}:<span>{{ item.end_time }}</span></span
                                        >
                                    </div>
                                    <div class="haveHongbao_children_ridao">
                                        <div class="customFrom_content_ridao">
                                            <!-- (item.ifChange == 0 && item.is_check != 1) || noHongbao == 1
                                                            ? '#ccc'
                                                            : item.is_check == 1
                                                            ? bgcColor1
                                                            : '' + '!important', -->
                                            <div
                                                :class="
                                                    item.is_check == 1
                                                        ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                        : 'shoppingContent_radio'
                                                "
                                                :style="{
                                                    background:
                                                        (item.ifChange == 0 && item.is_check != 1) || noHongbao == 1
                                                            ? '#ccc !important'
                                                            : item.is_check == 1
                                                            ? bgcColor1
                                                            : '' + '!important',
                                                    borderColor:
                                                        !(
                                                            (item.ifChange == 0 && item.is_check != 1) ||
                                                            noHongbao == 1
                                                        ) && item.is_check == 1
                                                            ? bgcColor1
                                                            : 'rgb(204, 204, 204) !important'
                                                }"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                    alt="check"
                                                    v-if="item.is_check == 1 && item.ifChange == 1 && noHongbao == 0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 到底了 -->
                                <div
                                    class="footerBox"
                                    v-if="!sendTime && (pagesHb > pageCntHb || pageCntHb == 1) && store_list.length > 7"
                                >
                                    <span>我也是有底线的~</span>
                                </div>
                            </div>
                        </div>
                        <!-- 没有红包 -->
                        <div class="changeCityBox_content" v-else>
                            <div class="changeCityBox_content_noValueBox">
                                <div class="changeCityBox_content_noValue payCard_noCard">
                                    <img
                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/submit_envelopeOrder.png"
                                        alt="城市"
                                    />
                                    <span class="openPermissions">{{
                                        submitDate.tips.ninhaimeiyoukeyishiyongdehongbao
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="PoperContentBtn" :style="{ color: bgcColor1 }" @click="closePayWay(1, 'confirm=' + 1)">
                        {{ submitDate.tips.queren }}
                    </div>
                </div>
            </custon-popup>
            <!-- 自提门店 -->
            <custon-popup ref="customZiTi" @closeZiTiFun="closePayWay(100)">
                <div slot="PoperContent" class="changeCityClass" v-if="ZiTiData != ''">
                    <div class="changeCityBox">
                        <div
                            class="changeCityBox_top"
                            style="border-bottom:0;align-items:flex-start;padding-top:0.33rem;"
                        >
                            <div class="changeCityBox_top_left" style="margin-bottom:0.30rem;">
                                <span>{{ hongbaoData.tips.hongbao }}</span>
                                <div
                                    class="changeCityBox_changTitle"
                                    v-if="hongbaoData.bag_num_max > 0 && hongbaoData.bag_num_max != 100000000"
                                >
                                    <span>{{ hongbaoData.tips.hongbaozuiduokeshiyongjige }}</span>
                                </div>
                            </div>
                            <div
                                class="changeCityBox_top_right"
                                @click="closePayWay(1)"
                                :style="{ paddingTop: hongbaoData.bag_num_max == 100000000 ? '0.26rem' : '' }"
                            >
                                <div class="weixinAdress_closeIcon">
                                    <span class="weixinAdress_closeIcon_left"></span>
                                    <span class="weixinAdress_closeIcon_right"></span>
                                </div>
                            </div>
                        </div>
                        <!-- 有红包 -->
                        <div class="changeCityBox_content" style="background-color:#F6F6F6;" v-if="hongbaoList.length">
                            <div class="haveHongbao">
                                <div
                                    class="haveHongbao_children"
                                    v-for="(item, index) in hongbaoList"
                                    :key="index"
                                    @click="changeHb(index, noHongbao == 0 ? item.ifChange : 0)"
                                >
                                    <div
                                        class="haveHongbao_children_price"
                                        :style="{
                                            color:
                                                (item.ifChange == 0 && item.is_check != 1) || noHongbao == 1
                                                    ? '#ccc'
                                                    : ''
                                        }"
                                    >
                                        <span>{{ CurrencySymbol }}</span>
                                        <span style="font-weight:bold;">{{ item.money }}</span>
                                    </div>
                                    <div
                                        class="haveHongbao_children_data"
                                        :style="{
                                            color:
                                                (item.ifChange == 0 && item.is_check != 1) || noHongbao == 1
                                                    ? '#ccc'
                                                    : ''
                                        }"
                                    >
                                        <span
                                            >{{ hongbaoData.tips.youxiaoqizhi }}:<span>{{ item.end_time }}</span></span
                                        >
                                    </div>
                                    <div class="haveHongbao_children_ridao">
                                        <div class="customFrom_content_ridao">
                                            <!-- (item.ifChange == 0 && item.is_check != 1) || noHongbao == 1
                                                            ? '#ccc'
                                                            : item.is_check == 1
                                                            ? bgcColor1
                                                            : '' + '!important', -->
                                            <div
                                                :class="
                                                    item.is_check == 1
                                                        ? 'shoppingContent_checkRadio shoppingContent_radio'
                                                        : 'shoppingContent_radio'
                                                "
                                                :style="{
                                                    background:
                                                        (item.ifChange == 0 && item.is_check != 1) || noHongbao == 1
                                                            ? '#ccc !important'
                                                            : item.is_check == 1
                                                            ? bgcColor1
                                                            : '' + '!important',
                                                    borderColor:
                                                        !(
                                                            (item.ifChange == 0 && item.is_check != 1) ||
                                                            noHongbao == 1
                                                        ) && item.is_check == 1
                                                            ? bgcColor1
                                                            : 'rgb(204, 204, 204) !important'
                                                }"
                                            >
                                                <img
                                                    src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/check.png"
                                                    alt="check"
                                                    v-if="item.is_check == 1 && item.ifChange == 1 && noHongbao == 0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 到底了 -->
                                <div
                                    class="footerBox"
                                    v-if="!sendTime && (pagesHb > pageCntHb || pageCntHb == 1) && store_list.length > 7"
                                >
                                    <span>我也是有底线的~</span>
                                </div>
                            </div>
                        </div>
                        <!-- 没有红包 -->
                        <div class="changeCityBox_content" v-else>
                            <div class="changeCityBox_content_noValueBox">
                                <div class="changeCityBox_content_noValue payCard_noCard">
                                    <img
                                        src="https://aimg8.dlssyht.cn/xcx_pack/vip_shopmall/submit_envelopeOrder.png"
                                        alt="城市"
                                    />
                                    <span class="openPermissions">{{
                                        submitDate.tips.ninhaimeiyoukeyishiyongdehongbao
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="PoperContentBtn" :style="{ color: bgcColor1 }" @click="closePayWay(1, 'confirm=' + 1)">
                        {{ submitDate.tips.queren }}
                    </div>
                </div>
            </custon-popup>
            <!-- 日期、省市区弹窗 -->
            <custon-popup ref="customDate">
                <div slot="PoperContent" class="changeCityClass">
                    <!-- 日期类型标题 -->
                    <div v-if="customStatus == 1">
                        <van-datetime-picker
                            v-model="currentDate"
                            @confirm="getDate"
                            @cancel="closeDate(1)"
                            type="datetime"
                            :title="submitDate.tips.xuanzewanzhengshijian"
                            :confirm-button-text="submitDate.tips.queren"
                            :cancel-button-text="submitDate.tips.quxiao"
                            :min-date="minDate"
                            :max-date="maxDate"
                        />
                    </div>
                    <!--  省市区 -->
                    <div v-if="customStatus == 2">
                        <van-area :area-list="areaList" @confirm="getArea" @cancel="closeDate" />
                    </div>
                </div>
            </custon-popup>
            <!-- 支付卡、支付方式 -->
            <Popup
                ref="popupRefs"
                :popupParam="popupParam"
                :cluesData="submitDate.tips"
                :onlineArr="onlineList"
                @payCard="payCardFun"
                @payMentments="payMentmentsFun(arguments)"
                @sublitOrderBtn="sublitOrderBtn"
            />
            <!-- 购买门店 -->
            <buy-store ref="buyStoreRefs" :againNum="againNum" :storeParam="storeParam" @storeFun="storeFun" @closeStoreFun="closeStoreFun"/>
            <!-- 省市区选择 -->
            <CityAlert ref="cityRef" @passCity="passCityFun" :theme="theme" :cluesStr="submitDate.tips" />
            <!-- 支付再返回的弹窗 -->
            <div class="payBack" v-if="payBackStatus">
                <p>{{ payBackTitle }}</p>
                <div @click="reloadFun">{{ payBackContent }}</div>
                <!-- 货到付款这个按钮不显示 -->
                <div @click="reloadFun" v-if="isPayStatus">{{cluesData.shaohouzaifu}}</div>
            </div>
            <!-- 供应链无货弹窗 -->
            <div class="noShopBox" v-if="noShopStatus && submitDate.address_info && submitDate.sc_not_buy_pro.length && changeNewWay == 0">
                <div class="noShop">
                    <div class="noShop_text">
                        抱歉，本单{{ submitDate.sc_all_not_stock == 1 ? "全部" : "部分" }}商品当前城市无货！
                    </div>
                    <div class="noShop_box">
                        <div class="noShop_box_child" v-for="(item, index) in submitDate.sc_not_buy_pro" :key="index">
                            <div class="noShop_box_childLeft">
                                <img :src="item.pro_pic" />
                                <div class="noShop_shadow">
                                    <img
                                        src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_VFrontend/noShop.png"
                                    />
                                </div>
                            </div>
                            <div class="noShop_box_childRight">
                                <span class="first_text">{{ item.pro_name }}</span>
                                <div>
                                    <img
                                        src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_VFrontend/noShop_num.png"
                                    />
                                    {{ item.num }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="noShop_bottom">
                        <div class="noShop_bottom_left" @click="goOrderPage(0)">更改收货地址</div>
                        <div class="noShop_bottom_right" @click="goOrderPage(1)">
                            {{ submitDate.sc_all_not_stock == 1 ? "返回购物车" : "剔除无货商品" }}
                        </div>
                    </div>
                </div>
            </div>
            <!-- 达达无货弹窗 -->
            <div class="noShopBox" v-if="changeNewWay > 0 && Object.keys(tc_not_buy_pro).length && noShopStatus && ((submitDate.address_info && submitDate.address_info.id != 0) || submitDate.address_info=='')">
                <div class="noShop" @click.stop>
                    <div class="noShop_text">本次交易以下商品无法提交</div>
                    <div class="noNewBox">
                        <div class="noNewShop_child" v-for="(item,index) in tc_not_buy_pro" :key="index">
                            <div class="noNewShop_top">
                                <div>{{item.shop_name}} <span>{{item.pro_list[0].noSubReason}}</span></div>
                            </div>
                            <div class="noNewShop_bottom">
                                <div class="ns_child" v-for="(proItem,proIndex) in item.pro_list" :key="proIndex">
                                    <div>
                                        <img :src="proItem.pro_pic"/>
                                    </div>
                                    <span>{{CurrencySymbol}}{{proItem.pro_price}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="noShop_bottom">
                        <!-- <div class="noShop_bottom_left" @click.stop="goOrderPage(0)" v-if="submitDate.delPro == 0">修改配送方式</div> -->
                        <div class="noShop_bottom_right" @click.stop="goOrderPage(4)">{{ submitDate.delPro == 0 ? "更换配送方式" : '剔除无法提交商品'}}</div>
                    </div>
                    <div class="closeNoShop" @click.stop="goOrderPage(0)">
                        <i style="font-size: 0.24rem;font-weight: 400;" class="sjzs-icon s-icon-cross-1" ></i>
                    </div>
                </div>
            </div>
        </div>
        <AuthorizeLocation ref="locationRef"  :againNum="againNum" @getLocation="getLocation"/>
    </div>
</template>
<script>
const { log } = console;
//提交订单接口,提交订单红包列表,门店配送,上传图片接口,发票列表,色系,支付密码
import {
    getOrderSubmitInfo,
    getUserRedPacket,
    getStoreinfo,
    orderSubmit,
    liveImgUpload,
    getUserInvoiceTitle,
    commissionEntry,
    getheaddetail,
    getColor,
    verifyPaymentPassword
} from "@/api/order/submitOrder.js";
// 供应链编码
import { getJdAddressCode, getJdProPriceCheck, NumberCompInfo, ServiceDetailInfo } from "@/api/gyl.js";
// 弹窗插槽组件
import CustomPopup from "@/components/CustomPopup/custompopup.vue";
// 支付卡、支付方式组件
import Popup from "@/pages/order/components/popup.vue";
// 购买门店组件
import BuyStore from "@/pages/order/components/buystore.vue";
// 公用头部组件
import Nav from "@/components/Nav/Nav.vue";
// 省市区组件
import CityAlert from "@/pages/address/components/city-alert.vue";
// 获取当前位置信息
import AuthorizeLocation from "@/components/authorizedLocation/authorizedLocation.vue";
// vant组件
import Hint from "@/plugins/hint";
import util from "@/libs/util";

export default {
    components: {
        "custon-popup": CustomPopup,
        Popup: Popup,
        Nav: Nav,
        "buy-store": BuyStore,
        CityAlert: CityAlert,
        AuthorizeLocation:AuthorizeLocation
    },
    data() {
        return {
            againNum:0,
            timeCheckIndex:0,
            timeCheckIndex2:0,
            ZiTiData:'',
            numData: 1,
            payBackTitle: "订单已提交,等待支付",
            payBackContent: "已支付完成",
            isPayStatus: true,
            // 颜色
            theme: "color1",
            minDate: new Date(1900, 1, 1),
            maxDate: new Date(2050, 12, 31),
            currentDate: new Date(),
            customStatus: 0, //日期、省市区弹窗
            noHongbao: 0,
            groupInfo: [],
            hiddenName: false,
            tioJiFen: false,
            hiddenDetail: true,
            submitDate: "",
            community_show: 0,
            changeWay: 1,
            pages: 1,
            pagesHb: 1,
            pagesFp: 1,
            blockDateArr: [],
            blockDate: "",
            shopList: [],
            // 代金券默认是可用选项
            vochers_type: 0,
            // 发票选择0：个人，1：公司
            is_fpStatus: 0,
            store_id: 0,
            buy_store_id: 0,
            send_info_status: true, //下面是否显示配送方式
            if_send_info: true,
            fapiaoSelectP: "",
            fapiaoSelectS: "",
            // 普通发票
            fpttIndex: 0,
            ptfpId: 0,
            // 增值税发票
            fpzzIndex: 0,
            fpzzIndex2: 0,
            zzfpId: "",
            faListPT: [{}],
            faListZZ: [{}],
            send_id_time: "",
            yearDate: "",
            is_use: 0,
            is_status: 0,
            cityValue: "",
            cityNum: 0,
            tjTTJSON: {},
            is_fp_status: 0,
            userChoose: "",
            is_use_fapiao: 0,
            hotelStatus: true,
            valueFlg: "",
            valueFlg1: false,
            ruzhuren: [
                {
                    val: ""
                }
            ],
            people_num: 1,
            hotel_vouchers: 0,
            fapiao_wx: true,
            showLoading: true, //加载动画
            community_delivery: 1,
            bgcColor1: "rgba(255,0,0,1)",
            bgcColor2: "rgba(255,0,0,0.8)",
            bgcColor3: "rgba(255,0,0,0.4)",
            bgcColor4: "rgba(255,0,0,0.1)",
            newColor1:"rgba(255,0,0,1)",
            store_list_name: "",
            order_type: 1,
            CurrencySymbol: "$",
            add_form_info: [],
            hotel_info: "", //酒店管理
            user_identity_info: "", //身份证号
            kuandai_info: "", //身份证号
            send_info: "", //配送门店
            payment_info: "", //支付方式
            invoice_info: "", //发票
            coupon_info: "", //代金券
            redpacket_info: "", //红包
            jifen_info: "", //积分
            balance_info: "", //余额
            payment_amountJson: "",
            button_info: "", //提交按钮
            ScreenFlg: false,
            ScreenFlg2: false,
            payWayFlg: false,
            payStatus: false,
            reqVal: {},
            payment_info_val: "",
            paymentList: [],
            sendTime: false, //配送时间
            payWayVal: 0, //支付方式，配送方式等判断
            store_list: [], //配送门店列表
            payment_info_list: [], //支付方式列表
            pageCnt: 1, //总页数
            store_listHb: [],
            storesList: [], //门店列表
            send_info_status2: false,
            shopIndex: 0,
            shop_jianshu: "",
            dateIndex: 0, //日期弹窗的索引
            dateValue: -1,
            TCPSdateValArr:[],
            faType_val: 0, //发票类型  0=>普通  1=>增值税
            hotelValue: 0, //酒店入住显示
            is_time: 0,
            blockValue: 0,
            headcolor: 0,
            faList: [],
            hongbaoData: "", //红包数据
            hongbaoList: [], //红包列表
            send_id_info: false,
            send_time_info: [],
            send_time_info2: [],
            send_info_list: [],
            kaijufapiao: false,
            popupParam: { num: 0 },
            cluesData: {},
            mobileValue: {},
            onlineList: [], //确认支付方式
            huabeiKey: null,
            buyStoreInfo: "", //购买门店
            storeParam: {}, //购买门店数据
            buy_store_json: {},
            fileName: "",
            picName: "",
            zf_pay_id: -1,
            headImgSrc: {},
            payment_info_id: -1,
            payBackStatus: false,
            mimaValue: "",
            userName: "",
            correctMima: false, //判断密码输入是否正确
            miMaFocus: false,
            noShopStatus: false, //供应链无货弹窗
            delNav:[],
            changeNewWay:-1,
            onlyTheLogistics:1,
            tcps:{
                blockDateArr:[],
                send_id_time:'',
                send_time_info:[]
            },
            supply_send_info:'',
            reservedTel:'',
            lngLat:{},
            deliveryType:'',
            logisticsDistributionInfo:{},
            tc_not_buy_pro:{},
            newWayStatus:0,
            isAndroid:0
        };
    },
    created() {
        // if(!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))){
        //     location.href=`/dom/denglu.php?username=${this.$route.query.username}&wap=1`
        // }
        // this.$cookies.set("zz_userid", "2329219")
        // this.$cookies.set("zz_userid", "24423010")
        // this.$cookies.set("zz_userid", "17373175")
        // this.$cookies.set("zz_userid", "21784586")
        // this.$cookies.set("zz_userid", "24433735")
    },
    mounted() {
        let that = this;
        // 判断是安卓机型，单独加样式
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //如果输出结果是true就判定是android终端或者uc浏览器
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //根据输出结果true或者false来判断ios终端
        that.isAndroid = isAndroid;
        // 调取颜色
        that.getColorFun();
        // 微信分享
        that.shareFun();
        if (!util.functions.ifHaveFun(this.$cookies.get("zz_userid"))) {
            location.href = `/dom/denglu.php?username=${this.$route.query.username}&wap=1`;
            return false;
        }
        that.userName = this.$route.query.username;

        let req = {};
        if (util.functions.ifHaveFun(that.$route.query.subMitJson)) {
            // decodeURIComponent 解析传参过长的方法
            req = JSON.parse(decodeURIComponent(that.$route.query.subMitJson));
        }

        if (util.functions.ifHaveFun(that.$route.query.buy_now_param)) {
            //商品页跳转过来带的参数
            let buy_now_param = JSON.parse(that.$route.query.buy_now_param);
            if (util.functions.ifHaveFun(buy_now_param[0].val)) {
                req.sel_num = buy_now_param[0].val;
                delete buy_now_param[0].val;
            }
            req.buy_now_param = buy_now_param;
        }
        if (util.functions.ifHaveFun(req.is_use_fapiao)) {
            //从地址列表跳转过来发票带的参数
            that.is_use_fapiao = 1;
        }
        if (util.functions.ifHaveFun(req.dateInterface)) {
            //从地址列表跳转过来添加日期带的参数
            that.dateInterface = req.dateInterface;
        }
        if (util.functions.ifHaveFun(req.community_show)) {
            that.community_show = req.community_show;
            that.changeWay = 0;
        }

        that.reservedName = req.reservedName;
        that.reqVal = req;
        // 如果存储过时间的数据，从缓存中取时间
        if(util.functions.ifHaveFun(util.storage.getItem("order_time_info"))){
            if(that.$route.query.subMitJson){
                that.reqVal.send_time_info = JSON.parse(decodeURIComponent(util.storage.getItem("order_time_info")));
            }else{
                util.storage.removeItem("order_time_info");
            }
        }
        if(util.functions.ifHaveFun(util.storage.getItem("order_tcps_time_info"))){
            if(util.functions.ifHaveFun(that.reqVal) && util.functions.ifHaveFun(that.reqVal.tcps)){
                that.reqVal.tcps.send_time_info = JSON.parse(decodeURIComponent(util.storage.getItem("order_tcps_time_info")));
            }else{
                util.storage.removeItem("order_tcps_time_info");
            }
        }
        that.options = that.$route.query;
        that.sessionKey = that.$route.query.sessionKey ? that.$route.query.sessionKey : null;
        that.room_id = that.$route.query.room_id ? that.$route.query.room_id : 0;
        that.vouchers = that.$route.query.vouchers ? that.$route.query.vouchers : 0;
        util.functions.ifHaveFun(req.huabeiKey) ? (that.popupParam.huabeiKey = req.huabeiKey) : [];
        util.functions.ifHaveFun(req.buy_store_json) ? (that.buy_store_json = req.buy_store_json) : "";
        util.functions.ifHaveFun(req.buy_store_id) ? (that.buy_store_id = req.buy_store_id) : "";
        util.functions.ifHaveFun(req.fileName) ? (that.fileName = req.fileName) : "";
        util.functions.ifHaveFun(req.headImgSrc) ? (that.headImgSrc = req.headImgSrc) : "";
        util.functions.ifHaveFun(req.mimaValue) ? (that.mimaValue = req.mimaValue) : "";
        util.functions.ifHaveFun(req.valueFlg1) ? (that.valueFlg1 = req.valueFlg1) : "";
        that.changeNewWay = util.functions.ifHaveFun(req.changeNewWay) || req.changeNewWay == 0 ? req.changeNewWay : -1;
        util.functions.ifHaveFun(req.deliveryType) ? (that.deliveryType = req.deliveryType) : "";
        that.timeCheckIndex2 = util.functions.ifHaveFun(req.timeCheckIndex2) ? req.timeCheckIndex2 : 0;
        that.timeCheckIndex = util.functions.ifHaveFun(req.timeCheckIndex) ? req.timeCheckIndex : 0;
        util.functions.ifHaveFun(req.send_id) ? (that.send_id = req.send_id) : 0;
        util.functions.ifHaveFun(req.TCPSdateValArr) ? (that.TCPSdateValArr = req.TCPSdateValArr) : [];
        util.functions.ifHaveFun(req.lngLat) ? (that.lngLat = req.lngLat) : {};
        if (
            util.functions.ifHaveFun(that.$route.query.sessionKey) &&
            util.functions.ifHaveFun(that.$route.query.room_id)
        ) {
            that.hotelRoom(1, 0);
        }

        // 自提点
        // let community_on_off = that.$cookies.get('community_on_off');
        // if (community_on_off.on_off == 1) {
        //     that.by_head_id = that.$cookies.get('by_head_id'); // 自提点
        //     that.zitiFun();
        // }
        // 配送时间
        if (util.functions.ifHaveFun(req.send_time) || util.functions.ifHaveFun(req.send_date)) {
            that.blockDate = req.send_time;
            that.yearDate = req.send_date;
            that.send_id_time = req.send_id_time;
            // that.send_time_options = req.send_time_info2;
            // that.blockDateArr = req.blockDateArr;
            // that.send_time_info = req.send_time_info;
        }

         if (util.functions.ifHaveFun(req.tcps && req.tcps.send_time) || util.functions.ifHaveFun(req.tcps && req.tcps.send_date)) {
            that.tcps.blockDate = req.tcps.send_time;
            that.tcps.yearDate = req.tcps.send_date;
            that.tcps.send_id_time = req.tcps.send_id_time;
            // that.tcps.send_time_options = req.tcps.send_time_info2;
            // that.tcps.blockDateArr = req.tcps.blockDateArr;
            // that.tcps.send_time_info = req.tcps.send_time_info;
        }

        // 发票信息
        if (util.functions.ifHaveFun(req.fapiaoInfo)) {
            that.faListPT = [...req.fapiaoInfo.faListPT];
            that.faListZZ = [...req.fapiaoInfo.faListZZ];
            that.fapiaoSelectP = req.fapiaoInfo.fapiaoSelectP;
            that.fapiaoSelectS = req.fapiaoInfo.fapiaoSelectS;
            that.fpttIndex = req.fapiaoInfo.fpttIndex;
            that.fpzzIndex2 = req.fapiaoInfo.fpzzIndex2;
            that.is_fpStatus = req.fapiaoInfo.is_fpStatus;
            that.is_status = req.fapiaoInfo.is_status;
            that.is_use = req.fapiaoInfo.is_use;
            that.fapiaoInfo = req.fapiaoInfo.fapiaoInfo;
            that.ptfpId = req.fapiaoInfo.ptfpId;
            that.zzfpId = req.fapiaoInfo.zzfpId;
            that.cityValue = req.fapiaoInfo.cityValue;
            that.is_fp_status = req.fapiaoInfo.is_fp_status;
        }
        //同城配送下从别的页面跳转过来需要把时间值传给接口
        if(that.reqVal.tcps && that.reqVal.tcps.send_time && that.reqVal.tcps.send_date && that.changeNewWay == 2){
            that.submitOrder(1,2);
        }else{
            that.submitOrder(1);
        }
    },
    methods: {
        /**
         * @Date: 2020-09-08 16:53:46
         * @LastEditors: zhouqi
         * @description: 提交订单接口
         * @param {typeVal} {1:代表第一次加载}
         * @param {tcpsType} {切换同城配送顶部时判断加载接口之后再切换顶部}
         * @return {type} 返回值
         */
        submitOrder(typeVal,tcpsType) {
            let that = this,
                reqJson = {};
            that.showLoading = true;
            reqJson = {
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                client_type: 1,
            };
            // 在微信下多传一个参数，为了在微信下用腾讯坐标
            if(navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1){
                reqJson.isWxBrowSer = 1;
            }
            let reqVal = JSON.parse(JSON.stringify(that.reqVal));
            reqVal.by_head_id = that.by_head_id;
            // 会员卡营销
            if (util.functions.ifHaveFun(that.$route.query.req)) {
                let newReq = JSON.parse(decodeURIComponent(that.$route.query.req));
                that.order_type = newReq.order_type;
                reqVal.order_type = newReq.order_type;
                reqVal.orderParams = newReq.orderParams;
            }
            // 酒店管理
            if (util.functions.ifHaveFun(that.sessionKey) && util.functions.ifHaveFun(that.room_id)) {
                that.order_type = 21;
                reqVal.order_type = 21;
                reqVal.hotel_param = {};
                reqVal.hotel_param.session_key = that.sessionKey;
                reqVal.hotel_param.room = that.room_id;
                reqJson.vouchers = that.hotel_vouchers;
                if (util.functions.ifHaveFun(reqVal.by_head_id)) {
                    delete reqVal.by_head_id;
                }
            }
            if (util.functions.ifHaveFun(that.community_show)) {
                reqVal.community_show = that.community_show;
            }
            if(that.changeNewWay == 1 || tcpsType == 1){
                if(util.functions.ifHaveFun(that.lngLat)){
                    reqVal.lng = that.lngLat.lng;
                    reqVal.lat = that.lngLat.lat;
                }else{
                    delete reqVal.lng;
                    delete reqVal.lat;
                }
            }

            //同城配送下切换时间也需要把时间值传给接口
            if(tcpsType == 2 || that.changeNewWay == 2){
                let sendTimeInfo = util.functions.ifHaveFun(that.reqVal.tcps && that.reqVal.tcps.send_time_info) ? that.reqVal.tcps.send_time_info : that.tcps.send_time_info;
                if(util.functions.ifHaveFun(sendTimeInfo)){
                    for(let i in sendTimeInfo){
                        if(sendTimeInfo[i].is_check == 1){
                            reqJson.send_date = that.TCPSdateValArr[i];
                            for(let j in sendTimeInfo[i].time){
                                if(sendTimeInfo[i].time[j].is_check == 1){
                                    reqJson.send_time = sendTimeInfo[i].time[j].time_stare+'-'+sendTimeInfo[i].time[j].time_end
                                }
                            }
                        }
                    }
                }
            }else{//非同城配送下不需要传
                delete reqJson.send_date;
                delete reqJson.send_time;
            }
            delete reqVal.tcps;
            delete reqVal.send_time_info;
            reqJson.req = util.functions.ifHaveFun(reqVal) ? JSON.stringify(reqVal) : "";
            // 供应链编码
            reqJson.regionCode = util.functions.ifHaveFun(that.$cookies.get("supplyCoding"))
                ? that.$cookies.get("supplyCoding")
                : "";
            getOrderSubmitInfo(reqJson)
                .then(res => {
                    that.showLoading = false;
                    let submitDate = res;
                    that.cluesData = res.tips;
                    that.payBackTitle = res.tips.dingdanyitijiao + res.tips.dengdaizhifu;
                    that.payBackContent = res.tips.yizhifuwancheng;
                    // 价格明细的总价
                    if (util.functions.ifHaveFun(submitDate.order_amount) || submitDate.order_amount == 0) {
                        submitDate.total_money_json = util.functions.separatePrice(submitDate.order_amount);
                    }
                    // 支付方式
                    if (
                        util.functions.ifHaveFun(submitDate.payment_info) &&
                        util.functions.ifHaveFun(submitDate.payment_info.list) &&
                        util.functions.ifHaveFun(submitDate.payment_info.list["mobile"])
                    ) {
                        var mobileValue = submitDate.payment_info.list["mobile"];
                        var paymentList = [];
                        if (util.functions.ifHaveFun(mobileValue)) {
                            for (let key in mobileValue) {
                                paymentList.push(key);
                            }
                        }
                        // mobile必须有key才走这里
                        if (paymentList.length) {
                            that.payment_info_val = util.functions.ifHaveFun(that.reqVal.payment_info_val) && (Object.keys(mobileValue).length > 1) ? that.reqVal.payment_info_val : paymentList[0];
                            // 判断页面支付方式的箭头是否显示
                            //on && off || on:id == -1
                            if (
                                mobileValue &&
                                Object.keys(mobileValue) &&
                                Object.keys(mobileValue).indexOf("on") > -1 &&
                                Object.keys(mobileValue).indexOf("off") > -1
                            ) {
                                paymentList = [{}, {}];
                            } else {
                                paymentList = [];
                            }
                            let mobileList = mobileValue;

                            for (let i in mobileList) {
                                if (i == that.payment_info_val) {
                                    mobileList[i].is_check = 1;
                                    if (mobileList[i].id != -1) {
                                        that.payment_info_id = mobileList[i].id;
                                        that.popupParam.payment_info_id = mobileList[i].id;
                                        that.zf_pay_id = mobileList[i].pay_id;
                                    }
                                } else {
                                    mobileList[i].is_check = 0;
                                }
                            }
                            that.payment_info_list = mobileList;
                        }
                        // 花呗分期
                        if (Object.keys(submitDate.payment_info).indexOf("stagingInfo") > -1) {
                            that.popupParam.stagingInfo = submitDate.payment_info.stagingInfo;
                        }
                        if (util.functions.ifHaveFun(that.reqVal.payment_id)) {
                            that.payment_info_id = that.reqVal.payment_id;
                            that.popupParam.payment_info_id = that.reqVal.payment_id;
                            that.popupParam.huabeiKey = that.reqVal.huabeiKey;
                        }
                    }
                     // 同城配送、自提改版
                    if(util.functions.ifHaveFun(submitDate.logisticsDistributionInfo)){
                        that.logisticsDistributionInfo = submitDate.logisticsDistributionInfo;
                        if(util.functions.ifHaveFun(submitDate.logisticsDistributionInfo.delNav)){
                            that.delNav = submitDate.logisticsDistributionInfo.delNav;
                            if(typeVal == 1 && that.changeNewWay == -1){
                                for(let i in that.delNav){
                                    if(that.delNav[i].default == 1){
                                        if(that.delNav[i].type == 'express'){
                                            if(!that.reqVal.deliveryType){
                                                that.deliveryType = 'express'
                                            }
                                            that.changeNewWay = 0;
                                        }else if(that.delNav[i].type == 'pickup'){
                                            that.changeNewWay = 1;
                                            if(!that.reqVal.deliveryType){
                                                that.deliveryType = 'pickup'
                                            }
                                            that.newWayStatus = that.changeNewWay;
                                            // 用户没有授权过并且没有拒绝过授权
                                            if(!util.functions.ifHaveFun(this.$cookies.get("newOrderJson")) && that.$cookies.get("newOrderStatus") != 1){
                                                // this.againNum = 0;
                                                that.$refs.locationRef.getLocation();
                                            }else{
                                                that.getLocation();
                                            }
                                        }else{
                                            if(!that.reqVal.deliveryType){
                                                that.deliveryType = 'city'
                                            }
                                            that.changeNewWay = 2;
                                        }
                                    }
                                }
                            }else{
                                if(util.functions.ifHaveFun(tcpsType) || tcpsType === 0){
                                    that.changeNewWay = tcpsType;
                                    // 这个判断是同城配送下并且支付方式为在线支付时显示余额
                                    if(tcpsType == 2 && that.payment_info.list && Object.keys(that.payment_info.list).length && that.payment_info.list.mobile && that.payment_info.list.mobile.on && that.payment_info.list.mobile.on.id== -1){
                                        that.payment_info_id = "-1";
                                        that.zf_pay_id = "-1";
                                        that.popupParam.payment_info_id = "-1";
                                    }
                                }
                            }
                        }else{
                            that.delNav = [];
                        }
                    }else{
                        that.delNav = [];
                    }
                    // 商品
                    let group_info = submitDate.group_info;
                    if (util.functions.ifHaveFun(group_info)) {
                        for (let i in group_info) {
                            let total_money_json = util.functions.separatePrice(group_info[i].total_money);
                            group_info[i].total_money_json = total_money_json;
                            //头部改版
                            if(util.functions.ifHaveFun(submitDate.logisticsDistributionInfo)){
                                that.tc_not_buy_pro[i] = {};
                                that.tc_not_buy_pro[i].shop_name = group_info[i].shop_name;
                                that.tc_not_buy_pro[i].pro_list = [];
                            }
                            for (let j in group_info[i].pro_list) {
                                group_info[i].pro_list[j].total_money_json = util.functions.separatePrice(
                                    group_info[i].pro_list[j].pro_price
                                );
                                //头部改版
                                if(util.functions.ifHaveFun(submitDate.logisticsDistributionInfo) && that.changeNewWay != 0){
                                    if(group_info[i].pro_list[j].isSubmit == 0){
                                        that.tc_not_buy_pro[i].pro_list.push(group_info[i].pro_list[j]);
                                        that.noShopStatus = true;
                                    }
                                }
                            }
                        }
                        for(let i in that.tc_not_buy_pro){
                            if(that.tc_not_buy_pro[i].pro_list.length == 0){
                                delete that.tc_not_buy_pro[i];
                            }
                        }
                    }
                    
                    
                    that.submitDate = submitDate;
                    that.CurrencySymbol = submitDate.currency_symbol;
                    that.popupParam.CurrencySymbol = submitDate.currency_symbol;
                    if (
                        ((submitDate.community_delivery == 1 || that.userChoose != '' && that.order_type != 21) && that.community_show != 1) || that.changeNewWay == 1 
                    ) {
                        that.reservedName = util.functions.ifHaveFun(submitDate.reservedName)
                            ? submitDate.reservedName
                            : "";
                        that.reservedTel = util.functions.ifHaveFun(submitDate.reservedTel)
                            ? submitDate.reservedTel
                            : "";
                    }

                    // 供应链进货价校验
                    if (util.functions.ifHaveFun(submitDate.sc_buy_pro_ids)) {
                        that.supplyChainCheck(submitDate.sc_buy_pro_ids);
                    }
                    // 供应链商品判断
                    if (submitDate.sc_pro_cnt > 0 && typeVal == 1) {
                        if (util.functions.ifHaveFun(submitDate.regionCodeAddress)) {
                            // 把地址编码更新
                            if (util.functions.ifHaveFun(submitDate.regionCodeAddress.regionCode)) {
                                that.$cookies.set("supplyCoding", submitDate.regionCodeAddress.regionCode);
                            }
                            // 城市更新
                            if (util.functions.ifHaveFun(submitDate.address_info)) {
                                let supplyJson = util.functions.ifHaveFun(that.$cookies.get("supplyCity"))
                                    ? that.$cookies.get("supplyCity")
                                    : {};
                                if (util.functions.ifHaveFun(submitDate.regionCodeAddress.address)) {
                                    supplyJson[2] =
                                        submitDate.regionCodeAddress.province +
                                        " " +
                                        submitDate.regionCodeAddress.city +
                                        " " +
                                        submitDate.regionCodeAddress.area;
                                }
                                that.$cookies.set("supplyCity", supplyJson);
                                that.$cookies.set("obtainStatus", "1");
                                that.getAddressCodingt2();
                            }
                        }
                        // 存储当前地址编码对应的城市
                        // 判断是否有无货商品
                        if(that.changeNewWay == 0){
                            if (submitDate.sc_not_buy_pro.length) {
                                that.noShopStatus = true;
                            } else {
                                that.noShopStatus = false;
                            }
                        }
                    }
                    // 选择门店
                    let store_info = submitDate.store_info;
                    if (util.functions.ifHaveFun(store_info)) {
                        if (util.functions.ifHaveFun(store_info.info.send_store_info)) {
                            that.store_list_name = store_info.info.send_store_info.name;
                            that.store_id = store_info.info.send_store_info.id;
                            that.send_info_status = false;
                            that.if_send_info = false;
                        }
                    }
                    // 购买门店
                    let buyStoreInfo = submitDate.buyStoreInfo;
                    if (util.functions.ifHaveFun(buyStoreInfo)) {
                        if (util.functions.ifHaveFun(that.buy_store_json)) {
                            buyStoreInfo.info = that.buy_store_json;
                        }
                        if (!util.functions.ifHaveFun(buyStoreInfo.info)) {
                            buyStoreInfo.info = "";
                        } else {
                            that.buy_store_id = buyStoreInfo.info.id;
                        }
                    }
                    // 配送时间
                    let send_time_info = "",
                        send_time_info2 = [],
                        checkIndex = 0;
                    if (util.functions.ifHaveFun(submitDate.send_time_info)) {
                        if(that.changeNewWay == 2){
                            that.TCPSdateValArr = submitDate.send_time_info.date;
                        }
                        send_time_info = submitDate.send_time_info.dateVal;
                        for (let i in send_time_info) {
                            send_time_info2[i] = {};
                            send_time_info2[i].dateVal = send_time_info[i];
                        }
                        send_time_info = JSON.parse(JSON.stringify(send_time_info2));
                        if(util.functions.ifHaveFun(submitDate.send_time_info) && util.functions.ifHaveFun(submitDate.send_time_info.time)){
                            for(let i in submitDate.send_time_info.time){
                                submitDate.send_time_info.time[i].isImmediateDelivery = 0;
                            }
                        }
                        for (let i in send_time_info) {
                            if (util.functions.ifHaveFun(( that.changeNewWay == 2 ? that.tcps.yearDate : that.yearDate))) {
                                if (( that.changeNewWay == 2 ? that.tcps.yearDate : that.yearDate) == send_time_info[i].dateVal) {
                                    checkIndex = i;
                                    send_time_info[i].is_check = 1;
                                } else {
                                    send_time_info[i].is_check = 0;
                                }

                                send_time_info[i].time = JSON.parse(JSON.stringify(submitDate.send_time_info.time));
                                if (i == 0 && submitDate.send_time_info.today.length) {
                                    send_time_info[i].time = JSON.parse(JSON.stringify(submitDate.send_time_info.today));
                                }
                            } else {
                                if (i == 0) {
                                    send_time_info[i].is_check = 1;
                                    if (submitDate.send_time_info.today.length) {
                                        send_time_info[i].time = JSON.parse(JSON.stringify(submitDate.send_time_info.today));
                                    } else {
                                        send_time_info[i].time = JSON.parse(JSON.stringify(submitDate.send_time_info.time));
                                    }
                                } else {
                                    send_time_info[i].time = JSON.parse(JSON.stringify(submitDate.send_time_info.time));
                                    send_time_info[i].is_check = 0;
                                }
                            }
                            for(let j in send_time_info[i].time){
                                send_time_info[i].time[j].is_check = 0;
                            }
                        }
                        if(util.functions.ifHaveFun(send_time_info)){
                            for (let j in send_time_info[checkIndex].time) {
                                if(j == 0) {
                                    send_time_info[checkIndex].time[j].is_check = 1;
                                    // isImmediateDelivery没值的时候，默认页面中展示选中的第一个时间，如果有值显示立即送出
                                    if(!util.functions.ifHaveFun(that.tcps.send_time_info) && !util.functions.ifHaveFun(that.tcps.send_id_time) && that.changeNewWay == 2){
                                        if(!util.functions.ifHaveFun(send_time_info[checkIndex].time[j].isImmediateDelivery)){
                                            that.tcps.send_id_time = send_time_info[checkIndex].dateVal + ' ' + send_time_info[checkIndex].time[j].time_stare + "-" + send_time_info[checkIndex].time[j].time_end;
                                            that.tcps.blockDate = send_time_info[checkIndex].time[j].time_stare + "-" + send_time_info[checkIndex].time[j].time_end;
                                        }
                                    }
                                    // 定义初始值，物流配送的没有选择时，赋值第一个时间段
                                    if(!(util.functions.ifHaveFun(that.reqVal.send_time)) && that.changeNewWay == 0){
                                        that.blockDate = send_time_info[checkIndex].time[j].time_stare + "-" + send_time_info[checkIndex].time[j].time_end;
                                    }
                                }else{
                                    send_time_info[checkIndex].time[j].is_check = 0;
                                }
                            }
                        }
                    }
                    // 配送方式
                    let send_info_list = "";
                    if (
                        util.functions.ifHaveFun(submitDate.send_info) &&
                        util.functions.ifHaveFun(submitDate.send_info.list)
                    ) {
                        send_info_list = submitDate.send_info.list;
                        if (
                            util.functions.ifHaveFun(submitDate.send_info) &&
                            util.functions.ifHaveFun(submitDate.send_info.list)
                        ) {
                            send_info_list = submitDate.send_info.list;
                            // if(send_info_list.length == 1){
                            for (let i in send_info_list) {
                                if (send_info_list[i].is_check == 1) {
                                    that.send_id = send_info_list[i].id;
                                    that.send_id_info = send_info_list[i].name;
                                }
                                send_info_list[i].explain.companiesStr = "";
                                for (let j in send_info_list[i].explain.companies) {
                                    if (send_info_list[i].explain.companies.length) {
                                        if (send_info_list[i].explain.companies.length > 0) {
                                            send_info_list[i].explain.companiesStr = send_info_list[
                                                i
                                            ].explain.companiesStr += send_info_list[i].explain.companies[j].name + ",";
                                        }
                                    }
                                }
                                if (send_info_list[i].explain.companiesStr != "") {
                                    send_info_list[i].explain.companiesStr = send_info_list[
                                        i
                                    ].explain.companiesStr.substring(
                                        0,
                                        send_info_list[i].explain.companiesStr.length - 1
                                    );
                                }
                            }
                        }
                    }
                    
                    // 自定义表单
                    let add_form_info = submitDate.add_form_info.info;
                    if (util.functions.ifHaveFun(add_form_info)) {
                        for (let i in add_form_info) {
                            for (let j in add_form_info[i].param_value) {
                                if (add_form_info[i].param_value[j].c == 1) {
                                    add_form_info[i].select_name = add_form_info[i].param_value[j].v;
                                }
                            }
                            // 表单图片
                            if (add_form_info[i].param_type == 6 && util.functions.ifHaveFun(add_form_info[i].param_value)) {
                                if(util.functions.ifHaveFun(that.headImgSrc)){
                                    for(let k in that.headImgSrc){
                                        if(add_form_info[i].id == k){
                                            add_form_info[i].imgUrl = that.headImgSrc[k].path;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // 代金券
                    let coupon_info = submitDate.coupon_info;
                    if (util.functions.ifHaveFun(coupon_info)) {
                        let money = 0;
                        if (util.functions.ifHaveFun(coupon_info.can_use_arr)) {
                            for (let i in coupon_info.can_use_arr) {
                                coupon_info.can_use_arr[i].coupon_price_json = util.functions.separatePrice(
                                    coupon_info.can_use_arr[i].coupon_price
                                );
                                coupon_info.can_use_arr[i].ifChange = 1;
                                if (coupon_info.can_use_arr[i].is_check == 1) {
                                    money = money + Number(coupon_info.can_use_arr[i].coupon_price);
                                }
                            }
                            // for (let i in coupon_info.can_use_arr) {
                            //   if (coupon_info.can_use_arr[i].is_check == 0 && coupon_info.can_deduction_amount == 0 && coupon_info.can_deduction_amount.deduction_total == 0) {
                            //     coupon_info.can_use_arr[i].ifChange = 0
                            //   }
                            // }
                        }
                        if (util.functions.ifHaveFun(coupon_info.not_use_arr)) {
                            for (let i in coupon_info.not_use_arr) {
                                coupon_info.not_use_arr[i].coupon_price_json = util.functions.separatePrice(
                                    coupon_info.not_use_arr[i].coupon_price
                                );
                            }
                        }
                        if (coupon_info.deduction_amount > 0) {
                            coupon_info.user_amountValue =
                                coupon_info.use_info + " -" + that.CurrencySymbol + coupon_info.deduction_amount;
                        }
                    }
                    // 提交按钮
                    let button_info = "";
                    if (util.functions.ifHaveFun(submitDate.button_info)) {
                        button_info = submitDate.button_info;
                        if (button_info.click == 0) {
                            button_info.info =
                                button_info.info +
                                (util.functions.ifHaveFun(button_info.need_money)
                                    ? that.CurrencySymbol + button_info.need_money
                                    : "") +
                                (util.functions.ifHaveFun(button_info.qishou) ? button_info.qishou : "");
                        }
                    }
                    // 发票
                    let invoice_info = "";
                    if (util.functions.ifHaveFun(submitDate.invoice_info)) {
                        invoice_info = submitDate.invoice_info;
                        for (let i in invoice_info.type_arr) {
                            if (invoice_info.type_arr[i] == 0) {
                                invoice_info.type_arr[i] = {};
                                invoice_info.type_arr[i].name = submitDate.invoice_info.tips.putongfapiao;
                                invoice_info.type_arr[i].is_status = 0;
                                invoice_info.type_arr[i].is_check =
                                    (i == that.is_status && that.is_fp_status == 0) ||
                                    submitDate.invoice_info.type_arr.length == 1
                                        ? 1
                                        : 0;
                                if (invoice_info.type_arr[i].is_check == 1) {
                                    that.index_fp = 0;
                                }
                            } else if (invoice_info.type_arr[i] == 1) {
                                invoice_info.type_arr[i] = {};
                                invoice_info.type_arr[i].name = submitDate.invoice_info.tips.zengzhishuifapiao;
                                invoice_info.type_arr[i].is_status = 1;
                                invoice_info.type_arr[i].is_check =
                                    (i == that.is_status && that.is_fp_status == 1) ||
                                    submitDate.invoice_info.type_arr.length == 1
                                        ? 1
                                        : 0;
                                if (invoice_info.type_arr[i].is_check == 1) {
                                    that.index_fp = submitDate.invoice_info.type_arr.length == 1 ? 0 : 1;
                                }
                            }
                        }
                        if (
                            !util.functions.ifHaveFun(that.fapiaoSelectP) &&
                            util.functions.ifHaveFun(invoice_info.ord)
                        ) {
                            that.fapiaoSelectP = invoice_info.ord.contents[0];
                        }
                        if (
                            !util.functions.ifHaveFun(that.fapiaoSelectS) &&
                            util.functions.ifHaveFun(invoice_info.vat)
                        ) {
                            that.fapiaoSelectS = invoice_info.vat.contents[0];
                        }
                        if (!util.functions.ifHaveFun(that.fapiaoInfo)) {
                            that.fapiaoInfo = invoice_info.tips.bukaifapiao;
                        }
                    }

                    // 红包
                    let redpacket_info = submitDate.redpacket_info;
                    if (util.functions.ifHaveFun(redpacket_info)) {
                        if (redpacket_info.deduction_amount > 0) {
                            redpacket_info.user_hongbaoValue =
                                redpacket_info.use_info + " -" + that.CurrencySymbol + redpacket_info.deduction_amount;
                        }
                        if (
                            util.functions.ifHaveFun(submitDate.coupon_info) &&
                            submitDate.coupon_info.deduction_amount == submitDate.need_amount
                        ) {
                            redpacket_info.use_info = "";
                            that.noHongbao = 1;
                        } else {
                            that.noHongbao = 0;
                        }
                    }
                    // 支付卡
                    let card_info = submitDate.card_info;
                    if (util.functions.ifHaveFun(card_info)) {
                        if (card_info.deduction_amount > 0 && card_info.can_deduction_amount >0) {
                            card_info.usre_cardInfovalue =
                                card_info.use_info + " -" + that.CurrencySymbol + card_info.deduction_amount;
                        }
                        if (
                            util.functions.ifHaveFun(submitDate.coupon_info) &&
                            (submitDate.coupon_info.deduction_amount == submitDate.need_amount || card_info.can_deduction_amount == 0)
                        ) {
                            card_info.use_info = "";
                            // that.noHongbao = 1;
                        } else {
                            // that.noHongbao = 0;
                        }
                        that.popupParam.can_deduction_amount = card_info.can_deduction_amount;
                    }
                    // 色系传给支付卡和支付方式
                    that.popupParam.bgcColor1 = that.newColor1;
                    // 余额
                    let balance_info = submitDate.balance_info,
                        valueFlg = "";
                    if (util.functions.ifHaveFun(balance_info)) {
                        valueFlg = balance_info.deduction_amount;
                    }
                    // 积分
                    let jifen_info = submitDate.jifen_info,
                        valueFlg1 = "";
                    if (util.functions.ifHaveFun(jifen_info)) {
                        // valueFlg1 = jifen_info.deduction_amount
                    }
                    // 需支付金额
                    // submitDate.payment_amount = Number(submitDate.payment_amount).toFixed(2)
                    let payment_amountJson = util.functions.separatePrice(submitDate.payment_amount);
                    // 酒店管理
                    let hotel_info = submitDate.hotel_info,
                        peope_list = that.peope_list;
                    if (util.functions.ifHaveFun(hotel_info)) {
                        if (!util.functions.ifHaveFun(peope_list)) {
                            peope_list = [];
                            for (let i in hotel_info.num) {
                                peope_list[i] = {};
                                peope_list[i].is_check = 0;
                                peope_list[i].val = Number(i) + 1 + "间";
                                peope_list[i].val_num = Number(i) + 1;
                                peope_list[0].is_check = 1;
                            }
                        }
                        for (let i in hotel_info.date_zu) {
                            hotel_info.date_zu[i].price = (
                                Number(hotel_info.date_zu[i].price) / Number(that.people_num)
                            ).toFixed(2);
                        }
                    }
                    if(that.changeNewWay == 2){
                        that.tcps.send_time_info = util.functions.ifHaveFun(send_time_info) ? JSON.parse(JSON.stringify(send_time_info)) : [];
                    }
                    if(that.changeNewWay == 2 || that.changeNewWay == 0){
                        that.send_time_info = util.functions.ifHaveFun(send_time_info) ? JSON.parse(JSON.stringify(send_time_info)) : [];
                    }
                    that.add_form_info = add_form_info ? add_form_info : [];
                    that.group_info = util.functions.ifHaveFun(group_info) ? group_info : "";
                    that.coupon_info = coupon_info;
                    that.valueFlg = valueFlg;
                    // that.valueFlg1= valueFlg1;
                    // 可使用金额
                    that.payment_amount = submitDate.payment_amount;
                    that.popupParam.payment_amount = submitDate.payment_amount;
                    that.payment_amountJson = payment_amountJson;
                    // 发票
                    that.invoice_info = invoice_info;
                    // 身份证号
                    that.user_identity_info = util.functions.ifHaveFun(submitDate.user_identity_info)
                        ? submitDate.user_identity_info
                        : "";
                    // 宽带
                    that.kuandai_info = util.functions.ifHaveFun(that.reqVal.kuandai_info)
                        ? that.reqVal.kuandai_info
                        : "";
                    that.send_info_list = send_info_list; //配送方式
                    that.buyStoreInfo = util.functions.ifHaveFun(buyStoreInfo) ? buyStoreInfo : ""; //购买门店
                    that.button_info = button_info;
                    that.payment_info = util.functions.ifHaveFun(submitDate.payment_info)
                        ? submitDate.payment_info
                        : "";
                    that.send_info = util.functions.ifHaveFun(submitDate.send_info) ? submitDate.send_info : "";
                    that.redpacket_info = util.functions.ifHaveFun(redpacket_info) ? redpacket_info : "";
                    that.card_info = util.functions.ifHaveFun(card_info) ? card_info : "";

                    that.balance_info = util.functions.ifHaveFun(submitDate.balance_info)
                        ? submitDate.balance_info
                        : "";
                    that.jifen_info = util.functions.ifHaveFun(submitDate.jifen_info) ? submitDate.jifen_info : "";
                    that.parameters = util.functions.ifHaveFun(submitDate.parameters) ? submitDate.parameters : {};
                    that.paymentList = paymentList; //在线支付的列表
                    that.mobileValue = mobileValue; //支付方式数据
                        (that.hotel_info = util.functions.ifHaveFun(hotel_info) ? hotel_info : "");
                    that.peope_list = peope_list;
                    that.community_delivery = submitDate.community_delivery; //1：自提物流配送都开启，0：只开启自提
                    that.onlyTheLogistics = submitDate.onlyTheLogistics;
                    that.supply_send_info = util.functions.ifHaveFun(submitDate.supply_send_info)
                        ? submitDate.supply_send_info
                        : ""; // 供应链运费提示语
                    if (
                        util.functions.ifHaveFun(submitDate.send_info) &&
                        !util.functions.ifHaveFun(submitDate.send_info.list)
                    ) {
                        that.send_id_info = "";
                    }
                    if (util.functions.ifHaveFun(that.reqVal.tcps && that.reqVal.tcps.send_time_info) && (that.reqVal.tcps.send_time_info[0].is_check != 1 || (that.reqVal.tcps.send_time_info[0].is_check == 1 && that.reqVal.tcps.send_time_info[0].time[0].is_check != 1))){
                        that.tcps.send_time_info = JSON.parse(JSON.stringify(that.reqVal.tcps.send_time_info));
                    }
                    if (util.functions.ifHaveFun(that.send_time_info) && util.functions.ifHaveFun(that.reqVal && that.reqVal.send_time_info)){
                        that.send_time_info = JSON.parse(JSON.stringify(that.reqVal.send_time_info));
                    }
                    that.$forceUpdate();
                })
                .catch(err => {
                    that.showLoading = false;
                    that.$forceUpdate();
                    if (err.code != 200) {
                        if (util.functions.ifHaveFun(err.msg)) {
                            Hint.Alert({
                                message: err.msg
                            }).then(() => {
                                window.history.back();
                            });
                        } else {
                            Hint.Alert({
                                message: "请求失败code:" + err.code
                            }).then(() => {
                                window.history.back();
                            });
                        }
                    }
                });
        },
        //门店配送，购买门店
        // type：1 购买门店，type:2配送门店
        submitStores(type) {
            let that = this;
            let req = {};
            // 配送门店
            if (that.store_id && type == 2) {
                req.store_id = that.store_id;
            }
            // 购买门店
            if (that.buy_store_id && type == 1) {
                req.store_id = that.buy_store_id;
            }
            if (type == 1) {
                req.type = 1;
                if (util.functions.ifHaveFun(this.buyStoreInfo.info)) {
                    that.storeParam.stroe_id = this.buyStoreInfo.info.id;
                }
                that.storeParam.buy_store_id = that.buy_store_id;
                that.storeParam.numData = that.numData + 1;
                that.numData = that.numData + 1;
                that.$refs.buyStoreRefs.buyShow();
                return false;
            }
            let paramsJson = {
                zz_userid: that.$cookies.get("zz_userid"),
                page: that.pages,
                req: JSON.stringify(req),
                username: that.$route.query.username,
                client_type: 1
            };
            getStoreinfo(paramsJson)
                .then(res => {
                    that.showLoading = false;
                    that.storesList = res;
                    that.pageCnt = res.page_cnt;
                    that.store_list = res.store_list;
                    if (type == 1) {
                        //购买门店
                        that.storeParam.data = that.buyStoreInfo;
                        that.storeParam.store = res;
                        that.storeParam.buy_store_id = that.buy_store_id;
                        setTimeout(() => {
                            that.$refs.buyStoreRefs.buyShow();
                        });
                    } else if (type == 2) {
                        //配送门店
                        setTimeout(() => {
                            that.$refs.customDistribution.showCustom();
                        });
                    }
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Msg({
                        message: err.msg
                    });
                });
        },

        //红包列表
        submitHb(type) {
            let that = this;
            that.showLoading = true;
            let req = {};
            if (util.functions.ifHaveFun(that.reqVal.deduction_info)) {
                if (util.functions.ifHaveFun(that.reqVal.deduction_info.redbag)) {
                    req = that.reqVal.deduction_info.redbag;
                }
            }
            let paramsJson = {
                zz_userid: that.$cookies.get("zz_userid"),
                page: that.pagesHb,
                req: JSON.stringify(req),
                username: that.$route.query.username,
                client_type: 1
            };
            getUserRedPacket(paramsJson)
                .then(res => {
                    that.showLoading = false;
                    let hongbaoData = res,
                        num = 0,
                        hongbaoList = res.list,
                        money = 0;
                    if (util.functions.ifHaveFun(hongbaoList)) {
                        if (hongbaoData.bag_num_max == 0) {
                            hongbaoData.bag_num_max = 100000000;
                        }
                        for (let i in hongbaoList) {
                            if (hongbaoList[i].is_check == 1) {
                                num++;
                                money += Number(hongbaoList[i].money);
                            }
                            hongbaoList[i].ifChange = 1;
                        }
                        for (let i in hongbaoList) {
                            if (
                                hongbaoData.bag_num_max == num ||
                                money >= Number(that.redpacket_info.can_deduction_amount)
                            ) {
                                hongbaoList[i].ifChange = 0;
                            }
                            if (hongbaoList[i].is_check == 1) {
                                hongbaoList[i].ifChange = 1;
                            }
                        }
                    }
                    hongbaoData.hbNum = num;
                    that.hongbaoData = hongbaoData;
                    that.hongbaoList = util.functions.ifHaveFun(hongbaoList) ? hongbaoList : [];
                    that.pageCntHb = res.page_cnt;
                    that.store_listHb = res.store_listHb;
                    that.$refs.customHongbao.showCustom();
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Msg({
                        message: err.msg
                    });
                });
        },
        // 获取微信发票抬头
        getInvoice() {
            let that = this;
            wx.chooseInvoiceTitle({
                success(res) {
                    that.tjTTJSON.title = res.title;
                    that.tjTTJSON.duty_num = res.taxNumber;
                    that.tjTTJSON.address = res.companyAddress;
                    that.tjTTJSON.tel = res.telephone;
                    that.tjTTJSON.bank = res.bankName;
                    that.tjTTJSON.account = res.bankAccount;
                    that.setData({
                        tjTTJSON: that.tjTTJSON
                    });
                }
            });
        },
        closrWeixinFp() {
            this.fapiao_wx = !this.fapiao_wx;
        },
        //发票抬头列表
        submitFP() {
            let that = this;
            that.showLoading = true;
            let fpJson = {
                zz_userid: that.$cookies.get("zz_userid"),
                page: that.pagesFp,
                username: that.$route.query.username,
                client_type: 1
            };
            if (util.functions.ifHaveFun(that.ptfpId)) {
                //普通发票
                if (that.invoice_info.type_arr.length > 1 && that.index_fp == 0) {
                    fpJson.id = that.ptfpId;
                }
                if (that.invoice_info.type_arr.length == 1 && that.invoice_info.type_arr[0].is_status == 0) {
                    fpJson.id = that.ptfpId;
                }
            }
            if (util.functions.ifHaveFun(that.zzfpId)) {
                //增值税发票
                if (that.invoice_info.type_arr.length > 1 && that.index_fp == 1) {
                    fpJson.id = that.zzfpId;
                }
                if (that.invoice_info.type_arr.length == 1 && that.invoice_info.type_arr[0].is_status == 1) {
                    fpJson.id = that.zzfpId;
                }
            }
            getUserInvoiceTitle(fpJson)
                .then(res => {
                    that.showLoading = false;
                    let fapiaoData = res;
                    that.fapiaoData = fapiaoData;
                    that.faList = fapiaoData.list;
                    that.fpbag_num_max = fapiaoData.page_cnt;
                    that.$refs.invoiceRef.showCustomZindex();
                    that.$refs.invoiceRef.ifMengban();
                })
                .catch(err => {
                    that.showLoading = false;
                    Hint.Msg({
                        message: err.msg
                    });
                });
        },
        // 选择优惠券标题
        changeVochers(type) {
            this.vochers_type = type;
        },

        // 选择地址
        addressClick(type) {
            let subMitJson = this.storageData();
            if (!util.functions.ifHaveFun(type)) {
                let queryJson = {};
                queryJson.is_set = 3;
                queryJson.orderstatus = 1;
                queryJson.subMitJson = subMitJson;
                this.$cookies.set("queryJsonAdress", queryJson);
                //物流配送
                if(this.changeNewWay == 2){
                    //跳转添加地址页面
                    this.$router.push({
                        path:"/address/views/tcpsAdd",
                        query:queryJson
                    })
                }else{
                    location.href =
                        "//" +
                        document.domain +
                        `/VFrontend/address/views/addressDetail?username=${this.$route.query.username}`;
                }
            } else {
                //地址列表页面
                this.$router.push({
                    path: "/address/views/addressList",
                    query: {
                        is_set: 3,
                        orderstatus: 1,
                        subMitJson: subMitJson,
                        username: this.$route.query.username,
                        deliveryType:  this.deliveryType
                    }
                });
            }
        },
        // 跳转到地址列表页将时间存储到缓存里
        storageData(){
            let subMitJson = JSON.parse(decodeURIComponent(this.getWiteInfo(1)));
            if(util.functions.ifHaveFun(subMitJson.send_time_info)){
                util.storage.setItem({
                    name:'order_time_info',
                    value:encodeURIComponent(JSON.stringify(subMitJson.send_time_info))
                });
                delete subMitJson.send_time_info;
            }
            if(util.functions.ifHaveFun(subMitJson.tcps) && util.functions.ifHaveFun(subMitJson.tcps.send_time_info)){
                util.storage.setItem({
                    name:'order_tcps_time_info',
                    value:encodeURIComponent(JSON.stringify(subMitJson.tcps.send_time_info))
                });
                delete subMitJson.tcps.send_time_info;
            }
            subMitJson = encodeURIComponent(JSON.stringify(subMitJson));
            return subMitJson;  
        },
        //日期弹窗回显
        getDate(value) {
            let date = value;
            var Y = date.getFullYear();
            var M = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

            let dateValue = Y + "年/" + M + "月/" + D + "日/" + h + "时/" + m + "分",
                dateInterface = Y + "-" + M + "-" + D + " " + h + ":" + m;
            this.add_form_info[this.dateIndex].param_value = dateInterface;
            this.dateInterface = dateInterface;
            this.$refs.customDate.maskClickHidden();
            this.customStatus = 0;
        },
        // 关闭日期弹窗
        closeDate() {
            this.$refs.customDate.maskClickHidden();
            this.customStatus = 0;
        },
        // 支付卡回显数据
        payCardFun(data) {
            this.publicFun("card", data, 1);
        },

        // 支付方式回显id
        payMentmentsFun(e) {
            let data = e[0];
            this.payment_info_id = data.id;
            this.popupParam.payment_info_id = data.id;
            // if(util.functions.ifHaveFun(data.huabeiKey) || data.huabeiKey == 0){
            this.popupParam.huabeiKey = data.huabeiKey;
            // 已经选择过的支付方式列表数据
            this.huabeiKey = data.huabeiKey;
            // }
            this.getWiteInfo();
        },

        // 购买门店回显id
        storeFun(data) {
            this.buy_store_json.id = data.id;
            this.buy_store_json.name = data.name;
            this.buy_store_id = data.id;
            if (util.functions.ifHaveFun(this.buyStoreInfo)) {
                this.buyStoreInfo.info = util.functions.ifHaveFun(this.buyStoreInfo.info) ? this.buyStoreInfo.info : {};
                this.buyStoreInfo.info = this.buy_store_json;
            }
            this.$forceUpdate();
            
        },
        closeStoreFun(){
            let wirteInfo = this.getWiteInfo();
            let lngLat = this.$cookies.get("newOrderJson");
            if(util.functions.ifHaveFun(lngLat)){
                this.lngLat = lngLat;
            }else{
                this.lngLat = {};
            }
            this.reqVal = JSON.parse(decodeURIComponent(wirteInfo));
            this.submitOrder();
        },

        // 获取填写信息
        getWiteInfo(type) {
            let subMitJson = {},
                add_form_info = this.add_form_info,
                formJson = {},
                that = this;
            // 商品信息
            if (util.functions.ifHaveFun(this.reqVal.buy_now_param)) {
                subMitJson.buy_now_param = this.reqVal.buy_now_param;
                if (util.functions.ifHaveFun(this.reqVal.sel_num)) {
                    subMitJson.sel_num = this.reqVal.sel_num;
                }
            }
            // 表单内容
            if (util.functions.ifHaveFun(add_form_info)) {
                subMitJson.form_info = {};
                for (let i in add_form_info) {
                    // 单行文本
                    if (add_form_info[i].param_type == 1) {
                        let id = add_form_info[i].id;
                        if (util.functions.ifHaveFun(add_form_info[i].param_value)) {
                            subMitJson.form_info[id] = add_form_info[i].param_value;
                        }
                        if (
                            add_form_info[i].val_allow == 1 &&
                            !util.functions.ifHaveFun(add_form_info[i].param_value)
                        ) {
                            formJson.val1 = {};
                            (formJson.val1.text = 1),
                                (formJson.val1.name = this.submitDate.tips.qingtianxie + add_form_info[i].param_name);
                        }
                    }
                    // 单选类型标题
                    if (add_form_info[i].param_type == 7) {
                        let id = add_form_info[i].id;
                        if (util.functions.ifHaveFun(add_form_info[i].param_value.filter(item => item.c == 1))) {
                            add_form_info[i].param_value.filter(item => item.c == 1)[0].v;
                            subMitJson.form_info[id] = add_form_info[i].param_value.filter(item => item.c == 1)[0].v;
                        } else {
                            if (add_form_info[i].val_allow == 1) {
                                formJson.val7 = {};
                                formJson.val7.name = this.submitDate.tips.qingxuanze + add_form_info[i].param_name;
                            }
                        }
                    }
                    // 多选类型标题
                    if (add_form_info[i].param_type == 2) {
                        let id = add_form_info[i].id;
                        if (util.functions.ifHaveFun(add_form_info[i].param_value.filter(item => item.c == 1))) {
                            let checkValue = add_form_info[i].param_value.filter(item => item.c == 1),
                                checkLast = "";
                            for (let j in checkValue) {
                                if (type == 2) {
                                    checkLast = checkValue[j].v + "_" + checkLast;
                                } else {
                                    checkLast = checkValue[j].v + "#" + checkLast;
                                }
                            }
                            subMitJson.form_info[id] = checkLast.substring(0, checkLast.length - 1);
                        } else {
                            if (
                                add_form_info[i].val_allow == 1 &&
                                !util.functions.ifHaveFun(subMitJson.form_info[id])
                            ) {
                                formJson.val2 = {};
                                formJson.val2.name = this.submitDate.tips.qingxuanze + add_form_info[i].param_name;
                            }
                        }
                    }
                    // 下拉类型标题
                    if (add_form_info[i].param_type == 3) {
                        let id = add_form_info[i].id;
                        if (util.functions.ifHaveFun(add_form_info[i].param_value.filter(item => item.c == 1))) {
                            add_form_info[i].param_value.filter(item => item.c == 1)[0].v;
                            subMitJson.form_info[id] = add_form_info[i].param_value.filter(item => item.c == 1)[0].v;
                        } else {
                            if (add_form_info[i].val_allow == 1) {
                                formJson.val3 = {};
                                formJson.val3.name = this.submitDate.tips.qingxuanze + add_form_info[i].param_name;
                            }
                        }
                    }
                    // 文件
                    if (add_form_info[i].param_type == 4) {
                        if (util.functions.ifHaveFun(add_form_info[i].param_value)) {
                            let id = add_form_info[i].id;
                            subMitJson.form_info[id] =
                                add_form_info[i].param_value.indexOf("###") > -1
                                    ? add_form_info[i].param_value
                                    : that.fileName + "###" + add_form_info[i].param_value;
                            subMitJson.fileName = that.fileName;
                        } else {
                            if (add_form_info[i].val_allow == 1) {
                                formJson.val4 = {};
                                formJson.val4.name = this.submitDate.tips.qingxuanze + add_form_info[i].param_name;
                            }
                        }
                    }
                    // 时间
                    if (add_form_info[i].param_type == 5) {
                        if (util.functions.ifHaveFun(this.dateInterface)) {
                            let id = add_form_info[i].id;
                            subMitJson.form_info[id] = this.dateInterface;
                            subMitJson.dateInterface = this.dateInterface;
                        } else {
                            if (add_form_info[i].val_allow == 1) {
                                formJson.val5 = {};
                                formJson.val5.name = this.submitDate.tips.qingxuanze + add_form_info[i].param_name;
                            }
                        }
                    }
                    // 图片
                    if (add_form_info[i].param_type == 6) {
                        if (util.functions.ifHaveFun(add_form_info[i].param_value)) {
                            let id = add_form_info[i].id;
                            subMitJson.form_info[id] =
                                add_form_info[i].param_value.indexOf("###") > -1
                                    ? add_form_info[i].param_value
                                    : that.headImgSrc[id].name + "###" + that.headImgSrc[id].path;
                            subMitJson.headImgSrc = that.headImgSrc;
                        } else {
                            if (add_form_info[i].val_allow == 1) {
                                formJson.val6 = {};
                                formJson.val6.name = this.submitDate.tips.qingxuanze + add_form_info[i].param_name;
                            }
                        }
                    }
                }
            }
            // 备注
            if (util.functions.ifHaveFun(this.submitDate.group_info)) {
                subMitJson.remark_info = {};
                let group_info = this.submitDate.group_info;
                for (let i in group_info) {
                    if (util.functions.ifHaveFun(group_info[i].shop_remark)) {
                        subMitJson.remark_info[i] = group_info[i].shop_remark;
                    }
                }
            }
            // 配送门店
            if (util.functions.ifHaveFun(this.store_list_name)) {
                subMitJson.send_store_id = this.store_id;
                subMitJson.send_id = 925;
            }
            // 购买门店
            if (util.functions.ifHaveFun(this.buyStoreInfo)) {
                if (util.functions.ifHaveFun(this.buyStoreInfo.info)) {
                    subMitJson.buy_store_json = {
                        name: this.buyStoreInfo.info.name,
                        id: this.buyStoreInfo.info.id
                    };
                    subMitJson.buy_store_id = this.buyStoreInfo.info.id;
                }
            }
            // 身份证号
            if (
                (util.functions.ifHaveFun(this.submitDate.user_identity_info) && util.functions.ifHaveFun(this.submitDate.user_identity_info.number)) ||
                util.functions.ifHaveFun(this.reqVal.number)
            ) {
                subMitJson.number = this.submitDate.user_identity_info.number;
                // if (util.functions.ifHaveFun(this.reqVal.number)) {
                //     subMitJson.number = this.reqVal.number
                // }
            }
            // 宽带
            if (util.functions.ifHaveFun(this.submitDate.device == 1) && util.functions.ifHaveFun(that.kuandai_info)) {
                subMitJson.kuandai_info = that.kuandai_info;
            }
            // 优惠券，红包，余额
            if (util.functions.ifHaveFun(this.reqVal) && util.functions.ifHaveFun(this.reqVal.deduction_info)) {
                subMitJson.deduction_info = {};
                subMitJson.deduction_info = this.reqVal.deduction_info;
                if (this.valueFlg == 0 && util.functions.ifHaveFun(subMitJson.deduction_info.balance)) {
                    delete subMitJson.deduction_info.balance;
                }
                if (
                    util.functions.ifHaveFun(subMitJson.deduction_info.integral) &&
                    !this.valueFlg1 &&
                    this.jifen_info.is_default != 1
                ) {
                    delete subMitJson.deduction_info.integral;
                }else{
                    subMitJson.valueFlg1 = this.valueFlg1;
                }
                // reqVal.deduction_info[type].val = that.redpacket_info.deduction_amount;
            }
            // 配送方式
            if (util.functions.ifHaveFun(this.send_id)) {
                subMitJson.send_id = this.send_id;
            }
            // 支付方式
            if (util.functions.ifHaveFun(that.payment_info_val)) {
                subMitJson.payment_info_val = that.payment_info_val;
                if (util.functions.ifHaveFun(that.payment_info_id)) {
                    subMitJson.payment_id = this.payment_info_id;
                    subMitJson.huabeiKey = this.huabeiKey;
                    if (
                        that.submitDate.noBalance == 1 &&
                        (that.payment_info_id == 0 || (that.zf_pay_id == 14 && that.payment_info_id > 0))
                    ) {
                        if (
                            util.functions.ifHaveFun(subMitJson.deduction_info) &&
                            util.functions.ifHaveFun(subMitJson.deduction_info.balance)
                        ) {
                            delete subMitJson.deduction_info.balance;
                        }
                    }
                    // 支付方式列表数据
                    if (util.functions.ifHaveFun(that.huabeiKey) || that.huabeiKey == 0) {
                        subMitJson.fq_num = that.huabeiKey;
                    } else {
                        delete subMitJson.fq_num;
                    }
                }
            }
            // 配送时间
            if (util.functions.ifHaveFun(this.send_id_time)) {
                subMitJson.send_time = this.blockDate;
                subMitJson.send_date = this.yearDate;
                subMitJson.send_id_time = this.send_id_time;
                subMitJson.send_time_info = this.send_time_info;
                subMitJson.timeCheckIndex2 = that.timeCheckIndex2;
            }
            // 同城配送配送时间
            if (util.functions.ifHaveFun(this.tcps.send_time_info)) {
                subMitJson.tcps = {};
                subMitJson.tcps.send_time = this.tcps.blockDate;
                subMitJson.tcps.send_date = this.tcps.yearDate;
                subMitJson.tcps.send_id_time = this.tcps.send_id_time;
                subMitJson.tcps.send_time_info = this.tcps.send_time_info;
                subMitJson.timeCheckIndex = that.timeCheckIndex;
            }
            // 同城配送dateVal
            if(util.functions.ifHaveFun(that.TCPSdateValArr)){
                subMitJson.TCPSdateValArr = that.TCPSdateValArr;
            }
            // 发票(只有页面跳转的时候才带参数)
            if (util.functions.ifHaveFun(this.invoice_info)) {
                let is_status = this.invoice_info.type_arr.filter(item => item.is_check == 1)[0].is_status;
                if (type == 1 || type == 2) {
                    //type 为2是提交订单接口 ，为1是跳转带取参数
                    // 这部分是发票回显
                    subMitJson.fapiaoInfo = {};
                    subMitJson.fapiaoInfo.is_use = this.is_use;
                    subMitJson.fapiaoInfo.is_status = is_status;
                    subMitJson.fapiaoInfo.is_fpStatus = this.is_fpStatus;
                    subMitJson.fapiaoInfo.fapiaoSelectP = this.fapiaoSelectP;
                    subMitJson.fapiaoInfo.fapiaoSelectS = this.fapiaoSelectS;
                    if (util.functions.ifHaveFun(this.ptfpId)) subMitJson.fapiaoInfo.ptfpId = this.ptfpId;
                    if (util.functions.ifHaveFun(this.zzfpId)) subMitJson.fapiaoInfo.zzfpId = this.zzfpId;
                    subMitJson.fapiaoInfo.faListPT = this.faListPT;
                    subMitJson.fapiaoInfo.faListZZ = this.faListZZ;
                    subMitJson.fapiaoInfo.fpttIndex = this.fpttIndex;
                    subMitJson.fapiaoInfo.fpzzIndex2 = this.fpzzIndex2;
                    (subMitJson.fapiaoInfo.fapiaoInfo = this.fapiaoInfo),
                        (subMitJson.fapiaoInfo.cityValue = this.cityValue);
                    (subMitJson.fapiaoInfo.cityValueBefore = this.cityValueBefore),
                        (subMitJson.fapiaoInfo.is_fp_status = this.is_fp_status); //判断当前选择市普通发票还是增值税发票
                }
                // 这部分是提交订单传入接口
                subMitJson.invoice_info = {};
                subMitJson.invoice_info.is_use = this.is_use;
                subMitJson.invoice_info.type = is_status;
            }
            if (util.functions.ifHaveFun(this.is_use_fapiao)) {
                subMitJson.is_use_fapiao = this.is_use_fapiao;
            }
            // community_show 判断是否是门店配送还是自提
            if (util.functions.ifHaveFun(this.community_show)) {
                subMitJson.community_show = this.community_show;
            }
            // 地址
            if (util.functions.ifHaveFun(this.reqVal.address_id)) {
                subMitJson.address_id = this.reqVal.address_id;
            }
            // 积分余额显示输入密码
            if (this.submitDate.usePassword != 0 && this.balance_info != "" && this.valueFlg) {
                subMitJson.mimaValue = this.mimaValue;
            } else {
                this.mimaValue = "";
                delete subMitJson.mimaValue;
            }
            if(util.functions.ifHaveFun(this.logisticsDistributionInfo) && util.functions.ifHaveFun(this.logisticsDistributionInfo.delNav)){
                subMitJson.buy_store_json = this.buy_store_json;
                // if(subMitJson.buy_store_json){
                //     subMitJson.buy_store_id = subMitJson.buy_store_json.id;
                // }
                subMitJson.buy_store_id = this.buy_store_id;
                subMitJson.changeNewWay = this.changeNewWay;
                subMitJson.deliveryType = this.deliveryType;
            }
            //到店自提经纬度
            if(util.functions.ifHaveFun(this.lngLat)){
                subMitJson.lngLat = this.lngLat;
            }else{
                delete subMitJson.lngLat;
            }
            // 支付卡可用为0是判断
            if(this.card_info.can_deduction_amount <= 0 && util.functions.ifHaveFun(this.reqVal.deduction_info) && util.functions.ifHaveFun(this.reqVal.deduction_info.card)){
               delete subMitJson.deduction_info.card;
            }
            subMitJson.reservedName = this.reservedName;
            subMitJson.reservedTel = this.reservedTel;

            subMitJson.formJson = formJson;
            // encodeURIComponent解决传入下个页面参数过长发生截取，
            // encodeURIComponent(JSON.stringify(obj))为跳转url时的转换方法。
            //JSON.parse(decodeURIComponent(options.obj))为接收参数页面的转换方法。
            subMitJson = encodeURIComponent(JSON.stringify(subMitJson));
            return subMitJson;
        },
        // 选择配送门店,配送方式
        changeStore(index) {
            let storeJson = {};
            if (this.payWayVal == 1) {
                //支付方式
                storeJson = this.changeFun(this.payment_info_list, 1, index, "nocancel");
                this.payment_info_list = storeJson.array;
                this.zf_pay_id = storeJson.zf_pay_id;
                if (storeJson.id == "-1") {
                    this.payment_info_id = "-1";
                    this.zf_pay_id = "-1";
                    this.popupParam.payment_info_id = "-1";
                } else {
                    this.payment_info_id = storeJson.id;
                }
                for (let i in this.payment_info_list) {
                    if (this.payment_info_list[i].is_check == 1) {
                        this.payment_info_val = i;
                    }
                }
            } else {
                if (this.if_send_info) {
                    //配送方式
                    storeJson = this.changeFun(this.send_info_list, 1, index, "nocancel");
                    this.send_info_list = storeJson.array;
                    this.send_id = storeJson.id;
                } else {
                    //配送门店
                    storeJson = this.changeFun(this.store_list, 1, index, "cancel");
                    this.store_list = storeJson.array;
                    this.store_id = storeJson.id;
                }
            }
        },
        // 选择优惠券
        bindVoucherBtn(index, ifchange) {
            let coupon_info = this.coupon_info,
                money = 0;
            if (ifchange == 0) {
                return false;
            }
            let list = this.HbVouchFun(index, coupon_info.can_use_arr, "daijinquan");
            coupon_info.can_use_arr = [...list];
            this.coupon_info = coupon_info;
        },
        // 选择红包
        changeHb(index, ifchange) {
            let hongbaoList = this.hongbaoList;

            if (ifchange == 0) {
                return false;
            }
            let list = this.HbVouchFun(index, hongbaoList, "hongbao");
            this.hongbaoList = list;
        },

        // 红包，优惠券的公用方法
        HbVouchFun(index, list, type) {
            let payment_amount = this.payment_amount,
                money = 0;
            if (type == "hongbao") {
                var HbData = this.hongbaoData,
                    bag_num_max = this.hongbaoData.bag_num_max;
            }
            for (let i in list) {
                if (index == i) {
                    list[i].is_check = list[i].is_check == 1 ? 0 : 1;
                    if (type == "hongbao") {
                        HbData.hbNum = list[i].is_check == 1 ? HbData.hbNum + 1 : HbData.hbNum - 1;
                    }
                    if (list[i].is_check == 0) {
                        payment_amount =
                            Number(payment_amount) +
                            (type == "hongbao" ? Number(list[i].money) : Number(list[i].coupon_price));
                    } else {
                        payment_amount =
                            Number(payment_amount) -
                            (type == "hongbao" ? Number(list[i].money) : Number(list[i].coupon_price));
                    }
                    this.payment_amount = payment_amount;
                } else {
                    if (type == "daijinquan") {
                        list[i].is_check = 0;
                    }
                }
                // 如果没有选中，则都变为可选状态
                if (list[i].is_check == 0) {
                    list[i].ifChange = 1;
                }
            }
            let isCheckNum = list.filter(item => item.is_check == 1);
            // 将选择的钱数相加
            for (let i in isCheckNum) {
                money =
                    type == "hongbao"
                        ? Number(isCheckNum[i].money) + money
                        : Number(isCheckNum[i].coupon_price) + money;
            }
            // 循环判断处于可选状态
            for (let i in list) {
                if ((type == "hongbao" ? Number(HbData.hbNum) <= Number(bag_num_max) : true) || list[i].is_check == 1) {
                    list[i].ifChange = 1;
                    if (type == "hongbao" && money <= Number(this.redpacket_info.can_deduction_amount)) {
                        list[i].ifChange = 1;
                    }
                }
                if (
                    type == "hongbao" &&
                    list[i].is_check == 0 &&
                    (money >= Number(this.redpacket_info.can_deduction_amount) ||
                        Number(HbData.hbNum) >= Number(bag_num_max))
                ) {
                    list[i].ifChange = 0;
                }
            }
            if (type == "hongbao") {
                this.hongbaoData = HbData;
            }
            return list;
        },
        // 填写身份证号
        inputIdentity(val, type) {
            // 身份证
            if (type == 1) {
                this.submitDate.user_identity_info.number = val;
            } else if (type == 2) {
                this.kuandai_info = val;
            }
        },
        // 跳转商铺
        shopMallFun(id, nojump) {
            // 供应链的商铺 等于1不能跳转
            if (id > 0 && nojump != 1) {
                wx.navigateTo({
                    url: "/extpack/pages/shops/shop_details?u_u_id=" + id
                });
            }
        },

        // 备注
        changeBeizu(index, value) {
            this.submitDate.group_info[index].shop_remark = value;
            this.submitDate = this.submitDate;
        },
        // 选择发票抬头
        changeTtContent(index) {
            let list = this.changeFun(this.faList, 1, index, "nocancel");
            this.faList = list.array;
            let faListAll = [...list.array];
            // 普通发票
            if (this.invoice_info.type_arr[this.index_fp].is_status == 0) {
                this.faListPT = faListAll;
                this.fpttIndex = index;
                this.ptfpId = list.id;
            } else if (this.invoice_info.type_arr[this.index_fp].is_status == 1) {
                //增值税发票
                this.faListZZ = faListAll;
                this.fpzzIndex2 = index;
                this.zzfpId = list.id;
            }
            this.$refs.invoiceRef.maskClickHidden();
        },
        // 返回选中的Array
        changeFun(changeArray, id, index, type) {
            let changeJson = {};
            for (let i in changeArray) {
                if (i == index) {
                    if (type == "nocancel") {
                        //不可取消
                        changeArray[i].is_check = 1;
                    } else {
                        changeArray[i].is_check = changeArray[i].is_check == 1 ? 0 : 1;
                        id = changeArray[i].is_check == 1 ? changeArray[i].id : 0;
                    }
                    if (this.payWayVal == 1) {
                        //返回支付方式的pay_id
                        changeJson.zf_pay_id = changeArray[i].is_check == 1 ? changeArray[i].pay_id : 0;
                        if (id == 0 || id == 2) {
                            changeArray[i].is_check == 1 ? id : -1;
                        }
                    } else {
                        changeJson.zf_pay_id = 0;
                    }
                    if (changeArray[i].is_check == 0) {
                        if (this.payWayVal == 1) {
                            //返回支付方式的pay_id
                            changeJson.zf_pay_id = 0;
                            id = 0;
                        }
                        break;
                    }

                    if (id == 1) {
                        id = changeArray[i].is_check == 1 ? changeArray[i].id : 0;
                    } else if (id == 0) {
                        if(this.changeNewWay == 2){
                            this.tcps.yearDate = changeArray[i].dateVal;
                        }else{
                            this.yearDate = changeArray[i].dateVal;
                        }
                    }
                } else {
                    changeArray[i].is_check = 0;
                }
            }

            changeJson.array = changeArray;
            changeJson.id = id;
            return changeJson;
        },
        dateComponent(ref) {
            // 存储日期选择弹窗自定义组件实例
            this.dateComponent = ref;
        },
        // 配送门店列表
        peisongLower() {
            let pages = this.pages;
            if (pages <= this.pageCnt && this.pageCnt > 1) {
                pages++;
                this.pages = pages;
                this.submitStores(2);
            }
        },
        // 红包门店列表
        hongbaoLower() {
            let pagesHb = this.pagesHb;
            if (pagesHb <= this.pageCnt && this.pageCnt > 1) {
                pagesHb++;
                this.pagesHb = pagesHb;
                this.submitHb();
            }
        },
        // 删除上传图片
        closeImg(index) {
            this.add_form_info[index].param_value = "";
        },

        // 单行文本
        changeOnly(indexVal, value) {
            if (this.getArrSecond(indexVal)[0] == "phone") {
                //酒店订单填写电话
                this.hotelPhone = value;
            } else if (this.getArrSecond(indexVal)[0] == "form") {
                //自定义表单
                let index = this.getArrSecond(indexVal)[1];
                this.add_form_info[index].param_value = value;
            }
        },
        // 选择单选
        changeRadio(type, index, index2) {
            for (let i in this.add_form_info) {
                if (i == index) {
                    for (let j in this.add_form_info[i].param_value) {
                        if (j == index2) {
                            if (type == 0) {
                                this.add_form_info[i].param_value[j].c = 1;
                            } else if (type == 1) {
                                this.add_form_info[i].param_value[j].c = !this.add_form_info[i].param_value[j].c;
                            }
                        } else {
                            if (type == 0) {
                                //单选
                                this.add_form_info[i].param_value[j].c = 0;
                            }
                        }
                    }
                }
            }
            this.add_form_info = this.add_form_info;
        },

        // 选择下拉弹窗
        changeSelct(index2) {
            let index = this.selectIndex;
            for (let i in this.add_form_info[index].param_value) {
                if (i == index2) {
                    this.add_form_info[index].param_value[i].c = 1;
                    this.add_form_info[index].select_name = this.add_form_info[index].param_value[i].v;
                } else {
                    this.add_form_info[index].param_value[i].c = 0;
                }
            }
            // this.add_form_info = this.add_form_info;
        },
        // 选择酒店预定人数
        changeHotelNum(index) {
            let list = this.changeFun(this.peope_list, 1, index, "nocancel");
            this.peope_list = list.array;
        },
        // 酒店预定人数弹窗
        hotelNumBtn() {
            // this.selectComponent("#payOrderWay").showCustom();
            this.hotelValue = 1;
        },
        // 酒店选择房间数的请求接口
        hotelRoom(num, vouch) {
            let that = this,
                method = "GET";
            let jsonVal = {
                room_id: that.room_id,
                sessionKey: that.sessionKey,
                vouchers: vouch
            };
            if (vouch == 1) {
                jsonVal.getgx = 1;
                jsonVal.people = num;
                method = "POST";
            }
            util.request({
                url: config.hotel_dbuy,
                method: method,
                data: jsonVal,
                success: function(res) {
                    if (vouch == 1) {
                        that.submitOrder();
                    }
                    that.setData({
                        hotel_vouchers: 1
                    });
                }
            });
        },

        // 入住人填写
        hotel_input(index, value) {
            this.ruzhuren[index].val = value;
            this.ruzhuren = this.ruzhuren;
        },

        // 支付方式
        payWayClick(type, val, index,nowIndex) {
            let [that, payWayVal] = [this, 0];
            if (val && that.getArrSecond(val)[0] == "pstop") {
                var pstop = that.getArrSecond(val)[1];
            }
            if (val && that.getArrSecond(val)[0] == "time") {
                var time = that.getArrSecond(val)[1];
            }
            if (val && that.getArrSecond(val)[0] == "jianshu") {
                var jianshu = that.getArrSecond(val)[1];
            }
            if (val && that.getArrSecond(val)[0] == "datevalue") {
                var dateValue = that.getArrSecond(val)[1];
            }
            if (val && that.getArrSecond(val)[0] == "zindex") {
                var zindex = that.getArrSecond(val)[1];
            }
            // 配送方式
            if (val && that.getArrSecond(val)[0] == "paywayval") {
                payWayVal = that.getArrSecond(val)[1];
            }
            that.payWayVal = payWayVal;
            if (util.functions.ifHaveFun(index)) {
                // 下拉列表、商品列表
                if (that.getArrSecond(index)[0] == "index") {
                    var selectindex = that.getArrSecond(index)[1];
                }
                // 配送时间
                if (that.getArrSecond(index)[0] == "block") {
                    var block = that.getArrSecond(index)[1];
                }
            }
            switch (Number(type)) {
                case 0:
                    //支付方式 || 单选框
                    // 如果zindex为1，支付方式||单选框 为第二层弹窗，且层级更高
                    if (zindex == 1) {
                        // block == 0 物流配送的日期选择，block == 1 物流配送的时间段选择，block == 2 同城配送的日期选择，block == 3 同城配送的时间段选择，
                        if(block == 0){
                            //显示时间弹窗
                            // that.blockValue = 2;
                            let num = 0;
                            for(let i in that.send_time_info){
                                if(i == nowIndex){
                                    that.send_time_info[i].is_check = 1;
                                    that.timeCheckIndex2 = i;
                                    for(let j in that.send_time_info[i].time){
                                        if(that.send_time_info[i].time[j].is_check == 1){
                                            num++;
                                            this.blockDate = that.send_time_info[i].time[j].time_stare+"-"+that.send_time_info[i].time[j].time_end;
                                        }
                                    }
                                }else{
                                    that.send_time_info[i].is_check = 0;
                                }
                            }
                            if(num == 0){
                                this.blockDate = "";
                            }
                        }else if(block == 1){
                            for(let i in that.send_time_info[that.timeCheckIndex2].time){
                                if(i == nowIndex){
                                    that.send_time_info[that.timeCheckIndex2].time[i].is_check = 1;
                                    this.blockDate = that.send_time_info[that.timeCheckIndex2].time[i].time_stare+"-"+that.send_time_info[that.timeCheckIndex2].time[i].time_end;
                                }else{
                                    that.send_time_info[that.timeCheckIndex2].time[i].is_check = 0;
                                }
                            }
                        }else if (block == 2) {
                            let num1 =0;
                            // //显示时间弹窗
                            // that.blockValue = 2;
                            for(let i in that.tcps.send_time_info){
                                if(i == nowIndex){
                                    that.tcps.send_time_info[i].is_check = 1;
                                    that.timeCheckIndex = i;
                                    for(let j in that.tcps.send_time_info[i].time){
                                        if(that.tcps.send_time_info[i].time[j].is_check == 1){
                                            num1++;
                                            if(util.functions.ifHaveFun(that.tcps.send_time_info[i].time[j].isImmediateDelivery)){
                                                this.tcps.blockDate = '';
                                            }else{
                                                this.tcps.blockDate = that.tcps.send_time_info[i].time[j].time_stare+"-"+that.tcps.send_time_info[i].time[j].time_end;
                                            }
                                        }
                                    }
                                }else{
                                    that.tcps.send_time_info[i].is_check = 0;
                                }
                            }
                            if(num1 == 0){
                                this.tcps.blockDate = "";
                            }
                        }else if (block == 3){
                            // that.blockValue = 2;
                            for(let i in that.tcps.send_time_info[that.timeCheckIndex].time){
                                if(i == nowIndex){
                                    that.tcps.send_time_info[that.timeCheckIndex].time[i].is_check = 1;
                                    if(util.functions.ifHaveFun(that.tcps.send_time_info[that.timeCheckIndex].time[i].isImmediateDelivery)){
                                        this.tcps.blockDate = '';
                                    }else{
                                        this.tcps.blockDate = that.tcps.send_time_info[that.timeCheckIndex].time[i].time_stare+"-"+that.tcps.send_time_info[that.timeCheckIndex].time[i].time_end;
                                    }
                                }else{
                                    that.tcps.send_time_info[that.timeCheckIndex].time[i].is_check = 0;
                                }
                            }
                        } else {
                            // //显示日期弹窗
                            // that.blockValue = 1; that.send_time_info = JSON.parse(JSON.stringify(that.send_time_info2));
                            // that.tcps.send_time_info = JSON.parse(JSON.stringify(that.tcps.send_time_info2));
                        }
                        that.$forceUpdate();
                        // that.$refs.customPayWay.showCustomZindex();
                    } else {
                        // 下拉列表单选框
                        if (dateValue == 1) {
                            that.dateValue = 1;
                            that.selectIndex = selectindex;
                            that.is_time = 0;
                            that.$forceUpdate();
                        }
                        that.$refs.customPayWay.showCustom();
                    }

                    if (dateValue != 1) {
                        this.is_time = 1;
                        this.dateValue = -1;
                    }
                    break;
                case 1:
                    //红包
                    this.submitHb();
                    break;
                case 2:
                    //代金券
                    this.$refs.customMyVouchers.showCustom();
                    break;
                case 3:
                    //配送门店
                    if (time == 1) {
                        if(that.changeNewWay == 2 && !util.functions.ifHaveFun(that.tcps.send_time_info)){
                            return false;
                        }
                        that.sendTime = true;
                        that.$refs.customDistribution.showCustom();
                        this.send_info_status = false;
                        this.send_info_status2 = false;
                    } else {
                        if (pstop == 1) {
                            this.send_info_status = false;
                            this.send_info_status2 = true;
                            this.if_send_info = false;
                        }
                        that.sendTime = false;
                        let req = {};
                        if (util.functions.ifHaveFun(that.store_id)) {
                            req.store_id = that.store_id;
                        }
                        that.submitStores(2);
                    }
                    break;
                case 4:
                    //商品列表
                    that.shopList = that.submitDate.group_info[selectindex].pro_list;
                    that.shopIndex = selectindex;
                    that.shop_jianshu = jianshu;
                    that.$refs.customShopName.showCustom();
                    break;
                case 5:
                    //日期弹窗
                    // util.datePicker(function(res) {
                    //     let index = index,
                    //         dateValue = "",
                    //         dateInterface;
                    //     dateValue = res[0] + "年/" + res[1] + "月/" + res[2] + "日/" + res[3] + "时/" + res[4] + "分";
                    //     dateInterface = res[0] + "-" + res[1] + "-" + res[2] + " " + res[3] + ":" + res[4];
                    //     that.add_form_info[index].param_value = dateValue;
                    //     that.setData({
                    //         add_form_info: that.add_form_info,
                    //         dateInterface: dateInterface
                    //     });
                    // });
                    that.customStatus = 1;
                    that.$refs.customDate.showCustom();
                    that.dateIndex = selectindex;
                    break;
                case 6:
                    //全屏发票
                    that.$refs.invoiceRefFull.showMaskFull();
                    break;
                case 7:
                    //选择发票(全屏)
                    that.submitFP();
                    break;
                case 8:
                    //新增发票
                    that.$refs.addInvoiceRef.showMaskFullUp();
                    this.fapiao_wx = true;
                    break;
                case 9:
                    if (payWayVal == 1) {
                        //支付方式
                        that.payWayVal = 1;
                        // let mobileList= that.payment_info.list["mobile"];
                        // for(let i in mobileList){
                        //     if(i == that.payment_info_val){
                        //         mobileList[i].is_check = 1;
                        //     }else{
                        //         mobileList[i].is_check = 0;
                        //     }
                        // }
                        // that.payment_info_list = mobileList;
                        if (that.paymentList.length == 0) {
                            return false;
                        }
                    } else {
                        //配送方式
                        that.if_send_info = true;
                    }
                    that.sendTime = 0;
                    that.$refs.customDistribution.showCustom();
                    break;
                case 10:
                    that.popupParam.num = 1;
                    setTimeout(() => {
                        that.$refs.popupRefs.openZfk();
                    }, 10);
                    break;
            }
        },
        // 关闭弹窗
        closePayWay(type, val) {
            let reqVal = {},
                that = this;
            if (val && this.getArrSecond(val)[0] == "back") {
                var back = val.split("=")[1];
            }
            if (util.functions.ifHaveFun(this.store_list)) {
                let value = this.store_list.filter(item => item.is_check == 1);
                this.store_list_name = util.functions.ifHaveFun(value) ? value[0].name : "";
            }
            switch (Number(type)) {
                case 0:
                    //单选框
                    this.$refs.customPayWay.maskClickHidden();
                    if (this.is_time == 0) {
                        //普通发票单选弹窗
                        for (let i in this.invoice_info.type_arr) {
                            if (this.invoice_info.type_arr[i].is_check == 1) {
                                this.index_fp = i;
                            }
                        }
                        this.faType_val = 0;
                    } else {
                        this.sendTime = true;
                    }
                    break;
                case 1:
                    //红包
                    let changeArr = this.hongbaoList.filter(item => item.is_check == 1);
                    this.publicFun("redbag", changeArr, true);
                    this.$refs.customHongbao.maskClickHidden();
                    break;
                case 2:
                    //代金券
                    let coupon_val = this.coupon_info.can_use_arr.filter(item => item.is_check == 1);
                    this.publicFun("coupon", coupon_val, true);
                    this.$refs.customMyVouchers.maskClickHidden();
                    break;
                case 3:
                    //配送时间
                    reqVal.send_store_id = this.store_id;
                    if (util.functions.ifHaveFun(this.sendTime)) {
                        if(this.changeNewWay == 2){
                            let yearDate = this.tcps.send_time_info.filter(item=>item.is_check==1)[0].dateVal,
                            blockDate = this.tcps.blockDate,
                            send_id_time = '',send_id_num = this.tcps.send_time_info[that.timeCheckIndex].time.filter(item=>item.is_check == 1).length;
                            if(util.functions.ifHaveFun(blockDate)){
                                send_id_time = yearDate + ' ' + blockDate;
                            }else{
                                // 当send_id_num为0的时候代表选择了非当天的时间，此时只选择了日期并没有选择时间
                                if(send_id_num == 0){
                                    send_id_time = yearDate;
                                }else{
                                    send_id_time = "";
                                }
                            }
                            this.tcps.send_id_time = send_id_time;
                            this.tcps.yearDate = yearDate;
                            this.tcps.blockDate = blockDate;
                        }else{
                            let yearDate = this.send_time_info.filter(item=>item.is_check==1)[0].dateVal,
                            blockDate = this.blockDate,
                            send_id_time = "";
                            send_id_time = yearDate + " " + (util.functions.ifHaveFun(blockDate) ? blockDate : "");
                            this.send_id_time = send_id_time;
                            this.yearDate = yearDate;
                            this.blockDate = blockDate;
                            // this.blockDateArr = this.blockDateArr;
                        }
                        this.getWiteInfo();
                        if(this.changeNewWay == 2){
                            let wirteInfo = this.getWiteInfo();
                            this.reqVal = JSON.parse(decodeURIComponent(wirteInfo));
                            this.submitOrder("",2);
                        }
                        if (this.store_id == 0) {
                            this.send_info_status = true;
                        }
                    } else {
                        if (this.store_id == 0) {
                            delete reqVal.send_store_id;
                            this.send_info_status = true;
                        } else {
                            this.send_info_status = false;
                            this.send_id = 925;
                        }
                        let wirteInfo = this.getWiteInfo();
                        this.reqVal = JSON.parse(decodeURIComponent(wirteInfo));
                        this.submitOrder();
                    }
                    if (!util.functions.ifHaveFun(this.store_id)) {
                        this.if_send_info = true;
                    }

                    this.$refs.customDistribution.maskClickHidden();
                    break;
                case 4:
                    //商品列表
                    this.$refs.customShopName.maskClickHidden();
                    this.shopList = [];
                    break;
                case 6:
                    //全屏发票
                    if (back != 1) {
                        let is_status = this.invoice_info.type_arr.filter(item => item.is_check == 1)[0].is_status;
                        if (this.is_use) {
                            if (is_status == 0) {
                                //普通发票
                                if (this.is_fpStatus == 0) {
                                    //个人
                                    this.fapiaoInfo = this.invoice_info.tips.geren;
                                } else if (this.is_fpStatus == 1) {
                                    //公司
                                    if (!util.functions.ifHaveFun(this.faListPT[this.fpttIndex].title)) {
                                        Hint.Msg({
                                            message:
                                                this.submitDate.tips.qingtianxie +
                                                this.invoice_info.tips.danweimingcheng
                                        });
                                        return false;
                                    }
                                    if (!util.functions.ifHaveFun(this.faListPT[this.fpttIndex].duty_num)) {
                                        Hint.Msg({
                                            message:
                                                this.submitDate.tips.qingtianxie +
                                                this.invoice_info.tips.nashuirenshibiehao
                                        });
                                        return false;
                                    } else {
                                        let status = this.identificationFun(this.faListPT[this.fpttIndex].duty_num);
                                        if (status === false) {
                                            return false;
                                        }
                                    }
                                    this.fapiaoInfo = this.faListPT[this.fpttIndex].title;
                                }
                            } else {
                                //增值税发票
                                if (!util.functions.ifHaveFun(this.faListZZ[this.fpzzIndex2].title)) {
                                    Hint.Msg({
                                        message:
                                            this.submitDate.tips.qingtianxie + this.invoice_info.tips.danweimingcheng
                                    });
                                    return false;
                                }
                                if (!util.functions.ifHaveFun(this.faListZZ[this.fpzzIndex2].duty_num)) {
                                    Hint.Msg({
                                        message:
                                            this.submitDate.tips.qingtianxie + this.invoice_info.tips.nashuirenshibiehao
                                    });
                                    return false;
                                } else {
                                    let status = this.identificationFun(this.faListZZ[this.fpzzIndex2].duty_num);
                                    if (status === false) {
                                        return false;
                                    }
                                }
                                if (!util.functions.ifHaveFun(this.faListZZ[this.fpzzIndex2].address)) {
                                    Hint.Msg({
                                        message: this.submitDate.tips.qingtianxie + this.invoice_info.tips.zhucedizhi
                                    });
                                    return false;
                                }
                                if (!util.functions.ifHaveFun(this.faListZZ[this.fpzzIndex2].tel)) {
                                    Hint.Msg({
                                        message: this.submitDate.tips.qingtianxie + this.invoice_info.tips.zhucedianhua
                                    });
                                    return false;
                                }
                                if (!util.functions.ifHaveFun(this.faListZZ[this.fpzzIndex2].bank)) {
                                    Hint.Msg({
                                        message: this.submitDate.tips.qingtianxie + this.invoice_info.tips.kaihuyinhang
                                    });
                                    return false;
                                }
                                if (!util.functions.ifHaveFun(this.faListZZ[this.fpzzIndex2].account)) {
                                    Hint.Msg({
                                        message:
                                            this.submitDate.tips.qingtianxie + this.invoice_info.tips.yinhangzhanghu
                                    });
                                    return false;
                                } else {
                                    if (
                                        this.faListZZ[this.fpzzIndex2].account.length < 11 ||
                                        this.faListZZ[this.fpzzIndex2].account.length > 24
                                    ) {
                                        Hint.Msg({
                                            message: this.invoice_info.tips.yinhangzhanghu + submitDate.tips.canshuyouwu
                                        });
                                        return false;
                                    }
                                }
                                if (!util.functions.ifHaveFun(this.faListZZ[this.fpzzIndex2].bank)) {
                                    Hint.Msg({
                                        message: this.submitDate.tips.qingtianxie + this.invoice_info.tips.kaihuyinhang
                                    });
                                    return false;
                                }
                                if (!util.functions.ifHaveFun(this.faListZZ[this.fpzzIndex2].receive_name)) {
                                    Hint.Msg({
                                        message:
                                            this.submitDate.tips.qingtianxie +
                                            this.invoice_info.tips.shoupiaorenxingming
                                    });
                                    return false;
                                }
                                if (!util.functions.ifHaveFun(this.faListZZ[this.fpzzIndex2].receive_tel)) {
                                    Hint.Msg({
                                        message:
                                            this.submitDate.tips.qingtianxie + this.invoice_info.tips.shoupiaorendianhua
                                    });
                                    return false;
                                }
                                if (!util.functions.ifHaveFun(this.cityValue)) {
                                    Hint.Msg({
                                        message:
                                            this.submitDate.tips.qingxuanze + this.invoice_info.tips.shoupiaorenchengshi
                                    });
                                    return false;
                                }
                                if (
                                    !util.functions.ifHaveFun(this.faListZZ[this.fpzzIndex2].receive_address) &&
                                    this.invoice_info.fapiao_address != 0
                                ) {
                                    Hint.Msg({
                                        message: this.submitDate.tips.qingtianxie + this.invoice_info.tips.xiangxidizhi
                                    });
                                    return false;
                                }

                                this.fapiaoInfo = this.faListZZ[this.fpzzIndex2].title;
                            }
                        } else {
                            this.fapiaoInfo = this.invoice_info.tips.bukaifapiao;
                        }
                        let wirteInfo = this.getWiteInfo();
                        this.reqVal = JSON.parse(decodeURIComponent(wirteInfo));
                        this.is_fp_status = is_status;
                        this.is_status = is_status;
                        this.is_use_fapiao = 1; //判断是否点击了确认;
                        this.submitOrder();
                    }
                    this.$refs.invoiceRefFull.maskCloseFull();
                    break;
                case 7:
                    //选择发票(全屏)
                    this.$refs.invoiceRef.maskClickHidden();
                    break;
                case 8:
                    //新增发票
                    this.$refs.addInvoiceRef.maskCloseFullUp();
                    break;
                case 9:
                    //配送方式,支付方式
                    // if(this.payWayVal == 1){//支付方式
                    //   reqVal.payment_id = this.payment_info_id
                    // }else if(this.send_id != 0){//配送方式
                    //     reqVal.send_id = this.send_id
                    // }
                    let wirteInfo = this.getWiteInfo();
                    this.reqVal = JSON.parse(decodeURIComponent(wirteInfo));
                    this.$refs.customDistribution.maskClickHidden();
                    // 支付方式不请求接口
                    // if (this.payWayVal == 1) {
                    //     return false;
                    // }
                    this.submitOrder();
                    break;
                case 10:
                    //酒店房间数选择
                    let people_num = 0,
                        peope_list = this.peope_list,
                        ruzhuren = this.ruzhuren,
                        ruzhuren2 = [];
                    for (let i in peope_list) {
                        if (peope_list[i].is_check == 1) {
                            people_num = Number(i) + 1;
                        }
                    }
                    peope_list = peope_list.slice(0, people_num);
                    if (ruzhuren.length > peope_list.length) {
                        ruzhuren = ruzhuren.slice(0, peope_list.length);
                    } else if (ruzhuren.length < peope_list.length) {
                        let ru_num = peope_list.length - ruzhuren.length;
                        for (let j = 0; j < ru_num; j++) {
                            ruzhuren2[j] = {};
                            ruzhuren2[j].val = "";
                        }
                        ruzhuren = ruzhuren.concat(ruzhuren2);
                    }
                    this.ruzhuren = ruzhuren;
                    this.people_num = Number(people_num);
                    this.hotelRoom(people_num, 1);
                    // this.selectComponent("#payOrderWay").maskClickHidden();
                    break;
            }
            if (type != 0) {
                this.sendTime = false;
            }
        },
        // 选择余额，积分，支付方式
        selectStatus(num) {
            if (num === "") {
                return false;
            }
            switch (Number(num)) {
                case 0:
                    //余额
                    this.valueFlg = !this.valueFlg;
                    this.publicFun("balance", this.balance_info.can_deduction_amount, this.valueFlg);
                    break;
                case 1:
                    //积分
                    this.valueFlg1 = !this.valueFlg1;
                    this.publicFun("integral", this.jifen_info.can_deduction_amount, this.valueFlg1);
                    break;
            }
        },
        // 选择代金券，红包，余额，积分公用方法
        publicFun(type, val, flgVal) {
            //type:类型，val：金额或者数据，flgVal:积分、余额的选择状态
            let that = this,
                reqVal = that.reqVal;
            if (!util.functions.ifHaveFun(reqVal.deduction_info)) {
                reqVal.deduction_info = {};
            }
            reqVal.deduction_info[type] = {};
            switch (type) {
                case "card":
                case "redbag":
                    //红包
                    let arr = [];
                    reqVal.deduction_info[type].ids = [];
                    for (let i in val) {
                        arr.push(val[i].id);
                    }
                    if (val.length > 0) {
                        reqVal.deduction_info[type].ids = [...arr];
                    } else {
                        delete reqVal.deduction_info[type];
                    }
                    break;
                case "coupon":
                    //代金券
                    if (util.functions.ifHaveFun(val)) {
                        reqVal.deduction_info[type].id = val[0].id;
                    } else {
                        delete reqVal.deduction_info[type];
                    }
                    break;
            }
            //积分、余额的删除数据
            if (type == "balance" || type == "integral") {
                reqVal.deduction_info[type].is_use = 1;
                if (this.jifen_info.is_default == 1) {
                    reqVal.deduction_info.integral = {};
                    reqVal.deduction_info.integral.is_use = 1;
                }
                // if(this.balance_info.is_default == 1){reqVal.deduction_info.balance.is_use = 1}
                // if(type == 'balance'){  }
            }
            if (!util.functions.ifHaveFun(flgVal)) {
                delete reqVal.deduction_info[type];
            }
            let wirteInfo = this.getWiteInfo();
            wirteInfo = JSON.parse(decodeURIComponent(wirteInfo));
            let wirteInfo2 = wirteInfo;
            // wirteInfo2.deduction_info ={}

            if (util.functions.ifHaveFun(wirteInfo.deduction_info)) {
                wirteInfo2.deduction_info2 = {};
                if (util.functions.ifHaveFun(wirteInfo.deduction_info.coupon)) {
                    wirteInfo2.deduction_info2.coupon = wirteInfo.deduction_info.coupon;
                }
                if (util.functions.ifHaveFun(wirteInfo.deduction_info.redbag)) {
                    wirteInfo2.deduction_info2.redbag = wirteInfo.deduction_info.redbag;
                }
                if (util.functions.ifHaveFun(wirteInfo.deduction_info.card)) {
                    wirteInfo2.deduction_info2.card = wirteInfo.deduction_info.card;
                }
                if (util.functions.ifHaveFun(wirteInfo.deduction_info.integral)) {
                    wirteInfo2.deduction_info2.integral = wirteInfo.deduction_info.integral;
                }
                if (util.functions.ifHaveFun(wirteInfo.deduction_info.balance)) {
                    wirteInfo2.deduction_info2.balance = wirteInfo.deduction_info.balance;
                }
                wirteInfo2.deduction_info = wirteInfo2.deduction_info2;
                delete wirteInfo2.deduction_info2;
            }
            that.reqVal = wirteInfo2;
            that.submitOrder();
        },

        // 发票选取状态
        changeFp() {
            this.is_use = this.is_use == 0 ? 1 : 0;
        },
        // 判断纳税人识别号
        identificationFun(val) {
            var duty_num = val.trim(),
                duty_reg = /^[0-9A-Za-z]{15,20}$/;
            if (!duty_num || !duty_reg.test(duty_num)) {
                Hint.Msg({ message: this.submitDate.tips.nashuirenshibiehaozifuxianzhi });
                return false;
            }
        },
        // 发票个人，公司切换
        changePerAdd(type) {
            this.is_fpStatus = type;
        },
        // 普通发票，增值税发票
        changePZ(index) {
            let list = this.changeFun(this.invoice_info.type_arr, 2, index, "nocancel");
            this.invoice_info.type_arr = [...list.array];
            this.invoice_info = this.invoice_info;
            this.index_fp = this.invoice_info.type_arr[index].is_status;
        },
        // 发票类型选择
        invoiceType(time) {
            this.is_time = time;
            this.dateValue = -1;
            this.faType_val = 1;
            this.$refs.customPayWay.showCustomZindex();
            this.$refs.customPayWay.ifMengban();
        },
        // 关于积分tip提示
        closeTipJifen() {
            this.tioJiFen = true;
        },
        // 详情内容展开
        showDetailFun() {
            this.hiddenDetail = !this.hiddenDetail;
        },
        shouqiBtn(type) {
            let that = this;
            if (type == 1) {
                //展开表单详情
                that.hiddenName = !that.hiddenName;
            }
        },
        noMove() {
            return false;
        },
        // 发票内容
        changePerson(index) {
            if (this.is_time == 2) {
                this.fapiaoSelectP = this.invoice_info.ord.contents[index];
            } else if (this.is_time == 3) {
                this.fapiaoSelectS = this.invoice_info.vat.contents[index];
            }
        },
        // 选择发票抬头
        fpttLower() {
            let pagesFp = this.pagesFp;
            if (pagesFp <= this.fpbag_num_max && this.fpbag_num_max > 1) {
                pagesFp++;
                this.pagesFp = pagesFp;
                this.submitFP();
            }
        },
        // 普通发票填写内容
        ptInput(type, value) {
            let fpttIndex = util.functions.ifHaveFun(this.fpttIndex) ? this.fpttIndex : this.index_fp,
                val = value;
            switch (Number(type)) {
                case 0:
                    //单位名称
                    this.faListPT[fpttIndex].title = val;
                    break;
                case 1:
                    //纳税人识别号
                    this.faListPT[fpttIndex].duty_num = val;
                    break;
                case 2:
                    //注册地址
                    this.faListPT[fpttIndex].address = val;
                    break;
                case 3:
                    //注册电话
                    this.faListPT[fpttIndex].tel = val;
                    break;
                case 4:
                    //开户银行
                    this.faListPT[fpttIndex].bank = val;
                    break;
                case 5:
                    //银行账户
                    this.faListPT[fpttIndex].account = val;
                    break;
            }
            this.faListPT = this.faListPT;
        },
        // 增值税发票填写内容
        zzsInput(type, val) {
            let fpzzIndex = this.fpzzIndex2;
            switch (Number(type)) {
                case 0:
                    //单位名称
                    this.faListZZ[fpzzIndex].title = val;
                    break;
                case 1:
                    //纳税人识别号
                    this.faListZZ[fpzzIndex].duty_num = val;
                    break;
                case 2:
                    //注册地址
                    this.faListZZ[fpzzIndex].address = val;
                    break;
                case 3:
                    //注册电话
                    this.faListZZ[fpzzIndex].tel = val;
                    break;
                case 4:
                    //开户银行
                    this.faListZZ[fpzzIndex].bank = val;
                    break;
                case 5:
                    //银行账户
                    this.faListZZ[fpzzIndex].account = val;
                    break;
                case 6:
                    //收票人姓名
                    this.faListZZ[fpzzIndex].receive_name = val;
                    break;
                case 7:
                    //收票人电话
                    this.faListZZ[fpzzIndex].receive_tel = val;
                    break;
                case 8:
                    //收票人地址
                    this.faListZZ[fpzzIndex].receive_address = val;
                    break;
            }
            this.faListZZ = this.faListZZ;
        },
        // 添加发票抬头
        tinjiaTT(type, value) {
            let tjTTJSON = this.tjTTJSON,
                val = util.functions.ifHaveFun(value) ? value : "";
            switch (Number(type)) {
                case 0:
                    //单位名称
                    tjTTJSON.title = val;
                    break;
                case 1:
                    //纳税人识别号
                    tjTTJSON.duty_num = val;
                    break;
                case 2:
                    //注册地址
                    tjTTJSON.address = val;
                    break;
                case 3:
                    //注册电话
                    tjTTJSON.tel = val;
                    break;
                case 4:
                    //开户银行
                    tjTTJSON.bank = val;
                    break;
                case 5:
                    //银行账户
                    tjTTJSON.account = val;
                    break;
            }
            this.tjTTJSON = tjTTJSON;
        },
        // 添加发票抬头
        addFpfun() {
            const that = this;
            if (!util.functions.ifHaveFun(that.tjTTJSON.title)) {
                Hint.Msg({ message: that.submitDate.tips.qingtianxie + that.invoice_info.tips.danweimingcheng });
                return false;
            }
            if (!util.functions.ifHaveFun(that.tjTTJSON.duty_num)) {
                Hint.Msg({ message: that.submitDate.tips.qingtianxie + that.invoice_info.tips.nashuirenshibiehao });
                return false;
            } else {
                let status = this.identificationFun(that.tjTTJSON.duty_num);
                if (status === false) {
                    return false;
                }
            }
            if (!util.functions.ifHaveFun(that.tjTTJSON.address)) {
                Hint.Msg({ message: that.submitDate.tips.qingtianxie + that.invoice_info.tips.zhucedizhi });
                return false;
            }
            if (!util.functions.ifHaveFun(that.tjTTJSON.tel)) {
                Hint.Msg({ message: that.submitDate.tips.qingtianxie + that.invoice_info.tips.zhucedianhua });
                return false;
            }
            if (!util.functions.ifHaveFun(that.tjTTJSON.bank)) {
                Hint.Msg({ message: that.submitDate.tips.qingtianxie + that.invoice_info.tips.kaihuyinhang });
                return false;
            }
            if (!util.functions.ifHaveFun(that.tjTTJSON.account)) {
                Hint.Msg({ message: that.submitDate.tips.qingtianxie + that.invoice_info.tips.yinhangzhanghu });
                return false;
            } else {
                if (that.tjTTJSON.account.length < 11 || that.tjTTJSON.account.length > 24) {
                    Hint.Msg({ message: that.invoice_info.tips.yinhangzhanghu + that.submitDate.tips.canshuyouwu });
                    return false;
                }
            }
            let sub_data = {};
            sub_data.title = that.tjTTJSON.title;
            sub_data.duty_num = that.tjTTJSON.duty_num;
            sub_data.address = util.functions.ifHaveFun(that.tjTTJSON.address) ? that.tjTTJSON.address : "";
            sub_data.tel = util.functions.ifHaveFun(that.tjTTJSON.tel) ? that.tjTTJSON.tel : "";
            sub_data.bank = util.functions.ifHaveFun(that.tjTTJSON.bank) ? that.tjTTJSON.bank : "";
            sub_data.account = util.functions.ifHaveFun(that.tjTTJSON.account) ? that.tjTTJSON.account : "";
            sub_data.zz_userid = that.$cookies.get("zz_userid");
            sub_data.client_type = 1;
            sub_data.username = that.$route.query.username;
            sub_data.add_tag = 2;
            sub_data.invoice_id = "";
            // sub_data.client_type= 1

            that.showLoading = true;
            that.$F.Response({
                url: "xiaochengxu/address/fapiao.php",
                param: sub_data,
                success: res => {
                    that.showLoading = false;
                    if (res == 0) {
                        // Hint.Msg({ message: "添加成功" });
                        that.submitFP();
                        that.tjTTJSON = {};
                        that.$refs.addInvoiceRef.maskCloseFullUp();
                    } else {
                        if (res == 1) {
                            Hint.Msg({ message: that.submitDate.tips.canshuyouwu });
                        } else if (res == 2) {
                            Hint.Msg({ message: that.submitDate.tips.fapiaotaitouhuonashuirenshibiemayicunzai });
                        } else {
                            Hint.Msg({ message: that.submitDate.tips.fuwuqifanmangshaohouzaishi });
                        }
                    }
                },
                error: res => {
                    that.showLoading = false;
                    Hint.Msg({ message: "添加失败" });
                }
            });
        },
        // 配送方式说明信息
        warnBtn(companiesStr) {
            if (!util.functions.ifHaveFun(companiesStr)) {
                return false;
            }
            this.payWayFlg = true;
            this.companiesStr = companiesStr;
            this.ScreenFlg2 = true;
        },
        closePayWayFlg() {
            this.payWayFlg = false;
            this.companiesStr = "";
            this.ScreenFlg2 = false;
        },

        // 社区团下单佣金
        commissionFun(order_id) {
            let _this = this;
            if (_this.by_head_id && order_id) {
                let commJson = {
                    order_id: order_id,
                    type: 1,
                    community_show: _this.changeWay
                };
                if (_this.community_delivery == 1) {
                    commJson.community_show = util.functions.ifHaveFun(_this.community_show) ? _this.community_show : 0;
                }
                commissionEntry(commJson).then(res => {});
            }
        },
        // 自提点
        zitiFun() {
            let that = this;
            getheaddetail({ head_id: that.$cookies.get("by_head_id") }).then(res => {
                that.userChoose = res;
            });
        },

        // 提交订单按钮
        subPayWay() {
            const that = this;
            that.popupParam.num = 2;
            // 有支付方式
            if (that.payment_info_val == "on" && that.submitDate.payment_amount > 0) {
                // 支付方式大于1的时候有可选支付方式
                if (that.payment_info.onlineList.length > 1) {
                    that.onlineList = that.payment_info.onlineList;
                    that.$forceUpdate();
                    // 只有一个支付方式并且是有花呗分期的
                } else if (
                    that.payment_info_list &&
                    that.payment_info_list.on &&
                    that.payment_info_list.on.is_huabei == 1 &&
                    (that.payment_info_list.on.pay_id == 12 || that.payment_info_list.on.pay_id == 27)
                ) {
                    that.onlineList = [];
                }
                setTimeout(() => {
                    that.$refs.popupRefs.payWayFun();
                });
                return false;
            }
            // 没有支付方式列表数据可选
            that.sublitOrderBtn();
        },
        // 支付密码
        zhifuMima(value) {
            this.mimaValue = value;
        },
        // 提交验证
        sublitOrderBtn(type) {
            // 这种情况下不能点击
            if (util.functions.ifHaveFun(this.button_info) && this.button_info.click == 0) {
                return false;
            }
            let submitDate = this.submitDate,
                req = JSON.parse(decodeURIComponent(this.getWiteInfo(2))),
                formJson = req.formJson,
                reqval = {},
                that = this;

            //同城配送无货弹窗判断
            if(Object.keys(that.tc_not_buy_pro).length && (that.tc_not_buy_pro[Object.keys(that.tc_not_buy_pro)[0]].pro_list.length)  && !that.noShopStatus && ((submitDate.address_info && submitDate.address_info.id != 0) || !util.functions.ifHaveFun(submitDate.address_info)) && ((that.changeNewWay == 1 || that.changeNewWay == 2) && util.functions.ifHaveFun(that.logisticsDistributionInfo) && util.functions.ifHaveFun(that.logisticsDistributionInfo.delNav))){
                that.noShopStatus = true;
                return false;
            }
            // 如果是供应链商品 且商品中有无货商品 如果不更换地址的情况下 不能提交
            if (submitDate.sc_pro_cnt > 0 && submitDate.sc_not_buy_pro.length && that.ifAgainAlert != 1) {
                that.noShopStatus = true;
                return false;
            } else {
                that.noShopStatus = false;
            }

            // 判断有没有地址
            // if (util.functions.ifHaveFun(submitDate.address_info) && this.userChoose == '') {
            if (util.functions.ifHaveFun(submitDate.address_info)) {
                if (submitDate.address_info.id == 0) {
                    if (submitDate.address_info.type == 1) {
                        Hint.Msg({ message: submitDate.tips.qingxuanzeshouhuodizhi });
                    } else {
                        Hint.Msg({ message: submitDate.tips.qingtianjiashouhuodizhi });
                    }
                    return false;
                } else {
                    req.address_id = submitDate.address_info.id;
                }
            }
            // 判断自提点
            if (util.functions.ifHaveFun(that.by_head_id)) {
                req.by_head_id = that.by_head_id;
                reqval.by_head_id = that.by_head_id;
            }
            req.send_money = submitDate.send_money ? submitDate.send_money : 0; // 配送费
            req.pay_money = submitDate.payment_amount; //支付金额
            // 判断表单信息必填选项
            if (util.functions.ifHaveFun(that.add_form_info)) {
                if (util.functions.ifHaveFun(formJson)) {
                    for (let i in formJson) {
                        if (util.functions.ifHaveFun(formJson[i].name)) {
                            Hint.Msg({ message: formJson[i].name });
                            return false;
                        }
                    }
                }
                for (let i in req.form_info) {
                    var name = "param" + i;
                    reqval[name] = req.form_info[i];
                }
            }
            // 备注
            if (util.functions.ifHaveFun(req.remark_info)) {
                reqval.remarks_info = JSON.stringify(req.remark_info);
            }
            // 身份证号验证
            if (util.functions.ifHaveFun(that.user_identity_info)) {
                var shenreg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
                if (!shenreg.test(req.number)) {
                    Hint.Msg({ message: submitDate.tips.qingtianxiezhengquedeshenfenzhenghaoma });
                    return false;
                }
                reqval.identity_number = req.number;
                delete req.number;
            }

            // 判断是否选配送门店
            if (util.functions.ifHaveFun(submitDate.store_info) || util.functions.ifHaveFun(submitDate.send_info)) {
                //没有选择配送方式
                if (
                    util.functions.ifHaveFun(submitDate.send_info) &&
                    !util.functions.ifHaveFun(submitDate.send_info.info.id)
                ) {
                    Hint.Msg({ message: submitDate.tips.qingxuanze + submitDate.tips.peisongfangshi });
                    return false;
                }
                // if (submitDate.community_delivery == 1 && that.community_show != 1) {
                //     return false;
                // }
                // 删除自提名称和手机号
                // if (submitDate.community_delivery == 1 && that.community_show == 1) {
                //     if(util.functions.ifHaveFun(req.reservedName)){
                //     delete req.reservedName
                //     }
                //     if(util.functions.ifHaveFun(req.reservedTel)){
                //     delete req.reservedTel
                //     }
                // }
                //没有选择配送门店
                if (
                    util.functions.ifHaveFun(submitDate.store_info) &&
                    !util.functions.ifHaveFun(submitDate.store_info.info.send_store_info.id) &&
                    ((util.functions.ifHaveFun(submitDate.send_info) &&
                        !util.functions.ifHaveFun(submitDate.send_info.info.id)) ||
                        !util.functions.ifHaveFun(submitDate.send_info))
                ) {
                    Hint.Msg({ message: submitDate.store_info.prompt });
                    return false;
                }
            }
            // 余额,积分,支付卡，红包，优惠券
            if (util.functions.ifHaveFun(req.deduction_info)) {
                if (util.functions.ifHaveFun(req.deduction_info.balance))
                    req.deduction_info.balance.val = that.balance_info.deduction_amount;
                if (util.functions.ifHaveFun(req.deduction_info.balance) && req.deduction_info.balance.val == 0) {
                    delete req.deduction_info.balance;
                }
                if (util.functions.ifHaveFun(req.deduction_info.integral))
                    req.deduction_info.integral.val = that.jifen_info.can_deduction_jifen;
                if (util.functions.ifHaveFun(req.deduction_info.integral) && req.deduction_info.integral.val == 0) {
                    delete req.deduction_info.integral;
                }
                if (util.functions.ifHaveFun(req.deduction_info.redbag))
                    req.deduction_info.redbag.val = that.redpacket_info.deduction_amount;
                if (
                    (util.functions.ifHaveFun(req.deduction_info.redbag) && req.deduction_info.redbag.val == 0) ||
                    that.noHongbao == 1
                ) {
                    delete req.deduction_info.redbag;
                }
                if (util.functions.ifHaveFun(req.deduction_info.card))
                    req.deduction_info.card.val = that.card_info.deduction_amount;
                if (util.functions.ifHaveFun(req.deduction_info.card) && req.deduction_info.card.val == 0) {
                    delete req.deduction_info.card;
                }
                if (util.functions.ifHaveFun(req.deduction_info.coupon))
                    req.deduction_info.coupon.val = that.coupon_info.deduction_amount;
                if (util.functions.ifHaveFun(req.deduction_info.coupon) && req.deduction_info.coupon.val == 0) {
                    delete req.deduction_info.coupon;
                }
            }
            // return false;
            if (that.jifen_info.is_default == 1) {
                req.deduction_info = util.functions.ifHaveFun(req.deduction_info) ? req.deduction_info : {};
                req.deduction_info.integral = {};
                req.deduction_info.integral.is_use = 1;
                req.deduction_info.integral.val = that.jifen_info.can_deduction_jifen;
            }
            // 支付方式
            // if(util.functions.ifHaveFun(submitDate.payment_info) && util.functions.ifHaveFun(submitDate.payment_info.list)&& util.functions.ifHaveFun(submitDate.payment_info.list.mobile)){
            //     return false;
            // }
            // 配送时间
            if (util.functions.ifHaveFun(that.send_time_info) && that.changeNewWay != 1 && that.changeNewWay != 2) {
                if (!util.functions.ifHaveFun(req.send_time)) {
                    Hint.Msg({ message: submitDate.tips.qingxuanze + submitDate.tips.peisongshijian });
                    return false;
                } else {
                    if (util.functions.ifHaveFun(req.send_date)) {
                        for(let i in that.send_time_info){
                            if(that.send_time_info[i].is_check == 1){
                                 reqval.send_date = submitDate.send_time_info.date[i];
                            }
                        }
                        // reqval.send_date = req.send_date;
                        delete req.send_date;
                    }
                    if (util.functions.ifHaveFun(req.send_time)) {
                        reqval.send_time = req.send_time;
                        delete req.send_time;
                    }
                    delete req.send_id_time;
                    delete req.send_time_info;
                    delete req.tcps;
                }
            }
            // 同城配送的配送时间
            if (util.functions.ifHaveFun(that.tcps.send_time_info) && that.changeNewWay == 2 && util.functions.ifHaveFun(that.logisticsDistributionInfo) && util.functions.ifHaveFun(that.logisticsDistributionInfo.delNav) && that.order_type == 1) {
                for(let i in that.tcps.send_time_info){
                    if(that.tcps.send_time_info[i].is_check == 1){
                        reqval.send_date = that.TCPSdateValArr[i];
                        for(let j in that.tcps.send_time_info[i].time){
                            if(that.tcps.send_time_info[i].time[j].is_check == 1){
                                reqval.send_time = that.tcps.send_time_info[i].time[j].time_stare+'-'+that.tcps.send_time_info[i].time[j].time_end;
                            }
                        }
                    }
                }
                if(!reqval.send_time){
                    Hint.Msg({ message: submitDate.tips.qingxuanze + submitDate.tips.peisongshijian });
                    return false;
                }
            }
            // 购买门店
            if (util.functions.ifHaveFun(that.buyStoreInfo) && that.buyStoreInfo.must == 1) {
                if (!util.functions.ifHaveFun(that.buyStoreInfo.info) || that.buyStoreInfo.info.id == 0) {
                    Hint.Msg({ message: that.buyStoreInfo.prompt });
                    return false;
                }
            }
            if (util.functions.ifHaveFun(req.send_time_options)) {
                delete req.send_time_options;
            }
            if (util.functions.ifHaveFun(req.tcps)) {
                delete req.tcps;
            }
            if (util.functions.ifHaveFun(req.blockDateArr)) {
                delete req.blockDateArr;
            }

            // 发票信息
            if (util.functions.ifHaveFun(submitDate.invoice_info)) {
                if (!util.functions.ifHaveFun(that.fapiaoInfo)) {
                    Hint.Msg({ message: submitDate.tips.qingxuanze + that.invoice_info.title });
                    return false;
                } else {
                    reqval.invoice_info = {};
                    if (that.is_use_fapiao == 1) {
                        //点击了添加发票信息的确认按钮才执行下面的操作
                        if (req.fapiaoInfo.is_status == 0 && that.is_use == 1) {
                            //普通发票
                            if (req.fapiaoInfo.faListPT[0].is_check == undefined && that.is_fpStatus == 1) {
                                reqval.invoice_info = req.fapiaoInfo.faListPT[0];
                            }
                            for (let i in req.fapiaoInfo.faListPT) {
                                if (req.fapiaoInfo.faListPT[i].is_check == 1 && that.is_fpStatus == 1) {
                                    delete req.fapiaoInfo.faListPT[i].id;
                                    delete req.fapiaoInfo.faListPT[i].is_check;
                                    reqval.invoice_info = req.fapiaoInfo.faListPT[i];
                                    if (util.functions.ifHaveFun(that.ptfpId))
                                        reqval.invoice_info.invoice_id = that.ptfpId;
                                }
                            }

                            reqval.invoice_info.fptype = 0;
                            reqval.invoice_info.pro_or_com = that.is_fpStatus == 0 ? 1 : 2; //个人传1，公司传2
                            reqval.invoice_info.fpcon = req.fapiaoInfo.fapiaoSelectP;
                        } else if (req.fapiaoInfo.is_status == 1 && that.is_use == 1) {
                            //增值税发票
                            if (util.functions.ifHaveFun(req.fapiaoInfo.faListZZ[0].id)) {
                                //从发票列表选择的
                                for (let i in req.fapiaoInfo.faListZZ) {
                                    if (req.fapiaoInfo.faListZZ[i].is_check == 1) {
                                        delete req.fapiaoInfo.faListZZ[i].id;
                                        delete req.fapiaoInfo.faListZZ[i].is_check;
                                        reqval.invoice_info = req.fapiaoInfo.faListZZ[i];
                                    }
                                }
                            } else {
                                //自己手动输入的
                                reqval.invoice_info = req.fapiaoInfo.faListZZ[0];
                            }
                            reqval.invoice_info.province =
                                util.functions.ifHaveFun(req.fapiaoInfo.cityValueBefore) &&
                                util.functions.ifHaveFun(req.fapiaoInfo.cityValueBefore[0])
                                    ? req.fapiaoInfo.cityValueBefore[0]
                                    : "";
                            reqval.invoice_info.city =
                                util.functions.ifHaveFun(req.fapiaoInfo.cityValueBefore) &&
                                util.functions.ifHaveFun(req.fapiaoInfo.cityValueBefore[1])
                                    ? req.fapiaoInfo.cityValueBefore[1]
                                    : "";
                            reqval.invoice_info.area =
                                util.functions.ifHaveFun(req.fapiaoInfo.cityValueBefore) &&
                                util.functions.ifHaveFun(req.fapiaoInfo.cityValueBefore[2])
                                    ? req.fapiaoInfo.cityValueBefore[2]
                                    : "";
                            reqval.invoice_info.fptype = 1;
                            reqval.invoice_info.fpcon = req.fapiaoInfo.fapiaoSelectS;
                            if (util.functions.ifHaveFun(that.zzfpId)) reqval.invoice_info.invoice_id = that.zzfpId;
                        }
                    }
                    reqval.invoice_info.fapiao_taitou = that.is_use;
                    req.invoice_info = Object.assign(req.invoice_info, reqval.invoice_info);
                    reqval.invoice_info = JSON.stringify(reqval.invoice_info);
                }
            }

            // 判断自提情况下自提名称和手机号是否填写
            if (
                ((submitDate.community_delivery == 1 || (that.userChoose != "" && that.order_type != 21)) &&
                that.community_show != 1) || (that.changeNewWay == 1 && util.functions.ifHaveFun(that.logisticsDistributionInfo) && util.functions.ifHaveFun(that.logisticsDistributionInfo.delNav))
            ) {
                if (!util.functions.ifHaveFun(that.reservedName)) {
                    if(that.changeNewWay == 1){
                        Hint.Msg({ message: submitDate.tips.qingshuru + "提货人" });
                    }else{
                        Hint.Msg({ message: submitDate.tips.qingshuru + submitDate.tips.xingming });
                    }
                    return false;
                }
                let phoneVal = that.phoneFun(that.reservedTel);
                if (!util.functions.ifHaveFun(phoneVal)) {
                    Hint.Msg({ message: submitDate.tips.qingshuruzhengquededianhuahaoma });
                    return false;
                }
            } else {
                //非自提删除改参数
                if (util.functions.ifHaveFun(req.reservedName)) {
                    delete req.reservedName;
                }
                if (util.functions.ifHaveFun(req.reservedTel)) {
                    delete req.reservedTel;
                }
            }

            // form_info 放在req之外
            if (util.functions.ifHaveFun(req.form_info)) {
                delete req.form_info;
            }
            if (util.functions.ifHaveFun(req.fapiaoInfo)) {
                delete req.fapiaoInfo;
            }

            if (that.order_type == 21) {
                //酒店管理走别的提交订单
                let ruzhuren = that.ruzhuren,
                    people = "",
                    jifen_val = 0,
                    yue_val = 0;
                for (let i in ruzhuren) {
                    if (ruzhuren[i].val != "") {
                        people = people + "," + ruzhuren[i].val;
                    } else {
                        Hint.Msg({ message: "请填写房间" + (Number(i) + 1) + "入住人" });
                        return false;
                    }
                }
                if (!util.functions.ifHaveFun(that.hotelPhone)) {
                    Hint.Msg({ message: "请填写联系人电话" });
                    return false;
                }
                people = people.substring(1, people.length);
                if (util.functions.ifHaveFun(that.valueFlg1) || that.jifen_info.is_default == 1) {
                    jifen_val = that.jifen_info.deduction_amount;
                }
                if (util.functions.ifHaveFun(that.valueFlg)) {
                    yue_val = that.balance_info.deduction_amount;
                }
                util.timelock("jiudian_lock", 5000, function() {
                    util.request({
                        url: config.hotel_dbuy,
                        method: "POST",
                        data: {
                            sessionKey: that.sessionKey,
                            people: people,
                            tel: that.hotelPhone,
                            room_id: that.room_id,
                            jifen: jifen_val,
                            yue: yue_val
                        },
                        success: function(res) {
                            wx.hideLoading();
                            if (res.data.code == 2000) {
                                wx.showModal({
                                    title: "错误",
                                    content: "余房不足",
                                    showCancel: false
                                });
                                return false;
                            }
                            if (res.data.code == 3000) {
                                wx.showModal({
                                    title: "错误",
                                    content: "数据错误",
                                    showCancel: false
                                });
                                return false;
                            }
                            if (res.data.code == 5000) {
                                wx.showModal({
                                    title: "错误",
                                    content: "可用会员余额不足",
                                    showCancel: false
                                });
                                return false;
                            }
                            if (res.data.code == 16000) {
                                wx.showModal({
                                    title: "错误",
                                    content: "可用积分不足",
                                    showCancel: false
                                });
                                return false;
                            }
                            if (res.data.code == 8000) {
                                wx.showModal({
                                    title: "错误",
                                    content: "0元房间无法预定",
                                    showCancel: false
                                });
                                return false;
                            }
                            if (res.data.code == 9000) {
                                wx.showModal({
                                    title: "错误",
                                    content: "网络异常",
                                    showCancel: false
                                });
                                return false;
                            }
                            if (res.data.code == 10000) {
                                wx.showModal({
                                    title: "错误",
                                    content: "红包参数有误",
                                    showCancel: false
                                });
                                return false;
                            }
                            if (res.data.code == 20000) {
                                //需要支付的订单金额为0
                                wx.redirectTo({
                                    url: `/extpack/pages/hotel/order_detail?order_id=${res.data.order_id}`
                                });
                                return false;
                            }
                            if (res.data.code == 1000) {
                                //付款
                                let paydata = {
                                    orderid: res.data.order_id,
                                    price: res.data.price,
                                    ordertype: "jiudian",
                                    pay_type: 1
                                };
                                let success_url = `/extpack/pages/hotel/order_detail?order_id=${res.data.order_id}`;
                                let fail_url = "/extpack/pages/hotel/order_detail?order_id=" + res.data.order_id;
                                util.payments({
                                    data: paydata,
                                    success: function() {
                                        wx.redirectTo({
                                            url: success_url
                                        });
                                    },
                                    fail: function() {
                                        wx.redirectTo({
                                            url: fail_url
                                        });
                                    }
                                });
                            }
                        }
                    });
                });
                return false;
            }

            // 判断是否需要输入宽带账号
            if (submitDate.device == 1) {
                if (!util.functions.ifHaveFun(that.kuandai_info)) {
                    Hint.Msg({ message: "请填写宽带账号" });
                    return false;
                }
                reqval.deviceId = that.kuandai_info;
            }
            that.popupParam.num = 2;
            // return false;
            // 有支付方式
            // that.changeNewWay == 2代表是
            if (
                (that.payment_info_val == "on") &&
                submitDate.payment_amount > 0 &&
                type != "popup" &&
                (submitDate.payment_info.list.mobile["on"].id == -1 ||
                    (that.payment_info_list.on.is_huabei == 1 && (that.payment_info_list.on.pay_id == 12 || that.payment_info_list.on.pay_id == 27)))
            ) {
                // 支付方式大于1的时候有可选支付方式
                if (submitDate.payment_info.list.mobile["on"].id == -1) {
                    that.onlineList = that.payment_info.onlineList;
                    that.$forceUpdate();
                    // 只有一个支付方式并且是有花呗分期的
                } else {
                    that.onlineList = [];
                }
                setTimeout(() => {
                    that.$refs.popupRefs.payWayFun();
                });
                return false;
            }

            // mgzf8用户的积分余额 输入密码判断
            if (submitDate.usePassword != 0 && that.balance_info != "" && that.valueFlg) {
                // 密码未填写，提示
                if (!util.functions.ifHaveFun(that.mimaValue)) {
                    that.correctMima = true;
                    // that.miMaFocus = true;
                    return false;
                } else {
                    req.paymentPassword = that.mimaValue;
                    that.correctMima = false;
                    // that.generate(submitDate);
                }
            }
            if(util.functions.ifHaveFun(that.logisticsDistributionInfo) && util.functions.ifHaveFun(that.logisticsDistributionInfo.delNav) && util.functions.ifHaveFun(that.delNav)){
                //如果是到店自提，没有切换门店，则取自营的门店id
                if(that.changeNewWay == 1 && !req.buy_store_id && util.functions.ifHaveFun(that.group_info)){
                    for(let i in that.group_info){
                        if(i == 0){
                            req.buy_store_id = that.group_info[i].storeInfo.id;
                        }
                    }
                }
                //同城配送，如果有自营的，传send_store_id
                if(that.changeNewWay == 2){
                    if(util.functions.ifHaveFun(that.group_info)){
                        for(let i in that.group_info){
                            if(i == 0){
                                req.send_store_id = that.group_info[i].storeInfo.id;
                            }
                        }
                    }
                }
            }
            req.share_member_id = that.$cookies.get("share_member_id");
            // 会员卡营销
            if (util.functions.ifHaveFun(that.$route.query.req)) {
                let newReq = JSON.parse(decodeURIComponent(that.$route.query.req));
                req.order_type = newReq.order_type;
                req.orderParams = newReq.orderParams;
            }
            reqval.req = JSON.stringify(req);
            reqval.username = that.$route.query.username;
            reqval.zz_userid = that.$cookies.get("zz_userid");
            reqval.client_type = 1;
            reqval.wap = 1;
            // log(reqval);
            // return false;
            if (!util.functions.ifHaveFun(that.$cookies.get("zz_userid"))) {
                location.href = `/dom/denglu.php?username=${that.$route.query.username}&wap=1`;
                return false;
            }
            that.showLoading = true;
            // 生成订单接口
            that.generate(submitDate, reqval, req);
        },
        // 生成订单接口
        generate(submitDate, reqval, req) {
            let that = this;
            // log(req)
            // that.showLoading =false;
            // return false;
            that.$F.Response({
                url: "xiaochengxu/order/order_submit.php",
                param: reqval,
                success: res => {
                    if (res.code == 200) {
                        util.storage.removeItem("order_time_info");
                        util.storage.removeItem("order_tcps_time_info");
                        if(res.data.remind == 1){
                            let reqval2 = reqval;
                            reqval2.orderId = res.data.order_id;
                            that.$F.Response({
                                url: "xiaochengxu/order/order_submit_success.php",
                                param: reqval2,
                                success: res1 => {}
                            })
                        }
                        let payId = 0;
                        // 如果是支付包，跳转之前的支付页面
                        if (
                            util.functions.ifHaveFun(submitDate.payment_info) &&
                            util.functions.ifHaveFun(submitDate.payment_info.onlineList)
                        ) {
                            if (submitDate.payment_info.onlineList.length > 1) {
                                for (let i in submitDate.payment_info.onlineList) {
                                    if (that.payment_info_id == submitDate.payment_info.onlineList[i].id) {
                                        payId = submitDate.payment_info.onlineList[i].pay_id;
                                    }
                                }
                            } else if (submitDate.payment_info.onlineList.length == 1) {
                                payId = submitDate.payment_info.onlineList[0].pay_id;
                            }
                        }
                        that.$cookies.set("submitOrder_id", res.data.order_id);

                        // 支付成功页
                        if (res.data.isPay == 0) {
                            location.href = `/wap/sc_order_success.php?username=${that.$route.query.username}&orderid=${res.data.order_id}&wap=1`;
                            that.payBackTitle = that.cluesData.dingdanyitijiao;
                            that.payBackContent = that.cluesData.dianjichakan;
                            setTimeout(() => {
                                that.payBackStatus = true;
                                that.isPayStatus = false;
                            }, 1500);
                        } else {
                            var aliUrl = `/dom/sc_pay.php?username=${that.$route.query.username}&orderid=${res.data.order_id}&wap=1`;
                            if (payId == 12 || payId == 27) {
                                if (req.fq_num > 0) {
                                    aliUrl += `&fq_num=${req.fq_num}`;
                                }
                                if (util.functions.IsWX()) {
                                    aliUrl += `&showType=1&signId=${that.$cookies.get("zz_userid")}&signStr=${
                                        submitDate.signStr
                                    }`;
                                }
                            }
                            location.href = aliUrl;
                            setTimeout(() => {
                                that.payBackStatus = true;
                            }, 1500);
                        }
                    } else if (res.code == 3000000) {
                        util.storage.removeItem("order_time_info");
                        util.storage.removeItem("order_tcps_time_info");
                        that.showLoading = false;
                        //返回上一级
                        Hint.Alert({
                            message: res.msg
                        }).then(() => {
                            window.history.back();
                        });
                    } else {
                        that.showLoading = false;
                        Hint.Alert({
                            message: res.msg
                        }).then(() => {
                            // location.href = '/wap_shenyue.html'
                        });
                    }
                },
                error: err => {
                    that.showLoading = false;
                    Hint.Alert({
                        message: "请求失败"
                    }).then(() => {
                        // location.href = '/wap_shenyue.html'
                    });
                }
            });
        },
        // 验证登录密码接口
        // verifyPaymentPasswordFun(){
        //     let that = this;
        //     let paramJson={
        //         'username':that.$route.query.username,
        //         'zz_userid':that.$cookies.get("zz_userid")
        //     }
        //     verifyPaymentPassword().then(res=>{

        //     })
        // },
        // 色系接口
        getColorFun() {
            let that = this;
            getColor({ username: this.$route.query.username }).then(res => {
                // 调取颜色
                that.theme = util.functions.colorFun(res.color);
                // 这个是优化之后，直接取色系值
                that.newColor1 = util.functions.newColor(res.color).bgcColor1;
            });
        },
        // 拨打电话
        callPhone(e) {
            util.callPhone(e.currentTarget.dataset.phone);
        },
        // 酒店明细
        hotelClick() {
            let that = this;
            if (that.hotelStatus) {
                // if (isWho == "ali") {
                //     that.customHongbaoComponent.showCustom();
                // } else {
                //     that.selectComponent("#hotelId").showCustom();
                // }
            } else {
                that.closeHotel(1);
            }
            if (that.hotelStatus == false) {
                setTimeout(() => {
                    that.hotelStatus = !that.hotelStatus;
                }, 250);
            } else {
                that.hotelStatus = !that.hotelStatus;
            }
        },
        // 发票选择城市
        changeUserCity() {
            if (!util.functions.ifHaveFun(this.cityValue) || this.cityNum == 0) {
                this.$refs.cityRef.cityOne();
                this.cityNum++;
            }
            this.$refs.cityRef.showCity();
        },
        // 回显省市区
        passCityFun(city) {
            // 必须选到区才更新数据
            if (city == "") {
                return false;
            }
            this.cityValue = city;
        },
        // 切换门店配送和自提
        changeWayFun(type) {
            if (type == 0) {
                //门店配送
                this.community_show = 1;
                if (util.functions.ifHaveFun(this.reqVal.number)) {
                    this.submitDate.user_identity_info.number = this.reqVal.number;
                }
            } else {
                //自提
                this.community_show = 0;
            }
            let wirteInfo = this.getWiteInfo();
            this.changeWay = type;
            this.reqVal = JSON.parse(decodeURIComponent(wirteInfo));
            this.submitOrder(1);
        },
        // 购买门店
        buyWayFun() {
            this.submitStores(1);
        },
        closeHotel(type) {
            let that = this;
            // if (isWho == "ali") {
            //     that.customHongbaoComponent.maskClickHidden();
            // } else {
            //     that.selectComponent("#hotelId").maskClickHidden();
            // }
            if (type != 1) {
                setTimeout(() => {
                    that.hotelStatus = !that.hotelStatus;
                }, 250);
            }
            $("#div1").scroll(function() {
                nScrollHight = $(this)[0].scrollHeight;
                nScrollTop = $(this)[0].scrollTop;
                if (nScrollTop + nDivHight >= nScrollHight) alert("滚动条到底部了");
            });
        },
        // 自提名称和电话填写
        zitiInputFun(type, value) {
            if (type == 0) {
                //名称
                this.reservedName = value;
            } else if (type == 1) {
                //电话
                this.reservedTel = value;
            }
        },
        //判断是否为手机号的正则表达式
        phoneFun(phones) {
            var myreg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
            if (!myreg.test(phones)) {
                return false;
            } else {
                return true;
            }
        },
        // 将字符串根据=分开为数组
        getArrSecond(data) {
            return data.split("=");
        },
        /**
         * @description: 上传封面
         * @param {index，event，type, id} : {索引}, {获取的file对象}, {1：图片，2：文件} 
         * @return:
         */
        coverUpload(index, event, type,id) {
            let that = this,
                file = event.srcElement, //当前file对象
                files = file.files[0];
            if (type == 1) {
                if (files.type && !/png|jpeg|gif|jpg/.test(files.type.toLowerCase())) {
                    Hint.Msg({
                        message: that.submitDate.tips.jinzhichigeshi
                    });
                    return false;
                }
                if (files.size > 5242880) {
                    Hint.Msg({
                        message: that.submitDate.tips.jinzhichigeshi
                    });
                    return false;
                }
                that.picName = files.name;
            } else if (type == 2) {
                if (files.type && !/png|jpeg|gif|jpg|zip|rar|doc|docx/.test(files.type.toLowerCase())) {
                    Hint.Msg({
                        message: that.submitDate.tips.zhichiwenjianleixing
                    });
                    return false;
                }
                if (files.size > 5242880) {
                    Hint.Msg({
                        message: that.submitDate.tips.zhichiwenjianleixing
                    });
                    return false;
                }
                that.fileName = files.name;
            }
            this.showLoading = true;
            liveImgUpload(file).then(res => {
                this.showLoading = false;
                if (type == 1) {
                    // this.headImgSrc = res.path;
                    this.add_form_info[index].imgUrl = res.path;
                    this.headImgSrc[id] = {};
                    this.headImgSrc[id].name  = files.name;
                    this.headImgSrc[id].path  = res.path;
                } else if (type == 2) {
                }
                that.add_form_info[index].param_value = res.path;
            });
        },
        // 供应链无货商品弹窗按钮操作
        goOrderPage(type) {
            if (type == 0) {
                //收货地址  关闭商品无货弹窗
                this.noShopStatus = false;
            } else if (type == 1) {
                if (this.submitDate.sc_all_not_stock == 1) {
                    // 返回购物车
                    location.replace( "//" + document.domain + "/V/shoppingCat?username=" + this.$route.query.username);
                    util.storage.removeItem("order_time_info");
                    util.storage.removeItem("order_tcps_time_info");
                } else {
                    this.goOrderPageFun();
                }
            }else if(type == 2){
                util.storage.removeItem("order_time_info");
                util.storage.removeItem("order_tcps_time_info");
                window.history.back();
            }else if(type == 3){
                // 同城配送跳转页面
                let subMitJson = this.storageData();
                this.$router.push({
                    path: "/address/views/addressList",
                    query: {
                        is_set: 3,
                        orderstatus: 1,
                        subMitJson: subMitJson,
                        username: this.$route.query.username,
                        deliveryType:  "city"
                    }
                });
            }else if(type == 4){
                if (this.submitDate.delPro == 0) {
                    // 返回购物车
                    // location.replace( "//" + document.domain + "/V/shoppingCat?username=" + this.$route.query.username);
                    this.noShopStatus =false;
                } else {
                    this.goOrderPageFun();
                }
            }
        },
        goOrderPageFun(){
            //剔除无货商品
            let allArr = [],
                sc_not_buy_pro = JSON.parse(JSON.stringify(this.submitDate.sc_not_buy_pro)),
                allShop = this.submitDate.group_info;
            for (let i in allShop) {
                for (let j in allShop[i].pro_list) {
                    let json = {};
                    json.pro_id = allShop[i].pro_list[j].pro_id;
                    json.param_id = allShop[i].pro_list[j].param_id;
                    json.num = allShop[i].pro_list[j].pro_num;
                    allArr.push(json);
                }
            }
            if(this.submitDate.delPro == 1){//这是同城配送的判断
                sc_not_buy_pro = [];
                for(let i in this.tc_not_buy_pro){
                    sc_not_buy_pro = sc_not_buy_pro.concat(this.tc_not_buy_pro[i].pro_list)
                }
            }
            for (let i in sc_not_buy_pro) {
                for (let j in allArr) {
                    if (allArr[j].pro_id == sc_not_buy_pro[i].pro_id) {
                        allArr.splice(j, 1);
                    }
                }
            }
            let wirteInfo = this.getWiteInfo();
            wirteInfo = JSON.parse(decodeURIComponent(wirteInfo));
            wirteInfo.buy_now_param = allArr;
            if(this.submitDate.delPro == 1){
                this.tc_not_buy_pro = {};
            }
            this.reqVal = wirteInfo;
            this.noShopStatus = false;
            this.ifAgainAlert = 1;
            this.submitOrder(1);
        },
        //  进货价校验
        supplyChainCheck(val) {
            getJdProPriceCheck({
                evProIds: val,
                zz_userid: this.$cookies.get("zz_userid"),
                username: this.$route.query.username
            }).then(res => {});
        },
        // 供应链商品运费提示弹窗
        jdWarning() {
            this.payWayVal = 3;
            this.payWayFlg = true;
            this.ScreenFlg2 = true;
        },
        // 列表页只需要传入省获取地址编码
        getAddressCodingt2() {
            let supplyCity = this.$cookies.get("supplyCity"),
                supplyArr = [];
            if (this.$cookies.get("obtainStatus") == 1) {
                supplyArr = supplyCity[2];
            } else {
                supplyArr = util.functions.ifHaveFun(supplyCity[0])
                    ? supplyCity[0]
                    : util.functions.ifHaveFun(supplyCity[1])
                    ? supplyCity[1]
                    : util.functions.ifHaveFun(supplyCity[2])
                    ? supplyCity[2]
                    : "";
            }
            if (util.functions.ifHaveFun(supplyArr)) {
                supplyArr = supplyArr.split(" ")[0];
            }
            getJdAddressCode({
                address: supplyArr,
                username: this.$route.query.username,
            }).then(res => {
                this.$cookies.set("supplyCoding_address", res);
            });
        },
        // 跳转订单详情
        reloadFun() {
            if (util.functions.ifHaveFun(this.$cookies.get("submitOrder_id"))) {
                location.href = `/dom/sc_order_detail.php?username=${this.$route.query.username}&id=${this.$cookies.get(
                    "submitOrder_id"
                )}&wap=1`;
            } else {
                location.href = `/dom/sc_order.php?username=${this.$route.query.username}&wap=1`;
            }
        },
        //切换同城配送，到店自提
        changeNewWayFun(type,name){
            const that = this;
            that.newWayStatus = type;
            if(that.delNav.length == 1){
                return false;
            }
            let wirteInfo = that.getWiteInfo();
            let reqVal= JSON.parse(decodeURIComponent(wirteInfo));
            for(let i in that.delNav){
                if(that.delNav[i].type == name){
                    if(that.delNav[i].type == 'pickup'){
                        // that.aLocation = true;
                        if(!util.functions.ifHaveFun(that.$cookies.get("newOrderJson")) && that.$cookies.get("newOrderStatus") != 1){
                            // that.againNum = 0;
                            that.$refs.locationRef.getLocation();
                        }else{
                            that.getLocation();
                        }
                        break;
                    }else{
                        reqVal.deliveryType = name;
                        that.reqVal = reqVal;
                        that.submitOrder('',Number(type));
                    }
                    that.deliveryType = name;
                }
            }
        },
        
        // 通过获取位置信息请求接口(这个时候可能是已经同意授权，或者是拒绝授权，因为拒绝了授权不通过手机设置无法再次弹出授权弹窗)
        getLocation(){
            let wirteInfo = this.getWiteInfo(),reqVal= JSON.parse(decodeURIComponent(wirteInfo));
            if(util.functions.ifHaveFun(this.$cookies.get("newOrderJson"))){
                reqVal.lng = this.$cookies.get("newOrderJson").lng;
                reqVal.lat = this.$cookies.get("newOrderJson").lat;
            }else{
                reqVal.lng = '';
                reqVal.lat = '';
            }
            this.lngLat = {
                lng:reqVal.lng,
                lat:reqVal.lat
            };
            reqVal.deliveryType = 'pickup';
            this.deliveryType = 'pickup';
            this.reqVal = reqVal;
            this.submitOrder('',Number(this.newWayStatus));
        },
        //查看地图
        openDT(name,address,lng,lat){
            const that = this;
            let store = [];  
            store[0] = name;
            store[1] = address;
            store[2] = lng;
            store[3] = lat;
            if(navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1){
                let href = location.href;
                util.wechat.share(store, href, that.$route.query.username,2);
            }else{
                location.href = `http://api.map.baidu.com/marker?location=${lat},${lng}&title=${name}&content=${address}&output=html`;
                // location.href = `http://apis.map.qq.com/uri/v1/marker?marker=coord:${lng},${lat};addr:${address}`;
            }
        },
        // 微信分享
        shareFun() {
            let href = location.href;
            util.wechat.share(this.wxRegCallback, href, this.$route.query.username,1);
        },
    }
};
</script>
<style lang="scss">
@import "@/pages/order/assets/css/index.scss";
@import "@/pages/order/assets/css/color.scss";
</style>

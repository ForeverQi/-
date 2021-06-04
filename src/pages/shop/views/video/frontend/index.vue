<template>
    <div id="video" v-wechat-title="$route.meta.title= pageTitle" @touchstart="touchStart">
        <van-loading v-if="showLoading" size="50px" color="#1989fa"/>
        <!-- <van-overlay :show="showLoading"/> -->
        <div class="videoFather"  :style="{backgroundImage: 'url('+ 'https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoBgcImg.png'+ ')'}">
            <video  v-if="Object.keys(videoData).length > 0"  :webkit-playsinline="true" :playsinline="true"
                        :id="videoData[nowIndex].playId" class="video_box" loop x5-video-player-type="h5-page"
                        x5-video-player-fullscreen="true" preload="auto" 
                         autoplay :src="videoData[nowIndex].videoUrl"
                        :playOrPause="playOrPause"
                        :style="videoData[nowIndex].styles"
                    >
                        <!-- :style="{height:videoData[nowIndex].videoWHStatus == 1?videoData[nowIndex].videoHeight:''}" -->
            </video>
        </div>
        <swiper :options="swiperOption" v-if="Object.keys(videoData).length > 0" >
            <swiper-slide :class="guanggao_status == true ? 'swiper-no-swiping overflow_gao' : 'overflow_gao'"
                          v-for="(swiperItem,swiperIndex) in videoData"
                          @click.native="playVideoBtn(2)"
                          :key="swiperIndex">
                <!-- 顶部 -->
                <!-- <div class="swiperTop">
                    <div class="swiperTop_left">
                        <div class="swiperTop_leftBox">
                            <div class="swiperTop_left_img">
                                <img :src="swiperItem.companycn_info.logo" alt="头像">
                            </div>
                            <div class="swiperTop_left_text">
                                <span>{{swiperItem.companycn_info.name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="swiperTop_right" @click="goShopIndex">
                        <div class="swiperTop_right_box">
                            <img src="@/pages/shop/static/images/video/videoClose.png" alt="">
                        </div>
                    </div>
                </div> -->
                <img class="backPages" v-if="!shortVideoVersion" @click="backPages" src="http://hui-icon.s3.cn-north-1.jdcloud-oss.com/hyxxcx/pubpic/back_zuo.png" alt=""/>
                <div class="switchTop">
                    <span class="switchTop_left">推荐</span>
                    <span class="switchTop_right" @click.stop="stateClick(1), videoItem = swiperItem, videoIndex = swiperIndex">发现</span>
                </div>
                <!-- 中间 播放按钮-->
                <div :class="!playStatus ? 'swiperPlyer' : 'swiperPlyer swiperOpticy'"
                     @click.stop="playVideoBtn(1)">
                    <div class="swiperPlyer_box">
                        <!-- 播放 -->
                        <img class="playerImg" src="@/pages/shop/static/images/video/videoPlayer.png" alt="播放">
                        <!-- 暂停 -->
                        <!-- <img v-if="playStatus" class="suspendedImg" src="@/pages/shop/static/images/video/videoSuspended.png" alt="暂停"> -->
                    </div>
                </div>
                <!-- 封面 -->
               <!-- <div class="fenmian_cover" v-if="swiperItem.aleryPlay == 0">
                    <img :src="swiperItem.conver_origina" :class="swiperItem.fengmian == 1 ? 'imgWH' : ''" alt="">
                </div> -->
                <div class="fenmian_cover" v-if="swiperItem.aleryPlay == 0 && swiperItem.converloading == 1">
                    <img :src="swiperItem.conver_origina" :style="swiperItem.styles"/>
                    <!-- <img :src="swiperItem.conver_origina" :style="swiperItem.fengmian == 1 ? swiperItem.styles : 'width:100%;'" /> -->
                </div>
                <!-- 封面下的背景 -->
                <div class="beijing_cover" v-if="swiperItem.aleryPlay == 0">
                    <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoBgcImg.png" alt=""/>
                </div>

                <!-- 底部信息 -->
                <div class="swiperBottom">
                    <div class="swiperBottom_box">
                        <!-- 视频标题 -->
                        <div class="swiperBottom_box_top">
                            <span>{{swiperItem.title}}</span>
                        </div>
                        <!-- 操作按钮 -->
                        <div class="swiperBottom_box_center">
                            <!-- 左边广告 -->
                            <div class="swiperBottom_content_left">
                                <div v-if="swiperItem.poster_info != ''">
                                    <!-- 第一种广告(门店) -->
                                    <div class="advertising_first"
                                         v-if="swiperItem.poster_type == 2 && swiperItem.poster_info.length">
                                        <!-- <div class="advertising_first_left">
                                            <img :src="swiperItem.poster_info[0].poster_storepic" alt="商品缩略图">
                                        </div>
                                        <div class="advertising_first_right">
                                            <span>{{swiperItem.poster_info[0].poster_storename}}</span>
                                        </div> -->
                                        <div class="advertising_three_box" @click.stop="GgStatusClick(swiperIndex)">
                                            <div class="advertising_three_box_left">
                                                <img src="@/pages/shop/static/images/video/videoShopHome.png" alt="">
                                            </div>
                                            <div class="advertising_three_box_text">
                                                <span>{{swiperItem.poster_info[0].poster_storename}}</span>
                                            </div>
                                            <div class="advertising_three_box_right">
                                                <img src="@/pages/shop/static/images/video/videoHand.png" alt="">
                                            </div>
                                        </div>

                                        <!-- 广告1详情 -->
                                        <div v-if="swiperIndex == nowIndex">
                                            <div @click.stop :class="swiperItem.ggStatus == 1 ? 'advertising_first_detail blockGuanggao' : 'advertising_first_detail'">
                                                <div class="advertising_first_detail_img" >
                                                    <img :src="swiperItem.poster_info[0].poster_storepic" alt="商品图片">
                                                </div>

                                                <!-- 电话，地址 -->
                                                <div class="advertising_first_Info">
                                                    <div class="advertising_first_Info_title">
                                                        <span>{{swiperItem.poster_info[0].poster_storename}}</span>
                                                    </div>
                                                    <div class="advertising_first_Info_phone"
                                                        v-if="swiperItem.poster_info[0].poster_storetel != ''">

                                                        <div class="advertising_Info_phoneRight">
                                                            <a :href="'tel:'+swiperItem.poster_info[0].poster_storetel">
                                                                <span class="advertising_Info_padding">电话:</span>{{swiperItem.poster_info[0].poster_storetel}}
                                                            </a>
                                                            <div class="advertising_Info_phoneLeft">
                                                                <img src="@/pages/shop/static/images/video/videoPhone.png"
                                                                    alt="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="advertising_first_Info_location" @click.stop="getMyLocation">
                                                        <div style="position:relative;" >
                                                            <div class="advertising_first_Info_locationRight">
                                                                <span><span class="advertising_Info_padding">地址:</span>{{swiperItem.poster_info[0].poster_storeaddress}}</span>
                                                            </div>
                                                            <div class="advertising_first_Info_locationLeft" v-if="ifHaveFun(swiperItem.poster_info[0].poster_storelongitude)">
                                                                <img src="@/pages/shop/static/images/video/videoLocations.png" alt="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <!-- 第二种广告（商品） -->
                                    <div class="advertising_second" v-if="swiperItem.poster_type == 1 && swiperItem.poster_info != null">
                                        <div class="advertising_second_left">
                                            <div class="swiperSecond-num" :style="{background:bgcColor1}" v-if="swiperItem.listArr.length>1">{{swiperItem.listArr.length}}</div>
                                            <div class="advertising_second_leftBox" @click.stop="GgStatusClick(swiperIndex)">
                                                <van-swipe :autoplay="3000" :show-indicators="false" :loop="true" v-if="swiperItem.listArr.length>1"
                                                           vertical>
                                                    <van-swipe-item v-for="(itemList1,indexList1) in swiperItem.listArr"
                                                                    :key="indexList1">
                                                        <div class="advertising_second_children">
                                                            <div class="advertising_second_leftShop">
                                                                <img :src="itemList1.pro_pic" alt="">
                                                            </div>
                                                            <div class="advertising_second_rightShop">
                                                                <div class="advertising_left">
                                                                    <span>{{itemList1.pro_name}}</span>
                                                                </div>
                                                                <div class="advertising_right">
                                                                    <span>{{itemList1.pro_price_left}}<span style="font-size:0.2rem;">{{itemList1.pro_price_right}}</span></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </van-swipe-item>
                                                </van-swipe>
                                                <div class="advertising_second_children" v-if="swiperItem.listArr.length==1" @click.stop="swiperItem.listArr[0].is_show_car == 1 ? joinShopBtn(swiperItem.listArr[0].id,swiperItem.listArr[0].channel_id) :  goShopDetail(swiperItem.listArr[0].detail_link)">
                                                            <div class="advertising_second_leftShop">
                                                                <img :src="swiperItem.listArr[0].pro_pic" alt="">
                                                            </div>
                                                            <div class="advertising_second_rightShop">
                                                                <div class="advertising_left">
                                                                    <span>{{swiperItem.listArr[0].pro_name}}</span>
                                                                </div>
                                                                <div class="advertising_right">
                                                                    <span>{{swiperItem.listArr[0].pro_price_left}}<span style="font-size:0.2rem;">{{swiperItem.listArr[0].pro_price_right}}</span></span>
                                                                </div>
                                                            </div>
                                                            <div class="shopCart" v-if="swiperItem.listArr[0].is_show_car == 1">
                                                                <i class="sjzs-icon s-icon-shop-car-1"></i>
                                                            </div>
                                                        </div>
                                            </div>
                                            <!-- 只有一个广告 -->
                                            <div v-if="false && listShop == 1 && swiperItem.listArr.length == 1 && swiperIndex==nowIndex">
                                                <div :class="swiperItem.ggStatus == 1 ? 'advertising_second_oneBox blockGuanggao' : 'advertising_second_oneBox'">
                                                    <div class="advertising_second_one" @click.stop="goShopDetail(swiperItem.listArr[0].detail_link)">
                                                        <div class="advertising_second_one_left">
                                                            <img :src="swiperItem.listArr[0].pro_pic" alt="商品图片">
                                                        </div>
                                                        <div class="advertising_second_one_right" :style="{justifyContent:swiperItem.listArr[0] == 1 ? ' space-between' : ''}">
                                                            <div class="advertising_second_one_rightTitle">
                                                                <span :class="swiperItem.listArr[0].pro_tag == '' && swiperItem.listArr[0].pro_original_price_show == 0? 'dynamicBox' :'' ">{{swiperItem.listArr[0].pro_name}}</span>
                                                            </div>
                                                            <div class="advertising_second_one_rightIcon">
                                                                <span v-for="(itemLabel,indexLabel) in swiperItem.listArr[0].discount_label"
                                                                 :key="indexLabel">{{itemLabel}}</span>
                                                            </div>
                                                            <!-- 价格(没有pro_tag) -->
                                                            <div class="advertising_second_one_rightPrice"
                                                                 v-if="swiperItem.listArr[0].pro_tag == ''" :style="{marginBottom:swiperItem.listArr[0].pro_original_price_show == 0 ? 0 : ''}">
                                                                <!-- 有市场价 -->
                                                                <div v-if="swiperItem.listArr[0].pro_original_price_show == 1" class="advertising_second_one_rightPrice_children">
                                                                    <!-- 售价 -->
                                                                    <div class="xianPrice">
                                                                        <span>{{swiperItem.listArr[0].pro_price_left}}<span style="font-size:0.28rem;">{{swiperItem.listArr[0].pro_price_right}}</span></span>
                                                                    </div>
                                                                    <!-- 会员价,市场价等 -->
                                                                    <div class="membersPrice">
                                                                        <!-- 市场价 -->
                                                                        <div class="marketPrice">
                                                                            <span>{{swiperItem.listArr[0].pro_original_price}}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!-- 没有市场价 -->
                                                                <div v-if="swiperItem.listArr[0].pro_original_price_show == 0">
                                                                    <!-- 售价 -->
                                                                    <div class="xianPrice">
                                                                        <!-- <span>{{swiperItem.listArr[0].pro_price}}</span> -->
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- 价格(有pro_tag) -->
                                                            <div class="advertising_second_one_rightPrice"
                                                                 v-if="swiperItem.listArr[0].pro_tag != ''" :style="{ justifyContent: swiperItem.listArr[0].is_show_car == 1 ? 'flex-end' : '',flexWrap: swiperItem.listArr[0].is_show_car == 1 ? 'wrap' : '',marginTop:swiperItem.listArr[0].is_show_car == 1 ? '0.3rem' : '',marginBottom:swiperItem.listArr[0].is_show_car == 1 ? '0' : ''  }">
                                                                <!-- 有市场价 -->
                                                                <div v-if="swiperItem.listArr[0].pro_original_price_show == 1" class="advertising_second_one_rightPrice_children">
                                                                    <!-- 售价 -->
                                                                    <div class="xianPrice" style="font-weight: inherit;">
                                                                        <span>{{swiperItem.listArr[0].pro_original_price_left}}<span style="font-size:0.28rem;">{{swiperItem.listArr[0].pro_original_price_right}}</span></span>
                                                                    </div>
                                                                    <!-- 会员价,市场价等 -->
                                                                    <div class="membersPrice">
                                                                        <!-- 会员价等 -->
                                                                        <div class="membersPrice_all">
                                                                            <span class="membersPrice_all_left">{{swiperItem.listArr[0].pro_price}}</span>
                                                                            <div class="status_thrid_box"
                                                                                 v-if="swiperItem.listArr[0].pro_tag == '会员价' || swiperItem.listArr[0].pro_tag == '会员折扣'">
                                                                                <span>{{swiperItem.listArr[0].pro_tag}}</span>
                                                                            </div>
                                                                            <div class="status_thrid_box2" v-else>
                                                                                <span>{{swiperItem.listArr[0].pro_tag}}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="shopJoinCart" @click.stop="joinShopBtn(swiperItem.listArr[0].id,swiperItem.listArr[0].channel_id)" :style="{background:bgcColor1}" v-if=" swiperItem.listArr[0].is_show_car == 1">
                                                                    <i class="sjzs-icon s-icon-shop-car-1"></i>
                                                                </div>
                                                            </div>
                                                            <div class="advertising_three_content_linkBtn">
                                                                <!-- 售价 -->
                                                                <div class="xianPrice" v-if="swiperItem.listArr[0].pro_tag == '' && swiperItem.listArr[0].pro_original_price_show == 0">
                                                                    <span>{{swiperItem.listArr[0].pro_price_left}}<span style="font-size:0.28rem;">{{swiperItem.listArr[0].pro_price_right}}</span></span>
                                                                </div>
                                                                <div v-if="swiperItem.listArr[0].is_show_car == 1">
                                                                    <div v-if="!(swiperItem.listArr[0].pro_tag != '')" class="shopJoinCart" @click.stop="joinShopBtn(swiperItem.listArr[0].id,swiperItem.listArr[0].channel_id)" :style="{background:bgcColor1}" >
                                                                        <i class="sjzs-icon s-icon-shop-car-1"></i>
                                                                    </div>
                                                                </div>
                                                                <div v-else :style="{background:bgcColor1}" class="advertising_three_content_kankan"
                                                                    @click="goLinkShop(4,swiperItem.poster_info[0].href)">
                                                                    <span>立即购买</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- 有多个广告 -->
                                            <div v-if="listShop == 1 && swiperItem.listArr.length > 1 && swiperIndex==nowIndex">
                                                <div :class="swiperItem.ggStatus == 1 ? 'advertising_second_more blockGuanggao2' : 'advertising_second_more'">
                                                    <div class="advertising_second_more_box">
                                                        <div class="advertising_second_more_boxPre"
                                                             v-for="(itemList,indexList) in swiperItem.listArr" :key="indexList">
                                                            <div class="advertising_second_one"
                                                                 @click.stop="goShopDetail(itemList.detail_link)">
                                                                <div class="advertising_second_one_left">
                                                                    <img :src="itemList.pro_pic" alt="商品图片">
                                                                </div>
                                                                <div class="advertising_second_one_right" :style="{justifyContent: itemList.is_show_car == 1 ? ' space-between' : ''}">
                                                                    <div class="advertising_second_one_rightTitle">
                                                                        <span :class="itemList.pro_tag == '' && itemList.pro_original_price_show == 0 ? 'dynamicBox' :'' ">{{itemList.pro_name}}</span>
                                                                    </div>
                                                                    <!-- 价格(没有pro_tag) -->
                                                                    <div class="advertising_second_one_rightPrice"
                                                                         v-if="itemList.pro_tag == ''" :style="{marginBottom:itemList.pro_original_price_show == 0 ? 0 : ''}">
                                                                        <!-- 有市场价 -->
                                                                        <div v-if="itemList.pro_original_price_show == 1">
                                                                            <!-- 售价 -->
                                                                            <div class="xianPrice">
                                                                                <span>{{itemList.pro_price_left}}<span style="font-size:0.28rem;">{{itemList.pro_price_right}}</span></span>
                                                                            </div>
                                                                            <!-- 会员价,市场价等 -->
                                                                            <div class="membersPrice">
                                                                                <!-- 市场价 -->
                                                                                <div class="marketPrice">
                                                                                    <span>{{itemList.pro_original_price}}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!-- 没有市场价 -->
                                                                        <div v-if="itemList.pro_original_price_show == 0">
                                                                            <!-- 售价 -->
                                                                            <div class="xianPrice">
                                                                                <!-- <span></span> -->
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!-- 价格(有pro_tag) -->
                                                                    <div class="advertising_second_one_rightPrice"
                                                                         v-if="itemList.pro_tag != ''" :style="{justifyContent: itemList.is_show_car == 1 ? 'flex-end' : '',flexWrap: itemList.is_show_car == 1 ? 'wrap' : '',marginTop:itemList.is_show_car == 1 ? '0.76rem' : '',marginBottom:itemList.is_show_car == 1 ? '0' : ''  ,alignItems: itemList.is_show_car == 1 ? 'flex-end' : '' }">
                                                                        <!-- 有市场价 -->
                                                                        <div v-if="itemList.pro_original_price_show == 1" class="advertising_second_one_rightPrice_children">
                                                                            <!-- 售价 -->
                                                                            <div class="xianPrice" style="font-weight: inherit;">
                                                                                <span>{{itemList.pro_original_price_left}}<span style="font-size:0.28rem;">{{itemList.pro_original_price_right}}</span></span>
                                                                            </div>
                                                                            <!-- 会员价,市场价等 -->
                                                                            <div class="membersPrice">
                                                                                <!-- 会员价等 -->
                                                                                <div class="membersPrice_all">
                                                                                    <span class="membersPrice_all_left">{{itemList.pro_price}}</span>
                                                                                    <div class="status_thrid_box" v-if="itemList.pro_tag == '会员价' || itemList.pro_tag == '会员折扣'">{{itemList.pro_tag}}</div>
                                                                                    <div class="status_thrid_box2" v-else><span>{{itemList.pro_tag}}</span></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="shopJoinCart" @click.stop="joinShopBtn(itemList.id,itemList.channel_id)" v-if="itemList.is_show_car == 1" :style="{background:bgcColor1}">
                                                                            <i class="sjzs-icon s-icon-shop-car-1"></i>
                                                                        </div>
                                                                    </div>
                                                                    <div class="advertising_three_content_linkBtn" :style="{alignItems:itemList.is_show_car == 1 ? 'flex-end' : ''}">
                                                                        <!-- 售价 -->
                                                                            <div class="xianPrice" v-if="itemList.pro_tag == '' && itemList.pro_original_price_show == 0">
                                                                                <span>{{itemList.pro_price_left}}<span style="font-size:0.28rem;">{{itemList.pro_price_right}}</span></span>
                                                                            </div>
                                                                        <div v-if="itemList.is_show_car == 1" >
                                                                            <div v-if=" !(itemList.pro_tag != '')" class="shopJoinCart" @click.stop="joinShopBtn(itemList.id,itemList.channel_id)" :style="{background:bgcColor1}">
                                                                                <i class="sjzs-icon s-icon-shop-car-1"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div v-else class="advertising_three_content_kankan" :style="{background:bgcColor1}"
                                                                            @click="goLinkShop(4,swiperItem.poster_info[0].href)">
                                                                            <span>立即购买</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="fengeXian">
                                                                <div class="fengeXian_content"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 第四种广告,链接 -->
                                    <div class="advertising_three"
                                         v-if="swiperItem.poster_type == 4 && swiperItem.poster_info.length">
                                        <div class="advertising_three_box" @click.stop="GgStatusClick(swiperIndex)">
                                            <div class="advertising_three_box_left">
                                                <img src="@/pages/shop/static/images/video/videoLink.png" alt="">
                                            </div>
                                            <div class="advertising_three_box_text">
                                                <span>{{swiperItem.poster_info[0].title}}</span>
                                            </div>
                                            <div class="advertising_three_box_right">
                                                <img src="@/pages/shop/static/images/video/videoHand.png" alt="">
                                            </div>
                                            <div v-if="swiperIndex==nowIndex">
                                            <div :class="swiperItem.ggStatus == 1 ? 'advertising_three_content blockGuanggao' : 'advertising_three_content'" @click="goLinkShop(4,swiperItem.poster_info[0].href)">
                                                <div class="advertising_three_content_shopTitle">
                                                    <div class="advertising_three_content_left">
                                                        <img :src="swiperItem.poster_info[0].pic" alt="商品图片">
                                                    </div>
                                                    <div class="advertising_three_content_right">
                                                        <div class="advertising_three_content_rightTitle">
                                                            <span>{{swiperItem.poster_info[0].title}}</span>
                                                        </div>
                                                        <div class="advertising_three_content_rightText">
                                                            <span>{{swiperItem.poster_info[0].brief}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="advertising_three_content_kankan">
                                                    <span>去看看</span>
                                                </div>
</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 第三种广告，二维码 -->
                                    <div class="advertising_four"
                                         v-if="swiperItem.poster_type == 3 && swiperItem.poster_info.length">
                                        <div class="advertising_three_box" @click.stop="myMaClick(swiperIndex)">
                                            <div class="advertising_three_box_left">
                                                <img src="@/pages/shop/static/images/video/videoCode.png" alt="">
                                            </div>

                                            <div class="advertising_three_box_text">
                                                <span>{{swiperItem.poster_info[0].title}}</span>
                                            </div>
                                            <div class="advertising_three_box_right">
                                                <img src="@/pages/shop/static/images/video/videoHand.png" alt="">
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <!-- 右边分享收藏 -->
                            <div class="swiperBottom_content_right">
                                <!-- 头像 -->
                                <div class="swiperBottom_content_rightMore swiperBottom_common" @click.stop="stateClick(4), videoItem = swiperItem, videoIndex = swiperIndex">
                                   <div class="swiperBottom_content_rightMore_box">
                                   <img :src="swiperItem.companycn_info.logo" alt="头像"/>
                                   </div>
                                   <!-- 加号 -->
                                   <!-- <div class="swiperBottom_content_rightMore_jia">
                                       <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/video_headpic.png" alt="">
                                   </div> -->
                                </div>
                                <!-- 收藏 -->
                                <div class="swiperBottom_content_rightCollection swiperBottom_common"
                                     @click.stop="heartClick(swiperIndex)">
                                     <div class="icon_shadow"></div>
                                    <i class="iconfont icon-shoucang icon_right"
                                       :class="swiperItem.zhanStatus==1?'fabulous_active':''"></i>
                                       <span style="height:0.3rem;"><span v-if="swiperItem.like_num_show!=0">{{swiperItem.like_num_show}}</span></span>
                                       <!-- <span style="height:0.3rem;"><span>3.21w</span></span> -->
                                    <!-- 点赞数 -->
                                    <!-- <div class="zanNumber"  v-if="swiperItem.like_num_show!=0">
                                        <span>{{swiperItem.like_num_show}}</span>
                                    </div> -->
                                </div>
                                <!-- 分享 -->
                                <div class="swiperBottom_content_rightShare swiperBottom_common"
                                     @click.stop="stateClick(2,swiperItem.id), videoItem = swiperItem">
                                    <img src="@/pages/shop/static/images/video/videoShare.png" alt="分享">
                                </div>
                            </div>
                            
                        </div>
                        <!-- 下一个 -->
                        <div class="swiperBottom_box_bottom" >
                            <img class="swiperBottom_box_bottom_img" v-if="swiperItem.next_video_id>0 && videoData.length >=2" src="@/pages/shop/static/images/video/videoNext.png" alt="下一个">
                        </div>
                    </div>
                </div>
                <!-- 蒙版 -->
                <div class="advertising_mengban" v-if="swiperItem.poster_type == 3 && swiperItem.ggStatus == 1 && swiperIndex==nowIndex" @click.stop="myMaClickClose"></div>
                <!-- 遮罩层，用来点击关闭广告 -->
                <div class="advertising_mengban advertising_mengban2" v-if="erWeiMaStatus2"
                     @click.stop="myMaClickClose2"></div>
                <!--二维码广告弹窗  -->
                <div class="advertising_four_card" @click.stop v-if="swiperItem.poster_type == 3 && swiperItem.ggStatus == 1 && swiperIndex==nowIndex">
                <!-- <div class="advertising_four_card" @click.stop v-if="false"> -->
                    <div class="advertising_four_card_title">
                        <span>{{videoData[swiperIndex].poster_info[0].title}}</span>
                    </div>
                    <div class="advertising_four_card_content">
                        <span>{{videoData[swiperIndex].poster_info[0].brief}}</span>
                    </div>
                    <div class="advertising_four_card_ma">
                        <div class="advertising_four_card_maBox">
                            <img :src="videoData[swiperIndex].poster_info[0].pic" alt="二维码"/>
                        </div>
                        <span>长按识别二维码</span>
                    </div>
                    <div class="advertising_four_card_closeImg" @click.stop="myMaClickClose">
                        <img src="@/pages/shop/static/images/video/videoGuangClose.png" alt="">
                    </div>
                </div>
                <!-- 代理商弹出框 -->
                <div class="dailishang" v-if="dailiPop && swiperIndex==nowIndex" @click="dailiPop = !dailiPop">
                    <div class="dailishangBox" @click.stop>
                        <div class="dailishangBox_title">
                            <img :src="swiperItem.companycn_info.logo" alt=""/>
                        </div>
                        <div class="dailishangBox_content" >
                            <span>{{swiperItem.companycn_info.name}}</span>
                            <div v-if="swiperItem.companycn_info.tel != ''">
                                <a :href="'tel:'+swiperItem.companycn_info.tel">{{swiperItem.companycn_info.tel}}</a>
                                <a :href="'tel:'+swiperItem.companycn_info.tel" class="boda">拨打</a>
                            </div>
                        </div>
                        <div class="advertising_four_card_closeImg" @click.stop="dailiPop = !dailiPop">
                                <img src="@/pages/shop/static/images/video/videoGuangClose.png" alt="">
                            </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
        <div class="container_bottom">
            <div class="border_progress" :style="'width:'+videoProcess+'%'"></div>
        </div>
        <!-- 分享内容 -->
        <div :class="shareContent ? 'shareContet blockGuanggao2' : 'shareContet'">
            <div class="shareContet_box">
                <div class="shareContet_box_top">
                    <div class="shareContet_box_top_title">
                        <span>分享</span>
                    </div>
                    <div class="shareContet_box_top_operation">
                        <!-- 发送给朋友 -->
                        <div :class="winxinIcon ? 'shareContet_box_top_operation_cnt nowWeixin' : 'shareContet_box_top_operation_cnt'"
                             v-for="(shareItem,shareIndex) in shareList" :key="shareIndex">
                            <!-- 分享给好友 -->
                            <img v-if="shareItem.type == 4 && winxinIcon" @click.stop="shareFriend"
                                 src="@/pages/shop/static/images/video/videoShateWeixin.png" alt="">
                            <!-- 分享海报 -->
                            <img v-if="shareItem.type == 1" @click.stop="sharePostersClick"
                                 src="@/pages/shop/static/images/video/videoSharePic.png" alt="">
                            <!-- 复制链接 -->
                            <img v-if="shareItem.type == 2" v-clipboard:copy="shareLink" v-clipboard:success="onCopyUrl"
                                 v-clipboard:error="onErrorUrl"
                                 src="@/pages/shop/static/images/video/videoShareLink.png" alt="">
                            <span v-if="shareItem.type == 1 || shareItem.type == 2">{{shareItem.typeNote}}</span>
                            <span v-if="shareItem.type == 4 && winxinIcon">{{shareItem.typeNote}}</span>
                        </div>
                    </div>
                </div>
                <div class="shareContet_box_bottom" @click.stop="stateClick(3)">
                    <span>取消</span>
                </div>
            </div>
        </div>

        <!-- 发送给朋友 -->
        <div class="sahreFriends" v-if="shareIns" @click.stop="shareInsClick">
            <div class="sahreFriends_box">
                <!-- 文字 -->
                <div class="sahreFriends_box_content">
                    <span>点击右上角,选择<span style="color:#FF8125">"发送给朋友"</span>将短视频分享给您的好友</span>
                </div>
                <!-- 指向分享的图片 -->
                <div class="sahreFriends_box_shareImg">
                    <img src="@/pages/shop/static/images/video/videoJiantou.png" alt="">
                </div>
            </div>
        </div>
        <!-- 海报 -->
        <div class="sharePosters" v-if="sharePostersStatus" @click.stop="sharePostersClose">
            <div class="sharePosters_box">
                <div class="sharePosters_box_all">
                    <div class="sharePosters_box_img" @click.stop>
                        <img :src="wapImg" alt="">
                    </div>
                    <div class="sharePosters_box_text" @click.stop>
                        <img src="@/pages/shop/static/images/video/postersImg.png" alt="">
                    </div>

                    <!-- 关闭按钮 -->
                    <div class="sharePosters_box_guanbi" @click.stop="sharePostersClose">
                        <span>关闭</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 登录 -->
        <div class="denglu" v-if="dengluStatus">
            <div class="denglu_img" @click.stop="closeDengluBtn">
                <img src="@/pages/shop/static/images/video/videoDengluclose.png" alt="">
            </div>
                <div class="denglu_up">您还没有登录哦</div>
                <div class="denglu_down">请登录后再进行分享/点赞</div>
                <div class="denglu_btn" @click.stop="dengluBtn">
                    <span>去登录</span>
                </div>
        </div>

       

        <!-- ./ 商家助手后台操作按钮 -->
        <actions v-if="$store.getters.variables.many.ShopVideoBacActions" :data="{item: videoItem, index: videoIndex}" />
        <share v-if="$store.getters.variables.many.ShopVideoBacShare" :data="{item: videoItem, index: videoIndex}" />
        <poster v-if="$store.getters.variables.many.ShopVideoBacPoster" :data="{item: videoItem, index: videoIndex}" />

        <!-- 购买组件 -->
        <BuyAlert :allData="buyAlertData" ref="buyAlertRef" v-if="buyStatus"/>
    </div>
</template>

<script>
    import {Dialog} from 'vant';
    import {Toast} from 'vant';

    //提交订单接口,提交订单红包列表,门店配送,上传图片接口,发票列表,色系,支付密码
    import {getColor,} from "@/api/order/submitOrder.js";

    import "swiper/dist/css/swiper.css";
    import {swiper, swiperSlide} from "vue-awesome-swiper";

    // 视频详情
    import {videoDetail} from "@/api/shop/video.frontend"
    // 真实视频地址
    import {videoDetailReally} from '@/api/shop/video.frontend'
    // 海报分享
    import {videoDetailShare} from "@/api/shop/video.frontend"
    // 分享记录
    import {videojiLuShare} from "@/api/shop/video.frontend"
    // 点赞
    import {videoDetailZhan} from "@/api/shop/video.frontend"
    // 浏览记录
    import {browsingHistory} from "@/api/shop/video.frontend"
    // 流量验证
    import {shortVideo} from "@/api/shop/video.frontend"
    // 流量记录
    import {juluVideo} from "@/api/shop/video.frontend"
    // 微信自动登录
    import{weixinLogin} from "@/api/shop/video.frontend"
    // 购买组件
    import BuyAlert from "@/components/buyAlert/buyAlert.vue"

    import util from '@/libs/util'


    (function() {
        if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
            handleFontSize();
        } else {
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
            } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", handleFontSize);
                document.attachEvent("onWeixinJSBridgeReady", handleFontSize);  }
        }
        function handleFontSize() {
            // 设置网页字体为默认大小
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
            // 重写设置网页字体大小的事件
            WeixinJSBridge.on('menu:setfont', function() {
                WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
            });
        }
    })();

    let videoProcessInterval;
    export default {
        name: "index",
        components: {
            swiper,
            swiperSlide,
            [Dialog.Component.name]: Dialog.Component,
            // 商家助手后台操作按钮
            actions: () => import("./actions"),
            // 商家助手后台分享
            share: () => import("./share"),
            // 商家助手后台分享海报
            poster: () => import("./poster"),
            BuyAlert
        },
        data() {
            let that = this
            return {
                buyStatus:false,
                buyAlertData:{},
                dailiPop:false,
                // 分享参数
                videoItem: {},
                activeIndex:0,
                // 当前视频索引
                videoIndex: 0,
                list: [{}, {}],
                swiperOption: {
                    direction: 'vertical',
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    on: {
                        slideChangeTransitionEnd: function () {
                            that.activeIndex = this.realIndex
                            // // 切换结束时，告诉我现在是第几个slide
                            that.onChange(this.realIndex)

                        }
                    },
                    navigation: {
                        // nextEl: '.swiperBottom_box_bottom_img'
                    }
                },
                playStatus: false,
                erWeiMaStatus: false,
                // 发送给朋友
                shareIns: false,
                // 分享海报
                sharePostersStatus: false,
                heartStatus: false,
                videoPlayState: 0,
                player: '',
                // 加载层
                showLoading: true,

                // 总数据
                videoData: [],
                activeTitle: 1,
                videoXian: true,

                // 三秒之后广告显示
                guanggao_status: false,

                listShop: 0,
                listArr: [],
                // 是否有下一个
                nextVideo: 1,
                setTimer: '',
                setTimerMa: '',
                // 分享弹窗
                shareContent: false,
                video_id: 1,

                // 判断点击暂停的次数
                parseNum: 1,

                // 视频列表
                videoDetailList: [{}],
                videoDataArr: [],
                videoDetailIndex: 0,
                swiperIndex: 0,
                listIndexNum: -1,
                requestIndex: 0,

                // 当前点击的index
                nowIndex: 0,

                // 分享海报的图片链接
                wapImg: '',
                // 视频详情的链接
                shareLink: '',

                playOrPause: true,
                current: 0,
                videoProcess: 0,//视频播放进度
                shareList: 0,
                // 分享朋友微信下显示
                winxinIcon: false,
                videoUrl: '',
                shareWeixin: 0,
                shareInfo: '',

                // 遮罩层（关闭广告）
                erWeiMaStatus2: false,
                dengluStatus:false,
                zz_userid:0,
                pageTitle:'',
                countNum:0,
                httpData:location.protocol+'//',
                locationData:1,
                fenxiao_code:'',
                fenxiao_mid:'',
                imgWHStatus:0,
                winW:0,
                winH:0,
                auto_login:false,
                shortVideoVersion:0,
                search_title_val: '',
                class_id_val: -1,
            }
        },
        computed: {},
        destroyed(){
            this.$cookies.set('ios_locationUrl',0);
        },
        created() {
            let thisS = this;
            // 商家助手app
            if (util.app.Platform()) {
                // 回显
                thisS.$EventBus.$on('UpdateList', (res) => {
                    for (let index in res.data) {
                        thisS.videoData[res.index][index] = res.data[index];
                    }
                });

                // 标注商家助手后台
                util.variable.Set({
                    key: "IsShopBackend",
                    val: true
                });

                // 隐藏商家助手app底部菜单
                util.app.Shop.ShowFooterMenu(0);
            }else{//非商家助手  而且是在安卓中
                if(thisS.$cookies.get("is_app") == 1 && thisS.$cookies.get("ios") != 1){
                    window.android.updateRefreshType(-1);
                }
            }
        },
        mounted() {
            let that = this,id = that.$route.query.id,userId = that.$cookies.get("zz_userid")
            // 调取颜色
            that.getColorFun();
            // 判断是否在微信里
            let isWeiXin = () => {
                return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
            }
            if (isWeiXin()) {
                that.winxinIcon = true
                this.$cookies.set('videoGoKey','0')//用来判断从详情页跳转到列表页，列表页返回直接回首页
            } else {
                that.winxinIcon = false
            }
            let member_id = "",code="";
            if(that.ifHaveFun(that.$route.query.member_id) === true){
                member_id = that.$route.query.member_id
            }
            if(that.ifHaveFun(that.$route.query.code) === true){
                code = that.$route.query.code
            }
            // 判断是否需要绑定上下级
            if(that.ifHaveFun(that.$route.query.member_id) === true && that.ifHaveFun(that.$route.query.code) === true){
                that.$cookies.set('member_id',member_id+'###'+code,3600*24*14)
            }
            weixinLogin(
                {
                    username: that.$route.query.username,
                    id: id,
                    real_host: location.host,
                    member_id: member_id,
                    code: code
                }
            ).then(res1 => {
                if((that.ifHaveFun(that.$route.query.class_id) || that.$route.query.class_id == 0)){
                    that.class_id_val = that.$route.query.class_id;
                }
                // 不需要登录
                if(res1.auto_login == 0){
                    this.auto_login = true
                    that.shortVideoFun(id,1)
                }else{
                    if(that.winxinIcon == true && that.ifHaveFun(userId) === false){
                        if(res1.wxOauthUrl!=''){
                            location.href=res1.wxOauthUrl
                        }
                        setTimeout(function(){
                            that.shortVideoFun(id,1)
                        },1000)
                    }else{
                        that.shortVideoFun(id,1)
                    }
                }
            })
        },
        methods: {

            onChange(index) {
                let that = this;
                // 代理商模板弹窗
                that.dailiPop = false
                that.shareContent = false
                that.locationData = 1
                index = that.activeIndex
                that.parseNum = 2
                that.erWeiMaStatus2 = false
                // 加载动画
                that.showLoading = true
                // 禁止滑动，一秒之后可以滑动
                that.guanggao_status = true

                setTimeout(function () {
                    that.guanggao_status = false
                }, 500)
                //改变的时候 暂停当前播放的视频
                clearInterval(videoProcessInterval)
                this.videoProcess = 0;
                // 分享时的id
                this.video_id = that.videoData[index].id
                
                // 判断是否需要绑定上下级
                if(that.ifHaveFun(that.fenxiao_mid) === true &&  that.ifHaveFun(that.fenxiao_code) === true){
                    that.$router.push({
                        path: that.$route.path,
                        query: {
                            username: that.$route.query.username,
                            id: that.video_id,
                            member_id:that.fenxiao_mid,
                            code:that.fenxiao_code
                        }
                    })
                }else{
                    that.$router.push({
                        path: that.$route.path,
                        query: {
                            username: that.$route.query.username,
                            id: that.video_id
                        }
                    })
                }
                // title
                this.pageTitle = that.videoData[index].title
                let video = document.querySelectorAll('video')[0]
                video.pause()
                video.currentTime = 0
                that.current = index;
                that.browsingFun(that.videoData[index].id)
                // 上一个大于当前的
                if (that.nowIndex > index) {
                    if(that.videoData[index + 1].zhanStatus != that.videoData[index + 1].user_likes){
                    // that.zhanFun(that.videoData[index + 1].zhanStatus, that.videoData[index + 1].id)
                    }
                    // 浏览记录接口
                    // that.browsingFun(that.videoData[index + 1].id)
                } else {//上一个小于当前的
                if(that.videoData[index - 1].zhanStatus != that.videoData[index - 1].user_likes){
                    // that.zhanFun(that.videoData[index - 1].zhanStatus, that.videoData[index - 1].id)
                }
                    if(index!=1){
                        // that.browsingFun(that.videoData[index - 1].id)
                    }
                }
                for(let i=0; i<that.videoData.length; i++){
                    that.videoData[i].aleryPlay = 0
                }

                that.nowIndex = parseInt(index)
                // 显示暂停按钮
                that.playStatus = false
                that.videoPlayState = 0
                // 广告隐藏
                that.videoData[index].ggStatus = 0
                that.erWeiMaStatus = false
                // 商品列表
                that.listShop = 0
                // 清除定时器
                clearTimeout(that.setTimer)
                // 清除二维码的定时器
                clearTimeout(that.setTimerMa)
                // 微信分享
                that.shareFun()

                // 切换结束时，告诉我现在是第几个slide
                if (index == that.videoData.length - 1) {
                    // if (that.listIndexNum == that.videoData[index].id) {
                    //     return false;
                    // }
                    // 2条数据最后一个的id
                    that.activeTitle = that.videoData[index].id
                    that.touchEndFun(index)
                    // that.listIndexNum = that.videoData[index].id
                }
                    if (that.videoData[that.nowIndex].poster_type == 1 && that.videoData[that.nowIndex].listArr.length == 0) {
                        that.listFun(that.videoData[that.nowIndex].poster_info,that.video_id)
                    }else{
                        that.listShop = 1
                    }
                    video.play();
                    that.countNum = 0
                    let countNum = that.countNum
                    // 实时监听video播放状态
                    let autoPlay = function(){
                        // let timeDisplay = Math.floor(video.currentTime);
                        if(video.currentTime!=0 && video.currentTime!=0.001){
                            that.videoData[index].aleryPlay = 1
                            that.playStatus = true
                            that.showLoading = false
                            that.countNum = countNum++
                            if(countNum == 1){
                                //让广告显示
                                that.guanggaoFun()
                                // 流量记录
                                that.juluVideoFun()
                            }
                            video.removeEventListener("timeupdate",autoPlay)
                            // 播放进度条
                            videoProcessInterval = setInterval(() => {
                                that.changeProcess(video)
                            }, 100)
                            
                        }
                    }
                    // 实时监听video播放状态会记录之前的index
                    video.addEventListener("timeupdate",autoPlay)
                    setTimeout(function(){
                        that.showLoading = false
                    },3000)
            },

            // 微信分享
            shareFun() {
                let href = location.href
                util.wechat.share(this.wxRegCallback, href, this.$route.query.username,1)
            },

            // 流量验证接口
            shortVideoFun(id,type){
                if (util.app.Platform()) {
                    // APP端 后台不需要验证流量
                    return false;
                }
                shortVideo(
                    {
                        username: this.$route.query.username,
                    }
                ).then(res => {
                    this.videoDetails(id, type)
                }).catch(res =>{
                    Toast(res.msg);
                    setTimeout(function(){
                        location.href=res.index_url
                    },2000)
                })
            },

            /**
             * 视频详情接口
             * @param id [视频id]
             * @param type [判断参数]
             */
            videoDetails(id, type) {
                let that = this
                if (this.requestIndex = 0) {

                    that.showLoading = true
                    that.loading = true
                }

                let not_publish = 0;
                if (util.app.Platform()) {
                    not_publish = 1;
                }
                let zz_code = that.$cookies.get("zz_shellCode")
                let zz_id = that.$cookies.get("zz_userid")
                
                let videoJson ={
                    username: that.$route.query.username,
                    id: id,
                    not_publish,
                    real_host: location.host,
                    zz_shellCode:zz_code,
                    zz_userid:zz_id
                }
                if(that.ifHaveFun(that.$route.query.search_title)){
                    videoJson.search_title = that.$route.query.search_title
                    that.search_title_val =  that.$route.query.search_title
                }else{
                    if((that.ifHaveFun(that.class_id_val) || that.class_id_val == 0) && that.class_id_val != -1){
                        videoJson.class_id = that.class_id_val;
                    }
                }
                
                videoDetail(
                    videoJson
                ).then(res => {
                    // 关闭加载层
                    that.showLoading = false
                    that.loading = false
                    
                    that.requestIndex = 1
                    let allVideoData = res
                    if(type == 1){
                        // 浏览记录接口
                        that.browsingFun(allVideoData[0].id)
                        that.pageTitle = allVideoData[0].title
                        that.shortVideoVersion = allVideoData[0].shortVideoVersion
                        let member_id = that.ifHaveFun(allVideoData[0].fenxiao_mid)
                        let code = that.ifHaveFun(allVideoData[0].fenxiao_code)
                        // 判断是否需要绑定上下级
                        if(member_id === true && code === true){
                            that.fenxiao_mid = allVideoData[0].fenxiao_mid
                            that.fenxiao_code = allVideoData[0].fenxiao_code

                            if(util.functions.appSource == 'andriod'){
                                that.$router.push({
                                    path: that.$route.path,
                                        query: {
                                            username: that.$route.query.username,
                                            id: allVideoData[0].id,
                                            member_id:that.fenxiao_mid,
                                            code:that.fenxiao_code
                                        }
                                })
                            }else{
                                // let locationUrl = location.protocol+'//'+location.host+location.pathname+`?username=${that.$route.query.username}&id=${allVideoData[0].id}&member_id=${that.fenxiao_mid}&code=${that.fenxiao_code}`
                                let locationUrl = location.href;
                                if(that.$cookies.get("ios_locationUrl") != 1){
                                    window.location.href = locationUrl;
                                }
                                that.$cookies.set('ios_locationUrl',1);
                            }
                        }
                        that.shareFun()
                        
                    }
                    // 如果有广告
                    if(allVideoData[0].poster_type > 0 && this.parseNum == 1){
                        if(allVideoData[0].poster_type == 1){
                            that.listFun(allVideoData[0].poster_info,id)
                        }
                    }
                    let user_id = that.$cookies.get("zz_userid");
                    let localVideoList = util.storage.getItem('duanVideoList')
                    this.winW = $("#video").width()
                    this.winH = $("#video").height()

                    
                    // 添加视频播放id
                    for (let i = 0; i < allVideoData.length; i++) {
                        // 视频id
                        allVideoData[i].playId = 'player' + allVideoData[i].id
                        // 判断该视频是否加载了
                        allVideoData[i].aleryPlay = 0
                        // 广告显示状态
                        allVideoData[i].ggStatus = 0
                        // 判断图片的长宽比
                        allVideoData[i].fengmian=0
                         allVideoData[i].converloading = 0
                         allVideoData[i].listArr = []

                        // allVideoData[i].conver_origina = allVideoData[i].conver_origina+`?x-oss-process=image/resize,m_mfit,h_${winH},w_${winW},limit_0`;
                        
                        // if(allVideoData[i].conver_width >= allVideoData[i].conver_height){
                        //     allVideoData[i].fengmian=1
                        // }
                        let member_id2 = that.ifHaveFun(allVideoData[i].fenxiao_mid)
                        let code2 = that.ifHaveFun(allVideoData[i].fenxiao_code)
                        
                        if(member_id2 === true && code2 === true){
                            that.fenxiao_mid = member_id2
                            that.fenxiao_code = code2
                        }
                        // 点赞数
                        if(that.ifHaveFun(user_id)=== true && that.ifHaveFun(member_id2)=== true){
                            if(allVideoData[i].user_likes == 1){
                                allVideoData[i].zhanStatus = 1
                            }else{
                                allVideoData[i].zhanStatus = 0
                            }
                            }else{//非登录状态
                                if(!localVideoList){
                                    allVideoData[i].zhanStatus = 0
                                }else{
                                    allVideoData[i].zhanStatus = 0
                                    allVideoData[i].user_likes = 0
                                    for(let j=0; j<localVideoList.length;j++){
                                        if(localVideoList[j].username == that.$route.query.username){
                                            if(localVideoList[j].id == allVideoData[i].id){
                                                allVideoData[i].zhanStatus = 1
                                                allVideoData[i].user_likes = 1
                                            }
                                        }
                                    }
                                }
                            }
                        that.videoData.push(allVideoData[i])
                    }
                    var x = that.videoData.length;//测试的数字
                    var y = String(x).indexOf(".") + 1;//获取小数点的位置
                    var count = String(x).length - y;//获取小数点后的个数
                    if (count > 0) {
                        for (let i = 1; i < 3; i++) {
                            // 请求视频地址接口
                            setTimeout(function(){
                                var v = that.videoData[that.videoData.length - i];
                                that.videoDetailsReally(v, that.videoData.length - i, type)
                            },300)
                        }
                    } else {
                        for (let i = 1; i < 3; i++) {
                            // 请求视频地址接口
                            var v = that.videoData[that.videoData.length - i];
                            that.videoDetailsReally(v)
                        }
                    }
                }).catch(res1=>{
                    if(res1.noChannel&&res1.noChannel == 1){
                        this.$router.replace({
                            path:'/shop/video/videoNoData',
                            
                        })
                    }
                })
            },

            // 视频地址
            videoDetailsReally(v, index, type) {
                let that = this
                let id = 0;
                util.variable.AxiosErrorPopup = false;
                videoDetailReally({
                    username: that.$route.query.username,
                    play_id: v.video_id,
                    video_id: v.id,
                    app: util.app.Platform()
                }).then(res => {
                    // 关闭加载层
                    that.showLoading = false
                    that.loading = false
                    v.videoUrl = res.url
                       //  通过阿里云裁剪后设置宽高
                    //    let img_url = v.conver_origina;
                    let img = new Image();
                    //    img.src = img_url
                       img.onload = function(){
                           let imgW = img.width,
                               imgH = img.height;
                                if(imgW > imgH){
                                    v.conver_origina = v.conver_origina + `?x-oss-process=image/resize,fim_lfit,h_${that.winH},w_${that.winW},limit_0`;
                                }else{
                                    v.conver_origina = v.conver_origina + `?x-oss-process=image/resize,m_mfit,h_${that.winH},w_${that.winW},limit_0`;
                                }
                               if(imgW/imgH == res.width / res.height){
                                   v.fengmian = 1
                               }else{
                                   v.fengmian = 0
                               }
                                   v.converloading = 1
                       }
                       img.src = v.conver_origina;
                    let proportion =  that.winW / that.winH;
                   if(res.width / res.height >= 0.75 ){
                       v.styles = {width: '100%'}
                    }else{
                        if((res.width / res.height) <= proportion){
                            v.styles = {width: '100%'}
                        }else{
                            v.styles = {height: '100%'}
                        } 
                    }
                }).catch(res => {
                    that.videoData.splice(index, 1)
                })
            },
            getPointNum(num,n){  
                let str = String(num);
                let index = str.indexOf(".");
                let str1 = str.substring(0,index+n+1);
                str1 = Number(str1);
                return str1;
            },

            // 商品列表接口
            listFun(json,id) {
                let jsonValue = json
                if(jsonValue == null){
                    return false;
                }
                jsonValue.username = this.$route.query.username,
                jsonValue.type = 14,
                jsonValue.front = 1,
                jsonValue.sv_id = id;
                let that = this
                this.$F.Response({
                    url: "mallorder/api/short_video_pro_list.php",
                    param: jsonValue,
                    success: res => {
                        // let res = JSON.parse(res)
                        if (res.code == 200) {
                            this.listShop = 1
                            if (res.data.pro_list.length > 3) {
                                this.listArr = res.data.pro_list.slice(0, 3)
                            } else {
                                this.listArr = res.data.pro_list
                            }
                            for(let i=0; i<this.listArr.length;i++){
                                if(this.listArr[i].pro_price != ''){
                                    let symbol = this.listArr[i].pro_price.substr(0,1)
                                    let val = this.listArr[i].pro_price.substr(1,this.listArr[i].pro_price.length-1) 
                                    let val_left = val.substring(0, val.indexOf("."))
                                    let val_right = val.replace(/\d+\.(\d*)/, '$1')
                                    if(val_left != ''){
                                        this.listArr[i].pro_price_left = symbol + val_left+'.'
                                        this.listArr[i].pro_price_right = val_right
                                    }else{
                                        this.listArr[i].pro_price_left = this.listArr[i].pro_price
                                        this.listArr[i].pro_price_right = ''
                                    }
                                }
                                if(this.listArr[i].pro_original_price != ''){
                                    let symbol2 = this.listArr[i].pro_original_price.substr(0,1)
                                    let val2 = this.listArr[i].pro_original_price.substr(1,this.listArr[i].pro_original_price.length-1) 
                                    let val_left2 = val2.substring(0, val2.indexOf("."))
                                    let val_right2 = val2.replace(/\d+\.(\d*)/, '$1')
                                    if(val_left2 != ''){
                                        this.listArr[i].pro_original_price_left = symbol2 + val_left2+'.'
                                        this.listArr[i].pro_original_price_right = val_right2
                                    }else{
                                        this.listArr[i].pro_original_price_left = this.listArr[i].pro_original_price
                                        this.listArr[i].pro_original_price_right = ''
                                    }
                                }
                            }
                            for(let i=0; i< this.videoData.length; i++){
                                if(i == this.nowIndex){
                                    this.videoData[i].listArr = this.listArr
                                }
                            }
                        }
                    },
                    error: () => {
                    }
                });
            },
            // 点赞接口
            zhanFun(status, id) {
                videoDetailZhan(
                    {
                        username: this.$route.query.username,
                        id: id,
                        status: status
                    }
                ).then(res => {

                }).catch(res =>{
                })
            },

            // 点赞
            heartClick(index) {
                let zz_userid = this.$cookies.get("zz_userid");
                this.erWeiMaStatus2 = false

                // 不是代理商或者不是自动登录
                // if(!this.auto_login || this.shortVideoVersion){
                //     if(!zz_userid || this.ifHaveFun(this.fenxiao_mid) === false){
                //         if(this.videoData[0].is_login_like==1){
                //             this.dengluStatus = true
                //             this.erWeiMaStatus2 = true
                //             return false;
                //         }
                //     }
                // }
                this.heartStatus = this.heartStatus ? false : true
                // 关闭广告
                this.videoData[this.nowIndex].ggStatus = 0
                if (this.videoData[index].zhanStatus == 1) {
                    this.videoData[index].zhanStatus = 0
                    if(String(this.videoData[index].like_num_show).indexOf('w')==-1){
                        this.videoData[index].like_num_show = Number(this.videoData[index].like_num_show)-1
                        if (this.videoData[index].like_num_show == 10000){
                            this.videoData[index].like_num_show = '1w'
                        }
                    }else{
                        let wanNumYuan = String(this.videoData[index].like_num_show).split('w')[0].length
                        let wanNum = String(this.videoData[index].like_num_show.split('w')[0]*10000)
                        let wanNumAdd= String(Number(wanNum)+1)
                        let wanNumXian=wanNumYuan/10000;
                        if(wanNum.length == wanNumAdd.length){
                             wanNumAdd = String(wanNumAdd/10000);
                            wanNumXian = wanNumAdd.substring(0,wanNumYuan)
                        }else{
                             wanNumAdd = String(wanNumAdd/10000);
                            wanNumXian = wanNumAdd.substring(0,wanNumYuan-1)
                        }                                            
                    }

                    if(this.ifHaveFun(zz_userid) === true && this.ifHaveFun(this.fenxiao_mid) === true){
                        }
                        this.zhanFun(0, this.videoData[this.nowIndex].id)
                        // 未登录，走缓存
                    if(!zz_userid || this.ifHaveFun(this.fenxiao_mid) === false || this.auto_login || this.shortVideoVersion){
                        let duanVideoList = util.storage.getItem('duanVideoList')
                        let valueJson={
                            id:this.videoData[index].id,
                            username: this.$route.query.username
                        }
                        for(let i=0; i< duanVideoList.length;i++){
                        if(duanVideoList[i].id == this.videoData[index].id){
                            duanVideoList.splice(i,1)
                        }
                        }
                        // 可以点赞
                        util.storage.setItem({
                            name:'duanVideoList',
                            value:duanVideoList
                        });
                    }
                } else {
                    this.videoData[index].zhanStatus = 1
                    if(String(this.videoData[index].like_num_show).indexOf('w')==-1){
                        this.videoData[index].like_num_show = Number(this.videoData[index].like_num_show)+1
                    }else{
                        let wanNumYuan = String(this.videoData[index].like_num_show).split('w')[0].length
                        let wanNum = String(this.videoData[index].like_num_show.split('w')[0]*10000)
                        let wanNumAdd= String(Number(wanNum)+1)
                        let wanNumXian= wanNumYuan/10000;
                        if(wanNum.length == wanNumAdd.length){
                             wanNumAdd = String(wanNumAdd/10000);
                            wanNumXian = wanNumAdd.substring(0,wanNumYuan)
                        }else{
                             wanNumAdd = String(wanNumAdd/10000);
                            wanNumXian = wanNumAdd.substring(0,wanNumYuan+1)
                        }
                    }

                    if(this.ifHaveFun(zz_userid) === true && this.ifHaveFun(this.fenxiao_mid) === true){
                        }
                        this.zhanFun(1, this.videoData[this.nowIndex].id)
                        // 未登录，走缓存
                    if(!zz_userid || this.ifHaveFun(this.fenxiao_mid) === false || this.auto_login || this.shortVideoVersion){
                        let duanVideoList = util.storage.getItem('duanVideoList')
                        let valueJson={
                            id:this.videoData[index].id,
                            username: this.$route.query.username
                        }
                        if(!duanVideoList || duanVideoList==''){
                            duanVideoList = []
                        }
                        duanVideoList.push(valueJson)
                        // 可以点赞
                        util.storage.setItem({
                            name:'duanVideoList',
                            value:duanVideoList
                        });
                    }
                }

            },
            // 浏览记录接口
            juluVideoFun(id) {
            let that = this
                juluVideo(
                    {
                        username: this.$route.query.username,
                        id: that.videoData[that.nowIndex].id,
                    }
                ).then(res => {
                })
            },
            // 浏览验证接口
            browsingFun(id) {
                browsingHistory(
                    {
                        username: this.$route.query.username,
                        id: id,
                    }
                ).then(res => {
                })
            },
            // 记录分享次数接口
            sharejiLuPsters(id){
                videojiLuShare(
                    {
                        username: this.$route.query.username,
                        id: id,
                    }
                ).then(res => {

                }).catch(res=>{
                })
            },
            // 分享接口
            sharepPsters(id) {
                
                let that = this;
                that.showLoading = true
                that.loading =true;
                
                 
                videoDetailShare(
                    {
                        username: that.$route.query.username,
                        id: id,
                        real_host:location.host
                    }
                ).then(res => {
                    that.showLoading = false
                    that.loading =false

                    that.shareList = res.share_text
                    let dataVideo = that.videoData[that.nowIndex]
                    if (res.is_app == 0) {
                        that.shareContent = true
                        that.wapImg = res.wap_img_src
                        that.shareLink = location.href
                        
                        that.erWeiMaStatus2 = true
                    } else if (res.is_app == '1') {//IOS分享(不需要弹窗)
                        that.app_share_fn_ios(dataVideo.title, res.url, dataVideo.description, dataVideo.conver);
                    } else if (res.is_app == '2') {//安卓分享(不需要弹窗)
                        that.app_share_fn_android(dataVideo.title, res.url, dataVideo.description, dataVideo.conver)
                    }

                }).catch(res=>{
                    that.showLoading = false
                    that.loading =false
                })
            },
            // IOS分享
            app_share_fn_ios(title, url, con, pic) {
                if (!con) con = title;
                var info = '{"title":"' + title + '","url":"' + url + '","con":"' + con + '","pic":"' + pic + '"}';
                normalShare(info);
            },
            // 安卓分享
            app_share_fn_android(title, url, con, pic) {
                if (!con) con = title;
                android.share(title, con, pic, url);
            },

            // 微信分享
            wxRegCallback(data) {
                // 用于微信JS-SDK回调
                this.shareInfo = {
                    title: this.videoData[this.nowIndex].title,
                    desc: this.videoData[this.nowIndex].description,
                    link: window.location.href,
                    imgUrl: this.videoData[this.nowIndex].share_conver ? this.videoData[this.nowIndex].share_conver : this.videoData[this.nowIndex].conver
                    // imgUrl: this.videoData[this.nowIndex].conver
                }
                this.wxShareTimeline()
                this.wxShareAppMessage()
            },
            wxShareTimeline () {
            // 微信自定义分享到朋友圈
            let option = {
                title: this.shareInfo.title, // 分享标题, 请自行替换
                link: this.shareInfo.link, // 分享链接，根据自身项目决定是否需要split
                imgUrl: this.shareInfo.imgUrl, // 分享图标, 请自行替换，需要绝对路径
                success: () => {
                    // alert('分享成功')
                },
                error: () => {
                    alert('已取消分享')
                }
            }
            // 将配置注入通用方法
            util.wechat.ShareTimeline(option)
            },
            wxShareAppMessage() {
                let that = this
                // 微信自定义分享给朋友
                let option = {
                    title: this.shareInfo.title, // 分享标题, 请自行替换
                    desc: this.shareInfo.desc, // 分享描述, 请自行替换
                    // link: this.shareInfo.link + "&app=0", // 分享链接，根据自身项目决定是否需要split
                    link: this.shareInfo.link, // 分享链接，根据自身项目决定是否需要split
                    imgUrl: this.shareInfo.imgUrl, // 分享图标, 请自行替换，需要绝对路径
                    success: () => {
                        alert('分享成功')
                    },
                    error: () => {
                        alert('已取消分享')
                    }
                }
                // 将配置注入通用方法
                util.wechat.ShareAppMessage(option)
            },

            // 二维码
            myMaClick(index) {
                let that = this
                clearTimeout(that.setTimer)
                clearTimeout(that.setTimerMa)
                this.videoData[this.nowIndex].ggStatus = 1
            },
            myMaClickClose() {
                 let that = this
                clearTimeout(that.setTimer)
                clearTimeout(that.setTimerMa)
                this.videoData[this.nowIndex].ggStatus = 0
                this.erWeiMaStatus2 = false
            },
            // 关闭广告
            myMaClickClose2() {
                this.erWeiMaStatus2 = false
                this.shareContent = false
                this.dengluStatus = false
                this.videoData[this.nowIndex].ggStatus = 0
            },
            // 跳转详情页
            goShopIndex() {
                if (util.app.Platform()) {
                    return this.$router.push({
                        path: '/shop/bac/video/index'
                    })
                }
                    location.href = this.httpData+ this.videoData[0].list_url
            },

            // 三秒之后弹窗广告
             guanggaoFun() {
                let that = this
                
                // 如果有广告
                if (that.videoData[that.nowIndex].poster_type > 0) {
                    that.setTimer = setTimeout(function () {
                        that.videoData[that.nowIndex].ggStatus = 1
                        that.erWeiMaStatus2 = true
                    }, 3000)
                }
                this.parseNum = 2
            },

            // 发送给朋友
            shareFriend() {
                this.shareIns = true
                this.shareContent = false
                let id = this.videoData[this.nowIndex].id
                 // 分享次数记录接口
                this.sharejiLuPsters(id)
            },
            shareInsClick() {
                this.shareIns = false
                this.erWeiMaStatus2 = false
            },

            // 分享海报
            sharePostersClick() {
                this.sharePostersStatus = true
            },
            sharePostersClose() {
                this.sharePostersStatus = false
                this.erWeiMaStatus2 = false
            },

            // 去登录
            dengluBtn(){
                let href = "/VFrontend/"+location.hash
                href = href.replace('&','|')
                this.dengluStatus = false
                this.erWeiMaStatus2 = false
                location.href = "/dom/denglu.php?username=" +
                this.$route.query.username +"&parsing=1"+
                "&wap=1&trespass=" +href;

            },
            // 关闭登录
            closeDengluBtn(){
                this.dengluStatus = false
                this.erWeiMaStatus2 = false
            },


            // 视频播放
            playVideoBtn(type) {
                var that = this;
                // 分享弹窗隐藏
                this.shareContent = false
                let video = document.querySelectorAll('video')[0];
                that.countNum = 0;
                 
                // 点击暂停
                if (type == 2) {
                    that.playStatus = false
                    that.videoPlayState = 0
                    video.pause();
                    that.videoData[that.nowIndex].ggStatus = 0
                    clearInterval(videoProcessInterval)
                } else if (type == 1) {//点击播放或暂停
                    // 播放器按钮隐藏（播放状态）
                    if (this.videoPlayState == 0) {
                            video.play();
                            that.playStatus = true
                                let countNum = that.countNum
                                video.addEventListener("timeupdate",function(){
                                    let numCount = that.parseNum
                                    // let timeDisplay = Math.floor(video.currentTime);
                                    if(video.currentTime){
                                        that.countNum = countNum++
                                        if(that.countNum == 1){
                                            if(numCount == 1){
                                                that.guanggaoFun()
                                                // 流量记录
                                                that.juluVideoFun()
                                            }
                                            that.videoData[that.nowIndex].aleryPlay = 1
                                        }
                                    }
                                    // 播放进度条
                                    videoProcessInterval = setInterval(() => {
                                        that.changeProcess(video)
                                    }, 100)
                                    
                                })
                        // })
                          that.videoPlayState = 1
                    } else {//显示（暂停状态)
                        that.playStatus = false
                        that.videoPlayState = 0
                        video.pause();
                        clearInterval(videoProcessInterval)
                    }
                    that.videoData[that.nowIndex].ggStatus = 0

                    
                }
            },
            //记录播放进度
            changeProcess() {
                let video = document.querySelectorAll('video')[0];
                
                    let currentTime = video.currentTime.toFixed(1);
                    let duration = video.duration.toFixed(1);
                    this.videoProcess = parseInt((currentTime / duration).toFixed(2) * 100)
            },
            // 复制链接
            onCopyUrl: function (e) {
                Toast({message: "复制成功", forbidClick: true});
            },
            onErrorUrl: function (e) {
                Toast({message: "复制失败", forbidClick: true});
            },

            // 滑动结束
            touchEndFun(index) {
                let id;
                if (this.videoData[this.nowIndex].next_video_id != 0) {
                    id = this.videoData[this.nowIndex].next_video_id
                    this.shortVideoFun(id, 2)
                }
            },

            // 关闭广告
            closeGuanggao() {
                this.videoData[index].ggStatus = 0
            },

            // 显示广告
            GgStatusClick(index) {
                let that = this
                // 清除定时器
                clearTimeout(that.setTimer)
                clearTimeout(that.setTimerMa)
                if (that.videoData[that.nowIndex].ggStatus == 0) {
                    if (that.videoData[that.nowIndex].poster_type == 1) {
                        // that.listFun(that.videoData[that.nowIndex].poster_info)
                    } else {
                        that.videoData[that.nowIndex].ggStatus = 1
                    }
                    that.erWeiMaStatus2 = true
                    that.videoData[that.nowIndex].ggStatus = 1
                } else if (that.videoData[that.nowIndex].ggStatus == 1) {
                    that.videoData[that.nowIndex].ggStatus = 0
                }
            },

            // 更多视频，分享
            stateClick(type, id) {
                this.videoData[this.nowIndex].ggStatus = 0
                this.erWeiMaStatus2 = false 
                // 清除定时器
                clearTimeout(this.setTimer)
                //更多
                if (type == 1) {
                    location.href = this.httpData+ this.videoData[0].list_url
                    this.$cookies.set('videoGoKey','1')
                    this.$cookies.set('videoListKey','0')//用来判断从列表页跳转到详情页，详情页返回到列表页
                    if(!util.app.Platform()){
                        if(this.$cookies.get("is_app") == 1 && this.$cookies.get("ios") != 1){
                            window.android.updateRefreshType(1);
                        }
                    }
                } else if (type == 2) {//分享
                    if (util.app.Platform()) {
                        util.variable.Set({
                            key: "ShopVideoBacActions",
                            val: true
                        });
                    } else {
                        // 分享接口
                        this.sharepPsters(id)
                       
                    }
                } else if (type == 3) {
                    this.shareContent = false
                }else if(type == 4){//跳转首页
                    this.$cookies.set('videoListKey','0')//用来判断从列表页跳转到详情页，详情页返回到列表页
                    if(this.shortVideoVersion){
                        // 如果是代理商，弹窗
                        this.dailiPop = true
                    }else{
                        location.href = this.videoData[0].index_url
                    }
                    if(!util.app.Platform()){
                        if(this.$cookies.get("is_app") == 1 && this.$cookies.get("ios") != 1){
                            window.android.updateRefreshType(1);
                        }
                    }
                }
            },
            // 跳转商品详情页
            goShopDetail(url) {
                location.href = url
                this.$cookies.set('videoListKey','0')//用来判断从列表页跳转到详情页，详情页返回到列表页
            },
            // 广告跳转
            goLinkShop(type, link) {
                if (type == 4) {
                    location.href = link
                    this.$cookies.set('videoListKey','0')//用来判断从列表页跳转到详情页，详情页返回到列表页
                }
            },
            touchStart(){
                let that = this
                // 清除定时器
                clearTimeout(that.setTimer)
                // 清除二维码的定时器
                clearTimeout(that.setTimerMa)
            },
            getMyLocation(){
                let that = this,storelongitude=that.videoData[that.nowIndex].poster_info[0].poster_storelongitude;
                if(storelongitude == null || storelongitude == '' || storelongitude == undefined){
                    return false;
                }
                let store = storelongitude.split(',');  
                store.unshift(that.videoData[that.nowIndex].poster_info[0].poster_storeaddress);
                store.unshift(that.videoData[that.nowIndex].poster_info[0].poster_storename);
                if(that.winxinIcon && that.locationData == 1){
                    let href = location.href;
                    util.wechat.share(store, href, that.$route.query.username,2);
                }
                that.locationData = 2
                setTimeout(function(){
                    that.locationData = 1
                },2000)
            },
            // 返回上一页
        backPages(){
            let that = this;
            if(that.$cookies.get('videoListKey') == 1){
                if(that.class_id_val == -1){
                    if(that.ifHaveFun(that.search_title_val)){
                        location.href = location.protocol+'//'+that.videoData[0].list_url+"&search_title="+ that.search_title_val
                    }else{
                        location.href = location.protocol+'//'+that.videoData[0].list_url
                    }
                }else{
                    if(that.ifHaveFun(that.search_title_val)){
                        location.href = location.protocol+'//'+that.videoData[0].list_url+"&search_title="+ that.search_title_val
                    }else{
                        location.href = location.protocol+'//'+that.videoData[0].list_url+'&class_id='+ that.class_id_val
                    }
                }
                that.$cookies.set('videoGoKey','1')
            }else{
                location.href = that.videoData[0].index_url
            }

            if(!util.app.Platform()){
                if(this.$cookies.get("is_app") == 1 && this.$cookies.get("ios") != 1){
                    window.android.updateRefreshType(1);
                }
            }

            
            // location.href = this.videoData[0].index_url
            // if (document.referrer.length > 0) {
            //    location.href = location.protocol+'//'+this.videoData[0].list_url
            // } else {
            //     location.href = this.videoData[0].index_url
            // }
        },
        // 判断是否存在该数值
        ifHaveFun(value){
            if(value == {} || value == '' || value == undefined || value == null || value === false || value ==0){
                return false
            }else{
                // 判断是否是空格
                if(String(value).replace(/(^\s*)|(\s*$)/g, "").length == 0){
                    return false
                }else{
                    return true
                }
            }
        },
        // 色系接口
        getColorFun() {
            let that = this;
            getColor({ username: this.$route.query.username }).then(res => {
                that.bgcColor1 = util.functions.newColor(res.color).bgcColor1;
                this.buyAlertData.bgcColor1 = this.bgcColor1;
                this.buyAlertData.bgcColor2 = util.functions.newColor(res.color).bgcColor2;
                this.buyAlertData.bgcColor3 = util.functions.newColor(res.color).bgcColor3;
                this.buyAlertData.bgcColor4 = util.functions.newColor(res.color).bgcColor4;
            });
        },
        /**
         * @Date: 2021-01-29 14:06:34
         * @LastEditors: zhouqi
         * @description: 加入购物车点击事件
         * @param {*} pro_id
         * @param {*} channel_id
         * @return {*}
         */
        joinShopBtn(pro_id,channel_id){
            const that =this;
            this.buyStatus = true;
            this.buyAlertData.pro_id = pro_id;
            this.buyAlertData.channel_id = channel_id;
            setTimeout(res=>{
                that.$refs.buyAlertRef.specificationsFun();
            })
        }
        },
        watch: {
        }
    };
</script>

<style scoped lang="scss">
    @import "@/pages/shop/static/css/video.scss";
</style>

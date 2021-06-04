<!--
 * @Author: qwguo
 * @Date: 2020-01-11 22:59:01
 * @LastEditTime : 2021-02-02 17:53:29
 * @LastEditors  : qwguo
 * @Description: 这是一个弹窗组件
 * @FilePath     : \ev-frontend-test\src\pages\shop\views\video\backend\components\publish\Popup.vue
 -->
<template>
    <div class="select-layer" v-if="Layer.show">
        <div class="bg" @click="showHideLayer(0)"></div>
        <transition
            name="custom-classes-transition"
            enter-active-class="animated fadeInUpBig"
            leave-active-class="animated fadeOutDownBig"
        >
            <div class="layer-con-wrap" v-if="Layer.conShow">


                <!-- 标签切换区域 -->
                <transition
                    name="custom-classes-transition"
                    enter-active-class="animated fadeInLeftBig"
                    leave-active-class="animated fadeOutLeftBig"
                >
                    <div class="tab-box" v-show="Layer.curState === 'tab'">
                        <!-- 标签标题 -->
                        <div class="tab-h">
                            <ul v-if="Tab.actionType === 'add' || Tab.actionType === 'change'">
                                <template v-for="(item, index) in Tab.tabHead">
                                    <li v-show="(index === 0 && Member.shortVideoVersion !== 1) || index !== 0" :key="index" @click="tabSwitch(item.type, index)">
                                        <i
                                            v-if="(Member.shortVideoVersion === 1 && index === 1) || (Member.shortVideoVersion !== 1 && index === 0)"
                                            class="move-line"
                                            :style="{
                                                transform:
                                                    'translateX(' + (Tab.moveLine * 100) + '%)'
                                            }"
                                        ></i>
                                        {{ item.title }}
                                    </li>
                                </template>
                            </ul>
                            <h5 v-if="Tab.actionType === 'push' && Tab.curType === 1">添加商品广告</h5>
                        </div>
                        <!-- 标签内容 -->
                        <div class="tab-b">

                            <!-- 产品列表 -->
                            <template v-if="Tab.curType=== 1">
                                <div class="list-layout pro-list-wrap">
                                    <div class="list-layout-t">
                                        <div class="pro-class-box" v-if="!Pro.channel.loading">
                                            <span>当前栏目：</span>
                                            <b>{{Pro.channel.curName}}</b>
                                            <div class="reset-channel">
                                                <button>重新选择</button>
                                                <select v-model="Pro.channel.curId" @change="resetChannel($event)">
                                                    <option value="0">全部</option>
                                                    <option v-for="(item, index) in Pro.channel.list" :key="index" :value="item.id">{{item.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="search-box">
                                            <input ref="searchDom" v-model="Pro.searchWord" type="search" @keyup.enter="searchPro" @blur="textBlur" placeholder="请输入您要查找的商品名称" />
                                            <i class="clear-icon" v-if="Pro.searchIng" @click="resetChannel('clearSearch')"></i>
                                            <i class="sjzs-icon s-icon-search-1" v-if="!Pro.searchIng" @click="searchPro"></i>
                                        </div>
                                         <a class="border-add-btn add-link-btn" @click="addEditItem('add')"><i class="sjzs-icon s-icon-plus-1"></i>新增产品</a>
                                    </div>
                                    <div class="list-layout-b pro-list-box" @scroll="scrollAjax">
                                        <ul v-if="Pro.list.length" class="list-ul pro-list-ul">
                                            <li class="list-item pro-list-item" v-for="(item, index) in Pro.list" :key="index" :data-id="item.id" @click="selectItemFun($event, index)">
                                                <div class="radio-box">
                                                    <span class="radio-select sjzs-icon s-icon-duigou-1" :data-selected="item.selected"></span>
                                                </div>
                                                <div class="img-box">
                                                    <img :src="item.pro_pic" :alt="item.pro_name" />
                                                </div>
                                                <dl class="attr-box">
                                                    <dt>
                                                        <span>{{item.pro_name}}</span>
                                                    </dt>
                                                    <dd>
                                                        <div class="sales-box" v-if="item.full_cut_info">
                                                            <span v-for="(v, i) in item.full_cut_info.rule_alert">{{v}}</span>
                                                        </div>
                                                        <div class="price-box">
                                                            <template v-if="!item.pro_tag">
                                                                <template v-if="item.pro_original_price_show == 1">
                                                                    <span class="vip-p">{{item.pro_price}}</span>
                                                                    <span class="com-p">{{item.pro_original_price}}</span>
                                                                    <!-- <span v-if="!item.pro_tag" class="del-p">{{item.pro_price}}</span>
                                                                    <span v-if="item.pro_tag" class="tag" :class="{'vip-tag': item.pro_tag== '会员价', 'xsg-tag': item.pro_tag== '限时购'}">{{item.pro_tag}}</span> -->
                                                                </template>
                                                                <template v-if="item.pro_original_price_show == 0">
                                                                    <span class="vip-p">{{item.pro_price}}</span>
                                                                </template>
                                                            </template>
                                                            <template v-if="item.pro_tag">
                                                                <span class="vip-p">{{item.pro_price}}</span>
                                                                <span class="com-p">{{item.pro_original_price}}</span>
                                                                <span class="tag" :class="{'vip-tag': item.pro_tag== '会员价', 'xsg-tag': (['限时购','清仓购'].indexOf(item.pro_tag) != -1 )}">{{item.pro_tag}}</span>
                                                            </template>
                                                        </div>
                                                    </dd>
                                                </dl>
                                                <em class="del-btn"></em>
                                            </li>
                                        </ul>
                                        <span class="loading-icon" v-if="Pro.loading"></span>
                                        <span class="no-data-text" v-if="Pro.ajaxFinish && Pro.list.length">没有更多数据了</span>
                                        <div v-if="!Pro.list.length && !Pro.loading" class="empty-list-item">
                                            <img src="../../images/empty_pro_item_icon.png" alt />
                                            <p>您还没有相关商品哦</p>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <!-- 门店列表 -->
                            <template v-if="Tab.curType=== 2">
                                <div class="list-layout store-list-wrap">
                                    <div class="list-layout-t" v-if="Store.list.length">
                                        <div class="tip-text">门店关联网站微门店功能,请谨慎操作</div>
                                        <a class="border-add-btn add-store-btn" @click="addEditItem('add')"><i class="sjzs-icon s-icon-plus-1"></i>新增门店广告</a>
                                    </div>
                                    <div class="list-layout-b store-list-box" @scroll="scrollAjax">
                                        <ul class="list-ul link-list-ul" v-if="Store.list.length && !Store.list.firstLoad">
                                            <li class="list-item store-list-item"  v-for="(item, index) in Store.list" :key="index" :data-index="index" @click="selectItemFun($event, index)">
                                                <div class="radio-box">
                                                    <span class="radio-select sjzs-icon s-icon-duigou-1" :data-selected="item.selected"></span>
                                                </div>
                                                <div class="img-box"><img :src="item.pic" alt=""></div>
                                                <dl class="attr-box">
                                                    <dt>{{item.name}}</dt>
                                                    <dd>
                                                        <ul>
                                                            <li><i class="sjzs-icon s-icon-tel"></i><span>{{item.tel}}</span></li>
                                                            <li><i class="sjzs-icon s-icon-location"></i><span>{{item.show_text}}</span></li>
                                                        </ul>
                                                    </dd>
                                                </dl>
                                                <div class="edit-box">
                                                    <span class="sjzs-icon s-icon-edit-1"></span>
                                                </div>
                                            </li>
                                        </ul>
                                        <span class="loading-icon" v-if="Store.loading"></span>
                                        <span class="no-data-text" v-if="Store.ajaxFinish && Store.list.length">没有更多数据了</span>
                                        <div v-if="!Store.list.length && !Store.loading" class="empty-list-item">
                                            <img src="../../images/empty_pro_item_icon.png" alt />
                                            <p>您还没有可以选择的门店</p>
                                            <a class="add-store-btn" @click="addEditItem('add')"><i class="sjzs-icon s-icon-plus-1"></i>添加门店</a>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <!-- 二维码列表 -->
                            <template v-if="Tab.curType=== 3">
                                <div class="list-layout link-list-wrap">
                                    <div class="list-layout-t" v-if="ErCode.list.length">
                                        <a class="border-add-btn add-link-btn" @click="addEditItem('add')"><i class="sjzs-icon s-icon-plus-1"></i>新增二维码广告</a>
                                    </div>
                                    <div class="list-layout-b link-list-box" @scroll="scrollAjax">
                                        <ul v-if="ErCode.list.length && !ErCode.list.firstLoad" class="list-ul link-list-ul">
                                            <li v-for="(item, index) in ErCode.list" :key="index" :data-index="index" @click="selectItemFun($event, index)" class="list-item code-list-item">
                                                <div class="radio-box">
                                                    <span class="radio-select sjzs-icon s-icon-duigou-1" :data-selected="item.selected"></span>
                                                </div>
                                                <div class="img-box"><img :src="item.pic" :alt="item.brief"></div>
                                                <dl class="attr-box">
                                                    <dt><span>{{item.title}}</span></dt>
                                                    <dd>
                                                        <p>{{item.brief}}</p>
                                                    </dd>
                                                </dl>
                                                <div class="edit-box">
                                                    <span class="sjzs-icon s-icon-edit-1"></span>
                                                </div>
                                            </li>
                                        </ul>
                                        <span class="loading-icon" v-if="ErCode.loading"></span>
                                        <span class="no-data-text" v-if="ErCode.ajaxFinish && ErCode.list.length">没有更多数据了</span>
                                        <div v-if="!ErCode.list.length && !ErCode.loading" class="empty-list-item">
                                            <img src="../../images/empty_pro_item_icon.png" alt />
                                            <p>您还没有可以选择的二维码</p>
                                            <a class="add-link-btn" @click="addEditItem('add')"><i class="sjzs-icon s-icon-plus-1"></i>添加二维码广告</a>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <!-- 链接列表 -->
                            <template v-if="Tab.curType=== 4">
                                <div class="list-layout link-list-wrap">
                                    <div class="list-layout-t" v-if="Link.list.length">
                                        <a class="border-add-btn add-link-btn" @click="addEditItem('add')"><i class="sjzs-icon s-icon-plus-1"></i>新增链接广告</a>
                                    </div>
                                    <div class="list-layout-b link-list-box" @scroll="scrollAjax">
                                        <ul class="list-ul link-list-ul" v-if="Link.list.length && !Link.list.firstLoad">
                                            <li class="list-item code-list-item" v-for="(item, index) in Link.list" :key="index" :data-index="index" @click="selectItemFun($event, index)">
                                                <div class="radio-box">
                                                    <span class="radio-select sjzs-icon s-icon-duigou-1" :data-selected="item.selected"></span>
                                                </div>
                                                <div class="img-box"><img :src="item.pic" :alt="item.brief"></div>
                                                <dl class="attr-box">
                                                    <dt><span>{{item.title}}</span></dt>
                                                    <dd>
                                                        <p>{{item.brief}}</p>
                                                    </dd>
                                                </dl>
                                                <div class="edit-box">
                                                    <span class="sjzs-icon s-icon-edit-1"></span>
                                                </div>
                                            </li>
                                        </ul>
                                        <span class="loading-icon" v-if="Link.loading"></span>
                                        <span class="no-data-text" v-if="Link.ajaxFinish && Link.list.length">没有更多数据了</span>
                                        <div v-if="!Link.list.length && !Link.loading" class="empty-list-item">
                                            <img src="../../images/empty_pro_item_icon.png" alt />
                                            <p>您还没有可以选择的链接</p>
                                            <a class="add-link-btn" @click="addEditItem('add')"><i class="sjzs-icon s-icon-plus-1"></i>添加链接广告</a>
                                        </div>
                                    </div>
                                </div>
                            </template>

                        </div>
                        <!-- 添加按钮 -->
                        <div class="tab-f">
                            <span class="orange-btn button-btn" @click="addSubmit">添加此广告</span>
                        </div>
                    </div>

                </transition>



                <!-- 编辑区域 -->
                <transition
                    name="custom-classes-transition"
                    enter-active-class="animated fadeInRightBig"
                    leave-active-class="animated fadeOutRightBig"
                >
                <div class="list-layout add-item-wrap" v-if="Layer.curState === 'edit'">
                    <div class="list-layout-t">
                        <a class="back-btn" @click="addEditItem('back')"></a>
                        <span class="title-text">{{`${Edit.id ? '编辑': '添加'}${['产品', '门店广告', '二维码广告', '链接广告'][Tab.curType-1]}`}}</span>
                    </div>
                    <div class="list-layout-b">
                        <ul class="add-item-box">

                            <!-- 类型为链接(4)和二维码(3) -->
                            <template v-if="Tab.curType === 4 || Tab.curType === 3">
                                <li class="add-item-li">
                                    <b class="add-item-name" v-if="Tab.curType === 4">广告图片</b>
                                    <b class="add-item-name" v-if="Tab.curType === 3">二维码</b>
                                    <div class="add-item-con">
                                        <div class="up-pic-item img-box" v-if="Edit.item.pic">
                                            <i @click="delEditItemPic"></i>
                                            <img :src="Edit.item.pic">
                                        </div>
                                        <template  v-if="!Edit.item.pic">
                                            <div class="up-pic-item up-box">
                                                <span class="loading-icon" v-if="Edit.picUploading"></span>
                                                <i class="plus-icon" v-if="!Edit.picUploading"></i>
                                                <input name="fileImg"
                                                    type="file"
                                                    accept="image/*"
                                                    @change="changeImage($event)"
                                                />
                                            </div>
                                            <span class="tip-text">请上传宽高2:1的图片</span>
                                        </template>
                                    </div>
                                </li>
                                <li class="add-item-li">
                                    <b class="add-item-name">标题</b>
                                    <div class="add-item-con">
                                        <div class="input-text-box"><input type="text" v-model="Edit.item.title" @blur="textBlur" placeholder="请输入广告标题,最大支持15个汉字"></div>
                                    </div>
                                </li>
                                <li class="add-item-li">
                                    <b class="add-item-name">描述</b>
                                    <div class="add-item-con">
                                        <div class="input-text-box"><input type="text" v-model="Edit.item.brief" @blur="textBlur" placeholder="请输入广告描述,最大支持30个汉字"></div>
                                    </div>
                                </li>
                            </template>
                            <template v-if="Tab.curType === 4">
                            <li class="add-item-li wpalink-add-item-li">
                                <b class="add-item-name">跳转地址<i>手机站</i></b>
                                <div class="add-item-con">
                                    <div class="input-text-box">
                                        <span class="text-box" v-if="Edit.selectedLinkTextWap">{{Edit.selectedLinkTextWap}}</span>
                                        <input placeholder="请填写网址(如http://baidu.com)" type="text"  v-if="!Edit.selectedLinkTextWap" v-model="Edit.item.href"  @blur="textBlur" ref="wrapLink">
                                    </div>
                                </div>
                                <div class="add-item-icon" v-if="Member.shortVideoVersion !== 1">
                                    <button @click="selectLinkFun('wapLink')">查找链接</button>
                                </div>
                            </li>
                            <li class="add-item-li xcxlink-add-item-li" v-if="Member.shortVideoVersion !== 1">
                                <b class="add-item-name">跳转地址<i>小程序</i></b>
                                <div class="add-item-con">
                                    <div class="input-text-box">
                                        <span class="text-box" v-if="Edit.selectedLinkTextXCX">{{Edit.selectedLinkTextXCX}}</span>
                                        <input placeholder="请填写网址(如http://baidu.com)" type="text" v-if="!Edit.selectedLinkTextXCX" v-model="Edit.item.xcx_href"  @blur="textBlur" ref="xcxLink">
                                        <!-- <textarea placeholder="请填写网址(如http://baidu.com)" v-if="!Edit.selectedLinkTextXCX" v-model="Edit.item.xcx_href" ref="xcxLink"></textarea> -->
                                    </div>
                                </div>
                                <div class="add-item-icon">
                                    <button @click="selectLinkFun('xcxLink')">查找链接</button>
                                </div>

                            </li>
                            </template>

                            <!-- 类型是门店(2) -->
                            <template v-if="Tab.curType === 2">
                                <li class="add-item-li">
                                    <b class="add-item-name">门店图片</b>
                                    <div class="add-item-con">
                                        <div class="up-pic-item img-box" v-if="Edit.item.pic">
                                            <i @click="delEditItemPic"></i>
                                            <img :src="Edit.item.pic">
                                        </div>
                                        <template  v-if="!Edit.item.pic">
                                            <div class="up-pic-item up-box">
                                                <span class="loading-icon" v-if="Edit.picUploading"></span>
                                                <i class="plus-icon" v-if="!Edit.picUploading"></i>
                                                <input name="fileImg"
                                                    type="file"
                                                    accept="image/*"
                                                    @change="changeImage($event)"
                                                />
                                            </div>
                                            <span class="tip-text">请上传宽高2:1的图片</span>
                                        </template>
                                    </div>
                                </li>
                                <li class="add-item-li">
                                    <b class="add-item-name">门店名称</b>
                                    <div class="add-item-con">
                                        <div class="input-text-box"><input type="text" placeholder="请输入门店名称" v-model="Edit.item.name" @blur="textBlur"></div>
                                    </div>
                                </li>
                                <li class="add-item-li">
                                    <b class="add-item-name">联系电话</b>
                                    <div class="add-item-con">
                                        <div class="input-text-box"><input type="text" placeholder="请输入门店联系电话" v-model="Edit.item.tel" @blur="textBlur"></div>
                                    </div>
                                </li>
                                <li class="add-item-li">
                                    <b class="add-item-name">城市</b>
                                    <div class="add-item-con">
                                        <div class="input-text-box"><input type="text" readonly="readonly" @click="selectCityFun" v-model="Edit.item.addressText" placeholder="请选择"></div>
                                    </div>
                                    <div class="add-item-icon" @click="selectGPSFun($event)">
                                        <i class="sjzs-icon s-icon-location-1"></i>
                                    </div>
                                </li>
                                <li class="add-item-li">
                                    <b class="add-item-name">详细地址</b>
                                    <div class="add-item-con">
                                        <div class="input-text-box"><textarea v-model="Edit.item.address" placeholder="请输入"></textarea></div>
                                    </div>
                                </li>
                            </template>
                            <!-- 产品添加 -->
                            <template v-if="Tab.curType === 1">
                                <li class="add-item-li">
                                    <b class="add-item-name">所属栏目</b>
                                    <div class="add-item-con add-pro-channel">
                                        <select v-model="Edit.item.channelId" @change="changeAddChannel($event)">
                                            <option value="0">请选择</option>
                                            <template v-for="(item, index) in Pro.channel.list">
                                                <option v-if="item.type!=102" :key="index" :value="item.id">{{item.name}}</option>
                                            </template>
                                        </select>
                                        <div class="input-text-box">
                                            <span class="text-box">
                                                <em v-if="!Edit.item.channelId*1">
                                                    请选择
                                                </em>
                                                <template v-else>
                                                    {{Edit.item.channelName}}
                                                </template>
                                            </span>
                                            <!-- <input type="text" placeholder="请选择" readonly v-model="Edit.item.channelName" /> -->
                                            <i class="sjzs-icon s-icon-right-1"></i>
                                        </div>
                                    </div>
                                </li>
                                <li class="add-item-li">
                                    <b class="add-item-name">商品主图</b>
                                    <div class="add-item-con pic-item-con">
                                        <template v-if="Edit.item.pic.length">
                                            <div class="up-pic-item img-box" v-for="(picItem, picIndex) in Edit.item.pic" :key="picIndex">
                                                <i @click="delEditItemPic(picIndex)"></i>
                                                <img :src="picItem">
                                            </div>
                                        </template>
                                        <template  v-if="Edit.item.pic.length<8">
                                            <div class="up-pic-item up-box">
                                                <span class="loading-icon" v-if="Edit.picUploading"></span>
                                                <i class="plus-icon" v-if="!Edit.picUploading"></i>
                                                <input name="fileImg"
                                                    type="file"
                                                    accept="image/*"
                                                    @change="changeImage($event)"
                                                />
                                            </div>
                                        </template>
                                        <span class="tip-text">请上传宽高1:1的图片大小不要超过5M最多上传8张</span>
                                    </div>
                                </li>
                                <li class="add-item-li">
                                    <b class="add-item-name">商品名称</b>
                                    <div class="add-item-con">
                                        <div class="input-text-box"><input type="text" placeholder="请输入名称" v-model="Edit.item.name" @blur="textBlur" /></div>
                                    </div>
                                </li>
                                <li class="add-item-li">
                                    <b class="add-item-name">类别</b>
                                    <div class="add-item-con add-pro-channel">
                                        <div class="input-text-box">
                                            <span class="text-box" @click="selectProductClassFun('productClass')">
                                                <em v-if="!Edit.item.selectProductClassTxt">
                                                    请选择
                                                </em>
                                                <template v-else>
                                                    {{Edit.item.selectProductClassTxt}}
                                                </template>
                                            </span>
                                            <!-- <input type="text" placeholder="请选择" readonly v-model="Edit.item.selectProductClassTxt" /> -->
                                            <i class="sjzs-icon s-icon-right-1"></i>
                                        </div>
                                    </div>
                                </li>
                                <li class="add-item-li">
                                    <b class="add-item-name">价格</b>
                                    <div class="add-item-con">
                                        <div class="input-text-box">
                                            <input type="number" placeholder="请输入价格" v-model="Edit.item.price" @blur="textBlur" />
                                        </div>
                                    </div>
                                </li>
                                <li class="add-item-li">
                                    <b class="add-item-name">库存</b>
                                    <div class="add-item-con">
                                        <div class="input-text-box">
                                            <input type="number" placeholder="请输入库存" v-model="Edit.item.stock" @blur="textBlur" />
                                        </div>
                                    </div>
                                </li>
                            </template>


                        </ul>
                    </div>
                    <div class="list-layout-f">
                        <span v-if="Edit.id" class="default-btn del-btn" @click="addEditItem('del')">删除该广告</span>
                        <span class="orange-btn add-btn" @click="addEditItem('save')">{{Edit.id ? '保存' : '添加'}}</span>
                    </div>
                </div>
                </transition>
            </div>
        </transition>
        <select-city v-if="Edit.selectCityShow" ref="SelectCityLayer" @backFunction="changeCity" :selectedCity="Edit.selectedCity" />
        <BaiduGPS v-if="Edit.selectGPSShow" ref="BaiduGPSLayer" @backFunction="bdGetCity"/>
        <find-link v-if="Edit.FindLinkShow" ref="FindLinkLayer" @backFunction="changeLink" :setLinkType="Edit.linkType" />
        <product-class v-if="Edit.ProductClassShow" ref="ProductClassLayer" @backFunction="changeProductClass" :channelId="Edit.item.channelId" />
    </div>
</template>

<script>
    import hint from '@/plugins/hint';
    import SelectCity from '../SelectCity'
    import ProductClass from '../ProductClass'
    import BaiduGPS from '../BaiduGPS'
    import FindLink from '../FindLink'
    import { shortVideoPosterShow, shortVideoPosterStore, showProChannel, showProList, shortVideoPosterHandle,shortVideoPosterDel, shortVideoPosterStoreDel, shortVideoPosterStoreHandle, upLoadImage, proAddEditInfo } from "@/api/shop/video.bac";
    export default {
        name: "Popup",
        components:{
            SelectCity,
            BaiduGPS,
            FindLink,
            ProductClass
        },
        data(){
            return {
                // 打开层级相关的
                Layer:{
                    // 层是否显示
                    show: 0,
                    // 层内容是否显示
                    conShow: 0,
                    // 当前状态，tab:标签切换，edit:编辑模式
                    curState: 'tab'
                },
                // 标签切换下的一些数据
                Tab:{
                    //当前选中项
                    curType: 0,
                    // 当前项的下边线所在位置
                    moveLine: 0,
                    // 当前选中项指向的对象
                    typeJson: null,
                    // tab标签的数据
                    tabHead: [
                        { title: "商品", type: 1, typeJson:'Pro' },
                        { title: "门店", type: 2, typeJson:'Store' },
                        { title: "二维码", type: 3, typeJson:'ErCode' },
                        { title: "链接", type: 4, typeJson:'Link' }
                    ],
                    actionType: 'add'
                },
                // 临时值记录当前选中的项，如果是产品可以多选为数组，否则为对象
                selectItem: [],
                /* 产品相关的 */
                Pro: {
                    // 产品分类相关
                    channel:{
                        // 列表
                        list: [],
                        // 当前选择项
                        curItem: null,
                        // 当前选中id
                        curId: 0,
                        // 当前选中名字
                        curName: '',
                        // 是否已经加载
                        loading: false
                    },
                    // 搜索关键字
                    searchWord: '',
                    searchIng: false,
                    // 产品列表数据
                    list:[],
                    // 产品列表是否加载状态
                    loading: false,
                    // 产品列表当前页
                    curPage: 1,
                    // 记录是否已经第一次加载
                    firstLoad: true,
                    // 产品列表是否异步获取完毕
                    ajaxFinish: false
                },
                /* 链接广告相关 */
                Link: {
                    // 列表
                    list:[],
                    // 列表是否加载状态
                    loading: false,
                    // 记录是否已经第一次加载
                    firstLoad: true,
                    // 列表是否异步获取完毕
                    ajaxFinish: false,
                    // 列表当前页
                    curPage: 1
                },
                /* 二维码相关的 */
                ErCode: {
                    // 列表
                    list:[],
                    // 列表是否加载状态
                    loading: false,
                    // 记录是否已经第一次加载
                    firstLoad: true,
                    // 列表是否异步获取完毕
                    ajaxFinish: false,
                    // 列表当前页
                    curPage: 1
                },
                /* 门店相关 */
                Store: {
                    // 门店列表
                    list:[],
                    // 门店列表是否加载状态
                    loading: false,
                    // 记录是否已经第一次加载
                    firstLoad: true,
                    // 门店列表是否异步获取完毕
                    ajaxFinish: false,
                    // 门店列表当前页
                    curPage: 1
                },
                // 编辑状态下的一些数据
                Edit:{
                    id: 0,
                    // 当前处于编辑类型，0表示添加，1表示编辑
                    type: 0,
                    // 当前编辑项
                    item: null,
                    // 存储一下原来的编辑项
                    originItem: null,
                    // 图片是否处于上传
                    picUploading: false,
                    // 选择城市的输入框
                    selectedCityDom : null,
                    // 选择城市的组件是否显示
                    selectCityShow: false,
                    // 选择城市数据存储
                    selectedCity:[{code:'', name: ''},{code: '', name: '' }, {code:'', name: ''}],
                    // 选择商品的类别是否显示
                    ProductClassShow: false,
                    // 选择商品类别数据存储
                    productClass:[{id:'', name: ''},{id: '', name: '' }, {id:'', name: ''}],
                    // 百度定位组件是否加载
                    selectGPSShow: false,
                    // 初始化定位经纬度坐标
                    point: { lng: '116.489008', lat: '39.863418'},
                    // 当前要通过查找链接改变值的输入框Dom对象
                    selectedLinkDom : null,
                    // 通过查找链接返回过来的栏目名称文字
                    selectedLinkTextWap: '',
                    selectedLinkTextXCX: '',
                    // 链接的类型，1表示手机站，2表示小程序
                    linkType: 1,
                    // 查找链接组件是否显示判断
                    FindLinkShow: false,

                }
            }
        },
        props:['curAdvert', 'Member'],
        created(){
            let that = this;
            if(that.curAdvert.list.length){
                that.curAdvert.list.forEach(v=>{
                    that.selectItem.push(v);
                });
            }
        },
        methods:{
            /**
             * @description:显示隐藏弹窗选择层
             * @param {action: 1表示打开，0表示关闭}
             * @return:
             */
            showHideLayer(action, actionType) {
                var that = this,
                    curAdvert = that.curAdvert;
                if (action === 1) {
                    that.Layer.show = action;
                    that.Layer.curState = 'tab';
                    let aType = curAdvert.type || (that.Member.shortVideoVersion === 1 ? 2 : 1);
                    if(!curAdvert.list.length){
                        aType = that.Member.shortVideoVersion === 1 ? 2 : 1;
                    }
                    setTimeout(() => {
                        switch (actionType) {
                            case "add":
                                that.Tab.actionType = 'add';
                                that.tabSwitch(aType, aType-1);
                                break;
                            case "change":
                                that.Tab.actionType = 'change';
                                that.tabSwitch(aType, aType-1);
                                break;
                            case 'push':
                                that.tabSwitch(aType, aType-1);
                                that.Tab.actionType = 'push';
                                break;
                        }
                        that.Layer.conShow = action;
                    }, 1);
                } else {
                    that.Layer.conShow = action;
                    setTimeout(() => {
                        that.Layer.show = action;
                        if (actionType === 'add') {
                            that.$emit('closeBack', that.selectItem, that.Tab.curType);
                        }else{
                            /* if(curAdvert.list.length){
                                curAdvert.list.forEach(v=>{
                                    for(let i = that.selectItem.length - 1; i >= 0; i--){
                                        if(that.selectItem[i] === v){
                                            that.selectItem.splice(i, 1);
                                        }
                                    }
                                });
                            } */
                            that.$emit('closeBack');
                        }
                    }, 200);
                }
            },
            /**
             * @description: 标签切换函数
             * @param {type: 要切换的想类型，要切换的项索引值}
             * @return:
             */
            tabSwitch(type, move) {
                let that = this,
                    Tab = that.Tab;
                Tab.curType = type;
                Tab.moveLine = that.Member.shortVideoVersion === 1 ? move - 1 : move;
                Tab.typeJson = that[Tab.tabHead[move].typeJson];
                if(that.Tab.typeJson.firstLoad){
                    if(type === 1){
                        that.getChannelData();
                    }else{
                        that.getListData(type);
                    }
                }
            },
            /**
             * @description: 异步获取数据，根据单签标签选中请求类型数据，门店：2 ，二维码：3，链接：4
             * @param {type: }
             * @return:
             */
            getListData(){
                let that = this,
                    Tab = that.Tab,
                    curObject,
                    ajaxFun,
                    strList,
                    posterId;
                switch(Tab.curType){
                    case 2:
                        curObject = that.Store;
                        ajaxFun = shortVideoPosterStore;
                        strList = 'store_list';
                        break;
                    case 3:
                        curObject = that.ErCode;
                        ajaxFun = shortVideoPosterShow;
                        strList = 'poster_list';
                        break;
                    case 4:
                        curObject = that.Link;
                        ajaxFun = shortVideoPosterShow;
                        strList = 'poster_list';
                        break;
                }
                if(that.selectItem.length){
                    posterId = that.selectItem[0].id;
                }
                if(!curObject.loading && !curObject.ajaxFinish){
                    curObject.loading = true;
                    ajaxFun({page: curObject.curPage, type: that.Tab.curType}).then((data)=>{
                        curObject.loading = false;
                        curObject.firstLoad = false;
                        let getDataList = data[strList];
                        if (getDataList.length) {
                            getDataList.forEach((v, i) => {
                                let targ = 0;
                                if(posterId && posterId === v.id){
                                    if(Tab.curType === 2){
                                        targ = (v.tel == that.selectItem[0].tel)
                                    }else{
                                        targ = (v.href === that.selectItem[0].href);
                                    }
                                }
                                if(targ){
                                    that.selectItem[0] = v;
                                }
                                v.selected = targ*1;
                                curObject.list.push(v);
                            });
                            curObject.curPage += 1;
                        } else {
                            curObject.list.length && (curObject.ajaxFinish = true);
                        }
                    });
                }
            },
            /**
             * @description: 获取产品分类数据
             * @param {type}
             * @return:
             */
            getChannelData(){
                let that = this,
                    Pro = that.Pro,
                    Channel = Pro.channel;
                Channel.loading = true;
                Pro.loading = true;
                // 初始化频道
                showProChannel().then((data)=>{
                    let curId = 0
                    if(that.selectItem.length && that.selectItem[0].channel_id){
                        curId = that.selectItem[0].channel_id;
                    }
                    data.channel_arr.forEach((v, i)=>{
                        if(curId && (curId * 1) === v.id){
                            curId = i;
                        }
                        v.selected = (i === curId) * 1
                        Channel.list.push(v);
                    });
                    Channel.curItem = Channel.list[curId];
                    Channel.curName = Channel.list[curId].name;
                    Channel.curId = Channel.list[curId].id;
                    Channel.loading = false;
                    Pro.firstLoad = false;
                    Pro.loading = false;
                    that.getProListData();
                });
            },
            /**
             * @description: 获取产品列表
             * @param {type}
             * @return:
             */
            getProListData(){
                let
                    that = this,
                    Pro = that.Pro;

                if(!Pro.loading && !Pro.ajaxFinish){
                    Pro.loading = true;
                    showProList({
                        channel_id: Pro.channel.curId,
                        page: Pro.curPage,
                        pro_name: Pro.searchWord
                    }).then((data)=>{
                        if (data.pro_list.length) {
                            data.pro_list.forEach((v, i)=>{
                                v.selected = 0;
                                that.curAdvert.type === 1 && that.selectItem.length && that.selectItem.forEach((v_, i_)=>{
                                    if(v_.id === v.id){
                                        v.selected = 1;
                                    }
                                });
                                Pro.list.push(v);
                            });
                            Pro.curPage++;
                        }else{
                            Pro.ajaxFinish = true;
                        }
                        Pro.loading = false;
                    });
                }
            },
            /**
             * @description: 搜索商品
             * @param {type}
             * @return:
             */
            searchPro(){
                let that = this,
                    Pro = that.Pro;
                that.$refs.searchDom.blur();
                if(Pro.searchWord){
                    Pro.searchIng = true;
                    Pro.list.length = 0;
                    Pro.loading = Pro.ajaxFinish = false;
                    Pro.curPage = 1;
                    that.getProListData();
                }else{
                    hint.Msg({
                        message: '请输入关键字'
                    });
                }
            },
            /**
             * @description: // 产品列表中重新选择频道
             * @param {type}
             * @return:
             */
            resetChannel(event){
                let that = this,
                    val = null,
                    Pro = that.Pro,
                    Channel = Pro.channel;
                if(event === 'clearSearch'){
                    val = Channel.curId;
                    Pro.searchIng = false;
                    Pro.searchWord = '';
                }else{
                    val = event.srcElement.value;
                }
                Channel.curId = val;
                Channel.curItem = Channel.list.find(v=>{
                    return v.id == val;
                });
                Channel.curName = !!(val*1) ? Channel.list.find((v,i)=>{return v.id == val}).name : '全部';
                Pro.list.length = 0;
                Pro.loading = Pro.ajaxFinish = false;
                Pro.curPage = 1;
                that.getProListData();
            },
            /**
             * @description: 滚动加载方法
             * @param {type}
             * @return:
             */
            scrollAjax(event){
                let that = this,
                    $this = $(event.srcElement);
                if(event.srcElement.scrollTop + event.srcElement.clientHeight === event.srcElement.scrollHeight){
                    that.Tab.curType === 1 ? that.getProListData() : that.getListData();
                }
            },
            /**
             * @description: 选择项目的方法
             * @param {type}
             * @return:
             */
            selectItemFun(event,index){
                var that = this,
                    action = 'select',
                    targetDom = $(event.target),
                    SelectItem = that.selectItem;
                if(targetDom.hasClass('edit-box') || targetDom.hasClass('s-icon-edit-1')){
                    action = 'edit';
                }

                switch(that.Tab.curType){
                    // 如果是产品走这
                    case 1:
                        // if(SelectItem.length < 3){
                            let liItem = that.Tab.typeJson.list[index],
                                canAdd = true;
                            if(SelectItem.length > 0){
                                for(let i = SelectItem.length - 1; i >= 0; i--){
                                    if(SelectItem[i].type || SelectItem[i].city_name){
                                        // 处理先前选中的数据，如果不是产品，改为不选中
                                        SelectItem[i].selected = 0;
                                        SelectItem.splice(i, 1);
                                    }else if(SelectItem[i].pro_name && (SelectItem[i].id === liItem.id)){
                                        // 如果是产品，并且单击的是选中的项，改为不选中
                                        liItem.selected = 0;
                                        canAdd && (canAdd = false);
                                        SelectItem.splice(i, 1);
                                    }
                                }
                            }
                            if(canAdd){
                                if(SelectItem.length < 3){
                                    SelectItem.push(that.Tab.typeJson.list[index]);
                                    SelectItem[SelectItem.length-1].selected = 1;
                                }else{
                                    hint.Msg({message:'最多能添加3个产品'});
                                }
                            }
                        /* }else{
                            hint.Msg({message:'最多能添加3个产品'});
                        } */
                        break;
                    // 其他走这
                    default:
                        if(action === 'edit'){
                            that.addEditItem('edit', that.Tab.typeJson.list[index]);
                        }else{
                            // 如果切换了其他类别的选择先清空先前选择的项
                            if(that.Tab.curType !== that.curAdvert.type){
                                if(SelectItem.length){
                                    SelectItem.forEach(v=>{
                                        v.selected = 0;
                                    });
                                    SelectItem.length = 0;
                                }
                            }else{
                                SelectItem[0].selected = 0;
                            }
                            SelectItem[0] = that.Tab.typeJson.list[index];
                            SelectItem[0].selected = 1;
                        }
                        break;
                }

            },
            /**
             * @description: 编辑保存函数
             * @param {type}
             * @return:
             */
            addEditItem(action, getItem){
                let that = this,
                    Edit = that.Edit,
                    Tab = that.Tab;
                switch (action) {
                    case 'edit':
                        that.Layer.curState = 'edit';
                        Edit.originItem = getItem;
                        Edit.item = Object.assign({},Edit.originItem);
                        if(Tab.curType === 2){
                            Edit.item.addressText = `${Edit.item.province_name} ${Edit.item.city_name} ${Edit.item.county_name}`;
                            Edit.selectedCity[0].code = Edit.item.province;
                            Edit.selectedCity[0].name = Edit.item.province_name;
                            Edit.selectedCity[1].code = Edit.item.city;
                            Edit.selectedCity[1].name = Edit.item.city_name;
                            Edit.selectedCity[2].code = Edit.item.county;
                            Edit.selectedCity[2].name = Edit.item.county_name;
                            // Edit.id = Edit.item.id;
                        }
                        Edit.id = Edit.item.id;
                        Edit.type = 1;
                        break;
                    case 'add':
                        Edit.id = 0;
                        switch(that.Tab.curType){
                            case 2:
                                that.Edit.item = {
                                    type: that.Tab.curType,
                                    selected: 0,
                                    address:'',
                                    city:'',
                                    city_name:'',
                                    county:'',
                                    county_name:'',
                                    id:'',
                                    longitude:'',
                                    name:'',
                                    pic:'',
                                    province:'',
                                    province_name:'',
                                    show_pic:'',
                                    show_text:'',
                                    tel:''
                                }
                                Edit.selectedCity[0].code = '';
                                Edit.selectedCity[0].name = '';
                                Edit.selectedCity[1].code = '';
                                Edit.selectedCity[1].name = '';
                                Edit.selectedCity[2].code = '';
                                Edit.selectedCity[2].name = '';
                                break;
                            case 3:
                            case 4:
                                that.Edit.item = {
                                    brief:'',
                                    type: that.Tab.curType,
                                    href:'',
                                    pic:'',
                                    title:'',
                                    selected: 0
                                }
                                break;
                            case 1:
                                let Channel = that.Pro.channel;
                                let curItem = Channel.curItem;
                                if(!curItem || (curItem && curItem.type === 102)){
                                    curItem = {id: 0, name: '请选择'}
                                }
                                that.Edit.item = Object.assign({},{
                                    channelId: curItem.id,
                                    channelName: curItem.name,
                                    selectProductClassTxt: '',
                                    name: '',
                                    price:'',
                                    classifyId: [],
                                    type: that.Tab.curType,
                                    pic:[]
                                });
                                break;
                        }
                        that.Layer.curState = 'edit';
                        that.Edit.type = 0;
                        break;
                    case 'back':
                        that.Layer.curState = 'tab';
                        break;
                    case 'del':
                        let curList = Tab.typeJson.list,
                            ajaxFun;
                        if(Tab.curType === 2){
                            ajaxFun = shortVideoPosterStoreDel;
                        }else{
                            ajaxFun = shortVideoPosterDel;
                        }
                        ajaxFun({id: Edit.item.id}).then((res)=>{
                            for(let i = curList.length - 1; i >= 0; i--){
                                if(curList[i].id === Edit.item.id){
                                    curList.splice(i, 1);
                                }
                                let SelectItem = that.selectItem;
                                if(SelectItem.length){
                                    for(let i = SelectItem.length - 1; i >= 0; i--){
                                        if(SelectItem[i].id === Edit.item.id){
                                            SelectItem.splice(i, 1);
                                        }
                                    }
                                }
                            }
                            that.Layer.curState = 'tab';
                            hint.Msg({message:'删除成功'});
                        });
                        break;
                    case 'save':
                        switch(Tab.curType){
                            case 2:
                                that.saveStore();
                            break;
                            case 1:
                                that.saveProduct();
                                break;
                            default:
                                that.savePoster();
                                break;
                        }
                        break;
                }
            },
            /**
             * @Date: 2020-02-04 21:14:51
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 保存二维码，链接
             * @param {type} 参数说明
             * @return: 返回值
             */
            savePoster(){
                let that = this,
                    Edit = that.Edit,
                    originItem = Edit.originItem,
                    EditItem = Edit.item,
                    Tab = that.Tab,
                    postData = {},
                    validate = function(){
                        let flag = false;
                        for(let k in EditItem){
                            if(typeof(EditItem[k]) === 'string'){
                                EditItem[k] = EditItem[k].trim();
                            }
                        }
                        if(!EditItem.title){
                            flag = '请填写标题'
                        }else if(EditItem.title.length > 15){
                            flag = '标题必须小于15个字符';
                        }
                        if(!flag && !EditItem.brief){
                            flag = '请填写描述信息'
                        }else if(EditItem.brief.length > 30){
                            flag = '描述信息小于30个汉字';
                        }
                        if(Tab.curType === 3 && !flag && !EditItem.pic){
                            flag = '请上传二维码图片'
                        }
                        if(Tab.curType === 4 && !flag  && !EditItem.href){
                            flag = '请填写链接地址'
                        }
                        if(flag){
                            hint.Msg({message: flag});
                        }
                        return flag;
                    };
                if(validate()){
                    return;
                }else{
                    EditItem.id && (postData.id = EditItem.id);
                    postData.title = EditItem.title;
                    postData.type = EditItem.type;
                    postData.brief = EditItem.brief;
                    if(Tab.curType === 4){
                        postData.href = EditItem.href;
                        postData.xcx_href = EditItem.xcx_href;
                    }
                    postData.pic = EditItem.pic;
                }
                shortVideoPosterHandle(postData).then(data=>{
                    if(EditItem.id){
                        for(let v in EditItem){
                            originItem[v] = Edit.item[v];
                        }
                    }else{
                        EditItem.id = data.video_ad_id;
                        that.Tab.typeJson.list.unshift(EditItem);
                    }
                    Edit.selectedLinkTextWap = '';
                    Edit.selectedLinkTextXCX = '';
                    that.Layer.curState = 'tab';
                });
            },
            /**
             * @Date: 2020-02-04 21:13:33
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 保存门店
             * @param {type} 参数说明
             * @return: 返回值
             */
            saveStore(){
                let that = this,
                    Edit = that.Edit,
                    originItem = Edit.originItem,
                    EditItem = Edit.item,
                    postData = {},
                    validate = function(){
                        let flag = false;
                        for(let k in EditItem){
                            if(typeof(EditItem[k]) === 'string'){
                                EditItem[k] = EditItem[k].trim();
                            }
                        }
                        if(!EditItem.name){
                            flag = '请填写门店名称'
                        }else if(EditItem.name.length > 20){
                            flag = '门店名称必须小于20个字符';
                        }
                        /* if(!flag && !EditItem.pic){
                            flag = '请上传门店图片'
                        } */
                        if(!flag && !that.$util.pattern.mobile.test(EditItem.tel)){
                            flag = '请填写正确的手机号'
                        }
                        if(!flag && (!EditItem.province_name || !EditItem.city_name || !EditItem.county_name || !EditItem.address)){
                            flag = '请填写门店地址'
                        }
                        if(flag){
                            hint.Msg({message: flag});
                        }
                        return flag;
                    };
                if(validate()){
                    return;
                }else{
                    EditItem.id && (postData.id = EditItem.id);
                    postData.name = EditItem.name;
                    postData.tel = EditItem.tel;
                    postData.pic = EditItem.pic;
                    postData.address = EditItem.address;
                    postData.province = EditItem.province || EditItem.province_name;
                    postData.city = EditItem.city || EditItem.city_name;
                    postData.county = EditItem.county || EditItem.county_name;
                    postData.province_name = EditItem.province_name;
                    postData.city_name = EditItem.city_name;
                    postData.county_name = EditItem.county_name;
                    postData.longitude = EditItem.longitude;
                    EditItem.show_text = `${EditItem.addressText} ${EditItem.address}`;
                }
                shortVideoPosterStoreHandle(postData).then(data=>{
                    if(EditItem.id){
                        for(let v in EditItem){
                            originItem[v] = EditItem[v];
                        }
                    }else{
                        EditItem.id = data.store_id;
                        that.Tab.typeJson.list.unshift(EditItem);
                    }
                    that.Layer.curState = 'tab';
                })
            },
            /**
             * @description: 删除项目图片
             * @param {type}
             * @return:
             */
            delEditItemPic(picIndex){
                let that = this;
                if(Array.isArray(that.Edit.item.pic)){
                    that.Edit.item.pic.splice(picIndex, 1);
                }else{
                    that.Edit.item.pic = '';
                }
            },
            /**
             * @description: 上传图片
             * @param {type}
             * @return:
             */
            changeImage(event){
                let that = this,
                    Edit = that.Edit,
                    file =  event.srcElement, //当前file对象
                    files = file.files[0];
                if(files){
                    if(files.type && !/png|jpeg|gif|jpg/.test(files.type.toLowerCase())){
                        hint.Msg({message: '图片格式必须是png,jpg,gif'});
                        return
                    }
                    if(files.size > 31457280){
                        hint.Msg({message: '图片不能大于30M'});
                        return
                    }
                    Edit.picUploading = 1;
                    upLoadImage(file).then((res) => {
                        if(Array.isArray(Edit.item.pic)){
                            Edit.item.pic.push(res.path);
                        }else{
                            Edit.item.pic = res.path;
                        }
                        Edit.picUploading = 0;
                    });
                }
            },
            /**
             * @Date: 2020-02-04 18:28:49
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 选择城市打开方法
             * @param {type} 参数说明
             * @return: 返回值
             */
            selectCityFun(event){
                let that = this;
                that.Edit.selectedCityDom = event.target;
                that.Edit.selectCityShow = true;
                setTimeout(() => {
                    that.$refs.SelectCityLayer.showHideLayer(1);
                }, 1);
            },
            /**
             * @Date: 2020-02-04 18:27:39
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 城市选择回显
             * @param {type} 参数说明
             * @return: 返回值
             */
            changeCity(citylist){
                let that = this;
                if (citylist && citylist.length) {
                    let selectedCity = that.Edit.selectedCity,
                        EditItem = that.Edit.item,
                        text = '';
                    citylist.forEach((v, i) => {
                        selectedCity[i].code = v.code;
                        selectedCity[i].name = v.name;
                        switch(i){
                            case 0:
                                EditItem.province = v.code
                                EditItem.province_name = v.name
                                break;
                            case 1:
                                EditItem.city = v.code
                                EditItem.city_name = v.name
                                break;
                            case 2:
                                EditItem.county = v.code
                                EditItem.county_name = v.name
                                break;
                        }
                        text +=`${v.name} `;
                    });
                    EditItem.longitude = null;
                    that.Edit.item.addressText = text;
                }
                setTimeout(() => {
                    that.Edit.selectCityShow = false;
                }, 400);
            },
            /**
             * @Date: 2020-02-06 01:14:54
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 定位图标的点击方法
             * @param {type} 事件对象
             * @return: 返回值
             */
            selectGPSFun(event){
                let that = this,
                    Edit = that.Edit;
                that.Edit.selectedCityDom = null;
                Edit.selectGPSShow = true;
                setTimeout(() => {
                    that.$refs.BaiduGPSLayer.showHideLayer(1);
                }, 1);
            },
            /**
             * @Date: 2020-02-06 01:14:10
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 百度地图更改地址后回调
             * @param {type} 参数说明
             * @return: 返回值
             */
            bdGetCity(citylist){
                let that = this,
                    Edit = that.Edit;
                setTimeout(() => {
                    Edit.selectGPSShow = false;
                }, 400);
                if(citylist){
                    let selectedCity = that.Edit.selectedCity,
                        EditItem = Edit.item,
                        text = '';
                    selectedCity[0].name = citylist.province;
                    selectedCity[1].name = citylist.city;
                    citylist.area && (selectedCity[2].name = citylist.area);
                    EditItem.longitude = `${citylist.point.lng},${citylist.point.lat}`;
                    selectedCity.forEach((v, i) => {
                        switch(i){
                            case 0:
                                EditItem.province = ''
                                EditItem.province_name = v.name
                                break;
                            case 1:
                                EditItem.city = ''
                                EditItem.city_name = v.name
                                break;
                            case 2:
                                EditItem.county = ''
                                EditItem.county_name = v.name
                                break;
                        }
                        text +=`${v.name} `;
                    });
                    Edit.item.address = citylist.address;
                    that.Edit.item.addressText = text;
                }
            },
            /**
             * @Date: 2020-02-04 18:28:49
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 查找链接
             * @param {type} 参数说明
             * @return: 返回值
             */
            selectLinkFun(targets){
                let that = this,
                    Edit = that.Edit;
                Edit.selectedLinkDom = that.$refs[targets];
                switch(targets){
                    case 'wapLink':
                        Edit.linkType = 1;
                        break;
                    case 'xcxLink':
                        Edit.linkType = 2;
                        break;
                }
                that.Edit.FindLinkShow = true;
                setTimeout(() => {
                    that.$refs.FindLinkLayer.showHideLayer(1, Edit.linkType);
                }, 1);
            },
            /**
             * @Date: 2020-02-12 23:16:52
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 更改链接
             * @param {type} 参数说明
             * @return: 返回值
             */
            changeLink(linklist){
                let that = this,
                    Edit = that.Edit;
                if(linklist && linklist.length){
                    let text = '',
                        url = '';
                    linklist.forEach((v, i)=>{
                        text += v.name;
                        if(i !== linklist.length-1){
                            text += '>>';
                        }else{
                            url = v.url;
                        }
                    });
                    switch(Edit.linkType){
                        case 1:
                            Edit.selectedLinkTextWap = text;
                            Edit.item.href = url;
                            break;
                        case 2:
                            Edit.selectedLinkTextXCX = text;
                            Edit.item.xcx_href = url;
                            break;
                    }
                }
                setTimeout(() => {
                    that.Edit.FindLinkShow = false;
                }, 400);
            },
            /**
             * @description: 确定添加
             * @param {type}
             * @return:
             */
            addSubmit(){
                let that = this;
                that.showHideLayer(0, 'add');
            },
            /**
             * @Date: 2020-04-03 10:56:51
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 解决苹果输入框失去焦点的问题
             * @param {type} 参数说明
             * @return: 返回值
             */
            textBlur(){
                window.scroll();
            },
            /**
             * @Date: 2021-01-26 15:25:33
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 更改添加产品的分类方法
             * @param {*}
             * @return {*}
             */
            changeAddChannel(event){
                let val = event.srcElement.value*1,
                    Channel = this.Pro.channel;
                this.Edit.item.channelId = val;
                this.Edit.item.channelName = !!(val*1) ? Channel.list.find((v,i)=>{return v.id == val}).name : '请选择';
                this.Edit.item.selectProductClassTxt = '';
                this.Edit.item.classifyId.length = 0;
            },
            /**
             * @Date: 2021-01-27 17:52:45
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 新增产品选择产品分类
             * @param {*} event
             * @return {*}
             */
            selectProductClassFun(event){
                let that = this;
                if(!that.Edit.item.channelId){
                    hint.Msg({message: '请选择栏目'});
                    return;
                }
                that.Edit.ProductClassShow = true;
                setTimeout(() => {
                    that.$refs.ProductClassLayer.showHideLayer(1);
                }, 1);
            },
            /**
             * @Date: 2021-01-27 18:00:25
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 更改产品分类回调
             * @param {*} citylist
             * @return {*}
             */
            changeProductClass(linklist){
                let that = this,
                    Edit = that.Edit;
                if(linklist && linklist.length){
                    Edit.item.selectProductClassTxt = '';
                    Edit.item.classifyId.length = 0;
                    linklist.forEach((v, i)=>{
                        Edit.item.selectProductClassTxt += v.classname;
                        Edit.item.classifyId.push(v.id);
                        if(i !== linklist.length-1){
                            Edit.item.selectProductClassTxt += '>>';
                        }
                    });
                }
                setTimeout(() => {
                    that.Edit.ProductClassShow = false;
                }, 400);
            },
            /**
             * @Date: 2021-01-28 17:03:04
             * @LastEditors: qwguo
             * @LastEditTime: Do not edit
             * @description: 保存产品
             * @param {*}
             * @return {*}
             */
            saveProduct(){
                let that = this,
                    Edit = that.Edit,
                    EditItem = Edit.item,
                    postData = {},
                    validate = function(){
                        let flag = false;
                        for(let k in EditItem){
                            if(typeof(EditItem[k]) === 'string'){
                                EditItem[k] = EditItem[k].trim();
                            }
                        }
                        if(!EditItem.channelId){
                            flag = '请选择栏目';
                        }
                        if(!flag && !EditItem.name){
                            flag = '请填写产品名称'
                        }else if(EditItem.name.length > 20){
                            flag = '产品名称必须小于20个字符';
                        }else if(!EditItem.stock || Number(EditItem.stock) <= 0){
                            flag = '请输入库存'
                        } else if(Number(EditItem.stock) >= 1000000){
                            flag = '超过最大库存数量'
                        }
                        /* if(!flag && !EditItem.pic){
                            flag = '请上传门店图片'
                        } */

                        if(!flag && !EditItem.classifyId.length){
                            flag = '请选择产品类别';
                        }
                        if(flag){
                            hint.Msg({message: flag});
                        }
                        return flag;
                    };
                if(validate()){
                    return;
                }else{
                    postData.channel_id = EditItem.channelId;
                    postData.pro_name = EditItem.name;
                    // postData.pro_pic_arr = EditItem.pic;
                    postData.pro_price = EditItem.price;
                    postData.stock = EditItem.stock;
                    postData.one_class_id = EditItem.classifyId[0];
                    postData.tow_class_id = EditItem.classifyId[1] || 0;
                    postData.three_class_id = EditItem.classifyId[2] || 0;
                    EditItem.pic.forEach((v, i)=>{
                        postData['pro_pic_arr['+i+']'] = v;
                    });
                    if(!EditItem.pic.length){
                        if(that.$parent.Video && that.$parent.Video.vCover){
                            let imgUrl = that.$parent.Video.vCover.imgUrl;
                            imgUrl && (postData.default_pic = imgUrl);
                        }
                    }
                }
                proAddEditInfo(postData).then(data=>{
                    that.Pro.list.length = 0;
                    that.Pro.loading = that.Pro.ajaxFinish = false;
                    that.Pro.curPage = 1;
                    that.getProListData();
                    that.Layer.curState = 'tab';
                })
            },
        }

    }
</script>


<template>
  <div id="videoList" v-wechat-title="$route.meta.title= pageListTitle" :style="{background: videoListData != '' ? '#f5f5f5' : '' }">
      <div v-if="loading" style="padding-top:0.5rem;">
        <van-skeleton
            title
            avatar
            :row="3"
            :loading="loading"
            >
            </van-skeleton>
            <van-skeleton
            title
            avatar
            :row="3"
            :loading="loading"
            >
            </van-skeleton>
            <van-skeleton
            title
            avatar
            :row="3"
            :loading="loading"
            >
            </van-skeleton>
            <van-skeleton
            title
            avatar
            :row="3"
            :loading="loading"
            >
            </van-skeleton>
            <van-skeleton
            title
            avatar
            :row="3"
            :loading="loading"
            >
            </van-skeleton>

      </div>
    <van-loading v-if="showLoading" size="50px" color="#1989fa" />
    <van-overlay :show="showLoading" />
    <div v-if="Object.keys(videoListData).length">
        <!-- 顶部标题 -->
        <div class="titleFixed" v-if="Object.keys(videoListData).length && !searchStatus">
            <div class="voerTop_menuLeft" v-if="!videoListData.shortVideoVersion" @click="backPages">
                <span></span>
            </div>
            <span class="titleFixed_name">{{videoListData.companycn_info.name}}</span>
            <img @click="searchClick" src="@/pages/shop/static/images/video/videoList_search.png" alt=""/>
        </div>
        <!-- 分类 -->
        <div :class="ificationList.length > 4 ? 'videoList_classification videoList_classification2' :' videoList_classification'" v-if=" Object.keys(ificationList).length > 1 && !searchStatus">
            <van-tabs color="rgba(0,0,0,0)" @click="change_ification" v-model="activeTabs">
                <van-tab v-for="(item,index) in ificationList" :key="index" :title="item.name" ></van-tab>
            </van-tabs>
        </div>
        <!-- 搜索结果 -->
        <div class="search_resault" v-if="searchStatus">
            <div class="fullScoll_cus_top" style="border-bottom:0;">
                <div class="voerTop_menuLeft" @click="backOriginalPage">
                    <span></span>
                </div>
                <input type="text" v-model="searchText" @input="searchInput" placeholder="请输入搜索内容">
                <span @click="beginSearch" style="line-height:1;">搜索</span>
            </div>
        </div>
        <!-- 回到顶部 -->
        <div class="goBackTop" @click="goTopBtn" v-if="goTopStatus">
            <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoBackTop.png" alt=""/>
        </div>
            <!-- 有分类的数据 -->
            <div
                class="scrollView"
                :style="{top: !searchStatus && Object.keys(ificationList).length > 1 ? '1.68rem' : '1.05rem',background:'#f5f5f5'}"
                v-if=" !searchStatus"
            >
                <div class="videoList_box">
                    <van-swipe @change="onChangeSwiper" style="height:100%;" ref="swiperVan" :loop="false" :show-indicators="false">
                        <van-swipe-item style="height:100%;" v-for="(itemSwiper,indexSwiper) in cationList" :key="indexSwiper">
                            <div class="videoList_box_content" style="height:100%;overflow-y:scroll;" :id="'scrollViewId'+indexSwiper">
                            <div :style="{width:'100%',height: Object.keys(ificationList).length > 1 ? '0.3rem' : '0.1rem',background:'#f5f5f5'}"></div>
                                <div v-if="itemSwiper.is_change == 1">
                                    <div class="videoList_box_content_box clearfix" v-if="itemSwiper.evArr.left.length">
                                        <div class="item" :ref="'lBox' +indexSwiper " v-if="itemSwiper.evArr.left.length">
                                            <div :class="'videoList_box_content_children' + indexSwiper" style="position: relative;border-radius: 0.06rem;overflow: auto;margin-bottom: 0.14rem;height: 100%;" @click="goDetailPage(itemList.detail_url,0)" v-for="(itemList,indexList) in itemSwiper.evArr.left" :key="indexList">
                                                <div class="videoList_box_content_childrenImg">
                                                    <div class="shadowBox"></div>
                                                    <img :src="itemList.conver" alt="图片">
                                                </div>
                                                <div class="videoList_box_content_childrentitle">
                                                    <div class="childrentitle_width">
                                                        <span>{{itemList.title}}</span>
                                                    </div>
                                                </div>

                                                <!-- 点赞数 -->
                                                <div class="videoList_box_content_childrenZan">
                                                    <img src="@/pages/shop/static/images/video/videoList/videoListKan.png" alt="点赞数">
                                                    <span>{{itemList.browse_num_show}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item" style="float:right;" :ref="'rBox' +indexSwiper " v-if="itemSwiper.evArr.right.length">
                                            <div :class="'videoList_box_content_children' + indexSwiper" style="position: relative;border-radius: 0.06rem;overflow: auto;margin-bottom: 0.14rem;height: 100%;" @click="goDetailPage(itemList.detail_url,0)" v-for="(itemList,indexList) in itemSwiper.evArr.right" :key="indexList">

                                                <div class="videoList_box_content_childrenImg">
                                                    <div class="shadowBox"></div>
                                                    <img :src="itemList.conver" alt="图片">
                                                </div>
                                                <div class="videoList_box_content_childrentitle">
                                                    <div class="childrentitle_width">
                                                        <span>{{itemList.title}}</span>
                                                    </div>
                                                </div>

                                                <!-- 点赞数 -->
                                                <div class="videoList_box_content_childrenZan">
                                                    <img src="@/pages/shop/static/images/video/videoList/videoListKan.png" alt="点赞数">
                                                    <span>{{itemList.browse_num_show}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="pageNum == page_num && itemSwiper.evArr.left.length>2" class="bottom_sty">
                                            <span>我也是有底线的</span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="videoNoData_box" v-if="itemSwiper.accoding == 1">
                                            <div class="videoNoData_box_img">
                                                <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoNoData.png" />
                                            </div>
                                            <div class="videoNoData_text" >
                                                <span v-if="itemSwiper.accoding == 1">没有找到相关视频</span>
                                            </div>
                                        </div>
                                        <div class="videoNoData_box" v-else>
                                            <div class="videoNoData_box_img" style="display:block;text-align:center;width:100%;height:100%;">
                                                <!-- <img style="width:2.3rem;height:1.53rem;" src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoNoData2.png" /> -->
                                                <!-- <div style="color:#ccc;font-size:24rpx;margin">加载中...</div> -->
                                                <van-loading size="50px" color="#1989fa" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </div>
            <!-- 点击搜索之后的单列数据 -->
            <div
                class="scrollView"
                style="top:1.05rem;,background:'#f5f5f5'"
                v-if="searchStatus"
            >
                <div class="videoList_box">
                    <div class="videoList_box_content" style="height:100%;overflow-y:scroll;" id="scrollSearch">
                        <div class="videoList_box_content_box clearfix" v-if="evArr.left.length">
                            <div class="item" ref="lBoxT">
                                <div class="videoList_box_children2" style="position: relative;border-radius: 0.06rem;overflow: auto;margin-bottom: 0.14rem;height: 100%;" @click="goDetailPage(itemList.detail_url,1)" v-for="(itemList,indexList) in evArr.left" :key="indexList">
                                    <div class="videoList_box_content_childrenImg">
                                        <div class="shadowBox"></div>
                                        <img :src="itemList.conver" alt="图片">
                                    </div>
                                    <div class="videoList_box_content_childrentitle">
                                        <div class="childrentitle_width">
                                            <span>{{itemList.title}}</span>
                                        </div>
                                    </div>
                                    <div class="videoList_box_content_childrenZan">
                                        <img src="@/pages/shop/static/images/video/videoList/videoListKan.png" alt="点赞数">
                                        <span>{{itemList.browse_num_show}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="item" style="float:right;" ref="rBoxT">
                                <div class="videoList_box_children2" style="position: relative;border-radius: 0.06rem;overflow: auto;margin-bottom: 0.14rem;height: 100%;" @click="goDetailPage(itemList.detail_url,1)" v-for="(itemList,indexList) in evArr.right" :key="indexList">
                                    <div class="videoList_box_content_childrenImg">
                                        <div class="shadowBox"></div>
                                        <img :src="itemList.conver" alt="图片">
                                    </div>
                                    <div class="videoList_box_content_childrentitle">
                                        <div class="childrentitle_width">
                                            <span>{{itemList.title}}</span>
                                        </div>
                                    </div>

                                    <div class="videoList_box_content_childrenZan">
                                        <img src="@/pages/shop/static/images/video/videoList/videoListKan.png" alt="点赞数">
                                        <span>{{itemList.browse_num_show}}</span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="pageNum >= page_num && evArr.left.length>2" class="bottom_sty">
                                <span>我也是有底线的</span>
                            </div>
                        </div>
                        <div v-else>
                            <div class="videoNoData_box" v-if="onlyDataStatus">
                                <div class="videoNoData_box_img">
                                    <img src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoNoData.png" />
                                </div>
                                <div class="videoNoData_text">
                                    <span>没有找到相关视频</span>
                                </div>
                            </div>
                            <div class="videoNoData_box" v-else>
                                <div class="videoNoData_box_img" style="display:block;text-align:center;width:100%;height:100%;">
                                    <!-- <img style="width:2.3rem;height:1.53rem;" src="https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/videoNoData2.png" /> -->
                                    <!-- <div style="color:#ccc;font-size:24rpx;margin">加载中...</div> -->
                                    <van-loading size="50px" color="#1989fa" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
    <!-- 搜索弹窗 -->
    <CustomPopup ref="CustomSearchRef" @searchFun="closerSearchBtn">
        <div slot="PoperContentFull" class="PoperContentView">
            <div class="fullScoll_cus">
                <div class="fullScoll_cus_top">
                    <div class="voerTop_menuLeft" @click="closerSearchBtn">
                        <span></span>
                    </div>
                    <input @focus="focusSearch" type="text" v-model="searchText" placeholder="请输入搜索内容">
                    <span @click="beginSearch">搜索</span>
                </div>
                <div class="fullScoll_cus_bottom">
                    <div class="fullScoll_cus_bottom_title">
                        <span>历史搜索</span>
                        <img src="@/pages/shop/static/images/video/video_deleteIcon.png" @click="deleteHistory(0,1)" alt=""/>
                    </div>
                    <div v-if="historyList.length">
                        <div class="fullScoll_cus_bottom_child" v-for="(item,index) in historyList" :key="index" @click="searchBtn(item.name)">
                            <span>{{item.name}}</span>
                            <div style="padding-top:0.23rem;padding-bottom:0.23rem;padding-left:0.3rem;" @click.stop="deleteHistory(index)">
                                <img src="@/pages/shop/static/images/video/videoList_leibieClose.png"  alt=""/>
                            </div>
                        </div>
                    </div>
                    <div v-else style="text-align:center;margin-top:0.8rem;font-size:0.32rem;color:#999;">
                        <span>暂无搜索记录</span>
                    </div>
                </div>
            </div>
        </div>
    </CustomPopup>
    </div>
    <div class="zhezhao" v-if="zhezhaoStatus"></div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { Toast } from 'vant';
import util from '@/libs/util'

import { videoList,videoFenlei,videoSearchList,videoDeleteSearch} from "@/api/shop/video.frontend"
import { videoChannelShare } from "@/api/shop/video.frontend"

import CustomPopup from "./components/CustomPopup/custompopup.vue"

import MeScroll from "mescroll.js";
import 'mescroll.js/mescroll.min.css'
export default {
  name: "videoList",
  components:{
      CustomPopup
  },
  data(){
      return {
          loading:true,
          videoListData:'',
          titleFixedStatus:false,

        mescroll: null, // mescroll实例对象
        // evArr: [], // 列表数据
        evArr: {
            left: [],
            right: [],
        }, // 列表数据
        isEdit: false, // 是否获取编辑的列表数据
        showLoading:false,
        pageListTitle:'',
        mescrollDown:{},
        httpData:location.protocol+'//',
        shareInfo:'',
        searchStatus:0,
        list:[{},{}],
        pageNum: 1,
        page_num: 0,
        goTopStatus:false,
        classJson:{class_id:0},
        historyList:[{name:'111'},{name:'222'}],
        searchText:'',
        ificationList:[],
        //   标签栏默认索引
        activeTabs:0,
        cationList:[{evArr:{left:[],right:[]}}],
        current:0,
        cation_status:0,
        ifJiaZai:1,
        searchNum:1,
        onlyDataStatus:false,
        scrollNum:0,
        zhezhaoStatus:true,
        ifBackPage:false
      }
  },
  created(){
     if(!util.app.Platform()){
        if(this.$cookies.get("is_app") == 1 && this.$cookies.get("ios") != 1){
            window.android.updateRefreshType(-1);
        }
     }
      util.cookies.set("app-sign", 0, {
          expires: 24 * 3600 * 360,
          path: '/'
      });
  },
   computed: {
    },
    mounted(){
       let that = this,user_id = that.$cookies.get("zz_userid");
        //短视频列表
        that.videeListFun(1,1)

        this.$cookies.set('videoListKey','0')//用来判断从列表页跳转到详情页，详情页返回到列表页
        // setTimeout(function(){
        //    that.scrollJiaZai()
        // },800)
    },
    methods:{
        // 短视频列表
        // page:页码，
        // calssType：用来判断滚动加载方法用不用执行，1：执行，其它不执行
        // backType:从搜索结果返回到原来的页面，需要将轮播图滑动到原来的索引，1：执行，其它不执行
        videeListFun(page,calssType,backType){
            let that =this;
            if((page > 1 || calssType ==1) && that.ifJiaZai == 1){
                that.showLoading = true;
            }
            // that.scrollNum = 0
            let listJson={
                username:that.$route.query.username,
                page:page,
                real_host:location.host
            }
            if(that.ifHaveFun(that.$cookies.get("zz_userid"))){
                listJson.zz_userid = that.$cookies.get("zz_userid")
            }
            // 分类id
            if(that.classJson != '' && that.searchText == ''){
                listJson = Object.assign(listJson,that.classJson)
            }
            // 搜索内容
            if(that.searchText != ''){
                listJson.search_title = that.searchText
            }
            videoList(listJson).then(res=>{
                // 关闭加载层
                that.showLoading = false
                that.loading = false

                setTimeout(()=>{
                    this.ifBackPage = false
                },2000)

                if(!that.ifHaveFun(that.ificationList) && that.ificationList !== ''){
                    // 分类列表
                   that.videoFenleiFun()
                }
                if(that.ifHaveFun(that.$cookies.get("zz_userid"))){//获取搜索记录
                    that.videoSearchFun()
                }
                that.videoListData = res
                that.shareFun()
                that.page_num = res.page_num
                //如果是第一页需手动置空列表，点击搜索无分类的情况
                if (page == 1){
                    that.evArr.left = []
                    that.evArr.right = []
                };
                if(backType != 1){//如果是点击了返回就不在重新加载一次已经存在过的数据
                    if(that.cation_status == 0){//分类接口还没请求完(只执行一次)
                        setTimeout(()=>{
                            that.loopAdd(0,res.video_list,0)
                            that.zhezhaoStatus = false
                        },500)
                    }else{
                        setTimeout(()=>{
                            for(let i in that.cationList){
                                if(that.cationList[i].class_id == that.classJson.class_id){
                                    that.loopAdd(0,res.video_list,that.ifHaveFun(that.cationList[i].indexStatus) ? that.cationList[i].indexStatus : 0)
                                }
                            }
                            that.zhezhaoStatus = false
                        },500)
                    }
                }
                that.pageListTitle = res.channel_name
                
                if(calssType == 1){
                    if(!that.searchStatus){
                        setTimeout(function(){
                            that.scrollJiaZai()
                        },800)
                    }else{
                        if(!that.ifHaveFun(res.video_list)){
                            that.onlyDataStatus = true
                        }
                        setTimeout(function(){
                            $("#scrollSearch").scroll(function() {
                                var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
                                var nScrollTop = 0; //滚动到的当前位置
                                var nDivHight = $("#scrollSearch").height();
                                nScrollHight = $(this)[0].scrollHeight;
                                nScrollTop = $(this)[0].scrollTop;
                                if(nScrollTop > 10){
                                    that.goTopStatus = true
                                }else{
                                    that.goTopStatus = false
                                }
                                if (nScrollTop + nDivHight >= nScrollHight) {
                                    let pageNum = that.pageNum;
                                    pageNum = Number(pageNum) + 1;
                                    if (pageNum > that.page_num) {
                                        return false;
                                    }
                                    that.pageNum = pageNum
                                    that.videeListFun(pageNum);
                                }
                            });
                        },500)
                    }
                }
                if(calssType == 'search'){
                    if(!that.ifHaveFun(res.video_list)){
                        that.onlyDataStatus = true
                    }
                }
                if(backType == 1){
                    that.$refs.swiperVan.swipeTo(that.current);
                }

                

            }).catch(res=>{
                that.showLoading = false
                that.loading = false
                Dialog.alert({
                    message: res.msg
                }).then(() => {
                    location.href = '/wap_shenyue.html'
                });
            })
        },
        // 循环加载数据
        loopAdd(n,data,index,callback){
            const that = this
            if(!that.searchStatus){//有分类的情况（包括刚进页面无分类的情况
                that.$nextTick(() => {
                    if(n < data.length){
                        let lH,rH,lHRef='lBox'+index,rHRef = 'rBox'+index
                        lH = $(that.$refs[lHRef]).height()
                        rH = $(that.$refs[rHRef]).height()
                        if(lH < rH || lH == rH){
                            // if(index == that.cationList[index].indexStatus){
                                that.cationList[index].evArr.left.push(data[n])
                            // }
                            that.$nextTick(() => {
                                let className = '.videoList_box_content_children'+index
                                let imgurl = $(that.$refs[lHRef]).find(className+':last img')[0].src;
                                let img = new Image();
                                img.onload = function(){
                                    that.loopAdd(++n, data,index)
                                }
                                img.src = imgurl;
                            })
                        }else{
                            // if(index == that.cationList[index].indexStatus){
                                that.cationList[index].evArr.right.push(data[n])
                            // }
                            that.$nextTick(() => {
                                let className = '.videoList_box_content_children'+index
                                let imgurl = $(that.$refs[rHRef]).find(className+':last img')[0].src;
                                let img = new Image();
                                img.onload = function(){
                                    that.loopAdd(++n, data,index)
                                }
                                img.src = imgurl;
                            })
                        }
                    }
                })
                if(!that.ifHaveFun(data)){
                    that.cationList[index].accoding = 1
                }
                that.$forceUpdate()
            }else{  
               that.$nextTick(() => {//点击搜索之后无分类的情况
                    if(n < data.length){
                        let lH,rH;
                        lH = $(that.$refs.lBoxT).height()
                        rH = $(that.$refs.rBoxT).height()
                        if(lH < rH || lH == rH){
                            that.evArr.left.push(data[n])
                            that.$nextTick(() => {
                                    let imgurl = $(that.$refs.lBoxT).find('.videoList_box_children2:last img')[0].src;
                                    let img = new Image();
                                    img.onload = function(){
                                        that.loopAdd(++n, data)
                                    }
                                    img.src = imgurl;
                            })
                        }else{
                            that.evArr.right.push(data[n])
                            that.$nextTick(() => {
                                let className = '.videoList_box_children2'
                                let imgurl = $(that.$refs.rBoxT).find('.videoList_box_children2:last img')[0].src;
                                let img = new Image();
                                img.onload = function(){
                                    that.loopAdd(++n, data)
                                }
                                img.src = imgurl;
                            })
                        }
                    }
                })
            }

        },
        // 分类滚动加载数据
        scrollJiaZai(){
            let that = this;
            
            $("#scrollViewId"+that.current).scroll(function() {
                var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
                var nScrollTop = 0; //滚动到的当前位置
                var nDivHight = $("#scrollViewId"+that.current).height();
                nScrollHight = $(this)[0].scrollHeight;
                nScrollTop = $(this)[0].scrollTop;
                if(nScrollTop > 10){
                    that.goTopStatus = true
                    that.cationList[that.current].backStatus = 1
                }else{
                    that.goTopStatus = false
                    that.cationList[that.current].backStatus = 0
                }
                if (nScrollTop + nDivHight >= nScrollHight) {
                    if(that.scrollNum > 0){
                        return false;
                    }
                    that.ifJiaZai = 1
                    let pageNum = that.pageNum;
                    pageNum = Number(pageNum) + 1;
                    that.cationList[that.current].pageNum = pageNum
                    that.cationList[that.current].page_num = that.page_num;
                    if (pageNum > that.page_num) {
                        return false;
                    }
                    that.pageNum = pageNum
                    that.videeListFun(pageNum);
                    that.scrollNum = 1
                    setTimeout(()=>{
                        that.scrollNum = 0
                    },1000)
                }
            });
        },
        // 分类列表
        videoFenleiFun(){
            let that = this
             videoFenlei({
                username:that.$route.query.username,
                real_host:location.host,
                include_all:1
            }).then(res=>{
                that.ificationList = res.list
                that.cation_status = 1
                // 这个数组是轮播数组
                let cationList = res.list;
                that.cationList2 = res.list;
                if(!that.ifHaveFun(cationList)){
                    cationList=[{}];
                }
                for(let i in cationList){
                    cationList[i].is_change=0//用来判断这个短视频分类是否加载过
                    cationList[i].pageNum = 1//当前分类的页码
                    cationList[i].evArr={}
                    cationList[i].evArr.left=[]
                    cationList[i].evArr.right=[]
                    cationList[i].accoding = 0//用来判断“没有找到相关视频”文案的显示
                    cationList[i].indexStatus = 0//每次改变分类，添加对应的索引值，防止滑动过快，串数据的问题
                    if(i==0){cationList[i].is_change=1;cationList[i].class_id=0; cationList[i].backStatus =0;cationList[0].page_num = that.page_num}
                }
                that.cationList = cationList
                // setTimeout(function() {
                //     let box_width = that.$refs.params_detailTitle_box_id.clientWidth;
                //     let window_width = window.screen.width;
                //     that.box_width = parseInt(box_width);
                //     that.window_width = parseInt(window_width - 25);
                // }, 300);

                // 如果带着class_id从详情页返回
                setTimeout(()=>{
                        if(that.ifHaveFun(that.cationList2) &&(that.ifHaveFun(that.$route.query.class_id) || that.$route.query.class_id == 0)){
                        for(let i in that.cationList){
                            if(that.cationList[i].id == that.$route.query.class_id){
                            that.change_ification(i)
                            }
                        }
                    }
                },500)

                setTimeout(()=>{
                    if(that.ifHaveFun(that.$route.query.search_title)){
                        that.searchText = that.$route.query.search_title
                        that.beginSearch()
                    }
                },500)
            })
        },
        // 搜索列表
        videoSearchFun(){
            let that = this
             videoSearchList({
                username:that.$route.query.username,
                real_host:location.host,
            }).then(res=>{
                let list = res.list
                if(that.ifHaveFun(list)){
                   that.historyList = res.list
                }else{
                   that.historyList = []
                }
            })
        },
        // 选择分类
        change_ification(index){
            let that=this,classJson={};
            that.ifJiaZai = 0
            that.$refs.swiperVan.swipeTo(index);
            classJson.class_id = that.ificationList[index].id
            that.classJson=classJson
            that.current = index
            if(that.cationList[index].is_change == 0){
                that.zhezhaoStatus = true
                that.goTopStatus = false
                that.cationList[index].evArr={}
                that.cationList[index].evArr.left=[]
                that.cationList[index].evArr.right=[]
                that.cationList[index].indexStatus = index
                that.cationList[index].class_id = that.ificationList[index].id
                that.pageNum = 1
                that.cationList[index].is_change = 1
                that.videeListFun(1,1)
            }else{
                that.pageNum = that.cationList[index].pageNum
                that.page_num = that.cationList[index].page_num
                if( that.cationList[index].backStatus == 1){
                    that.goTopStatus = true
                }else{
                    that.goTopStatus = false
                }
                // that.scrollJiaZai()
            }
        },
        // 滑动轮播图
        onChangeSwiper(index){
            this.activeTabs = index
            let that=this,classJson={};
            that.ifJiaZai = 0
            classJson.class_id = that.ificationList[index].id
            that.classJson=classJson
            that.current = index
            if(that.cationList[index].is_change == 0){
                that.zhezhaoStatus = true
                that.goTopStatus = false
                that.cationList[index].evArr={}
                that.cationList[index].evArr.left=[]
                that.cationList[index].evArr.right=[]
                that.cationList[index].indexStatus = index
                that.cationList[index].class_id = that.ificationList[index].id
                that.pageNum = 1
                that.cationList[index].is_change = 1
                that.videeListFun(1,1)
            }else{
                that.pageNum = that.cationList[index].pageNum
                that.page_num = that.cationList[index].page_num
                if( that.cationList[index].backStatus == 1){
                    that.goTopStatus = true
                }else{
                    that.goTopStatus = false
                }
                // that.scrollJiaZai()
            }
        },
        // 跳转详情页
        goDetailPage(url,type){
            var class_id = this.ifHaveFun(this.cationList2) ? this.cationList[this.current].class_id : 0
            if(type == 0){//分类id
              location.href= this.httpData + url+'&class_id='+ Number(class_id)
            }else if(type == 1){//搜索名称
              var search_title = this.searchText
              location.href= this.httpData + url+'&search_title='+ search_title + '&class_id='+ class_id
            }
            this.$cookies.set('videoListKey','1')//用来判断从列表页跳转到详情页，详情页返回到列表页
            if(!util.app.Platform()){
                if(this.$cookies.get("is_app") == 1 && this.$cookies.get("ios") != 1){
                    window.android.updateRefreshType(1);
                }
            }
        },
        scrollFun(){
            window.addEventListener("scroll", this.handleScroll);
        },
        // 滚动函数
        handleScroll(){
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;

            if(scrollTop > 15){
                this.titleFixedStatus = true
            }else{
                this.titleFixedStatus = false
            }
        },

        // 返回上一页
        backPages(){
            if (document.referrer.length > 0) {
                if(this.ifHaveFun(this.$cookies.get('videoGoKey')) && this.$cookies.get('videoGoKey') == 1){
                    this.$cookies.set('videoGoKey','0')
                    location.href = this.videoListData.index_url;
                }else{
                    history.back();
                }
            } else {
                location.href = this.videoListData.index_url;
            }
            if(!util.app.Platform()){
                if(this.$cookies.get("is_app") == 1 && this.$cookies.get("ios") != 1){
                    window.android.updateRefreshType(1);
                }
            }
        },

        // 搜索
        searchClick(){
            this.$refs.CustomSearchRef.showMaskFull();
            // 判断是否登录，如果没登录，走缓存的历史记录
            if(this.ifHaveFun(this.$cookies.get("zz_userid"))){
                
            }else{
                this.historyList = this.ifHaveFun(this.$cookies.get("historyList")) ? JSON.parse(this.$cookies.get("historyList")) : []
            }
        },
        // 关闭搜索弹窗
        closerSearchBtn() {
            this.search_title = ''
            this.$refs.CustomSearchRef.maskCloseFull();
        },
        // 返回原来的页面
        backOriginalPage(){
            this.searchStatus = 0
            this.pageNum = 1
            this.searchText = ''
            this.searchNum=1
            this.videeListFun(1,1,1);
        },
        // 开始搜索
        beginSearch(){
            if(this.ifBackPage == true){
                return false;
            }
            if(!this.ifHaveFun(this.searchText)){
                Toast({message: "请输入搜索内容"});
                return false;
            }
            this.$refs.CustomSearchRef.maskCloseFull();
            this.searchStatus = 1
            this.pageNum = 1
            this.onlyDataStatus = false
            this.ifJiaZai = 1
            this.videeListFun(1,this.searchNum == 1 ? 1 : 'search')//这个搜索点击事件执行滚动加载只需要执行一次（传’‘的时候不执行）为了让滚动之加载一次
            this.searchNum = 2
            let user_id = this.$cookies.get("zz_userid");
            if(this.ifHaveFun(user_id)){
                this.videoSearchFun()
            }else{//未登录将搜索数据存到缓存里
                let historyList=this.ifHaveFun(this.$cookies.get("historyList")) ? JSON.parse(this.$cookies.get("historyList")) : [],ifAdd=0;
                let historyJson={
                    name:this.searchText
                }
                for(let i in historyList){
                    if(historyList[i].name == this.searchText){
                        ifAdd++
                    }
                }
                if(ifAdd == 0){
                    historyList.unshift(historyJson)
                }
                if(historyList.length > 10){
                    historyList.splice(10,Number(historyList.length) - 10)
                }
                this.$cookies.set("historyList",JSON.stringify(historyList))
            }
            this.ifBackPage = true

        },
        // 删除历史记录
        deleteHistory(index,type){
            let user_id = this.$cookies.get("zz_userid");
            if(type == 1){//全部删除
                if(this.ifHaveFun(user_id)){
                    if(!this.ifHaveFun(this.historyList)){
                        return false;
                    }
                    this.deltePopup('',1)
                }else{
                  this.historyList = []
                  this.$cookies.set("historyList",JSON.stringify(this.historyList))
                }
            }else{//单个删除
                if(this.ifHaveFun(user_id)){
                    this.deltePopup(this.historyList[index].id,'',index)
                }else{
                  this.historyList.splice(index,1)
                  this.$cookies.set("historyList",JSON.stringify(this.historyList))
                }
            }
        },
        // 删除历史记录接口
        deltePopup(log_id,all_log,index){
            let that = this;
            let deleteJson={
                username:that.$route.query.username,
            }
            if(that.ifHaveFun(log_id)){//单个删除
                deleteJson.log_id = log_id
                this.historyList.splice(index,1)
            }
            if(that.ifHaveFun(all_log)){//全部删除
                deleteJson.all_log = all_log
                this.historyList=[]
            }
            videoDeleteSearch(deleteJson).then(res=>{})
        },
        //点击搜索内容
        searchBtn(name){
            this.searchText = name
            this.$refs.CustomSearchRef.maskCloseFull();
            this.onlyDataStatus = false
            this.searchStatus = 1
            this.pageNum = 1
            this.searchNum = 2
            this.ifJiaZai = 1
            this.videeListFun(1,1)
        },
        // 回到顶部
        goTopBtn(){
            let that =this;
            if(!that.searchStatus){
                $("#scrollViewId"+that.current).animate({scrollTop:0},500)
                setTimeout(()=>{
                        that.goTopStatus =false
                },500)
            }else{
                $("#scrollSearch").animate({scrollTop:0},500)
                setTimeout(()=>{
                        that.goTopStatus =false
                },500)
            }
        },
        searchInput(){
            if(!this.ifHaveFun(this.searchText)){
                // this.$refs.CustomSearchRef.showMaskFull();
            }
        },
        focusSearch(){
            $('.videoNoData_box').scrollTop = 0
        },
        // 微信分享
        // shareFun() {
        //     this.shareCan()
        //     // util.wechat.share(this.wxRegCallback, href, this.$route.query.username,1)
        // },
        // 分享参数
        shareFun(){
            var that = this,href=location.href;
            videoChannelShare({
                username:that.$route.query.username,
            }).then(res=>{
                // 用于微信JS-SDK回调
                    this.shareInfo = {
                        title: res.share_title,
                        desc: res.share_des,
                        link: location.href,
                        imgUrl: res.share_pic
                        // imgUrl: this.videoData[this.nowIndex].conver
                    }
                util.wechat.share(this.wxRegCallback, href, that.$route.query.username,1)
            }).catch(res=>{
                Dialog.alert({
                    message: res.msg
                }).then(() => {
                    // location.href = '/wap_shenyue.html'
                });
            })
        },
        // 微信分享
        wxRegCallback(data) {
           let that = this
                // 微信自定义分享给朋友
                let option = {
                    title: this.shareInfo.title, // 分享标题, 请自行替换
                    desc: this.shareInfo.desc, // 分享描述, 请自行替换
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
        // 判断是否存在该数值
        ifHaveFun(value){
            if(JSON.stringify(value) == '{}' || value == '' || value == undefined || value == null || value === false || value ==0){
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
    },
    watch:{
        videoListData:{
            handler(val,oldval){
                if(val != '{}'){
                    let that =this
                    setTimeout(function(){
                        that.scrollFun()
                    })
                }
            },
            deep:true
        }
    },

};
</script>

<style scoped lang="scss">
@import "@/pages/shop/static/css/videoList.scss";
</style>
<style lang="scss">
.videoList_classification2{
    .van-tab{
        flex:none !important; 
        padding:0;
        padding-left:0.25rem;
        padding-right:0.25rem;
        position:relative;
   }
   .van-tab--active{
       position:relative !important;
       font-weight:bold ;
   }
   .van-tab--active span::before{
       position:absolute;
       content:'';
       width:100%;
       height:0.05rem;
       background:#FF7E00;
       border-radius:0.05rem;
       bottom: -15%;
       left:0;
        z-index:100;
   }
   .vanoverflow_y{
       overflow-y:scroll;
   }
}
.van-tab--active span::before{
       position:absolute;
       content:'';
       width:100%;
       height:0.05rem;
       background:#FF7E00;
       border-radius:0.05rem;
       bottom: -17%;
       left:0;
        z-index:100;
   }
//    .van-tab--active span::before{
//         position:absolute;
//        content:'';
//        width:100%;
//        height:0.05rem;
//        background:#FF7E00;
//        border-radius:0.05rem;
//        bottom: -15%;
//        left:0;
//         z-index:100;
//    }
</style>
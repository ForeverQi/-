webpackJsonp([33,94],{AXhc:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("zH2g");var i={data:function(){return{link:location.href,poserImg:""}},props:["data"],methods:{Share:function(t){this.$util.app.Shop.Share.wechat({wtype:t,title:this.data.item.title,content:this.data.item.description,image:this.data.item.conver,link:this.link})},Close:function(){this.$util.variable.Set({key:"ShopVideoBacShare",val:!1})},Poster:function(){this.$util.variable.Set({key:"ShopVideoBacPoster",val:!0})}}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"shareContet",staticStyle:{transform:"translateY(0)"}},[i("div",{staticClass:"shareContet_box"},[i("div",{staticClass:"shareContet_box_top"},[t._m(0),t._v(" "),i("div",{staticClass:"shareContet_box_top_operation"},[i("div",{staticClass:"shareContet_box_top_operation_cnt",on:{click:function(e){return t.Share(1)}}},[i("img",{attrs:{src:s("lZGN"),alt:""}}),t._v(" "),t._m(1)]),t._v(" "),i("div",{staticClass:"shareContet_box_top_operation_cnt",on:{click:function(e){return t.Share(0)}}},[i("img",{attrs:{src:s("RfTz"),alt:""}}),t._v(" "),t._m(2)]),t._v(" "),i("div",{staticClass:"shareContet_box_top_operation_cnt",on:{click:function(e){return t.Poster()}}},[i("img",{attrs:{src:s("OgDU"),alt:""}}),t._v(" "),t._m(3)]),t._v(" "),i("div",{staticClass:"shareContet_box_top_operation_cnt",on:{click:function(e){return t.$util.app.Shop.Share.copy({content:t.link})}}},[i("img",{attrs:{src:s("w43U"),alt:""}}),t._v(" "),t._m(4)])])]),t._v(" "),i("div",{staticClass:"shareContet_box_bottom"},[i("span",{staticStyle:{cursor:"pointer"},on:{click:t.Close}},[t._v("取消")])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"shareContet_box_top_title"},[e("span",[this._v("分享")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",[this._v("分享好友")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",[this._v("分享朋友圈")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",[this._v("分享海报")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",[this._v("复制链接")])])}]};var n=s("C7Lr")(i,a,!1,function(t){s("heYY")},"data-v-5f1c5ad9",null);e.default=n.exports},Dixh:function(t,e){},Ovb2:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("4YfN"),a=s.n(i),n=(s("RJSr"),s("dT7Q")),o=s("0IQH"),r=(s("AXhc"),s("ZQn7")),c=s("mUeO"),l={name:"detail",data:function(){return{loading:!1,Video:{playing:!1,curVideo:null,curEditItem:null,sumList:[],list:[],info:{}},vClassify:{id:0,name:"无"},curVideoItem:null,advertLayer:{loading:!1,show:0,conShow:0,curState:"edit",proList:[]}}},components:{actions:function(){return s.e(99).then(s.bind(null,"PdtU"))},share:function(){return s.e(96).then(s.bind(null,"mQ8L"))},poster:function(){return s.e(93).then(s.bind(null,"aXEM"))},SelectClassify:r.a},created:function(){this.$util.app.Shop.Refresh(!1,0),this.$util.variable.Setbatch([{key:"ShopVideoBacActions",val:!1},{key:"ShopVideoBacShare",val:!1},{key:"ShopVideoBacPoster",val:!1}])},mounted:function(){this.Video;this.getVideoData(),this.GestureGoHome(),this.$util.app.Shop.ShowFooterMenu(0)},methods:{getVideoData:function(){var t=this,e=this,s=$("#VLBox"),i=s.height(),a=s.width(),n=a/i,r=e.Video,l=null;e.loading=!0,l=r.curVideo?r.id:e.$route.query.id,Object(c.q)({username:this.$util.shopVideo.username(),not_publish:1,id:l,back:1,is_backstage:1,class_id:e.$route.query.class_id,search_title:e.$route.query.search_title}).then(function(s){r.list.length=0;var l=s[0];r.list.push(l),t.$util.variable.AxiosErrorPopup=!1,Object(c.h)({username:t.$util.shopVideo.username(),play_id:l.video_id,video_id:l.id}).then(function(t){var s=t.width/t.height,o=new Image;o.onload=function(){o.width>o.height?l.cConver=l.conver_origina+"?x-oss-process=image/resize,m_lfit,h_"+i+",w_"+a+",limit_0":l.cConver=l.conver_origina+"?x-oss-process=image/resize,m_mfit,h_"+i+",w_"+a+",limit_0",e.loading=!1,l.styles=s>n&&s<.75?{height:"100%"}:{width:"100%"},l.video_url=t.url},o.onerror=function(){e.loading=!1,l.video_url=t.url},o.src=l.conver_origina}).catch(function(e){o.a.Alert({message:e.msg}).then(function(e){t.$util.functions.GoBack()})})}).catch(function(e){o.a.Alert({message:"视频获取失败"}).then(function(e){t.$util.functions.GoBack()})})},playVideo:function(t){var e=this.Video,s=$(t.srcElement).closest(".v-box"),i=s.find("video")[0];s.find(".play-btn");i.getAttribute("ended")||(i.onended=function(){e.playing=!1,i.setAttribute("ended","ended")}),i.paused?(setTimeout(function(){i.play()},10),e.playing=!0):(i.pause(),e.playing=!1)},bindEvent:function(){var t=this.Video,e=$("#VLBox"),s=null,i=null,a=null,n=null,o=null,r=null,c=null,l=null,d=!0;e.on({touchstart:function(t){d&&(c=null,s=$(t.originalEvent.srcElement).closest(".v-l-item"),i=s.siblings(".item-prev"),a=s.siblings(".item-next"),n=t.originalEvent.changedTouches[0].pageY,o=(new Date).getTime())},touchmove:function(t){d&&(r=t.originalEvent.changedTouches[0].pageY,c=n-r,s.css({transform:"translateY("+-c+"px)"}),c<0?(a.css({transform:"translateY(0px)"}),i.css({transform:"translateY("+-c+"px)"})):(i.css({transform:"translateY(0px)"}),a.css({transform:"translateY("+-c+"px)"})),t.preventDefault())},touchend:function(n){d&&null!==c&&(e.addClass("animated"),d=!1,l=(new Date).getTime(),Math.abs(c)>200||l-o<200&&Math.abs(c)>30?(c>0?(s.css({transform:"translateY(-100%)"}),a.css({transform:"translateY(-100%)"})):(s.css({transform:"translateY(100%)"}),i.css({transform:"translateY(100%)"})),setTimeout(function(){e.removeClass("animated");var n=s.find("video")[0];n.pause(),n.currentTime=0,c>0?(s.addClass("item-prev"),a.removeClass("item-next"),i.removeClass("item-prev").addClass("item-next"),setTimeout(function(){var e=a.find("video")[0];t.playing=!0,e.play()})):c<0&&(s.addClass("item-next"),i.removeClass("item-prev"),a.removeClass("item-next").addClass("item-prev"),setTimeout(function(){i.find("video")[0].play(),t.playing=!0})),s.css({transform:"translateY(0px)"}),a.css({transform:"translateY(0px)"}),i.css({transform:"translateY(0px)"}),d=!0},300)):(s.css({transform:"translateY(0px)"}),a.css({transform:"translateY(0px)"}),i.css({transform:"translateY(0px)"}),setTimeout(function(){e.removeClass("animated"),d=!0},200)))}})},showHideLayer:function(t,e){var s=this;s.curAdvert;1===t?(s.Layer.show=t,s.Layer.curState=e,setTimeout(function(){s.Layer.conShow=t},1)):(s.Layer.conShow=t,setTimeout(function(){s.Layer.show=t},200))},handleVideo:function(t){this.Video.curEditItem=t,this.$util.variable.Set({key:"ShopVideoBacActions",val:!0})},backPage:function(){this.$util.app.Shop.Refresh(!0,0),this.$route.query.search_title?this.$router.push({path:"/shop/bac/video/search",query:{search_title:this.$route.query.search_title}}):this.$router.push({path:"/shop/bac/video/index",query:{class_id:this.$route.query.class_id}})},showHideAdvert:function(t,e,s){var i=this.advertLayer;if(1===t)i.show=t,setTimeout(function(){i.conShow=t},1),1!==e.poster_type||i.proList.length||(i.loading=!0,Object(c.D)({username:this.$util.shopVideo.username(),channel_id:e.poster_info.channel_id,front:0,pro_ids_str:e.poster_info.pro_ids_str}).then(function(t){i.loading=!1,t.pro_list.forEach(function(t){i.proList.push(t)})}));else{if(e&&3===e.poster_type&&"bg"===s)return!1;setTimeout(function(){i.show=t},300),i.conShow=t}},golook:function(){o.a.Msg({message:"App中不能查看"})},GestureGoHome:function(){var t=this;setTimeout(function(){window.goGestureCallback=function(){t.backPage(),t.$util.app.Shop.Refresh(!0,0)}})},selectClassifyShow:function(t){this.curVideoItem=t,this.vClassify.id=t.class_id,this.vClassify.name=t.class_name,this.$refs.selectClassifyLayer.showClassifyLayer(1)},selectClassifyBack:function(t,e){if(t&&0!=t.id){var s=this,i=s.vClassify;t.id!=i.id?n.a.confirm({className:"video-dialog-alert",message:'确认把该视频更改到"'+t.name+'"分类下吗?',confirmButtonColor:"#FF9900"}).then(function(){Object(c.G)(a()({"video_ids[0]":s.curVideoItem.id},{class_id:t.id})).then(function(i){s.vClassify.id=t.id,s.vClassify.name=t.name,s.curVideoItem.class_id=t.id,s.curVideoItem.class_name=t.name,o.a.Msg({message:"更改成功"}),setTimeout(function(){e(0)},100)})}).catch(function(){}):o.a.Msg({message:"当前视频已经在此分类下"})}else o.a.Msg({message:"请选择分类项"})}}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"video-detail-wrap",style:{top:t.$store.getters.variables.many.BarHeight+"px"}},[s("div",{staticClass:"v-l-box",attrs:{id:"VLBox"}},[t.loading?t._e():t._l(t.Video.list,function(e,i){return s("div",{key:e.video_id,staticClass:"v-l-item",attrs:{"data-id":e.id}},[s("div",{staticClass:"v-box",on:{click:function(e){return t.playVideo(e)}}},[s("video",{style:e.styles,attrs:{src:e.video_url,poster:e.cConver,loop:"","x5-video-player-type":"h5-page","x5-video-player-fullscreen":"true",playsinline:"true","webkit-playsinline":"true"}}),t._v(" "),s("transition",{attrs:{name:"custom-classes-transition","enter-active-class":"animated amplifyIn","leave-active-class":"animated amplifyOut"}},[t.Video.playing?t._e():s("span",{staticClass:"play-btn"},[s("svg",{staticClass:"icon",attrs:{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2862"}},[s("path",{attrs:{d:"M780.8 475.733333L285.866667 168.533333c-27.733333-17.066667-64 4.266667-64 36.266667v614.4c0 32 36.266667 53.333333 64 36.266667l492.8-307.2c29.866667-14.933333 29.866667-57.6 2.133333-72.533334z","p-id":"2863"}})])])])],1),t._v(" "),s("div",{staticClass:"company-info"},[s("i",[s("img",{attrs:{src:e.companycn_info.logo}})]),t._v("\n                    "+t._s(e.companycn_info.name)+"\n                ")]),t._v(" "),s("i",{staticClass:"sjzs-icon s-icon-cross-1",on:{click:t.backPage}}),t._v(" "),t.advertLayer.show?s("div",{staticClass:"advert-box",on:{click:function(s){return t.showHideAdvert(0,e,"bg")}}},[s("transition",{attrs:{name:"custom-classes-transition","enter-active-class":"animated fadeInLeftBig","leave-active-class":"animated fadeOutLeftBig"}},[3!=e.poster_type&&t.advertLayer.conShow?s("ul",{staticClass:"list-box link-advert"},[t.advertLayer.loading?s("li",{staticClass:"loading-icon"}):[2===e.poster_type?s("li",{staticClass:"list-item store-list-item",on:{click:function(e){return e.stopPropagation(),t.golook(e)}}},[s("div",{staticClass:"img-box"},[s("img",{attrs:{src:e.poster_info[0].poster_storepic,alt:"我的链接描述我的链接描述我的链接描述我的链接描述"}})]),t._v(" "),s("dl",{staticClass:"attr-box"},[s("dt",[s("span",[t._v(t._s(e.poster_info[0].poster_storename))])]),t._v(" "),s("dd",[s("ul",[s("li",[s("span",[s("em",[t._v("电话：")]),s("b",[t._v(t._s(e.poster_info[0].poster_storetel))])]),t._v(" "),s("i",{staticClass:"tel-icon"})]),t._v(" "),s("li",[s("span",[s("em",[t._v("地址：")]),s("b",[t._v(t._s(e.poster_info[0].poster_storeaddress))])]),t._v(" "),s("i",{staticClass:"location-icon"})])])])])]):t._e(),t._v(" "),4===e.poster_type?s("li",{staticClass:"list-item link-list-item"},[s("div",{staticClass:"img-box"},[s("img",{attrs:{src:e.poster_info[0].pic}})]),t._v(" "),s("dl",{staticClass:"attr-box"},[s("dt",[s("span",[t._v(t._s(e.poster_info[0].title))])]),t._v(" "),s("dd",[s("p",[t._v(t._s(e.poster_info[0].brief))])])]),t._v(" "),s("div",{staticClass:"edit-box"},[s("span",{staticClass:"look-btn",on:{click:function(e){return e.stopPropagation(),t.golook(e)}}},[t._v("去看看")])])]):t._e(),t._v(" "),1===e.poster_type?t._l(t.advertLayer.proList,function(e,i){return s("li",{key:i,staticClass:"list-item pro-list-item"},[s("div",{staticClass:"img-box"},[s("img",{attrs:{src:e.pro_pic,alt:e.pro_name}})]),t._v(" "),s("dl",{staticClass:"attr-box"},[s("dt",[s("span",[t._v(t._s(e.pro_name))])]),t._v(" "),s("dd",[e.full_cut_info?s("div",{staticClass:"sales-box"},t._l(e.full_cut_info.rule_alert,function(e,i){return s("span",[t._v(t._s(e))])}),0):t._e(),t._v(" "),s("div",{staticClass:"price-box"},[e.pro_tag?t._e():[1==e.pro_original_price_show?[s("span",{staticClass:"vip-p"},[t._v(t._s(e.pro_price))]),t._v(" "),s("span",{staticClass:"com-p"},[t._v(t._s(e.pro_original_price))])]:t._e(),t._v(" "),0==e.pro_original_price_show?[s("span",{staticClass:"vip-p"},[t._v(t._s(e.pro_price))])]:t._e()],t._v(" "),e.pro_tag?[s("span",{staticClass:"vip-p"},[t._v(t._s(e.pro_price))]),t._v(" "),s("span",{staticClass:"com-p"},[t._v(t._s(e.pro_original_price))]),t._v(" "),s("span",{staticClass:"tag",class:{"vip-tag":"会员价"==e.pro_tag,"xsg-tag":-1!=["限时购","清仓购"].indexOf(e.pro_tag)}},[t._v(t._s(e.pro_tag))])]:t._e()],2),t._v(" "),s("div",{staticClass:"edit-box"},[s("span",{staticClass:"look-btn",on:{click:t.golook}},[t._v("去看看")])])])]),t._v(" "),s("em",{staticClass:"del-btn",on:{click:function(s){return t.delProAdvert(e.id)}}})])}):t._e()]],2):t._e()]),t._v(" "),3==e.poster_type?s("div",{staticClass:"popup-area"},[s("transition",{attrs:{name:"custom-classes-transition","enter-active-class":"animated zoomIn","leave-active-class":"animated zoomOut"}},[t.advertLayer.conShow?s("div",{staticClass:"popup-box"},[s("div",{staticClass:"code-popup"},[s("h5",[t._v(t._s(e.poster_info[0].title))]),t._v(" "),s("p",[t._v(t._s(e.poster_info[0].brief))]),t._v(" "),s("div",{staticClass:"pic-box"},[s("img",{attrs:{src:e.poster_info[0].pic}})]),t._v(" "),s("p",[t._v("长按识别二维码")])]),t._v(" "),s("i",{staticClass:"close",on:{click:function(e){return t.showHideAdvert(0)}}})]):t._e()])],1):t._e()],1):t._e(),t._v(" "),s("div",{staticClass:"v-foot"},[s("div",{staticClass:"v-classify"},[s("span",[t._v("分类："+t._s(e.class_name))]),t._v(" "),s("i",{on:{click:function(s){return t.selectClassifyShow(e)}}},[t._v("更换")])]),t._v(" "),s("h5",[t._v(t._s(e.title))]),t._v(" "),s("div",{staticClass:"v-func"},[0!=e.poster_type?s("span",{class:["func-icon","func-"+["pro","store","code","link"][e.poster_type-1]],on:{click:function(s){return t.showHideAdvert(1,e)}}}):t._e(),t._v(" "),s("div",{staticClass:"func-list"},[s("span",{staticClass:"func-item"},[s("b",[t._v(t._s(e.browse_num_show))]),t._v(" "),s("i",[t._v("浏览人次")])]),t._v(" "),s("span",{staticClass:"func-item"},[s("b",[t._v(t._s(e.like_num_show))]),t._v(" "),s("i",[t._v("点赞次数")])]),t._v(" "),s("span",{staticClass:"func-item"},[s("b",[t._v(t._s(e.share_num_show))]),t._v(" "),s("i",[t._v("分享次数")])])]),t._v(" "),s("div",{staticClass:"func-more",on:{click:function(s){return t.handleVideo(e)}}},[s("i")])])])])})],2),t._v(" "),t.loading?t._e():s("SelectClassify",{ref:"selectClassifyLayer",attrs:{title:"更改视频分类",enterText:"确定",info:t.vClassify},on:{closeBack:t.selectClassifyBack}}),t._v(" "),t.Video.curEditItem&&t.$store.getters.variables.many.ShopVideoBacActions?s("actions",{attrs:{data:{item:t.Video.curEditItem,index:t.Video.curEditItem.id}}}):t._e(),t._v(" "),t.Video.curEditItem&&t.$store.getters.variables.many.ShopVideoBacShare?s("share",{attrs:{data:{item:t.Video.curEditItem,index:t.Video.curEditItem.id}}}):t._e(),t._v(" "),t.Video.curEditItem&&t.$store.getters.variables.many.ShopVideoBacPoster?s("poster",{attrs:{data:{item:t.Video.curEditItem,index:t.Video.curEditItem.id}}}):t._e()],1)},staticRenderFns:[]};var _=s("C7Lr")(l,d,!1,function(t){s("Dixh")},null,null);e.default=_.exports},RfTz:function(t,e,s){t.exports=s.p+"static/img/pyq.644f00e.png"},heYY:function(t,e){}});
//# sourceMappingURL=33.9896db4c47809a6f909d.js.map
webpackJsonp([84],{RPK8:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("0IQH"),i=e("TVG1"),n=e("VTmd"),r=e("h2aJ"),o=e("+6og"),l=(console.log,{components:{Nav:o.a},data:function(){return{salesDate:"",page:1,pageCnt:0,salesDateList:[],type:0,tabNume:0,options:"",showLoading:!1,bgcColor1:"",bottomNum:0}},created:function(){},mounted:function(){if(!i.a.functions.ifHaveFun(this.$cookies.get("zz_userid")))return location.href="/dom/denglu.php?username="+this.$route.query.username+"&wap=1",!1;this.getColorFun(),this.orderId=this.$route.query.orderId,this.salesDateList=[],this.page=1,1==this.$cookies.get("afterSales_state")&&(this.tabNume=1,this.type=1),this.salesDateFun(this.$route.query.orderId)},methods:{salesDateFun:function(t){var s=this;s.showLoading=!0;var e={state:s.type,page:s.page,username:s.$route.query.username,zz_userid:s.$cookies.get("zz_userid"),client_type:1};t&&(e.order_id=parseInt(t)),Object(r.f)(e).then(function(e){s.showLoading=!1;var a=s.salesDateList;if(a=a.concat(e.returns_list),i.a.functions.ifHaveFun(a))for(var n in a)for(var r in a[n].pro_list){var o=String(a[n].pro_list[r].pay_price),l=o.substring(0,o.indexOf(".")),_=o.replace(/\d+\.(\d*)/,"$1");a[n].pro_list[r].shiji_money_left=l,a[n].pro_list[r].shiji_money_right=_}s.salesDate=e,s.salesDateList=i.a.functions.ifHaveFun(a)?a:[],s.pageCnt=e.page_cnt,s.bottomNum=1,setTimeout(function(){$(".afterSalesList").scroll(function(){var e=$(this)[0].scrollHeight;if($(this)[0].scrollTop+$(this).height()+100>=e){if(s.page>s.pageCnt||0==s.bottomNum||!s.salesDateList.length)return!1;s.bottomNum=0,s.page=s.page+1,s.salesDateFun(t)}})})}).catch(function(t){s.showLoading=!1,a.a.Alert({message:res.msg}).then(function(){window.history.back()})})},getColorFun:function(){var t=this;Object(n.c)({username:this.$route.query.username}).then(function(s){t.bgcColor1=i.a.functions.newColor(s.color).bgcColor1})},changeTab:function(t){this.type=t,this.salesDateList=[],this.tabNume=t,this.page=1,this.salesDateFun(this.orderId),this.$cookies.set("afterSales_state",t)},salesDetails:function(t,s,e,a){1==a?this.$router.push({path:"/order/orderRelated/jdAfterType",query:{jdStatus:1,detailId:s,orderId:t,proid:e,username:this.$route.query.username}}):this.$router.push({path:"/order/orderRelated/returnGoods",query:{detailId:s,orderId:t,redirect:"returnListnone",username:this.$route.query.username}})},goSalesDetail:function(t,s){this.$router.push({path:"/order/orderRelated/afterSalesDetail",query:{id:t,jdStatus:s,redirect:"returnListnone",username:this.$route.query.username}})},onReachBottom:function(){var t=this.page;t<=this.pageCnt?(t++,this.page=t,this.salesDateFun()):this.noData=!0}}}),_={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("section",{staticClass:"afterSalesList-box"},[e("section",{staticClass:"afterSalesList"},[t.showLoading?e("van-loading",{attrs:{size:"50px",color:"#1989fa"}}):t._e(),t._v(" "),e("van-overlay",{attrs:{show:t.showLoading}}),t._v(" "),""!=t.salesDate?e("div",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:t.$route.meta.title=t.salesDate.tips.shouhoushenqing,expression:"($route.meta.title = salesDate.tips.shouhoushenqing)"}],staticClass:"wrapper"},[e("Nav",{attrs:{numerical:6,tips:t.salesDate.tips}}),t._v(" "),e("div",{staticClass:"wrapper_c"},[t._m(0),t._v(" "),e("div",{staticClass:"Max_Center"},[e("div",{staticClass:"tab_head"},[e("div",{staticClass:"tab_head_li",on:{click:function(s){return t.changeTab(0)}}},[e("div",{style:{fontWeight:0==t.tabNume?"bold":"",fontSize:"0.28rem"}},[t._v("\n                                "+t._s(t.salesDate.tips.shouhoushenqing)),0==t.tabNume?e("span",{staticClass:"bottomXian",style:{background:t.bgcColor1}}):t._e()])]),t._v(" "),e("div",{staticClass:"tab_head_li",on:{click:function(s){return t.changeTab(1)}}},[e("div",{style:{fontWeight:1==t.tabNume?"bold":"",fontSize:"0.28rem"}},[t._v("\n                                "+t._s(t.salesDate.tips.shenqingjilu)),1==t.tabNume?e("span",{staticClass:"bottomXian",style:{background:t.bgcColor1}}):t._e()])])]),t._v(" "),0==t.type?e("section",[e("div",{directives:[{name:"show",rawName:"v-show",value:t.salesDateList.length>0,expression:"salesDateList.length > 0"}],staticClass:"order_list"},t._l(t.salesDateList,function(s,a){return e("div",{key:a,staticClass:"order_li"},[e("div",{staticClass:"order_top"},[e("div",{staticClass:"shop_name"},[t._m(1,!0),t._v(" "),e("div",{staticClass:"home_txt"},[t._v(t._s(s.shops_name))])])]),t._v(" "),t._l(s.pro_list,function(a,i){return e("div",{key:i},[e("div",{staticClass:"order_center"},[e("div",{staticClass:"order_money"},[e("div",{staticClass:"money"},[e("span",[t._v(t._s(t.salesDate.currency_symbol))]),t._v(t._s(a.shiji_money_left)),e("span",[t._v("."+t._s(a.shiji_money_right))])]),t._v(" "),e("div",{staticClass:"Number"},[t._v(t._s(a.num_info))])]),t._v(" "),e("div",{staticClass:"order_name"},[e("div",{staticClass:"shop_img"},[e("img",{attrs:{src:a.pic}})]),t._v(" "),e("div",{staticClass:"shop_link"},[e("div",{staticClass:"shop_link_tit"},[t._v(t._s(a.name))]),t._v(" "),e("div",{staticClass:"shop_link_txt"},[t._v(t._s(a.param_info))])])])]),t._v(" "),e("div",{staticClass:"order_foot",on:{click:function(e){return t.salesDetails(s.order_id,a.id,a.pro_id,s.there_are_third_party_goods)}}},[e("div",{staticClass:"navigator1"},[t._v(t._s(t.salesDate.tips.shouhoushenqing))])]),t._v(" "),s.pro_list.length-1!=i?e("div",{staticClass:"order_border"}):t._e()])})],2)}),0),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:0==t.salesDateList.length,expression:"salesDateList.length == 0"}],staticClass:"no_data"},[t._m(2),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.showLoading,expression:"!showLoading"}],staticClass:"no_data_txt"},[t._v("\n                                "+t._s(t.salesDate.tips.meiyouxiangguandingdan)+"~\n                            ")])])]):t._e(),t._v(" "),1==t.type?e("section",[e("div",{directives:[{name:"show",rawName:"v-show",value:t.salesDateList.length>0,expression:"salesDateList.length > 0"}],staticClass:"order_list"},t._l(t.salesDateList,function(s,a){return e("div",{key:a,staticClass:"order_li_jilu"},[e("div",{staticClass:"order_li_top"},[e("div",[t._v("\n                                        "+t._s(t.salesDate.tips.tuihuanhuohao)+"："),e("span",[t._v(t._s(s.id))])]),t._v(" "),e("div",[t._v("\n                                        "+t._s(t.salesDate.tips.fuwuleixing)+"："),e("span",[t._v(t._s(s.server_type.info))])]),t._v(" "),e("div",[t._v("\n                                        "+t._s(t.salesDate.tips.chulishijian)+"："),e("span",[t._v(t._s(s.time))])])]),t._v(" "),1==s.pro_list.length?e("div",{staticClass:"order_li_center"},[e("div",{staticClass:"order_li_center_left"},[e("img",{attrs:{src:s.pro_list[0].pic}})]),t._v(" "),e("div",{staticClass:"order_li_center_right"},[e("span",[t._v(t._s(s.pro_list[0].name))])])]):e("div",{staticClass:"order_li_center_more"},t._l(s.pro_list,function(t,s){return e("div",{key:s,staticClass:"order_li_center_left"},[e("img",{attrs:{src:t.pic}})])}),0),t._v(" "),e("div",{staticClass:"order_li_bottom"},[e("div",{staticClass:"order_li_bottom_left"},[t._v("\n                                        "+t._s(t.salesDate.tips.chulizhuangtai)+":\n                                        "),5==s.state.type?e("span",{staticStyle:{color:"#FC273C"}},[t._v(t._s(s.state.info))]):e("span",{staticStyle:{color:"#222222"}},[t._v(t._s(s.state.info))])]),t._v(" "),e("div",{staticClass:"order_li_bottom_right",on:{click:function(e){return t.goSalesDetail(s.id,s.there_are_third_party_goods)}}},[t._v("\n                                        "+t._s(t.salesDate.tips.chakan)+"\n                                    ")])])])}),0),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:0==t.salesDateList.length,expression:"salesDateList.length == 0"}],staticClass:"no_data"},[t._m(3),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.showLoading,expression:"!showLoading"}],staticClass:"no_data_txt"},[t._v("\n                                "+t._s(t.salesDate.tips.meiyouxiangguandingdan)+"～\n                            ")])])]):t._e(),t._v(" "),t.page>t.pageCnt&&t.salesDateList.length>2?e("div",{staticClass:"footerBox"},[e("span",[t._v("我也是有底线的~")])]):t._e()])])],1):t._e()],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"wrapper_bg"},[s("div",{staticClass:"wrapper_bg_c"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"home_img"},[s("img",{attrs:{src:"https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_home.png"}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"no_data_img"},[s("img",{attrs:{src:"https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_no_data.png"}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"no_data_img"},[s("img",{attrs:{src:"https://aimg8.oss-cn-shanghai.aliyuncs.com/xcx_pack/vip_shopmall/newOrder_no_data.png"}})])}]};var c=e("C7Lr")(l,_,!1,function(t){e("jOK3")},"data-v-0e49c097",null);s.default=c.exports},jOK3:function(t,s){}});
//# sourceMappingURL=84.798e0a0bda12d6529a6e.js.map
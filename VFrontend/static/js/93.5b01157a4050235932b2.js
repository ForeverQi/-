webpackJsonp([93],{"92W7":function(t,e){},aXEM:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("4YfN"),a=s.n(i),o=s("zH2g"),n=s("mUeO"),c=s("0IQH"),r={data:function(){return{poserImg:"",showTypeSelect:!1,showXcxidSelect:!1,loading:!1}},props:["data"],created:function(){var t=this,e=this.$store.getters.variables.many.ShopVideoBacPoster,s=this;if("wap"==e.site)this.loading=!0,this.WapPoster(function(){s.Close(!0)});else if("xcx"==e.site)this.XcxPosterAppidSelect();else{if("all"!=e.site)return c.a.Alert({message:"您所属版本不支持分享功能！"}).then(function(e){t.Close()});this.showTypeSelect=!0}},methods:{Close:function(t){if(this.loading=!1,!t)return this.$util.variable.Setbatch([{key:"ShopVideoBacActions",val:!1},{key:"ShopVideoBacShare",val:!1},{key:"ShopVideoBacPoster",val:!1}]);this.$util.variable.Setbatch([{key:"ShopVideoBacActions",val:!1},{key:"ShopVideoBacShare",val:!1}])},WapPoster:function(t){var e=this;Object(o.h)({username:this.$util.shopVideo.username(),id:this.data.item.id,is_backstage:1}).then(function(s){"function"==typeof t&&t(),e.Show(a()({},s,{img:s.wap_img_src}))}).catch(function(s){"function"==typeof t&&t(),e.loading=!1,c.a.Msg({message:"海报获取失败"})})},XcxPoster:function(t){var e=this,s=this.$store.getters.variables.many.ShopVideoBacPoster;this.loading=!0,Object(n.B)({username:this.$util.shopVideo.username(),id:this.data.item.id,type:1,appid:t.appid,online:s.online,who:s.who,is_backstage:1,version:s.version}).then(function(t){e.Show(a()({},t,{img:t.xcx_img_src}))}).catch(function(t){e.loading=!1,c.a.Msg({message:"海报获取失败"})})},Show:function(t){this.loading=!1,t.img||this.$util.Hint.Msg({message:"海报获取失败, 请稍后重试"}),this.poserImg=t.img,this.$util.variable.Set({key:"ShopVideoBacShare",val:!1})},TypeSelect:function(t){var e=this;return this.loading=!0,"h5"==t?this.WapPoster(function(){e.Close(!0)}):"xcx"==t?this.XcxPosterAppidSelect():void 0},XcxPosterAppidSelect:function(){var t=this.$store.getters.variables.many.ShopVideoBacPoster;return this.$util.functions.Keys(t.xcx.app_ids).length>1?(this.loading=!1,this.showXcxidSelect=!0,!1):this.XcxPoster(t.xcx.app_ids[0])},downSharePosters:function(t){this.$util.app.Shop.Share.download({url:t})}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.showTypeSelect?s("div",{staticClass:"select-layer"},[s("div",{staticClass:"bg",on:{click:function(e){return t.Close()}}}),t._v(" "),s("transition",{attrs:{name:"custom-classes-transition","enter-active-class":"animated fadeInUpBig","leave-active-class":"animated fadeOutDownBig"}},[s("div",{staticClass:"layer-con-wrap",style:"padding-bottom:"+t.$store.getters.variables.many.footerHeight},[s("ul",{staticClass:"func-more-list"},[s("li",{staticClass:"share-btn",on:{click:function(e){return t.TypeSelect("h5")}}},[t._v("微信h5海报")]),t._v(" "),s("li",{staticClass:"share-btn",on:{click:function(e){return t.TypeSelect("xcx")}}},[t._v("小程序海报")]),t._v(" "),s("li",{staticClass:"cancel-btn",on:{click:function(e){return t.Close()}}},[t._v("取消")])])])])],1):t._e(),t._v(" "),t.showXcxidSelect?s("div",{staticClass:"select-layer"},[s("div",{staticClass:"bg",on:{click:function(e){return t.Close()}}}),t._v(" "),s("transition",{attrs:{name:"custom-classes-transition","enter-active-class":"animated fadeInUpBig","leave-active-class":"animated fadeOutDownBig"}},[s("div",{staticClass:"layer-con-wrap",style:"padding-bottom:"+t.$store.getters.variables.many.footerHeight},[s("ul",{staticClass:"func-more-list"},[t._l(t.$store.getters.variables.many.ShopVideoBacPoster.xcx.app_ids,function(e){return s("li",{staticClass:"share-btn",domProps:{textContent:t._s(e.name?e.name:e.appid)},on:{click:function(s){return t.XcxPoster(e)}}})}),t._v(" "),s("li",{staticClass:"cancel-btn",domProps:{textContent:t._s("取消")},on:{click:function(e){t.showXcxidSelect=!1}}})],2)])])],1):t._e(),t._v(" "),t.poserImg?s("div",{staticClass:"sharePosters"},[s("div",{staticClass:"sharePosters_box"},[s("div",{staticClass:"sharePosters_box_all"},[s("div",{staticClass:"sharePosters_box_img_area"},[s("div",{staticClass:"sharePosters_box_img",on:{click:function(e){return t.downSharePosters(t.poserImg)}}},[s("img",{attrs:{src:t.poserImg,alt:""}})]),t._v(" "),t._m(0)]),t._v(" "),s("div",{staticClass:"sharePosters_box_guanbi",on:{click:function(e){t.poserImg=""}}},[s("span",[t._v("关闭")])])])])]):t._e(),t._v(" "),t.loading?s("div",{staticClass:"sharePosters"},[s("van-loading",{attrs:{type:"spinner"}})],1):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"sharePosters_box_text"},[e("img",{attrs:{src:s("xnJU"),alt:""}})])}]};var h=s("C7Lr")(r,l,!1,function(t){s("92W7")},"data-v-7aa59134",null);e.default=h.exports},xnJU:function(t,e,s){t.exports=s.p+"static/img/app_postersImg.a55fd40.png"}});
//# sourceMappingURL=93.5b01157a4050235932b2.js.map
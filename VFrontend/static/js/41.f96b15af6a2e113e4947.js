webpackJsonp([41],{"3yhM":function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=i("HabS"),e={data:function(){return{list:[],url1:""}},mounted:function(){this.url1="/VFrontend/vipCartmarketing/views/marketingindex?username="+this.$route.query.username,this.getOrderListFun()},methods:{getOrderListFun:function(){var t=this,s={username:t.$route.query.username,zz_userid:t.$cookies.get("zz_userid"),zz_shellCode:t.$cookies.get("zz_shellCode"),page:1};Object(a.d)(s).then(function(s){t.list=s.list}).catch(function(t){})}}},n={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"pub-wrapper list"},[a("div",{staticClass:"wrapper_c"},[t._m(0),t._v(" "),a("div",{staticClass:"Max_cart"},[a("div",{staticClass:"head-tit"},[a("a",{staticClass:"return",attrs:{href:t.url1}},[a("img",{attrs:{src:i("Y5Bi"),alt:""}})]),t._v(" "),a("span",[t._v("购买记录")])]),t._v(" "),t.list.length?a("div",{staticClass:"max-list"},t._l(t.list,function(s,i){return a("div",{key:i,staticClass:"list-li"},[a("div",{staticClass:"list-tit"},[a("span",[t._v(t._s(s.cur_vip))]),t._v(" "),a("div",{staticClass:"mony"},[a("em",[t._v("¥")]),t._v(" "),a("p",[t._v(t._s(s.price))])])]),t._v(" "),a("div",{staticClass:"list-con"},[a("div",{staticClass:"list-con-txt"},[a("span",[t._v("订单号：")]),t._v(" "),a("p",[t._v(t._s(s.id))])]),t._v(" "),a("div",{staticClass:"list-con-txt"},[a("span",[t._v("有效期：")]),t._v(" "),a("p",[t._v(t._s(s.end_date))])]),t._v(" "),a("div",{staticClass:"list-con-txt"},[a("span",[t._v("升级前等级：")]),t._v(" "),a("p",[t._v(t._s(s.before_vip))])]),t._v(" "),a("div",{staticClass:"list-con-txt"},[a("span",[t._v("支付方式：")]),t._v(" "),a("p",[t._v(t._s(s.payment_text))])]),t._v(" "),a("div",{staticClass:"list-con-txt"},[a("span",[t._v("支付时间：")]),t._v(" "),a("p",[t._v(t._s(s.zf_time))])]),t._v(" "),a("div",{staticClass:"list-con-txt"},[a("span",[t._v("支付交易号：")]),t._v(" "),a("p",[t._v(t._s(s.zf_order_id))])])]),t._v(" "),a("div",{staticClass:"list-con"},[a("div",{staticClass:"list-con-txt"},[a("span",[t._v("赠送信息：")]),t._v(" "),a("p",[t._v(t._s(s.zs_message))])]),t._v(" "),a("div",{staticClass:"list-con-txt"},[a("span",[t._v("备注：")]),t._v(" "),a("p",[t._v(t._s(s.remarks))])])])])}),0):a("div",{staticClass:"max-list"},[t._m(1)])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"max_color"},[s("div",{staticClass:"max_color_c"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"no-data"},[s("span",[s("img",{attrs:{src:i("jjgA"),alt:""}})]),this._v(" "),s("p",[this._v("没有任何记录～")])])}]};var _=i("C7Lr")(e,n,!1,function(t){i("TR2a")},"data-v-45d07f86",null);s.default=_.exports},TR2a:function(t,s){},jjgA:function(t,s,i){t.exports=i.p+"static/img/no-data.57bbe5b.png"}});
//# sourceMappingURL=41.f96b15af6a2e113e4947.js.map
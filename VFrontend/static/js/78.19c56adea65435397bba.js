webpackJsonp([78],{"7UvV":function(e,s){},"BV+9":function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=t("aA9S"),i=t.n(a),n=t("3cXf"),u=t.n(n),r=t("a3Yh"),o=t.n(r),d=t("VTmd"),l=t("HcfM"),c=t("+6og"),f=t("TVG1"),v=t("0IQH"),h=t("1ZB7"),_=(console.log,{components:{Nav:c.a,BaiduGPS:h.a},data:function(){var e;return e={SetPoint:"",dtStatus:!1,valueFlg:!1,newColor1:"",houseValue:"",nameValue:"",phoneValue:"",cityValue:"",addressId:0,addressInfo:"",allAddressInfo:"",subMitJson:{},latitude:"",longitude:"",showLoading:!0},o()(e,"addressId",0),o()(e,"queryJsonAdress",{}),o()(e,"clues",""),o()(e,"addrInfo2",{}),e},mounted:function(){var e={};if(!f.a.functions.ifHaveFun(this.$cookies.get("zz_userid")))return location.href="/dom/denglu.php?username="+this.$route.query.username+"&wap=1",!1;this.getColorFun(),f.a.functions.ifHaveFun(this.$cookies.get("queryJsonAdress"))&&(e=this.$cookies.get("queryJsonAdress"),this.queryJsonAdress=e);var s=f.a.functions.ifHaveFun(e.id)?e.id:0;if(f.a.functions.ifHaveFun(s)&&(this.addressId=s),f.a.functions.ifHaveFun(this.addressId)){var t={id:s};this.tianjia=!1,this.addresInfoFun(4,t,1)}else this.addresInfoFun(4,"",1),this.tianjia=!0},methods:{addresInfoFun:function(e,s,t){var a=this,i=f.a.functions.ifHaveFun(s)?s:{};a.showLoading=!0,i.deliveryType="city",f.a.functions.ifHaveFun(a.$route.query.id)&&(i.id=a.$route.query.id);var n={type:e,req:u()(i),zz_userid:a.$cookies.get("zz_userid"),username:a.$route.query.username,client_type:1};Object(l.a)(n).then(function(s){if(a.showLoading=!1,a.allAddressInfo=s,a.allAddressInfo.x&&a.allAddressInfo.y&&(a.SetPoint={lng:s.x,lat:s.y},a.latitude=s.y,a.longitude=s.x),1==t&&a.allAddressInfo.province&&a.allAddressInfo.city&&(a.addrInfo2.province=a.allAddressInfo.province,a.addrInfo2.city=a.allAddressInfo.city,a.addrInfo2.district=a.allAddressInfo.district,a.cityValue=a.allAddressInfo.province+" "+a.allAddressInfo.city+" "+a.allAddressInfo.district),setTimeout(function(){a.$cookies.set("queryJsonAdress",{})}),4==e){for(var i=s.form_info,n=0;n<i.length;n++)1==i[n].system_type&&(a.nameValue=i[n].default_value),3==i[n].system_type&&(a.addressValue=i[n].default_value),4==i[n].system_type&&(a.phoneValue=i[n].default_value),6==i[n].system_type&&(a.houseValue=i[n].default_value);a.addressInfo=i,a.valueFlg=s.is_default,a.clues=s.la}else if(3==e)if(1==a.queryJsonAdress.orderstatus){var r=JSON.parse(decodeURIComponent(a.queryJsonAdress.subMitJson));r.address_id=s.address_id,a.$router.push({path:"/order/submitOrder/index",query:{subMitJson:encodeURIComponent(u()(r)),username:a.$route.query.username}})}else{var o={};o.is_set=a.is_set,o.orderId=a.order_id,o.username=a.$route.query.username,o.detailId=a.detail_id,o.redirect=a.redirect,o.deliveryType="city",f.a.functions.ifHaveFun(a.queryJsonAdress.subMitJson)&&(o.subMitJson=a.queryJsonAdress.subMitJson),f.a.functions.ifHaveFun(a.queryJsonAdress.takeout)&&(o.takeout=a.queryJsonAdress.takeout),f.a.functions.ifHaveFun(a.queryJsonAdress.jdWay)&&(o.jdWay=a.queryJsonAdress.jdWay),f.a.functions.ifHaveFun(a.queryJsonAdress.jdStatus)&&(o.jdStatus=a.queryJsonAdress.jdStatus),f.a.functions.ifHaveFun(a.queryJsonAdress.goodsValueType)&&(o.goodsValueType=a.queryJsonAdress.goodsValueType),f.a.functions.ifHaveFun(a.queryJsonAdress.textareaValue)&&(o.textareaValue=a.queryJsonAdress.textareaValue),f.a.functions.ifHaveFun(a.queryJsonAdress.imagesList_back)&&(o.imagesList_back=a.queryJsonAdress.imagesList_back),a.$router.replace({path:"/address/views/addressList",query:o})}}).catch(function(e){a.showLoading=!1,200!=e.code&&v.a.Msg({message:e.msg})})},inputFun:function(e,s){switch(Number(e)){case 0:this.houseValue=s;break;case 1:this.nameValue=s;break;case 2:this.phoneValue=s}},getMyLocation:function(){var e=this;e.dtStatus=!0,setTimeout(function(){e.$refs.BaiduGPSLayer.showHideLayer(1)},10)},bdGetCity:function(e){var s=this;if(setTimeout(function(){s.dtStatus=!1},400),e&&e.address!=e.title){var t=f.a.functions.getMapValue(e);s.cityValue=t.cityValue,s.addressValue=t.addressValue,s.addrInfo2=t.addrInfo2,this.latitude=e.point.lat,this.longitude=e.point.lng}},selectStatus:function(){this.valueFlg=!this.valueFlg},saveAddress:function(){var e={},s=this.addressInfo;for(var t in s){if(3==s[t].system_type&&1==s[t].is_have){if(!f.a.functions.ifHaveFun(this.addressValue))return v.a.Msg({message:this.clues.qingshuru+s[t].name}),!1;(e=i()(e,this.addrInfo2)).address=this.addressValue}else(e=i()(e,this.addrInfo2)).address=this.addressValue;if(6==s[t].system_type&&1==s[t].is_have){if(!f.a.functions.ifHaveFun(this.houseValue))return v.a.Msg({message:this.clues.qingshuru+s[t].name}),!1;e.newAddress=this.houseValue}else e.newAddress=this.houseValue;if(1==s[t].system_type&&1==s[t].is_have){if(!f.a.functions.ifHaveFun(this.nameValue))return v.a.Msg({message:this.clues.qingshuru+s[t].name}),!1;e.name=this.nameValue}else e.name=this.nameValue;if(4==s[t].system_type&&1==s[t].is_have){if(!f.a.functions.ifHaveFun(this.phoneValue))return v.a.Msg({message:this.clues.qingshuru+s[t].name}),!1;e.shouji_tel=this.phoneValue}else e.shouji_tel=this.phoneValue}e.is_default=this.valueFlg?1:0,e.id=this.addressId,e.lat=this.latitude,e.lng=this.longitude,f.a.functions.ifHaveFun(this.addressId)&&(e.id=this.addressId),this.addresInfoFun(3,e)},getColorFun:function(){var e=this;Object(d.c)({username:this.$route.query.username}).then(function(s){e.theme=f.a.functions.colorFun(s.color),e.newColor1=f.a.functions.newColor(s.color).bgcColor1})}}}),y={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"TCPS_ADD"},[e.showLoading?t("van-loading",{attrs:{size:"50px",color:"#1989fa"}}):e._e(),e._v(" "),t("van-overlay",{attrs:{show:e.showLoading}}),e._v(" "),""!=e.allAddressInfo?t("div",{staticClass:"tspsAdd"},[t("Nav",{attrs:{numerical:2,tips:e.clues}}),e._v(" "),t("div",{staticClass:"tspsAdd_box"},[t("div",{staticClass:"tspsAdd_top"},e._l(e.addressInfo,function(s,a){return t("div",{key:a},[3==s.system_type?t("div",{staticClass:"tc_child"},[t("div",{staticClass:"tc_left"},[e._v(e._s(s.name))]),e._v(" "),t("div",{staticClass:"tc_right",on:{click:e.getMyLocation}},[t("input",{staticClass:"cityInput",attrs:{placeholder:e.clues.qingshuru+s.name,disabled:!0,type:"text"},domProps:{value:e.addressValue?e.cityValue+" "+e.addressValue:""}}),e._v(" "),e._m(0,!0)])]):e._e(),e._v(" "),6==s.system_type?t("div",{staticClass:"tc_child"},[t("div",{staticClass:"tc_left"},[e._v(e._s(s.name))]),e._v(" "),t("div",{staticClass:"tc_right"},[t("input",{attrs:{placeholder:e.clues.qingshuru+s.name,type:"text"},domProps:{value:e.houseValue},on:{input:function(s){return e.inputFun(0,s.target.value)}}})])]):e._e(),e._v(" "),1==s.system_type?t("div",{staticClass:"tc_child"},[t("div",{staticClass:"tc_left"},[e._v(e._s(s.name))]),e._v(" "),t("div",{staticClass:"tc_right"},[t("input",{attrs:{placeholder:e.clues.qingshuru+s.name,type:"text"},domProps:{value:e.nameValue},on:{input:function(s){return e.inputFun(1,s.target.value)}}})])]):e._e(),e._v(" "),4==s.system_type?t("div",{staticClass:"tc_child"},[t("div",{staticClass:"tc_left"},[e._v(e._s(s.name))]),e._v(" "),t("div",{staticClass:"tc_right"},[t("input",{attrs:{placeholder:e.clues.qingshuru+s.name,type:"number"},domProps:{value:e.phoneValue},on:{input:function(s){return e.inputFun(2,s.target.value)}}})])]):e._e()])}),0),e._v(" "),t("div",{staticClass:"tspsAdd_bottom"},[t("div",{staticClass:"Tips_view1"},[t("div",{staticClass:"Tips_txt1"},[e._v(e._s(e.clues.sheweimorendizhi))]),e._v(" "),t("div",{staticClass:"defaultAddress_right"},[t("div",{class:e.valueFlg?"marquee marqueeSelect":"marquee",style:{background:e.valueFlg?e.newColor1:"",borderColor:e.valueFlg?e.newColor1:"rgba(219, 219, 219, 1)"},on:{click:e.selectStatus}},[t("div",{class:e.valueFlg?"marqueeButton marqueeButtonSelect":"marqueeButton"})])])])]),e._v(" "),t("div",{staticClass:"tc_save",style:{background:e.newColor1},on:{click:e.saveAddress}},[e._v("保存")])])],1):e._e(),e._v(" "),e.dtStatus?t("BaiduGPS",{ref:"BaiduGPSLayer",attrs:{"set-point":e.SetPoint,point:null},on:{backFunction:e.bdGetCity}}):e._e()],1)},staticRenderFns:[function(){var e=this.$createElement,s=this._self._c||e;return s("div",{staticClass:"nowLocation"},[s("i",{staticClass:"sjzs-icon s-icon-location-1",staticStyle:{"font-size":"24rpx","font-weight":"400"}})])}]};var p=t("C7Lr")(_,y,!1,function(e){t("7UvV")},"data-v-2542c85a",null);s.default=p.exports}});
//# sourceMappingURL=78.19c56adea65435397bba.js.map
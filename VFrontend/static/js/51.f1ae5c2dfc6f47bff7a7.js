webpackJsonp([51],{"+6H9":function(t,e,a){"use strict";e.d=function(t){return Object(i.a)({url:"/Shop/Zhibo/theCompanyOrAnchor",method:"post",data:t})},e.e=function(t){return Object(i.a)({url:"/Shop/Zhibo/myZhiBoList",method:"post",data:t})},e.c=function(t){return Object(i.a)({url:"/Shop/Zhibo/handleZhiBoInfo",method:"post",data:t})},e.b=function(t){return Object(i.a)({url:"/Shop/Zhibo/getAnchorInfo",method:"post",data:t})},e.a=function(t){return Object(i.a)({url:"/Shop/Zhibo/updateAnchor",method:"post",data:t})},e.f=function(t){return Object(i.a)({url:"/Shop/Zhibo/liveImgUpload",method:"post",data:n.a.functions.assembleForm(t)})};var i=a("Kkag"),n=a("TVG1")},"5OB8":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("R7ni");var i=a("AJHw"),n=(a("0IQH"),a("+6H9")),s={name:"introduce",components:{},data:function(){return{showLoading:!1,pageListTitle:"个人资质认证",checkStatus:1,psgeNum:1,page_num:0,info:"",headImg:!1,headImgSrc:""}},created:function(){},computed:{},mounted:function(){this.liveInfoFun()},methods:{liveInfoFun:function(){var t=this;Object(n.b)({}).then(function(e){t.info=e.list,t.nickname=e.list.nickname,t.brief=e.list.brief})},liveChangeInfo:function(){var t=this,e={nickname:this.nickname,head_portrait:this.info.head_portrait,brief:this.brief};this.headImg&&(e.head_portrait=this.headImgSrc),Object(n.a)(e).then(function(e){t.$router.replace({path:"/shop/bac/liveList",query:{}})})},backPage:function(){this.$router.replace({path:"/shop/bac/liveList",query:{}})},onOversize:function(t){Object(i.a)("文件大小不能超过 500kb")},CoverUpload:function(t){var e=this,a=t.srcElement,i=a.files[0];return i.type&&!/png|jpeg|gif|jpg/.test(i.type.toLowerCase())?(hint.Msg({message:"图片格式必须是png,jpg,gif"}),!1):i.size>31457280?(hint.Msg({message:"图片不能大于30M"}),!1):void Object(n.f)(a).then(function(t){e.headImg=!0,e.headImgSrc=t.path})}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:t.$route.meta.title=t.pageListTitle,expression:"$route.meta.title= pageListTitle"}],attrs:{id:"video_liveList"}},[t.showLoading?i("van-loading",{attrs:{size:"50px",color:"#1989fa"}}):t._e(),t._v(" "),i("van-overlay",{attrs:{show:t.showLoading}}),t._v(" "),""!=t.info?i("div",{staticClass:"videoList_box"},[i("div",{staticClass:"searchNoteTop"},[i("div",{staticClass:"searchNoteTop_left",on:{click:t.backPage}},[t._m(0)]),t._v(" "),t._m(1)]),t._v(" "),i("div",{staticClass:"hostInfo"},[i("div",{staticClass:"hostInfo_head"},[i("span",[t._v("头像")]),t._v(" "),i("div",{staticClass:"hostInfo_head_right"},[i("div",{staticClass:"hostInfo_headImg"},[t.headImg?i("img",{attrs:{src:t.headImgSrc,alt:""}}):i("img",{attrs:{src:t.info.head_portrait,alt:""}})]),t._v(" "),i("img",{attrs:{src:a("z/dF"),alt:""}}),t._v(" "),i("input",{staticClass:"upload-file",attrs:{name:"coverFile",type:"file",accept:"image/*"},on:{change:t.CoverUpload}})])]),t._v(" "),i("div",{staticClass:"hostInfo_content"},[i("div",{staticClass:"hostInfo_content_main"},[i("div",{staticClass:"hostInfo_content_child"},[t._m(2),t._v(" "),i("div",{staticClass:"hostInfo_content_main_right"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.nickname,expression:"nickname"}],attrs:{type:"text",maxlength:"8",placeholder:"请输入昵称 最多可设置8个汉字"},domProps:{value:t.nickname},on:{input:function(e){e.target.composing||(t.nickname=e.target.value)}}})])]),t._v(" "),i("div",{staticClass:"hostInfo_content_child"},[t._m(3),t._v(" "),i("div",{staticClass:"hostInfo_content_main_right"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.brief,expression:"brief"}],staticStyle:{width:"100%"},attrs:{maxlength:"30",placeholder:"请输入昵称 最多可设置30个汉字"},domProps:{value:t.brief},on:{input:function(e){e.target.composing||(t.brief=e.target.value)}}})])])])]),t._v(" "),i("div",{staticClass:"saveHostInfo",on:{click:t.liveChangeInfo}},[i("span",[t._v("保存")])])])]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"voerTop_menuLeft"},[e("span")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"searchNoteTop_right"},[e("span",[this._v("我的直播")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hostInfo_content_main_left"},[e("span",[this._v("直播昵称")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hostInfo_content_main_left"},[e("span",[this._v("简介")])])}]};var r=a("C7Lr")(s,o,!1,function(t){a("BEQ9")},"data-v-39c8d1fc",null);e.default=r.exports},BEQ9:function(t,e){}});
//# sourceMappingURL=51.f1ae5c2dfc6f47bff7a7.js.map
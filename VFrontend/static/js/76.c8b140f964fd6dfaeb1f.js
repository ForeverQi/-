webpackJsonp([76],{AsJy:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("mUeO"),i={data:function(){return{helpCon:null}},created:function(){this.getHelp(),this.$util.app.Shop.Refresh(!1,0)},beforeDestroy:function(){this.$util.app.Shop.Refresh(!0,0)},methods:{backPage:function(){this.$util.functions.GoBack()},getHelp:function(){var e=this;Object(s.b)().then(function(t){e.helpCon=t.help})}},components:{PageHead:n("b9vL").a}},a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"page-wrap help-video-page"},[t("div",{staticClass:"page-layout help-video-wrap"},[t("PageHead",{attrs:{title:"短视频说明"}}),this._v(" "),t("div",{staticClass:"page-body"},[t("div",{staticClass:"help-content",domProps:{innerHTML:this._s(this.helpCon)}})])],1)])},staticRenderFns:[]};var o=n("C7Lr")(i,a,!1,function(e){n("rwI4")},null,null);t.default=o.exports},rwI4:function(e,t){}});
//# sourceMappingURL=76.c8b140f964fd6dfaeb1f.js.map
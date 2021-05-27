<template>
    <div class="pub-wrapper vipinfo">
        <div class="wrapper_c">
            <div class="max_color"><div class="max_color_c"></div></div>
            <div class="Max_cart">
                <div class="head-tit">
                    <a class="return" :href="url1"><img src="../static/images/return.jpg" alt="" /></a>
                    <span>完善开卡信息</span>
                </div>
                <van-form v-if="couponInfo != ''">
                    <div v-for="(item ,index) in couponInfo.list" :key="index">
                        <!-- 单行文本 -->
                        <div v-if="item.form_type == 'text'">
                            <div v-if="item.input_type == 'date'">
                                <van-cell is-link :title="`${item.label}`" :required="item.allownull == 0 ? true : false" :value="item.val" @click="clicktime(item)"/>
                                <div class="error-message" v-if="item.txtshow == 0">请选择正确日期</div>
                                <div class="pub-txt" v-if="item.default_notice != ''">{{item.default_notice}}</div>
                            </div>
                            <div v-else-if="item.input_type == 'dateTime'">
                                 <van-cell is-link :title="item.label" :value="item.val"  @click="clickdatetime(item)" :required="item.allownull == 0 ? true : false" />
                                 <div class="error-message"  v-if="item.txtshow == 0">请选择正确日期时间</div>
                                <div class="pub-txt" v-if="item.default_notice != ''">{{item.default_notice}}</div>
                            </div>
                            <div class="pub-ul" v-else>
                                <van-cell-group>
                                    <van-field v-model="item.val"  :required="item.allownull == 0 ? true : false" :label="item.label"/>
                                </van-cell-group>
                                <div class="error-message"  v-if="item.txtshow == 0">请输入正确内容</div>
                                <div class="pub-txt" v-if="item.default_notice != ''">{{item.default_notice}}</div>
                            </div>
                        </div>
                        <!-- 单选 -->
                        <div v-if="item.form_type == 'radio'">
                            <div class="pub-tit"><i class="txt-red" v-if="item.allownull == 0 ? true : false">*</i>{{item.label}}</div>
                            <div class="pub-ul">
                                <van-radio-group v-model="item.val">
                                    <van-cell-group>
                                        <van-cell :title="minitem.label"  v-for="(minitem ,index) in item.options" :key="index">
                                            <template #right-icon>
                                                <van-radio :checked-color="couponInfo.color" :name="minitem.label"/>
                                            </template>
                                        </van-cell>
                                    </van-cell-group>
                                </van-radio-group>
                                <div class="error-message" v-if="item.txtshow == 0">最少选择一个</div>
                                <div class="pub-txt" v-if="item.default_notice != ''">{{item.default_notice}}</div>
                            </div>
                        </div>
                        <!-- 多选 -->
                        <div v-if="item.form_type == 'checkbox'">
                            <div class="pub-tit"><i class="txt-red" v-if="item.allownull == 0 ? true : false">*</i>{{item.label}}</div>
                            <div class="pub-ul">
                                
                                <van-checkbox-group v-model="item.val" direction="horizontal">
                                    <van-cell v-for="(minitem, checkindex) in item.options" :key="checkindex" :title="minitem.label">
                                        <template #right-icon>
                                            <van-checkbox  :checked-color="couponInfo.color" :name="minitem.value"  shape="square"></van-checkbox>
                                        </template>
                                    </van-cell>
                                </van-checkbox-group>
                                <div class="error-message"  v-if="item.txtshow == 0">最少选择一个</div>
                                <div class="pub-txt" v-if="item.default_notice != ''">{{item.default_notice}}</div>
                            </div>
                        </div>
                        <!-- 多行 -->
                        <div v-if="item.form_type == 'textarea'">
                            <div class="pub-ul">
                                <van-field v-model="item.val" rows="2" autosize :required="item.allownull == 0 ? true : false" :label="item.label" type="textarea" maxlength="50" show-word-limit />
                                <div class="error-message"  v-if="item.txtshow == 0">请输入正确内容</div>
                                <div class="pub-txt" v-if="item.default_notice != ''">{{item.default_notice}}</div>
                            </div>
                        </div>
                        <!-- 上传 -->
                        <div v-if="item.form_type == 'file'">
                            <div class="pub-tit">{{item.label}}</div>
                            <div class="pub-ul">
                                <div class="pub-uploader">
                                    <div class="uploader-div">
                                        <van-uploader multiple :max-count="1" :after-read="e => afterRead(e ,item)" ref="selectfile" :name="'upFile_'+item.id" accept="*" :required="item.allownull == 0 ? true : false">
                                            <van-button icon="plus" type="primary" :name="'upFile_'+item.id" :style="[{'background':couponInfo.color},{'border-color':couponInfo.color}]">上传文件</van-button>
                                        </van-uploader>
                                    </div>
                                    <div class="uploader-div">
                                        {{item.val}}
                                    </div>
                                </div>
                                <div class="error-message" v-if="item.txtshow == 0">请上传文件</div>
                                <div class="pub-txt" v-if="item.default_notice != ''">{{item.default_notice}}</div>
                            </div>
                        </div>
                        <!-- 下拉 -->
                        <div v-if="item.form_type == 'select'">
                            <div class="pub-ul">
                                <van-cell is-link :title="item.label"  @click="clickcell(item)" :required="item.allownull == 0 ? true : false"  :value="item.val" />
                                <div class="error-message" v-if="item.txtshow == 0">请输入正确内容</div>
                                <div class="pub-txt" v-if="item.default_notice != ''">{{item.default_notice}}</div>
                            </div>
                        </div>
                        <!-- 日期时间 -->
                        <div v-if="item.form_type == 'calendar'">
                            <div class="pub-ul">
                                 <van-cell is-link :title="item.label" :value="item.val" :required="item.allownull == 0 ? true : false" @click="clickdatetime(item)" />
                                <div class="error-message"  v-if="item.txtshow == 0">请输入正确内容</div>
                                <div class="pub-txt" v-if="item.default_notice != ''">{{item.default_notice}}</div>
                            </div>
                        </div>
                        <!-- 省市区 -->
                        <div v-if="item.form_type == 'selectCity'">
                            <div class="pub-tit">{{item.label}}</div>
                            <div class="pub-ul">
                                <van-cell is-link :title="item.label" :required="item.allownull == 0 ? true : false" v-model="item.val" @click="clickselectCity(item)"/>
                                
                                <div class="error-message" v-if="item.txtshow == 0">请输入正确内容</div>
                                <div class="pub-txt" v-if="item.default_notice != ''">{{item.default_notice}}</div>
                            </div>
                        </div>
                    </div>
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit" @click="onSubmit" :style="[{'background':couponInfo.color},{'border-color':couponInfo.color}]">提交</van-button>
                    </div>
                </van-form>
            </div>
        </div>
        <!-- 下拉开始 -->
         <div v-if="show"><van-action-sheet v-model="show" :actions="actions" @select="e => onSelect(e)" /></div>
        <!-- 下拉结束 -->
        <!-- 日期开始 -->
        <div v-if="show1"><van-calendar v-model="show1" @confirm="e => onConfirm(e)" :max-date=" new Date(2050, 0, 31)" :min-date=" new Date(1900, 0, 1)" :default-date="currentDate"/></div>
        <!-- 日期结束 -->
        <!-- 日期时间开始 -->
        <div v-if="show3"><van-datetime-picker type="datetime" title="" :columns-order="['year' ,'month', 'day', 'hour','minute' ]" :formatter="formatter"  @confirm="e => areaok1(e)" @cancel="show3 = false" :max-date=" new Date(2050, 0, 31, 0, 0)" :min-date=" new Date(1900, 0, 1, 0, 0)" :default-date="currentDate"/></div>
        <!-- 日期时间结束 -->
        <!-- 省市区开始 -->
        <div v-if="show2"><van-area title="标题" :area-list="areaList" @confirm="e => areaok(e)" @cancel="show2 = false"/></div>
        <!-- 省市区结束 -->
        <div class="tishi" v-if="tishitxt">领取成功</div>
    </div>
</template>

<script>
import { getMemberField,uploadFile ,updateFieldsVal } from "@/api/vipCartMarketing/MarketingIndex.js";
import Vue from "vue";
import { Form ,Cell,CellGroup,RadioGroup,Radio,Checkbox,CheckboxGroup,Toast,Calendar,Area,Field  } from "vant";
import {areaList} from '@/pages/vipCartMarketing/static/js/address.js'
Vue.use(Form);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Toast);
Vue.use(Calendar);
Vue.use(Area);
Vue.use(Field);
 
export default {
  data() {
    return {
        url1:'',
        couponInfo: "",
        radio: "1",
        aa:[],
        list: ['a', 'b'],
        result: [],
        //下拉
        show: false,
        actions: '',
        actionvalue:'请选择下拉',
        //日期
        show1: false,
        date: '',
        //省市区
        showLoading: false,
        show2: false,
        area:'请选择下拉',
        areaList:areaList,
        //多行
        message1:'',
        //上传
        filelist:[],
        //日期时间
        show3: false,
        currentDate: new Date(),
        txtshow:1,
        adop:0,
        tishitxt:false
    };
  },
    
  mounted() {
    this.getMemberFieldFun();
    if(!this.$cookies.get("zz_userid")){
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
        this.wxLoginFun()
      }else{
          window.location.href = window.location.origin+'/dom/denglu.php?username='+that.$route.query.username+'&wap=1'
      }
    }
   
    this.url1 = `/VFrontend/vipCartmarketing/views/marketingindex?username=${this.$route.query.username}`;
  },
  methods: {
    wxLoginFun() {
      let that = this;
      let paramJson = {
        username: that.$route.query.username,
        member_id: that.$route.query.member_id ? that.$route.query.member_id : that.$cookies.get("member_id"),
        code: that.$route.query.code == '' ? '' : that.$route.query.code,
        real_host:window.location.host,
        isOauth:that.$route.query.isOauth ? that.$route.query.isOauth : 0,
      };
      wxLogin(paramJson)
        .then((res) => {
            //成功
            if(res.wxOauthUrl != ''){
              window.location.href = res.wxOauthUrl;
            }
        })
        .catch((err) => {
          //失败
        });
    },
    getMemberFieldFun() {
      let that = this;
      let paramJson = {
        username: that.$route.query.username,
        zz_userid: that.$cookies.get("zz_userid"),
        zz_shellCode: that.$cookies.get("zz_shellCode"),
        cardId: that.$route.query.cardId,
        // username: "jzabcdemo",
        // zz_userid: "20257078",
        // zz_shellCode: "49cf86137072c88e2d5cd04b27c5957a",
      };
      getMemberField(paramJson).then((res) => {
            //成功
            res.list.forEach((item, index) => {
                item['txtshow'] = 1;
                if(item.val == '' || item.val == undefined){
                    item.val = item.default_value
                }
                if(item.form_type == 'checkbox'){
                    let arr = [];
                    item.options.forEach((opitem ,opindex) => {
                        if(opitem.checked == 1){
                            arr.push(opitem.value)
                        }
                    })
                    item.val = arr
                }
            })
            that.couponInfo = res;
        })
        .catch((err) => {
          //失败
        });
    },
    // 提交表单
    generate(reqval) {
      let that = this;
      that.$F.Response({
        url: "xiaochengxu/order/order_submit.php",
        param: reqval,
        success: (res) => {
          if (res.code == 200) {
            that.tishitxt = true;
            setTimeout(function () {
              that.tishitxt = false;
            }, 1500);
            this.$router.push({
                path: `marketingindex?username=${that.$route.query.username}`,
            });
          }
        },
        error: (err) => {
          that.showLoading = false;
          Hint.Alert({
            message: "请求失败",
          }).then(() => {
          });
        },
      });
    },
    //提交注册信息
    onSubmit(values) {
        let that = this;
        let newlist = [];
        that.adop = 0;
        that.couponInfo.list.forEach((item, index) => {
           let arr = {'id':item.id,'val':item.val == null ? '' : item.val};
            if(item.form_type == 'checkbox'){
                let area = '';
                if(item.val != '' &&  item.val.length){

                    item.val.forEach((valitem ,valindex) => {
                        if(valindex == 0){
                            area = valitem
                        }else{
                            area += '###'+valitem
                        }
                    })
                    arr.val = area;
                }
            }
            if(item.form_type == "selectCity"){
                var reg = new RegExp("-","g");
                arr.val.replace(reg,"###");
                
            }
            newlist.push(arr);
            if(item.form_type == 'text'){
                if(item.allownull == 0 && item.input_type == 'tel'){
                    //电话
                    if(item.val == '' || /^(\d{7,8})$/.test(item.val)){
                        item.txtshow = 0;
                        that.adop = 1;
                        
                    }else{
                        item.txtshow = 1;
                        
                    }
                }else if(item.allownull == 0 && item.input_type == 'qq'){
                    //QQ
                    if(item.val == '' || /^[1-9]\\d{4,14}$/.test(item.val)){
                        item.txtshow = 0;
                        that.adop = 1;
                    }else{
                        item.txtshow = 1;
                        
                    }
                }else if(item.allownull == 0 && item.input_type == 'email'){
                    //邮箱
                    
                    if(item.val == '' || /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(item.val)){
                      
                        item.txtshow = 0;
                        that.adop = 1;
                    }else{
                        item.txtshow = 1;
                        
                    }
                }else if(item.allownull == 0 && item.input_type == 'id_card'){
                    //身份证
                    if(item.val == '' || /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/.test(item.val) || /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(item.val)){
                        item.txtshow = 0;
                        that.adop = 1;
                    }else{
                        item.txtshow = 1;
                        
                    }
                }else if(item.allownull == 0 && item.input_type == 'mobile'){
                    //手机号
                    if(item.val == '' || /^1[3584]\d{9}$/.test(item.val)){
                        item.txtshow = 0;
                        that.adop = 1;
                    }else{
                        item.txtshow = 1;
                        
                    }
                }else if(item.allownull == 0 && item.input_type == 'number'){
                    //数子
                    if(item.val == '' || /^[0-9]*$/.test(item.val)){
                        item.txtshow = 0;
                        that.adop = 1;
                    }else{
                        item.txtshow = 1;
                        
                    }
                }else if(item.allownull == 0 && item.input_type == 'onlyLetter'){
                    //英文字母
                    if(item.val == '' || /^[A-Za-z]+$/.test(item.val)){
                        item.txtshow = 0;
                        that.adop = 1;
                    }else{
                        item.txtshow = 1;
                        
                    }          
                }else if(item.allownull == 0 && item.input_type == 'date'){
                    //时间
                    if(item.val == '' || /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(item.val)){
                        item.txtshow = 0;
                        that.adop = 1;
                    }else{
                        item.txtshow = 1;
                        
                    }            
                }else if(item.allownull == 0 && item.input_type == 'dateTime'){
                    if(item.val == '' || /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/.test(item.val)){
                        item.txtshow = 0;
                        that.adop = 1;
                    }else{
                        item.txtshow = 1;
                        
                    }
                }else if(item.allownull == 0 && item.input_type == 'anything'){
                    if(item.val == '' || item.val == null){
                        item.txtshow = 0;
                        that.adop = 1;
                    }else{
                        item.txtshow = 1;
                        
                    }
                }
            }else if(item.allownull == 0 && item.form_type == 'calendar'){
                //日期时间
                if(item.val == '' || item.val == null || /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/.test(item.val)){
                    item.txtshow = 0;
                    that.adop = 1;
                }else{
                    item.txtshow = 1;
                    that.adop = 0;
                }           
            }else if(item.allownull == 0 && (item.form_type == 'select' || item.form_type == 'selectCity' || item.form_type == 'file' || item.form_type == 'textarea' || item.form_type == 'radio' || item.form_type == 'checkbox')){
                //下拉
                if(item.val == '' || item.val == null){
                    item.txtshow = 0;
                    that.adop = 1;
                }else{
                    item.txtshow = 1;
                    that.adop = 0;
                }
            }        
        })
        
        if(that.adop == 0){
            updateFieldsVal({
                fieldsVal:newlist,
                username: that.$route.query.username,
                zz_userid: that.$cookies.get("zz_userid"),
                zz_shellCode: that.$cookies.get("zz_shellCode"),
            })
            .then((res) => {
            //成功
                if(that.$route.query.mony <= 0){
                    let paramJson = {
                    payment_info_val: "on",
                    payment_id: -1,
                    pay_money: 0,
                    share_member_id: that.$cookies.get("share_member_id"),
                    order_type: 7,
                    orderParams: { id: that.$route.query.cardId },
                    };
                    let maxparamJson = {
                    req: JSON.stringify(paramJson),
                    username: that.$route.query.username,
                    zz_userid: that.$cookies.get("zz_userid"),
                    client_type: 1,
                    wap: 1,
                    };
                    this.generate(maxparamJson);
                }else{
                    this.$router.push({
                        path: `/order/submitOrder/index?username=${that.$route.query.username}&req={"order_type":7,"orderParams":{"id":${that.$route.query.cardId}}}`,
                    });
                }
                
            })
            .catch((err) => {
            //失败
            });
        }
        
        
    },
    inputtype(e, item){
        return new Promise((resolve) => {
            if(item.input_type == 'tel'){
                //电话
                resolve(/^(\d{7,8})$/.test(e));
            }else if(item.input_type == 'email'){
                //邮箱
                resolve(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e));
            }else if(item.input_type == 'id_card'){
                //身份证
                 resolve(/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/.test(e) || /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(e));
            }else if(item.input_type == 'mobile'){
                //手机号
                resolve(/^1[3584]\d{9}$/.test(e));
            }else if(item.input_type == 'number'){
                //数子
                resolve(/^[0-9]*$/.test(e));
            }else if(item.input_type == 'onlyLetter'){
                //英文字母
                resolve(/^[A-Za-z]+$/.test(e));            
            }else if(item.input_type == 'date'){
                //时间
                resolve(/^[A-Za-z]+$/.test(e));            
            }else if(item.input_type == 'dateTime'){
                //时间
                resolve(/^[A-Za-z]+$/.test(e));            
            }else if(item.input_type == 'qq'){
                //QQ
                resolve(/\d{5,11}/.test(e)); 
            }else if(item.input_type == 'anything'){
                if(item.val == '' || item.val == null){
                    resolve(false); 
                }else{
                    resolve(true); 
                }
                
            }
        });
    },
    //下拉
    clickcell(e){
        this.thisval = e;
        this.actions = e.options;
        this.show = true;
    },
    onSelect(item) {
        this.thisval.val = item.name;
        this.show = false;
    },
    //日历
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    clicktime(e){
        this.thisval = e;
        this.show1 = true;
    },
    onConfirm(date) {
      this.show1 = false;
      this.thisval.val = this.formatDate(date);
    },
    //日期时间
    formatter(type, val) {
      if (type === 'year') {
        return val + '年';
      }
      if (type === 'month') {
        return val + '月';
      }
      if (type === 'day') {
        return val + '日';
      }
      return val;
      
    },
    clickdatetime(e){
        this.thisval = e;
        this.show3 = true;
    },
    areaok1(v){
        this.thisval.val = this.formatDateTime(v);
        this.show3 = false;
        
    },
    formatDateTime (date) { 
        var y = date.getFullYear(); 
        var m = date.getMonth() + 1; 
        m = m < 10 ? ('0' + m) : m; 
        var d = date.getDate(); 
        d = d < 10 ? ('0' + d) : d; 
        var h = date.getHours(); 
        h=h < 10 ? ('0' + h) : h; 
        var minute = date.getMinutes(); 
        minute = minute < 10 ? ('0' + minute) : minute; 
        // var second=date.getSeconds(); 
        // second=second < 10 ? ('0' + second) : second; 
        return y + '-' + m + '-' + d+' '+h+':'+minute; 
    },
    //地址
    clickselectCity(e){
        let that = this;
        that.thisval = e;
        that.show2 = true;
    },
    areaok(v, e){
        let area = '';
        v.forEach((item, index) => {
            if(index == 0){
                area = item.name;
            }else{
                area += '-'+item.name;
            }
        })
        this.thisval.val = area
        this.show2 = false;
    },
    //上传
    afterRead(e ,v) {
      // 此时可以自行将文件上传至服务器
        let that = this;
        let paramJson = {
            username: that.$route.query.username,
            zz_userid: that.$cookies.get("zz_userid"),
            zz_shellCode: that.$cookies.get("zz_shellCode"),
            cardId: that.$route.query.cardId,
            content:e.content,
            name:e.file.name,
            size:e.file.size,
            type:e.file.type,
            field_id:v.id
        }
        uploadFile(paramJson)
            .then((res) => {
            //成功
                v.val= res.file;
            })
            .catch((err) => {
            //失败
            });
        
    },
},
  
};
</script>

<style scoped lang="scss">
@import "@/pages/vipCartMarketing/static/css/vipCart-style.scss";
.pub-tit{margin: 0;
    padding:16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;}
// .pub-ul{margin-bottom: 16px;}
.pub-txt{font-size: 12px;color: rgba(69, 90, 100, 0.6);padding:10px 16px;margin-bottom: 16px;}

.van-picker{
        position: fixed;
    left: 0;
    right: 0;
    bottom: 0;z-index: 1;
}
.uploader-div{word-break: break-all;}
.pub-uploader{    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    flex-direction: column;
    background-color: #fff;}
.pub-uploader::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 16px;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}
.error-message{padding:8px 0px;padding-left: 2.03rem;background: #FFF;    color: #ee0a24;
    font-size: 12px;}
.head-tit {
  width: 100%;
  height: 0.88rem;
  background: #fff;
  border-bottom: 1px solid #ededed;
}
.head-tit span {
  font-size: 0.32rem;
  color: #222;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  line-height: 0.88rem;
  text-align: center;top: 0;
  width: 50%;
}
.return{display: block;
    width: 0.21rem;
    height: 0.38rem;
    padding: 0.24rem 0.25rem;box-sizing: initial;}
  .return img{
    display: block;
    width: 0.21rem;
    height: 0.38rem;
  }
  
  
</style>
<style lang="scss">
    .vipinfo{
    .van-picker .van-picker__toolbar{
        display: block !important;
        .van-picker__title{
            display: none;
        }
        .van-picker__confirm{
            float: right;
        }
    }
    .txt-red{
        font-size: 12px;
        color:red;
        font-style: initial;
    }
  }
</style>
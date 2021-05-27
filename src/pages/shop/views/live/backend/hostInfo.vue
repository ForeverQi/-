<template>
  <div id="video_liveList" v-wechat-title="$route.meta.title= pageListTitle">
    <van-loading v-if="showLoading" size="50px" color="#1989fa" />
    <van-overlay :show="showLoading" />
    <div class="videoList_box" v-if="info != ''">
      <div class="searchNoteTop">
        <div class="searchNoteTop_left" @click="backPage">
          <div class="voerTop_menuLeft">
            <span></span>
          </div>
        </div>
        <div class="searchNoteTop_right">
          <span>我的直播</span>
        </div>
      </div>
      <div class="hostInfo">
        <!-- 头像 -->
        <div class="hostInfo_head">
          <span>头像</span>
          <div class="hostInfo_head_right">
            <div class="hostInfo_headImg">
              <!-- 上传之后的图片 -->
              <img :src="headImgSrc" v-if="headImg" alt=""/>
              <!-- 未上传的图片 -->
              <img
                :src="info.head_portrait"
                v-else
                alt
              />
            </div>
            <img src="@/pages/shop/views/live/backend/images/liveList_rightArrow.png" alt />
            <input name="coverFile" type="file" accept="image/*" class="upload-file"  @change="CoverUpload">
            <!-- <van-uploader class="upload-file" :max-size="1" @oversize="onOversize" /> -->
          </div>
        </div>
        <!-- 内容 -->
        <div class="hostInfo_content">
          <div class="hostInfo_content_main">
            <div class="hostInfo_content_child">
              <div class="hostInfo_content_main_left">
                <span>直播昵称</span>
              </div>
              <div class="hostInfo_content_main_right">
                <input type="text" maxlength="8" placeholder="请输入昵称 最多可设置8个汉字" v-model="nickname"/>
              </div>
            </div>
            <div class="hostInfo_content_child">
              <div class="hostInfo_content_main_left">
                <span>简介</span>
              </div>
              <div class="hostInfo_content_main_right">
                <textarea maxlength="30" placeholder="请输入昵称 最多可设置30个汉字" style="width:100%;" v-model="brief"></textarea>
              </div>
            </div>
          </div>
        </div>
        <!-- 保存按钮 -->
        <div class="saveHostInfo" @click="liveChangeInfo">
          <span>保存</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hint from "@/plugins/hint";
import { Toast } from 'vant';
import {liveInfo,liveChangeInfo,shortLiveImgUpload} from '@/api/shop/live'
export default {
  name: "introduce",
  components: {},
  data() {
    return {
      showLoading: false,
      pageListTitle: "个人资质认证",
      checkStatus: 1,
      psgeNum: 1,
      page_num: 0,
      info:'',
      headImg:false,
      headImgSrc:''
    };
  },
  created() {},
  computed: {},
  mounted() {
    let that = this;
    that.liveInfoFun()
  },
  methods: {
    // 直播信息
    liveInfoFun(){
      liveInfo({

      }).then(res=>{
        this.info = res.list;
        this.nickname  = res.list.nickname;
        this.brief = res.list.brief;
      })
    },
     // 修改直播信息
    liveChangeInfo(){
      let jsonVal={
        nickname: this.nickname,
        head_portrait: this.info.head_portrait,
        brief: this.brief
      }
      if(this.headImg){
        jsonVal.head_portrait = this.headImgSrc
      }
      liveChangeInfo(jsonVal).then(res=>{
        this.$router.replace({
          path: '/shop/bac/liveList',
          query:{}
        })
      })
    },
    // 返回上一页
    backPage(){
      this.$router.replace({
        path:'/shop/bac/liveList',
        query:{}
      })
    },
    onOversize(file){
      Toast('文件大小不能超过 500kb');
    },
    /**
         * @description: 上传封面
         * @param {type}
         * @return:
         */
      CoverUpload(event) {
          let that = this,
              file = event.srcElement, //当前file对象
              files = file.files[0];
          if (files.type && !/png|jpeg|gif|jpg/.test(files.type.toLowerCase())) {
              hint.Msg({
                  message: '图片格式必须是png,jpg,gif'
              });
              return false;
          }
          if (files.size > 31457280) {
              hint.Msg({
                  message: '图片不能大于30M'
              });
              return false;
          }
          shortLiveImgUpload(file).then(res => {
              this.headImg = true
              this.headImgSrc = res.path
          });
      },
  }
};
</script>

<style scoped lang="scss">
input,
textarea {
  border: 0;
}
// 返回按钮
.searchNoteTop {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.88rem;
  background: #fff;
  font-size: 0.34rem;
  color: #222222;
  position: relative;

  .searchNoteTop_left {
    position: absolute;
    left: 0.25rem;
    top: 50%;
    transform: translateY(-50%);

    .voerTop_menuLeft {
      width: 0.45rem;
      height: 0.45rem;
      display: flex;
      justify-content: center;
      align-items: center;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

      span::after {
        content: "";
        display: block;
        width: 0.2rem;
        height: 0.2rem;
        border-left: 2px solid #000;
        border-top: 2px solid #000;
        transform: rotate(-45deg);
      }
    }
  }
}
#video_liveList {
  min-height: 100vh;
  background: #f3f3f7;
}
.hostInfo_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 0.31rem;
  font-size: 0.28rem;
  color: #222222;
  background: #fff;
  padding-top: 0.23rem;
  padding-bottom: 0.27rem;
  border-bottom-left-radius: 0.26rem;
  border-bottom-right-radius: 0.26rem;
  margin-bottom: 0.1rem;
  .hostInfo_head_right {
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    .hostInfo_headImg {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .upload-file{
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
      opacity: 0;
    }
    img {
      width: 0.16rem;
      height: 0.27rem;
    }
  }
}
.hostInfo_content {
  position: relative;
  margin-bottom: 0.61rem;
  .hostInfo_content_main {
    border-radius: 0.26rem;
    overflow: hidden;
    padding-left: 0.37rem;
    background: #fff;
    .hostInfo_content_child {
      font-size: 0.28rem;
      color: #222222;
      display: flex;
      padding: 0.37rem 0.31rem;
      padding-left: 0;
      border-bottom: 1px solid #ededed;
      &:last-child {
        border: 0;
      }
      .hostInfo_content_main_left {
        box-sizing: border-box;
        width: 1.9rem;
      }
      .hostInfo_content_main_right {
        flex: auto;
        input {
          width: 4rem;
        }
      }
    }
  }
}
.saveHostInfo {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: 0.9rem;
  width: 3.8rem;
  text-align: center;
  line-height: 0.9rem;
  background: rgba(0, 122, 255, 1);
  box-shadow: 0.09rem 0.16rem 0.3rem 0px rgba(0, 136, 255, 0.2);
  border-radius: 0.45rem;
  color: #fff;
  font-size: 0.28rem;
}
</style>

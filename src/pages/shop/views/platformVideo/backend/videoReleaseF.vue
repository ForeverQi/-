<template>
  <div id="certification" v-wechat-title="$route.meta.title= pageListTitle">
    <van-loading v-if="showLoading" size="50px" color="#1989fa" />
    <van-overlay :show="showLoading" />
    <div class="certification">
      <div class="searchNoteTop">
        <div class="searchNoteTop_left">
          <div class="voerTop_menuLeft">
            <span></span>
          </div>
        </div>
        <div class="searchNoteTop_right">
          <span>发布商品</span>
        </div>
      </div>
      <div class="release">
        <div class="release_box">
          <div class="release_box_title">
            <span><span class="release_box_num">1/3</span> 选择商品类型</span>
          </div>
          <div class="release_content">
            <div class="release_content_title">
              <span>栏目名称</span>
            </div>
            <div class="release_content_box">
              <div class="release_children check_release">
                <span>大类大类大类大类大类</span>
              </div>
              <div class="release_children">
                <span>大类大类大类大类大类</span>
              </div>
              <div class="release_children">
                <span>大类大类大类大类大类</span>
              </div>
              <div class="release_children">
                <span>大类大类大类大类大类</span>
              </div>
              <div class="release_children">
                <span>大类大类大类大类大类</span>
              </div>
            </div>
          </div>
          <div class="release_content">
            <div class="release_content_title">
              <span>栏目名称</span>
            </div>
            <div class="release_content_box">
              <div class="release_children check_release">
                <span>大类大类大类大类大类</span>
              </div>
              <div class="release_children">
                <span>大类大类大类大类大类</span>
              </div>
              <div class="release_children">
                <span>大类大类大类大类大类</span>
              </div>
              <div class="release_children">
                <span>大类大类大类大类大类</span>
              </div>
              <div class="release_children">
                <span>大类大类大类大类大类</span>
              </div>
            </div>
          </div>
          <div class="release_content">
            <div class="release_content_title">
              <span>栏目名称</span>
            </div>
            <div class="release_content_box">
              <div class="release_children check_release">
                <span>大类大类大类大类大类</span>
              </div>
              <div class="release_children">
                <span>大类大类大类大类大类</span>
              </div>
              <div class="release_children">
                <span>大类大类大类大类大类</span>
              </div>
              <div class="release_children">
                <span>大类大类大类大类大类</span>
              </div>
              <div class="release_children">
                <span>大类大类大类大类大类</span>
              </div>
            </div>
          </div>
          <div class="nextButton">
            <button class="nextButtonSuccess">下一步</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";

export default {
  name: "introduce",
  data() {
    return {
      showLoading: false,
      pageListTitle: "个人资质认证"
    };
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
button {
  outline: none;
  border: 0;
}
// 返回按钮
.searchNoteTop {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.1rem;
  background: #f6f6f6;
  font-size: 0.36rem;
  color: #303030;
  font-weight: bold;
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

.release {
  .release_box {
    padding: 0.33rem 0.52rem 0;
    .release_box_title {
      font-size: 0.38rem;
      color: #222222;
      margin-bottom: 0.7rem;
      .release_box_num{
        color: #666666;
        font-weight: bold;
      }
    }
    .release_content {
      margin-bottom: 0.4rem;
      .release_content_title {
        font-size: 0.34rem;
        color: #303030;
        font-weight: bold;
        margin-bottom: 0.2rem;
      }
      .release_content_box {
        display: flex;
        flex-wrap: wrap;
        .release_children {
          &:nth-child(3n) {
            margin-right: 0;
          }
          width: 1.81rem;
          height: 0.7rem;
          margin-bottom: 0.29rem;
          border: 1px solid rgba(188, 188, 188, 1);
          border-radius: 0.09rem;
          font-size: 0.28rem;
          color: #333333;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.09rem;
          padding-left: 0.23rem;
          margin-right: 0.5rem;
          span {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            word-wrap: break-word;
          }
        }
      }
    }
  }
}

.check_release {
  background: #ff730c !important;
  color: #fff !important;
  border: 1px solid #ff730c !important;
}
.nextButton {
  display: flex;
  justify-content: center;
  padding-top: 0.59rem;
  button {
    width: 5.19rem;
    height: 0.77rem;
    background: rgba(219, 219, 219, 1);
    border-radius: 0.15rem;
    font-size: 0.3rem;
    color: #fff;
  }
}
.nextButtonSuccess {
  background: #ff730c !important;
}
</style>

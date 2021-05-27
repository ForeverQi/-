<template>
  <div class="paid-container">
    <div class="cover">
      <img
        class="icon-back"
        src="@/pages/shop/views/live/frontend/images/icon-back2.png"
        alt=""
      />
      <img
        class="cover-img"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580754562447&di=d7787f1dd33dd42943d512ab3300451a&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120302%2F6445-1203021G20399.jpg"
        alt=""
      />
    </div>
    <div class="desc">
      <div class="desc-title">
        如何高效管理团队？明确大家都认同的目标，目标是方向，是团队存在的理由。
      </div>
      <div class="desc-date">2019-11-11 12:00开播</div>
      <div class="desc-price"><i class="letter">￥</i>9.99</div>
    </div>
    <div class="author">
      <img
        class="author-avatar"
        src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2034740944,4251903193&fm=26&gp=0.jpg"
        alt=""
      />
      <div class="author-info">
        <div class="author-name">小浪鱼儿</div>
        <div class="author-fans">333粉丝</div>
      </div>
      <div class="author-attention">关注</div>
    </div>
    <!-- <div class="special wrap">
      <div class="title">专题</div>
      <div class="special-item">
        <div class="special-cover">
          <img
            class="special-img"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580754562447&di=d7787f1dd33dd42943d512ab3300451a&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120302%2F6445-1203021G20399.jpg"
            alt=""
          />
        </div>
        <div class="special-desc">
          <p class="special-title">如何高效管理团队？明确大家都认同的目标</p>
          <p class="special-hot">快来看我赶海拾贝吧！快来看我赶海拾贝吧！</p>
        </div>
      </div>
    </div> -->
    <div class="info wrap">
      <div class="wrap_title">介绍</div>
      <div class="wrap_content">

      </div>
    </div>
    <div class="watch_btn">
        <div class="watch_btn_child" v-if="false">
          <div class="watch_childLeft">
            <input type="text" placeholder="请输入房间密码"/>
          </div>
          <div class="watch_childRight">进入观看</div>
        </div>
        <div class="watch_btn_child watch_btn_child2">
          ￥99.99  付费观看
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import '@/pages/shop/views/live/frontend/css/Paid.scss'
</style>

<template>
  <div class="room-item">
    <div
      class="room-cover"
      style="background-image:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580754562447&di=d7787f1dd33dd42943d512ab3300451a&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120302%2F6445-1203021G20399.jpg)"
    >
      <div class="room-top">
        <div class="room-state">直播中</div>
        <div class="room-title">小浪鱼儿户外赶海第88期</div>
      </div>
      <div class="room-bottom">
        <div class="room-price">
          <i class="letter">￥</i>
          <i class="price-num">99.00</i>
        </div>
        <div class="room-hot">
          <!-- <div class="icon-hot"> -->
          <img src="@/pages/shop/views/live/frontend/images/icon-hot.png" alt />
          <!-- </div> -->
          <span class="hot-text">4396</span>
        </div>
      </div>
    </div>
    <div class="room-author">
      <img
        class="author-avatar"
        src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2034740944,4251903193&fm=26&gp=0.jpg"
        alt
      />
      <div class="author-info">
        <div class="author-name">小浪鱼儿</div>
        <div class="author-fans">333粉丝</div>
      </div>
      <div class="author-attention">关注</div>
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
.room-item {
  background: #fff;
  border-radius: 0.25rem;
  padding: 0.1rem 0.1rem 0;
  margin-bottom: 0.1rem;
  .room-cover {
    position: relative;
    width: 100%;
    height: 4.1rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 0.1rem;
    .room-top {
      position: absolute;
      top: 0.3rem;
      left: 0.2rem;
      display: flex;
      align-items: center;
      .room-state {
        font-size: 0.24rem;
        color: #fff;
        line-height: 0.34rem;
        height: 0.34rem;
        padding: 0 0.1rem;
        background: #ff5533;
        border-radius: 0.05rem;
      }
      .room-title {
        color: #fff;
        font-size: 0.28rem;
        margin-left: 0.2rem;
      }
    }
    .room-bottom {
      position: absolute;
      bottom: 0.2rem;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.3rem;
      color: #fff;
      .room-price {
        line-height: 0.32rem;
        .letter {
          font-size: 0.24rem;
        }
        .price-num {
          font-size: 0.32rem;
        }
      }
      .room-hot {
        display: flex;
        align-items: center;
        .hot-text {
          color: #fff;
          font-size: 0.24rem;
          opacity: 0.6;
        }
        img {
          width: 0.3rem;
          height: 0.18rem;
          margin-right: 0.1rem;
        }
        .icon-hot {
          width: 0.3rem;
          height: 0.18rem;
          margin-right: 0.1rem;
          img {
            width: 100%;
            height: 100%;
          }
          // background: url('@/pages/shop/views/live/frontend/images/icon-hot.png') no-repeat center center / 100% 100%;
        }
      }
    }
  }
  .room-author {
    display: flex;
    align-items: center;
    padding: 0.28rem 0.1rem 0.25rem;
    .author-avatar {
      display: block;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      margin-right: 0.2rem;
    }
    .author-info {
      flex: 1;
      .author-name {
        font-size: 0.26rem;
        line-height: 0.26rem;
        color: #000000;
      }
      .author-fans {
        margin-top: 0.12rem;
        font-size: 0.24rem;
        line-height: 0.24rem;
        color: #999999;
      }
    }
    .author-attention { 
      width: 1.2rem;
      height: 0.5rem;
      border-radius: 0.25rem;
      line-height: 0.52rem;
      text-align: center;
      border: 1px solid rgba(255, 85, 51, 0.5);
      color: #ff5533;
      font-size: 0.26rem;
    }
  }
}
</style>

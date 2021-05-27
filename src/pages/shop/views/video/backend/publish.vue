<!--
 * @Author: qwguo
 * @Date: 2020-01-13 12:43:03
 * @LastEditTime : 2020-07-07 20:47:22
 * @LastEditors  : qwguo
 * @Description: In User Settings Edit
 * @FilePath     : \ev-frontend-test\src\pages\shop\views\video\backend\publish.vue
 -->
<template>
    <div class="publish-video">
        <router-view />
    </div>
</template>




<script>
export default {
    name: "publish",
    data() {
        return {

        };
    },
    created(){
        this.$util.app.Shop.Refresh(false, 0);
    },
    beforeDestroy(){
        this.$util.app.Shop.Refresh(true, 0);
    }
};
</script>



<style lang="scss">
@import "./css/videoPublic.scss";
.publish-video {
    display: flex;
    flex-direction: column;
    height: 100%;

}
</style>

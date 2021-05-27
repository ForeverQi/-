<!--
 * @Author: fengting
 * @Date: 2020-11-06 11:53:20
 * @LastEditTime: 2020-11-30 17:12:25
 * @LastEditors: Please set LastEditors
 * @Description: 分销中心头部公用插槽
 * @FilePath: \vue_test_qian\src\components\distribution\publicHead.vue
-->
<template>
    <div class="cen-head1">
        <router-link :to="linkreturn" class="link-return1"><img src="@/pages/distribution/assets/images/link-return1.png" />
        </router-link>
        <div class="head-tit1"><slot name="headTit"></slot></div>
    </div>
</template>

<script>
export default {
    name: 'publicHead',
    props: ['linkreturn'],
}
</script>

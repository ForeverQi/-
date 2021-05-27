<template>
    <div class="contents">
        <router-view name="Header"/>
        <router-view name="Menu"/>
        <router-view name="Left"/>
        <router-view name="Right"/>
        <router-view name="Navigation"/>
        <router-view name="Contents"/>
        <router-view name="Footer"/>
    </div>
</template>

<script>
    import util from '@/libs/util'

    export default {
        name: 'contents'
    }
</script>
<style lang="scss">
    @import '../assets/scss/base/public-font-icon.scss';
</style>

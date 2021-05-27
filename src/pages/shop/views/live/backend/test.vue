<template>
    <p>test</p>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {

            }
        },

        computed: {
            ...mapGetters([
                'variables'
            ])
        },

        created() {

        },

        methods: {

        }
    }
</script>

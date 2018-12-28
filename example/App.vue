<template>
    <div class="container">
        <timeless-clock></timeless-clock>
    </div>
</template>

<script>
    import TimelessClock from './../TimelessClock.vue';

    export default {
        components: { TimelessClock }
    }
</script>

<style lang="scss">
    body,
    html {
        height: 100%;
    }

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .timeless-clock-container {
        padding: 10px;
        background: #ebebeb;
    }
</style>
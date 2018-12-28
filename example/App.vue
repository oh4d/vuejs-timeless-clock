<template>
    <div class="container">
        <ul>
            <li>
                <h2>Local Time<br/><small>default use</small></h2>
                <timeless-clock :displaySeconds="false"></timeless-clock>
            </li>
            <li>
                <h2>France Timezone<br/><small>moment use</small></h2>
                <timeless-clock :displaySeconds="false"
                                timezone="Europe/Paris"
                                :time="getMomentTime()"></timeless-clock>
            </li>
            <li>
                <h2>America Timezone<br/><small>moment use</small></h2>
                <timeless-clock :blink="false"
                                time="moment"
                                timezone="America/Los_Angeles"></timeless-clock>
            </li>
            <li>
                <h2>Local Time<br/><small>Date object use</small></h2>
                <timeless-clock></timeless-clock>
            </li>
            <li>
                <h2>Local Time<br/><small>Date object use</small></h2>
                <timeless-clock :time="new Date()"></timeless-clock>
            </li>
            <li>
                <h2>Custom time as string</h2>
                <timeless-clock time="23:33:43"></timeless-clock>
            </li>
        </ul>
    </div>
</template>

<script>
    import moment from 'moment';
    import TimelessClock from './../TimelessClock.vue';

    export default {
        components: { TimelessClock },

        methods: {
            getMomentTime() {
                return moment();
            }
        }
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
        display: inline-block;
    }

    ul {
        list-style: none;

        li {
            width: 300px;
            padding: 10px;
            margin: 0 10px;
            text-align: center;
            display: inline-block;
            border:1px solid #ebebeb;
        }
    }
</style>
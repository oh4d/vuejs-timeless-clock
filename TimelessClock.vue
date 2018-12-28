<template>
    <div class="timeless-clock-container" style="direction: ltr">
        <div class="timeless-clock">
            <span class="timeless-clock-hours">{{ hoursComputed }}</span>
            <span>:</span>
            <span class="timeless-clock-minutes">{{ minutesComputed }}</span>
            <span>:</span>
            <span class="timeless-clock-seconds">{{ secondsComputed }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {},

        data() {
            return {
                hours: 0,
                minutes: 0,
                seconds: 0,
                interval: null,
            }
        },

        created() {
            this.start();
        },

        mounted() {},

        destroyed() {
            this.stop();
        },

        computed: {
            hoursComputed() {
                return this.clockPart(this.hours);
            },

            minutesComputed() {
                return this.clockPart(this.minutes);
            },

            secondsComputed() {
                return this.clockPart(this.seconds);
            }
        },

        methods: {
            /**
             * Start the clock
             * Add interval for every second
             */
            start() {
                this.interval = setInterval(() => {
                    this.addSecond();
                }, 1000);
            },

            /**
             * Stop the clock
             * Clearing the interval
             */
            stop() {
                clearInterval(this.interval);
                this.interval = null;
            },

            addSecond() {
                if (this.seconds === 59) {
                    this.addMinute();
                    this.seconds = 0;
                    return;
                }

                this.seconds++;
            },

            addMinute() {
                if (this.minutes === 59) {
                    this.addHour();
                    this.minutes = 0;
                    return;
                }

                this.minutes++;
            },

            addHour() {
                if (this.hours === 23) {
                    this.hours = 0;
                    return;
                }

                this.hours++;
            },

            clockPart(value) {
                return (value >= 10) ? value : '0' + value;
            }
        }
    }
</script>
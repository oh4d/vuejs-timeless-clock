<template>
    <div class="timeless-clock-container" style="direction: ltr">
        <div class="timeless-clock">
            <span class="timeless-clock-hours">{{ hoursComputed }}</span>
            <span :style="{'visibility': (blinked) ? 'hidden' : 'visible'}">:</span>
            <span class="timeless-clock-minutes">{{ minutesComputed }}</span>

            <template v-if="displaySeconds">
                <span :style="{'visibility': (blinked) ? 'hidden' : 'visible'}">:</span>
                <span class="timeless-clock-seconds">{{ secondsComputed }}</span>
            </template>
        </div>
    </div>
</template>

<script>
    import moment from 'moment-timezone';

    function padClock(value) {
        value = Number(value);
        return (value >= 10) ? value : '0' + value;
    }

    export default {
        props: {
            blink: {default: true},
            displaySeconds: {default: true},
            time: {default: null},
            timezone: {default: null}
        },

        data() {
            return {
                hours: 0,
                minutes: 0,
                seconds: 0,
                current: null,
                interval: null,
                blinked: false
            }
        },

        created() {
            this.initializeTime();
        },

        destroyed() {
            this.stop();
        },

        watch: {
            timezone() {
                this.stop();
                this.initializeTime();
            }
        },

        computed: {
            hoursComputed() {
                return padClock(this.hours);
            },

            minutesComputed() {
                return padClock(this.minutes);
            },

            secondsComputed() {
                return padClock(this.seconds);
            }
        },

        methods: {
            initializeTime() {
                // Default clock time
                if (!this.time || this.time instanceof Date) {
                    this.current = (this.time) ? this.time : new Date();
                    this.defaultUpdate();
                }

                // moment use
                else if (this.time === 'moment' || this.time instanceof moment) {
                    this.initializeMomentTime();
                }

                // string use
                else if (typeof this.time === 'string') {
                    this.current = '';
                    let splitClockString = this.time.split(':');

                    for (let i = 0; i < 3; i++) {
                        this.current += (i > 0) ? ':' : '';
                        this.current += (splitClockString[i]) ? padClock(splitClockString[i]) : '00';
                    }

                    this.setClockString();
                }

                if (this.current) {
                    this.start();
                }
            },

            initializeMomentTime() {
                this.current = (this.time instanceof moment) ? this.time : moment();

                if (this.timezone) {
                    this.current.tz(this.timezone);
                }

                this.updateByMoment();
            },

            /**
             * Start the clock
             * Add interval for every second
             */
            start() {
                this.interval = setInterval(() => {
                    this.intervalClock();
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

            /**
             * Clock Interval Handler
             */
            intervalClock() {
                if (this.blink) {
                    this.blinked = !this.blinked;
                }

                if (typeof this.current === 'object') {
                    this.intervalInstanceClock();
                    return;
                }

                // Continue update string clock
                this.addSecond();
                this.current = this.hoursComputed + ':' + this.minutesComputed + ':' + this.secondsComputed;
            },

            intervalInstanceClock() {
                // Case current time handle with moment object
                if (this.current instanceof moment) {
                    this.current.add(1, 'seconds');
                    this.updateByMoment();
                    return;
                }

                // Case current time handle with Date object
                if (this.current instanceof Date) {
                    this.current.setSeconds(this.seconds + 1);
                    this.defaultUpdate();
                }
            },

            /**
             * Manually Add Second
             */
            addSecond() {
                if (this.seconds === 59) {
                    this.addMinute();
                    this.seconds = 0;
                    return;
                }

                this.seconds++;
            },

            /**
             * Manually Add Minute
             */
            addMinute() {
                if (this.minutes === 59) {
                    this.addHour();
                    this.minutes = 0;
                    return;
                }

                this.minutes++;
            },

            /**
             * Manually Add Hour
             */
            addHour() {
                if (this.hours === 23) {
                    this.hours = 0;
                    return;
                }

                this.hours++;
            },

            /**
             * Update moment instance clock data
             */
            updateByMoment() {
                this.seconds = this.current.seconds();
                this.minutes = this.current.minutes();
                this.hours = this.current.hours();
            },

            /**
             * Update default date object
             */
            defaultUpdate() {
                this.seconds = this.current.getSeconds();
                this.minutes = this.current.getMinutes();
                this.hours = this.current.getHours();
            },

            /**
             *
             */
            setClockString() {
                let splitClockString = this.current.split(':');

                this.hours = Number(splitClockString[0]);
                this.minutes = Number(splitClockString[1]);
                this.seconds = Number(splitClockString[2]);
            }
        }
    }
</script>

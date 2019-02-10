# vuejs-timeless-clock

VueJs Clock component with custom time props.

## Installation

NPM:
```shell
npm install --save vuejs-timeless-clock
```

## Props

| Prop      | Type | Usage  |
| ----      | ---- | ------ |
| blink     | boolean | Blink the colon separator (default true)
| displaySeconds | boolean |  Display the seconds count (default true)
| time      | mixed | Set the clock time (default Date object)
| timezone      | string | Set the clock timezone

## Example

```vue
<template>
  <timeless-clock :displaySeconds="false"/>
  
  <timeless-clock :displaySeconds="false" 
                  timezone="Europe/Paris" 
                  time="moment"/>
                  
  <timeless-clock :displaySeconds="false"
                  timezone="Europe/Paris"
                  :time="getMomentTime()"/>
                  
  <timeless-clock time="23:33:43"/>
  
  <timeless-clock :time="new Date()"/>
</template>

<script>
import moment from 'moment'
import TimelessClock from 'vuejs-timeless-clock'

export default {
  components: { TimelessClock },
  
  methods: {
      getMomentTime() {
          return moment();
      }
  }
}
</script>
```

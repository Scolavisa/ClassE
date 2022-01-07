<template>
    <h1>{{$t('calendarmonthview')}}</h1>
    <div class="cal-container">
        <vue-cal
            class="vuecal--rounded-theme vuecal--green-theme"
            xsmall
            hide-view-selector
            :time="false"
            active-view="month"
            :disable-views="['week', 'day', 'year', 'years']"
            :events="events"
            @cell-click="openDayview"
        />
    </div>
</template>

<script setup>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { useRouter } from "vue-router";
const router = useRouter();
const events = [
    {
        start: '2022-01-21',
        end: '2022-01-21',
        title: 'stuff'
    },
]
const openDayview = (ev) => {
    const targetDay = ev.toISOString().split('T')[0];
    router.push({name: 'calendarday', params: {targetDay}});
}
</script>

<style scoped>
.cal-container {
    position: relative;
    height: 50vh;
}

</style>
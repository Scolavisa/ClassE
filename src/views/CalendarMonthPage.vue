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
/**
 * forward click on day to day-detail view
 * @param ev
 */
const openDayview = (ev) => {
    // Fri Jul 01 2022 00:52:00 GMT+0200
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let datePart = ev.toLocaleString("nl-Nl", options);
    // make 'mystyle' date if needed
    if (datePart.charAt(2) === '-') {
        datePart = datePart.substring(6) + "-" + datePart.substring(3,5) + "-" + datePart.substring(0,2);
    }
    router.push({name: 'calendarday', params: {targetDay: datePart}});
}
</script>

<style scoped>
.cal-container {
    position: relative;
    height: 50vh;
}

</style>

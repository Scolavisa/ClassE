<template>
    <top-menu />
    <template v-if="theDay.length > 0">
        <div class="calendar-section">
            <h3>{{ $t('dayviewfor') }} {{ viewTargetDate }}</h3>
            <table class="table table-responsive">
                <tr v-for="timeSlot in theDay">
                    <td>{{ timeSlot.from }}-{{ timeSlot.to }}</td>
                    <td>{{ timeSlot.studentname }}</td>
                    <td>{{ timeSlot.coursename }}</td>
                    <td>{{ timeSlot.locationname }}</td>
                </tr>
            </table>
        </div>
    </template>
    <template v-else>
        {{$t('youhavenoappointmentson')}} {{ viewTargetDate }}.
    </template>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from 'vue-router';
import useCalendar from "@/composables/UseCalendar";
import TopMenu from "@/components/TopMenu.vue";

const { getEventsOfDay, theDay } = useCalendar();
const route = useRoute();
const targetDay = route.params.targetDay;

const viewTargetDate = computed(() => {
    return `${targetDay.substr(8,2)}-${targetDay.substr(5,2)}-${targetDay.substr(0,4)}`
});
// get target day data
onMounted(() => {
    getEventsOfDay(targetDay);
});

</script>

<style scoped>

</style>
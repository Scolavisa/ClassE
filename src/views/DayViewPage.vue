<template>
    <top-menu />
    <template v-if="theDay.length > 0">
        <div class="calendar-section">
            <h3 class="text-center">
                <font-awesome-icon icon="calendar" />
                {{ viewTargetDate }}
            </h3>
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
        <h4 class="text-center mt-4">
            {{$t('youhavenoappointmentson')}} {{ viewTargetDate }}.
        </h4>
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
    const viewDay = new Date(targetDay);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return viewDay.toLocaleDateString('nl-NL', options);
});
// get target day data
onMounted(() => {
    getEventsOfDay(targetDay);
});

</script>

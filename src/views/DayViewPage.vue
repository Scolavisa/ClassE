<template>
    <top-menu />
    <template v-if="theDayWithFreeTime.length > 0">
        <div class="calendar-section">
            <h3 class="text-center">
                <font-awesome-icon icon="calendar" />
                {{ viewTargetDate }}
            </h3>
            <table class="table table-responsive">
                <tr
                    v-for="(timeSlot, index) in theDayWithFreeTime"
                    :key="index"
                    :class="timeSlot.eventType==='dateexception' ? 'dateexception' : timeSlot.classname"
                >
                    <template v-if="timeSlot.type === 'work'">
                        <td v-if="timeSlot.isWholeDay">{{ $t('wholeday') }}</td>
                        <td v-else>{{ timeSlot.from }}-{{ timeSlot.to }}</td>

                        <td class="text-center" colspan="3" v-if="timeSlot.eventType === 'dateexception'">
                            {{ timeSlot.reason }}
                        </td>
                        <td v-if="timeSlot.eventType === 'event'">{{ timeSlot.studentname }}</td>
                        <td v-if="timeSlot.eventType === 'event'">{{ timeSlot.coursename }}</td>
                        <td v-if="timeSlot.eventType === 'event'">{{ timeSlot.locationname }}</td>
                    </template>
                    <template v-else-if="timeSlot.type==='free'">
                        <td colspan="4">{{ $t("not_scheduled") }}: {{ timeSlot.mins }}</td>
                    </template>
                    <template v-else>
                        <td colspan="4">{{ $t("overlap") }} {{ timeSlot.mins }}</td>
                    </template>
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

const { getEventsOfDay, theDayWithFreeTime } = useCalendar();
const route = useRoute();
const targetDay = route.params.targetDay;

/** page title */
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

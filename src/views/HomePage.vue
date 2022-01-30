<template>
    <div v-if="domainName!==''" class="mb-2 alert alert-primary">
        {{ domainName }}
    </div>
    <top-menu :suppress-home-link="true"/>
    <p>
        {{ $t("hello")}} {{ userName }},
        {{ $t("welcome") }}
    </p>
    <template v-if="filteredEvents.length > 0">
        <div class="calendar-section">
            <h3>{{$t('yourcalendarfortoday')}}:</h3>
            <table class="table table-responsive">
                <tr v-for="timeSlot in filteredEvents" :class="timeSlot.classname">
                    <td>{{ timeSlot.from }}-{{ timeSlot.to }}</td>
                    <td>{{ timeSlot.studentname }}</td>
                    <td>{{ timeSlot.coursename }}</td>
                    <td>{{ timeSlot.locationname }}</td>
                </tr>
            </table>
        </div>
    </template>
    <template v-else>
        {{$t('youhavenoappointmentstoday')}}.
    </template>
</template>

<script setup>

import { computed } from "vue";
import useAuth from "@/composables/UseAuth";
import useCalendar from "@/composables/UseCalendar";
import TopMenu from "@/components/TopMenu.vue";
const { domainName, userName, user } = useAuth();
const { myDay } = useCalendar();
const filteredEvents = computed(() => {
    return myDay.value.filter(event => event.classname !== 'past');
});

</script>

<style lang="scss">
@import "src/assets/scss/classed";
.calendar-section {
    margin-bottom: 5rem;
}
.past {
    color: lightgray;
}
.current {
    color: $secondary;
}
.future {
    color: gray;
}
.alert {
    padding: 0.1rem 1rem;
}
</style>

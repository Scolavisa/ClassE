<template>
    <div v-if="domainName!==''" class="mb-2 alert alert-primary">
        {{ domainName }}
    </div>
    <h1>Welkom {{ userName }}</h1>
    <p>
        Welkom bij het Class Educators Dashboard.<br/>
    </p>
    <p>
    <router-link to="/calendarmonth" class="btn btn-secondary">Bekijk je maandoverzicht</router-link>
    </p>
    <template v-if="filteredEvents.length > 0">
        <div class="calendar-section">
            <h3>Je agenda voor vandaag:</h3>
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
        Je hebt vandaag geen afspraken in je agenda.
    </template>
</template>

<script setup>
import { computed } from "vue";
import useAuth from "../composables/UseAuth";
import useCalendar from "../composables/UseCalendar";
const { domainName, userName } = useAuth();
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
</style>

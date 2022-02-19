<template>
    <div v-if="domainName!==''" class="mb-2 alert alert-primary">
        {{ domainName }}
    </div>
    <top-menu :suppress-home-link="true"/>
    <p>
        {{ $t("hello")}} {{ userName }},
        {{ $t("welcome") }}
    </p>
    <template v-if="myDayWithFreeTime.length > 0">
        <div class="calendar-section">
            <h3>{{$t('yourcalendarfortoday')}}:</h3>
            <table class="table table-responsive">
                <tr v-for="timeSlot in myDayWithFreeTime" :class="timeSlot.classname">
                    <template v-if="timeSlot.type==='work'">
                        <td>{{ timeSlot.from }}-{{ timeSlot.to }}</td>
                        <td>{{ timeSlot.studentname }}</td>
                        <td>{{ timeSlot.coursename }}</td>
                        <td>{{ timeSlot.locationname }}</td>
                    </template>
                    <template v-if="timeSlot.type==='free'">
                        <td colspan="4">
                            {{ $t("free") }}: {{ timeSlot.mins }}
                        </td>
                    </template>
                </tr>
            </table>
        </div>
    </template>
    <template v-else>
        {{$t('youhavenoappointmentstoday')}}.
    </template>
</template>

<script setup>
import useAuth from "@/composables/UseAuth";
import useCalendar from "@/composables/UseCalendar";
import TopMenu from "@/components/TopMenu.vue";
const { domainName, userName, user } = useAuth();
const { myDayWithFreeTime } = useCalendar();
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

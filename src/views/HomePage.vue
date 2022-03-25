<template>
    <div v-if="domainName!==''" class="mb-2 alert alert-primary">
        {{ domainName }}
    </div>
    <top-menu :suppress-home-link="true"/>
    <p>
        {{ $t("hello")}} {{ userName }},<br/>
        {{ $t("welcome") }}
    </p>
    <p v-if="countUnreadMessages > 0" class="alert alert-primary text-center">
        <router-link to="messagebox" class="nav-link">
            {{ $t("youhavenrofunreadmessages", {count: countUnreadMessages})}}
            <font-awesome-icon icon="arrow-alt-circle-right"></font-awesome-icon>
        </router-link>
    </p>
    <template v-if="myDayWithFreeTime.length > 0">
        <div class="calendar-section">
            <h3>{{$t('yourcalendarfortoday')}}:</h3>
            <table class="table table-responsive">
                <tr
                    v-for="(timeSlot, index) in myDayWithFreeTime"
                    :key="index"
                    :class="timeSlot.eventType==='dateexception' ? 'dateexception' : timeSlot.classname"
                >
                    <template v-if="timeSlot.type==='work'">
                        <td v-if="timeSlot.isWholeDay">{{ $t('wholeday') }}</td>
                        <td v-else>{{ timeSlot.from }}-{{ timeSlot.to }}</td>

                        <td class="text-center" colspan="3" v-if="timeSlot.eventType === 'dateexception'">
                            {{ timeSlot.reason }}
                        </td>
                        <td v-if="timeSlot.eventType === 'event'">{{ timeSlot.studentname }}</td>
                        <td v-if="timeSlot.eventType === 'event'">{{ timeSlot.coursename }}</td>
                        <td v-if="timeSlot.eventType === 'event'">{{ timeSlot.locationname }}</td>
                    </template>
                    <template v-if="timeSlot.type==='free'">
                        <td colspan="4">{{ $t("not_scheduled") }}: {{ timeSlot.mins }}</td>
                    </template>
                    <template v-if="timeSlot.type==='overlap'">
                        <td colspan="4">{{ $t("overlap") }}: {{ timeSlot.mins }}</td>
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
import useMessageBox from "@/composables/useMessageBox";
import TopMenu from "@/components/TopMenu.vue";
const { domainName, userName } = useAuth();
const { myDayWithFreeTime } = useCalendar();
const { countUnreadMessages } = useMessageBox();
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

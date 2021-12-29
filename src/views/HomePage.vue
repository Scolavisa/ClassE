<template>
    <div v-if="domainName!==''" class="mb-2 alert alert-primary">
        {{ domainName }}
    </div>
    <h1>Welkom {{ userName }}</h1>
    <p>
        Welkom bij het Class Educators Dashboard.<br/>
    </p>

    <table class="table table-responsive">
        <tr v-for="timeSlot in myDay">
            <td>{{ timeSlot.from }}-{{ timeSlot.to }}</td>
            <td>{{ timeSlot.student }}</td>
            <td>{{ timeSlot.course }}</td>
            <td>{{ timeSlot.location }}</td>
        </tr>
    </table>
</template>

<script setup>
import useAuth from "../composables/UseAuth";
import useCalendar from "../composables/UseCalendar";
const { domainName, userName } = useAuth();
const { myDay } = useCalendar();

</script>

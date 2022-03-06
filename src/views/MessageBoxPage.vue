<template>
    <table class="table">
        <thead>
        <tr>
            <th>From</th>
            <th>Subject</th>
            <th>Date</th>
        </tr>
        </thead>
        <tbody>
            <tr
                v-for="message in unreadMessages"
                :key="message.id"
                @click="openMessage(message.id)"
            >
                <td>{{ message.from_label }}</td>
                <td>{{ message.subject }}</td>
                <td>{{ message.created_at.substring(0, 10) }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useMessageBox from "../composables/useMessageBox";
const { unreadMessages } = useMessageBox();
const router = useRouter();
const openMessage = (messageId) => {
    router.push({
        name: 'messagedisplay',
        params: {
            messageId
        }
    })
};

</script>

<style scoped>

</style>
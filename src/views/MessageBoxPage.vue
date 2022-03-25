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
                v-for="message in inbox"
                :key="message.id"
                @click="openMessage(message.id)"
                :class="[
                    {'unread': message.read_at == null || message.read_at === ''},
                    {'read': message.read_at != null && message.read_at !== ''},
                    'pointer'
                ]"
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
const { inbox } = useMessageBox();
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

<style scoped lang="scss">
@import "../assets/scss/classed";
.unread {
    color: $warning;
    font-size: 1.2rem;
}
.read {
    color: gray;
}
.pointer {
    cursor: pointer;
}
</style>
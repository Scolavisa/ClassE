<template>
    <div class="message">
        <div>{{ $t('from') }}: {{ message.from_label }}</div>
        <div>{{ $t('sent') }}: {{ formattedDate }}</div>
        <hr>
        <div class="messagetitle">{{ message.subject }}</div>
        <div v-html="message.body" class="messagebody"></div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import useMessageBox from "../composables/useMessageBox";
const { messageOpened, inbox } = useMessageBox();
const route = useRoute();
const message = computed(() => {
    const mID = parseInt(route.params?.messageId);
    return inbox.value.find(m => m.id === mID);
});
const formattedDate = computed(() => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(message.value?.created_at).toLocaleString("nl-NL", options);
});
// message has been opened -> update backend
messageOpened(route.params?.messageId);
</script>

<style scoped>
.message {
    padding: 1rem;
}
.messagetitle {
    font-weight: bold;
    margin-bottom: 1rem;
}
.messagebody {
    border: solid lightgray 1px;
    padding: 0.2rem;
}
</style>
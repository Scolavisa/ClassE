<template>
    <top-menu />
    <h3>{{ $t('dayviewfor') }} {{ targetDay }}</h3>

</template>

<script setup>
import { useRoute } from 'vue-router';
import TopMenu from "../components/TopMenu.vue";
const route = useRoute();
const targetDay = route.params.targetDay;

</script>

<style scoped>

</style>
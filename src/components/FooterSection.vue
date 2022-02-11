<template>
    <footer class="footer mt-auto py-3 bg-light fixed-bottom">
        <div class="container">
            <div
                v-if="isProdEnvironment"
                class="text-muted text-center">
                <small>CLASS by <a class="text-secondary" href="https://www.scolavisa.eu">Scolavisa</a> &copy; {{ dateRange }}</small>
            </div>
            <div v-else class="alert text-center text-danger">
                <font-awesome-icon icon="exclamation-circle"/>
                THIS IS A {{ environmentName }} ENVIRONMENT
            </div>
        </div>
    </footer>
</template>

<script setup>
import { computed } from "vue";

/**
 * date range to show for copyright line
  * @type {ComputedRef<string|string>}
 */
const dateRange = computed(() => {
    const d = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    return ye === "2021"
        ? "2021"
        : `2021 - ${ye}`;
});
const isProdEnvironment = computed(() => {
    return import.meta.env.VITE_APP_ENV === 'prod';
});
const environmentName = computed(() => {
    return import.meta.env.VITE_APP_ENV.toUpperCase();
});
</script>

<style scoped>

</style>
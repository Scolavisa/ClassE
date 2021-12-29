<template>
    <footer class="footer mt-auto py-3 bg-light fixed-bottom">
        <div class="container">
            <div class="text-muted text-center">
                <small>CLASS by <a href="https://www.scolavisa.eu">Scolavisa</a> &copy; {{ dateRange }}</small>
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
</script>

<style scoped>

</style>
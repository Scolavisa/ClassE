<template>
    <footer class="footer mt-auto py-3 bg-light fixed-bottom">
        <div class="container">
            <div class="text-muted text-center">
                <small>CLASS by <a href="https://www.scolavisa.eu">Scolavisa</a> &copy; 2021 - {{ ye }}</small>
            </div>
        </div>
    </footer>
</template>

<script setup>
const d = new Date();
const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
</script>

<style scoped>

</style>
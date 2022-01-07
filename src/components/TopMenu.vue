<template>
    <div class="btn-group d-flex mb-2" role="group">
        <router-link
            v-if="!suppressHomeLink"
            to="/"
            class="btn btn-primary"
        >
            {{ $t('home') }}
        </router-link>
        <router-link
            to="/calendarmonth"
            class="btn btn-secondary"
        >
            {{$t('yourmontlyoverview')}}
        </router-link>
    </div>
</template>

<script setup>
const props = defineProps({
    suppressHomeLink: {
        type: Boolean,
        defaul: false
    }
});
</script>

<style scoped>

</style>
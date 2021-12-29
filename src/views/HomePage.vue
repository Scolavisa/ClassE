<template>
    <h1>Welkom {{ userName }}</h1>
    <p>
        Welkom bij het Class Educators Dashboard.
    </p>
</template>

<script setup>
import { computed } from "vue";
import useAuth from "../composables/UseAuth";
const { user } = useAuth();

const userName = computed(() => {
    const name =  user.value?.name;

    return name
        ? name[0].toUpperCase() + name.substring(1)
        : '';
})
</script>

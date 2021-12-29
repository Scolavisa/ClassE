<template>
    <HeaderSection />
    <!-- Begin page content -->
    <main class="flex-shrink-0">
        <div class="container">
            <router-view />
        </div>
    </main>
    <FooterSection />
</template>

<script setup>

import HeaderSection from "./components/HeaderSection.vue";
import FooterSection from "./components/FooterSection.vue";
</script>

<style lang="scss">
@import "assets/scss/classed.scss";

</style>

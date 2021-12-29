<template>
    <header>
        <!-- Fixed navbar -->
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="container-fluid">
                <div class="navbar-brand" v-if="showBreakpoints">
                    <div class="d-none d-xl-inline"><h1>XL</h1></div>
                    <div class="d-none d-lg-inline d-xl-none"><h1>LG</h1></div>
                    <div class="d-none d-md-inline d-lg-none"><h1>MD</h1></div>
                    <div class="d-none d-sm-inline d-md-none"><h1>SM</h1></div>
                    <div class="d-inline d-sm-none"><h1>XS</h1></div>
                </div>
                <a v-else class="navbar-brand" href="#">CLASS-ED</a>
                <button class="navbar-toggler" id="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">Home</router-link>
                        </li>
                        <li v-if="authenticated" class="nav-item">
                            <span @click="logOut" class="nav-link">Logout</span>
                        </li>
                        <li v-else>
                            <router-link to="/login">Login</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "../composables/UseAuth";
const { authenticated, signOut } = useAuth();
const showBreakpoints = false;
const router = useRouter();
const error = ref('');
const logOut = async () => {
    await signOut();
    if (authenticated.value) {
        error.value = "logout not successful";
    } else {
        router.replace({name: 'login'});
    }
}

</script>

<style scoped>

</style>
<template>
    <header class="mb-2">
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
                <a v-else class="navbar-brand" href="#">
                    <img src="/img/class-e.png" class="logo" alt="Classed logo">
                </a>
                <!-- no menu when not authenticated -->
                <!-- the router will redirect to the login page anyway -->
                <template v-if="authenticated">
                    <!-- show on sm and below -->
                    <div class="d-sm-inline d-md-none">
                        <button
                            class="btn btn-primary btn-straight-corners"
                            id="ocToggler"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#mainMenu"
                            aria-controls="mainMenu"
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="offcanvas offcanvas-start" tabindex="-1" id="mainMenu"
                             aria-labelledby="mainMenuLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="mainMenuLabel">Menu</h5>
                                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                                <div class="d-grid gap-2">
                                    <router-link to="/" class="btn btn-primary">
                                        <font-awesome-icon icon="home"/>
                                        {{ $t('home') }}
                                    </router-link>
                                    <router-link v-if="authenticated" to="/calendarmonth" class="btn btn-primary">
                                        <font-awesome-icon icon="calendar"/>
                                        {{ $t('calendar') }}
                                    </router-link>
                                </div>
                            </div>
                            <div class="offcanvas-body">
                                <div class="d-grid gap-2">
                                    <button v-if="authenticated" @click="logOut" class="btn btn-secondary"
                                            type="button">
                                        <font-awesome-icon icon="sign-out-alt"/>
                                        {{ $t('logout') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </nav>
    </header>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import useAuth from "../composables/UseAuth";

const {authenticated, signOut} = useAuth();
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
.logo {
    height: 2.5rem;
}

.btn-straight-corners {
    border-radius: 0;
}
</style>
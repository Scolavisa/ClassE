import { createRouter, createWebHistory } from "vue-router";
import useAuth from "@/composables/UseAuth";
import Home from "@/views/HomePage.vue";
import Login from "@/views/LoginPage.vue";

const { authenticated } = useAuth();

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


/**
 * if not logged in: redirect to login page
 */
router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !authenticated.value) {
        next({name: 'login'});
    } else {
        next();
    }
})

/**
 * close nav bar after
 */
router.beforeEach((to, from, next) => {
    const toggler = document.getElementById("navbar-toggler");
    const isExpanded = toggler?.getAttribute('aria-expanded')==='true';
    if (isExpanded) toggler.click();
    next();
})

export default router;

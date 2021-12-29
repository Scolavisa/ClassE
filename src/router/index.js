import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import Login from "@/views/LoginPage.vue";

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
 * close nav bar after
 */
router.beforeEach((from, to, next) => {
    const toggler = document.getElementById("navbar-toggler");
    const isExpanded = toggler?.getAttribute('aria-expanded')==='true';
    if (isExpanded) toggler.click();
    next();
})

export default router;

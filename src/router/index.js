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

router.beforeEach(() => {
    document.getElementById('navbarCollapse').classList.remove('show');
})

export default router;

import { createRouter, createWebHistory } from "vue-router";
import useAuth from "@/composables/UseAuth";
import Home from "@/views/HomePage.vue";
import Login from "@/views/LoginPage.vue";
import CalendarMonth from "@/views/CalendarMonthPage.vue";
import CalendarDay from "@/views/DayViewPage.vue";

const { authenticated } = useAuth();

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/calendarmonth',
        name: 'calendarmonth',
        component: CalendarMonth
    },
    {
        path: '/calendarday',
        name: 'calendarday',
        component: CalendarDay
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
});

/**
 * close offcanvas after
 */
router.beforeEach((to, from, next) => {
    const ocMenu = document.getElementById("mainMenu");
    const isExpanded = ocMenu?.classList.contains('show');
    if (isExpanded) document.getElementById("ocToggler").click();
    next();
});

export default router;

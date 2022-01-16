import { mount } from '@vue/test-utils'
import Header from '../src/components/HeaderSection.vue'
import { createRouter, createWebHistory } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: {
                template: 'Welcome to the blogging app'
            }
        },
        {
            path: '/login',
            component: {
                template: 'Please login to the blogging app'
            }
        }
    ]
});

it('mounts component', async () => {
    router.push('/')
    await router.isReady()

    expect(Header).toBeTruthy();
    const wrapper = mount(Header, {
        global: {
            plugins: [router],
            components: [FontAwesomeIcon],
            compilerOptions: {
                isCustomElement: tag => tag.startsWith("font")
            }
        }
    });
    expect (wrapper.html()).toContain("<img src=\"/img/class-e.png\" class=\"logo\" alt=\"Classed logo\"");
});

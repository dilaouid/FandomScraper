import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/Home.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    /* {
        path: '/:wiki/characters',
        name: 'characters',
        component: () => import('@/pages/CharactersPage.vue'),
        props: true,
    }, */
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
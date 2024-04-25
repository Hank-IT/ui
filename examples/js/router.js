import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/pagination',
        component: () => import('@view/pagination/Pagination.vue'),
        name: 'pagination',
    }
]


export default createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`,
})
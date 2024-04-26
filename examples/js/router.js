import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/pagination',
        component: () => import('@view/pagination/Pagination.vue'),
        name: 'pagination',
    },
    {
        path: '/requests',
        component: () => import('@view/requests/Requests.vue'),
        name: 'requests',
    }
]


export default createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`,
})
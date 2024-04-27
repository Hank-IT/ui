import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/pagination',
        component: () => import('@view/pagination/Pagination.vue'),
        name: 'pagination',
    },
    {
        path: '/requests/:component?',
        component: () => import('@view/requests/Requests.vue'),
        name: 'requests',
        props: true,
    }
]


export default createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`,
})
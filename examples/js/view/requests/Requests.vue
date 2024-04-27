<template>
    <select v-model="selectedComponentKey">
        <RouterLink
            v-for="(component, key) in components"
            :to="{ name: 'requests', params: { component: key } }"
            custom
            v-slot="{ isActive, href, navigate }"
        >
            <option @click="navigate" :value="key">
                {{ component.name }}
            </option>
        </RouterLink>
    </select>

    <component v-if="selectedComponentKey" :is="components[selectedComponentKey].component" />
</template>

<script setup lang="ts">
import GetRequestWithDynamicParams from './components/getRequestWithDynamicParams/GetRequestWithDynamicParams.vue'
import AbortableRequest from './components/abortableRequest/AbortableRequest.vue'
import ServerErrorRequest from './components/serverErrorRequest/ServerErrorRequest.vue'
import {ref} from 'vue'

const props = defineProps({
    component: String,
})

const components = {
    'get-request-with-dynamic-params': {
        name: 'Get request with dynamic params',
        component: GetRequestWithDynamicParams,
    },
    'abortable-request': {
        name: 'Abortable request',
        component: AbortableRequest
    },
    'server-error-request': {
        name: 'Server error request',
        component: ServerErrorRequest
    },
}

const selectedComponentKey = ref(props.component)
</script>
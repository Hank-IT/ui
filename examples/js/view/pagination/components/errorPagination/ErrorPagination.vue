<template>
    <table>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
        </tr>
        <tr v-for="row in paginator.getPageData()">
            <td>{{ row.id }}</td>
            <td>{{ row.title }}</td>
            <td>{{ row.description }}</td>
        </tr>
    </table>

    Current page: {{ paginator.getCurrentPage() }}
    <br>
    Pages: {{ paginator.getPages() }}
    <br>
    Page Size: <input v-model="pageSize" />
    <br>
    Back Page <button @click="paginator.toPreviousPage()">Back</button>
    <br>
    Next Page <button @click="paginator.toNextPage()">Next</button>
    <br>
    Showing {{ paginator.getFromItemNumber() }} to {{ paginator.getToItemNumber() }} of {{ paginator.getTotal() }} items.

    {{ displayablePages }}
</template>

<script setup lang="ts">
import {BaseRequest, FetchDriver, VueLoaderDriverFactory} from "@hank-it/ui/service/requests"
import {Paginator, RequestDriver, VuePaginationDriverFactory} from "@hank-it/ui/service/pagination";
import {getDisplayablePages} from '@hank-it/ui/service/helpers'
import {GetProductsRequest} from "./GetProductsRequest";
import {computed} from 'vue'

/* Booting */
BaseRequest.setRequestDriver(new FetchDriver)
BaseRequest.setLoaderStateFactory(new VueLoaderDriverFactory)
Paginator.setViewDriverFactory(new VuePaginationDriverFactory())

/* component */
const getProductsRequest = new GetProductsRequest

const paginator = new Paginator(new RequestDriver(getProductsRequest))

paginator.init(1, 10).catch(paginationErrorHandler)

function paginationErrorHandler(response) {
    console.log(response.getError())
}

const pageSize = computed({
    set(value) {
        paginator.setPageSize(value)
    },
    get() {
        return paginator.getPageSize()
    }
})

const displayablePages = computed(() => {
    console.log(paginator.getPages())

    return getDisplayablePages(paginator.getPages().length, paginator.getCurrentPage())
})
</script>

<style scoped>

</style>
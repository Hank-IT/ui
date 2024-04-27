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
import {BaseRequest} from "../../../../../../src/service/requests"
import {FetchDriver} from "../../../../../../src/service/requests"
import {GetProductsRequest} from "./GetProductsRequest";
import {Paginator, RequestDriver} from "../../../../../../src/service/pagination";
import {VueLoaderDriverFactory} from '@hank-it/ui/service/pagination'
import VuePaginationDriverFactory from '../../../../../../src/service/pagination/factories/VuePaginationDriverFactory'
import {computed} from 'vue'
import {getDisplayablePages} from '../../../../../../src/service/helpers'

/* Booting */
BaseRequest.setRequestDriver(new FetchDriver(true))
BaseRequest.setLoaderStateFactory(new VueLoaderDriverFactory)
Paginator.setViewDriverFactory(new VuePaginationDriverFactory())

/* component */
const getProductsRequest = new GetProductsRequest

const paginator = new Paginator(new RequestDriver(getProductsRequest))

paginator.init(1, 10)

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
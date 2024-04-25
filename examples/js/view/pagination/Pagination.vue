<template>
    {{ items }}
</template>

<script setup lang="ts">
import {BaseRequest, VueLoadingStateDriver} from "../../../../src/service/requests"
import {FetchDriver} from "../../../../src/service/requests"
import {GetProductsRequest} from "./requests/GetProductsRequest";
import {Paginator, RequestDriver, VueDriver} from "../../../../src/service/pagination";

/* Booting */
BaseRequest.setRequestDriver(new FetchDriver(true))
BaseRequest.setLoadingStateDriver(new VueLoadingStateDriver)

const getProductsRequest = new GetProductsRequest

const dataDriver = new RequestDriver(getProductsRequest)
const frontendDriver = new VueDriver(1, 10)
const paginator = new Paginator(dataDriver, frontendDriver)

paginator.init()

const currentPage = paginator.currentPage()

const start = paginator.start()
const end = paginator.end()
const totalPages = paginator.totalPages()
const items = paginator.currentPageData()
const total = paginator.total()
const pages = paginator.pages()
</script>

<style scoped>

</style>
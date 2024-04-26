<template>
    <h1>Abortable request</h1>

    <p v-if="request.isLoading()">Lade...</p>

    <p>Response: {{ data }}</p>

    <button @click="controller.abort()">Abort</button>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import VueLoaderDriverFactory from "../../../../../../src/service/requests/factories/VueLoaderDriverFactory";
import {BaseRequest, FetchDriver} from "../../../../../../src/service/requests";
import {GetProductsRequest, GetProductsRequestResponse} from "./GetProductsRequest";

/* Booting */
BaseRequest.setRequestDriver(new FetchDriver(true))
BaseRequest.setLoaderStateFactory(new VueLoaderDriverFactory)

/* Component */
const controller = new AbortController();

const data = ref({})

const request = new GetProductsRequest()

request.setSignal(controller.signal)

function sendRequest() {
    request.send().then(response => {
        data.value = response.data
    })
}

sendRequest()
</script>

<style scoped>

</style>
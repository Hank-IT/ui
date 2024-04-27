<template>
    <h1>Server error request</h1>

    <p v-if="request.isLoading()">Lade...</p>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import VueLoaderDriverFactory from "../../../../../../src/service/requests/factories/VueLoaderDriverFactory";
import {BaseRequest, FetchDriver} from "../../../../../../src/service/requests";
import {ServerErrorRequest, GetProductsRequestResponse} from "./ServerErrorRequest";
import ResponseException from '../../../../../../src/service/requests/exceptions/ResponseException'

/* Booting */
BaseRequest.setRequestDriver(new FetchDriver({
    corsWithCredentials: false
}))
BaseRequest.setLoaderStateFactory(new VueLoaderDriverFactory)

/* Component */
const data = ref({})

const request = new ServerErrorRequest()

function sendRequest() {
    request.send().then(response => {
        data.value = response.data
    }).catch((response: ResponseException) => {
        console.log(response.getError().getStatusCode())
        console.log(response.getError().getHeaders())
        console.log(response.getError().getOriginalError())
        response.getError().getBodyPromise().then(body => {
            console.log(body)
        })
    })
}

sendRequest()
</script>
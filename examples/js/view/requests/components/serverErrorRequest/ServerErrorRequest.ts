import {BaseRequest, BaseResponse } from '@hank-it/ui/service/requests'

export class GetProductsRequestResponse extends BaseResponse {}

export class ServerErrorRequest extends BaseRequest implements ServerErrorRequest {
    method() {
        return 'GET'
    }

    url() {
        return 'https://dummyjson.com/http/500'
    }

    public getCorsWithCredentials(): boolean {
        return false
    }

    protected getResponse() {
        return new GetProductsRequestResponse
    }
}
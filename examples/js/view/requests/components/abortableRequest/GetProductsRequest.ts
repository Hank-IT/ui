import {BaseRequest, BaseResponse } from '@hank-it/ui/service/requests'
import DriverConfigContract from '../../../../../../src/service/requests/contracts/DriverConfigContract'

export class GetProductsRequestResponse extends BaseResponse {}

export class GetProductsRequest extends BaseRequest implements GetProductsRequest {
    method() {
        return 'GET'
    }

    url() {
        return 'https://dummyjson.com/products/?delay=5000'
    }

    protected getConfig(): DriverConfigContract {
        return {
            corsWithCredentials: true,
        }
    }

    protected getResponse() {
        return new GetProductsRequestResponse
    }
}
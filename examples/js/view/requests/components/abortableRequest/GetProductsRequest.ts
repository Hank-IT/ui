import {BaseRequest, BaseResponse } from '@hank-it/ui/service/requests'
import {GetProductsRequest} from "../abortableRequest/GetProductsRequest";

export class GetProductsRequestResponse extends BaseResponse {}

export class GetProductsRequest extends BaseRequest implements GetProductsRequest {
    method() {
        return 'GET'
    }

    url() {
        return 'https://dummyjson.com/products/?delay=5000'
    }

    public getCorsWithCredentials(): Boolean {
        return false
    }

    protected getResponse() {
        return new GetProductsRequestResponse
    }

    setSignal(signal): void {
        this.signal = signal
    }
}
import {BaseRequest, type Paginatable, JsonResponse, type ResponseContract } from '@hank-it/ui/service/requests'
import BaseResponse from "../../../../../src/service/requests/BaseResponse";

export interface ProductResource {
    id: number
    title: string
    description: string
}

export interface ProductPaginationResource {
    products: ProductResource[]
    total: number
    limit: number
    skip: number
}

export class GetProductsRequestResponse extends BaseResponse implements PaginationResponseContract {
    public getData() {
        return this.data
    }

    public getTotal(): number {
        return this.body.total
    }

    public dataHandler(data) {
        return data.products
    }
}

export class GetProductsRequest extends BaseRequest implements Paginatable {
    method() {
        return 'GET'
    }

    url() {
        return 'https://dummyjson.com/products'
    }

    public setPaginationParams(page: number, size: number): BaseRequest {
        return this.withParams({
            skip: (page - 1) * size,
            limit: size,
        })
    }

    public getCorsWithCredentials(): boolean {
        return false
    }

    protected getResponse() {
        return new GetProductsRequestResponse
    }
}
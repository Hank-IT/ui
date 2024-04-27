import type ResponseContract from '../contracts/ResponseContract'

export default class BaseResponse implements ResponseContract {
    protected bodyPromise: Promise
    protected originalResponse: object = {}
    protected statusCode: number
    protected data
    protected body

    public setStatusCode(value: number): void {
        this.statusCode = value
    }

    public setOriginalResponse(value: object): void {
        this.originalResponse = value
    }

    public setBodyPromise(promise) {
        this.bodyPromise = this.internalBodyHandler(promise)
    }

    public getBodyPromise(): object {
        return this.bodyPromise
    }

    public getOriginalResponse(): object {
        return this.originalResponse
    }

    public getStatusCode(): number {
        return this.statusCode
    }

    /**
     * Data is parsed subset of the response payload.
     */
    public getData() {
        return this.data
    }

    /**
     * Body is the full response payload.
     */
    public getBody() {
        return this.body
    }

    protected internalBodyHandler(promise) {
        return promise.then(data => {
            this.body = data

            this.data = this.dataHandler(data)

            return this
        })
    }

    public dataHandler(data) {
        return data
    }

    public static getHeaders(): object {
        return {
            'Accept': 'application/json',
        }
    }
}
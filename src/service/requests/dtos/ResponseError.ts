export default class ResponseError {
    public constructor(
        protected statusCode: number,
        protected headers: object,
        protected bodyPromise: Promise,
        protected originalError: object
    ) {}

    public getStatusCode(): number {
        return this.statusCode
    }

    public getHeaders(): object {
        return this.headers
    }

    public getBodyPromise(): Promise {
        return this.bodyPromise
    }

    public getOriginalError(): object {
        return this.originalError
    }
}
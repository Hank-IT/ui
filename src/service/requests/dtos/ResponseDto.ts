export default class ResponseDto {
    public constructor(
        protected data: any,
        protected statusCode: number,
        protected responseHeaders: object,
        protected response
    ) {}

    public getBodyPromise(): any {
        return this.data
    }

    public getStatusCode(): number {
        return this.statusCode
    }

    public getResponse(): object {
        return this.response
    }

    public getResponseHeaders(): object {
        return this.responseHeaders
    }
}

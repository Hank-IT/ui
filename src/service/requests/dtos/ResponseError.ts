export class ResponseError {
    protected statusCode: number

    constructor(
        statusCode,
        headers,
        bodyPromise,
        rawError
    ) {
        this.statusCode = statusCode
    }

    public getStatusCode(): number {
        return this.statusCode
    }
}
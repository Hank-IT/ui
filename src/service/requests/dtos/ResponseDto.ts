export default class ResponseDto {
    protected data: any
    protected statusCode: number
    protected response: object

    public constructor(data: any, statusCode: number, response) {
        this.data = data
        this.statusCode = statusCode
        this.response = response
    }

    public getBodyPromise(): any {
        return this.data
    }

    public getStatusCode(): number {
        return this.statusCode
    }

    public getResponse(): object {
        return this.response
    }
}

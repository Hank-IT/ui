import ResponseError from '../dtos/ResponseError'

export default class ResponseException extends Error {
    constructor(protected error: ResponseError) {
        super()
    }

    public getError(): ResponseError {
        return this.error
    }
}

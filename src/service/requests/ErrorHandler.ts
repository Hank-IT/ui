import NoResponseReceivedError from './dtos/NoResponseReceivedError'
import RequestError from './dtos/RequestError'
import ResponseError from './dtos/ResponseError'
import PageExpiredException from './exceptions/PageExpiredException'
import NotFoundException from './exceptions/NotFoundException'
import UnauthorizedException from './exceptions/UnauthorizedException'
import ValidationException from './exceptions/ValidationException'
import ResponseException from './exceptions/ResponseException'
import {NoResponseReceivedException} from './exceptions'

export default class ErrorHandler {
    protected error: NoResponseReceivedError|RequestError|ResponseError

    constructor(error: NoResponseReceivedError|RequestError|ResponseError) {
        this.error = error

        if (error instanceof NoResponseReceivedError) {
            throw new NoResponseReceivedException(error)
        } else if (error instanceof ResponseError) {
            this.handleResponseError()
        } else {
            console.error('HankIT-UI: Unknown error received.', error)
        }
    }

    protected handleResponseError() {
        if (this.error.getStatusCode() === 401) {
            throw new UnauthorizedException(this.error)
        }

        if (this.error.getStatusCode() === 404) {
            throw new NotFoundException(this.error)
        }

        if (this.error.getStatusCode() === 419) {
            throw new PageExpiredException(this.error)
        }

        if (this.error.getStatusCode() === 422) {
            throw new ValidationException(this.error)
        }

        throw new ResponseException(this.error)
    }
}
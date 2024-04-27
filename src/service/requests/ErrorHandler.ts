import NoResponseReceivedError from './dtos/NoResponseReceivedError'
import RequestError from './dtos/RequestError'
import ResponseError from './dtos/ResponseError'
import PageExpiredException from './exceptions/PageExpiredException'
import NotFoundException from './exceptions/NotFoundException'
import UnauthorizedException from './exceptions/UnauthorizedException'
import ValidationException from './exceptions/ValidationException'
import ResponseException from './exceptions/ResponseException'
import {NoResponseReceivedException, ServerErrorException} from './exceptions'

export default class ErrorHandler {
    protected error: NoResponseReceivedError|RequestError|ResponseError

    protected static handler = undefined

    public constructor(error: NoResponseReceivedError|RequestError|ResponseError) {
        this.error = error

        // Check if there is a global error handler set
        if (ErrorHandler.handler) {
            // If handler returns false, we don't process the error further
            if (ErrorHandler.handler(error) === false) {
                return
            }
        }

        if (error instanceof NoResponseReceivedError) {
            throw new NoResponseReceivedException(error)
        } else if (error instanceof ResponseError) {
            this.handleResponseError()
        } else {
            console.error('HankIT-UI: Unknown error received.', error)
        }
    }

    public static registerHandler(callback) {
        ErrorHandler.handler = callback
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

        if (this.error.getStatusCode() === 500) {
            throw new ServerErrorException(this.error)
        }

        throw new ResponseException(this.error)
    }
}
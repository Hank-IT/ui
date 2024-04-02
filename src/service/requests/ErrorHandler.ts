import {NoResponseReceivedError} from "./dtos/NoResponseReceivedError";
import {RequestError} from "./dtos/RequestError";
import {ResponseError} from "./dtos/ResponseError";
import {PageExpiredException, ValidationException} from "./exceptions";
import {NotFoundException} from "./exceptions";
import {UnauthorizedException} from "./exceptions";

export class ErrorHandler {
    protected error: NoResponseReceivedError|RequestError|ResponseError

    constructor(error: NoResponseReceivedError|RequestError|ResponseError) {
        this.error = error

        if (error instanceof NoResponseReceivedError) {
            // ToDo
        } else if(error instanceof RequestError) {
            // ToDo
        } else if (error instanceof ResponseError) {
            this.handleResponseError()
        } else {
            console.error('Unknown error received.')
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
    }
}
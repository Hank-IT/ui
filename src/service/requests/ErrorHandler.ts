import { PageExpiredException } from './exceptions/PageExpiredException'
import { NotFoundException } from './exceptions/NotFoundException'
import { UnauthorizedException } from './exceptions/UnauthorizedException'
import { ValidationException } from './exceptions/ValidationException'
import { ResponseException } from './exceptions/ResponseException'
import { NoResponseReceivedException } from './exceptions/NoResponseReceivedException'
import { ServerErrorException } from './exceptions/ServerErrorException'
import { type ResponseHandlerContract } from './drivers/contracts/ResponseHandlerContract'

export type ErrorHandlerCallback = ((exception: ResponseException) => boolean | void) | undefined;

export class ErrorHandler {
  protected static handler: ErrorHandlerCallback = undefined

  public constructor(protected error: ResponseException) {
    // Check if there is a global error handler set
    if (ErrorHandler.handler !== undefined) {
      // If handler returns false, we don't process the error further
      if (ErrorHandler.handler(error) === false) {
        return
      }
    }

    const response = error.getResponse()

    if (response.getStatusCode()) {
      this.handleResponseError(response)
    }

    throw new NoResponseReceivedException(error.getResponse())
  }

  public static registerHandler(callback: ErrorHandlerCallback) {
    ErrorHandler.handler = callback
  }

  protected handleResponseError(response: ResponseHandlerContract) {
    if (response.getStatusCode() === 401) {
      throw new UnauthorizedException(response)
    }

    if (response.getStatusCode() === 404) {
      throw new NotFoundException(response)
    }

    if (response.getStatusCode() === 419) {
      throw new PageExpiredException(response)
    }

    if (response.getStatusCode() === 422) {
      throw new ValidationException(response)
    }

    if (response.getStatusCode() === 500) {
      throw new ServerErrorException(response)
    }

    throw new ResponseException(response)
  }
}
import { type ResponseHandlerContract } from '../drivers/contracts/ResponseHandlerContract'

export class ResponseException {
  constructor(protected response: ResponseHandlerContract) {}

  public getResponse(): ResponseHandlerContract {
    return this.response
  }
}

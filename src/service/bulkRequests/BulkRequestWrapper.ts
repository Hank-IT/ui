import { BaseRequestContract } from '../requests'

export class BulkRequestWrapper<
  RequestLoaderLoadingType,
  RequestBodyInterface,
  ResponseClass,
  RequestParamsInterface extends object,
> {
  protected response: any = null
  protected error: any = null
  protected sent: boolean = false

  public constructor(protected request: BaseRequestContract<RequestLoaderLoadingType, RequestBodyInterface, ResponseClass, RequestParamsInterface>) {}

  public async send(signal?: AbortSignal) {
    try {
      if (signal !== undefined) {
        this.request.setAbortSignal(signal)
      }

      this.response = await this.request.send()
    } catch (err) {
      console.error(err)

      this.error = err
    }

    this.sent = true
  }

  public isLoading(): RequestLoaderLoadingType {
    return this.request.isLoading()
  }

  public getResponse() {
    return this.response
  }

  public getError() {
    return this.error
  }

  public getRequest(): BaseRequestContract<RequestLoaderLoadingType, RequestBodyInterface, ResponseClass, RequestParamsInterface> {
    return this.request
  }

  public hasError(): boolean {
    return Boolean(this.getError())
  }

  public wasSent(): boolean {
    return this.sent
  }
}
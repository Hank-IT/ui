import { BaseRequest } from '../requests'

// @ts-expect-error
export class BulkRequestWrapper<T extends BaseRequest> {
  protected response: any = null
  protected error: any = null
  protected sent: boolean = false

  public constructor(protected request: T) {}

  public async send(signal?: AbortSignal) {
    try {
      this.response = await this.request.setAbortSignal(signal).send()
    } catch (err) {
      console.error(err)

      this.error = err
    }

    this.sent = true
  }

  public isLoading(): boolean {
    return this.request.isLoading()
  }

  public getResponse() {
    return this.response
  }

  public getError() {
    return this.error
  }

  public getRequest(): T {
    return this.request
  }

  public hasError(): boolean {
    return Boolean(this.getError())
  }

  public wasSent(): boolean {
    return this.sent
  }
}
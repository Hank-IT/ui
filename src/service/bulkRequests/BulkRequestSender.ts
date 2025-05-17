import { BulkRequestWrapper } from './BulkRequestWrapper'
import { BulkRequestEventEnum } from './BulkRequestEvent.enum'
import { BaseRequest } from '../requests'

export enum BulkRequestExecutionMode {
  PARALLEL = 'parallel',
  SEQUENTIAL = 'sequential'
}

export class BulkRequestSender {
  // @ts-expect-error
  protected events: Map<BulkRequestEventEnum, ((req: BulkRequestWrapper<BaseRequest>) => void)[]> = new Map()
  protected abortController: AbortController | undefined = undefined

  public constructor(
    // @ts-expect-error
    protected requests: BulkRequestWrapper<BaseRequest>[] = [],
    protected executionMode: BulkRequestExecutionMode = BulkRequestExecutionMode.PARALLEL,
    protected retryCount: number = 0
  ) {}

  // @ts-expect-error
  public setRequests(requests: BulkRequestWrapper<BaseRequest>[] = []) {
    this.requests = requests

    return this
  }

  public setExecutionMode(mode: BulkRequestExecutionMode): this {
    this.executionMode = mode

    return this
  }

  public setRetryCount(count: number): this {
    this.retryCount = count

    return this
  }

  public get isLoading(): boolean {
    return this.requests.some((req) => req.isLoading())
  }

  // @ts-expect-error
  public on(event: BulkRequestEventEnum, callback: (req: BulkRequestWrapper<BaseRequest>) => void): this {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }

    this.events.get(event)!.push(callback)

    return this
  }

  public off(event: BulkRequestEventEnum): this {
    this.events.delete(event)

    return this
  }

  // @ts-expect-error
  protected emit(event: BulkRequestEventEnum, req: BulkRequestWrapper<BaseRequest>): void {
    const callbacks = this.events.get(event) || []

    callbacks.forEach((callback) => callback(req))
  }

  public get signal(): AbortSignal | undefined {
    return this.abortController?.signal
  }

  public abort(): void {
    this.abortController?.abort()
  }

  public async send() {
    this.abortController = new AbortController()

    try {
      if (this.executionMode === BulkRequestExecutionMode.PARALLEL) {
        await this.sendParallel()
      } else {
        await this.sendSequential()
      }
    } catch (error) {
      // If an abort occurs, the underlying fetch (or request mechanism) should throw an AbortError.
      console.error('Bulk operation aborted or encountered an error:', error)
    }

    return {
      getSuccessCount: () => this.requests.filter((r) => !r.getError()).length,
      getErrorCount: () => this.requests.filter((r) => r.getError()).length,
      getSuccessfulResponses: () => this.requests.filter((r) => !r.getError()).map((r) => r.getResponse()),
      getFailedResponses: () => this.requests.filter((r) => r.getError()).map((r) => r.getError())
    }
  }

  protected async sendParallel() {
    // First attempt for all requests
    await Promise.all(
      this.requests.map((req) =>
        req.send(this.abortController?.signal).then(() => {
          if (!req.hasError()) {
            this.emit(BulkRequestEventEnum.REQUEST_SUCCESSFUL, req)
          }
        })
      )
    )

    // Retry logic for failed requests
    let retriesLeft = this.retryCount
    while (retriesLeft > 0) {
      const failedRequests = this.requests.filter((req) => req.hasError())

      if (failedRequests.length === 0) {
        break // No failed requests to retry
      }

      console.log(`Retrying ${failedRequests.length} failed requests. Attempts left: ${retriesLeft}`)

      await Promise.all(
        failedRequests.map((req) =>
          req.send(this.abortController?.signal).then(() => {
            if (!req.hasError()) {
              // Success after retry
              this.emit(BulkRequestEventEnum.REQUEST_SUCCESSFUL, req)
            }
          })
        )
      )

      retriesLeft--
    }

    // Emit failed events for any requests that still have errors after all retries
    this.requests
      .filter((req) => req.hasError())
      .forEach((req) => {
        this.emit(BulkRequestEventEnum.REQUEST_FAILED, req)
      })
  }

  protected async sendSequential() {
    // First attempt for all requests
    for (const req of this.requests) {
      await req.send(this.abortController?.signal)

      if (!req.hasError()) {
        this.emit(BulkRequestEventEnum.REQUEST_SUCCESSFUL, req)
      }
    }

    // Retry logic for failed requests
    let retriesLeft = this.retryCount
    while (retriesLeft > 0) {
      const failedRequests = this.requests.filter((req) => req.hasError())

      if (failedRequests.length === 0) {
        break // No failed requests to retry
      }

      console.log(`Retrying ${failedRequests.length} failed requests sequentially. Attempts left: ${retriesLeft}`)

      for (const req of failedRequests) {
        await req.send(this.abortController?.signal)

        if (!req.hasError()) {
          // Success after retry
          this.emit(BulkRequestEventEnum.REQUEST_SUCCESSFUL, req)
        }
      }

      retriesLeft--
    }

    // Emit failed events for any requests that still have errors after all retries
    this.requests
      .filter((req) => req.hasError())
      .forEach((req) => {
        this.emit(BulkRequestEventEnum.REQUEST_FAILED, req)
      })
  }
}

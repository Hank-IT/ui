import { BulkRequestWrapper } from './BulkRequestWrapper'
import { BulkRequestEventEnum } from './BulkRequestEvent.enum'
import { BaseRequest } from '../requests'

export class BulkRequestSender {
  // @ts-expect-error
  protected events: Map<BulkRequestEventEnum, ((req: BulkRequestWrapper<BaseRequest>) => void)[]> = new Map();
  protected abortController: AbortController | undefined = undefined

  // @ts-expect-error
  public constructor(protected requests: BulkRequestWrapper<BaseRequest>[] = []) {}

  // @ts-expect-error
  public setRequests(requests: BulkRequestWrapper<BaseRequest>[] = []) {
    this.requests = requests;

    return this
  }

  public get isLoading(): boolean {
    return this.requests.some(req => req.isLoading());
  }

  // @ts-expect-error
  public on(event: BulkRequestEventEnum, callback: (req: BulkRequestWrapper<BaseRequest>) => void): this {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    this.events.get(event)!.push(callback);

    return this;
  }

  // @ts-expect-error
  protected emit(event: BulkRequestEventEnum, req: BulkRequestWrapper<BaseRequest>): void {
    const callbacks = this.events.get(event) || [];

    callbacks.forEach(callback => callback(req));
  }

  public get signal(): AbortSignal | undefined {
    return this.abortController?.signal;
  }

  public abort(): void {
    this.abortController?.abort();
  }

  public async send() {
    this.abortController = new AbortController()

    try {
      await Promise.all(
        this.requests.map(req =>
          req.send(this.abortController?.signal).then(() => {
            if (req.hasError()) {
              this.emit(BulkRequestEventEnum.REQUEST_FAILED, req);
            } else {
              this.emit(BulkRequestEventEnum.REQUEST_SUCCESSFUL, req);
            }
          })
        )
      );
    } catch (error) {
      // If an abort occurs, the underlying fetch (or request mechanism) should throw an AbortError.
      console.error("Bulk operation aborted or encountered an error:", error);
    }

    return {
      getSuccessCount: () => this.requests.filter(r => !r.getError()).length,
      getErrorCount: () => this.requests.filter(r => r.getError()).length,
      getSuccessfulResponses: () => this.requests.filter(r => !r.getError()).map(r => r.getResponse()),
      getFailedResponses: () => this.requests.filter(r => r.getError()).map(r => r.getError())
    }
  }
}
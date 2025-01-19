import { RequestMethodEnum } from '../RequestMethod.enum'
import { RequestEvents } from '../RequestEvents.enum'
import { type BodyFactoryContract } from './BodyFactoryContract'
import { type HeadersContract } from './HeadersContract'

export type EventHandlerCallback = ((args: Array<unknown>) => void);

export interface BaseRequestContract<
  RequestBodyInterface,
  ResponseClass,
  RequestParamsInterface extends object,
> {
  method(): RequestMethodEnum

  url(): URL | string

  setParams(params?: RequestParamsInterface): this

  withParams(params?: RequestParamsInterface): this

  getParams(): RequestParamsInterface | undefined

  setBody(requestBody: RequestBodyInterface | undefined): this

  requestHeaders(): HeadersContract

  buildUrl(): URL

  on(event: RequestEvents, handler: EventHandlerCallback): this

  send(): Promise<ResponseClass>

  isLoading(): boolean

  getRequestBodyFactory(): BodyFactoryContract<RequestBodyInterface> | undefined

  getResponse(): ResponseClass
}
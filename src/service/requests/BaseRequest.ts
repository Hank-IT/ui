import qs from 'qs'
import { ErrorHandler } from './ErrorHandler'
import { RequestEvents } from './RequestEvents.enum'
import { RequestMethodEnum } from './RequestMethod.enum'
import { BaseResponse } from './responses/BaseResponse'
import { ResponseException } from './exceptions/ResponseException'
import { type DriverConfigContract } from './contracts/DriverConfigContract'
import { type BodyFactoryContract } from './contracts/BodyFactoryContract'
import { type LoadingStateContract } from './contracts/LoadingStateContract'
import { type RequestDriverContract } from './contracts/RequestDriverContract'
import { type ViewLoaderFactoryContract } from './contracts/ViewLoaderFactoryContract'
import { type BaseRequestContract, type EventHandlerCallback } from './contracts/BaseRequestContract'
import { type HeadersContract } from './contracts/HeadersContract'
import { type ResponseHandlerContract } from './drivers/contracts/ResponseHandlerContract'
import { type ResponseContract } from './contracts/ResponseContract'
import { mergeDeep } from '../../helpers'

export abstract class BaseRequest<
  ResponseBodyInterface = undefined,
  ResponseClass extends ResponseContract<ResponseBodyInterface> = BaseResponse<ResponseBodyInterface>,
  RequestBodyInterface = undefined,
  RequestParamsInterface extends object = object,
> implements BaseRequestContract<
  RequestBodyInterface,
  ResponseClass,
  RequestParamsInterface
> {
  protected params: RequestParamsInterface | undefined = undefined
  protected requestBody: RequestBodyInterface | undefined = undefined
  protected loadingStateDriver: LoadingStateContract | undefined = undefined
  protected events: { [key in RequestEvents]?: EventHandlerCallback[] } = {};

  protected static defaultBaseUrl: string

  protected static requestDriver: RequestDriverContract
  protected static loaderStateFactory: ViewLoaderFactoryContract

  public constructor() {
    if (BaseRequest.loaderStateFactory !== undefined) {
      this.loadingStateDriver = BaseRequest.loaderStateFactory.make()
    }
  }

  public static setRequestDriver(driver: RequestDriverContract) {
    this.requestDriver = driver
  }

  public static setLoaderStateFactory(factory: ViewLoaderFactoryContract): void {
    this.loaderStateFactory = factory
  }

  public static setDefaultBaseUrl(url: string) {
    this.defaultBaseUrl = url
  }

  public abstract method(): RequestMethodEnum

  public abstract url(): URL | string

  public setParams(
    params?: RequestParamsInterface
  ): this {
    this.params = params

    return this
  }

  public withParams(
    params: RequestParamsInterface
  ): this {
    this.params = this.params === undefined
      ? params
      : mergeDeep(this.params, params) as RequestParamsInterface

    return this
  }

  public getParams(): RequestParamsInterface | undefined {
    return this.params
  }

  public setBody(requestBody: RequestBodyInterface): this {
    this.requestBody = requestBody

    return this
  }

  public requestHeaders(): HeadersContract {
    return {}
  }

  public buildUrl(): URL {
    const url = this.params !== undefined && Object.keys(this.params).length === 0
      ? this.url()
      : this.url() + '?' + qs.stringify(this.params)

    return new URL(url, this.baseUrl() ?? BaseRequest.defaultBaseUrl)
  }

  public on(event: RequestEvents, handler: EventHandlerCallback): this {
    if (!this.events[event]) {
      this.events[event] = []
    }

    this.events[event].push(handler)

    return this
  }

  protected dispatch(event: RequestEvents, ...args: Array<unknown>) {
    if (!this.events[event]) {
      return
    }

    // @ts-expect-error Spread operator causes problems
    this.events[event].forEach((handler: EventHandlerCallback) => handler(...args))
  }

  public async send(): Promise<ResponseClass> {
    this.dispatch(RequestEvents.LOADING, true)

    this.loadingStateDriver?.setLoading(true)

    const responseSkeleton = this.getResponse()

    const requestBody = this.requestBody === undefined
      ? undefined
      : this.getRequestBodyFactory()?.make(this.requestBody)

    return BaseRequest.requestDriver.send(
      this.buildUrl(),
      this.method(),
      {
        'Accept': responseSkeleton.getAcceptHeader(),
        ...this.requestHeaders()
      },
      requestBody,
      this.getConfig()
    ).then(async (responseHandler: ResponseHandlerContract) => {
      await responseSkeleton.setResponse(responseHandler)

      return responseSkeleton
    }).catch(error => {
      if (error instanceof ResponseException) {
        new ErrorHandler(error)

        Promise.resolve()
      }

      console.error('HankIT-UI: Unknown error received.', error)

      throw error
    }).finally(() => {
      this.dispatch(RequestEvents.LOADING, false)
      this.loadingStateDriver?.setLoading(false)
    })
  }

  public isLoading(): boolean {
    if (!this.loadingStateDriver) {
      return false
    }

    return this.loadingStateDriver?.isLoading()
  }

  public abstract getResponse(): ResponseClass

  public getRequestBodyFactory(): BodyFactoryContract<RequestBodyInterface | undefined> | undefined {
    return undefined
  }

  protected baseUrl(): undefined {
    return undefined
  }

  protected getConfig(): DriverConfigContract | undefined {
    return undefined
  }
}
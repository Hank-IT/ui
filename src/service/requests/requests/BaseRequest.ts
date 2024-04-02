import qs from 'qs'
import type LoadingStateContract from "../contracts/LoadingStateContract"
import type RequestDriverContract from "../contracts/RequestDriverContract"
import JsonResponse from "../dtos/JsonResponse"
import type ContentContract from "../contracts/ContentContract"
import type ResponseContract from "../contracts/ResponseContract"
import {ErrorHandler} from "../ErrorHandler";

export abstract class BaseRequest {
  protected params = {}
  protected content: ContentContract

  protected static requestDriver: RequestDriverContract
  protected static loadingStateDriver: LoadingStateContract

  public static setRequestDriver(driver: RequestDriverContract) {
    this.requestDriver = driver
  }

  public static setLoadingStateDriver(driver: LoadingStateContract) {
    this.loadingStateDriver = driver
  }

  abstract method(): string

  abstract url(): string

  accepts(): ResponseContract {
    return JsonResponse
  }

  withParams(params) {
    this.params = {
      ...this.params,
      ...params,
    }

    return this
  }

  setData(content: ContentContract) {
    this.content = content

    return this
  }

  public headers() {
    return {}
  }

  protected buildUrl(): string {
    // ToDo: Remove window.SERVER

    if (Object.keys(this.params).length === 0) {
      return window.SERVER + this.url()
    }

    return window.SERVER + this.url() + '?' + qs.stringify(this.params)
  }

  async send() {
    try {
      //BaseRequest.loadingStateDriver.setLoading(true)

      return await BaseRequest.requestDriver.send(
        this.buildUrl(),
        this.method(),
        this.headers(),
        this.content,
        this.accepts()
      )
    } catch(error) {
      new ErrorHandler(error)
    } finally {
     // BaseRequest.loadingStateDriver.setLoading(false)
    }
  }

  isLoading() {
    if (this.loadingStateDriver) {
      return this.loadingStateDriver.isLoading()
    }

   return false
  }
}
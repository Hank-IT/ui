import qs from 'qs'
import {ValidationException} from "../exceptions/ValidationException"
import type LoadingStateContract from "../contracts/LoadingStateContract"
import type RequestDriverContract from "../contracts/RequestDriverContract"
import JsonResponse from "../dtos/JsonResponse"
import type ContentContract from "../contracts/ContentContract"
import type ResponseContract from "../contracts/ResponseContract"

export abstract class BaseRequest {
  protected params = {}
  protected content: ContentContract

  protected static requestDriver: RequestDriverContract
  protected static loadingStateDriver: LoadingStateContract

  static setRequestDriver(driver: RequestDriverContract) {
    this.requestDriver = driver
  }

  static setLoadingStateDriver(driver: LoadingStateContract) {
    this.loadingStateDriver = driver
  }

  abstract method(): string

  abstract url(): string

  abstract accepts(): ResponseContract

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
      BaseRequest.loadingStateDriver.setLoading(true)

      return await BaseRequest.requestDriver.send(
        this.buildUrl(),
        this.method(),
        this.headers(),
        this.content,
        this.accepts()
      )
    } catch(e) {
      console.error(e)

      if (e.response.status === 422) {
        throw new ValidationException(e.response.data)
      }

      throw(e)
    } finally {
      BaseRequest.loadingStateDriver.setLoading(false)
    }
  }

  isLoading() {
    if (this.loadingStateDriver) {
      return this.loadingStateDriver.isLoading()
    }

   return false
  }
}
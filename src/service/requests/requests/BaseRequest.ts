import qs from 'qs'
import { ValidationException } from '@/service/requests/exceptions/ValidationException'
import type LoadingStateContract from '@/service/requests/contracts/LoadingStateContract'
import type RequestDriverContract from '@/service/requests/contracts/RequestDriverContract'
import type JsonResponse from '@/service/requests/dtos/JsonResponse'
import ContentContract from '@/service/requests/contracts/ContentContract'
import type ResponseContract from '@/service/requests/contracts/ResponseContract'

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
    if (Object.keys(this.params).length === 0) {
      return window.SERVER + this.url()
    }

    return window.SERVER + this.url() + '?' + qs.stringify(this.params)
  }

  async send() {
    try {
      BaseRequest.loadingStateDriver.setLoading(true)

      const response = await BaseRequest.requestDriver.send(
        this.buildUrl(),
        this.method(),
        this.headers(),
        this.content,
        this.accepts()
      )

      return this.successResponseHandler(response)
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

  successResponseHandler(response: JsonResponse) {
    return response
  }
}
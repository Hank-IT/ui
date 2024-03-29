import type ResponseContract from '@/service/requests/contracts/ResponseContract'

export default class JsonResponse implements ResponseContract {
  protected data: object = {}
  protected response: object = {}
  protected statusCode: number

  public constructor(data, response, statusCode) {
    this.data = data
    this.response = response
    this.statusCode = statusCode
  }

  public getDataPromise(): object {
    return this.data
  }

  public getRaw(): object {
    return this.response
  }

  public getStatusCode(): number {
    return this.statusCode
  }

  public static getHeaders(): object {
    return {
      'Accept': 'application/json',
    }
  }
}
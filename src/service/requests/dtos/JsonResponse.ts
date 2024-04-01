import type ResponseContract from "../contracts/ResponseContract"

export default class JsonResponse implements ResponseContract {
  protected bodyPromise: Promise
  protected response: object = {}
  protected statusCode: number

  public constructor(bodyPromise, response, statusCode) {
    this.bodyPromise = this.internalBodyHandler(bodyPromise)
    this.response = response
    this.statusCode = statusCode
  }

  public getBodyPromise(): object {
    return this.bodyPromise
  }

  public getRaw(): object {
    return this.response
  }

  public getStatusCode(): number {
    return this.statusCode
  }

  protected internalBodyHandler(promise) {
    return promise.then(data => {
      return new Promise(resolve => {
        resolve(this.bodyHandler(data))
      })
    })
  }

  public bodyHandler(data) {
    return data
  }

  public static getHeaders(): object {
    return {
      'Accept': 'application/json',
    }
  }
}
import type ContentContract from '@/service/requests/contracts/ContentContract'

export default class JsonContent implements ContentContract {
  protected data: object = {}

  constructor(data: object) {
    this.data = data
  }

  public getHeaders(): object {
    return {
      'Content-Type': 'application/json',
    }
  }

  public getContent(): object {
    return JSON.stringify(this.data)
  }
}
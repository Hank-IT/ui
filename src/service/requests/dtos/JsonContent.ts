import ContentContract from '../contracts/ContentContract'

export default class JsonContent implements ContentContract {
  public constructor(protected data: object = {}) {}

  public getHeaders(): object {
    return {
      'Content-Type': 'application/json',
    }
  }

  public getContent(): object {
    return JSON.stringify(this.data)
  }
}
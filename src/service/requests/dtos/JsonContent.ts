import ContentContract from "../contracts/ContentContract"

export default class JsonContent implements ContentContract {
  protected data: object = {}

  public constructor(data: object) {
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
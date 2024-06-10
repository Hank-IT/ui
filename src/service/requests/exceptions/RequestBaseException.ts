export default class RequestBaseException extends Error {
  public constructor(protected error: any) {
    super()
  }

  public getError() {
    return this.error
  }
}
export default class RequestBaseException extends Error {
  public constructor(protected error: any) {}

  public getError() {
    return this.error
  }
}
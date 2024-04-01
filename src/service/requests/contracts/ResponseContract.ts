export default interface ResponseContract {
  getBodyPromise(): object

  getRaw(): object

  getStatusCode(): number

  getHeaders(): object

  isOK(): boolean
}
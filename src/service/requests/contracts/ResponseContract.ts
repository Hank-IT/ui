export default interface ResponseContract {
  getDataPromise(): object

  getRaw(): object

  getStatusCode(): number

  getHeaders(): object
}
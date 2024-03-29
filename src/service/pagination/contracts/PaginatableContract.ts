export default interface PaginatableContract {
  getPage(data: object): object

  getTotal(data: object): number
}
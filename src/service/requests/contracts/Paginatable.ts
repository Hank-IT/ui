export default interface Paginatable {
  getPage(data: object): object

  getTotal(data: object): number
}
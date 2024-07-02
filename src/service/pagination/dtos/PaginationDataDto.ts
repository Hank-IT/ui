export default class PaginationDataDto {
  public constructor(
      protected data: object[],
      protected total: number,
      protected response: object = {}
  ) {
  }

  public getData(): object[] {
    return this.data
  }

  public getTotal(): number {
    return this.total
  }

  public getResponse(): object
  {
    return this.response
  }
}
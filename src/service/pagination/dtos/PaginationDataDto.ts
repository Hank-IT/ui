export default class PaginationDataDto {
  public constructor(
      protected data: object[],
      protected total: number,
  ) {
  }

  public getData(): object[] {
    return this.data
  }

  public getTotal(): number {
    return this.total
  }
}
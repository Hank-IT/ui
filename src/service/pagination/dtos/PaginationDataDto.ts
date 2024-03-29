export class PaginationDataDto {
  public constructor(data, total) {
    this.data = data

    this.total = total
  }

  public getData() {
    return this.data
  }

  public getTotal() {
    return this.total
  }
}
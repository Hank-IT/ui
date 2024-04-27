import PaginationDataDto from '../dtos/PaginationDataDto'
import BaseDriver from './BaseDriver'

export default class ArrayDriver extends BaseDriver {
  protected data: object[]

  public constructor(data: object[]) {
    super()

    this.data = data
  }

  public get(pageNumber: number, pageSize: number): Promise<PaginationDataDto> {
    return new Promise((resolve) => {
      resolve(new PaginationDataDto(
        this.data.slice(
          this.calculatedStart(pageNumber, pageSize),
          this.calculatedEnd(pageNumber, pageSize),
        ),
        this.data.length,
      ))
    });
  }

  protected calculatedStart(currentPage: number, pageSize: number): number {
    return (currentPage - 1) * pageSize
  }

  protected calculatedEnd(currentPage: number, pageSize: number): number {
    return currentPage * pageSize
  }
}
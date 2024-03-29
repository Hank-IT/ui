import { BaseDriver } from '@/service/pagination/dataDrivers/BaseDriver'
import { PaginationDataDto } from '@/service/pagination/dtos/PaginationDataDto'

export class ArrayDriver extends BaseDriver {
  public constructor(data) {
    super()

    this.data = data
  }

  public get(currentPage, pageSize) {
    return new Promise((resolve) => {
      resolve(new PaginationDataDto(
        this.data.slice(
          this.calculatedStart(currentPage, pageSize),
          this.calculatedEnd(currentPage, pageSize),
        ),
        this.data.length,
      ))
    });
  }
}
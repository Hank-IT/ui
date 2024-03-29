import { BaseDriver } from '@/service/pagination/dataDrivers/BaseDriver'
import { PaginationDataDto } from '@/service/pagination/dtos/PaginationDataDto'
import type Paginatable from '@/service/requests/contracts/Paginatable'

export class RequestDriver extends BaseDriver {
  public constructor(request) {
    super()

    if (! this.isPaginatable(request)) {
      throw new Error('BaseRequest is not paginatable')
    }

    this.request = request
  }

  public get(pageNumber, pageSize) {
    return this.request.withParams({
      pageSize: pageSize,
      pageNumber: pageNumber
    }).send().then(result => {
      return result.getDataPromise()
    }).then(data => {
      return new PaginationDataDto(
        this.request.getPage(data),
        this.request.getTotal(data)
      )
    })
  }

  protected isPaginatable(object): object is Paginatable {
    const contract = object as Paginatable;

    if (contract.getPage === undefined) {
      return false
    }

    return contract.getTotal !== undefined;
  }
}

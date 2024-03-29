import {BaseDriver} from "./BaseDriver";
import { PaginationDataDto } from '../dtos/PaginationDataDto'
import type {PaginatableContract} from "../contracts/PaginatableContract"

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

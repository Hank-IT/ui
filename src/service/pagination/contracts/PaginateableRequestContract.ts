import { type BaseRequestContract } from '../../requests/contracts/BaseRequestContract'

export interface PaginateableRequestContract<
  ResponseClass,
  RequestBodyInterface,
  RequestParamsInterface extends object> extends BaseRequestContract<
  ResponseClass,
  RequestBodyInterface,
  RequestParamsInterface
> {
  setPaginationParams(page: number, size: number): BaseRequestContract<
    ResponseClass,
    RequestBodyInterface,
    RequestParamsInterface
  >
}
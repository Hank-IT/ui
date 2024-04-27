import BaseRequest from '../../requests/BaseRequest'

export default interface PaginatableRequest {
    setPaginationParams(page: number, size: number): BaseRequest
}
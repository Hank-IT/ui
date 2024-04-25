import {BaseRequest} from "../../requests";

export default interface PaginatableRequest {
    setPaginationParams(page: number, size: number): BaseRequest
}
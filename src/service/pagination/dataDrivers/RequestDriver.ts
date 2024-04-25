import {BaseDriver} from "./BaseDriver";
import {PaginationDataDto} from '../dtos/PaginationDataDto'
import type {PaginatableRequest} from "../contracts/PaginatableRequest"

export class RequestDriver extends BaseDriver {
    public constructor(protected request) {
        super()
    }

    public get(pageNumber, pageSize) {
        return this.request
            .setPaginationParams(pageSize, pageNumber)
            .send()
            .then(response => {
                return new PaginationDataDto(
                    response.getData(),
                    response.getTotal(),
                )
            })
    }
}

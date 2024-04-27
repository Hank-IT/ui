import BaseDriver from './BaseDriver'
import PaginationDataDto from '../dtos/PaginationDataDto'
import PaginateableRequest from '../contracts/PaginateableRequest'
import PaginationResponseContract from '../contracts/PaginationResponseContract'

export default class RequestDriver extends BaseDriver {
    public constructor(protected request: PaginateableRequest) {
        super()
    }

    public get(pageNumber: number, pageSize: number): Promise<PaginationDataDto> {
        return this.request
            .setPaginationParams(pageNumber, pageSize)
            .send()
            .then((response: PaginationResponseContract) => {
                return new PaginationDataDto(
                    response.getData(),
                    response.getTotal(),
                )
            })
    }
}

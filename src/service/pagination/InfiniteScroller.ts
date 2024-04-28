import Paginator from './Paginator'
import PaginationDataDto from './dtos/PaginationDataDto'

export default class InfiniteScroller extends Paginator {
    protected loadData(pageNumber: number, pageSize: number): void {
        return this.dataDriver.get(pageNumber, pageSize)
            .then((dto: PaginationDataDto) => {
                this.viewDriver.setData(this.viewDriver.getData().concat(dto.getData()))
                this.viewDriver.setTotal(dto.getTotal())
            })
    }
}
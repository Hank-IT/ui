import Paginator from './Paginator'
import PaginationDataDto from './dtos/PaginationDataDto'

export default class InfiniteScroller extends Paginator {
    protected passDataToViewDriver(
        dto: PaginationDataDto, options: PaginatorLoadDataOptions
    ) {
        const {
            flush = false,
            replace = false,
        } = options

        if (flush) {
            this.flush()
        }

        if (replace) {
            this.viewDriver.setData(dto.getData())
        } else {
            this.viewDriver.setData(
                this.viewDriver.getData().concat(dto.getData())
            )
        }

        this.viewDriver.setTotal(dto.getTotal())
    }
}
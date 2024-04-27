import VuePaginationDriver from '../frontendDrivers/VuePaginationDriver'
import ViewDriverFactoryContract from '../contracts/ViewDriverFactoryContract'

export default class VuePaginationDriverFactory implements ViewDriverFactoryContract {
    public make(pageNumber: number, pageSize: number): VuePaginationDriver {
        return new VuePaginationDriver(pageNumber, pageSize)
    }
}
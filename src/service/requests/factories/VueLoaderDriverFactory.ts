import { VueLoadingStateDriver } from '../loader/VueLoadingStateDriver'
import { type LoadingStateContract } from '../contracts/LoadingStateContract'

export class VueLoaderDriverFactory {
    public make(): LoadingStateContract {
        return new VueLoadingStateDriver()
    }
}

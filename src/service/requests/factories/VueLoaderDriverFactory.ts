import LoadingStateContract from '../contracts/LoadingStateContract'
import VueLoadingState from '../loader/VueLoadingStateDriver'

export default class VueLoaderDriverFactory {

    public make(): LoadingStateContract {
        return new VueLoadingState()
    }
}

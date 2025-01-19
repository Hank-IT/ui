import { type LoadingStateContract } from './LoadingStateContract'

export interface ViewLoaderFactoryContract {
    make(): LoadingStateContract
}
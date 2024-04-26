import qs from 'qs'
import type LoadingStateContract from "./contracts/LoadingStateContract"
import type RequestDriverContract from "./contracts/RequestDriverContract"
import type ContentContract from "./contracts/ContentContract"
import {ErrorHandler} from "./ErrorHandler";

export abstract class BaseRequest {
    protected params = {}
    protected content: ContentContract
    public loadingStateDriver: LoadingStateContract = undefined

    protected static defaultBaseUrl: string

    protected static requestDriver: RequestDriverContract
    protected static loaderStateFactory: ViewLoaderFactoryContract

    public constructor() {
        if (BaseRequest.loaderStateFactory !== undefined) {
            this.loadingStateDriver = BaseRequest.loaderStateFactory.make()
        }
    }

    public static setRequestDriver(driver: RequestDriverContract) {
        this.requestDriver = driver
    }

    public static setLoaderStateFactory(factory: ViewLoaderFactoryContract): void {
        this.loaderStateFactory = factory
    }

    public static setDefaultBaseUrl(url: string) {
        this.defaultBaseUrl = url
    }

    abstract method(): string

    abstract url(): string

    public setParams(params: object): BaseRequest {
        this.params = params
        return this
    }

    withParams(params) {
        this.params = {
            ...this.params,
            ...params,
        }

        return this
    }

    setBody(content: ContentContract) {
        this.content = content

        return this
    }

    public headers() {
        return {}
    }

    protected buildUrl(): string {
        const url = Object.keys(this.params).length === 0
            ? this.url()
            : this.url() + '?' + qs.stringify(this.params)

        return new URL(url, this.baseUrl() ?? this.defaultBaseUrl)
    }

    public send() {
        this.loadingStateDriver?.setLoading(true)

        return BaseRequest.requestDriver.send(
            this.buildUrl(),
            this.method(),
            this.headers(),
            this.content,
            this.getCorsWithCredentials()
        ).then((responseDto: ResponseDto) => {
            const response = this.getResponse()

            response.setBodyPromise(responseDto.getBodyPromise())
            response.setStatusCode(responseDto.getStatusCode())
            response.setOriginalResponse(responseDto.getResponse())

            return response.getBodyPromise()
        }).catch(error => new ErrorHandler(error))
          .finally(() => {
              this.loadingStateDriver?.setLoading(false)
          })
    }

    public isLoading(): boolean {
        return this.loadingStateDriver?.isLoading()
    }

    protected baseUrl(): undefined {
        return undefined
    }

    public getCorsWithCredentials(): Boolean {
        return undefined
    }
}
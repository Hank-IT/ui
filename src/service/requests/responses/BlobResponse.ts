import BaseResponse from './BaseResponse'

export default class BlobResponse extends BaseResponse {
    public constructor(
        protected mimeType: string = 'application/octet-stream',
    ) {
        super()
    }

    public getRequestHeaders(): object {
        return {
            'Accept': this.mimeType,
        }
    }

    public getBodyPromiseFromResponse(response): object {
        return response.blob()
    }
}
import BaseResponse from './BaseResponse'

export default class PlainTextResponse extends BaseResponse {
    public getRequestHeaders(): object {
        return {
            'Accept': 'text/plain',
        }
    }

    public getBodyPromiseFromResponse(response): object {
        return response.text()
    }
}
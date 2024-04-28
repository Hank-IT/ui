import BaseResponse from './BaseResponse'

export default class JsonResponse extends BaseResponse {
    public getRequestHeaders(): object {
        return {
            'Accept': 'application/json',
        }
    }

    public getBodyPromiseFromResponse(response): object {
        return response.json()
    }
}
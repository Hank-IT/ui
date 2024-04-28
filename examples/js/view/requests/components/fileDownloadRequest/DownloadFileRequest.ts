import {BaseRequest, BaseResponse } from '@hank-it/ui/service/requests'
import BlobResponse from '../../../../../../src/service/requests/responses/BlobResponse'


export default class DownloadFileRequest extends BaseRequest {
    method() {
        return 'GET'
    }

    url() {
        return 'http://localhost:5173/files/7z2404-x64.exe'
    }

    protected getResponse() {
        return new BlobResponse()
    }
}
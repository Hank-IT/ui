import type RequestDriverContract from '@/service/requests/contracts/RequestDriverContract'
import type ContentContract from '@/service/requests/contracts/ContentContract'
import type ResponseContract from '@/service/requests/contracts/ResponseContract'
import {ResponseError} from "../dtos/ResponseError";

export default class FetchDriver implements RequestDriverContract {
    protected withCredentials: strinbg

    constructor(withCredentials: string) {
        this.withCredentials = withCredentials
    }

    public async send(
        url: string,
        method: string,
        headers: object,
        content: ContentContract,
        responseDto: ResponseContract,
    ) {
        const mergedHeaders = {
            ...headers,
            ...responseDto.getHeaders(),

            // ToDo: Make this configurable
            'X-XSRF-Token': this.getCookie('XSRF-TOKEN')

            // Don't include the content header, since the browser sets it
            // automatically and it leads to "missing boundary" errors otherwise.
            //...content?.getHeaders(),
        }

        const config = {
            method: method,
            headers: mergedHeaders,
            credentials: this.withCredentials,
        }

        if (!['GET', 'HEAD'].includes(method)) {
            config.body = content?.getContent()
        }

        const response = await fetch(url, config)

        if (! response.ok) {
            throw this.buildErrorResponse(response)
        }

        return new responseDto(response.json(), response, response.status)
    }

    protected getCookie(cname) {
        const name = cname + '='
        const decodedCookie = decodeURIComponent(document.cookie)
        const ca = decodedCookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ''
    }

    public buildErrorResponse(error) {
        if (error.status) {
            return new ResponseError(
                error.status, error.headers, error.json(), error
            )
        } else {
            // ToDo
            console.log('Error', error);
        }
    }
}
import type RequestDriverContract from '../contracts/RequestDriverContract'
import type ContentContract from '../contracts/ContentContract'
import ResponseError from '../dtos/ResponseError'
import ResponseDto from '../dtos/ResponseDto'

export default class FetchDriver implements RequestDriverContract {
    public constructor(protected corsWithCredentials: boolean = false) {}

    public async send(
        url: string,
        method: string,
        headers: object,
        content: ContentContract,
        corsWithCredentials = undefined,
        abortSignal = undefined
    ) {
        const mergedHeaders = {
            ...headers,

            // ToDo: Make this configurable
            'X-XSRF-Token': this.getCookie('XSRF-TOKEN')

            // Don't include the content header, since the browser sets it
            // automatically and it leads to "missing boundary" errors otherwise.
            //...content?.getHeaders(),
        }

        const config = {
            method: method,
            headers: mergedHeaders,
            credentials: this.getCorsWithCredentials(corsWithCredentials),
        }

        if (abortSignal) {
            config.signal = abortSignal
        }

        if (!['GET', 'HEAD'].includes(method)) {
            config.body = content?.getContent()
        }

        const response = await fetch(url, config)

        if (! response.ok) {
            throw this.buildErrorResponse(response)
        }

        return new ResponseDto(response.json(), response.status, response)
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

    protected getCorsWithCredentials(corsWithCredentials) {
        // Request takes precedence
        if (corsWithCredentials === true) {
            return 'include'
        } else if(corsWithCredentials === false) {
            return 'omit'
        }

        // Fallback to default
        return this.corsWithCredentials ? 'include': 'omit'
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
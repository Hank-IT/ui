import type RequestDriverContract from '../contracts/RequestDriverContract'
import type ContentContract from '../contracts/ContentContract'
import ResponseError from '../dtos/ResponseError'
import ResponseDto from '../dtos/ResponseDto'
import DriverConfigContract from '../contracts/DriverConfigContract'
import {getCookie} from '../../../helpers'
import NoResponseReceivedError from '../dtos/NoResponseReceivedError'
import BaseResponse from '../responses/BaseResponse'

export default class FetchDriver implements RequestDriverContract {
    public constructor(protected config: DriverConfigContract = undefined) {}

    public async send(
      url: string,
      method: string,
      headers: object,
      content: ContentContract,
      responseSkeleton: BaseResponse,
      requestConfig: DriverConfigContract
    ) {
        const mergedConfig = {
            // Global config
            ...this.config,

            // Request specific overrides
            ...requestConfig,

            // Required config
            method: method,
            headers: {
                ...headers,
                // ToDo: This should probably be extracted and configurable
                'X-XSRF-Token': getCookie('XSRF-TOKEN'),

                // Set Content-Type header
                ...content?.getHeaders(),

                // Set Accept header
                ...responseSkeleton.getRequestHeaders(),
            }
        }

        const response = await fetch(url, this.buildRequestConfig(mergedConfig, content))

        if (! response.ok) {
            throw this.buildErrorResponse(response)
        }

        return new ResponseDto(
          responseSkeleton.getBodyPromiseFromResponse(response),
          response.status,
          response.headers,
          response,
        )
    }

    public buildErrorResponse(error) {
        if (error.status) {
            return new ResponseError(
              error.status, error.headers, error.json(), error
            )
        }

        return new NoResponseReceivedError(error)
    }

    protected buildRequestConfig(config, content): object {
        return {
            method: config.method,
            headers: config.headers,
            credentials: this.getCorsWithCredentials(config.corsWithCredentials),
            signal: config.abortSignal ? config.abortSignal: undefined,
            body: ['GET', 'HEAD'].includes(config.method) ? undefined: content?.getContent()
        }
    }

    protected getCorsWithCredentials(corsWithCredentials) {
        // Request takes precedence
        if (corsWithCredentials === true) {
            return 'include'
        } else if(corsWithCredentials === false) {
            return 'omit'
        }

        // Fallback to default config
        if (this.config) {
            return this.config.corsWithCredentials ? 'include': 'omit'
        }

        // Fallback to safe option if no default set
        return 'omit'
    }
}
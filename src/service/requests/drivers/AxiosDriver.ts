import axios from 'axios'
import type RequestDriverContract from '@/service/requests/contracts/RequestDriverContract'
import type ContentContract from '@/service/requests/contracts/ContentContract'
import type ResponseContract from '@/service/requests/contracts/ResponseContract'
import {NoResponseException, NotFoundException, ValidationException} from "../exceptions";
import {ResponseError} from "../dtos/ResponseError";

export default class AxiosDriver implements RequestDriverContract {
    protected withCredentials: boolean

    public constructor(withCredentials: boolean) {
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
            ...content?.getHeaders(),
            ...responseDto.getHeaders(),
        }

        const response = await axios(url, {
            method: method,
            headers: mergedHeaders,
            data: content?.getContent(),
            withCredentials: this.withCredentials,
            withXSRFToken: true,
            validateStatus: status => {
                return true
            }
        })

        console.debug("AxiosDriver: Request send")
        console.debug("AxiosDriver: Status: " + response.status)

        if (! (response.status >= 200 && response.status < 300)) {
            console.debug("AxiosDriver: Building error response")

            throw this.buildErrorResponse(response)
        }

        console.debug("AxiosDriver: Returning response")

        return new responseDto(
            new Promise(resolve => {
                resolve(response.data)
            }),
            response,
            response.status,
        )
    }

    public buildErrorResponse(error) {
        if (error.status) {
            return new ResponseError(
                error.status, error.headers, new Promise(resolve => {
                    resolve(error.data)
                }), error
            )
        } else {
            // ToDo
            console.log('Error', error);
        }
    }
}
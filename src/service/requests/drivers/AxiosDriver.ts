import axios from 'axios'
import type RequestDriverContract from '@/service/requests/contracts/RequestDriverContract'
import type ContentContract from '@/service/requests/contracts/ContentContract'
import type ResponseContract from '@/service/requests/contracts/ResponseContract'

export default class AxiosDriver implements RequestDriverContract {
  protected withCredentials: boolean

  constructor(withCredentials: boolean) {
    this.withCredentials = withCredentials
  }

  async send(
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
    })

    return new (responseDto)(
      new Promise(resolve => {
        resolve(response.data)
      }),
      response,
      response.status,
    )
  }
}
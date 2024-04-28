import ContentContract from './ContentContract'
import DriverConfigContract from './DriverConfigContract'
import BaseResponse from '../responses/BaseResponse'

export default interface RequestDriverContract {
  send(
    url: string,
    method: string,
    headers: object,
    content: ContentContract,
    responseSkeleton: BaseResponse,
    requestConfig: DriverConfigContract
  )

  buildErrorResponse(error)
}
import ContentContract from './ContentContract'
import DriverConfigContract from './DriverConfigContract'

export default interface RequestDriverContract {
  send(
    url: string,
    method: string,
    headers: object,
    content: ContentContract,
    requestConfig: DriverConfigContract
  )

  buildErrorResponse(error)
}
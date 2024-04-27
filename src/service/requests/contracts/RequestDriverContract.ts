import ContentContract from './ContentContract'

export default interface RequestDriverContract {
  send(
    url: string,
    method: string,
    headers: object,
    content: ContentContract,
  )

  buildErrorResponse(error)
}
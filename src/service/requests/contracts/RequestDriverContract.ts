import type ContentContract from '@/service/requests/contracts/ContentContract'

export default interface RequestDriverContract {
  send(
    url: string,
    method: string,
    headers: object,
    content: ContentContract,
  )
}
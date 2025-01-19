import { type HeadersContract } from './HeadersContract'

export interface DriverConfigContract {
  corsWithCredentials?: boolean
  abortSignal?: AbortSignal
  headers?: HeadersContract
}
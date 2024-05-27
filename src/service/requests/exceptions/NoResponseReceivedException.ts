import NoResponseReceivedError from '../dtos/NoResponseReceivedError'
import RequestBaseException from './RequestBaseException'

export default class NoResponseReceivedException extends RequestBaseException {
    public constructor(protected error: NoResponseReceivedError) {}
}
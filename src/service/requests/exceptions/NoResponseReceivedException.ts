import NoResponseReceivedError from '../dtos/NoResponseReceivedError'

export default class NoResponseReceivedException {
    public constructor(protected error: NoResponseReceivedError) {
    }

    public getError() {
        return this.error
    }
}
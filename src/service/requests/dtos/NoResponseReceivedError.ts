export default class NoResponseReceivedError {
    public constructor(
        protected originalError: object
    ) {}

    public getOriginalError(): object {
        return this.originalError
    }
}
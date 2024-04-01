export class NoResponseException extends Error {
    constructor(errors) {
        super()

        this.errors = errors
    }
}
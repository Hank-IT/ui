export class PageExpiredException extends Error {
    constructor(errors) {
        super()

        this.errors = errors
    }
}
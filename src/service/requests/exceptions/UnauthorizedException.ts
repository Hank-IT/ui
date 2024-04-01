export class UnauthorizedException extends Error {
  constructor(errors) {
    super()

    this.errors = errors
  }
}
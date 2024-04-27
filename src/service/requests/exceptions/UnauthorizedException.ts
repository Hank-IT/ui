export default class UnauthorizedException extends Error {
  constructor(errors) {
    super()

    this.errors = errors
  }
}
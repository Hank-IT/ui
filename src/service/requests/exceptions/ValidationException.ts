export default class ValidationException extends Error {
  constructor(errors) {
    super()

    this.errors = errors
  }
}
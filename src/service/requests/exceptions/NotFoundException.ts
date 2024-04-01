export class NotFoundException extends Error {
  constructor(errors) {
    super()

    this.errors = errors
  }
}
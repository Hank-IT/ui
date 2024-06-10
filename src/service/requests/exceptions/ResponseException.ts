import ResponseError from '../dtos/ResponseError'
import RequestBaseException from './RequestBaseException'

export default class ResponseException extends RequestBaseException {
    constructor(error: ResponseError) {
        super(error)
    }
}

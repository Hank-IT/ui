import { type BodyContract } from '../contracts/BodyContract'
import { type HeadersContract } from '../contracts/HeadersContract'
import { isObject } from '../../../helpers'

export class FormDataBody<RequestBody> implements BodyContract {
  protected data: FormData

  public constructor(data: RequestBody) {
    this.data = this.toFormData(data)
  }

  public getContent(): FormData {
    return this.data
  }

  public getHeaders(): HeadersContract {
    return {}
  }

  protected toFormData(
    data: RequestBody,
    form: FormData = new FormData,
    namespace: string | null = null
  ): FormData {
    for (const property in data) {
      if (Object.prototype.hasOwnProperty.call(data, property)) {
        const formKey = namespace
          ? namespace + '[' + property + ']'
          : property

        // if the property is an object, but not a File, use recursivity.
        if (data[property] instanceof Date) {
          form.append(formKey, data[property].toISOString())
        } else if (isObject(data[property]) && !(data[property] instanceof File)) {
          // @ts-expect-error Problem with property of object
          this.toFormData(data[property], form, formKey)
        } else if (data[property] instanceof File || typeof data[property] === 'string') {
          form.append(formKey, data[property])
        } else {
          throw new Error('Unexpected value')
        }
      }
    }

    return form
  }
}
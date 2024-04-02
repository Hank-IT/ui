import ContentContract from "../contracts/ContentContract"

export default class FormDataContent implements ContentContract {
  protected data: object = {}

  public constructor(data: object) {
    this.data = this.toFormData(data)
  }

  public getContent(): FormData {
    return this.data
  }

  public getHeaders(): object {
    return {
      "Content-Type": "multipart/form-data",
    }
  }

  protected toFormData(obj, form, namespace) {
    const fd = form || new FormData()
    let formKey

    for(const property in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, property)) {
        if (namespace) {
          formKey = namespace + '[' + property + ']'
        } else {
          formKey = property
        }

        // if the property is an object, but not a File, use recursivity.
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString())
        }
        else if (typeof obj[property] === 'object' && ! (obj[property] instanceof File)) {
          this.toFormData(obj[property], fd, formKey)
        } else { // if it's a string or a File object
          fd.append(formKey, obj[property])
        }
      }
    }

    return fd
  }
}
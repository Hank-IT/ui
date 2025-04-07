import { isEmpty as _isEmpty } from 'lodash-es'

export default function() {
  function isObject(value: unknown) {
    return typeof value === 'object' && !Array.isArray(value) && value !== null
  }

  function isEmpty(value: unknown) {
    // Check objects with lodash
    if (isObject(value)) {
      return _isEmpty(value)
    }

    // Check objects against their length property
    if (Array.isArray(value)) {
      return value.length === 0
    }

    if (value === '' || value === null) {
      return true
    }

    return value === undefined
  }

  function isNotEmpty(value: unknown) {
    return !isEmpty(value)
  }

  return {
    isEmpty,
    isNotEmpty
  }
}

import { computed } from 'vue'
import { type ModelValueProps } from '../contracts/ModelValueProps'
import { type ModelValueOptions as ParentModelValueOptions } from '../contracts/ModelValueOptions'

export interface ModelValueOptions extends ParentModelValueOptions {
  callback?: (value: unknown) => void
}

export type EmitFunction = (event: string, value: unknown) => void

export default function(props: ModelValueProps, emit: EmitFunction, options: ModelValueOptions = {}) {
  const {
    name = 'modelValue',
    callback = () => {}
  } = options

  return computed({
    get() {
      return props[name]
    },
    set(value) {
      emit(`update:${name}`, value)

      callback(value)
    }
  })
}
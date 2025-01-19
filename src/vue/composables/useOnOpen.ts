import { nextTick, watch } from 'vue'
import { type ModelValueProps } from '../contracts/ModelValueProps'
import { type ModelValueOptions } from '../contracts/ModelValueOptions'

export type useOnOpenCallback = (() => void) | undefined;

export default function(props: ModelValueProps, options: ModelValueOptions = {}) {
  const {
    name = 'modelValue'
  } = options

  function onOpen(callback: useOnOpenCallback) {
    watch(() => props[name], () => {
      nextTick(() => {
        if (props[name] && callback) {
          callback()
        }
      })
    })
  }

  return {
    onOpen
  }
}
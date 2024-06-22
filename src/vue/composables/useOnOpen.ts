import { nextTick, watch } from 'vue'

export default function(props, options = {}) {
  const {
    name = 'modelValue',
  } = options

  function onOpen(callback) {
    watch(() => props[name], () => {
      nextTick(() => {
        if (props[name]) {
          callback()
        }
      })
    })
  }

  return {
    onOpen
  }
}
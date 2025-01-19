import { ref, computed, type Ref, type ComputedRef } from 'vue'

export default function(
  callback: (value: boolean) => void = () => {
  },
  delay: number = 500
): {
  isOpenKey: Ref<number>,
  isOpen: ComputedRef<boolean>,
} {
  const internalIsOpen: Ref<boolean> = ref(false)

  const isOpenKey: Ref<number> = ref(0)

  const isOpen = computed({
    get() {
      return internalIsOpen.value
    },
    set(value: boolean) {
      // False means we close, so we increment the key
      // Add delay to preserve the closing animation.
      setTimeout(() => {
        if (!value) {
          isOpenKey.value++
        }
      }, delay)

      internalIsOpen.value = value

      callback(value)
    }
  })

  return {
    isOpenKey,
    isOpen
  }
}
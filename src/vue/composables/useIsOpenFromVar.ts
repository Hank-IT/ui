import { ref, computed, type Ref, type ComputedRef } from 'vue'

export default function<T>(
  defaultValue: T | null = null,
  delay: number = 500
): {
  fromVar: ComputedRef<T | null>, // Computed-Wert für `fromVar`
  isOpenFromVar: ComputedRef<boolean | T>, // Computed-Wert für `isOpenFromVar` (enthält boolean oder `T`)
  isOpenFromVarKey: Ref<number>, // Ref-Wert des Counters
} {
    const isOpenFromVarKey: Ref<number> = ref(0)

    const internalIsOpen: Ref<boolean> = ref(false)

  const internalFromVar = ref<T | null>(defaultValue)

    const isOpenFromVar = computed({
        get() {
            return internalIsOpen.value
        },
      set(value: boolean | T) {
            if (value) {
                internalIsOpen.value = true

                internalFromVar.value = value
            } else {
                internalIsOpen.value = false

                setTimeout(() => {
                    internalFromVar.value = defaultValue

                    isOpenFromVarKey.value++
                }, delay)
            }
        }
    })

    const fromVar = computed({
        get(): T | null {
          return internalFromVar.value
        },
        set(value: T | null) {
            if (value) {
                isOpenFromVar.value = true

                internalFromVar.value = value
            } else {
                isOpenFromVar.value = false
            }
        }
    })

    return {
        fromVar,
        isOpenFromVar,
        isOpenFromVarKey,
    }
}
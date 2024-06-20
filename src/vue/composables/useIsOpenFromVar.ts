import { ref, computed } from 'vue'

export default function(defaultValue = null, delay = 500) {
    const isOpenFromVarKey = ref(0)

    const internalIsOpen = ref(false)

    const internalFromVar = ref(defaultValue)

    const isOpenFromVar = computed({
        get() {
            return internalIsOpen.value
        },
        set(value) {
            if (value) {
                internalIsOpen.value = true

                internalFromVar.value = value
            } else {
                internalIsOpen.value = false

                setTimeout(() => {
                    internalFromVar.value = defaultValue

                    isOpenFromVarKey.value ++
                }, delay)
            }
        }
    })

    const fromVar = computed({
        get() {
            return internalFromVar.value
        },
        set(value) {
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
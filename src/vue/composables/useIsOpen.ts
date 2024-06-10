import { ref, computed } from 'vue'

export default function (callback = () => {}, delay: number = 500) {
    const internalIsOpen = ref(false)

    const isOpenKey = ref(0)

    const isOpen = computed({
        get() {
            return internalIsOpen.value
        },
        set(value) {
            // False means we close, so we increment the key
            // Add delay to preserve the closing animation.
            setTimeout(() => {
                if (! value) {
                    isOpenKey.value ++
                }
            }, delay)

            internalIsOpen.value = value

            callback(value)
        }
    })

    return {
        isOpenKey,
        isOpen,
    }
}
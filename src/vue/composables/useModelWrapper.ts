import { computed } from 'vue'

export default function(props, emit, options = {}) {
    const {
        name = 'modelValue',
        // eslint-disable-next-line no-unused-vars
        callback = value => {},
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
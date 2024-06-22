import { nextTick, watch } from 'vue'

export default function(props, options = {}) {
    const {
        name = 'modelValue'
    } = options

    function onBoolean(obj) {
        watch(() => props[name], () => {
            nextTick(() => {
                if (props[name]) {
                    obj.truthy()
                } else {
                    obj.falsy()
                }
            })
        })
    }

    return {
        onBoolean
    }
}
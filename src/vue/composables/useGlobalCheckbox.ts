import { getCurrentInstance, shallowRef, computed, type Component, type Ref, type ComputedRef, h, render, onUnmounted } from 'vue'

interface UseGlobalCheckboxOptions<T> {
  getAll: () => Promise<T[]>
  getPage: () => T[]
  totalCount: () => number
}

export default function<T>(
  dialog: Component,
  options: UseGlobalCheckboxOptions<T>,
  querySelector: string = 'body'
): {
  selectedRows: Ref<T[]>,
  indeterminate: ComputedRef<boolean>,
  handleGlobalCheckboxChange: (event: Event) => void,
} {
  const self = getCurrentInstance()
  const selectedRows = shallowRef<T[]>([])

  function mountDialog() {
    if (! self?.appContext) {
      throw new Error('useGlobalCheckbox must be called inside a setup function')
    }

    const vNode = h(dialog)
    vNode.key = Symbol()
    vNode.appContext = self.appContext
    render(vNode, document.querySelector(querySelector) as Element)
    return vNode.component
  }

  function unmountConfirmDialog() {
    render(null, document.querySelector(querySelector) as Element)
  }

  onUnmounted(() => {
    unmountConfirmDialog()
  })

  const indeterminate = computed(() => {
    const totalCount: number = options.totalCount()

    return selectedRows.value.length > 0 && selectedRows.value.length < totalCount
  })

  async function handleGlobalCheckboxChange(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
      return
    }

    if (event.target?.checked) {
      const pageData: T[] = options.getPage()

      if (pageData.length === options.totalCount()) {
        selectedRows.value = [...pageData]
      } else {
        const mountedDialog = mountDialog()

        if (mountedDialog?.exposed && await mountedDialog?.exposed['open']) {
          selectedRows.value = await options.getAll()
        } else {
          selectedRows.value = [...pageData]
        }
      }
    } else {
      selectedRows.value = []
    }
  }

  return {
    selectedRows,
    indeterminate,
    handleGlobalCheckboxChange
  }
}
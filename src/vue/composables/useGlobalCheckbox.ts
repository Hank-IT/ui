import { getCurrentInstance, shallowRef, computed, type Component, type Ref, type ComputedRef, h, render, onUnmounted } from 'vue'

interface UseGlobalCheckboxOptions<T> {
  getAll: () => Promise<T[]>
  getPage: () => T[]
  totalCount: () => number
}

export default function <T>(
  dialog: Component,
  options: UseGlobalCheckboxOptions<T>,
  querySelector: string = 'body'
): {
  selectedRows: Ref<T[]>
  indeterminate: ComputedRef<boolean>
  checked: ComputedRef<boolean>
  handleGlobalCheckboxChange: (event: Event) => void
} {
  const self = getCurrentInstance()
  const selectedRows = shallowRef<T[]>([])

  function mountDialog() {
    if (!self?.appContext) {
      throw new Error('useGlobalCheckbox must be called inside a setup function')
    }

    const vNode = h(dialog, {
      indeterminate: indeterminate.value,
      checked: checked.value,
    })
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

  const checked = computed({
    get: () => {
      const totalCount: number = options.totalCount()
      return selectedRows.value.length > 0 && selectedRows.value.length === totalCount
    },
    set: (value: boolean) => {
      if (!value) {
        selectedRows.value = []
      }
    }
  })

  async function handleGlobalCheckboxChange(event: Event) {
    event.preventDefault()

    if (!(event.target instanceof HTMLInputElement)) {
      return
    }

    const pageData: T[] = options.getPage()
    const mountedDialog = mountDialog()

    if (!mountedDialog?.exposed) return

    // Case 1: Nothing is selected (unchecked state)
    if (!checked.value && !indeterminate.value) {
      // When clicking the empty checkbox, ask if user wants current page or all entries
      if (await mountedDialog.exposed['open']) {
        // User clicked "All Elements" button
        selectedRows.value = await options.getAll()
      } else {
        // User clicked "Current Page" button
        selectedRows.value = [...pageData]
      }
      return
    }

    // Case 2: Indeterminate state (some items selected, not all)
    if (indeterminate.value) {
      // When clicking the indeterminate checkbox, ask if user wants all entries or unselect all
      if (await mountedDialog.exposed['open']) {
        // User clicked "All Elements" button
        selectedRows.value = await options.getAll()
      } else {
        // User clicked "Discard" button
        selectedRows.value = []
      }
      return
    }

    // Case 3: Checked state (all items selected)
    if (checked.value) {
      // When clicking the checked checkbox, ask if user wants current page or unselect all
      if (await mountedDialog.exposed['open']) {
        // User clicked "Current Page" button
        selectedRows.value = [...pageData]
      } else {
        // User clicked "Discard" button
        selectedRows.value = []
      }
      return
    }
  }

  return {
    selectedRows,
    indeterminate,
    checked,
    handleGlobalCheckboxChange
  }
}
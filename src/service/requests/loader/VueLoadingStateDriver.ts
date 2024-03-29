import { ref } from 'vue'
import type LoadingStateContract from '@/service/requests/contracts/LoadingStateContract'

export default class VueLoadingStateDriver implements LoadingStateContract {
  protected loading

  constructor() {
    this.loading = ref<Boolean>(false)
  }

  isLoading() {
    return this.loading
  }

  setLoading(value) {
    return this.loading.value = value
  }
}
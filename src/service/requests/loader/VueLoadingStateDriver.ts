import { type Ref, ref } from 'vue'
import { type LoadingStateContract } from '../contracts/LoadingStateContract'

export class VueLoadingStateDriver implements LoadingStateContract {
  protected loading: Ref<boolean>

  constructor() {
    this.loading = ref<boolean>(false)
  }

  isLoading(): boolean {
    return this.loading.value
  }

  setLoading(value: boolean) {
    return this.loading.value = value
  }
}

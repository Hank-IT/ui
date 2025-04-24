import { type Ref, ref } from 'vue'
import { type RequestLoaderContract } from '../../../service/requests/contracts/RequestLoaderContract'

export class VueRequestLoader implements RequestLoaderContract<Ref<boolean>> {
  protected loading: Ref<boolean>

  public constructor() {
    this.loading = ref<boolean>(false)
  }

  isLoading(): Ref<boolean> {
    return this.loading
  }

  setLoading(value: boolean): void {
    this.loading.value = value
  }
}

import { type Ref, ref, computed } from 'vue'
import { type RequestLoaderContract } from '../../../service/requests/contracts/RequestLoaderContract'


export class VueRequestLoader implements RequestLoaderContract<Ref<boolean>> {
  private inFlight = ref(0)

  public isLoading(): Ref<boolean> {
    return computed(() => this.inFlight.value > 0)
  }

  public setLoading(loading: boolean): void {
    if (loading) {
      this.inFlight.value++
    } else {
      this.inFlight.value = Math.max(0, this.inFlight.value - 1)
    }
  }
}
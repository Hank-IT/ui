import { VueRequestLoader } from '../loaders/VueRequestLoader'
import { type RequestLoaderContract } from '../../../service/requests/contracts/RequestLoaderContract'
import { type Ref } from 'vue'

export class VueRequestLoaderFactory {
  public make(): RequestLoaderContract<Ref<boolean>> {
    return new VueRequestLoader()
  }
}

import { type DataRequest, type Resolver } from '@/services/router/injection/types.ts'

export class RouteModelRequestResolver<T> implements Resolver<T> {
  public constructor(private request: DataRequest<T>) {}

  public async resolve(): Promise<T> {
    const response = await this.request.send()

    return response.getData()
  }
}

import { BaseRequest } from '../../requests/BaseRequest'
import { JsonResponse } from './responses/JsonResponse'
import { JsonBodyFactory } from '../../requests/factories/JsonBodyFactory'
import { type BodyFactoryContract } from '../../requests/contracts/BodyFactoryContract'

export interface JsonResponseInterface<ResourceInterface> {
  data: ResourceInterface
}

/**
 * This requests expects a response in the JSON format
 * and automatically sets the required headers.
 */
export abstract class JsonBaseRequest<
  ResourceInterface,
  RequestBodyInterface = undefined,
  RequestParamsInterface extends object = object
> extends BaseRequest<JsonResponseInterface<
  ResourceInterface>,
  JsonResponse<ResourceInterface>,
  RequestBodyInterface,
  RequestParamsInterface> {
  public getResponse(): JsonResponse<ResourceInterface> {
    return new JsonResponse<ResourceInterface>
  }

  public override getRequestBodyFactory(): BodyFactoryContract<RequestBodyInterface | undefined> {
    return new JsonBodyFactory<RequestBodyInterface>
  }
}

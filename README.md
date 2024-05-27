# Requirements
While this library can be used with any frontend, it includes Vue 3 support out of box and assumes the usage of Vue 3 in the documentation.

## Requests
This library supports fetch as a driver to make requests.

## Request driver

### Fetch
``` typescript
import { BaseRequest, FetchDriver } from '@hank-it/ui/service/requests'

BaseRequest.setRequestDriver(new FetchDriver)
```

You may enable credential support using:
``` typescript
BaseRequest.setRequestDriver(new FetchDriver({
    corsWithCredentials: true
}))
```

## Defining requests
Each requests requires its own class:

``` typescript
import { BaseRequest, type ResponseContract, JsonResponse } from '@hank-it/ui/service/requests'

export class GetCustomersRequest extends BaseRequest {
  method(): string {
    return 'GET'
  }

  url(): string {
    return '/api/v1/customers'
  }
  
  protected getResponse() {
    return new JsonResponse
  }
}
```

## Requests with data handler and typed response
Each requests requires its own class:

``` typescript
import { BaseRequest, JsonResponse } from '@hank-it/ui/service/requests'

export interface CustomerResource {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
}

export class GetCustomersResponse extends JsonResponse {
  public dataHandler(body): CustomerResource[] {
    return body.data
  }
}

export class GetCustomersRequest extends BaseRequest {
  method(): string {
    return 'GET'
  }

  url(): string {
    return '/api/v1/customers'
  }
  
  protected getResponse() {
    return new GetCustomersResponse
  }
}
```

### Defining paginatable requests
``` typescript
import { BaseRequest, type PaginatableRequest, type ResponseContract, JsonResponse } from '@hank-it/ui/service/requests'
import type {PaginationResponseContract} from '@hank-it/ui/service/pagination'

export class GetProductsRequestResponse extends JsonResponse implements PaginationResponseContract {
    public getTotal(): number {
        return this.body.total
    }

    public dataHandler(body) {
        return body.products
    }
}

export class GetCustomersRequest extends BaseRequest implements PaginatableRequest {
  method(): string {
    return 'GET'
  }

  url(): string {
     return 'https://dummyjson.com/products'
  }
  
  public setPaginationParams(page: number, size: number): BaseRequest {
      return this.withParams({
          skip: (page - 1) * size,
          limit: size,
      })
  }
  
  protected getResponse() {
     return new GetProductsRequestResponse
  }
}
```

### Sending requests

#### Generic get request
``` typescript
import { RequestBaseException } from '@hank-it/ui/service/requests/exceptions'

new GetCustomersRequest()
    .send()
    .then(data => {
        // Do something with data
    })
    .catch((exception: RequestBaseException) => {
        exception.getError().getBodyPromise().then(bodyContent => {
            // errors are in bodyContent
        })
    })
```

You may also access the raw response or the status code:
``` typescript
new GetCustomersRequest()
    .send()
    .then(response => {
        response.getData() // Data converted by the response class
        response.getBody() // Data before being converted by the response class
    })
```

#### Posting json data
``` typescript
// This is the json content for the request
const content = new JsonContent({
  email: "username",
  password: "password",
})

new UserLoginRequest()
  .setBody(content)
  .send()
  .then(result: ResponseContract => {
    // Do something with result
  })
```

#### Posting json data with typescript
``` typescript
import { BaseRequest, JsonResponse } from '@hank-it/ui/service/requests'

export interface AuthPayload {
  username: string,
  password: string,
}

export class AuthJsonContent extends JsonContent {
  public constructor(protected data: AuthPayload) {}
}

export class UserLoginRequest extends BaseRequest {
  method(): string {
    return 'POST'
  }

  url(): string {
    return '/api/v1/login'
  }

  public getResponse() {
    return new JsonResponse
  }
}

// This is the json content for the request
const content = new AuthJsonContent({
  username: "username",
  password: "password",
})

new UserLoginRequest()
  .setBody(content)
  .send()
  .then(result => {
    // Do something with result
  })
```

### Posting form data (File uploading)
You may use any request to upload files:
``` typescript
const file = ref()

function submit() {
  const content = new FormDataContent({
    file: file.value.files[0],
  })

  new UploadInboxItemRequest()
    .setBody(content)
    .send()
    .then(result: ResponseContract => {
       // Do something with result
    })
}
```

Uploading multiple files is supported by simply passing an array of files.

## Pagination with Array source

``` typescript
// This is our data source
const rows = [
  {
    color: "red",
    value: "#f00"
  },
  ...
  {
    color: "black",
    value: "#000"
  }
]

// Booting
BaseRequest.setRequestDriver(new FetchDriver)
BaseRequest.setLoaderStateFactory(new VueLoaderDriverFactory)
Paginator.setViewDriverFactory(new VuePaginationDriverFactory)

const paginator = new Paginator(new ArrayDriver(rows))

// Make the paginator prepare the first page 
paginator.init(1, 10)
```

## Pagination with Request source
You may use any request that implements the ``PaginatableRequest`` interface as data source:

``` typescript
// This is the request we want to paginate. Make sure you 
// implement the "PaginatableRequest" interface for this to work.
const getInboxItemsRequest = new GetInboxItemsRequest

const paginator = new Paginator( new RequestDriver(getInboxItemsRequest))

// Make the paginator prepare the first page 
paginator.init(1, 10)
```